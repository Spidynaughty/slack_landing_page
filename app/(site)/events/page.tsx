import { ListingPage } from "@/components/templates/listing-page";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { eventItems } from "@/lib/listing-items";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Events and webinars",
  description: `Join ${B} at conferences, live webinars, hands-on workshops and community meetups, or watch past sessions on demand whenever it suits you.`,
  path: "/events",
});

export default function EventsPage() {
  return (
    <ListingPage
      crumbs={navCrumbs("/events", { section: "resources", label: "Events" })}
      eyebrow="Events"
      tone="sun"
      title={
        <>
          Learn, connect and <span className="text-gradient">get inspired</span>
        </>
      }
      subtitle="Conferences, live webinars, workshops and meetups for everyone who wants to get more from their workspace. Most events are free."
      items={eventItems()}
      filters={[
        { key: "format", label: "Format", options: ["Virtual", "In person", "Hybrid", "On demand"] },
        { key: "category", label: "Type", options: ["Conference", "Webinar", "Workshop", "Meetup"] },
      ]}
      cardStyle="event"
      label="events"
      searchPlaceholder="Search events"
      cta={{
        title: "Never miss an event",
        subtitle: "Join the community to get invites to meetups and early access to webinars.",
        primary: { label: "Join the community", href: "/community" },
        secondary: { label: "Browse resources", href: "/resources" },
      }}
    />
  );
}
