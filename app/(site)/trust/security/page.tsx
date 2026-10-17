import Link from "next/link";
import type { ReactNode } from "react";
import { Check, MapPin, ShieldCheck } from "lucide-react";
import { CTABand, LinkChips } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { TableOfContents } from "@/components/templates/article-client";
import { ArrowLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Security overview: how we protect your data",
  description: `A detailed look at ${B} security: encryption, SSO and SCIM, data governance, infrastructure monitoring, secure development and our bug bounty program.`,
  path: "/trust/security",
});

type Detail = { icon: IconName; title: string; body: string; href?: string; cta?: string };

const nav = [
  { id: "encryption", heading: "Encryption" },
  { id: "identity", heading: "Identity and access" },
  { id: "governance", heading: "Data governance" },
  { id: "infrastructure", heading: "Infrastructure and monitoring" },
  { id: "development", heading: "Secure development" },
  { id: "disclosure", heading: "Vulnerability disclosure" },
];

const encryption: Detail[] = [
  {
    icon: "lock",
    title: "Encryption in transit",
    body: "Traffic between apps, browsers and our services uses TLS 1.2 or higher, with TLS 1.3 and perfect forward secrecy preferred. HSTS and certificate pinning in our mobile apps help stop interception.",
  },
  {
    icon: "database",
    title: "Encryption at rest",
    body: "Messages, files, canvases and search indexes are encrypted with AES-256 using envelope encryption, so every object is protected by its own data key.",
  },
  {
    icon: "key",
    title: "Key management",
    body: "Master keys are generated and stored in FIPS 140-3 validated hardware security modules, rotated automatically and never visible to engineers in plaintext.",
  },
  {
    icon: "fileLock",
    title: "Enterprise Key Management",
    body: "Hold your own keys in your cloud key service, see every time they are used and revoke access to an entire org, a single channel or one file.",
    href: "/enterprise-key-management",
    cta: "Learn about EKM",
  },
];

const encryptionSpecs = [
  { k: "Data at rest", v: "AES-256-GCM" },
  { k: "Data in transit", v: "TLS 1.3 preferred, TLS 1.2 minimum" },
  { k: "Key storage", v: "FIPS 140-3 validated HSMs" },
  { k: "Key rotation", v: "Automatic, at least every 12 months" },
  { k: "Backups", v: "Encrypted with separate keys, stored in a second region" },
  { k: "Customer-managed keys", v: "Available with Enterprise Key Management" },
];

const identity: Detail[] = [
  {
    icon: "userCheck",
    title: "Single sign-on",
    body: "Connect any SAML 2.0 or OpenID Connect identity provider, then require SSO for every member and guest across all of your workspaces.",
    href: "/help/set-up-saml-single-sign-on",
    cta: "Set up SAML SSO",
  },
  {
    icon: "users",
    title: "SCIM provisioning",
    body: "Create, update and deactivate accounts automatically from your directory. Groups stay in sync, so people land in the right channels on day one and lose access the minute they leave.",
  },
  {
    icon: "fingerprint",
    title: "Two-factor authentication",
    body: "Support for authenticator apps, hardware security keys and passkeys. Admins can require two-factor authentication for the whole organization or for admins only.",
  },
  {
    icon: "clock",
    title: "Session controls",
    body: "Set session length and idle timeouts, require re-authentication for sensitive actions, restrict sign-in to approved IP ranges and sign people out of any device remotely.",
  },
  {
    icon: "settings",
    title: "Granular admin roles",
    body: "Separate owners, admins, channel managers and custom roles so every person has exactly the permissions their job requires, and nothing more.",
  },
  {
    icon: "devices",
    title: "Device management",
    body: "Block downloads and copying on unmanaged devices, require a passcode on mobile, detect compromised devices and wipe cached data when a phone goes missing.",
  },
];

const governance: Detail[] = [
  {
    icon: "archive",
    title: "Retention policies",
    body: "Keep messages and files for a day, seven years or forever. Set policies for the whole organization, then override them for specific workspaces or channels.",
  },
  {
    icon: "gavel",
    title: "Legal holds",
    body: "Preserve everything a custodian sends or receives, including edits and deletions, for as long as a matter requires. Holds are invisible to the people placed on them.",
  },
  {
    icon: "shield",
    title: "Data loss prevention",
    body: "Detect card numbers, credentials, health information and your own custom patterns in real time. Warn the sender, block the message or redact it, and alert your security team.",
  },
  {
    icon: "fileSearch",
    title: "eDiscovery exports",
    body: "Export complete workspace history with edits, deletions and file metadata in documented formats, or connect your eDiscovery platform through our Discovery API.",
    href: "/help/export-workspace-data",
    cta: "How exports work",
  },
  {
    icon: "fileCheck",
    title: "Audit logs",
    body: "Track sign-ins, permission changes, app installs, exports and policy updates. Query logs in the admin dashboard or stream them to your security tools.",
  },
  {
    icon: "layers",
    title: "Information barriers",
    body: "Prevent specific groups, such as research and trading, from messaging each other or sharing channels, with every attempt recorded for compliance review.",
  },
];

