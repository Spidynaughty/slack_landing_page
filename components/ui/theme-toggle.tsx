"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { applyPreference, readPreference, subscribeTheme, type ThemePreference } from "@/lib/theme";
import { cn } from "@/lib/utils";

function usePreference(): ThemePreference {
  return useSyncExternalStore(subscribeTheme, readPreference, () => "system");
}

/** Icon button for the header. Icons swap via CSS so server and client markup always match. */
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        applyPreference(isDark ? "light" : "dark");
      }}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2",
        className,
      )}
      aria-label="Toggle dark mode"
    >
      <Moon className="size-[1.15rem] dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-[1.15rem] dark:block" aria-hidden="true" />
    </button>
  );
}

const options: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

/** Segmented light / dark / system control for the footer. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const pref = usePreference();
  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn("inline-flex rounded-full border border-line bg-bg-soft p-1 dark:border-white/15 dark:bg-white/5", className)}
    >
      {options.map(({ value, label, icon: I }) => {
        const active = pref === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => applyPreference(value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
              active ? "bg-primary text-primary-fg shadow-soft" : "text-muted hover:text-fg",
            )}
          >
            <I className="size-3.5" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
