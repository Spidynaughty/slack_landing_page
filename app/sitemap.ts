import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { helpArticles } from "@/data/help";
import { postCover, posts } from "@/data/posts";
import { stories } from "@/data/stories";
import { allRoutes, crawlable } from "@/lib/routes";
import { site } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-10-17T00:00:00Z");

/** Real dates for content pages, so search engines know what changed. Everything else uses the site's last update. */
const dated = new Map<string, string>([
  ...posts.map((p) => [`/blog/${p.slug}`, p.publishedAt] as const),
  ...stories.map((s) => [`/customer-stories/${s.slug}`, s.publishedAt] as const),
  ...helpArticles.map((a) => [`/help/${a.slug}`, a.updatedAt] as const),
  ...guides.map((g) => [`/resources/${g.category}/${g.slug}`, g.updatedAt] as const),
]);

/** Pictures on the page, for image search (blog covers). */
const images = new Map<string, string[]>(posts.map((p) => [`/blog/${p.slug}`, [`${site.url}${postCover(p)}`]]));

export default function sitemap(): MetadataRoute.Sitemap {
  // Listing a page that robots.txt blocks is reported as an error by search engines, so those are left out
  return allRoutes()
    .filter(crawlable)
    .map((path) => {
      const depth = path === "/" ? 0 : path.split("/").length - 1;
      const date = dated.get(path);
      return {
        url: path === "/" ? site.url : `${site.url}${path}`,
        lastModified: date ? new Date(`${date}T00:00:00Z`) : LAST_MODIFIED,
        changeFrequency: path.startsWith("/blog") || path === "/changelog" || path === "/status" ? "weekly" : "monthly",
        priority: depth === 0 ? 1 : depth === 1 ? 0.8 : 0.6,
        ...(images.has(path) ? { images: images.get(path) } : {}),
      };
    });
}