const regions = [
  { name: "United States", detail: "Default region" },
  { name: "Canada", detail: "Montreal" },
  { name: "European Union", detail: "Frankfurt and Paris" },
  { name: "United Kingdom", detail: "London" },
  { name: "Switzerland", detail: "Zurich" },
  { name: "United Arab Emirates", detail: "Dubai" },
  { name: "India", detail: "Mumbai" },
  { name: "Singapore", detail: "Singapore" },
  { name: "Japan", detail: "Tokyo and Osaka" },
  { name: "South Korea", detail: "Seoul" },
  { name: "Australia", detail: "Sydney" },
  { name: "Brazil", detail: "São Paulo" },
];

const infrastructure: Detail[] = [
  {
    icon: "cloud",
    title: "Hardened cloud infrastructure",
    body: "Every region runs across at least three availability zones, with segmented networks, private service-to-service connections and hardened, immutable server images.",
  },
  {
    icon: "fingerprint",
    title: "Zero-trust internal access",
    body: "Employees reach production only from managed devices with hardware keys and just-in-time approval. Every privileged session is logged and reviewed.",
  },
  {
    icon: "radar",
    title: "24/7 detection and response",
    body: "Our security operations team monitors centralized logs, behavioral anomalies and intrusion detection signals around the clock, every day of the year.",
  },
  {
    icon: "zap",
    title: "DDoS and abuse protection",
    body: "Edge filtering, adaptive rate limits and automated abuse detection absorb attacks before they reach the application layer.",
  },
  {
    icon: "server",
    title: "Backups and disaster recovery",
    body: "Continuous encrypted backups are replicated to a separate region. Recovery is rehearsed every quarter against a one-hour recovery point objective.",
  },
  {
    icon: "siren",
    title: "Incident response",
    body: "Documented playbooks, on-call responders and executive escalation paths. Availability incidents are posted to our status page as soon as they are confirmed.",
    href: "/status",
    cta: "View system status",
  },
];

const sdlc = [
  { title: "Design", body: "Threat modeling and a security review for every new feature that touches customer data." },
  { title: "Build", body: "Secure coding standards, mandatory peer review and protected branches for every repository." },
  { title: "Test", body: "Static and dynamic analysis, dependency and secret scanning on every change before it merges." },
  { title: "Release", body: "Signed, reproducible builds shipped through staged rollouts with automatic rollback." },
  { title: "Verify", body: "Annual third-party penetration tests plus an internal red team that probes production continuously." },
  { title: "Learn", body: "Blameless reviews after incidents and security training for every engineer, every year." },
];

const rewards = [
  { severity: "Critical", example: "Remote code execution or access to another organization’s data", reward: "$10,000 – $30,000", tone: "coral" as Tone },
  { severity: "High", example: "Account takeover or privilege escalation to workspace admin", reward: "$3,000 – $10,000", tone: "sun" as Tone },
  { severity: "Medium", example: "Stored cross-site scripting or a permission bypass within one workspace", reward: "$750 – $3,000", tone: "sky" as Tone },
  { severity: "Low", example: "Information disclosure with limited, demonstrable impact", reward: "$150 – $750", tone: "mint" as Tone },
];

function Block({
  id,
  icon,
  tone,
  title,
  intro,
  children,
}: {
  id: string;
  icon: IconName;
  tone: Tone;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  const t = toneStyles[tone];
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <Reveal className="flex flex-col items-start gap-4">
        <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
          <Icon name={icon} className="size-6" />
        </span>
        <h2 id={`${id}-heading`} className="text-display-sm font-bold text-fg">
          {title}
        </h2>
        <p className="max-w-3xl text-lead text-muted">{intro}</p>
      </Reveal>
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </section>
  );
}

