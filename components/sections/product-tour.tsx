"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, PartyPopper } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type TourStep = {
  title: string;
  body: string;
  icon: IconName;
  tip: string;
  /** Hotspot position over the visual, in percent. */
  hotspot: { x: number; y: number };
  visual: ReactNode;
};

/** Step-by-step interactive walkthrough with hotspots, keyboard navigation and progress. */
export function ProductTour({ steps }: { steps: TourStep[] }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const step = steps[i];
  const last = i === steps.length - 1;

  const go = (n: number) => {
    setDone(false);
    setI(Math.max(0, Math.min(steps.length - 1, n)));
  };

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      if (e.key === "ArrowRight") setI((n) => Math.min(steps.length - 1, n + 1));
      if (e.key === "ArrowLeft") setI((n) => Math.max(0, n - 1));
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [steps.length]);

  return (
    <div ref={regionRef} className="grid gap-8 lg:grid-cols-[22rem_1fr]" role="region" aria-label="Interactive product tour" aria-roledescription="walkthrough">
      <div className="flex flex-col">
        <div className="mb-4 flex items-center justify-between text-sm">
          <span className="font-semibold text-fg">
            Step {i + 1} of {steps.length}
          </span>
          <span className="text-muted">Use ← → keys</span>
        </div>
        <div className="mb-6 h-2 overflow-hidden rounded-full bg-surface-3" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={i + 1} aria-label="Tour progress">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-primary to-pink" animate={{ width: `${((i + (done ? 1 : 0.5)) / steps.length) * 100}%` }} />
        </div>
        <ol className="flex flex-col gap-2">
          {steps.map((s, n) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => go(n)}
                aria-current={n === i ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                  n === i ? "border-primary bg-primary-soft" : "border-transparent hover:bg-surface-2",
                )}
              >
                <span
                  className={cn(
                    "inline-flex size-9 shrink-0 items-center justify-center rounded-xl",
                    n < i || (done && n === i) ? "bg-mint text-white" : n === i ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted",
                  )}
                >
                  {n < i || (done && n === i) ? <Check className="size-4" aria-hidden="true" /> : <Icon name={s.icon} className="size-4" />}
                </span>
                <span className={cn("font-semibold", n === i ? "text-fg" : "text-muted")}>{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative rounded-[var(--radius-panel)] bg-bg-soft p-4 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="relative">
              {step.visual}
              {!done && (
                <span
                  className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${step.hotspot.x}%`, top: `${step.hotspot.y}%` }}
                  aria-hidden="true"
                >
                  <span className="absolute inset-0 size-8 animate-ping rounded-full bg-pink/60" />
                  <span className="relative block size-8 rounded-full border-4 border-white bg-pink shadow-float" />
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${i}-${done}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-card"
            aria-live="polite"
          >
            {done ? (
              <div className="flex flex-col items-start gap-3">
                <PartyPopper className="size-8 text-pink-ink" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold text-fg">You&apos;ve completed the tour!</h2>
                <p className="text-muted">You&apos;re ready to bring your team together. Create a workspace in under a minute.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Link href="/get-started" className={buttonClasses("primary", "md")}>
                    Create your workspace
                  </Link>
                  <button type="button" onClick={() => go(0)} className={buttonClasses("secondary", "md")}>
                    Restart tour
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-fg">{step.title}</h2>
                <p className="mt-2 text-muted">{step.body}</p>
                <p className="mt-4 rounded-xl bg-tint-sun px-4 py-3 text-sm text-fg">
                  <strong className="font-semibold">Try it:</strong> {step.tip}
                </p>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => go(i - 1)} disabled={i === 0} className={buttonClasses("ghost", "md")}>
                    <ArrowLeft className="size-4" aria-hidden="true" /> Back
                  </button>
                  <button type="button" onClick={() => (last ? setDone(true) : go(i + 1))} className={buttonClasses("primary", "md")}>
                    {last ? "Finish tour" : "Next step"} <ArrowRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
