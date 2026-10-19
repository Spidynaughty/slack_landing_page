import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { innovations } from "@/data/releases";
import { Mockup } from "@/components/mockups";
import { CTABand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";

export const generateMetadata = () => buildMetadata({
  title: "Featured releases",
  description: `A season-by-season look at the biggest ${B} releases: the agentic work release, AI search answers, Lists automations, canvas templates and more.`,
  path: "/innovations",
});

export default function InnovationsPage() {
  return (
    <>
      <PageHero
        layout="center"
        eyebrow="Featured releases"
        tone="pink"
        title={
          <>
            A year of <span className="text-gradient">big releases</span>
          </>
        }
        subtitle={`Every season we ship major new capabilities to ${B}. Here are the releases that changed how teams work.`}
        primary={{ label: "What's new now", href: "/whats-new" }}
        secondary={{ label: "Change log", href: "/changelog" }}
      />
      <Section className="!pt-4">
        <ol className="relative flex flex-col gap-20 before:absolute before:top-2 before:bottom-2 before:left-[0.6rem] before:w-px before:bg-line-strong md:before:left-1/2">
          {innovations.map((r, i) => {
            const t = toneStyles[r.tone];
            return (
              <li key={r.season} className="relative grid gap-8 pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                <span aria-hidden="true" className={cn("absolute top-2 left-0 size-5 rounded-full ring-4 ring-bg md:left-1/2 md:-translate-x-1/2", t.solid)} />
                <Reveal className={cn("flex flex-col gap-4", i % 2 === 1 ? "md:order-2 md:pl-10" : "md:pr-10 md:text-right md:items-end")}>
                  <p className={cn("text-sm font-bold tracking-[0.12em] uppercase", t.ink)}>
                    {r.season} · {formatDate(r.date)}
                  </p>
                  <h2 className="text-display-sm font-bold text-fg">{r.title}</h2>
                  <p className="text-lead text-muted">{r.summary}</p>
                  <ul className="flex w-full flex-col gap-3">
                    {r.highlights.map((h) => (
                      <li key={h.title}>
                        <Link
                          href={h.href}
                          className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-4 text-left shadow-soft transition-shadow hover:shadow-card"
                        >
                          <span>
                            <span className="block font-semibold text-fg">{h.title}</span>
                            <span className="block text-sm text-muted">{h.body}</span>
                          </span>
                          <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.1} className={cn(i % 2 === 1 ? "md:order-1 md:pr-10" : "md:pl-10")}>
                  <Mockup kind={r.mockup} />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Section>
      <CTABand title="Be first to try what's next" subtitle="Join the community to get early access to betas and roadmap previews." primary={{ label: "Join the community", href: "/community" }} secondary={{ label: "Get started", href: "/get-started" }} />
    </>
  );
}
