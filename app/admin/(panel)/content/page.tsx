import type { Metadata } from "next";
import { resetSetting } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { AnnouncementForm, CtaForm, HeroForm, ReviewsSectionForm, StatsForm } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { readSetting, type SettingKey } from "@/lib/content";

export const metadata: Metadata = { title: "Home page" };

function Reset({ settingKey }: { settingKey: SettingKey }) {
  return (
    <InlineAction action={resetSetting} fields={{ key: settingKey, back: "/admin/content" }} confirm="Go back to the original text for this section?">
      Reset to original
    </InlineAction>
  );
}

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

export default async function ContentPage({ searchParams }: PageProps<"/admin/content">) {
  await requireAdmin();
  const { reset } = await searchParams;
  const token = typeof reset === "string" ? reset : "";
  /** Changes only for the section that was just reset, so only that form remounts. */
  const formKey = (key: SettingKey) => (token.startsWith(`${key}.`) ? token : key);
  const [announcement, hero, stats, cta, reviewsSection] = await Promise.all([
    readSetting("announcement"),
    readSetting("hero"),
    readSetting("stats"),
    readSetting("cta"),
    readSetting("reviewsSection"),
  ]);

  return (
    <>
      <PageHeader title="Home page" description="Edit the words on the home page. Each section saves on its own." />
      {token && (
        <p role="status" className="mb-5 rounded-xl bg-tint-mint px-4 py-3 text-sm font-medium text-mint-ink">
          Section reset to the original text.
        </p>
      )}
      <div className="flex flex-col gap-6">
        <Card title="Announcement" description="The small badge above the headline." actions={<Reset settingKey="announcement" />}>
          <AnnouncementForm key={formKey("announcement")} value={announcement} />
        </Card>
        <Card title="Hero" description="The headline, subtitle and buttons at the top of the page." actions={<Reset settingKey="hero" />}>
          <HeroForm key={formKey("hero")} value={hero} />
        </Card>
        <Card title="Numbers" description="The band of animated figures halfway down the page." actions={<Reset settingKey="stats" />}>
          <StatsForm key={formKey("stats")} value={stats} />
        </Card>
        <Card title="Reviews section" description="Heading for the published reviews. The section only shows once you publish a review." actions={<Reset settingKey="reviewsSection" />}>
          <ReviewsSectionForm key={formKey("reviewsSection")} value={reviewsSection} />
        </Card>
        <Card title="Closing call to action" description="The dark banner at the bottom of the page." actions={<Reset settingKey="cta" />}>
          <CtaForm key={formKey("cta")} value={cta} />
        </Card>
      </div>
    </>
  );
}
