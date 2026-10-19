import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { collections, getCollection, resourceCategories } from "@/data/guides";
import { CTABand, LinkChips } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Icon, type IconName } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, toneAt } from "@/lib/tones";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, IconName> = {
  Guide: "book",
  Checklist: "listChecks",
  Article: "news",
  "E-book": "library",
  Report: "chart",
  Explainer: "compass",
  Solution: "briefcase",
  Feature: "sparkles",
  Product: "layers",
  "Customer story": "quote",
  Templates: "template",
  Tour: "play",
  Demo: "play",
  Event: "calendar",
};

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/collections/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return { title: "Collection not found" };
  return buildMetadata({ title: c.title, description: c.description, path: `/resources/collections/${c.slug}` });
}

export default function CollectionPage({ params }: PageProps<"/resources/collections/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <CollectionContent params={params} />
    </Suspense>
  );
}

async function CollectionContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) notFound();

  const t = toneStyles[c.tone];
  const others = collections.filter((o) => o.slug !== c.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: c.title }]}
        layout="center"
        tone={c.tone}
        eyebrow="Curated collection"
        title={c.title}
        subtitle={c.description}
        note={`${c.items.length} hand-picked resources`}
        className="!pb-12"
      >
        <span className={cn("inline-flex size-14 animate-fade-up items-center justify-center rounded-2xl [animation-delay:160ms]", t.solid)}>
          <Icon name={c.icon} className="size-7" />
        </span>
      </PageHero>

      <Section className="!pt-6" labelledBy="collection-items">
        <h2 id="collection-items" className="sr-only">
          Resources in this collection
        </h2>
        <Stagger className="mx-auto max-w-4xl">
          <ol className="flex flex-col gap-4">
            {c.items.map((item, i) => {
              const it = toneStyles[toneAt(i)];
              return (
                <StaggerItem as="li" key={item.href}>
                  <Link
                    href={item.href}
                    className="group/item flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card sm:gap-6 sm:p-6"
                  >
                    <span className="w-10 shrink-0 font-display text-3xl font-extrabold text-gradient sm:w-14 sm:text-4xl" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("hidden size-12 shrink-0 items-center justify-center rounded-2xl sm:inline-flex", it.soft)}>
                      <Icon name={typeIcon[item.type] ?? "file"} className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("text-xs font-bold tracking-[0.12em] uppercase", it.ink)}>{item.type}</span>
                      <span className="mt-1 block font-display text-lg leading-snug font-bold text-fg">{item.title}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover/item:translate-x-1" aria-hidden="true" />
                  </Link>
                </StaggerItem>
              );
            })}
          </ol>
        </Stagger>
      </Section>

      <Section bg="soft" labelledBy="more-collections">
        <SectionHeader id="more-collections" eyebrow="Keep exploring" title="More collections" />
        <Stagger className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {others.map((o) => {
            const ot = toneStyles[o.tone];
            return (
              <StaggerItem key={o.slug} lift className="h-full">
                <Link
                  href={`/resources/collections/${o.slug}`}
                  className="group/col flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
                >
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", ot.soft)}>
                    <Icon name={o.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{o.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{o.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    View {o.items.length} resources
                    <ArrowRight className="size-4 transition-transform group-hover/col:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <div className="mt-14 flex flex-col items-center gap-5 text-center">
          <h3 className="font-display text-xl font-bold text-fg">Browse guides by topic</h3>
          <LinkChips
            className="justify-center"
            links={[
              ...resourceCategories.map((cat) => ({ label: cat.name, href: `/resources/${cat.slug}`, icon: cat.icon })),
              { label: "All resources", href: "/resources", icon: "library" as const },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title={`See how ${B} fits your team`}
        subtitle="Get a tailored walkthrough from a product specialist, or start free and explore at your own pace."
        primary={{ label: "Talk to sales", href: "/contact-sales" }}
        secondary={{ label: "Get started free", href: "/get-started" }}
      />
    </>
  );
}
