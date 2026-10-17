import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";

export type ResourceType = "Guide" | "Report" | "Webinar" | "E-book" | "Video" | "Checklist";
export type ResourceTopic = "AI" | "Productivity" | "Security" | "Leadership" | "IT" | "Sales";

export type Resource = {
  slug: string;
  title: string;
  type: ResourceType;
  topic: ResourceTopic;
  excerpt: string;
  tone: Tone;
  minutes: number;
  /** Must be an existing internal route of this site. */
  href: string;
  featured?: boolean;
};

export const resources: Resource[] = [
  {
    slug: "ai-era-of-work-field-guide",
    title: "The AI era of work: a field guide for leaders",
    type: "Guide",
    topic: "Leadership",
    excerpt: "How to redesign teams, rituals and roles when AI agents join the org chart, with frameworks from 40 executive interviews.",
    tone: "violet",
    minutes: 14,
    href: "/resources/why-use-slack/ai-era-of-work",
    featured: true,
  },
  {
    slug: "state-of-work-2026",
    title: "State of Work 2026: the AI teammate report",
    type: "Report",
    topic: "AI",
    excerpt: "We surveyed 12,000 knowledge workers in nine countries about how they use AI at work, what they trust and what still gets in the way.",
    tone: "sun",
    minutes: 18,
    href: "/features/ai",
    featured: true,
  },
  {
    slug: "product-tour-day-in-a-channel",
    title: `A day in the life of a ${B} channel`,
    type: "Video",
    topic: "Productivity",
    excerpt: "Follow a launch team from morning recap to end-of-day handoff and see how channels, huddles, canvases and agents fit together.",
    tone: "mint",
    minutes: 6,
    href: "/product-tour",
    featured: true,
  },
  {
    slug: "build-your-first-agent-webinar",
    title: "Build your first agent in 30 minutes",
    type: "Webinar",
    topic: "AI",
    excerpt: "Watch our product team build a working IT helpdesk agent live, from knowledge sources and permissions to testing it in a channel.",
    tone: "coral",
    minutes: 45,
    href: "/events",
  },
  {
    slug: "enterprise-security-compliance-ebook",
    title: "Security and compliance at enterprise scale",
    type: "E-book",
    topic: "Security",
    excerpt: `A practical look at encryption, data residency, retention and eDiscovery in ${B}, written for security and compliance teams.`,
    tone: "sky",
    minutes: 22,
    href: "/trust/security",
  },
  {
    slug: "workspace-rollout-checklist",
    title: "Workspace rollout checklist for IT teams",
    type: "Checklist",
    topic: "IT",
    excerpt: "Forty steps to plan, pilot and launch a company-wide rollout, from SSO and provisioning to champion programs and training.",
    tone: "pink",
    minutes: 5,
    href: "/enterprise",
  },
  {
    slug: "vantage-bank-deal-rooms",
    title: "Inside Vantage Bank's deal rooms",
    type: "Video",
    topic: "Sales",
    excerpt: "See how a commercial banking team brought relationship managers, credit and legal into one channel per deal and closed loans faster.",
    tone: "violet",
    minutes: 8,
    href: "/customer-stories/vantage-bank",
  },
  {
    slug: "workflows-to-try",
    title: "25 workflows to automate your team's busywork",
    type: "Guide",
    topic: "Productivity",
    excerpt: "Ready-to-build automations for requests, approvals, stand-ups and handoffs, each with the trigger, steps and time saved.",
    tone: "mint",
    minutes: 11,
    href: "/features/workflow-automation",
  },
  {
    slug: "where-decisions-get-made",
    title: "Where decisions actually get made: channels vs. email",
    type: "Report",
    topic: "Leadership",
    excerpt: "An analysis of 2.3 million anonymized work decisions shows how long they take, who gets left out and what changes when teams move to channels.",
    tone: "sun",
    minutes: 12,
    href: "/compare/slack-vs-email",
  },
  {
    slug: "securing-ai-agents-checklist",
    title: "Securing AI agents: a checklist for admins",
    type: "Checklist",
    topic: "Security",
    excerpt: "Permissions, data access, audit logging and approval policies to review before you turn on agents across your organization.",
    tone: "coral",
    minutes: 4,
    href: "/trust",
  },
  {
    slug: "selling-with-ai-teammates-webinar",
    title: "Selling with AI teammates",
    type: "Webinar",
    topic: "Sales",
    excerpt: "Sales leaders from three fast-growing companies share how agents prep account briefs, summarize calls and keep deals moving.",
    tone: "sky",
    minutes: 50,
    href: "/demo",
  },
  {
    slug: "it-leaders-guide-tool-consolidation",
    title: "The IT leader's guide to tool consolidation",
    type: "E-book",
    topic: "IT",
    excerpt: "How to cut redundant apps, reduce licensing spend and simplify security reviews by making one platform the hub for work.",
    tone: "pink",
    minutes: 16,
    href: "/scale",
  },
];

export const resourceTypes: ResourceType[] = ["Guide", "Report", "Webinar", "E-book", "Video", "Checklist"];
export const resourceTopics: ResourceTopic[] = ["AI", "Productivity", "Security", "Leadership", "IT", "Sales"];
