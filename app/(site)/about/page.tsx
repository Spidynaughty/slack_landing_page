import { MapPin } from "lucide-react";
import { CTABand, IconCardGrid, StatsBand, type IconCard } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneAt, toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { leaders } from "./_components/leadership";

export const metadata = buildMetadata({
  title: "About us: our story, mission and team",
  description: `Learn how ${B} grew from a six-person studio into a work platform for 750,000 organizations, and meet the people, values and offices behind it.`,
  path: "/about",
});

const values: IconCard[] = [
  {
    icon: "shieldCheck",
    title: "Earn trust every day",
    body: "Customers hand us their most important conversations. We protect them as if they were our own, and we say so plainly when we get something wrong.",
  },
  {
    icon: "pen",
    title: "Craft with care",
    body: "Small details add up to how work feels. We sweat the empty states, the error messages and the keyboard shortcuts as much as the big launches.",
  },
  {
    icon: "lightbulb",
    title: "Make it simple",
    body: "Complexity is easy to add and hard to remove. We look for the version of an idea that a new teammate understands in seconds.",
  },
  {
    icon: "messages",
    title: "Default to open",
    body: "We work in public channels, share context generously and write things down, so anyone can find the why behind a decision.",
  },
  {
    icon: "heart",
    title: "Be generous",
    body: "We assume good intent, give credit freely and make time to help, whether it is a customer, a partner or the person who joined yesterday.",
  },
  {
    icon: "target",
    title: "Own the outcome",
    body: "Shipping is the start, not the finish. We measure ourselves by whether the work actually got easier for the people using it.",
  },
];

const milestones: { year: string; title: string; body: string }[] = [
  {
    year: "2016",
    title: "A side project in a converted print shop",
    body: "Three designers running a distributed studio in Oakland build a chat tool to stop losing decisions in email threads. Clients start asking if they can use it too.",
  },
  {
    year: "2017",
    title: `${B} opens to the public`,
    body: "More than 15,000 teams sign up in the first month. Channels, searchable history and integrations become the foundation of everything that follows.",
  },
  {
    year: "2018",
    title: "The platform opens up",
    body: "The marketplace launches with 300 apps, and developers get APIs for bots, slash commands and interactive messages.",
  },
  {
    year: "2019",
    title: "Built for the enterprise",
    body: "Enterprise plans add SSO, data residency and granular admin controls. The first organization with 100,000 members moves its workforce over.",
  },
  {
    year: "2020",
    title: "Huddles and shared channels",
    body: "As teams go remote overnight, huddles and channels shared with partners arrive. Daily active users triple in a single year.",
  },
  {
    year: "2022",
    title: "Automation for everyone",
    body: "Workflow Builder gets a ground-up redesign so anyone can automate requests and approvals without writing code.",
  },
  {
    year: "2023",
    title: "Canvases and lists",
    body: "Docs and project tracking move into the conversation itself, turning channels into complete spaces for planning and delivery.",
  },
  {
    year: "2024",
    title: `${B} AI arrives`,
    body: "Recaps, thread summaries and answers grounded in workspace knowledge launch, with customer data never used to train shared models.",
  },
  {
    year: "2026",
    title: "Agents for every paid plan",
    body: "After a beta with 4,000 teams, AI agents become generally available, and the apps achieve WCAG 2.2 AA conformance across every platform.",
  },
];

const offices: { city: string; country: string; note: string; hq?: boolean; icon?: "globe" }[] = [
  { city: "San Francisco", country: "United States", note: "Global headquarters and home to product, engineering and executive teams.", hq: true },
  { city: "New York", country: "United States", note: "Sales and customer success for media, retail and financial services." },
  { city: "Austin", country: "United States", note: "Customer experience and one of our fastest-growing sales hubs." },
  { city: "Toronto", country: "Canada", note: "Mobile and platform engineering, plus customer success for Canada." },
  { city: "London", country: "United Kingdom", note: "EMEA headquarters for go-to-market, partnerships and marketing." },
  { city: "Dublin", country: "Ireland", note: "Trust, compliance and international operations." },
  { city: "Berlin", country: "Germany", note: "Design and engineering for our AI, search and data teams." },
  { city: "Bengaluru", country: "India", note: "Reliability, data infrastructure and developer platform engineering." },
  { city: "Singapore", country: "Singapore", note: "Partnerships, sales and support across Southeast Asia." },
  { city: "Tokyo", country: "Japan", note: "APAC base serving customers across Japan and Korea." },
  { city: "Sydney", country: "Australia", note: "Sales and support for Australia and New Zealand." },
  { city: "Remote", country: "20+ countries", note: "Nearly a third of us work remotely, with stipends for home offices and coworking.", icon: "globe" },
];

