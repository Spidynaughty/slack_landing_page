"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/ui/use-reduced-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { AppFrame, Avatar, BotAvatar, ChannelHeader, Composer, Message, people, Reaction, Sidebar, type PersonKey } from "./parts";

type Line = {
  who?: PersonKey;
  bot?: boolean;
  botName?: string;
  time: string;
  body: ReactNode;
  reactions?: { emoji: string; count: number; active?: boolean }[];
};

type Script = { channel: string; label: string; lines: Line[]; sidebar: { label: string; active?: boolean; unread?: boolean; privateCh?: boolean }[] };

const mention = (name: string) => (
  <span className="rounded bg-sky/15 px-0.5 font-semibold text-sky-ink">@{name}</span>
);

const scripts: Record<string, Script> = {
  launch: {
    channel: "launch-fall",
    label: "Animated chat: a team coordinating a product launch in a channel, with an AI recap",
    sidebar: [
      { label: "announcements" },
      { label: "launch-fall", active: true },
      { label: "design-crit", unread: true },
      { label: "eng-platform" },
      { label: "exec-staff", privateCh: true },
    ],
    lines: [
      {
        who: "priya",
        time: "10:02",
        body: <>Launch checklist is in the canvas. Everything is green except the pricing page copy.</>,
      },
      {
        who: "marcus",
        time: "10:04",
        body: <>On it. Draft lands by 3pm. {mention("Sofia")} can you give it a final review?</>,
      },
      {
        who: "sofia",
        time: "10:05",
        body: <>Yes! I also pulled three customer quotes from #research-voice for the hero.</>,
        reactions: [
          { emoji: "🎉", count: 4, active: true },
          { emoji: "🙌", count: 2 },
        ],
      },
      {
        bot: true,
        time: "10:06",
        body: (
          <span className="mt-1 block rounded-xl border border-primary/20 bg-primary-soft/60 p-2.5">
            <span className="mb-1 flex items-center gap-1 text-[0.7rem] font-bold text-primary">
              <Sparkles className="size-3" aria-hidden="true" /> Channel recap
            </span>
            Launch date confirmed for Oct 28. Pricing copy owned by Marcus, due 3pm. Quotes ready for review.
          </span>
        ),
      },
    ],
  },
  channels: {
    channel: "proj-atlas-redesign",
    label: "Animated chat: a project channel where design, engineering and marketing share updates",
    sidebar: [
      { label: "general" },
      { label: "proj-atlas-redesign", active: true },
      { label: "help-it", unread: true },
      { label: "team-design" },
      { label: "wins" },
    ],
    lines: [
      { who: "hana", time: "9:41", body: <>New nav prototype is up. Feedback thread below 👇</> },
      {
        who: "jonah",
        time: "9:44",
        body: <>Engineering estimate: 6 days. Flagging one risk on the search API, details in the canvas.</>,
      },
      {
        who: "amara",
        time: "9:46",
        body: <>Marketing can ship the announcement the same week. Booking the launch slot now.</>,
        reactions: [{ emoji: "✅", count: 5, active: true }],
      },
      {
        who: "priya",
        time: "9:47",
        body: <>Love it. Everything for this project lives here, so new folks can scroll up and catch up.</>,
      },
    ],
  },
  team: {
    channel: "team-support",
    label: "Animated chat: a support team swarming on an escalation with threads and huddles",
    sidebar: [
      { label: "team-support", active: true },
      { label: "escalations", unread: true },
      { label: "kudos" },
      { label: "random" },
    ],
    lines: [
      { who: "diego", time: "2:10", body: <>Heads up: Brightline Retail reports checkout errors since the 2pm deploy.</> },
      { who: "jonah", time: "2:11", body: <>Rolling back now. Starting a huddle for anyone on call 🎧</> },
      {
        who: "sofia",
        time: "2:18",
        body: <>Rollback complete, error rate back to baseline. I&apos;ll update the customer.</>,
        reactions: [
          { emoji: "🚀", count: 6, active: true },
          { emoji: "❤️", count: 3 },
        ],
      },
      {
        bot: true,
        botName: "Incident Bot",
        time: "2:19",
        body: <>Incident INC-2041 resolved in 9 min. Postmortem canvas created and shared with #escalations.</>,
      },
    ],
  },
  connect: {
    channel: "northwind-brightline",
    label: "Animated chat: two companies collaborating in a shared channel",
    sidebar: [
      { label: "northwind-brightline", active: true },
      { label: "northwind-agency-co" },
      { label: "partners-emea", unread: true },
    ],
    lines: [
      { who: "leo", time: "11:20", body: <>Contract redlines are attached. Only section 4 changed.</> },
      { who: "amara", time: "11:26", body: <>Our legal team approved. Sending for signature from our side now.</> },
      {
        who: "leo",
        time: "11:31",
        body: <>Signed ✍️ Kickoff huddle Monday? I&apos;ll bring our delivery leads.</>,
        reactions: [{ emoji: "🤝", count: 7, active: true }],
      },
      { who: "amara", time: "11:32", body: <>Perfect. Faster than a week of email threads.</> },
    ],
  },
};

export type ChatScript = keyof typeof scripts;

function TypingDots({ who }: { who?: PersonKey }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2">
      {who ? <Avatar who={who} /> : <BotAvatar />}
      <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-subtle"
            animate={{ y: [0, -3, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </span>
      <span className="text-[0.65rem] text-subtle">{who ? people[who].name.split(" ")[0] : "Bot"} is typing…</span>
    </div>
  );
}

export function ChatMockup({ script = "launch", className }: { script?: ChatScript; className?: string }) {
  const s = scripts[script];
  const reduce = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  // shown = number of fully visible messages; typing = whether the next one is "typing"
  const [shown, setShown] = useState(1);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (reduce || !inView) return;
    let t: ReturnType<typeof setTimeout>;
    if (shown >= s.lines.length) {
      t = setTimeout(() => {
        setShown(1);
        setTyping(false);
      }, 3000);
    } else if (!typing) {
      t = setTimeout(() => setTyping(true), 400);
    } else {
      t = setTimeout(() => {
        setTyping(false);
        setShown((n) => n + 1);
      }, 700);
    }
    return () => clearTimeout(t);
  }, [shown, typing, inView, reduce, s.lines.length]);

  const visible = reduce ? s.lines.length : shown;
  const next = s.lines[visible];

  return (
    <div ref={ref} className={className}>
      <AppFrame label={s.label} sidebar={<Sidebar channels={s.sidebar} />}>
        <ChannelHeader name={s.channel} />
        <div className="flex h-[19rem] flex-col justify-end overflow-hidden py-2 sm:h-[20rem]">
          <AnimatePresence initial={false}>
            {s.lines.slice(0, visible).map((line, i) => (
              <motion.div
                key={`${script}-${i}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <Message who={line.who} bot={line.bot} botName={line.botName} time={line.time}>
                  {line.body}
                  {line.reactions && (
                    <span className="mt-1.5 flex gap-1">
                      {line.reactions.map((r) => (
                        <Reaction key={r.emoji} {...r} />
                      ))}
                    </span>
                  )}
                </Message>
              </motion.div>
            ))}
            {typing && next && (
              <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <TypingDots who={next.who} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Composer placeholder={`Message #${s.channel}`} />
      </AppFrame>
    </div>
  );
}
