import Link from "next/link";
import { ArrowRight, CalendarDays, Info, Mail } from "lucide-react";
import { legalDocs } from "@/data/trust";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneAt, toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Legal center: policies, terms and notices",
  description: `Every ${B} policy in one place: Privacy Policy, Terms of Service, Cookie Policy, accessibility, security, compliance, AI principles and privacy requests.`,
  path: "/legal",
});

type Doc = (typeof legalDocs)[number];

const groups: { id: string; title: string; subtitle: string; docs: Doc[]; cols: string }[] = [
  {
    id: "policies",
    title: "Policies and terms",
    subtitle: "The agreements and notices that apply when you use our websites, apps and services.",
    docs: legalDocs.filter((d) => !d.href.startsWith("/trust")),
    cols: "sm:grid-cols-2 lg:grid-cols-4",
  },
  {
    id: "trust",
    title: "Trust and data",
    subtitle: "How we secure, govern and respond to requests for the information you trust us with.",
    docs: legalDocs.filter((d) => d.href.startsWith("/trust")),
    cols: "sm:grid-cols-2 lg:grid-cols-3",
  },
];

export default function LegalHubPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Legal" }]}
        layout="center"
        eyebrow="Legal"
        tone="violet"
        title={
          <>
            Policies, terms and <span className="text-gradient">commitments</span>
          </>
        }
        subtitle={`The documents that govern how ${B} works, how we handle your information and the promises we make to the people and organizations who use it.`}
        className="!pb-12"
      >
        <div
          role="note"
          className="mt-2 flex max-w-2xl animate-fade-up items-start gap-3 rounded-2xl border border-sun/40 bg-surface/80 p-4 text-left text-sm text-fg shadow-soft backdrop-blur [animation-delay:150ms]"
        >
          <Info className="mt-0.5 size-5 shrink-0 text-sun-ink" aria-hidden="true" />
          <p>
            <span className="font-semibold">Sample documents.</span> These pages are part of a portfolio project and are
            written as realistic examples. They do not create any legal obligations.
          </p>
        </div>
      </PageHero>

      {groups.map((g, gi) => (
        <Section key={g.id} bg={gi % 2 === 1 ? "soft" : "default"} labelledBy={`${g.id}-heading`} className={gi === 0 ? "!pt-6" : undefined}>
          <Reveal className="mb-10 max-w-2xl">
            <h2 id={`${g.id}-heading`} className="text-display-sm font-bold text-fg">
              {g.title}
            </h2>
            <p className="mt-2 text-lead text-muted">{g.subtitle}</p>
          </Reveal>
          <Stagger as="ul" className={cn("grid gap-5", g.cols)}>
            {g.docs.map((d, i) => {
              const t = toneStyles[toneAt(i + gi * 2)];
              return (
                <StaggerItem as="li" key={d.href} lift className="h-full">
                  <Link
                    href={d.href}
                    className="group/doc flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
                  >
                    <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
                      <Icon name={d.icon} className="size-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold text-fg">{d.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted">{d.description}</p>
                    <span className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                      <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
                        <CalendarDays className="size-3.5" aria-hidden="true" />
                        Updated {d.updated}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Read
                        <ArrowRight className="size-4 transition-transform group-hover/doc:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Section>
      ))}

      <Section labelledBy="legal-questions-heading">
        <Reveal className="flex flex-col items-start gap-6 rounded-[var(--radius-panel)] bg-tint-violet p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Mail className="size-6" aria-hidden="true" />
            </span>
            <div className="max-w-2xl">
              <h2 id="legal-questions-heading" className="font-display text-display-sm font-bold text-fg">
                Questions about our policies?
              </h2>
              <p className="mt-2 text-muted">
                Our legal and privacy teams are happy to explain how any of these documents apply to you or your organization.
                We reply to every message within a few business days.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/contact" arrow>
              Contact us
            </ButtonLink>
            <ArrowLink href="/trust">Visit the Trust Center</ArrowLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
