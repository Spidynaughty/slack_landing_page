import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { postCategories, posts } from "@/data/posts";
import { LinkChips } from "@/components/sections/common";
import { ListingPage } from "@/components/templates/listing-page";
import { Highlight } from "@/components/ui/highlight";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { blogTopics, categoryHref, getBlogTopic } from "@/lib/blog-topics";
import { postItems } from "@/lib/listing-items";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return blogTopics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/topic/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  const t = getBlogTopic(topic);
  if (!t) return { title: "Topic not found" };
  return buildMetadata({ title: t.seo.title, description: t.seo.description, path: `/blog/topic/${t.slug}` });
}

export default function BlogTopicPage({ params }: PageProps<"/blog/topic/[topic]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <BlogTopicContent params={params} />
    </Suspense>
  );
}

async function BlogTopicContent({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const t = getBlogTopic(topic);
  if (!t) notFound();
  return (
    <ListingPage
      crumbs={navCrumbs("/blog", { section: "resources", label: "Blog" }, [{ label: t.category }])}
      eyebrow={`${t.category} · ${B} blog`}
      tone={t.tone}
      title={<Highlight text={t.title} highlight={t.highlight} />}
      subtitle={t.subtitle}
      items={postItems(posts.filter((p) => p.category === t.category))}
      cardStyle="post"
      label={`${t.category} articles`}
      searchPlaceholder={`Search ${t.category} articles`}
      before={
        <div className="container-page">
          <LinkChips
            className="justify-center"
            links={postCategories.filter((c) => c !== t.category).map((c) => ({ label: c, href: categoryHref[c] }))}
          />
        </div>
      }
      cta={{ title: "Put these ideas to work", subtitle: `Browse every article, or start free and try ${B} with your team.`, primary: { label: "Get started", href: "/get-started" }, secondary: { label: "Visit the blog", href: "/blog" } }}
    />
  );
}
