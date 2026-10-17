import { Check, X } from "lucide-react";
import { paidVsFree } from "@/data/pricing";
import { CTABand, FAQ, IconCardGrid } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Paid vs Free: what you get when you upgrade",
  description: `See exactly what changes when you move from ${B} Free to a paid plan: unlimited history, group huddles, unlimited apps, AI, security controls and 24/7 support.`,
  path: "/pricing/paid-vs-free",
});

export default function PaidVsFreePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing", href: "/pricing" }, { label: "Paid vs Free" }]}
        layout="center"
        eyebrow="Paid vs Free"
        tone="mint"
        title={
          <>
            Free gets you started. <span className="text-gradient">Paid takes you further.</span>
          </>
        }
        subtitle="The Free plan is a great way to try things out. When your team relies on it every day, a paid plan removes the limits."
        primary={{ label: "Start a free trial", href: "/get-started" }}
        secondary={{ label: "See all plans", href: "/pricing" }}
      />
      <Section className="!pt-4">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface shadow-card">
          <table className="w-full text-left">
            <caption className="sr-only">Free plan compared with paid plans</caption>
            <thead>
              <tr className="bg-surface-2">
                <th scope="col" className="p-4 text-sm font-semibold text-muted md:p-6">
                  What you get
                </th>
                <th scope="col" className="p-4 font-display text-lg font-bold text-fg md:p-6">
                  Free
                </th>
                <th scope="col" className="bg-primary/8 p-4 font-display text-lg font-bold text-primary md:p-6">
                  Paid plans
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {paidVsFree.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="p-4 text-sm font-semibold text-fg md:p-6 md:text-base">
                    {r.label}
                  </th>
                  <td className="p-4 text-sm text-muted md:p-6">
                    <span className="inline-flex items-start gap-2">
                      <X className="mt-0.5 size-4 shrink-0 text-subtle" aria-hidden="true" />
                      {r.free}
                    </span>
                  </td>
                  <td className="bg-primary/[0.04] p-4 text-sm text-fg md:p-6">
                    <span className="inline-flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-mint-ink" aria-hidden="true" />
                      {r.paid}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Section>
      <Section bg="soft">
        <SectionHeader eyebrow="Signs it's time" title="When teams usually upgrade" />
        <IconCardGrid
          columns={4}
          items={[
            { icon: "archive", title: "History disappears", body: "Important decisions from three months ago are no longer searchable." },
            { icon: "headphones", title: "Calls need more people", body: "You keep moving to other tools for group calls and screen sharing." },
            { icon: "puzzle", title: "You hit the app limit", body: "Your team wants more than 10 integrations and custom workflows." },
            { icon: "link", title: "Partners join the work", body: "You need shared channels with clients, agencies or vendors." },
          ]}
        />
      </Section>
      <FAQ
        items={[
          { q: "What happens to my data if I downgrade?", a: "Nothing is deleted. On the Free plan, messages and files older than 90 days are hidden until you upgrade again." },
          { q: "Can I upgrade just part of my team?", a: "Plans apply to the whole workspace, but you're only billed for active members, so occasional users cost nothing." },
          { q: "Is there a free trial?", a: "Yes, every workspace can try Pro or Business+ free for 30 days without entering a credit card." },
        ]}
      />
      <CTABand title={`Unlock the full ${B}`} subtitle="Try any paid plan free for 30 days." primary={{ label: "Start free trial", href: "/get-started" }} secondary={{ label: "Compare plans", href: "/pricing" }} />
    </>
  );
}
