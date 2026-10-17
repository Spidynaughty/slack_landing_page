import Link from "next/link";
import { ArrowRight, Check, Lock, PlayCircle, ShieldCheck } from "lucide-react";
import { apps } from "@/data/integrations";
import { plans } from "@/data/pricing";
import { stories } from "@/data/stories";
import { Mockup } from "@/components/mockups";
import { CTABand, StatsBand, StoryCard } from "@/components/sections/common";
import { AiPrompt } from "@/components/sections/home/ai-prompt";
import { ProductBento } from "@/components/sections/home/bento";
import { HeroShowcase } from "@/components/sections/home/hero-showcase";
import { StickySteps } from "@/components/sections/home/sticky-steps";
import { AppWall } from "@/components/sections/home/walls";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { RatingSummary, ReviewWall } from "@/components/sections/reviews";
import { ArrowLink, ButtonLink, buttonClasses } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { getSetting } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata = {
  ...buildMetadata({
    title: `${site.name} | AI-powered work platform for every team`,
    description: `${B} brings your people, apps, AI agents and knowledge together in channels, huddles, canvases and lists. Start free, scale to the enterprise.`,
    path: "/",
  }),
  title: { absolute: `${site.name} | AI-powered work platform for every team` },
};

export default async function Home() {
  // Editable in the admin under "Home page"
  const [announcement, hero, stats, cta] = await Promise.all([
    getSetting("announcement"),
    getSetting("hero"),
    getSetting("stats"),
    getSetting("cta"),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="under-header relative overflow-hidden pb-24 [--hero-pt:3rem] sm:[--hero-pt:4rem] md:pb-32">
        <div aria-hidden="true" className="absolute inset-0 bg-aurora" />
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-b opacity-50" />
        <div aria-hidden="true" className="absolute top-24 left-1/2 size-[42rem] -translate-x-1/2 animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,transparent,color-mix(in_srgb,var(--primary)_18%,transparent),transparent_40%)] blur-2xl" />
        <div className="container-page relative">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {announcement.enabled && announcement.text && (
              <Link
                href={announcement.href || "/whats-new"}
                className="group mb-7 inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pr-3 pl-1 text-sm font-semibold text-fg shadow-soft backdrop-blur hover:border-primary/40"
              >
                {announcement.label && (
                  <span className="relative inline-flex items-center gap-1.5 rounded-full bg-button-gradient px-2.5 py-0.5 text-xs font-bold text-white dark:text-deep">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                    </span>
                    {announcement.label}
                  </span>
                )}
                {announcement.text}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
            <h1 className="animate-fade-up text-display-xl font-extrabold tracking-tight text-fg [animation-delay:80ms]">
              {hero.headline} {hero.highlight && <span className="text-gradient">{hero.highlight}</span>}
            </h1>
            {hero.subtitle && <p className="mt-6 max-w-2xl animate-fade-up text-lead text-muted [animation-delay:160ms]">{hero.subtitle}</p>}
            <div className="mt-9 flex animate-fade-up flex-wrap justify-center gap-3 [animation-delay:240ms]">
              {hero.primaryLabel && (
                <ButtonLink href={hero.primaryHref || "/get-started"} size="lg" arrow>
                  {hero.primaryLabel}
                </ButtonLink>
              )}
              {hero.secondaryLabel && (
                <Link href={hero.secondaryHref || "/demo"} className={buttonClasses("secondary", "lg")}>
                  <PlayCircle className="size-5" aria-hidden="true" /> {hero.secondaryLabel}
                </Link>
              )}
            </div>
            {/* Only shown once real reviews are published in the admin */}
            <RatingSummary className="mt-8 animate-fade-up text-sm text-muted [animation-delay:320ms]" />
          </div>
          <div className="mt-16 animate-fade-up [animation-delay:200ms] md:mt-20">
            <HeroShowcase />
          </div>
        </div>
      </section>

      <LogoCloud />

      {/* Bento */}
      <Section>
        <SectionHeader
          eyebrow="One platform"
          title={
            <>
              Every way your team works, <span className="text-gradient">beautifully connected</span>
            </>
          }
          subtitle="Messaging, meetings, docs, projects and automation share one home, one search and one AI that understands it all."
        />
        <ProductBento />
      </Section>

      {/* Scroll story */}
      <Section bg="soft">
        <SectionHeader
          align="left"
          eyebrow="How it works"
          tone="pink"
          title={
            <>
              From scattered to <span className="text-gradient">shipped</span>, in four moves
            </>
          }
          subtitle="Follow a launch team through a single day and see how the pieces fit together."
        />
        <StickySteps
          steps={[
            { kicker: "Gather", title: "Bring everyone into one channel", body: "Teammates, partners and the apps you rely on, together in one searchable space.", visual: <Mockup kind="chat-channels" /> },
            { kicker: "Decide", title: "Talk it out in a huddle", body: "Jump from a thread into audio or video. AI notes post the decisions back automatically.", visual: <Mockup kind="huddle" /> },
            { kicker: "Document", title: "Turn decisions into plans", body: "Canvases and lists sit right beside the conversation, so nothing gets lost in a doc graveyard.", visual: <Mockup kind="canvas" /> },
            { kicker: "Automate", title: "Let agents handle the rest", body: "Workflows route approvals while agents draft replies and update records, with you in control.", visual: <Mockup kind="agent" /> },
          ]}
        />
      </Section>

      {/* AI */}
      <section className="grain relative overflow-hidden bg-deep py-24 text-on-deep md:py-32" aria-labelledby="ai-heading">
        <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-80" />
        <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-[0.12] invert" />
        <div className="container-page relative">
          <Reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center gap-5 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3.5 pl-2 text-[0.8rem] font-semibold">
              <span className="size-2 rounded-full bg-pink" /> {B} AI
            </p>
            <h2 id="ai-heading" className="text-display-lg font-extrabold tracking-tight text-white">
              Ask anything. <span className="text-gradient">Get answers you can trust.</span>
            </h2>
            <p className="text-lead text-on-deep-muted">
              Because your work already lives here, AI answers with real context and shows its sources. It never trains on your data.
            </p>
          </Reveal>
          <AiPrompt />
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/features/ai" variant="light" arrow>
              Explore {B} AI
            </ButtonLink>
            <ButtonLink href="/ai-agents" variant="outline-light">
              Meet the agents
            </ButtonLink>
          </div>
        </div>
      </section>

      {stats.length > 0 && <StatsBand stats={stats} />}

      {/* Integrations */}
      <section className="px-3 sm:px-4" aria-labelledby="apps-heading">
        <div className="grain relative mx-auto max-w-[80rem] overflow-hidden rounded-[2rem] bg-deep py-16 text-on-deep sm:rounded-[2.5rem] md:py-20">
          <div aria-hidden="true" className="absolute -bottom-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-30 blur-3xl" />
          <div className="relative mb-12 flex flex-col items-center gap-4 px-6 text-center">
            <h2 id="apps-heading" className="max-w-2xl text-display-md font-extrabold tracking-tight text-white">
              Plugs into the <span className="text-gradient">2,600+ tools</span> you already love
            </h2>
            <p className="max-w-xl text-on-deep-muted">Approve, update and search every app without switching tabs.</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/marketplace" variant="light" arrow>
                Browse the Marketplace
              </ButtonLink>
              <ButtonLink href="/integrations" variant="outline-light">
                How integrations work
              </ButtonLink>
            </div>
          </div>
          <div className="relative">
            <AppWall apps={apps} />
          </div>
        </div>
      </section>

      {/* Reviews: written in the admin, hidden until one is published */}
      <ReviewWall />

      {/* Stories */}
      <Section bg="soft">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader align="left" className="!mb-0" eyebrow="Customer stories" tone="coral" title="Real results from real teams" />
          <ArrowLink href="/customer-stories">See all customer stories</ArrowLink>
        </div>
        <Stagger className="grid gap-5 md:grid-cols-3">
          {stories.slice(0, 3).map((s) => (
            <StaggerItem key={s.slug} lift className="h-full">
              <StoryCard story={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Security */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3.5 pl-2 text-[0.8rem] font-semibold text-fg shadow-soft">
              <Lock className="size-3.5 text-mint-ink" aria-hidden="true" /> Enterprise-grade security
            </p>
            <h2 className="text-display-md font-extrabold tracking-tight text-fg">Locked down by default. Loved by IT.</h2>
            <p className="text-lead text-muted">
              Enterprise Key Management, data residency in 9 regions, granular admin controls and the certifications regulated industries require.
            </p>
            <div className="flex flex-wrap gap-2">
              {["SOC 2 Type II", "ISO 27001", "HIPAA", "FedRAMP Moderate", "GDPR"].map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full bg-tint-mint px-3 py-1.5 text-sm font-semibold text-mint-ink">
                  <ShieldCheck className="size-4" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>
            <ArrowLink href="/trust">Visit the Trust Center</ArrowLink>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-mint/20 blur-3xl" />
            <div className="relative">
              <Mockup kind="security" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section bg="soft">
        <SectionHeader eyebrow="Pricing" tone="sky" title="Start free. Upgrade when you're ready." subtitle="Simple per-user pricing, and you only pay for people who are active." />
        <Stagger className="grid gap-5 md:grid-cols-3">
          {plans
            .filter((p) => p.id !== "enterprise")
            .map((p) => (
              <StaggerItem key={p.id} lift className="h-full">
                <Link
                  href={`/pricing/${p.id === "business" ? "business-plus" : p.id}`}
                  className={cn(
                    "glow-card flex h-full flex-col rounded-[var(--radius-card)] border p-7 shadow-soft transition-shadow hover:shadow-card",
                    p.highlight ? "border-gradient" : "border-line bg-surface",
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-display text-xl font-bold text-fg">{p.name}</span>
                    {p.highlight && <span className="rounded-full bg-button-gradient px-2.5 py-0.5 text-xs font-bold text-white dark:text-deep">Popular</span>}
                  </span>
                  <span className="mt-4 font-display text-4xl font-extrabold tracking-tight text-fg">
                    ${p.annual}
                    <span className="ml-1 text-sm font-medium text-muted">/ user / mo</span>
                  </span>
                  <span className="mt-2 text-sm text-muted">{p.tagline}</span>
                  <ul className="mt-5 flex flex-col gap-2 text-sm">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-fg">
                        <Check className="mt-0.5 size-4 shrink-0 text-mint-ink" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
                    See {p.name} <ArrowRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
        </Stagger>
        <div className="mt-10 text-center">
          <ArrowLink href="/pricing">Compare all plans, including Enterprise</ArrowLink>
        </div>
      </Section>

      <CTABand
        title={
          <>
            {cta.title} {cta.highlight && <span className="text-gradient">{cta.highlight}</span>}
          </>
        }
        subtitle={cta.subtitle}
      />
    </>
  );
}
