import type { CSSProperties, ReactNode } from "react";
import { Check, X } from "lucide-react";
import { CTABand, SplitFeature } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { CopyButton } from "../media-kit/_components/copy-button";

export const metadata = buildMetadata({
  title: "Brand guidelines and logo usage",
  description: `The ${B} brand center: logo usage dos and don'ts, clear space, color palette with hex values, typography, voice and tone, and illustration style.`,
  path: "/brand",
});

/* ------------------------------------------------------------------ */
/* Color helpers (brand values mirror the tokens in app/globals.css)    */
/* ------------------------------------------------------------------ */
const DEEP = "#0b0a1a";

type Swatch = { name: string; token: string; hex: string; role: string; tone?: Tone };

const palette: Swatch[] = [
  { name: "Primary", token: "--primary", hex: "#5b3df5", role: "Our signature color for buttons, links and the moments that matter most.", tone: "violet" },
  { name: "Deep", token: "--deep", hex: "#0b0a1a", role: "Dark surfaces, footers and high-contrast type. Our neutral anchor." },
  { name: "Orange", token: "--coral", hex: "#ff7a1a", role: "Energy and momentum. Use sparingly to draw attention.", tone: "coral" },
  { name: "Teal", token: "--mint", hex: "#14b8a6", role: "Success, progress and positive status.", tone: "mint" },
  { name: "Amber", token: "--sun", hex: "#fbbf24", role: "Optimism and highlights. Always pair with deep text.", tone: "sun" },
  { name: "Fuchsia", token: "--pink", hex: "#d946ef", role: "Celebration, community and the end of our gradient.", tone: "pink" },
  { name: "Cyan", token: "--sky", hex: "#22d3ee", role: "Information, data visualization and calm moments.", tone: "sky" },
];

function channels(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as const;
}

