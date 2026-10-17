import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge our custom tokens so e.g. `text-display-md` isn't mistaken for a colour.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["display-xl", "display-lg", "display-md", "display-sm", "lead"],
      shadow: ["soft", "card", "float", "glow"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Locale-independent date formatting so server and client output always match. */
export function formatDate(iso: string, style: "short" | "long" = "short") {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const month = style === "long" ? MONTHS_LONG[m - 1] : MONTHS[m - 1];
  return `${month} ${d}, ${y}`;
}

export function monthDay(iso: string) {
  const [, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { month: MONTHS[m - 1], day: String(d) };
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function readingTime(words: number) {
  return `${Math.max(1, Math.round(words / 230))} min read`;
}
