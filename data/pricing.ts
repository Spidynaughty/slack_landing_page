import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { Faq } from "./types";

export type PlanId = "free" | "pro" | "business" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Price per active user per month; null = contact sales. */
  monthly: number | null;
  annual: number | null;
  cta: { label: string; href: string };
  highlight?: boolean;
  tone: Tone;
  includesFrom?: string;
  features: string[];
};

export const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "For small teams trying it out for the first time.",
    monthly: 0,
    annual: 0,
    cta: { label: "Get started", href: "/get-started" },
    tone: "mint",
    features: [
      "90 days of message history",
      "1:1 huddles and clips",
      "Up to 10 app integrations",
      "1:1 shared channels with other orgs",
      "Canvases in channels and DMs",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For small teams that need unlimited history and group calls.",
    monthly: 10,
    annual: 8.75,
    cta: { label: "Start free trial", href: "/get-started" },
    tone: "sky",
    includesFrom: "Everything in Free, plus:",
    features: [
      "Unlimited message history",
      "Group huddles for up to 50 people",
      "Unlimited apps and workflows",
      "Shared channels with external orgs",
      "Lists with table and board views",
      `${B} AI recaps and thread summaries`,
    ],
  },
  {
    id: "business",
    name: "Business+",
    tagline: "For growing businesses that need AI, scale and admin control.",
    monthly: 18,
    annual: 15,
    cta: { label: "Start free trial", href: "/get-started" },
    highlight: true,
    tone: "violet",
    includesFrom: "Everything in Pro, plus:",
    features: [
      "AI search answers across apps",
      "SAML single sign-on and SCIM",
      "Data exports for all messages",
      "99.9% guaranteed uptime SLA",
      "24/7 support with 4-hour first response",
      "Pre-built agents for every team",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For organizations that need maximum security, compliance and scale.",
    monthly: null,
    annual: null,
    cta: { label: "Contact sales", href: "/contact-sales" },
    tone: "coral",
    includesFrom: "Everything in Business+, plus:",
    features: [
      "Unlimited workspaces and org-wide controls",
      "Enterprise Key Management (EKM)",
      "Data residency in 9 regions",
      "HIPAA support and audit logs",
      "Agentic platform with governance",
      "99.99% uptime SLA and designated success team",
    ],
  },
];

export type CellValue = boolean | string;

export type ComparisonGroup = {
  title: string;
  rows: { label: string; hint?: string; values: Record<PlanId, CellValue> }[];
};

