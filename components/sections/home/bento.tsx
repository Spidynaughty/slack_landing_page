import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, FileText, Hash, Sparkles, Zap } from "lucide-react";
import { Avatar, Reaction } from "@/components/mockups/parts";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

function Tile({
  title,
  body,
  href,
  cta,
  className,
  visual,
  dark,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
  className?: string;
  visual: ReactNode;
  dark?: boolean;
}) {
  return (
    <StaggerItem lift className={cn("h-full", className)}>
      <Link
        href={href}
        className={cn(
          "glow-card group/tile relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-soft transition-shadow hover:shadow-card sm:p-7",
          dark ? "grain border-white/10 bg-deep text-on-deep" : "border-line bg-surface",
        )}
      >
        <div className="relative mb-6 flex-1">{visual}</div>
        <div className="relative flex items-end justify-between gap-4">
          <div>
            <h3 className={cn("font-display text-xl font-bold tracking-tight", dark ? "text-white" : "text-fg")}>{title}</h3>
            <p className={cn("mt-1.5 max-w-md text-[0.95rem]", dark ? "text-on-deep-muted" : "text-muted")}>{body}</p>
          </div>
          <span
            aria-hidden="true"
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-all group-hover/tile:rotate-45",
              dark ? "bg-white text-deep" : "bg-surface-2 text-fg group-hover/tile:bg-button-gradient group-hover/tile:text-white dark:group-hover/tile:text-deep",
            )}
          >
            <ArrowUpRight className="size-4" />
          </span>
          <span className="sr-only">{cta}</span>
        </div>
      </Link>
    </StaggerItem>
  );
}

/** Asymmetric bento grid of the core product surfaces, each with a tiny live visual. */
export function ProductBento() {
  return (
    <Stagger className="grid auto-rows-[minmax(15rem,auto)] gap-4 md:grid-cols-6 md:gap-5">
      <Tile
        className="md:col-span-4 md:row-span-2"
        title="Channels that keep everyone in sync"
        body="One space per project, team or topic, with threads, files and decisions anyone can catch up on."
        href="/features/channels"
        cta="Explore channels"
        visual={
          <div className="flex h-full flex-col gap-3 rounded-2xl bg-bg-soft p-4 sm:p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-fg">
              <Hash className="size-4 text-primary" aria-hidden="true" /> launch-fall
              <span className="ml-auto rounded-full bg-mint/15 px-2 py-0.5 text-[0.65rem] font-bold text-mint-ink">12 online</span>
            </div>
            {[
              { who: "priya" as const, text: "Checklist is green except pricing copy." },
              { who: "marcus" as const, text: "Draft lands by 3pm, Sofia can you review?" },
              { who: "sofia" as const, text: "Yes! Pulled three customer quotes for the hero.", react: true },
            ].map((m) => (
              <div key={m.text} className="flex gap-3 rounded-xl bg-surface p-3 shadow-soft">
                <Avatar who={m.who} size="sm" />
                <div className="min-w-0 text-sm">
                  <p className="text-muted">{m.text}</p>
                  {m.react && (
                    <span className="mt-1.5 flex gap-1">
                      <Reaction emoji="🎉" count={6} active />
                      <Reaction emoji="🙌" count={3} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="mt-auto flex items-center gap-2 rounded-xl border border-dashed border-line-strong px-3 py-2.5 text-sm text-subtle">
              <Sparkles className="size-4 text-pink" aria-hidden="true" /> Summarize this channel…
            </div>
          </div>
        }
      />
      <Tile
        className="md:col-span-2"
        dark
        title="Huddles"
        body="Talk it out with audio, video, captions and AI notes."
        href="/features/huddles"
        cta="Explore huddles"
        visual={
          <div className="flex h-24 items-end justify-center gap-1.5" aria-hidden="true">
            {Array.from({ length: 18 }, (_, i) => (
              <span
                key={i}
                className="w-1.5 origin-bottom animate-wave rounded-full bg-gradient-to-t from-primary via-pink to-coral"
                style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 6) * 0.12}s` }}
              />
            ))}
          </div>
        }
      />
      <Tile
        className="md:col-span-2"
        title="AI that catches you up"
        body="Recaps, summaries and cited answers across your work."
        href="/features/ai"
        cta="Explore AI"
        visual={
          <div className="rounded-2xl border border-primary/20 bg-primary-soft/60 p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" /> While you were away
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-fg">
              <li>• Launch locked for Oct 28</li>
              <li>• 2 comments need your review</li>
              <li>• Search latency down 38%</li>
            </ul>
          </div>
        }
      />
      <Tile
        className="md:col-span-2"
        title="Lists"
        body="Track projects and requests right beside the conversation."
        href="/features/task-list"
        cta="Explore lists"
        visual={
          <ul className="space-y-2 text-sm">
            {[
              ["Hero refresh", true],
              ["Pricing FAQ", true],
              ["Partner kit", false],
            ].map(([t, done]) => (
              <li key={t as string} className="flex items-center gap-2.5 rounded-xl bg-bg-soft px-3 py-2">
                <span className={cn("inline-flex size-5 items-center justify-center rounded-md", done ? "bg-mint text-white dark:text-deep" : "border border-line-strong")}>
                  {done && <Check className="size-3" aria-hidden="true" />}
                </span>
                <span className={done ? "text-subtle line-through" : "font-medium text-fg"}>{t}</span>
              </li>
            ))}
          </ul>
        }
      />
      <Tile
        className="md:col-span-2"
        title="Canvas"
        body="Docs that live right next to the work, with live cursors."
        href="/features/canvas"
        cta="Explore canvas"
        visual={
          <div className="relative rounded-2xl bg-bg-soft p-4">
            <p className="flex items-center gap-1.5 text-xs font-bold text-subtle uppercase">
              <FileText className="size-3.5" aria-hidden="true" /> Launch brief
            </p>
            <div className="mt-3 space-y-2" aria-hidden="true">
              <span className="block h-2.5 w-4/5 rounded-full bg-fg/80" />
              <span className="block h-2 w-full rounded-full bg-line-strong" />
              <span className="block h-2 w-11/12 rounded-full bg-line-strong" />
              <span className="block h-2 w-2/3 rounded-full bg-sun/60" />
            </div>
            <span className="absolute right-6 bottom-3 animate-float rounded-md bg-pink px-1.5 py-0.5 text-[0.6rem] font-bold text-white">Amara</span>
          </div>
        }
      />
      <Tile
        className="md:col-span-2"
        title="Workflows & agents"
        body="Automate requests, approvals and hand-offs without code."
        href="/features/workflow-automation"
        cta="Explore Workflow Builder"
        visual={
          <div className="flex items-center justify-between gap-2" aria-hidden="true">
            {["Form", "Agent", "Channel"].map((s, i) => (
              <div key={s} className="flex flex-1 items-center gap-2">
                <span className={cn("flex-1 rounded-xl px-2 py-3 text-center text-xs font-bold", ["bg-sun/20 text-sun-ink", "bg-primary-soft text-primary", "bg-mint/15 text-mint-ink"][i])}>
                  {i === 1 ? <Zap className="mx-auto mb-1 size-4" /> : null}
                  {s}
                </span>
                {i < 2 && <span className="h-px w-3 bg-line-strong" />}
              </div>
            ))}
          </div>
        }
      />
    </Stagger>
  );
}
