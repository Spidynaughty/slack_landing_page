"use client";

import { useInView } from "framer-motion";
import { ArrowUp, FileText, Hash, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/ui/use-reduced-motion";
import { cn } from "@/lib/utils";

const prompts = [
  {
    q: "What did we decide about the fall launch?",
    a: "The launch is locked for October 28. Marcus owns the pricing page copy (due today at 3pm), Sofia is reviewing customer quotes, and the keynote demo is ready for rehearsal on the 24th.",
    sources: [
      { icon: Hash, label: "#launch-fall" },
      { icon: FileText, label: "Launch brief" },
    ],
  },
  {
    q: "Who knows the most about our search index?",
    a: "Daniel Ortiz led the v3 index migration and wrote the runbook. Jonah Kim reviewed the rollout and owns on-call for search this week.",
    sources: [
      { icon: Hash, label: "#eng-platform" },
      { icon: FileText, label: "Search runbook" },
    ],
  },
  {
    q: "Summarize what customers said about agents this month",
    a: "Feedback is strongly positive: teams cite faster first replies and less tab-switching. The top request is more control over approval steps for refunds.",
    sources: [
      { icon: Hash, label: "#voice-of-customer" },
      { icon: FileText, label: "Research notes" },
    ],
  },
];

/** A live-feeling AI prompt: types a question, then streams a cited answer. Cycles through examples. */
export function AiPrompt() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = usePrefersReducedMotion();
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [words, setWords] = useState(0);
  const p = prompts[idx];
  const answerWords = p.a.split(" ");
  const done = words >= answerWords.length;

  useEffect(() => {
    if (!inView || reduce) return;
    let t: ReturnType<typeof setTimeout>;
    if (typed < p.q.length) t = setTimeout(() => setTyped((n) => n + 1), 16);
    else if (!done) t = setTimeout(() => setWords((n) => n + 1), 28);
    else
      t = setTimeout(() => {
        setIdx((i) => (i + 1) % prompts.length);
        setTyped(0);
        setWords(0);
      }, 2600);
    return () => clearTimeout(t);
  }, [inView, reduce, typed, done, p.q.length]);

  const shownQ = reduce ? p.q : p.q.slice(0, typed);
  const shownA = reduce ? p.a : answerWords.slice(0, words).join(" ");
  const showAnswer = reduce || typed >= p.q.length;

  return (
    <div ref={ref} className="relative mx-auto max-w-3xl" role="img" aria-label={`Example: someone asks “${p.q}” and the AI answers with sources.`}>
      <div aria-hidden="true" className="absolute -inset-6 rounded-[2.5rem] bg-brand-gradient opacity-30 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-deep-2/90 p-5 shadow-float sm:p-7">
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5">
          <Sparkles className="size-5 shrink-0 text-pink" aria-hidden="true" />
          <p className="min-h-6 flex-1 text-left text-[0.95rem] text-white sm:text-base">
            {shownQ}
            {!showAnswer && <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse-soft bg-white" />}
          </p>
          <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors", showAnswer ? "bg-button-gradient text-white" : "bg-white/10 text-white/60")}>
            <ArrowUp className="size-4" aria-hidden="true" />
          </span>
        </div>
        <div className={cn("mt-5 min-h-36 text-left transition-opacity duration-300", showAnswer ? "opacity-100" : "opacity-0")}>
          <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-on-deep-muted uppercase">
            <span className="inline-flex size-6 items-center justify-center rounded-lg bg-brand-gradient">
              <Sparkles className="size-3.5 text-white" aria-hidden="true" />
            </span>
            Answer
          </p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-white/90">
            {shownA}
            {showAnswer && !done && !reduce && <span className="ml-1 inline-block size-2 animate-pulse-soft rounded-full bg-pink" />}
          </p>
          <div className={cn("mt-4 flex flex-wrap gap-2 transition-opacity duration-500", done || reduce ? "opacity-100" : "opacity-0")}>
            {p.sources.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-on-deep">
                <s.icon className="size-3.5" aria-hidden="true" /> {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
