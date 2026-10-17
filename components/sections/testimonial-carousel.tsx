"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/data/stories";
import { cn } from "@/lib/utils";
import { TestimonialCard } from "./common";

/** Scroll-snap carousel with arrow controls and position dots. */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    if (!card) return;
    const step = card.offsetWidth + 20;
    setIndex(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    const el = track.current;
    el?.addEventListener("scroll", onScroll, { passive: true });
    return () => el?.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const scrollTo = (i: number) => {
    const el = track.current;
    const card = el?.querySelectorAll<HTMLElement>("li")[i];
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Customer testimonials">
      <ul
        ref={track}
        className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6"
      >
        {items.map((t, i) => (
          <li
            key={t.name}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
            className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
          >
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" aria-hidden="true">
          {items.map((t, i) => (
            <span key={t.name} className={cn("h-1.5 rounded-full transition-all", i === index ? "w-6 bg-primary" : "w-1.5 bg-line-strong")} />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollTo(Math.max(0, index - 1))}
            disabled={index === 0}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:bg-surface-2 disabled:opacity-40"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo(Math.min(items.length - 1, index + 1))}
            disabled={index >= items.length - 1}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:bg-surface-2 disabled:opacity-40"
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