function luminance(hex: string) {
  const [r, g, b] = channels(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Picks whichever of white or deep reads better on the swatch. */
function textOn(hex: string) {
  const white = contrast(hex, "#ffffff");
  const deep = contrast(hex, DEEP);
  return white >= deep ? { color: "#ffffff", label: "White text", ratio: white } : { color: DEEP, label: "Deep text", ratio: deep };
}

/* ------------------------------------------------------------------ */
/* Logo helpers                                                        */
/* ------------------------------------------------------------------ */
function Wordmark({ dark = false, className, style }: { dark?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} style={style}>
      <LogoMark className="size-9" />
      <span className={cn("font-display text-2xl font-extrabold tracking-tight", dark ? "text-white" : "text-deep")}>{B}</span>
    </span>
  );
}

type Rule = { ok: boolean; title: string; body: string; preview: ReactNode; label: string };

const rules: Rule[] = [
  {
    ok: true,
    title: "Use full color on white",
    body: "The full-color logo on white or our lightest tints is always the first choice.",
    label: "Full-color logo on a white background",
    preview: (
      <div className="flex h-full items-center justify-center bg-white">
        <Wordmark />
      </div>
    ),
  },
  {
    ok: true,
    title: "Reverse it on deep",
    body: "On deep or very dark backgrounds, switch to the white wordmark so it stays legible.",
    label: "Reversed logo on a deep background",
    preview: (
      <div className="flex h-full items-center justify-center bg-deep">
        <Wordmark dark />
      </div>
    ),
  },
  {
    ok: true,
    title: "Give it room to breathe",
    body: "Keep clear space on every side equal to the height of the mark's typing dots.",
    label: "Logo surrounded by generous clear space",
    preview: (
      <div className="flex h-full items-center justify-center bg-white">
        <span className="rounded-lg border-2 border-dashed border-[#5b3df5]/40 p-4">
          <Wordmark />
        </span>
      </div>
    ),
  },
  {
    ok: true,
    title: "Use the mark at small sizes",
    body: "Below 96 pixels wide, drop the wordmark and use the mark on its own.",
    label: "Logo mark used alone as an app icon",
    preview: (
      <div className="flex h-full items-center justify-center gap-4 bg-white">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-deep shadow-lg">
          <LogoMark className="size-9" />
        </span>
        <LogoMark className="size-7" />
      </div>
    ),
  },
  {
    ok: false,
    title: "Don't stretch or squash it",
    body: "Always scale the logo proportionally. Never change its width or height on its own.",
    label: "Logo incorrectly stretched horizontally",
    preview: (
      <div className="flex h-full items-center justify-center overflow-hidden bg-white">
        <Wordmark style={{ transform: "scaleX(1.45) scaleY(0.8)" }} />
      </div>
    ),
  },
  {
    ok: false,
    title: "Don't change the colors",
    body: "The mark's violet bubble and three dots are fixed. Never recolor them to match a layout.",
    label: "Logo incorrectly recolored",
    preview: (
      <div className="flex h-full items-center justify-center bg-white">
        <Wordmark className="hue-rotate-[150deg] saturate-150" />
      </div>
    ),
  },
  {
    ok: false,
    title: "Don't add effects",
    body: "No drop shadows, outlines, glows, gradients or rotation. The logo works best flat.",
    label: "Logo incorrectly rotated with a heavy drop shadow",
    preview: (
      <div className="flex h-full items-center justify-center bg-white">
        <Wordmark className="-rotate-12 drop-shadow-[0_8px_6px_rgba(23,17,63,0.55)]" />
      </div>
    ),
  },
  {
    ok: false,
    title: "Don't use busy backgrounds",
    body: "Avoid patterns, photos or gradients that compete with the logo and hurt legibility.",
    label: "Logo incorrectly placed on a busy, colorful background",
    preview: (
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-[linear-gradient(120deg,#5b3df5,#d946ef,#ff7a1a)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(#0b0a1a_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-40" />
        <Wordmark className="relative" />
      </div>
    ),
  },
];

const voice: { title: string; body: string; say: string; avoid: string; icon: IconName }[] = [
  {
    title: "Clear over clever",
    body: "Say the useful thing first. Wordplay is welcome only when it never gets in the way of understanding.",
    say: "Your export is ready. Find it in Settings under Workspace data.",
    avoid: "Boom! Your data has been magically whisked away to a happy place!",
    icon: "lightbulb",
  },
  {
    title: "Warm, not cute",
    body: "We sound like a thoughtful colleague: friendly and encouraging without trying too hard.",
    say: "Welcome back. Here is a quick recap of what you missed.",
    avoid: "Yaaay, you're back!!! We missed you sooo much!",
    icon: "smile",
  },
  {
    title: "Confident, never cocky",
    body: "We make specific claims we can stand behind, and we leave the superlatives to our customers.",
    say: "Teams using recaps save about 90 minutes per person each week.",
    avoid: "The only tool you will ever need. Period.",
    icon: "badge",
  },
  {
    title: "Human and inclusive",
    body: "Plain words, gender-neutral language and no jargon. Everyone should feel the product was written for them.",
    say: "Invite your teammates to the channel.",
    avoid: "Hey guys, ping your crew and onboard them ASAP.",
    icon: "users",
  },
];

const toneScale: { context: string; note: string; position: number }[] = [
  { context: "Celebrations and milestones", note: "Playful and generous with delight", position: 88 },
  { context: "Onboarding and tips", note: "Encouraging and upbeat", position: 66 },
  { context: "Product announcements", note: "Confident and concrete", position: 48 },
  { context: "Errors and outages", note: "Calm, direct and helpful", position: 24 },
  { context: "Security, legal and billing", note: "Precise and serious", position: 8 },
];

const typeScale: { name: string; token: string; cls: string; sample: string }[] = [
  { name: "Display XL", token: "text-display-xl", cls: "font-display text-display-xl font-extrabold", sample: "Work, together" },
  { name: "Display L", token: "text-display-lg", cls: "font-display text-display-lg font-extrabold", sample: "Where work happens" },
  { name: "Display M", token: "text-display-md", cls: "font-display text-display-md font-bold", sample: "Channels for every project" },
  { name: "Display S", token: "text-display-sm", cls: "font-display text-display-sm font-bold", sample: "Huddle up in one click" },
  { name: "Lead", token: "text-lead", cls: "font-sans text-lead", sample: "Bring people, apps and agents into one shared space." },
  { name: "Body", token: "text-base", cls: "font-sans text-base", sample: "Recaps summarize busy channels so you can catch up in minutes." },
  { name: "Small", token: "text-sm", cls: "font-sans text-sm", sample: "Updated 2 minutes ago by Priya Raman" },
];

function BrandVisual() {
  return (
    <div className="relative grid grid-cols-6 gap-4" aria-hidden="true">
      <div className="relative col-span-6 flex h-56 items-center justify-center overflow-hidden rounded-[var(--radius-panel)] bg-deep shadow-float sm:h-64">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="absolute -top-16 -right-10 size-56 rounded-full bg-[#5b3df5] opacity-60 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 size-56 rounded-full bg-[#d946ef] opacity-40 blur-3xl" />
        <span className="relative inline-flex items-center gap-3 sm:gap-4">
          <LogoMark className="size-14 sm:size-20" />
          <span className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl">{B}</span>
        </span>
      </div>
      <div className="col-span-4 flex items-center gap-1.5 rounded-[var(--radius-card)] border border-line bg-surface p-3 shadow-card sm:gap-2 sm:p-4">
        {palette.map((s) => (
          <span key={s.hex} className="aspect-square min-w-0 flex-1 rounded-full" style={{ backgroundColor: s.hex }} />
        ))}
      </div>
      <div className="col-span-2 flex items-center justify-center rounded-[var(--radius-card)] bg-tint-sun p-4">
        <span className="font-display text-4xl font-extrabold text-fg">Aa</span>
      </div>
    </div>
  );
}

function Illustration() {
  return (
    <div
      role="img"
      aria-label="Sample illustration: two people sharing an idea, drawn with simple rounded shapes in brand colors"
      className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-panel)] bg-tint-sun shadow-card"
    >
      <div className="absolute -bottom-24 -left-16 size-72 rounded-full bg-primary/90" />
      <div className="absolute top-8 right-10 size-16 rounded-full border-[10px] border-sky" />
      <div className="absolute top-16 left-12 size-8 rotate-12 rounded-lg bg-pink" />
      <div className="absolute right-1/4 bottom-8 size-5 rounded-full bg-coral" />

      {/* Person one */}
      <div className="absolute bottom-0 left-[16%] flex flex-col items-center">
        <span className="size-16 rounded-full bg-coral sm:size-20" />
        <span className="-mt-1 h-28 w-28 rounded-t-[3rem] bg-deep sm:h-36 sm:w-36" />
      </div>
      {/* Person two */}
      <div className="absolute right-[14%] bottom-0 flex flex-col items-center">
        <span className="size-14 rounded-full bg-sun sm:size-[4.5rem]" />
        <span className="-mt-1 h-24 w-24 rounded-t-[3rem] bg-mint sm:h-32 sm:w-32" />
      </div>
      {/* Shared idea */}
      <div className="absolute top-[18%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-lg">
        <span className="size-3.5 rounded-full bg-coral" />
        <span className="size-3.5 rounded-full bg-sun" />
        <span className="size-3.5 rounded-full bg-mint" />
      </div>
    </div>
  );
}

export default function BrandPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Brand" }]}
        eyebrow="Brand center"
        tone="pink"
        title={
          <>
            Our brand, and <span className="text-gradient">how to use it well</span>
          </>
        }
        subtitle={`Guidelines for presenting ${B} clearly and consistently, whether you are a partner, a journalist, a developer or a teammate building something new.`}
        primary={{ label: "Get the media kit", href: "/media-kit" }}
        secondary={{ label: "Ask the brand team", href: "/contact" }}
        visual={<BrandVisual />}
      />

      {/* Logo */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col items-start gap-5">
            <Eyebrow tone="violet">The logo</Eyebrow>
            <h2 className="text-display-md font-bold text-fg">A conversation, just before it starts</h2>
            <p className="text-lead text-muted">
              Our mark is a speech bubble holding three typing dots: the moment right before someone shares an idea.
              The coral, sun and mint dots stand for the people, apps and agents that come together in {B}.
            </p>
            <p className="text-muted">
              The logo has two parts, the mark and the wordmark. Use them together whenever there is room, and use the
              mark alone for app icons, avatars and small placements.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-4">
            <div
              role="img"
              aria-label={`${B} logo with the mark and wordmark labeled`}
              className="relative flex h-64 items-center justify-center rounded-[var(--radius-panel)] border border-line bg-white shadow-card"
            >
              <span className="inline-flex items-center gap-3 sm:gap-4">
                <span className="relative">
                  <LogoMark className="size-14 sm:size-20" />
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.12em] whitespace-nowrap text-[#5b3df5] uppercase">
                    Mark
                  </span>
                </span>
                <span className="relative">
                  <span className="font-display text-4xl font-extrabold tracking-tight text-deep sm:text-6xl">{B}</span>
                  <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-xs font-bold tracking-[0.12em] whitespace-nowrap text-[#5b3df5] uppercase">
                    Wordmark
                  </span>
                </span>
              </span>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Clear space + minimum size */}
      <Section bg="soft">
        <SectionHeader eyebrow="Spacing and size" tone="sky" title="Clear space and minimum size" subtitle="A little room goes a long way. These two rules keep the logo legible everywhere it appears." />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-bold text-fg">Clear space</h3>
            <p className="mt-2 text-muted">
              Keep an empty margin around the logo equal to <strong className="text-fg">x</strong>, the height of one
              typing dot. Nothing else, including other logos, text or edges, should enter that space.
            </p>
            <div
              role="img"
              aria-label="Diagram showing clear space equal to x on every side of the logo"
              className="relative mt-8 flex flex-1 items-center justify-center rounded-2xl bg-white p-4 sm:p-10"
            >
              <div className="relative border-2 border-dashed border-[#d946ef]/60 p-6 sm:p-10">
                <span className="absolute top-1 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-[#be185d]">x</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-mono text-xs font-bold text-[#be185d]">x</span>
                <span className="absolute top-1/2 left-2 -translate-y-1/2 font-mono text-xs font-bold text-[#be185d]">x</span>
                <span className="absolute top-1/2 right-2 -translate-y-1/2 font-mono text-xs font-bold text-[#be185d]">x</span>
                <span className="inline-flex items-center gap-2 outline outline-1 outline-[#5b3df5]/25">
                  <LogoMark className="size-8 sm:size-10" />
                  <span className="font-display text-2xl font-extrabold tracking-tight text-deep sm:text-3xl">{B}</span>
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <h3 className="font-display text-xl font-bold text-fg">Minimum size</h3>
            <p className="mt-2 text-muted">
              Below these sizes, details start to blur. When space is tight, switch from the full logo to the mark.
            </p>
            <ul className="mt-8 grid flex-1 gap-4 sm:grid-cols-2">
              <li className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white p-6">
                <span className="flex flex-1 items-center">
                  <span className="inline-flex items-center gap-1.5" aria-hidden="true">
                    <LogoMark className="size-6" />
                    <span className="font-display text-lg font-extrabold tracking-tight text-deep">{B}</span>
                  </span>
                </span>
                <span className="text-center">
                  <span className="block font-display text-2xl font-extrabold text-[#0b0a1a]">96 px</span>
                  <span className="block text-sm text-[#57536f]">Full logo, 25 mm in print</span>
                </span>
              </li>
              <li className="flex flex-col items-center justify-between gap-6 rounded-2xl bg-white p-6">
                <span className="flex flex-1 items-center" aria-hidden="true">
                  <LogoMark className="size-5" />
                </span>
                <span className="text-center">
                  <span className="block font-display text-2xl font-extrabold text-[#0b0a1a]">20 px</span>
                  <span className="block text-sm text-[#57536f]">Mark only, 6 mm in print</span>
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Do / Don't */}
      <Section>
        <SectionHeader
          eyebrow="Logo usage"
          tone="coral"
          title="Dos and don'ts"
          subtitle="The logo is the most recognizable part of our identity. Treat it consistently and it will do the rest."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rules.map((r) => (
            <StaggerItem key={r.title} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
                <div role="img" aria-label={r.label} className="h-36 border-b border-line">
                  {r.preview}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={cn(
                      "inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold",
                      r.ok ? toneStyles.mint.soft : toneStyles.coral.soft,
                    )}
                  >
                    {r.ok ? <Check className="size-3.5" aria-hidden="true" /> : <X className="size-3.5" aria-hidden="true" />}
                    {r.ok ? "Do" : "Don't"}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-fg">{r.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{r.body}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Color */}
      <Section bg="soft" id="color">
        <SectionHeader
          eyebrow="Color"
          tone="violet"
          title="A confident palette"
          subtitle="One deep primary, a dark anchor and five vivid accents. Every value below matches the design tokens used across our product and site."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {palette.map((s, i) => {
            const text = textOn(s.hex);
            const [r, g, b] = channels(s.hex);
            return (
              <StaggerItem key={s.hex} className={cn("h-full", i === 0 && "sm:col-span-2")}>
                <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
                  <div className={cn("flex flex-col justify-between p-5", i === 0 ? "h-48" : "h-36")} style={{ backgroundColor: s.hex, color: text.color }}>
                    <span className="font-display text-2xl font-extrabold">{s.name}</span>
                    <span className="text-sm font-semibold">
                      {text.label} · {text.ratio.toFixed(1)}:1
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                        <dt className="font-semibold text-subtle">HEX</dt>
                        <dd className="font-mono font-bold text-fg uppercase">{s.hex}</dd>
                        <dt className="font-semibold text-subtle">RGB</dt>
                        <dd className="font-mono text-fg">
                          {r}, {g}, {b}
                        </dd>
                        <dt className="font-semibold text-subtle">Token</dt>
                        <dd className="font-mono text-muted">{s.token}</dd>
                      </dl>
                      <CopyButton text={s.hex} label="Copy" copiedLabel="Copied" compact srLabel={`Copy ${s.name} hex value ${s.hex}`} />
                    </div>
                    <p className="mt-4 text-sm text-muted">{s.role}</p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
          <h3 className="font-display text-xl font-bold text-fg">Color proportions</h3>
          <p className="mt-1 text-muted">Lead with plenty of white space and deep type. Primary carries the brand, and accents add energy in small doses.</p>
          <div className="mt-6 flex h-14 overflow-hidden rounded-2xl border border-line" role="img" aria-label="Recommended color balance: 60% white, 18% deep, 12% primary, 10% accents">
            <span className="flex items-center overflow-hidden bg-white pl-4 text-xs font-bold whitespace-nowrap text-[#0b0a1a]" style={{ width: "60%" }}>
              White 60%
            </span>
            <span className="flex items-center overflow-hidden bg-[#0b0a1a] pl-3 text-xs font-bold whitespace-nowrap text-white" style={{ width: "18%" }}>
              Deep 18%
            </span>
            <span className="flex items-center overflow-hidden bg-[#5b3df5] pl-3 text-xs font-bold whitespace-nowrap text-white" style={{ width: "12%" }}>
              <span className="hidden sm:inline">Primary 12%</span>
            </span>
            {["#ff7a1a", "#14b8a6", "#fbbf24", "#d946ef", "#22d3ee"].map((hex) => (
              <span key={hex} style={{ width: "2%", backgroundColor: hex }} />
            ))}
          </div>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li>Sun and mint always take deep text</li>
            <li>Never put two accents side by side as text and background</li>
            <li>Gradients run primary to pink to coral, left to right</li>
          </ul>
        </Reveal>
      </Section>

      {/* Typography */}
      <Section>
        <SectionHeader
          eyebrow="Typography"
          tone="sun"
          title="Two typefaces, one voice"
          subtitle="A characterful display face for headlines and numbers, paired with a quiet, highly legible text face for everything else."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">Display typeface</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-fg">Headlines and numbers</h3>
              </div>
              <code className="rounded-lg bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg">font-display</code>
            </div>
            <p className="mt-6 font-display text-[7rem] leading-none font-extrabold tracking-tight text-gradient sm:text-[9rem]">Aa</p>
            <p className="mt-6 font-display text-lg leading-snug font-bold break-all text-fg sm:text-2xl">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 &amp;?!
            </p>
            <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
              Weights: Bold 700 and ExtraBold 800. Use tight letter spacing at large sizes and sentence case for every
              headline.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">Text typeface</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-fg">Interface and reading</h3>
              </div>
              <code className="rounded-lg bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg">font-sans</code>
            </div>
            <p className="mt-6 font-sans text-[7rem] leading-none font-semibold tracking-tight text-fg sm:text-[9rem]">Aa</p>
            <p className="mt-6 font-sans text-lg leading-snug break-all text-fg sm:text-2xl">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 &amp;?!
            </p>
            <p className="mt-6 border-t border-line pt-4 text-sm text-muted">
              Weights: Regular 400, Medium 500, Semibold 600 and Bold 700. Body copy sits at 16 to 18 pixels with
              generous line height.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
          <h3 className="border-b border-line bg-surface-2 px-6 py-4 font-display text-lg font-bold text-fg">Type scale</h3>
          <ul className="divide-y divide-line">
            {typeScale.map((t) => (
              <li key={t.token} className="grid gap-2 px-6 py-5 md:grid-cols-[11rem_1fr] md:items-center md:gap-8">
                <div>
                  <p className="font-semibold text-fg">{t.name}</p>
                  <p className="font-mono text-xs text-subtle">{t.token}</p>
                </div>
                <p className={cn("min-w-0 break-words text-fg", t.cls)}>{t.sample}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Voice and tone */}
      <Section bg="violet">
        <SectionHeader
          eyebrow="Voice and tone"
          title="How we sound"
          subtitle="Our voice stays the same everywhere. Our tone flexes with the moment, the way a good colleague reads the room."
        />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {voice.map((v, i) => {
            const t = toneStyles[(["violet", "mint", "sun", "pink"] as const)[i]];
            return (
              <StaggerItem key={v.title} className="h-full">
                <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-7">
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
                    <Icon name={v.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.body}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-tint-mint p-4">
                      <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] text-mint-ink uppercase">
                        <Check className="size-3.5" aria-hidden="true" /> We say
                      </p>
                      <p className="mt-2 text-sm text-fg">“{v.say}”</p>
                    </div>
                    <div className="rounded-2xl bg-tint-coral p-4">
                      <p className="flex items-center gap-1.5 text-xs font-bold tracking-[0.1em] text-coral-ink uppercase">
                        <X className="size-3.5" aria-hidden="true" /> We avoid
                      </p>
                      <p className="mt-2 text-sm text-fg">“{v.avoid}”</p>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-8">
          <h3 className="font-display text-xl font-bold text-fg">Tone by context</h3>
          <p className="mt-1 text-muted">Move along the scale depending on what the reader is feeling and what is at stake.</p>
          <div className="mt-6 hidden justify-between text-xs font-bold tracking-[0.12em] text-subtle uppercase sm:flex">
            <span>Serious</span>
            <span>Playful</span>
          </div>
          <ul className="mt-3 flex flex-col gap-5">
            {toneScale.map((t) => (
              <li key={t.context} className="grid gap-2 sm:grid-cols-[15rem_1fr] sm:items-center sm:gap-6">
                <div>
                  <p className="font-semibold text-fg">{t.context}</p>
                  <p className="text-sm text-muted">{t.note}</p>
                </div>
                <div className="relative h-2.5 rounded-full bg-gradient-to-r from-sky/40 via-primary/40 to-pink/50" aria-hidden="true">
                  <span
                    className="absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-surface bg-primary shadow-card"
                    style={{ left: `${t.position}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Illustration */}
      <Section>
        <SplitFeature
          eyebrow="Illustration"
          tone="mint"
          title="Drawing the everyday"
          body="Our illustrations celebrate ordinary moments of working together: a quick question, a shared idea, a finished project. They are built from simple, rounded shapes and flat brand color, with people at the center."
          bullets={[
            "Real moments of work, not abstract metaphors",
            "Simple geometry with soft, rounded corners",
            "Flat color from our palette, with no gradients on figures",
            "Diverse and inclusive, never caricatured",
          ]}
          visual={<Illustration />}
          cta={{ label: "Read the story behind our illustration language", href: "/blog/new-illustration-language" }}
          reverse
        />
        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-muted">Looking for approved logo files, boilerplate copy or executive bios?</p>
          <ArrowLink href="/media-kit">Go to the media kit</ArrowLink>
        </Reveal>
      </Section>

      <CTABand
        title="Building something with our brand?"
        subtitle="Partners and press can download approved assets in the media kit, or reach the brand team with questions about co-marketing."
        primary={{ label: "Visit the media kit", href: "/media-kit" }}
        secondary={{ label: "Contact the brand team", href: "/contact" }}
      />
    </>
  );
}
