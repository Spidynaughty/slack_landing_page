import type { IconName } from "@/components/ui/icon";
import type { MockupKind } from "@/components/mockups";
import { B } from "@/lib/site";
import { apps, type App, type AppCategory } from "./integrations";

type CategoryDetail = {
  mockup: MockupKind;
  /** Where people use the app, shown as "Works with" chips linking to features. */
  worksWith: { label: string; href: string }[];
  steps: { title: string; body: string }[];
  scopes: { icon: IconName; title: string; body: string }[];
};

const read = { icon: "eye" as const, title: "View basic workspace info", body: "Your workspace name, channel names and member profiles." };
const post = { icon: "send" as const, title: "Post messages", body: "Send notifications and updates to channels it's added to." };

const details: Record<AppCategory, CategoryDetail> = {
  Productivity: {
    mockup: "files",
    worksWith: [
      { label: "Channels", href: "/features/channels" },
      { label: "File sharing", href: "/features/document-sharing" },
      { label: "Enterprise search", href: "/features/enterprise-search" },
    ],
    steps: [
      { title: "Install and sign in", body: "Add the app from the Marketplace and connect your account in one click." },
      { title: "Pick your channels", body: "Choose where previews, reminders and updates should appear." },
      { title: "Work without switching", body: "Share, preview and act on items right from the conversation." },
    ],
    scopes: [read, post, { icon: "file", title: "Unfurl links", body: "Show rich previews when someone shares a link from this app." }],
  },
  "Developer tools": {
    mockup: "code",
    worksWith: [
      { label: `${B} Code`, href: "/features/code-channels" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
      { label: "Huddles", href: "/features/huddles" },
    ],
    steps: [
      { title: "Connect your repositories", body: "Authorize the app and choose which projects to follow." },
      { title: "Route events to channels", body: "Send builds, reviews and alerts to the code channels that own them." },
      { title: "Act from the message", body: "Approve, re-run or roll back without leaving the conversation." },
    ],
    scopes: [read, post, { icon: "branch", title: "Read repository events", body: "Pull requests, builds and deployments for selected projects." }],
  },
  "Project management": {
    mockup: "lists",
    worksWith: [
      { label: "Lists", href: "/features/task-list" },
      { label: "Canvas", href: "/features/canvas" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
    ],
    steps: [
      { title: "Link your projects", body: "Connect boards and choose which project updates to follow." },
      { title: "Turn messages into tasks", body: "Create and assign work from any message with a shortcut." },
      { title: "Get digests automatically", body: "Weekly progress summaries land in the right channel." },
    ],
    scopes: [read, post, { icon: "listChecks", title: "Create and update items", body: "Create tasks and change status when you ask it to." }],
  },
  "Sales & CRM": {
    mockup: "crm",
    worksWith: [
      { label: "Connected CRM", href: "/features/crm" },
      { label: `${B} Connect`, href: "/connect" },
      { label: `${B} Agents`, href: "/ai-agents" },
    ],
    steps: [
      { title: "Connect your CRM", body: "Authorize the app and map deals to channels." },
      { title: "Get deal alerts", body: "Stage changes, approvals and big wins post where your team works." },
      { title: "Update records from chat", body: "Log notes and move stages without opening another tab." },
    ],
    scopes: [read, post, { icon: "contact", title: "Read and update records", body: "Accounts, deals and contacts you have access to." }],
  },
  Design: {
    mockup: "files",
    worksWith: [
      { label: "Canvas", href: "/features/canvas" },
      { label: "Clips", href: "/features/clips" },
      { label: "File sharing", href: "/features/document-sharing" },
    ],
    steps: [
      { title: "Connect your design files", body: "Sign in and choose which files and projects to follow." },
      { title: "Share live previews", body: "Links unfurl into previews that stay up to date." },
      { title: "Keep feedback in one place", body: "Comment notifications arrive in the project channel." },
    ],
    scopes: [read, post, { icon: "palette", title: "Read file metadata", body: "File names, frames and comment activity for linked files." }],
  },
  "HR & people": {
    mockup: "atlas",
    worksWith: [
      { label: `${B} Atlas`, href: "/features/atlas" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
      { label: "Channels", href: "/features/channels" },
    ],
    steps: [
      { title: "Connect your HR system", body: "An admin authorizes the app and chooses what to sync." },
      { title: "Automate the routine", body: "Requests, approvals and reminders run as workflows." },
      { title: "Celebrate and support", body: "Welcome new hires and mark milestones automatically." },
    ],
    scopes: [read, post, { icon: "users", title: "Read people data", body: "Names, teams, managers and start dates you choose to share." }],
  },
  Analytics: {
    mockup: "ai",
    worksWith: [
      { label: `${B} AI`, href: "/features/ai" },
      { label: "Enterprise search", href: "/features/enterprise-search" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
    ],
    steps: [
      { title: "Connect your data source", body: "Authorize read-only access to the dashboards you care about." },
      { title: "Schedule snapshots", body: "Post charts to channels daily, weekly or when a metric moves." },
      { title: "Ask questions in plain English", body: "Get answers and charts right in the thread." },
    ],
    scopes: [read, post, { icon: "chart", title: "Read dashboards", body: "Read-only access to the dashboards and metrics you select." }],
  },
  Security: {
    mockup: "security",
    worksWith: [
      { label: "Trust & security", href: "/trust/security" },
      { label: "Enterprise Key Management", href: "/enterprise-key-management" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
    ],
    steps: [
      { title: "Connect your security tools", body: "An admin authorizes the app with least-privilege access." },
      { title: "Triage in channels", body: "Alerts arrive enriched, with buttons to acknowledge or escalate." },
      { title: "Close the loop", body: "Access reviews and incidents are logged for audit." },
    ],
    scopes: [read, post, { icon: "shieldCheck", title: "Read security events", body: "Alerts and access requests from connected systems." }],
  },
  "Customer support": {
    mockup: "chat-team",
    worksWith: [
      { label: `${B} Agents`, href: "/ai-agents" },
      { label: "Huddles", href: "/features/huddles" },
      { label: "Lists", href: "/features/task-list" },
    ],
    steps: [
      { title: "Connect your help desk", body: "Authorize the app and choose which queues to sync." },
      { title: "Escalate into case channels", body: "Urgent tickets open a channel with the full history attached." },
      { title: "Reply from anywhere", body: "Responses sync back to the customer automatically." },
    ],
    scopes: [read, post, { icon: "ticket", title: "Read and update tickets", body: "Tickets, statuses and replies for connected queues." }],
  },
  Finance: {
    mockup: "workflow",
    worksWith: [
      { label: "Workflow Builder", href: "/features/workflow-automation" },
      { label: "Lists", href: "/features/task-list" },
      { label: `${B} Agents`, href: "/ai-agents" },
    ],
    steps: [
      { title: "Connect your finance system", body: "Authorize the app and set approval rules." },
      { title: "Approve in a message", body: "Invoices, expenses and purchase orders arrive with context." },
      { title: "Stay audit-ready", body: "Every approval is recorded with who, what and when." },
    ],
    scopes: [read, post, { icon: "receipt", title: "Read and approve requests", body: "Requests routed to you, with budget context." }],
  },
  Marketing: {
    mockup: "canvas",
    worksWith: [
      { label: "Canvas", href: "/features/canvas" },
      { label: `${B} Connect`, href: "/connect" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
    ],
    steps: [
      { title: "Connect your campaigns", body: "Sign in and choose which campaigns and audiences to follow." },
      { title: "Route approvals", body: "Sends and assets go to the right reviewers automatically." },
      { title: "Share results", body: "Performance digests post to the campaign channel." },
    ],
    scopes: [read, post, { icon: "megaphone", title: "Read campaign data", body: "Campaign names, schedules and performance metrics." }],
  },
  Communication: {
    mockup: "huddle",
    worksWith: [
      { label: "Huddles", href: "/features/huddles" },
      { label: "Clips", href: "/features/clips" },
      { label: "Messaging", href: "/features/team-chat" },
    ],
    steps: [
      { title: "Install and connect", body: "Add the app and link your account." },
      { title: "Start from any channel", body: "Launch calls, polls or meetings with a single command." },
      { title: "Keep the follow-up", body: "Recordings, results and notes post back to the conversation." },
    ],
    scopes: [read, post, { icon: "video", title: "Start calls and meetings", body: "Create meetings on your behalf when you ask it to." }],
  },
};

const updated = ["2026-10-08", "2026-09-29", "2026-10-02", "2026-09-17", "2026-10-11", "2026-09-24"];

export function appDetail(app: App) {
  const i = apps.findIndex((a) => a.slug === app.slug);
  return {
    ...details[app.category],
    developer: `${app.name} Labs`,
    updatedAt: updated[i % updated.length],
    languages: ["English", "Español", "Français", "Deutsch", "日本語"].slice(0, 3 + (i % 3)),
    pricing: i % 4 === 0 ? "Free" : i % 4 === 1 ? "Free trial, then paid" : "Free and paid plans",
  };
}

export function getApp(slug: string) {
  return apps.find((a) => a.slug === slug);
}
