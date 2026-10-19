import { features } from "@/data/features";
import { helpCategories } from "@/data/help";
import { plans } from "@/data/pricing";
import { posts } from "@/data/posts";
import { solutions } from "@/data/solutions";
import { trustPages } from "@/data/trust";
import { site } from "@/lib/site";
import { slugify } from "@/lib/utils";

const link = (title: string, path: string, note?: string) => `- [${title}](${site.url}${path})${note ? `: ${note}` : ""}`;

/**
 * GET /llms.txt: a plain summary of the site for AI assistants and AI search
 * (the llmstxt.org convention), built from the same data as the pages.
 */
export function GET() {
  const latest = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 8);
  const text = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} brings team chat, huddles (audio and video calls), canvases, lists, workflow automation and AI agents into one workspace. It runs in the browser and on Windows, macOS, Linux, iOS and Android, with a free plan and paid plans for growing teams and enterprises.`,
    "",
    "## Product",
    ...features.map((f) => link(f.name, f.href, f.summary)),
    "",
    "## Solutions",
    ...solutions.map((s) => link(s.name, `/solutions/${s.slug}`, s.summary)),
    "",
    "## Pricing",
    link("Pricing and plans", "/pricing", "Compare every plan and feature"),
    ...plans.map((p) => link(`${p.name} plan`, `/pricing/${p.id === "business" ? "business-plus" : p.id}`, p.tagline)),
    "",
    "## Latest from the blog",
    ...latest.map((p) => link(p.title, `/blog/${p.slug}`, p.excerpt)),
    link("All articles", "/blog"),
    "",
    "## Help Centre",
    ...helpCategories.map((c) => link(c.name, `/help/categories/${slugify(c.name)}`, c.description)),
    "",
    "## Security and trust",
    link("Trust Center", "/trust"),
    ...trustPages.map((t) => link(t.title, `/trust/${t.slug}`, t.seo.description)),
    "",
    "## Company",
    link("About us", "/about"),
    link("Careers", "/careers"),
    link("Contact sales", "/contact-sales"),
    link("Download the apps", "/downloads"),
    "",
    "## Optional",
    link("Sitemap", "/sitemap.xml"),
    link("Blog feed (RSS)", "/blog/rss.xml"),
    "",
  ].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
