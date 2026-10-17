import { Check } from "lucide-react";
import type { CustomerLogo as LogoType } from "@/data/customers";
import type { Faq } from "@/data/types";
import { LeadForm } from "@/components/forms/lead-form";
import { CTABand, FAQ, IconCardGrid, QuoteBlock, StatsBand, type IconCard } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { CustomerLogo } from "@/components/ui/customer-logo";
import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Partner program for consultancies and builders",
  description: `Grow with the ${B} partner program. Solutions, technology, reseller and agency partners get revenue share, co-selling, training and marketing support.`,
  path: "/partners",
});

const partnerTypes: { name: string; icon: IconName; tone: Tone; body: string; bestFor: string; bullets: string[] }[] = [
  {
    name: "Solutions partners",
    icon: "briefcase",
    tone: "violet",
    body: `Consultancies and systems integrators who plan, deploy and optimize ${B} for complex organizations.`,
    bestFor: "Consulting firms and systems integrators",
    bullets: ["Co-sell with our enterprise teams", "Deployment and change management services", "Enterprise sandbox workspaces"],
  },
  {
    name: "Technology partners",
    icon: "plug",
    tone: "mint",
    body: "Software companies that build integrations, apps and agents that extend the platform.",
    bestFor: "SaaS companies and developer teams",
    bullets: ["Featured marketplace listings", "API previews and developer support", "Joint launches for top apps"],
  },
  {
    name: "Reseller partners",
    icon: "store",
    tone: "sun",
    body: `Value-added resellers and distributors who sell ${B} plans alongside their own services.`,
    bestFor: "Resellers, distributors and managed service providers",
    bullets: ["Competitive margins and deal registration", "Billing and provisioning tools", "Sales enablement programs"],
  },
  {
    name: "Agency partners",
    icon: "megaphone",
    tone: "pink",
    body: "Digital and workflow agencies that design rollouts, automations and adoption campaigns for clients.",
    bestFor: "Digital, creative and operations agencies",
    bullets: ["Referral fees for new customers", "Workflow templates and campaign kits", "Listing in the partner directory"],
  },
];

const benefits: IconCard[] = [
  { icon: "banknote", title: "Revenue that grows with you", body: "Earn referral fees, resale margins and services revenue that increase as you move up tiers." },
  { icon: "handshake", title: "Co-selling and leads", body: "Register deals, share opportunities with our account teams and receive qualified leads in your region." },
  { icon: "graduation", title: "Training and certification", body: "Free learning paths and exam vouchers so your team can deliver with confidence." },
  { icon: "megaphone", title: "Marketing support", body: "Co-branded campaigns, event sponsorships and market development funds for eligible partners." },
  { icon: "wrench", title: "Technical enablement", body: "Sandbox workspaces, solution architects and early access to APIs and product betas." },
  { icon: "grid", title: "One partner portal", body: "Track deals, certifications, payouts and resources in a single, always up-to-date place." },
];

const tiers: { name: string; tagline: string; featured?: boolean; requirements: string[]; benefits: string[] }[] = [
  {
    name: "Registered",
    tagline: "Everything you need to get started",
    requirements: ["Signed partner agreement", "One certified team member", "Completed onboarding course"],
    benefits: ["Partner portal and sales resources", "Standard referral fees", "Partner badge and directory listing", "Self-paced training paths"],
  },
  {
    name: "Select",
    tagline: "For partners building a dedicated practice",
    featured: true,
    requirements: ["Five certified team members", "$250K in annual partner-sourced bookings", "Two published customer stories"],
    benefits: ["Everything in Registered", "Deal registration with higher margins", "A dedicated partner manager", "Co-marketing funds", "Internal-use workspaces at no cost"],
  },
  {
    name: "Premier",
    tagline: "For our most strategic, global partners",
    requirements: ["Fifteen or more certified team members", "$1M or more in annual bookings", "A joint annual business plan"],
    benefits: ["Everything in Select", "Co-selling with enterprise account teams", "Early access to roadmap briefings and betas", "An executive sponsor", "Priority placement in the directory"],
  },
];

const partnerLogos: LogoType[] = [
  { name: "Bluefin Consulting", shape: "wave", style: "bold" },
  { name: "Arcwise Digital", shape: "diamond", style: "wide" },
  { name: "Northstar Systems", shape: "triangle", style: "mono" },
  { name: "Fernhill Partners", shape: "circle", style: "serif" },
  { name: "Quanta Integrations", shape: "hex", style: "bold" },
  { name: "Redwood Advisory", shape: "square", style: "italic" },
  { name: "Tidewater Tech", shape: "ring", style: "wide" },
  { name: "Brightpath Agency", shape: "bolt", style: "bold" },
];

