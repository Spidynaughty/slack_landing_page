"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Sparkles } from "lucide-react";
import { useState } from "react";
import { comparison, plans, type CellValue, type PlanId } from "@/data/pricing";
import { buttonClasses } from "@/components/ui/button";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";

function Price({ value, annual }: { value: number | null; annual: boolean }) {
  if (value === null) {
    return <p className="font-display text-4xl font-extrabold text-fg">Custom</p>;
  }
  return (
    <div className="flex items-end gap-1.5">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${value}-${annual}`}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="font-display text-5xl font-extrabold tracking-tight text-fg tabular-nums"
        >
          ${value % 1 === 0 ? value : value.toFixed(2)}
        </motion.span>
      </AnimatePresence>
      {value > 0 && <span className="pb-1.5 text-sm leading-tight text-muted">USD per user / month</span>}
    </div>
  );
}

export function PricingPlans() {
  const [annual, setAnnual] = useState(true);
  return (
    <div>
      <div className="mb-12 flex flex-col items-center gap-3">
        <div role="radiogroup" aria-label="Billing period" className="relative inline-flex rounded-full border border-line bg-surface p-1.5 shadow-soft">
          {[
            { v: false, label: "Monthly" },
            { v: true, label: "Annual" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              role="radio"
              aria-checked={annual === o.v}
              onClick={() => setAnnual(o.v)}
              className={cn("relative rounded-full px-6 py-2.5 text-sm font-semibold transition-colors", annual === o.v ? "text-primary-fg" : "text-fg")}
            >
              {annual === o.v && (
                <motion.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{o.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm font-semibold text-mint-ink">Save up to 17% with annual billing</p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((p) => {
          const t = toneStyles[p.tone];
          const price = annual ? p.annual : p.monthly;
          return (
            <li
              key={p.id}
              className={cn(
                "relative flex flex-col rounded-[var(--radius-panel)] border bg-surface p-7 transition-shadow",
                p.highlight ? "border-primary shadow-glow ring-1 ring-primary" : "border-line shadow-soft hover:shadow-card",
              )}
            >
              {p.highlight && (
                <span className="absolute -top-3.5 left-7 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-fg">
                  <Sparkles className="size-3.5" aria-hidden="true" /> Most popular
                </span>
              )}
              <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase", t.soft)}>{p.name}</span>
              <p className="mt-4 min-h-12 text-sm text-muted">{p.tagline}</p>
              <div className="mt-5 min-h-[4.5rem]">
                <Price value={price} annual={annual} />
                {price !== null && price > 0 && (
                  <p className="mt-1 text-xs text-subtle">{annual ? "Billed annually" : "Billed monthly"}</p>
                )}
                {price === null && <p className="mt-1 text-xs text-subtle">Volume pricing for large organizations</p>}
              </div>
              <Link
                href={p.cta.href}
                className={buttonClasses(p.highlight ? "primary" : "secondary", "md", "mt-6 w-full")}
              >
                {p.cta.label}
              </Link>
              <Link
                href={`/pricing/${p.id === "business" ? "business-plus" : p.id}`}
                className="mt-3 text-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                See {p.name} details
              </Link>
              {p.includesFrom && <p className="mt-7 text-sm font-semibold text-fg">{p.includesFrom}</p>}
              <ul className={cn("flex flex-col gap-3 text-sm", p.includesFrom ? "mt-3" : "mt-7")}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-muted">
                    <Check className={cn("mt-0.5 size-4 shrink-0", t.ink)} aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Cell({ v }: { v: CellValue }) {
  if (v === true) return <Check className="mx-auto size-5 text-mint-ink" aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto size-4 text-subtle" aria-label="Not included" />;
  return <span className="text-sm text-fg">{v}</span>;
}

const ids: PlanId[] = ["free", "pro", "business", "enterprise"];

/** Full comparison table with a sticky plan header row. */
export function ComparisonTable() {
  const [mobilePlan, setMobilePlan] = useState<PlanId>("business");
  return (
    <div>
      {/* Mobile: choose one plan to compare */}
      <div className="mb-4 flex gap-2 overflow-x-auto md:hidden" role="tablist" aria-label="Choose plan">
        {plans.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={mobilePlan === p.id}
            onClick={() => setMobilePlan(p.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold",
              mobilePlan === p.id ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg",
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="rounded-[var(--radius-panel)] border border-line bg-surface shadow-card">
        <table className="w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">Compare plan features</caption>
          <thead>
            <tr>
              <th scope="col" className="sticky top-[4.5rem] z-10 rounded-tl-[var(--radius-panel)] border-b border-line bg-surface/95 p-4 text-sm font-semibold text-muted backdrop-blur md:p-5">
                Features
              </th>
              {plans.map((p, i) => (
                <th
                  key={p.id}
                  scope="col"
                  className={cn(
                    "sticky top-[4.5rem] z-10 border-b border-line bg-surface/95 p-4 text-center backdrop-blur md:p-5",
                    p.id !== mobilePlan && "hidden md:table-cell",
                    i === plans.length - 1 && "rounded-tr-[var(--radius-panel)]",
                  )}
                >
                  <span className={cn("block font-display text-lg font-bold", p.highlight ? "text-primary" : "text-fg")}>{p.name}</span>
                  <Link href={p.cta.href} className="mt-1 hidden text-xs font-semibold text-primary hover:underline md:inline-block">
                    {p.cta.label}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          {comparison.map((g) => (
            <tbody key={g.title}>
              <tr>
                <th colSpan={5} scope="colgroup" className="bg-surface-2 px-4 py-3 text-left font-display text-sm font-bold text-fg md:px-5">
                  {g.title}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.label} className="group">
                  <th scope="row" className="border-b border-line p-4 text-sm font-medium text-fg group-hover:bg-bg-soft md:px-5">
                    {r.label}
                  </th>
                  {ids.map((id) => (
                    <td
                      key={id}
                      className={cn(
                        "border-b border-line p-4 text-center group-hover:bg-bg-soft md:px-5",
                        id !== mobilePlan && "hidden md:table-cell",
                        id === "business" && "bg-primary/[0.04]",
                      )}
                    >
                      <Cell v={r.values[id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
