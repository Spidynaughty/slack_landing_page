"use client";

import Form from "next/form";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type HelpSearchItem = { slug: string; title: string; excerpt: string; category: string; text: string };

/** Search box that submits to /help/search with a GET query. */
export function HelpSearchBox({ defaultValue = "", className, autoFocus }: { defaultValue?: string; className?: string; autoFocus?: boolean }) {
  return (
    <Form action="/help/search" className={cn("relative w-full", className)} role="search">
      <label htmlFor="help-q" className="sr-only">
        Search the Help Centre
      </label>
      <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-subtle" aria-hidden="true" />
      <input
        id="help-q"
        name="q"
        type="search"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="Search for articles, e.g. “export data”"
        className="h-14 w-full rounded-full border border-line-strong bg-surface pr-32 pl-13 text-fg shadow-soft outline-none placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/15"
      />
      <button type="submit" className="absolute top-1/2 right-2 h-10 -translate-y-1/2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg hover:bg-primary-hover">
        Search
      </button>
    </Form>
  );
}

function score(item: HelpSearchItem, terms: string[]) {
  const title = item.title.toLowerCase();
  const hay = `${title} ${item.excerpt.toLowerCase()} ${item.category.toLowerCase()} ${item.text}`;
  let s = 0;
  for (const t of terms) {
    if (!hay.includes(t)) return 0;
    s += title.includes(t) ? 5 : item.excerpt.toLowerCase().includes(t) ? 2 : 1;
  }
  return s;
}

/** Reads ?q= from the URL and ranks help articles client-side. */
export function HelpSearchResults({ items }: { items: HelpSearchItem[] }) {
  const q = (useSearchParams().get("q") ?? "").trim();
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  const results = terms.length
    ? items
        .map((i) => ({ i, s: score(i, terms) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.i)
    : [];

  return (
    <div>
      <HelpSearchBox defaultValue={q} className="mx-auto max-w-2xl" />
      <p className="mt-8 text-sm text-muted" aria-live="polite">
        {q ? (
          <>
            {results.length} result{results.length === 1 ? "" : "s"} for <strong className="text-fg">“{q}”</strong>
          </>
        ) : (
          "Type a question above to search every Help Centre article."
        )}
      </p>
      {q && results.length === 0 && (
        <div className="mt-6 rounded-3xl border border-dashed border-line-strong p-10 text-center">
          <p className="font-display text-xl font-bold text-fg">No articles found</p>
          <p className="mt-2 text-muted">Try different words, browse categories, or ask our support team.</p>
          <Link href="/help/requests/new" className="mt-5 inline-flex h-11 items-center rounded-full bg-primary px-6 font-semibold text-primary-fg hover:bg-primary-hover">
            Contact support
          </Link>
        </div>
      )}
      <ul className="mt-6 flex flex-col gap-4">
        {results.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/help/${r.slug}`}
              className="group flex items-start justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card"
            >
              <span>
                <span className="text-xs font-bold tracking-[0.12em] text-primary uppercase">{r.category}</span>
                <span className="mt-1 block font-display text-lg font-bold text-fg">{r.title}</span>
                <span className="mt-1 block text-sm text-muted">{r.excerpt}</span>
              </span>
              <ArrowRight className="mt-6 size-5 shrink-0 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
