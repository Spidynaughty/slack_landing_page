"use server";

import { refresh, updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  adminConfigured,
  changeLogin,
  checkCredentials,
  clearLoginFailures,
  endSession,
  loginLocked,
  recordLoginFailure,
  requireAdmin,
  startSession,
} from "@/lib/auth";
import { settingDefaults, type SettingKey, type Settings, type StatItem } from "@/lib/content";
import { db } from "@/lib/db";
import { clientAddress } from "@/lib/rate-limit";
import { SEO_LIMITS, seoPages, TITLE_SUFFIX } from "@/lib/seo-overrides";
import { textRulesChanged } from "@/lib/text-overrides";

export type FormState = { ok?: boolean; message?: string; errors?: Record<string, string> };

function text(fd: FormData, key: string, max = 300) {
  return String(fd.get(key) ?? "").trim().slice(0, max);
}

function flag(fd: FormData, key: string) {
  return fd.get(key) === "on" ? 1 : 0;
}

/** Links may point inside the site or to a full web or mailto address. */
function validHref(href: string) {
  // Browsers read "/\" like "//", which would leave the site
  return /^(\/(?![/\\])|https?:\/\/|mailto:)/.test(href);
}

/* ------------------------------------------------------------------ */
/* Sign in and out                                                     */
/* ------------------------------------------------------------------ */

async function clientIp() {
  return clientAddress(await headers());
}

