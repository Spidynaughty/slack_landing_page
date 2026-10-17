/**
 * The site architecture as typed config. Header mega menus, the mobile menu,
 * the footer, the search palette and the sitemap all render from this file,
 * so navigation and routes never drift apart.
 */
import type { IconName } from "@/components/ui/icon";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: IconName;
  badge?: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export type FeaturedCard = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone: Tone;
  icon: IconName;
};

export type MegaMenu = {
  kind: "mega";
  id: string;
  label: string;
  /** Short intro shown at the top of the mobile accordion. */
  intro: string;
  groups: NavGroup[];
  featured: FeaturedCard[];
  quickLinks?: NavLink[];
  footerLink?: NavLink;
};

export type CardsMenu = {
  kind: "cards";
  id: string;
  label: string;
  href: string;
  intro: string;
  cards: (NavLink & { tone: Tone; icon: IconName; description: string })[];
  footerLink: NavLink;
};

export type PlainNavItem = {
  kind: "link";
  id: string;
  label: string;
  href: string;
};

export type MainNavItem = MegaMenu | CardsMenu | PlainNavItem;

export type HeaderAction =
  | { kind: "search"; label: string }
  | { kind: "link"; label: string; href: string; variant: "ghost" | "outline" | "primary" };

export type FooterColumn = {
  title: string;
  links: NavLink[];
  /** Optional sub-sections rendered under one heading (used for Solutions). */
  sections?: NavGroup[];
};

export type LegalItem =
  | { kind: "link"; label: string; href: string }
  | { kind: "action"; label: string; action: "cookie-preferences" | "privacy-choices" };

/* ------------------------------------------------------------------ */
/* Header                                                              */
/* ------------------------------------------------------------------ */

export const headerActions: HeaderAction[] = [
  { kind: "search", label: "Search" },
  { kind: "link", label: "Sign in", href: "/signin", variant: "ghost" },
  { kind: "link", label: "Request a demo", href: "/contact-sales", variant: "outline" },
  { kind: "link", label: "Get started", href: "/get-started", variant: "primary" },
];

export const departmentLinks: NavLink[] = [
  { label: "Engineering", href: "/solutions/engineering", icon: "terminal", description: "Ship code faster with fewer handoffs" },
  { label: "IT", href: "/solutions/information-technology", icon: "server", description: "Resolve requests and incidents in one place" },
  { label: "Customer service", href: "/solutions/customer-service", icon: "headset", description: "Swarm on cases and delight customers" },
  { label: "Sales", href: "/solutions/sales", icon: "trending", description: "Close deals with your whole team behind you" },
  { label: "Project management", href: "/solutions/project-management", icon: "kanban", description: "Keep every project moving and visible" },
  { label: "Marketing", href: "/solutions/marketing", icon: "megaphone", description: "Launch campaigns with every stakeholder" },
  { label: "Human Resources", href: "/solutions/human-resources", icon: "users", description: "Onboard, engage and support your people" },
  { label: "Security", href: "/solutions/security", icon: "lock", description: "Detect, triage and respond together" },
];

export const industryLinks: NavLink[] = [
  { label: "Manufacturing, auto and energy", href: "/solutions/manufacturing", icon: "factory" },
  { label: "Technology", href: "/solutions/technology", icon: "cpu" },
  { label: "Media", href: "/solutions/media", icon: "clapperboard" },
  { label: "Small business", href: "/solutions/small-business", icon: "store" },
  { label: "Financial services", href: "/solutions/financial-services", icon: "landmark" },
  { label: "Retail", href: "/solutions/retail", icon: "bag" },
  { label: "Public sector", href: "/solutions/public-sector", icon: "building" },
  { label: "Education", href: "/solutions/education", icon: "graduation" },
  { label: "Health and life sciences", href: "/solutions/healthcare", icon: "health" },
];

