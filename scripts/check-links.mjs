#!/usr/bin/env node
/**
 * Route + link checker. Run after `next build`:
 *   node scripts/check-links.mjs
 *
 * 1. Starts `next start` on a free port.
 * 2. Verifies every route required by the site architecture returns 200.
 * 3. Checks every redirect in next.config.ts lands on a real page.
 * 4. Checks that wrong URLs return a real 404 (not a 200 page that says "not found").
 * 5. Crawls every page from /sitemap.xml, plus pages left out of it, and checks every internal link and #anchor.
 * Exits non-zero if anything is missing or broken.
 */
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout as wait } from "node:timers/promises";

const PORT = Number(process.env.PORT ?? 4310);
const BASE = `http://localhost:${PORT}`;

// Every page from the architecture spec (section 1 + folder structure).
const REQUIRED = [
  "/", "/signin", "/get-started", "/contact-sales", "/contact",
  "/features", "/features/channels", "/features/huddles", "/features/canvas", "/features/task-list",
  "/features/slackbot", "/features/code-channels", "/features/ai", "/features/crm", "/features/enterprise-search",
  "/features/agentic-platform", "/features/workflow-automation", "/features/team-chat", "/features/clips",
  "/features/document-sharing", "/features/atlas",
  "/connect", "/ai-agents", "/crm", "/integrations", "/marketplace", "/trust", "/trust/security",
  "/enterprise", "/enterprise-key-management", "/whats-new", "/innovations", "/changelog", "/status",
  "/demo", "/downloads", "/product-tour",
  "/solutions", "/solutions/engineering", "/solutions/information-technology", "/solutions/customer-service",
  "/solutions/sales", "/solutions/project-management", "/solutions/marketing", "/solutions/human-resources",
  "/solutions/security", "/solutions/manufacturing", "/solutions/technology", "/solutions/media",
  "/solutions/small-business", "/solutions/financial-services", "/solutions/retail", "/solutions/public-sector",
  "/solutions/education", "/solutions/healthcare", "/solutions/task-management",
  "/templates/gallery", "/pricing", "/pricing/paid-vs-free", "/compare/slack-vs-email", "/compare/slack-vs-teams",
  "/scale", "/engage-users", "/resources", "/resources/why-use-slack/ai-era-of-work",
  "/customer-stories", "/events", "/blog", "/blog/news", "/help",
  "/community", "/partners", "/partner-offers", "/developers",
  "/about", "/media-kit", "/brand", "/careers", "/shop", "/engineering-blog", "/design-blog", "/certified",
  "/accessibility", "/legal/privacy", "/legal/terms",
  "/sitemap.xml", "/robots.txt",
  // Second-level pages from the reference site
  "/features/templates", "/ai-agents/demo", "/features/slackbot/demo", "/features/enterprise-search/demo", "/features/ai/demo",
  "/resources/why-use-slack", "/resources/using-slack", "/resources/slack-101", "/resources/slack-for-admins",
  "/resources/why-use-slack/what-is-slack-and-how-does-it-work", "/resources/why-use-slack/rethinking-email-ai-conversations-work",
  "/resources/using-slack/ten-ways-to-replace-ineffective-meetings", "/resources/slack-101/collaborate-effectively-in-channels",
  "/resources/slack-for-admins/unlocking-value-at-scale",
  "/resources/collections/sales-teams", "/resources/collections/service-teams", "/resources/collections/productivity-platform",
  "/help/requests/new", "/help/search", "/help/categories/getting-started",
  "/trust/compliance", "/trust/data-management", "/trust/data-requests", "/trust/privacy", "/trust/ai-principles", "/trust/privacy-request",
  "/legal", "/cookie-policy",
  // Detail pages
  "/marketplace/drivewise", "/marketplace/expensio", "/templates/project-kickoff", "/templates/vendor-management",
  "/careers/staff-software-engineer-real-time-infrastructure", "/blog/topic/product", "/blog/topic/ai", "/blog/topic/productivity",
  "/blog/authors/priya-raman", "/pricing/free", "/pricing/pro", "/pricing/business-plus", "/pricing/enterprise",
  "/pricing/nonprofits", "/pricing/education",
];

