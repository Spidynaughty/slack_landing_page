import type { MockupKind } from "@/components/mockups";
import type { IconName } from "@/components/ui/icon";
import { B, site } from "@/lib/site";
import type { Tone } from "@/lib/tones";
import type { Faq, Stat } from "./types";

export type TrustLink = { label: string; href: string };

/** Card rendered with IconCardGrid. */
export type TrustCard = { icon: IconName; title: string; body: string; href?: string; cta?: string };

/** Simple data table. The first cell of each row is rendered as the row header. */
export type TrustTable = { caption: string; columns: string[]; rows: string[][]; note?: string };

/** Compact two-line items, such as data residency regions or regional frameworks. */
export type TrustList = { title: string; icon: IconName; items: { label: string; detail?: string }[] };

export type TrustSection = {
  /** Anchor id, also used by the in-page navigation. */
  id: string;
  title: string;
  /** Shorter label for the in-page navigation. Defaults to `title`. */
  navLabel?: string;
  icon: IconName;
  /** Paragraphs; the first is rendered as the lead. */
  body: string[];
  bullets?: string[];
  /** Ordered, numbered steps. */
  steps?: string[];
  cards?: TrustCard[];
  table?: TrustTable;
  list?: TrustList;
  links?: TrustLink[];
};

export type TrustPage = {
  /** URL slug under /trust/ */
  slug: string;
  /** Full page name used on cards. */
  title: string;
  /** Short label for breadcrumbs. */
  navLabel: string;
  /** One sentence for "More from the Trust Center" cards. */
  summary: string;
  eyebrow: string;
  heroTitle: string;
  /** Substring of `heroTitle` rendered with the brand gradient. */
  highlight?: string;
  subtitle: string;
  icon: IconName;
  tone: Tone;
  /** Hero visual. Pages without one get a centered hero with `heroPoints`. */
  mockup?: MockupKind;
  heroPoints?: string[];
  primary?: TrustLink;
  secondary?: TrustLink;
  seo: { title: string; description: string };
  stats?: Stat[];
  sections: TrustSection[];
  faqs: Faq[];
  /** Sidebar card under the in-page navigation. */
  aside?: { title: string; body: string; link: TrustLink };
  form?: "privacy-request";
  cta?: { title: string; subtitle: string; primary?: TrustLink; secondary?: TrustLink };
};

const regions = [
  { label: "United States", detail: "Default region" },
  { label: "Canada", detail: "Montreal" },
  { label: "European Union", detail: "Frankfurt and Paris" },
  { label: "United Kingdom", detail: "London" },
  { label: "Switzerland", detail: "Zurich" },
  { label: "United Arab Emirates", detail: "Dubai" },
  { label: "India", detail: "Mumbai" },
  { label: "Singapore", detail: "Singapore" },
  { label: "Japan", detail: "Tokyo and Osaka" },
  { label: "South Korea", detail: "Seoul" },
  { label: "Australia", detail: "Sydney" },
  { label: "Brazil", detail: "São Paulo" },
];

