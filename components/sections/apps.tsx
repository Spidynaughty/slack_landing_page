import Link from "next/link";
import { Star } from "lucide-react";
import type { App } from "@/data/integrations";
import { LogoMark } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";

export function AppIcon({ app, size = "md", className }: { app: App; size?: "sm" | "md" | "lg"; className?: string }) {
  const s = { sm: "size-9 rounded-xl [&_svg]:size-4", md: "size-12 rounded-2xl [&_svg]:size-6", lg: "size-16 rounded-[1.25rem] [&_svg]:size-8" }[size];
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center shadow-soft", toneStyles[app.tone].solid, s, className)}>
      <Icon name={app.icon} />
    </span>
  );
}

export function AppCard({ app }: { app: App }) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card">
      <div className="flex items-start gap-4">
        <AppIcon app={app} />
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-fg">
            {app.name}
            {app.agent && <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-bold text-primary uppercase">Agent</span>}
          </h3>
          <p className="text-sm text-muted">{app.category}</p>
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm text-muted">{app.description}</p>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-subtle">
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5 fill-sun text-sun" aria-hidden="true" />
          <span className="font-semibold text-fg">{app.rating.toFixed(1)}</span>
          <span className="sr-only">out of 5 stars</span>
        </span>
        <span>{app.installs} installs</span>
      </div>
    </div>
  );
}

/** Orbit of app icons around the brand mark. Purely decorative. */
export function AppOrbit({ apps }: { apps: App[] }) {
  const inner = apps.slice(0, 6);
  const outer = apps.slice(6, 14);
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[30rem]">
      <div className="absolute inset-[6%] rounded-full border border-dashed border-line-strong" />
      <div className="absolute inset-[26%] rounded-full border border-dashed border-line-strong" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex size-24 items-center justify-center rounded-[1.75rem] bg-surface shadow-float ring-1 ring-line">
          <LogoMark className="size-14" />
        </span>
      </div>
      <div className="absolute inset-[26%] animate-[spin_60s_linear_infinite]">
        {inner.map((a, i) => {
          const angle = (i / inner.length) * Math.PI * 2;
          return (
            <span
              key={a.slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className="block animate-[spin_60s_linear_infinite_reverse]">
                <AppIcon app={a} size="md" />
              </span>
            </span>
          );
        })}
      </div>
      <div className="absolute inset-[6%] animate-[spin_90s_linear_infinite_reverse]">
        {outer.map((a, i) => {
          const angle = (i / outer.length) * Math.PI * 2 + 0.4;
          return (
            <span
              key={a.slug}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + 50 * Math.cos(angle)}%`, top: `${50 + 50 * Math.sin(angle)}%` }}
            >
              <span className="block animate-[spin_90s_linear_infinite]">
                <AppIcon app={a} size="sm" />
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function AppLinkCard({ app }: { app: App }) {
  return (
    <Link
      href="/marketplace"
      className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-3 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card"
    >
      <AppIcon app={app} size="sm" />
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold text-fg">{app.name}</span>
        <span className="block truncate text-xs text-muted">{app.category}</span>
      </span>
    </Link>
  );
}
