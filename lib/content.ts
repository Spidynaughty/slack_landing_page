/**
 * Content the admin panel controls, and the cached reads public pages use.
 *
 * Reads are wrapped in `use cache` and tagged, so pages stay prerendered and
 * fast; every admin save calls updateTag() with the same tag to refresh them.
 */
import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { db, plain } from "@/lib/db";
import { B } from "@/lib/site";

export type Review = {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  featured: number;
  published: number;
  sort: number;
  created_at: string;
  updated_at: string;
};

export type FaqRow = { id: number; page: string; question: string; answer: string; sort: number; published: number };

export type StatItem = { value: number; decimals: number; prefix: string; suffix: string; label: string };

/** Every editable block, with the defaults shown until the admin saves a change. */
export const settingDefaults = {
  announcement: {
    enabled: true,
    label: "New",
    text: "Agents now work in every channel",
    href: "/whats-new",
  },
  hero: {
    headline: "Where teams and AI",
    highlight: "get things done",
    subtitle: `${B} is the one place for conversations, meetings, docs, projects and AI agents, so your team spends less time chasing updates and more time shipping.`,
    primaryLabel: "Start free",
    primaryHref: "/get-started",
    secondaryLabel: "Watch the 2-min demo",
    secondaryHref: "/demo",
  },
  stats: [
    { value: 750, decimals: 0, prefix: "", suffix: "K+", label: `organizations work in ${B}` },
    { value: 37, decimals: 0, prefix: "", suffix: "%", label: "faster decision making" },
    { value: 97, decimals: 0, prefix: "", suffix: " min", label: "saved per person, per week" },
    { value: 2600, decimals: 0, prefix: "", suffix: "+", label: "apps and agents to connect" },
  ] as StatItem[],
  cta: {
    title: "Your team's best work",
    highlight: "starts here",
    subtitle: `Join hundreds of thousands of organizations already working in ${B}. Free to start, no credit card required.`,
  },
  logos: {
    title: "Trusted by teams at the world's most innovative companies",
    names: [
      "Northwind",
      "Brightline",
      "Kestrel Labs",
      "Lumen & Co",
      "Orbital Freight",
      "Halcyon Health",
      "Vantage Bank",
      "Juniper Studios",
      "Atlas Motors",
      "Copperleaf",
      "Meridian Air",
      "Pinecrest University",
    ],
  },
  reviewsSection: {
    eyebrow: "Reviews",
    title: "What teams say about working here",
    subtitle: "Real words from the people who use it every day.",
  },
};

export type Settings = typeof settingDefaults;
export type SettingKey = keyof Settings;

/** Reads a setting straight from the database (no cache), merged over its default. */
export async function readSetting<K extends SettingKey>(key: K): Promise<Settings[K]> {
  const client = await db();
  const res = await client.execute({ sql: "SELECT value FROM settings WHERE key = ?", args: [key] });
  const fallback = settingDefaults[key];
  if (!res.rows.length) return fallback;
  try {
    const saved = JSON.parse(String(res.rows[0].value));
    return (Array.isArray(fallback) ? saved : { ...fallback, ...saved }) as Settings[K];
  } catch {
    return fallback;
  }
}

/* ------------------------------------------------------------------ */
/* Cached reads for public pages                                        */
/* ------------------------------------------------------------------ */

export async function getSetting<K extends SettingKey>(key: K): Promise<Settings[K]> {
  "use cache";
  cacheTag(`setting:${key}`);
  cacheLife("max");
  return readSetting(key);
}

/** Published reviews, featured first, in the order set in the admin. */
export async function getPublishedReviews(): Promise<Review[]> {
  "use cache";
  cacheTag("reviews");
  cacheLife("max");
  const client = await db();
  const res = await client.execute(
    "SELECT * FROM reviews WHERE published = 1 ORDER BY featured DESC, sort ASC, id DESC",
  );
  return plain<Review>(res.rows);
}

export async function getFaqs(page: string): Promise<{ q: string; a: string }[]> {
  "use cache";
  cacheTag("faqs");
  cacheLife("max");
  const client = await db();
  const res = await client.execute({
    sql: "SELECT question, answer FROM faqs WHERE page = ? AND published = 1 ORDER BY sort ASC, id ASC",
    args: [page],
  });
  return res.rows.map((r) => ({ q: String(r.question), a: String(r.answer) }));
}

/** Average rating and count across published reviews, or null when there are none. */
export function ratingSummary(reviews: Review[]) {
  if (!reviews.length) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { average: Math.round(avg * 10) / 10, count: reviews.length };
}
