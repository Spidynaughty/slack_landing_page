import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resourceTopics, resourceTypes } from "@/data/resources";
import { ListingPage } from "@/components/templates/listing-page";
import { Reveal } from "@/components/ui/motion";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { resourceItems } from "@/lib/listing-items";

export const metadata = buildMetadata({
  title: "Resources library",
  description: `Guides, reports, webinars, e-books and checklists to help your team get more from ${B}, roll out AI responsibly and work more productively.`,
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <ListingPage
      crumbs={[{ label: "Resources" }]}
      eyebrow="Resources library"
      tone="mint"
      title={
        <>
          Everything you need to <span className="text-gradient">work smarter</span>
        </>
      }
      subtitle="Research, playbooks and on-demand sessions on AI, productivity, security and leadership."
      items={resourceItems()}
      filters={[
        { key: "type", label: "Type", options: resourceTypes },
        { key: "topic", label: "Topic", options: resourceTopics },
      ]}
      cardStyle="resource"
      label="resources"
      searchPlaceholder="Search guides, reports and webinars"
      before={
        <div className="container-page">
          <Reveal>
            <Link
              href="/resources/why-use-slack/ai-era-of-work"
              className="group relative flex flex-col gap-6 overflow-hidden rounded-[var(--radius-panel)] bg-deep p-8 text-on-deep md:flex-row md:items-center md:justify-between md:p-12"
            >
              <div aria-hidden="true" className="absolute -top-20 -right-10 size-80 rounded-full bg-pink/40 blur-3xl" />
              <div className="relative max-w-2xl">
                <p className="text-xs font-bold tracking-[0.14em] text-sun uppercase">Featured report</p>
                <h2 className="mt-2 text-display-sm font-bold text-white">Work in the AI era: what 18,000 desk workers told us</h2>
                <p className="mt-2 text-on-deep-muted">Our biggest study yet on AI adoption, focus time and the future of collaboration.</p>
              </div>
              <span className="relative inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 font-semibold text-deep md:self-auto">
                Read the report
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      }
      cta={{ title: `See ${B} in action`, subtitle: "Watch a five-minute demo or take a guided, interactive tour.", primary: { label: "Watch the demo", href: "/demo" }, secondary: { label: "Take the tour", href: "/product-tour" } }}
    />
  );
}
