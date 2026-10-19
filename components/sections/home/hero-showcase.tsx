"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Bot, Headphones, Sparkles, Workflow } from "lucide-react";
import { useRef } from "react";
import { ChatMockup } from "@/components/mockups/chat-mockup";
import { Avatar } from "@/components/mockups/parts";

/** Product shot that flattens from a 3D tilt as you scroll, with floating status chips. */
export function HeroShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.94, 1]);
  const chipUp = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const chipDown = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  return (
    <div ref={ref} className="relative mx-auto max-w-5xl [perspective:1800px]">
      <div aria-hidden="true" className="absolute -inset-x-16 -top-10 bottom-0 rounded-[4rem] bg-brand-gradient opacity-30 blur-3xl" />
      <motion.div style={{ rotateX, scale }} className="relative origin-top rounded-[2rem] border border-white/50 bg-white/50 p-2 shadow-float dark:border-white/10 dark:bg-white/5 sm:p-3">
        <ChatMockup script="launch" />
      </motion.div>

      <motion.div style={{ y: chipUp }} className="absolute top-16 -left-6 hidden items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-float md:flex lg:-left-16">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-mint text-white dark:text-deep">
          <Headphones className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Huddle live · 4</span>
          <span className="flex -space-x-1.5 pt-1">
            {(["priya", "marcus", "sofia", "hana"] as const).map((p) => (
              <Avatar key={p} who={p} size="xs" className="rounded-full ring-2 ring-surface" />
            ))}
          </span>
        </span>
      </motion.div>

      <motion.div style={{ y: chipDown }} className="absolute top-1/3 -right-4 hidden w-56 rounded-2xl border border-line bg-surface/95 p-4 shadow-float md:block lg:-right-14">
        <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <Sparkles className="size-3.5" aria-hidden="true" /> AI recap
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">3 decisions, 2 action items for you, launch moved to Oct 28.</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3">
          <motion.div className="h-full rounded-full bg-brand-gradient" initial={{ width: "15%" }} animate={{ width: "82%" }} transition={{ duration: 1.6, repeat: Infinity, repeatType: "reverse" }} />
        </div>
      </motion.div>

      <motion.div style={{ y: chipUp }} className="absolute -bottom-6 left-10 hidden items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-float sm:flex">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-primary text-primary-fg">
          <Bot className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Agent closed 3 tasks</span>
          <span className="text-muted">Saved the team 2.5 hours</span>
        </span>
      </motion.div>

      <motion.div style={{ y: chipDown }} className="absolute right-12 -bottom-8 hidden items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-float lg:flex">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-sun text-deep">
          <Workflow className="size-4" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Workflow ran</span>
          <span className="text-muted">Launch email approved</span>
        </span>
      </motion.div>
    </div>
  );
}
