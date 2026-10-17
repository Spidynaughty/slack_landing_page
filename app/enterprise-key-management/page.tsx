import { AlertTriangle, ArrowDown, ArrowRight, Check } from "lucide-react";
import { Mockup } from "@/components/mockups";
import { AppFrame } from "@/components/mockups/parts";
import { CTABand, FAQ, IconCardGrid, QuoteBlock } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Enterprise Key Management (EKM)",
  description: `Control the encryption keys that protect your ${B} data. Revoke access by org, workspace, channel, file or time range, and audit every single key request.`,
  path: "/enterprise-key-management",
});

const steps: { icon: IconName; tone: Tone; title: string; body: string }[] = [
  {
    icon: "key",
    tone: "violet",
    title: "You create a key",
    body: "Generate a master key in your own cloud key management service. It never leaves your account.",
  },
  {
    icon: "link",
    tone: "sky",
    title: "We request access",
    body: `${B} asks your key service for permission every time data needs to be encrypted or decrypted.`,
  },
  {
    icon: "lock",
    tone: "mint",
    title: "Data is sealed",
    body: "Messages and files are encrypted with short-lived data keys that are wrapped by your master key.",
  },
  {
    icon: "fileSearch",
    tone: "sun",
    title: "Every use is logged",
    body: "Each key request appears in your key service logs and in ours, with the resource and reason attached.",
  },
];

const scopes: { icon: IconName; title: string; body: string }[] = [
  { icon: "building2", title: "Entire organization", body: "Cut off access to everything in one action during a serious incident." },
  { icon: "grid", title: "Workspace", body: "Isolate a single business unit, subsidiary or region without affecting the rest." },
  { icon: "hash", title: "Channel", body: "Lock down a sensitive deal room, investigation or board channel." },
  { icon: "file", title: "Individual file", body: "Make one document unreadable everywhere it has been shared." },
  { icon: "calendarDays", title: "Time range", body: "Revoke content created between two dates, such as during a suspected breach." },
];

const logRows: { time: string; op: string; resource: string; actor: string; result: "Allowed" | "Denied" | "Applied" }[] = [
  { time: "09:41:07", op: "Decrypt", resource: "#deal-room-orion · message", actor: "Search service", result: "Allowed" },
  { time: "09:41:09", op: "Decrypt", resource: "Q3-forecast.xlsx · file", actor: "Mobile app · A. Rahman", result: "Allowed" },
  { time: "09:52:30", op: "Policy change", resource: "Workspace · Finance", actor: "M. Fischer · Org admin", result: "Applied" },
  { time: "10:03:14", op: "Revoke", resource: "#deal-room-orion · Mar 3–9", actor: "Security key policy", result: "Applied" },
  { time: "10:03:16", op: "Decrypt", resource: "#deal-room-orion · message", actor: "Desktop app · J. Park", result: "Denied" },
];

const resultTone: Record<string, string> = {
  Allowed: "bg-mint/15 text-mint-ink",
  Applied: "bg-sky/15 text-sky-ink",
  Denied: "bg-coral/15 text-coral-ink",
};

const faqs = [
  {
    q: "Which key management services does EKM support?",
    a: "EKM works with the managed key services offered by the major public cloud providers, as well as hardware security modules that expose a compatible interface. Your account team will confirm compatibility during setup.",
  },
  {
    q: "Can your employees read our data if we use EKM?",
    a: `Access to customer data is already restricted by policy, approvals and logging. With EKM, ${B} also cannot decrypt anything without a live, authorized request to your key, and you can see and stop every one of those requests.`,
  },
  {
    q: "What do people see when access is revoked?",
    a: "Revoked messages and files are replaced with a clear notice that the content is unavailable. Nothing is deleted, so restoring access to your key brings the content back for everyone with permission to see it.",
  },
  {
    q: "Does EKM slow anything down?",
    a: "No meaningful difference for most teams. Data keys are cached for short, configurable intervals, so searching, scrolling and sharing feel the same while your master key stays in your control.",
  },
  {
    q: "How long does it take to set up?",
    a: "Most organizations are up and running within two weeks. You create a key and grant access, then our team helps you test revocation and audit logging before encrypting existing data.",
  },
  {
    q: "Is EKM included in the Enterprise plan?",
    a: "EKM is available as an add-on to the Enterprise plan. Pricing depends on the number of members and workspaces, so contact our sales team for a quote.",
  },
];

