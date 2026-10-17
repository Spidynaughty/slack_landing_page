"use client";

import { Check, Globe } from "lucide-react";
import { useId, useState } from "react";
import { useUI } from "@/components/providers";

export function FooterActionButton({
  action,
  label,
}: {
  action: "cookie-preferences" | "privacy-choices";
  label: string;
}) {
  const { openConsent } = useUI();
  return (
    <button
      type="button"
      onClick={() => openConsent(action === "cookie-preferences" ? "preferences" : "choices")}
      className="inline-flex items-center gap-1.5 text-on-deep-muted underline-offset-4 hover:text-white hover:underline"
      aria-haspopup="dialog"
    >
      {action === "privacy-choices" && (
        <svg viewBox="0 0 30 14" className="h-3 w-6" aria-hidden="true">
          <rect x="0.5" y="0.5" width="29" height="13" rx="6.5" fill="none" stroke="currentColor" />
          <rect x="15" y="1.5" width="13.5" height="11" rx="5.5" fill="#5b3df5" />
          <path d="M5 7.2l2 2 3.6-4" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="M19 4.5l4.6 5M23.6 4.5L19 9.5" stroke="#fff" strokeWidth="1.4" />
        </svg>
      )}
      {label}
    </button>
  );
}

export function NewsletterForm() {
  const [done, setDone] = useState(false);
  const id = useId();
  if (done) {
    return (
      <div role="status" className="flex items-center gap-3 rounded-2xl bg-white/10 p-5">
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-mint text-deep">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <p className="text-sm text-on-deep">
          <strong className="block text-white">You&apos;re on the list.</strong>
          Look out for our monthly product digest in your inbox.
        </p>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="w-full"
    >
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-white">
        Get the monthly product digest
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={id}
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          className="h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-white outline-none placeholder:text-on-deep-muted/70 focus:border-white/40"
        />
        <button
          type="submit"
          className="h-12 rounded-full bg-white px-6 font-semibold text-deep transition-colors hover:bg-white/90"
        >
          Subscribe
        </button>
      </div>
      <p className="mt-2 text-xs text-on-deep-muted/80">No spam. Unsubscribe any time.</p>
    </form>
  );
}

const regions = ["English (Global)", "English (UK)", "Deutsch", "Español", "Français", "日本語", "Português (Brasil)"];

export function RegionSelect() {
  const id = useId();
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor={id} className="sr-only">
        Region and language
      </label>
      <Globe className="pointer-events-none absolute left-3 size-4 text-on-deep-muted" aria-hidden="true" />
      <select
        id={id}
        defaultValue={regions[0]}
        className="h-9 appearance-none rounded-full border border-white/15 bg-white/5 pr-4 pl-9 text-xs font-semibold text-on-deep outline-none hover:border-white/30 [&>option]:text-deep"
      >
        {regions.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
    </div>
  );
}