// Alternate URLs that must redirect somewhere real: every redirect in next.config.ts.
const REDIRECTS = Object.fromEntries(
  [...readFileSync("next.config.ts", "utf8").matchAll(/source:\s*"([^"]+)",\s*destination:\s*"([^"]+)"/g)].map((m) => [m[1], m[2]]),
);

// Pages that are deliberately not in the sitemap but still have links worth checking.
const UNLISTED = ["/signin", "/get-started", "/help/search"];

// Wrong URLs, one per kind of dynamic page. Each must answer with a real 404.
const NOT_FOUND = [
  "/no-such-page", "/blog/no-such-post", "/blog/authors/nobody", "/blog/topic/nothing", "/careers/no-such-job",
  "/compare/nothing", "/customer-stories/nobody", "/events/nothing", "/features/nothing", "/features/nothing/demo",
  "/help/nothing", "/help/categories/nothing", "/marketplace/nothing", "/pricing/nothing", "/resources/nothing",
  "/resources/nothing/nothing", "/resources/collections/nothing", "/solutions/nothing", "/templates/nothing", "/trust/nothing",
];

// Capitalised addresses must redirect to the lowercase page, and visiting them must not break the real page
// (on Windows a cached "not found" for /pricing/Free used to overwrite /pricing/free).
const MIXED_CASE = ["/Pricing", "/pricing/Free", "/trust/COMPLIANCE", "/blog/List-Automations", "/features/AI/demo", "/Admin/Login"];

const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, NODE_ENV: "production" },
});
server.stderr.on("data", (d) => process.stderr.write(d));

async function up() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(BASE + "/robots.txt");
      if (r.ok) return;
    } catch {
      /* not yet */
    }
    await wait(500);
  }
  throw new Error("Server did not start");
}

const pageCache = new Map();
async function get(path) {
  if (pageCache.has(path)) return pageCache.get(path);
  const res = await fetch(BASE + path, { redirect: "manual" });
  const body = /text|xml|json/.test(res.headers.get("content-type") ?? "") ? await res.text() : "";
  const out = { status: res.status, body };
  pageCache.set(path, out);
  return out;
}