function RevocationConsole() {
  return (
    <AppFrame
      title="Admin · Key controls"
      label="Key control console revoking access to the deal-room-orion channel for March 3 to March 9, affecting 1,284 messages and 37 files"
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-fg">Revoke key access</p>
            <p className="text-[0.72rem] text-muted">Master key · northwind-prod-ekm-01</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-mint/15 px-2.5 py-1 text-[0.68rem] font-bold text-mint-ink">
            <span className="size-1.5 rounded-full bg-mint" />
            Key healthy
          </span>
        </div>

        <p className="mt-5 text-[0.68rem] font-bold tracking-[0.12em] text-subtle uppercase">Scope</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["Organization", "Workspace", "Channel", "File", "Time range"].map((s) => (
            <span
              key={s}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold",
                s === "Channel" || s === "Time range" ? "border-primary bg-primary/10 text-primary" : "border-line text-muted",
              )}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-bg px-3 py-2.5">
            <p className="text-[0.65rem] font-semibold text-subtle">Channel</p>
            <p className="text-[0.8rem] font-bold text-fg">#deal-room-orion</p>
          </div>
          <div className="rounded-xl border border-line bg-bg px-3 py-2.5">
            <p className="text-[0.65rem] font-semibold text-subtle">Time range</p>
            <p className="text-[0.8rem] font-bold text-fg">Mar 3 – Mar 9, 2026</p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-sun/15 p-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-sun-ink" aria-hidden="true" />
          <p className="text-[0.74rem] text-fg">
            <span className="font-bold">1,284 messages and 37 files</span> will show as unavailable until access is restored.
            Nothing will be deleted.
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <span className="rounded-full border border-line px-4 py-1.5 text-[0.75rem] font-semibold text-fg">Cancel</span>
          <span className="rounded-full bg-coral px-4 py-1.5 text-[0.75rem] font-bold text-white dark:text-deep">Revoke access</span>
        </div>
      </div>
    </AppFrame>
  );
}

