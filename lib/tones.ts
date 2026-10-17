export type Tone = "violet" | "mint" | "sun" | "coral" | "pink" | "sky";

export const tones: Tone[] = ["violet", "mint", "sun", "coral", "pink", "sky"];

/** Literal class strings per tone so Tailwind can see them at build time. */
export const toneStyles: Record<
  Tone,
  { tint: string; solid: string; ink: string; ring: string; soft: string; gradient: string }
> = {
  violet: {
    tint: "bg-tint-violet",
    solid: "bg-primary text-primary-fg",
    ink: "text-primary",
    ring: "ring-primary/30",
    soft: "bg-primary/12 text-primary",
    gradient: "from-primary/25 via-primary/5 to-transparent",
  },
  mint: {
    tint: "bg-tint-mint",
    solid: "bg-mint text-white dark:text-deep",
    ink: "text-mint-ink",
    ring: "ring-mint/30",
    soft: "bg-mint/15 text-mint-ink",
    gradient: "from-mint/25 via-mint/5 to-transparent",
  },
  sun: {
    tint: "bg-tint-sun",
    solid: "bg-sun text-deep",
    ink: "text-sun-ink",
    ring: "ring-sun/30",
    soft: "bg-sun/20 text-sun-ink",
    gradient: "from-sun/30 via-sun/5 to-transparent",
  },
  coral: {
    tint: "bg-tint-coral",
    solid: "bg-coral text-white dark:text-deep",
    ink: "text-coral-ink",
    ring: "ring-coral/30",
    soft: "bg-coral/15 text-coral-ink",
    gradient: "from-coral/25 via-coral/5 to-transparent",
  },
  pink: {
    tint: "bg-tint-pink",
    solid: "bg-pink text-white dark:text-deep",
    ink: "text-pink-ink",
    ring: "ring-pink/30",
    soft: "bg-pink/15 text-pink-ink",
    gradient: "from-pink/25 via-pink/5 to-transparent",
  },
  sky: {
    tint: "bg-tint-sky",
    solid: "bg-sky text-white dark:text-deep",
    ink: "text-sky-ink",
    ring: "ring-sky/30",
    soft: "bg-sky/15 text-sky-ink",
    gradient: "from-sky/25 via-sky/5 to-transparent",
  },
};

export function toneAt(i: number): Tone {
  return tones[((i % tones.length) + tones.length) % tones.length];
}
