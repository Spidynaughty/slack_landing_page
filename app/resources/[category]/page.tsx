import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { collections, getCategory, guides, resourceCategories, type Guide } from "@/data/guides";
import { CTABand, LinkChips } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Icon, type IconName } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";

/** Per-category SEO and hero copy. Keys are ResourceCategory slugs. */
const hubCopy: Record<string, { seoTitle: string; seoDescription: string; before: string; highlight: string; guidesTitle: string }> = {
  "why-use-slack": {
    seoTitle: `Why ${B}: research, reports and guides`,
    seoDescription: `Explore research reports, explainers and guides on why teams choose ${B} to escape inbox overload, speed up decisions and prepare for the AI era of work.`,
    before: "Why teams choose",
    highlight: B,
    guidesTitle: "Guides on making the switch",
  },
  "using-slack": {
    seoTitle: `Using ${B}: playbooks for everyday work`,
    seoDescription: `Practical playbooks for replacing meetings, running product launches and keeping async standups useful, so your team gets more out of ${B} every single day.`,
    before: `Get more out of ${B},`,
    highlight: "every day",
    guidesTitle: "Playbooks for everyday work",
  },
  "slack-101": {
    seoTitle: `${B} 101: learn the basics`,
    seoDescription: `New to ${B}? Learn the fundamentals of channels, threads, mentions and notifications with beginner-friendly guides and a checklist for your very first week.`,
    before: `${B} 101:`,
    highlight: "learn the basics",
    guidesTitle: "Start with the fundamentals",
  },
  "slack-for-admins": {
    seoTitle: `${B} for admins: rollout and governance`,
    seoDescription: `Guides for IT and workspace admins on structuring workspaces, automating provisioning, setting retention policies and driving adoption at enterprise scale.`,
    before: "Run a workspace",
    highlight: "that scales",
    guidesTitle: "Guides for admins and IT",
  },
};

const typeIcon: Record<Guide["type"], IconName> = {
  Guide: "book",
  Article: "news",
  Checklist: "listChecks",
  "E-book": "library",
};

const featuredReports: { title: string; excerpt: string; href: string; eyebrow: string; icon: IconName; tone: Tone }[] = [
  {
    title: "Work in the AI era: what 18,000 desk workers told us",
    excerpt: "Our biggest study yet on AI adoption, trust, focus time and the future of collaboration, with a playbook for leaders.",
    href: "/resources/why-use-slack/ai-era-of-work",
    eyebrow: "Research report",
    icon: "chart",
    tone: "violet",
  },
  {
    title: `What is ${B} and how does it work?`,
    excerpt: "A plain-language tour of workspaces, channels, huddles, canvases, lists, apps, AI and agents, and how they fit together.",
    href: "/resources/why-use-slack/what-is-slack-and-how-does-it-work",
    eyebrow: "Explainer",
    icon: "compass",
    tone: "mint",
  },
  {
    title: "Winning in the AI era of work: rethinking email",
    excerpt: "New research on inbox overload, conversational work and why AI summaries are replacing the weekly status email.",
    href: "/resources/why-use-slack/rethinking-email-ai-conversations-work",
    eyebrow: "Report",
    icon: "mail",
    tone: "sun",
  },
];

export function generateStaticParams() {
  return resourceCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[category]">): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  const copy = hubCopy[category];
  if (!cat || !copy) return { title: "Resources not found" };
  return buildMetadata({ title: copy.seoTitle, description: copy.seoDescription, path: `/resources/${cat.slug}` });
}

export default function ResourceCategoryPage({ params }: PageProps<"/resources/[category]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <ResourceCategoryContent params={params} />
    </Suspense>
  );
}

