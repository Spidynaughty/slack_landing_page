"use client";

import { Check, Loader2, TriangleAlert } from "lucide-react";
import { startTransition, useActionState, useEffect, useRef, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import type { FormState } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  pendingLabel = "Saving…",
  variant = "primary",
  className,
  busy,
}: {
  children: ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "danger" | "ghost";
  className?: string;
  /** Overrides the parent form's pending state, for forms submitted by hand. */
  busy?: boolean;
}) {
  const status = useFormStatus();
  const pending = busy ?? status.pending;
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors disabled:opacity-70",
        variant === "primary" && "bg-primary text-primary-fg hover:bg-primary-hover",
        variant === "danger" && "border border-danger/30 text-danger hover:bg-danger/10",
        variant === "ghost" && "border border-line-strong text-fg hover:bg-surface-2",
        className,
      )}
    >
      {pending && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormNotice({ state }: { state: FormState }) {
  if (!state.message) return null;
  return (
    <p
      role={state.ok ? "status" : "alert"}
      className={cn(
        "flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium",
        state.ok ? "bg-tint-mint text-mint-ink" : "bg-tint-coral text-coral-ink",
      )}
    >
      {state.ok ? <Check className="size-4 shrink-0" aria-hidden="true" /> : <TriangleAlert className="size-4 shrink-0" aria-hidden="true" />}
      {state.message}
    </p>
  );
}

/**
 * A form bound to a Server Action that returns FormState. Field errors are
 * handed to `children` so inputs can show them inline. Submitting by hand keeps
 * what was typed when the server sends back errors; `resetOnSuccess` clears it
 * after a save.
 */
export function ActionForm({
  action,
  children,
  submitLabel = "Save changes",
  footer,
  className,
  resetOnSuccess = false,
}: {
  action: (state: FormState, fd: FormData) => Promise<FormState>;
  children: (errors: Record<string, string>) => ReactNode;
  submitLabel?: string;
  footer?: ReactNode;
  className?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.ok && resetOnSuccess) ref.current?.reset();
  }, [state, resetOnSuccess]);
  return (
    <form
      ref={ref}
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
      className={cn("flex flex-col gap-5", className)}
      noValidate
    >
      {children(state.errors ?? {})}
      <FormNotice state={state} />
      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton busy={pending}>{submitLabel}</SubmitButton>
        {footer}
      </div>
    </form>
  );
}

/** A small one-click form (publish, archive, delete) with an optional confirm step. */
export function InlineAction({
  action,
  fields,
  children,
  confirm,
  variant = "ghost",
  pendingLabel = "…",
}: {
  action: (fd: FormData) => Promise<void>;
  fields: Record<string, string | number>;
  children: ReactNode;
  confirm?: string;
  variant?: "primary" | "danger" | "ghost";
  pendingLabel?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (confirm && !window.confirm(confirm)) e.preventDefault();
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <SubmitButton variant={variant} pendingLabel={pendingLabel} className="h-8 px-3.5 text-xs">
        {children}
      </SubmitButton>
    </form>
  );
}
