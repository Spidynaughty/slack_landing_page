import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import { slugify } from "@/lib/utils";

export type Author = {
  slug: string;
  name: string;
  role: string;
  initials: string;
  tone: Tone;
  location: string;
  bio: string[];
  focus: string[];
};

/** One entry per distinct blog author. `name`, `role` and `initials` must match data/posts.ts exactly. */
export const authors: Author[] = [
  {
    slug: "priya-raman",
    name: "Priya Raman",
    role: "Chief Product Officer",
    initials: "PR",
    tone: "violet",
    location: "San Francisco",
    bio: [
      `Priya Raman leads product at ${B}, where she oversees the teams behind channels, huddles, canvases, lists and the agent platform. She joined ${B} as a group product manager for search and messaging, and spent her first years turning the product from a chat tool into a place where work actually gets done.`,
      "Before that, Priya built analytics products at a logistics startup and led mobile product for a regional bank's small-business app. She studied computer science and cognitive psychology, and she still runs a weekly customer call that any employee can join.",
    ],
    focus: ["Product strategy", "AI agents", "Platform and workflows"],
  },
  {
    slug: "marcus-bell",
    name: "Marcus Bell",
    role: "Staff Engineer, Real-time Infrastructure",
    initials: "MB",
    tone: "sky",
    location: "Seattle",
    bio: [
      `Marcus Bell is a staff engineer on the real-time infrastructure team at ${B}, responsible for the gateway and channel server tiers that deliver every message, reaction and presence update. He led the move to consistent-hash channel ownership and the client-side latency instrumentation that now guides the team's priorities.`,
      "Marcus previously worked on multiplayer game servers and on a payments network where five nines was the minimum, not the goal. Outside work he mentors early-career engineers and maintains a small open source load-testing tool.",
    ],
    focus: ["Distributed systems", "Real-time messaging", "Reliability engineering"],
  },
  {
    slug: "ines-okafor",
    name: "Ines Okafor",
    role: "Design Systems Lead",
    initials: "IO",
    tone: "pink",
    location: "London",
    bio: [
      `Ines Okafor leads Prism, the design system behind every ${B} surface on web, desktop and mobile. She drove the shift to a three-tier token architecture and the build-time accessibility checks that keep five platforms visually and functionally in sync.`,
      "Before joining the company, Ines was a front-end engineer turned designer at a public broadcaster, where she built its first shared component library. She speaks regularly about design tokens and believes the best systems are the ones teams barely notice.",
    ],
    focus: ["Design tokens", "Accessibility", "Cross-platform UI"],
  },
  {
    slug: "theo-lindqvist",
    name: "Theo Lindqvist",
    role: "Head of Accessibility",
    initials: "TL",
    tone: "mint",
    location: "Stockholm",
    bio: [
      `Theo Lindqvist heads accessibility at ${B}, leading the program that achieved WCAG 2.2 AA conformance across every platform. He built the company's accessibility champion network and the customer council of assistive technology users who test major changes before release.`,
      "Theo began his career as an assistive technology trainer for a national disability organization before moving into product work at a public transit agency. He is a lifelong screen reader user and a firm believer that accessibility is a quality bar, not a feature.",
    ],
    focus: ["Accessibility", "Assistive technology", "Inclusive research"],
  },
  {
    slug: "hana-mori",
    name: "Hana Mori",
    role: "Group Product Manager, AI",
    initials: "HM",
    tone: "sun",
    location: "Tokyo",
    bio: [
      `Hana Mori is a group product manager on the AI team at ${B}, where she leads recaps, agent approvals and the evaluation practices behind them. Her teams are known for measuring what users actually value, including when an AI feature should stay quiet.`,
      "Before joining the company, Hana led machine translation products at a language learning startup and worked as a UX researcher for an electronics maker. She holds a degree in linguistics and spends her weekends restoring old film cameras.",
    ],
    focus: ["AI recaps", "Agent trust and approvals", "Model evaluation"],
  },
  {
    slug: "daniel-ortiz",
    name: "Daniel Ortiz",
    role: "Principal Engineer, Search",
    initials: "DO",
    tone: "coral",
    location: "Austin",
    bio: [
      `Daniel Ortiz is a principal engineer on the search team at ${B}. He designed the streaming indexing pipeline that makes messages searchable in under a second, and the query-time permission filters that keep results fast for people in thousands of channels.`,
      "Daniel spent the early part of his career building search for an online marketplace and a legal research service, where relevance mistakes were expensive. He enjoys teaching information retrieval to new engineers and is an avid long-distance cyclist.",
    ],
    focus: ["Search infrastructure", "Ranking and relevance", "Indexing pipelines"],
  },
  {
    slug: "rachel-kim",
    name: "Rachel Kim",
    role: "SVP, Partnerships",
    initials: "RK",
    tone: "violet",
    location: "New York",
    bio: [
      `Rachel Kim leads partnerships at ${B}, including cloud and marketplace alliances, the app developer ecosystem and shared channel programs for large enterprises. She led the partnership that brought ${B} to sovereign cloud regions for regulated industries.`,
      "Rachel previously ran business development at a healthcare data company and started her career as a management consultant advising financial institutions. She serves on the board of a nonprofit that teaches coding to high school students.",
    ],
    focus: ["Cloud partnerships", "Shared channels", "Regulated industries"],
  },
  {
    slug: "sofia-alvarez",
    name: "Sofia Alvarez",
    role: "Illustration Director",
    initials: "SA",
    tone: "pink",
    location: "Mexico City",
    bio: [
      `Sofia Alvarez directs illustration at ${B}, where she created the modular illustration kit used across onboarding, empty states, marketing and the help center. She also leads the representation reviews that shape who appears in the brand's scenes and in what roles.`,
      "Sofia started out drawing children's books and editorial illustrations before leading the visual identity for a design studio's clients in publishing and education. She teaches a yearly workshop on building illustration systems that scale.",
    ],
    focus: ["Illustration systems", "Brand", "Inclusive design"],
  },
  {
    slug: "jordan-blake",
    name: "Jordan Blake",
    role: "Principal Researcher, Future of Work Lab",
    initials: "JB",
    tone: "mint",
    location: "Toronto",
    bio: [
      `Jordan Blake is a principal researcher in the Future of Work Lab at ${B}, which studies how teams communicate, make decisions and protect time for deep work. Jordan leads the lab's large field studies, including its research on recurring meetings and focus time.`,
      "Jordan holds a doctorate in organizational psychology and previously ran workplace research for a university hospital network and a global architecture firm. Their work focuses on practical habits that teams can adopt in a week, not a quarter.",
    ],
    focus: ["Async work", "Meetings and rituals", "Focus time"],
  },
];

export function authorSlug(name: string) {
  return slugify(name);
}

export function getAuthor(slug: string) {
  return authors.find((a) => a.slug === slug);
}
