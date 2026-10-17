import type { IconName } from "@/components/ui/icon";
import type { MockupKind } from "@/components/mockups";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { Faq, Stat } from "./types";

export type SolutionKind = "department" | "industry" | "use-case";

export type Solution = {
  /** URL slug under /solutions/ */
  slug: string;
  name: string;
  kind: SolutionKind;
  icon: IconName;
  tone: Tone;
  /** One sentence for cards on the solutions overview. */
  summary: string;
  seo: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    /** Substring of `title` rendered with the brand gradient. */
    highlight?: string;
    subtitle: string;
    /** Three short pain points this solution removes (shown struck through). */
    painPoints: string[];
    mockup: MockupKind;
  };
  stats: Stat[];
  benefits: { icon: IconName; title: string; body: string }[];
  workflow: {
    title: string;
    subtitle: string;
    steps: { icon: IconName; title: string; body: string }[];
    mockup: MockupKind;
  };
  quote: { text: string; name: string; role: string; company: string };
  /** Feature slugs from data/features.ts */
  features: string[];
  /** App slugs from data/integrations.ts */
  integrations: string[];
  faqs: Faq[];
  cta: { title: string; subtitle: string };
};

export const solutions: Solution[] = [
  /* ------------------------------------------------------------------ */
  /* Departments                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "engineering",
    name: "Engineering",
    kind: "department",
    icon: "terminal",
    tone: "violet",
    summary: "Ship faster with code channels, incident swarming and AI summaries of every pull request.",
    seo: {
      title: "Engineering collaboration, code reviews and on-call",
      description:
        "Bring pull requests, CI builds, incidents and on-call into code channels. Ship faster with AI summaries, automated workflows and fewer meetings for engineers.",
    },
    hero: {
      eyebrow: "For engineering teams",
      title: "Ship better software without the status-meeting tax",
      highlight: "Ship better software",
      subtitle:
        "Code reviews, deploys and incidents flow into the channels where your team already talks, so engineers spend less time chasing context and more time building.",
      painPoints: [
        "Pull requests waiting days for review",
        "Incident context scattered across tools",
        "Standups that could have been threads",
      ],
      mockup: "code",
    },
    stats: [
      { value: 28, suffix: "%", label: "faster pull request turnaround" },
      { value: 41, suffix: "%", label: "quicker incident resolution" },
      { value: 5, suffix: " hrs", label: "saved per engineer each week" },
    ],
    benefits: [
      {
        icon: "branch",
        title: "Code channels that keep pace",
        body: "Pull requests, review requests and CI results post to the right channel automatically, with AI summaries of every diff.",
      },
      {
        icon: "siren",
        title: "Swarm incidents in seconds",
        body: "Spin up an incident channel from an alert, page on-call and pull in the runbook before the first customer notices.",
      },
      {
        icon: "rocket",
        title: "Deploy with confidence",
        body: "See build status, approve releases and trigger rollbacks from the channel, with a full audit trail of who shipped what.",
      },
      {
        icon: "sparkles",
        title: "AI that speaks engineer",
        body: "Ask AI to summarize a sprawling thread, explain a failing test or draft release notes from last week's merged pull requests.",
      },
      {
        icon: "clock",
        title: "Async standups that actually work",
        body: "Replace the daily status meeting with a scheduled workflow that collects updates and posts a digest by 9:30.",
      },
      {
        icon: "search",
        title: "Find the decision, not just the doc",
        body: "Search across channels, canvases and connected tools to learn why a service was built the way it was.",
      },
    ],
    workflow: {
      title: "From alert to postmortem in one place",
      subtitle:
        "Here is how an on-call engineer at a mid-size software company handles a production incident without switching tools.",
      steps: [
        {
          icon: "bell",
          title: "Alert fires",
          body: "Pagerline detects elevated checkout errors and posts to #ops-alerts with graphs and the affected service.",
        },
        {
          icon: "siren",
          title: "Incident channel opens",
          body: "A workflow creates #inc-checkout-latency, pages the on-call engineer and pins the runbook canvas.",
        },
        {
          icon: "headphones",
          title: "Team swarms in a huddle",
          body: "Engineers jump into a huddle, share screens and roll back the bad deploy straight from Shipyard CI.",
        },
        {
          icon: "file",
          title: "Postmortem drafts itself",
          body: "AI builds a timeline from the channel history, and the team refines it in a canvas before review.",
        },
      ],
      mockup: "huddle",
    },
    quote: {
      text: "We used to lose the first twenty minutes of every incident just finding the right people. Now the channel is open, on-call is paged and the runbook is pinned before anyone asks.",
      name: "Priya Raman",
      role: "VP of Engineering",
      company: "Kestrel Labs",
    },
    features: ["code-channels", "huddles", "ai", "workflow-automation"],
    integrations: ["gitnest", "shipyard-ci", "pagerline", "trackly", "pulsecheck"],
    faqs: [
      {
        q: `Which developer tools connect to ${B}?`,
        a: "Source control, CI/CD, issue trackers, observability and on-call tools all connect from the app directory, and anything else can post in with our APIs and webhooks.",
      },
      {
        q: "Can we keep secrets out of channels?",
        a: "Yes. Data loss prevention rules can detect API keys and tokens before they spread, admins can restrict who posts where, and retention policies can be set per channel.",
      },
      {
        q: "How do AI summaries handle private repositories?",
        a: "AI respects existing permissions, so summaries only draw on channels and connected repositories the requesting engineer can already access. Customer data is never used to train models.",
      },
    ],
    cta: {
      title: "Give your engineers their focus back",
      subtitle: "Start with a code channel and an incident workflow, then grow from there. Free for small teams.",
    },
  },
  {
    slug: "information-technology",
    name: "IT",
    kind: "department",
    icon: "server",
    tone: "sky",
    summary: "Resolve requests, roll out changes and handle incidents in one place, with AI agents triaging first.",
    seo: {
      title: "IT service management and help desk in chat",
      description:
        "Help employees get answers faster with request forms, triage lists and AI agents that resolve common IT issues, so your team can focus on the harder problems.",
    },
    hero: {
      eyebrow: "For IT teams",
      title: "Resolve tickets before they become tickets",
      highlight: "before they become tickets",
      subtitle:
        "Give employees one place to ask for help, let AI agents handle password resets and access requests, and keep your team focused on the work that matters.",
      painPoints: [
        "Help desk queues growing overnight",
        "Password resets eating whole afternoons",
        "Outage updates buried in email",
      ],
      mockup: "agent",
    },
    stats: [
      { value: 38, suffix: "%", label: "of requests resolved without a human" },
      { value: 52, suffix: "%", label: "faster median time to resolution" },
      { value: 4.7, decimals: 1, suffix: "/5", label: "employee satisfaction score" },
    ],
    benefits: [
      {
        icon: "inbox",
        title: "One front door for help",
        body: "Employees ask in #it-help or a DM, and a request form captures device, urgency and details the first time.",
      },
      {
        icon: "bot",
        title: "Agents that resolve, not just route",
        body: "AI agents answer policy questions, reset passwords and grant pre-approved access, escalating to a person only when needed.",
      },
      {
        icon: "listChecks",
        title: "Triage in a shared list",
        body: "Every request lands in a list with owner, priority and SLA fields, so nothing slips between shifts.",
      },
      {
        icon: "key",
        title: "Access approvals in a click",
        body: "Managers approve app access from a message, and the change is logged and synced to your identity provider.",
      },
      {
        icon: "megaphone",
        title: "Outage comms people actually see",
        body: "Post status updates to a broadcast channel and notify affected teams instead of sending yet another all-staff email.",
      },
      {
        icon: "chart",
        title: "Know where the time goes",
        body: "Track volume, resolution time and top request types to decide what to automate next.",
      },
    ],
    workflow: {
      title: "From request to resolution, automatically",
      subtitle: "A new hire needs design software on day one. Here is how the request moves without a single email.",
      steps: [
        {
          icon: "clipboard",
          title: "Employee submits a form",
          body: "A Formcraft request in #it-help captures the app, business reason and manager in under a minute.",
        },
        {
          icon: "listChecks",
          title: "Request lands in the queue",
          body: "A workflow adds it to the IT requests list, tags it Software access and starts the SLA timer.",
        },
        {
          icon: "bot",
          title: "Agent triages and acts",
          body: "The IT agent checks the license pool, asks the manager to approve and provisions access through Keystone ID.",
        },
        {
          icon: "check",
          title: "Employee gets confirmation",
          body: "The requester gets a DM with install steps, and the list item closes with a full audit trail.",
        },
      ],
      mockup: "lists",
    },
    quote: {
      text: "Our agent now handles almost four in ten requests end to end. The team finally has time for the device refresh we postponed for two years.",
      name: "Marcus Bell",
      role: "Director of IT Operations",
      company: "Orbital Freight",
    },
    features: ["ai-agents", "task-list", "workflow-automation", "enterprise-search"],
    integrations: ["formcraft", "keystone-id", "vaultguard", "pagerline", "drivewise"],
    faqs: [
      {
        q: "Can AI agents take actions, or only answer questions?",
        a: "Both. Agents answer from your knowledge base and can run approved actions such as password resets, group changes and license assignments. Admins decide exactly which actions are allowed.",
      },
      {
        q: `Does ${B} replace our existing service desk?`,
        a: `It does not have to. Many teams use ${B} as the front door and sync requests to their service desk, while smaller teams run the entire process in lists and workflows.`,
      },
      {
        q: "How do we track SLAs?",
        a: "Lists support due dates, priority fields and automatic reminders, and workflows can escalate to a team lead when a request is close to breaching its SLA.",
      },
    ],
    cta: {
      title: "Turn your help desk into a help channel",
      subtitle: "Launch an IT request workflow and an AI agent in an afternoon. No code required.",
    },
  },
  {
    slug: "customer-service",
    name: "Customer service",
    kind: "department",
    icon: "headset",
    tone: "coral",
    summary: "Swarm on escalations, give agents instant answers and keep every customer conversation moving forward.",
    seo: {
      title: "Customer service collaboration and case swarming",
      description:
        "Resolve customer cases faster by swarming experts in case channels, surfacing answers with AI and syncing every update back to your support platform.",
    },
    hero: {
      eyebrow: "For customer service teams",
      title: "Every customer answer, one swarm away",
      highlight: "one swarm away",
      subtitle:
        "Bring agents, product experts and engineers together on tough cases in seconds, with AI that surfaces past fixes before anyone has to ask.",
      painPoints: [
        "Escalations stuck in email chains",
        "Agents hunting for tribal knowledge",
        "Customers asked to repeat themselves",
      ],
      mockup: "chat-team",
    },
    stats: [
      { value: 36, suffix: "%", label: "faster case resolution" },
      { value: 2.4, decimals: 1, suffix: "x", label: "more escalations closed same day" },
      { value: 9, suffix: " pts", label: "higher CSAT" },
    ],
    benefits: [
      {
        icon: "users",
        title: "Swarm the right experts",
        body: "Open a case channel from any ticket and pull in product, billing or engineering with one click.",
      },
      {
        icon: "sparkles",
        title: "Answers at agents' fingertips",
        body: "AI searches past cases, help articles and channel history to suggest a fix while the customer is still on the line.",
      },
      {
        icon: "repeat",
        title: "Two-way sync with your helpdesk",
        body: "Updates in the case channel sync back to the ticket, so the customer record always tells the full story.",
      },
      {
        icon: "route",
        title: "Smart routing and escalation",
        body: "Workflows route urgent or high-value cases to senior agents and alert a lead when an SLA is at risk.",
      },
      {
        icon: "heart",
        title: "Close the loop with product",
        body: "Tag feature requests and bugs right from the conversation, and send weekly trends straight to the product team.",
      },
      {
        icon: "smile",
        title: "Ramp new agents faster",
        body: "New hires learn from searchable case history and pinned playbooks instead of shadowing for weeks.",
      },
    ],
    workflow: {
      title: "From escalation to happy customer",
      subtitle: "A high-value customer reports a billing error. Here is how the case gets solved in one afternoon.",
      steps: [
        {
          icon: "ticket",
          title: "Ticket escalates automatically",
          body: "Supportly flags the priority account, and a workflow opens #case-4821 with the full ticket history attached.",
        },
        {
          icon: "users",
          title: "Experts join the swarm",
          body: "Billing and finance are added automatically, and AI posts a summary plus two similar resolved cases.",
        },
        {
          icon: "wallet",
          title: "The fix gets approved",
          body: "The finance lead approves a credit through Ledgerly right in the thread, with the reason logged.",
        },
        {
          icon: "send",
          title: "Customer hears back fast",
          body: "The agent replies from the channel, the update syncs to the ticket, and the case closes with notes for next time.",
        },
      ],
      mockup: "workflow",
    },
    quote: {
      text: "Our agents used to wait a full day for a billing answer. Now they swarm in a case channel and close most escalations before lunch.",
      name: "Danielle Ortiz",
      role: "Senior Manager, Customer Experience",
      company: "Brightline",
    },
    features: ["channels", "ai", "crm", "workflow-automation"],
    integrations: ["supportly", "ledgerly", "surveyo", "pulsecheck", "trackly"],
    faqs: [
      {
        q: `Does ${B} work with our support platform?`,
        a: "Yes. Connect your helpdesk to open case channels from tickets, sync replies in both directions and keep the ticket as your system of record.",
      },
      {
        q: "Can customers see internal discussion in case channels?",
        a: "No. Case channels are internal by default. You choose what goes back to the customer, and only the reply you send syncs to the ticket.",
      },
      {
        q: "How does AI find relevant past cases?",
        a: "AI searches the channels, canvases and connected knowledge sources an agent can already access, then suggests the most similar resolved cases with links to the source.",
      },
    ],
    cta: {
      title: "Make every escalation a team effort",
      subtitle: "Set up case channels and AI answers for your support team in days, not quarters.",
    },
  },
  {
    slug: "sales",
    name: "Sales",
    kind: "department",
    icon: "trending",
    tone: "mint",
    summary: "Close deals faster with deal rooms, CRM updates in the flow of work and AI account briefs.",
    seo: {
      title: "Sales collaboration, deal rooms and CRM in chat",
      description:
        "Close more deals with deal channels, CRM updates in the flow of work, faster quote approvals and AI account briefs that keep every rep ready for the next call.",
    },
    hero: {
      eyebrow: "For sales teams",
      title: "Close bigger deals with your whole team behind you",
      highlight: "your whole team",
      subtitle:
        "Deal channels connect reps, sales engineers, legal and leadership around every opportunity, with CRM data and AI insights right in the conversation.",
      painPoints: [
        "CRM updates nobody has time for",
        "Discount approvals stuck for days",
        "Call prep across five tabs",
      ],
      mockup: "crm",
    },
    stats: [
      { value: 26, suffix: "%", label: "shorter sales cycles" },
      { value: 19, suffix: "%", label: "higher win rates" },
      { value: 4, suffix: " hrs", label: "saved per rep each week" },
    ],
    benefits: [
      {
        icon: "handshake",
        title: "Deal rooms for every opportunity",
        body: "Open a channel for each strategic deal so reps, solutions engineers and executives share context in one place.",
      },
      {
        icon: "database",
        title: "CRM updates without the busywork",
        body: "Update stages, next steps and close dates from a message, and get alerts when key fields change.",
      },
      {
        icon: "sparkles",
        title: "AI account briefs before every call",
        body: "Get a summary of recent conversations, open risks and stakeholder notes moments before you dial in.",
      },
      {
        icon: "check",
        title: "Approvals at deal speed",
        body: "Route discount and non-standard term requests to finance and legal, with approve and reject buttons in the thread.",
      },
      {
        icon: "globe",
        title: "Shared channels with buyers",
        body: "Invite champions into a secure shared channel to answer questions and move paperwork faster than email.",
      },
      {
        icon: "trending",
        title: "Pipeline visibility for leaders",
        body: "Daily pipeline digests and big-win alerts keep managers informed without another forecast meeting.",
      },
    ],
    workflow: {
      title: "From first call to signed contract",
      subtitle: "Here is how an account executive moves a six-figure deal from discovery to closed-won.",
      steps: [
        {
          icon: "handshake",
          title: "Deal channel spins up",
          body: "When an opportunity reaches Stage 2, a workflow opens #deal-northwind and invites the full account team.",
        },
        {
          icon: "sparkles",
          title: "AI preps the next call",
          body: "Before each meeting, AI posts a brief with recent emails, open questions and the buyer's org chart.",
        },
        {
          icon: "receipt",
          title: "Pricing gets approved",
          body: "The rep requests a 12% discount in DealDesk, finance approves in the thread, and the quote updates automatically.",
        },
        {
          icon: "fileSignature",
          title: "Signed and celebrated",
          body: "Signflow notifies the channel the moment the buyer signs, and the win posts to #sales-wins.",
        },
      ],
      mockup: "crm-native",
    },
    quote: {
      text: "Deal channels changed how we sell. Legal, finance and our sales engineers are in the room from day one, so nothing stalls at the finish line.",
      name: "Jordan Ellis",
      role: "Regional Vice President, Sales",
      company: "Copperleaf",
    },
    features: ["crm", "native-crm", "connect", "ai"],
    integrations: ["dealdesk", "signflow", "calendo", "meetbox", "datalake-hub"],
    faqs: [
      {
        q: `Which CRMs work with ${B}?`,
        a: "Connect leading CRMs from the app directory, or use the built-in CRM to manage accounts, contacts and pipeline without leaving your workspace.",
      },
      {
        q: "Is it secure to work with buyers in shared channels?",
        a: "Yes. Each organization keeps its data under its own admin controls, and you can limit external members to specific channels and disconnect at any time.",
      },
      {
        q: "Do reps still have to update the CRM by hand?",
        a: "Far less. Reps can update records from messages, and AI suggests field updates from call notes and channel activity for a quick one-click review.",
      },
    ],
    cta: {
      title: "Give every deal a war room",
      subtitle: "Connect your CRM and launch deal channels in minutes. Your reps will feel the difference this quarter.",
    },
  },
  {
    slug: "project-management",
    name: "Project management",
    kind: "department",
    icon: "kanban",
    tone: "sun",
    summary: "Keep every project visible from kickoff to launch with lists, canvases and automated status updates.",
    seo: {
      title: "Project management with lists, canvases and chat",
      description:
        "Plan projects, track tasks and share status where your team already talks. Lists, canvases and automated updates keep every stakeholder aligned through launch.",
    },
    hero: {
      eyebrow: "For project managers",
      title: "Keep every project moving and everyone in the loop",
      highlight: "every project moving",
      subtitle:
        "Plan in canvases, track work in lists and let workflows send the status updates, so you spend your week unblocking people instead of chasing them.",
      painPoints: ["Status reports nobody reads", "Deadlines missed in silence", "Plans scattered across five tools"],
      mockup: "lists",
    },
    stats: [
      { value: 32, suffix: "%", label: "fewer status meetings" },
      { value: 23, suffix: "%", label: "more projects delivered on time" },
      { value: 6, suffix: " hrs", label: "saved per PM each week" },
    ],
    benefits: [
      {
        icon: "kanban",
        title: "Lists that live in the conversation",
        body: "Track tasks, owners and due dates in lists attached to the project channel, with board, table and calendar views.",
      },
      {
        icon: "template",
        title: "Plans in a living canvas",
        body: "Keep the project brief, timeline and decision log in a canvas that evolves as the project does.",
      },
      {
        icon: "workflow",
        title: "Status updates on autopilot",
        body: "Workflows collect weekly updates from owners and post a clean summary to stakeholders every Friday.",
      },
      {
        icon: "alert",
        title: "Spot risk before it spreads",
        body: "Get alerted when tasks slip past their due dates or a blocker sits unresolved for more than a day.",
      },
      {
        icon: "headphones",
        title: "Unblock in minutes, not meetings",
        body: "Jump into a quick huddle from the project channel to clear a blocker, then capture the decision in the thread.",
      },
      {
        icon: "sparkles",
        title: "AI catch-ups for busy stakeholders",
        body: "Executives get an AI recap of what changed, what is at risk and what needs their decision this week.",
      },
    ],
    workflow: {
      title: "From kickoff to launch day",
      subtitle: "A product launch with twelve contributors across four teams, managed in a single channel.",
      steps: [
        {
          icon: "rocket",
          title: "Kick off with a template",
          body: "Start a project channel from a template that includes a brief canvas, a task list and a launch checklist.",
        },
        {
          icon: "listTodo",
          title: "Assign and track work",
          body: "Break the plan into tasks with owners and due dates, and view them as a board or a calendar.",
        },
        {
          icon: "repeat",
          title: "Automate the check-ins",
          body: "Every Thursday a workflow asks each owner for progress and blockers, then posts the digest to stakeholders.",
        },
        {
          icon: "check",
          title: "Launch and look back",
          body: "Close out the checklist on launch day, and AI drafts a retrospective from the channel history.",
        },
      ],
      mockup: "canvas",
    },
    quote: {
      text: "I used to spend Monday mornings assembling status decks. Now the updates assemble themselves, and I spend that time actually removing blockers.",
      name: "Hannah Okafor",
      role: "Senior Program Manager",
      company: "Juniper Studios",
    },
    features: ["task-list", "canvas", "workflow-automation", "huddles"],
    integrations: ["trackly", "calendo", "notely", "drivewise", "paletta"],
    faqs: [
      {
        q: "Can lists replace our project management tool?",
        a: "For many teams, yes. Lists support custom fields, multiple views, due dates and automations. If you rely on a dedicated tool, connect it so updates flow into your project channels.",
      },
      {
        q: "How do automated status updates work?",
        a: "A workflow sends each owner a short form on a schedule, compiles the answers and posts a summary to the stakeholder channel, nudging anyone who has not replied.",
      },
      {
        q: "Can external partners see our project lists?",
        a: "Only if you choose. Lists and canvases in a shared channel are visible to its external members, and you control who can edit them.",
      },
    ],
    cta: {
      title: "Run your next project in one place",
      subtitle: "Start from a project template with a channel, canvas and task list ready to go.",
    },
  },
  {
    slug: "marketing",
    name: "Marketing",
    kind: "department",
    icon: "megaphone",
    tone: "pink",
    summary: "Launch campaigns faster with streamlined reviews, agency collaboration and real-time performance insights.",
    seo: {
      title: "Marketing team collaboration and campaign launches",
      description:
        "Plan campaigns, route creative approvals and work with agencies in shared channels. Get performance digests where your team works and launch faster every time.",
    },
    hero: {
      eyebrow: "For marketing teams",
      title: "Launch campaigns faster, with every stakeholder aligned",
      highlight: "Launch campaigns faster",
      subtitle:
        "Bring creative, product, legal and agencies into one flow from brief to launch to results, without another review-by-email marathon.",
      painPoints: [
        "Creative feedback in twelve threads",
        "Legal review blocking launch day",
        "Agency updates lost in inboxes",
      ],
      mockup: "messaging",
    },
    stats: [
      { value: 30, suffix: "%", label: "faster campaign launches" },
      { value: 2, suffix: "x", label: "quicker creative approvals" },
      { value: 44, suffix: "%", label: "fewer review emails" },
    ],
    benefits: [
      {
        icon: "template",
        title: "Briefs everyone can build on",
        body: "Draft campaign briefs in a canvas with goals, audiences and timelines, then gather comments inline.",
      },
      {
        icon: "palette",
        title: "Creative reviews in one thread",
        body: "Share design previews, collect consolidated feedback and mark versions approved without leaving the channel.",
      },
      {
        icon: "gavel",
        title: "Approvals at launch speed",
        body: "Route copy to legal and brand with a workflow that tracks every sign-off and nudges reviewers automatically.",
      },
      {
        icon: "handshake",
        title: "Agencies in the room",
        body: "Work with agencies and freelancers in shared channels, with briefs, files and timelines in one secure place.",
      },
      {
        icon: "chart",
        title: "Results where you work",
        body: "Campaign performance digests post every morning, so you can double down on what is working the same day.",
      },
      {
        icon: "sparkles",
        title: "AI for the first draft",
        body: "Generate headline variations, social posts and launch recaps grounded in your brief and brand guidelines.",
      },
    ],
    workflow: {
      title: "From brief to launch to results",
      subtitle: "A product marketing team ships a seasonal campaign across email, social and paid media.",
      steps: [
        {
          icon: "pen",
          title: "Brief in a canvas",
          body: "The campaign lead drafts the brief, tags owners and links the asset checklist in #launch-spring.",
        },
        {
          icon: "palette",
          title: "Creative review in thread",
          body: "Designers post Paletta previews, stakeholders comment in one thread, and the final version is marked approved.",
        },
        {
          icon: "gavel",
          title: "Legal signs off",
          body: "A workflow routes copy to legal, logs the approval and alerts the team the moment everything is green.",
        },
        {
          icon: "chart",
          title: "Launch and learn",
          body: "Mailwave and Pulsecheck post daily performance digests, and the team shifts spend within hours.",
        },
      ],
      mockup: "workflow",
    },
    quote: {
      text: "We cut our launch cycle from six weeks to four. The biggest win was getting legal and our agency into the same channel as our designers.",
      name: "Sofia Lindqvist",
      role: "Head of Brand Marketing",
      company: "Lumen & Co",
    },
    features: ["canvas", "connect", "workflow-automation", "ai"],
    integrations: ["paletta", "mailwave", "surveyo", "pulsecheck", "drivewise"],
    faqs: [
      {
        q: "Can agencies join without full access to our workspace?",
        a: "Yes. Invite agencies to shared channels or as guests limited to specific channels, so they only see the campaigns they work on.",
      },
      {
        q: "How do we keep track of creative approvals?",
        a: "Use a workflow or list to record each review step, approver and timestamp, giving you an audit trail for every asset that goes live.",
      },
      {
        q: "Will AI drafts match our brand voice?",
        a: "Ground AI in your brand guidelines canvas and past approved copy so drafts start closer to your voice. A person always reviews before anything ships.",
      },
    ],
    cta: {
      title: "Launch your next campaign together",
      subtitle: "Bring your team, agencies and approvals into one place and ship with confidence.",
    },
  },
  {
    slug: "human-resources",
    name: "Human Resources",
    kind: "department",
    icon: "users",
    tone: "violet",
    summary: "Onboard new hires, answer policy questions instantly and keep every employee connected and supported.",
    seo: {
      title: "HR onboarding and employee experience in one place",
      description:
        "Onboard new hires with automated workflows, answer policy questions with AI agents and keep employees engaged with announcements, recognition and pulse surveys.",
    },
    hero: {
      eyebrow: "For HR and people teams",
      title: "Make every employee feel supported from day one",
      highlight: "from day one",
      subtitle:
        "Automate onboarding, give employees instant answers to policy questions and build a culture people want to stay in, wherever they work.",
      painPoints: [
        "Onboarding checklists on spreadsheets",
        "Same benefits question, fifty times",
        "Announcements nobody reads",
      ],
      mockup: "bot",
    },
    stats: [
      { value: 40, suffix: "%", label: "faster new hire ramp-up" },
      { value: 60, suffix: "%", label: "fewer repetitive policy questions" },
      { value: 87, suffix: "%", label: "pulse survey participation" },
    ],
    benefits: [
      {
        icon: "userPlus",
        title: "Onboarding that runs itself",
        body: "Workflows welcome new hires, introduce their buddy, share day-one tasks and check in after the first week.",
      },
      {
        icon: "bot",
        title: "An HR agent on call around the clock",
        body: "AI agents answer questions about leave, benefits and payroll from your policies, and hand sensitive topics to a person.",
      },
      {
        icon: "megaphone",
        title: "Announcements that land",
        body: "Share company news in announcement channels with reactions and threaded Q&A instead of emails that go unread.",
      },
      {
        icon: "award",
        title: "Recognition in the open",
        body: "Celebrate wins, anniversaries and shout-outs in a kudos channel that makes appreciation part of everyday work.",
      },
      {
        icon: "smile",
        title: "Listen with pulse surveys",
        body: "Run quick surveys in a DM and see engagement trends by team without sending people to another tool.",
      },
      {
        icon: "lock",
        title: "Private where it matters",
        body: "Handle employee relations cases in private channels with strict access controls and retention settings.",
      },
    ],
    workflow: {
      title: "A first week new hires rave about",
      subtitle: "Here is how a people team onboards a new hire across three time zones without a single spreadsheet.",
      steps: [
        {
          icon: "fileSignature",
          title: "Offer accepted",
          body: "When HireLoop marks the offer signed, a workflow builds the onboarding list and alerts IT and the hiring manager.",
        },
        {
          icon: "send",
          title: "Welcome on day one",
          body: "The new hire gets a welcome DM with their schedule, their buddy and the channels to join first.",
        },
        {
          icon: "bot",
          title: "Questions answered instantly",
          body: "The HR agent answers questions about benefits enrollment and pay dates, citing the relevant policy each time.",
        },
        {
          icon: "check",
          title: "Check in at day thirty",
          body: "A short survey goes out automatically, and the results roll up to the people team for follow-up.",
        },
      ],
      mockup: "workflow",
    },
    quote: {
      text: "New hires used to spend their first week waiting on access and answers. Now they ship something by day three, and our team fields a fraction of the questions.",
      name: "Aisha Grant",
      role: "VP of People",
      company: "Northwind",
    },
    features: ["ai-agents", "workflow-automation", "channels", "canvas"],
    integrations: ["hireloop", "roster", "surveyo", "signflow", "expensio"],
    faqs: [
      {
        q: "Can the HR agent handle sensitive questions?",
        a: "The agent answers general policy questions and routes anything sensitive, such as medical leave or workplace concerns, to the right HR partner in a private conversation.",
      },
      {
        q: "How do we onboard employees who do not sit at a desk?",
        a: "New hires can complete onboarding on mobile, with tasks, videos and policy acknowledgments delivered in DMs they can open from any device.",
      },
      {
        q: `Can ${B} connect to our HR system?`,
        a: "Yes. Connect your HRIS so new hire, role change and departure events trigger workflows automatically and profile fields stay current.",
      },
    ],
    cta: {
      title: "Build a workplace people want to join",
      subtitle: "Launch automated onboarding and an HR agent in days, and get time back for the people work that matters.",
    },
  },
  {
    slug: "security",
    name: "Security",
    kind: "department",
    icon: "lock",
    tone: "sky",
    summary: "Detect, triage and respond to threats together, with automated enrichment and enterprise-grade controls.",
    seo: {
      title: "Security operations and incident response in chat",
      description:
        "Triage alerts faster with automated enrichment, coordinate incident response in channels and keep your own workspace locked down with enterprise controls.",
    },
    hero: {
      eyebrow: "For security teams",
      title: "Detect, triage and respond as one team",
      highlight: "respond as one team",
      subtitle:
        "Route alerts into channels with context attached, swarm incidents in seconds and automate the repetitive steps, all on a platform built to enterprise security standards.",
      painPoints: [
        "Alert fatigue drowning real threats",
        "Incident updates across six tools",
        "Manual enrichment slowing response",
      ],
      mockup: "security",
    },
    stats: [
      { value: 47, suffix: "%", label: "faster mean time to respond" },
      { value: 70, suffix: "%", label: "of alerts enriched automatically" },
      { value: 12, suffix: " min", label: "median time to engage responders" },
    ],
    benefits: [
      {
        icon: "radar",
        title: "Alerts with context attached",
        body: "Security alerts arrive in triage channels already enriched with asset owner, threat intel and recent activity.",
      },
      {
        icon: "siren",
        title: "Incident channels on demand",
        body: "Declare an incident from any alert and automatically assemble responders, legal and comms in a private channel.",
      },
      {
        icon: "zap",
        title: "Automate the playbook",
        body: "Workflows run containment steps like disabling accounts or isolating devices, with human approval at every critical step.",
      },
      {
        icon: "key",
        title: "Access reviews in minutes",
        body: "Send quarterly access reviews to managers as messages they can approve or revoke in a single tap.",
      },
      {
        icon: "shieldCheck",
        title: "Locked down by default",
        body: "Enterprise key management, data loss prevention and granular retention protect the workspace itself.",
      },
      {
        icon: "fileSearch",
        title: "Audit-ready evidence",
        body: "Every action, approval and message in an incident is preserved and exportable for audits and post-incident review.",
      },
    ],
    workflow: {
      title: "From suspicious sign-in to contained threat",
      subtitle: "Here is how a security team handles a compromised credential in under fifteen minutes.",
      steps: [
        {
          icon: "alert",
          title: "Risky sign-in detected",
          body: "Keystone ID flags an impossible-travel login and posts it to #sec-triage with user, location and device details.",
        },
        {
          icon: "scan",
          title: "Alert enriched automatically",
          body: "A workflow pulls threat intel and recent activity from Vaultguard and scores the alert as high severity.",
        },
        {
          icon: "lock",
          title: "Account contained",
          body: "The analyst suspends sessions and forces a password reset, with approval from the on-call lead in the thread.",
        },
        {
          icon: "fileCheck",
          title: "Closed and documented",
          body: "AI drafts the incident report from the channel timeline, and the evidence is retained for audit.",
        },
      ],
      mockup: "workflow",
    },
    quote: {
      text: "We stopped copying alerts between tools. Triage, containment and documentation happen in one channel, and our response times dropped by almost half.",
      name: "Ethan Brooks",
      role: "Head of Security Operations",
      company: "Fieldstone Credit Union",
    },
    features: ["workflow-automation", "ai-agents", "channels", "enterprise-search"],
    integrations: ["vaultguard", "keystone-id", "pagerline", "datalake-hub", "trackly"],
    faqs: [
      {
        q: "How are incident channels kept confidential?",
        a: "Incident channels can be private by default, restricted to approved responders and covered by retention and legal hold policies, so sensitive details stay contained.",
      },
      {
        q: `What security controls protect ${B} itself?`,
        a: "Enterprise plans include enterprise key management, SSO and SCIM, data loss prevention, audit logs, data residency options and granular retention settings.",
      },
      {
        q: "Can automated actions run without human review?",
        a: "You decide. Low-risk enrichment can run automatically, while actions like disabling an account can require approval from a named responder before they execute.",
      },
    ],
    cta: {
      title: "Respond faster, together",
      subtitle: "Connect your security tools and set up a triage channel with automated enrichment today.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Industries                                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "manufacturing",
    name: "Manufacturing, auto and energy",
    kind: "industry",
    icon: "factory",
    tone: "sun",
    summary: "Connect frontline crews, engineers and suppliers to keep lines running and every shift safe.",
    seo: {
      title: "Collaboration for manufacturing, auto and energy",
      description:
        "Connect plant floors, field crews and suppliers in real time. Resolve downtime faster, share safety updates instantly and keep every shift aligned on mobile.",
    },
    hero: {
      eyebrow: "For manufacturing, auto and energy",
      title: "Keep lines running and every crew connected",
      highlight: "every crew connected",
      subtitle:
        "Bring frontline workers, engineers, suppliers and leadership into one place, so downtime gets fixed faster and safety updates reach every shift.",
      painPoints: ["Downtime reported by phone tag", "Shift handoffs on paper", "Supplier delays discovered too late"],
      mockup: "chat-channels",
    },
    stats: [
      { value: 31, suffix: "%", label: "faster downtime resolution" },
      { value: 22, suffix: "%", label: "fewer delayed supplier shipments" },
      { value: 18, suffix: " min", label: "saved on every shift handoff" },
    ],
    benefits: [
      {
        icon: "phone",
        title: "Built for the frontline",
        body: "Operators and field techs report issues from their phones with photos, location and voice notes in seconds.",
      },
      {
        icon: "wrench",
        title: "Downtime fixed faster",
        body: "Route equipment alerts to the right maintenance crew with machine history attached, and track every fix to closure.",
      },
      {
        icon: "shieldCheck",
        title: "Safety updates every shift sees",
        body: "Broadcast safety notices and near-miss reports to every site, with acknowledgments tracked by crew and shift.",
      },
      {
        icon: "repeat",
        title: "Clean shift handoffs",
        body: "A handoff workflow captures open issues, line status and notes so the next shift starts fully informed.",
      },
      {
        icon: "truck",
        title: "Suppliers in the loop",
        body: "Coordinate parts, quality issues and delivery changes with suppliers in shared channels instead of email chains.",
      },
      {
        icon: "gauge",
        title: "Plant data where decisions happen",
        body: "Production, quality and energy metrics post on a schedule, with alerts when a line drifts out of tolerance.",
      },
    ],
    workflow: {
      title: "From machine alert to line back up",
      subtitle: "A packaging line goes down on second shift. Here is how the plant gets it running again.",
      steps: [
        {
          icon: "alert",
          title: "Sensor flags a fault",
          body: "A vibration alert from Line 4 posts to #maint-plant2 with the machine ID, fault code and last service date.",
        },
        {
          icon: "phone",
          title: "Technician responds on mobile",
          body: "The on-shift technician claims the alert, posts photos from the floor and pulls up the repair procedure.",
        },
        {
          icon: "package",
          title: "Part sourced from the supplier",
          body: "A replacement bearing is requested in a shared channel with the supplier, who confirms same-day delivery.",
        },
        {
          icon: "check",
          title: "Line restored and logged",
          body: "The fix is logged to the maintenance list, and the shift handoff notes the root cause for the morning crew.",
        },
      ],
      mockup: "lists",
    },
    quote: {
      text: "Our technicians used to walk the floor looking for a supervisor. Now an alert reaches the right person in seconds, and unplanned downtime is down nearly a third.",
      name: "Luis Navarro",
      role: "Plant Operations Manager",
      company: "Atlas Motors",
    },
    features: ["channels", "connect", "workflow-automation", "clips"],
    integrations: ["formcraft", "roster", "pulsecheck", "datalake-hub", "drivewise"],
    faqs: [
      {
        q: "Do frontline workers need a company email to join?",
        a: "No. Admins can provision frontline workers with phone-based sign-in and limit them to the channels relevant to their site and shift.",
      },
      {
        q: "Can we connect plant systems and sensors?",
        a: "Yes. Use webhooks, APIs or a connector from your industrial monitoring platform to post equipment alerts and production metrics into channels.",
      },
      {
        q: "How do we work with suppliers securely?",
        a: "Shared channels give each supplier a dedicated space, while each organization keeps control over its own data, members and retention policies.",
      },
    ],
    cta: {
      title: "Connect every line, site and supplier",
      subtitle: "See how plants and field teams reduce downtime and keep crews safe with one connected platform.",
    },
  },
  {
    slug: "technology",
    name: "Technology",
    kind: "industry",
    icon: "cpu",
    tone: "violet",
    summary: "Scale fast-moving tech companies with connected teams, automated workflows and AI in every channel.",
    seo: {
      title: "Collaboration platform for technology companies",
      description:
        "Help fast-growing tech companies ship, sell and support at scale with code channels, shared channels with customers and AI agents that handle the busywork.",
    },
    hero: {
      eyebrow: "For technology companies",
      title: "Build, ship and scale at startup speed",
      highlight: "at startup speed",
      subtitle:
        "From the first engineer to the thousandth, give every team one place to build products, close deals and support customers, with AI that keeps pace.",
      painPoints: [
        "Tool sprawl at every growth stage",
        "Context lost between product teams",
        "Customers waiting on engineering answers",
      ],
      mockup: "platform",
    },
    stats: [
      { value: 33, suffix: "%", label: "faster time to market" },
      { value: 2.5, decimals: 1, suffix: "x", label: "faster employee onboarding" },
      { value: 25, suffix: "%", label: "less time spent in meetings" },
    ],
    benefits: [
      {
        icon: "code",
        title: "Engineering in the flow",
        body: "Code channels, deploy notifications and incident workflows keep developers shipping without switching tabs.",
      },
      {
        icon: "globe",
        title: "Closer to customers",
        body: "Shared channels with key accounts turn feedback into features and help you resolve issues well before renewal.",
      },
      {
        icon: "bot",
        title: "AI agents for every team",
        body: "Deploy agents that answer product questions, triage bugs and draft release notes, grounded in your own data.",
      },
      {
        icon: "blocks",
        title: "A platform you can build on",
        body: "Use APIs, custom workflow steps and internal apps to shape the workspace around how your company actually works.",
      },
      {
        icon: "rocket",
        title: "Onboarding that scales",
        body: "New hires find docs, decisions and owners through search and channel history instead of tapping shoulders.",
      },
      {
        icon: "shield",
        title: "Enterprise-ready from day one",
        body: "SSO, audit logs and data residency options grow with you from your first funding round to going public.",
      },
    ],
    workflow: {
      title: "From customer feedback to shipped feature",
      subtitle: "A B2B software company closes the loop between customers, product and engineering in a single sprint.",
      steps: [
        {
          icon: "message",
          title: "A customer flags a need",
          body: "A champion at Northwind asks for a bulk export option in your shared channel, and the account manager tags it.",
        },
        {
          icon: "listChecks",
          title: "Product triages the request",
          body: "A workflow adds it to the feedback list, where AI groups it with eleven similar requests from other accounts.",
        },
        {
          icon: "branch",
          title: "Engineering builds it",
          body: "The feature moves through a code channel with pull request summaries and Shipyard CI deploy notifications.",
        },
        {
          icon: "send",
          title: "The customer hears it shipped",
          body: "The account manager shares the release note in the shared channel the same day it goes live.",
        },
      ],
      mockup: "chat-connect",
    },
    quote: {
      text: "We grew from 80 to 900 people in three years, and this is the one tool that scaled with us. Every new team plugs into the same channels, workflows and agents on day one.",
      name: "Rachel Kim",
      role: "Chief Operating Officer",
      company: "Parallax Systems",
    },
    features: ["code-channels", "connect", "ai-agents", "agentic-platform"],
    integrations: ["gitnest", "shipyard-ci", "trackly", "supportly", "keystone-id"],
    faqs: [
      {
        q: `Is ${B} a fit for both startups and large tech companies?`,
        a: "Yes. Small teams can start free with channels and huddles, and enterprise plans add advanced security, compliance and administration as you grow to thousands of employees.",
      },
      {
        q: "Can we build our own agents and apps?",
        a: "Yes. Developers can build custom agents and apps with our APIs and SDKs, publish workflow steps and connect internal services with governed access.",
      },
      {
        q: "How do shared channels with customers work?",
        a: "Invite people from another organization into a channel you both use. Each company keeps its own admin controls, and either side can disconnect at any time.",
      },
    ],
    cta: {
      title: "Scale without the sprawl",
      subtitle: "Give every team at your company one place to work with people, apps and agents.",
    },
  },
  {
    slug: "media",
    name: "Media",
    kind: "industry",
    icon: "clapperboard",
    tone: "coral",
    summary: "Hit every deadline with newsroom channels, fast editorial approvals and secure freelancer collaboration.",
    seo: {
      title: "Collaboration for newsrooms, studios and publishers",
      description:
        "Break news faster and hit every production deadline with newsroom channels, streamlined editorial approvals, media file previews and secure freelancer access.",
    },
    hero: {
      eyebrow: "For media and entertainment",
      title: "Break the story first and hit every deadline",
      highlight: "Break the story first",
      subtitle:
        "Connect reporters, editors, producers and freelancers in real time, from breaking news to post-production, with approvals that move as fast as the news cycle.",
      painPoints: ["Breaking news stuck in inboxes", "Edits lost across file versions", "Freelancers outside the loop"],
      mockup: "chat-channels",
    },
    stats: [
      { value: 37, suffix: "%", label: "faster story turnaround" },
      { value: 3, suffix: "x", label: "quicker editorial sign-off" },
      { value: 50, suffix: "%", label: "fewer production status meetings" },
    ],
    benefits: [
      {
        icon: "news",
        title: "A newsroom in every channel",
        body: "Organize beats, desks and live events in channels so the right editors see a tip the moment it lands.",
      },
      {
        icon: "zap",
        title: "Breaking news, instantly",
        body: "Alerts from wire services, social monitoring and tip lines post to the desk channel with the source attached.",
      },
      {
        icon: "check",
        title: "Sign-off at deadline speed",
        body: "Route drafts through copy, legal and standards with a workflow that tracks every approval before publish.",
      },
      {
        icon: "film",
        title: "Production in one place",
        body: "Share cuts, review clips and track post-production tasks with editors, producers and outside studios.",
      },
      {
        icon: "users",
        title: "Freelancers and partners, securely",
        body: "Give stringers and co-production partners access to just the channels they need, then remove it when the project wraps.",
      },
      {
        icon: "search",
        title: "Find any source or asset",
        body: "Search past coverage, interview notes and approved assets across channels and connected storage.",
      },
    ],
    workflow: {
      title: "From tip to published story",
      subtitle: "Here is how a digital newsroom turns a breaking tip into a fact-checked, published story in under an hour.",
      steps: [
        {
          icon: "bell",
          title: "A tip hits the desk",
          body: "A source tip posts to #metro-desk, and the assigning editor claims it with a reaction.",
        },
        {
          icon: "pen",
          title: "The reporter files a draft",
          body: "The reporter writes in a canvas linked to the story, with notes, photos and quotes in one place.",
        },
        {
          icon: "gavel",
          title: "Standards and legal sign off",
          body: "A workflow routes the draft to copy and legal, who approve in the thread and flag one line for revision.",
        },
        {
          icon: "send",
          title: "The story goes live",
          body: "The publish confirmation posts to the channel, and the social and newsletter teams pick it up instantly.",
        },
      ],
      mockup: "canvas",
    },
    quote: {
      text: "When a story breaks, every minute counts. Our desks, photo team and lawyers now work in the same channel, and we routinely publish verified stories ahead of competitors.",
      name: "Nora Whitfield",
      role: "Managing Editor",
      company: "Tidewater Media",
    },
    features: ["channels", "clips", "document-sharing", "workflow-automation"],
    integrations: ["drivewise", "paletta", "signflow", "meetbox", "mailwave"],
    faqs: [
      {
        q: "Can freelancers access only specific stories?",
        a: "Yes. Add freelancers as guests limited to specific channels, set an expiration date on their access and keep the rest of your workspace private.",
      },
      {
        q: "Can we review video and large media files?",
        a: "Share files and clips in channels with inline previews, and connect your cloud storage or asset management system to review larger files without downloading them.",
      },
      {
        q: "How do we protect embargoed or sensitive stories?",
        a: "Use private channels with restricted membership, retention policies and audit logs to keep embargoed coverage and confidential sources protected.",
      },
    ],
    cta: {
      title: "Give your newsroom a head start",
      subtitle: "See how publishers and studios meet tighter deadlines with fewer handoffs.",
    },
  },
  {
    slug: "small-business",
    name: "Small business",
    kind: "industry",
    icon: "store",
    tone: "mint",
    summary: "Run your whole business in one place, from team chat to client work, without the IT overhead.",
    seo: {
      title: "Team chat and simple workflows for small businesses",
      description:
        "Run your small business from one place. Chat with your team, collaborate with clients, automate everyday tasks and get AI help, with a free plan to get started.",
    },
    hero: {
      eyebrow: "For small businesses",
      title: "Run your whole business from one place",
      highlight: "your whole business",
      subtitle:
        "Talk to your team, work with clients and automate the busywork in a single app that takes minutes to set up and grows as you do.",
      painPoints: ["Group texts for work decisions", "Client files lost in email", "Too many apps, not enough time"],
      mockup: "chat",
    },
    stats: [
      { value: 5, suffix: " hrs", label: "saved per person each week" },
      { value: 10, suffix: " min", label: "average time to set up" },
      { value: 32, suffix: "%", label: "fewer internal emails" },
    ],
    benefits: [
      {
        icon: "messages",
        title: "Every conversation, organized",
        body: "Swap scattered group texts for channels by project, location or client, so everyone knows where to look.",
      },
      {
        icon: "handshake",
        title: "Work with clients like a team",
        body: "Invite clients and contractors into shared channels to approve work, share files and answer questions faster.",
      },
      {
        icon: "wand",
        title: "Automate the repetitive stuff",
        body: "Build simple workflows for time-off requests, opening checklists or new client intake, with no code.",
      },
      {
        icon: "sparkles",
        title: "AI that saves you hours",
        body: "Catch up on busy channels, draft client replies and summarize meetings with AI built right in.",
      },
      {
        icon: "plug",
        title: "Connect the tools you already use",
        body: "Bring in your calendar, accounting, file storage and e-signature apps so work happens in one place.",
      },
      {
        icon: "wallet",
        title: "Pricing that fits",
        body: "Start free, then upgrade only when you need more history, larger huddles or advanced features.",
      },
    ],
    workflow: {
      title: "From new client to paid invoice",
      subtitle: "A twelve-person design studio onboards a new client without a single lost email.",
      steps: [
        {
          icon: "clipboard",
          title: "Client fills an intake form",
          body: "A Formcraft intake form captures scope, budget and timeline, then posts it to #new-clients.",
        },
        {
          icon: "handshake",
          title: "A shared channel opens",
          body: "A workflow creates a shared channel with the client, posts a welcome message and pins the project brief.",
        },
        {
          icon: "fileSignature",
          title: "Proposal signed",
          body: "The proposal goes out through Signflow, and the channel celebrates the moment the client signs.",
        },
        {
          icon: "receipt",
          title: "Invoice approved and paid",
          body: "Ledgerly posts the invoice for a quick approval and confirms payment in the channel when it clears.",
        },
      ],
      mockup: "connect",
    },
    quote: {
      text: "We were running a twelve-person studio on group texts and sticky notes. Now client work, approvals and invoices live in one place, and I got my evenings back.",
      name: "Maya Castillo",
      role: "Founder and Creative Director",
      company: "Bramble Design Co.",
    },
    features: ["channels", "connect", "huddles", "ai"],
    integrations: ["calendo", "ledgerly", "signflow", "formcraft", "drivewise"],
    faqs: [
      {
        q: "Is there a free plan for small teams?",
        a: `Yes. The free plan includes channels, direct messages, huddles and a set of app integrations, so you can try ${B} with your whole team at no cost.`,
      },
      {
        q: "Do we need IT help to set it up?",
        a: "No. Most small businesses are up and running in minutes. Create a workspace, invite your team by email or link and start from ready-made templates.",
      },
      {
        q: "Can we work with clients who use a different tool?",
        a: `Yes. Shared channels connect your workspace with a client's, and guest accounts let you invite clients who do not use ${B} yet into specific channels.`,
      },
    ],
    cta: {
      title: "Get your business in one place",
      subtitle: "Start free in minutes. No credit card or IT department required.",
    },
  },
  {
    slug: "financial-services",
    name: "Financial services",
    kind: "industry",
    icon: "landmark",
    tone: "sky",
    summary: "Move faster on deals and client service while meeting strict compliance, retention and security requirements.",
    seo: {
      title: "Secure collaboration for financial services firms",
      description:
        "Serve clients faster and stay compliant with secure channels, audit-ready retention, eDiscovery and workflows built for banks, insurers and wealth managers.",
    },
    hero: {
      eyebrow: "For financial services",
      title: "Move at market speed, with compliance built in",
      highlight: "compliance built in",
      subtitle:
        "Connect bankers, advisors, operations and risk teams in secure channels with the retention, supervision and audit controls regulators expect.",
      painPoints: [
        "Approvals buried in email chains",
        "Compliance reviews slowing every deal",
        "Client updates scattered across desks",
      ],
      mockup: "security",
    },
    stats: [
      { value: 42, suffix: "%", label: "faster commercial loan approvals" },
      { value: 29, suffix: "%", label: "faster client onboarding" },
      { value: 100, suffix: "%", label: "of messages retained for audit" },
    ],
    benefits: [
      {
        icon: "shieldCheck",
        title: "Compliance from the ground up",
        body: "Retention policies, legal holds, eDiscovery exports and audit logs help you meet strict recordkeeping obligations.",
      },
      {
        icon: "fileLock",
        title: "Client data under your control",
        body: "Enterprise key management, data loss prevention and data residency keep sensitive client information protected.",
      },
      {
        icon: "check",
        title: "Approvals with a paper trail",
        body: "Route credit, trade exception and expense approvals through workflows that log every decision and approver.",
      },
      {
        icon: "handshake",
        title: "Secure client collaboration",
        body: "Work with clients, counterparties and outside counsel in shared channels governed by your own policies.",
      },
      {
        icon: "bot",
        title: "AI with guardrails",
        body: "Summarize research, draft client updates and search policy documents with AI that respects permissions and never trains on your data.",
      },
      {
        icon: "users",
        title: "Desks connected in real time",
        body: "Front office, operations and risk resolve breaks and exceptions together instead of over phone and email.",
      },
    ],
    workflow: {
      title: "From loan application to funded",
      subtitle: "A commercial lending team at a regional bank closes a loan faster, with every approval documented.",
      steps: [
        {
          icon: "file",
          title: "Application received",
          body: "A completed application triggers a workflow that opens a deal channel and attaches the credit memo canvas.",
        },
        {
          icon: "users",
          title: "Underwriting collaborates",
          body: "Credit analysts, the relationship manager and risk review financials together, resolving questions in the thread.",
        },
        {
          icon: "gavel",
          title: "Credit committee approves",
          body: "Committee members approve in a workflow step, and each decision is timestamped and retained for examiners.",
        },
        {
          icon: "fileSignature",
          title: "Signed and funded",
          body: "Signflow notifies the channel when loan documents are executed, and operations confirms funding.",
        },
      ],
      mockup: "workflow",
    },
    quote: {
      text: "Our examiners care about two things: that we can find every record and prove who approved what. We can now do both in minutes, and our lenders move faster too.",
      name: "Gregory Shaw",
      role: "Chief Compliance Officer",
      company: "Vantage Bank",
    },
    features: ["workflow-automation", "enterprise-search", "connect", "ai"],
    integrations: ["signflow", "ledgerly", "keystone-id", "vaultguard", "datalake-hub"],
    faqs: [
      {
        q: `How does ${B} support financial recordkeeping rules?`,
        a: "Enterprise plans offer custom retention policies, legal holds, eDiscovery and audit log APIs, and integrate with leading archiving and supervision providers.",
      },
      {
        q: "Can we control where our data is stored?",
        a: "Yes. Data residency options keep message and file data in specific regions, and enterprise key management lets you control your own encryption keys.",
      },
      {
        q: "Is AI safe to use with client information?",
        a: "AI respects existing access controls, keeps data within the platform's security boundary and never uses customer data to train models. Admins can enable it by team or role.",
      },
    ],
    cta: {
      title: "Bring speed and compliance to every desk",
      subtitle: "Talk to our financial services team about security reviews, retention and deployment.",
    },
  },
  {
    slug: "retail",
    name: "Retail",
    kind: "industry",
    icon: "bag",
    tone: "pink",
    summary: "Connect stores, headquarters and distribution centers so frontline teams can serve customers better.",
    seo: {
      title: "Team communication for retail stores and HQ",
      description:
        "Connect headquarters, stores and distribution centers in real time. Roll out promotions, share shift updates and give frontline associates answers on mobile.",
    },
    hero: {
      eyebrow: "For retail",
      title: "Bring headquarters and every store floor together",
      highlight: "every store floor",
      subtitle:
        "Roll out promotions, share inventory updates and help associates answer customer questions on the spot, all from the phone in their pocket.",
      painPoints: ["Store updates lost in email", "Planograms that arrive too late", "Associates stuck without answers"],
      mockup: "chat-team",
    },
    stats: [
      { value: 45, suffix: "%", label: "faster promotion rollouts" },
      { value: 20, suffix: "%", label: "fewer out-of-stock escalations" },
      { value: 92, suffix: "%", label: "store compliance on launch day" },
    ],
    benefits: [
      {
        icon: "store",
        title: "Every store in sync",
        body: "Channels for regions, districts and stores make sure the right updates reach the right teams at the right time.",
      },
      {
        icon: "phone",
        title: "Built for associates on the floor",
        body: "Associates check announcements, swap shifts and ask questions from mobile, no desk or company laptop needed.",
      },
      {
        icon: "megaphone",
        title: "Launch-day rollouts that land",
        body: "Share planograms, pricing changes and promotions, then collect photo confirmation that every store is set.",
      },
      {
        icon: "bot",
        title: "Answers in seconds",
        body: "An AI agent answers questions about return policies, product details and procedures straight from your store handbook.",
      },
      {
        icon: "truck",
        title: "Inventory and supply in the loop",
        body: "Distribution centers and stores coordinate shipments, transfers and stockouts in real time.",
      },
      {
        icon: "calendar",
        title: "Shift changes made simple",
        body: "Associates request time off or pick up open shifts, and managers approve with one tap.",
      },
    ],
    workflow: {
      title: "From HQ plan to store-ready in a day",
      subtitle: "Here is how a 300-store retailer sets a seasonal promotion in every location before opening time.",
      steps: [
        {
          icon: "megaphone",
          title: "HQ announces the rollout",
          body: "Merchandising posts the promotion kit, planogram and pricing to the #stores-announcements channel.",
        },
        {
          icon: "listChecks",
          title: "Stores get a checklist",
          body: "A workflow sends each store manager a task list with deadlines and the steps to set the display.",
        },
        {
          icon: "phone",
          title: "Teams confirm with photos",
          body: "Associates post photos of finished displays from their phones, and district managers review them in the thread.",
        },
        {
          icon: "chart",
          title: "HQ tracks compliance",
          body: "A live list shows which stores are complete, and regional teams follow up with stragglers before the doors open.",
        },
      ],
      mockup: "lists",
    },
    quote: {
      text: "We used to find out a store missed a promotion when the sales numbers came in. Now district managers see photo confirmations from every location before the doors open.",
      name: "Tasha Greene",
      role: "VP of Store Operations",
      company: "Harlow & Finch",
    },
    features: ["channels", "task-list", "ai-agents", "workflow-automation"],
    integrations: ["roster", "formcraft", "pulsecheck", "drivewise", "surveyo"],
    faqs: [
      {
        q: "Do store associates need a company email address?",
        a: "No. Associates can sign in with a phone number or through your identity provider, and admins can limit their access to store and team channels.",
      },
      {
        q: "Can we reach thousands of associates at once?",
        a: "Yes. Announcement channels reach every store at once, and workflows can ask store managers to confirm when critical updates like product recalls are actioned.",
      },
      {
        q: "How do we keep store teams from getting overwhelmed?",
        a: "Organize channels by region, store and role, and use posting permissions so only designated people can post to announcement channels.",
      },
    ],
    cta: {
      title: "Give every store a direct line to HQ",
      subtitle: "See how retailers keep stores aligned and associates informed from the first shift to the last.",
    },
  },
  {
    slug: "public-sector",
    name: "Public sector",
    kind: "industry",
    icon: "building",
    tone: "violet",
    summary: "Help agencies collaborate securely across departments and partners, with the controls public trust requires.",
    seo: {
      title: "Secure collaboration for government agencies",
      description:
        "Help agencies serve residents faster with secure channels, records retention and access controls, plus workflows that cut paperwork across departments.",
    },
    hero: {
      eyebrow: "For the public sector",
      title: "Serve residents faster with secure, connected teams",
      highlight: "secure, connected teams",
      subtitle:
        "Connect departments, field staff and partner agencies on a platform built for strict security, accessibility and records requirements.",
      painPoints: [
        "Interagency coordination over email",
        "Paper forms slowing every request",
        "Emergency updates reaching people late",
      ],
      mockup: "chat-connect",
    },
    stats: [
      { value: 35, suffix: "%", label: "faster interagency coordination" },
      { value: 60, suffix: "%", label: "less time processing internal requests" },
      { value: 50, suffix: "%", label: "fewer paper forms" },
    ],
    benefits: [
      {
        icon: "shieldCheck",
        title: "Security that meets the mandate",
        body: "Audit logs, data residency options and encryption key management support strict government security requirements.",
      },
      {
        icon: "archive",
        title: "Records retention, handled",
        body: "Configurable retention, legal holds and export tools help agencies meet public records and transparency obligations.",
      },
      {
        icon: "network",
        title: "Interagency collaboration",
        body: "Work with partner agencies, contractors and nonprofits in shared channels while each organization keeps control of its data.",
      },
      {
        icon: "siren",
        title: "Coordinated emergency response",
        body: "Spin up emergency operations channels, broadcast alerts to field teams and track resources in real time.",
      },
      {
        icon: "clipboard",
        title: "Paperwork, digitized",
        body: "Replace paper forms with workflows for procurement, permits and HR requests that route approvals automatically.",
      },
      {
        icon: "accessibility",
        title: "Accessible to everyone",
        body: "Screen reader support, keyboard navigation and adjustable display settings help every employee participate fully.",
      },
    ],
    workflow: {
      title: "From storm warning to coordinated response",
      subtitle: "A city emergency management office coordinates departments and partners through a severe winter storm.",
      steps: [
        {
          icon: "siren",
          title: "Warning issued",
          body: "A weather service alert triggers a workflow that opens #eoc-winter-storm and invites every department lead.",
        },
        {
          icon: "network",
          title: "Partners join the response",
          body: "Public works, police, the electric utility and the regional transit authority join through shared channels.",
        },
        {
          icon: "listChecks",
          title: "Resources tracked live",
          body: "Road closures, plow assignments and shelter capacity live in a list that updates as crews report in.",
        },
        {
          icon: "archive",
          title: "After-action, on the record",
          body: "The full timeline is retained under records policy, and AI drafts the after-action summary for review.",
        },
      ],
      mockup: "lists",
    },
    quote: {
      text: "During last winter's ice storm, every department and partner worked from the same channel. We cleared priority routes twelve hours faster than the year before.",
      name: "Daniel Reyes",
      role: "Director of Emergency Management",
      company: "Harbor City Council",
    },
    features: ["channels", "connect", "workflow-automation", "enterprise-search"],
    integrations: ["formcraft", "signflow", "keystone-id", "drivewise", "meetbox"],
    faqs: [
      {
        q: `Can ${B} meet government security requirements?`,
        a: "Enterprise plans include advanced security controls, audit logging, data residency and encryption key management. Our public sector team can walk your security reviewers through every detail.",
      },
      {
        q: "How do we handle public records requests?",
        a: "Retention policies and export tools let records officers locate, preserve and export the messages and files covered by public records or transparency laws.",
      },
      {
        q: "Can we collaborate with other agencies and contractors?",
        a: "Yes. Shared channels let separate organizations work in one space while each keeps its own administrative and security controls.",
      },
    ],
    cta: {
      title: "Modernize how your agency works",
      subtitle: "Talk to our public sector team about security reviews, procurement and getting started.",
    },
  },
  {
    slug: "education",
    name: "Education",
    kind: "industry",
    icon: "graduation",
    tone: "sun",
    summary: "Connect students, faculty and staff across campus with secure channels for teaching, research and operations.",
    seo: {
      title: "Campus collaboration for students, faculty and staff",
      description:
        "Bring students, faculty and staff together on one secure platform for courses, research labs, advising and campus operations, with controls IT teams trust.",
    },
    hero: {
      eyebrow: "For higher education",
      title: "Bring your whole campus into one conversation",
      highlight: "your whole campus",
      subtitle:
        "From course channels and research labs to admissions and IT, give students, faculty and staff a single place to learn, teach and get things done.",
      painPoints: [
        "Course questions lost in inboxes",
        "Research data shared over email",
        "Students missing critical deadlines",
      ],
      mockup: "huddle",
    },
    stats: [
      { value: 3, suffix: "x", label: "more student questions answered same day" },
      { value: 40, suffix: "%", label: "fewer emails to faculty" },
      { value: 27, suffix: "%", label: "faster campus IT resolution" },
    ],
    benefits: [
      {
        icon: "school",
        title: "Course channels students use",
        body: "Give every course a channel for announcements, questions and study groups, with TAs answering in threads.",
      },
      {
        icon: "headphones",
        title: "Office hours, anywhere",
        body: "Faculty host drop-in office hours in huddles, so commuter and online students get the same access.",
      },
      {
        icon: "brain",
        title: "Research labs in sync",
        body: "Lab members share datasets, protocols and results in private channels, with partner institutions in shared ones.",
      },
      {
        icon: "bot",
        title: "Student services that respond",
        body: "Admissions, financial aid and advising answer common questions with AI agents and escalate the rest to staff.",
      },
      {
        icon: "calendarDays",
        title: "Deadlines students do not miss",
        body: "Automated reminders for registration, aid deadlines and assignments reach students where they already are.",
      },
      {
        icon: "lock",
        title: "Privacy and controls IT trusts",
        body: "Granular permissions, retention settings and SSO help protect student records and meet institutional policy.",
      },
    ],
    workflow: {
      title: "From admitted student to first day of class",
      subtitle: "Here is how an admissions office guides newly admitted students all the way through enrollment.",
      steps: [
        {
          icon: "mail",
          title: "Admit decision released",
          body: "Admitted students are invited to a #class-of-2031 channel with a welcome video clip from the dean.",
        },
        {
          icon: "bot",
          title: "Questions answered around the clock",
          body: "An AI agent answers questions about housing, deposits and orientation from the admissions knowledge base.",
        },
        {
          icon: "calendarDays",
          title: "Deadlines tracked automatically",
          body: "Workflows remind students about deposit, housing and immunization deadlines and alert advisors when someone falls behind.",
        },
        {
          icon: "users",
          title: "Orientation, connected",
          body: "Students join orientation groups and meet their peer mentors before they ever arrive on campus.",
        },
      ],
      mockup: "agent",
    },
    quote: {
      text: "Our students live on their phones, not in email. Moving advising and course communication into channels doubled the number of students who reach out before they fall behind.",
      name: "Dr. Elena Vasquez",
      role: "Associate Provost for Student Success",
      company: "Pinecrest University",
    },
    features: ["channels", "huddles", "ai-agents", "clips"],
    integrations: ["calendo", "formcraft", "surveyo", "drivewise", "meetbox"],
    faqs: [
      {
        q: "Can students and faculty share one workspace?",
        a: "Yes. Many institutions run a single workspace with separate channel structures and permissions for students, faculty and staff, managed centrally by IT.",
      },
      {
        q: "How do you protect student data?",
        a: "Admins control who can access what, set retention policies and connect single sign-on. Enterprise plans add audit logs and data loss prevention to help meet student privacy requirements.",
      },
      {
        q: "Can we collaborate with other universities on research?",
        a: "Yes. Shared channels let research teams at different institutions work together while each school keeps control of its own data and members.",
      },
    ],
    cta: {
      title: "Connect your campus community",
      subtitle: "See how colleges and universities support students, faculty and staff in one place.",
    },
  },
  {
    slug: "healthcare",
    name: "Health and life sciences",
    kind: "industry",
    icon: "health",
    tone: "mint",
    summary: "Speed up care coordination and research with secure, compliant collaboration across clinical and science teams.",
    seo: {
      title: "Secure collaboration for health and life sciences",
      description:
        "Coordinate care, accelerate research and run hospital operations with secure channels, compliance controls and workflows built for regulated health teams.",
    },
    hero: {
      eyebrow: "For health and life sciences",
      title: "Coordinate care and research at the speed of need",
      highlight: "the speed of need",
      subtitle:
        "Connect clinicians, operations staff and research teams in secure channels, with the access controls, audit trails and retention policies regulated organizations require.",
      painPoints: ["Shift handoffs on paper and pagers", "Bed status updates by phone", "Trial data scattered across sites"],
      mockup: "connect",
    },
    stats: [
      { value: 35, suffix: "%", label: "faster bed-capacity decisions" },
      { value: 28, suffix: "%", label: "faster clinical trial site activation" },
      { value: 100, suffix: "%", label: "audit-ready message retention" },
    ],
    benefits: [
      {
        icon: "shieldCheck",
        title: "Built for regulated data",
        body: "Enterprise security controls, audit logs and data loss prevention help protect sensitive health information and support compliance programs.",
      },
      {
        icon: "health",
        title: "Care teams in sync",
        body: "Nurses, physicians and support staff coordinate admissions, discharges and transfers in unit channels instead of phone tag.",
      },
      {
        icon: "activity",
        title: "Operations at a glance",
        body: "Bed capacity, staffing and supply alerts post to operations channels so leaders can act before bottlenecks form.",
      },
      {
        icon: "pill",
        title: "Research that moves faster",
        body: "Clinical trial teams coordinate sites, sponsors and research partners in shared channels with protocols and approvals in one place.",
      },
      {
        icon: "fileCheck",
        title: "Approvals with an audit trail",
        body: "Route protocol amendments, purchase requests and policy sign-offs through workflows that log every decision.",
      },
      {
        icon: "bot",
        title: "AI that respects permissions",
        body: "Summarize long threads and search policies and SOPs with AI that only uses content each person is allowed to see.",
      },
    ],
    workflow: {
      title: "From discharge order to ready bed",
      subtitle: "Here is how a hospital operations team shrinks the time between a discharge order and the next admission.",
      steps: [
        {
          icon: "fileCheck",
          title: "Discharge order placed",
          body: "When a discharge is ordered, a workflow alerts the unit channel, patient transport and environmental services.",
        },
        {
          icon: "truck",
          title: "Transport and cleaning dispatched",
          body: "Transport confirms pickup, and environmental services claims the room-cleaning task from a shared list.",
        },
        {
          icon: "check",
          title: "Bed marked ready",
          body: "Once the room is cleaned, the bed status updates and the capacity dashboard refreshes automatically.",
        },
        {
          icon: "users",
          title: "Next patient admitted",
          body: "The bed management team assigns the bed to a waiting emergency department patient and notifies the unit.",
        },
      ],
      mockup: "lists",
    },
    quote: {
      text: "We took hours out of every discharge by putting transport, environmental services and nursing in the same channel. Our ED boarding times dropped within the first month.",
      name: "Dr. Samuel Adeyemi",
      role: "Chief Medical Operations Officer",
      company: "Halcyon Health",
    },
    features: ["channels", "workflow-automation", "connect", "enterprise-search"],
    integrations: ["formcraft", "roster", "keystone-id", "pulsecheck", "signflow"],
    faqs: [
      {
        q: `Can ${B} be used with protected health information?`,
        a: "Eligible enterprise customers can configure the platform to support HIPAA compliance programs, including a business associate agreement and the required security controls.",
      },
      {
        q: "How do clinical teams use it on shift?",
        a: "Clinicians use the mobile app to message unit channels, receive alerts and acknowledge tasks, with notifications tuned to their role and schedule.",
      },
      {
        q: "Can we collaborate with sponsors and research partners?",
        a: "Yes. Shared channels connect your team with sponsors, contract research organizations and partner sites, while each keeps its own security and retention controls.",
      },
    ],
    cta: {
      title: "Give your teams more time for patients",
      subtitle: "Talk to our health and life sciences team about security, compliance and deployment.",
    },
  },

  /* ------------------------------------------------------------------ */
  /* Use cases                                                            */
  /* ------------------------------------------------------------------ */
  {
    slug: "task-management",
    name: "Task management",
    kind: "use-case",
    icon: "listChecks",
    tone: "coral",
    summary: "Turn conversations into tracked tasks, so every action item has an owner, a due date and a next step.",
    seo: {
      title: "Task management that lives where your team talks",
      description:
        "Turn messages into tasks, track work in lists with owners and due dates, and automate reminders so nothing falls through the cracks between conversations.",
    },
    hero: {
      eyebrow: "Task management",
      title: "Turn every conversation into finished work",
      highlight: "finished work",
      subtitle:
        "Capture action items from messages, track them in lists everyone can see and let automations handle the reminders, without leaving the conversation.",
      painPoints: ["Action items lost in threads", "Sticky notes as a system", "Who owns this, again?"],
      mockup: "lists",
    },
    stats: [
      { value: 34, suffix: "%", label: "fewer missed deadlines" },
      { value: 3, suffix: " hrs", label: "saved per person each week" },
      { value: 2, suffix: "x", label: "faster task handoffs" },
    ],
    benefits: [
      {
        icon: "message",
        title: "Tasks from any message",
        body: "Turn a message into a task in one click, with the original conversation linked for context.",
      },
      {
        icon: "listTodo",
        title: "Lists for any kind of work",
        body: "Track to-dos, requests, bugs or launch checklists with custom fields, owners and due dates.",
      },
      {
        icon: "grid",
        title: "Views that fit how you work",
        body: "Switch between table, board and calendar views to see work by status, owner or deadline.",
      },
      {
        icon: "bell",
        title: "Reminders that do the nudging",
        body: "Automatic reminders before due dates and digests of overdue items keep work moving without awkward follow-ups.",
      },
      {
        icon: "sparkles",
        title: "AI that captures action items",
        body: "AI pulls action items out of huddles and long threads and suggests owners based on the conversation.",
      },
      {
        icon: "link",
        title: "Connected to your other tools",
        body: "Sync tasks with your project tracker, calendar and forms so work stays in step everywhere.",
      },
    ],
    workflow: {
      title: "From meeting to done",
      subtitle: "Here is how a team turns a Monday planning huddle into tracked, finished work by Friday.",
      steps: [
        {
          icon: "headphones",
          title: "Plan in a huddle",
          body: "The team talks through priorities in a quick huddle, and AI captures the notes and decisions.",
        },
        {
          icon: "sparkles",
          title: "Action items extracted",
          body: "AI pulls five action items from the huddle notes and suggests an owner and due date for each one.",
        },
        {
          icon: "listChecks",
          title: "Tracked in a shared list",
          body: "Items land in the team's task list, shown as a board, with status changes visible to everyone.",
        },
        {
          icon: "check",
          title: "Reminded, then done",
          body: "Owners get a reminder the day before each deadline, and completed items roll up into a Friday digest.",
        },
      ],
      mockup: "ai",
    },
    quote: {
      text: "We stopped asking who was supposed to follow up. Every action item from our standups lands in a list with a name next to it, and on-time delivery has never been better.",
      name: "Kevin Marsh",
      role: "Operations Lead",
      company: "Meridian Air",
    },
    features: ["task-list", "ai", "workflow-automation", "huddles"],
    integrations: ["trackly", "calendo", "formcraft", "notely", "drivewise"],
    faqs: [
      {
        q: "How are lists different from a to-do app?",
        a: "Lists live inside your channels and conversations, so tasks keep their context, everyone can see progress, and updates happen where the work is discussed.",
      },
      {
        q: "Can I assign tasks to people outside my team?",
        a: "Yes. Assign list items to anyone in your workspace, and share lists in shared channels to collaborate with partners outside your company.",
      },
      {
        q: "Do lists work with our existing project tracker?",
        a: "Yes. Connect your tracker to sync tasks in both directions, or use lists on their own for lighter-weight work.",
      },
    ],
    cta: {
      title: "Never lose an action item again",
      subtitle: "Create your first list from a message in seconds. It is included on every plan.",
    },
  },
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}
