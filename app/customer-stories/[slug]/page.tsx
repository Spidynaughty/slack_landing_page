import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStory, stories } from "@/data/stories";
import { ArticleTemplate } from "@/components/templates/article";
import { CustomerLogo } from "@/components/ui/customer-logo";
import { CountUp } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/customer-stories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) return { title: "Story not found" };
  return buildMetadata({
    title: `${story.company} customer story`,
    description: story.summary,
    path: `/customer-stories/${slug}`,
    type: "article",
    publishedTime: story.publishedAt,
  });
}

export default function StoryPage({ params }: PageProps<"/customer-stories/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <StoryContent params={params} />
    </Suspense>
  );
}

async function StoryContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory(slug);
  if (!story) notFound();
  const t = toneStyles[story.tone];

  return (
    <ArticleTemplate
      crumbs={navCrumbs("/customer-stories", { section: "resources", label: "Customer stories" }, [{ label: story.company }])}
      eyebrow={story.industry}
      tone={story.tone}
      title={story.headline}
      excerpt={story.summary}
      date={formatDate(story.publishedAt, "long")}
      sections={story.sections}
      relatedTitle="More customer stories"
      related={stories
        .filter((s) => s.slug !== story.slug)
        .slice(0, 3)
        .map((s) => ({ title: s.headline, href: `/customer-stories/${s.slug}`, eyebrow: s.industry, tone: s.tone }))}
      header={
        <dl className="grid gap-4 sm:grid-cols-3">
          {story.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-surface/80 p-5 shadow-soft backdrop-blur">
              <dt className="sr-only">{s.label}</dt>
              <dd className={cn("font-display text-display-sm font-extrabold", t.ink)}>
                <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
              </dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      }
      aside={
        <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
          <CustomerLogo logo={story.logo} className={cn("text-xl", t.ink)} />
          <dl className="mt-5 grid gap-3 text-sm">
            {[
              ["Industry", story.industry],
              ["Company size", story.size],
              ["Region", story.region],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">{k}</dt>
                <dd className="font-semibold text-fg">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-xs font-bold tracking-[0.12em] text-subtle uppercase">Products used</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {story.products.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", t.soft)}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <figure className={cn("mt-10 rounded-3xl p-8", t.tint)}>
        <blockquote className="font-display text-display-sm leading-snug font-semibold text-fg">“{story.quote.text}”</blockquote>
        <figcaption className="mt-4 text-sm">
          <span className="font-semibold text-fg">{story.quote.name}</span>
          <span className="text-muted"> · {story.quote.role}</span>
        </figcaption>
      </figure>
    </ArticleTemplate>
  );
}
