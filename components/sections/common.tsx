import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import type { Story, Testimonial } from "@/data/stories";
import type { Faq, Stat } from "@/data/types";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { CustomerLogo } from "@/components/ui/customer-logo";
import { Icon, type IconName } from "@/components/ui/icon";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader, type SectionBg } from "@/components/ui/section";
import { toneStyles, toneAt, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { Cta } from "./page-hero";

/** Solid background per tone, for decorative glows. */
const glow: Record<Tone, string> = {
  violet: "bg-primary",
  mint: "bg-mint",
  sun: "bg-sun",
  coral: "bg-coral",
  pink: "bg-pink",
  sky: "bg-sky",
};

/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
export function StatsBand({ stats, bg = "default", title }: { stats: Stat[]; bg?: SectionBg; title?: string }) {
  return (
    <Section bg={bg} className="!py-14 md:!py-20">
      {title && <p className="mb-8 text-center font-display text-display-sm font-bold text-fg">{title}</p>}
      <Reveal>
        <div className="border-gradient relative overflow-hidden rounded-[2rem] shadow-card">
          <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-70" />
          <dl
            className={cn(
              "relative grid divide-line",
              stats.length >= 4 ? "grid-cols-2 lg:grid-cols-4 lg:divide-x" : "sm:grid-cols-3 sm:divide-x",
            )}
          >
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-8 text-center sm:py-10">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-display-md font-extrabold tracking-tight text-gradient">
                  <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </dd>
                <dd className="mx-auto mt-2 max-w-[16rem] text-sm font-medium text-muted md:text-base">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/** Feature row presented as a self-contained panel with a soft tone glow. */
export function SplitFeature({
  eyebrow,
  title,
  body,
  bullets,
  visual,
  reverse,
  cta,
  tone = "violet",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  body: ReactNode;
  bullets?: string[];
  visual: ReactNode;
  reverse?: boolean;
  cta?: Cta;
  tone?: Tone;
  id?: string;
}) {
  return (
    <Reveal id={id}>
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 shadow-soft sm:p-10 lg:p-12">
        <div aria-hidden="true" className={cn("absolute -top-32 size-[26rem] rounded-full opacity-25 blur-3xl", reverse ? "-left-32" : "-right-32", glow[tone])} />
        <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div className={cn("flex flex-col items-start gap-5", reverse && "lg:order-2")}>
            {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
            <h2 className="text-display-sm font-extrabold tracking-tight text-fg lg:text-[2.35rem] lg:leading-[1.1]">{title}</h2>
            <div className="text-lead text-muted">{body}</div>
            {bullets && (
              <ul className="grid w-full gap-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 rounded-xl bg-bg-soft px-3 py-2.5 text-fg">
                    <span className={cn("inline-flex size-6 shrink-0 items-center justify-center rounded-full", toneStyles[tone].solid)}>
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-[0.95rem] font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {cta && (
              <ArrowLink href={cta.href} className="mt-1">
                {cta.label}
              </ArrowLink>
            )}
          </div>
          <div className={cn("relative", reverse && "lg:order-1")}>{visual}</div>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
export type IconCard = { icon: IconName; title: string; body: string; href?: string; tone?: Tone; cta?: string };

/** Card grid with a bento rhythm: in 3-column grids of 6, three cards span two columns. */
export function IconCardGrid({ items, columns = 3, variant = "card" }: { items: IconCard[]; columns?: 2 | 3 | 4; variant?: "card" | "plain" }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  const wide = columns === 3 && items.length === 6 ? new Set([0, 3, 4]) : new Set<number>();
  return (
    <Stagger className={cn("grid gap-4 md:gap-5", cols)}>
      {items.map((item, i) => {
        const tone = item.tone ?? toneAt(i);
        const t = toneStyles[tone];
        const big = wide.has(i);
        const inner = (
          <>
            <div aria-hidden="true" className={cn("absolute -right-16 -bottom-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-30", glow[tone])} />
            <span className={cn("relative inline-flex size-12 items-center justify-center rounded-2xl ring-1 ring-inset ring-black/5", t.soft)}>
              <Icon name={item.icon} className="size-6" />
            </span>
            <h3 className={cn("relative mt-6 font-display font-bold tracking-tight text-fg", big ? "text-2xl" : "text-xl")}>{item.title}</h3>
            <p className={cn("relative mt-2 text-muted", big && "max-w-md text-lg")}>{item.body}</p>
            {item.href && (
              <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-primary">
                {item.cta ?? "Learn more"}
                <ArrowUpRight className="size-4 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" aria-hidden="true" />
              </span>
            )}
          </>
        );
        const cls = cn(
          "group/card relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-6 sm:p-7",
          variant === "card" ? "glow-card border border-line bg-surface shadow-soft transition-shadow duration-300 hover:shadow-card" : "",
          big && "lg:min-h-[15rem]",
        );
        return (
          <StaggerItem key={item.title} lift={variant === "card"} className={cn("h-full", big && "lg:col-span-2")}>
            {item.href ? (
              <Link href={item.href} className={cls}>
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

/* ------------------------------------------------------------------ */
export function QuoteBlock({ quote, name, role, tone = "violet", rating }: { quote: string; name: string; role: string; tone?: Tone; rating?: number }) {
  return (
    <Reveal>
      <figure className="border-gradient relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] p-8 text-center shadow-card md:p-14">
        <div aria-hidden="true" className="absolute inset-0 bg-aurora opacity-60" />
        <span aria-hidden="true" className="relative block font-display text-[6rem] leading-[0.6] font-extrabold text-gradient">
          &ldquo;
        </span>
        {rating && <Stars rating={rating} className="relative mt-2 justify-center" />}
        <blockquote className="relative mt-4 font-display text-display-sm leading-snug font-semibold text-fg">{quote}</blockquote>
        <figcaption className="relative mt-8 inline-flex items-center gap-3 text-left">
          <span className={cn("inline-flex size-12 items-center justify-center rounded-full font-bold", toneStyles[tone].solid)}>
            {name
              .split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span>
            <span className="block font-semibold text-fg">{name}</span>
            <span className="block text-sm text-muted">{role}</span>
          </span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
export function StoryCard({ story }: { story: Story }) {
  const t = toneStyles[story.tone];
  return (
    <Link
      href={`/customer-stories/${story.slug}`}
      className="glow-card group/story flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft transition-shadow hover:shadow-card"
    >
      <div className={cn("relative flex h-40 items-center justify-center overflow-hidden", t.tint)}>
        <div aria-hidden="true" className={cn("absolute -top-10 -right-10 size-40 rounded-full opacity-30 blur-2xl", glow[story.tone])} />
        <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-30" />
        <CustomerLogo logo={story.logo} className={cn("relative text-2xl transition-transform duration-500 group-hover/story:scale-110", t.ink)} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">{story.industry}</p>
        <h3 className="mt-2 font-display text-lg leading-snug font-bold text-fg">{story.headline}</h3>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {story.stats.slice(0, 2).map((s) => (
            <div key={s.label} className="rounded-xl bg-bg-soft p-3">
              <p className="font-display text-2xl font-extrabold text-gradient">
                {s.prefix}
                {s.decimals ? s.value.toFixed(s.decimals) : s.value.toLocaleString("en-US")}
                {s.suffix}
              </p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
          Read the story
          <ArrowRight className="size-4 transition-transform group-hover/story:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn("flex gap-0.5 text-sun", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("size-4", i < rating ? "fill-current" : "fill-line-strong")} aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  const s = toneStyles[t.tone];
  return (
    <figure className="glow-card flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
      <Stars rating={t.rating ?? 5} />
      <blockquote className="mt-4 flex-1 text-[1.05rem] leading-relaxed text-fg">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span className={cn("inline-flex size-10 items-center justify-center rounded-full text-sm font-bold", s.solid)}>
          {t.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
        <span>
          <span className="block text-sm font-semibold text-fg">{t.name}</span>
          <span className="block text-sm text-muted">{[t.role, t.company].filter(Boolean).join(", ")}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
export function CTABand({
  title,
  subtitle,
  primary = { label: "Get started", href: "/get-started" },
  secondary = { label: "Request a demo", href: "/contact-sales" },
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: Cta;
  secondary?: Cta | null;
}) {
  return (
    <section className="bg-bg px-3 py-10 sm:px-4 md:py-16" aria-label="Get started">
      {/* Follows the theme: a white card in light mode, deep navy in dark mode */}
      <div className="relative mx-auto max-w-[80rem] overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-16 text-center shadow-card sm:rounded-[2.5rem] md:px-16 md:py-24 dark:grain dark:border-transparent dark:bg-deep">
        <div aria-hidden="true" className="absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-15 blur-3xl dark:opacity-40" />
        <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-b opacity-60 dark:opacity-30" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-white/40" />
        <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="text-display-lg font-extrabold tracking-tight text-fg">{title}</h2>
          {subtitle && <p className="text-lead text-muted">{subtitle}</p>}
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} variant="primary" size="lg" arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </ButtonLink>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function FAQ({ items, title = "Frequently asked questions", subtitle, bg = "default" }: { items: Faq[]; title?: string; subtitle?: string; bg?: SectionBg }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <Section bg={bg}>
      <SectionHeader eyebrow="FAQ" title={title} subtitle={subtitle} />
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {items.map((f, i) => (
          <details key={f.q} className="group rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-shadow open:shadow-card sm:px-6 sm:py-5">
            <summary className="flex items-center gap-4 text-left font-semibold text-fg">
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{f.q}</span>
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-2 text-primary transition-all group-open:rotate-45 group-open:bg-button-gradient group-open:text-white dark:group-open:text-deep">
                <Plus className="size-4" aria-hidden="true" />
              </span>
            </summary>
            <p className="mt-3 pr-12 pl-8 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
export function LinkChips({ links, className }: { links: { label: string; href: string; icon?: IconName }[]; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-2.5", className)}>
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-fg shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-card"
          >
            {l.icon && <Icon name={l.icon} className="size-4" />}
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
