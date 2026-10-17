"use client";

import { Check, Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Simulated "Add to workspace" action for Marketplace apps and templates. */
export function InstallButton({ label = "Add to workspace", doneLabel = "Added to workspace", className }: { label?: string; doneLabel?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done">("idle");
  return (
    <div className={cn("flex flex-col items-start gap-1.5", className)}>
      <button
        type="button"
        disabled={state === "busy"}
        onClick={() => {
          if (state !== "idle") return;
          setState("busy");
          setTimeout(() => setState("done"), 900);
        }}
        className={cn(
          "inline-flex h-12 items-center gap-2 rounded-full px-6 font-semibold transition-colors",
          state === "done" ? "border border-mint/40 bg-mint/15 text-mint-ink" : "bg-primary text-primary-fg hover:bg-primary-hover",
        )}
      >
        {state === "busy" ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : state === "done" ? <Check className="size-4" aria-hidden="true" /> : <Plus className="size-4" aria-hidden="true" />}
        {state === "done" ? doneLabel : state === "busy" ? "Adding…" : label}
      </button>
      <p role="status" className="text-xs text-subtle">
        {state === "done" ? "Demo only: nothing was installed." : "Demo directory: installing is simulated."}
      </p>
    </div>
  );
}
