"use client";

import { Download, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** UI-only download controls: this demo site ships no asset files, so a click explains that instead. */
export function DownloadActions({ label, formats, className }: { label: string; formats: string[]; className?: string }) {
  const [shown, setShown] = useState<string | null>(null);

  useEffect(() => {
    if (!shown) return;
    const t = setTimeout(() => setShown(null), 4000);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div className={cn("flex flex-col gap-2 sm:items-end", className)}>
      <div className="flex gap-2">
        {formats.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setShown(f)}
            aria-label={`Download ${label} as ${f}`}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-line-strong bg-surface px-4 text-sm font-semibold text-fg transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Download className="size-4" aria-hidden="true" />
            {f}
          </button>
        ))}
      </div>
      <p role="status" aria-live="polite" className="min-h-4 text-xs text-muted">
        {shown && (
          <span className="inline-flex items-center gap-1.5">
            <Info className="size-3.5 text-primary" aria-hidden="true" />
            Demo: download not available
          </span>
        )}
      </p>
    </div>
  );
}