function AboutVisual() {
  const people: { initials: string; tone: Tone }[] = [
    { initials: "JM", tone: "violet" },
    { initials: "LH", tone: "mint" },
    { initials: "PR", tone: "sun" },
    { initials: "SO", tone: "coral" },
    { initials: "GW", tone: "pink" },
  ];
  return (
    <div className="grid grid-cols-2 gap-4" aria-hidden="true">
      <div className="col-span-2 flex items-center gap-5 rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card">
        <span className="inline-flex size-16 shrink-0 items-center justify-center rounded-2xl bg-tint-violet">
          <LogoMark className="size-10" />
        </span>
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">Since 2016</p>
          <p className="mt-1 font-display text-xl font-bold text-fg">From a studio side project to the place work comes together</p>
        </div>
      </div>
      <div className="rounded-[var(--radius-panel)] bg-tint-mint p-6">
        <p className="font-display text-4xl font-extrabold text-mint-ink">750K+</p>
        <p className="mt-1 text-sm font-medium text-muted">organizations work here every day</p>
      </div>
      <div className="rounded-[var(--radius-panel)] bg-tint-sun p-6">
        <p className="font-display text-4xl font-extrabold text-sun-ink">150+</p>
        <p className="mt-1 text-sm font-medium text-muted">countries and territories</p>
      </div>
      <div className="col-span-2 flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-panel)] bg-deep p-6 text-on-deep">
        <div>
          <p className="font-display text-2xl font-bold text-white">3,800 people, 11 offices</p>
          <p className="text-sm text-on-deep-muted">One team, working in the open</p>
        </div>
        <div className="flex -space-x-2">
          {people.map((p) => (
            <span
              key={p.initials}
              className={cn("inline-flex size-11 items-center justify-center rounded-full text-sm font-bold ring-2 ring-deep", toneStyles[p.tone].solid)}
            >
              {p.initials}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About us"
        tone="violet"
        title={
          <>
            We build the place where <span className="text-gradient">work comes together</span>
          </>
        }
        subtitle={`${B} started as a way for one small team to stop losing decisions in email. Today, people, apps and AI agents at hundreds of thousands of organizations collaborate here every day.`}
        primary={{ label: "Join our team", href: "/careers" }}
        secondary={{ label: "Visit the media kit", href: "/media-kit" }}
        visual={<AboutVisual />}
      />

      {/* Story */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="flex flex-col items-start gap-5 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow tone="coral">Our story</Eyebrow>
            <h2 className="text-display-md font-bold text-fg">It started with a lost decision</h2>
            <p className="text-lead text-muted">
              Every company we admire has the same problem we did: the work is scattered across inboxes, meetings and
              too many tools. We set out to fix that.
            </p>
            <ArrowLink href="/blog">Read the latest from our team</ArrowLink>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 text-lg leading-relaxed text-muted">
            <p>
              In 2016, our founders were running a small design studio with people in four time zones. A client
              approved a major change in an email thread that half the team never saw, and two weeks of work went in
              the wrong direction. That afternoon, they started building a simple tool where every project had one
              shared, searchable home.
            </p>
            <p>
              Clients noticed. Within a year, the side project had a waiting list, the studio had closed its doors and{" "}
              {B} had opened to the public. The idea was never about chat for its own sake. It was about giving teams
              a shared memory, so the right people could find the right context at the right moment.
            </p>
            <p>
              That idea has carried us from channels to huddles, canvases, lists, workflows and now AI agents that
              work alongside people. The tools have grown, but the goal is the same: less time chasing work, more time
              doing work that matters.
            </p>
            <figure className="rounded-[var(--radius-card)] border-l-4 border-primary bg-surface-2 p-6">
              <blockquote className="font-display text-xl leading-snug font-semibold text-fg">
                “We never wanted to build another place to check. We wanted to build the place where the work already
                is.”
              </blockquote>
              <figcaption className="mt-3 text-sm font-medium text-muted">Julian Mercer, co-founder and CEO</figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Mission */}
      <Section bg="deep" labelledBy="mission-heading">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal className="flex flex-col items-center gap-6">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase">Our mission</p>
            <h2 id="mission-heading" className="text-display-lg font-extrabold text-white">
              Give every team a shared place to think, decide and build
            </h2>
            <p className="text-lead text-on-deep-muted">
              So people spend their days on the work they care about, not on searching for it, waiting for it or
              repeating it.
            </p>
          </Reveal>
        </div>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
          {[
            { icon: "users" as const, title: "People first", body: "Technology should make teams more human: clearer, kinder and more connected." },
            { icon: "sparkles" as const, title: "AI with context", body: "Agents and assistants that understand your work and respect your permissions." },
            { icon: "globe" as const, title: "Open by design", body: "An ecosystem of 2,600+ apps so every team can work with the tools it loves." },
          ].map((p) => (
            <StaggerItem key={p.title} className="rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-6">
              <Icon name={p.icon} className="size-6 text-sun" />
              <h3 className="mt-4 font-display text-xl font-bold text-white">{p.title}</h3>
              <p className="mt-2 text-on-deep-muted">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <StatsBand
        bg="default"
        stats={[
          { value: 750, suffix: "K+", label: "organizations" },
          { value: 4, suffix: "B+", label: "messages delivered daily" },
          { value: 3800, label: "employees worldwide" },
          { value: 2600, suffix: "+", label: "apps and agents" },
        ]}
      />

      {/* Values */}
      <Section bg="soft">
        <SectionHeader
          eyebrow="Our values"
          tone="mint"
          title="How we work together"
          subtitle="Six principles guide how we hire, how we build and how we treat the people who rely on us."
        />
        <IconCardGrid items={values} />
      </Section>

      {/* Timeline */}
      <Section>
        <SectionHeader eyebrow="Milestones" tone="sun" title="A decade of bringing work together" subtitle="A few of the moments that shaped the company and the product." />
        <div className="relative mx-auto max-w-3xl">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.0625rem] w-px bg-line-strong sm:left-[7.5rem]" />
          <Stagger as="ul" className="relative">
            {milestones.map((m, i) => {
              const t = toneStyles[toneAt(i)];
              return (
                <StaggerItem as="li" key={m.year + m.title} className="relative grid gap-2 pb-10 pl-12 last:pb-0 sm:grid-cols-[6.5rem_1fr] sm:gap-8 sm:pl-0">
                  <p className={cn("font-display text-2xl font-extrabold sm:pt-0.5 sm:text-right", t.ink)}>{m.year}</p>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1.5 left-2 inline-flex size-5 items-center justify-center rounded-full ring-4 ring-bg sm:left-[6.875rem]",
                      t.solid,
                    )}
                  />
                  <div className="rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft sm:ml-4">
                    <h3 className="font-display text-lg font-bold text-fg">{m.title}</h3>
                    <p className="mt-1.5 text-muted">{m.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Section>

      {/* Leadership */}
      <Section bg="violet">
        <SectionHeader
          eyebrow="Leadership"
          title="The team leading the way"
          subtitle="Our leaders come from engineering, design, finance and the front lines of customer success. Most of them still answer questions in public channels."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leaders.map((l) => (
            <StaggerItem key={l.name} lift className="h-full">
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <span
                  className={cn("inline-flex size-16 items-center justify-center rounded-2xl font-display text-xl font-extrabold", toneStyles[l.tone].solid)}
                  aria-hidden="true"
                >
                  {l.initials}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-fg">{l.name}</h3>
                <p className={cn("text-sm font-semibold", toneStyles[l.tone].ink)}>{l.role}</p>
                <p className="mt-3 text-sm text-muted">{l.bio}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Offices */}
      <Section>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            align="left"
            className="!mb-0"
            eyebrow="Offices"
            tone="sky"
            title="Wherever you are, we are nearby"
            subtitle="Eleven offices across four continents, plus teammates in more than 20 countries."
          />
          <ArrowLink href="/careers">See roles in every location</ArrowLink>
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((o, i) => {
            const t = toneStyles[toneAt(i)];
            return (
              <StaggerItem key={o.city} className="h-full">
                <div className="flex h-full gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft">
                  <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl", t.soft)}>
                    {o.icon ? <Icon name={o.icon} className="size-5" /> : <MapPin className="size-5" aria-hidden="true" />}
                  </span>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-fg">
                      {o.city}
                      {o.hq && <span className="rounded-full bg-primary px-2 py-0.5 font-sans text-[0.7rem] font-bold text-primary-fg">HQ</span>}
                    </h3>
                    <p className="text-sm font-medium text-subtle">{o.country}</p>
                    <p className="mt-2 text-sm text-muted">{o.note}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <CTABand
        title="Help us build the future of work"
        subtitle="We are hiring across engineering, design, product, sales and customer experience. Come do the best work of your career with people who care."
        primary={{ label: "See open roles", href: "/careers" }}
        secondary={{ label: "Read the engineering blog", href: "/engineering-blog" }}
      />
    </>
  );
}
