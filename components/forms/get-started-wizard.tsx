"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Hash, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { site } from "@/lib/site";
import { submitForm } from "@/lib/submit-form";
import { cn, slugify } from "@/lib/utils";
import { inputClass } from "./lead-form";

const useCases: { id: string; label: string; icon: IconName; channels: string[] }[] = [
  { id: "projects", label: "Project management", icon: "kanban", channels: ["proj-launch", "weekly-sync"] },
  { id: "engineering", label: "Engineering", icon: "code", channels: ["eng-platform", "deploys"] },
  { id: "sales", label: "Sales", icon: "trending", channels: ["deal-room", "sales-wins"] },
  { id: "support", label: "Customer support", icon: "headset", channels: ["escalations", "support-team"] },
  { id: "marketing", label: "Marketing", icon: "megaphone", channels: ["campaign-launch", "content"] },
  { id: "it", label: "IT & helpdesk", icon: "server", channels: ["help-it", "it-announcements"] },
  { id: "hr", label: "People & HR", icon: "users", channels: ["new-hires", "people-team"] },
  { id: "other", label: "Something else", icon: "sparkles", channels: ["ideas"] },
];

const steps = ["You", "Workspace", "Use case", "Invite", "Plan"];

type Data = { name: string; email: string; workspace: string; size: string; uses: string[]; invites: string[]; plan: "free" | "trial" };

