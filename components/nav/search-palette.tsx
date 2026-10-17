"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CornerDownLeft, FileText, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useUI } from "@/components/providers";
import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils";

export type SearchEntry = { label: string; href: string; description?: string; group: string };

const POPULAR = ["/pricing", "/features/channels", "/features/huddles", "/features/ai", "/templates/gallery", "/help", "/get-started"];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Word-start matches in the label rank highest, then word-start matches anywhere, then substrings. */
function score(entry: SearchEntry, terms: string[]) {
  const label = entry.label.toLowerCase();
  const hay = `${label} ${entry.description?.toLowerCase() ?? ""} ${entry.group.toLowerCase()} ${entry.href.replace(/[/-]/g, " ")}`;
  let total = 0;
  for (const t of terms) {
    const wordStart = new RegExp(`(^|[^a-z0-9])${escape(t)}`);
    if (wordStart.test(label)) total += label.startsWith(t) ? 10 : 8;
    else if (wordStart.test(hay)) total += 4;
    else if (label.includes(t)) total += 2;
    else if (hay.includes(t)) total += 1;
    else return 0;
  }
  return total;
}

export function SearchPalette({ entries }: { entries: SearchEntry[] }) {
  const { searchOpen, openSearch, closeSearch } = useUI();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const close = () => {
    closeSearch();
    setQuery("");
    setActive(0);
  };
  useDialog(searchOpen, close, dialogRef, inputRef);

  // Global shortcuts: Ctrl/Cmd+K anywhere, "/" when not typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const typing = target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        openSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openSearch]);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) {
      return POPULAR.map((h) => entries.find((e) => e.href === h)).filter((e): e is SearchEntry => Boolean(e));
    }
    return entries
      .map((e) => ({ e, s: score(e, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((r) => r.e);
  }, [query, entries]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    close();
    router.push(entry.href);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-deep/50 backdrop-blur-sm" onClick={close} aria-hidden="true" />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search the site"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-surface shadow-float"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <Search className="size-5 shrink-0 text-subtle" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter") {
                    e.preventDefault();
                    go(results[active]);
                  }
                }}
                placeholder="Search features, solutions, help articles…"
                className="h-16 w-full bg-transparent text-lg text-fg outline-none placeholder:text-subtle"
                role="combobox"
                aria-expanded="true"
                aria-controls={listId}
                aria-activedescendant={results[active] ? `${listId}-${active}` : undefined}
                aria-autocomplete="list"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={close}
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-subtle hover:bg-surface-2 hover:text-fg"
                aria-label="Close search"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-4 py-12 text-center">
                  <p className="font-semibold text-fg">No results for “{query}”</p>
                  <p className="mt-1 text-sm text-muted">Try “huddles”, “pricing” or “security”.</p>
                </div>
              ) : (
                <>
                  <p className="px-3 pt-2 pb-1 text-xs font-bold tracking-[0.14em] text-subtle uppercase">
                    {query ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular"}
                  </p>
                  <ul ref={listRef} id={listId} role="listbox" aria-label="Search results">
                    {results.map((r, i) => (
                      <li
                        key={r.href}
                        id={`${listId}-${i}`}
                        role="option"
                        aria-selected={i === active}
                        data-index={i}
                        onMouseMove={() => setActive(i)}
                        onClick={() => go(r)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 transition-colors",
                          i === active ? "bg-primary-soft" : "hover:bg-surface-2",
                        )}
                      >
                        <span
                          className={cn(
                            "inline-flex size-9 shrink-0 items-center justify-center rounded-xl",
                            i === active ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted",
                          )}
                        >
                          <FileText className="size-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold text-fg">{r.label}</span>
                          <span className="block truncate text-sm text-muted">
                            {r.group}
                            {r.description ? ` · ${r.description}` : ""}
                          </span>
                        </span>
                        {i === active ? (
                          <CornerDownLeft className="size-4 shrink-0 text-primary" aria-hidden="true" />
                        ) : (
                          <ArrowRight className="size-4 shrink-0 text-subtle" aria-hidden="true" />
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-line bg-bg-soft px-5 py-3 text-xs text-subtle">
              <span className="flex items-center gap-3">
                <span>
                  <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">↑</kbd>{" "}
                  <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">↓</kbd> to navigate
                </span>
                <span>
                  <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">Enter</kbd> to open
                </span>
              </span>
              <span>
                <kbd className="rounded border border-line bg-surface px-1.5 py-0.5 font-sans">Esc</kbd> to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
