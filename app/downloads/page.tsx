import { CTABand, IconCardGrid } from "@/components/sections/common";
import { Downloads } from "@/components/sections/downloads";
import { PageHero } from "@/components/sections/page-hero";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Download the apps",
  description: `Download ${B} for Mac, Windows, Linux, iPhone, iPad and Android, or use it in your browser. Stay connected on every device with automatic updates.`,
  path: "/downloads",
});

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/downloads", { section: "product", label: "Download" })}
        layout="center"
        eyebrow="Downloads"
        title={
          <>
            {B} on <span className="text-gradient">every device</span>
          </>
        }
        subtitle="Native apps for desktop and mobile that stay in sync, update automatically and work beautifully offline."
        className="!pb-8"
      />
      <Section className="!pt-4">
        <Downloads />
      </Section>
      <Section bg="soft">
        <SectionHeader eyebrow="For IT teams" title="Deploy at scale with confidence" />
        <IconCardGrid
          items={[
            { icon: "package", title: "MSI and PKG installers", body: "Silent installs and per-machine deployment for managed fleets.", href: "/help", cta: "Deployment guide" },
            { icon: "devices", title: "Mobile device management", body: "Configure app settings and restrictions through your MDM provider.", href: "/trust/security", cta: "Security controls" },
            { icon: "repeat", title: "Controlled updates", body: "Choose automatic updates or stage releases across your organization.", href: "/changelog", cta: "View release notes" },
          ]}
        />
      </Section>
      <CTABand title="New here? Create a workspace first" subtitle="It takes less than a minute, and it's free for small teams." secondary={{ label: "Sign in", href: "/signin" }} />
    </>
  );
}
