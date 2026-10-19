import { Check, X } from "lucide-react";
import { applicationFields, discountedPrice, formatPrice, planById, planPageHref, programs, type Program } from "@/data/plan-pages";
import { LeadForm } from "@/components/forms/lead-form";
import { CTABand, FAQ, IconCardGrid } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";

const program = programs.nonprofits;

export const metadata = buildMetadata({ title: program.seo.title, description: program.seo.description, path: program.path });

function OfferCard({ program }: { program: Program }) {
  const t = toneStyles[program.tone];
  return (
    <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-7 shadow-card sm:p-8">
      <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">{program.name} pricing</p>
      <ul className="mt-2 divide-y divide-line">
        {program.offers.map((o) => {
          const plan = planById(o.planId);
          const regular = plan.annual ?? plan.monthly ?? 0;
          return (
            <li key={o.planId} className="py-5 last:pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-lg font-bold text-fg">{plan.name}</span>
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold", t.soft)}>{o.percentOff === 100 ? "Free" : `${o.percentOff}% off`}</span>
              </div>
              <p className="mt-2 flex flex-wrap items-end gap-x-2 gap-y-1">
                <span className="font-display text-4xl font-extrabold tracking-tight text-fg tabular-nums">
                  <span className="sr-only">Program price </span>
                  {formatPrice(discountedPrice(regular, o.percentOff))}
                </span>
                <s className="pb-1 text-sm text-subtle tabular-nums">
                  <span className="sr-only">Regular price </span>
                  {formatPrice(regular)}
                </s>
                <span className="pb-1 text-sm text-muted">USD per user / month</span>
              </p>
              <p className="mt-2 text-sm text-muted">{o.note}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 border-t border-line pt-4 text-xs text-subtle">Prices shown with annual billing. Discounts also apply to monthly billing.</p>
    </div>
  );
}

function ProgramView({ program }: { program: Program }) {
  const t = toneStyles[program.tone];
  const applyHref = `${program.path}#apply`;
  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing", href: "/pricing" }, { label: program.name }]}
        eyebrow={program.hero.eyebrow}
        tone={program.tone}
        title={<Highlight text={program.hero.title} highlight={program.hero.highlight} />}
        subtitle={program.hero.subtitle}
        primary={{ label: "Apply now", href: applyHref }}
        secondary={{ label: "See all plans", href: "/pricing" }}
        visual={<OfferCard program={program} />}
      />

      <Section>
        <SectionHeader eyebrow="Eligibility" tone={program.tone} title="Who can apply" subtitle="Check these criteria before you apply. We review every application individually." />
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1.2fr_1fr]">
          <Reveal className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft md:p-8">
            <h3 className="font-display text-xl font-bold text-fg">Eligible organizations</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {program.eligibility.map((e) => (
                <li key={e} className="flex items-start gap-3 text-fg">
                  <span className={cn("mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full", t.soft)}>
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {e}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[var(--radius-card)] border border-line bg-surface-2 p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-fg">Not eligible</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {program.notEligible.map((e) => (
                <li key={e} className="flex items-start gap-3 text-muted">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-3 text-subtle">
                    <X className="size-3.5" aria-hidden="true" />
                  </span>
                  {e}
                </li>
              ))}
            </ul>
            <ArrowLink href={program.related.href} className="mt-6 text-sm">
              {program.related.label}
            </ArrowLink>
          </Reveal>
        </div>
      </Section>

      <Section bg="soft">
        <SectionHeader eyebrow="What's included" tone={program.tone} title="Everything your team needs, for less" />
        <IconCardGrid columns={4} items={program.included} />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {program.offers.map((o, i) => {
            const plan = planById(o.planId);
            return (
              <Reveal key={o.planId} delay={i * 0.08} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <h3 className="font-display text-lg font-bold text-fg">What {plan.name} includes</h3>
                {plan.includesFrom && <p className="mt-1 text-sm text-muted">{plan.includesFrom}</p>}
                <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-fg">
                      <Check className={cn("mt-0.5 size-4 shrink-0", toneStyles[plan.tone].ink)} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <ArrowLink href={planPageHref(o.planId)} className="mt-5 text-sm">
                  See everything in {plan.name}
                </ArrowLink>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="How to apply" tone={program.tone} title="From application to approval" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {program.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <span aria-hidden="true" className={cn("inline-flex size-10 items-center justify-center rounded-full font-display text-lg font-bold", t.solid)}>
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Section id="apply" bg="soft">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader align="left" eyebrow="Apply" tone={program.tone} title={program.form.title} subtitle={program.form.intro} className="!mb-8" />
            <Reveal>
              <h3 className="text-sm font-bold tracking-[0.12em] text-subtle uppercase">What you&apos;ll need</h3>
              <ul className="mt-4 flex flex-col gap-3">
                {program.form.needs.map((n) => (
                  <li key={n} className="flex items-start gap-3 text-fg">
                    <Check className={cn("mt-0.5 size-5 shrink-0", t.ink)} aria-hidden="true" />
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              formName="Nonprofit pricing application"
              fields={applicationFields(program)}
              submitLabel={program.form.submitLabel}
              successTitle={program.form.successTitle}
              successBody={program.form.successBody}
            />
          </Reveal>
        </div>
      </Section>

      <FAQ items={program.faqs} subtitle="Still have questions? Our team is happy to help." />

      <CTABand
        title={program.cta.title}
        subtitle={program.cta.subtitle}
        primary={{ label: "Apply now", href: applyHref }}
        secondary={{ label: "Talk to sales", href: "/contact-sales" }}
      />
    </>
  );
}

export default function NonprofitsPage() {
  return <ProgramView program={program} />;
}
