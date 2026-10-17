import type { ReactNode } from "react";
import { PageHero, type Crumb, type Cta } from "@/components/sections/page-hero";
import { CTABand } from "@/components/sections/common";
import { Section } from "@/components/ui/section";
import type { Tone } from "@/lib/tones";
import { Listing, type ListingCardStyle, type ListingFilter, type ListingItem } from "./listing";

/** Hero + Template C listing + optional extra content and CTA. */
export function ListingPage({
  crumbs,
  eyebrow,
  title,
  subtitle,
  tone,
  items,
  filters,
  cardStyle,
  label,
  searchPlaceholder,
  pageSize,
  primary,
  secondary,
  before,
  after,
  cta,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
  tone?: Tone;
  items: ListingItem[];
  filters?: ListingFilter[];
  cardStyle: ListingCardStyle;
  label: string;
  searchPlaceholder?: string;
  pageSize?: number;
  primary?: Cta;
  secondary?: Cta;
  before?: ReactNode;
  after?: ReactNode;
  cta?: { title: string; subtitle: string; primary?: Cta; secondary?: Cta | null };
}) {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        tone={tone}
        layout="center"
        primary={primary}
        secondary={secondary}
        className="!pb-12"
      />
      {before}
      <Section className="!pt-8">
        <Listing items={items} filters={filters} cardStyle={cardStyle} label={label} searchPlaceholder={searchPlaceholder} pageSize={pageSize} />
      </Section>
      {after}
      {cta && <CTABand title={cta.title} subtitle={cta.subtitle} primary={cta.primary} secondary={cta.secondary} />}
    </>
  );
}
