/**
 * Review sections backed by the admin panel. Each one renders nothing until at
 * least one review is published, so the site never shows placeholder praise.
 */
import type { ReactNode } from "react";
import type { Testimonial } from "@/data/stories";
import { QuoteBlock, TestimonialCard } from "@/components/sections/common";
import { WallOfLove } from "@/components/sections/home/walls";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader, type SectionBg } from "@/components/ui/section";
import { getPublishedReviews, getSetting, ratingSummary, type Review } from "@/lib/content";
import { toneAt, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

function toCard(r: Review, i: number): Testimonial {
  return { quote: r.quote, name: r.name, role: r.role, company: r.company, rating: r.rating, tone: toneAt(i) };
}

/** Featured reviews if any are marked, otherwise every published review. */
async function highlightPool() {
  const reviews = await getPublishedReviews();
  const featured = reviews.filter((r) => r.featured);
  return featured.length ? featured : reviews;
}

/** Home page wall: drifting columns once there are enough reviews, a simple grid before that. */
export async function ReviewWall() {
  const [reviews, copy] = await Promise.all([getPublishedReviews(), getSetting("reviewsSection")]);
  if (!reviews.length) return null;
  const cards = reviews.map(toCard);
  return (
    <Section>
      <SectionHeader eyebrow={copy.eyebrow} tone="sun" title={copy.title} subtitle={copy.subtitle} />
      {cards.length >= 6 ? (
        <WallOfLove items={cards} />
      ) : (
        <Stagger className={cn("mx-auto grid gap-5", cards.length === 1 ? "max-w-xl" : cards.length === 2 ? "max-w-4xl md:grid-cols-2" : "md:grid-cols-3")}>
          {cards.map((t, i) => (
            <StaggerItem key={`${t.name}-${i}`} className="h-full">
              <TestimonialCard t={t} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </Section>
  );
}

/**
 * One large quote. Pages pass a different `index` so they show different reviews.
 * With `bare`, it renders without its own Section (for use inside one).
 */
export async function ReviewHighlight({
  index = 0,
  bg,
  tone,
  bare = false,
  className,
  footer,
}: {
  index?: number;
  bg?: SectionBg;
  tone?: Tone;
  bare?: boolean;
  className?: string;
  footer?: ReactNode;
}) {
  const pool = await highlightPool();
  if (!pool.length) return null;
  const r = pool[index % pool.length];
  const quote = (
    <QuoteBlock quote={r.quote} name={r.name} role={[r.role, r.company].filter(Boolean).join(", ")} rating={r.rating} tone={tone ?? toneAt(index)} />
  );
  if (bare) return <div className={className}>{quote}</div>;
  return (
    <Section bg={bg} className={className}>
      {quote}
      {footer}
    </Section>
  );
}

/** A single review card, for sidebars such as the contact sales page. */
export async function ReviewSpotlight({ className }: { className?: string }) {
  const pool = await highlightPool();
  if (!pool.length) return null;
  return (
    <div className={className}>
      <TestimonialCard t={toCard(pool[0], 0)} />
    </div>
  );
}

/** A carousel of every published review. */
export async function ReviewCarousel({ eyebrow = "In their words", title = "What customers say" }: { eyebrow?: string; title?: string }) {
  const reviews = await getPublishedReviews();
  if (!reviews.length) return null;
  return (
    <Section>
      <SectionHeader eyebrow={eyebrow} title={title} />
      <TestimonialCarousel items={reviews.map(toCard)} />
    </Section>
  );
}

/** A row of up to three review cards. */
export async function ReviewGrid({ eyebrow, title, bg, tone }: { eyebrow: string; title: string; bg?: SectionBg; tone?: Tone }) {
  const reviews = (await getPublishedReviews()).slice(0, 3);
  if (!reviews.length) return null;
  return (
    <Section bg={bg}>
      <SectionHeader eyebrow={eyebrow} tone={tone} title={title} />
      <Stagger className={cn("mx-auto grid gap-5", reviews.length === 1 ? "max-w-xl" : reviews.length === 2 ? "max-w-4xl md:grid-cols-2" : "md:grid-cols-3")}>
        {reviews.map((r, i) => (
          <StaggerItem key={r.id} className="h-full">
            <TestimonialCard t={toCard(r, i)} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/** Average star rating from published reviews, or nothing when there are none. */
export async function RatingSummary({ className }: { className?: string }) {
  const summary = ratingSummary(await getPublishedReviews());
  if (!summary) return null;
  const full = Math.round(summary.average);
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="flex items-center gap-0.5 text-sun" role="img" aria-label={`Rated ${summary.average} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} viewBox="0 0 20 20" className={cn("size-4", i < full ? "fill-current" : "fill-line-strong")} aria-hidden="true">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
          </svg>
        ))}
      </span>
      <span>
        <strong className="text-fg">{summary.average.toFixed(1)}</strong> from {summary.count} {summary.count === 1 ? "review" : "reviews"}
      </span>
    </span>
  );
}
