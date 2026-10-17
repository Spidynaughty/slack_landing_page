"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { submitForm } from "@/lib/submit-form";
import { cn } from "@/lib/utils";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "select" | "textarea" | "checkbox" | "url" | "number";
  options?: string[];
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  /** Spans one column on wide screens instead of two. */
  half?: boolean;
};

export const inputClass =
  "h-12 w-full rounded-xl border border-line-strong bg-bg px-4 text-fg outline-none transition-colors placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-coral";

/** Validates in the browser, then saves the entry to the backend (it appears in the admin inbox). */
export function LeadForm({
  fields,
  submitLabel,
  successTitle,
  successBody,
  className,
  consent = true,
  onDark = false,
  formName,
}: {
  fields: FieldDef[];
  submitLabel: string;
  /** How the entry is labelled in the admin inbox. Defaults to the submit button label. */
  formName?: string;
  successTitle: string;
  successBody: string;
  className?: string;
  consent?: boolean;
  onDark?: boolean;
}) {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    for (const f of fields) {
      const v = String(data.get(f.name) ?? "").trim();
      if (f.required && f.type !== "checkbox" && !v) next[f.name] = `${f.label} is required`;
      if (f.required && f.type === "checkbox" && !data.get(f.name)) next[f.name] = "Please confirm to continue";
      if (f.type === "email" && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) next[f.name] = "Enter a valid email address";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const first = e.currentTarget.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`);
      first?.focus();
      return;
    }
    const values: Record<string, string | boolean> = {};
    for (const f of fields) values[f.name] = f.type === "checkbox" ? Boolean(data.get(f.name)) : String(data.get(f.name) ?? "").trim();
    setFailure("");
    setStatus("submitting");
    try {
      await submitForm(formName ?? submitLabel, values, String(data.get("website") ?? ""));
      setStatus("done");
    } catch (err) {
      setFailure(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-10 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
              className="inline-flex size-16 items-center justify-center rounded-full bg-mint text-white"
            >
              <Check className="size-8" aria-hidden="true" />
            </motion.span>
            <h3 className={cn("mt-5 font-display text-2xl font-bold", onDark ? "text-white" : "text-fg")}>{successTitle}</h3>
            <p className={cn("mt-2 max-w-sm", onDark ? "text-on-deep-muted" : "text-muted")}>{successBody}</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Submit another response
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
            {/* Honeypot: hidden from people, filled in by bots */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {fields.map((f) => {
              const fid = `${id}-${f.name}`;
              const err = errors[f.name];
              const span = f.half ? "" : "sm:col-span-2";
              const labelCls = cn("mb-1.5 block text-sm font-semibold", onDark ? "text-white" : "text-fg");
              if (f.type === "checkbox") {
                return (
                  <div key={f.name} className={span}>
                    <label className={cn("flex items-start gap-3 text-sm", onDark ? "text-on-deep-muted" : "text-muted")}>
                      <input
                        type="checkbox"
                        name={f.name}
                        aria-invalid={Boolean(err)}
                        aria-describedby={err ? `${fid}-err` : undefined}
                        className="mt-0.5 size-5 shrink-0 rounded accent-[var(--primary)]"
                      />
                      <span>{f.label}</span>
                    </label>
                    {err && (
                      <p id={`${fid}-err`} className="mt-1 text-sm text-coral-ink">
                        {err}
                      </p>
                    )}
                  </div>
                );
              }
              return (
                <div key={f.name} className={span}>
                  <label htmlFor={fid} className={labelCls}>
                    {f.label}
                    {f.required && <span className="text-coral-ink"> *</span>}
                  </label>
                  {f.type === "select" ? (
                    <select
                      id={fid}
                      name={f.name}
                      defaultValue=""
                      aria-invalid={Boolean(err)}
                      aria-describedby={err ? `${fid}-err` : undefined}
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : f.type === "textarea" ? (
                    <textarea
                      id={fid}
                      name={f.name}
                      rows={4}
                      placeholder={f.placeholder}
                      aria-invalid={Boolean(err)}
                      aria-describedby={err ? `${fid}-err` : undefined}
                      className={cn(inputClass, "h-auto py-3")}
                    />
                  ) : (
                    <input
                      id={fid}
                      name={f.name}
                      type={f.type ?? "text"}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      aria-invalid={Boolean(err)}
                      aria-describedby={err ? `${fid}-err` : undefined}
                      className={inputClass}
                    />
                  )}
                  {err && (
                    <p id={`${fid}-err`} className="mt-1 text-sm text-coral-ink">
                      {err}
                    </p>
                  )}
                </div>
              );
            })}
            {consent && (
              <p className={cn("text-xs sm:col-span-2", onDark ? "text-on-deep-muted" : "text-subtle")}>
                By submitting, you agree to our{" "}
                <Link href="/legal/terms" className="underline">
                  Terms
                </Link>{" "}
                and acknowledge our{" "}
                <Link href="/legal/privacy" className="underline">
                  Privacy Policy
                </Link>
                .
              </p>
            )}
            <div className="sm:col-span-2">
              {failure && (
                <p role="alert" className="mb-3 text-sm font-medium text-coral-ink">
                  {failure}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-fg transition-colors hover:bg-primary-hover disabled:opacity-70 sm:w-auto"
              >
                {status === "submitting" && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                {status === "submitting" ? "Sending…" : submitLabel}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
