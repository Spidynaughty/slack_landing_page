import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
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
 * Hero for inner pages: centred headline and actions, with any visual shown
 * below in a glowing, gently tilted frame. Entrance uses CSS keyframes so content
 * is visible before hydration and stays put for reduced-motion users.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  visual,
  tone = "violet",
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
  /** Kept for API compatibility; every hero is now centred and stacked. */
  layout?: "split" | "center";
  deep?: boolean;
  crumbs?: Crumb[];
  note?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden pt-10 pb-16 sm:pt-14 md:pb-24",
        deep ? "grain bg-deep text-on-deep" : "bg-bg",
        className,
      )}
    >
      <div aria-hidden="true" className={cn("absolute inset-0 bg-aurora", deep ? "opacity-90" : "opacity-100")} />
      {!deep && <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade-b opacity-50" />}
      <div className="container-page relative">
        {crumbs && (
          <div className="flex justify-center">
            <Breadcrumbs items={crumbs} onDark={deep} />
          </div>
        )}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
          {eyebrow &&
            (deep ? (
              <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3.5 pl-2 text-[0.8rem] font-semibold text-on-deep">
                <span className="size-2 rounded-full bg-pink" />
                {eyebrow}
              </p>
            ) : (
              <Eyebrow tone={tone} className="animate-fade-up">
                {eyebrow}
              </Eyebrow>
            ))}
          <h1
            className={cn(
              "animate-fade-up text-display-lg font-extrabold tracking-tight [animation-delay:80ms]",
              deep ? "text-white" : "text-fg",
            )}
          >
            {title}
          </h1>
          {subtitle && (
            <p className={cn("max-w-2xl animate-fade-up text-lead [animation-delay:160ms]", deep ? "text-on-deep-muted" : "text-muted")}>
              {subtitle}
            </p>
          )}
          {(primary || secondary) && (
            <div className="flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:240ms]">
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
            <div className={cn("animate-fade-up text-sm [animation-delay:300ms]", deep ? "text-on-deep-muted" : "text-subtle")}>{note}</div>
          )}
          {children}
        </div>
        {visual && (
          <div className="relative mx-auto mt-14 max-w-4xl animate-fade-up [perspective:1600px] [animation-delay:220ms] md:mt-16">
            <div aria-hidden="true" className="absolute -inset-x-10 -inset-y-8 rounded-[3rem] bg-brand-gradient opacity-25 blur-3xl" />
            <div className="relative rounded-[1.75rem] border border-white/40 bg-white/50 p-2 shadow-float transition-transform duration-700 [transform:rotateX(8deg)] hover:[transform:rotateX(0deg)] dark:border-white/10 dark:bg-white/5 sm:p-3">
              {visual}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
