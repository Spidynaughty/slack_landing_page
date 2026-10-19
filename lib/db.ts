/**
 * Database client. Uses a local SQLite file by default (`.data/ktteams.db`);
 * set DATABASE_URL (and DATABASE_AUTH_TOKEN) to a libsql:// URL to use Turso
 * instead, which is what serverless hosts such as Vercel need.
 *
 * Tables are created on first use, so there is no separate migration step.
 */
import "server-only";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createClient, type Client, type InStatement } from "@libsql/client";
import { pricingFaqs } from "@/data/pricing";

const url = process.env.DATABASE_URL || "file:.data/ktteams.db";

const schema = [
  `CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY)`,
  `CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT '',
    company TEXT NOT NULL DEFAULT '',
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    quote TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 0,
    sort INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS faqs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort INTEGER NOT NULL DEFAULT 0,
    published INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    form TEXT NOT NULL,
    page TEXT NOT NULL DEFAULT '',
    name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    data TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS submissions_status ON submissions (status, created_at)`,
  // Site text the admin has changed; see lib/text-overrides.ts
  `CREATE TABLE IF NOT EXISTS text_overrides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original TEXT NOT NULL,
    replacement TEXT NOT NULL,
    mode TEXT NOT NULL DEFAULT 'exact' CHECK (mode IN ('exact', 'contains')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE (original, mode)
  )`,
  `CREATE TABLE IF NOT EXISTS counters (key TEXT PRIMARY KEY, value INTEGER NOT NULL DEFAULT 0)`,
  // The admin login once it has been changed in the admin (one row); see lib/auth.ts
  `CREATE TABLE IF NOT EXISTS admin_credentials (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `INSERT OR IGNORE INTO counters (key, value) VALUES ('text', 0)`,
];

/** Copies the pricing FAQs from the code into the database once, so they become editable. */
function seedFaqs(): InStatement[] {
  const unseeded = `NOT EXISTS (SELECT 1 FROM meta WHERE key = 'seed:faqs')`;
  return [
    ...pricingFaqs.map((f, i) => ({
      sql: `INSERT INTO faqs (page, question, answer, sort) SELECT 'pricing', ?, ?, ? WHERE ${unseeded}`,
      args: [f.q, f.a, i],
    })),
    `INSERT OR IGNORE INTO meta (key) VALUES ('seed:faqs')`,
  ];
}

async function migrate(client: Client) {
  if (url.startsWith("file:")) {
    // Build workers and the dev server can open the file at the same time
    await client.execute("PRAGMA busy_timeout = 8000");
    await client.execute("PRAGMA journal_mode = WAL");
  }
  // A write batch runs in one transaction, so concurrent first runs seed only once
  await client.batch([...schema, ...seedFaqs()], "write");
}

type Db = { client: Client; ready: Promise<void> };
const globalDb = globalThis as typeof globalThis & { __ktDb?: Db };

/** The shared client, ready to query. */
export async function db(): Promise<Client> {
  if (!globalDb.__ktDb) {
    if (url.startsWith("file:")) mkdirSync(dirname(resolve(url.slice("file:".length))), { recursive: true });
    const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
    globalDb.__ktDb = { client, ready: migrate(client) };
  }
  await globalDb.__ktDb.ready;
  return globalDb.__ktDb.client;
}

/** Row values arrive as libsql Row objects; this turns them into plain, serializable objects. */
export function plain<T>(rows: ArrayLike<Record<string, unknown>>): T[] {
  return Array.from(rows, (r) => ({ ...r }) as T);
}
