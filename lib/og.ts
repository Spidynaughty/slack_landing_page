/**
 * Per-page share pictures. Each page's og:image is /og?t=<title>&k=<section>&s=<signature>,
 * drawn by app/og/route.tsx. The signature stops anyone from using the route to put
 * their own words on an image with our logo; without SESSION_SECRET every page
 * falls back to the site-wide picture from app/opengraph-image.tsx.
 */
import "server-only";
import { createHmac } from "node:crypto";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const DEFAULT_SHARE_IMAGE = "/opengraph-image";

/** Short label for the top of the picture, from the first part of the path. */
const SECTIONS: Record<string, string> = {
  features: "Product",
  "ai-agents": "Product",
  connect: "Product",
  crm: "Product",
  solutions: "Solutions",
  enterprise: "Enterprise",
  "enterprise-key-management": "Enterprise",
  pricing: "Pricing",
  compare: "Compare",
  blog: "Blog",
  "engineering-blog": "Blog",
  "design-blog": "Blog",
  "customer-stories": "Customer story",
  resources: "Resources",
  help: "Help Centre",
  events: "Events",
  careers: "Careers",
  trust: "Trust Center",
  legal: "Legal",
  marketplace: "Marketplace",
  integrations: "Marketplace",
  templates: "Templates",
  developers: "Developers",
  downloads: "Download",
};

export function sectionFor(path: string) {
  return SECTIONS[path.split("/")[1] ?? ""] ?? "";
}

function key() {
  const secret = process.env.SESSION_SECRET;
  return secret && secret.length >= 32 ? createHmac("sha256", secret).update("og-image").digest() : null;
}

export function signOg(title: string, kicker: string) {
  const k = key();
  return k ? createHmac("sha256", k).update(`${title}\n${kicker}`).digest("base64url").slice(0, 16) : null;
}

/** The share picture URL for a page with this title. */
export function shareImageUrl(title: string, path: string) {
  const kicker = sectionFor(path);
  const sig = signOg(title, kicker);
  if (!sig) return DEFAULT_SHARE_IMAGE;
  const q = new URLSearchParams({ t: title, ...(kicker ? { k: kicker } : {}), s: sig });
  return `/og?${q}`;
}
