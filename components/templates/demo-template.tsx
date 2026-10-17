import type { FeatureDemo } from "@/data/demos";
import { LeadForm } from "@/components/forms/lead-form";
import { Mockup } from "@/components/mockups";
import { CTABand, IconCardGrid } from "@/components/sections/common";
import { DemoPlayer } from "@/components/sections/demo-player";
import { PageHero } from "@/components/sections/page-hero";
import { Highlight } from "@/components/ui/highlight";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";

/** Feature-specific demo page: simulated video, highlights and a live-demo form. */
export function DemoTemplate({ demo }: { demo: FeatureDemo }) {
  return (
    <>
      <PageHero
        crumbs={[{ label: demo.featureName, href: demo.featureHref }, { label: "Demo" }]}
        layout="center"
        eyebrow={`${demo.featureName} demo`}
        tone={demo.tone}
        title={<Highlight text={demo.title} highlight={demo.highlight} />}
        subtitle={demo.subtitle}
        className="!pb-8"
      />
      <Section className="!pt-4">
        <DemoPlayer
          chapters={demo.chapters.map((c) => ({
            title: c.title,
            caption: c.caption,
            seconds: c.seconds,
            visual: <Mockup kind={c.mockup} />,
          }))}
        />
      </Section>
      <Section bg="soft">
        <SectionHeader eyebrow="Why teams love it" tone={demo.tone} title={`What makes ${demo.featureName} different`} />
        <IconCardGrid items={demo.highlights.map((h) => ({ ...h, tone: demo.tone }))} />
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <SectionHeader align="left" className="!mb-0" eyebrow="Live walkthrough" tone={demo.tone} title="See it with your own workflows" />
            <p className="text-lead text-muted">
              Book a 30-minute session with a product specialist and we&apos;ll show {demo.featureName} working on the problems your team cares about.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              submitLabel="Book a live demo"
              successTitle="Your demo request is in"
              successBody="A product specialist will email you within one business day with times that work."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "company", label: "Company", required: true, autoComplete: "organization", half: true },
                { name: "size", label: "Team size", type: "select", options: ["1–50", "51–250", "251–1,000", "1,000+"], half: true },
              ]}
            />
          </Reveal>
        </div>
      </Section>
      <CTABand
        title={`Try ${demo.featureName} with your team`}
        subtitle="Start free, or explore the full feature overview first."
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: `Explore ${demo.featureName}`, href: demo.featureHref }}
      />
    </>
  );
}
