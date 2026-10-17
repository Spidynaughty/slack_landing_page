import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { Eyebrow } from "@/components/ui/section";
import type { Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

export type Cta = { label: string; href: string };

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items, onDark }: { items: Crumb[]; onDark?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm", onDark ? "text-on-deep-muted" : "text-muted")}>
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />
            {c.href ? (
              <Link href={c.href} className="hover:underline">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className={onDark ? "text-white" : "text-fg"}>
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Hero for inner pages. Entrance uses CSS keyframes so content is visible
 * before hydration and stays put for reduced-motion users.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  visual,
  tone = "violet",
  layout = "split",
  deep = false,
  crumbs,
  note,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: Cta;
  secondary?: Cta;
  visual?: ReactNode;
  tone?: Tone;
  layout?: "split" | "center";
  deep?: boolean;
  crumbs?: Crumb[];
  note?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  const center = layout === "center" || !visual;
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-10 pb-16 sm:pt-14 md:pb-24",
        deep ? "bg-deep text-on-deep" : "bg-bg",
        className,
      )}
    >
      <GradientBlobs variant={deep ? "deep" : "light"} />
      {!deep && <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-b opacity-60" />}
      <div className="container-page relative">
        {crumbs && <Breadcrumbs items={crumbs} onDark={deep} />}
        <div
          className={cn(
            "grid items-center gap-12",
            center ? "mx-auto max-w-4xl text-center" : "lg:grid-cols-[1.02fr_1fr] lg:gap-16",
          )}
        >
          <div className={cn("flex flex-col gap-6", center ? "items-center" : "items-start")}>
            {eyebrow &&
              (deep ? (
                <p className="animate-fade-up rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] text-on-deep uppercase">
                  {eyebrow}
                </p>
              ) : (
                <Eyebrow tone={tone} className="animate-fade-up">
                  {eyebrow}
                </Eyebrow>
              ))}
            <h1
              className={cn(
                "animate-fade-up text-display-lg font-extrabold [animation-delay:80ms]",
                deep ? "text-white" : "text-fg",
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "max-w-2xl animate-fade-up text-lead [animation-delay:160ms]",
                  deep ? "text-on-deep-muted" : "text-muted",
                )}
              >
                {subtitle}
              </p>
            )}
            {(primary || secondary) && (
              <div className="flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:240ms]">
                {primary && (
                  <ButtonLink href={primary.href} size="lg" variant={deep ? "light" : "primary"} arrow>
                    {primary.label}
                  </ButtonLink>
                )}
                {secondary && (
                  <ButtonLink href={secondary.href} size="lg" variant={deep ? "outline-light" : "secondary"}>
                    {secondary.label}
                  </ButtonLink>
                )}
              </div>
            )}
            {note && (
              <div className={cn("animate-fade-up text-sm [animation-delay:300ms]", deep ? "text-on-deep-muted" : "text-subtle")}>
                {note}
              </div>
            )}
            {children}
          </div>
          {visual && !center && (
            <div className="relative animate-fade-up [animation-delay:200ms]">{visual}</div>
          )}
        </div>
        {visual && center && <div className="relative mx-auto mt-14 max-w-5xl animate-fade-up [animation-delay:200ms]">{visual}</div>}
      </div>
    </section>
  );
}
