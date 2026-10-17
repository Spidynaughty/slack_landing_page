import Link from "next/link";
import { ArrowRight, Headset, MessagesSquare, Activity } from "lucide-react";
import { helpArticles, helpCategories } from "@/data/help";
import { ListingPage } from "@/components/templates/listing-page";
import { Icon } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, slugify } from "@/lib/utils";
import { helpItems } from "@/lib/listing-items";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Help Centre",
  description: `Step-by-step guides, troubleshooting and answers for everything in ${B}: getting started, channels, administration, billing, security and integrations.`,
  path: "/help",
});

export default function HelpPage() {
  return (
    <ListingPage
      crumbs={navCrumbs("/help", { section: "resources", label: "Help Centre" })}
      eyebrow="Help Centre"
      tone="violet"
      title={
        <>
          How can we <span className="text-gradient">help?</span>
        </>
      }
      subtitle="Search step-by-step guides, or browse by topic. Press Ctrl K anywhere to search the whole site."
      items={helpItems()}
      filters={[{ key: "category", label: "Topic", options: helpCategories.map((c) => c.name) }]}
      cardStyle="help"
      label="articles"
      searchPlaceholder="Search help articles, e.g. “huddle” or “SSO”"
      before={
        <div className="container-page">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {helpCategories.map((c) => {
              const count = helpArticles.filter((a) => a.category === c.name).length;
              return (
                <StaggerItem key={c.name} lift className="h-full">
                  <Link
                    href={`/help/categories/${slugify(c.name)}`}
                    className="group flex h-full items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card"
                  >
                    <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl", toneStyles[c.tone].soft)}>
                      <Icon name={c.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2 font-display text-lg font-bold text-fg">
                        {c.name}
                        <ArrowRight className="size-4 text-subtle transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                      <span className="mt-1 block text-sm text-muted">{c.description}</span>
                      <span className="mt-2 block text-xs font-semibold text-subtle">
                        {count} article{count === 1 ? "" : "s"}
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      }
      after={
        <Section bg="soft">
          <div className="grid gap-5 md:grid-cols-3">
            {[
              { icon: Headset, title: "Contact support", body: "Our team answers around the clock on paid plans.", href: "/help/requests/new", cta: "Submit a request" },
              { icon: MessagesSquare, title: "Ask the community", body: `Thousands of admins and power users share ${B} tips.`, href: "/community", cta: "Visit the community" },
              { icon: Activity, title: "System status", body: "Check real-time status and past incidents.", href: "/status", cta: "View status" },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <c.icon className="size-7 text-primary" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-bold text-fg">{c.title}</h2>
                <p className="mt-1 text-muted">{c.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {c.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      }
    />
  );
}
