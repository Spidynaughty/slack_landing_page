import { cn } from "@/lib/utils";

function Bar({ className }: { className?: string }) {
  return <span className={cn("block animate-pulse-soft rounded-full bg-surface-3", className)} />;
}

/** Instant placeholder shown while a dynamic page's content streams in. */
export function PageSkeleton({ variant = "hero" }: { variant?: "hero" | "article" }) {
  return (
    <div role="status" aria-label="Loading page" className="container-page py-14 md:py-20">
      {variant === "hero" ? (
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <Bar className="h-6 w-32" />
            <Bar className="h-14 w-full rounded-2xl" />
            <Bar className="h-14 w-4/5 rounded-2xl" />
            <Bar className="h-5 w-full" />
            <Bar className="h-5 w-2/3" />
            <div className="mt-2 flex gap-3">
              <Bar className="h-12 w-36" />
              <Bar className="h-12 w-36" />
            </div>
          </div>
          <div className="h-80 animate-pulse-soft rounded-[1.25rem] bg-surface-2" />
        </div>
      ) : (
        <div className="max-w-3xl">
          <Bar className="h-6 w-28" />
          <Bar className="mt-6 h-12 w-full rounded-2xl" />
          <Bar className="mt-3 h-12 w-3/4 rounded-2xl" />
          <div className="mt-10 flex flex-col gap-3">
            {Array.from({ length: 6 }, (_, i) => (
              <Bar key={i} className={cn("h-4", i % 3 === 2 ? "w-2/3" : "w-full")} />
            ))}
          </div>
        </div>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
