import type { CustomerLogo as Logo, LogoShape } from "@/data/customers";
import { cn } from "@/lib/utils";

function Shape({ shape }: { shape: LogoShape }) {
  const common = "size-6 shrink-0";
  switch (shape) {
    case "circle":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="currentColor" />
          <circle cx="15" cy="9" r="3.5" fill="var(--bg)" />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M12 3l9.5 17h-19z" fill="currentColor" />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="currentColor" />
          <rect x="8" y="8" width="8" height="8" rx="2" fill="var(--bg)" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M12 2l10 10-10 10L2 12z" fill="currentColor" />
        </svg>
      );
    case "hex":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M12 2l8.7 5v10L12 22l-8.7-5V7z" fill="currentColor" />
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
          <path d="M2 9c3-3 5-3 8 0s5 3 8 0 3-2 4-2M2 16c3-3 5-3 8 0s5 3 8 0 3-2 4-2" />
        </svg>
      );
    case "ring":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="3.5" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path d="M13 2L4 14h6l-1 8 9-12h-6z" fill="currentColor" />
        </svg>
      );
  }
}

const styles: Record<Logo["style"], string> = {
  bold: "font-display font-extrabold tracking-tight",
  serif: "font-serif font-semibold italic",
  wide: "font-sans font-bold uppercase tracking-[0.18em] text-[0.8em]",
  mono: "font-mono font-bold tracking-tight",
  italic: "font-display font-bold italic",
};

export function CustomerLogo({ logo, className }: { logo: Logo; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-lg whitespace-nowrap", className)}>
      <Shape shape={logo.shape} />
      <span className={styles[logo.style]}>{logo.name}</span>
    </span>
  );
}
