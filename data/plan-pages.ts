import type { FieldDef } from "@/components/forms/lead-form";
import type { IconName } from "@/components/ui/icon";
import { B } from "@/lib/site";
import type { Tone } from "@/lib/tones";
import { comparison, plans, pricingFaqs, type CellValue, type Plan, type PlanId } from "./pricing";
import type { Faq } from "./types";

/*
 * Content for /pricing/[plan], /pricing/nonprofits and /pricing/education.
 * Prices, feature lists and comparison values are always read from data/pricing.ts
 * so these pages can never disagree with the main pricing page.
 */

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function planById(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan id: ${id}`);
  return plan;
}

/** Formats a USD price the same way the main pricing cards do ($8.75, $10, $1.50). */
export function formatPrice(value: number): string {
  return `$${value % 1 === 0 ? value : value.toFixed(2)}`;
}

/** Price after a percentage discount, rounded to the cent. */
export function discountedPrice(value: number, percentOff: number): number {
  return Math.round(value * (100 - percentOff)) / 100;
}

/** Whole-number percentage saved by paying annually, or null for free/custom plans. */
export function annualSavings(plan: Plan): number | null {
  if (!plan.monthly || plan.annual === null) return null;
  return Math.round((1 - plan.annual / plan.monthly) * 100);
}

/** Short headline price: "$0", "$8.75" (annual) or "Custom pricing". */
export function planPriceLabel(plan: Plan): string {
  if (plan.monthly === null) return "Custom pricing";
  if (plan.monthly === 0) return "$0";
  return formatPrice(plan.annual ?? plan.monthly);
}

function priceSentence(plan: Plan): string {
  if (plan.monthly === null || plan.annual === null) return "priced individually for each organization";
  return `${formatPrice(plan.annual)} per active user per month billed annually, or ${formatPrice(plan.monthly)} billed monthly`;
}

/** Text value of a comparison row for one plan (throws if the row is missing or not text). */
function cellText(label: string, id: PlanId): string {
  for (const group of comparison) {
    const row = group.rows.find((r) => r.label === label);
    const value = row?.values[id];
    if (typeof value === "string") return value;
  }
  throw new Error(`No text value for "${label}" on the ${id} plan`);
}

export type PlanFeatureGroup = {
  title: string;
  rows: { label: string; hint?: string; value: CellValue }[];
};

/** Every comparison group and row, reduced to a single plan's values. */
export function planFeatureGroups(id: PlanId): PlanFeatureGroup[] {
  return comparison.map((g) => ({
    title: g.title,
    rows: g.rows.map((r) => ({ label: r.label, hint: r.hint, value: r.values[id] })),
  }));
}

const pro = planById("pro");
const business = planById("business");

/* ------------------------------------------------------------------ */
/* Plan pages                                                          */
/* ------------------------------------------------------------------ */

export type PlanSlug = "free" | "pro" | "business-plus" | "enterprise";

export type PlanHighlight = { icon: IconName; title: string; body: string; href?: string; cta?: string };

export type PlanPage = {
  slug: PlanSlug;
  planId: PlanId;
  hero: { title: string; highlight: string; subtitle: string };
  bestFor: string[];
  highlights: PlanHighlight[];
  quote: { quote: string; name: string; role: string };
  faqs: Faq[];
  /** Questions from `pricingFaqs` (data/pricing.ts) that are also shown on this page. */
  sharedFaqs: string[];
  ctaBand: { title: string; subtitle: string };
  seo: { title: string; description: string };
};

export const planPages: PlanPage[] = [
  {
    slug: "free",
    planId: "free",
    hero: {
      title: "Bring your team together for free",
      highlight: "for free",
      subtitle: `Try ${B} with your team at no cost. Talk in channels, meet in 1:1 huddles and connect up to ${cellText("App integrations", "free")} apps for as long as you like.`,
    },
    bestFor: [
      "Small teams and side projects trying channels for the first time",
      "Clubs, communities and study groups that don't need long-term history",
      `Teams evaluating ${B} before they commit to a paid plan`,
    ],
    highlights: [
      {
        icon: "hash",
        title: "Channels for every topic",
        body: "Organize conversations by project, team or topic so everyone finds what they need without digging through inboxes.",
        href: "/features/channels",
        cta: "Explore channels",
      },
      {
        icon: "headphones",
        title: "1:1 huddles and clips",
        body: "Jump into a quick audio or video huddle, or record a clip to explain something without booking a meeting.",
        href: "/features/huddles",
        cta: "Explore huddles",
      },
      {
        icon: "puzzle",
        title: `Up to ${cellText("App integrations", "free")} integrations`,
        body: "Connect the tools you already use, from calendars to file storage, and bring their updates into your channels.",
        href: "/integrations",
        cta: "Browse integrations",
      },
    ],
    quote: {
      quote: "We ran our whole volunteer festival on the Free plan. Channels replaced three group chats and a spreadsheet nobody could ever find.",
      name: "Tamsin Okafor",
      role: "Organizer, Riverside Makers Fair",
    },
    faqs: [
      {
        q: "Is the Free plan really free forever?",
        a: "Yes. There's no time limit and no credit card required. Keep using Free for as long as it works for your team and upgrade only when you need more.",
      },
      {
        q: `What happens to messages older than ${cellText("Message history", "free")}?`,
        a: `They're hidden, not deleted. On Free you can see and search the last ${cellText("Message history", "free")} of messages and files. Upgrade to any paid plan and your full history becomes searchable again.`,
      },
      {
        q: "How many people can join a Free workspace?",
        a: "There's no cap on members. Invite your whole team; the limits on Free are around history, huddles, integrations and admin tools rather than headcount.",
      },
      {
        q: "Can I work with people outside my organization on Free?",
        a: "Yes, in 1:1 shared conversations with one person at another organization. Shared channels with whole external teams are included with Pro and above.",
      },
    ],
    sharedFaqs: ["Can I try a paid plan before I buy?", "Can I switch plans later?"],
    ctaBand: { title: "Start your free workspace", subtitle: "Set up in minutes. No credit card and no time limit." },
    seo: {
      title: "Free plan: team chat at no cost",
      description: `Use ${B} Free with no time limit: channels, 1:1 huddles, clips, canvases and up to ${cellText("App integrations", "free")} app integrations. See everything included and when to upgrade.`,
    },
  },
  {
    slug: "pro",
    planId: "pro",
    hero: {
      title: "Everything a small team needs to do its best work",
      highlight: "its best work",
      subtitle: `Pro removes the limits of Free with unlimited message history, group huddles for ${cellText("Huddles", "pro").toLowerCase()} people, unlimited apps and ${B} AI recaps.`,
    },
    bestFor: [
      "Small businesses and startups that rely on chat every day",
      "Teams that work with clients, agencies or freelancers in shared channels",
      "Groups that need searchable history and regular group calls",
    ],
    highlights: [
      {
        icon: "infinity",
        title: "Unlimited message history",
        body: "Search every message and file your team has ever shared, so decisions and context never disappear.",
      },
      {
        icon: "users",
        title: `Group huddles for ${cellText("Huddles", "pro").toLowerCase()}`,
        body: "Start a group call with screen sharing right from a channel, then let AI huddle notes capture what was decided.",
        href: "/features/huddles",
        cta: "Explore huddles",
      },
      {
        icon: "sparkles",
        title: `${B} AI recaps`,
        body: "Catch up on busy channels and long threads in seconds with AI-generated recaps and thread summaries.",
        href: "/features/ai",
        cta: `Explore ${B} AI`,
      },
    ],
    quote: {
      quote: "Moving to Pro was the moment our chat history became our company memory. New hires scroll back instead of asking around.",
      name: "Daniel Reyes-Hart",
      role: "Co-founder, Brightloop Studio",
    },
    faqs: [
      {
        q: "How much does Pro cost?",
        a: `Pro is ${priceSentence(pro)}. You only pay for active members, and fair billing credits you automatically when someone stops using ${B}.`,
      },
      {
        q: "Can we work with other companies on Pro?",
        a: "Yes. Pro includes shared channels, so you can invite clients, partners and vendors into the same channel and keep project work out of email.",
      },
      {
        q: "Does Pro include AI?",
        a: "Yes. Pro includes AI recaps, thread summaries and AI huddle notes. AI search answers across apps and pre-built agents are available on Business+ and Enterprise.",
      },
      {
        q: "How much file storage do Pro members get?",
        a: `Pro includes ${cellText("File storage", "pro")} of file storage, pooled across the workspace. ${business.name} raises that to ${cellText("File storage", "business")}.`,
      },
    ],
    sharedFaqs: ["What counts as an active user?", "How does annual billing work?"],
    ctaBand: { title: "Try Pro free for 30 days", subtitle: "No credit card required. Keep everything you've built when you upgrade." },
    seo: {
      title: "Pro plan: unlimited history and group huddles",
      description: `${B} Pro gives small teams unlimited message history, group huddles for ${cellText("Huddles", "pro").toLowerCase()}, unlimited apps and AI recaps. Compare prices and every feature included.`,
    },
  },
  {
    slug: "business-plus",
    planId: "business",
    hero: {
      title: "Scale securely with AI built into every team",
      highlight: "AI built into every team",
      subtitle: `Business+ adds AI search answers, pre-built agents, SAML single sign-on, full data exports and 24/7 support backed by a ${cellText("Uptime SLA", "business")} uptime SLA.`,
    },
    bestFor: [
      "Growing companies that need single sign-on and automated provisioning",
      "Teams putting AI search and agents to work across departments",
      "Businesses that need guaranteed uptime and round-the-clock support",
    ],
    highlights: [
      {
        icon: "search",
        title: "AI search answers",
        body: "Ask a question and get a cited answer drawn from messages, files and connected apps, without hunting through channels.",
        href: "/features/enterprise-search",
        cta: "Explore search",
      },
      {
        icon: "bot",
        title: "Pre-built agents",
        body: "Put ready-made agents to work for sales, support, IT and HR, right inside the channels where work already happens.",
        href: "/ai-agents",
        cta: "Explore agents",
      },
      {
        icon: "shieldCheck",
        title: "SAML SSO and SCIM",
        body: "Give everyone one secure sign-in and automate provisioning and deprovisioning from your identity provider.",
        href: "/trust/security",
        cta: "See security",
      },
    ],
    quote: {
      quote: "Business+ gave IT the controls it needed and gave everyone else AI answers they actually use. 'Where is that doc?' questions basically stopped.",
      name: "Priya Lindqvist",
      role: "Head of IT, Northfield Outfitters",
    },
    faqs: [
      {
        q: "How much does Business+ cost?",
        a: `Business+ is ${priceSentence(business)}. Every new workspace can try it free for 30 days first.`,
      },
      {
        q: "What's the difference between Pro and Business+?",
        a: `Business+ adds AI search answers, pre-built agents, SAML SSO and SCIM, exports of all messages, a ${cellText("Uptime SLA", "business")} uptime SLA and 24/7 support with guaranteed response times.`,
      },
      {
        q: "Can we export all of our messages?",
        a: "Yes. Business+ admins can export data from all channels and conversations, subject to your organization's policies. Free and Pro export public channel content only.",
      },
      {
        q: "What does the uptime SLA cover?",
        a: `Business+ includes a ${cellText("Uptime SLA", "business")} guaranteed uptime SLA. If we miss it in a given month, we credit your account automatically based on how much downtime occurred.`,
      },
    ],
    sharedFaqs: ["What counts as an active user?", "Which payment methods do you accept?"],
    ctaBand: { title: "Try Business+ free for 30 days", subtitle: "Bring AI search, agents and enterprise-grade controls to your whole team." },
    seo: {
      title: "Business+ plan: AI, SSO and 24/7 support",
      description: `${B} Business+ adds AI search answers, pre-built agents, SAML SSO, full data exports and 24/7 support with an uptime SLA. See pricing and every feature.`,
    },
  },
  {
    slug: "enterprise",
    planId: "enterprise",
    hero: {
      title: "Security, compliance and control at any scale",
      highlight: "at any scale",
      subtitle: `Enterprise brings unlimited workspaces, Enterprise Key Management, data residency and a governed agentic platform to the largest organizations on ${B}.`,
    },
    bestFor: [
      "Large organizations running many teams, business units or subsidiaries",
      "Regulated industries with strict compliance, residency and audit needs",
      "Companies building custom agents that need central governance",
    ],
    highlights: [
      {
        icon: "key",
        title: "Enterprise Key Management",
        body: "Control the encryption keys for your messages and files, with detailed access logs and the ability to revoke access at any time.",
        href: "/enterprise-key-management",
        cta: "Learn about EKM",
      },
      {
        icon: "globe",
        title: "Data residency",
        body: `Choose where your data is stored, with data residency available in ${cellText("Data residency", "enterprise")} to meet local regulations.`,
        href: "/trust/data-management",
        cta: "See data management",
      },
      {
        icon: "network",
        title: "Governed agentic platform",
        body: "Build custom agents and deploy them across the organization with admin approval, permissions and audit trails.",
        href: "/features/agentic-platform",
        cta: "Explore the platform",
      },
    ],
    quote: {
      quote: "With Enterprise we consolidated 40 workspaces into one governed organization. Security got audit logs and key management; teams kept the tool they love.",
      name: "Marcus Ellery",
      role: "CIO, Halvorsen Freight Group",
    },
    faqs: [
      {
        q: "How is Enterprise priced?",
        a: "Enterprise pricing is tailored to your organization's size, deployment and support needs. Talk to our sales team for a quote, including volume and multi-year pricing.",
      },
      {
        q: "Is there a minimum number of seats?",
        a: "There's no hard minimum. Enterprise is designed for organizations that need org-wide controls, and our team will help you decide whether Enterprise or Business+ is the better fit.",
      },
      {
        q: "Does Enterprise support HIPAA and other compliance needs?",
        a: "Yes. Enterprise supports HIPAA-regulated workloads and includes audit logs and data loss prevention. Our trust center lists current certifications and attestations.",
      },
      {
        q: "What does the designated success team do?",
        a: "Your success team helps plan the rollout, migrate from other tools, train admins and champions, and review adoption with you regularly. Critical issues get our fastest response times.",
      },
    ],
    sharedFaqs: ["Which payment methods do you accept?", "Can I switch plans later?"],
    ctaBand: { title: "Let's plan your Enterprise rollout", subtitle: "Talk to our team about security reviews, migration and pricing for your organization." },
    seo: {
      title: "Enterprise plan: security and control at scale",
      description: `${B} Enterprise delivers unlimited workspaces, Enterprise Key Management, data residency, audit logs and governed agents. Talk to sales for custom pricing.`,
    },
  },
];

