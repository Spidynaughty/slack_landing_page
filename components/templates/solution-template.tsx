import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { getFeature, type Feature } from "@/data/features";
import { apps, type App } from "@/data/integrations";
import type { Solution } from "@/data/solutions";
import { Mockup } from "@/components/mockups";
import { AppCard } from "@/components/sections/apps";
import { CTABand, FAQ, IconCardGrid, QuoteBlock, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCard } from "@/components/templates/feature-template";
import { ArrowLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { Highlight } from "@/components/ui/highlight";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { B } from "@/lib/site";

export function SolutionCard({ solution }: { solution: Solution }) {
  const t = toneStyles[solution.tone];
  return (
    <Link
      href={`/solutions/${solution.slug}`}
      className="group/sc flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card"
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
        crumbs={[{ label: "Solutions", href: "/solutions" }, { label: solution.name }]}
        eyebrow={solution.hero.eyebrow}
        tone={solution.tone}
        title={<Highlight text={solution.hero.title} highlight={solution.hero.highlight} />}
        subtitle={solution.hero.subtitle}
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Talk to sales", href: "/contact-sales" }}
        visual={<Mockup kind={solution.hero.mockup} />}
      >
        <ul className="flex animate-fade-up flex-col gap-2 [animation-delay:320ms]" aria-label="Problems this solves">
          {solution.hero.painPoints.map((p) => (
            <li key={p} className="inline-flex items-center gap-2.5 text-sm text-muted">
              <span className="inline-flex size-5 items-center justify-center rounded-full bg-coral/15 text-coral-ink">
                <X className="size-3" aria-hidden="true" />
              </span>
              <span className="line-through decoration-coral/60 decoration-2">{p}</span>
            </li>
          ))}
        </ul>
      </PageHero>

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
      <section className="relative overflow-hidden bg-deep py-20 text-on-deep md:py-28" aria-labelledby="workflow-heading">
        <GradientBlobs variant="deep" />
        <div className="container-page relative grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-6">
            <p className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase">How it works</p>
            <h2 id="workflow-heading" className="text-display-md font-bold text-white">
              {solution.workflow.title}
            </h2>
            <p className="text-lead text-on-deep-muted">{solution.workflow.subtitle}</p>
            <ol className="mt-2 flex flex-col gap-5">
              {solution.workflow.steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="relative flex flex-col items-center">
                    <span className={cn("inline-flex size-11 items-center justify-center rounded-2xl", t.solid)}>
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    {i < solution.workflow.steps.length - 1 && <span className="mt-2 w-px flex-1 bg-white/15" aria-hidden="true" />}
                  </span>
                  <span className="pb-2">
                    <span className="text-xs font-bold tracking-widest text-on-deep-muted uppercase">Step {i + 1}</span>
                    <span className="block font-display text-lg font-bold text-white">{s.title}</span>
                    <span className="mt-1 block text-on-deep-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <Mockup kind={solution.workflow.mockup} />
          </Reveal>
        </div>
      </section>

      <Section>
        <QuoteBlock
          quote={solution.quote.text}
          name={solution.quote.name}
          role={`${solution.quote.role}, ${solution.quote.company}`}
          tone={solution.tone}
        />
        <div className="mt-10 text-center">
          <ArrowLink href="/customer-stories">Read more customer stories</ArrowLink>
        </div>
      </Section>

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

      {solution.faqs.length > 0 && <FAQ items={solution.faqs} bg="soft" />}

      <CTABand title={solution.cta.title} subtitle={solution.cta.subtitle} />
    </>
  );
}
