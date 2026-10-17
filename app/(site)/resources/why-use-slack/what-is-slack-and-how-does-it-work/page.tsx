import { Mockup, type MockupKind } from "@/components/mockups";
import { CTABand, FAQ, IconCardGrid, LinkChips, SplitFeature, type IconCard } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import type { Faq } from "@/data/types";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, toneAt, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

const path = "/resources/why-use-slack/what-is-slack-and-how-does-it-work";

export const metadata = buildMetadata({
  title: `What is ${B} and how does it work?`,
  description: `A plain-language guide to ${B}: how workspaces, channels, huddles, canvases, lists, apps, AI and agents fit together, plus a glossary and answers to FAQs.`,
  path,
  type: "article",
  publishedTime: "2026-09-24",
});

const basics: IconCard[] = [
  {
    icon: "building2",
    title: "Workspaces",
    body: `Your organization's home in ${B}. A workspace holds your channels, members and apps, and larger companies can connect several workspaces under one organization.`,
  },
  {
    icon: "hash",
    title: "Channels",
    body: "Organized spaces for every project, team or topic. Anyone can join a public channel and read its full history, so nobody starts from zero.",
    href: "/features/channels",
    cta: "Explore channels",
  },
  {
    icon: "message",
    title: "Direct messages",
    body: "One-to-one or small group conversations for quick questions that don't need a whole channel. You can start a huddle from any DM.",
    href: "/features/team-chat",
    cta: "Explore messaging",
  },
  {
    icon: "headphones",
    title: "Huddles",
    body: "Lightweight audio and video calls you can start from any conversation, with screen sharing, live captions and AI notes.",
    href: "/features/huddles",
    cta: "Explore huddles",
  },
  {
    icon: "pen",
    title: "Canvases",
    body: "Documents that live inside channels. Use them for briefs, meeting notes, onboarding guides and anything your team needs to reference.",
    href: "/features/canvas",
    cta: "Explore canvases",
  },
  {
    icon: "listTodo",
    title: "Lists",
    body: "Track projects, requests and to-dos in flexible tables and boards, right next to the conversation about them.",
    href: "/features/task-list",
    cta: "Explore lists",
  },
  {
    icon: "plug",
    title: "Apps and integrations",
    body: "Connect the tools you already use so notifications, approvals and updates flow straight into your channels.",
    href: "/integrations",
    cta: "Browse integrations",
  },
  {
    icon: "sparkles",
    title: "AI",
    body: "Recaps of busy channels, summaries of long threads, answers drawn from your company's knowledge and help drafting messages.",
    href: "/features/ai",
    cta: `Explore ${B} AI`,
  },
  {
    icon: "bot",
    title: "Agents",
    body: "AI teammates that take action. Agents answer questions, update records and run multistep tasks, with people approving key steps.",
    href: "/ai-agents",
    cta: "Meet agents",
  },
];

