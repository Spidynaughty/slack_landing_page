import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import { customerLogos, type CustomerLogo } from "./customers";

import type { ArticleSection, Stat } from "./types";

export type { ArticleSection, Stat };

export type Story = {
  slug: string;
  company: string;
  industry: string;
  size: string;
  region: string;
  logo: CustomerLogo;
  tone: Tone;
  headline: string;
  summary: string;
  publishedAt: string;
  stats: Stat[];
  sections: ArticleSection[];
  products: { label: string; href: string }[];
};

/** A review as the review cards display it (see lib/content.ts for where reviews come from). */
export type Testimonial = { quote: string; name: string; role: string; company: string; tone: Tone; rating?: number };

const logo = (name: string) => customerLogos.find((l) => l.name === name) ?? customerLogos[0];

export const stories: Story[] = [
  {
    slug: "brightline-retail",
    company: "Brightline",
    industry: "Retail",
    size: "12,000 employees",
    region: "North America",
    logo: logo("Brightline"),
    tone: "coral",
    headline: "Brightline cut customer response times by 47% by swarming on cases in channels",
    summary:
      "The fast-growing retailer replaced a maze of email queues with case channels, AI recaps and a service agent that drafts replies in seconds.",
    publishedAt: "2026-09-18",
    stats: [
      { value: 47, suffix: "%", label: "faster first response" },
      { value: 3.2, decimals: 1, suffix: "x", label: "more cases resolved per agent" },
      { value: 92, suffix: "%", label: "CSAT, up from 81%" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "The challenge",
        paragraphs: [
          "Brightline grew from 60 to 240 stores in four years. Its support team grew with it, but its tools did not. Escalations bounced between an email inbox, a ticketing tool and side conversations on personal phones.",
          "When a shipment problem touched logistics, store operations and finance at the same time, it could take a full day just to get the right people looking at the same information.",
        ],
        bullets: [
          "Average first response time of 9 hours on escalated cases",
          "No shared view of a case across support, logistics and stores",
          "New agents took six weeks to become fully productive",
        ],
      },
      {
        id: "solution",
        heading: `Why Brightline chose ${B}`,
        paragraphs: [
          `Brightline created a channel for every escalated case, automatically opened by a Workflow Builder automation when a ticket is tagged “urgent”. The right experts are added based on the product category, and the full ticket history is posted as a canvas.`,
          `A service agent reads the case, pulls order history from the commerce platform and drafts a resolution for a human to approve. ${B} AI recaps let managers catch up on dozens of cases in minutes.`,
        ],
        bullets: [
          "Case channels opened automatically from the ticketing system",
          "Service agent drafts refunds, replacements and replies",
          "Huddles for live swarming when a case is complex",
        ],
      },
      {
        id: "results",
        heading: "The results",
        paragraphs: [
          "Within one quarter, first response time on escalated cases dropped by 47%. Agents now resolve more than three times as many cases as before, and customer satisfaction climbed from 81% to 92%.",
          "Onboarding is faster too: new agents search past case channels to see how experienced colleagues handled similar problems, cutting ramp time from six weeks to two.",
        ],
      },
    ],
    products: [
      { label: "Channels", href: "/features/channels" },
      { label: `${B} Agents`, href: "/ai-agents" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
    ],
  },
  {
    slug: "kestrel-labs",
    company: "Kestrel Labs",
    industry: "Technology",
    size: "2,400 employees",
    region: "Europe",
    logo: logo("Kestrel Labs"),
    tone: "violet",
    headline: "Kestrel Labs ships releases twice as fast with code channels and AI reviews",
    summary:
      "The developer-tools company moved code review, deploys and incident response into one place and halved its release cycle.",
    publishedAt: "2026-08-27",
    stats: [
      { value: 2, suffix: "x", label: "faster release cadence" },
      { value: 64, suffix: "%", label: "fewer context switches" },
      { value: 11, suffix: " min", label: "median incident time to engage" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "The challenge",
        paragraphs: [
          "Kestrel's engineers worked across eleven tools to get a change from pull request to production. Review requests got lost in notification noise, and incident responders spent the first twenty minutes of every outage just assembling the right people.",
        ],
        bullets: ["Review queues averaging 2.5 days", "Deploy status scattered across dashboards", "Slow, manual incident assembly"],
      },
      {
        id: "solution",
        heading: `Building on ${B} Code`,
        paragraphs: [
          `Each service now has a code channel where pull requests, CI results and deploys post automatically. ${B} Code summarizes every PR, flags risky changes and suggests reviewers based on who knows the code.`,
          "When an alert fires, the incident integration opens a channel, pages the on-call engineer and starts a huddle, with runbooks attached as canvases.",
        ],
      },
      {
        id: "results",
        heading: "The results",
        paragraphs: [
          "Release cadence went from every two weeks to weekly. Review turnaround dropped to under a day, and engineers report 64% fewer context switches in an average week.",
        ],
      },
    ],
    products: [
      { label: `${B} Code`, href: "/features/code-channels" },
      { label: "Huddles", href: "/features/huddles" },
      { label: "Apps & integrations", href: "/integrations" },
    ],
  },
  {
    slug: "halcyon-health",
    company: "Halcyon Health",
    industry: "Health and life sciences",
    size: "38,000 employees",
    region: "North America",
    logo: logo("Halcyon Health"),
    tone: "mint",
    headline: "Halcyon Health coordinates 12 hospitals in real time without compromising compliance",
    summary:
      "A regional health system connected clinical operations, IT and supply chain teams on a secure, compliant platform.",
    publishedAt: "2026-07-30",
    stats: [
      { value: 12, label: "hospitals connected" },
      { value: 35, suffix: "%", label: "faster bed-capacity decisions" },
      { value: 100, suffix: "%", label: "audit-ready retention" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "The challenge",
        paragraphs: [
          "Capacity planning across Halcyon's hospitals relied on twice-daily phone bridges. Information was stale the moment the call ended, and compliance teams worried about clinical staff using consumer messaging apps.",
        ],
      },
      {
        id: "solution",
        heading: "A secure command center",
        paragraphs: [
          "Halcyon built a set of operations channels for capacity, staffing and supply chain, governed by data loss prevention rules, retention policies and Enterprise Key Management.",
          "Lists track bed availability by unit in real time, and workflows alert regional leaders when a site crosses a capacity threshold.",
        ],
        bullets: ["Enterprise Key Management for encryption control", "Retention and legal hold policies", "SSO and device management"],
      },
      {
        id: "results",
        heading: "The results",
        paragraphs: [
          "Leaders now make bed-capacity decisions 35% faster, and the phone bridges have been retired. Every conversation is retained according to policy and ready for audit.",
        ],
      },
    ],
    products: [
      { label: "Lists", href: "/features/task-list" },
      { label: "Enterprise Key Management", href: "/enterprise-key-management" },
      { label: "Trust & security", href: "/trust" },
    ],
  },
  {
    slug: "vantage-bank",
    company: "Vantage Bank",
    industry: "Financial services",
    size: "41,000 employees",
    region: "Global",
    logo: logo("Vantage Bank"),
    tone: "sky",
    headline: "Vantage Bank brought 41,000 employees onto one secure platform in 90 days",
    summary:
      "The global bank replaced four messaging tools with a single governed workspace and connected partners through shared channels.",
    publishedAt: "2026-06-12",
    stats: [
      { value: 41000, label: "employees migrated" },
      { value: 4, label: "legacy tools retired" },
      { value: 6.4, decimals: 1, prefix: "$", suffix: "M", label: "annual savings" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "The challenge",
        paragraphs: [
          "Mergers had left Vantage with four separate chat tools, inconsistent retention and no secure way to work with external partners such as auditors and law firms.",
        ],
      },
      {
        id: "solution",
        heading: "One governed workspace",
        paragraphs: [
          `Vantage rolled out ${B} Enterprise with data residency in three regions, information barriers between research and trading, and ${B} Connect for working with 600 external partner organizations.`,
        ],
        bullets: ["Information barriers", "Data residency in the US, EU and Japan", "Shared channels with auditors and counsel"],
      },
      {
        id: "results",
        heading: "The results",
        paragraphs: [
          "The migration finished in 90 days, retiring four tools and saving an estimated $6.4M a year. Partner collaboration that once took days of email now happens in shared channels within hours.",
        ],
      },
    ],
    products: [
      { label: `${B} Connect`, href: "/connect" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Security", href: "/trust/security" },
    ],
  },
  {
    slug: "orbital-freight",
    company: "Orbital Freight",
    industry: "Manufacturing, auto and energy",
    size: "9,500 employees",
    region: "Asia-Pacific",
    logo: logo("Orbital Freight"),
    tone: "sun",
    headline: "Orbital Freight automated 300 workflows and saved 18,000 hours a year",
    summary:
      "The logistics operator put frontline teams, dispatch and customers on one platform and automated the busywork in between.",
    publishedAt: "2026-05-21",
    stats: [
      { value: 300, suffix: "+", label: "workflows automated" },
      { value: 18000, label: "hours saved per year" },
      { value: 22, suffix: "%", label: "fewer delayed shipments" },
    ],
    sections: [
      {
        id: "challenge",
        heading: "The challenge",
        paragraphs: [
          "Dispatchers juggled radios, spreadsheets and phone calls to reroute trucks. Frontline drivers had no easy way to report delays, and customers learned about problems last.",
        ],
      },
      {
        id: "solution",
        heading: "Frontline-first automation",
        paragraphs: [
          "Drivers report delays from their phones with a two-tap workflow. Dispatch channels get structured alerts, lists track exceptions, and customers in shared channels receive automatic updates.",
        ],
      },
      {
        id: "results",
        heading: "The results",
        paragraphs: [
          "More than 300 workflows now run across the business, saving an estimated 18,000 hours each year. Delayed shipments fell by 22% because problems are spotted and solved earlier.",
        ],
      },
    ],
    products: [
      { label: "Workflow Builder", href: "/features/workflow-automation" },
      { label: "Lists", href: "/features/task-list" },
      { label: `${B} Connect`, href: "/connect" },
    ],
  },
];

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug);
}
