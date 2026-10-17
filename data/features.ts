import type { IconName } from "@/components/ui/icon";
import type { MockupKind } from "@/components/mockups";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { Faq, Stat } from "./types";

export type FeatureCategory = "Collaborate" | "Work with AI" | "Connect" | "Build";

export type FeatureSection = {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  mockup: MockupKind;
};

export type Feature = {
  /** Unique key. For /features/* pages this equals the URL slug. */
  slug: string;
  /** Route where this feature's Template A page lives. */
  href: string;
  name: string;
  icon: IconName;
  tone: Tone;
  category: FeatureCategory;
  /** One-sentence description for cards and the features overview. */
  summary: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    /** Substring of `title` rendered with the brand gradient. */
    highlight?: string;
    subtitle: string;
    mockup: MockupKind;
  };
  stats: Stat[];
  sections: FeatureSection[];
  useCases: { icon: IconName; title: string; body: string }[];
  /** Slugs of other features shown as "related". */
  related: string[];
  faqs: Faq[];
  cta: { title: string; subtitle: string };
};

export const features: Feature[] = [
  /* ------------------------------------------------------------------ */
  /* Collaborate                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "channels",
    href: "/features/channels",
    name: "Channels",
    icon: "hash",
    tone: "violet",
    category: "Collaborate",
    summary: "Organized spaces for every project, team and topic, so the right people always have context.",
    seo: {
      title: "Channels for Team Collaboration and Organized Work",
      description: `Organize conversations by project, team or topic with ${B} channels. Share files, loop in apps and keep every decision searchable in one place.`,
    },
    hero: {
      eyebrow: "Channels",
      title: "A home for every project, team and topic",
      highlight: "every project",
      subtitle:
        "Channels bring the right people, files and tools into one focused space, so work moves forward without endless email chains.",
      mockup: "chat-channels",
    },
    stats: [
      { value: 32, suffix: "%", label: "fewer internal emails" },
      { value: 27, suffix: "%", label: "faster project delivery" },
      { value: 2.4, suffix: "x", decimals: 1, label: "more cross-team visibility" },
    ],
    sections: [
      {
        eyebrow: "Organize",
        title: "Give every workstream its own space",
        body: "Spin up a channel for a launch, a customer, an incident or a team in seconds. Members join, catch up on the history and contribute without anyone needing to cc them.",
        bullets: [
          "Public, private and announcement-only channels",
          "Sidebar sections with custom sorting",
          "Channel templates for recurring kinds of work",
        ],
        mockup: "chat-channels",
      },
      {
        eyebrow: "Focus",
        title: "Keep conversations tidy with threads",
        body: "Threads let side discussions happen without burying the main channel. Mentions, reactions and saved items make sure nothing important slips past you.",
        bullets: [
          "Reply in threads to keep channels scannable",
          "Mention people, groups or the whole channel",
          "Save messages and set reminders for later",
        ],
        mockup: "messaging",
      },
      {
        eyebrow: "Share",
        title: "Files and apps live where the work happens",
        body: "Drop in docs, designs and spreadsheets, then pin what matters to the channel header. Connected apps post updates right into the conversation, so the team sees changes as they land.",
        bullets: [
          "Pin key files, canvases and links as tabs",
          "Connected apps post updates in-channel",
          "Inline previews for docs, images and video",
        ],
        mockup: "files",
      },
      {
        eyebrow: "Find",
        title: "Search the full history of every decision",
        body: "Every message, file and thread is archived and searchable. New teammates can scroll back through months of context instead of booking a dozen onboarding calls.",
        bullets: [
          "Filter by channel, person, date or file type",
          "AI answers grounded in channel history",
          "Permissions respected in every result",
        ],
        mockup: "search",
      },
    ],
    useCases: [
      {
        icon: "rocket",
        title: "Product launches",
        body: "Bring product, marketing and support into one launch channel with a shared checklist and a single source of truth for dates.",
      },
      {
        icon: "siren",
        title: "Incident response",
        body: "Open an incident channel in one click, page responders and keep a clean timeline that doubles as your postmortem.",
      },
      {
        icon: "megaphone",
        title: "Company announcements",
        body: "Use announcement-only channels to share news with everyone while keeping questions and replies tidy in threads.",
      },
    ],
    related: ["team-chat", "huddles", "canvas"],
    faqs: [
      {
        q: "How many channels can we create?",
        a: "There's no limit on the number of channels on any plan, including Free. Most teams create channels for each project, team, customer and recurring topic, then archive them when the work wraps up.",
      },
      {
        q: "What's the difference between public and private channels?",
        a: "Public channels can be found and joined by anyone in your workspace, which keeps work transparent by default. Private channels are invite-only and don't appear in search for non-members, so they suit sensitive topics like hiring or finance.",
      },
      {
        q: "Can people outside our company join a channel?",
        a: `Yes. With ${B} Connect, you can share a channel with partners, vendors or customers while each organization keeps control of its own data and settings. Guest accounts are also available on paid plans for individual contractors.`,
      },
      {
        q: "How long is channel history kept?",
        a: "Free workspaces can view the most recent 90 days of messages and files. Paid plans keep your full history searchable, and admins on Business+ and Enterprise plans can set custom retention policies by channel.",
      },
    ],
    cta: {
      title: "Bring your team into channels",
      subtitle: "Set up your first channels in minutes and see how much smoother work feels when everyone shares the same context.",
    },
  },
  {
    slug: "huddles",
    href: "/features/huddles",
    name: "Huddles",
    icon: "headphones",
    tone: "mint",
    category: "Collaborate",
    summary: "Jump into audio or video calls from any channel or DM, with screen share and AI notes.",
    seo: {
      title: "Huddles: Audio and Video Calls Built Into Chat",
      description: `Start an audio or video huddle from any channel or DM in ${B}. Share your screen, turn on live captions and get AI notes with action items afterward.`,
    },
    hero: {
      eyebrow: "Meetings & video",
      title: "Talk it through without leaving the conversation",
      highlight: "Talk it through",
      subtitle:
        "Huddles are lightweight audio and video calls that start in one click from any channel or DM. Share your screen, draw on it together and come away with notes written for you.",
      mockup: "huddle",
    },
    stats: [
      { value: 28, suffix: "%", label: "fewer scheduled meetings" },
      { value: 15, suffix: " min", label: "saved per meeting on notes" },
      { value: 50, label: "people per huddle on paid plans" },
    ],
    sections: [
      {
        eyebrow: "Start instantly",
        title: "Skip the calendar invite",
        body: "Click the headphones icon in any channel or DM to start a huddle. Teammates see it's live, drop in to add what they know and drop out when they're done.",
        bullets: [
          "One click to start from any channel or DM",
          "Audio-first, with video when it helps",
          "See who's in a huddle before you join",
        ],
        mockup: "chat-team",
      },
      {
        eyebrow: "Share & draw",
        title: "Screen sharing that feels collaborative",
        body: "Several people can share their screens at once, and anyone can draw directly on a shared screen to point at the exact detail in question. It's pairing, design review and debugging without the friction.",
        bullets: [
          "Multi-person screen sharing",
          "Draw and annotate on shared screens",
          "Built for design reviews and pair programming",
        ],
        mockup: "huddle",
      },
      {
        eyebrow: "AI notes",
        title: "Notes and action items, written for you",
        body: `Turn on notes and ${B} AI follows along, then posts a summary, decisions and action items to a canvas in the channel. Anyone who missed the huddle can catch up in a minute.`,
        bullets: [
          "Summaries posted automatically to a canvas",
          "Action items assigned to the right people",
          "Links and messages shared during the call saved",
        ],
        mockup: "ai",
      },
      {
        eyebrow: "Accessible by default",
        title: "Live captions and transcripts for everyone",
        body: "Turn on live captions so everyone can follow along, whether they're in a noisy café or simply prefer reading. Transcripts are saved with the huddle so you can search what was said later.",
        bullets: [
          "Live captions in multiple languages",
          "Searchable transcripts saved to the thread",
          "Keyboard shortcuts and screen reader support",
        ],
        mockup: "clips",
      },
    ],
    useCases: [
      {
        icon: "code",
        title: "Pair programming",
        body: "Engineers jump into a huddle from a PR thread, share screens and draw on the diff to resolve tricky reviews in minutes.",
      },
      {
        icon: "lifebuoy",
        title: "Customer escalations",
        body: "Support and engineering huddle in the escalation channel while AI notes capture the fix and next steps for the account team.",
      },
      {
        icon: "coffee",
        title: "Team check-ins",
        body: "Distributed teams keep an open huddle for quick questions, recreating the easy back-and-forth of sitting together.",
      },
    ],
    related: ["clips", "ai", "channels"],
    faqs: [
      {
        q: "Are huddles available on the Free plan?",
        a: "Yes. Free workspaces can hold audio huddles between two people. Paid plans unlock huddles with up to 50 participants, plus video and screen sharing, and AI notes are included on plans with AI.",
      },
      {
        q: "How are AI huddle notes generated?",
        a: `When someone turns on notes, ${B} AI transcribes the conversation and produces a summary, key decisions and action items. Notes are posted to a canvas in the channel, and your data is never used to train third-party models.`,
      },
      {
        q: "Can we record huddles?",
        a: "Huddles are designed for quick, in-the-moment conversations, so they aren't recorded as video. When you need a written record, turn on AI notes or transcripts, and record a clip for async updates.",
      },
      {
        q: "Do huddles work on mobile?",
        a: "Huddles work on desktop, web and the iOS and Android apps. You can start a huddle on your laptop and move it to your phone without dropping out of the call.",
      },
    ],
    cta: {
      title: "Swap your next meeting for a huddle",
      subtitle: "Start a call in one click, share your screen and let AI take care of the notes.",
    },
  },
  {
    slug: "canvas",
    href: "/features/canvas",
    name: "Canvas",
    icon: "file",
    tone: "sun",
    category: "Collaborate",
    summary: "Docs that live inside channels, so plans, briefs and runbooks sit right beside the conversation.",
    seo: {
      title: "Canvas: Collaborative Docs Inside Your Channels",
      description: `Write briefs, plans and runbooks in ${B} canvases embedded beside your conversations, with checklists, tables, workflows and real-time co-editing.`,
    },
    hero: {
      eyebrow: "Canvas",
      title: "Docs that live right next to the conversation",
      highlight: "right next to",
      subtitle:
        "Canvases turn scattered messages into organized, living documents. Draft together in real time, embed files and workflows, and keep everything one click from the channel.",
      mockup: "canvas",
    },
    stats: [
      { value: 41, suffix: "%", label: "less time searching for docs" },
      { value: 3, suffix: "x", label: "faster onboarding for new hires" },
      { value: 60, suffix: "+", label: "ready-made canvas templates" },
    ],
    sections: [
      {
        eyebrow: "Write together",
        title: "Co-edit in real time, right in the channel",
        body: "Every channel and DM can have its own canvas, pinned as a tab at the top. Multiple people can edit at once, leave comments and watch changes appear as they happen.",
        bullets: [
          "Real-time co-editing with live presence",
          "Inline comments and threaded discussion",
          "Version history to restore earlier drafts",
        ],
        mockup: "canvas",
      },
      {
        eyebrow: "Rich building blocks",
        title: "Go beyond text with tables and checklists",
        body: "Add headings, tables, checklists, code blocks and embedded files with simple slash commands. Mention teammates or link channels so every canvas stays connected to the work.",
        bullets: [
          "Slash commands for tables, checklists and code",
          "Embed files, videos, lists and links",
          "Mention people to assign follow-ups",
        ],
        mockup: "lists",
      },
      {
        eyebrow: "Make it actionable",
        title: "Embed workflows and buttons in any doc",
        body: "Add a button that launches a workflow, files a request or starts a huddle, directly inside the doc. Your onboarding guide or IT runbook becomes something people act on, not just read.",
        bullets: [
          "Workflow buttons inside any canvas",
          "Request forms that route to the right channel",
          "Templates for onboarding, runbooks and briefs",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "AI assist",
        title: "Draft, summarize and tidy up with AI",
        body: `Ask ${B} AI to turn a long thread into a first draft, summarize a huddle into meeting notes or rewrite a section for a different audience. You stay in control of every edit.`,
        bullets: [
          "Turn threads and huddles into canvases",
          "Summarize long docs in seconds",
          "Rewrite for tone, length or audience",
        ],
        mockup: "ai",
      },
    ],
    useCases: [
      {
        icon: "userPlus",
        title: "New hire onboarding",
        body: "HR and managers build a welcome canvas with first-week tasks, key contacts and links that every new teammate can follow.",
      },
      {
        icon: "book",
        title: "Runbooks and playbooks",
        body: "Ops teams keep step-by-step procedures pinned in the on-call channel, complete with buttons that kick off the right workflow.",
      },
      {
        icon: "presentation",
        title: "Project briefs",
        body: "Product managers draft briefs beside the project discussion, so feedback, decisions and the latest version live in one place.",
      },
    ],
    related: ["task-list", "channels", "workflow-automation"],
    faqs: [
      {
        q: "How is a canvas different from a regular document?",
        a: "A canvas lives inside a channel or DM, so the doc and the conversation about it are always together. Changes are visible to channel members instantly, and canvases can include workflows, lists and embedded files.",
      },
      {
        q: "Can I create standalone canvases?",
        a: "Yes. On paid plans, you can create canvases outside of channels and share them with specific people, groups or channels. Free workspaces get one canvas per channel and DM.",
      },
      {
        q: "Can I export a canvas?",
        a: "You can download any canvas as a PDF or Markdown file, or copy its content into another tool. Admins on Enterprise plans can also include canvases in compliance and eDiscovery exports.",
      },
      {
        q: "Who can edit a canvas?",
        a: "By default, members of the channel where a canvas lives can view and edit it. You can switch a canvas to view-only or limit editing to specific people at any time.",
      },
    ],
    cta: {
      title: "Give every project a living doc",
      subtitle: "Create a canvas in any channel and turn scattered messages into plans everyone can follow.",
    },
  },
  {
    slug: "task-list",
    href: "/features/task-list",
    name: "Lists",
    icon: "listChecks",
    tone: "coral",
    category: "Collaborate",
    summary: "Track projects, requests and to-dos alongside the conversations that drive them forward.",
    seo: {
      title: "Lists: Project and Request Tracking in Chat",
      description: `Track projects, requests and tasks with ${B} Lists. Assign owners, set due dates and switch between table and board views without leaving the chat.`,
    },
    hero: {
      eyebrow: "Project tracking",
      title: "Turn conversations into plans that get done",
      highlight: "plans that get done",
      subtitle:
        "Lists keep projects, requests and approvals organized right where your team already talks. Assign owners, set due dates and watch progress update in real time.",
      mockup: "lists",
    },
    stats: [
      { value: 34, suffix: "%", label: "fewer status meetings" },
      { value: 25, suffix: "%", label: "faster request turnaround" },
      { value: 88, suffix: "%", label: "of tasks closed by their due date" },
    ],
    sections: [
      {
        eyebrow: "Track anything",
        title: "Flexible lists in table or board view",
        body: "Start from a template or build your own with custom fields for status, owner, priority and dates. Sort and filter in a table, or flip to a board and drag work through each stage.",
        bullets: [
          "Custom fields, statuses and priorities",
          "Table and kanban board views",
          "Templates for projects, requests and approvals",
        ],
        mockup: "lists",
      },
      {
        eyebrow: "Discuss in context",
        title: "Every item gets its own thread",
        body: "Open any item to comment, attach files or loop in a teammate with a mention. Conversations stay attached to the work, so the latest decision is never buried in another channel.",
        bullets: [
          "Threaded comments on every item",
          "Share items into channels with live previews",
          "Alerts when owners or statuses change",
        ],
        mockup: "chat-team",
      },
      {
        eyebrow: "Automate the busywork",
        title: "Let workflows handle the follow-ups",
        body: "Trigger a workflow when a status changes, a due date approaches or a new request arrives. Route intake forms into a list, notify the right channel and assign owners automatically.",
        bullets: [
          "Forms that create list items automatically",
          "Due date reminders sent to owners",
          "Status changes that notify the right channel",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "AI assist",
        title: "Summaries and next steps on demand",
        body: `Ask ${B} AI what changed this week, which items are at risk or who owns the most open work. It can also turn a messy thread into a tidy set of items with owners and dates.`,
        bullets: [
          "Weekly progress summaries in one click",
          "Flags for overdue and at-risk items",
          "Convert threads into list items",
        ],
        mockup: "ai",
      },
    ],
    useCases: [
      {
        icon: "ticket",
        title: "Request intake",
        body: "IT, legal and design teams collect requests with a form, triage them in a shared list and keep requesters updated automatically.",
      },
      {
        icon: "kanban",
        title: "Sprint planning",
        body: "Engineering teams plan sprints on a board, link items to pull requests and review progress without leaving the team channel.",
      },
      {
        icon: "calendarDays",
        title: "Content calendars",
        body: "Marketing teams track every post, campaign and asset with owners, publish dates and approval status in one view.",
      },
    ],
    related: ["canvas", "workflow-automation", "channels"],
    faqs: [
      {
        q: "Are Lists available on every plan?",
        a: "Free workspaces can view and comment on lists shared with them. Creating and editing lists is included on Pro, Business+ and Enterprise plans, with advanced permissions and audit history on Enterprise.",
      },
      {
        q: "How many items can a list hold?",
        a: "Each list supports up to 10,000 items and 50 custom fields. For larger datasets, split work across multiple lists and link related items between them.",
      },
      {
        q: "Can I import data from a spreadsheet?",
        a: "Yes. Upload a CSV or paste rows from a spreadsheet and Lists will map columns to fields for you. You can also start from a template and import your data into it.",
      },
      {
        q: "Can people outside my company see a list?",
        a: `Lists shared in a ${B} Connect channel are visible to members of that channel, including external partners. You decide whether they can only view items or edit them too.`,
      },
    ],
    cta: {
      title: "Start tracking work where it happens",
      subtitle: "Create your first list from a template and give every project clear owners, dates and status.",
    },
  },
  {
    slug: "connect",
    href: "/connect",
    name: `${B} Connect`,
    icon: "handshake",
    tone: "sky",
    category: "Collaborate",
    summary: "Work with partners, vendors and customers in shared channels, as securely as you work internally.",
    seo: {
      title: "Shared Channels with Partners, Vendors and Customers",
      description: `${B} Connect brings partners, vendors and customers into shared channels. Move deals and projects faster while each company keeps its own controls.`,
    },
    hero: {
      eyebrow: "External collaboration",
      title: "Work with every partner like they're down the hall",
      highlight: "down the hall",
      subtitle:
        "Shared channels replace long email threads with real-time conversations between organizations. Each company keeps its own data, security settings and admin controls.",
      mockup: "chat-connect",
    },
    stats: [
      { value: 46, suffix: "%", label: "faster deal cycles" },
      { value: 54, suffix: "%", label: "less external email" },
      { value: 250, label: "organizations per shared channel" },
    ],
    sections: [
      {
        eyebrow: "Shared channels",
        title: "One channel, multiple companies",
        body: "Invite an external organization to a channel and both teams work side by side with full message history, files and huddles. No more forwarding threads or guessing who's in the loop.",
        bullets: [
          "Up to 250 organizations in one channel",
          "Huddles, canvases and lists work across companies",
          "Clear badges show who works where",
        ],
        mockup: "chat-connect",
      },
      {
        eyebrow: "Direct messages",
        title: "Reach anyone you work with, instantly",
        body: `Send a DM to someone at another company that uses ${B}, just like you would a coworker. Connections are mutual, and either side can end them at any time.`,
        bullets: [
          "DMs with verified external contacts",
          "Connection requests require approval",
          "Block or disconnect in one click",
        ],
        mockup: "messaging",
      },
      {
        eyebrow: "Control",
        title: "Security that respects both sides",
        body: "Each organization's admins decide who can create shared channels, which partners are approved and what data policies apply. Retention, DLP and eDiscovery settings stay in force for your own people.",
        bullets: [
          "Approved-partner lists and invitation rules",
          "Each org keeps its own retention policies",
          "Verified organization badges reduce impersonation",
        ],
        mockup: "security",
      },
      {
        eyebrow: "Partner network",
        title: "See every external relationship at a glance",
        body: "A central dashboard shows every connected organization, shared channel and pending invitation. Spot dormant connections, review activity and clean up access when a project wraps.",
        bullets: [
          "Directory of connected organizations",
          "Activity insights for each shared channel",
          "Bulk actions to archive or disconnect",
        ],
        mockup: "connect",
      },
    ],
    useCases: [
      {
        icon: "briefcase",
        title: "Sales and account teams",
        body: "Open a shared channel with each key customer to answer questions fast, share proposals and keep stakeholders aligned through renewal.",
      },
      {
        icon: "palette",
        title: "Agencies and clients",
        body: "Creative agencies review drafts, collect feedback and get approvals in one channel instead of juggling inbox threads.",
      },
      {
        icon: "truck",
        title: "Supply chain partners",
        body: "Operations teams coordinate shipments with carriers and suppliers in real time, catching delays before they turn into problems.",
      },
    ],
    related: ["channels", "native-crm", "team-chat"],
    faqs: [
      {
        q: `Does the other company need a paid ${B} plan?`,
        a: "At least one organization in a shared channel needs to be on a paid plan. Partners on the Free plan can join channels started by a paid workspace and see the full shared history.",
      },
      {
        q: "Who owns the messages in a shared channel?",
        a: "Each organization owns the messages its own members send. Your retention and data policies apply to your messages and your partner's policies apply to theirs, so neither side gives up control.",
      },
      {
        q: "Can we restrict which organizations our employees connect with?",
        a: "Yes. Admins can require approval for every new external connection, maintain a list of approved partners or block specific organizations entirely. Enterprise plans add granular policies by team.",
      },
      {
        q: "What happens when a project with a partner ends?",
        a: "Either organization can disconnect from a shared channel at any time, and members of the other organization lose access immediately. Each side keeps its copy of the history according to its own retention settings.",
      },
    ],
    cta: {
      title: "Bring your partners into the conversation",
      subtitle: "Invite your first external organization to a shared channel and leave the reply-all chains behind.",
    },
  },
  {
    slug: "team-chat",
    href: "/features/team-chat",
    name: "Messaging",
    icon: "messages",
    tone: "pink",
    category: "Collaborate",
    summary: "Fast, organized messaging with threads, DMs, mentions and reactions that keep everyone in sync.",
    seo: {
      title: "Team Messaging with Threads, DMs and Mentions",
      description: `Keep your team in sync with ${B} messaging. Threads, DMs, mentions, reactions and rich formatting make every conversation clear and easy to follow.`,
    },
    hero: {
      eyebrow: "Messaging",
      title: "Conversations that keep pace with your team",
      highlight: "keep pace",
      subtitle:
        "Threads, DMs, mentions and reactions keep discussions organized and decisions easy to find. Say more with less, and spend far fewer hours in your inbox.",
      mockup: "messaging",
    },
    stats: [
      { value: 32, suffix: "%", label: "less time spent in email" },
      { value: 23, suffix: "%", label: "faster decisions" },
      { value: 4.2, suffix: " min", decimals: 1, label: "median time to first reply" },
    ],
    sections: [
      {
        eyebrow: "Threads",
        title: "Side conversations without the clutter",
        body: "Reply in a thread to dig into details without derailing the main channel. Follow the threads you care about and catch up on all of them from a single view.",
        bullets: [
          "Threaded replies keep channels scannable",
          "One view for every thread you follow",
          "Also send key replies to the channel",
        ],
        mockup: "messaging",
      },
      {
        eyebrow: "Direct messages",
        title: "Quick questions, one-on-one or in small groups",
        body: "DM a teammate or start a group conversation with up to eight people for quick, focused exchanges. When the conversation grows, turn it into a channel in a couple of clicks.",
        bullets: [
          "Group DMs with up to eight people",
          "Convert group DMs into private channels",
          "Statuses show when people are free",
        ],
        mockup: "chat",
      },
      {
        eyebrow: "Expression",
        title: "Say more with formatting, emoji and reactions",
        body: "Format messages with bold text, lists, code blocks and links, or add an emoji reaction instead of another 'thanks!' reply. Custom emoji give your team's culture a voice of its own.",
        bullets: [
          "Rich text, lists and code blocks",
          "Emoji reactions and custom emoji",
          "Scheduled sends and saved drafts",
        ],
        mockup: "chat-team",
      },
      {
        eyebrow: "Stay focused",
        title: "Notifications that respect your time",
        body: `Choose exactly what pings you: mentions, keywords, specific channels or nothing at all during focus hours. ${B} AI can recap what you missed so you don't have to scroll.`,
        bullets: [
          "Keyword alerts and per-channel settings",
          "Do Not Disturb and notification schedules",
          "AI recaps of busy channels",
        ],
        mockup: "ai",
      },
    ],
    useCases: [
      {
        icon: "globe",
        title: "Distributed teams",
        body: "Teams spread across time zones use threads and scheduled messages to hand off work smoothly from one region to the next.",
      },
      {
        icon: "headset",
        title: "Support teams",
        body: "Agents swarm on tricky tickets in a dedicated channel, using mentions to pull in product experts the moment they're needed.",
      },
      {
        icon: "users",
        title: "Leadership updates",
        body: "Executives share weekly updates in a channel and answer questions in threads, keeping the whole company informed and heard.",
      },
    ],
    related: ["channels", "huddles", "clips"],
    faqs: [
      {
        q: "Can I edit or delete a message after sending it?",
        a: "Yes. You can edit or delete your own messages at any time, and edited messages are labeled so everyone knows they changed. Admins on paid plans can restrict editing windows to meet compliance needs.",
      },
      {
        q: "How do mentions work?",
        a: "Type @ followed by a name to notify a person, or mention a user group like @design to reach a whole team at once. @channel and @here notify everyone in a channel, and admins can limit who uses them.",
      },
      {
        q: "Are messages encrypted?",
        a: "All messages are encrypted in transit and at rest. Enterprise plans add bring-your-own-key encryption, so you control your own keys and can revoke access whenever you need to.",
      },
      {
        q: "Can I schedule messages?",
        a: "Yes. Write your message, choose Schedule for later and pick a time, and it sends automatically. It's an easy way to respect teammates' working hours across time zones.",
      },
    ],
    cta: {
      title: "Give your team a better way to talk",
      subtitle: "Replace scattered email threads with organized conversations everyone can follow.",
    },
  },
  {
    slug: "clips",
    href: "/features/clips",
    name: "Clips",
    icon: "video",
    tone: "violet",
    category: "Collaborate",
    summary: "Record quick audio, video or screen clips to share updates without scheduling another meeting.",
    seo: {
      title: "Clips: Async Video and Audio Updates for Teams",
      description: `Record audio, video and screen clips in ${B} to share updates, demos and walkthroughs async. Every clip comes with searchable transcripts and captions.`,
    },
    hero: {
      eyebrow: "Async video",
      title: "Share the update and skip the meeting",
      highlight: "skip the meeting",
      subtitle:
        "Clips let you record your voice, video or screen and post it to any channel or DM. Teammates watch on their own schedule, with captions and transcripts built in.",
      mockup: "clips",
    },
    stats: [
      { value: 22, suffix: "%", label: "fewer status meetings" },
      { value: 2.5, suffix: "x", decimals: 1, label: "faster feedback on demos" },
      { value: 87, suffix: "%", label: "of clips watched within a day" },
    ],
    sections: [
      {
        eyebrow: "Record",
        title: "Capture your screen, camera or voice in seconds",
        body: "Press the clip button in the message composer and start recording. Walk through a design, demo a bug or share a quick hello without opening another app.",
        bullets: [
          "Screen, camera and audio-only recording",
          "Up to five minutes per clip",
          "Record from desktop, web or mobile",
        ],
        mockup: "clips",
      },
      {
        eyebrow: "Transcripts",
        title: "Every clip is searchable and accessible",
        body: "Clips are automatically transcribed and captioned, so people can skim, search or read instead of watching. Transcripts show up in search results alongside messages and files.",
        bullets: [
          "Automatic captions and transcripts",
          "Clip content appears in search",
          "Adjustable playback speed",
        ],
        mockup: "search",
      },
      {
        eyebrow: "Discuss",
        title: "Reply in a thread, right under the clip",
        body: "Teammates react, ask questions and reply in a thread, keeping the conversation attached to the original update. When text isn't enough, reply with a clip of your own.",
        bullets: [
          "Threaded replies and emoji reactions",
          "Reply to a clip with another clip",
          "Timestamped comments for precise feedback",
        ],
        mockup: "chat-team",
      },
      {
        eyebrow: "AI summaries",
        title: "Get the gist before you press play",
        body: `${B} AI writes a short summary of every clip, highlighting key points and action items. It's an easy way to work through a backlog of updates after time away.`,
        bullets: [
          "Auto-generated clip summaries",
          "Action items pulled from the transcript",
          "Transcripts translated into other languages",
        ],
        mockup: "ai",
      },
    ],
    useCases: [
      {
        icon: "palette",
        title: "Design reviews",
        body: "Designers record a walkthrough of new mocks and collect feedback in the thread, without coordinating calendars across time zones.",
      },
      {
        icon: "bug",
        title: "Bug reports",
        body: "QA and support record the exact steps to reproduce an issue, giving engineers the context they need on the first try.",
      },
      {
        icon: "smile",
        title: "Team updates",
        body: "Managers share a weekly video update so everyone hears priorities firsthand, including teammates working opposite hours.",
      },
    ],
    related: ["huddles", "team-chat", "ai"],
    faqs: [
      {
        q: "How long can a clip be?",
        a: "Clips can be up to five minutes long, which keeps updates focused and easy to watch. For longer recordings, upload a video file to any channel instead.",
      },
      {
        q: "Are clips available on the Free plan?",
        a: "Yes, everyone can record and watch clips on any plan. AI summaries and transcript translation are available on plans that include AI.",
      },
      {
        q: "Can I edit a clip after recording it?",
        a: "You can trim the start and end of a clip before posting, and edit the transcript to fix names or technical terms. After posting, you can delete the clip and record a new one.",
      },
      {
        q: "Who can see my clips?",
        a: "A clip is visible to anyone who can see the channel or DM where it was posted. Clips follow the same retention, export and permission settings as the rest of your workspace.",
      },
    ],
    cta: {
      title: "Record your first clip today",
      subtitle: "Swap a status meeting for a quick video update and give your team some time back.",
    },
  },
  {
    slug: "document-sharing",
    href: "/features/document-sharing",
    name: "File sharing",
    icon: "folder",
    tone: "mint",
    category: "Collaborate",
    summary: "Share files, docs and designs in context, with instant previews, search and enterprise-grade controls.",
    seo: {
      title: "File Sharing and Document Collaboration in Chat",
      description: `Share files, documents and designs in ${B} channels with instant previews, full-text search and connected cloud storage, backed by enterprise controls.`,
    },
    hero: {
      eyebrow: "File sharing",
      title: "Every file, right where the conversation is",
      highlight: "right where",
      subtitle:
        "Drag in a doc, design or spreadsheet and your team can preview it, discuss it and find it later. No more digging through attachments or asking for the latest version.",
      mockup: "files",
    },
    stats: [
      { value: 37, suffix: "%", label: "less time looking for files" },
      { value: 40, suffix: "+", label: "file types with inline previews" },
      { value: 1, suffix: " GB", label: "max size per upload" },
    ],
    sections: [
      {
        eyebrow: "Share",
        title: "Drop it in and keep talking",
        body: "Drag files into any channel or DM, add a note and send. Your team gets instant previews for documents, images, PDFs and video, so they can respond without downloading anything.",
        bullets: [
          "Drag and drop from desktop or mobile",
          "Inline previews for 40+ file types",
          "Upload files up to 1 GB each",
        ],
        mockup: "files",
      },
      {
        eyebrow: "Connect storage",
        title: "Bring your cloud drives along",
        body: "Connect your existing cloud storage so shared links unfurl with rich previews and the right permissions. Get notified in-channel when someone comments on or requests access to a doc.",
        bullets: [
          "Rich link previews from popular cloud drives",
          "Approve access requests from the message",
          "Comment notifications delivered in-channel",
        ],
        mockup: "chat-channels",
      },
      {
        eyebrow: "Find",
        title: "Search inside every file you've shared",
        body: "Full-text search looks inside PDFs, docs and slides, not just file names. Filter by type, channel or person to find that contract from last spring in seconds.",
        bullets: [
          "Full-text search inside documents",
          "Filters for type, channel, person and date",
          "A Files tab in every channel",
        ],
        mockup: "search",
      },
      {
        eyebrow: "Protect",
        title: "Controls that keep sensitive files safe",
        body: "Admins can restrict file types, block downloads on unmanaged devices and apply data loss prevention rules. Every file follows your retention policies and is included in compliance exports.",
        bullets: [
          "Data loss prevention and file type rules",
          "Download controls for unmanaged devices",
          "Retention policies and legal holds",
        ],
        mockup: "security",
      },
    ],
    useCases: [
      {
        icon: "palette",
        title: "Creative teams",
        body: "Designers share mocks and video cuts in the project channel, collecting feedback on each version in its own thread.",
      },
      {
        icon: "scale",
        title: "Legal and finance",
        body: "Contracts and reports are shared in private channels with download restrictions and retention rules applied automatically.",
      },
      {
        icon: "briefcase",
        title: "Sales enablement",
        body: "Enablement teams pin the latest decks and one-pagers in sales channels so reps always grab the current version.",
      },
    ],
    related: ["canvas", "enterprise-search", "channels"],
    faqs: [
      {
        q: "What's the maximum file size?",
        a: "You can upload files up to 1 GB each. Free workspaces include 5 GB of total storage, while paid plans include expanded storage per member that's pooled across your workspace.",
      },
      {
        q: "Which file types can be previewed?",
        a: "Inline previews support PDFs, images, video, audio, common document formats, spreadsheets, slides and code snippets. Other file types can still be uploaded, shared and downloaded.",
      },
      {
        q: "Can I connect our existing cloud storage?",
        a: "Yes. Connect your cloud storage provider from the app directory and shared links will unfurl with previews. Permissions stay managed in your storage provider, so your access rules don't change.",
      },
      {
        q: "How are shared files secured?",
        a: "Files are encrypted in transit and at rest. Business+ and Enterprise plans add data loss prevention, download controls and the ability to remotely wipe files from lost devices.",
      },
    ],
    cta: {
      title: "Keep every file in context",
      subtitle: "Share your next doc in a channel and see how much easier it is to find, discuss and approve.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Work with AI                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "slackbot",
    href: "/features/slackbot",
    name: `${B} Bot`,
    icon: "bot",
    tone: "sun",
    category: "Work with AI",
    summary: "A personal AI teammate in your DMs that answers questions, drafts messages and gets things done.",
    seo: {
      title: "Your Personal AI Assistant for the Workday",
      description: `${B} Bot is your personal AI teammate. Ask questions, draft replies, prep for meetings and catch up on channels, all from a simple direct message.`,
    },
    hero: {
      eyebrow: "Personal AI teammate",
      title: "Meet the teammate who already knows the context",
      highlight: "knows the context",
      subtitle: `${B} Bot lives in your DMs and understands your channels, files and calendar. Ask it anything about your work and get a clear answer, a draft or a finished task.`,
      mockup: "bot",
    },
    stats: [
      { value: 97, suffix: " min", label: "saved per person each week" },
      { value: 62, suffix: "%", label: "of questions answered instantly" },
      { value: 4.6, suffix: "/5", decimals: 1, label: "average user rating" },
    ],
    sections: [
      {
        eyebrow: "Ask anything",
        title: "Answers grounded in your workspace",
        body: "Ask about a project's status, last week's decision or where a file lives, and get an answer with links to the sources. It only uses content you already have permission to see.",
        bullets: [
          "Answers cite messages, files and canvases",
          "Respects every channel and file permission",
          "Follow-up questions keep the context",
        ],
        mockup: "bot",
      },
      {
        eyebrow: "Catch up",
        title: "Your morning brief, written for you",
        body: "Start each day with a personalized summary of mentions, unread threads and the meetings ahead. After time off, ask for a recap of the channels that matter most to you.",
        bullets: [
          "Daily briefs tailored to your priorities",
          "Recaps of busy channels and threads",
          "Highlights of what needs your reply",
        ],
        mockup: "ai",
      },
      {
        eyebrow: "Draft & do",
        title: "From quick drafts to finished tasks",
        body: "Ask it to draft a reply, write a project update or turn your notes into a canvas. It can also create list items, set reminders and kick off workflows on your behalf.",
        bullets: [
          "Drafts in your voice, ready to edit",
          "Creates reminders, list items and canvases",
          "Launches workflows with a simple request",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "Find faster",
        title: "Search that understands what you mean",
        body: "Describe what you're looking for in plain language, even if you don't remember the exact words. It searches across messages, files and connected apps to bring back what you need.",
        bullets: [
          "Natural-language search across your workspace",
          "Results from connected apps included",
          "Ask follow-ups to narrow results",
        ],
        mockup: "search",
      },
    ],
    useCases: [
      {
        icon: "calendar",
        title: "Meeting prep",
        body: "Ask for a brief before a customer call and get recent conversations, open issues and key contacts in a single message.",
      },
      {
        icon: "userPlus",
        title: "New hire ramp-up",
        body: "New teammates ask questions about tools, processes and people without worrying about interrupting anyone.",
      },
      {
        icon: "trending",
        title: "Manager updates",
        body: "Managers ask for a summary of their team's progress across channels and turn it into a weekly update in minutes.",
      },
    ],
    related: ["ai", "ai-agents", "enterprise-search"],
    faqs: [
      {
        q: `Which plans include ${B} Bot?`,
        a: `A basic version of ${B} Bot is available on every plan. AI assistant features, including answers, recaps and drafting, are included on Business+ and Enterprise plans (recaps and summaries are also included on Pro).`,
      },
      {
        q: `Can ${B} Bot see private channels and DMs?`,
        a: `${B} Bot can only access content that you personally have permission to see. If you aren't a member of a private channel, it won't use that channel to answer your questions.`,
      },
      {
        q: "Is my data used to train AI models?",
        a: "No. Your workspace data is never used to train large language models, and your conversations with the bot aren't shared with third parties. Everything stays within your workspace's security boundary.",
      },
      {
        q: "Can admins control how the bot is used?",
        a: "Yes. Admins can turn AI features on or off for the whole workspace or for specific groups, and choose which connected apps the bot can reference. Usage analytics are available in the admin dashboard.",
      },
    ],
    cta: {
      title: `Say hello to ${B} Bot`,
      subtitle: "Open a DM, ask your first question and win back the time you spend hunting for answers.",
    },
  },
  {
    slug: "code-channels",
    href: "/features/code-channels",
    name: `${B} Code`,
    icon: "code",
    tone: "sky",
    category: "Work with AI",
    summary: "Channels built for engineering, with pull requests, CI, deploys and AI code review in one place.",
    seo: {
      title: "Code Channels for PRs, CI, Deploys and AI Review",
      description: `${B} Code brings pull requests, CI runs, deploys and AI code review into dedicated engineering channels, so your team ships faster with less tab-switching.`,
    },
    hero: {
      eyebrow: "New for engineering",
      title: "Ship code from the place your team already talks",
      highlight: "Ship code",
      subtitle:
        "Code channels connect your repos, pipelines and deploys to the conversation. Review PRs, triage failing builds and get AI feedback without bouncing between six tabs.",
      mockup: "code",
    },
    stats: [
      { value: 31, suffix: "%", label: "faster PR review cycles" },
      { value: 44, suffix: "%", label: "less time triaging CI failures" },
      { value: 2, suffix: "x", label: "more deploys per week" },
    ],
    sections: [
      {
        eyebrow: "Pull requests",
        title: "Review PRs right in the channel",
        body: "New pull requests post to the channel with a summary, diff stats and requested reviewers. Approve, request changes or start a thread on a specific line without leaving the conversation.",
        bullets: [
          "Rich PR cards with status and reviewers",
          "Approve or comment from the message",
          "Threads sync with review comments",
        ],
        mockup: "code",
      },
      {
        eyebrow: "AI code review",
        title: "A first-pass reviewer that never gets tired",
        body: "An AI reviewer reads every PR, flags likely bugs, security issues and missing tests, and explains its reasoning. Engineers stay in charge of what merges and spend less time on the obvious stuff.",
        bullets: [
          "Flags bugs, vulnerabilities and missing tests",
          "Suggested fixes you can apply in one click",
          "Learns your team's conventions over time",
        ],
        mockup: "agent",
      },
      {
        eyebrow: "CI & deploys",
        title: "Know the moment a build breaks",
        body: "Failing builds post with the error, the likely culprit commit and its author tagged. Deploys show progress in real time, with one-click rollback when something looks off.",
        bullets: [
          "CI failures with log excerpts and suspects",
          "Deploy status and approvals in-channel",
          "One-click rollback with a full audit trail",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "Organized by default",
        title: "A channel for every repo, service and incident",
        body: "Auto-create channels per repository or service and route alerts to the right owners. When an incident starts, everything from the first alert to the fix lives in one searchable place.",
        bullets: [
          "Auto-created channels per repo or service",
          "Ownership-based alert routing",
          "Incident timelines generated automatically",
        ],
        mockup: "chat-channels",
      },
    ],
    useCases: [
      {
        icon: "pr",
        title: "Code review",
        body: "Teams cut review wait times by surfacing PRs where reviewers already are, with AI catching common issues before a human looks.",
      },
      {
        icon: "siren",
        title: "On-call and incidents",
        body: "On-call engineers get alerts, logs and recent deploys in one channel, then coordinate the fix and the postmortem together.",
      },
      {
        icon: "rocket",
        title: "Release management",
        body: "Release captains track what's shipping, gate deploys behind approvals and announce releases from a single channel.",
      },
    ],
    related: ["ai-agents", "workflow-automation", "channels"],
    faqs: [
      {
        q: `Which code hosts and CI tools does ${B} Code support?`,
        a: "Code channels work with the most popular Git hosts and CI/CD providers, plus any tool that can send webhooks. Guided setup takes a few minutes per repository.",
      },
      {
        q: "Does AI code review see our entire codebase?",
        a: "The AI reviewer only accesses repositories you explicitly connect, and only to review changes in pull requests. Your code is never used to train models and is processed within your workspace's security boundary.",
      },
      {
        q: `Is ${B} Code available on every plan?`,
        a: "Code channels with PR and CI notifications are available on Pro and above. AI code review is included on Business+ and Enterprise plans, with usage limits based on seats.",
      },
      {
        q: "Can we keep our existing review process?",
        a: "Absolutely. Code channels mirror your existing branch protections and required reviewers, so nothing merges that wouldn't have before. The AI reviewer is advisory unless you choose to make its checks required.",
      },
    ],
    cta: {
      title: "Bring your engineering work into one place",
      subtitle: `Connect a repo to ${B} Code and watch PRs, builds and deploys flow into the conversation.`,
    },
  },
  {
    slug: "ai",
    href: "/features/ai",
    name: `${B} AI`,
    icon: "sparkles",
    tone: "pink",
    category: "Work with AI",
    summary: "AI built into every conversation, with recaps, summaries, answers, huddle notes and translations.",
    seo: {
      title: "AI Built Into Your Conversations and Workflows",
      description: `${B} AI summarizes threads, recaps channels, answers questions from your workspace and writes huddle notes, so your team spends less time catching up.`,
    },
    hero: {
      eyebrow: "Native AI",
      title: "AI that works where your work already happens",
      highlight: "where your work",
      subtitle: `${B} AI is built into channels, huddles, search and canvases. It summarizes what you missed, answers questions with sources and turns conversations into next steps.`,
      mockup: "ai",
    },
    stats: [
      { value: 1.6, suffix: " hrs", decimals: 1, label: "saved per user each week" },
      { value: 80, suffix: "%", label: "of users say they catch up faster" },
      { value: 25, suffix: "+", label: "languages for translation" },
    ],
    sections: [
      {
        eyebrow: "Recaps & summaries",
        title: "Catch up in seconds, not hours",
        body: "Get a daily recap of the channels you choose, or summarize any thread with a single click. Summaries highlight decisions, open questions and who's waiting on you.",
        bullets: [
          "Daily recaps of the channels you pick",
          "One-click thread and channel summaries",
          "Key decisions and action items highlighted",
        ],
        mockup: "ai",
      },
      {
        eyebrow: "AI answers",
        title: "Ask a question, get an answer with sources",
        body: "Type a question into search and get a direct answer drawn from messages, files and canvases. Every answer links back to its sources so you can verify the details and dig deeper.",
        bullets: [
          "Natural-language answers right in search",
          "Citations to the original messages and files",
          "Only uses content you can access",
        ],
        mockup: "search",
      },
      {
        eyebrow: "Huddle notes",
        title: "Meeting notes that write themselves",
        body: "Turn on AI notes in any huddle and get a summary, decisions and action items posted to a canvas when the call ends. Teammates who couldn't join can catch up in a minute.",
        bullets: [
          "Automatic huddle summaries and transcripts",
          "Action items assigned to participants",
          "Notes saved to a canvas in the channel",
        ],
        mockup: "huddle",
      },
      {
        eyebrow: "Translation",
        title: "Work across languages without friction",
        body: "Translate messages and threads into your preferred language with one click, and let teammates read your replies in theirs. Global teams collaborate naturally, with no copying and pasting required.",
        bullets: [
          "Message and thread translation in 25+ languages",
          "A preferred language for each person",
          "Original text always one click away",
        ],
        mockup: "messaging",
      },
    ],
    useCases: [
      {
        icon: "globe",
        title: "Global teams",
        body: "Teams in different countries collaborate in their own languages, with AI translation keeping everyone on the same page.",
      },
      {
        icon: "briefcase",
        title: "Busy executives",
        body: "Leaders skim daily recaps of key channels and ask follow-up questions instead of reading hundreds of messages.",
      },
      {
        icon: "headset",
        title: "Customer support",
        body: "Support agents get instant answers from past tickets and internal docs, resolving issues faster with consistent responses.",
      },
    ],
    related: ["slackbot", "huddles", "enterprise-search"],
    faqs: [
      {
        q: `How much does ${B} AI cost?`,
        a: `${B} AI is included in Business+ and Enterprise plans, and recaps and thread summaries are included on Pro workspaces. Free workspaces can try select AI features during a 30-day trial.`,
      },
      {
        q: "Is our data used to train AI models?",
        a: "No. Customer data is never used to train large language models. AI features run within our secure infrastructure, and your data is not retained by third-party model providers.",
      },
      {
        q: `Does ${B} AI respect channel permissions?`,
        a: "Yes. AI answers, summaries and recaps only draw from content each person already has access to. If you can't see a private channel, AI won't use it to answer your questions.",
      },
      {
        q: "Can admins turn AI features off?",
        a: "Admins can enable or disable AI features for the whole workspace or for specific groups, channels and features. Detailed usage reports help you understand adoption and value.",
      },
    ],
    cta: {
      title: "Put AI to work in every conversation",
      subtitle: "Turn on recaps, summaries and AI answers and give your team hours back every week.",
    },
  },
  {
    slug: "ai-agents",
    href: "/ai-agents",
    name: `${B} Agents`,
    icon: "brain",
    tone: "coral",
    category: "Work with AI",
    summary: "Autonomous AI agents that take on real work in channels, with people approving every key step.",
    seo: {
      title: "AI Agents That Work Alongside Your Team",
      description: `Deploy ${B} Agents to handle support, sales, IT and ops work in your channels. Agents act on your data and tools, with people approving key decisions.`,
    },
    hero: {
      eyebrow: "AI agents",
      title: "Agents that do the work, while you stay in charge",
      highlight: "do the work",
      subtitle: `${B} Agents work in channels like teammates, triaging requests, updating records and resolving issues end to end. People approve the important steps and every action is logged.`,
      mockup: "agent",
    },
    stats: [
      { value: 38, suffix: "%", label: "of requests resolved autonomously" },
      { value: 6, suffix: "x", label: "faster first response" },
      { value: 100, suffix: "%", label: "of agent actions audited" },
    ],
    sections: [
      {
        eyebrow: "Agents in channels",
        title: "Work with agents like you work with people",
        body: "Mention an agent in a channel, assign it a task or let it pick up requests automatically. It posts progress in a thread, asks clarifying questions and hands back finished work.",
        bullets: [
          "Mention or assign agents in any channel",
          "Progress updates posted in threads",
          "Hand-offs to people when judgment is needed",
        ],
        mockup: "agent",
      },
      {
        eyebrow: "Human in the loop",
        title: "You approve what matters",
        body: "Set approval rules for actions like issuing refunds, changing access or emailing customers. Agents pause and ask for a go-ahead in the channel before taking the step.",
        bullets: [
          "Approval rules by action, amount or risk",
          "One-click approve or reject in chat",
          "Escalation paths when approvers are away",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "Grounded and governed",
        title: "Guardrails, permissions and a full audit trail",
        body: "Agents only access the data and tools you grant them, and every action is recorded along with its reasoning. Security teams can review, pause or revoke an agent at any time.",
        bullets: [
          "Scoped permissions for data and tools",
          "Complete audit log of every action",
          "Instant pause and revoke controls",
        ],
        mockup: "security",
      },
      {
        eyebrow: "Ready-made agents",
        title: "Start with agents for your busiest teams",
        body: "Launch prebuilt agents for IT help desk, customer support, sales follow-up and onboarding, then tailor them with your own instructions and knowledge. Most teams go live in an afternoon.",
        bullets: [
          "Prebuilt agents for IT, support and sales",
          "Custom instructions and knowledge sources",
          "Go live without writing code",
        ],
        mockup: "crm",
      },
    ],
    useCases: [
      {
        icon: "lifebuoy",
        title: "IT help desk",
        body: "An IT agent provisions software, answers policy questions and unlocks accounts, escalating hardware issues to the right technician.",
      },
      {
        icon: "headset",
        title: "Customer support",
        body: "A support agent drafts responses, looks up order history and resolves routine tickets, sending refunds over a threshold for approval.",
      },
      {
        icon: "trending",
        title: "Sales follow-up",
        body: "A sales agent logs call notes, updates deal stages and drafts follow-up emails for reps to review and send.",
      },
    ],
    related: ["agentic-platform", "slackbot", "workflow-automation"],
    faqs: [
      {
        q: "How are agents different from workflows?",
        a: "Workflows follow fixed steps you define in advance. Agents reason about the goal, decide which tools and data to use and adapt when things don't go as planned, all within the guardrails and approvals you set.",
      },
      {
        q: "Can agents take action without approval?",
        a: "Only if you allow it. You decide which actions an agent can take on its own and which require a person to approve, and you can tighten or relax those rules at any time.",
      },
      {
        q: `Which plans include ${B} Agents?`,
        a: "Prebuilt agents are available on Business+ and Enterprise plans, priced by usage with a monthly allowance included. Custom agents and advanced governance controls require an Enterprise plan.",
      },
      {
        q: "Can we bring our own agents?",
        a: `Yes. The ${B} agentic platform lets you connect agents built with other vendors or frameworks, so they work in channels with the same permissions, approvals and audit trail.`,
      },
    ],
    cta: {
      title: "Put your first AI agent to work",
      subtitle: "Start with a prebuilt agent for IT, support or sales and see it handle real requests within days.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Connect                                                             */
  /* ------------------------------------------------------------------ */
  {
    slug: "crm",
    href: "/features/crm",
    name: "Connected CRM",
    icon: "plug",
    tone: "violet",
    category: "Connect",
    summary: "Bring records from your existing CRM into channels, with deal alerts and updates right from chat.",
    seo: {
      title: "Connect Your CRM to Deal Channels and Alerts",
      description: `Connect your existing CRM to ${B}. Get deal alerts in channels, update records from chat and give every account team the context it needs to close.`,
    },
    hero: {
      eyebrow: "Connected CRM",
      title: "Your CRM, finally part of the conversation",
      highlight: "part of the conversation",
      subtitle: `Bring accounts, opportunities and cases from the CRM you already use into ${B}. Sellers get real-time alerts, update records from chat and work every deal together.`,
      mockup: "crm",
    },
    stats: [
      { value: 29, suffix: "%", label: "faster deal cycles" },
      { value: 35, suffix: "%", label: "more CRM records kept current" },
      { value: 4, suffix: " hrs", label: "saved per rep each week" },
    ],
    sections: [
      {
        eyebrow: "Record previews",
        title: "See the full record without switching apps",
        body: "Paste a link to any account, opportunity or case and it expands into a rich preview with stage, amount, owner and next steps. Everyone in the channel sees the same live data.",
        bullets: [
          "Rich previews for accounts, deals and cases",
          "Live data that updates automatically",
          "Respects CRM field-level permissions",
        ],
        mockup: "crm",
      },
      {
        eyebrow: "Deal channels",
        title: "A dedicated channel for every big deal",
        body: "Automatically create a channel when an opportunity reaches a certain stage or size. Pull in the account team, sales engineers and leadership so everyone works the deal together.",
        bullets: [
          "Auto-create channels by stage or amount",
          "Invite people based on the account team",
          "Pin the record to the channel header",
        ],
        mockup: "chat-channels",
      },
      {
        eyebrow: "Alerts",
        title: "Never miss a change that matters",
        body: "Get notified in a channel or DM when a deal moves stage, a renewal comes due or a high-priority case opens. Set rules by territory, segment or deal size so alerts stay relevant.",
        bullets: [
          "Stage change, renewal and case alerts",
          "Rules by territory, segment or value",
          "Daily digests for pipeline reviews",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "Update from chat",
        title: "Keep records current without the data entry",
        body: `Update fields, log activities and create follow-up tasks with a quick form right in ${B}. ${B} AI can even suggest updates based on call notes and thread discussions.`,
        bullets: [
          "Edit fields and log activities in chat",
          "AI-suggested updates from conversations",
          "Create tasks and follow-ups in one step",
        ],
        mockup: "ai",
      },
    ],
    useCases: [
      {
        icon: "target",
        title: "Enterprise sales",
        body: "Account teams swarm on strategic deals in dedicated channels with live opportunity data pinned at the top.",
      },
      {
        icon: "repeat",
        title: "Customer success",
        body: "CSMs get renewal and health score alerts in their account channels and coordinate expansion plays with sales.",
      },
      {
        icon: "headset",
        title: "Service escalations",
        body: "High-priority cases post to an escalation channel with full customer context, so support and engineering can act fast.",
      },
    ],
    related: ["native-crm", "connect", "workflow-automation"],
    faqs: [
      {
        q: "Which CRMs can we connect?",
        a: "Connected CRM works with leading CRM platforms through prebuilt integrations, and with others through our open APIs and webhooks. Most teams finish setup in under an hour with the guided installer.",
      },
      {
        q: "Do CRM permissions carry over?",
        a: "Yes. Record previews and actions respect the permissions each person has in your CRM, including field-level security. If someone can't see a field in the CRM, they won't see it in a preview either.",
      },
      {
        q: "Is Connected CRM included in our plan?",
        a: "Record previews and alerts are available on Pro and above. Automated deal channels and AI-suggested updates are included on Business+ and Enterprise plans.",
      },
      {
        q: "Should we use Connected CRM or Native CRM?",
        a: "Choose Connected CRM if your team already relies on an established CRM and wants to bring it into the conversation. Native CRM is a better fit for smaller teams that want a lightweight CRM built right into the product.",
      },
    ],
    cta: {
      title: "Bring your pipeline into the conversation",
      subtitle: "Connect your CRM in minutes and give every deal team the context it needs to close.",
    },
  },
  {
    slug: "native-crm",
    href: "/crm",
    name: "Native CRM",
    icon: "contact",
    tone: "mint",
    category: "Connect",
    summary: "A lightweight CRM built right in, with accounts, contacts, a deals pipeline and an AI deal agent.",
    seo: {
      title: "Native CRM Built Into Your Team Workspace",
      description: `Manage accounts, contacts and deals in a lightweight CRM built right into ${B}. Track your whole pipeline and let an AI deal agent handle the follow-ups.`,
    },
    hero: {
      eyebrow: "Native CRM",
      title: "The CRM that lives where your team works",
      highlight: "where your team works",
      subtitle: `Manage accounts, contacts and your whole pipeline without adding another tool. Native CRM is built into ${B}, so customer context sits right beside every conversation.`,
      mockup: "crm-native",
    },
    stats: [
      { value: 10, suffix: " min", label: "average setup time" },
      { value: 42, suffix: "%", label: "more follow-ups sent on time" },
      { value: 3, suffix: "x", label: "faster deal updates" },
    ],
    sections: [
      {
        eyebrow: "Pipeline",
        title: "See every deal at a glance",
        body: "Track deals through customizable stages on a drag-and-drop board. Filter by owner, value or close date and spot stalled opportunities before they slip.",
        bullets: [
          "Drag-and-drop pipeline board",
          "Custom stages, fields and deal types",
          "Forecast totals by stage and owner",
        ],
        mockup: "crm-native",
      },
      {
        eyebrow: "AI deal agent",
        title: "An agent that keeps every deal moving",
        body: "The AI deal agent logs activity from conversations, drafts follow-ups and nudges owners when a deal goes quiet. It also suggests next steps based on what's worked for similar deals.",
        bullets: [
          "Automatic activity logging from chats",
          "Drafted follow-ups for your review",
          "Alerts when deals stall or slip",
        ],
        mockup: "agent",
      },
      {
        eyebrow: "Accounts & contacts",
        title: "Every customer detail in one place",
        body: "Each account gets a profile with contacts, deals, files and conversation history. Link an account to its shared channel and the whole relationship is one click away.",
        bullets: [
          "Account profiles with full history",
          "Contacts linked to channels and DMs",
          "Import from spreadsheets in minutes",
        ],
        mockup: "lists",
      },
      {
        eyebrow: "Collaborate",
        title: "Sell together, right in the channel",
        body: "Discuss deals in threads, loop in a sales engineer with a mention or hop into a huddle to plan your pitch. Record updates post back to the channel so everyone stays aligned.",
        bullets: [
          "Deal threads and mentions",
          "Record updates posted to channels",
          "Huddles linked to deal activity",
        ],
        mockup: "chat-team",
      },
    ],
    useCases: [
      {
        icon: "rocket",
        title: "Startups",
        body: "Founders and early sales hires track their first hundred customers without paying for or maintaining a separate CRM.",
      },
      {
        icon: "handshake",
        title: "Partnerships",
        body: "Partner teams manage relationships, co-selling opportunities and agreements alongside a shared channel with each partner.",
      },
      {
        icon: "store",
        title: "Small businesses",
        body: "Agencies and service businesses keep clients, proposals and projects organized in the same place they talk with their team.",
      },
    ],
    related: ["crm", "ai-agents", "connect"],
    faqs: [
      {
        q: "Who is Native CRM designed for?",
        a: "Native CRM is built for small and growing teams that want a simple, fast way to manage customers without a separate tool. Larger organizations with an established CRM may prefer Connected CRM.",
      },
      {
        q: "Can we import existing contacts and deals?",
        a: "Yes. Import accounts, contacts and deals from a CSV or spreadsheet, and map columns to fields during import. Most teams are up and running in under 10 minutes.",
      },
      {
        q: "Which plans include Native CRM?",
        a: "Native CRM is included on Pro, Business+ and Enterprise plans. The AI deal agent is available on Business+ and Enterprise plans.",
      },
      {
        q: "Can we move to a larger CRM later?",
        a: "Absolutely. Export your data as CSV at any time, or use our APIs to sync with another platform. If you switch, Connected CRM keeps your new system linked to your channels.",
      },
    ],
    cta: {
      title: "Start selling from your workspace",
      subtitle: "Set up Native CRM in minutes and keep every customer conversation and deal in one place.",
    },
  },
  {
    slug: "enterprise-search",
    href: "/features/enterprise-search",
    name: "Enterprise search",
    icon: "search",
    tone: "sky",
    category: "Connect",
    summary: "One search across messages, files and connected apps, with AI answers that respect permissions.",
    seo: {
      title: "Enterprise Search Across Messages, Files and Apps",
      description: `Search messages, files and connected apps from one place with ${B} enterprise search. Get AI answers with citations that always respect permissions.`,
    },
    hero: {
      eyebrow: "Enterprise search",
      title: "One search bar for everything your company knows",
      highlight: "everything your company knows",
      subtitle:
        "Find answers across conversations, documents and the apps your team relies on. AI pulls the pieces together into a clear answer, with sources and permissions intact.",
      mockup: "search",
    },
    stats: [
      { value: 3.6, suffix: " hrs", decimals: 1, label: "saved per employee each week" },
      { value: 50, suffix: "+", label: "connected app sources" },
      { value: 92, suffix: "%", label: "of searches answered on page one" },
    ],
    sections: [
      {
        eyebrow: "Unified search",
        title: "Search every source from one place",
        body: "Messages, files, canvases, lists and records from connected apps all show up in a single set of results. Filters help you narrow by source, person, date or channel in a click.",
        bullets: [
          "Results from messages, files and apps",
          "Filters for source, person and date",
          "Saved searches for recurring questions",
        ],
        mockup: "search",
      },
      {
        eyebrow: "AI answers",
        title: "Ask questions, get answers with citations",
        body: "Ask in plain language and get a concise answer synthesized from multiple sources. Each answer includes citations, so you can verify the details and share the original.",
        bullets: [
          "Synthesized answers from multiple sources",
          "Inline citations to original content",
          "Follow-up questions to refine answers",
        ],
        mockup: "ai",
      },
      {
        eyebrow: "Permission-aware",
        title: "Everyone sees only what they should",
        body: "Search mirrors the access controls in each connected app in real time. If someone can't open a document in its source system, it won't appear in their results or answers.",
        bullets: [
          "Real-time permission sync with connected apps",
          "Admin controls over indexed sources",
          "Audit logs for search activity",
        ],
        mockup: "security",
      },
      {
        eyebrow: "Connected apps",
        title: "Bring in the tools your team already uses",
        body: "Connect cloud drives, wikis, ticketing systems and code repositories in a few clicks. Content is indexed securely and stays fresh as it changes.",
        bullets: [
          "Prebuilt connectors for 50+ apps",
          "Incremental indexing keeps results current",
          "Custom connectors through our APIs",
        ],
        mockup: "files",
      },
    ],
    useCases: [
      {
        icon: "userPlus",
        title: "Onboarding",
        body: "New hires find policies, past decisions and the right experts on their own, ramping up weeks faster.",
      },
      {
        icon: "headset",
        title: "Support and success",
        body: "Agents search tickets, docs and internal discussions at once to find proven fixes for customer issues.",
      },
      {
        icon: "code",
        title: "Engineering",
        body: "Developers search across repos, runbooks and incident channels to understand why a system was built the way it was.",
      },
    ],
    related: ["ai", "slackbot", "document-sharing"],
    faqs: [
      {
        q: "Which apps can enterprise search connect to?",
        a: "Enterprise search includes prebuilt connectors for more than 50 popular cloud drives, wikis, ticketing tools and code hosts. You can also build custom connectors with our APIs for internal systems.",
      },
      {
        q: "How does search handle permissions?",
        a: "Search respects the permissions set in each source app, synced in real time. People only see results and AI answers drawn from content they're already allowed to access.",
      },
      {
        q: "Which plans include enterprise search?",
        a: "Searching messages and files is available on every plan. Connected app sources and AI answers are included on Business+ and Enterprise plans.",
      },
      {
        q: "Is indexed data stored securely?",
        a: "Indexed content is encrypted in transit and at rest and stored in your workspace's data residency region. Admins can remove a source at any time, which also deletes its index.",
      },
    ],
    cta: {
      title: "Find any answer in seconds",
      subtitle: "Connect your key apps and give everyone one place to search across the whole company.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Build                                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "agentic-platform",
    href: "/features/agentic-platform",
    name: "Agentic platform",
    icon: "layers",
    tone: "sun",
    category: "Build",
    summary: "Build, deploy and govern AI agents from any vendor, with guardrails, audit trails and open APIs.",
    seo: {
      title: "Agentic Platform to Build and Govern AI Agents",
      description: `Build, deploy and govern AI agents from any vendor on the ${B} agentic platform, with guardrails, audit trails and open APIs your security team can trust.`,
    },
    hero: {
      eyebrow: "Agentic platform",
      title: "One platform for every agent your company runs",
      highlight: "every agent",
      subtitle:
        "Build your own agents, bring in agents from other vendors and manage them all in one place. Guardrails, permissions and audit trails come standard.",
      mockup: "platform",
    },
    stats: [
      { value: 200, suffix: "+", label: "partner agents available" },
      { value: 70, suffix: "%", label: "faster agent deployment" },
      { value: 99.9, suffix: "%", decimals: 1, label: "platform uptime" },
    ],
    sections: [
      {
        eyebrow: "Build",
        title: "Create agents with low code or full code",
        body: "Use the visual agent builder to define instructions, knowledge and tools, or build with our SDKs and APIs. Test in a sandbox channel before rolling out to your team.",
        bullets: [
          "Visual builder for instructions and tools",
          "SDKs and APIs for custom agents",
          "Sandbox channels for safe testing",
        ],
        mockup: "platform",
      },
      {
        eyebrow: "Bring any agent",
        title: "Agents from any vendor, working together",
        body: "Connect agents built on other platforms through open protocols so they work in channels alongside your own. Employees get one familiar place to work with every agent.",
        bullets: [
          "Open protocols for third-party agents",
          "An agent directory for your organization",
          "Agents hand off work to each other",
        ],
        mockup: "agent",
      },
      {
        eyebrow: "Govern",
        title: "Guardrails your security team will sign off on",
        body: "Set policies for what each agent can see and do, require approvals for sensitive actions and review a complete audit trail. Admins can pause or revoke any agent instantly.",
        bullets: [
          "Data access and action policies per agent",
          "Approval gates for sensitive operations",
          "Full audit logs and usage analytics",
        ],
        mockup: "security",
      },
      {
        eyebrow: "Integrate",
        title: "Connect agents to your systems of record",
        body: "Give agents secure access to your data and tools through managed connectors and APIs. Credentials are vaulted and scoped, so agents only touch what they need.",
        bullets: [
          "Managed connectors to business systems",
          "Scoped, vaulted credentials",
          "Webhooks and event triggers",
        ],
        mockup: "code",
      },
    ],
    useCases: [
      {
        icon: "shieldCheck",
        title: "IT and security leaders",
        body: "Centralize every AI agent across the company under one set of policies, approvals and audit controls.",
      },
      {
        icon: "terminal",
        title: "Developers",
        body: "Build custom agents with SDKs and APIs, then deploy them to the channels where employees already work.",
      },
      {
        icon: "building2",
        title: "Enterprise operations",
        body: "Coordinate agents from multiple vendors across HR, finance and support, with clear ownership and reporting.",
      },
    ],
    related: ["ai-agents", "workflow-automation", "code-channels"],
    faqs: [
      {
        q: "Can we use agents built outside the platform?",
        a: "Yes. The platform supports open agent protocols and APIs, so agents built with other vendors or frameworks can join channels, receive tasks and report results with the same governance as native agents.",
      },
      {
        q: "How do guardrails work?",
        a: "Admins define policies for each agent, including which data sources and tools it can access and which actions need human approval. Policies are enforced at runtime and every action is logged.",
      },
      {
        q: "Which plans include the agentic platform?",
        a: "Building and deploying custom agents is available on Enterprise plans. Business+ plans can use prebuilt and partner agents with standard governance controls.",
      },
      {
        q: "Where is agent data processed?",
        a: "Agent activity is processed within your workspace's security boundary and data residency region. Customer data is never used to train models, and audit logs can be exported to your SIEM.",
      },
    ],
    cta: {
      title: "Build your agent strategy on solid ground",
      subtitle: "Talk with our team about deploying, connecting and governing agents across your organization.",
    },
  },
  {
    slug: "workflow-automation",
    href: "/features/workflow-automation",
    name: "Workflow Builder",
    icon: "workflow",
    tone: "coral",
    category: "Build",
    summary: "Automate routine work with no-code workflows, from simple triggers to multi-step AI processes.",
    seo: {
      title: "Workflow Builder: No-Code Automation for Teams",
      description: `Automate approvals, requests and routine tasks with ${B} Workflow Builder. Combine triggers, steps and AI actions in minutes, with no code required.`,
    },
    hero: {
      eyebrow: "No-code automation",
      title: "Automate the routine, focus on the work that matters",
      highlight: "Automate the routine",
      subtitle:
        "Workflow Builder turns repetitive processes into automations anyone can create. Pick a trigger, add steps and let it run across channels and the apps you already use.",
      mockup: "workflow",
    },
    stats: [
      { value: 200, suffix: "+", label: "ready-to-use templates" },
      { value: 36, suffix: "%", label: "faster approval turnaround" },
      { value: 1, suffix: "M+", label: "workflows run every day" },
    ],
    sections: [
      {
        eyebrow: "Build visually",
        title: "Drag, drop and done",
        body: "Start with a trigger, like a new message, a form submission or a schedule, then add steps to send messages, update lists or call other apps. No code and no waiting on engineering.",
        bullets: [
          "Triggers for messages, forms, schedules and events",
          "Drag-and-drop steps with branching logic",
          "Test runs before you publish",
        ],
        mockup: "workflow",
      },
      {
        eyebrow: "AI steps",
        title: "Add judgment to your automations",
        body: "Drop an AI step into any workflow to summarize a request, classify its urgency or draft a reply. Workflows get smarter without getting harder to build.",
        bullets: [
          "Summarize, classify and extract with AI",
          "Draft responses for human review",
          "Route work based on AI decisions",
        ],
        mockup: "ai",
      },
      {
        eyebrow: "Connect your apps",
        title: "Steps for the tools you already use",
        body: "Hundreds of connectors let workflows create tickets, update records and post to channels across your stack. Custom steps built by your developers appear right alongside the rest.",
        bullets: [
          "Hundreds of prebuilt app connectors",
          "Custom steps via webhooks and APIs",
          "Shared connections managed by admins",
        ],
        mockup: "chat-channels",
      },
      {
        eyebrow: "Templates",
        title: "Start from a proven template",
        body: "Choose from more than 200 templates for onboarding, time-off requests, incident response, standups and more. Customize any template in minutes to match how your team works.",
        bullets: [
          "200+ templates across departments",
          "Customize fields, steps and messages",
          "Share workflows across your organization",
        ],
        mockup: "lists",
      },
    ],
    useCases: [
      {
        icon: "userPlus",
        title: "Employee onboarding",
        body: "HR automates welcome messages, equipment requests and first-week check-ins for every new hire.",
      },
      {
        icon: "check",
        title: "Approvals",
        body: "Finance and legal route purchase, contract and expense approvals to the right person, with reminders until they're done.",
      },
      {
        icon: "clock",
        title: "Daily standups",
        body: "Teams collect async standup updates on a schedule and post a tidy summary to the channel every morning.",
      },
    ],
    related: ["task-list", "ai-agents", "agentic-platform"],
    faqs: [
      {
        q: "Do I need to know how to code?",
        a: "No. Workflow Builder is fully visual, so anyone can create automations by choosing triggers and steps. Developers can extend it with custom steps when you need something unique.",
      },
      {
        q: "Which plans include Workflow Builder?",
        a: "Workflow Builder is available on all paid plans. AI steps are included on Business+ and Enterprise plans, and Enterprise adds admin approval for new workflows and connectors.",
      },
      {
        q: "Are there limits on how often workflows run?",
        a: "Paid plans include generous monthly run limits that cover most teams' needs. Enterprise customers can work with us to raise limits for high-volume automations.",
      },
      {
        q: "Can admins control who builds workflows?",
        a: "Yes. Admins can choose who can create and publish workflows, require approval for workflows that use certain connectors and review all activity in the audit log.",
      },
    ],
    cta: {
      title: "Automate your first workflow today",
      subtitle: "Pick a template, customize it in minutes and let it handle the busywork from here on.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Connect (people)                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "atlas",
    href: "/features/atlas",
    name: `${B} Atlas`,
    icon: "network",
    tone: "pink",
    category: "Connect",
    summary: "Rich employee profiles, org charts and an expertise directory that help people find the right person.",
    seo: {
      title: "Employee Directory, Profiles and Org Charts",
      description: `${B} Atlas gives every employee a rich profile, with interactive org charts and an expertise directory that helps teammates find the right person fast.`,
    },
    hero: {
      eyebrow: "Employee directory",
      title: "Know who's who and who knows what",
      highlight: "who knows what",
      subtitle: `${B} Atlas turns basic profiles into a living company directory. Explore org charts, discover expertise and get to know the people you work with.`,
      mockup: "atlas",
    },
    stats: [
      { value: 47, suffix: "%", label: "faster to find the right expert" },
      { value: 2, suffix: "x", label: "more cross-team connections" },
      { value: 30, suffix: "%", label: "quicker new hire ramp-up" },
    ],
    sections: [
      {
        eyebrow: "Profiles & org charts",
        title: "See who works where, at a glance",
        body: "Rich profiles show role, team, manager, location and working hours, plus custom fields from your HR system. Interactive org charts map reporting lines so you can explore any team in a few clicks.",
        bullets: [
          "Rich profiles with custom fields",
          "Interactive org charts with reporting lines",
          "Local time and working hours on profiles",
        ],
        mockup: "atlas",
      },
      {
        eyebrow: "Expertise directory",
        title: "Find the person who knows the answer",
        body: "Search by skill, project, language or past work to find the right expert anywhere in the company. Atlas also suggests people based on the topics they discuss and the docs they create.",
        bullets: [
          "Search by skill, project or language",
          "Suggested experts from activity signals",
          "Team pages with members and focus areas",
        ],
        mockup: "search",
      },
      {
        eyebrow: "Connect",
        title: "From profile to conversation in one click",
        body: "Message, huddle or schedule time with anyone straight from their profile. See the channels they're active in and the people they work with most, so you have context before you reach out.",
        bullets: [
          "Message or huddle from any profile",
          "Shared channels and frequent collaborators",
          "Warm introductions through mutual teammates",
        ],
        mockup: "chat-team",
      },
      {
        eyebrow: "Always accurate",
        title: "Synced with HR, governed by admins",
        body: "Atlas syncs with your HR system so titles, managers and teams stay current without manual updates. Admins decide which fields are visible, editable or hidden to protect employee privacy.",
        bullets: [
          "Automatic sync with your HR system",
          "Field-level visibility controls",
          "Audit history for profile changes",
        ],
        mockup: "security",
      },
    ],
    useCases: [
      {
        icon: "userPlus",
        title: "New hires",
        body: "New employees explore the org chart and team pages to learn who's who and who to ask during their first weeks.",
      },
      {
        icon: "compass",
        title: "Cross-functional projects",
        body: "Project leads find experts in other departments by skill or past work, building the right team faster.",
      },
      {
        icon: "users",
        title: "People teams",
        body: "HR keeps the directory accurate automatically and uses team pages to support reorgs and workforce planning.",
      },
    ],
    related: ["enterprise-search", "channels", "slackbot"],
    faqs: [
      {
        q: `Which HR systems does ${B} Atlas sync with?`,
        a: "Atlas integrates with leading HR information systems through prebuilt connectors and SCIM. Profile fields, managers and teams update automatically as changes happen in your HR system.",
      },
      {
        q: `Which plans include ${B} Atlas?`,
        a: "Basic profiles are available on every plan. Atlas features like org charts, custom profile fields and the expertise directory are included on Business+ and Enterprise plans.",
      },
      {
        q: "Can employees edit their own profiles?",
        a: "Employees can add skills, a bio, pronouns and other self-managed fields. Fields synced from HR, like title and manager, can only be changed in the source system or by admins.",
      },
      {
        q: "How is employee privacy protected?",
        a: "Admins control which profile fields are visible to everyone, visible only to certain groups or hidden entirely. External partners in shared channels only see basic profile information.",
      },
    ],
    cta: {
      title: "Help everyone find the right person",
      subtitle: `Turn on ${B} Atlas and give your company a living directory of people, teams and expertise.`,
    },
  },
];

export function getFeature(slug: string) {
  return features.find((f) => f.slug === slug);
}

/** Features whose page is rendered by app/features/[slug]. */
export const featureSlugPages = () => features.filter((f) => f.href.startsWith("/features/"));