export async function login(_: FormState, fd: FormData): Promise<FormState> {
  if (!(await adminConfigured())) {
    return { message: "Admin login isn't set up yet. Add ADMIN_EMAIL, ADMIN_PASSWORD and SESSION_SECRET to your environment." };
  }
  const ip = await clientIp();
  if (loginLocked(ip)) return { message: "Too many attempts. Try again in 15 minutes." };

  const email = text(fd, "email", 200);
  if (!(await checkCredentials(email, String(fd.get("password") ?? "")))) {
    recordLoginFailure(ip);
    return { message: "That email and password don't match." };
  }
  clearLoginFailures(ip);
  await startSession(email);
  const next = text(fd, "next");
  redirect(next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/** Changes the admin email and/or password. Other sessions are signed out; this one stays signed in. */
export async function updateLogin(_: FormState, fd: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const result = await changeLogin(
    admin.email,
    {
      current: String(fd.get("current") ?? ""),
      email: String(fd.get("email") ?? ""),
      password: String(fd.get("password") ?? ""),
      confirm: String(fd.get("confirm") ?? ""),
    },
    await clientIp(),
  );
  if (!result.ok) return result;
  await startSession(text(fd, "email", 200));
  refresh();
  return { ok: true, message: "Saved. Use your new login next time you sign in. Any other signed-in devices were signed out." };
}

/* ------------------------------------------------------------------ */
/* Reviews                                                             */
/* ------------------------------------------------------------------ */

export async function saveReview(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(fd.get("id") || 0);
  const review = {
    name: text(fd, "name", 120),
    role: text(fd, "role", 120),
    company: text(fd, "company", 120),
    quote: text(fd, "quote", 1200),
    rating: Math.min(5, Math.max(1, Math.round(Number(fd.get("rating")) || 5))),
    sort: Math.round(Number(fd.get("sort")) || 0),
    published: flag(fd, "published"),
    featured: flag(fd, "featured"),
  };
  const errors: Record<string, string> = {};
  if (!review.name) errors.name = "Add the reviewer's name";
  if (review.quote.length < 10) errors.quote = "Write at least a sentence";
  if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };

  const client = await db();
  const args = [review.name, review.role, review.company, review.quote, review.rating, review.sort, review.published, review.featured];
  if (id) {
    await client.execute({
      sql: `UPDATE reviews SET name = ?, role = ?, company = ?, quote = ?, rating = ?, sort = ?, published = ?, featured = ?,
            updated_at = datetime('now') WHERE id = ?`,
      args: [...args, id],
    });
  } else {
    await client.execute({
      sql: "INSERT INTO reviews (name, role, company, quote, rating, sort, published, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      args,
    });
  }
  updateTag("reviews");
  redirect(`/admin/reviews?saved=${id ? "updated" : "created"}`);
}

export async function setReviewFlag(fd: FormData) {
  await requireAdmin();
  const field = fd.get("field") === "featured" ? "featured" : "published";
  const client = await db();
  await client.execute({
    sql: `UPDATE reviews SET ${field} = ?, updated_at = datetime('now') WHERE id = ?`,
    args: [fd.get("value") === "1" ? 1 : 0, Number(fd.get("id"))],
  });
  updateTag("reviews");
  refresh();
}

export async function deleteReview(fd: FormData) {
  await requireAdmin();
  const client = await db();
  await client.execute({ sql: "DELETE FROM reviews WHERE id = ?", args: [Number(fd.get("id"))] });
  updateTag("reviews");
  redirect("/admin/reviews?saved=deleted");
}

/* ------------------------------------------------------------------ */
/* Site content (settings)                                             */
/* ------------------------------------------------------------------ */

function readStats(fd: FormData): StatItem[] {
  const stats: StatItem[] = [];
  for (let i = 0; i < 4; i++) {
    const label = text(fd, `stats.${i}.label`, 80);
    if (!label) continue;
    const value = Number(fd.get(`stats.${i}.value`));
    stats.push({
      label,
      // "Infinity" would be saved as null and the counter would show NaN
      value: Number.isFinite(value) ? value : 0,
      decimals: Math.min(2, Math.max(0, Math.round(Number(fd.get(`stats.${i}.decimals`)) || 0))),
      prefix: text(fd, `stats.${i}.prefix`, 6),
      suffix: text(fd, `stats.${i}.suffix`, 10),
    });
  }
  return stats;
}

function readSettingForm<K extends SettingKey>(key: K, fd: FormData): { value?: Settings[K]; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  const href = (name: string) => {
    const v = text(fd, name);
    if (v && !validHref(v)) errors[name] = "Start with /, https:// or mailto:";
    return v;
  };
  let value: unknown;
  switch (key) {
    case "announcement":
      value = { enabled: fd.get("enabled") === "on", label: text(fd, "label", 20), text: text(fd, "text", 120), href: href("href") };
      break;
    case "hero":
      value = {
        headline: text(fd, "headline", 80),
        highlight: text(fd, "highlight", 60),
        subtitle: text(fd, "subtitle", 400),
        primaryLabel: text(fd, "primaryLabel", 40),
        primaryHref: href("primaryHref"),
        appStoreHref: href("appStoreHref"),
        playStoreHref: href("playStoreHref"),
      };
      if (!text(fd, "headline")) errors.headline = "The headline can't be empty";
      break;
    case "stats":
      value = readStats(fd);
      break;
    case "cta":
      value = { title: text(fd, "title", 80), highlight: text(fd, "highlight", 60), subtitle: text(fd, "subtitle", 300) };
      if (!text(fd, "title")) errors.title = "The title can't be empty";
      break;
    case "logos":
      value = {
        title: text(fd, "title", 120),
        names: String(fd.get("names") ?? "")
          .split(/\r?\n/)
          .map((n) => n.trim().slice(0, 40))
          .filter(Boolean)
          .slice(0, 40),
      };
      break;
    case "reviewsSection":
      value = { eyebrow: text(fd, "eyebrow", 40), title: text(fd, "title", 120), subtitle: text(fd, "subtitle", 300) };
      break;
  }
  return { value: value as Settings[K], errors };
}

export async function saveSetting(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const key = text(fd, "key") as SettingKey;
  if (!(key in settingDefaults)) return { message: "Unknown section." };
  const { value, errors } = readSettingForm(key, fd);
  if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };

  const client = await db();
  await client.execute({
    sql: `INSERT INTO settings (key, value) VALUES (?, ?)
          ON CONFLICT (key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')`,
    args: [key, JSON.stringify(value)],
  });
  updateTag(`setting:${key}`);
  refresh();
  return { ok: true, message: "Saved. The live site now shows this." };
}

