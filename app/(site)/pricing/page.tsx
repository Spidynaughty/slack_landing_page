import { Building2, GraduationCap, HeartHandshake } from "lucide-react";
import { CTABand, FAQ } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ComparisonTable, PricingPlans } from "@/components/sections/pricing";
import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { getFaqs } from "@/lib/content";

export const generateMetadata = () => buildMetadata({
  title: "Pricing plans",
  description: `Compare ${B} Free, Pro, Business+ and Enterprise plans. Pay only for active users, save with annual billing and start a free 30-day trial.`,
  path: "/pricing",
});

export default async function PricingPage() {
  // Editable in the admin under "Pricing FAQs"
  const faqs = await getFaqs("pricing");
  return (
    <>
      <PageHero
        layout="center"
        eyebrow="Pricing"
        title={
          <>
            Plans that grow <span className="text-gradient">with your team</span>
          </>
        }
        subtitle="Start free, upgrade when you need more. You only pay for people who actually use it."
        className="!pb-6"
      />
      <Section className="!pt-6">
        <PricingPlans />
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
          <p className="text-muted">Not sure which plan is right?</p>
          <ArrowLink href="/pricing/paid-vs-free">Compare paid vs free</ArrowLink>
        </Reveal>
      </Section>

      <LogoCloud title="Trusted by teams of every size" />

      <Section id="compare">
        <SectionHeader eyebrow="Compare plans" title="Every feature, side by side" subtitle="Scroll to see everything included in each plan." />
        <ComparisonTable />
      </Section>

      <Section bg="soft">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: HeartHandshake, title: "Nonprofits", body: "Pro is free for qualified nonprofits with up to 250 members.", tone: "text-pink-ink", href: "/pricing/nonprofits", cta: "See the nonprofit programme" },
            { icon: GraduationCap, title: "Education", body: "85% off Pro and Business+ for schools and universities.", tone: "text-mint-ink", href: "/pricing/education", cta: "See the education discount" },
            { icon: Building2, title: "Enterprise volume", body: "Custom pricing for 1,000+ seats and multi-year agreements.", tone: "text-sky-ink", href: "/pricing/enterprise", cta: "Explore Enterprise" },
          ].map((c) => (
            <Reveal key={c.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <c.icon className={`size-7 ${c.tone}`} aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-bold text-fg">{c.title}</h2>
              <p className="mt-1 text-muted">{c.body}</p>
              <ArrowLink href={c.href} className="mt-4 text-sm">
                {c.cta}
              </ArrowLink>
            </Reveal>
          ))}
        </div>
      </Section>

      <FAQ items={faqs} subtitle="Can't find an answer? Our sales team is happy to help." />

      <CTABand title="Try any paid plan free for 30 days" subtitle="No credit card required. Cancel or downgrade any time." primary={{ label: "Start free trial", href: "/get-started" }} />
    </>
  );
}
