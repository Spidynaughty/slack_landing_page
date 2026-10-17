import { navHrefs } from "@/data/nav";
import { comparisons } from "@/data/compare";
import { events } from "@/data/events";
import { features } from "@/data/features";
import { helpArticles } from "@/data/help";
import { posts } from "@/data/posts";
import { solutions } from "@/data/solutions";
import { stories } from "@/data/stories";

/** Pages that exist but aren't linked directly from the header/footer config. */
const extraStatic = ["/templates/gallery", "/resources/why-use-slack/ai-era-of-work"];

/** Every public route on the site, derived from navigation plus content data. */
export function allRoutes(): string[] {
  const set = new Set<string>([...navHrefs(), ...extraStatic]);
  features.forEach((f) => set.add(f.href));
  solutions.forEach((s) => set.add(`/solutions/${s.slug}`));
  comparisons.forEach((c) => set.add(`/compare/${c.slug}`));
  posts.forEach((p) => set.add(`/blog/${p.slug}`));
  stories.forEach((s) => set.add(`/customer-stories/${s.slug}`));
  events.forEach((e) => set.add(`/events/${e.slug}`));
  helpArticles.forEach((a) => set.add(`/help/${a.slug}`));
  return [...set].sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));
}
