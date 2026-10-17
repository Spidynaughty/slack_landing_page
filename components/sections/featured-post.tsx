import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/data/posts";
import { Reveal } from "@/components/ui/motion";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";

/** Large card used to feature the lead story on blog listings. */
export function FeaturedPost({ post }: { post: Post }) {
  const t = toneStyles[post.tone];
  return (
    <Reveal>
      <Link
        href={`/blog/${post.slug}`}
        className="group grid overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface shadow-card transition-shadow hover:shadow-float md:grid-cols-[1.1fr_1fr]"
      >
        <div className={cn("relative min-h-56 overflow-hidden p-8", t.tint)}>
          <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-40" />
          <div aria-hidden="true" className={cn("absolute -right-16 -bottom-16 size-72 rounded-full opacity-50 blur-3xl", t.solid)} />
          <div aria-hidden="true" className={cn("absolute top-10 left-10 size-24 rounded-3xl opacity-80 rotate-12", t.solid)} />
          <div aria-hidden="true" className="absolute top-24 left-28 size-16 rounded-full bg-surface/80 shadow-float" />
          <span className="relative rounded-full bg-surface px-3 py-1 text-xs font-bold text-fg shadow-soft">Featured</span>
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
          <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-bold", t.soft)}>{post.category}</span>
          <h2 className="font-display text-display-sm font-bold text-fg">{post.title}</h2>
          <p className="text-muted">{post.excerpt}</p>
          <p className="text-sm text-subtle">
            {post.author.name} · {formatDate(post.publishedAt)} · {post.readMinutes} min read
          </p>
          <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
            Read article
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
