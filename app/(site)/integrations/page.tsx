import { appCategories, featuredApps } from "@/data/integrations";
import { Mockup } from "@/components/mockups";
import { AppCard, AppOrbit } from "@/components/sections/apps";
import { CTABand, FAQ, IconCardGrid, LinkChips, SplitFeature, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Apps and integrations",
  description: `Connect ${B} with the tools you already use. Bring files, issues, calendars, CRM records and approvals into channels, and automate work across every app.`,
  path: "/integrations",
});

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/integrations", { section: "product", label: "Apps & integrations" })}
        eyebrow="Apps & integrations"
        tone="mint"
        title={
          <>
            Your tools, <span className="text-gradient">working together</span>
          </>
        }
        subtitle={`Bring every app into the flow of work. Approve requests, update records and get alerts without switching tabs, then automate the steps in between.`}
        primary={{ label: "Browse the Marketplace", href: "/marketplace" }}
        secondary={{ label: "Build an integration", href: "/developers" }}
        visual={<AppOrbit apps={featuredApps} />}
      />

      <StatsBand
        stats={[
          { value: 2600, suffix: "+", label: "apps and agents" },
          { value: 1.4, decimals: 1, suffix: "B", label: "app actions every month" },
          { value: 87, suffix: "%", label: "of teams use 5+ integrations" },
          { value: 12, label: "minutes to set up the average app" },
        ]}
      />

      <Section>
        <SectionHeader eyebrow="How it works" title="Three ways apps make work flow" />
        <IconCardGrid
          items={[
            { icon: "bell", title: "Notifications that matter", body: "Get build results, new tickets and deal updates in the right channel, with buttons to act on them." },
            { icon: "click", title: "Take action in place", body: "Approve expenses, assign issues and update records right from a message, with no new tab required." },
            { icon: "workflow", title: "Automate across apps", body: "Chain apps together with Workflow Builder so requests, hand-offs and updates happen on their own." },
          ]}
        />
      </Section>

      <Section bg="soft">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader align="left" className="!mb-0" eyebrow="Featured" title="Popular integrations" />
          <ArrowLink href="/marketplace">See all apps</ArrowLink>
        </div>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredApps.map((a) => (
            <StaggerItem key={a.slug} className="h-full">
              <AppCard app={a} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <div className="flex flex-col gap-24 md:gap-32">
          <SplitFeature
            eyebrow="Workflow Builder"
            tone="sun"
            title="Connect apps without writing code"
            body="Use 200+ pre-built connector steps to move data between apps, trigger actions from messages and keep systems in sync."
            bullets={["Triggers from forms, schedules and app events", "Premium connectors for CRM, ITSM and HR systems", "AI steps that summarize, classify and route"]}
            visual={<Mockup kind="workflow" />}
            cta={{ label: "Explore Workflow Builder", href: "/features/workflow-automation" }}
          />
          <SplitFeature
            reverse
            eyebrow="Enterprise search"
            tone="sky"
            title="Search every connected app at once"
            body="Connected apps feed enterprise search, so one query surfaces files, tickets and records alongside your conversations, with permissions respected."
            bullets={["40+ search connectors", "Permission-aware results", "AI answers with citations"]}
            visual={<Mockup kind="search" />}
            cta={{ label: "Learn about enterprise search", href: "/features/enterprise-search" }}
          />
        </div>
      </Section>

      <Section bg="mint">
        <SectionHeader eyebrow="Browse by category" title="Find apps for every team" />
        <LinkChips className="justify-center" links={appCategories.map((c) => ({ label: c, href: "/marketplace" }))} />
      </Section>

      <FAQ
        items={[
          { q: "How many apps can I connect?", a: "The Free plan includes up to 10 apps and workflows. Paid plans include unlimited apps." },
          { q: "Who can install apps?", a: "By default any member can install approved apps. Admins can require approval and maintain an allow list for the whole organization." },
          { q: "Are third-party apps secure?", a: "Every Marketplace app goes through a security and functionality review, and admins control which scopes each app can access." },
          { q: "Can I build my own integration?", a: "Yes. Our APIs, SDKs and CLI let you build internal tools or publish apps to the Marketplace for others to install." },
        ]}
      />

      <CTABand title={`Bring every tool into ${B}`} subtitle="Start free with up to 10 integrations, then go unlimited on any paid plan." primary={{ label: "Get started", href: "/get-started" }} secondary={{ label: "Browse the Marketplace", href: "/marketplace" }} />
    </>
  );
}
