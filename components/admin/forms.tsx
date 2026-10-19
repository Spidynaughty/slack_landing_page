"use client";

import { useActionState, useId } from "react";
import { login, saveFaq, saveReview, saveSetting, saveTextRule, type FormState } from "@/app/admin/actions";
import type { FaqRow, Review, Settings } from "@/lib/content";
import type { TextOverride } from "@/lib/text-overrides";
import { ActionForm, FormNotice, SubmitButton } from "./form-kit";
import { adminInput, adminTextarea, Field } from "./ui";

/* ------------------------------------------------------------------ */
/* Login                                                               */
/* ------------------------------------------------------------------ */

export function LoginForm({ next }: { next: string }) {
  const [state, action] = useActionState<FormState, FormData>(login, {});
  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />
      <Field label="Email" htmlFor="login-email">
        <input id="login-email" name="email" type="email" autoComplete="username" required className={adminInput} />
      </Field>
      <Field label="Password" htmlFor="login-password">
        <input id="login-password" name="password" type="password" autoComplete="current-password" required className={adminInput} />
      </Field>
      <FormNotice state={state} />
      <SubmitButton pendingLabel="Signing in…" className="h-11 w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export function ReviewForm({ review }: { review?: Review }) {
  const id = useId();
  return (
    <ActionForm action={saveReview} submitLabel={review ? "Save review" : "Add review"}>
      {(errors) => (
        <>
          {review && <input type="hidden" name="id" value={review.id} />}
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Name" htmlFor={`${id}-name`} error={errors.name}>
              <input id={`${id}-name`} name="name" defaultValue={review?.name} aria-invalid={Boolean(errors.name)} className={adminInput} />
            </Field>
            <Field label="Role" htmlFor={`${id}-role`} hint="For example: Head of Support">
              <input id={`${id}-role`} name="role" defaultValue={review?.role} className={adminInput} />
            </Field>
            <Field label="Company" htmlFor={`${id}-company`}>
              <input id={`${id}-company`} name="company" defaultValue={review?.company} className={adminInput} />
            </Field>
          </div>
          <Field label="Review" htmlFor={`${id}-quote`} error={errors.quote} hint="Shown in quotes on the site. Up to 1,200 characters.">
            <textarea id={`${id}-quote`} name="quote" rows={5} defaultValue={review?.quote} aria-invalid={Boolean(errors.quote)} className={adminTextarea} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Rating" htmlFor={`${id}-rating`}>
              <select id={`${id}-rating`} name="rating" defaultValue={review?.rating ?? 5} className={adminInput}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {"★".repeat(n)} ({n} of 5)
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Order" htmlFor={`${id}-sort`} hint="Lower numbers show first">
              <input id={`${id}-sort`} name="sort" type="number" defaultValue={review?.sort ?? 0} className={adminInput} />
            </Field>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <label className="flex items-center gap-2.5 text-sm font-medium text-fg">
              <input type="checkbox" name="published" defaultChecked={review ? Boolean(review.published) : true} className="size-4 accent-[var(--primary)]" />
              Published on the site
            </label>
            <label className="flex items-center gap-2.5 text-sm font-medium text-fg">
              <input type="checkbox" name="featured" defaultChecked={Boolean(review?.featured)} className="size-4 accent-[var(--primary)]" />
              Featured (used for the large quotes across the site)
            </label>
          </div>
        </>
      )}
    </ActionForm>
  );
}

/* ------------------------------------------------------------------ */
/* Site content                                                        */
/* ------------------------------------------------------------------ */

function TextField({
  name,
  label,
  value,
  error,
  hint,
  multiline,
  className,
}: {
  name: string;
  label: string;
  value: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  className?: string;
}) {
  const id = `${useId()}-${name}`;
  return (
    <Field label={label} htmlFor={id} error={error} hint={hint} className={className}>
      {multiline ? (
        <textarea id={id} name={name} defaultValue={value} rows={3} aria-invalid={Boolean(error)} className={adminTextarea} />
      ) : (
        <input id={id} name={name} defaultValue={value} aria-invalid={Boolean(error)} className={adminInput} />
      )}
    </Field>
  );
}

