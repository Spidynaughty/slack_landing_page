import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { ArticleSection, Person } from "./types";

export type EventFormat = "Virtual" | "In person" | "Hybrid" | "On demand";
export type EventCategory = "Conference" | "Webinar" | "Workshop" | "Meetup";

export type EventItem = {
  slug: string;
  title: string;
  format: EventFormat;
  category: EventCategory;
  /** ISO date of the (first) day */
  date: string;
  /** Human readable time range, e.g. "10:00–11:00 PT" */
  time: string;
  location: string;
  tone: Tone;
  excerpt: string;
  speakers: Person[];
  agenda: { time: string; title: string }[];
  sections: ArticleSection[];
  featured?: boolean;
};

export const events: EventItem[] = [
  {
    slug: "summit-2026",
    title: `${B} Summit 2026`,
    format: "Hybrid",
    category: "Conference",
    date: "2026-11-04",
    time: "09:00–17:30 PT",
    location: "Harborview Convention Center, San Francisco",
    tone: "violet",
    excerpt: `Two days of keynotes, product deep dives and hands-on labs on how people and AI agents work together. Join 6,000 attendees in San Francisco or stream every session free online.`,
    speakers: [
      { name: "Priya Raman", role: "Chief Product Officer", initials: "PR" },
      { name: "Amara Osei", role: "COO, Kestrel Labs", initials: "AO" },
      { name: "Marcus Bell", role: "Staff Engineer, Real-time Infrastructure", initials: "MB" },
    ],
    agenda: [
      { time: "09:00", title: "Opening keynote: the year of the AI teammate" },
      { time: "10:30", title: "Product deep dive: agents, recaps and enterprise search" },
      { time: "13:00", title: "Customer panel: rebuilding operations around channels" },
      { time: "14:30", title: "Breakout labs: workflows, admin controls and developer platform" },
      { time: "16:30", title: "Closing keynote and roadmap preview" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          `${B} Summit is our biggest event of the year, and 2026 is our most ambitious program yet. Over two days, you will hear from our product leaders about what is next for agents, AI search and workflow automation, and from customers who have reshaped how their companies operate. Every keynote and breakout is streamed live and available on demand afterward.`,
          "In-person attendees get access to hands-on labs with our engineers, one-on-one sessions with solutions architects and an expo floor featuring more than 80 partner apps. Virtual attendees can join live Q&A, interactive demos and community channels throughout the event.",
        ],
      },
      {
        id: "what-youll-learn",
        heading: "What you will learn",
        paragraphs: ["Sessions are organized into four tracks, so you can build a schedule around what matters most to your team."],
        bullets: [
          "How leading teams deploy AI agents safely across support, sales and IT",
          "Practical patterns for replacing status meetings with async updates",
          "Admin and security controls for rolling out AI at enterprise scale",
          "What is coming to the developer platform, with live coding sessions",
        ],
      },
      {
        id: "who-should-attend",
        heading: "Who should attend",
        paragraphs: [
          `Summit is designed for anyone who wants to get more out of ${B}: team leads, IT and security administrators, operations leaders and developers building on our platform. Whether you are planning a company-wide rollout or looking for ideas to bring back to your team, there is a track for you.`,
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "build-your-first-agent",
    title: "Build your first agent in 30 minutes",
    format: "Virtual",
    category: "Webinar",
    date: "2026-10-29",
    time: "10:00–11:00 PT",
    location: "Online",
    tone: "sun",
    excerpt:
      "A live, step-by-step walkthrough of creating an agent that answers team questions, takes action in connected apps and hands off to a person when it should.",
    speakers: [
      { name: "Hana Mori", role: "Group Product Manager, AI", initials: "HM" },
      { name: "Luis Ferreira", role: "Solutions Architect", initials: "LF" },
    ],
    agenda: [
      { time: "10:00", title: "Why narrowly scoped agents outperform generalists" },
      { time: "10:10", title: "Live build: an IT helpdesk agent from scratch" },
      { time: "10:35", title: "Permissions, citations and audit logs" },
      { time: "10:45", title: "Live Q&A" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          `Agents are now generally available on every paid ${B} plan, and the fastest way to understand them is to watch one being built. In this session, our product and solutions teams will create a working IT helpdesk agent live, from choosing its knowledge sources to connecting it to a ticketing app and testing it in a channel.`,
          "You will leave with a checklist you can use to plan your own first agent, plus access to the recording and a template to get started.",
        ],
      },
      {
        id: "what-youll-learn",
        heading: "What you will learn",
        paragraphs: ["We will cover the full lifecycle of a simple, useful agent."],
        bullets: [
          "How to define a clear job for an agent and write instructions it follows",
          "Choosing knowledge sources and keeping answers grounded with citations",
          "Connecting apps so the agent can take action, not just answer questions",
          "Setting permissions and reviewing what your agent did",
        ],
      },
      {
        id: "who-should-attend",
        heading: "Who should attend",
        paragraphs: [
          "This webinar is ideal for team leads, operations managers and workspace admins who want to pilot agents with their teams. No coding experience is required.",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "builders-meetup-london",
    title: `${B} Builders Meetup: London`,
    format: "In person",
    category: "Meetup",
    date: "2026-11-12",
    time: "18:00–21:00 GMT",
    location: "Canal Street Works, London",
    tone: "mint",
    excerpt:
      "An evening of lightning talks, demos and conversation for developers and admins who build apps, workflows and agents on our platform.",
    speakers: [
      { name: "Chloe Whitfield", role: "Developer Advocate", initials: "CW" },
      { name: "Raj Patel", role: "Platform Engineer, Orbital Freight", initials: "RP" },
    ],
    agenda: [
      { time: "18:00", title: "Doors open, food and drinks" },
      { time: "18:45", title: "Lightning talks from the community" },
      { time: "19:45", title: "Demo: event-driven workflows with the new webhooks API" },
      { time: "20:15", title: "Open networking" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          `Join fellow builders for a relaxed evening of short talks and live demos. Community members will share what they have built on ${B}, from internal tools that save hours each week to customer-facing apps used by thousands of teams. Our developer relations team will preview upcoming platform features and gather feedback.`,
          "Food, drinks and plenty of time to talk are included. Space is limited to 120 attendees, so please register early.",
        ],
      },
      {
        id: "what-youll-learn",
        heading: "What you will learn",
        paragraphs: ["Expect practical, code-first sessions rather than slides."],
        bullets: [
          "How a logistics company automated shipment exceptions with workflows",
          "Patterns for building reliable apps with the events and webhooks APIs",
          "Tips for publishing to the app directory and passing review",
        ],
      },
      {
        id: "who-should-attend",
        heading: "Who should attend",
        paragraphs: [
          "Developers, workspace admins and anyone curious about building on our platform. If you would like to give a five-minute lightning talk, mention it when you register.",
        ],
      },
    ],
  },
  {
    slug: "regulated-collaboration-data-residency",
    title: "Collaboration for regulated industries: data residency and compliance",
    format: "Virtual",
    category: "Webinar",
    date: "2026-11-18",
    time: "08:00–09:00 PT",
    location: "Online",
    tone: "sky",
    excerpt: `Learn how financial services, healthcare and public sector teams run ${B}, including AI features, inside sovereign cloud regions with customer-managed keys.`,
    speakers: [
      { name: "Rachel Kim", role: "SVP, Partnerships", initials: "RK" },
      { name: "Dr. Elena Varga", role: "CISO, Halcyon Health", initials: "EV" },
      { name: "Tomasz Nowak", role: "Principal Architect, Meridian Cloud", initials: "TN" },
    ],
    agenda: [
      { time: "08:00", title: "The state of data residency requirements in 2026" },
      { time: "08:15", title: "Architecture walkthrough: in-region storage, search and AI" },
      { time: "08:35", title: "Customer story: rolling out to 14,000 clinicians" },
      { time: "08:50", title: "Live Q&A" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "Regulated organizations need modern collaboration tools without compromising on where data lives or who controls it. In this webinar, our partnerships team and architects from Meridian Cloud explain how sovereign region hosting works, and a healthcare security leader shares how her team evaluated and rolled it out.",
          "The session includes a detailed architecture walkthrough and a live Q&A, so bring your toughest compliance questions.",
        ],
      },
      {
        id: "what-youll-learn",
        heading: "What you will learn",
        paragraphs: ["We will focus on the questions security and compliance teams ask most often."],
        bullets: [
          "Which data stays in-region, including search indexes and AI processing",
          "How customer-managed encryption keys and key revocation work",
          "Retention, legal hold and eDiscovery options for regulated teams",
          "What a typical security review and rollout timeline looks like",
        ],
      },
      {
        id: "who-should-attend",
        heading: "Who should attend",
        paragraphs: [
          "Security, compliance and IT leaders in financial services, healthcare, insurance and government, as well as procurement teams evaluating collaboration platforms.",
        ],
      },
    ],
  },
  {
    slug: "workflow-automation-lab-chicago",
    title: "Hands-on lab: automate your team's busywork",
    format: "In person",
    category: "Workshop",
    date: "2026-12-03",
    time: "13:00–16:30 CT",
    location: "The Foundry Loft, Chicago",
    tone: "coral",
    excerpt:
      "A small-group, laptop-open workshop where you will build three real workflows with our solutions engineers and leave with them running in your workspace.",
    speakers: [
      { name: "Nadia Haddad", role: "Senior Solutions Engineer", initials: "NH" },
      { name: "Ben Carter", role: "Customer Success Manager", initials: "BC" },
    ],
    agenda: [
      { time: "13:00", title: "Welcome and workflow audit exercise" },
      { time: "13:30", title: "Build 1: a request intake form with automatic routing" },
      { time: "14:30", title: "Build 2: scheduled stand-up prompts with a summary canvas" },
      { time: "15:30", title: "Build 3: an approval flow connected to your apps" },
      { time: "16:15", title: "Share-outs and next steps" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          "Most teams know they have repetitive work that could be automated, but they never find the time to set it up. This workshop gives you that time, plus expert help. You will start by identifying the three most repetitive tasks on your team, then build workflows for each one with guidance from our solutions engineers.",
          "Bring a laptop with access to your workspace. Attendance is capped at 40 people to keep the session hands-on, and coffee and snacks are provided.",
        ],
      },
      {
        id: "what-youll-learn",
        heading: "What you will learn",
        paragraphs: ["By the end of the afternoon, you will have working automations and the skills to build more."],
        bullets: [
          "How to spot work that is worth automating and estimate the time saved",
          "Building forms, triggers, conditions and approvals without code",
          "Connecting workflows to apps and adding AI steps that summarize or classify",
        ],
      },
    ],
  },
  {
    slug: "accessibility-in-practice",
    title: "Accessibility in practice: lessons from our WCAG 2.2 audit",
    format: "On demand",
    category: "Webinar",
    date: "2026-09-17",
    time: "45 minutes",
    location: "Online",
    tone: "pink",
    excerpt:
      "Our accessibility and design systems leads share what it took to reach WCAG 2.2 AA across five platforms, and how teams can build accessibility into their own process.",
    speakers: [
      { name: "Theo Lindqvist", role: "Head of Accessibility", initials: "TL" },
      { name: "Ines Okafor", role: "Design Systems Lead", initials: "IO" },
    ],
    agenda: [
      { time: "00:00", title: "Why conformance is a floor, not a finish line" },
      { time: "00:12", title: "Design tokens that make accessible choices the default" },
      { time: "00:25", title: "Testing with assistive technology users" },
      { time: "00:38", title: "Audience Q&A" },
    ],
    sections: [
      {
        id: "overview",
        heading: "Overview",
        paragraphs: [
          `Earlier this year, ${B} achieved WCAG 2.2 Level AA conformance on web, desktop and mobile after a five-month independent audit. In this recorded session, the people who led the effort explain what changed in the product, how they organized dozens of teams around the goal and what they would do differently next time.`,
          "The recording includes the full audience Q&A and links to the resources mentioned during the session.",
        ],
      },
      {
        id: "what-youll-learn",
        heading: "What you will learn",
        paragraphs: ["Practical lessons you can apply whether you build software or buy it."],
        bullets: [
          "How to make contrast, focus and motion choices safe by default with tokens",
          "Running research sessions with people who use assistive technology",
          "Tracking accessibility issues with the same rigor as security bugs",
          "What to ask vendors for when evaluating accessibility",
        ],
      },
      {
        id: "who-should-attend",
        heading: "Who should watch",
        paragraphs: [
          "Designers, engineers, product managers and procurement teams who want to understand what real accessibility work looks like at scale.",
        ],
      },
    ],
  },
];

export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
