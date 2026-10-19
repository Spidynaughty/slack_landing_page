/**
 * Keeps the site-text rules (lib/jsx/transform.ts) in step with the database.
 *
 * JSX is created synchronously, so the rules must already be in memory when a
 * page renders. With the local SQLite file they are read synchronously (a
 * version check costs microseconds), so an edit saved by any process shows up
 * within a second. With a remote libSQL/Turso database they refresh in the
 * background every few seconds.
 */
import "server-only";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import Database from "libsql";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import type { TextRules } from "@/lib/jsx/transform";

const url = process.env.DATABASE_URL || "file:.data/ktteams.db";
const isFile = url.startsWith("file:");
const filePath = isFile ? resolve(url.slice("file:".length)) : "";

type Row = { original: string; replacement: string; mode: string };

function build(rows: Row[], v: number): TextRules {
  const exact: Record<string, string> = {};
  const contains: [string, string][] = [];
  for (const r of rows) {
    if (r.mode === "contains") contains.push([r.original, r.replacement]);
    else exact[r.original] = r.replacement;
  }
  // Longer phrases first, so "ktTeams AI" wins over "ktTeams"
  contains.sort((a, b) => b[0].length - a[0].length);
  return { exact, contains, v, active: rows.length > 0 };
}

let conn: InstanceType<typeof Database> | null = null;
let version = -1;

function refreshFromFile(force: boolean) {
  if (!conn) {
    if (!existsSync(filePath)) return;
    conn = new Database(filePath, { readonly: true });
  }
  try {
    const row = conn.prepare("SELECT value FROM counters WHERE key = 'text'").get() as { value?: number } | undefined;
    const v = Number(row?.value ?? 0);
    if (!force && v === version) return;
    const rows = conn.prepare("SELECT original, replacement, mode FROM text_overrides").all() as Row[];
    globalThis.__ktText = build(rows, v);
    version = v;
  } catch {
    // The tables are created on the first database call; nothing to apply yet
  }
}

let pending: Promise<void> | null = null;
let lastRemote = 0;

function refreshFromRemote(force: boolean) {
  if (pending) return;
  if (!force) {
    const now = Date.now();
    if (now - lastRemote < 5000) return;
    lastRemote = now;
  }
  pending = (async () => {
    try {
      const client = await db();
      const vr = await client.execute("SELECT value FROM counters WHERE key = 'text'");
      const v = Number(vr.rows[0]?.value ?? 0);
      if (!force && v === version) return;
      const res = await client.execute("SELECT original, replacement, mode FROM text_overrides");
      globalThis.__ktText = build(
        res.rows.map((r) => ({ original: String(r.original), replacement: String(r.replacement), mode: String(r.mode) })),
        v,
      );
      version = v;
    } catch {
      // Try again on the next refresh
    } finally {
      pending = null;
    }
  })();
}

export function refreshTextRules(force = false) {
  if (isFile) refreshFromFile(force);
  else refreshFromRemote(force);
}

// Load when the server starts, then poll in the background (outside rendering,
// which must not touch the clock). unref() lets builds and scripts exit.
const g = globalThis as typeof globalThis & { __ktTextTimer?: ReturnType<typeof setInterval> };
refreshTextRules(true);
if (!g.__ktTextTimer) {
  g.__ktTextTimer = setInterval(() => refreshTextRules(), 1000);
  g.__ktTextTimer.unref?.();
}

/** Inline script for the root layout, so client components use the same wording. */
export function textRulesScript(): string | null {
  const r = globalThis.__ktText;
  if (!r?.active) return null;
  return `window.__ktText=${JSON.stringify(r).replace(/</g, "\\u003c")};`;
}

/** Call after any change to text_overrides: bumps the version and refreshes every page. */
export async function textRulesChanged() {
  const client = await db();
  await client.execute("UPDATE counters SET value = value + 1 WHERE key = 'text'");
  refreshTextRules(true);
  revalidatePath("/", "layout");
}

export type TextOverride = { id: number; original: string; replacement: string; mode: "exact" | "contains"; updated_at: string };

/**
 * Saves a change made in the visual editor. `current` is the text as shown on
 * the page, which may already be an earlier replacement; that earlier rule is
 * updated rather than stacked.
 */
export async function saveVisualEdit(current: string, replacement: string | null) {
  const client = await db();
  const prev = await client.execute({
    sql: "SELECT id, original FROM text_overrides WHERE mode = 'exact' AND replacement = ? ORDER BY id DESC LIMIT 1",
    args: [current],
  });
  const existing = prev.rows[0] ? { id: Number(prev.rows[0].id), original: String(prev.rows[0].original) } : null;
  const original = existing?.original ?? current;

  if (replacement === null || replacement === original) {
    // Reset: go back to the original wording
    if (existing) await client.execute({ sql: "DELETE FROM text_overrides WHERE id = ?", args: [existing.id] });
  } else if (existing) {
    await client.execute({
      sql: "UPDATE text_overrides SET replacement = ?, updated_at = datetime('now') WHERE id = ?",
      args: [replacement, existing.id],
    });
  } else {
    await client.execute({
      sql: `INSERT INTO text_overrides (original, replacement, mode) VALUES (?, ?, 'exact')
            ON CONFLICT (original, mode) DO UPDATE SET replacement = excluded.replacement, updated_at = datetime('now')`,
      args: [original, replacement],
    });
  }
  await textRulesChanged();
  return { original, replacement: replacement ?? original };
}
