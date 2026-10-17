"use client";

import { Check, Link2, Mail, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Table of contents with scroll-spy highlighting of the section in view. */
export function TableOfContents({ items }: { items: { id: string; heading: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-xs font-bold tracking-[0.14em] text-subtle uppercase">On this page</p>
      <ol className="flex flex-col border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                active === i.id ? "border-primary font-semibold text-primary" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {i.heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Copy link, native share sheet and email share. No third-party trackers. */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const btn =
    "inline-flex size-10 items-center justify-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-primary/40 hover:text-primary";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 text-xs font-bold tracking-[0.14em] text-subtle uppercase">Share</span>
      <button
        type="button"
        className={btn}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            /* clipboard blocked */
          }
        }}
      >
        {copied ? <Check className="size-4 text-mint-ink" aria-hidden="true" /> : <Link2 className="size-4" aria-hidden="true" />}
      </button>
      <button
        type="button"
        className={btn}
        aria-label="Share via email"
        onClick={() => {
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`;
        }}
      >
        <Mail className="size-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className={btn}
        aria-label="More sharing options"
        onClick={async () => {
          if (navigator.share) {
            try {
              await navigator.share({ title, url: window.location.href });
            } catch {
              /* dismissed */
            }
          } else {
            await navigator.clipboard?.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          }
        }}
      >
        <Share2 className="size-4" aria-hidden="true" />
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
