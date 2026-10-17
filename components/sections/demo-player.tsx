"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Captions, Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DemoChapter = { title: string; caption: string; seconds: number; visual: ReactNode };

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/** A simulated demo "video": chapters advance with a progress bar and captions. */
export function DemoPlayer({ chapters }: { chapters: DemoChapter[] }) {
  const total = chapters.reduce((s, c) => s + c.seconds, 0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [captions, setCaptions] = useState(true);

  const ended = time >= total;
  const isPlaying = playing && !ended;

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setTime((t) => Math.min(total, t + 0.25));
    }, 250);
    return () => clearInterval(id);
  }, [isPlaying, total]);

  const ends = chapters.map((_, i) => chapters.slice(0, i + 1).reduce((s, c) => s + c.seconds, 0));
  const current = ended ? chapters.length - 1 : Math.max(0, ends.findIndex((e) => time < e));
  const starts = chapters.map((_, i) => chapters.slice(0, i).reduce((s, c) => s + c.seconds, 0));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
      <div className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-deep shadow-float">
        <div className="relative min-h-[29rem] sm:min-h-[34rem]">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-deep via-deep-2 to-deep p-4 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl"
              >
                {chapters[current].visual}
              </motion.div>
            </AnimatePresence>
          </div>
          {!isPlaying && (
            <button
              type="button"
              onClick={() => {
                if (ended) setTime(0);
                setPlaying(true);
              }}
              className="group absolute inset-0 flex items-center justify-center bg-deep/40 backdrop-blur-[2px]"
              aria-label={ended ? "Replay demo" : time > 0 ? "Resume demo" : "Play demo"}
            >
              <span className="inline-flex size-20 items-center justify-center rounded-full bg-white text-deep shadow-float transition-transform group-hover:scale-110">
                {ended ? <RotateCcw className="size-8" aria-hidden="true" /> : <Play className="ml-1 size-8" aria-hidden="true" />}
              </span>
            </button>
          )}
          {captions && isPlaying && (
            <p className="absolute inset-x-4 bottom-4 mx-auto max-w-xl rounded-lg bg-black/70 px-3 py-2 text-center text-sm text-white" aria-live="polite">
              {chapters[current].caption}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-white">
          <button
            type="button"
            onClick={() => {
              if (ended) {
                setTime(0);
                setPlaying(true);
              } else setPlaying((p) => !p);
            }}
            className="inline-flex size-9 items-center justify-center rounded-full hover:bg-white/10"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          </button>
          <div className="relative h-1.5 flex-1 rounded-full bg-white/15">
            {starts.slice(1).map((s) => (
              <span key={s} className="absolute top-0 h-full w-0.5 bg-deep" style={{ left: `${(s / total) * 100}%` }} aria-hidden="true" />
            ))}
            <span className="absolute inset-y-0 left-0 rounded-full bg-sun" style={{ width: `${(time / total) * 100}%` }} />
            <input
              type="range"
              min={0}
              max={total}
              step={0.25}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              aria-label="Seek"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
          <span className="w-24 text-right font-mono text-xs text-on-deep-muted tabular-nums">
            {fmt(time)} / {fmt(total)}
          </span>
          <button
            type="button"
            onClick={() => setCaptions((c) => !c)}
            aria-pressed={captions}
            className={cn("inline-flex size-9 items-center justify-center rounded-full hover:bg-white/10", captions ? "text-sun" : "text-on-deep-muted")}
            aria-label="Toggle captions"
          >
            <Captions className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs font-bold tracking-[0.14em] text-subtle uppercase">Chapters</p>
        <ol className="flex flex-col gap-2">
          {chapters.map((c, i) => (
            <li key={c.title}>
              <button
                type="button"
                onClick={() => {
                  setTime(starts[i]);
                  setPlaying(true);
                }}
                aria-current={i === current ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-colors",
                  i === current ? "border-primary bg-primary-soft" : "border-line bg-surface hover:bg-surface-2",
                )}
              >
                <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold", i === current ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted")}>
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-fg">{c.title}</span>
                  <span className="block text-xs text-muted">{fmt(starts[i])}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
