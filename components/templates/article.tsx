import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { ArticleSection } from "@/data/types";
import { Breadcrumbs, type Crumb } from "@/components/sections/page-hero";
import { GradientBlobs } from "@/components/ui/blobs";
import { Eyebrow, Section } from "@/components/ui/section";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ShareButtons, TableOfContents } from "./article-client";

export type RelatedItem = { title: string; href: string; eyebrow: string; excerpt?: string; tone: Tone };

export function ArticleBody({ sections }: { sections: ArticleSection[] }) {
  return (
    <div className="prose-content">
      {sections.map((s) => (
        <section key={s.id} aria-labelledby={s.id}>
          <h2 id={s.id}>{s.heading}</h2>
          {s.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {s.bullets && (
            <ul>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {s.steps && (
            <ol>
              {s.steps.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ol>
          )}
          {s.quote && <blockquote>“{s.quote}”</blockquote>}
        </section>
      ))}
    </div>
  );
}

/** Template D: article/detail page with TOC, author, share and related items. */
export function ArticleTemplate({
  crumbs,
  eyebrow,
  tone = "violet",
  title,
  excerpt,
  author,
  date,
  readMinutes,
  sections,
  related,
  relatedTitle = "Keep reading",
  aside,
  header,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  tone?: Tone;
  title: string;
  excerpt?: string;
  author?: { name: string; role: string; initials: string };
  date?: string;
  readMinutes?: number;
  sections: ArticleSection[];
  related: RelatedItem[];
  relatedTitle?: string;
  /** Extra sidebar content (event details, company facts, etc.). */
  aside?: ReactNode;
  /** Extra content under the title (e.g. stats). */
  header?: ReactNode;
  children?: ReactNode;
}) {
  const t = toneStyles[tone];
  return (
    <>
      <header className={cn("relative overflow-hidden pt-10 pb-14 sm:pt-14 md:pb-20", t.tint)}>
        <GradientBlobs className="opacity-60" />
        <div className="container-page relative">
          <Breadcrumbs items={crumbs} />
          <div className="max-w-4xl">
            <Eyebrow tone={tone} className="animate-fade-up">
              {eyebrow}
            </Eyebrow>
            <h1 className="mt-5 animate-fade-up text-display-lg font-extrabold text-fg [animation-delay:80ms]">{title}</h1>
            {excerpt && <p className="mt-5 max-w-3xl animate-fade-up text-lead text-muted [animation-delay:160ms]">{excerpt}</p>}
            <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:240ms]">
              {author && (
                <div className="flex items-center gap-3">
                  <span className={cn("inline-flex size-11 items-center justify-center rounded-full font-bold", t.solid)}>{author.initials}</span>
                  <span>
                    <span className="block font-semibold text-fg">{author.name}</span>
                    <span className="block text-sm text-muted">{author.role}</span>
                  </span>
                </div>
              )}
              {date && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {date}
                </span>
              )}
              {readMinutes && (
                <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                  <Clock className="size-4" aria-hidden="true" />
                  {readMinutes} min read
                </span>
              )}
            </div>
            {header && <div className="mt-10 animate-fade-up [animation-delay:300ms]">{header}</div>}
          </div>
        </div>
      </header>

      <div className="container-page grid gap-12 py-14 md:py-20 lg:grid-cols-[14rem_minmax(0,1fr)_17rem] xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <TableOfContents items={sections.map((s) => ({ id: s.id, heading: s.heading }))} />
          </div>
        </aside>
        <article className="min-w-0 max-w-3xl">
          <details className="mb-8 rounded-2xl border border-line p-4 lg:hidden">
            <summary className="font-semibold text-fg">On this page</summary>
            <ol className="mt-3 flex flex-col gap-2 text-sm">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted hover:text-primary">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <ArticleBody sections={sections} />
          {children}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <ShareButtons title={title} />
            {author && (
              <p className="text-sm text-muted">
                Written by <span className="font-semibold text-fg">{author.name}</span>
              </p>
            )}
          </div>
        </article>
        <aside className="flex flex-col gap-6">
          <div className="lg:sticky lg:top-28 flex flex-col gap-6">
            {aside}
            <div className="hidden lg:block">
              <ShareButtons title={title} />
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <Section bg="soft">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-display-sm font-bold text-fg">{relatedTitle}</h2>
          </div>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.href} lift className="h-full">
                <Link
                  href={r.href}
                  className="group/rel flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
                >
                  <span className={cn("w-fit rounded-full px-2.5 py-1 text-xs font-bold", toneStyles[r.tone].soft)}>{r.eyebrow}</span>
                  <span className="mt-4 font-display text-lg leading-snug font-bold text-fg">{r.title}</span>
                  {r.excerpt && <span className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{r.excerpt}</span>}
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Read more
                    <ArrowRight className="size-4 transition-transform group-hover/rel:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}
    </>
  );
}