export function AnnouncementForm({ value }: { value: Settings["announcement"] }) {
  return (
    <ActionForm action={saveSetting}>
      {(errors) => (
        <>
          <input type="hidden" name="key" value="announcement" />
          <label className="flex items-center gap-2.5 text-sm font-medium text-fg">
            <input type="checkbox" name="enabled" defaultChecked={value.enabled} className="size-4 accent-[var(--primary)]" />
            Show the announcement above the home page headline
          </label>
          <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
            <TextField name="label" label="Badge" value={value.label} hint="Short, like New" />
            <TextField name="text" label="Message" value={value.text} />
          </div>
          <TextField name="href" label="Link" value={value.href} error={errors.href} hint="Where the announcement goes when clicked" />
        </>
      )}
    </ActionForm>
  );
}

export function HeroForm({ value }: { value: Settings["hero"] }) {
  return (
    <ActionForm action={saveSetting}>
      {(errors) => (
        <>
          <input type="hidden" name="key" value="hero" />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="headline" label="Headline" value={value.headline} error={errors.headline} />
            <TextField name="highlight" label="Highlighted words" value={value.highlight} hint="Shown after the headline in the brand gradient" />
          </div>
          <TextField name="subtitle" label="Subtitle" value={value.subtitle} multiline />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="primaryLabel" label="Main button text" value={value.primaryLabel} />
            <TextField name="primaryHref" label="Main button link" value={value.primaryHref} error={errors.primaryHref} />
            <TextField name="secondaryLabel" label="Second button text" value={value.secondaryLabel} />
            <TextField name="secondaryHref" label="Second button link" value={value.secondaryHref} error={errors.secondaryHref} />
          </div>
        </>
      )}
    </ActionForm>
  );
}

export function StatsForm({ value }: { value: Settings["stats"] }) {
  const rows = Array.from({ length: 4 }, (_, i) => value[i] ?? { value: 0, decimals: 0, prefix: "", suffix: "", label: "" });
  return (
    <ActionForm action={saveSetting}>
      {() => (
        <>
          <input type="hidden" name="key" value="stats" />
          <p className="text-sm text-muted">Up to four numbers. Leave a label empty to hide that number.</p>
          <div className="flex flex-col gap-3">
            {rows.map((s, i) => (
              <fieldset key={i} className="grid grid-cols-2 gap-3 rounded-xl border border-line p-3 sm:grid-cols-[1fr_5rem_5rem_5rem_2fr]">
                <legend className="sr-only">Number {i + 1}</legend>
                <Field label="Number" htmlFor={`s${i}v`}>
                  <input id={`s${i}v`} name={`stats.${i}.value`} type="number" step="any" defaultValue={s.label ? s.value : ""} className={adminInput} />
                </Field>
                <Field label="Decimals" htmlFor={`s${i}d`}>
                  <input id={`s${i}d`} name={`stats.${i}.decimals`} type="number" min={0} max={2} defaultValue={s.decimals} className={adminInput} />
                </Field>
                <Field label="Before" htmlFor={`s${i}p`}>
                  <input id={`s${i}p`} name={`stats.${i}.prefix`} defaultValue={s.prefix} placeholder="$" className={adminInput} />
                </Field>
                <Field label="After" htmlFor={`s${i}s`}>
                  <input id={`s${i}s`} name={`stats.${i}.suffix`} defaultValue={s.suffix} placeholder="%" className={adminInput} />
                </Field>
                <Field label="Label" htmlFor={`s${i}l`} className="col-span-2 sm:col-span-1">
                  <input id={`s${i}l`} name={`stats.${i}.label`} defaultValue={s.label} className={adminInput} />
                </Field>
              </fieldset>
            ))}
          </div>
        </>
      )}
    </ActionForm>
  );
}

export function CtaForm({ value }: { value: Settings["cta"] }) {
  return (
    <ActionForm action={saveSetting}>
      {(errors) => (
        <>
          <input type="hidden" name="key" value="cta" />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="title" label="Title" value={value.title} error={errors.title} />
            <TextField name="highlight" label="Highlighted words" value={value.highlight} />
          </div>
          <TextField name="subtitle" label="Subtitle" value={value.subtitle} multiline />
        </>
      )}
    </ActionForm>
  );
}

