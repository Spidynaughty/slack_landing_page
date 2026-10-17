import { Building2, Hash, ShieldCheck } from "lucide-react";
import { getStory } from "@/data/stories";
import { Mockup } from "@/components/mockups";
import { CTABand, IconCardGrid, QuoteBlock, SplitFeature, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Built to scale: from 5 people to 500,000",
  description: `${B} grows with you from a five-person startup to a 500,000-person enterprise, with global infrastructure, an enterprise grid and a guided rollout program.`,
  path: "/scale",
});

const stages: { size: string; title: string; body: string; plan: string; icon: IconName; tone: Tone }[] = [
  {
    size: "5 – 50 people",
    title: "Start together",
    body: "Set up channels, huddles and canvases in an afternoon. Everyone sees the same work, and nobody gets lost in email threads.",
    plan: "Free or Pro",
    icon: "rocket",
    tone: "violet",
  },
  {
    size: "50 – 500 people",
    title: "Organize and automate",
    body: "Add user groups, guest accounts, shared channels with partners and workflows that handle requests and approvals for you.",
    plan: "Pro or Business+",
    icon: "workflow",
    tone: "mint",
  },
  {
    size: "500 – 5,000 people",
    title: "Govern and secure",
    body: "Turn on SSO and SCIM, set retention by channel, export data for compliance and back it all with a 99.9% uptime SLA.",
    plan: "Business+",
    icon: "shieldCheck",
    tone: "sun",
  },
  {
    size: "5,000 – 500,000 people",
    title: "Run the enterprise",
    body: "Connect unlimited workspaces in one organization with data residency, Enterprise Key Management and a dedicated success team.",
    plan: "Enterprise",
    icon: "building2",
    tone: "sky",
  },
];

const workspaces: { name: string; members: string; channels: string; tone: Tone }[] = [
  { name: "Engineering", members: "34,200", channels: "4,810", tone: "violet" },
  { name: "Customer Care", members: "48,300", channels: "2,160", tone: "mint" },
  { name: "Sales", members: "21,900", channels: "3,420", tone: "coral" },
  { name: "EMEA Operations", members: "16,700", channels: "1,940", tone: "sky" },
];

const rollout = [
  {
    phase: "Discover",
    weeks: "Weeks 1–2",
    body: "We map your current tools, integrations, retention requirements and success metrics, then design your workspace structure.",
  },
  {
    phase: "Pilot",
    weeks: "Weeks 3–6",
    body: "Two or three champion teams go live first with tailored templates and workflows, so you can learn and adjust before scaling up.",
  },
  {
    phase: "Migrate",
    weeks: "Weeks 5–10",
    body: "Import message history from legacy tools, provision users through SCIM and rebuild critical integrations while old systems run in parallel.",
  },
  {
    phase: "Launch",
    weeks: "Weeks 8–12",
    body: "Roll out in waves by region or department with launch kits, live training and a network of internal champions to answer questions.",
  },
  {
    phase: "Optimize",
    weeks: "Ongoing",
    body: "Track adoption in analytics, review progress every quarter and keep adding workflows and agents that remove manual work.",
  },
];

function GrowthVisual() {
  const bars = [
    { label: "5", h: 10 },
    { label: "50", h: 24 },
    { label: "500", h: 40 },
    { label: "5K", h: 58 },
    { label: "50K", h: 78 },
    { label: "500K", h: 100 },
  ];
  return (
    <div
      role="img"
      aria-label="Bar chart showing one organization growing from 5 to 500,000 members on the same platform, now with 240 workspaces"
      className="relative rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-float sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-fg">Northwind Group</p>
          <p className="text-xs text-muted">Active members over time</p>
        </div>
        <span className="rounded-full bg-mint/15 px-2.5 py-1 text-xs font-bold text-mint-ink">Same platform since day one</span>
      </div>
      <div className="mt-8 flex h-52 items-stretch gap-2.5 sm:h-60 sm:gap-4">
        {bars.map((b, i) => (
          <div key={b.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative w-full flex-1">
              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 rounded-t-xl bg-gradient-to-t",
                  i === bars.length - 1 ? "from-primary to-pink" : "from-primary/25 to-primary/55",
                )}
                style={{ height: `${b.h}%` }}
              />
            </div>
            <span className="text-xs font-bold text-muted">{b.label}</span>
          </div>
        ))}
      </div>
      <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
        {[
          { k: "Workspaces", v: "240" },
          { k: "Channels", v: "1.2M" },
          { k: "Connected apps", v: "380" },
        ].map((s) => (
          <div key={s.k}>
            <dt className="text-xs text-muted">{s.k}</dt>
            <dd className="font-display text-xl font-bold text-fg">{s.v}</dd>
          </div>
        ))}
      </dl>
      <div className="absolute -top-5 -right-3 hidden animate-float items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2 shadow-float sm:flex lg:-right-8">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-mint text-white dark:text-deep">
          <ShieldCheck className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">99.99% uptime</span>
          <span className="text-muted">Trailing 12 months</span>
        </span>
      </div>
    </div>
  );
}