export function getPlanPage(slug: string): (PlanPage & { plan: Plan }) | undefined {
  const page = planPages.find((p) => p.slug === slug);
  return page ? { ...page, plan: planById(page.planId) } : undefined;
}

/** URL of a plan's own page, e.g. "business" -> "/pricing/business-plus". */
export function planPageHref(id: PlanId): string {
  const page = planPages.find((p) => p.planId === id);
  return page ? `/pricing/${page.slug}` : "/pricing";
}

/** Plan-specific FAQs followed by the shared pricing FAQs chosen for that plan. */
export function planFaqs(page: PlanPage): Faq[] {
  return [...page.faqs, ...pricingFaqs.filter((f) => page.sharedFaqs.includes(f.q))];
}

/* ------------------------------------------------------------------ */
/* Discount programs                                                   */
/* ------------------------------------------------------------------ */

export const NONPROFIT_FREE_MEMBERS = 250;
export const NONPROFIT_DISCOUNT = 85;
export const EDUCATION_DISCOUNT = 85;

export type ProgramSlug = "nonprofits" | "education";

/** A discount on one plan; the page computes the program price from data/pricing.ts. */
export type ProgramOffer = { planId: PlanId; percentOff: number; note: string };

export type Program = {
  slug: ProgramSlug;
  name: string;
  path: `/pricing/${ProgramSlug}`;
  tone: Tone;
  hero: { eyebrow: string; title: string; highlight: string; subtitle: string };
  offers: ProgramOffer[];
  eligibility: string[];
  notEligible: string[];
  related: { label: string; href: string };
  included: PlanHighlight[];
  steps: { title: string; body: string }[];
  form: {
    title: string;
    intro: string;
    needs: string[];
    orgLabel: string;
    orgTypes: string[];
    detailsLabel: string;
    detailsPlaceholder: string;
    confirmLabel: string;
    submitLabel: string;
    successTitle: string;
    successBody: string;
  };
  faqs: Faq[];
  cta: { title: string; subtitle: string };
  seo: { title: string; description: string };
};

