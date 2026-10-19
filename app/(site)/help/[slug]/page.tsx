import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LifeBuoy } from "lucide-react";
import { getHelpArticle, helpArticles, helpCategories, type HelpArticle } from "@/data/help";
import { HelpfulWidget } from "@/components/forms/feedback";
import { ArticleTemplate } from "@/components/templates/article";
import { ButtonLink } from "@/components/ui/button";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";
import { formatDate, slugify } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return helpArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/help/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) return { title: "Help article not found" };
  return buildMetadata({ title: article.title, description: article.excerpt, path: `/help/${slug}`, type: "article" });
}

export default function HelpArticlePage({ params }: PageProps<"/help/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <HelpArticleContent params={params} />
    </Suspense>
  );
}

async function HelpArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();
  const cat = helpCategories.find((c) => c.name === article.category);
  const related = article.related
    .map((s) => getHelpArticle(s))
    .filter((a): a is HelpArticle => Boolean(a))
    .map((a) => ({ title: a.title, href: `/help/${a.slug}`, eyebrow: a.category, excerpt: a.excerpt, tone: cat?.tone ?? "violet" }));
  const sameCategory = helpArticles.filter((a) => a.category === article.category && a.slug !== article.slug);

  return (
    <ArticleTemplate
      crumbs={navCrumbs("/help", { section: "resources", label: "Help Centre" }, [{ label: article.category, href: `/help/categories/${slugify(article.category)}` }, { label: article.title }])}
      eyebrow={article.category}
      tone={cat?.tone ?? "violet"}
      title={article.title}
      excerpt={article.excerpt}
      date={`Updated ${formatDate(article.updatedAt, "long")}`}
      readMinutes={article.readMinutes}
      sections={article.sections}
      relatedTitle="Related articles"
      related={related}
      aside={
        <div className="flex flex-col gap-6">
          {sameCategory.length > 0 && (
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
              <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">In {article.category}</p>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {sameCategory.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/help/${a.slug}`} className="font-semibold text-fg hover:text-primary">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="rounded-3xl bg-tint-violet p-6">
            <LifeBuoy className="size-6 text-primary" aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-bold text-fg">Still need help?</p>
            <p className="mt-1 text-sm text-muted">Our support team is available around the clock.</p>
            <ButtonLink href="/help/requests/new" size="sm" className="mt-4">
              Contact support
            </ButtonLink>
          </div>
        </div>
      }
    >
      <HelpfulWidget />
    </ArticleTemplate>
  );
}
