"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Search, Star, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { appCategories, apps, type App } from "@/data/integrations";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils";
import { AppCard, AppIcon } from "./apps";

function AppModal({ app, onClose }: { app: App | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [added, setAdded] = useState(false);
  useDialog(Boolean(app), () => {
    setAdded(false);
    onClose();
  }, ref);
  return (
    <AnimatePresence>
      {app && (
        <motion.div className="fixed inset-0 z-[85] flex items-end justify-center p-3 sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-deep/55 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            className="relative w-full max-w-lg rounded-3xl border border-line bg-surface p-7 shadow-float"
          >
            <button type="button" onClick={onClose} className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full hover:bg-surface-2" aria-label="Close">
              <X className="size-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-4">
              <AppIcon app={app} size="lg" />
              <div>
                <h2 id="app-title" className="font-display text-2xl font-bold text-fg">
                  {app.name}
                </h2>
                <p className="text-sm text-muted">
                  {app.category} · <Star className="inline size-3.5 fill-sun text-sun" aria-hidden="true" /> {app.rating.toFixed(1)} · {app.installs} installs
                </p>
              </div>
            </div>
            <p className="mt-5 text-muted">{app.description}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {app.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-fg">
                  <Check className="size-4 text-mint-ink" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex items-center justify-between gap-3">
              <p className="text-xs text-subtle">Demo directory: installing is simulated.</p>
              <Button onClick={() => setAdded(true)} variant={added ? "secondary" : "primary"} aria-live="polite">
                {added ? (
                  <>
                    <Check className="size-4" aria-hidden="true" /> Added to workspace
                  </>
                ) : (
                  "Add to workspace"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Filterable app directory with category sidebar, agent toggle and detail modal. */
export function Marketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [agentsOnly, setAgentsOnly] = useState(false);
  const [sort, setSort] = useState<"popular" | "rating" | "name">("popular");
  const [open, setOpen] = useState<App | null>(null);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const parse = (s: string) => parseFloat(s) * (s.endsWith("M") ? 1000 : 1);
    return apps
      .filter((a) => (category === "All" || a.category === category) && (!agentsOnly || a.agent))
      .filter((a) => !q || `${a.name} ${a.description} ${a.category}`.toLowerCase().includes(q))
      .sort((a, b) => (sort === "name" ? a.name.localeCompare(b.name) : sort === "rating" ? b.rating - a.rating : parse(b.installs) - parse(a.installs)));
  }, [query, category, agentsOnly, sort]);

  const counts = (c: string) => (c === "All" ? apps.length : apps.filter((a) => a.category === c).length);

  return (
    <div className="grid gap-8 lg:grid-cols-[15rem_1fr]">
      <aside>
        <div className="lg:sticky lg:top-28">
          <p id="cat-label" className="mb-3 text-xs font-bold tracking-[0.14em] text-subtle uppercase">
            Categories
          </p>
          <ul aria-labelledby="cat-label" className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:flex-col lg:gap-0.5 lg:overflow-visible">
            {["All", ...appCategories].map((c) => (
              <li key={c} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-full px-4 py-2 text-left text-sm font-semibold transition-colors lg:rounded-xl lg:px-3",
                    category === c ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg hover:bg-surface-3 lg:bg-transparent",
                  )}
                >
                  {c}
                  <span className={cn("hidden text-xs lg:inline", category === c ? "text-primary-fg/80" : "text-subtle")}>{counts(c)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search apps</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-subtle" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 2,600+ apps and agents"
              className="h-12 w-full rounded-full border border-line bg-surface pr-4 pl-12 text-fg shadow-soft outline-none placeholder:text-subtle focus:border-primary"
            />
          </label>
          <label className="inline-flex h-12 cursor-pointer items-center gap-2.5 rounded-full border border-line bg-surface px-4 text-sm font-semibold text-fg shadow-soft">
            <input type="checkbox" checked={agentsOnly} onChange={(e) => setAgentsOnly(e.target.checked)} className="size-4 accent-[var(--primary)]" />
            Agents only
          </label>
          <label className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm text-muted shadow-soft">
            Sort
            <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className="bg-transparent font-semibold text-fg outline-none">
              <option value="popular">Most installed</option>
              <option value="rating">Highest rated</option>
              <option value="name">Name</option>
            </select>
          </label>
        </div>
        <p className="mb-5 text-sm text-muted" aria-live="polite">
          {list.length} app{list.length === 1 ? "" : "s"}
          {category !== "All" && ` in ${category}`}
        </p>
        {list.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line-strong p-14 text-center">
            <p className="font-display text-xl font-bold text-fg">No apps found</p>
            <p className="mt-2 text-muted">Try another search or category.</p>
          </div>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((a) => (
                <motion.li key={a.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="h-full">
                  <button type="button" onClick={() => setOpen(a)} className="block h-full w-full text-left transition-transform hover:-translate-y-1" aria-haspopup="dialog">
                    <AppCard app={a} />
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
      <AppModal app={open} onClose={() => setOpen(null)} />
    </div>
  );
}
