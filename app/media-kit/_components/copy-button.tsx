"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Copies `text` to the clipboard and confirms with a short, screen-reader-friendly status. */
export function CopyButton({
  text,
  label = "Copy",
  copiedLabel = "Copied",
  srLabel,
  className,
  compact = false,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  /** Accessible name when the visible label is not descriptive enough. */
  srLabel?: string;
  className?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2200);
    return () => clearTimeout(t);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
  };

  const visible = state === "copied" ? copiedLabel : state === "failed" ? "Copy failed" : label;

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={srLabel}
        className={cn(
          "inline-flex items-center gap-2 rounded-full font-semibold transition-colors",
          compact
            ? "h-8 px-3 text-xs"
            : "h-10 px-4 text-sm",
          state === "copied"
            ? "bg-mint text-white dark:text-deep"
            : "border border-line-strong bg-surface text-fg hover:border-primary/50 hover:text-primary",
          className,
        )}
      >
        {state === "copied" ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {visible}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Could not copy. Select the text and copy it manually." : ""}
      </span>
    </>
  );
}
