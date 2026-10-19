import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatsNew } from "@/data/releases";
import { postCover, posts } from "@/data/posts";
import { Mockup } from "@/components/mockups";
import { CTABand, SplitFeature } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";

export const generateMetadata = () => buildMetadata({
  title: "What's new: latest product releases",
  description: `The newest ${B} features: agents in every channel, code channels, AI huddle notes, Lists automations, enterprise search answers and expanded data residency.`,
  path: "/whats-new",
});

export default function WhatsNewPage() {
  const [lead, second, ...rest] = whatsNew;
  const news = posts.filter((p) => p.category === "News" || p.category === "Product").slice(0, 3);
  return (
    <>
      <PageHero
        layout="center"
        eyebrow="What's new · Fall 2026"
        title={
          <>
            Agents, code channels and <span className="text-gradient">40+ updates</span>
          </>
        }
        subtitle="Everything we shipped this season to help your team move faster with AI, automate more and stay secure."
        primary={{ label: "See featured releases", href: "/innovations" }}
        secondary={{ label: "Full change log", href: "/changelog" }}
      />
      <Section className="!pt-4">
        <div className="flex flex-col gap-24 md:gap-32">
          {[lead, second].map((item, i) => (
            <SplitFeature
              key={item.title}
              reverse={i % 2 === 1}
              eyebrow={item.tag}
              tone={item.tone}
              title={item.title}
              body={item.body}
              visual={<Mockup kind={item.mockup ?? "ai"} />}
              cta={{ label: "Learn more", href: item.href }}
            />
          ))}
        </div>
      </Section>
      <Section bg="soft">
        <SectionHeader eyebrow="Also new" title="More highlights from this release" />
        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {rest.map((item) => {
            const t = toneStyles[item.tone];
            return (
              <StaggerItem key={item.title} lift className="h-full">
                <Link href={item.href} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft hover:shadow-card">
                  <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", t.solid)}>
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <span className={cn("mt-5 text-xs font-bold tracking-[0.12em] uppercase", t.ink)}>{item.tag}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-fg">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{item.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>
      <Section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeader align="left" className="!mb-0" eyebrow="From the blog" title="Behind the release" />
          <ArrowLink href="/blog">Visit the blog</ArrowLink>
        </div>
        <Stagger className="grid gap-5 md:grid-cols-3">
          {news.map((p) => (
            <StaggerItem key={p.slug} lift className="h-full">
              <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft hover:shadow-card">
                <span className="relative -mx-6 -mt-6 mb-5 block aspect-[2/1] overflow-hidden">
                  <Image src={postCover(p)} alt="" fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </span>
                <span className={cn("w-fit rounded-full px-2.5 py-1 text-xs font-bold", toneStyles[p.tone].soft)}>{p.category}</span>
                <h3 className="mt-4 font-display text-lg leading-snug font-bold text-fg">{p.title}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{p.excerpt}</p>
                <p className="mt-4 text-xs text-subtle">{formatDate(p.publishedAt)}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <CTABand title={`Try the newest ${B} features`} subtitle="Every new workspace gets 30 days of Business+ features free." />
    </>
  );
}
