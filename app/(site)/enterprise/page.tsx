import Link from "next/link";
import { ArrowDown, ShieldCheck } from "lucide-react";
import { mainNav } from "@/data/nav";
import { LeadForm } from "@/components/forms/lead-form";
import { Mockup } from "@/components/mockups";
import { SplitFeature, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ReviewHighlight } from "@/components/sections/reviews";
import { LogoCloud } from "@/components/sections/logo-cloud";

export const metadata = buildMetadata({
  title: "Enterprise: AI, agents and security at scale",
  description: `${B} Enterprise unifies AI with context, a governed home for every agent, enterprise search and world-class security, compliance and data residency at global scale.`,
  path: "/enterprise",
});

const badges = ["SOC 2 Type II", "SOC 3", "ISO 27001", "ISO 27017", "ISO 27018", "HIPAA", "FedRAMP Moderate", "GDPR", "CCPA", "CSA STAR Level 2"];

export default function EnterprisePage() {
  const menu = mainNav.find((m) => m.kind === "cards");
  const cards = menu && menu.kind === "cards" ? menu.cards : [];

  return (
    <>
      <PageHero
        deep
        eyebrow={`${B} Enterprise`}
        title={
          <>
            The operating system for the <span className="text-gradient">agentic enterprise</span>
          </>
        }
        subtitle="Bring your people, AI agents and systems of record together on one secure platform, governed centrally and loved by every team."
        primary={{ label: "Talk to sales", href: "#contact" }}
        secondary={{ label: "Watch the demo", href: "/demo" }}
        visual={<Mockup kind="platform" />}
      />

      {/* Four anchor cards */}
      <section aria-label="Enterprise capabilities" className="relative z-10 -mt-10 pb-6">
        <Stagger className="container-page grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => {
            const t = toneStyles[c.tone];
            return (
              <StaggerItem key={c.href} lift className="h-full">
                <Link
                  href={c.href.replace("/enterprise", "")}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card transition-shadow hover:shadow-float"
                >
                  <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", t.solid)}>
                    <Icon name={c.icon} className="size-5" />
                  </span>
                  <h2 className="mt-5 font-display text-lg leading-snug font-bold text-fg">{c.label}</h2>
                  <p className="mt-2 flex-1 text-sm text-muted">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Jump to section
                    <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <LogoCloud title="Powering the world's most demanding organizations" className="mt-10" />

      <Section>
        <div className="flex flex-col gap-24 md:gap-32">
          <div id="smarter-ai" className="scroll-mt-28">
            <SplitFeature
              eyebrow="Smarter AI with context"
              tone="violet"
              title="AI that understands how your company works"
              body={`Because ${B} holds your conversations, decisions and files, our AI answers with real context, not guesses, and never trains on your data.`}
              bullets={["Recaps and summaries across every channel", "Answers grounded in your knowledge with citations", "Zero data retention by model providers"]}
              visual={<Mockup kind="ai" />}
              cta={{ label: `Explore ${B} AI`, href: "/features/ai" }}
            />
          </div>
          <div id="agents" className="scroll-mt-28">
            <SplitFeature
              reverse
              eyebrow="Home for every agent"
              tone="mint"
              title="One governed place for agents from any vendor"
              body="Deploy pre-built agents, bring partner agents or build your own on the agentic platform. Every agent follows your permissions, guardrails and approval policies."
              bullets={["Central agent registry and policies", "Human-in-the-loop approvals", "Full audit trail for every agent action"]}
              visual={<Mockup kind="agent" />}
              cta={{ label: "Explore the agentic platform", href: "/features/agentic-platform" }}
            />
          </div>
          <div id="secure" className="scroll-mt-28">
            <SplitFeature
              eyebrow="Secure, scalable, silo-free"
              tone="coral"
              title="Enterprise controls without the enterprise headaches"
              body="Connect every team and partner in one platform with Enterprise Key Management, data residency, DLP, information barriers and granular admin controls."
              bullets={["Bring your own keys with EKM", "Data residency in 9 regions", "Unlimited workspaces under one org"]}
              visual={<Mockup kind="security" />}
              cta={{ label: "Visit the Trust Center", href: "/trust" }}
            />
          </div>
          <div id="search" className="scroll-mt-28">
            <SplitFeature
              reverse
              eyebrow="Search that knows where to look"
              tone="sky"
              title="One search bar for everything your company knows"
              body="Enterprise search spans messages, canvases, files and 40+ connected apps, returning cited AI answers that respect every permission."
              bullets={["40+ app connectors", "Permission-aware results", "Answers with sources you can check"]}
              visual={<Mockup kind="search" />}
              cta={{ label: "Learn about enterprise search", href: "/features/enterprise-search" }}
            />
          </div>
        </div>
      </Section>

      <StatsBand
        bg="violet"
        stats={[
          { value: 99.99, decimals: 2, suffix: "%", label: "uptime SLA" },
          { value: 500, suffix: "K", label: "members in a single org" },
          { value: 9, label: "data residency regions" },
          { value: 77, suffix: "%", label: "of the Fortune 100 trust us" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="Compliance" tone="mint" title="Certified to the highest standards" subtitle="Independent audits and certifications that meet the requirements of regulated industries worldwide." />
        <Reveal className="flex flex-wrap justify-center gap-3">
          {badges.map((b) => (
            <span key={b} className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface px-5 py-3 font-semibold text-fg shadow-soft">
              <ShieldCheck className="size-5 text-mint-ink" aria-hidden="true" />
              {b}
            </span>
          ))}
        </Reveal>
      </Section>

      <ReviewHighlight index={2} bg="soft" tone="sky" />

      <Section id="contact" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal className="flex flex-col gap-6">
            <SectionHeader align="left" className="!mb-0" eyebrow="Talk to our team" title="Let's design your rollout together" />
            <p className="text-lead text-muted">
              Our enterprise team will tailor a demo to your workflows, map out security reviews and share how organizations like yours roll out
              {" "}
              {B} in 90 days or less.
            </p>
            <ul className="flex flex-col gap-3 text-fg">
              {["A tailored demo for your industry", "Security, legal and procurement support", "Migration and change management planning", "Volume and multi-year pricing"].map((i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              formName="Enterprise enquiry"
              submitLabel="Contact sales"
              successTitle="Thanks, we'll be in touch"
              successBody="An enterprise specialist will reach out within one business day to schedule your session."
              fields={[
                { name: "first", label: "First name", required: true, autoComplete: "given-name", half: true },
                { name: "last", label: "Last name", required: true, autoComplete: "family-name", half: true },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
                { name: "company", label: "Company", required: true, autoComplete: "organization", half: true },
                { name: "size", label: "Company size", type: "select", required: true, options: ["1,000–4,999", "5,000–19,999", "20,000–99,999", "100,000+"], half: true },
                { name: "message", label: "What would you like to discuss?", type: "textarea" },
              ]}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
