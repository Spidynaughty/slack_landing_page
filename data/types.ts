/** Shared content shapes used across data files and templates. */
export type Stat = { value: number; label: string; prefix?: string; suffix?: string; decimals?: number };

export type ArticleSection = {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Ordered steps (rendered as a numbered list), used mostly by help articles. */
  steps?: string[];
  /** Optional pull quote rendered after the paragraphs. */
  quote?: string;
};

export type Faq = { q: string; a: string };

export type Person = { name: string; role: string; initials: string };
