import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { Icon, type IconName } from "@/components/ui/icon";
import { LogoMark } from "@/components/ui/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { leaders } from "../about/_components/leadership";
import { CopyButton } from "./_components/copy-button";
import { DownloadActions } from "./_components/download-button";

export const generateMetadata = () => buildMetadata({
  title: "Media kit and press resources",
  description: `Download ${B} logos, read the company boilerplate and executive bios, check key facts and find the latest announcements and press contacts.`,
  path: "/media-kit",
});

const boilerplates = [
  {
    id: "short",
    label: "Short boilerplate",
    words: "About 40 words",
    text: `${B} is the AI-powered work platform where people, apps and agents collaborate. More than 750,000 organizations in over 150 countries use ${B} to share knowledge, make decisions faster and automate routine work. Founded in 2016, ${B} is headquartered in San Francisco.`,
  },
  {
    id: "full",
    label: "Full boilerplate",
    words: "About 100 words",
    text: `${B} is the AI-powered work platform where people, apps and agents collaborate. Teams use channels, huddles, canvases and lists to organize conversations, meet on the fly, document decisions and track projects in one place, while ${B} AI and agents surface answers, summarize discussions and complete tasks across connected tools. More than 750,000 organizations in over 150 countries, from five-person startups to global enterprises, rely on ${B} for enterprise-grade security, compliance and an ecosystem of more than 2,600 apps. Founded in 2016, ${B} is headquartered in San Francisco with 11 offices worldwide. Learn more at ${site.domain}.`,
  },
];

const facts: { label: string; value: string; icon: IconName }[] = [
  { label: "Founded", value: "2016, Oakland, California", icon: "rocket" },
  { label: "Headquarters", value: "San Francisco, California", icon: "building2" },
  { label: "Chief Executive Officer", value: "Julian Mercer", icon: "userCheck" },
  { label: "Employees", value: "3,800+ across 11 offices", icon: "users" },
  { label: "Customers", value: "750,000+ organizations", icon: "briefcase" },
  { label: "Global reach", value: "150+ countries and territories", icon: "globe" },
  { label: "Ecosystem", value: "2,600+ apps and 1,800+ partners", icon: "puzzle" },
  { label: "Daily messages", value: "More than 4 billion", icon: "messages" },
];

const logoAssets: { title: string; description: string; variant: "full" | "mark"; dark: boolean }[] = [
  { title: "Primary logo", description: "Full-color mark and wordmark for white and light backgrounds.", variant: "full", dark: false },
  { title: "Primary logo, reversed", description: "White wordmark for deep or photographic backgrounds.", variant: "full", dark: true },
  { title: "Logo mark", description: "The speech-bubble mark on its own, for avatars and small spaces.", variant: "mark", dark: false },
  { title: "Logo mark, reversed", description: "The mark on our deep brand color for app icons and social profiles.", variant: "mark", dark: true },
];