function GuideCard({ guide }: { guide: Guide }) {
  const t = toneStyles[guide.tone];
  return (
    <Link
      href={`/resources/${guide.category}/${guide.slug}`}
      className="group/card flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft transition-shadow duration-300 hover:shadow-card"
    >
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", t.soft)}>
            <Icon name={typeIcon[guide.type]} className="size-5" />
          </span>
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", t.soft)}>{guide.type}</span>
        </div>
        <h3 className="mt-1 font-display text-lg leading-snug font-bold text-fg">{guide.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{guide.excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-line pt-4 text-xs text-subtle">
          <span className="inline-flex items-center gap-2 font-semibold text-fg">
            <span className={cn("inline-flex size-6 items-center justify-center rounded-full text-[0.6rem] font-bold", t.solid)}>{guide.author.initials}</span>
            {guide.author.name}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {guide.readMinutes} min read
          </span>
          <ArrowRight className="ml-auto size-4 text-primary transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
        </div>
      </div>
    </Link>
  );
}

async function ResourceCategoryContent({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  const copy = hubCopy[category];
  if (!cat || !copy) notFound();

  const list = guides.filter((g) => g.category === cat.slug).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  const latest = list[0]?.updatedAt;
  const others = resourceCategories.filter((c) => c.slug !== cat.slug);

  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: cat.name }]}
        layout="center"
        tone={cat.tone}
        eyebrow={cat.name}
        title={
          <>
            {copy.before} <span className="text-gradient">{copy.highlight}</span>
          </>
        }
        subtitle={cat.description}
        note={latest ? `${list.length} guides · Last updated ${formatDate(latest, "long")}` : undefined}
        className="!pb-12"
      />

      {cat.slug === "why-use-slack" && (
        <Section className="!pt-6" labelledBy="featured-reports">
          <SectionHeader id="featured-reports" eyebrow="Featured" title="Research and explainers" tone={cat.tone} />
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {featuredReports.map((r, i) => {
              const t = toneStyles[r.tone];
              return (
                <StaggerItem key={r.href} lift className="h-full">
                  <Link
                    href={r.href}
                    className={cn(
                      "group/feat relative flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] p-7 transition-shadow hover:shadow-card md:p-8",
                      i === 0 ? "bg-deep text-on-deep" : t.tint,
                    )}
                  >
                    {i === 0 && <div aria-hidden="true" className="absolute -top-16 -right-12 size-56 rounded-full bg-pink/40 blur-3xl" />}
                    <span className={cn("relative inline-flex size-12 items-center justify-center rounded-2xl", i === 0 ? "bg-white/10 text-white" : t.solid)}>
                      <Icon name={r.icon} className="size-6" />
                    </span>
                    <p className={cn("relative mt-6 text-xs font-bold tracking-[0.14em] uppercase", i === 0 ? "text-sun" : t.ink)}>{r.eyebrow}</p>
                    <h3 className={cn("relative mt-2 font-display text-xl leading-snug font-bold", i === 0 ? "text-white" : "text-fg")}>{r.title}</h3>
                    <p className={cn("relative mt-3 flex-1", i === 0 ? "text-on-deep-muted" : "text-muted")}>{r.excerpt}</p>
                    <span className={cn("relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold", i === 0 ? "text-white" : "text-primary")}>
                      Read now
                      <ArrowRight className="size-4 transition-transform group-hover/feat:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Section>
      )}

      <Section className={cat.slug === "why-use-slack" ? undefined : "!pt-6"} bg={cat.slug === "why-use-slack" ? "soft" : "default"} labelledBy="category-guides">
        <SectionHeader id="category-guides" eyebrow="Guides" title={copy.guidesTitle} tone={cat.tone} />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <StaggerItem key={g.slug} className="h-full">
              <GuideCard guide={g} />
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section bg={cat.slug === "why-use-slack" ? "default" : "soft"} labelledBy="collections">
        <SectionHeader id="collections" eyebrow="Collections" title="Curated reading lists" subtitle="Hand-picked guides, stories and tours for the teams you work with." />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {collections.map((c) => {
            const t = toneStyles[c.tone];
            return (
              <StaggerItem key={c.slug} lift className="h-full">
                <Link
                  href={`/resources/collections/${c.slug}`}
                  className="group/col flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
                >
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
                    <Icon name={c.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{c.title}</h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    {c.items.length} resources
                    <ArrowRight className="size-4 transition-transform group-hover/col:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section className={cat.slug === "why-use-slack" ? "!pt-0" : undefined} labelledBy="other-topics">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 id="other-topics" className="text-display-sm font-bold text-fg">
            Explore other topics
          </h2>
          <LinkChips
            className="justify-center"
            links={[
              ...others.map((c) => ({ label: c.name, href: `/resources/${c.slug}`, icon: c.icon })),
              { label: "All resources", href: "/resources", icon: "library" as const },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title={`Put ${B} to work for your team`}
        subtitle="Start free in minutes, or take a guided tour of channels, huddles, canvases and AI."
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Take the tour", href: "/product-tour" }}
      />
    </>
  );
}