export default function EnterpriseKeyManagementPage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/trust", { section: "product", label: "Trust & security" }, [{ label: "Enterprise Key Management" }])}
        eyebrow="Enterprise Key Management"
        tone="violet"
        title={
          <>
            Your data. <span className="text-gradient">Your keys.</span> Your call.
          </>
        }
        subtitle={`Enterprise Key Management lets you hold the encryption keys that protect your ${B} messages and files, see every time they’re used and revoke access in seconds, down to a single channel or file.`}
        primary={{ label: "Talk to sales", href: "/contact-sales" }}
        secondary={{ label: "See Enterprise pricing", href: "/pricing" }}
        visual={<Mockup kind="security" />}
        note="Available as an add-on to the Enterprise plan."
      />

      {/* How it works */}
      <Section bg="soft" labelledBy="how-heading">
        <SectionHeader
          eyebrow="How it works"
          id="how-heading"
          title="Encryption that answers to you"
          subtitle={`${B} still encrypts everything at rest. EKM adds one crucial step: your master key, held in your own key service, must approve every request.`}
        />
        <Stagger as="ul" className="grid gap-10 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => {
            const t = toneStyles[s.tone];
            const last = i === steps.length - 1;
            return (
              <StaggerItem as="li" key={s.title} className="relative">
                <div className="relative z-10 flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.solid)}>
                      <Icon name={s.icon} className="size-6" />
                    </span>
                    <span className="font-display text-sm font-bold text-subtle">Step {i + 1}</span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </div>
                {!last && (
                  <>
                    {/* vertical connector on small screens */}
                    <span aria-hidden="true" className="absolute top-full left-1/2 flex h-10 -translate-x-1/2 flex-col items-center lg:hidden">
                      <span className="w-px flex-1 border-l-2 border-dashed border-line-strong" />
                      <ArrowDown className="size-4 text-primary" />
                    </span>
                    {/* horizontal connector on large screens */}
                    <span aria-hidden="true" className="absolute top-1/2 left-full z-20 hidden w-8 -translate-y-1/2 items-center lg:flex">
                      <span className="h-px flex-1 border-t-2 border-dashed border-line-strong" />
                      <ArrowRight className="-ml-1 size-4 shrink-0 text-primary" />
                    </span>
                  </>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mx-auto mt-16 max-w-4xl rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
          <h3 className="text-center font-display text-xl font-bold text-fg">The key hierarchy</h3>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted">
            Your master key sits at the top. Everything below it becomes unreadable the moment you withdraw access.
          </p>
          <ol className="mt-8 flex flex-col items-center gap-0">
            {[
              { label: "Your master key", detail: "Held in your key service", cls: "w-full max-w-xs bg-primary text-primary-fg" },
              { label: "Workspace keys", detail: "One per workspace", cls: "w-full max-w-md bg-primary/15 text-primary" },
              { label: "Channel and file keys", detail: "Scoped to each conversation and file", cls: "w-full max-w-xl bg-primary/10 text-fg" },
              { label: "Short-lived data keys", detail: "Rotated hourly, never stored unwrapped", cls: "w-full max-w-2xl bg-surface-2 text-fg" },
            ].map((k, i, arr) => (
              <li key={k.label} className="flex w-full flex-col items-center">
                <div className={cn("flex flex-col items-center gap-x-6 gap-y-0.5 rounded-2xl px-5 py-3 text-center sm:flex-row sm:justify-between sm:text-left", k.cls)}>
                  <span className="font-display font-bold">{k.label}</span>
                  <span className="text-xs opacity-80 sm:text-sm">{k.detail}</span>
                </div>
                {i < arr.length - 1 && <span aria-hidden="true" className="h-5 w-px border-l-2 border-dashed border-line-strong" />}
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* Key controls */}
      <Section labelledBy="controls-heading">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              align="left"
              className="!mb-8"
              eyebrow="Granular controls"
              tone="coral"
              id="controls-heading"
              title="Revoke exactly what you need to, nothing more"
              subtitle="Respond to a threat with precision instead of shutting everything down. Choose the scope, preview the impact and act."
            />
            <Stagger as="ul" className="flex flex-col gap-3">
              {scopes.map((s) => (
                <StaggerItem as="li" key={s.title}>
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-coral/15 text-coral-ink">
                      <Icon name={s.icon} className="size-5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-fg">{s.title}</span>
                      <span className="block text-sm text-muted">{s.body}</span>
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.1} className="relative">
            <div aria-hidden="true" className={cn("absolute -inset-6 rounded-[2rem] bg-gradient-to-br opacity-80 blur-2xl", toneStyles.coral.gradient)} />
            <div className="relative">
              <RevocationConsole />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Audit logs */}
      <Section bg="violet" labelledBy="audit-heading">
        <SectionHeader
          eyebrow="Audit logs"
          id="audit-heading"
          title="See every request for your keys"
          subtitle="Detailed logs show which person, app or service asked for a key, what it wanted to read and whether the request was allowed. Stream them to your security tools in real time."
        />
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-left text-sm">
              <caption className="sr-only">Sample Enterprise Key Management audit log entries for one morning</caption>
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  <th scope="col" className="px-5 py-3.5 font-semibold text-muted">
                    Time (UTC)
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-muted">
                    Operation
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-muted">
                    Resource
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-muted">
                    Requested by
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold text-muted">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {logRows.map((r) => (
                  <tr key={`${r.time}-${r.op}`}>
                    <td className="px-5 py-3.5 font-mono text-xs text-muted">{r.time}</td>
                    <th scope="row" className="px-5 py-3.5 font-semibold text-fg">
                      {r.op}
                    </th>
                    <td className="px-5 py-3.5 text-fg">{r.resource}</td>
                    <td className="px-5 py-3.5 text-muted">{r.actor}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", resultTone[r.result])}>{r.result}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <div className="mt-14">
          <IconCardGrid
            items={[
              {
                icon: "activity",
                tone: "violet",
                title: "Real-time streaming",
                body: "Send key events to your security information and event management tools as they happen.",
              },
              {
                icon: "radar",
                tone: "violet",
                title: "Anomaly alerts",
                body: "Get notified when key requests spike, come from unusual services or fail unexpectedly.",
              },
              {
                icon: "archive",
                tone: "violet",
                title: "Long-term retention",
                body: "Keep key logs as long as your regulators require, alongside your retention policies.",
              },
            ]}
          />
        </div>
      </Section>

      {/* Quote */}
      <Section>
        <QuoteBlock
          tone="sky"
          quote="Our regulators asked one question: can you prove who can read your data? With EKM we can, and we can take that access away in seconds."
          name="Priyanka Desai"
          role="Head of Information Security, Larkspur Capital"
        />
      </Section>

      {/* Availability */}
      <Section bg="soft" labelledBy="availability-heading">
        <Reveal className="grid overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface shadow-card lg:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-12">
            <p className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-bold tracking-[0.12em] text-primary uppercase">
              Availability
            </p>
            <h2 id="availability-heading" className="mt-5 text-display-sm font-bold text-fg">
              Available on the Enterprise plan
            </h2>
            <p className="mt-3 text-muted">
              EKM is an add-on for organizations on {B} Enterprise. Our team handles onboarding with you, from key
              setup and permissions to testing revocation, so you’re fully protected before you encrypt existing data.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact-sales" arrow>
                Contact sales
              </ButtonLink>
              <ButtonLink href="/pricing" variant="secondary">
                Compare plans
              </ButtonLink>
            </div>
          </div>
          <div className="border-t border-line bg-surface-2 p-8 md:p-12 lg:border-t-0 lg:border-l">
            <h3 className="font-display text-lg font-bold text-fg">What you’ll need</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {[
                `${B} Enterprise plan`,
                "An account with a supported cloud key management service",
                "A key administrator to create and manage your master key",
                "About two weeks for setup and testing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-fg">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <ArrowLink href="/trust/security" className="mt-6 text-sm">
              Read the full security overview
            </ArrowLink>
          </div>
        </Reveal>
      </Section>

      <FAQ items={faqs} subtitle="Questions about deployment or compatibility? Our security specialists can help." />

      <CTABand
        title="Hold the keys to your organization’s data"
        subtitle="See Enterprise Key Management in action and get a deployment plan built around your compliance requirements."
        primary={{ label: "Talk to sales", href: "/contact-sales" }}
        secondary={{ label: "Visit the Trust Center", href: "/trust" }}
      />
    </>
  );
}
