import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Tone } from "@/lib/tones";
import { toneStyles } from "@/lib/tones";
import { Reveal } from "./motion";

export type SectionBg = "default" | "soft" | "deep" | Tone;

export function Section({
  children,
  bg = "default",
  className,
  id,
  containerClassName,
  labelledBy,
}: {
  children: ReactNode;
  bg?: SectionBg;
  className?: string;
  id?: string;
  containerClassName?: string;
  labelledBy?: string;
}) {
  const bgClass =
    bg === "default"
      ? "bg-bg"
      : bg === "soft"
        ? "bg-bg-soft"
        : bg === "deep"
          ? "deep-adaptive bg-deep text-on-deep"
          : toneStyles[bg].tint;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative overflow-x-clip section-y", bgClass, className)}>
      <div className={cn("container-page relative", containerClassName)}>{children}</div>
    </section>
  );
}

const dot: Record<Tone, string> = {
  violet: "bg-primary",
  mint: "bg-mint",
  sun: "bg-sun",
  coral: "bg-coral",
  pink: "bg-pink",
  sky: "bg-sky",
};

/** Small pill label above headings: hairline border, glass fill and a coloured status dot. */
export function Eyebrow({
  children,
  className,
  tone = "violet",
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 py-1 pr-3.5 pl-2 text-[0.8rem] font-semibold text-fg shadow-soft",
        className,
      )}
    >
      <span className={cn("size-2 rounded-full shadow-[0_0_0_3px] shadow-current/15", dot[tone])} />
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone,
  onDark,
  id,
  className,
  as: As = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  tone?: Tone;
  onDark?: boolean;
  id?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-4 md:mb-16",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow &&
        (onDark ? (
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3.5 pl-2 text-[0.8rem] font-semibold text-on-deep">
            <span className="size-2 rounded-full bg-pink" />
            {eyebrow}
          </p>
        ) : (
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        ))}
      <As id={id} className={cn("text-display-md font-extrabold tracking-tight", onDark ? "text-white" : "text-fg")}>
        {title}
      </As>
      {subtitle && <p className={cn("text-lead", onDark ? "text-on-deep-muted" : "text-muted")}>{subtitle}</p>}
    </Reveal>
  );
}
