"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Clock, Search, Tag } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { CopyButton } from "../../media-kit/_components/copy-button";

export type OfferType = "Free period" | "Discount" | "Extended trial";

export type Offer = {
  slug: string;
  name: string;
  category: string;
  description: string;
  icon: IconName;
  tone: Tone;
  deal: string;
  detail: string;
  type: OfferType;
  plans: string[];
  /** Pre-formatted expiry, e.g. "Dec 31, 2026". */
  expires: string;
  code: string;
  tag?: "New" | "Popular" | "Ending soon";
};

const ALL = "All";

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
        active ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg hover:bg-surface-3",
      )}
    >
      {children}
    </button>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  const [revealed, setRevealed] = useState(false);
  const t = toneStyles[offer.tone];
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft transition-shadow duration-300 hover:shadow-card">
      <div className={cn("relative p-5", t.tint)}>
        <div className="flex items-start justify-between gap-3">
          <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl shadow-soft", t.solid)}>
            <Icon name={offer.icon} className="size-6" />
          </span>
          {offer.tag && <span className="rounded-full bg-surface px-2.5 py-1 text-xs font-bold text-fg shadow-soft">{offer.tag}</span>}
        </div>
        <p className={cn("mt-4 font-display text-2xl font-extrabold", t.ink)}>{offer.deal}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold text-fg">{offer.name}</h3>
        <p className="text-xs font-bold tracking-[0.1em] text-subtle uppercase">{offer.category}</p>
        <p className="mt-3 text-sm font-medium text-fg">{offer.detail}</p>
        <p className="mt-2 flex-1 text-sm text-muted">{offer.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Eligible plans">
          {offer.plans.map((p) => (
            <li key={p} className="rounded-full border border-line px-2.5 py-0.5 text-xs font-semibold text-muted">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-subtle">
          <Clock className="size-3.5" aria-hidden="true" />
          Offer ends {offer.expires}
        </p>
        <div className="mt-5 border-t border-line pt-4">
          {revealed ? (
            <div className="flex flex-wrap items-center gap-2">
              <code className="flex-1 rounded-lg border border-dashed border-line-strong bg-surface-2 px-3 py-2 font-mono text-sm font-bold tracking-wide text-fg select-all">
                {offer.code}
              </code>
              <CopyButton text={offer.code} compact srLabel={`Copy offer code for ${offer.name}`} />
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setRevealed(true)}
                className="inline-flex h-9 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg transition-colors hover:bg-primary-hover"
              >
                <Tag className="size-4" aria-hidden="true" />
                Get offer code
                <span className="sr-only"> for {offer.name}</span>
              </button>
              <ButtonLink href="/marketplace" variant="ghost" size="sm">
                View app
                <span className="sr-only">: {offer.name} in the marketplace</span>
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function OffersGrid({ offers }: { offers: Offer[] }) {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [type, setType] = useState(ALL);

  const categories = useMemo(() => [...new Set(offers.map((o) => o.category))].sort(), [offers]);
  const types = useMemo(() => [...new Set(offers.map((o) => o.type))], [offers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return offers.filter((o) => {
      if (category !== ALL && o.category !== category) return false;
      if (type !== ALL && o.type !== type) return false;
      if (!q) return true;
      return `${o.name} ${o.category} ${o.deal} ${o.detail} ${o.description}`.toLowerCase().includes(q);
    });
  }, [offers, query, category, type]);

  const filtersActive = category !== ALL || type !== ALL || query !== "";

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft sm:p-5">
        <label className="relative">
          <span className="sr-only">Search partner offers</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps and offers"
            className="h-12 w-full rounded-full border border-line bg-bg pr-4 pl-12 text-fg outline-none placeholder:text-subtle focus:border-primary"
          />
        </label>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <span id="offer-filter-category" className="w-28 shrink-0 text-xs font-bold tracking-[0.12em] text-subtle uppercase">
            Category
          </span>
          <div role="group" aria-labelledby="offer-filter-category" className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap">
            {[ALL, ...categories].map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <span id="offer-filter-type" className="w-28 shrink-0 text-xs font-bold tracking-[0.12em] text-subtle uppercase">
            Offer type
          </span>
          <div role="group" aria-labelledby="offer-filter-type" className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap">
            {[ALL, ...types].map((c) => (
              <Chip key={c} active={type === c} onClick={() => setType(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-5 text-sm text-muted" aria-live="polite">
        Showing {filtered.length} of {offers.length} offers
        {filtersActive && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(ALL);
              setType(ALL);
            }}
            className="ml-3 font-semibold text-primary underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        )}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line-strong p-14 text-center">
          <p className="font-display text-xl font-bold text-fg">No offers match those filters</p>
          <p className="mt-2 text-muted">Try another category or clear your search to see every deal.</p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((o) => (
              <motion.li
                key={o.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <OfferCard offer={o} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
