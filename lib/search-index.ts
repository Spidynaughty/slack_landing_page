import "server-only";
import { navSearchEntries } from "@/data/nav";
import { events } from "@/data/events";
import { features } from "@/data/features";
import { helpArticles } from "@/data/help";
import { posts } from "@/data/posts";
import { solutions } from "@/data/solutions";
import { stories } from "@/data/stories";
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
  ];
  const seen = new Set<string>();
  return entries.filter((e) => (seen.has(e.href) ? false : (seen.add(e.href), true)));
}