export function ReviewsSectionForm({ value }: { value: Settings["reviewsSection"] }) {
  return (
    <ActionForm action={saveSetting}>
      {() => (
        <>
          <input type="hidden" name="key" value="reviewsSection" />
          <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
            <TextField name="eyebrow" label="Small label" value={value.eyebrow} />
            <TextField name="title" label="Heading" value={value.title} />
          </div>
          <TextField name="subtitle" label="Subtitle" value={value.subtitle} />
        </>
      )}
    </ActionForm>
  );
}

export function LogosForm({ value }: { value: Settings["logos"] }) {
  return (
    <ActionForm action={saveSetting}>
      {() => (
        <>
          <input type="hidden" name="key" value="logos" />
          <TextField name="title" label="Heading above the logos" value={value.title} />
          <Field label="Company names" htmlFor="f-names" hint="One per line, up to 40. Leave empty to hide the logo strip everywhere.">
            <textarea id="f-names" name="names" rows={12} defaultValue={value.names.join("\n")} className={adminTextarea} />
          </Field>
        </>
      )}
    </ActionForm>
  );
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export function FaqForm({ faq }: { faq?: FaqRow }) {
  const id = useId();
  return (
    <ActionForm action={saveFaq} submitLabel={faq ? "Save" : "Add question"} resetOnSuccess={!faq}>
      {(errors) => (
        <>
          {faq && <input type="hidden" name="id" value={faq.id} />}
          <Field label="Question" htmlFor={`${id}-q`} error={errors.question}>
            <input id={`${id}-q`} name="question" defaultValue={faq?.question} aria-invalid={Boolean(errors.question)} className={adminInput} />
          </Field>
          <Field label="Answer" htmlFor={`${id}-a`} error={errors.answer}>
            <textarea id={`${id}-a`} name="answer" rows={3} defaultValue={faq?.answer} aria-invalid={Boolean(errors.answer)} className={adminTextarea} />
          </Field>
          <div className="flex flex-wrap items-end gap-6">
            <Field label="Order" htmlFor={`${id}-s`} className="w-28">
              <input id={`${id}-s`} name="sort" type="number" defaultValue={faq?.sort ?? 0} className={adminInput} />
            </Field>
            <label className="flex h-11 items-center gap-2.5 text-sm font-medium text-fg">
              <input type="checkbox" name="published" defaultChecked={faq ? Boolean(faq.published) : true} className="size-4 accent-[var(--primary)]" />
              Published
            </label>
          </div>
        </>
      )}
    </ActionForm>
  );
}

/* ------------------------------------------------------------------ */
/* Site text                                                           */
/* ------------------------------------------------------------------ */

export function TextRuleForm({ rule }: { rule?: TextOverride }) {
  const id = useId();
  return (
    <ActionForm action={saveTextRule} submitLabel={rule ? "Save" : "Add change"} resetOnSuccess={!rule}>
      {(errors) => (
        <>
          {rule && <input type="hidden" name="id" value={rule.id} />}
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Text on the site now" htmlFor={`${id}-o`} error={errors.original} hint="Copy it exactly, including capital letters and punctuation.">
              <textarea id={`${id}-o`} name="original" rows={3} defaultValue={rule?.original} aria-invalid={Boolean(errors.original)} className={adminTextarea} />
            </Field>
            <Field label="Change it to" htmlFor={`${id}-r`} error={errors.replacement}>
              <textarea id={`${id}-r`} name="replacement" rows={3} defaultValue={rule?.replacement} aria-invalid={Boolean(errors.replacement)} className={adminTextarea} />
            </Field>
          </div>
          <Field label="Where" htmlFor={`${id}-m`} className="max-w-md">
            <select id={`${id}-m`} name="mode" defaultValue={rule?.mode ?? "exact"} className={adminInput}>
              <option value="exact">Wherever this exact text appears on its own</option>
              <option value="contains">Everywhere, including inside longer text</option>
            </select>
          </Field>
        </>
      )}
    </ActionForm>
  );
}
