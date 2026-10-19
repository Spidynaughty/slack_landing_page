import { navHrefs } from "@/data/nav";
import { authors } from "@/data/authors";
import { apps } from "@/data/integrations";
import { jobs } from "@/data/jobs";
import { templates } from "@/data/templates";
import { blogTopics } from "./blog-topics";
import { comparisons } from "@/data/compare";
import { featureDemos } from "@/data/demos";
import { events } from "@/data/events";
import { features } from "@/data/features";
import { collections, guides, resourceCategories } from "@/data/guides";
import { helpArticles, helpCategories } from "@/data/help";
import { posts } from "@/data/posts";
import { solutions } from "@/data/solutions";
import { stories } from "@/data/stories";
import { trustPages } from "@/data/trust";
import { slugify } from "./utils";

/** Pages that exist but aren't linked directly from the header/footer config. */
const extraStatic = [
  "/templates/gallery",
  "/resources/why-use-slack/ai-era-of-work",
  "/resources/why-use-slack/what-is-slack-and-how-does-it-work",
  "/resources/why-use-slack/rethinking-email-ai-conversations-work",
  "/legal",
  "/cookie-policy",
  "/pricing/free",
  "/pricing/pro",
  "/pricing/business-plus",
  "/pricing/enterprise",
  "/pricing/nonprofits",
  "/pricing/education",
];

/** Every public route on the site, derived from navigation plus content data. */
export function allRoutes(): string[] {
  const set = new Set<string>([...navHrefs(), ...extraStatic]);
  features.forEach((f) => set.add(f.href));
  featureDemos.forEach((d) => set.add(d.path));
  solutions.forEach((s) => set.add(`/solutions/${s.slug}`));
  comparisons.forEach((c) => set.add(`/compare/${c.slug}`));
  posts.forEach((p) => set.add(`/blog/${p.slug}`));
  stories.forEach((s) => set.add(`/customer-stories/${s.slug}`));
  events.forEach((e) => set.add(`/events/${e.slug}`));
  helpArticles.forEach((a) => set.add(`/help/${a.slug}`));
  helpCategories.forEach((c) => set.add(`/help/categories/${slugify(c.name)}`));
  trustPages.forEach((t) => set.add(`/trust/${t.slug}`));
  resourceCategories.forEach((c) => set.add(`/resources/${c.slug}`));
  guides.forEach((g) => set.add(`/resources/${g.category}/${g.slug}`));
  collections.forEach((c) => set.add(`/resources/collections/${c.slug}`));
  apps.forEach((a) => set.add(`/marketplace/${a.slug}`));
  templates.forEach((t) => set.add(`/templates/${t.slug}`));
  jobs.forEach((j) => set.add(`/careers/${j.slug}`));
  blogTopics.forEach((t) => set.add(`/blog/topic/${t.slug}`));
  authors.forEach((a) => set.add(`/blog/authors/${a.slug}`));
  return [...set].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
}

/** Paths search engines should not crawl (robots.txt). The sitemap leaves them out too. */
export const NOT_CRAWLED = ["/signin", "/get-started", "/admin", "/api/", "/search-index.json"];
