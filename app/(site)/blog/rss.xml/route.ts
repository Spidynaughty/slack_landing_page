import { postCover, posts } from "@/data/posts";
import { site } from "@/lib/site";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();

/** GET /blog/rss.xml: the blog as an RSS 2.0 feed, newest first (built at build time). */
export function GET() {
  const sorted = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const items = sorted
    .map((p) => {
      const link = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(p.publishedAt)}</pubDate>
      <dc:creator>${esc(p.author.name)}</dc:creator>
      <category>${esc(p.category)}</category>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
      <description>${esc(p.excerpt)}</description>
      <media:content url="${site.url}${postCover(p)}" medium="image" type="image/svg+xml" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(site.name)} blog</title>
    <link>${site.url}/blog</link>
    <description>Product news, engineering deep dives, design stories and practical advice from the ${esc(site.name)} team.</description>
    <language>en-us</language>
    <lastBuildDate>${sorted[0] ? rfc822(sorted[0].publishedAt) : ""}</lastBuildDate>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${site.url}/icon.png</url>
      <title>${esc(site.name)} blog</title>
      <link>${site.url}/blog</link>
    </image>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
