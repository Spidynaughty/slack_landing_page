import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Quote } from "lucide-react";
import { customerLogos } from "@/data/customers";
import type { Story, Testimonial } from "@/data/stories";
import type { Faq, Stat } from "@/data/types";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { CustomerLogo } from "@/components/ui/customer-logo";
import { Icon, type IconName } from "@/components/ui/icon";
import { Marquee } from "@/components/ui/marquee";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader, type SectionBg } from "@/components/ui/section";
import { toneStyles, toneAt, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import type { Cta } from "./page-hero";

/* ------------------------------------------------------------------ */
export function LogoCloud({ title = "Trusted by teams at the world's most innovative companies", className }: { title?: string; className?: string }) {
  return (
    <section aria-label="Customers" className={cn("border-y border-line bg-bg py-10", className)}>
      <p className="container-page mb-6 text-center text-sm font-semibold text-muted">{title}</p>
      <Marquee duration={45}>
        {customerLogos.map((l) => (
          <CustomerLogo key={l.name} logo={l} className="mx-8 text-fg/70 transition-colors hover:text-fg sm:mx-10" />
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function StatsBand({ stats, bg = "soft", title }: { stats: Stat[]; bg?: SectionBg; title?: string }) {
  return (
    <Section bg={bg} className="!py-16 md:!py-20">
      {title && <p className="mb-10 text-center font-display text-display-sm font-bold text-fg">{title}</p>}
      <Stagger className={cn("grid gap-8 text-center", stats.length >= 4 ? "grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
        {stats.map((s, i) => (
          <StaggerItem key={s.label}>
            <p className={cn("font-display text-display-md font-extrabold", toneStyles[toneAt(i)].ink)}>
              <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-2 text-sm font-medium text-muted md:text-base">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
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
    <div id={id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
      <Reveal className={cn("flex flex-col items-start gap-5", reverse && "lg:order-2")}>
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2 className="text-display-md font-bold text-fg">{title}</h2>
        <div className="text-lead text-muted">{body}</div>
        {bullets && (
          <ul className="flex flex-col gap-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-fg">
                <span className={cn("mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full", toneStyles[tone].soft)}>
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        )}
        {cta && (
          <ArrowLink href={cta.href} className="mt-2">
            {cta.label}
          </ArrowLink>
        )}
      </Reveal>
      <Reveal delay={0.1} className={cn("relative", reverse && "lg:order-1")}>
        <div aria-hidden="true" className={cn("absolute -inset-6 -z-0 rounded-[2rem] bg-gradient-to-br opacity-80 blur-2xl", toneStyles[tone].gradient)} />
        <div className="relative">{visual}</div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export type IconCard = { icon: IconName; title: string; body: string; href?: string; tone?: Tone; cta?: string };

export function IconCardGrid({ items, columns = 3, variant = "card" }: { items: IconCard[]; columns?: 2 | 3 | 4; variant?: "card" | "plain" }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <Stagger className={cn("grid gap-5", cols)}>
      {items.map((item, i) => {
        const tone = item.tone ?? toneAt(i);
        const t = toneStyles[tone];
        const inner = (
          <>
            <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
              <Icon name={item.icon} className="size-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-fg">{item.title}</h3>
            <p className="mt-2 text-muted">{item.body}</p>
            {item.href && (
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                {item.cta ?? "Learn more"}
                <ArrowRight className="size-4 transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
              </span>
            )}
          </>
        );
        const cls = cn(
          "group/card flex h-full flex-col rounded-[var(--radius-card)] p-6 transition-shadow duration-300",
          variant === "card" ? "border border-line bg-surface shadow-soft hover:shadow-card" : "",
        );
        return (
          <StaggerItem key={item.title} lift={variant === "card"} className="h-full">
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
export function QuoteBlock({ quote, name, role, tone = "violet" }: { quote: string; name: string; role: string; tone?: Tone }) {
  return (
    <Reveal>
      <figure className={cn("relative mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-panel)] p-8 md:p-14", toneStyles[tone].tint)}>
        <Quote className={cn("size-12", toneStyles[tone].ink)} aria-hidden="true" />
        <blockquote className="mt-4 font-display text-display-sm leading-snug font-semibold text-fg">“{quote}”</blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className={cn("inline-flex size-11 items-center justify-center rounded-full font-bold", toneStyles[tone].solid)}>
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
      className="group/story flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft transition-shadow hover:shadow-card"
    >
      <div className={cn("flex h-36 items-center justify-center", t.tint)}>
        <CustomerLogo logo={story.logo} className={cn("text-2xl", t.ink)} />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">{story.industry}</p>
        <h3 className="mt-2 font-display text-lg leading-snug font-bold text-fg">{story.headline}</h3>
        <div className="mt-4 flex gap-6 border-t border-line pt-4">
          {story.stats.slice(0, 2).map((s) => (
            <div key={s.label}>
              <p className={cn("font-display text-2xl font-extrabold", t.ink)}>
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
export function TestimonialCard({ t }: { t: Testimonial }) {
  const s = toneStyles[t.tone];
  return (
    <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
      <Quote className={cn("size-8", s.ink)} aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-fg">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className={cn("inline-flex size-10 items-center justify-center rounded-full text-sm font-bold", s.solid)}>
          {t.name
            .split(" ")
            .map((p) => p[0])
            .join("")}
        </span>
        <span>
          <span className="block text-sm font-semibold text-fg">{t.name}</span>
          <span className="block text-sm text-muted">
            {t.role}, {t.company}
          </span>
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
    <section className="bg-bg px-3 py-10 sm:px-6 md:py-16" aria-label="Get started">
      <div className="relative mx-auto max-w-[82rem] overflow-hidden rounded-[2rem] bg-deep px-6 py-16 text-center md:px-16 md:py-24">
        <GradientBlobs variant="deep" />
        <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-20" />
        <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h2 className="text-display-lg font-extrabold text-white">{title}</h2>
          {subtitle && <p className="text-lead text-on-deep-muted">{subtitle}</p>}
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <ButtonLink href={primary.href} variant="light" size="lg" arrow>
              {primary.label}
            </ButtonLink>
            {secondary && (
              <ButtonLink href={secondary.href} variant="outline-light" size="lg">
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
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeader align="left" eyebrow="FAQ" title={title} subtitle={subtitle} className="lg:sticky lg:top-28 lg:self-start" />
        <div className="flex flex-col gap-3">
          {items.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-line bg-surface px-6 py-5 transition-shadow open:shadow-card"
            >
              <summary className="flex items-center justify-between gap-6 text-left font-semibold text-fg">
                {f.q}
                <span className="relative inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-primary">
                  <span className="absolute h-0.5 w-3 rounded bg-current" />
                  <span className="absolute h-3 w-0.5 rounded bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="mt-3 pr-10 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
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
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-fg shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
          >
            {l.icon && <Icon name={l.icon} className="size-4" />}
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
