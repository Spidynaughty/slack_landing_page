import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { MapPin } from "lucide-react";
import { authors, getAuthor } from "@/data/authors";
import { posts } from "@/data/posts";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { Listing } from "@/components/templates/listing";
import { GradientBlobs } from "@/components/ui/blobs";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section } from "@/components/ui/section";
import { postItems } from "@/lib/listing-items";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export function generateStaticParams() {
  return authors.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/authors/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return { title: "Author not found" };
  return buildMetadata({
    title: `${a.name}, ${a.role}`.slice(0, 60),
    description: `Read articles by ${a.name}, ${a.role} at ${B}, on ${a.focus.join(", ").toLowerCase()}. ${a.bio[0]}`.slice(0, 160),
    path: `/blog/authors/${a.slug}`,
  });
}

export default function AuthorPage({ params }: PageProps<"/blog/authors/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <AuthorContent params={params} />
    </Suspense>
  );
}

async function AuthorContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) notFound();
  const t = toneStyles[a.tone];
  const theirPosts = posts.filter((p) => p.author.name === a.name);
  const others = authors.filter((x) => x.slug !== a.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: a.role,
    worksFor: { "@type": "Organization", name: B },
  };

  return (
    <>
      <section className={cn("under-header relative overflow-hidden pb-14 md:pb-16", t.tint)}>
        <GradientBlobs className="opacity-50" />
        <div className="container-page relative">
          <Breadcrumbs items={navCrumbs("/blog", { section: "resources", label: "Blog" }, [{ label: "Authors" }, { label: a.name }])} />
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <span className={cn("inline-flex size-28 shrink-0 animate-fade-up items-center justify-center rounded-[2rem] font-display text-4xl font-extrabold shadow-float", t.solid)}>
              {a.initials}
            </span>
            <div className="max-w-3xl">
              <h1 className="animate-fade-up text-display-lg font-extrabold text-fg [animation-delay:80ms]">{a.name}</h1>
              <p className="mt-2 animate-fade-up text-lead font-semibold text-fg [animation-delay:120ms]">{a.role}</p>
              <p className="mt-2 inline-flex animate-fade-up items-center gap-1.5 text-muted [animation-delay:160ms]">
                <MapPin className="size-4" aria-hidden="true" /> {a.location}
              </p>
              <ul className="mt-4 flex animate-fade-up flex-wrap gap-2 [animation-delay:200ms]">
                {a.focus.map((f) => (
                  <li key={f} className="rounded-full bg-surface px-3 py-1 text-sm font-semibold text-fg shadow-soft">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 grid max-w-3xl animate-fade-up gap-4 text-muted [animation-delay:240ms]">
            {a.bio.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <h2 className="mb-8 font-display text-display-sm font-bold text-fg">
          Articles by {a.name.split(" ")[0]} <span className="text-subtle">({theirPosts.length})</span>
        </h2>
        <Listing items={postItems(theirPosts)} cardStyle="post" label="articles" searchPlaceholder={`Search articles by ${a.name.split(" ")[0]}`} />
      </Section>

      <Section bg="soft" className="!py-14">
        <h2 className="mb-6 text-center font-display text-xl font-bold text-fg">More authors</h2>
        <ul className="flex flex-wrap justify-center gap-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/blog/authors/${o.slug}`} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1.5 pr-4 pl-1.5 text-sm font-semibold text-fg shadow-soft transition-colors hover:border-primary/40 hover:text-primary">
                <span className={cn("inline-flex size-7 items-center justify-center rounded-full text-[0.65rem] font-bold", toneStyles[o.tone].solid)}>{o.initials}</span>
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
