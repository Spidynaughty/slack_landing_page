import type { MetadataRoute } from "next";
import { allRoutes, crawlable } from "@/lib/routes";
import { site } from "@/lib/site";

const LAST_MODIFIED = new Date("2026-10-17T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  // Listing a page that robots.txt blocks is reported as an error by search engines, so those are left out
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
