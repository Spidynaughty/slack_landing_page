import type { IconName } from "@/components/ui/icon";
import type { MockupKind } from "@/components/mockups";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";

/** Highlights for /whats-new */
export type WhatsNewItem = {
  title: string;
  body: string;
  icon: IconName;
  tone: Tone;
  href: string;
  tag: "AI" | "Collaboration" | "Automation" | "Security" | "Platform";
  mockup?: MockupKind;
};

export const whatsNew: WhatsNewItem[] = [
  {
    title: "Agents in every channel",
    body: "Invite agents to channels like teammates. They answer questions, take action in apps and ask for approval before anything sensitive.",
    icon: "bot",
    tone: "violet",
    href: "/ai-agents",
    tag: "AI",
    mockup: "agent",
  },
  {
    title: `${B} Code channels`,
    body: "Pull requests, CI and deploys stream into code channels, with AI reviews that flag risky changes before they ship.",
    icon: "code",
    tone: "mint",
    href: "/features/code-channels",
    tag: "Platform",
    mockup: "code",
  },
  {
    title: "AI huddle notes",
    body: "Every huddle now ends with a summary, decisions and action items posted to the channel automatically.",
    icon: "headphones",
    tone: "sun",
    href: "/features/huddles",
    tag: "AI",
  },
  {
    title: "Lists automations",
    body: "Trigger workflows when a list item changes status, gets assigned or hits its due date.",
    icon: "listChecks",
    tone: "coral",
    href: "/features/task-list",
    tag: "Automation",
  },
  {
    title: "Enterprise search answers",
    body: "Ask a question once and get a cited answer drawn from messages, canvases and 40+ connected apps.",
    icon: "search",
    tone: "sky",
    href: "/features/enterprise-search",
    tag: "AI",
  },
  {
    title: "Data residency in Japan and Canada",
    body: "Enterprise customers can now store data at rest in nine regions, including Tokyo and Montréal.",
    icon: "globe",
    tone: "pink",
    href: "/trust/security",
    tag: "Security",
  },
];

/** Featured releases for /innovations */
export type Innovation = {
  season: string;
  date: string;
  title: string;
  summary: string;
  tone: Tone;
  mockup: MockupKind;
  highlights: { title: string; body: string; href: string }[];
};

export const innovations: Innovation[] = [
  {
    season: "Fall 2026",
    date: "2026-10-14",
    title: "The agentic work release",
    summary: "Agents go GA, code channels launch and AI notes arrive in every huddle.",
    tone: "violet",
    mockup: "platform",
    highlights: [
      { title: "Agents for every paid plan", body: "12 pre-built agents plus a no-code agent builder.", href: "/ai-agents" },
      { title: `${B} Code`, body: "Engineering channels with AI review and deploy tracking.", href: "/features/code-channels" },
      { title: "Agentic platform", body: "Govern agents from any vendor with guardrails and audit logs.", href: "/features/agentic-platform" },
    ],
  },
  {
    season: "Summer 2026",
    date: "2026-06-24",
    title: "Search that answers",
    summary: "Enterprise search learned to answer questions across your apps, with citations.",
    tone: "sky",
    mockup: "search",
    highlights: [
      { title: "AI answers in search", body: "Cited answers across messages, files and apps.", href: "/features/enterprise-search" },
      { title: `${B} Atlas`, body: "Rich profiles and org charts to find the right expert.", href: "/features/atlas" },
      { title: "Native CRM", body: "Accounts, contacts and deals built right in.", href: "/crm" },
    ],
  },
  {
    season: "Spring 2026",
    date: "2026-03-18",
    title: "Lists, canvases and the connected workspace",
    summary: "Lists got board views and automations, canvases got templates, and Connect expanded to 250 orgs.",
    tone: "mint",
    mockup: "lists",
    highlights: [
      { title: "Lists board view", body: "Drag and drop work across stages.", href: "/features/task-list" },
      { title: "Canvas templates", body: "Start briefs, runbooks and plans in a click.", href: "/features/canvas" },
      { title: `${B} Connect at scale`, body: "Shared channels with up to 250 organizations.", href: "/connect" },
    ],
  },
];

/** Entries for /changelog */
export type ChangeType = "New" | "Improved" | "Fixed" | "Security";

