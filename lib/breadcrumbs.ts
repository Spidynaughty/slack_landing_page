/**
 * Breadcrumbs that follow the header menus, so a page reached from
 * Product › Meetings & video reads "Home › Product › Meetings & video".
 * Labels come straight from data/nav.ts and stay in sync with the menus.
 */
import { footerColumns, mainNav, type NavLink } from "@/data/nav";
import type { Crumb } from "@/components/sections/page-hero";

/** Header menus and the page each one's breadcrumb links to. */
const sections = {
  product: { label: "Product", href: "/features" },
  solutions: { label: "Solutions", href: "/solutions" },
  enterprise: { label: "Enterprise", href: "/enterprise" },
  resources: { label: "Resources", href: "/resources" },
  pricing: { label: "Pricing", href: "/pricing" },
} as const;

export type SectionId = keyof typeof sections;
type Hit = { section: SectionId; label: string };

/** Footer columns that sit under a header menu, used for pages the menus leave out. */
const footerSection: Record<string, SectionId> = { Features: "product", Solutions: "solutions", Resources: "resources" };

const megaMenus = mainNav.flatMap((item) => (item.kind === "mega" ? [{ ...item, id: item.id as SectionId }] : []));

function find(links: NavLink[], path: string) {
  return links.find((l) => l.href === path);
}

/** Where a path sits in the navigation, and the label the menu gives it. */
export function findInNav(path: string): Hit | undefined {
  // Menu groups first, then the promo cards and quick links, then the footer.
  for (const m of megaMenus) {
    const link = find(m.groups.flatMap((g) => g.links), path);
    if (link) return { section: m.id, label: link.label };
  }
  for (const m of megaMenus) {
    const card = m.featured.find((f) => f.href === path);
    if (card) return { section: m.id, label: card.eyebrow };
    const quick = find(m.quickLinks ?? [], path);
    if (quick) return { section: m.id, label: quick.label };
  }
  for (const col of footerColumns) {
    const id = footerSection[col.title];
    const link = id && find([...col.links, ...(col.sections?.flatMap((s) => s.links) ?? [])], path);
    if (id && link) return { section: id, label: link.label };
  }
  return undefined;
}

/**
 * Trail for a page: its menu, then its menu label, then any deeper crumbs.
 * `fallback` is used when the page is not in the menus.
 */
export function navCrumbs(path: string, fallback: Hit, extra: Crumb[] = []): Crumb[] {
  const top = Object.values(sections).find((s) => s.href === path);
  if (top) return extra.length ? [{ label: top.label, href: top.href }, ...extra] : [{ label: top.label }];
  const hit = findInNav(path) ?? fallback;
  const section = sections[hit.section];
  return [
    { label: section.label, href: section.href },
    extra.length ? { label: hit.label, href: path } : { label: hit.label },
    ...extra,
  ];
}

/** A menu's crumb on its own, for trails built by hand. */
export function sectionCrumb(id: SectionId): Crumb {
  return { label: sections[id].label, href: sections[id].href };
}