const faqs: Faq[] = [
  {
    q: "Is there a fee to join the partner program?",
    a: "No. Registered membership is free. You sign the partner agreement, complete a short onboarding course and certify at least one team member.",
  },
  {
    q: "How long does it take to review an application?",
    a: "Most applications are reviewed within five business days. Our team may schedule a short call to learn about your business and the customers you serve.",
  },
  {
    q: "Can we join as more than one partner type?",
    a: "Yes. Many partners combine types, for example a consultancy that is both a Solutions and an Agency partner. You can add types from the partner portal at any time.",
  },
  {
    q: "How are partner tiers evaluated?",
    a: "We review tier status twice a year based on certifications, partner-sourced bookings and customer satisfaction. You can see your progress toward the next tier in the portal.",
  },
  {
    q: "Do technology partners need a marketplace listing?",
    a: "It is strongly encouraged. Listed apps reach customers in over 150 countries, and every app passes a security and privacy review before it goes live.",
  },
  {
    q: "Where can customers find partner deals?",
    a: "Customers can browse exclusive discounts and extended trials from technology partners on our partner offers page, and redeem them from their workspace.",
  },
];

function NetworkVisual() {
  const nodes: { name: string; icon: IconName; tone: Tone; pos: string }[] = [
    { name: "Solutions", icon: "briefcase", tone: "violet", pos: "col-start-1 row-start-1" },
    { name: "Technology", icon: "plug", tone: "mint", pos: "col-start-3 row-start-1" },
    { name: "Reseller", icon: "store", tone: "sun", pos: "col-start-1 row-start-3" },
    { name: "Agency", icon: "megaphone", tone: "pink", pos: "col-start-3 row-start-3" },
  ];
  return (
    <div className="relative mx-auto max-w-lg" aria-hidden="true">
      <svg viewBox="0 0 300 300" className="absolute inset-0 size-full text-line-strong" fill="none" preserveAspectRatio="none">
        <path d="M50 50 L150 150 M250 50 L150 150 M50 250 L150 150 M250 250 L150 150" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      </svg>
      <div className="relative grid aspect-square grid-cols-3 grid-rows-3 place-items-center gap-3">
        {nodes.map((n) => (
          <div key={n.name} className={cn("flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-4 shadow-card sm:px-5", n.pos)}>
            <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", toneStyles[n.tone].solid)}>
              <Icon name={n.icon} className="size-5" />
            </span>
            <span className="text-xs font-bold text-fg sm:text-sm">{n.name}</span>
          </div>
        ))}
        <div className="col-start-2 row-start-2 flex size-24 items-center justify-center rounded-[1.75rem] bg-deep shadow-glow sm:size-28">
          <LogoMark className="size-14 sm:size-16" />
        </div>
      </div>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Partners" }]}
        eyebrow="Partner program"
        tone="violet"
        title={
          <>
            Grow your business <span className="text-gradient">with {B}</span>
          </>
        }
        subtitle="Join a global ecosystem of consultancies, software companies, resellers and agencies helping organizations do their best work."
        primary={{ label: "Apply to partner", href: "/partners#apply" }}
        secondary={{ label: "Explore partner offers", href: "/partner-offers" }}
        visual={<NetworkVisual />}
      />

      <StatsBand
        stats={[
          { value: 1800, suffix: "+", label: "partners worldwide" },
          { value: 70, label: "countries with active partners" },
          { value: 2600, suffix: "+", label: "apps built by partners" },
          { value: 3, suffix: "x", label: "average growth in partner services" },
        ]}
      />

      {/* Partner types */}
      <Section>
        <SectionHeader
          eyebrow="Partner types"
          title="Find the partnership that fits"
          subtitle="Four ways to work with us, each with programs, tools and support built for how you go to market."
        />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {partnerTypes.map((p) => {
            const t = toneStyles[p.tone];
            return (
              <StaggerItem key={p.name} lift className="h-full">
                <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-7">
                  <div className="flex items-center gap-4">
                    <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
                      <Icon name={p.icon} className="size-6" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-fg">{p.name}</h3>
                  </div>
                  <p className="mt-4 text-muted">{p.body}</p>
                  <p className="mt-4 text-sm">
                    <span className="font-semibold text-fg">Best for: </span>
                    <span className="text-muted">{p.bestFor}</span>
                  </p>
                  <ul className="mt-5 flex flex-col gap-2.5 border-t border-line pt-5">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-fg">
                        <Check className={cn("mt-0.5 size-4 shrink-0", t.ink)} aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Benefits */}
      <Section bg="soft">
        <SectionHeader eyebrow="Benefits" tone="mint" title="Built to help partners win" subtitle="Whatever your model, you get the resources to sell, deliver and grow." />
        <IconCardGrid items={benefits} />
      </Section>

      {/* Tiers */}
      <Section>
        <SectionHeader
          eyebrow="Program tiers"
          tone="sun"
          title="Grow from Registered to Premier"
          subtitle="Start at no cost and unlock more benefits as your certified team and customer impact grow."
        />
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[var(--radius-panel)] border p-7",
                  tier.featured ? "border-primary bg-surface shadow-glow ring-1 ring-primary/30" : "border-line bg-surface shadow-soft",
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-fg">Most popular</span>
                )}
                <h3 className="font-display text-2xl font-bold text-fg">{tier.name}</h3>
                <p className="mt-1 text-muted">{tier.tagline}</p>
                <h4 className="mt-6 text-xs font-bold tracking-[0.12em] text-subtle uppercase">Requirements</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {tier.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-muted">
                      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-line-strong" />
                      {r}
                    </li>
                  ))}
                </ul>
                <h4 className="mt-6 text-xs font-bold tracking-[0.12em] text-subtle uppercase">Benefits</h4>
                <ul className="mt-3 flex flex-1 flex-col gap-2.5">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-fg">
                      <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                        <Check className="size-3" aria-hidden="true" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/partners#apply" variant={tier.featured ? "primary" : "secondary"} className="mt-8 w-full">
                  {tier.name === "Registered" ? "Start as Registered" : `Talk to us about ${tier.name}`}
                </ButtonLink>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Partner logos */}
      <Section bg="violet">
        <SectionHeader
          eyebrow="Our ecosystem"
          title="In good company"
          subtitle="A few of the partners helping customers plan, build and get more from their workspaces."
        />
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerLogos.map((l) => (
            <StaggerItem key={l.name}>
              <div className="flex h-24 items-center justify-center rounded-[var(--radius-card)] border border-line bg-surface px-4 shadow-soft">
                <CustomerLogo logo={l} className="text-fg/80" />
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <div className="mt-14">
          <QuoteBlock
            tone="sun"
            quote={`Within a year of moving to Premier, our ${B} practice became the fastest-growing part of our business. The co-selling support made the difference.`}
            name="Amelia Grant"
            role="Managing Partner, Bluefin Consulting"
          />
        </div>
      </Section>

      {/* Application */}
      <Section id="apply">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal className="flex flex-col items-start gap-5 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow tone="violet">Apply</Eyebrow>
            <h2 className="text-display-md font-bold text-fg">Become a partner</h2>
            <p className="text-lead text-muted">
              Tell us about your business and how you work with customers. Our partner team reviews every application
              and replies within five business days.
            </p>
            <ol className="mt-2 flex flex-col gap-4">
              {[
                { t: "Apply", d: "Share a few details about your company and goals." },
                { t: "Meet the team", d: "A partner manager walks you through the program." },
                { t: "Onboard", d: "Sign the agreement, certify your team and get portal access." },
              ].map((s, i) => (
                <li key={s.t} className="flex items-start gap-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-fg">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-fg">{s.t}</span>
                    <span className="block text-sm text-muted">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="mb-6 font-display text-2xl font-bold text-fg">Partner application</h3>
            <LeadForm
              fields={[
                { name: "firstName", label: "First name", required: true, autoComplete: "given-name", half: true },
                { name: "lastName", label: "Last name", required: true, autoComplete: "family-name", half: true },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "company", label: "Company name", required: true, autoComplete: "organization", half: true },
                { name: "website", label: "Company website", type: "url", autoComplete: "url", placeholder: "https://", half: true },
                {
                  name: "partnerType",
                  label: "Partner type",
                  type: "select",
                  required: true,
                  half: true,
                  options: ["Solutions", "Technology", "Reseller", "Agency", "Not sure yet"],
                },
                {
                  name: "region",
                  label: "Primary region",
                  type: "select",
                  required: true,
                  half: true,
                  options: ["North America", "Latin America", "Europe", "Middle East and Africa", "Asia Pacific"],
                },
                {
                  name: "size",
                  label: "Company size",
                  type: "select",
                  half: true,
                  options: ["1–49 employees", "50–249 employees", "250–999 employees", "1,000+ employees"],
                },
                {
                  name: "message",
                  label: "Tell us about your business",
                  type: "textarea",
                  placeholder: `Which customers do you serve, and how would you work with ${B}?`,
                },
              ]}
              submitLabel="Submit application"
              successTitle="Application received"
              successBody="Thanks for your interest. A partner manager will review your application and reach out within five business days."
            />
          </Reveal>
        </div>
      </Section>

      <FAQ items={faqs} bg="soft" subtitle="Still have questions? Our partner team is happy to help." />

      <CTABand
        title="Already a customer? See what partners offer you"
        subtitle="Browse exclusive discounts and extended trials on apps that work with your workspace."
        primary={{ label: "View partner offers", href: "/partner-offers" }}
        secondary={{ label: "Browse the marketplace", href: "/marketplace" }}
      />
    </>
  );
}