/** Multi-step onboarding wizard; everything stays in the browser. */
export function GetStartedWizard() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [data, setData] = useState<Data>({ name: "", email: "", workspace: "", size: "", uses: [], invites: [], plan: "trial" });
  const [invite, setInvite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [creating, setCreating] = useState(false);
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!data.name.trim()) e.name = "Tell us your name";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "Enter a valid work email";
    }
    if (step === 1) {
      if (!data.workspace.trim()) e.workspace = "Give your workspace a name";
      if (!data.size) e.size = "Choose a team size";
    }
    if (step === 2 && data.uses.length === 0) e.uses = "Pick at least one";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async (ev?: FormEvent) => {
    ev?.preventDefault();
    if (!validate()) return;
    if (step === steps.length - 1) {
      setCreating(true);
      setFailure("");
      try {
        await submitForm("Sign-up", { ...data });
        setDone(true);
      } catch (err) {
        setFailure(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setCreating(false);
      }
      return;
    }
    setDir(1);
    setStep((s) => s + 1);
  };
  const back = () => {
    setDir(-1);
    setErrors({});
    setStep((s) => Math.max(0, s - 1));
  };

  const addInvite = () => {
    const v = invite.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      setErrors({ invite: "Enter a valid email address" });
      return;
    }
    if (!data.invites.includes(v)) setData({ ...data, invites: [...data.invites, v] });
    setInvite("");
    setErrors({});
  };

  const channels = Array.from(new Set(["general", ...data.uses.flatMap((u) => useCases.find((c) => c.id === u)?.channels ?? [])]));

  if (done) {
    return (
      <motion.div role="status" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-mint text-white">
            <Check className="size-7" aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-display-md font-extrabold text-fg">{data.workspace} is ready!</h2>
          <p className="mt-3 text-lead text-muted">
            We set up {channels.length} channels for you{data.invites.length > 0 ? ` and invited ${data.invites.length} teammate${data.invites.length === 1 ? "" : "s"}` : ""}.
            {data.plan === "trial" ? " Your 30-day Business+ trial has started." : " You're on the Free plan."}
          </p>
          <p className="mt-2 text-sm text-subtle">This is a demo, so no account was created.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/product-tour" className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-fg hover:bg-primary-hover">
              Take the product tour <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/downloads" className="inline-flex h-12 items-center rounded-full border border-line-strong px-6 font-semibold text-fg hover:bg-surface-2">
              Download the apps
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-float" aria-label="Preview of your new workspace" role="img">
          <div className="flex">
            <div className="w-36 shrink-0 bg-deep p-3 text-sm text-on-deep-muted sm:w-48 sm:p-4">
              <p className="mb-4 flex items-center gap-2 font-bold text-white">
                <span className="inline-flex size-6 items-center justify-center rounded-md bg-white text-xs font-extrabold text-deep">{data.workspace.slice(0, 1).toUpperCase()}</span>
                <span className="truncate">{data.workspace}</span>
              </p>
              <p className="mb-1 text-xs uppercase opacity-70">Channels</p>
              <ul className="flex flex-col gap-1">
                {channels.map((c, i) => (
                  <motion.li key={c} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className={cn("flex items-center gap-1.5 rounded-md px-1.5 py-1", i === 1 && "bg-primary text-white")}>
                    <Hash className="size-3" aria-hidden="true" /> {c}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="flex-1 p-5">
              <p className="font-bold text-fg"># {channels[1] ?? "general"}</p>
              <div className="mt-4 rounded-xl bg-primary-soft p-3 text-sm text-fg">
                <p className="mb-1 flex items-center gap-1.5 font-bold text-primary">
                  <LogoMark className="size-4" /> {site.name} Bot
                </p>
                Welcome, {data.name.split(" ")[0]}! Start by posting your first update here, or try a template.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <ol className="mb-10 flex items-center gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className="flex flex-1 flex-col gap-2">
            <span className={cn("h-1.5 rounded-full transition-colors", i <= step ? "bg-primary" : "bg-surface-3")} />
            <span className={cn("hidden text-xs font-semibold sm:block", i === step ? "text-primary" : i < step ? "text-fg" : "text-subtle")} aria-current={i === step ? "step" : undefined}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      <form onSubmit={next} noValidate className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-10">
        <p className="mb-1 text-sm font-semibold text-muted sm:hidden">
          Step {step + 1} of {steps.length}
        </p>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div key={step} custom={dir} initial={{ opacity: 0, x: 30 * dir }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 * dir }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <fieldset className="grid gap-5">
                <legend className="mb-2 font-display text-2xl font-bold text-fg">First, tell us about you</legend>
                <Field label="Full name" error={errors.name} id="gs-name">
                  <input id="gs-name" autoComplete="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className={inputClass} aria-invalid={Boolean(errors.name)} />
                </Field>
                <Field label="Work email" error={errors.email} id="gs-email">
                  <input id="gs-email" type="email" autoComplete="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputClass} aria-invalid={Boolean(errors.email)} />
                </Field>
              </fieldset>
            )}
            {step === 1 && (
              <fieldset className="grid gap-5">
                <legend className="mb-2 font-display text-2xl font-bold text-fg">Name your workspace</legend>
                <Field label="Company or team name" error={errors.workspace} id="gs-ws">
                  <input id="gs-ws" autoComplete="organization" value={data.workspace} onChange={(e) => setData({ ...data, workspace: e.target.value })} className={inputClass} placeholder="e.g. Northwind" aria-invalid={Boolean(errors.workspace)} />
                </Field>
                {data.workspace && (
                  <p className="text-sm text-muted">
                    Your workspace URL: <strong className="text-fg">{slugify(data.workspace) || "your-team"}.{site.domain}</strong>
                  </p>
                )}
                <div>
                  <p id="gs-size" className="mb-2 text-sm font-semibold text-fg">
                    How many people will use it?
                  </p>
                  <div role="radiogroup" aria-labelledby="gs-size" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {["Just me", "2–10", "11–50", "51–250", "251–1,000", "1,000+"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        role="radio"
                        aria-checked={data.size === s}
                        onClick={() => setData({ ...data, size: s })}
                        className={cn("h-11 rounded-xl border text-sm font-semibold transition-colors", data.size === s ? "border-primary bg-primary-soft text-primary" : "border-line-strong text-fg hover:bg-surface-2")}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.size && <p className="mt-1 text-sm text-coral-ink">{errors.size}</p>}
                </div>
              </fieldset>
            )}
            {step === 2 && (
              <fieldset>
                <legend className="mb-2 font-display text-2xl font-bold text-fg">What will your team use it for?</legend>
                <p className="mb-5 text-muted">Pick as many as you like. We&apos;ll set up channels and templates to match.</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {useCases.map((u) => {
                    const on = data.uses.includes(u.id);
                    return (
                      <button
                        key={u.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setData({ ...data, uses: on ? data.uses.filter((x) => x !== u.id) : [...data.uses, u.id] })}
                        className={cn("flex items-center gap-3 rounded-2xl border p-4 text-left font-semibold transition-colors", on ? "border-primary bg-primary-soft text-primary" : "border-line-strong text-fg hover:bg-surface-2")}
                      >
                        <Icon name={u.icon} className="size-5" />
                        <span className="flex-1">{u.label}</span>
                        {on && <Check className="size-4" aria-hidden="true" />}
                      </button>
                    );
                  })}
                </div>
                {errors.uses && <p className="mt-2 text-sm text-coral-ink">{errors.uses}</p>}
              </fieldset>
            )}
            {step === 3 && (
              <fieldset>
                <legend className="mb-2 font-display text-2xl font-bold text-fg">Invite your teammates</legend>
                <p className="mb-5 text-muted">Work is better together. You can always do this later.</p>
                <div className="flex gap-2">
                  <label htmlFor="gs-invite" className="sr-only">
                    Teammate email
                  </label>
                  <input
                    id="gs-invite"
                    type="email"
                    value={invite}
                    onChange={(e) => setInvite(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addInvite();
                      }
                    }}
                    placeholder="teammate@company.com"
                    className={inputClass}
                    aria-invalid={Boolean(errors.invite)}
                  />
                  <button type="button" onClick={addInvite} className="inline-flex h-12 shrink-0 items-center gap-1.5 rounded-xl border border-line-strong px-4 font-semibold text-fg hover:bg-surface-2">
                    <Plus className="size-4" aria-hidden="true" /> Add
                  </button>
                </div>
                {errors.invite && <p className="mt-1 text-sm text-coral-ink">{errors.invite}</p>}
                <ul className="mt-4 flex flex-wrap gap-2" aria-live="polite">
                  {data.invites.map((em) => (
                    <li key={em} className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 py-1.5 pr-1.5 pl-3 text-sm font-medium text-fg">
                      {em}
                      <button type="button" onClick={() => setData({ ...data, invites: data.invites.filter((x) => x !== em) })} className="inline-flex size-6 items-center justify-center rounded-full hover:bg-surface-3" aria-label={`Remove ${em}`}>
                        <X className="size-3.5" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </fieldset>
            )}
            {step === 4 && (
              <fieldset>
                <legend className="mb-5 font-display text-2xl font-bold text-fg">Choose how to start</legend>
                <div role="radiogroup" className="grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "trial" as const, title: "Business+ free trial", body: "30 days of AI, unlimited history and group huddles. No credit card.", badge: "Recommended" },
                    { id: "free" as const, title: "Free plan", body: "90 days of history, 1:1 huddles and up to 10 apps. Upgrade any time." },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="radio"
                      aria-checked={data.plan === p.id}
                      onClick={() => setData({ ...data, plan: p.id })}
                      className={cn("relative rounded-2xl border p-5 text-left transition-colors", data.plan === p.id ? "border-primary bg-primary-soft" : "border-line-strong hover:bg-surface-2")}
                    >
                      {p.badge && <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-fg">{p.badge}</span>}
                      <span className="block font-display text-lg font-bold text-fg">{p.title}</span>
                      <span className="mt-1 block text-sm text-muted">{p.body}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs text-subtle">
                  By continuing you agree to the{" "}
                  <Link href="/legal/terms" className="underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {failure && (
          <p role="alert" className="mt-6 text-sm font-medium text-coral-ink">
            {failure}
          </p>
        )}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={back} disabled={step === 0} className="inline-flex h-12 items-center gap-1.5 rounded-full px-5 font-semibold text-fg hover:bg-surface-2 disabled:invisible">
            <ArrowLeft className="size-4" aria-hidden="true" /> Back
          </button>
          <div className="flex items-center gap-2">
            {step === 3 && (
              <button type="button" onClick={() => next()} className="h-12 rounded-full px-5 font-semibold text-muted hover:text-fg">
                Skip
              </button>
            )}
            <button type="submit" disabled={creating} className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-fg hover:bg-primary-hover disabled:opacity-70">
              {creating && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
              {step === steps.length - 1 ? (creating ? "Creating workspace…" : "Create workspace") : "Continue"}
              {!creating && <ArrowRight className="size-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

function Field({ label, error, id, children }: { label: string; error?: string; id: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-fg">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1 text-sm text-coral-ink">
          {error}
        </p>
      )}
    </div>
  );
}