const day: { time: string; title: string; body: string; bullets: string[]; mockup: MockupKind; tone: Tone; cta: { label: string; href: string } }[] = [
  {
    time: "9:00 AM · Channels",
    title: "Catch up in your project channels",
    body: "Instead of an inbox full of reply-all threads, the team's updates are organized by project. Unread channels appear in bold, threads keep side conversations tidy and everything stays searchable for later.",
    bullets: ["Group channels into sidebar sections", "Reply in threads to keep the channel focused", "React with an emoji to acknowledge without adding noise"],
    mockup: "chat-channels",
    tone: "violet",
    cta: { label: "Explore channels", href: "/features/channels" },
  },
  {
    time: "11:00 AM · Huddles",
    title: "Talk it through in a huddle",
    body: "When a thread starts going in circles, one click starts a huddle with whoever is in the channel. Share your screen, draw on it together and let AI take notes so the outcome posts back to the conversation.",
    bullets: ["Join and leave without a calendar invite", "Live captions and AI-generated notes", "Screen sharing with multiple cursors"],
    mockup: "huddle",
    tone: "mint",
    cta: { label: "Explore huddles", href: "/features/huddles" },
  },
  {
    time: "1:30 PM · Canvases",
    title: "Write it down in a canvas",
    body: "Decisions from the huddle go straight into the project canvas, alongside the brief, owners and key links. Because the canvas lives in the channel, anyone who joins later finds it immediately.",
    bullets: ["Templates for briefs, notes and runbooks", "Embed lists, files and workflows", "Comment on any section in a thread"],
    mockup: "canvas",
    tone: "sun",
    cta: { label: "Explore canvases", href: "/features/canvas" },
  },
  {
    time: "3:00 PM · Automation",
    title: "Let workflows handle the routine",
    body: "A request form collects the details for a design review, routes it to the right approver and posts the result back to the channel. No chasing, no forgotten requests and no status meeting to check on it.",
    bullets: ["Build workflows without writing code", "Connect steps across your other apps", "Trigger from forms, schedules or emoji"],
    mockup: "workflow",
    tone: "coral",
    cta: { label: "Explore automation", href: "/features/workflow-automation" },
  },
  {
    time: "5:30 PM · AI",
    title: "Hand off with an AI recap",
    body: "Before signing off, the team lead asks AI for a recap of the day's channels. Colleagues in other time zones start their morning with a summary of decisions, open questions and their own action items.",
    bullets: ["Daily recaps of the channels you choose", "Summaries that cite their sources", "Answers that respect your permissions"],
    mockup: "ai",
    tone: "pink",
    cta: { label: `Explore ${B} AI`, href: "/features/ai" },
  },
];

const glossary: { term: string; definition: string }[] = [
  { term: "Workspace", definition: `The shared home for a team or company in ${B}, containing its channels, members and apps.` },
  { term: "Organization", definition: "A group of connected workspaces managed together, common at larger companies." },
  { term: "Channel", definition: "A named space for conversations about a project, team or topic. Public channels are open to anyone in the workspace." },
  { term: "Shared channel", definition: "A channel that connects two or more organizations, so partners can collaborate while each keeps control of its own data." },
  { term: "Thread", definition: "A side conversation attached to a specific message, which keeps the main channel easy to read." },
  { term: "Mention", definition: "Tagging a person or user group with @ to notify them that a message needs their attention." },
  { term: "Direct message", definition: "A private conversation between two people or a small group, outside of a channel." },
  { term: "Huddle", definition: "A quick audio or video call started from any channel or direct message." },
  { term: "Canvas", definition: "A document that lives inside a channel or DM, used for briefs, notes, plans and reference material." },
  { term: "List", definition: "A flexible table or board for tracking tasks, requests and projects next to the related conversation." },
  { term: "Workflow", definition: "An automated sequence of steps, such as a form, an approval and a message, built without writing code." },
  { term: "Recap", definition: "An AI-generated summary of the conversations in one or more channels over a period of time." },
  { term: "Agent", definition: "An AI teammate that can answer questions and take actions on your behalf, within the permissions you set." },
  { term: "Guest", definition: "Someone from outside your organization who can access only the specific channels they are invited to." },
  { term: "Status", definition: "A short note and emoji on your profile that tells colleagues what you are doing or when you are available." },
];

const faqs: Faq[] = [
  {
    q: `Is ${B} just a chat app?`,
    a: `No. Messaging is the foundation, but ${B} also includes huddles for calls, canvases for documents, lists for tracking work, workflows for routine tasks and AI agents that can take action. Together they replace many of the tools teams juggle every day.`,
  },
  {
    q: "How is a channel different from a group email?",
    a: "A channel is persistent and open to anyone who joins it. New members can read the full history, conversations are organized by topic and threads keep replies attached to the original message. A group email only reaches the people who were on the list when it was sent.",
  },
  {
    q: "Can I work with people outside my company?",
    a: "Yes. Shared channels connect your organization with partners, agencies or customers, while each company keeps control of its own members and data. You can also invite guests to specific channels for shorter engagements.",
  },
  {
    q: "Do I need to install anything?",
    a: `${B} runs in any modern web browser, and there are desktop apps for every major operating system plus mobile apps for phones and tablets, so you can pick up where you left off on any device.`,
  },
  {
    q: `How does AI in ${B} use my data?`,
    a: "AI features only draw on information you already have permission to see, and answers cite their sources so you can check them. Customer data is not used to train third-party models, and admins decide which AI features are available.",
  },
  {
    q: `How much does ${B} cost?`,
    a: "There is a free plan for small teams getting started. Paid plans add unlimited message history, more AI features, advanced automation and enterprise-grade security and admin controls.",
  },
];

