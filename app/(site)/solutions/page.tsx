import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutions } from "@/data/solutions";
import { templates } from "@/data/templates";
import { CTABand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { SolutionCard } from "@/components/templates/solution-template";
import { Icon } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { LogoCloud } from "@/components/sections/logo-cloud";

export const generateMetadata = () => buildMetadata({
  title: "Solutions for every team and industry",
  description: `Discover how ${B} helps engineering, IT, sales, service, marketing, HR and security teams, plus industries from retail and finance to healthcare and education.`,
  path: "/solutions",
});

export default function SolutionsPage() {
  const departments = solutions.filter((s) => s.kind === "department");
  const industries = solutions.filter((s) => s.kind === "industry");
  const useCases = solutions.filter((s) => s.kind === "use-case");
  return (
    <>
      <PageHero
        layout="center"
        eyebrow="Solutions"
        title={
          <>
            Built for <span className="text-gradient">the way you work</span>
          </>
        }
        subtitle="Purpose-built templates, workflows, agents and integrations for every department and industry."
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Talk to sales", href: "/contact-sales" }}
      />
      <LogoCloud />

      <Section id="departments">
        <SectionHeader align="left" eyebrow="By department" title="Solutions for every team" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((s) => (
            <StaggerItem key={s.slug} lift className="h-full">
              <SolutionCard solution={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section id="industries" bg="soft">
        <SectionHeader align="left" eyebrow="By industry" tone="mint" title="Tailored to your industry" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...industries, ...useCases].map((s) => (
            <StaggerItem key={s.slug} lift className="h-full">
              <SolutionCard solution={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="rounded-full bg-sun/20 px-3 py-1 text-xs font-bold tracking-[0.12em] text-sun-ink uppercase">Template gallery</p>
            <h2 className="text-display-md font-bold text-fg">Start with a proven playbook</h2>
            <p className="text-lead text-muted">
              Pre-built channels, canvases, lists, workflows and agents for project kickoffs, incidents, deal rooms, onboarding and
              more.
            </p>
            <Link href="/templates/gallery" className="group inline-flex items-center gap-1.5 font-semibold text-primary">
              Explore all templates
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
          <Stagger className="grid gap-3 sm:grid-cols-2">
            {templates
              .filter((t) => t.popular)
              .map((t) => (
                <StaggerItem key={t.slug}>
                  <Link
                    href={`/templates/${t.slug}`}
                    className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
                  >
                    <span className={cn("inline-flex size-10 items-center justify-center rounded-xl", toneStyles[t.tone].solid)}>
                      <Icon name={t.icon} className="size-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-fg">{t.name}</span>
                      <span className="block truncate text-xs text-muted">{t.includes.join(" · ")}</span>
                    </span>
                  </Link>
                </StaggerItem>
              ))}
          </Stagger>
        </div>
      </Section>

      <CTABand title={`Find your fit with ${B}`} subtitle="Tell us about your team and we'll tailor a demo to your workflows." primary={{ label: "Request a demo", href: "/contact-sales" }} secondary={{ label: "Start free", href: "/get-started" }} />
    </>
  );
}
