import { featuredApps } from "@/data/integrations";
import { AppLinkCard } from "@/components/sections/apps";
import { CTABand } from "@/components/sections/common";
import { Marketplace } from "@/components/sections/marketplace";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Marketplace: 2,600+ apps and agents",
  description: `Browse the ${B} Marketplace to find apps and AI agents for project management, developer tools, CRM, HR, security, analytics and more. Install in a click.`,
  path: "/marketplace",
});

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/marketplace", { section: "product", label: "Marketplace" })}
        layout="center"
        eyebrow="Marketplace"
        tone="mint"
        title={
          <>
            2,600+ apps and agents, <span className="text-gradient">one click away</span>
          </>
        }
        subtitle={`Connect the tools your team already uses, or discover new ones built to work beautifully in ${B}.`}
        className="!pb-10"
      >
        <div className="mt-2 grid w-full max-w-3xl animate-fade-up grid-cols-2 gap-3 [animation-delay:150ms] sm:grid-cols-4">
          {featuredApps.slice(0, 4).map((a) => (
            <AppLinkCard key={a.slug} app={a} />
          ))}
        </div>
      </PageHero>
      <Section className="!pt-8">
        <Marketplace />
      </Section>
      <CTABand
        title="Build an app for the Marketplace"
        subtitle="Reach millions of daily users. Our platform, SDKs and review team will help you ship."
        primary={{ label: "Start building", href: "/developers" }}
        secondary={{ label: "Partner programme", href: "/partners" }}
      />
    </>
  );
}
