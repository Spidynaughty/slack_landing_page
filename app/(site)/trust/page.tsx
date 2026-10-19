import Link from "next/link";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Mockup } from "@/components/mockups";
import { CTABand, FAQ, IconCardGrid, SplitFeature } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { Icon, type IconName } from "@/components/ui/icon";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneAt, toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Trust Center: security, privacy and compliance",
  description: `Learn how ${B} protects your data with layered security, privacy by design, independently audited compliance and reliability you can verify.`,
  path: "/trust",
});

const pillars: { icon: IconName; tone: Tone; title: string; body: string; points: string[]; href: string; cta: string }[] = [
  {
    icon: "shieldCheck",
    tone: "sky",
    title: "Security",
    body: "Defense in depth across our infrastructure, application and people, watched around the clock.",
    points: ["AES-256 at rest, TLS 1.3 in transit", "SSO, SCIM and enforced two-factor", "Optional Enterprise Key Management"],
    href: "/trust/security",
    cta: "Explore security",
  },
  {
    icon: "eye",
    tone: "violet",
    title: "Privacy",
    body: "Your organization owns its data. We collect only what we need to run the service, and we never sell it.",
    points: ["No selling or ad targeting, ever", "AI isn’t trained on your messages", "Self-serve export and deletion"],
    href: "/legal/privacy",
    cta: "Read the privacy policy",
  },
  {
    icon: "badge",
    tone: "mint",
    title: "Compliance",
    body: "Independent auditors test our controls against the standards that regulated industries rely on.",
    points: ["SOC 2 Type II and ISO 27001", "HIPAA-ready with a signed BAA", "FedRAMP Moderate authorized"],
    href: "#compliance",
    cta: "See certifications",
  },
  {
    icon: "activity",
    tone: "sun",
    title: "Reliability",
    body: "Redundant, multi-region infrastructure keeps your teams connected when it matters most.",
    points: ["99.99% uptime SLA on Enterprise", "Automatic zone failover", "Real-time public status page"],
    href: "/status",
    cta: "Check system status",
  },
];

const badges: { short: string; name: string; kind: string; body: string }[] = [
  { short: "SOC 2", name: "SOC 2 Type II", kind: "Audit report", body: "Annual independent audit of our security, availability and confidentiality controls." },
  { short: "27001", name: "ISO 27001", kind: "Certification", body: "Certified information security management system covering the entire service." },
  { short: "27017", name: "ISO 27017", kind: "Certification", body: "Cloud-specific security controls for both provider and customer responsibilities." },
  { short: "27018", name: "ISO 27018", kind: "Certification", body: "Protection of personal information processed in public cloud environments." },
  { short: "HIPAA", name: "HIPAA", kind: "Regulation", body: "Business associate agreements and safeguards for protected health information." },
  { short: "FedRAMP", name: "FedRAMP Moderate", kind: "Authorization", body: "Authorized for U.S. federal agencies working with moderate-impact data." },
  { short: "GDPR", name: "GDPR", kind: "Regulation", body: "Data processing addendum, standard contractual clauses and EU data residency." },
  { short: "CCPA", name: "CCPA", kind: "Regulation", body: "We honor California privacy rights and act as a service provider for customer data." },
  { short: "STAR", name: "CSA STAR", kind: "Registry", body: "Cloud security self-assessment and third-party attestation in the public registry." },
];

/** 60 days of status history; two days show brief degraded performance. */
const history = Array.from({ length: 60 }, (_, i) => (i === 17 || i === 46 ? "degraded" : "ok"));

