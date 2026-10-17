import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Video } from "lucide-react";
import { events, getEvent } from "@/data/events";
import { LeadForm } from "@/components/forms/lead-form";
import { ArticleTemplate } from "@/components/templates/article";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found" };
  return buildMetadata({ title: event.title, description: event.excerpt, path: `/events/${slug}` });
}

export default function EventPage({ params }: PageProps<"/events/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <EventContent params={params} />
    </Suspense>
  );
}

async function EventContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();
  const t = toneStyles[event.tone];
  const onDemand = event.format === "On demand";

  return (
    <ArticleTemplate
      crumbs={[{ label: "Events", href: "/events" }, { label: event.title }]}
      eyebrow={`${event.category} · ${event.format}`}
      tone={event.tone}
      title={event.title}
      excerpt={event.excerpt}
      sections={event.sections}
      relatedTitle="More events"
      related={events
        .filter((e) => e.slug !== event.slug)
        .slice(0, 3)
        .map((e) => ({ title: e.title, href: `/events/${e.slug}`, eyebrow: e.format, excerpt: e.excerpt, tone: e.tone }))}
      header={
        <ul className="flex flex-wrap gap-3 text-sm">
          <li className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 font-semibold text-fg shadow-soft">
            <CalendarDays className="size-4" aria-hidden="true" />
            {onDemand ? "Available on demand" : formatDate(event.date, "long")}
          </li>
          <li className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 font-semibold text-fg shadow-soft">
            <Clock className="size-4" aria-hidden="true" />
            {event.time}
          </li>
          <li className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 font-semibold text-fg shadow-soft">
            {event.location === "Online" ? <Video className="size-4" aria-hidden="true" /> : <MapPin className="size-4" aria-hidden="true" />}
            {event.location}
          </li>
        </ul>
      }
      aside={
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
          <p className="font-display text-xl font-bold text-fg">{onDemand ? "Watch now" : "Save your seat"}</p>
          <p className="mt-1 mb-5 text-sm text-muted">{onDemand ? "Get instant access to the recording." : "Registration is free. We'll send a calendar invite."}</p>
          <LeadForm
            consent={false}
            submitLabel={onDemand ? "Get the recording" : "Register"}
            successTitle={onDemand ? "Enjoy the session" : "You're registered"}
            successBody={onDemand ? "We've emailed you a link to the recording." : "Check your inbox for the confirmation and calendar invite."}
            fields={[
              { name: "name", label: "Full name", required: true, autoComplete: "name" },
              { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
              { name: "company", label: "Company", autoComplete: "organization" },
            ]}
          />
        </div>
      }
    >
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-fg">Agenda</h2>
        <ol className="mt-5 divide-y divide-line rounded-2xl border border-line">
          {event.agenda.map((a) => (
            <li key={a.time + a.title} className="flex gap-5 p-4">
              <span className={cn("w-24 shrink-0 font-mono text-sm font-semibold", t.ink)}>{a.time}</span>
              <span className="text-fg">{a.title}</span>
            </li>
          ))}
        </ol>
        <h2 className="mt-12 font-display text-2xl font-bold text-fg">Speakers</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {event.speakers.map((s) => (
            <li key={s.name} className="flex items-center gap-4 rounded-2xl border border-line p-4">
              <span className={cn("inline-flex size-12 items-center justify-center rounded-full font-bold", t.solid)}>{s.initials}</span>
              <span>
                <span className="block font-semibold text-fg">{s.name}</span>
                <span className="block text-sm text-muted">{s.role}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ArticleTemplate>
  );
}
