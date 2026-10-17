/** Validation and storage for form submissions sent from the public site. */
import "server-only";
import { db } from "@/lib/db";

export type FieldValue = string | boolean | string[];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Never keep anything that looks like a secret, even if a form sends it by mistake. */
const SENSITIVE = /pass(word)?|card|cvv|cvc|ssn|secret|token/i;

export class SubmissionError extends Error {}

function clean(fields: unknown): Record<string, FieldValue> {
  if (!fields || typeof fields !== "object" || Array.isArray(fields)) throw new SubmissionError("Missing form fields");
  const entries = Object.entries(fields as Record<string, unknown>);
  if (entries.length > 40) throw new SubmissionError("Too many fields");
  const out: Record<string, FieldValue> = {};
  for (const [key, value] of entries) {
    if (key.length > 60 || SENSITIVE.test(key)) continue;
    if (typeof value === "string") out[key] = value.trim().slice(0, 5000);
    else if (typeof value === "boolean") out[key] = value;
    else if (Array.isArray(value)) out[key] = value.filter((v) => typeof v === "string").slice(0, 50).map((v) => v.slice(0, 300));
  }
  return out;
}

function pickEmail(fields: Record<string, FieldValue>) {
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === "string" && /email/i.test(key) && EMAIL.test(value)) return value.toLowerCase();
  }
  return "";
}

function pickName(fields: Record<string, FieldValue>) {
  const text = (k: string) => (typeof fields[k] === "string" ? (fields[k] as string) : "");
  const full = text("name") || text("fullName") || text("full_name");
  if (full) return full.slice(0, 120);
  return [text("firstName") || text("first_name"), text("lastName") || text("last_name")].filter(Boolean).join(" ").slice(0, 120);
}

export async function saveSubmission(input: { form?: unknown; page?: unknown; fields?: unknown }) {
  const form = typeof input.form === "string" ? input.form.trim().slice(0, 80) : "";
  if (!form) throw new SubmissionError("Missing form name");
  // A path on this site only ("//host" would point somewhere else)
  const page = typeof input.page === "string" && /^\/(?!\/)/.test(input.page) ? input.page.slice(0, 300) : "";
  const fields = clean(input.fields);
  if (!Object.keys(fields).length) throw new SubmissionError("The form was empty");

  const client = await db();
  const res = await client.execute({
    sql: "INSERT INTO submissions (form, page, name, email, data) VALUES (?, ?, ?, ?, ?)",
    args: [form, page, pickName(fields), pickEmail(fields), JSON.stringify(fields)],
  });
  return Number(res.lastInsertRowid);
}
