"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

export type FeatureTab = {
  id: string;
  label: string;
  icon: IconName;
  tone: Tone;
  title: string;
  body: string;
  href: string;
  cta: string;
  visual: ReactNode;
};

/** Accessible tabs (roving tabindex, arrow keys) that swap product mockups. */
export function FeatureTabs({ tabs }: { tabs: FeatureTab[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = tabs[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product capabilities"
        className="scrollbar-none -mx-4 mb-10 flex gap-2 overflow-x-auto px-4 md:mx-auto md:w-fit md:justify-center md:rounded-full md:border md:border-line md:bg-surface md:p-1.5 md:shadow-soft"
      >
        {tabs.map((t, i) => {
          const selected = i === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${baseId}-tab-${t.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
                selected ? "text-primary-fg" : "border border-line bg-surface text-fg hover:bg-surface-2 md:border-0 md:bg-transparent",
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${baseId}-pill`}
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative inline-flex items-center gap-2">
                <Icon name={t.icon} className="size-4" />
                {t.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="grid items-center gap-10 rounded-[2rem] focus-visible:outline-offset-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start gap-5"
          >
            <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", toneStyles[current.tone].solid)}>
              <Icon name={current.icon} className="size-6" />
            </span>
            <h3 className="text-display-sm font-bold text-fg">{current.title}</h3>
            <p className="text-lead text-muted">{current.body}</p>
            <ArrowLink href={current.href}>{current.cta}</ArrowLink>
          </motion.div>
        </AnimatePresence>
        <div className="relative">
          <div aria-hidden="true" className={cn("absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br blur-2xl", toneStyles[current.tone].gradient)} />
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {current.visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
