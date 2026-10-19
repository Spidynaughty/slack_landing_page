import type { Metadata } from "next";
import { getSeoOverrides } from "./seo-overrides";
import { site } from "./site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** OpenGraph type; articles get article metadata. */
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
  /** Use the title as written, without the " | ktTeams" the template adds (the home page). */
  absoluteTitle?: boolean;
};

/**
 * Builds per-page metadata: unique title, description, canonical URL and
 * OpenGraph/Twitter cards. A title or description changed under Admin > SEO
 * replaces the one passed in here.
 */
export async function buildMetadata({
  title: codeTitle,
  description: codeDescription,
  path,
  type = "website",
  publishedTime,
  authors,
  noIndex,
  absoluteTitle,
}: SeoInput): Promise<Metadata> {
  const saved = (await getSeoOverrides())[path];
  const title = saved?.title || codeTitle;
  const description = saved?.description || codeDescription;
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      ...(type === "article" && publishedTime ? { publishedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: site.twitter,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
