import { Suspense } from "react";
import { helpArticles } from "@/data/help";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { HelpSearchBox, HelpSearchResults } from "@/components/sections/help-search";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Search the Help Centre",
  description: `Search every ${B} Help Centre article for step-by-step answers on workspaces, channels, huddles, administration, billing, security and integrations.`,
  path: "/help/search",
  noIndex: true,
});

export default function HelpSearchPage() {
  const items = helpArticles.map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    category: a.category,
    text: a.sections
      .flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? []), ...(s.steps ?? [])])
      .join(" ")
      .toLowerCase(),
  }));
  return (
    <section className="under-header bg-bg-soft pb-24">
      <div className="container-page max-w-4xl">
        <Breadcrumbs items={navCrumbs("/help", { section: "resources", label: "Help Centre" }, [{ label: "Search" }])} />
        <h1 className="mb-8 text-center text-display-md font-extrabold text-fg">Search the Help Centre</h1>
        <Suspense fallback={<HelpSearchBox className="mx-auto max-w-2xl" />}>
          <HelpSearchResults items={items} />
        </Suspense>
      </div>
    </section>
  );
}
