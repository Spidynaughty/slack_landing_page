import "server-only";
import { navSearchEntries } from "@/data/nav";
import { featureDemos } from "@/data/demos";
import { events } from "@/data/events";
import { features } from "@/data/features";
import { collections, guides, resourceCategories } from "@/data/guides";
import { helpArticles, helpCategories } from "@/data/help";
import { posts } from "@/data/posts";
import { solutions } from "@/data/solutions";
import { stories } from "@/data/stories";
import { legalDocs, trustPages } from "@/data/trust";
import { slugify } from "./utils";
import type { SearchEntry } from "@/components/nav/search-palette";

/** Everything the command palette can find: navigation plus content pages. */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [
    { label: "Home", href: "/", group: "Pages" },
    { label: "Template gallery", href: "/templates/gallery", group: "Solutions", description: "Pre-built playbooks" },
    ...navSearchEntries(),
    ...features.map((f) => ({ label: f.name, href: f.href, group: "Features", description: f.summary })),
    ...solutions.map((s) => ({ label: s.name, href: `/solutions/${s.slug}`, group: "Solutions", description: s.summary })),
    ...helpArticles.map((a) => ({ label: a.title, href: `/help/${a.slug}`, group: "Help Centre", description: a.excerpt })),
    ...posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}`, group: `Blog · ${p.category}`, description: p.excerpt })),
    ...stories.map((s) => ({ label: `${s.company} customer story`, href: `/customer-stories/${s.slug}`, group: "Customer stories", description: s.headline })),
    ...events.map((e) => ({ label: e.title, href: `/events/${e.slug}`, group: "Events", description: e.excerpt })),
    ...featureDemos.map((d) => ({ label: `${d.featureName} demo`, href: d.path, group: "Demos", description: d.subtitle })),
    ...helpCategories.map((c) => ({ label: c.name, href: `/help/categories/${slugify(c.name)}`, group: "Help Centre", description: c.description })),
    ...trustPages.map((t) => ({ label: t.title, href: `/trust/${t.slug}`, group: "Trust Center", description: t.seo.description })),
    ...legalDocs.map((d) => ({ label: d.title, href: d.href, group: "Legal", description: d.description })),
    ...resourceCategories.map((c) => ({ label: c.name, href: `/resources/${c.slug}`, group: "Resources", description: c.description })),
    ...guides.map((g) => ({ label: g.title, href: `/resources/${g.category}/${g.slug}`, group: "Guides", description: g.excerpt })),
    ...collections.map((c) => ({ label: c.title, href: `/resources/collections/${c.slug}`, group: "Collections", description: c.description })),
  ];
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.href) ? false : (seen.add(e.href), true)));
}