export type ChangelogEntry = {
  version: string;
  date: string;
  platform: "All platforms" | "Desktop" | "iOS" | "Android" | "Web" | "Admin";
  changes: { type: ChangeType; text: string }[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: "26.10.2",
    date: "2026-10-14",
    platform: "All platforms",
    changes: [
      { type: "New", text: "Agents can now be invited to any channel from the member list." },
      { type: "New", text: "Code channels show CI status and deploy history in the channel header." },
      { type: "Improved", text: "Huddle notes now include decisions and owners for each action item." },
      { type: "Fixed", text: "Thread replies no longer jump when new reactions arrive." },
    ],
  },
  {
    version: "26.10.0",
    date: "2026-10-01",
    platform: "Desktop",
    changes: [
      { type: "Improved", text: "Search results load up to 40% faster on large workspaces." },
      { type: "Improved", text: "Sidebar sections can be collapsed with a keyboard shortcut (Ctrl + Shift + S)." },
      { type: "Fixed", text: "Screen sharing on ultrawide monitors now respects the selected window." },
    ],
  },
  {
    version: "26.9.4",
    date: "2026-09-22",
    platform: "iOS",
    changes: [
      { type: "New", text: "Record clips with live captions directly from the composer." },
      { type: "Improved", text: "VoiceOver now announces unread counts for each sidebar section." },
      { type: "Fixed", text: "Notifications no longer arrive twice after switching workspaces." },
    ],
  },
  {
    version: "26.9.2",
    date: "2026-09-10",
    platform: "Admin",
    changes: [
      { type: "Security", text: "Session duration policies can now be set per user group." },
      { type: "New", text: "Audit log events for agent actions are available via the Audit Logs API." },
      { type: "Improved", text: "Data residency migration progress is visible in the admin dashboard." },
    ],
  },
  {
    version: "26.8.6",
    date: "2026-08-27",
    platform: "Android",
    changes: [
      { type: "New", text: "Huddles support picture-in-picture while you browse other channels." },
      { type: "Fixed", text: "Large images in canvases no longer crop on tablets." },
    ],
  },
  {
    version: "26.8.1",
    date: "2026-08-06",
    platform: "Web",
    changes: [
      { type: "Improved", text: "Lists tables support frozen columns and keyboard navigation." },
      { type: "Fixed", text: "Pasting tables from spreadsheets keeps column alignment." },
      { type: "Security", text: "Updated content security policy for embedded app previews." },
    ],
  },
];

/** Service status for /status */
export type ServiceStatus = { name: string; uptime: number; incidentsDays: number[]; degradedDays: number[] };

export const services: ServiceStatus[] = [
  { name: "Messaging", uptime: 99.99, incidentsDays: [], degradedDays: [61] },
  { name: "Huddles & calls", uptime: 99.97, incidentsDays: [], degradedDays: [12, 47] },
  { name: "Files & canvases", uptime: 99.99, incidentsDays: [], degradedDays: [] },
  { name: "Search & AI", uptime: 99.95, incidentsDays: [33], degradedDays: [34, 78] },
  { name: "Workflows & agents", uptime: 99.98, incidentsDays: [], degradedDays: [20] },
  { name: "Apps & integrations", uptime: 99.98, incidentsDays: [], degradedDays: [55] },
  { name: "Login & SSO", uptime: 100, incidentsDays: [], degradedDays: [] },
  { name: "Notifications", uptime: 99.99, incidentsDays: [], degradedDays: [5] },
];

export const pastIncidents = [
  {
    date: "2026-09-14",
    title: "Delayed AI search answers",
    status: "Resolved",
    duration: "42 minutes",
    body: "A configuration change increased latency for AI answers in the US-East region. We rolled back the change and answers returned to normal speed.",
  },
  {
    date: "2026-08-09",
    title: "Huddle connection issues for some users in Europe",
    status: "Resolved",
    duration: "18 minutes",
    body: "A network provider issue caused intermittent connection drops. Traffic was rerouted to alternate media servers.",
  },
  {
    date: "2026-07-21",
    title: "Slow message delivery on mobile",
    status: "Resolved",
    duration: "26 minutes",
    body: "A push notification backlog delayed mobile notifications. Additional capacity cleared the queue.",
  },
];
