import type { ReactNode } from "react";
import { Hash, Lock, Search } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export const people = {
  priya: { name: "Priya Raman", initials: "PR", color: "bg-[#7c5cff]" },
  marcus: { name: "Marcus Lee", initials: "ML", color: "bg-[#ff7a4d]" },
  sofia: { name: "Sofia Alvarez", initials: "SA", color: "bg-[#10b981]" },
  jonah: { name: "Jonah Kim", initials: "JK", color: "bg-[#3b82f6]" },
  amara: { name: "Amara Okafor", initials: "AO", color: "bg-[#d946ef]" },
  leo: { name: "Leo Brandt", initials: "LB", color: "bg-[#f59e0b]" },
  hana: { name: "Hana Sato", initials: "HS", color: "bg-[#0ea5e9]" },
  diego: { name: "Diego Ruiz", initials: "DR", color: "bg-[#8b5cf6]" },
} as const;

export type PersonKey = keyof typeof people;

export function Avatar({ who, size = "md", className }: { who: PersonKey; size?: "xs" | "sm" | "md" | "lg"; className?: string }) {
  const p = people[who];
  const s = { xs: "size-5 text-[0.55rem]", sm: "size-7 text-[0.65rem]", md: "size-9 text-xs", lg: "size-14 text-base" }[size];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg font-bold text-white",
        p.color,
        s,
        className,
      )}
    >
      {p.initials}
    </span>
  );
}

export function BotAvatar({ size = "md" }: { size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#5b3df5] to-[#d946ef] text-white",
        size === "sm" ? "size-7" : "size-9",
      )}
    >
      <svg viewBox="0 0 24 24" className={size === "sm" ? "size-4" : "size-5"} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3z" fill="currentColor" />
        <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" fill="currentColor" stroke="none" />
      </svg>
    </span>
  );
}

/** Browser-style app window used by every product mockup. */
export function AppFrame({
  children,
  label,
  className,
  sidebar,
  title,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  sidebar?: ReactNode;
  title?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative w-full overflow-hidden rounded-[1.25rem] border border-line bg-surface text-left shadow-float select-none",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 border-b border-line bg-surface-2 px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff6159]" />
          <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex h-6 w-full max-w-xs items-center gap-2 rounded-md bg-bg px-2.5 text-[0.7rem] text-subtle">
          <Search className="size-3" aria-hidden="true" />
          {title ?? `Search Northwind on ${site.name}`}
        </span>
        <span className="w-10" />
      </div>
      <div className="flex min-h-0">
        {sidebar}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

type SidebarItem = { label: string; active?: boolean; unread?: boolean; privateCh?: boolean };

export function Sidebar({ channels, dms = true }: { channels: SidebarItem[]; dms?: boolean }) {
  return (
    <div className="hidden w-44 shrink-0 flex-col gap-4 bg-deep px-3 py-4 text-[0.78rem] text-on-deep-muted sm:flex">
      <div className="flex items-center gap-2 px-1.5">
        <span className="inline-flex size-6 items-center justify-center rounded-md bg-white text-[0.65rem] font-extrabold text-deep">
          N
        </span>
        <span className="font-bold text-white">Northwind</span>
      </div>
      <div>
        <p className="mb-1 px-1.5 text-[0.65rem] font-semibold tracking-wider uppercase opacity-70">Channels</p>
        <ul className="flex flex-col gap-0.5">
          {channels.map((c) => (
            <li
              key={c.label}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-1.5 py-1",
                c.active && "bg-primary text-white",
                c.unread && !c.active && "font-bold text-white",
              )}
            >
              {c.privateCh ? <Lock className="size-3" aria-hidden="true" /> : <Hash className="size-3" aria-hidden="true" />}
              <span className="truncate">{c.label}</span>
            </li>
          ))}
        </ul>
      </div>
      {dms && (
        <div>
          <p className="mb-1 px-1.5 text-[0.65rem] font-semibold tracking-wider uppercase opacity-70">Direct messages</p>
          <ul className="flex flex-col gap-1">
            {(["sofia", "jonah", "amara"] as const).map((k) => (
              <li key={k} className="flex items-center gap-2 px-1.5">
                <span className="relative">
                  <Avatar who={k} size="xs" className="rounded" />
                  <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border border-deep bg-mint" />
                </span>
                <span className="truncate">{people[k].name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function ChannelHeader({ name, members = 24, children }: { name: string; members?: number; children?: ReactNode }) {
  return (
    <div className="flex h-12 items-center justify-between gap-3 border-b border-line px-4">
      <p className="flex items-center gap-1 text-sm font-bold text-fg">
        <Hash className="size-3.5" aria-hidden="true" />
        {name}
      </p>
      <div className="flex items-center gap-2">
        {children}
        <span className="flex -space-x-1.5">
          <Avatar who="priya" size="xs" className="rounded-full ring-2 ring-surface" />
          <Avatar who="marcus" size="xs" className="rounded-full ring-2 ring-surface" />
          <Avatar who="hana" size="xs" className="rounded-full ring-2 ring-surface" />
        </span>
        <span className="text-[0.7rem] text-subtle">{members}</span>
      </div>
    </div>
  );
}

export function Message({
  who,
  time,
  children,
  bot,
  botName,
}: {
  who?: PersonKey;
  time: string;
  children: ReactNode;
  bot?: boolean;
  botName?: string;
}) {
  return (
    <div className="flex gap-2.5 px-4 py-2">
      {bot ? <BotAvatar /> : who ? <Avatar who={who} /> : null}
      <div className="min-w-0 flex-1">
        <p className="flex items-baseline gap-2">
          <span className="text-[0.8rem] font-bold text-fg">{bot ? (botName ?? `${site.name} Bot`) : who && people[who].name}</span>
          {bot && <span className="rounded bg-surface-3 px-1 text-[0.55rem] font-bold text-muted uppercase">App</span>}
          <span className="text-[0.65rem] text-subtle">{time}</span>
        </p>
        <div className="mt-0.5 text-[0.8rem] leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  );
}

export function Reaction({ emoji, count, active }: { emoji: string; count: number; active?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[0.65rem] font-semibold",
        active ? "border-primary/40 bg-primary-soft text-primary" : "border-line bg-surface-2 text-muted",
      )}
    >
      <span aria-hidden="true">{emoji}</span>
      {count}
    </span>
  );
}

export function Composer({ placeholder = "Message #launch-fall" }: { placeholder?: string }) {
  return (
    <div className="m-3 rounded-xl border border-line-strong bg-surface px-3 py-2.5 text-[0.75rem] text-subtle">
      <div className="flex items-center justify-between">
        <span>{placeholder}</span>
        <span className="inline-flex size-6 items-center justify-center rounded-md bg-mint text-white">
          <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden="true">
            <path d="M3 20.5l18-8.5L3 3.5v6.6l12 1.9-12 1.9z" />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function Pill({ children, tone = "violet" }: { children: ReactNode; tone?: "violet" | "mint" | "sun" | "coral" | "sky" | "pink" | "muted" }) {
  const map = {
    violet: "bg-primary/12 text-primary",
    mint: "bg-mint/15 text-mint-ink",
    sun: "bg-sun/20 text-sun-ink",
    coral: "bg-coral/15 text-coral-ink",
    sky: "bg-sky/15 text-sky-ink",
    pink: "bg-pink/15 text-pink-ink",
    muted: "bg-surface-3 text-muted",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[0.65rem] font-bold", map[tone])}>{children}</span>;
}
