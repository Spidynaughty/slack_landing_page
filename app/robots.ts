import type { MetadataRoute } from "next";
import { NOT_CRAWLED } from "@/lib/routes";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: NOT_CRAWLED }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
