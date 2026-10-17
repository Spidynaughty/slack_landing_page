import type { IconName } from "@/components/ui/icon";
import type { MockupKind } from "@/components/mockups";
import { B } from "@/lib/site";
import type { Faq, Stat } from "./types";

export type Comparison = {
  slug: string;
  name: string;
  competitor: string;
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; highlight: string; subtitle: string; mockup: MockupKind };
  stats: Stat[];
  reasons: { icon: IconName; title: string; body: string }[];
  table: { label: string; us: string | boolean; them: string | boolean }[];
  switching: { title: string; body: string }[];
  faqs: Faq[];
};

export const comparisons: Comparison[] = [
  {
    slug: "slack-vs-email",
    name: `${B} vs email`,
    competitor: "Email",
    seo: {
      title: `${B} vs email: move work out of the inbox`,
      description: `Compare ${B} with email for team communication. See how channels, huddles and automation cut reply-all chains, speed up decisions and keep everyone aligned.`,
    },
    hero: {
      eyebrow: `${B} vs email`,
      title: "Your inbox was never meant to run projects",
      highlight: "run projects",
      subtitle: `Email is great for formal, external messages. For everything else, ${B} gives teams one organized place to talk, decide and get work done.`,
      mockup: "chat-channels",
    },
    stats: [
      { value: 32, suffix: "%", label: "less internal email" },
      { value: 27, suffix: "%", label: "fewer meetings" },
      { value: 3.4, decimals: 1, suffix: "h", label: "saved per person each week" },
    ],
    reasons: [
      { icon: "hash", title: "Organized by topic, not by sender", body: "Channels keep every conversation about a project in one place, so nothing gets buried under newsletters and notifications." },
      { icon: "search", title: "Searchable knowledge for everyone", body: "New teammates scroll up to catch up instead of asking someone to forward a 40-message thread." },
      { icon: "zap", title: "Faster decisions", body: "Reactions, polls and quick huddles resolve in minutes what used to take a day of back-and-forth." },
      { icon: "workflow", title: "Automation built in", body: "Approvals, requests and status updates run themselves with Workflow Builder instead of manual follow-ups." },
    ],
    table: [
      { label: "Conversations organized by project", us: true, them: false },
      { label: "Real-time messaging and presence", us: true, them: false },
      { label: "Instant audio and video huddles", us: true, them: false },
      { label: "Threaded replies without reply-all", us: true, them: "Partial" },
      { label: "Searchable history for new members", us: true, them: false },
      { label: "Built-in automation and AI recaps", us: true, them: false },
      { label: "Formal external communication", us: "Shared channels", them: true },
    ],
    switching: [
      { title: "Start with one project", body: "Create a channel for your noisiest email thread and invite everyone on it." },
      { title: "Forward email into channels", body: "Send any email to a channel address so context lands where the team works." },
      { title: "Set team norms", body: "Agree what belongs in channels, DMs and email. Our templates make it easy." },
    ],
    faqs: [
      { q: `Will ${B} replace email entirely?`, a: `Most teams keep email for formal, external communication and move internal collaboration to ${B}. Shared channels can replace much external email too.` },
      { q: "Can I bring email into channels?", a: "Yes. Each channel can have its own email address, and integrations can post messages from your inbox automatically." },
      { q: "Isn't chat more distracting than email?", a: "Notification schedules, focus modes and AI recaps let people catch up on their own time without missing what matters." },
    ],
  },
  {
    slug: "slack-vs-teams",
    name: `${B} vs Teams`,
    competitor: "Teams",
    seo: {
      title: `${B} vs Teams: compare collaboration platforms`,
      description: `See how ${B} compares with Teams on ease of use, integrations, AI agents, external collaboration and admin controls, and why fast-moving teams choose ${B}.`,
    },
    hero: {
      eyebrow: "Comparison",
      title: `Why fast-moving teams choose ${B}`,
      highlight: "fast-moving teams",
      subtitle: `Both platforms offer chat and meetings. ${B} is built around channels, open integrations and AI agents that fit how modern teams actually work.`,
      mockup: "agent",
    },
    stats: [
      { value: 2600, suffix: "+", label: "apps in the Marketplace" },
      { value: 4.7, decimals: 1, suffix: "/5", label: "average user rating" },
      { value: 250, label: "external orgs per shared channel" },
    ],
    reasons: [
      { icon: "puzzle", title: "An open ecosystem", body: "Connect 2,600+ apps and agents from any vendor, not just one suite, with deep two-way integrations." },
      { icon: "link", title: "Best-in-class external collaboration", body: "Shared channels connect you with partners, vendors and customers as easily as your own team." },
      { icon: "bot", title: "Agents that work in the flow", body: "Bring agents from any provider into channels, with approvals and audit trails built in." },
      { icon: "smile", title: "People actually enjoy using it", body: "Thoughtful design, fast search and delightful details lead to higher adoption across the company." },
    ],
    table: [
      { label: "Channel-based collaboration", us: true, them: true },
      { label: "Apps and integrations", us: "2,600+", them: "Suite-focused" },
      { label: "Shared channels with external orgs", us: "Up to 250 orgs", them: "Limited" },
      { label: "Agents from any vendor", us: true, them: false },
      { label: "No-code Workflow Builder", us: true, them: "Separate product" },
      { label: "Lightweight huddles from any conversation", us: true, them: "Partial" },
      { label: "Enterprise Key Management", us: true, them: true },
    ],
    switching: [
      { title: "Migration assistance", body: "Our migration tools and partners move channels, history and files over a weekend." },
      { title: "Keep your calendar and files", body: "Integrations with the tools you already use mean nothing has to change on day one." },
      { title: "Adoption programme", body: "Champions training, templates and launch kits help every department get started." },
    ],
    faqs: [
      { q: `Can ${B} work alongside our existing productivity suite?`, a: `Yes. ${B} integrates with popular email, calendar and file tools, so people can keep using them while collaborating in channels.` },
      { q: "How long does a migration take?", a: "Most organizations complete a pilot in two weeks and a full rollout in 30 to 90 days, depending on size." },
      { q: "Is it more expensive?", a: "Plans start free and paid plans are priced per active user, so you never pay for people who aren't using it." },
    ],
  },
];

export function getComparison(slug: string) {
  return comparisons.find((c) => c.slug === slug);
}