export async function resetSetting(fd: FormData) {
  await requireAdmin();
  const key = text(fd, "key") as SettingKey;
  if (!(key in settingDefaults)) return;
  const client = await db();
  await client.execute({ sql: "DELETE FROM settings WHERE key = ?", args: [key] });
  updateTag(`setting:${key}`);
  // A fresh token remounts that section's form so it shows the original text again
  const back = text(fd, "back").startsWith("/admin") ? text(fd, "back") : "/admin/content";
  redirect(`${back}?reset=${key}.${Date.now()}`);
}

/* ------------------------------------------------------------------ */
/* FAQs                                                                */
/* ------------------------------------------------------------------ */

export async function saveFaq(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(fd.get("id") || 0);
  const question = text(fd, "question", 200);
  const answer = text(fd, "answer", 2000);
  const errors: Record<string, string> = {};
  if (!question) errors.question = "Add a question";
  if (!answer) errors.answer = "Add an answer";
  if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };

  const client = await db();
  const sort = Math.round(Number(fd.get("sort")) || 0);
  const published = flag(fd, "published");
  if (id) {
    await client.execute({
      sql: "UPDATE faqs SET question = ?, answer = ?, sort = ?, published = ? WHERE id = ?",
      args: [question, answer, sort, published, id],
    });
  } else {
    await client.execute({
      sql: "INSERT INTO faqs (page, question, answer, sort, published) VALUES ('pricing', ?, ?, ?, ?)",
      args: [question, answer, sort, published],
    });
  }
  updateTag("faqs");
  refresh();
  return { ok: true, message: id ? "Question updated." : "Question added." };
}

export async function deleteFaq(fd: FormData) {
  await requireAdmin();
  const client = await db();
  await client.execute({ sql: "DELETE FROM faqs WHERE id = ?", args: [Number(fd.get("id"))] });
  updateTag("faqs");
  refresh();
}

/* ------------------------------------------------------------------ */
/* Inbox                                                               */
/* ------------------------------------------------------------------ */

export async function setSubmissionStatus(fd: FormData) {
  await requireAdmin();
  const status = String(fd.get("status"));
  if (!["new", "read", "archived"].includes(status)) return;
  const client = await db();
  await client.execute({ sql: "UPDATE submissions SET status = ? WHERE id = ?", args: [status, Number(fd.get("id"))] });
  // Staying on the submission would mark it read again straight away
  if (status === "new") redirect("/admin/inbox");
  refresh();
}

export async function deleteSubmission(fd: FormData) {
  await requireAdmin();
  const client = await db();
  await client.execute({ sql: "DELETE FROM submissions WHERE id = ?", args: [Number(fd.get("id"))] });
  redirect("/admin/inbox");
}

/* ------------------------------------------------------------------ */
/* Site text                                                           */
/* ------------------------------------------------------------------ */

export async function saveTextRule(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const id = Number(fd.get("id") || 0);
  const mode = fd.get("mode") === "contains" ? "contains" : "exact";
  const original = String(fd.get("original") ?? "").trim().slice(0, 2000);
  const replacement = String(fd.get("replacement") ?? "").trim().slice(0, 2000);
  const errors: Record<string, string> = {};
  if (!original) errors.original = "Paste the text exactly as it appears on the site";
  else if (mode === "contains" && original.length < 3) errors.original = "Use at least 3 characters so it doesn't change other words by accident";
  if (original && original === replacement) errors.replacement = "The new text is the same as the original";
  if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };

  const client = await db();
  try {
    if (id) {
      await client.execute({
        sql: "UPDATE text_overrides SET original = ?, replacement = ?, mode = ?, updated_at = datetime('now') WHERE id = ?",
        args: [original, replacement, mode, id],
      });
    } else {
      await client.execute({
        sql: `INSERT INTO text_overrides (original, replacement, mode) VALUES (?, ?, ?)
              ON CONFLICT (original, mode) DO UPDATE SET replacement = excluded.replacement, updated_at = datetime('now')`,
        args: [original, replacement, mode],
      });
    }
  } catch {
    return { message: "There is already a change for that text. Edit that one instead." };
  }
  await textRulesChanged();
  return { ok: true, message: id ? "Saved. The site now shows the new text." : "Added. The site now shows the new text." };
}

