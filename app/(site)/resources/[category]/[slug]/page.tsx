import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { collections, getCategory, getGuide, guides } from "@/data/guides";
import { LinkChips } from "@/components/sections/common";
import { ArticleTemplate } from "@/components/templates/article";
import { ButtonLink } from "@/components/ui/button";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { JsonLd } from "@/components/ui/json-ld";

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return guides.map((g) => ({ category: g.category, slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[category]/[slug]">): Promise<Metadata> {
  const { category, slug } = await params;
  const guide = getGuide(category, slug);
  if (!guide) return { title: "Guide not found" };
  return buildMetadata({
    title: guide.title,
    description: guide.excerpt,
    path: `/resources/${guide.category}/${guide.slug}`,
    type: "article",
    publishedTime: guide.updatedAt,
    modifiedTime: guide.updatedAt,
    authors: [guide.author.name],
    section: guide.type,
    readMinutes: guide.readMinutes,
  });
}

export default function GuidePage({ params }: PageProps<"/resources/[category]/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <GuideContent params={params} />
    </Suspense>
  );
}

async function GuideContent({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const guide = getGuide(category, slug);
  const cat = getCategory(category);
  if (!guide || !cat) notFound();

  const path = `/resources/${guide.category}/${guide.slug}`;
  const related = guides
    .filter((g) => !(g.category === guide.category && g.slug === guide.slug))
    .sort((a, b) => Number(b.category === guide.category) - Number(a.category === guide.category))
    .slice(0, 3)
    .map((g) => ({
      title: g.title,
      href: `/resources/${g.category}/${g.slug}`,
      eyebrow: getCategory(g.category)?.name ?? g.type,
      excerpt: g.excerpt,
      tone: g.tone,
    }));

  const inCollections = collections.filter((c) => c.items.some((i) => i.href === path));
  const t = toneStyles[guide.tone];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    dateModified: guide.updatedAt,
    author: { "@type": "Person", name: guide.author.name },
    publisher: { "@type": "Organization", name: B },
  };

  return (
    <>
      <ArticleTemplate
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: cat.name, href: `/resources/${cat.slug}` },
          { label: guide.title },
        ]}
        eyebrow={guide.type}
        tone={guide.tone}
        title={guide.title}
        excerpt={guide.excerpt}
        author={guide.author}
        date={`Updated ${formatDate(guide.updatedAt, "long")}`}
        readMinutes={guide.readMinutes}
        sections={guide.sections}
        related={related}
        relatedTitle="More guides"
        aside={
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
            <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Key takeaways</p>
            <ul className="mt-4 flex flex-col gap-3">
              {guide.takeaways.map((k) => (
                <li key={k} className="flex items-start gap-2.5 text-sm text-fg">
                  <span className={cn("mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full", t.soft)}>
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {k}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-6 font-display text-lg font-bold text-fg">Put it into practice</p>
            <p className="mt-1 text-sm text-muted">Try these ideas with your own team. {B} is free to start.</p>
            <ButtonLink href="/get-started" size="sm" className="mt-4" arrow>
              Get started
            </ButtonLink>
          </div>
        }
      >
        {inCollections.length > 0 && (
          <div className="mt-12 rounded-3xl border border-line bg-bg-soft p-6">
            <p className="font-display text-lg font-bold text-fg">Featured in</p>
            <p className="mt-1 text-sm text-muted">This guide is part of these curated collections.</p>
            <LinkChips className="mt-4" links={inCollections.map((c) => ({ label: c.title, href: `/resources/collections/${c.slug}`, icon: c.icon }))} />
          </div>
        )}
      </ArticleTemplate>
      <JsonLd data={jsonLd} />
    </>
  );
}
