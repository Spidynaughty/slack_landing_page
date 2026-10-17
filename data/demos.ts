import type { IconName } from "@/components/ui/icon";
import type { MockupKind } from "@/components/mockups";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";

export type FeatureDemo = {
  /** Feature slug this demo belongs to (matches data/features.ts). */
  slug: string;
  path: string;
  featureHref: string;
  featureName: string;
  tone: Tone;
  seo: { title: string; description: string };
  title: string;
  highlight: string;
  subtitle: string;
  chapters: { title: string; caption: string; seconds: number; mockup: MockupKind }[];
  highlights: { icon: IconName; title: string; body: string }[];
};

export const featureDemos: FeatureDemo[] = [
  {
    slug: "ai-agents",
    path: "/ai-agents/demo",
    featureHref: "/ai-agents",
    featureName: `${B} Agents`,
    tone: "mint",
    seo: {
      title: "AI agents demo: watch agents work in channels",
      description: `Watch ${B} Agents resolve a customer case end to end: reading context, acting in connected apps and asking a person for approval before anything sensitive.`,
    },
    title: "Watch an agent close a case in minutes",
    highlight: "close a case",
    subtitle: "Follow a service agent as it reads the conversation, checks order history, drafts a resolution and hands off for approval.",
    chapters: [
      { title: "A request lands in the channel", caption: "A support lead mentions the service agent on a damaged-shipment escalation.", seconds: 7, mockup: "chat-team" },
      { title: "The agent gathers context", caption: "It reads the thread, checks the customer's order history and finds the relevant policy.", seconds: 8, mockup: "agent" },
      { title: "It updates the CRM record", caption: "The agent logs the case on the account so sales sees it before the renewal call.", seconds: 7, mockup: "crm" },
      { title: "A person approves the plan", caption: "Sensitive steps like refunds wait for a human approval, and every action is logged.", seconds: 7, mockup: "platform" },
    ],
    highlights: [
      { icon: "bot", title: "Works where your team works", body: "Agents join channels and DMs like teammates, with the same permissions as the person asking." },
      { icon: "shieldCheck", title: "Guardrails built in", body: "Approval steps, audit logs and admin policies keep every agent action accountable." },
      { icon: "plug", title: "Acts in your apps", body: "Agents update records, file tickets and draft replies across your connected tools." },
    ],
  },
  {
    slug: "slackbot",
    path: "/features/slackbot/demo",
    featureHref: "/features/slackbot",
    featureName: `${B} Bot`,
    tone: "violet",
    seo: {
      title: "AI teammate demo: a day with your assistant",
      description: `See ${B} Bot prep a meeting brief, summarize unread channels, draft replies and find answers across your workspace in this short interactive demo.`,
    },
    title: "A day with your AI teammate",
    highlight: "AI teammate",
    subtitle: `From morning recap to end-of-day follow-ups, see how ${B} Bot keeps you on top of everything without another tab.`,
    chapters: [
      { title: "Morning brief", caption: "Ask for a brief before your first meeting and get the context that matters in seconds.", seconds: 7, mockup: "bot" },
      { title: "Catch up on channels", caption: "Recaps summarize busy channels and pull out the action items that need you.", seconds: 7, mockup: "ai" },
      { title: "Find anything", caption: "Ask a question in plain English and get a cited answer from messages, files and apps.", seconds: 7, mockup: "search" },
      { title: "Draft and follow up", caption: "Draft a canvas or reply from the conversation, then share it with one click.", seconds: 7, mockup: "canvas" },
    ],
    highlights: [
      { icon: "sparkles", title: "Knows your work", body: "Answers draw on the conversations and files you already have access to." },
      { icon: "clock", title: "Saves hours every week", body: "Recaps, briefs and drafts take the busywork out of staying informed." },
      { icon: "lock", title: "Private by design", body: "Your data is never used to train models, and answers respect every permission." },
    ],
  },
  {
    slug: "enterprise-search",
    path: "/features/enterprise-search/demo",
    featureHref: "/features/enterprise-search",
    featureName: "Enterprise search",
    tone: "sky",
    seo: {
      title: "Enterprise search demo: one search for everything",
      description: `Watch ${B} enterprise search find answers across messages, canvases, files and connected apps, with permission-aware results and AI answers you can verify.`,
    },
    title: "One search bar for everything your company knows",
    highlight: "One search bar",
    subtitle: "See a security lead find audit evidence across chat, docs and connected apps in under a minute.",
    chapters: [
      { title: "Ask in plain language", caption: "Type a question the way you'd ask a colleague, no special syntax required.", seconds: 7, mockup: "search" },
      { title: "Get a cited answer", caption: "AI answers summarize what matters and link to every source so you can check them.", seconds: 7, mockup: "ai" },
      { title: "Open the right document", caption: "Jump straight into the canvas or file, with the conversation that produced it.", seconds: 7, mockup: "files" },
      { title: "Find the expert", caption: "Search people and profiles to find who owns the work and reach out instantly.", seconds: 7, mockup: "atlas" },
    ],
    highlights: [
      { icon: "search", title: "40+ connected sources", body: "Search messages, canvases, files and your most important apps at once." },
      { icon: "shieldCheck", title: "Permission-aware", body: "Results only include what each person is already allowed to see." },
      { icon: "quote", title: "Answers with citations", body: "Every AI answer links back to its sources, so trust is easy to earn." },
    ],
  },
  {
    slug: "ai",
    path: "/features/ai/demo",
    featureHref: "/features/ai",
    featureName: `${B} AI`,
    tone: "pink",
    seo: {
      title: "AI features demo: recaps, summaries and answers",
      description: `See ${B} AI in action: channel recaps, thread summaries, huddle notes and search answers that help teams catch up and decide faster, all in one short demo.`,
    },
    title: "AI that helps you catch up and move faster",
    highlight: "catch up",
    subtitle: "A quick tour of recaps, thread summaries, huddle notes and AI answers, built into the places you already work.",
    chapters: [
      { title: "Recaps of busy channels", caption: "Start the day with a digest of what changed across the channels you follow.", seconds: 7, mockup: "ai" },
      { title: "Summaries in one click", caption: "Summarize long threads and huddles so nobody has to scroll for context.", seconds: 7, mockup: "huddle" },
      { title: "Answers from your knowledge", caption: "Ask questions and get grounded answers with links to the original messages.", seconds: 7, mockup: "search" },
      { title: "Automate with AI steps", caption: "Add AI steps to workflows that classify, summarize and route requests.", seconds: 7, mockup: "workflow" },
    ],
    highlights: [
      { icon: "sparkles", title: "Built in, not bolted on", body: "AI lives in channels, huddles, canvases and search, so there's nothing new to learn." },
      { icon: "lock", title: "Enterprise-grade privacy", body: "Customer data stays in your workspace and is never used to train models." },
      { icon: "gauge", title: "Measurable time savings", body: "Teams report saving hours each week on catching up and searching." },
    ],
  },
];

export function getDemo(slug: string) {
  return featureDemos.find((d) => d.slug === slug);
}
