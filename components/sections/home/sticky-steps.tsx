"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Step = { kicker: string; title: string; body: string; bullets?: string[]; visual: ReactNode };

/**
 * Scroll story: the step list stays pinned on large screens while each visual
 * scrolls past; the step whose visual is in view lights up.
 */
export function StickySteps({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
    {/* Phones and tablets: each step followed by its visual */}
    <ol className="flex flex-col gap-12 lg:hidden">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col gap-5">
          <div>
            <p className="font-mono text-xs font-semibold text-subtle">
              {String(i + 1).padStart(2, "0")} · {s.kicker}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-fg">{s.title}</h3>
            <p className="mt-2 text-muted">{s.body}</p>
            {s.bullets && (
              <ul className="mt-4 flex flex-col gap-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-fg">
                    <Check className="size-4 shrink-0 text-mint-ink" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {s.visual}
        </li>
      ))}
    </ol>
    <div className="hidden gap-16 lg:grid lg:grid-cols-[0.85fr_1.15fr]">
      <div className="sticky top-32 self-start">
        <ol className="flex flex-col gap-2">
          {steps.map((s, i) => (
            <li key={s.title}>
              <div
                className={cn(
                  "relative rounded-3xl border p-5 transition-all duration-500 sm:p-6",
                  i === active ? "border-line bg-surface shadow-card" : "border-transparent opacity-45",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("absolute top-6 bottom-6 left-0 w-1 rounded-full transition-all duration-500", i === active ? "bg-brand-gradient" : "bg-transparent")}
                />
                <p className="font-mono text-xs font-semibold text-subtle">
                  {String(i + 1).padStart(2, "0")} · {s.kicker}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-fg">{s.title}</h3>
                <div className={cn("overflow-hidden transition-all duration-500", i === active ? "max-h-96 opacity-100" : "max-h-0 opacity-0")}>
                  <p className="mt-2 text-muted">{s.body}</p>
                  {s.bullets && (
                    <ul className="mt-4 flex flex-col gap-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-sm font-medium text-fg">
                          <Check className="size-4 shrink-0 text-mint-ink" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col gap-24">
        {steps.map((s, i) => (
          <div
            key={s.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn("transition-all duration-700", i === active ? "opacity-100" : "scale-[0.97] opacity-50")}
          >
            {s.visual}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
