import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDemo } from "@/data/demos";
import { getFeature, type Feature } from "@/data/features";
import { Mockup } from "@/components/mockups";
import { CTABand, FAQ, IconCardGrid, StatsBand } from "@/components/sections/common";
import { StickySteps } from "@/components/sections/home/sticky-steps";
import { PageHero, type Crumb } from "@/components/sections/page-hero";
import { Highlight } from "@/components/ui/highlight";
import { Icon } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export function FeatureCard({ feature }: { feature: Feature }) {
  const t = toneStyles[feature.tone];
  return (
    <Link
      href={feature.href}
      className="glow-card group/fc flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
    >
      <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.solid)}>
        <Icon name={feature.icon} className="size-6" />
      </span>
      <span className={cn("mt-5 text-xs font-bold tracking-[0.12em] uppercase", t.ink)}>{feature.category}</span>
      <h3 className="mt-1 font-display text-xl font-bold text-fg">{feature.name}</h3>
      <p className="mt-2 flex-1 text-muted">{feature.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn more
        <ArrowRight className="size-4 transition-transform group-hover/fc:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Template A: hero + mockup, alternating sections, use cases, related features, FAQ, CTA. */
export function FeatureTemplate({ feature, crumbs }: { feature: Feature; crumbs?: Crumb[] }) {
  const related = feature.related.map((s) => getFeature(s)).filter((f): f is Feature => Boolean(f));
  const demo = getDemo(feature.slug);
  return (
    <>
      <PageHero
        crumbs={crumbs ?? navCrumbs(feature.href, { section: "product", label: feature.name })}
        eyebrow={feature.hero.eyebrow}
        tone={feature.tone}
        title={<Highlight text={feature.hero.title} highlight={feature.hero.highlight} />}
        subtitle={feature.hero.subtitle}
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Watch demo", href: demo?.path ?? "/demo" }}
        visual={<Mockup kind={feature.hero.mockup} />}
      />

      <StatsBand stats={feature.stats} />

      <Section bg="soft">
        <SectionHeader align="left" eyebrow={`How ${feature.name} works`} tone={feature.tone} title={<>Built for the way <span className="text-gradient">your team works</span></>} />
        <StickySteps
          steps={feature.sections.map((s) => ({ kicker: s.eyebrow, title: s.title, body: s.body, bullets: s.bullets, visual: <Mockup kind={s.mockup} /> }))}
        />
      </Section>

      <Section>
        <SectionHeader eyebrow="Use cases" tone={feature.tone} title={`How teams use ${feature.name}`} />
        <IconCardGrid items={feature.useCases.map((u) => ({ ...u, tone: feature.tone }))} />
      </Section>

      {related.length > 0 && (
        <Section bg="soft">
          <SectionHeader eyebrow="Related" title="Works even better together" subtitle="Pair it with these capabilities to get more done." />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug} lift className="h-full">
                <FeatureCard feature={r} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <FAQ items={feature.faqs} subtitle={`Everything you need to know about ${feature.name}.`} />

      <CTABand title={feature.cta.title} subtitle={feature.cta.subtitle} />
    </>
  );
}
