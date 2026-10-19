import type { MetadataRoute } from "next";
import { allRoutes, NOT_CRAWLED } from "@/lib/routes";
import { site } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-10-17T00:00:00Z");

/** Listing a page that robots.txt blocks is reported as an error by search engines, so those are left out. */
function crawlable(path: string) {
  return !NOT_CRAWLED.some((p) => path === p || (p.endsWith("/") && path.startsWith(p)));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes()
    .filter(crawlable)
    .map((path) => {
      const depth = path === "/" ? 0 : path.split("/").length - 1;
      return {
        url: path === "/" ? site.url : `${site.url}${path}`,
        lastModified: LAST_MODIFIED,
        changeFrequency: path.startsWith("/blog") || path === "/changelog" || path === "/status" ? "weekly" : "monthly",
        priority: depth === 0 ? 1 : depth === 1 ? 0.8 : 0.6,
      };
    });
}
