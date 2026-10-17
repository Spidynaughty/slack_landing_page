"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** "Was this article helpful?" widget for help articles. */
export function HelpfulWidget() {
  const [vote, setVote] = useState<"yes" | "no" | null>(null);
  return (
    <div className="mt-12 rounded-2xl border border-line bg-bg-soft p-6">
      {vote ? (
        <p role="status" className="font-semibold text-fg">
          {vote === "yes" ? "Thanks! Glad it helped." : "Thanks for telling us. We'll use your feedback to improve this article."}
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-semibold text-fg">Was this article helpful?</p>
          <div className="flex gap-2">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVote(v)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-primary/40 hover:text-primary",
                )}
              >
                {v === "yes" ? <ThumbsUp className="size-4" aria-hidden="true" /> : <ThumbsDown className="size-4" aria-hidden="true" />}
                {v === "yes" ? "Yes" : "No"}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