function extract(html) {
  const links = new Set();
  const ids = new Set();
  for (const m of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) links.add(m[1].replace(/&amp;/g, "&"));
  for (const m of html.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
  return { links, ids };
}

let failed = false;
try {
  await up();

  const missing = [];
  for (const r of REQUIRED) {
    const { status } = await get(r);
    if (status !== 200) missing.push(`${r} -> ${status}`);
  }
  console.log(`Required routes: ${REQUIRED.length - missing.length}/${REQUIRED.length} OK`);
  const badRedirects = [];
  for (const [from, to] of Object.entries(REDIRECTS)) {
    const res = await fetch(BASE + from, { redirect: "manual" });
    const loc = res.headers.get("location") ?? "";
    if (res.status < 300 || res.status >= 400 || !loc.endsWith(to)) badRedirects.push(`${from} -> ${res.status} ${loc}`);
  }
  console.log(`Redirects: ${Object.keys(REDIRECTS).length - badRedirects.length}/${Object.keys(REDIRECTS).length} OK`);
  if (badRedirects.length) {
    failed = true;
    console.log("  Bad redirects:\n   " + badRedirects.join("\n   "));
  }
  if (missing.length) {
    failed = true;
    console.log("  Missing:\n   " + missing.join("\n   "));
  }
  const soft404 = [];
  for (const p of NOT_FOUND) {
    const { status } = await get(p);
    if (status !== 404) soft404.push(`${p} -> ${status}`);
  }
  console.log(`Wrong URLs answering 404: ${NOT_FOUND.length - soft404.length}/${NOT_FOUND.length}`);
  if (soft404.length) {
    failed = true;
    console.log("  Should be 404:\n   " + soft404.join("\n   "));
  }
  const badCase = [];
  for (const p of MIXED_CASE) {
    const res = await fetch(BASE + p, { redirect: "manual" });
    const loc = new URL(res.headers.get("location") ?? "/", BASE).pathname;
    const real = await fetch(BASE + p.toLowerCase(), { redirect: "manual" });
    if (res.status !== 308 || loc !== p.toLowerCase()) badCase.push(`${p} -> ${res.status} ${loc}`);
    else if (real.status !== 200) badCase.push(`${p.toLowerCase()} -> ${real.status} after visiting ${p}`);
  }
  console.log(`Capitalised URLs sent to lowercase: ${MIXED_CASE.length - badCase.length}/${MIXED_CASE.length}`);
  if (badCase.length) {
    failed = true;
    console.log("  Problems:\n   " + badCase.join("\n   "));
  }

  const sitemap = (await get("/sitemap.xml")).body;
  const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  const pages = [...new Set([...listed, ...UNLISTED])];
  const broken = [];
  const badAnchors = [];
  const external = new Set();
  let checked = 0;
  const titles = new Map();
  const descriptions = new Map();
  const seoIssues = [];
  for (const page of pages) {
    const { status, body } = await get(page);
    if (status !== 200) {
      broken.push(`${page} (${listed.includes(page) ? "in sitemap" : "unlisted page"}) -> ${status}`);
      continue;
    }
    const title = body.match(/<title>([^<]*)<\/title>/)?.[1];
    const desc = body.match(/<meta name="description" content="([^"]*)"/)?.[1];
    const h1s = (body.match(/<h1[\s>]/g) ?? []).length;
    if (!title) seoIssues.push(`${page}: missing <title>`);
    else titles.set(title, [...(titles.get(title) ?? []), page]);
    if (!desc) seoIssues.push(`${page}: missing meta description`);
    else descriptions.set(desc, [...(descriptions.get(desc) ?? []), page]);
    if (!/<meta property="og:title"/.test(body)) seoIssues.push(`${page}: missing og:title`);
    if (h1s !== 1) seoIssues.push(`${page}: ${h1s} <h1> elements`);
    const { links, ids } = extract(body);
    for (const href of links) {
      if (href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      if (/^https?:\/\//.test(href)) {
        external.add(href);
        continue;
      }
      if (href.startsWith("#")) {
        if (href.length > 1 && !ids.has(href.slice(1))) badAnchors.push(`${page} -> ${href}`);
        continue;
      }
      const [path, hash] = href.split("#");
      const target = await get(path || page);
      checked++;
      if (target.status !== 200) broken.push(`${page} -> ${href} (${target.status})`);
      else if (hash && !extract(target.body).ids.has(hash)) badAnchors.push(`${page} -> ${href}`);
    }
  }
  console.log(`Crawled ${listed.length} sitemap pages and ${pages.length - listed.length} unlisted pages, checked ${checked} internal links.`);
  if (broken.length) {
    failed = true;
    console.log("Broken links:\n  " + [...new Set(broken)].join("\n  "));
  } else console.log("Broken links: none");
  if (badAnchors.length) {
    failed = true;
    console.log("Missing anchors:\n  " + [...new Set(badAnchors)].join("\n  "));
  } else console.log("Missing anchors: none");
  for (const [t, ps] of titles) if (ps.length > 1) seoIssues.push(`Duplicate title "${t}": ${ps.join(", ")}`);
  for (const [d, ps] of descriptions) if (ps.length > 1) seoIssues.push(`Duplicate description: ${ps.join(", ")} (${d.slice(0, 50)}…)`);
  if (seoIssues.length) {
    failed = true;
    console.log("SEO issues:\n  " + seoIssues.join("\n  "));
  } else console.log(`SEO: ${titles.size} unique titles, ${descriptions.size} unique descriptions, one <h1> per page`);
  if (external.size) console.log("External links found:\n  " + [...external].join("\n  "));
} catch (e) {
  failed = true;
  console.error(e);
} finally {
  server.kill();
}
process.exit(failed ? 1 : 0);
