import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { postCover, type Post } from "@/data/posts";
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
        <div className="relative aspect-[16/9] overflow-hidden p-6 md:aspect-auto md:min-h-80 md:p-8">
          <Image
            src={postCover(post)}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="relative rounded-full bg-[#fff] px-3 py-1 text-xs font-bold text-[#0b1a2e] shadow-soft">Featured</span>
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
