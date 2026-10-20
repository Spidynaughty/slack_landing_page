import type { Metadata } from "next";
import { DEFAULT_SHARE_IMAGE, OG_SIZE, shareImageUrl } from "./og";
import { getSeoOverrides } from "./seo-overrides";
import { site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** OpenGraph type; articles get article metadata. */
  type?: "website" | "article";
  publishedTime?: string;
  /** When the content last changed (articles), ISO date */
  modifiedTime?: string;
  authors?: string[];
  /** Article section and tags, e.g. the blog category and post tags */
  section?: string;
  tags?: string[];
  /** Shown as "Reading time" on X/Twitter cards */
  readMinutes?: number;
  noIndex?: boolean;
  /** Use the title as written, without the " | ktTeams" the template adds (the home page). */
  absoluteTitle?: boolean;
};

/** The blog feed, linked from every page so feed readers can find it. */
export const FEED = { url: "/blog/rss.xml", title: `${site.name} blog` };

/** Roughly what search results show before cutting text off. */
export const SEARCH_LIMITS = { title: 60, description: 160 } as const;

/** The title search engines see: " | ktTeams" is added only while it still fits, so long titles keep their own words. */
export function searchTitle(title: string, absolute = false) {
  const withName = `${title} | ${site.name}`;
  return absolute || withName.length > SEARCH_LIMITS.title ? title : withName;
}

/** Shortens a description from the code to what results show, at a word boundary. */
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:–—-]+$/, "")}…`;
}

/**
 * Builds per-page metadata: unique title, description, canonical URL, language
 * alternates, the blog feed link, OpenGraph/Twitter cards with a share picture
 * showing the page title, and article details. A title or description changed
 * under Admin > SEO replaces the one passed in here (the picture follows it).
 */
export async function buildMetadata({
  title: codeTitle,
  description: codeDescription,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
  readMinutes,
  noIndex,
  absoluteTitle,
}: SeoInput): Promise<Metadata> {
  const saved = (await getSeoOverrides())[path];
  const title = saved?.title || codeTitle;
  // Wording saved in the admin is used as typed; the code's longer page summaries are trimmed for results
  const description = saved?.description || clamp(codeDescription, SEARCH_LIMITS.description);
  const fullTitle = searchTitle(title, absoluteTitle);
  const url = path === "/" ? site.url : `${site.url}${path}`;
  // Pages set their own openGraph and twitter fields, which replace the root layout's, so the picture goes here
  const image = {
    url: path === "/" ? DEFAULT_SHARE_IMAGE : shareImageUrl(title, path),
    ...OG_SIZE,
    alt: path === "/" ? `${site.name}: where teams and AI get things done` : title,
  };
  const article = type === "article";
  return {
    // The layout's title template would add " | ktTeams" again, so the final title is set as is
    title: { absolute: fullTitle },
    description,
    alternates: {
      canonical: path,
      // One language today; x-default tells search engines this is the page for everyone else too
      languages: { "en-US": path, "x-default": path },
      types: { "application/rss+xml": [FEED] },
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      images: [image],
      ...(article
        ? {
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
            ...(authors?.length ? { authors } : {}),
            ...(section ? { section } : {}),
            ...(tags?.length ? { tags } : {}),
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: site.twitter,
      creator: site.twitter,
      images: [image],
    },
    ...(readMinutes ? { other: { "twitter:label1": "Reading time", "twitter:data1": `${readMinutes} min read` } } : {}),
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
