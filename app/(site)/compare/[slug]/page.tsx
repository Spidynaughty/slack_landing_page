import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Check, Minus } from "lucide-react";
import { comparisons, getComparison } from "@/data/compare";
import { Mockup } from "@/components/mockups";
import { CTABand, FAQ, IconCardGrid, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Highlight } from "@/components/ui/highlight";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return { title: "Comparison not found" };
  return buildMetadata({ title: c.seo.title, description: c.seo.description, path: `/compare/${slug}` });
}

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <Check className="mx-auto size-5 text-mint-ink" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto size-5 text-subtle" aria-label="Not included" />;
  return <span className="text-sm font-medium text-fg">{v}</span>;
}

export default function ComparePage({ params }: PageProps<"/compare/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <CompareContent params={params} />
    </Suspense>
  );
}

async function CompareContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  return (
    <>
      <PageHero
        crumbs={navCrumbs(`/compare/${c.slug}`, { section: "resources", label: c.name })}
        eyebrow={c.hero.eyebrow}
        title={<Highlight text={c.hero.title} highlight={c.hero.highlight} />}
        subtitle={c.hero.subtitle}
        primary={{ label: "Try it free", href: "/get-started" }}
        secondary={{ label: "Talk to sales", href: "/contact-sales" }}
        visual={<Mockup kind={c.hero.mockup} />}
      />
      <StatsBand stats={c.stats} />
      <Section>
        <SectionHeader eyebrow="Why switch" title={`What makes ${B} different`} />
        <IconCardGrid columns={4} items={c.reasons} />
      </Section>
      <Section bg="soft">
        <SectionHeader eyebrow="Side by side" title={`${B} vs ${c.competitor}`} subtitle="A quick look at how the experience compares for everyday work." />
        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-line bg-surface shadow-card">
          <table className="w-full text-left">
            <caption className="sr-only">
              Feature comparison between {B} and {c.competitor}
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th scope="col" className="p-4 text-sm font-semibold text-muted sm:p-5">
                  Capability
                </th>
                <th scope="col" className="w-28 p-4 text-center font-display font-bold text-primary sm:w-40 sm:p-5">
                  {B}
                </th>
                <th scope="col" className="w-28 p-4 text-center font-display font-bold text-fg sm:w-40 sm:p-5">
                  {c.competitor}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {c.table.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="p-4 text-sm font-medium text-fg sm:p-5 sm:text-base">
                    {r.label}
                  </th>
                  <td className="bg-primary/5 p-4 text-center sm:p-5">
                    <Cell v={r.us} />
                  </td>
                  <td className="p-4 text-center sm:p-5">
                    <Cell v={r.them} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>
      <Section>
        <SectionHeader eyebrow="Making the move" title="Switching is easier than you think" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {c.switching.map((s, i) => (
            <StaggerItem key={s.title} className="rounded-3xl border border-line bg-surface p-7 shadow-soft">
              <span className="font-display text-5xl font-extrabold text-gradient">0{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold text-fg">{s.title}</h3>
              <p className="mt-2 text-muted">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <FAQ items={c.faqs} bg="soft" />
      <CTABand title={`See why teams switch to ${B}`} subtitle="Start free in minutes, or let us walk you through a tailored demo." />
    </>
  );
}
