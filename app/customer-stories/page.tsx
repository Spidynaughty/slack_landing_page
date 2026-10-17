import { stories, testimonials } from "@/data/stories";
import { LogoCloud, StatsBand } from "@/components/sections/common";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { ListingPage } from "@/components/templates/listing-page";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { storyItems } from "@/lib/listing-items";

export const metadata = buildMetadata({
  title: "Customer stories",
  description: `See how retailers, banks, hospitals, tech companies and logistics leaders use ${B} to move faster, automate work and collaborate securely at scale.`,
  path: "/customer-stories",
});

export default function CustomerStoriesPage() {
  const industries = [...new Set(stories.map((s) => s.industry))];
  const regions = [...new Set(stories.map((s) => s.region))];
  return (
    <ListingPage
      crumbs={[{ label: "Customer stories" }]}
      eyebrow="Customer stories"
      tone="coral"
      title={
        <>
          The world&apos;s best teams <span className="text-gradient">work here</span>
        </>
      }
      subtitle="From fast-growing retailers to global banks, see how organizations transform the way they work."
      items={storyItems()}
      filters={[
        { key: "industry", label: "Industry", options: industries },
        { key: "region", label: "Region", options: regions },
      ]}
      cardStyle="story"
      label="stories"
      searchPlaceholder="Search customer stories"
      before={<LogoCloud title="Join 750,000+ organizations, including" />}
      after={
        <>
          <StatsBand
            stats={[
              { value: 47, suffix: "%", label: "faster customer response at Brightline" },
              { value: 2, suffix: "x", label: "faster releases at Kestrel Labs" },
              { value: 18000, label: "hours saved each year at Orbital Freight" },
            ]}
          />
          <Section>
            <SectionHeader eyebrow="In their words" title="What customers say" />
            <TestimonialCarousel items={testimonials} />
          </Section>
        </>
      }
      cta={{ title: "Write your own success story", subtitle: `Talk with our team about what ${B} could do for your organization.` }}
    />
  );
}
