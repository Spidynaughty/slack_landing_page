import Link from "next/link";
import { ArrowRight, Bot, Check, Headphones, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { departmentLinks, industryLinks } from "@/data/nav";
import { featuredApps } from "@/data/integrations";
import { stories, testimonials } from "@/data/stories";
import { Mockup } from "@/components/mockups";
import { ChatMockup } from "@/components/mockups/chat-mockup";
import { Avatar } from "@/components/mockups/parts";
import { AppOrbit } from "@/components/sections/apps";
import { CTABand, IconCardGrid, LinkChips, LogoCloud, SplitFeature, StatsBand, StoryCard } from "@/components/sections/common";
import { FeatureTabs } from "@/components/sections/feature-tabs";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";

export const metadata = {
  ...buildMetadata({
    title: `${site.name} | AI-powered work platform for every team`,
    description: `${B} brings your people, apps, AI agents and knowledge together in channels, huddles, canvases and lists. Start free, scale to the enterprise.`,
    path: "/",
  }),
  title: { absolute: `${site.name} | AI-powered work platform for every team` },
};

function HeroVisual() {
  return (
    <div className="relative">
      <ChatMockup script="launch" />
      {/* floating accents */}
      <div className="absolute -top-6 -left-4 hidden animate-float items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-float md:flex lg:-left-10">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-mint text-white">
          <Headphones className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Huddle live</span>
          <span className="flex -space-x-1 pt-0.5">
            <Avatar who="priya" size="xs" className="rounded-full ring-2 ring-surface" />
            <Avatar who="marcus" size="xs" className="rounded-full ring-2 ring-surface" />
            <Avatar who="sofia" size="xs" className="rounded-full ring-2 ring-surface" />
          </span>
        </span>
      </div>
      <div className="absolute -right-3 bottom-24 hidden animate-float items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-float [animation-delay:-2s] md:flex lg:-right-8">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-sun text-deep">
          <Workflow className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Workflow ran</span>
          <span className="text-muted">Launch email approved</span>
        </span>
      </div>
      <div className="absolute -bottom-6 left-10 hidden animate-float items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-float [animation-delay:-4s] sm:flex">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-primary text-primary-fg">
          <Bot className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Agent finished 3 tasks</span>
          <span className="text-muted">Saved your team 2.5 hours</span>
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const tabs = [
    {
      id: "channels",
      label: "Channels",
      icon: "hash" as const,
      tone: "violet" as const,
      title: "Organized spaces for every project, team and topic",
      body: "Channels bring the right people and information together, so decisions happen in the open and anyone can catch up in seconds.",
      href: "/features/channels",
      cta: "Explore channels",
      visual: <Mockup kind="chat-channels" />,
    },
    {
      id: "huddles",
      label: "Huddles",
      icon: "headphones" as const,
      tone: "mint" as const,
      title: "Talk it out with audio, video and screen sharing",
      body: "Start a huddle from any conversation. Live captions, drawing and auto-generated notes mean nothing said gets lost.",
      href: "/features/huddles",
      cta: "Explore huddles",
      visual: <Mockup kind="huddle" />,
    },
    {
      id: "canvas",
      label: "Canvas",
      icon: "file" as const,
      tone: "sun" as const,
      title: "Docs that live right next to the conversation",
      body: "Write briefs, plans and runbooks in canvases embedded in channels, with checklists, tables and live collaboration built in.",
      href: "/features/canvas",
      cta: "Explore canvas",
      visual: <Mockup kind="canvas" />,
    },
    {
      id: "lists",
      label: "Lists",
      icon: "listChecks" as const,
      tone: "coral" as const,
      title: "Track projects and requests where the work happens",
      body: "Lists turn conversations into accountable plans with owners, statuses and due dates, plus board and table views.",
      href: "/features/task-list",
      cta: "Explore lists",
      visual: <Mockup kind="lists" />,
    },
    {
      id: "ai",
      label: "AI",
      icon: "sparkles" as const,
      tone: "pink" as const,
      title: "AI that already knows your work",
      body: "Recaps, thread summaries and answers grounded in your conversations, files and connected apps, with your permissions respected.",
      href: "/features/ai",
      cta: `Explore ${B} AI`,
      visual: <Mockup kind="ai" />,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-10 pb-20 sm:pt-16 md:pb-28">
        <GradientBlobs />
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-b opacity-70" />
        <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="flex flex-col items-start gap-7">
            <Link
              href="/whats-new"
              className="group inline-flex animate-fade-up items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pr-3 pl-1 text-sm font-semibold text-fg shadow-soft backdrop-blur hover:border-primary/40"
            >
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-fg">New</span>
              Agents now work in every channel
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <h1 className="animate-fade-up text-display-xl font-extrabold text-fg [animation-delay:80ms]">
              Where people, AI and work <span className="text-gradient">come together</span>
            </h1>
            <p className="max-w-xl animate-fade-up text-lead text-muted [animation-delay:160ms]">
              {B} is the work platform where conversations, apps and AI agents meet. Move faster in channels, decide
              together in huddles and automate the busywork in between.
            </p>
            <div className="flex animate-fade-up flex-wrap gap-3 [animation-delay:240ms]">
              <ButtonLink href="/get-started" size="lg" arrow>
                Get started free
              </ButtonLink>
              <ButtonLink href="/contact-sales" size="lg" variant="secondary">
                Request a demo
              </ButtonLink>
            </div>
            <ul className="flex animate-fade-up flex-wrap gap-x-5 gap-y-2 text-sm text-muted [animation-delay:320ms]">
              {["Free for small teams", "No credit card needed", "2,600+ integrations"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="size-4 text-mint-ink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-fade-up [animation-delay:200ms]">
            <HeroVisual />
          </div>
        </div>
      </section>

      <LogoCloud />

      {/* Feature tabs */}
      <Section>
        <SectionHeader
          eyebrow="One platform"
          title={
            <>
              Everything your team needs, <span className="text-gradient">all in one place</span>
            </>
          }
          subtitle={`Stop switching between a dozen tools. ${B} brings messaging, meetings, docs, projects and AI into a single home for work.`}
        />
        <FeatureTabs tabs={tabs} />
      </Section>

      <StatsBand
        stats={[
          { value: 750, suffix: "K+", label: "organizations work in " + B },
          { value: 37, suffix: "%", label: "faster decision making" },
          { value: 97, suffix: " min", label: "saved per person, per week" },
          { value: 2600, suffix: "+", label: "apps and agents to connect" },
        ]}
      />

      {/* AI section */}
      <section className="relative overflow-hidden bg-deep py-20 text-on-deep md:py-28" aria-labelledby="ai-heading">
        <GradientBlobs variant="deep" />
        <div className="container-page relative">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="flex flex-col items-start gap-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase">
                <Sparkles className="size-3.5" aria-hidden="true" /> {B} AI
              </p>
              <h2 id="ai-heading" className="text-display-lg font-extrabold text-white">
                AI with the context to actually help
              </h2>
              <p className="text-lead text-on-deep-muted">
                Because your conversations already live in {B}, our AI understands projects, people and decisions. It
                recaps what you missed, answers questions from your knowledge and hands routine work to agents.
              </p>
              <ul className="grid w-full gap-3 sm:grid-cols-3">
                {[
                  { icon: "sparkles" as const, t: "Recaps", d: "Daily digests of busy channels" },
                  { icon: "search" as const, t: "Answers", d: "Grounded in your workspace" },
                  { icon: "bot" as const, t: "Agents", d: "Finish tasks end to end" },
                ].map((f) => (
                  <li key={f.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon name={f.icon} className="size-5 text-sun" />
                    <p className="mt-3 font-semibold text-white">{f.t}</p>
                    <p className="text-sm text-on-deep-muted">{f.d}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/features/ai" variant="light" arrow>
                  Explore {B} AI
                </ButtonLink>
                <ButtonLink href="/ai-agents" variant="outline-light">
                  Meet the agents
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Mockup kind="ai" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Agents + workflow */}
      <Section>
        <div className="flex flex-col gap-24 md:gap-32">
          <SplitFeature
            eyebrow="Agents"
            tone="mint"
            title="A home for every agent, from any vendor"
            body={`Deploy ${B} agents, bring in partner agents or build your own. They work in channels alongside your team, follow your permissions and ask for approval when it matters.`}
            bullets={["Pre-built agents for service, sales, IT and HR", "Human approval steps for sensitive actions", "Full audit trail of every agent action"]}
            visual={<Mockup kind="agent" />}
            cta={{ label: "Explore the agentic platform", href: "/features/agentic-platform" }}
          />
          <SplitFeature
            reverse
            eyebrow="Automation"
            tone="sun"
            title="Automate the busywork without writing code"
            body="Workflow Builder turns repetitive requests, approvals and hand-offs into automations anyone can build in minutes, with AI steps included."
            bullets={["50+ ready-made workflow templates", "Triggers from forms, schedules, apps and emoji", "AI steps that classify, summarize and route"]}
            visual={<Mockup kind="workflow" />}
            cta={{ label: "Discover Workflow Builder", href: "/features/workflow-automation" }}
          />
        </div>
      </Section>

      {/* Integrations */}
      <Section bg="soft">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-6">
            <p className="inline-flex rounded-full bg-mint/15 px-3 py-1 text-xs font-bold tracking-[0.12em] text-mint-ink uppercase">
              Integrations
            </p>
            <h2 className="text-display-md font-bold text-fg">Bring every tool into the flow of work</h2>
            <p className="text-lead text-muted">
              Connect the apps your teams already rely on, from file storage and issue trackers to CRM and HR systems.
              Approve, update and search them all without leaving {B}.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/marketplace" arrow>
                Browse 2,600+ apps
              </ButtonLink>
              <ButtonLink href="/integrations" variant="secondary">
                How integrations work
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <AppOrbit apps={featuredApps} />
          </Reveal>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader
          eyebrow="Loved by teams"
          title="Teams do their best work here"
          subtitle="From startups to global enterprises, people use it every day to move work forward."
        />
        <TestimonialCarousel items={testimonials} />
      </Section>

      {/* Customer stories */}
      <Section bg="violet">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader align="left" className="!mb-0" eyebrow="Customer stories" title="Real results from real teams" />
          <ArrowLink href="/customer-stories">See all customer stories</ArrowLink>
        </div>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {stories.slice(0, 3).map((s) => (
            <StaggerItem key={s.slug} lift className="h-full">
              <StoryCard story={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Enterprise & security */}
      <Section>
        <SplitFeature
          eyebrow="Enterprise-grade"
          tone="sky"
          title="Security and scale you never have to think about"
          body="Data residency, Enterprise Key Management, granular admin controls and compliance with the standards your industry demands. Built for organizations with 500,000 people, priced for teams of five."
          bullets={["SOC 2 Type II, ISO 27001, HIPAA-ready, FedRAMP Moderate", "Bring-your-own encryption keys with EKM", "99.99% uptime SLA on Enterprise plans"]}
          visual={<Mockup kind="security" />}
          cta={{ label: "Visit the Trust Center", href: "/trust" }}
        />
        <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-3">
          {["SOC 2 Type II", "ISO 27001", "ISO 27018", "HIPAA", "FedRAMP Moderate", "GDPR", "CSA STAR"].map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg">
              <ShieldCheck className="size-4 text-mint-ink" aria-hidden="true" />
              {b}
            </span>
          ))}
        </Reveal>
      </Section>

      {/* Solutions teaser */}
      <Section bg="soft">
        <SectionHeader
          eyebrow="Solutions"
          title="Built for every team and industry"
          subtitle="Pre-built templates, workflows and agents for the way your team works."
        />
        <IconCardGrid
          columns={4}
          items={departmentLinks.map((l) => ({
            icon: l.icon ?? "grid",
            title: l.label,
            body: l.description ?? "",
            href: l.href,
            cta: "See the solution",
          }))}
        />
        <Reveal className="mt-12 text-center">
          <p className="mb-4 text-sm font-semibold text-muted">Or explore by industry</p>
          <LinkChips className="justify-center" links={industryLinks.map((l) => ({ label: l.label, href: l.href, icon: l.icon }))} />
        </Reveal>
      </Section>

      <CTABand
        title="Ready to bring your team together?"
        subtitle={`Join hundreds of thousands of organizations already working in ${B}. Free to start, no credit card required.`}
      />
    </>
  );
}
