import { changelog } from "@/data/releases";
import { ChangelogList } from "@/components/sections/changelog-list";
import { CTABand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Change log",
  description: `Release notes for every ${B} update across desktop, web, mobile and admin tools, including new features, improvements, bug fixes and security updates.`,
  path: "/changelog",
});

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        layout="center"
        eyebrow="Change log"
        tone="sky"
        title={
          <>
            Release notes, <span className="text-gradient">every week</span>
          </>
        }
        subtitle="New features, improvements and fixes across every platform. Updates roll out automatically."
        primary={{ label: "Download the apps", href: "/downloads" }}
        secondary={{ label: "System status", href: "/status" }}
        className="!pb-8"
      />
      <Section className="!pt-6">
        <ChangelogList entries={changelog} />
      </Section>
      <CTABand title="Always on the latest version" subtitle="Desktop and mobile apps update automatically, so your team never misses an improvement." primary={{ label: "Get the apps", href: "/downloads" }} secondary={{ label: "What's new", href: "/whats-new" }} />
    </>
  );
}
