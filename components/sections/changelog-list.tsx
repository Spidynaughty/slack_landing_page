"use client";

import { useState } from "react";
import type { ChangeType, ChangelogEntry } from "@/data/releases";
import { cn, formatDate } from "@/lib/utils";

const typeStyle: Record<ChangeType, string> = {
  New: "bg-primary/12 text-primary",
  Improved: "bg-sky/15 text-sky-ink",
  Fixed: "bg-mint/15 text-mint-ink",
  Security: "bg-coral/15 text-coral-ink",
};

/** Change log with platform filter. */
export function ChangelogList({ entries }: { entries: ChangelogEntry[] }) {
  const platforms = ["All", ...Array.from(new Set(entries.map((e) => e.platform)))];
  const [platform, setPlatform] = useState("All");
  const list = entries.filter((e) => platform === "All" || e.platform === platform);
  return (
    <div className="mx-auto max-w-4xl">
      <div role="group" aria-label="Filter by platform" className="mb-10 flex flex-wrap justify-center gap-2">
        {platforms.map((p) => (
          <button
            key={p}
            type="button"
            aria-pressed={platform === p}
            onClick={() => setPlatform(p)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              platform === p ? "bg-primary text-primary-fg" : "bg-surface-2 text-fg hover:bg-surface-3",
            )}
          >
            {p}
          </button>
        ))}
      </div>
      <ol className="flex flex-col gap-6">
        {list.map((e) => (
          <li key={e.version} className="grid gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft md:grid-cols-[11rem_1fr]">
            <div>
              <p className="font-mono text-lg font-bold text-fg">v{e.version}</p>
              <p className="text-sm text-muted">{formatDate(e.date, "long")}</p>
              <p className="mt-2 inline-flex rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-fg">{e.platform}</p>
            </div>
            <ul className="flex flex-col gap-3">
              {e.changes.map((c) => (
                <li key={c.text} className="flex items-start gap-3">
                  <span className={cn("mt-0.5 w-20 shrink-0 rounded-full px-2 py-0.5 text-center text-xs font-bold", typeStyle[c.type])}>{c.type}</span>
                  <span className="text-fg">{c.text}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
