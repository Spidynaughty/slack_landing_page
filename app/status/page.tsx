import { CheckCircle2 } from "lucide-react";
import { pastIncidents, services } from "@/data/releases";
import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "System status",
  description: `Live operational status for ${B} messaging, huddles, files, search, AI, workflows, integrations and login, with 90-day uptime history and past incidents.`,
  path: "/status",
});

const DAYS = 90;

function UptimeBars({ incidents, degraded, name }: { incidents: number[]; degraded: number[]; name: string }) {
  return (
    <div className="flex h-9 items-stretch gap-[2px]" role="img" aria-label={`${name}: 90-day uptime history, ${incidents.length} incident days and ${degraded.length} degraded days`}>
      {Array.from({ length: DAYS }, (_, i) => {
        const dayAgo = DAYS - 1 - i;
        const state = incidents.includes(dayAgo) ? "incident" : degraded.includes(dayAgo) ? "degraded" : "ok";
        return (
          <span
            key={i}
            title={`${dayAgo === 0 ? "Today" : `${dayAgo} days ago`}: ${state === "ok" ? "No issues" : state === "degraded" ? "Degraded performance" : "Incident"}`}
            className={cn(
              "flex-1 rounded-[2px] transition-transform hover:scale-y-110",
              state === "ok" ? "bg-mint" : state === "degraded" ? "bg-sun" : "bg-coral",
              i < 30 && "hidden sm:block",
            )}
          />
        );
      })}
    </div>
  );
}

export default function StatusPage() {
  const avg = services.reduce((s, x) => s + x.uptime, 0) / services.length;
  return (
    <>
      <section className="under-header bg-bg-soft pb-12">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Status" }]} />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-display-lg font-extrabold text-fg">{B} status</h1>
              <p className="mt-3 text-lead text-muted">Real-time and historical availability for every service.</p>
            </div>
            <p className="text-sm text-muted">Last checked {formatDate("2026-10-17", "long")}, refreshed every 60 seconds</p>
          </div>
          <Reveal className="mt-8 flex items-center gap-4 rounded-[var(--radius-panel)] bg-mint-ink p-6 text-white shadow-card dark:text-deep">
            <span className="relative inline-flex size-12 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/40" aria-hidden="true" />
              <CheckCircle2 className="relative size-10" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-2xl font-bold">All systems operational</p>
              <p className="text-sm opacity-90">Average uptime over the last 90 days: {avg.toFixed(3)}%</p>
            </div>
          </Reveal>
        </div>
      </section>

      <Section className="!pt-10">
        <div className="rounded-[var(--radius-panel)] border border-line bg-surface shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-5 sm:p-6">
            <h2 className="font-display text-xl font-bold text-fg">Services</h2>
            <ul className="flex flex-wrap gap-4 text-xs text-muted" aria-label="Legend">
              <li className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-mint" /> Operational
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-sun" /> Degraded
              </li>
              <li className="inline-flex items-center gap-1.5">
                <span className="size-2.5 rounded-sm bg-coral" /> Incident
              </li>
            </ul>
          </div>
          <ul className="divide-y divide-line">
            {services.map((s) => (
              <li key={s.name} className="p-5 sm:p-6">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="flex items-center gap-2 font-semibold text-fg">
                    <CheckCircle2 className="size-4 text-mint-ink" aria-hidden="true" />
                    {s.name}
                  </p>
                  <p className="text-sm font-semibold text-mint-ink">{s.uptime.toFixed(2)}% uptime</p>
                </div>
                <UptimeBars incidents={s.incidentsDays} degraded={s.degradedDays} name={s.name} />
                <div className="mt-2 flex justify-between text-xs text-subtle">
                  <span>
                    <span className="sm:hidden">60</span>
                    <span className="hidden sm:inline">90</span> days ago
                  </span>
                  <span>Today</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-fg">Past incidents</h2>
            <ol className="mt-6 flex flex-col gap-4">
              {pastIncidents.map((i) => (
                <li key={i.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-fg">{i.title}</h3>
                    <span className="rounded-full bg-mint/15 px-2.5 py-0.5 text-xs font-bold text-mint-ink">{i.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-subtle">
                    {formatDate(i.date, "long")} · Duration {i.duration}
                  </p>
                  <p className="mt-2 text-muted">{i.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-tint-violet p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-fg">Subscribe to updates</h2>
            <p className="mt-1 mb-5 text-sm text-muted">Get notified by email when we create, update or resolve an incident.</p>
            <LeadForm
              consent={false}
              submitLabel="Subscribe"
              successTitle="You're subscribed"
              successBody="We'll email you whenever service status changes."
              fields={[{ name: "email", label: "Email", type: "email", required: true, autoComplete: "email" }]}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
