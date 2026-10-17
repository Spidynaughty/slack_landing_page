import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { getFeature, type Feature } from "@/data/features";
import { apps, type App } from "@/data/integrations";
import type { Solution } from "@/data/solutions";
import { Mockup } from "@/components/mockups";
import { AppCard } from "@/components/sections/apps";
import { CTABand, FAQ, IconCardGrid, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCard } from "@/components/templates/feature-template";
import { ArrowLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";
import { ReviewHighlight } from "@/components/sections/reviews";

export function SolutionCard({ solution }: { solution: Solution }) {
  const t = toneStyles[solution.tone];
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="glow-card group/sc flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card"
    >
      <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl", t.soft)}>
        <Icon name={solution.icon} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2 font-display text-lg font-bold text-fg">
          {solution.name}
          <ArrowRight className="size-4 shrink-0 text-subtle transition-transform group-hover/sc:translate-x-1 group-hover/sc:text-primary" aria-hidden="true" />
        </span>
        <span className="mt-1 block text-sm text-muted">{solution.summary}</span>
      </span>
    </Link>
  );
}

function benefitsTitle(s: Solution) {
  if (s.kind === "industry") return `Built for ${s.name.toLowerCase()}`;
  if (s.kind === "use-case") return `${s.name}, finally simple`;
  const team = s.name === "IT" ? "IT" : s.name.toLowerCase();
  return `Why ${team} teams switch to ${B}`;
}

/** Template B: pain-point hero, benefits, workflow, quote, recommended features & integrations, CTA. */
export function SolutionTemplate({ solution }: { solution: Solution }) {
  const t = toneStyles[solution.tone];
  const feats = solution.features.map((s) => getFeature(s)).filter((f): f is Feature => Boolean(f));
  const integrations = solution.integrations
    .map((s) => apps.find((a) => a.slug === s))
    .filter((a): a is App => Boolean(a));

  return (
    <>
      <PageHero
        crumbs={navCrumbs(`/solutions/${solution.slug}`, { section: "solutions", label: solution.name })}
        eyebrow={solution.hero.eyebrow}
        tone={solution.tone}
        title={<Highlight text={solution.hero.title} highlight={solution.hero.highlight} />}
        subtitle={solution.hero.subtitle}
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Talk to sales", href: "/contact-sales" }}
        visual={<Mockup kind={solution.hero.mockup} />}
      />

      {/* Before vs after */}
      <Section className="!pb-0">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-[2rem] border border-dashed border-line-strong bg-bg-soft p-7 sm:p-9">
            <p className="text-xs font-bold tracking-[0.16em] text-subtle uppercase">Before</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-fg">Work without {B}</h2>
            <ul className="mt-6 flex flex-col gap-3" aria-label="Problems this solves">
              {solution.hero.painPoints.map((p) => (
                <li key={p} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3 text-muted shadow-soft">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral-ink">
                    <X className="size-4" aria-hidden="true" />
                  </span>
                  <span className="line-through decoration-coral/50 decoration-2">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="border-gradient relative overflow-hidden rounded-[2rem] p-7 shadow-card sm:p-9">
            <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-70" />
            <p className="relative text-xs font-bold tracking-[0.16em] text-primary uppercase">After</p>
            <h2 className="relative mt-2 font-display text-2xl font-bold text-fg">
              Work with <span className="text-gradient">{B}</span>
            </h2>
            <ul className="relative mt-6 flex flex-col gap-3">
              {solution.benefits.slice(0, 3).map((b) => (
                <li key={b.title} className="flex items-center gap-3 rounded-xl bg-surface/90 px-4 py-3 font-medium text-fg shadow-soft">
                  <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                    <Check className="size-4" aria-hidden="true" />
                  </span>
                  {b.title}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <StatsBand stats={solution.stats} />

      <Section>
        <SectionHeader
          eyebrow="Benefits"
          tone={solution.tone}
          title={benefitsTitle(solution)}
          subtitle={solution.summary}
        />
        <IconCardGrid items={solution.benefits} />
      </Section>

      {/* Workflow */}
      <section className="px-3 sm:px-4" aria-labelledby="workflow-heading">
        <div className="grain relative mx-auto max-w-[80rem] overflow-hidden rounded-[2rem] bg-deep px-5 py-16 text-on-deep sm:rounded-[2.5rem] sm:px-10 md:py-20">
          <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-80" />
          <Reveal className="relative mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3.5 pl-2 text-[0.8rem] font-semibold">
              <span className="size-2 rounded-full bg-pink" /> How it works
            </p>
            <h2 id="workflow-heading" className="text-display-md font-extrabold tracking-tight text-white">
              {solution.workflow.title}
            </h2>
            <p className="text-lead text-on-deep-muted">{solution.workflow.subtitle}</p>
          </Reveal>
          <Stagger as="ol" className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {solution.workflow.steps.map((s, i) => (
              <StaggerItem as="li" key={s.title} className="relative h-full">
                <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                  <div className="flex items-center justify-between">
                    <span className={cn("inline-flex size-11 items-center justify-center rounded-2xl", t.solid)}>
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span className="font-mono text-sm font-semibold text-on-deep-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-on-deep-muted">{s.body}</p>
                </div>
                {i < solution.workflow.steps.length - 1 && (
                  <span aria-hidden="true" className="absolute top-1/2 -right-3 z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full bg-white text-deep lg:inline-flex">
                    <ArrowRight className="size-3.5" />
                  </span>
                )}
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="relative mx-auto mt-12 max-w-4xl">
            <Mockup kind={solution.workflow.mockup} />
          </Reveal>
        </div>
      </section>

      <ReviewHighlight
        index={8}
        tone={solution.tone}
        footer={
          <div className="mt-10 text-center">
            <ArrowLink href="/customer-stories">Read more customer stories</ArrowLink>
          </div>
        }
      />

      {feats.length > 0 && (
        <Section bg="soft">
          <SectionHeader eyebrow="Recommended" title="Features built for this work" />
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {feats.map((f) => (
              <StaggerItem key={f.slug} lift className="h-full">
                <FeatureCard feature={f} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      {integrations.length > 0 && (
        <Section>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeader align="left" className="!mb-0" eyebrow="Integrations" title="Connect the tools you already use" />
            <ArrowLink href="/marketplace">Browse the Marketplace</ArrowLink>
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {integrations.map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <AppCard app={a} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      {solution.faqs.length > 0 && <FAQ items={solution.faqs} />}

      <CTABand title={solution.cta.title} subtitle={solution.cta.subtitle} />
    </>
  );
}