function DetailGrid({ items }: { items: Detail[] }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2">
      {items.map((d) => (
        <StaggerItem key={d.title} className="h-full">
          <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
            <Icon name={d.icon} className="size-5 text-primary" />
            <h3 className="mt-4 font-display text-lg font-bold text-fg">{d.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.body}</p>
            {d.href && (
              <div className="mt-auto pt-4">
                <ArrowLink href={d.href} className="text-sm">
                  {d.cta ?? "Learn more"}
                </ArrowLink>
              </div>
            )}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function SecurityPage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/trust", { section: "product", label: "Trust & security" }, [{ label: "Security" }])}
        layout="center"
        eyebrow="Security"
        tone="sky"
        title={
          <>
            Security at every layer, <span className="text-gradient">by default</span>
          </>
        }
        subtitle={`From encrypted infrastructure to granular admin controls, here’s how ${B} protects the conversations, files and decisions your organization trusts us with.`}
        primary={{ label: "Talk to our security team", href: "/contact-sales" }}
        secondary={{ label: "Back to Trust Center", href: "/trust" }}
      >
        <ul className="mt-2 flex animate-fade-up flex-wrap justify-center gap-2.5 [animation-delay:320ms]">
          {["AES-256 at rest", "TLS 1.3 in transit", "24/7 security operations", "Public bug bounty"].map((c) => (
            <li
              key={c}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg shadow-soft"
            >
              <ShieldCheck className="size-4 text-mint-ink" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
      </PageHero>

      <div className="container-page grid gap-12 pt-6 pb-20 md:pb-28 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <TableOfContents items={nav} />
            <div className="rounded-2xl bg-tint-sky p-5">
              <p className="font-display font-bold text-fg">Need our audit reports?</p>
              <p className="mt-1 text-sm text-muted">SOC 2, ISO certificates and pen test summaries are available under NDA.</p>
              <ArrowLink href="/contact-sales" className="mt-3 text-sm">
                Request reports
              </ArrowLink>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <details className="mb-12 rounded-2xl border border-line bg-surface p-4 lg:hidden">
            <summary className="font-semibold text-fg">On this page</summary>
            <ol className="mt-3 flex flex-col gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-muted hover:text-primary">
                    {n.heading}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <div className="flex flex-col gap-24 md:gap-32">
            {/* Encryption */}
            <Block
              id="encryption"
              icon="lock"
              tone="violet"
              title="Encryption"
              intro="Every message, file and canvas is encrypted from the moment it leaves a device to long after it’s stored, using modern, well-reviewed cryptography."
            >
              <DetailGrid items={encryption} />
              <Reveal className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
                <p className="border-b border-line bg-surface-2 px-6 py-4 font-display font-bold text-fg">Encryption at a glance</p>
                <dl className="grid sm:grid-cols-2">
                  {encryptionSpecs.map((s) => (
                    <div
                      key={s.k}
                      className="flex flex-col gap-0.5 border-b border-line px-6 py-4 last:border-b-0 sm:odd:border-r sm:[&:nth-last-child(-n+2)]:border-b-0"
                    >
                      <dt className="text-xs font-bold tracking-[0.1em] text-subtle uppercase">{s.k}</dt>
                      <dd className="text-sm font-medium text-fg">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </Block>

            {/* Identity */}
            <Block
              id="identity"
              icon="userCheck"
              tone="mint"
              title="Identity and access"
              intro="Make sure the right people get in, everyone else stays out, and access changes the moment someone’s role does."
            >
              <DetailGrid items={identity} />
            </Block>

            {/* Governance */}
            <Block
              id="governance"
              icon="archive"
              tone="sun"
              title="Data governance"
              intro="Meet your legal, regulatory and internal policy obligations with controls designed for compliance teams, not just IT."
            >
              <DetailGrid items={governance} />
              <Reveal className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <h3 className="font-display text-xl font-bold text-fg">Data residency regions</h3>
                    <p className="mt-1.5 text-sm text-muted">
                      Store messages, files, canvases and search indexes at rest in the region you choose. Available on
                      Enterprise plans, with new regions added every year.
                    </p>
                  </div>
                  <span className="rounded-full bg-sun/20 px-3 py-1 text-xs font-bold text-sun-ink">{regions.length} regions</span>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {regions.map((r) => (
                    <li key={r.name} className="flex items-center gap-3 rounded-xl bg-surface-2 px-4 py-3">
                      <MapPin className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-fg">{r.name}</span>
                        <span className="block text-xs text-muted">{r.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </Block>

            {/* Infrastructure */}
            <Block
              id="infrastructure"
              icon="server"
              tone="sky"
              title="Infrastructure and monitoring"
              intro="Our platform is designed to stay secure and available even when individual components fail, with people and automation watching every layer."
            >
              <DetailGrid items={infrastructure} />
            </Block>

            {/* SDLC */}
            <Block
              id="development"
              icon="code"
              tone="pink"
              title="Secure development lifecycle"
              intro="Security is part of how we build from the first design doc, not a gate at the end. Every change follows the same path to production."
            >
              <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {sdlc.map((s, i) => (
                  <StaggerItem as="li" key={s.title} className="h-full">
                    <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                      <span className="font-display text-4xl font-extrabold text-gradient">0{i + 1}</span>
                      <h3 className="mt-3 font-display text-lg font-bold text-fg">{s.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Block>

            {/* Disclosure */}
            <Block
              id="disclosure"
              icon="bug"
              tone="coral"
              title="Vulnerability disclosure and bug bounty"
              intro="We work with independent researchers to find and fix issues before they can be exploited, and we reward them for it."
            >
              <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                <Reveal className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
                  <h3 className="font-display text-xl font-bold text-fg">How to report a vulnerability</h3>
                  <ol className="mt-5 flex flex-col gap-4">
                    {[
                      <>
                        Email your findings to{" "}
                        <span className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-fg">security@{site.domain}</span>{" "}
                        or use the security option on our{" "}
                        <Link href="/contact" className="font-semibold text-primary underline-offset-4 hover:underline">
                          contact page
                        </Link>
                        .
                      </>,
                      "Include the affected product, clear reproduction steps and the impact you were able to demonstrate.",
                      "We acknowledge every report within one business day and share a triage decision within five.",
                      "We keep you updated until the fix ships, then agree on a coordinated disclosure date together.",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted">
                        <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-coral/15 text-xs font-bold text-coral-ink">
                          {i + 1}
                        </span>
                        <span className="pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 rounded-2xl bg-surface-2 p-5">
                    <p className="text-sm font-semibold text-fg">Safe harbor</p>
                    <p className="mt-1 text-sm text-muted">
                      If you act in good faith, avoid privacy violations and service disruption, and give us reasonable time
                      to respond, we will not pursue legal action against you for your research.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={0.08} className="flex flex-col gap-6">
                  <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
                    <table className="w-full min-w-[30rem] text-left text-sm">
                      <caption className="px-6 pt-5 pb-3 text-left font-display text-base font-bold text-fg">
                        Bug bounty reward ranges
                      </caption>
                      <thead>
                        <tr className="border-y border-line bg-surface-2">
                          <th scope="col" className="px-6 py-3 font-semibold text-muted">
                            Severity
                          </th>
                          <th scope="col" className="px-4 py-3 font-semibold text-muted">
                            Example
                          </th>
                          <th scope="col" className="px-6 py-3 text-right font-semibold text-muted">
                            Reward
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {rewards.map((r) => (
                          <tr key={r.severity}>
                            <th scope="row" className="px-6 py-4 align-top">
                              <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", toneStyles[r.tone].soft)}>{r.severity}</span>
                            </th>
                            <td className="px-4 py-4 text-muted">{r.example}</td>
                            <td className="px-6 py-4 text-right font-semibold whitespace-nowrap text-fg">{r.reward}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                    <h3 className="font-display text-lg font-bold text-fg">Out of scope</h3>
                    <ul className="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
                      {[
                        "Denial-of-service or load testing",
                        "Social engineering of employees",
                        "Physical attacks on our offices",
                        "Issues in third-party marketplace apps",
                        "Scanner output without proven impact",
                        "Missing headers with no exploit path",
                      ].map((o) => (
                        <li key={o} className="flex items-start gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </Block>
          </div>

          <Reveal className="mt-24 rounded-[var(--radius-panel)] bg-tint-sky p-8 md:p-10">
            <h2 className="font-display text-display-sm font-bold text-fg">Keep exploring</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Learn how we handle personal information, see our compliance certifications or check live availability.
            </p>
            <LinkChips
              className="mt-6"
              links={[
                { label: "Trust Center", href: "/trust", icon: "shieldCheck" },
                { label: "Enterprise Key Management", href: "/enterprise-key-management", icon: "key" },
                { label: "Privacy Policy", href: "/legal/privacy", icon: "eye" },
                { label: "System status", href: "/status", icon: "activity" },
                { label: "Enterprise", href: "/enterprise", icon: "building2" },
              ]}
            />
          </Reveal>
        </div>
      </div>

      <CTABand
        title="Put our controls to the test"
        subtitle="Our security team will walk your reviewers through architecture, compliance reports and the configuration that fits your risk profile."
        primary={{ label: "Talk to our security team", href: "/contact-sales" }}
        secondary={{ label: "See Enterprise plans", href: "/pricing" }}
      />
    </>
  );
}