function OrgGrid() {
  return (
    <div
      role="img"
      aria-label="Enterprise organization diagram: Northwind Group contains four workspaces, Engineering, Customer Care, Sales and EMEA Operations, connected by a shared channel and governed by org-wide policies"
      className="rounded-[var(--radius-panel)] border border-line bg-surface p-5 shadow-float sm:p-7"
    >
      <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-deep px-4 py-3 shadow-card">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-white/10 text-white">
          <Building2 className="size-5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-bold text-white">Northwind Group</span>
          <span className="block text-[0.7rem] text-on-deep-muted">Enterprise organization · 182,400 members</span>
        </span>
      </div>
      <div aria-hidden="true" className="mx-auto h-6 w-px bg-line-strong" />
      <div className="relative">
        <div aria-hidden="true" className="absolute top-0 right-[calc(12.5%-0.28rem)] left-[calc(12.5%-0.28rem)] hidden h-px bg-line-strong sm:block" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:pt-5">
          {workspaces.map((w) => (
            <div key={w.name} className="relative rounded-2xl border border-line bg-bg p-3">
              <span aria-hidden="true" className="absolute -top-5 left-1/2 hidden h-5 w-px bg-line-strong sm:block" />
              <span className={cn("inline-flex size-7 items-center justify-center rounded-lg text-xs font-bold", toneStyles[w.tone].solid)}>
                {w.name[0]}
              </span>
              <p className="mt-2 text-[0.78rem] leading-tight font-bold text-fg">{w.name}</p>
              <p className="mt-1 text-[0.66rem] text-muted">{w.members} members</p>
              <p className="text-[0.66rem] text-muted">{w.channels} channels</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-2xl border-2 border-dashed border-primary/35 bg-primary/5 px-4 py-2.5">
        <Hash className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-[0.75rem] text-fg">
          <span className="font-bold">launch-orion</span> is shared across Engineering, Sales and Customer Care
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {["SSO enforced", "Retention: 7 years", "EKM on", "DLP: block card numbers", "EU data residency"].map((p) => (
          <span key={p} className="rounded-full bg-surface-2 px-2.5 py-1 text-[0.66rem] font-semibold text-muted">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ScalePage() {
  const vantage = getStory("vantage-bank");

  return (
    <>
      <PageHero
        crumbs={[{ label: "Enterprise", href: "/enterprise" }, { label: "Built to scale" }]}
        eyebrow="Built to scale"
        tone="sky"
        title={
          <>
            From a team of 5 <span className="text-gradient">to 500,000</span>
          </>
        }
        subtitle={`Start with a single channel and grow into a global organization without switching tools, migrating data or relearning how you work. ${B} scales with you at every stage.`}
        primary={{ label: "Talk to sales", href: "/contact-sales" }}
        secondary={{ label: "Explore Enterprise", href: "/enterprise" }}
        visual={<GrowthVisual />}
      />

      {/* Growth journey */}
      <Section labelledBy="journey-heading">
        <SectionHeader
          eyebrow="Grow without switching"
          tone="sky"
          id="journey-heading"
          title="One platform for every stage of growth"
          subtitle="Your history, channels and workflows come with you as you grow. Unlock new controls only when you need them."
        />
        <div className="relative">
          <div aria-hidden="true" className="absolute top-6 right-[12.5%] left-[12.5%] hidden h-0.5 bg-gradient-to-r from-primary via-mint to-sky opacity-40 lg:block" />
          <Stagger className="relative">
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stages.map((s, i) => {
                const t = toneStyles[s.tone];
                return (
                  <StaggerItem as="li" key={s.title} className="flex h-full flex-col items-center text-center">
                    <span className={cn("relative z-10 inline-flex size-12 items-center justify-center rounded-full ring-8 ring-bg", t.solid)}>
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <div className="mt-5 flex w-full flex-1 flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                      <p className={cn("text-xs font-bold tracking-[0.12em] uppercase", t.ink)}>
                        Stage {i + 1} · {s.size}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-bold text-fg">{s.title}</h3>
                      <p className="mt-2 flex-1 text-sm text-muted">{s.body}</p>
                      <p className="mt-5 border-t border-line pt-4 text-xs font-semibold text-subtle">
                        Typical plan: <span className="text-fg">{s.plan}</span>
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </ol>
          </Stagger>
        </div>
        <Reveal className="mt-10 text-center">
          <ArrowLink href="/pricing">Compare plans for every stage</ArrowLink>
        </Reveal>
      </Section>

      <StatsBand
        title="Global infrastructure, built for peak load"
        stats={[
          { value: 99.99, decimals: 2, suffix: "%", label: "uptime SLA on Enterprise" },
          { value: 500, suffix: "K", label: "members in a single organization" },
          { value: 12, label: "data residency regions" },
          { value: 5, suffix: "B+", label: "messages delivered every week" },
        ]}
      />

      {/* Enterprise grid */}
      <Section>
        <div className="flex flex-col gap-24 md:gap-32">
          <SplitFeature
            eyebrow="Enterprise grid"
            tone="sky"
            title="One organization, as many workspaces as you need"
            body="Give every business unit, region or subsidiary its own workspace with local admins, while security, compliance and search stay unified across the whole organization."
            bullets={[
              "Org-wide policies set once and inherited everywhere",
              "Shared channels span workspaces without duplicating data",
              "One directory, one search and one analytics view",
              "Local admins manage their workspace day to day",
            ]}
            visual={<OrgGrid />}
            cta={{ label: "Explore Enterprise", href: "/enterprise" }}
          />
          <SplitFeature
            reverse
            eyebrow="Enterprise search"
            tone="violet"
            title="Find anything across your entire organization"
            body="Search every workspace, connected app and file in one place. Results respect permissions, so people only ever see what they’re allowed to, even at a scale of millions of channels."
            bullets={["AI answers grounded in your own knowledge", "Filters for people, workspaces, apps and dates", "Results in milliseconds across billions of messages"]}
            visual={<Mockup kind="search" />}
            cta={{ label: "Discover enterprise search", href: "/features/enterprise-search" }}
          />
          <SplitFeature
            eyebrow="External collaboration"
            tone="mint"
            title="Work with thousands of partner organizations"
            body={`Invite agencies, suppliers, auditors and customers into shared channels with ${B} Connect. Each organization keeps control of its own data, policies and members.`}
            bullets={["Shared channels with up to 250 organizations", "Admin approval for every external connection", "Separate retention and DLP for each side"]}
            visual={<Mockup kind="connect" />}
            cta={{ label: `Learn about ${B} Connect`, href: "/connect" }}
          />
        </div>
      </Section>

      {/* Admin tools */}
      <Section bg="soft">
        <SectionHeader
          eyebrow="Admin tools"
          tone="sky"
          title="Manage half a million people without breaking a sweat"
          subtitle="Purpose-built tools let a small IT team run a very large organization, with automation for the tasks that would otherwise eat their week."
        />
        <IconCardGrid
          items={[
            {
              icon: "chart",
              title: "Analytics dashboard",
              body: "See adoption, active members, message volume and app usage by workspace, department or region.",
            },
            {
              icon: "settings",
              title: "Org-wide policies",
              body: "Set retention, sharing, app approval and security rules once and apply them to every workspace.",
            },
            {
              icon: "users",
              title: "Automated provisioning",
              body: "Sync members and groups from your directory with SCIM so access always matches people’s roles.",
            },
            {
              icon: "hash",
              title: "Channel management at scale",
              body: "Create, archive and move channels in bulk, set default channels and assign channel managers.",
            },
            {
              icon: "puzzle",
              title: "App governance",
              body: "Approve apps and agents for the whole organization or specific workspaces, with granular permission scopes.",
            },
            {
              icon: "fileSearch",
              title: "Audit logs API",
              body: "Stream every admin action, sign-in and export to your security tools for monitoring and investigation.",
            },
          ]}
        />
      </Section>

      {/* Rollout program */}
      <Section labelledBy="rollout-heading">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              align="left"
              className="!mb-8"
              eyebrow="Migration and rollout"
              tone="mint"
              id="rollout-heading"
              title="A proven program for moving fast at scale"
              subtitle="Our enterprise rollout team has guided organizations of every size through migration. Most are fully live in about 90 days."
            />
            <Reveal className="flex flex-wrap gap-3">
              <ButtonLink href="/contact-sales" arrow>
                Plan your rollout
              </ButtonLink>
              <ButtonLink href="/customer-stories" variant="secondary">
                See customer stories
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger>
            <ol className="relative flex flex-col gap-5 border-l-2 border-line pl-8 sm:pl-10">
              {rollout.map((r, i) => (
                <StaggerItem as="li" key={r.phase} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute top-5 -left-[calc(3rem+1px)] inline-flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-fg ring-4 ring-bg sm:-left-[calc(3.5rem+1px)]"
                  >
                    {i + 1}
                  </span>
                  <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display text-xl font-bold text-fg">{r.phase}</h3>
                      <span className="rounded-full bg-mint/15 px-2.5 py-1 text-xs font-bold text-mint-ink">{r.weeks}</span>
                    </div>
                    <p className="mt-2 text-muted">{r.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </ol>
          </Stagger>
        </div>
      </Section>

      {/* Customer quote */}
      {vantage && (
        <Section bg="sky">
          <QuoteBlock tone="sky" quote={vantage.quote.text} name={vantage.quote.name} role={vantage.quote.role} />
          <Stagger className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
            {vantage.stats.map((s) => (
              <StaggerItem key={s.label} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 text-center shadow-soft">
                <p className="font-display text-display-sm font-extrabold text-sky-ink">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <ArrowLink href={`/customer-stories/${vantage.slug}`}>Read the {vantage.company} story</ArrowLink>
            <ArrowLink href="/customer-stories">Browse all customer stories</ArrowLink>
          </Reveal>
        </Section>
      )}

      <CTABand
        title="Ready to grow without limits?"
        subtitle="Talk to our enterprise team about your organization, your rollout timeline and the controls you need on day one."
        primary={{ label: "Talk to sales", href: "/contact-sales" }}
        secondary={{ label: "Explore Enterprise", href: "/enterprise" }}
      />
    </>
  );
}
