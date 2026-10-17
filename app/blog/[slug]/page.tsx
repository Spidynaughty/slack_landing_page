import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/data/posts";
import { ArticleTemplate } from "@/components/templates/article";
import { ButtonLink } from "@/components/ui/button";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    authors: [post.author.name],
  });
}

export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <BlogPostContent params={params} />
    </Suspense>
  );
}

async function BlogPostContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3)
    .map((p) => ({ title: p.title, href: `/blog/${p.slug}`, eyebrow: p.category, excerpt: p.excerpt, tone: p.tone }));

  const listing = post.category === "Engineering" ? "/engineering-blog" : post.category === "Design" ? "/design-blog" : post.category === "News" ? "/blog/news" : "/blog";
  const listingLabel = post.category === "Engineering" ? "Engineering blog" : post.category === "Design" ? "Design blog" : post.category === "News" ? "News" : "Blog";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author.name },
    publisher: { "@type": "Organization", name: B },
  };

  return (
    <>
      <ArticleTemplate
        crumbs={[
          { label: "Blog", href: "/blog" },
          ...(listing !== "/blog" ? [{ label: listingLabel, href: listing }] : []),
          { label: post.title },
        ]}
        eyebrow={post.category}
        tone={post.tone}
        title={post.title}
        excerpt={post.excerpt}
        author={post.author}
        date={formatDate(post.publishedAt, "long")}
        readMinutes={post.readMinutes}
        sections={post.sections}
        related={related}
        aside={
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
            <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Tags</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <li key={t} className="rounded-full bg-surface-2 px-3 py-1 text-xs font-semibold text-fg">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-display text-lg font-bold text-fg">Try it with your team</p>
            <p className="mt-1 text-sm text-muted">Start free and bring your next project into {B}.</p>
            <ButtonLink href="/get-started" size="sm" className="mt-4" arrow>
              Get started
            </ButtonLink>
          </div>
        }
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
