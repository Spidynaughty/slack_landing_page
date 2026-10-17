#!/usr/bin/env node
/**
 * Route + link checker. Run after `next build`:
 *   node scripts/check-links.mjs
 *
 * 1. Starts `next start` on a free port.
 * 2. Verifies every route required by the site architecture returns 200.
 * 3. Crawls every page from /sitemap.xml and checks every internal link and #anchor it finds.
 * Exits non-zero if anything is missing or broken.
 */
import { spawn } from "node:child_process";
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
];

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
  if (missing.length) {
    failed = true;
    console.log("  Missing:\n   " + missing.join("\n   "));
  }

  const sitemap = (await get("/sitemap.xml")).body;
  const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
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
      broken.push(`${page} (in sitemap) -> ${status}`);
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
  console.log(`Crawled ${pages.length} sitemap pages, checked ${checked} internal links.`);
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
