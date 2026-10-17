import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus, Sparkles } from "lucide-react";
import type { CellValue, Plan } from "@/data/pricing";
import {
  annualSavings,
  formatPrice,
  getPlanPage,
  planById,
  planFaqs,
  planFeatureGroups,
  planPageHref,
  planPages,
  planPriceLabel,
} from "@/data/plan-pages";
import { CTABand, FAQ, IconCardGrid } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ReviewHighlight } from "@/components/sections/reviews";

export function generateStaticParams() {
  return planPages.map((p) => ({ plan: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pricing/[plan]">): Promise<Metadata> {
  const { plan: slug } = await params;
  const page = getPlanPage(slug);
  if (!page) return { title: "Plan not found" };
  return buildMetadata({ title: page.seo.title, description: page.seo.description, path: `/pricing/${page.slug}` });
}

export default function PlanPage({ params }: PageProps<"/pricing/[plan]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <PlanContent params={params} />
    </Suspense>
  );
}

/* ------------------------------------------------------------------ */

function PriceCard({ plan }: { plan: Plan }) {
  const t = toneStyles[plan.tone];
  const savings = annualSavings(plan);
  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-7 shadow-card sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className={cn("rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase", t.soft)}>{plan.name}</span>
        {plan.highlight && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-fg">
            <Sparkles className="size-3.5" aria-hidden="true" /> Most popular
          </span>
        )}
      </div>
      <p className="mt-4 text-muted">{plan.tagline}</p>

      {plan.monthly === null || plan.annual === null ? (
        <div className="mt-6">
          <p className="font-display text-4xl font-extrabold tracking-tight text-fg">Custom pricing</p>
          <p className="mt-2 text-sm text-muted">Volume and multi-year pricing for large organizations. Talk to sales for a quote.</p>
        </div>
      ) : plan.monthly === 0 ? (
        <div className="mt-6">
          <p className="flex items-end gap-1.5">
            <span className="font-display text-5xl font-extrabold tracking-tight text-fg tabular-nums">{formatPrice(0)}</span>
            <span className="pb-1.5 text-sm text-muted">USD per user / month</span>
          </p>
          <p className="mt-2 text-sm text-muted">Free forever. No credit card required.</p>
        </div>
      ) : (
        <div className="mt-6">
          <p className="flex items-end gap-1.5">
            <span className="font-display text-5xl font-extrabold tracking-tight text-fg tabular-nums">{formatPrice(plan.annual)}</span>
            <span className="pb-1.5 text-sm leading-tight text-muted">USD per user / month, billed annually</span>
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-surface-2 p-4">
              <dt className="text-xs font-semibold text-muted">Billed annually</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-fg tabular-nums">{formatPrice(plan.annual)}</dd>
            </div>
            <div className="rounded-2xl bg-surface-2 p-4">
              <dt className="text-xs font-semibold text-muted">Billed monthly</dt>
              <dd className="mt-1 font-display text-2xl font-bold text-fg tabular-nums">{formatPrice(plan.monthly)}</dd>
            </div>
          </dl>
          {savings !== null && savings > 0 && <p className="mt-3 text-sm font-semibold text-mint-ink">Save {savings}% with annual billing</p>}
        </div>
      )}

      <div className="mt-6 border-t border-line pt-6">
        {plan.includesFrom && <p className="text-sm font-semibold text-fg">{plan.includesFrom}</p>}
        <ul className={cn("flex flex-col gap-3 text-sm", plan.includesFrom && "mt-3")}>
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-muted">
              <Check className={cn("mt-0.5 size-4 shrink-0", t.ink)} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Value({ v }: { v: CellValue }) {
  if (v === true) {
    return (
      <span className="inline-flex text-mint-ink">
        <Check className="size-5" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (v === false) {
    return (
      <span className="inline-flex text-subtle">
        <Minus className="size-5" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-sm font-semibold text-fg">{v}</span>;
}

/* ------------------------------------------------------------------ */

async function PlanContent({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: slug } = await params;
  const page = getPlanPage(slug);
  if (!page) notFound();

  const { plan } = page;
  const groups = planFeatureGroups(plan.id);
  const others = planPages.filter((p) => p.slug !== page.slug).map((p) => planById(p.planId));
  const isEnterprise = plan.monthly === null;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing", href: "/pricing" }, { label: plan.name }]}
        eyebrow={`${plan.name} plan`}
        tone={plan.tone}
        title={<Highlight text={page.hero.title} highlight={page.hero.highlight} />}
        subtitle={page.hero.subtitle}
        primary={plan.cta}
        secondary={{ label: "Compare all plans", href: "/pricing#compare" }}
        visual={<PriceCard plan={plan} />}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeader align="left" eyebrow="Best for" tone={plan.tone} title={`Who ${plan.name} is built for`} subtitle={plan.tagline} className="!mb-0" />
          <Stagger as="ul" className="flex flex-col gap-4">
            {page.bestFor.map((b) => (
              <StaggerItem as="li" key={b} className="flex items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft">
                <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full", toneStyles[plan.tone].soft)}>
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="pt-1 text-fg">{b}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Section bg="soft">
        <SectionHeader eyebrow="Highlights" tone={plan.tone} title={`Why teams choose ${plan.name}`} />
        <IconCardGrid items={page.highlights} />
      </Section>

      <Section id="included">
        <SectionHeader
          eyebrow="Everything included"
          tone={plan.tone}
          title={`Everything in the ${plan.name} plan`}
          subtitle="Every feature and limit for this plan, straight from our full plan comparison."
        />
        <div className="grid items-start gap-5 md:grid-cols-2">
          {groups.map((g) => (
            <Reveal key={g.title} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
              <table className="w-full text-left">
                <caption className="border-b border-line bg-surface-2 px-5 py-4 text-left">
                  <h3 className="font-display text-lg font-bold text-fg">{g.title}</h3>
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="p-0">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="p-0">
                      <span className="sr-only">{plan.name}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {g.rows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row" className={cn("px-5 py-3.5 text-sm font-medium", r.value === false ? "text-muted" : "text-fg")}>
                        {r.label}
                      </th>
                      <td className="px-5 py-3.5 text-right">
                        <Value v={r.value} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section bg="soft">
        <SectionHeader eyebrow="Other plans" tone={plan.tone} title="Compare with other plans" subtitle="Every plan includes channels, huddles, clips and canvases. Here's how the others differ." />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <StaggerItem key={o.id} lift className="h-full">
              <Link
                href={planPageHref(o.id)}
                className="group/plan flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase", toneStyles[o.tone].soft)}>{o.name}</span>
                <p className="mt-4 flex items-end gap-1.5">
                  <span className="font-display text-3xl font-extrabold text-fg tabular-nums">{planPriceLabel(o)}</span>
                  {o.monthly !== null && <span className="pb-1 text-xs text-muted">per user / month</span>}
                </p>
                <p className="mt-3 text-sm text-muted">{o.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
                  Explore {o.name}
                  <ArrowRight className="size-4 transition-transform group-hover/plan:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
          <ArrowLink href="/pricing#compare">See every plan side by side</ArrowLink>
          <ArrowLink href="/pricing/nonprofits">Nonprofit discounts</ArrowLink>
          <ArrowLink href="/pricing/education">Education pricing</ArrowLink>
        </Reveal>
      </Section>

      <ReviewHighlight index={5} tone={plan.tone} />

      <FAQ items={planFaqs(page)} bg="soft" subtitle={`Questions about the ${plan.name} plan? Our team is happy to help.`} />

      <CTABand
        title={page.ctaBand.title}
        subtitle={page.ctaBand.subtitle}
        primary={plan.cta}
        secondary={isEnterprise ? { label: "See all plans", href: "/pricing" } : { label: "Talk to sales", href: "/contact-sales" }}
      />
    </>
  );
}
