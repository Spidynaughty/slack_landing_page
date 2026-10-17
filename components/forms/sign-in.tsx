"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, KeyRound, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { inputClass } from "./lead-form";

/** Two-step, UI-only sign in: email first, then a 6-digit confirmation code. */
export function SignIn() {
  const [step, setStep] = useState<"email" | "code" | "done">("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const submitEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address, like name@work-email.com");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("code");
      setTimeout(() => refs.current[0]?.focus(), 50);
    }, 700);
  };

  const verify = (digits: string[]) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (digits.join("").length === 6) setStep("done");
    }, 800);
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 5) refs.current[i + 1]?.focus();
    if (next.every(Boolean)) verify(next);
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  };

  const onPaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
    if (digits.length === 0) return;
    e.preventDefault();
    const next = Array(6)
      .fill("")
      .map((_, i) => digits[i] ?? "");
    setCode(next);
    refs.current[Math.min(digits.length, 5)]?.focus();
    if (next.every(Boolean)) verify(next);
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-2" aria-hidden="true">
        {["email", "code", "done"].map((s, i) => (
          <span key={s} className={cn("h-1.5 flex-1 rounded-full transition-colors", ["email", "code", "done"].indexOf(step) >= i ? "bg-primary" : "bg-surface-3")} />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {step === "email" && (
          <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-display-sm font-extrabold text-fg">Sign in to {site.name}</h1>
            <p className="mt-2 text-muted">We suggest using the email address you use at work.</p>
            <div className="mt-8 grid gap-3">
              {["Continue with SSO", "Continue with a passkey"].map((l, i) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setError("Demo only: use the email option below to try the sign-in flow.")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface font-semibold text-fg hover:bg-surface-2"
                >
                  {i === 0 ? <Mail className="size-4" aria-hidden="true" /> : <KeyRound className="size-4" aria-hidden="true" />}
                  {l}
                </button>
              ))}
            </div>
            <div className="my-6 flex items-center gap-3 text-xs font-semibold text-subtle uppercase">
              <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
            </div>
            <form onSubmit={submitEmail} noValidate className="grid gap-3">
              <label htmlFor="signin-email" className="text-sm font-semibold text-fg">
                Work email
              </label>
              <input
                id="signin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@work-email.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "signin-error" : undefined}
                className={inputClass}
              />
              {error && (
                <p id="signin-error" role="alert" className="text-sm text-coral-ink">
                  {error}
                </p>
              )}
              <button type="submit" disabled={loading} className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-semibold text-primary-fg hover:bg-primary-hover disabled:opacity-70">
                {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                Sign in with email
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-muted">
              New to {site.name}?{" "}
              <Link href="/get-started" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </motion.div>
        )}
        {step === "code" && (
          <motion.div key="code" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <button type="button" onClick={() => setStep("email")} className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-fg">
              <ArrowLeft className="size-4" aria-hidden="true" /> Back
            </button>
            <h1 className="text-display-sm font-extrabold text-fg">Check your email for a code</h1>
            <p className="mt-2 text-muted">
              We&apos;ve sent a 6-digit code to <strong className="text-fg">{email}</strong>. The code expires shortly, so please enter it soon.
            </p>
            <fieldset className="mt-8">
              <legend className="sr-only">Enter the 6-digit code</legend>
              <div className="flex items-center gap-2 sm:gap-3">
                {code.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    value={d}
                    onChange={(e) => setDigit(i, e.target.value)}
                    onKeyDown={(e) => onKey(i, e)}
                    onPaste={onPaste}
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    aria-label={`Digit ${i + 1}`}
                    className={cn(
                      "h-14 w-full min-w-0 rounded-xl border border-line-strong bg-bg text-center font-display text-2xl font-bold text-fg outline-none focus:border-primary focus:ring-4 focus:ring-primary/15",
                      i === 2 && "mr-2 sm:mr-4",
                    )}
                  />
                ))}
              </div>
            </fieldset>
            <p className="mt-4 text-sm text-subtle" aria-live="polite">
              {loading ? "Verifying…" : "Demo tip: any six digits will work."}
            </p>
          </motion.div>
        )}
        {step === "done" && (
          <motion.div key="done" role="status" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-6 text-center">
            <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-mint text-white">
              <Check className="size-8" aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-display-sm font-extrabold text-fg">You&apos;re signed in</h1>
            <p className="mt-2 text-muted">This is a UI-only demo, so there&apos;s no workspace to open. Explore the product tour instead.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link href="/product-tour" className="inline-flex h-11 items-center rounded-full bg-primary px-6 font-semibold text-primary-fg hover:bg-primary-hover">
                Take the product tour
              </Link>
              <Link href="/" className="inline-flex h-11 items-center rounded-full border border-line-strong px-6 font-semibold text-fg hover:bg-surface-2">
                Back to home
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