export const mainNav: MainNavItem[] = [
  {
    kind: "mega",
    id: "product",
    label: "Product",
    intro: `Everything your team needs to talk, plan, build and automate in ${B}.`,
    groups: [
      {
        title: "Collaborate",
        links: [
          { label: "Channels", href: "/features/channels", icon: "hash", description: "Organize work by topic, team or project" },
          { label: `${B} Connect`, href: "/connect", icon: "link", description: "Work with partners in shared channels" },
          { label: "Meetings & video", href: "/features/huddles", icon: "headphones", description: "Huddle with audio, video and screen share" },
          { label: "Canvas", href: "/features/canvas", icon: "file", description: "Docs that live beside the conversation" },
          { label: "Lists", href: "/features/task-list", icon: "listChecks", description: "Track projects and requests in chat" },
        ],
      },
      {
        title: "Work with AI",
        links: [
          { label: `${B} Bot`, href: "/features/slackbot", icon: "bot", description: "A personal AI teammate for every task" },
          { label: `${B} Code`, href: "/features/code-channels", icon: "code", description: "Channels built for engineering work", badge: "New" },
          { label: "Native AI", href: "/features/ai", icon: "sparkles", description: "Recaps, summaries and answers everywhere" },
          { label: `${B} Agents`, href: "/ai-agents", icon: "brain", description: "Autonomous agents that work beside you" },
        ],
      },
      {
        title: "Connect",
        links: [
          { label: "Apps & integrations", href: "/integrations", icon: "puzzle", description: "Bring your tools into the flow of work" },
          { label: "Native CRM", href: "/crm", icon: "contact", description: "Customer records built right in" },
          { label: "Connected CRM", href: "/features/crm", icon: "building2", description: "Your CRM data inside every deal channel" },
          { label: "Enterprise search", href: "/features/enterprise-search", icon: "search", description: "Find anything across every app" },
        ],
      },
      {
        title: "Build",
        links: [
          { label: "Agentic platform", href: "/features/agentic-platform", icon: "layers", description: "Build, deploy and govern AI agents" },
          { label: "Workflow Builder", href: "/features/workflow-automation", icon: "workflow", description: "Automate busywork without code" },
          { label: "Trust & security", href: "/trust", icon: "shieldCheck", description: "Enterprise-grade protection by default" },
        ],
      },
    ],
    featured: [
      {
        eyebrow: "What's new",
        title: "Fall release: agents in every channel",
        description: "See the 40+ updates we shipped this season, from AI recaps to Lists automations.",
        href: "/whats-new",
        cta: "See what's new",
        tone: "violet",
        icon: "sparkles",
      },
      {
        eyebrow: "Marketplace",
        title: "2,600+ apps and agents",
        description: "Connect the tools you already use, or discover new ones built for your team.",
        href: "/marketplace",
        cta: "Browse the Marketplace",
        tone: "mint",
        icon: "store",
      },
    ],
    quickLinks: [
      { label: "Watch demo", href: "/demo", icon: "play" },
      { label: "Download", href: "/downloads", icon: "download" },
      { label: "See all features", href: "/features", icon: "grid" },
    ],
  },
  {
    kind: "mega",
    id: "solutions",
    label: "Solutions",
    intro: `Purpose-built ways to work in ${B} for every team and industry.`,
    groups: [
      { title: "By department", links: departmentLinks },
      { title: "By industry", links: industryLinks },
    ],
    featured: [
      {
        eyebrow: "Template gallery",
        title: "Start with a proven playbook",
        description: "Pre-built channels, canvases, lists and workflows for 60+ use cases.",
        href: "/templates/gallery",
        cta: "Explore templates",
        tone: "sun",
        icon: "template",
      },
    ],
    footerLink: { label: "See all solutions", href: "/solutions" },
  },
  {
    kind: "cards",
    id: "enterprise",
    label: "Enterprise",
    href: "/enterprise",
    intro: `${B} Enterprise brings AI, agents, security and search together at global scale.`,
    cards: [
      {
        label: "Smarter AI with context",
        href: "/enterprise#smarter-ai",
        icon: "sparkles",
        tone: "violet",
        description: "AI that understands your conversations, files and history.",
      },
      {
        label: "Home for every agent",
        href: "/enterprise#agents",
        icon: "bot",
        tone: "mint",
        description: "Bring agents from any vendor into one governed workspace.",
      },
      {
        label: "Secure, scalable, silo-free",
        href: "/enterprise#secure",
        icon: "shieldCheck",
        tone: "coral",
        description: "Controls, compliance and data residency for 500k-seat orgs.",
      },
      {
        label: "Search that knows where to look",
        href: "/enterprise#search",
        icon: "search",
        tone: "sky",
        description: "One search bar across chat, docs and your connected apps.",
      },
    ],
    footerLink: { label: `Explore ${B} Enterprise`, href: "/enterprise" },
  },
  {
    kind: "mega",
    id: "resources",
    label: "Resources",
    intro: "Guides, stories, events and tools to get the most out of your workspace.",
    groups: [
      {
        title: "Discover",
        links: [
          { label: "What's new", href: "/whats-new", icon: "sparkles", description: "The latest product releases" },
          { label: "Resources library", href: "/resources", icon: "library", description: "Guides, reports and webinars" },
          { label: "Customer stories", href: "/customer-stories", icon: "quote", description: "How teams transform their work" },
          { label: "Events", href: "/events", icon: "calendarDays", description: "Live and on-demand sessions" },
        ],
      },
      {
        title: "Learn",
        links: [
          { label: "Blog", href: "/blog", icon: "pen", description: "Ideas on the future of work" },
          { label: "Product tour", href: "/product-tour", icon: "compass", description: "A guided, interactive walkthrough" },
          { label: "Help Centre", href: "/help", icon: "lifebuoy", description: "Answers, tutorials and support" },
          { label: `${B} vs Teams`, href: "/compare/slack-vs-teams", icon: "scale", description: "See how we compare" },
        ],
      },
      {
        title: "Build",
        links: [
          { label: "Developers", href: "/developers", icon: "terminal", description: "APIs, SDKs and the platform" },
          { label: `${B} Community`, href: "/community", icon: "messages", description: "Meet and learn from other admins" },
          { label: "Partner programme", href: "/partners", icon: "handshake", description: "Grow your business with us" },
          { label: "Partner offers", href: "/partner-offers", icon: "gift", description: "Exclusive deals for customers" },
        ],
      },
    ],
    featured: [
      {
        eyebrow: "Featured report",
        title: "Work in the AI era",
        description: "What 18,000 desk workers told us about AI, focus and the future of collaboration.",
        href: "/resources/why-use-slack/ai-era-of-work",
        cta: "Read the report",
        tone: "pink",
        icon: "brain",
      },
    ],
  },
  { kind: "link", id: "pricing", label: "Pricing", href: "/pricing" },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Watch demo", href: "/demo" },
      { label: "Pricing", href: "/pricing" },
      { label: "Paid vs Free", href: "/pricing/paid-vs-free" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Featured releases", href: "/innovations" },
      { label: "Change log", href: "/changelog" },
      { label: "Status", href: "/status" },
    ],
  },
  {
    title: `Why ${B}?`,
    links: [
      { label: `${B} vs email`, href: "/compare/slack-vs-email" },
      { label: `${B} vs Teams`, href: "/compare/slack-vs-teams" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Small business", href: "/solutions/small-business" },
      { label: "Productivity", href: "/engage-users" },
      { label: "Task management", href: "/solutions/task-management" },
      { label: "Scale", href: "/scale" },
      { label: "Trust", href: "/trust" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Channels", href: "/features/channels" },
      { label: `${B} Connect`, href: "/connect" },
      { label: "Workflow Builder", href: "/features/workflow-automation" },
      { label: "Messaging", href: "/features/team-chat" },
      { label: "Huddles", href: "/features/huddles" },
      { label: "Canvas", href: "/features/canvas" },
      { label: "Lists", href: "/features/task-list" },
      { label: "Clips", href: "/features/clips" },
      { label: "Apps & integrations", href: "/integrations" },
      { label: "File sharing", href: "/features/document-sharing" },
      { label: `${B} AI`, href: "/features/ai" },
      { label: `${B} Agents`, href: "/ai-agents" },
      { label: "Enterprise search", href: "/features/enterprise-search" },
      { label: "Security", href: "/trust/security" },
      { label: "Enterprise Key Management", href: "/enterprise-key-management" },
      { label: `${B} Atlas`, href: "/features/atlas" },
      { label: "See all features", href: "/features" },
    ],
  },
  {
    title: "Solutions",
    links: [{ label: "See all solutions", href: "/solutions" }],
    sections: [
      { title: "Department", links: departmentLinks },
      { title: "Industry", links: industryLinks },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Centre", href: "/help" },
      { label: "What's new", href: "/whats-new" },
      { label: "Resources library", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Community", href: "/community" },
      { label: "Customer stories", href: "/customer-stories" },
      { label: "Events", href: "/events" },
      { label: "Developers", href: "/developers" },
      { label: "Partner programme", href: "/partners" },
      { label: "Partner offers", href: "/partner-offers" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Certified", href: "/certified" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "News", href: "/blog/news" },
      { label: "Media kit", href: "/media-kit" },
      { label: "Brand centre", href: "/brand" },
      { label: "Careers", href: "/careers" },
      { label: `${B} Shop`, href: "/shop" },
      { label: "Engineering blog", href: "/engineering-blog" },
      { label: "Design blog", href: "/design-blog" },
      { label: "Contact us", href: "/contact" },
    ],
  },
];

export const legalItems: LegalItem[] = [
  { kind: "link", label: "Privacy", href: "/legal/privacy" },
  { kind: "link", label: "Terms", href: "/legal/terms" },
  { kind: "action", label: "Cookie preferences", action: "cookie-preferences" },
  { kind: "action", label: "Your privacy choices", action: "privacy-choices" },
];

/* ------------------------------------------------------------------ */
/* Derived helpers                                                     */
/* ------------------------------------------------------------------ */

/** Every static internal href that appears anywhere in navigation. */
export function navHrefs(): string[] {
  const set = new Set<string>(["/"]);
  for (const a of headerActions) if (a.kind === "link") set.add(a.href);
  for (const item of mainNav) {
    if (item.kind === "link") set.add(item.href);
    if (item.kind === "cards") {
      set.add(item.href);
      set.add(item.footerLink.href);
    }
    if (item.kind === "mega") {
      item.groups.forEach((g) => g.links.forEach((l) => set.add(l.href)));
      item.featured.forEach((f) => set.add(f.href));
      item.quickLinks?.forEach((l) => set.add(l.href));
      if (item.footerLink) set.add(item.footerLink.href);
    }
  }
  for (const col of footerColumns) {
    col.links.forEach((l) => set.add(l.href));
    col.sections?.forEach((s) => s.links.forEach((l) => set.add(l.href)));
  }
  for (const l of legalItems) if (l.kind === "link") set.add(l.href);
  return [...set].map((h) => h.split("#")[0]).filter((h, i, arr) => arr.indexOf(h) === i);
}

/** Flat list of labelled pages for the command palette. */
export function navSearchEntries(): { label: string; href: string; description?: string; group: string }[] {
  const out: { label: string; href: string; description?: string; group: string }[] = [];
  const seen = new Set<string>();
  const push = (label: string, href: string, group: string, description?: string) => {
    if (seen.has(href)) return;
    seen.add(href);
    out.push({ label, href, group, description });
  };
  for (const item of mainNav) {
    if (item.kind === "link") push(item.label, item.href, "Pages");
    if (item.kind === "cards") {
      push(item.footerLink.label, item.href, item.label, item.intro);
      item.cards.forEach((c) => push(c.label, c.href, item.label, c.description));
    }
    if (item.kind === "mega") {
      item.groups.forEach((g) => g.links.forEach((l) => push(l.label, l.href, item.label, l.description)));
      item.featured.forEach((f) => push(f.title, f.href, item.label, f.description));
      item.quickLinks?.forEach((l) => push(l.label, l.href, item.label));
      if (item.footerLink) push(item.footerLink.label, item.footerLink.href, item.label);
    }
  }
  for (const col of footerColumns) {
    col.links.forEach((l) => push(l.label, l.href, col.title));
    col.sections?.forEach((s) => s.links.forEach((l) => push(l.label, l.href, col.title)));
  }
  for (const a of headerActions) if (a.kind === "link") push(a.label, a.href, "Account");
  for (const l of legalItems) if (l.kind === "link") push(l.label, l.href, "Legal");
  return out;
}
