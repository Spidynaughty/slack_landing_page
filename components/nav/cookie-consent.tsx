"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useUI } from "@/components/providers";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/ui/use-dialog";
import { cn } from "@/lib/utils";

const KEY = "yb-consent";

type Consent = {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
  doNotSell: boolean;
  decidedAt: string;
};

const defaults: Consent = { functional: true, analytics: false, marketing: false, doNotSell: false, decidedAt: "" };

const listeners = new Set<() => void>();
function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}
function save(c: Consent) {
  try {
    localStorage.setItem(KEY, JSON.stringify(c));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}
function parse(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    return { ...defaults, ...(JSON.parse(raw) as Partial<Consent>) };
  } catch {
    return null;
  }
}
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function Toggle({
  checked,
  onChange,
  disabled,
  label,
  description,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6 rounded-2xl border border-line p-4">
      <div>
        <p className="font-semibold text-fg">{label}</p>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative mt-1 inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors",
          checked ? "bg-primary" : "bg-surface-3",
          disabled && "opacity-70",
        )}
      >
        <span
          className={cn(
            "inline-block size-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>
    </div>
  );
}

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(open, onClose, ref);
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-deep/55 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="consent-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-line bg-surface p-6 shadow-float sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full hover:bg-surface-2"
              aria-label="Close"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
            <h2 id="consent-title" className="pr-10 text-display-sm font-bold text-fg">
              {title}
            </h2>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const decide = (c: Omit<Consent, "decidedAt">) => save({ ...c, decidedAt: new Date().toISOString() });

function PreferencesBody({ onDone }: { onDone: () => void }) {
  const [draft, setDraft] = useState<Consent>(() => parse(readRaw()) ?? defaults);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <p className="mt-2 text-sm text-muted">
        Choose which optional cookies we can use. Strictly necessary cookies are always on because the site
        can&apos;t work without them.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Toggle checked disabled label="Strictly necessary" description="Security, load balancing and remembering these choices." />
        <Toggle
          checked={draft.functional}
          onChange={(v) => setDraft({ ...draft, functional: v })}
          label="Functional"
          description="Remember preferences such as region, language and theme."
        />
        <Toggle
          checked={draft.analytics}
          onChange={(v) => setDraft({ ...draft, analytics: v })}
          label="Analytics"
          description="Aggregate, anonymised measurement of how pages are used."
        />
        <Toggle
          checked={draft.marketing}
          onChange={(v) => setDraft({ ...draft, marketing: v })}
          label="Marketing"
          description="Measure campaign performance and personalise ads on other sites."
        />
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
        {saved && (
          <p role="status" className="mr-auto text-sm font-semibold text-mint-ink">
            Preferences saved
          </p>
        )}
        <Button
          variant="secondary"
          onClick={() => {
            const next = { ...draft, functional: false, analytics: false, marketing: false };
            setDraft(next);
            decide(next);
            setSaved(true);
          }}
        >
          Reject optional
        </Button>
        <Button
          onClick={() => {
            decide(draft);
            setSaved(true);
            setTimeout(onDone, 700);
          }}
        >
          Save preferences
        </Button>
      </div>
    </>
  );
}

function ChoicesBody({ onDone }: { onDone: () => void }) {
  const [draft, setDraft] = useState<Consent>(() => parse(readRaw()) ?? defaults);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <p className="mt-2 text-sm text-muted">
        Depending on where you live, you may have the right to opt out of the “sale” or “sharing” of personal
        information for cross-context behavioural advertising. We honour Global Privacy Control signals
        automatically.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Toggle
          checked={draft.doNotSell}
          onChange={(v) => setDraft({ ...draft, doNotSell: v, marketing: v ? false : draft.marketing })}
          label="Do not sell or share my personal information"
          description="Turns off marketing cookies and stops sharing data with advertising partners."
        />
      </div>
      <div className="mt-6 flex items-start gap-3 rounded-2xl bg-tint-mint p-4 text-sm text-fg">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-mint-ink" aria-hidden="true" />
        <p>
          Your choice applies to this browser. To make a request about data we hold about you, visit the{" "}
          <Link href="/legal/privacy" onClick={onDone} className="font-semibold text-primary underline">
            privacy policy
          </Link>
          .
        </p>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
        {saved && (
          <p role="status" className="mr-auto text-sm font-semibold text-mint-ink">
            Choice saved
          </p>
        )}
        <Button
          onClick={() => {
            decide(draft);
            setSaved(true);
            setTimeout(onDone, 700);
          }}
        >
          Confirm choice
        </Button>
      </div>
    </>
  );
}

export function CookieConsent() {
  const { consentView, openConsent, closeConsent } = useUI();
  const raw = useSyncExternalStore(subscribe, readRaw, () => "server");
  const stored = raw === "server" ? null : parse(raw);
  const showBanner = raw !== "server" && stored === null && consentView === null;

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            role="region"
            aria-label="Cookie consent"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.3 } }}
            exit={{ y: 40, opacity: 0 }}
            className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-4xl rounded-3xl border border-line bg-glass-strong p-5 shadow-float backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:p-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-sun/20 text-sun-ink md:inline-flex">
                <Cookie className="size-6" aria-hidden="true" />
              </span>
              <p className="flex-1 text-sm text-muted">
                <strong className="text-fg">We value your privacy.</strong> We use essential cookies to make this site
                work, and optional cookies to understand usage and improve your experience. Read our{" "}
                <Link href="/legal/privacy" className="font-semibold text-primary underline underline-offset-2">
                  privacy policy
                </Link>{" "}
                and{" "}
                <Link href="/cookie-policy" className="font-semibold text-primary underline underline-offset-2">
                  cookie policy
                </Link>
                .
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="ghost" size="sm" onClick={() => openConsent("preferences")}>
                  Manage
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => decide({ functional: false, analytics: false, marketing: false, doNotSell: true })}
                >
                  Reject optional
                </Button>
                <Button
                  size="sm"
                  onClick={() => decide({ functional: true, analytics: true, marketing: true, doNotSell: false })}
                >
                  Accept all
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={consentView === "preferences"} onClose={closeConsent} title="Cookie preferences">
        <PreferencesBody onDone={closeConsent} />
      </Modal>
      <Modal open={consentView === "choices"} onClose={closeConsent} title="Your privacy choices">
        <ChoicesBody onDone={closeConsent} />
      </Modal>
    </>
  );
}
