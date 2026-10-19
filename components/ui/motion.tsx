"use client";

import { animate, motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const tags = {
  div: motion.div,
  li: motion.li,
  section: motion.section,
  article: motion.article,
  ul: motion.ul,
  ol: motion.ol,
  span: motion.span,
} as const;

type Tag = keyof typeof tags;

/** Fades and lifts content into view once. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
  id?: string;
}) {
  const Cmp = tags[as];
  return (
    <Cmp
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      // Quick, so content is readable as soon as it scrolls in; page delays are halved too
      transition={{ duration: 0.35, delay: delay * 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Cmp>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

/** Staggers its StaggerItem children as the group scrolls into view. */
export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const Cmp = tags[as];
  return (
    <Cmp
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
    >
      {children}
    </Cmp>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
  lift = false,
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Adds a springy hover lift. */
  lift?: boolean;
}) {
  const Cmp = tags[as];
  return (
    <Cmp
      className={cn(className)}
      variants={itemVariants}
      whileHover={lift ? { y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } } : undefined}
    >
      {children}
    </Cmp>
  );
}

/** Hover lift for any card. */
export function HoverLift({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

function format(n: number, decimals: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Counts up to `value` the first time it enters the viewport. */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!started.current && !inView) {
      el.textContent = `${prefix}${format(0, decimals)}${suffix}`;
      return;
    }
    if (inView && !started.current) {
      started.current = true;
      const controls = animate(0, value, {
        duration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (v) => {
          el.textContent = `${prefix}${format(v, decimals)}${suffix}`;
        },
      });
      return () => controls.stop();
    }
  }, [inView, reduce, value, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
