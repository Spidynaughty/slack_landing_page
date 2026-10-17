import { features, type FeatureCategory } from "@/data/features";
import { Mockup } from "@/components/mockups";
import { CTABand, LinkChips } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureCard } from "@/components/templates/feature-template";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import type { Tone } from "@/lib/tones";

export const metadata = buildMetadata({
  title: "All features",
  description: `Explore every ${B} feature: channels, huddles, canvases, lists, AI, agents, Workflow Builder, enterprise search, integrations and enterprise-grade security.`,
  path: "/features",
});

const groups: { category: FeatureCategory; title: string; subtitle: string; tone: Tone }[] = [
  { category: "Collaborate", title: "Collaborate in one place", subtitle: "Conversations, meetings, docs and projects that stay connected.", tone: "violet" },
  { category: "Work with AI", title: "Work with AI", subtitle: "Assistants and agents that understand your work and get things done.", tone: "pink" },
  { category: "Connect", title: "Connect your knowledge", subtitle: "Bring customers, data and every app into the flow of work.", tone: "mint" },
  { category: "Build", title: "Build and automate", subtitle: "Automate busywork and build the agents your business needs.", tone: "sun" },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything you need to <span className="text-gradient">do your best work</span>
          </>
        }
        subtitle={`${B} brings people, AI and apps together in one platform, from quick messages to company-wide automation.`}
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Watch demo", href: "/demo" }}
        visual={<Mockup kind="chat" />}
      >
        <LinkChips
          className="animate-fade-up [animation-delay:320ms]"
          links={groups.map((g) => ({ label: g.category, href: `#${g.category.toLowerCase().replace(/\s+/g, "-")}` }))}
        />
      </PageHero>

      {groups.map((g, i) => {
        const list = features.filter((f) => f.category === g.category);
        return (
          <Section key={g.category} id={g.category.toLowerCase().replace(/\s+/g, "-")} bg={i % 2 === 0 ? "default" : "soft"}>
            <SectionHeader align="left" eyebrow={g.category} tone={g.tone} title={g.title} subtitle={g.subtitle} />
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((f) => (
                <StaggerItem key={f.slug} lift className="h-full">
                  <FeatureCard feature={f} />
                </StaggerItem>
              ))}
            </Stagger>
          </Section>
        );
      })}

      <Section bg="violet">
        <SectionHeader eyebrow="More to explore" title="Security, integrations and more" />
        <LinkChips
          className="justify-center"
          links={[
            { label: "Apps & integrations", href: "/integrations", icon: "puzzle" },
            { label: "Marketplace", href: "/marketplace", icon: "store" },
            { label: "Trust & security", href: "/trust", icon: "shieldCheck" },
            { label: "Enterprise Key Management", href: "/enterprise-key-management", icon: "key" },
            { label: "What's new", href: "/whats-new", icon: "sparkles" },
            { label: "Downloads", href: "/downloads", icon: "download" },
            { label: "Product tour", href: "/product-tour", icon: "compass" },
          ]}
        />
      </Section>

      <CTABand title="See it all in action" subtitle="Take a five-minute guided tour or start free with your team today." primary={{ label: "Get started free", href: "/get-started" }} secondary={{ label: "Take the product tour", href: "/product-tour" }} />
    </>
  );
}
