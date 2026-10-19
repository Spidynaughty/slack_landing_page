"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Hash, Loader2, Lock, Search, Upload, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { LogoMark, Wordmark } from "@/components/ui/logo";
import { site } from "@/lib/site";
import { submitForm } from "@/lib/submit-form";
import { cn, slugify } from "@/lib/utils";

/**
 * Workspace sign-up, modelled on the flow people know from team chat apps:
 * email, a 6-digit code, then setup questions shown inside a preview of the
 * app that fills in as you answer. The finished sign-up lands in the admin inbox.
 */

type Stage = "email" | "code" | "setup" | "done";
type Plan = "trial" | "free";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS = ["workspace", "name", "invites", "project", "plan"] as const;

/** Questions slide in from the right going forward and from the left going back */
const slide = {
  enter: (d: number) => ({ opacity: 0, x: 40 * d }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: -40 * d, transition: { duration: 0.15 } }),
};

const field =
  "h-12 w-full rounded-lg border border-line-strong bg-surface px-4 text-[1.05rem] text-fg outline-none transition-shadow placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-danger";
const primaryBtn =
  "inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-[1.02rem] font-semibold text-primary-fg transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-45";

function initials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "?"
  );
}

export function GetStartedFlow() {
  const [stage, setStage] = useState<Stage>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [step, setStep] = useState(0);
  /** 1 when moving forward, -1 when going back, so screens slide the right way */
  const [dir, setDir] = useState(1);
  const [workspace, setWorkspace] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [invites, setInvites] = useState<string[]>([]);
  const [inviteDraft, setInviteDraft] = useState("");
  const [project, setProject] = useState("");
  const [plan, setPlan] = useState<Plan>("trial");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  /* ---------------- email ---------------- */
  const submitEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) return setError("Enter a valid email address, like name@company.com");
    setError("");
    setStage("code");
    requestAnimationFrame(() => codeRefs.current[0]?.focus());
  };

  /* ---------------- code ---------------- */
  const fillCode = (start: number, digits: string) => {
    const next = [...code];
    let i = start;
    for (const d of digits.replace(/\D/g, "")) {
      if (i > 5) break;
      next[i++] = d;
    }
    setCode(next);
    if (next.every(Boolean)) {
      setStage("setup");
      return;
    }
    codeRefs.current[Math.min(i, 5)]?.focus();
  };
  const onCodeKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[i] && i > 0) {
      const next = [...code];
      next[i - 1] = "";
      setCode(next);
      codeRefs.current[i - 1]?.focus();
    }
  };
  const onCodePaste = (i: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fillCode(i, e.clipboardData.getData("text"));
  };

  /* ---------------- setup ---------------- */
  const projectChannel = slugify(project).slice(0, 40);
  const current = STEPS[step];

  const addInvites = (raw: string) => {
    const parts = raw.split(/[\s,;]+/).map((p) => p.trim()).filter(Boolean);
    const bad = parts.filter((p) => !EMAIL.test(p));
    const good = parts.filter((p) => EMAIL.test(p) && p.toLowerCase() !== email.toLowerCase());
    if (good.length) setInvites((list) => Array.from(new Set([...list, ...good])).slice(0, 50));
    setInviteDraft(bad.join(", "));
    setError(bad.length ? `Check ${bad.length === 1 ? "this address" : "these addresses"}: ${bad.join(", ")}` : "");
  };

  const canContinue =
    current === "workspace" ? workspace.trim().length > 0 : current === "name" ? name.trim().length > 0 : current === "project" ? project.trim().length > 0 : true;

  const nextStep = async (e?: FormEvent) => {
    e?.preventDefault();
    if (current === "invites" && inviteDraft.trim()) {
      addInvites(inviteDraft);
      return;
    }
    if (!canContinue) return;
    setError("");
    if (step < STEPS.length - 1) {
      setDir(1);
      setStep(step + 1);
      return;
    }
    setSaving(true);
    try {
      await submitForm("Sign-up", { email: email.trim(), workspace: workspace.trim(), name: name.trim(), invites, project: project.trim(), plan });
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const onPhoto = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return setError("Choose an image under 5 MB.");
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
    setError("");
  };

  /* ================================================================ */
  if (stage === "email" || stage === "code") {
    return (
      <div className="flex min-h-dvh flex-col items-center bg-surface px-5">
        <header className="flex w-full max-w-5xl items-center justify-center pt-10 pb-12 sm:pt-12 sm:pb-16">
          <Link href="/" className="inline-flex items-center gap-2" aria-label={`${site.name} home`}>
            <LogoMark className="size-9" />
            <Wordmark className="text-[1.6rem]" />
          </Link>
        </header>

        <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12, transition: { duration: 0.15 } }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[42rem] text-center"
        >
          {stage === "email" ? (
            <form onSubmit={submitEmail} noValidate>
              <h1 className="text-[2.35rem] leading-tight font-bold tracking-tight text-fg sm:text-[2.75rem]">First, enter your email</h1>
              <p className="mt-3 text-lg text-muted">
                We suggest using the <strong className="text-fg">email address that you use at work.</strong>
              </p>
              <label htmlFor="gs-email" className="sr-only">
                Work email
              </label>
              <input
                id="gs-email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@work-email.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "gs-email-error" : undefined}
                className={cn(field, "mx-auto mt-8 block max-w-[26rem]")}
              />
              {error && (
                <p id="gs-email-error" role="alert" className="mx-auto mt-2 max-w-[26rem] text-left text-sm text-danger">
                  {error}
                </p>
              )}
              <button type="submit" className={cn(primaryBtn, "mx-auto mt-4 flex w-full max-w-[26rem]")}>
                Continue
              </button>
              <p className="mt-6 text-sm text-muted">
                Already using {site.name}?{" "}
                <Link href="/signin" className="font-semibold text-primary hover:underline">
                  Sign in to an existing workspace
                </Link>
              </p>
            </form>
          ) : (
            <div>
              <h1 className="text-[2.35rem] leading-tight font-bold tracking-tight text-fg sm:text-[2.75rem]">Check your email for a code</h1>
              <p className="mt-3 text-lg text-muted">
                Enter the 6-digit code for <strong className="text-fg">{email}</strong>.
              </p>
              <fieldset className="mt-8">
                <legend className="sr-only">6-digit code</legend>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  {code.map((d, i) => (
                    <span key={i} className="contents">
                      {i === 3 && (
                        <span aria-hidden="true" className="px-0.5 text-2xl font-bold text-subtle">
                          –
                        </span>
                      )}
                      <input
                        ref={(el) => {
                          codeRefs.current[i] = el;
                        }}
                        inputMode="numeric"
                        autoComplete={i === 0 ? "one-time-code" : "off"}
                        maxLength={6}
                        value={d}
                        aria-label={`Digit ${i + 1} of 6`}
                        onChange={(e) => {
                          const v = e.target.value.replace(/D/g, "");
                          if (!v) {
                            // Backspace or Delete on a filled box clears it
                            const next = [...code];
                            next[i] = "";
                            setCode(next);
                            return;
                          }
                          // Typing over an existing digit replaces it
                          fillCode(i, v.length > 1 && code[i] && v.startsWith(code[i]) ? v.slice(1) : v);
                        }}
                        onKeyDown={(e) => onCodeKey(i, e)}
                        onPaste={(e) => onCodePaste(i, e)}
                        onFocus={(e) => e.target.select()}
                        className={cn(
                          "h-16 w-12 rounded-lg border border-line-strong bg-surface text-center text-2xl font-semibold text-fg outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 sm:h-[4.5rem] sm:w-14",
                          i === 2 && "mr-0",
                        )}
                      />
                    </span>
                  ))}
                </div>
              </fieldset>
              <p className="mx-auto mt-5 max-w-[26rem] rounded-lg bg-primary-soft px-4 py-3 text-sm text-fg">
                This preview site doesn&apos;t send email. Type any 6 digits to continue.
              </p>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setCode(Array(6).fill(""));
                    setStage("email");
                  }}
                  className="font-semibold text-primary hover:underline"
                >
                  Change email address
                </button>
              </div>
            </div>
          )}
        </motion.div>
        </AnimatePresence>

        <footer className="mt-auto flex flex-wrap justify-center gap-x-6 gap-y-2 py-8 text-sm text-muted">
          <Link href="/legal/privacy" className="hover:text-fg hover:underline">
            Privacy &amp; terms
          </Link>
          <Link href="/contact" className="hover:text-fg hover:underline">
            Contact us
          </Link>
        </footer>
      </div>
    );
  }

  /* ---------------- app shell for setup and the finished workspace ---------------- */
  const done = stage === "done";
  const firstName = name.trim().split(/\s+/)[0] ?? "";

  return (
    <div className="flex h-dvh flex-col bg-[#051121] text-[#d9e2ef]">
      {/* Top bar */}
      <div className="flex h-11 shrink-0 items-center gap-3 px-3">
        <Link href="/" className="hidden w-60 items-center gap-2 md:flex" aria-label={`${site.name} home`}>
          <LogoMark className="size-6" />
        </Link>
        <div className="mx-auto flex h-7 w-full max-w-xl items-center gap-2 rounded-md bg-white/10 px-3 text-[0.8rem] text-white/60">
          <Search className="size-3.5" aria-hidden="true" />
          <span className="truncate">Search {workspace.trim() || "your workspace"}</span>
        </div>
        <span className="inline-flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#1769f5] text-[0.7rem] font-bold text-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the chosen file */}
          {photo ? <img src={photo} alt="" className="size-full object-cover" /> : initials(name)}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 md:pr-2 md:pb-2">
        {/* Sidebar preview: fills in as the questions are answered */}
        <aside aria-label="Workspace preview" className="hidden w-64 shrink-0 flex-col gap-5 overflow-y-auto px-3 py-4 text-[0.9rem] md:flex">
          <div className="flex items-center gap-1 px-2 text-[1.05rem] font-bold text-white">
            {workspace.trim() ? <span className="truncate">{workspace.trim()}</span> : <span className="h-4 w-36 rounded bg-white/15" />}
            <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden="true" />
          </div>
          <div>
            <p className="mb-1 px-2 text-[0.8rem] font-semibold text-white/60">Channels</p>
            <ul className="flex flex-col gap-0.5">
              {["general", "random"].map((c) => (
                <li key={c} className="flex items-center gap-2 rounded-md px-2 py-1 text-white/70">
                  <Hash className="size-3.5" aria-hidden="true" /> {c}
                </li>
              ))}
              <li className={cn("flex items-center gap-2 rounded-md px-2 py-1", done ? "bg-[#1769f5] font-semibold text-white" : "text-white/70")}>
                <Hash className="size-3.5" aria-hidden="true" />
                {projectChannel ? (
                  <motion.span key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="truncate">
                    {projectChannel}
                  </motion.span>
                ) : (
                  <span className="h-3 w-24 rounded bg-white/15" />
                )}
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-1 px-2 text-[0.8rem] font-semibold text-white/60">Direct messages</p>
            <ul className="flex flex-col gap-1">
              <li className="flex items-center gap-2 px-2 py-0.5 text-white/80">
                <span className="relative inline-flex size-5 items-center justify-center overflow-hidden rounded bg-[#1769f5] text-[0.6rem] font-bold text-white">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the chosen file */}
                  {photo ? <img src={photo} alt="" className="size-full object-cover" /> : initials(name)}
                </span>
                {name.trim() ? <span className="truncate">{name.trim()} (you)</span> : <span className="h-3 w-24 rounded bg-white/15" />}
              </li>
              {invites.slice(0, 4).map((inv) => (
                <motion.li key={inv} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 px-2 py-0.5 text-white/60">
                  <span className="inline-flex size-5 items-center justify-center rounded bg-white/15 text-[0.6rem] font-bold">{inv[0]?.toUpperCase()}</span>
                  <span className="truncate">{inv.split("@")[0]}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main panel */}
        <section aria-label={done ? "Your workspace" : "Workspace setup"} className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-surface text-fg md:rounded-lg">
          {done ? (
            <Workspace channel={projectChannel || "general"} project={project.trim()} firstName={firstName} invites={invites.length} plan={plan} />
          ) : (
            <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.form
              key={step}
              custom={dir}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={nextStep}
              noValidate
              className="w-full max-w-2xl px-6 py-10 sm:px-12 md:py-16 lg:px-20"
            >
              <div className="mb-6 flex items-center gap-4 text-sm text-muted">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setError("");
                      setDir(-1);
                      setStep(step - 1);
                    }}
                    className="inline-flex items-center gap-1 font-semibold text-fg hover:underline"
                  >
                    <ArrowLeft className="size-4" aria-hidden="true" /> Back
                  </button>
                )}
                <span>
                  Step {step + 1} of {STEPS.length}
                </span>
              </div>

              {current === "workspace" && (
                <Question title="What's the name of your company or team?" body={`This will be the name of your ${site.name} workspace. Choose something that your team will recognise.`} htmlFor="gs-ws">
                  <div className="relative">
                    <input id="gs-ws" autoFocus maxLength={50} value={workspace} onChange={(e) => setWorkspace(e.target.value)} placeholder="Ex: Acme Marketing or Acme Co" className={cn(field, "pr-14")} />
                    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-subtle">{50 - workspace.length}</span>
                  </div>
                </Question>
              )}

              {current === "name" && (
                <Question title="What's your name?" body="Adding your name and profile photo helps your teammates recognise and connect with you more easily." htmlFor="gs-name">
                  <input id="gs-name" autoFocus autoComplete="name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className={field} />
                  <div className="mt-8">
                    <p className="text-[0.95rem] font-semibold text-fg">
                      Your profile photo <span className="font-normal text-muted">(optional)</span>
                    </p>
                    <p className="mt-1 text-sm text-muted">Help your teammates know that they&apos;re talking to the right person.</p>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="inline-flex size-20 items-center justify-center overflow-hidden rounded-xl bg-surface-3 text-2xl font-bold text-muted">
                        {/* eslint-disable-next-line @next/next/no-img-element -- local preview of the chosen file */}
                        {photo ? <img src={photo} alt="Your profile photo" className="size-full object-cover" /> : initials(name)}
                      </span>
                      <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-line-strong px-4 text-sm font-semibold text-fg hover:bg-surface-2">
                        <Upload className="size-4" aria-hidden="true" /> Upload photo
                        <input type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
                      </label>
                      {photo && (
                        <button type="button" onClick={() => setPhoto(null)} className="text-sm font-semibold text-muted hover:text-fg">
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </Question>
              )}

              {current === "invites" && (
                <Question title={`Who else is on the ${workspace.trim() || site.name} team?`} body="Add coworkers by email. They'll get an invitation once your workspace is ready." htmlFor="gs-invite">
                  <div className="flex min-h-28 flex-wrap content-start gap-1.5 rounded-lg border border-line-strong bg-surface p-2.5 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
                    {invites.map((inv) => (
                      <span key={inv} className="inline-flex h-8 items-center gap-1 rounded-md bg-primary-soft pr-1 pl-2.5 text-sm font-medium text-fg">
                        {inv}
                        <button type="button" onClick={() => setInvites((l) => l.filter((x) => x !== inv))} className="inline-flex size-6 items-center justify-center rounded hover:bg-surface-3" aria-label={`Remove ${inv}`}>
                          <X className="size-3.5" aria-hidden="true" />
                        </button>
                      </span>
                    ))}
                    <input
                      id="gs-invite"
                      autoFocus
                      type="text"
                      inputMode="email"
                      value={inviteDraft}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/[,;\s]$/.test(v)) addInvites(v);
                        else setInviteDraft(v);
                      }}
                      onBlur={() => inviteDraft.trim() && addInvites(inviteDraft)}
                      placeholder={invites.length ? "" : "Ex. ellis@company.com, maria@company.com"}
                      className="h-8 min-w-48 flex-1 bg-transparent px-1.5 text-[1.02rem] text-fg outline-none placeholder:text-subtle"
                    />
                  </div>
                </Question>
              )}

              {current === "project" && (
                <Question title="What's your team working on right now?" body="This could be anything: a project, campaign, event or the deal you're trying to close." htmlFor="gs-project">
                  <div className="relative">
                    <input id="gs-project" autoFocus maxLength={60} value={project} onChange={(e) => setProject(e.target.value)} placeholder="Ex: Q4 budget, autumn campaign" className={cn(field, "pr-14")} />
                    <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-sm text-subtle">{60 - project.length}</span>
                  </div>
                  {projectChannel && (
                    <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
                      We&apos;ll make a channel for it: <strong className="inline-flex items-center gap-0.5 text-fg"><Hash className="size-3.5" aria-hidden="true" />{projectChannel}</strong>
                    </p>
                  )}
                </Question>
              )}

              {current === "plan" && (
                <Question title="Choose how to start" body="Try every feature free for 30 days, or start on the Free plan. You can change this any time.">
                  <div role="radiogroup" aria-label="Plan" className="grid gap-3 sm:grid-cols-2">
                    {[
                      { id: "trial" as const, title: "Business+ free trial", body: "30 days of AI, unlimited history and group huddles. No credit card.", badge: "Recommended" },
                      { id: "free" as const, title: "Free plan", body: "90 days of history, 1:1 huddles and up to 10 apps." },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        role="radio"
                        aria-checked={plan === p.id}
                        onClick={() => setPlan(p.id)}
                        className={cn("relative rounded-xl border-2 p-5 text-left transition-colors", plan === p.id ? "border-primary bg-primary-soft" : "border-line-strong hover:bg-surface-2")}
                      >
                        {p.badge && <span className="absolute -top-2.5 right-4 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-fg">{p.badge}</span>}
                        <span className="flex items-center justify-between gap-2 text-lg font-bold text-fg">
                          {p.title}
                          {plan === p.id && <Check className="size-5 text-primary" aria-hidden="true" />}
                        </span>
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
                </Question>
              )}

              {error && (
                <p role="alert" className="mt-4 text-sm font-medium text-danger">
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="submit" disabled={!canContinue || saving} className={primaryBtn}>
                  {saving && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
                  {current === "plan" ? (saving ? "Creating workspace…" : "Create workspace") : current === "invites" && invites.length ? `Add ${invites.length} teammate${invites.length === 1 ? "" : "s"}` : "Next"}
                  {!saving && current !== "plan" && <ArrowRight className="size-4" aria-hidden="true" />}
                </button>
                {current === "invites" && (
                  <button
                    type="button"
                    onClick={() => {
                      setInviteDraft("");
                      setError("");
                      setDir(1);
                      setStep(step + 1);
                    }}
                    className="text-[0.95rem] font-semibold text-muted hover:text-fg"
                  >
                    Skip this step
                  </button>
                )}
              </div>
            </motion.form>
            </AnimatePresence>
          )}
        </section>
      </div>
    </div>
  );
}

function Question({ title, body, htmlFor, children }: { title: string; body: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div>
      <h1 className="text-[2rem] leading-tight font-bold tracking-tight text-fg sm:text-[2.5rem]">{title}</h1>
      {htmlFor && (
        <label htmlFor={htmlFor} className="sr-only">
          {title}
        </label>
      )}
      <p className="mt-3 mb-7 text-[1.05rem] text-muted">{body}</p>
      {children}
    </div>
  );
}

/** The finished workspace: the project channel, ready to use. */
function Workspace({ channel, project, firstName, invites, plan }: { channel: string; project: string; firstName: string; invites: number; plan: Plan }) {
  return (
    <div className="flex min-h-full flex-col">
      <div className="flex h-12 shrink-0 items-center gap-1.5 border-b border-line px-5 font-bold text-fg">
        <Hash className="size-4" aria-hidden="true" /> {channel}
      </div>
      <div className="flex flex-1 flex-col justify-end gap-6 px-5 py-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          <span className="inline-flex size-14 items-center justify-center rounded-xl bg-primary-soft text-primary">
            <Hash className="size-7" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-[1.9rem] leading-tight font-bold tracking-tight text-fg sm:text-[2.25rem]">Welcome to #{channel}</h1>
          <p className="mt-2 max-w-2xl text-muted">
            This channel is for everything {project ? <>about <strong className="text-fg">{project}</strong></> : "your team is working on"}. Hold meetings, share docs and make
            decisions together.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/product-tour" className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-fg hover:bg-primary-hover">
              Take the product tour <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/downloads" className="inline-flex h-10 items-center rounded-lg border border-line-strong px-4 text-sm font-semibold text-fg hover:bg-surface-2">
              Download the apps
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.35, ease: [0.22, 1, 0.36, 1] }} className="flex gap-3">
          <LogoMark className="size-9 shrink-0" />
          <div>
            <p className="flex items-baseline gap-2 text-[0.95rem]">
              <span className="font-bold text-fg">{site.name} Bot</span>
              <span className="rounded bg-surface-3 px-1 text-[0.6rem] font-bold text-muted uppercase">App</span>
            </p>
            <p className="mt-0.5 text-[0.95rem] text-fg">
              Welcome{firstName ? `, ${firstName}` : ""}! Your workspace is ready
              {invites > 0 ? ` and ${invites} teammate${invites === 1 ? " has" : "s have"} been invited` : ""}.{" "}
              {plan === "trial" ? "Your 30-day Business+ trial has started." : "You're on the Free plan."}
            </p>
          </div>
        </motion.div>

        <div className="rounded-lg border border-line-strong">
          <div className="flex items-center gap-2 px-4 py-3 text-[0.95rem] text-subtle">
            <Lock className="size-3.5" aria-hidden="true" /> Message #{channel}
          </div>
        </div>
        <p className="text-center text-xs text-subtle">This is a preview, so no account was created.</p>
      </div>
    </div>
  );
}
