import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const adminInput =
  "h-11 w-full rounded-xl border border-line-strong bg-surface px-3.5 text-[0.95rem] text-fg outline-none transition-colors placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-danger";

export const adminTextarea = cn(adminInput, "h-auto min-h-28 py-2.5 leading-relaxed");

export function PageHeader({ title, description, action }: { title: string; description?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({
  title,
  description,
  children,
  className,
  actions,
}: {
  title?: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}) {
  return (
    <section className={cn("rounded-2xl border border-line bg-surface p-5 shadow-soft sm:p-6", className)}>
      {(title || actions) && (
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-lg font-bold text-fg">{title}</h2>}
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

const badgeTones = {
  blue: "bg-primary-soft text-primary",
  green: "bg-tint-mint text-mint-ink",
  amber: "bg-tint-sun text-sun-ink",
  red: "bg-tint-coral text-coral-ink",
  gray: "bg-surface-3 text-muted",
};

export function Badge({ tone = "gray", children }: { tone?: keyof typeof badgeTones; children: ReactNode }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", badgeTones[tone])}>{children}</span>;
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-fg">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 text-sm text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1 text-xs text-subtle">{hint}</p>
      )}
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-surface px-6 py-14 text-center">
      <p className="text-lg font-bold text-fg">{title}</p>
      <p className="mt-1.5 max-w-md text-muted">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5 text-sun" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("size-4", i < rating ? "fill-current" : "fill-line-strong")} aria-hidden="true">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

/** Formats an SQLite UTC timestamp ("2026-10-17 09:30:00") for display. */
export function formatDate(value: string) {
  const d = new Date(value.replace(" ", "T") + "Z");
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";
}
