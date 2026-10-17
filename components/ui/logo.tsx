import Link from "next/link";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Original mark: a gradient squircle holding a speech bubble with three typing dots. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[0.7rem] bg-brand-gradient shadow-[0_6px_18px_-6px_rgb(91_61_245/0.7)]",
        className,
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent" />
      <svg viewBox="0 0 24 24" className="relative size-[62%]" focusable="false">
        <path
          d="M5 4h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7.2l-4.1 3.2c-.6.5-1.7.1-1.7-.8V18H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z"
          fill="#fff"
        />
        <circle cx="7.6" cy="11" r="1.55" fill="#5b3df5" />
        <circle cx="12" cy="11" r="1.55" fill="#d946ef" />
        <circle cx="16.4" cy="11" r="1.55" fill="#ff7a1a" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  onDark = false,
  onClick,
}: {
  className?: string;
  onDark?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex items-center gap-2 rounded-lg", className)}
      aria-label={`${site.name} home`}
    >
      <LogoMark />
      <span className={cn("font-display text-[1.3rem] font-extrabold tracking-tight", onDark ? "text-white" : "text-fg")}>
        {site.name}
      </span>
    </Link>
  );
}
