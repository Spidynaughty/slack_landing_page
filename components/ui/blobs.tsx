import { cn } from "@/lib/utils";

/** Animated gradient blobs; pure CSS so they cost nothing to hydrate and stop for reduced motion. */
export function GradientBlobs({ className, variant = "light" }: { className?: string; variant?: "light" | "deep" }) {
  const o = variant === "deep" ? "opacity-45" : "opacity-55 dark:opacity-30";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className={cn("absolute -top-24 -left-20 size-[28rem] rounded-full bg-primary/45 blur-3xl animate-blob", o)} />
      <div
        className={cn("absolute top-10 -right-24 size-[24rem] rounded-full bg-pink/40 blur-3xl animate-blob", o)}
        style={{ animationDelay: "-6s" }}
      />
      <div
        className={cn("absolute -bottom-32 left-1/3 size-[26rem] rounded-full bg-sun/40 blur-3xl animate-blob", o)}
        style={{ animationDelay: "-12s" }}
      />
    </div>
  );
}
