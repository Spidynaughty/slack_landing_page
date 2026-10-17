import { Mockup } from "@/components/mockups";
import { CTABand, LinkChips, SplitFeature, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { RoiCalculator } from "./_components/roi-calculator";
import { ReviewGrid } from "@/components/sections/reviews";

export const metadata = buildMetadata({
  title: "Productivity: save time on every team",
  description: `See how teams use ${B} to cut meetings, share async updates, catch up with AI recaps and automate busywork, then estimate your own time savings.`,
  path: "/engage-users",
});

const savers: { icon: IconName; tone: Tone; title: string; body: string; metric: string; metricLabel: string }[] = [
  {
    icon: "headphones",
    tone: "mint",
    title: "Fewer meetings",
    body: "Quick huddles replace scheduled status calls. Talk for five minutes, solve it and let the notes post themselves.",
    metric: "27%",
    metricLabel: "fewer meetings",
  },
  {
    icon: "clapperboard",
    tone: "sky",
    title: "Async updates",
    body: "Record a clip or update a canvas, and let teammates catch up when it suits them, in any time zone.",
    metric: "3.5 hrs",
    metricLabel: "more focus time weekly",
  },
  {
    icon: "sparkles",
    tone: "violet",
    title: "AI recaps",
    body: "Daily recaps and thread summaries mean nobody scrolls through 200 messages to find the one decision.",
    metric: "1 hr",
    metricLabel: "saved every morning",
  },
  {
    icon: "workflow",
    tone: "sun",
    title: "Workflows",
    body: "Requests, approvals and hand-offs run on their own, so people spend time on the work instead of the paperwork.",
    metric: "18,000",
    metricLabel: "hours saved a year at Orbital Freight",
  },
];

export default function EngageUsersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Product", href: "/features" }, { label: "Productivity" }]}
        eyebrow="Productivity"
        tone="mint"
        title={
          <>
            Give every team hours back, <span className="text-gradient">every week</span>
          </>
        }
        subtitle={`Fewer meetings, faster answers and less busywork. ${B} brings conversations, updates, AI and automation together so your people can focus on the work that matters.`}
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Take the product tour", href: "/product-tour" }}
        visual={<Mockup kind="chat-team" />}
      />

      <StatsBand
        stats={[
          { value: 97, suffix: " min", label: "saved per person, per week" },
          { value: 27, suffix: "%", label: "fewer internal meetings" },
          { value: 37, suffix: "%", label: "faster decision making" },
          { value: 32, suffix: "%", label: "less internal email" },
        ]}
      />

      {/* Where the time comes from */}
      <Section>
        <SectionHeader
          eyebrow="Where the time comes from"
          tone="mint"
          title="Four habits that quietly add up"
          subtitle="Productivity gains rarely come from one big change. They come from removing small delays, dozens of times a day, for everyone."
        />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {savers.map((s) => {
            const t = toneStyles[s.tone];
            return (
              <StaggerItem key={s.title} lift className="h-full">
                <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card">
                  <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
                    <Icon name={s.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{s.title}</h3>
                  <p className="mt-2 flex-1 text-muted">{s.body}</p>
                  <p className="mt-6 border-t border-line pt-5">
                    <span className={cn("block font-display text-3xl font-extrabold", t.ink)}>{s.metric}</span>
                    <span className="text-sm text-muted">{s.metricLabel}</span>
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Split features */}
      <Section bg="soft">
        <div className="flex flex-col gap-24 md:gap-32">
          <SplitFeature
            eyebrow="Huddles"
            tone="mint"
            title="Swap the standing meeting for a five-minute huddle"
            body="Start an audio or video huddle from any channel the moment a question needs a conversation. Share your screen, draw on it together and get AI-generated notes posted back to the channel automatically."
            bullets={["One click to start, no calendar invite needed", "Live captions and searchable transcripts", "Notes and action items posted when you hang up"]}
            visual={<Mockup kind="huddle" />}
            cta={{ label: "Explore huddles", href: "/features/huddles" }}
          />
          <SplitFeature
            reverse
            eyebrow="Clips"
            tone="sky"
            title="Share updates on your schedule, not the calendar’s"
            body="Record a quick video or audio clip to walk through a design, demo a feature or give a weekly update. Teammates watch at 1.5x when it suits them, with transcripts and replies in the thread."
            bullets={["Screen, camera and audio recording built in", "Automatic transcripts and AI summaries", "Replies stay attached to the clip"]}
            visual={<Mockup kind="clips" />}
            cta={{ label: "Explore clips", href: "/features/clips" }}
          />
          <SplitFeature
            eyebrow={`${B} AI`}
            tone="violet"
            title="Catch up in minutes, not hours"
            body="Come back from a day off to a recap of what changed in every channel you care about. Ask questions in plain language and get answers grounded in your team’s conversations, files and connected apps."
            bullets={["Daily recaps of busy channels", "One-click summaries of long threads", "Answers that cite their sources"]}
            visual={<Mockup kind="ai" />}
            cta={{ label: `Explore ${B} AI`, href: "/features/ai" }}
          />
          <SplitFeature
            reverse
            eyebrow="Workflow Builder"
            tone="sun"
            title="Let the busywork run itself"
            body="Turn repetitive requests, approvals and hand-offs into automations anyone can build without code. Add AI steps that classify, summarize and route work to the right person instantly."
            bullets={["Start from 50+ ready-made templates", "Triggers from forms, schedules, apps and emoji", "AI steps that draft, sort and summarize"]}
            visual={<Mockup kind="workflow" />}
            cta={{ label: "Discover Workflow Builder", href: "/features/workflow-automation" }}
          />
        </div>
      </Section>

      {/* ROI calculator */}
      <Section labelledBy="roi-heading">
        <SectionHeader
          eyebrow="Calculator"
          tone="sun"
          id="roi-heading"
          title="Estimate the time your team could save"
          subtitle="Adjust the numbers to match your team. Everything is calculated in your browser, and nothing is stored or sent."
        />
        <Reveal className="mx-auto max-w-6xl">
          <RoiCalculator />
        </Reveal>
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
          <ArrowLink href="/pricing">See plans and pricing</ArrowLink>
          <ArrowLink href="/contact-sales">Get a tailored business case</ArrowLink>
        </Reveal>
      </Section>

      {/* Reviews (managed in the admin; hidden until one is published) */}
      <ReviewGrid bg="mint" eyebrow="In their words" tone="mint" title="Teams that got their time back" />

      {/* Related */}
      <Section>
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-display-sm font-bold text-fg">More ways to save time</h2>
          <LinkChips
            className="justify-center"
            links={[
              { label: "Canvas", href: "/features/canvas", icon: "file" },
              { label: "Lists", href: "/features/task-list", icon: "listChecks" },
              { label: "Enterprise search", href: "/features/enterprise-search", icon: "search" },
              { label: "AI agents", href: "/ai-agents", icon: "bot" },
              { label: "Template gallery", href: "/templates/gallery", icon: "template" },
              { label: "Integrations", href: "/integrations", icon: "plug" },
            ]}
          />
        </Reveal>
      </Section>

      <CTABand
        title="Start saving time this week"
        subtitle="Bring your team together for free, or talk to us about rolling out across your organization."
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Request a demo", href: "/contact-sales" }}
      />
    </>
  );
}