export const comparison: ComparisonGroup[] = [
  {
    title: "Messaging & collaboration",
    rows: [
      { label: "Message history", values: { free: "90 days", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" } },
      { label: "Channels and DMs", values: { free: true, pro: true, business: true, enterprise: true } },
      { label: "Canvases", values: { free: "In channels", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" } },
      { label: "Lists", values: { free: false, pro: true, business: true, enterprise: true } },
      { label: `${B} Connect shared channels`, values: { free: "1:1 only", pro: true, business: true, enterprise: true } },
      { label: "File storage", values: { free: "5 GB", pro: "10 GB / member", business: "20 GB / member", enterprise: "1 TB / member" } },
    ],
  },
  {
    title: "Meetings",
    rows: [
      { label: "Huddles", values: { free: "1:1", pro: "Up to 50", business: "Up to 50", enterprise: "Up to 50" } },
      { label: "Clips (audio & video)", values: { free: true, pro: true, business: true, enterprise: true } },
      { label: "Live captions", values: { free: true, pro: true, business: true, enterprise: true } },
      { label: "AI huddle notes", values: { free: false, pro: true, business: true, enterprise: true } },
    ],
  },
  {
    title: "AI & agents",
    rows: [
      { label: "AI recaps and thread summaries", values: { free: false, pro: true, business: true, enterprise: true } },
      { label: "AI search answers", values: { free: false, pro: false, business: true, enterprise: true } },
      { label: "Pre-built agents", values: { free: false, pro: false, business: true, enterprise: true } },
      { label: "Custom agents & agentic platform", values: { free: false, pro: false, business: false, enterprise: true } },
    ],
  },
  {
    title: "Automation & integrations",
    rows: [
      { label: "App integrations", values: { free: "10", pro: "Unlimited", business: "Unlimited", enterprise: "Unlimited" } },
      { label: "Workflow Builder", values: { free: "Templates only", pro: true, business: true, enterprise: true } },
      { label: "Premium workflow connectors", values: { free: false, pro: false, business: true, enterprise: true } },
      { label: "Enterprise search across apps", values: { free: false, pro: false, business: "Basic", enterprise: "Advanced" } },
    ],
  },
  {
    title: "Security & administration",
    rows: [
      { label: "Two-factor authentication", values: { free: true, pro: true, business: true, enterprise: true } },
      { label: "SAML SSO & SCIM", values: { free: false, pro: false, business: true, enterprise: true } },
      { label: "Data exports", values: { free: "Public only", pro: "Public only", business: "All messages", enterprise: "All messages" } },
      { label: "Enterprise Key Management", values: { free: false, pro: false, business: false, enterprise: true } },
      { label: "Data residency", values: { free: false, pro: false, business: false, enterprise: "9 regions" } },
      { label: "Audit logs & DLP", values: { free: false, pro: false, business: false, enterprise: true } },
    ],
  },
  {
    title: "Support",
    rows: [
      { label: "Help Centre & community", values: { free: true, pro: true, business: true, enterprise: true } },
      { label: "Support response", values: { free: "Standard", pro: "Standard", business: "24/7, 4-hour", enterprise: "24/7, 1-hour critical" } },
      { label: "Uptime SLA", values: { free: false, pro: false, business: "99.9%", enterprise: "99.99%" } },
      { label: "Designated success team", values: { free: false, pro: false, business: false, enterprise: true } },
    ],
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "What counts as an active user?",
    a: `You're only billed for members who are active. If someone stops using ${B} for 14 days, we automatically credit your account for the unused time with our fair billing policy.`,
  },
  {
    q: "Can I try a paid plan before I buy?",
    a: "Yes. Every new workspace can start a 30-day free trial of Pro or Business+ with no credit card. At the end of the trial you can pick a plan or stay on Free.",
  },
  {
    q: "How does annual billing work?",
    a: "Paying annually saves up to 17% compared with monthly billing. You can add people at any time and we'll prorate the cost for the rest of your billing year.",
  },
  {
    q: "Do you offer discounts for nonprofits and education?",
    a: "Qualified nonprofits get Pro for free for up to 250 members, and education institutions receive an 85% discount on Pro and Business+.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Upgrade instantly from your billing settings. If you downgrade, the change takes effect at the end of your current billing period.",
  },
  {
    q: "Which payment methods do you accept?",
    a: "We accept major credit and debit cards on all paid plans. Annual Business+ and Enterprise customers can also pay by invoice and bank transfer.",
  },
];

/** Content for /pricing/paid-vs-free */
export const paidVsFree = {
  rows: [
    { label: "Message & file history", free: "Last 90 days", paid: "Unlimited, searchable forever" },
    { label: "Huddles", free: "1:1 only", paid: "Up to 50 people with screen sharing" },
    { label: "Apps and integrations", free: "Up to 10", paid: "Unlimited, plus premium connectors" },
    { label: "Workflow Builder", free: "Templates only", paid: "Build custom automations" },
    { label: "Working with other companies", free: "1:1 shared DMs", paid: "Shared channels with up to 250 orgs" },
    { label: "AI", free: "Not included", paid: "Recaps, summaries, search answers and agents" },
    { label: "Security", free: "Two-factor authentication", paid: "SSO, SCIM, exports, EKM and data residency" },
    { label: "Support", free: "Help Centre", paid: "24/7 support with guaranteed response times" },
  ],
};
