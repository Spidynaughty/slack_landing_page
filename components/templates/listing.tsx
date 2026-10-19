"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import type { CustomerLogo as LogoType } from "@/data/customers";
import { ButtonLink } from "@/components/ui/button";
import { CustomerLogo } from "@/components/ui/customer-logo";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDialog } from "@/components/ui/use-dialog";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

export type ListingCardStyle = "post" | "story" | "event" | "help" | "resource" | "template";

export type ListingItem = {
  id: string;
  title: string;
  excerpt: string;
  href?: string;
  tone: Tone;
  icon?: IconName;
  /** Cover picture for post cards */
  image?: string;
  badge?: string;
  meta: string[];
  facets: Record<string, string>;
  dateBlock?: { month: string; day: string };
  author?: { name: string; initials: string };
  logo?: LogoType;
  location?: string;
  preview?: {
    includes: string[];
    contents: { part: string; title: string; detail: string }[];
    uses: string;
  };
};

export type ListingFilter = { key: string; label: string; options: string[] };

const ALL = "All";

function Card({ item, style, onPreview }: { item: ListingItem; style: ListingCardStyle; onPreview: (i: ListingItem) => void }) {
  const t = toneStyles[item.tone];
  const body = (
    <>
      {style === "post" &&
        (item.image ? (
          <div className="relative flex aspect-[2/1] items-end overflow-hidden p-5">
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover/card:scale-105"
            />
            <span className="relative rounded-full bg-[#fff] px-3 py-1 text-xs font-bold text-[#0b1a2e] shadow-soft">{item.badge}</span>
          </div>
        ) : (
          <div className={cn("relative flex h-40 items-end overflow-hidden p-5", t.tint)}>
            <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-40" />
            <div aria-hidden="true" className={cn("absolute -top-10 -right-10 size-40 rounded-full opacity-60 blur-2xl", t.solid)} />
            <span className={cn("relative rounded-full px-3 py-1 text-xs font-bold", t.solid)}>{item.badge}</span>
          </div>
        ))}
      {style === "story" && item.logo && (
        <div className={cn("flex h-36 items-center justify-center", t.tint)}>
          <CustomerLogo logo={item.logo} className={cn("text-2xl", t.ink)} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {style === "event" && item.dateBlock && (
          <div className="mb-4 flex items-center gap-3">
            <span className={cn("flex size-14 flex-col items-center justify-center rounded-2xl leading-none", t.solid)}>
              <span className="text-[0.65rem] font-bold uppercase">{item.dateBlock.month}</span>
              <span className="font-display text-xl font-extrabold">{item.dateBlock.day}</span>
            </span>
            {item.badge && <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", t.soft)}>{item.badge}</span>}
          </div>
        )}
        {(style === "help" || style === "resource" || style === "template") && (
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", t.soft)}>
              <Icon name={item.icon ?? "file"} className="size-5" />
            </span>
            {item.badge && <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", t.soft)}>{item.badge}</span>}
          </div>
        )}
        {style === "story" && item.badge && <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">{item.badge}</p>}
        <h3 className="mt-1 font-display text-lg leading-snug font-bold text-fg">{item.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.excerpt}</p>
        {item.location && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="size-4" aria-hidden="true" />
            {item.location}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-xs text-subtle">
          {item.author && (
            <span className="inline-flex items-center gap-2 font-semibold text-fg">
              <span className={cn("inline-flex size-6 items-center justify-center rounded-full text-[0.6rem] font-bold", t.solid)}>
                {item.author.initials}
              </span>
              {item.author.name}
            </span>
          )}
          {item.meta.map((m) => (
            <span key={m} className="inline-flex items-center gap-1">
              {m.includes("min") && <Clock className="size-3.5" aria-hidden="true" />}
              {m}
            </span>
          ))}
          <ArrowRight className="ml-auto size-4 text-primary transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </>
  );
  const cls =
    "glow-card group/card flex h-full w-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card";
  if (item.preview) {
    return (
      <button type="button" onClick={() => onPreview(item)} className={cls} aria-haspopup="dialog">
        {body}
      </button>
    );
  }
  return (
    <Link href={item.href ?? "#"} className={cls}>
      {body}
    </Link>
  );
}

function PreviewModal({ item, onClose }: { item: ListingItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(Boolean(item), onClose, ref);
  return (
    <AnimatePresence>
      {item?.preview && (
        <motion.div className="fixed inset-0 z-[85] flex items-end justify-center p-3 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-deep/55 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-line bg-surface shadow-float"
          >
            <div className={cn("relative p-6 sm:p-8", toneStyles[item.tone].tint)}>
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full bg-surface/70 hover:bg-surface"
                aria-label="Close preview"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
              <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", toneStyles[item.tone].solid)}>
                <Icon name={item.icon ?? "template"} className="size-6" />
              </span>
              <p className={cn("mt-4 text-xs font-bold tracking-[0.12em] uppercase", toneStyles[item.tone].ink)}>{item.badge}</p>
              <h2 id="preview-title" className="mt-1 text-display-sm font-bold text-fg">
                {item.title}
              </h2>
              <p className="mt-2 max-w-xl text-muted">{item.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.preview.includes.map((p) => (
                  <span key={p} className="rounded-full bg-surface px-3 py-1 text-xs font-semibold text-fg shadow-soft">
                    {p}
                  </span>
                ))}
                <span className="rounded-full px-3 py-1 text-xs font-semibold text-muted">Used by {item.preview.uses} teams</span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-display text-lg font-bold text-fg">What&apos;s inside</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {item.preview.contents.map((c) => (
                  <li key={c.title} className="rounded-2xl border border-line p-4">
                    <span className="text-xs font-bold tracking-wide text-primary uppercase">{c.part}</span>
                    <span className="mt-1 block font-semibold text-fg">{c.title}</span>
                    <span className="mt-1 block text-sm text-muted">{c.detail}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap justify-end gap-2">
                <ButtonLink href={item.href ?? "/product-tour"} variant="secondary">
                  {item.href ? "View full template" : "Take the product tour"}
                </ButtonLink>
                <ButtonLink href="/get-started" arrow>
                  Use this template
                </ButtonLink>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Template C: searchable, filterable, paginated card listing. */
export function Listing({
  items,
  filters = [],
  cardStyle,
  pageSize = 9,
  searchPlaceholder = "Search",
  label,
}: {
  items: ListingItem[];
  filters?: ListingFilter[];
  cardStyle: ListingCardStyle;
  pageSize?: number;
  searchPlaceholder?: string;
  label: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState<ListingItem | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      for (const [k, v] of Object.entries(selected)) {
        if (v && v !== ALL && item.facets[k] !== v) return false;
      }
      if (!q) return true;
      return `${item.title} ${item.excerpt} ${Object.values(item.facets).join(" ")}`.toLowerCase().includes(q);
    });
  }, [items, query, selected]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);
  const activeCount = Object.values(selected).filter((v) => v && v !== ALL).length;

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-28">
      <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-line bg-surface p-4 shadow-soft sm:p-5">
        <div className="flex gap-3">
          <label className="relative flex-1">
            <span className="sr-only">{searchPlaceholder}</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-subtle" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="h-12 w-full rounded-full border border-line bg-bg pr-4 pl-12 text-fg outline-none placeholder:text-subtle focus:border-primary"
            />
          </label>
          {filters.length > 0 && (
            <button
              type="button"
              onClick={() => setShowFilters((s) => !s)}
              aria-expanded={showFilters}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-fg md:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters{activeCount > 0 && ` (${activeCount})`}
            </button>
          )}
        </div>
        {filters.length > 0 && (
          <div className={cn("flex-col gap-3 md:flex", showFilters ? "flex" : "hidden")}>
            {filters.map((f) => (
              <div key={f.key} className="flex flex-col gap-2 md:flex-row md:items-center">
                <span id={`filter-${f.key}`} className="w-24 shrink-0 text-xs font-bold tracking-[0.12em] text-subtle uppercase">
                  {f.label}
                </span>
                <div role="group" aria-labelledby={`filter-${f.key}`} className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap">
                  {[ALL, ...f.options].map((o) => {
                    const active = (selected[f.key] ?? ALL) === o;
                    return (
                      <button
                        key={o}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setSelected((s) => ({ ...s, [f.key]: o }));
                          setPage(1);
                        }}
                        className={cn(
                          "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                          active ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg hover:bg-surface-3",
                        )}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="mb-5 text-sm text-muted" aria-live="polite">
        Showing {visible.length} of {filtered.length} {label}
        {query && ` matching “${query}”`}
        {(activeCount > 0 || query) && (
          <button
            type="button"
            onClick={() => {
              setSelected({});
              setQuery("");
              setPage(1);
            }}
            className="ml-3 font-semibold text-primary underline-offset-2 hover:underline"
          >
            Clear all
          </button>
        )}
      </p>

      {visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-line-strong p-14 text-center">
          <p className="font-display text-xl font-bold text-fg">Nothing matches yet</p>
          <p className="mt-2 text-muted">Try a different search term or clear your filters.</p>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card item={item} style={cardStyle} onPreview={setPreview} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(current - 1)}
            disabled={current === 1}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg hover:bg-surface-2 disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === current ? "page" : undefined}
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-full text-sm font-semibold",
                p === current ? "bg-primary text-primary-fg" : "border border-line text-fg hover:bg-surface-2",
              )}
            >
              <span className="sr-only">Page </span>
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo(current + 1)}
            disabled={current === pages}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg hover:bg-surface-2 disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </nav>
      )}

      <PreviewModal item={preview} onClose={() => setPreview(null)} />
    </div>
  );
}