export const programs: Record<ProgramSlug, Program> = {
  nonprofits: {
    slug: "nonprofits",
    name: "Nonprofits",
    path: "/pricing/nonprofits",
    tone: "pink",
    hero: {
      eyebrow: "Nonprofit program",
      title: "More time for your mission, less time in inboxes",
      highlight: "your mission",
      subtitle: `Qualified nonprofits get ${B} ${pro.name} free for up to ${NONPROFIT_FREE_MEMBERS} members, plus deep discounts for larger teams and ${business.name}.`,
    },
    offers: [
      {
        planId: "pro",
        percentOff: 100,
        note: `Free for up to ${NONPROFIT_FREE_MEMBERS} members. Larger nonprofits get ${NONPROFIT_DISCOUNT}% off ${pro.name} for every member.`,
      },
      {
        planId: "business",
        percentOff: NONPROFIT_DISCOUNT,
        note: "For nonprofits that need single sign-on, full data exports and AI search answers.",
      },
    ],
    eligibility: [
      "A registered charity or nonprofit organization in your country, such as a 501(c)(3) in the United States",
      "Operates for charitable, humanitarian, environmental or community purposes",
      `Uses ${B} for the organization's mission, not for a commercial subsidiary`,
      "The workspace is owned and administered by the organization",
      "Can share proof of status, such as a registration number or determination letter",
    ],
    notEligible: [
      "Government agencies and public bodies",
      "Political parties, campaigns and lobbying groups",
      "Schools and universities, which qualify for education pricing instead",
      "Professional and trade associations",
    ],
    related: { label: "School or university? See education pricing", href: "/pricing/education" },
    included: [
      {
        icon: "gift",
        title: `${pro.name} at no cost`,
        body: `Unlimited history, group huddles and unlimited apps for up to ${NONPROFIT_FREE_MEMBERS} members, free while you remain eligible.`,
        href: "/pricing/pro",
        cta: `See the ${pro.name} plan`,
      },
      {
        icon: "trending",
        title: "Discounts as you grow",
        body: `Beyond ${NONPROFIT_FREE_MEMBERS} members, or when you need ${business.name}, your organization keeps ${NONPROFIT_DISCOUNT}% off.`,
      },
      {
        icon: "handshake",
        title: "Shared channels with partners",
        body: "Coordinate with volunteers, funders and partner organizations in shared channels instead of long email chains.",
        href: "/connect",
        cta: "Explore shared channels",
      },
      {
        icon: "book",
        title: "Training and community",
        body: "Get onboarding guides, volunteer coordination templates and a community of nonprofit admins to learn from.",
        href: "/community",
        cta: "Join the community",
      },
    ],
    steps: [
      { title: "Check your eligibility", body: "Review the criteria above and make sure the workspace you want discounted is owned by your organization." },
      { title: "Submit the application", body: "Fill in the form below with your organization's details and a link to your public registration or website." },
      { title: "Verify your status", body: "Our verification team may ask for a registration number or determination letter. Most reviews finish within 10 business days." },
      { title: `Start using ${pro.name}`, body: "Once approved, the discount is applied to your workspace automatically and we email the workspace owner." },
    ],
    form: {
      title: "Apply for the nonprofit program",
      intro: "Tell us about your organization. It takes about five minutes and you can keep using your workspace while we review.",
      needs: ["Your registration or tax-exempt number", "A public website or registry listing", "The workspace you'd like discounted"],
      orgLabel: "Organization name",
      orgTypes: [
        "Registered charity or nonprofit",
        "Foundation or grant-maker",
        "Community or volunteer group",
        "Humanitarian or relief organization",
        "Environmental or conservation group",
        "Other",
      ],
      detailsLabel: "Tell us about your mission",
      detailsPlaceholder: `What does your organization do, and how will your team use ${B}?`,
      confirmLabel: "I confirm this organization meets the eligibility criteria and that I'm authorized to apply on its behalf.",
      submitLabel: "Submit application",
      successTitle: "Application received",
      successBody: "Thanks for applying. We'll review your details and email you within 10 business days.",
    },
    faqs: [
      {
        q: "How long does approval take?",
        a: "Most applications are reviewed within 10 business days. If we need more information we'll email you, and your workspace keeps working normally in the meantime.",
      },
      {
        q: `What happens if we grow beyond ${NONPROFIT_FREE_MEMBERS} members?`,
        a: `You keep a discount. Workspaces with more than ${NONPROFIT_FREE_MEMBERS} active members get ${NONPROFIT_DISCOUNT}% off ${pro.name} for every member instead of the free allowance.`,
      },
      {
        q: "Can our volunteers use the workspace?",
        a: "Yes. Staff, volunteers and board members can all join. Billing is based on active members, so occasional volunteers only count while they're active.",
      },
      {
        q: "Do we need to reapply every year?",
        a: "We may ask you to confirm your status once a year. We'll email the workspace owner ahead of time, and your discount continues while we review.",
      },
    ],
    cta: { title: "Put your mission at the center", subtitle: "Apply in minutes and bring staff, volunteers and partners together in one place." },
    seo: {
      title: `Nonprofit program: ${pro.name} free for up to ${NONPROFIT_FREE_MEMBERS} members`,
      description: `Qualified nonprofits get ${B} ${pro.name} free for up to ${NONPROFIT_FREE_MEMBERS} members, with deep discounts beyond that. Check eligibility, see what's included and apply online.`,
    },
  },
  education: {
    slug: "education",
    name: "Education",
    path: "/pricing/education",
    tone: "mint",
    hero: {
      eyebrow: "Education program",
      title: "Bring your whole campus together for less",
      highlight: "for less",
      subtitle: `Accredited schools, colleges and universities get ${EDUCATION_DISCOUNT}% off ${B} ${pro.name} and ${business.name} for faculty, staff and students.`,
    },
    offers: [
      { planId: "pro", percentOff: EDUCATION_DISCOUNT, note: "For departments, labs, classes and student organizations." },
      { planId: "business", percentOff: EDUCATION_DISCOUNT, note: "For campus-wide rollouts that need SSO, SCIM and full data exports." },
    ],
    eligibility: [
      "An accredited K-12 school, college, university or community college",
      "Public or private institutions that award recognized qualifications",
      "The workspace is owned by the institution, a department or an official student organization",
      "Used for teaching, learning, research or campus administration",
      "Can verify with an institutional email domain or accreditation details",
    ],
    notEligible: [
      "Tutoring, test-prep and coaching businesses",
      "Corporate training and professional development providers",
      "Individual students or teachers without institutional approval",
      "Education technology vendors",
    ],
    related: { label: "Running a charity? See the nonprofit program", href: "/pricing/nonprofits" },
    included: [
      {
        icon: "graduation",
        title: `${EDUCATION_DISCOUNT}% off two plans`,
        body: `The same discount applies to ${pro.name} and ${business.name}, on both monthly and annual billing.`,
        href: "/pricing/business-plus",
        cta: `See the ${business.name} plan`,
      },
      {
        icon: "school",
        title: "Channels for every course",
        body: "Create channels for classes, labs, clubs and departments so announcements and discussions stay organized.",
        href: "/solutions/education",
        cta: "See it for education",
      },
      {
        icon: "shieldCheck",
        title: "Campus-grade security",
        body: `${business.name} adds SAML single sign-on and SCIM so IT can manage access with existing campus identity systems.`,
        href: "/trust/security",
        cta: "See security",
      },
      {
        icon: "users",
        title: "Research collaboration",
        body: "Work with other institutions and industry partners in shared channels, with full history on every paid plan.",
      },
    ],
    steps: [
      { title: "Confirm eligibility", body: "Check that your institution is accredited and that the workspace is owned by the school, a department or an official student group." },
      { title: "Apply with your school email", body: "Submit the form below using an address on your institution's domain, plus a link to your school's website." },
      { title: "We verify your institution", body: "Our team confirms accreditation, usually within 5 business days, and may contact your IT department." },
      { title: "Discount applied", body: "Once approved, the discount appears on your next invoice. Add members any time at the education rate." },
    ],
    form: {
      title: "Apply for education pricing",
      intro: "Use your institutional email so we can verify you quickly. You can keep using your workspace while we review.",
      needs: ["An email address on your institution's domain", "Your institution's website", "The workspace you'd like discounted"],
      orgLabel: "School or institution name",
      orgTypes: [
        "K-12 school or district",
        "College or university",
        "Community college",
        "Department or research lab",
        "Official student organization",
        "Other accredited institution",
      ],
      detailsLabel: `How will you use ${B}?`,
      detailsPlaceholder: "Tell us which departments, courses or groups will use the workspace.",
      confirmLabel: "I confirm this institution is accredited and that I'm authorized to apply on its behalf.",
      submitLabel: "Submit application",
      successTitle: "Application received",
      successBody: "Thanks! We'll verify your institution and email you within 5 business days.",
    },
    faqs: [
      {
        q: "Can students use the discounted workspace?",
        a: "Yes. Faculty, staff and students can all be members of an education workspace. You only pay for active members, at the discounted rate.",
      },
      {
        q: "Can an individual department apply?",
        a: "Yes. Departments, labs and official student organizations can apply on their own, as long as the institution approves the workspace.",
      },
      {
        q: "Does education pricing apply to Enterprise?",
        a: "Enterprise pricing for education is quoted individually. Contact our sales team to discuss campus-wide or multi-campus agreements.",
      },
      {
        q: "Can we combine education pricing with annual billing?",
        a: `Yes. The ${EDUCATION_DISCOUNT}% discount applies to both monthly and annual prices, so annual billing gives you the lowest rate.`,
      },
    ],
    cta: { title: "Give your campus one place to connect", subtitle: "Apply for education pricing, or talk to us about a campus-wide rollout." },
    seo: {
      title: `Education pricing: ${EDUCATION_DISCOUNT}% off for schools`,
      description: `Schools, colleges and universities save ${EDUCATION_DISCOUNT}% on ${B} ${pro.name} and ${business.name}. Check eligibility, see what's included and apply for education pricing online.`,
    },
  },
};

export const programCountries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "Australia",
  "India",
  "Brazil",
  "Other",
];

/** Application form fields for a discount program (rendered with LeadForm). */
export function applicationFields(program: Program): FieldDef[] {
  return [
    { name: "organization", label: program.form.orgLabel, required: true, autoComplete: "organization", half: true },
    { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
    { name: "country", label: "Country / region", type: "select", required: true, options: programCountries, half: true },
    { name: "orgType", label: "Organization type", type: "select", required: true, options: program.form.orgTypes, half: true },
    { name: "members", label: "Number of members", type: "number", required: true, placeholder: "e.g. 40", half: true },
    { name: "website", label: "Website", type: "url", autoComplete: "url", placeholder: "https://", half: true },
    { name: "details", label: program.form.detailsLabel, type: "textarea", placeholder: program.form.detailsPlaceholder },
    { name: "confirm", label: program.form.confirmLabel, type: "checkbox", required: true },
  ];
}