const faqs = [
  {
    q: `Does ${B} use our data to train AI models?`,
    a: `No. Customer messages, files and canvases are never used to train generalized AI models. ${B} AI features retrieve only content the requesting person is already allowed to see, and processing stays inside our infrastructure.`,
  },
  {
    q: "Where is our data stored?",
    a: "By default, data is stored in the United States. Enterprise customers can choose from 12 data residency regions, including the European Union, United Kingdom, Japan and Australia, for messages, files and search indexes at rest.",
  },
  {
    q: "Can we review your SOC 2 report and penetration test results?",
    a: "Yes. Customers and prospects under a nondisclosure agreement can request our latest SOC 2 Type II report, ISO certificates and a summary of our most recent third-party penetration test from their account team.",
  },
  {
    q: `Can ${B} be used with protected health information?`,
    a: "Yes, on Enterprise plans. We sign a business associate agreement and provide the configuration guidance, retention controls and audit logging that HIPAA-covered organizations need.",
  },
  {
    q: "How do you respond to government requests for customer data?",
    a: "We require valid legal process, narrowly interpret every request and redirect it to the customer whenever possible. Unless legally prohibited, we notify the affected customer before disclosing anything, and we publish a transparency report twice a year.",
  },
  {
    q: "How would we hear about a security incident?",
    a: "Availability incidents are posted on our status page within minutes. If a confirmed incident affects your data, we notify your workspace owners without undue delay and share what happened, what we have done and what you can do.",
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/trust", { section: "product", label: "Trust & security" })}
        eyebrow="Trust Center"
        tone="sky"
        title={
          <>
            Your data, protected <span className="text-gradient">at every layer</span>
          </>
        }
        subtitle={`Security, privacy, compliance and reliability are built into ${B} from the first line of code. Here’s how we earn, and keep, the trust of more than 750,000 organizations.`}
        primary={{ label: "Explore security", href: "/trust/security" }}
        secondary={{ label: "Talk to our security team", href: "/contact-sales" }}
        visual={<Mockup kind="security" />}
        note="Independently audited every year. Reports available under NDA."
      />

      {/* Pillars */}
      <Section>
        <SectionHeader
          eyebrow="Our commitments"
          tone="sky"
          title="Four promises we build around"
          subtitle="Every product decision is weighed against the same four commitments to the people and organizations who rely on us."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const t = toneStyles[p.tone];
            return (
              <StaggerItem key={p.title} lift className="h-full">
                <Link
                  href={p.href}
                  className="group/pillar flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
                >
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.solid)}>
                    <Icon name={p.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.body}</p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-sm text-fg">
                        <Check className={cn("mt-0.5 size-4 shrink-0", t.ink)} aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
                    {p.cta}
                    <ArrowRight className="size-4 transition-transform group-hover/pillar:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Compliance badge wall */}
      <Section bg="soft" id="compliance" labelledBy="compliance-heading">
        <SectionHeader
          eyebrow="Compliance"
          tone="mint"
          id="compliance-heading"
          title="Certified against the standards you answer to"
          subtitle="Our controls are tested by independent auditors every year, so your security, risk and procurement teams can move forward with confidence."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b, i) => {
            const t = toneStyles[toneAt(i)];
            return (
              <StaggerItem key={b.name} lift className="h-full">
                <div className="flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft">
                  <span
                    className={cn(
                      "inline-flex size-16 shrink-0 flex-col items-center justify-center rounded-full ring-4",
                      t.soft,
                      t.ring,
                    )}
                  >
                    <ShieldCheck className="size-4" aria-hidden="true" />
                    <span className="mt-0.5 font-display text-[0.68rem] leading-none font-extrabold tracking-tight">{b.short}</span>
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="font-display text-lg font-bold text-fg">{b.name}</h3>
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-subtle uppercase">
                        {b.kind}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{b.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-10 text-center text-sm text-muted">
          Need audit reports, a data processing addendum or a completed security questionnaire?{" "}
          <Link href="/contact-sales" className="font-semibold text-primary underline-offset-4 hover:underline">
            Request our compliance package
          </Link>
          .
        </Reveal>
      </Section>

      {/* Uptime */}
      <section aria-labelledby="uptime-heading" className="deep-adaptive relative overflow-hidden bg-deep py-20 text-on-deep md:py-28">
        <GradientBlobs variant="deep" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase">Reliability</p>
            <h2 id="uptime-heading" className="text-display-md font-bold text-white">
              Always on, and we show our work
            </h2>
            <p className="text-lead text-on-deep-muted">
              {B} runs active-active across multiple availability zones in every region, with automatic failover and a
              dedicated reliability team on call around the clock. Every incident is posted publicly, followed by a
              written review.
            </p>
            <ButtonLink href="/status" variant="light" arrow>
              View live system status
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-panel)] border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
              <p className="text-sm font-semibold text-on-deep-muted">Platform uptime, trailing 12 months</p>
              <p className="mt-2 font-display text-display-lg font-extrabold text-white">
                <CountUp value={99.99} decimals={2} suffix="%" />
              </p>
              <p className="sr-only">
                Over the last 60 days there were no major outages and two days with brief periods of degraded performance.
              </p>
              <div aria-hidden="true" className="mt-6 flex h-12 items-stretch gap-[3px]">
                {history.map((d, i) => (
                  <span key={i} className={cn("flex-1 rounded-sm", d === "ok" ? "bg-mint" : "bg-sun")} />
                ))}
              </div>
              <div aria-hidden="true" className="mt-2 flex justify-between text-xs text-on-deep-muted">
                <span>60 days ago</span>
                <span>Today</span>
              </div>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {[
                  { k: "Enterprise SLA", v: "99.99%" },
                  { k: "Regions", v: "12" },
                  { k: "Incident updates", v: "Every 30 min" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="text-xs text-on-deep-muted">{s.k}</dt>
                    <dd className="mt-1 font-display text-lg font-bold text-white sm:text-xl">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Split features */}
      <Section>
        <div className="flex flex-col gap-24 md:gap-32">
          <SplitFeature
            eyebrow="Admin controls"
            tone="sky"
            title="Controls you can see, set and prove"
            body="One security console gives admins a live view of every control that matters, from encryption keys and single sign-on to retention and external sharing, with a full audit trail behind each change."
            bullets={[
              "Enforce SSO, SCIM and two-factor across every workspace",
              "Set retention, legal holds and exports by channel",
              "Stream audit logs to your security tools",
            ]}
            visual={<Mockup kind="security" />}
            cta={{ label: "Read the security overview", href: "/trust/security" }}
          />
          <SplitFeature
            reverse
            eyebrow="Trustworthy AI"
            tone="violet"
            title="AI that respects every permission"
            body={`${B} AI only draws on content the person asking can already access. Answers cite their sources, admins decide which features are on, and your conversations are never used to train generalized models.`}
            bullets={[
              "Permission-aware answers, recaps and search",
              "Processing stays inside our infrastructure",
              "Per-workspace controls for every AI feature",
            ]}
            visual={<Mockup kind="ai" />}
            cta={{ label: `How ${B} AI works`, href: "/features/ai" }}
          />
          <SplitFeature
            eyebrow="Data ownership"
            tone="mint"
            title="Your data stays yours"
            body="Decide where your data lives, how long it’s kept and who can take it with them. Export everything at any time, and when you leave, we delete it on your schedule."
            bullets={[
              "Data residency in 12 regions worldwide",
              "Bring your own keys with Enterprise Key Management",
              "Complete exports in open, documented formats",
            ]}
            visual={<Mockup kind="files" />}
            cta={{ label: "Explore Enterprise Key Management", href: "/enterprise-key-management" }}
          />
        </div>
      </Section>

      {/* Resources */}
      <Section bg="sky">
        <SectionHeader
          eyebrow="Go deeper"
          tone="sky"
          title="Policies, controls and resources"
          subtitle="Everything your security, legal and procurement reviewers usually ask for, in one place."
        />
        <IconCardGrid
          items={[
            {
              icon: "shieldCheck",
              title: "Security overview",
              body: "Encryption, identity, governance, infrastructure and how we build software securely.",
              href: "/trust/security",
              cta: "Read the overview",
            },
            {
              icon: "key",
              title: "Enterprise Key Management",
              body: "Control your own encryption keys and revoke access down to a single channel or file.",
              href: "/enterprise-key-management",
              cta: "Learn about EKM",
            },
            {
              icon: "badge",
              title: "Compliance",
              body: "Certifications, attestations and regional frameworks, plus how to request audit reports.",
              href: "/trust/compliance",
              cta: "View certifications",
            },
            {
              icon: "database",
              title: "Data management",
              body: "Retention, legal holds, exports, eDiscovery and where your data is stored.",
              href: "/trust/data-management",
              cta: "Manage your data",
            },
            {
              icon: "fileLock",
              title: "Privacy at a glance",
              body: "Our privacy principles, the data we collect and the rights you have over it.",
              href: "/trust/privacy",
              cta: "Explore privacy",
            },
            {
              icon: "sparkles",
              title: "AI principles",
              body: "How we build trustworthy AI: no training on your data, permission-aware answers and human oversight.",
              href: "/trust/ai-principles",
              cta: "Read the principles",
            },
            {
              icon: "scale",
              title: "Data requests",
              body: "How we respond to government data requests, with our latest transparency figures.",
              href: "/trust/data-requests",
              cta: "See the report",
            },
            {
              icon: "userCheck",
              title: "Privacy requests",
              body: "Ask to access, correct, export or delete personal information we hold about you.",
              href: "/trust/privacy-request",
              cta: "Submit a request",
            },
            {
              icon: "eye",
              title: "Privacy Policy",
              body: "What we collect, why we collect it and the choices you have over your information.",
              href: "/legal/privacy",
              cta: "Read the policy",
            },
            {
              icon: "fileSignature",
              title: "Terms of Service",
              body: "The agreement that governs how organizations and individuals use the service.",
              href: "/legal/terms",
              cta: "Read the terms",
            },
            {
              icon: "accessibility",
              title: "Accessibility",
              body: "Our WCAG 2.2 AA commitment, assistive technology support and how to share feedback.",
              href: "/accessibility",
              cta: "See our commitment",
            },
            {
              icon: "activity",
              title: "System status",
              body: "Live availability for messaging, huddles, search and integrations in every region.",
              href: "/status",
              cta: "Check status",
            },
          ]}
        />
      </Section>

      <FAQ items={faqs} subtitle="Have a question for our security, privacy or compliance teams? We’re happy to help." />

      <CTABand
        title="Security your whole organization can count on"
        subtitle="Get a walkthrough of our controls, compliance reports and deployment options tailored to your industry."
        primary={{ label: "Talk to our security team", href: "/contact-sales" }}
        secondary={{ label: "Read the security overview", href: "/trust/security" }}
      />
    </>
  );
}