function LogoTile({ variant, dark }: { variant: "full" | "mark"; dark: boolean }) {
  return (
    <div
      role="img"
      aria-label={`${B} ${variant === "full" ? "logo" : "logo mark"} on a ${dark ? "dark" : "light"} background`}
      className={cn(
        "relative flex h-48 items-center justify-center overflow-hidden rounded-2xl sm:h-56",
        dark ? "bg-deep" : "border border-line bg-white",
      )}
    >
      {dark && <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-10" />}
      {variant === "full" ? (
        <span className="relative inline-flex items-center gap-3">
          <LogoMark className="size-11 lg:size-14" />
          <span className={cn("font-display text-4xl font-extrabold tracking-tight lg:text-5xl", dark ? "text-white" : "text-deep")}>{B}</span>
        </span>
      ) : (
        <LogoMark className="relative size-20 sm:size-24" />
      )}
    </div>
  );
}

function KitVisual() {
  const items: { icon: IconName; title: string; meta: string }[] = [
    { icon: "palette", title: "Logos and mark", meta: "SVG, PNG" },
    { icon: "file", title: "Company boilerplate", meta: "Short and full" },
    { icon: "users", title: "Executive bios", meta: "4 leaders" },
    { icon: "news", title: "Latest announcements", meta: "Updated weekly" },
  ];
  return (
    <div className="relative mx-auto max-w-md" aria-hidden="true">
      <div className="absolute -top-4 -right-4 h-full w-full rotate-3 rounded-[var(--radius-panel)] bg-tint-coral" />
      <div className="relative rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-float">
        <div className="flex items-center gap-3 border-b border-line pb-5">
          <LogoMark className="size-10" />
          <div>
            <p className="font-display text-lg font-bold text-fg">{B} press kit</p>
            <p className="text-sm text-muted">Updated October 2026</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {items.map((it, i) => (
            <li key={it.title} className="flex items-center gap-3 rounded-xl p-2.5 odd:bg-surface-2">
              <span className={cn("inline-flex size-9 items-center justify-center rounded-lg", toneStyles[(["violet", "coral", "mint", "sky"] as const)[i]].soft)}>
                <Icon name={it.icon} className="size-4.5" />
              </span>
              <span className="flex-1 text-sm font-semibold text-fg">{it.title}</span>
              <span className="text-xs text-subtle">{it.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function MediaKitPage() {
  const news = posts
    .filter((p) => p.category === "News")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);
  const bios = leaders.filter((l) => l.pressBio);

  return (
    <>
      <PageHero
        crumbs={[{ label: "About", href: "/about" }, { label: "Media kit" }]}
        eyebrow="Press"
        tone="coral"
        title={
          <>
            Media kit and <span className="text-gradient">press resources</span>
          </>
        }
        subtitle={`Everything you need to write about ${B}: approved logos, company facts, boilerplate copy, executive biographies and our latest announcements.`}
        primary={{ label: "Contact the press team", href: "/contact" }}
        secondary={{ label: "Brand guidelines", href: "/brand" }}
        visual={<KitVisual />}
      />

      {/* Logos */}
      <Section id="logos">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            align="left"
            className="!mb-0"
            eyebrow="Logos"
            title="Logo downloads"
            subtitle="Please use the logo as provided, with plenty of clear space. Do not recolor, stretch or add effects."
          />
          <ArrowLink href="/brand">Read the logo usage rules</ArrowLink>
        </div>
        <Stagger className="grid gap-6 md:grid-cols-2">
          {logoAssets.map((a) => (
            <StaggerItem key={a.title} className="h-full">
              <article className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-soft sm:p-5">
                <LogoTile variant={a.variant} dark={a.dark} />
                <div className="flex flex-col gap-4 px-1 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-fg">{a.title}</h3>
                    <p className="mt-1 text-sm text-muted">{a.description}</p>
                  </div>
                  <DownloadActions label={a.title} formats={["SVG", "PNG"]} className="shrink-0" />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-dashed border-line-strong p-6 sm:flex-row sm:items-center sm:gap-5">
          <Eyebrow tone="sky" className="shrink-0">
            Using our name
          </Eyebrow>
          <p className="text-sm text-muted">
            Write {B} with a capital first letter, never abbreviate it and never use it as a verb. For color, type and
            co-branding guidance, visit the{" "}
            <Link href="/brand" className="font-semibold text-primary underline-offset-4 hover:underline">
              brand center
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* Facts + boilerplate */}
      <Section bg="soft">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeader align="left" eyebrow="Fast facts" tone="mint" title="Company at a glance" className="!mb-8" />
            <Reveal>
              <dl className="grid gap-3 sm:grid-cols-2">
                {facts.map((f) => (
                  <div key={f.label} className="flex gap-3 rounded-2xl border border-line bg-surface p-4">
                    <Icon name={f.icon} className="mt-0.5 size-5 shrink-0 text-primary" />
                    <div>
                      <dt className="text-xs font-bold tracking-[0.1em] text-subtle uppercase">{f.label}</dt>
                      <dd className="mt-1 font-semibold text-fg">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <div>
            <SectionHeader align="left" eyebrow="Boilerplate" tone="sun" title={`About ${B}`} className="!mb-8" />
            <div className="flex flex-col gap-5">
              {boilerplates.map((b, i) => (
                <Reveal key={b.id} delay={i * 0.08}>
                  <article className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-bold text-fg">{b.label}</h3>
                        <p className="text-xs text-subtle">{b.words}</p>
                      </div>
                      <CopyButton text={b.text} label="Copy text" srLabel={`Copy ${b.label.toLowerCase()}`} />
                    </div>
                    <p className="mt-4 rounded-xl bg-surface-2 p-4 leading-relaxed text-fg">{b.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Executive bios */}
      <Section>
        <SectionHeader
          eyebrow="Leadership"
          tone="violet"
          title="Executive biographies"
          subtitle="Approved bios for articles, event programs and speaker introductions. Headshots are available on request."
        />
        <Stagger className="grid gap-6 lg:grid-cols-2">
          {bios.map((l) => (
            <StaggerItem key={l.name} className="h-full">
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft sm:p-7">
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className={cn("inline-flex size-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold", toneStyles[l.tone].solid)}
                  >
                    {l.initials}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-fg">{l.name}</h3>
                    <p className="text-sm text-muted">{l.role}</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 leading-relaxed text-muted">{l.pressBio}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <CopyButton text={l.pressBio ?? ""} label="Copy bio" compact srLabel={`Copy biography for ${l.name}`} />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 text-center">
          <ArrowLink href="/about">Meet the full leadership team</ArrowLink>
        </Reveal>
      </Section>

      {/* News */}
      <Section bg="coral">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeader align="left" className="!mb-0" eyebrow="Newsroom" tone="coral" title="Latest announcements" />
          <ArrowLink href="/blog/news">All company news</ArrowLink>
        </div>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {news.map((p) => (
            <StaggerItem key={p.slug} lift className="h-full">
              <Link
                href={`/blog/${p.slug}`}
                className="group/news flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">
                  <time dateTime={p.publishedAt}>{formatDate(p.publishedAt, "long")}</time>
                </p>
                <h3 className="mt-3 font-display text-lg leading-snug font-bold text-fg">{p.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{p.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Read the announcement
                  <ArrowRight className="size-4 transition-transform group-hover/news:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Press contact */}
      <section className="bg-bg px-3 py-10 sm:px-6 md:py-16" aria-labelledby="press-contact-heading">
        <div className="deep-adaptive relative mx-auto max-w-[82rem] overflow-hidden rounded-[2rem] border border-line bg-deep px-6 py-14 shadow-card md:px-16 md:py-20 dark:border-transparent">
          <GradientBlobs variant="deep" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="flex flex-col items-start gap-5">
              <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] text-on-deep uppercase">Press contact</p>
              <h2 id="press-contact-heading" className="text-display-md font-bold text-white">
                Working on a story?
              </h2>
              <p className="text-lead text-on-deep-muted">
                Journalists, analysts and event organizers can reach our communications team any time. We aim to reply
                within one business day, and sooner when you are on deadline.
              </p>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/contact" variant="light" size="lg" arrow>
                  Contact the press team
                </ButtonLink>
                <ButtonLink href="/brand" variant="outline-light" size="lg">
                  Brand guidelines
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="grid gap-3">
                {[
                  { icon: "megaphone" as const, title: "Media inquiries", body: "Interviews, comment requests and embargoed briefings." },
                  { icon: "mic" as const, title: "Speaker requests", body: "Invite a leader to keynote, join a panel or record a podcast." },
                  { icon: "palette" as const, title: "Brand and logo use", body: "Questions about co-marketing or using our marks." },
                ].map((c) => (
                  <li key={c.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon name={c.icon} className="mt-0.5 size-5 shrink-0 text-sun" />
                    <div>
                      <h3 className="font-semibold text-white">{c.title}</h3>
                      <p className="text-sm text-on-deep-muted">{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

    </>
  );
}
