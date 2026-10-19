/**
 * Page titles and descriptions changed under Admin > SEO.
 *
 * buildMetadata() (lib/seo.ts) reads these for every public page. The read is
 * cached and tagged "seo", so pages stay prerendered; saving in the admin calls
 * updateTag("seo") and each page shows its new title on the next visit.
 */
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { db, plain } from "@/lib/db";
import { allRoutes, crawlable } from "@/lib/routes";
import { buildSearchIndex } from "@/lib/search-index";
import { site } from "@/lib/site";

export type SeoOverride = {
  path: string;
  title: string;
  description: string;
  original_title: string;
  original_description: string;
  updated_at: string;
};

/** The template adds this after every page title except the home page's. */
export const TITLE_SUFFIX = ` | ${site.name}`;
export const SEO_LIMITS = { title: 70, description: 320 } as const;

/** Saved changes by path, for buildMetadata. Empty fields mean "keep the code's text". */
export async function getSeoOverrides(): Promise<Record<string, { title: string; description: string }>> {
  "use cache";
  cacheTag("seo");
  cacheLife("max");
  const client = await db();
  const res = await client.execute("SELECT path, title, description FROM seo_overrides");
  return Object.fromEntries(res.rows.map((r) => [String(r.path), { title: String(r.title), description: String(r.description) }]));
}

/** Fresh (uncached) reads for the admin. */
export async function listSeoOverrides(): Promise<SeoOverride[]> {
  const client = await db();
  return plain<SeoOverride>((await client.execute("SELECT * FROM seo_overrides ORDER BY path")).rows);
}

export async function readSeoOverride(path: string): Promise<SeoOverride | null> {
  const client = await db();
  const res = await client.execute({ sql: "SELECT * FROM seo_overrides WHERE path = ?", args: [path] });
  return plain<SeoOverride>(res.rows)[0] ?? null;
}

function nameFromPath(path: string) {
  const last = path.split("/").filter(Boolean).at(-1) ?? "Home";
  return last.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
}

/** Every page the admin can edit: the public pages in the sitemap, each with a readable name. */
export function seoPages(): { path: string; name: string }[] {
  const names = new Map(buildSearchIndex().map((e) => [e.href, e.label]));
  return allRoutes()
    .filter(crawlable)
    .map((path) => ({ path, name: names.get(path) ?? nameFromPath(path) }));
}
