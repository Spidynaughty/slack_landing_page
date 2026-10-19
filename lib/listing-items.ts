import type { ListingItem } from "@/components/templates/listing";
import type { IconName } from "@/components/ui/icon";
import { events } from "@/data/events";
import { helpArticles, helpCategories } from "@/data/help";
import { postCover, posts, type Post } from "@/data/posts";
import { resources, type ResourceType } from "@/data/resources";
import { stories } from "@/data/stories";
import { templates } from "@/data/templates";
import { formatDate, monthDay } from "./utils";

/** Adapters that turn content data into serializable cards for the Listing template. */

export function postItems(list: Post[] = posts): ListingItem[] {
  return list.map((p) => ({
    id: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    href: `/blog/${p.slug}`,
    tone: p.tone,
    image: postCover(p),
    badge: p.category,
    meta: [formatDate(p.publishedAt), `${p.readMinutes} min read`],
    facets: { category: p.category },
    author: { name: p.author.name, initials: p.author.initials },
  }));
}

export function storyItems(): ListingItem[] {
  return stories.map((s) => ({
    id: s.slug,
    title: s.headline,
    excerpt: s.summary,
    href: `/customer-stories/${s.slug}`,
    tone: s.tone,
    badge: s.industry,
    logo: s.logo,
    meta: [s.region, s.size],
    facets: { industry: s.industry, region: s.region },
  }));
}

export function eventItems(): ListingItem[] {
  return [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({
      id: e.slug,
      title: e.title,
      excerpt: e.excerpt,
      href: `/events/${e.slug}`,
      tone: e.tone,
      badge: e.format,
      dateBlock: monthDay(e.date),
      location: e.location,
      meta: [e.format === "On demand" ? "Watch any time" : formatDate(e.date), e.time],
      facets: { format: e.format, category: e.category },
    }));
}

export function helpItems(): ListingItem[] {
  const icon = (c: string): IconName => helpCategories.find((h) => h.name === c)?.icon ?? "lifebuoy";
  return helpArticles.map((a) => ({
    id: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    href: `/help/${a.slug}`,
    tone: helpCategories.find((h) => h.name === a.category)?.tone ?? "violet",
    icon: icon(a.category),
    badge: a.category,
    meta: [`Updated ${formatDate(a.updatedAt)}`, `${a.readMinutes} min read`],
    facets: { category: a.category },
  }));
}

const resourceIcon: Record<ResourceType, IconName> = {
  Guide: "book",
  Report: "chart",
  Webinar: "video",
  "E-book": "library",
  Video: "play",
  Checklist: "listChecks",
};

export function resourceItems(): ListingItem[] {
  return resources.map((r) => ({
    id: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    href: r.href,
    tone: r.tone,
    icon: resourceIcon[r.type],
    badge: r.type,
    meta: [r.topic, `${r.minutes} min`],
    facets: { type: r.type, topic: r.topic },
  }));
}

export function templateItems(): ListingItem[] {
  return templates.map((t) => ({
    id: t.slug,
    title: t.name,
    excerpt: t.description,
    href: `/templates/${t.slug}`,
    tone: t.tone,
    icon: t.icon,
    badge: t.category,
    meta: [t.includes.join(" · "), `${t.uses} teams`],
    facets: { category: t.category, popular: t.popular ? "Popular" : "Other" },
    preview: { includes: t.includes, contents: t.contents, uses: t.uses },
  }));
}