export const trustPages: TrustPage[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "compliance",
    title: "Compliance and certifications",
    navLabel: "Compliance",
    summary: "Independent audits, certifications and regional frameworks that back up every control we operate.",
    eyebrow: "Compliance",
    heroTitle: "Certified against the standards you answer to",
    highlight: "standards you answer to",
    subtitle: `${B} is independently audited every year against the security, privacy and industry frameworks that regulated organizations rely on, so your reviews can move faster.`,
    icon: "badge",
    tone: "mint",
    mockup: "security",
    primary: { label: "Request audit reports", href: "/contact-sales" },
    secondary: { label: "Read the security overview", href: "/trust/security" },
    seo: {
      title: "Compliance certifications and attestations",
      description: `See the certifications, attestations and regional frameworks ${B} meets, from SOC 2 Type II and ISO 27001 to HIPAA and FedRAMP, and how to get audit reports.`,
    },
    stats: [
      { value: 12, label: "Global certifications and regulations" },
      { value: 9, label: "Regional frameworks supported" },
      { value: 500, suffix: "+", label: "Controls tested every year" },
      { value: 24, suffix: "/7", label: "Continuous control monitoring" },
    ],
    sections: [
      {
        id: "certifications",
        title: "Certifications and attestations",
        navLabel: "Certifications",
        icon: "badge",
        body: [
          "Third-party auditors examine how we design and operate our security, availability, confidentiality and privacy controls. Reports cover the entire production service, including our web, desktop and mobile apps.",
        ],
        cards: [
          {
            icon: "fileCheck",
            title: "SOC 2 Type II",
            body: "Annual examination of our security, availability, confidentiality and privacy controls over a 12-month observation period.",
          },
          {
            icon: "file",
            title: "SOC 3",
            body: "A public summary of our SOC 2 results that you can share with anyone, with no nondisclosure agreement required.",
          },
          {
            icon: "shieldCheck",
            title: "ISO/IEC 27001",
            body: "Certified information security management system covering the people, processes and technology behind the service.",
          },
          {
            icon: "cloud",
            title: "ISO/IEC 27017",
            body: "Cloud-specific security controls, including a clear split of responsibilities between us and our customers.",
          },
          {
            icon: "lock",
            title: "ISO/IEC 27018",
            body: "Protection of personally identifiable information processed in public cloud environments.",
          },
          {
            icon: "eye",
            title: "ISO/IEC 27701",
            body: "Privacy information management extension to ISO 27001, covering our roles as both controller and processor.",
          },
          {
            icon: "star",
            title: "CSA STAR Level 2",
            body: "Third-party certification against the Cloud Controls Matrix, listed in the public cloud security registry.",
          },
          {
            icon: "bug",
            title: "Annual penetration test",
            body: "Independent testers probe our apps and infrastructure every year. An executive summary is available under NDA.",
          },
        ],
      },
      {
        id: "regulations",
        title: "Regulations and industry requirements",
        navLabel: "Regulations",
        icon: "scale",
        body: [
          "Beyond certifications, we support the legal and industry requirements our customers face, with contractual commitments and product controls to match.",
        ],
        cards: [
          {
            icon: "health",
            title: "HIPAA",
            body: "We sign business associate agreements on Enterprise plans and provide the safeguards covered entities need for protected health information.",
          },
          {
            icon: "landmark",
            title: "FedRAMP Moderate",
            body: "Authorized for U.S. federal agencies handling moderate-impact data, with a dedicated government environment and U.S.-based support.",
          },
          {
            icon: "globe",
            title: "GDPR",
            body: "A data processing addendum, standard contractual clauses, EU data residency and tools that help you answer data subject requests.",
          },
          {
            icon: "userCheck",
            title: "CCPA and CPRA",
            body: "We act as a service provider for customer data, never sell personal information and honor Global Privacy Control signals.",
          },
          {
            icon: "card",
            title: "PCI DSS for billing",
            body: "Subscription payments are handled by a PCI DSS Level 1 service provider, so card numbers never touch our servers.",
          },
          {
            icon: "banknote",
            title: "Financial services records",
            body: "Retention policies, legal holds and complete exports help firms meet recordkeeping and supervision obligations.",
          },
        ],
      },
      {
        id: "regional-frameworks",
        title: "Regional frameworks",
        icon: "globe",
        body: [
          "Public sector and regulated customers around the world often need to meet national requirements. Here is where we hold a regional attestation or have mapped our controls to a local framework.",
        ],
        list: {
          title: "Supported regional frameworks",
          icon: "badge",
          items: [
            { label: "C5", detail: "Germany · Cloud computing compliance criteria" },
            { label: "IRAP", detail: "Australia · Assessed at PROTECTED level" },
            { label: "ISMAP", detail: "Japan · Government cloud security program" },
            { label: "MTCS Level 3", detail: "Singapore · Multi-tier cloud security" },
            { label: "Cyber Essentials Plus", detail: "United Kingdom · Government-backed scheme" },
            { label: "ENS High", detail: "Spain · National security framework" },
            { label: "LGPD", detail: "Brazil · General data protection law" },
            { label: "PIPEDA", detail: "Canada · Federal privacy law" },
            { label: "APPI", detail: "Japan · Personal information protection" },
          ],
        },
      },
      {
        id: "continuous-compliance",
        title: "How we stay compliant all year",
        navLabel: "Continuous compliance",
        icon: "radar",
        body: [
          "An audit is a snapshot. Our controls are monitored every day, so what an auditor sees once a year is how we actually operate the rest of the time.",
        ],
        bullets: [
          "Automated evidence collection and control monitoring across production systems",
          "Quarterly access reviews for every system that stores customer data",
          "Annual security, privacy and acceptable use training for every employee",
          "Vendor risk reviews before onboarding and every year after",
          "An internal audit team that reports to the board’s audit committee",
          "Documented remediation for every finding, tracked to closure",
        ],
      },
      {
        id: "shared-responsibility",
        title: "Shared responsibility",
        icon: "handshake",
        body: [
          `Compliance is a partnership. ${B} secures the platform, the infrastructure and the controls we operate. Your organization decides who has access, how long data is kept and which apps and AI features are allowed.`,
          "Our compliance guides map each framework’s requirements to the settings you control, so your administrators know exactly what to configure.",
        ],
        cards: [
          {
            icon: "server",
            title: `What ${B} manages`,
            body: "Physical and cloud infrastructure, encryption, application security, availability, employee access and independent audits.",
          },
          {
            icon: "settings",
            title: "What your organization manages",
            body: "Member access and SSO, retention and legal holds, app approvals, AI feature settings, guest access and data exports.",
          },
        ],
      },
      {
        id: "audit-reports",
        title: "Request audit reports",
        navLabel: "Request reports",
        icon: "fileSearch",
        body: [
          "Customers and prospects can review our latest SOC 2 Type II report, ISO certificates, penetration test summary, completed security questionnaires and data processing addendum.",
        ],
        steps: [
          "Contact our sales team or your account manager and tell us which documents you need.",
          "Sign our standard nondisclosure agreement electronically, if you haven’t already.",
          "Receive secure access to the documents, usually within two business days.",
          "Book time with our security and compliance team for any follow-up questions.",
        ],
        links: [
          { label: "Request our compliance package", href: "/contact-sales" },
          { label: "Read the security overview", href: "/trust/security" },
        ],
      },
    ],
    faqs: [
      {
        q: "Can we get a copy of your SOC 2 report?",
        a: "Yes. Our SOC 2 Type II report is available to customers and prospects under a nondisclosure agreement. Request it through our sales team or your account manager. Our SOC 3 report can be shared without an NDA.",
      },
      {
        q: `Is ${B} HIPAA compliant?`,
        a: "HIPAA compliance is shared between us and each covered entity. On Enterprise plans we sign a business associate agreement and provide the retention, audit logging and access controls you need to use the service with protected health information.",
      },
      {
        q: "Which plans include FedRAMP Moderate?",
        a: "FedRAMP Moderate applies to our dedicated government environment, available on Enterprise plans for U.S. federal, state and local agencies and their contractors. Our public sector team can walk you through the details.",
      },
      {
        q: "Do you complete security questionnaires?",
        a: "Yes. We keep completed versions of the most common industry questionnaires ready to share, and our team helps with custom questionnaires for larger deployments.",
      },
      {
        q: "How often are your certifications renewed?",
        a: "SOC 2 and CSA STAR examinations happen every year. ISO certifications follow a three-year cycle with annual surveillance audits, and our FedRAMP authorization is monitored continuously with an annual assessment.",
      },
    ],
    aside: {
      title: "Need our audit reports?",
      body: "SOC 2, ISO certificates and penetration test summaries are available under NDA.",
      link: { label: "Request reports", href: "/contact-sales" },
    },
    cta: {
      title: "Make your next security review the easy one",
      subtitle: "Get our audit reports, questionnaire answers and a walkthrough of the controls that matter to your industry.",
      primary: { label: "Request audit reports", href: "/contact-sales" },
      secondary: { label: "Explore Enterprise", href: "/enterprise" },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "data-management",
    title: "Data management",
    navLabel: "Data management",
    summary: "Retention, legal holds, exports, eDiscovery, residency and deletion controls in one place.",
    eyebrow: "Data management",
    heroTitle: "Your data, governed on your terms",
    highlight: "on your terms",
    subtitle: `Decide how long information is kept, where it lives, who can export it and when it’s deleted. ${B} gives admins and compliance teams the controls to prove it.`,
    icon: "database",
    tone: "sun",
    mockup: "files",
    primary: { label: "Talk to our team", href: "/contact-sales" },
    secondary: { label: "How exports work", href: "/help/export-workspace-data" },
    seo: {
      title: "Data management: retention, residency and eDiscovery",
      description: `Control how ${B} data is kept, held, exported and deleted, with retention policies, legal holds, eDiscovery, data residency regions and information barriers.`,
    },
    stats: [
      { value: 12, label: "Data residency regions" },
      { value: 35, label: "Days to purge deleted data from backups" },
      { value: 30, label: "Days to export after cancellation" },
      { value: 100, suffix: "%", label: "Of edits and deletions kept under legal hold" },
    ],
    sections: [
      {
        id: "retention",
        title: "Retention policies",
        icon: "archive",
        body: [
          "Keep messages and files for as long as your policies require, and not a day longer. Set an organization-wide default, then override it for specific workspaces, channels or direct messages.",
        ],
        bullets: [
          "Keep everything, delete after a set period or keep only the latest version of edited messages",
          "Separate policies for messages, files, canvases and huddle recordings",
          "Let channel managers choose shorter periods when your policy allows it",
          "Every policy change is captured in audit logs",
        ],
      },
      {
        id: "legal-holds",
        title: "Legal holds",
        icon: "gavel",
        body: [
          "Preserve everything a custodian sends or receives, including edits and deletions, for as long as a matter requires. Holds override retention policies and are invisible to the people placed on them.",
        ],
        bullets: [
          "Place holds on individual people, channels or entire workspaces",
          "Capture the original and edited versions of every message",
          "Export held data directly to your review platform",
          "Release holds when a matter closes, with a full audit trail",
        ],
      },
      {
        id: "exports",
        title: "Exports and eDiscovery",
        icon: "fileSearch",
        body: [
          "Take your data with you at any time. Owners can export workspace history in open, documented formats, and compliance teams can connect eDiscovery and archiving tools through our Discovery API.",
        ],
        cards: [
          {
            icon: "download",
            title: "Standard exports",
            body: "Public channel history and file links on every plan, delivered as documented JSON files.",
            href: "/help/export-workspace-data",
            cta: "How exports work",
          },
          {
            icon: "folder",
            title: "Full exports",
            body: "Every channel and direct message, including edits and deletions, for eligible plans and legal needs.",
          },
          {
            icon: "plug",
            title: "Discovery API",
            body: "Continuous, filtered access for approved archiving, eDiscovery and data loss prevention partners.",
          },
          {
            icon: "fileCheck",
            title: "Audit-ready records",
            body: "Every export records who requested it, what it included and when it was downloaded.",
          },
        ],
      },
      {
        id: "data-residency",
        title: "Data residency",
        icon: "pin",
        body: [
          "Choose where your messages, files, canvases and search indexes are stored at rest. Data residency is available on Enterprise plans and can be set for a whole organization or for individual workspaces.",
          "Backups stay within the same geography as your primary region, and we add new regions every year.",
        ],
        list: { title: "Available regions", icon: "pin", items: regions },
      },
      {
        id: "deletion",
        title: "Deletion you can count on",
        navLabel: "Deletion",
        icon: "hourglass",
        body: [
          "When content is deleted, whether by a person, a retention policy or at the end of a contract, it is removed from our active systems promptly and purged from backups within 35 days.",
          "If you cancel, owners have 30 days to export data before the organization and its content are permanently deleted. We can confirm deletion in writing on request.",
        ],
      },
      {
        id: "information-barriers",
        title: "Information barriers",
        icon: "layers",
        body: [
          "Prevent specific groups, such as research and trading or two sides of a deal team, from messaging each other, joining the same channels or sharing files.",
        ],
        bullets: [
          "Define barriers between groups synced from your identity provider",
          "Block direct messages, shared channels and huddles between restricted groups",
          "Record every blocked attempt for compliance review",
          "Search and AI answers respect barriers automatically",
        ],
      },
      {
        id: "data-classification",
        title: "Data classification",
        icon: "shield",
        body: [
          "Label channels and workspaces by sensitivity so everyone knows how to handle what’s inside, and let policies follow those labels automatically.",
        ],
        cards: [
          {
            icon: "globe",
            title: "Public",
            body: "Open to everyone in the organization, including guests where your settings allow it.",
          },
          {
            icon: "users",
            title: "Internal",
            body: "Visible to full members only. The default classification for most channels.",
          },
          {
            icon: "lock",
            title: "Confidential",
            body: "Restricted membership, no external sharing and download controls on unmanaged devices.",
          },
          {
            icon: "fileLock",
            title: "Restricted",
            body: "The highest sensitivity. Joining requires approval, and content can be protected with your own encryption keys.",
            href: "/enterprise-key-management",
            cta: "Learn about EKM",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Can we set different retention policies for different teams?",
        a: "Yes. Set an organization-wide default, then override it for individual workspaces or channels. Admins can also let channel managers choose shorter periods within limits you set.",
      },
      {
        q: "Does a legal hold notify the person placed on it?",
        a: "No. Legal holds are invisible to custodians. Only admins with the legal hold permission can see, create or release holds, and every action is recorded in audit logs.",
      },
      {
        q: "Can we move existing data to a new residency region?",
        a: "Yes. Enterprise customers can migrate an existing organization to another region. Migrations run in the background with no downtime, and we confirm when every message, file and index has moved.",
      },
      {
        q: "What happens to our data if we cancel?",
        a: "Owners have 30 days to export data after a subscription ends. After that, the organization and its content are permanently deleted from active systems, and from backups within 35 days.",
      },
    ],
    aside: {
      title: "Planning a migration?",
      body: "Our team can help you design retention, legal hold and residency settings before you move.",
      link: { label: "Talk to our team", href: "/contact-sales" },
    },
    cta: {
      title: "Governance your legal team will sign off on",
      subtitle: "See retention, legal holds, eDiscovery and data residency configured for your industry in a live walkthrough.",
      primary: { label: "Talk to our team", href: "/contact-sales" },
      secondary: { label: "Explore Enterprise", href: "/enterprise" },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "data-requests",
    title: "Government data requests",
    navLabel: "Data requests",
    summary: "How we review legal process, push back on overbroad demands and report every request we receive.",
    eyebrow: "Data requests",
    heroTitle: "How we respond to government requests for data",
    highlight: "government requests",
    subtitle: `${B} requires valid legal process, reads every demand narrowly and tells customers before disclosing anything whenever the law allows. Then we publish the numbers.`,
    icon: "landmark",
    tone: "coral",
    heroPoints: ["Valid legal process required", "Customers notified first", "Twice-yearly transparency report", "No backdoors, ever"],
    primary: { label: "See the latest numbers", href: "#transparency-report" },
    secondary: { label: "Read the Privacy Policy", href: "/legal/privacy" },
    seo: {
      title: "Government data requests and transparency report",
      description: `How ${B} handles law enforcement and government requests for customer data, our user notification policy and transparency report figures for each half-year.`,
    },
    stats: [
      { value: 41, label: "Requests received, January to June 2026" },
      { value: 78, suffix: "%", label: "Resulted in no customer data disclosed" },
      { value: 100, suffix: "%", label: "Reviewed by our legal team" },
      { value: 0, label: "Backdoors in our products" },
    ],
    sections: [
      {
        id: "principles",
        title: "Our principles",
        icon: "scale",
        body: [
          `Customer data belongs to our customers. When a government asks ${B} for it, we hold every request to the same standards, wherever it comes from.`,
        ],
        cards: [
          {
            icon: "gavel",
            title: "Valid legal process",
            body: "We require a subpoena, court order or search warrant appropriate to the data requested. Informal requests are declined.",
          },
          {
            icon: "search",
            title: "Narrow interpretation",
            body: "We challenge requests that are overbroad, vague or unlawful, and disclose only the minimum data the law requires.",
          },
          {
            icon: "building2",
            title: "Customer first",
            body: "We redirect requests to the organization that owns the data, because it is best placed to respond.",
          },
          {
            icon: "bell",
            title: "Notice by default",
            body: "We tell affected customers before disclosing data unless a court order or law prohibits it.",
          },
        ],
      },
      {
        id: "review-process",
        title: "How we review a request",
        navLabel: "Review process",
        icon: "listChecks",
        body: ["Every request is logged and reviewed by our legal team. Here is what happens next."],
        steps: [
          "Our legal team confirms the request comes from an authorized agency and was served through the right channel.",
          "We check that the legal process is valid, specific and appropriate for the type of data requested.",
          "We ask the requester to seek the data from the customer directly, unless that is prohibited or impractical.",
          "If we must respond, we notify the customer, then disclose only the specific data required.",
          "Every request, our response and any pushback are recorded for the next transparency report.",
        ],
      },
      {
        id: "request-types",
        title: "Types of data and legal process",
        navLabel: "Types of requests",
        icon: "file",
        body: [
          "Different kinds of data require different kinds of legal process. We never disclose message content without a search warrant or its local equivalent.",
        ],
        table: {
          caption: "Minimum legal process by type of data",
          columns: ["Type of data", "Examples", "Minimum legal process"],
          rows: [
            ["Subscriber information", "Name, email address, billing contact, sign-up date", "Subpoena or local equivalent"],
            ["Usage records", "Sign-in times, IP addresses, workspace membership", "Court order"],
            ["Customer content", "Messages, files, canvases, huddle recordings", "Search warrant"],
          ],
        },
      },
      {
        id: "emergency-requests",
        title: "Emergency requests",
        icon: "siren",
        body: [
          "If we believe in good faith that there is an imminent risk of death or serious physical injury, we may disclose limited information without legal process.",
          "Emergency requests must come from a verified law enforcement official. Every one is reviewed by our legal team and counted in our transparency report.",
        ],
      },
      {
        id: "international-requests",
        title: "International requests",
        icon: "globe",
        body: [
          "Agencies outside the United States must generally use mutual legal assistance treaties or other recognized international legal processes.",
          "Where a valid cross-border data access agreement applies, we review requests under the same standards described on this page, including customer notice.",
        ],
      },
      {
        id: "notification-policy",
        title: "User notification policy",
        navLabel: "Notification policy",
        icon: "mail",
        body: [
          "Our policy is to notify the affected customer, usually the organization’s primary owner, before we disclose any data, and to give them the chance to challenge the request.",
        ],
        bullets: [
          "We notify by default, with a copy of the request where permitted",
          "If a nondisclosure order applies, we notify as soon as it expires or is lifted",
          "We challenge nondisclosure orders that lack legal support or have no end date",
          "In emergencies involving risk to life, we notify once the danger has passed",
        ],
      },
      {
        id: "transparency-report",
        title: "Transparency report",
        icon: "chart",
        body: [
          "Twice a year we publish how many requests we received, how many accounts they covered and how we responded. Figures include government and law enforcement requests from every country.",
        ],
        table: {
          caption: "Government requests for customer data by half-year",
          columns: ["Period", "Requests received", "Accounts specified", "Some data disclosed", "No data disclosed"],
          rows: [
            ["January to June 2026", "41", "118", "9", "32"],
            ["July to December 2025", "37", "96", "8", "29"],
            ["January to June 2025", "33", "84", "6", "27"],
            ["July to December 2024", "29", "71", "7", "22"],
          ],
          note: "National security requests are reported in the ranges permitted by law: 0 to 249 for every period shown.",
        },
        list: {
          title: "Requests by type, January to June 2026",
          icon: "file",
          items: [
            { label: "Subpoenas", detail: "22 requests" },
            { label: "Court orders", detail: "9 requests" },
            { label: "Search warrants", detail: "6 requests" },
            { label: "Emergency requests", detail: "4 requests" },
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Do you build backdoors for governments?",
        a: "No. We have never built a backdoor into our products and we will challenge any attempt to require one. No government has direct access to our systems or to customer data.",
      },
      {
        q: "Will you tell us if a government asks for our data?",
        a: "Yes, unless the law or a court order prohibits it. We notify the organization that owns the data before disclosing anything, and if a nondisclosure order applies, we notify as soon as it ends.",
      },
      {
        q: "Do you comply with every request you receive?",
        a: "No. In the first half of 2026, 78% of requests resulted in no customer data being disclosed, often because the request was withdrawn, redirected to the customer or rejected as invalid.",
      },
      {
        q: "How can law enforcement submit a request?",
        a: `Requests must be served on ${B}, Inc. through the official channels in our law enforcement guidelines, available on request through our contact page. We do not accept requests over chat or social media.`,
      },
    ],
    aside: {
      title: "Questions for our legal team?",
      body: "We’re happy to explain our request process and contractual commitments.",
      link: { label: "Contact us", href: "/contact" },
    },
    cta: {
      title: "Questions about how we protect your data?",
      subtitle: "Our legal and privacy teams can walk you through our request process, notification policy and contractual commitments.",
      primary: { label: "Contact us", href: "/contact" },
      secondary: { label: "Visit the Trust Center", href: "/trust" },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "privacy",
    title: `Privacy at ${B}`,
    navLabel: "Privacy",
    summary: "Our privacy principles, what we collect and why, your rights and the providers that help us.",
    eyebrow: "Privacy",
    heroTitle: "Privacy built in, not bolted on",
    highlight: "built in",
    subtitle: `Your organization owns its data. We collect only what we need to run ${B}, explain why we need it and never sell it. Here’s how we put that into practice.`,
    icon: "eye",
    tone: "violet",
    heroPoints: ["We never sell personal data", "No ads based on your content", "AI isn’t trained on your messages", "Export and delete anytime"],
    primary: { label: "Read the Privacy Policy", href: "/legal/privacy" },
    secondary: { label: "Make a privacy request", href: "/trust/privacy-request" },
    seo: {
      title: "Privacy principles, data use and your rights",
      description: `How ${B} approaches privacy: our principles, what data we collect and why, the rights you can exercise, our sub-processors and how to reach our privacy team.`,
    },
    stats: [
      { value: 0, label: "Pieces of personal data sold, ever" },
      { value: 30, label: "Days to respond to privacy requests" },
      { value: 12, label: "Data residency regions" },
    ],
    sections: [
      {
        id: "principles",
        title: "Our privacy principles",
        navLabel: "Principles",
        icon: "heart",
        body: ["Six commitments guide every product decision that touches personal information."],
        cards: [
          {
            icon: "userCheck",
            title: "You stay in control",
            body: "Your organization decides what is shared, who can see it and how long it is kept. We process customer data only on its instructions.",
          },
          {
            icon: "eye",
            title: "Transparency",
            body: "We explain what we collect and why in plain language, and tell you before anything important changes.",
          },
          {
            icon: "target",
            title: "Data minimization",
            body: "We collect only what we need to provide, secure and improve the service, and delete it when we no longer need it.",
          },
          {
            icon: "shieldCheck",
            title: "Security by default",
            body: "Encryption, strict access controls and independent audits protect every piece of information we hold.",
            href: "/trust/security",
            cta: "Security overview",
          },
          {
            icon: "banknote",
            title: "No selling, no ad targeting",
            body: "We don’t sell personal information, and we never use your messages or files to target advertising.",
          },
          {
            icon: "brain",
            title: "Responsible AI",
            body: "AI features respect existing permissions, and customer data is never used to train generalized models.",
            href: "/trust/ai-principles",
            cta: "Our AI principles",
          },
        ],
      },
      {
        id: "data-we-collect",
        title: "What we collect and why",
        navLabel: "What we collect",
        icon: "database",
        body: [
          "We handle two kinds of information: customer data, which your organization controls, and the limited information we need to operate the service as a company.",
        ],
        table: {
          caption: "Information we collect and why",
          columns: ["Information", "Examples", "Why we need it"],
          rows: [
            ["Account information", "Name, email address, profile photo, job title", "To create your account, let colleagues find you and keep it secure"],
            ["Customer content", "Messages, files, canvases, lists, huddle recordings", "To deliver the service your organization uses, on its instructions"],
            ["Usage information", "Features used, actions taken, timestamps", "To operate, troubleshoot and improve the service in aggregate"],
            ["Device and log data", "IP address, browser, operating system, crash reports", "To keep the service secure, detect abuse and fix problems"],
            ["Billing information", "Billing contact, plan and invoice history", "To manage subscriptions. Card numbers stay with our payment processor"],
            ["Website cookies", "Preferences, analytics and, with consent, marketing cookies", "To run our websites and measure campaigns, based on your choices"],
          ],
        },
        links: [
          { label: "Read the full Privacy Policy", href: "/legal/privacy" },
          { label: "Read our Cookie Policy", href: "/cookie-policy" },
        ],
      },
      {
        id: "your-rights",
        title: "Your privacy rights",
        navLabel: "Your rights",
        icon: "scale",
        body: [
          "Depending on where you live, you have rights over your personal information. You can exercise many of them directly in your account settings, and we extend these core rights to every user, not only where the law requires them.",
          `If you use ${B} through an employer or school, some requests are best handled by your workspace administrator, who controls your organization’s customer data. We’ll help route your request if you’re not sure.`,
        ],
        cards: [
          { icon: "fileSearch", title: "Access", body: "Ask for a copy of the personal information we hold about you." },
          { icon: "pen", title: "Correction", body: "Fix information about you that is inaccurate or incomplete." },
          { icon: "archive", title: "Deletion", body: "Ask us to delete your personal information, subject to legal exceptions." },
          { icon: "download", title: "Portability", body: "Receive your information in a structured, machine-readable format." },
          { icon: "hand", title: "Objection and restriction", body: "Object to or limit certain processing, such as direct marketing." },
          { icon: "cookie", title: "Opt out of sale or sharing", body: "Turn off advertising cookies and data sharing with Your privacy choices." },
        ],
        links: [{ label: "Make a privacy request", href: "/trust/privacy-request" }],
      },
      {
        id: "sub-processors",
        title: "Sub-processors",
        icon: "network",
        body: [
          "We use a small number of carefully vetted service providers, called sub-processors, to help deliver the service. Each one is bound by a written agreement requiring security and privacy protections at least as strong as ours.",
          "Customers can subscribe to notifications about sub-processor changes and object to a new sub-processor before it starts processing their data.",
        ],
        table: {
          caption: "Sub-processors by category",
          columns: ["Category", "Purpose", "Data location"],
          rows: [
            ["Cloud infrastructure", "Hosting, storage and content delivery", "Your selected residency region"],
            ["AI model hosting", "Running AI features with no retention of prompts or outputs", "Same region as your data where available"],
            ["Customer support", "Ticketing and support communications", "United States, European Union"],
            ["Payment processing", "Subscription billing and invoicing", "United States, European Union"],
            ["Email delivery", "Account notifications and service emails", "United States, European Union"],
            ["Security monitoring", "Threat detection and abuse prevention", "United States"],
          ],
        },
      },
      {
        id: "international-transfers",
        title: "International transfers",
        icon: "globe",
        body: [
          "When personal information moves across borders, we protect it with recognized safeguards such as standard contractual clauses, and apply the same protections wherever it is processed.",
          "Enterprise customers can keep customer data at rest in one of 12 data residency regions.",
        ],
        links: [{ label: "Data management and residency", href: "/trust/data-management" }],
      },
      {
        id: "contact-privacy",
        title: "Contact our privacy team",
        navLabel: "Contact",
        icon: "mail",
        body: [
          `Questions, concerns or complaints? Our privacy team and data protection officer can be reached at privacy@${site.domain} or through our contact page. We respond to every request within 30 days.`,
          "If you are in the European Economic Area or the United Kingdom, you also have the right to lodge a complaint with your local data protection authority.",
        ],
        links: [
          { label: "Contact us", href: "/contact" },
          { label: "Read the Privacy Policy", href: "/legal/privacy" },
        ],
      },
    ],
    faqs: [
      {
        q: `Does ${B} sell my personal information?`,
        a: "No. We have never sold personal information, and we don’t share it for cross-context behavioral advertising based on how you use the service.",
      },
      {
        q: "Who controls the data in my workspace?",
        a: `Your organization does. For customer data, your organization is the controller and ${B} is its processor. Workspace administrators decide retention, exports and access.`,
      },
      {
        q: "How do I delete my account?",
        a: "Members of a paid workspace can ask their administrator to deactivate their account. You can also submit a deletion request through our privacy request form, and we’ll work with your organization to complete it.",
      },
      {
        q: "How do I manage cookies on your websites?",
        a: "Open Cookie preferences in the footer of any page to change your choices at any time. Our Cookie Policy explains each category of cookie we use.",
      },
    ],
    aside: {
      title: "Privacy questions?",
      body: "Our privacy team responds to every request within 30 days.",
      link: { label: "Make a privacy request", href: "/trust/privacy-request" },
    },
    cta: {
      title: "Privacy questions? We’re here to help",
      subtitle: "Our privacy team responds to every question and request within 30 days.",
      primary: { label: "Make a privacy request", href: "/trust/privacy-request" },
      secondary: { label: "Read the Privacy Policy", href: "/legal/privacy" },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "ai-principles",
    title: "Trustworthy AI principles",
    navLabel: "AI principles",
    summary: "How we build AI that respects permissions, cites its sources and keeps people in control.",
    eyebrow: "Trustworthy AI",
    heroTitle: "AI you can trust with your work",
    highlight: "trust",
    subtitle: `${B} AI and agents are built on the same foundation as the rest of the platform: your data stays yours, permissions are always respected and people stay in charge.`,
    icon: "brain",
    tone: "pink",
    mockup: "ai",
    primary: { label: `How ${B} AI works`, href: "/features/ai" },
    secondary: { label: "Explore AI agents", href: "/ai-agents" },
    seo: {
      title: "Trustworthy AI principles and safeguards",
      description: `Our principles for trustworthy AI: customer data never trains models, answers respect permissions and cite sources, and agents run with human oversight.`,
    },
    stats: [
      { value: 0, label: "Customer messages used to train generalized models" },
      { value: 100, suffix: "%", label: "Of answers checked against live permissions" },
      { value: 6, label: "Principles behind every AI feature" },
    ],
    sections: [
      {
        id: "data-use",
        title: "Your data doesn’t train our models",
        navLabel: "Data use",
        icon: "database",
        body: [
          "Customer messages, files, canvases and other content are never used to train generalized large language models, ours or anyone else’s. Models are hosted inside our infrastructure, and model providers don’t retain your prompts or outputs.",
          "Some features, like search ranking and emoji suggestions, learn from aggregate, de-identified usage patterns within your own organization. Those models never expose one customer’s content to another.",
        ],
      },
      {
        id: "permissions",
        title: "Permission-aware by design",
        navLabel: "Permission-aware answers",
        icon: "lock",
        body: [
          "AI can only see what the person asking can see. Recaps, search answers and agent actions are checked against channel membership, sharing settings, information barriers and retention policies in real time.",
        ],
        bullets: [
          "Private channels and direct messages stay private to their members",
          "Deleted or expired content disappears from answers immediately",
          "Guests and external partners get answers only from content shared with them",
          "Revoking keys with Enterprise Key Management applies to AI as well",
        ],
      },
      {
        id: "transparency",
        title: "Transparency and citations",
        icon: "quote",
        body: [
          "Every AI answer shows where it came from. Citations link back to the original messages, files and canvases, so people can check the source before they rely on it.",
        ],
        cards: [
          { icon: "link", title: "Cited sources", body: "Answers link to the messages, files and canvases they summarize." },
          { icon: "sparkles", title: "Clear labels", body: "AI-generated content is always marked, in channels, canvases and notifications." },
          { icon: "fileCheck", title: "Audit logs", body: "Admins can review which AI features were used and every action an agent took." },
          { icon: "book", title: "Plain-language docs", body: "We publish how each feature works, what data it uses and its known limitations." },
        ],
      },
      {
        id: "human-oversight",
        title: "Human oversight for agents",
        navLabel: "Human oversight",
        icon: "userCheck",
        body: [
          "Agents can draft, summarize and take actions across your tools, but people decide what they are allowed to do. Sensitive actions require a person’s approval before they run.",
        ],
        bullets: [
          "Admins approve which agents can be installed and where they can work",
          "Agents act with clearly scoped permissions, never as an admin",
          "Actions like sending external messages or changing records ask for confirmation first",
          "Pause or remove any agent instantly from the admin console",
        ],
        links: [{ label: "Explore AI agents", href: "/ai-agents" }],
      },
      {
        id: "accuracy",
        title: "Accuracy and safety",
        icon: "target",
        body: [
          "AI can make mistakes, so we design for them. Answers are grounded in your organization’s content, models are evaluated before every release and anyone can flag a bad answer in one click.",
        ],
        bullets: [
          "Grounding and citations reduce made-up answers",
          "Red-team testing for prompt injection, data leakage and harmful output",
          "Feedback on every answer goes to the team that owns the feature",
          "We say when an answer can’t be found instead of guessing",
        ],
      },
      {
        id: "admin-controls",
        title: "Admin controls",
        icon: "settings",
        body: [
          "Every organization adopts AI at its own pace. Admins decide which features are available, to whom and in which workspaces.",
        ],
        cards: [
          {
            icon: "click",
            title: "Feature-level switches",
            body: "Turn individual AI features on or off for the whole organization or for specific workspaces.",
          },
          { icon: "users", title: "Group-based access", body: "Roll out AI to pilot groups first, synced from your identity provider." },
          { icon: "globe", title: "Regional processing", body: "Keep AI processing in the same region as your data residency setting." },
          {
            icon: "archive",
            title: "Retention for AI output",
            body: "AI summaries and agent conversations follow your retention and legal hold policies.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: `Does ${B} use our data to train AI models?`,
        a: "No. Customer data is never used to train generalized large language models. Models run inside our infrastructure, and model providers don’t keep your prompts or outputs.",
      },
      {
        q: "Can AI show me content I don’t have access to?",
        a: "No. Every answer is checked against your current permissions, so AI can only use messages, files and canvases you could already open yourself.",
      },
      {
        q: "Can we turn AI features off?",
        a: "Yes. Admins can switch individual AI features and agents on or off for the whole organization, for specific workspaces or for groups of people.",
      },
      {
        q: "What happens if an AI answer is wrong?",
        a: "Every answer cites its sources so you can check them, and you can flag an inaccurate answer in one click. Feedback helps us improve the feature without using your content to train models.",
      },
    ],
    aside: {
      title: "Evaluating AI for your organization?",
      body: "Get our AI security documentation and a walkthrough of admin controls.",
      link: { label: "Talk to our team", href: "/contact-sales" },
    },
    cta: {
      title: "Bring AI to work, safely",
      subtitle: "See how permission-aware AI and agents fit your security, privacy and compliance requirements.",
      primary: { label: "Talk to our team", href: "/contact-sales" },
      secondary: { label: `How ${B} AI works`, href: "/features/ai" },
    },
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "privacy-request",
    title: "Privacy requests",
    navLabel: "Privacy request",
    summary: "Ask to access, correct, delete or download your personal information, or opt out of sharing.",
    eyebrow: "Privacy request",
    heroTitle: "Make a privacy request",
    highlight: "privacy request",
    subtitle:
      "Ask to access, correct, delete or take a copy of your personal information, or opt out of sale and sharing. We respond to every verified request within 30 days.",
    icon: "userCheck",
    tone: "sky",
    heroPoints: ["Free of charge", "Response within 30 days", "Authorized agents welcome"],
    primary: { label: "Start your request", href: "#submit-request" },
    secondary: { label: "Read the Privacy Policy", href: "/legal/privacy" },
    seo: {
      title: "Submit a privacy or data subject request",
      description: `Ask ${B} to access, correct, delete or export your personal information, or opt out of sale and sharing. See how requests work, then submit yours online.`,
    },
    sections: [
      {
        id: "request-types",
        title: "Types of requests",
        icon: "listChecks",
        body: [
          "Choose the request that best fits what you need. If you’re not sure, pick the closest option and describe what you’d like in the details field.",
        ],
        cards: [
          {
            icon: "fileSearch",
            title: "Access",
            body: "Get a copy of the personal information we hold about you and learn how we use it.",
          },
          {
            icon: "archive",
            title: "Deletion",
            body: "Ask us to delete your personal information, subject to legal and contractual exceptions.",
          },
          { icon: "pen", title: "Correction", body: "Fix information about you that is inaccurate or incomplete." },
          {
            icon: "download",
            title: "Portability",
            body: "Receive your information in a structured, machine-readable format you can take elsewhere.",
          },
          {
            icon: "cookie",
            title: "Opt out of sale or sharing",
            body: "Stop sharing for cross-context advertising. You can also use Your privacy choices in the site footer.",
          },
          {
            icon: "mail",
            title: "Opt out of marketing",
            body: "Stop marketing emails. You can also use the unsubscribe link in any message we send.",
          },
        ],
      },
      {
        id: "workspace-members",
        title: `If you use ${B} through your organization`,
        navLabel: "Workspace members",
        icon: "building2",
        body: [
          `When you use ${B} through an employer, school or other organization, that organization controls the content in its workspace, including your messages and files. Requests about that content are usually handled by your workspace administrator.`,
          "If you send us a request about customer data, we’ll forward it to the organization and let you know. We can always help with information we control as a company, such as marketing preferences and website data.",
        ],
      },
      {
        id: "what-happens-next",
        title: "What happens after you submit",
        navLabel: "What happens next",
        icon: "clock",
        body: ["Most requests are completed well within the legal deadline. Here’s what to expect."],
        steps: [
          "We email you within two business days to confirm we received your request.",
          "We verify your identity, usually by confirming access to the email address on your account. We never ask for passwords.",
          "We complete your request within 30 days, or tell you if a complex request needs up to 60 more days.",
          "If we can’t fully complete your request, we explain why and how to appeal the decision.",
        ],
      },
      {
        id: "agents-and-appeals",
        title: "Authorized agents and appeals",
        navLabel: "Agents and appeals",
        icon: "handshake",
        body: [
          "You can ask an authorized agent to make a request for you. We’ll ask for your signed permission and may still need to verify your identity directly.",
          `If we decline your request, you can appeal by replying to our decision email or writing to privacy@${site.domain}. We respond to appeals within 45 days.`,
        ],
        links: [
          { label: `Privacy at ${B}`, href: "/trust/privacy" },
          { label: "Read the Privacy Policy", href: "/legal/privacy" },
        ],
      },
    ],
    faqs: [
      {
        q: "Is there a fee to make a request?",
        a: "No. Privacy requests are free. We may decline requests that are clearly unfounded or excessive, and we’ll explain why if we do.",
      },
      {
        q: "How do you verify my identity?",
        a: "We usually confirm that you control the email address linked to your account or your interactions with us. For sensitive requests we may ask for more details. We never ask for your password.",
      },
      {
        q: "Can I make a request for someone else?",
        a: "Yes, as an authorized agent. Choose Other as your relationship, explain who you represent and we’ll follow up to collect proof of authorization.",
      },
      {
        q: "Why was my request forwarded to my organization?",
        a: `If your request concerns content in a workspace owned by your employer or school, that organization controls the data. We forward the request so it can respond, and ${B} supports it as its processor.`,
      },
    ],
    aside: {
      title: "Prefer email?",
      body: `Write to privacy@${site.domain} and include the same details as the form.`,
      link: { label: "Contact us", href: "/contact" },
    },
    form: "privacy-request",
    cta: {
      title: "Want to learn more about privacy?",
      subtitle: `Read how ${B} collects, uses and protects information, and the choices you have.`,
      primary: { label: `Privacy at ${B}`, href: "/trust/privacy" },
      secondary: { label: "Read the Privacy Policy", href: "/legal/privacy" },
    },
  },
];

export function getTrustPage(slug: string) {
  return trustPages.find((p) => p.slug === slug);
}

/** Every policy and trust document, for the legal hub at /legal. */
export const legalDocs: { title: string; href: string; description: string; updated: string; icon: IconName }[] = [
  {
    title: "Privacy Policy",
    href: "/legal/privacy",
    description: "What information we collect, how we use and share it, and the choices and rights you have.",
    updated: "September 1, 2026",
    icon: "eye",
  },
  {
    title: "Terms of Service",
    href: "/legal/terms",
    description: "The agreement that governs how organizations and individuals use our websites, apps and services.",
    updated: "September 1, 2026",
    icon: "fileSignature",
  },
  {
    title: "Cookie Policy",
    href: "/cookie-policy",
    description: "The cookies and similar technologies we use on our websites, and how to manage your choices.",
    updated: "September 1, 2026",
    icon: "cookie",
  },
  {
    title: "Accessibility statement",
    href: "/accessibility",
    description: "Our WCAG 2.2 AA commitment, supported assistive technologies and how to share feedback.",
    updated: "September 15, 2026",
    icon: "accessibility",
  },
  {
    title: "Security practices",
    href: "/trust/security",
    description: "Encryption, identity controls, infrastructure monitoring, secure development and our bug bounty.",
    updated: "August 20, 2026",
    icon: "shieldCheck",
  },
  {
    title: "Compliance",
    href: "/trust/compliance",
    description: "Certifications, attestations, regional frameworks and how to request our audit reports.",
    updated: "September 8, 2026",
    icon: "badge",
  },
  {
    title: "Data management",
    href: "/trust/data-management",
    description: "Retention, legal holds, exports, eDiscovery, data residency regions and deletion.",
    updated: "August 27, 2026",
    icon: "database",
  },
  {
    title: "Data requests",
    href: "/trust/data-requests",
    description: "How we respond to government requests for data, and our twice-yearly transparency report.",
    updated: "July 30, 2026",
    icon: "landmark",
  },
  {
    title: "AI principles",
    href: "/trust/ai-principles",
    description: "How we build AI that respects permissions, cites its sources and keeps people in control.",
    updated: "September 22, 2026",
    icon: "brain",
  },
  {
    title: "Privacy requests",
    href: "/trust/privacy-request",
    description: "Ask to access, correct, delete or export your personal information, or opt out of sharing.",
    updated: "September 1, 2026",
    icon: "userCheck",
  },
];
