import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, LifeBuoy } from "lucide-react";
import { helpArticles, helpCategories } from "@/data/help";
import { LinkChips } from "@/components/sections/common";
import { HelpSearchBox } from "@/components/sections/help-search";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate, slugify } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

const findCategory = (slug: string) => helpCategories.find((c) => slugify(c.name) === slug);

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return helpCategories.map((c) => ({ slug: slugify(c.name) }));
}

export async function generateMetadata({ params }: PageProps<"/help/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = findCategory(slug);
  if (!cat) return { title: "Help category not found" };
  return buildMetadata({
    title: `${cat.name}: Help Centre articles`,
    description: `Step-by-step ${B} Help Centre guides for ${cat.name.toLowerCase()}. ${cat.description}`,
    path: `/help/categories/${slug}`,
  });
}

export default function HelpCategoryPage({ params }: PageProps<"/help/categories/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <HelpCategoryContent params={params} />
    </Suspense>
  );
}

async function HelpCategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = findCategory(slug);
  if (!cat) notFound();
  const articles = helpArticles.filter((a) => a.category === cat.name);
  const t = toneStyles[cat.tone];

  return (
    <>
      <PageHero
        crumbs={navCrumbs("/help", { section: "resources", label: "Help Centre" }, [{ label: cat.name }])}
        layout="center"
        eyebrow="Help Centre"
        tone={cat.tone}
        title={cat.name}
        subtitle={cat.description}
        className="!pb-10"
      >
        <HelpSearchBox className="mt-2 max-w-xl animate-fade-up [animation-delay:120ms]" />
      </PageHero>
      <Section className="!pt-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
          <div>
            <p className="mb-5 text-sm text-muted">
              {articles.length} article{articles.length === 1 ? "" : "s"} in {cat.name}
            </p>
            <Stagger as="ul" className="flex flex-col gap-4">
              {articles.map((a) => (
                <StaggerItem as="li" key={a.slug}>
                  <Link
                    href={`/help/${a.slug}`}
                    className="group flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card"
                  >
                    <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl", t.soft)}>
                      <Icon name={cat.icon} className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-bold text-fg">{a.title}</span>
                      <span className="mt-1 block text-sm text-muted">{a.excerpt}</span>
                      <span className="mt-2 block text-xs text-subtle">
                        Updated {formatDate(a.updatedAt)} · {a.readMinutes} min read
                      </span>
                    </span>
                    <ArrowRight className="mt-1 size-5 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl bg-tint-violet p-6">
              <LifeBuoy className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 font-display text-lg font-bold text-fg">Can&apos;t find an answer?</p>
              <p className="mt-1 text-sm text-muted">Our support team replies around the clock on paid plans.</p>
              <ButtonLink href="/help/requests/new" size="sm" className="mt-4">
                Contact support
              </ButtonLink>
            </div>
          </aside>
        </div>
      </Section>
      <Section bg="soft" className="!py-14">
        <h2 className="mb-6 text-center font-display text-xl font-bold text-fg">Browse other topics</h2>
        <LinkChips
          className="justify-center"
          links={helpCategories.filter((c) => c.name !== cat.name).map((c) => ({ label: c.name, href: `/help/categories/${slugify(c.name)}`, icon: c.icon }))}
        />
      </Section>
    </>
  );
}