export async function deleteTextRule(fd: FormData) {
  await requireAdmin();
  const client = await db();
  await client.execute({ sql: "DELETE FROM text_overrides WHERE id = ?", args: [Number(fd.get("id"))] });
  await textRulesChanged();
  refresh();
}

/* ------------------------------------------------------------------ */
/* SEO                                                                 */
/* ------------------------------------------------------------------ */

const oneLine = (fd: FormData, key: string, max: number) => String(fd.get(key) ?? "").replace(/\s+/g, " ").trim().slice(0, max);

/** Saves a page's search title and description. A field left as the original keeps following the code. */
export async function saveSeo(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const path = text(fd, "path");
  if (!seoPages().some((p) => p.path === path)) return { message: "That page can't be edited here." };

  let title = String(fd.get("title") ?? "").replace(/\s+/g, " ").trim();
  const description = String(fd.get("description") ?? "").replace(/\s+/g, " ").trim();
  // The site name is added after the title automatically; don't let it appear twice
  if (path !== "/" && title.endsWith(TITLE_SUFFIX)) title = title.slice(0, -TITLE_SUFFIX.length).trim();
  const errors: Record<string, string> = {};
  if (title.length > SEO_LIMITS.title) errors.title = `Keep it to ${SEO_LIMITS.title} characters or fewer`;
  if (description.length > SEO_LIMITS.description) errors.description = `Keep it to ${SEO_LIMITS.description} characters or fewer`;
  if (Object.keys(errors).length) return { errors, message: "Check the highlighted fields." };

  const originalTitle = oneLine(fd, "original_title", 300);
  const originalDescription = oneLine(fd, "original_description", 600);
  const newTitle = title === originalTitle ? "" : title;
  const newDescription = description === originalDescription ? "" : description;

  const client = await db();
  if (!newTitle && !newDescription) {
    await client.execute({ sql: "DELETE FROM seo_overrides WHERE path = ?", args: [path] });
    updateTag("seo");
    refresh();
    return { ok: true, message: "Nothing differs from the original, so the page uses its original title and description." };
  }
  await client.execute({
    sql: `INSERT INTO seo_overrides (path, title, description, original_title, original_description) VALUES (?, ?, ?, ?, ?)
          ON CONFLICT (path) DO UPDATE SET title = excluded.title, description = excluded.description,
            original_title = CASE WHEN original_title = '' THEN excluded.original_title ELSE original_title END,
            original_description = CASE WHEN original_description = '' THEN excluded.original_description ELSE original_description END,
            updated_at = datetime('now')`,
    args: [path, newTitle, newDescription, originalTitle, originalDescription],
  });
  updateTag("seo");
  refresh();
  return { ok: true, message: "Saved. Search engines and link previews will see the new text the next time they visit." };
}

/** Puts a page back to the title and description from the code. */
export async function resetSeo(fd: FormData) {
  await requireAdmin();
  const path = text(fd, "path");
  const client = await db();
  await client.execute({ sql: "DELETE FROM seo_overrides WHERE path = ?", args: [path] });
  updateTag("seo");
  // A fresh token remounts the form so it shows the original text again
  redirect(`/admin/seo/edit?path=${encodeURIComponent(path)}&reset=${Date.now()}`);
}