export default function WhatIsPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: `Why ${B}`, href: "/resources/why-use-slack" },
          { label: `What is ${B}?` },
        ]}
        eyebrow={`${B} explained`}
        title={
          <>
            What is {B} and <span className="text-gradient">how does it work?</span>
          </>
        }
        subtitle={`${B} is a work platform that brings your team's conversations, files, apps and AI agents together in one place. Here is how the pieces fit, in plain language.`}
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Take the product tour", href: "/product-tour" }}
        visual={<Mockup kind="chat" />}
      />

      <Section bg="soft" id="the-basics" labelledBy="the-basics-title" className="scroll-mt-20">
        <SectionHeader
          id="the-basics-title"
          eyebrow="The basics"
          title={`The building blocks of ${B}`}
          subtitle="Nine concepts cover almost everything you will do day to day, from your first message to your first agent."
        />
        <IconCardGrid items={basics} columns={3} />
      </Section>

      <Section id="a-typical-day" labelledBy="a-typical-day-title" className="scroll-mt-20">
        <SectionHeader
          id="a-typical-day-title"
          eyebrow="How it works"
          title={`A typical day in ${B}`}
          subtitle="Follow a product team from the first message of the morning to the last handoff of the day."
        />
        <div className="flex flex-col gap-24 md:gap-32">
          {day.map((d, i) => (
            <SplitFeature
              key={d.title}
              eyebrow={d.time}
              title={d.title}
              body={<p>{d.body}</p>}
              bullets={d.bullets}
              visual={<Mockup kind={d.mockup} />}
              reverse={i % 2 === 1}
              tone={d.tone}
              cta={d.cta}
            />
          ))}
        </div>
      </Section>

      <Section bg="soft" id="glossary" labelledBy="glossary-title" className="scroll-mt-20">
        <SectionHeader
          id="glossary-title"
          eyebrow="Glossary"
          title={`${B} terms, explained`}
          subtitle="A quick reference for the words you will hear most often in your first few weeks."
        />
        <Stagger className="mx-auto max-w-6xl">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {glossary.map((g, i) => (
              <StaggerItem key={g.term} className="flex h-full flex-col rounded-2xl border border-line bg-surface p-5 shadow-soft">
                <dt className="flex items-center gap-2.5 font-display text-lg font-bold text-fg">
                  <span aria-hidden="true" className={cn("size-2.5 shrink-0 rounded-full", toneStyles[toneAt(i)].solid)} />
                  {g.term}
                </dt>
                <dd className="mt-2 text-sm text-muted">{g.definition}</dd>
              </StaggerItem>
            ))}
          </dl>
        </Stagger>
      </Section>

      <FAQ items={faqs} title={`Questions about ${B}`} subtitle="Short answers to the questions new teams ask us most." />

      <Section bg="soft" className="!py-16 md:!py-20" labelledBy="keep-learning">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 id="keep-learning" className="text-display-sm font-bold text-fg">
            Keep learning
          </h2>
          <LinkChips
            className="justify-center"
            links={[
              { label: "Collaborate effectively in channels", href: "/resources/slack-101/collaborate-effectively-in-channels", icon: "hash" },
              { label: `Your first week in ${B}`, href: "/resources/slack-101/your-first-week-checklist", icon: "listChecks" },
              { label: "Ten ways to replace meetings", href: "/resources/using-slack/ten-ways-to-replace-ineffective-meetings", icon: "calendar" },
              { label: "Productivity platform toolkit", href: "/resources/collections/productivity-platform", icon: "zap" },
              { label: "Rethinking email report", href: "/resources/why-use-slack/rethinking-email-ai-conversations-work", icon: "mail" },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title={`Ready to see ${B} for yourself?`}
        subtitle="Start free in minutes, or watch a five-minute demo of a real team at work."
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Watch the demo", href: "/demo" }}
      />
    </>
  );
}
