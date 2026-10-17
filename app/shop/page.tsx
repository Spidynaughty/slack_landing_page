import { CTABand, IconCardGrid } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Shop } from "@/components/sections/shop";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Shop: merch for your team",
  description: `Hoodies, tees, mugs, notebooks and sticker packs from the official ${B} shop. Sustainably made merch for teams, events and your most loyal champions.`,
  path: "/shop",
});

export default function ShopPage() {
  return (
    <>
      <PageHero
        layout="center"
        eyebrow={`${B} Shop`}
        tone="coral"
        title={
          <>
            Merch for people who <span className="text-gradient">ship it</span>
          </>
        }
        subtitle="Sustainably made goodies for your team, your champions and your desk. Every order supports our community programmes."
        className="!pb-8"
      />
      <Section className="!pt-4">
        <Shop />
      </Section>
      <Section bg="soft">
        <IconCardGrid
          items={[
            { icon: "leaf", title: "Sustainably made", body: "Organic and recycled materials, produced in certified facilities." },
            { icon: "truck", title: "Ships worldwide", body: "Free shipping on orders over $75, delivered in 5–8 business days." },
            { icon: "gift", title: "Bulk orders for teams", body: "Kit out a launch or an offsite with custom bundles and volume pricing." },
          ]}
        />
      </Section>
      <CTABand title="Planning a team event?" subtitle="We'll help you put together swag packs for onboarding, offsites and conferences." primary={{ label: "Contact us", href: "/contact" }} secondary={{ label: "Join the community", href: "/community" }} />
    </>
  );
}
