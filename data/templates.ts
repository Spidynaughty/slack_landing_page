import type { IconName } from "@/components/ui/icon";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";

export type TemplateCategory =
  | "Project management"
  | "Engineering"
  | "Sales"
  | "Marketing"
  | "HR"
  | "IT"
  | "Customer service"
  | "Operations";

export type TemplatePart = "Channel" | "Canvas" | "List" | "Workflow" | "Agent";

export type WorkTemplate = {
  slug: string;
  name: string;
  category: TemplateCategory;
  description: string;
  icon: IconName;
  tone: Tone;
  includes: TemplatePart[];
  /** What's inside, one line per item, shown in the preview modal. */
  contents: { part: TemplatePart; title: string; detail: string }[];
  /** Number of teams using it, display string e.g. "18.2K" */
  uses: string;
  popular?: boolean;
};

export const templates: WorkTemplate[] = [
  {
    slug: "project-kickoff",
    name: "Project kickoff",
    category: "Project management",
    description: "Align your team on goals, owners and milestones from day one, with a single place for decisions and updates.",
    icon: "rocket",
    tone: "violet",
    includes: ["Channel", "Canvas", "List", "Workflow"],
    contents: [
      { part: "Channel", title: "#proj-kickoff", detail: "A dedicated channel with a pinned brief and bookmarks to key docs." },
      { part: "Canvas", title: "Project brief", detail: "Goals, scope, success metrics, stakeholders and open risks in one page." },
      { part: "List", title: "Milestones and owners", detail: "Track deliverables with owners, due dates and status columns." },
      { part: "Workflow", title: "Weekly status prompt", detail: "Asks owners for a two-line update every Thursday and posts a digest." },
    ],
    uses: "24.6K",
    popular: true,
  },
  {
    slug: "weekly-team-sync",
    name: "Weekly team sync",
    category: "Project management",
    description: "Replace a recurring status meeting with written updates, a running agenda and an AI summary everyone can skim.",
    icon: "repeat",
    tone: "mint",
    includes: ["Canvas", "Workflow", "Agent"],
    contents: [
      { part: "Canvas", title: "Running agenda", detail: "A living agenda where anyone can add topics before the week's sync." },
      { part: "Workflow", title: "Monday check-in", detail: "Collects wins, priorities and blockers from each teammate by 10 a.m." },
      { part: "Agent", title: "Sync summarizer", detail: "Rolls check-ins into a short digest and flags blockers that need a decision." },
    ],
    uses: "15.3K",
  },
  {
    slug: "bug-triage",
    name: "Bug triage",
    category: "Engineering",
    description: "Collect bug reports in a consistent format, route them to the right owner and keep severity visible to everyone.",
    icon: "bug",
    tone: "coral",
    includes: ["Channel", "List", "Workflow"],
    contents: [
      { part: "Channel", title: "#bugs-intake", detail: "One place for reports from support, QA and anyone in the company." },
      { part: "Workflow", title: "Report a bug form", detail: "Captures steps to reproduce, environment, severity and screenshots." },
      { part: "List", title: "Triage queue", detail: "Sorted by severity with owner, component and linked issue columns." },
    ],
    uses: "12.8K",
  },
  {
    slug: "incident-response",
    name: "Incident response",
    category: "Engineering",
    description: "Spin up a dedicated incident channel in seconds, assign roles and keep stakeholders informed until the postmortem is done.",
    icon: "siren",
    tone: "sun",
    includes: ["Channel", "Canvas", "Workflow", "Agent"],
    contents: [
      { part: "Workflow", title: "Declare an incident", detail: "Creates a channel, pages the on-call engineer and posts a severity banner." },
      { part: "Canvas", title: "Incident runbook", detail: "Roles, communication cadence, escalation paths and a live timeline." },
      { part: "Channel", title: "#inc-status", detail: "A read-only channel for stakeholder updates, separate from the war room." },
      { part: "Agent", title: "Incident scribe", detail: "Builds a timeline from the channel and drafts the postmortem when resolved." },
    ],
    uses: "19.4K",
    popular: true,
  },
  {
    slug: "deal-room",
    name: "Deal room",
    category: "Sales",
    description: "Bring account executives, solutions engineers and leadership together around every strategic deal, with CRM context built in.",
    icon: "handshake",
    tone: "sky",
    includes: ["Channel", "Canvas", "List", "Agent"],
    contents: [
      { part: "Channel", title: "#deal-account-name", detail: "A private channel per opportunity with your CRM record connected." },
      { part: "Canvas", title: "Account plan", detail: "Stakeholder map, mutual action plan, competition and next steps." },
      { part: "List", title: "Mutual action plan", detail: "Shared tasks with the buyer, owners and target dates through signature." },
      { part: "Agent", title: "Deal assistant", detail: "Answers questions about the account and preps briefs before every call." },
    ],
    uses: "21.1K",
    popular: true,
  },
  {
    slug: "campaign-launch",
    name: "Campaign launch",
    category: "Marketing",
    description: "Coordinate creative, channels and approvals for a launch, and keep everyone working from the same brief and timeline.",
    icon: "megaphone",
    tone: "pink",
    includes: ["Channel", "Canvas", "List", "Workflow"],
    contents: [
      { part: "Canvas", title: "Campaign brief", detail: "Audience, message pillars, offer, budget and launch-day checklist." },
      { part: "List", title: "Asset tracker", detail: "Every deliverable with owner, channel, status and review deadline." },
      { part: "Workflow", title: "Creative approval", detail: "Routes assets to brand and legal reviewers and records sign-off." },
      { part: "Channel", title: "#launch-war-room", detail: "Real-time coordination for launch day, with metrics posted hourly." },
    ],
    uses: "9.7K",
  },
  {
    slug: "content-calendar",
    name: "Content calendar",
    category: "Marketing",
    description: "Plan, draft and publish content across blog, social and email, with a clear view of what ships each week.",
    icon: "pen",
    tone: "violet",
    includes: ["List", "Workflow", "Agent"],
    contents: [
      { part: "List", title: "Editorial calendar", detail: "Pieces by publish date, format, owner, stage and distribution channel." },
      { part: "Workflow", title: "Pitch an idea", detail: "A short form that adds new ideas to the backlog for weekly review." },
      { part: "Agent", title: "Content helper", detail: "Drafts outlines and social copy from briefs using your style guide." },
    ],
    uses: "8.2K",
  },
  {
    slug: "new-hire-onboarding",
    name: "New hire onboarding",
    category: "HR",
    description: `Give every new teammate a warm welcome and a clear first 30 days, with tasks, introductions and answers in one place in ${B}.`,
    icon: "userPlus",
    tone: "mint",
    includes: ["Channel", "Canvas", "Workflow", "Agent"],
    contents: [
      { part: "Workflow", title: "Welcome sequence", detail: "Sends a welcome message, buddy intro and day-one checklist automatically." },
      { part: "Canvas", title: "First 30 days", detail: "Week-by-week goals, key people to meet and links to essential docs." },
      { part: "Channel", title: "#new-hires", detail: "A cohort channel where new teammates can ask questions and meet peers." },
      { part: "Agent", title: "Onboarding guide", detail: "Answers common questions about benefits, tools and policies around the clock." },
    ],
    uses: "27.9K",
    popular: true,
  },
  {
    slug: "it-helpdesk",
    name: "IT helpdesk",
    category: "IT",
    description: "Let employees request help where they already work, while an agent resolves common issues and routes the rest to your team.",
    icon: "headset",
    tone: "sky",
    includes: ["Channel", "List", "Workflow", "Agent"],
    contents: [
      { part: "Channel", title: "#it-help", detail: "A single front door for hardware, software and access requests." },
      { part: "Agent", title: "IT agent", detail: "Resolves password resets, software installs and how-to questions instantly." },
      { part: "Workflow", title: "Access request", detail: "Collects details, gets manager approval and notifies the app owner." },
      { part: "List", title: "Request queue", detail: "Open requests by category, priority, assignee and time to resolution." },
    ],
    uses: "14.5K",
  },
  {
    slug: "customer-escalation",
    name: "Customer escalation",
    category: "Customer service",
    description: "Swarm on urgent customer issues with the right experts, a shared case summary and timely updates to account owners.",
    icon: "alert",
    tone: "coral",
    includes: ["Channel", "Canvas", "Workflow"],
    contents: [
      { part: "Workflow", title: "Escalate a case", detail: "Creates a case channel, pulls in the account team and links the ticket." },
      { part: "Canvas", title: "Case summary", detail: "Customer impact, timeline, current owner, next update and resolution notes." },
      { part: "Channel", title: "#esc-customer-name", detail: "A focused space for support, engineering and success to resolve the issue." },
    ],
    uses: "11.6K",
  },
  {
    slug: "event-planning",
    name: "Event planning",
    category: "Operations",
    description: "Plan conferences, offsites and customer events with a shared budget, run-of-show and vendor contacts.",
    icon: "calendarDays",
    tone: "sun",
    includes: ["Channel", "Canvas", "List"],
    contents: [
      { part: "Channel", title: "#event-planning", detail: "Coordinate with internal teams and invite vendors as external guests." },
      { part: "Canvas", title: "Run of show", detail: "Minute-by-minute schedule, speaker notes, AV needs and contingency plans." },
      { part: "List", title: "Budget and vendors", detail: "Line items with vendor, contract status, cost and payment due date." },
    ],
    uses: "6.9K",
  },
  {
    slug: "vendor-management",
    name: "Vendor management",
    category: "Operations",
    description: "Track vendors, contracts and renewals in one place, and run security and procurement reviews without endless email threads.",
    icon: "fileSignature",
    tone: "pink",
    includes: ["List", "Workflow", "Agent"],
    contents: [
      { part: "List", title: "Vendor registry", detail: "Every vendor with owner, spend, risk tier, contract end date and renewal terms." },
      { part: "Workflow", title: "New vendor request", detail: "Routes requests through finance, legal and security review with approvals." },
      { part: "Agent", title: "Renewal watcher", detail: "Flags renewals 90 days out and summarizes usage before you negotiate." },
    ],
    uses: "5.4K",
  },
];

export const templateCategories: TemplateCategory[] = [
  "Project management",
  "Engineering",
  "Sales",
  "Marketing",
  "HR",
  "IT",
  "Customer service",
  "Operations",
];
