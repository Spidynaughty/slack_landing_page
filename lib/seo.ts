import type { Metadata } from "next";
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
};

/** Builds per-page metadata: unique title, description, canonical URL and OpenGraph/Twitter cards. */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  authors,
  noIndex,
}: SeoInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      ...(type === "article" && publishedTime ? { publishedTime, authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      creator: site.twitter,
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}
