import Link from "next/link";
import { Info, Mail } from "lucide-react";
import type { ArticleSection } from "@/data/types";
import { ArticleTemplate } from "@/components/templates/article";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: `Read the ${B} Privacy Policy: what information we collect, how we use and share it, how long we keep it and the choices and rights you have over your data.`,
  path: "/legal/privacy",
  type: "website",
});

const sections: ArticleSection[] = [
  {
    id: "overview",
    heading: "1. Overview",
    paragraphs: [
      `This Privacy Policy explains how ${B}, Inc. ("${B}", "we", "us") collects, uses and shares information about you when you use our websites, apps and related services (together, the "Services"). It also describes the choices you have and how to reach us with questions.`,
      `${B} is used by organizations such as companies, schools and nonprofits. When an organization signs up, it controls the workspace and the content its members create. This policy covers the information we handle as a company. Your organization's own policies may also apply to how it manages your workspace.`,
    ],
  },
  {
    id: "information-we-collect",
    heading: "2. Information we collect",
    paragraphs: [
      "We collect information you give us directly, information created when you use the Services and limited information from third parties. We only collect what we need to provide, secure and improve the Services.",
    ],
    bullets: [
      "Account information, such as your name, email address, job title, profile photo and password.",
      "Customer content, such as messages, files, canvases, lists and huddle recordings that you and your colleagues create.",
      "Usage information, such as the features you use, the actions you take, timestamps and the device and browser you use.",
      "Log and device information, such as IP address, operating system version, crash reports and app settings.",
      "Billing information, such as the billing contact and plan details. Card numbers are handled by our payment processor, not stored by us.",
      "Information from partners, such as details from an identity provider your organization uses to let you sign in.",
    ],
  },
  {
    id: "how-we-use",
    heading: "3. How we use information",
    paragraphs: [
      "We use information to deliver the Services you and your organization ask for, and for a limited set of related purposes described below. We do not sell personal information, and we do not use customer content to target advertising.",
    ],
    bullets: [
      "Provide, maintain and troubleshoot the Services, including search, notifications and integrations.",
      "Protect the Services and our users by detecting spam, fraud, abuse and security threats.",
      "Communicate with you about your account, product updates, security notices and support requests.",
      "Understand how the Services are used in aggregate so we can improve performance and design new features.",
      "Comply with legal obligations and enforce our Terms of Service.",
    ],
  },
  {
    id: "customer-data",
    heading: "4. Customer data and your organization",
    paragraphs: [
      `Content your organization creates in ${B} is "customer data". For customer data, your organization is the controller and ${B} acts as its processor or service provider. We process customer data only on your organization's instructions, as set out in its agreement with us.`,
      "Your organization's administrators can control retention settings, export data, manage access and, depending on the plan, review content for legal or compliance purposes. If you have questions about how your organization uses your information, please contact your workspace administrator first.",
    ],
  },
  {
    id: "sharing",
    heading: "5. How we share information",
    paragraphs: [
      "We share information only in the limited circumstances below, and we require everyone we share it with to protect it in line with this policy.",
    ],
    bullets: [
      "With your organization and the people you collaborate with, according to your workspace and channel settings.",
      "With apps and agents that you or your administrators choose to install, limited to the permissions they are granted.",
      "With vetted service providers that help us operate the Services, such as hosting, payment processing and customer support tools.",
      "When required by law, after we carefully review the request and notify the affected customer whenever we are allowed to.",
      "As part of a merger, acquisition or sale of assets, in which case this policy will continue to apply to your information.",
    ],
  },
  {
    id: "ai-features",
    heading: "6. AI features and your data",
    paragraphs: [
      `${B} AI features, such as recaps, search answers and agents, work with content the requesting person already has permission to access. Results respect channel membership, sharing settings and information barriers.`,
      "We do not use customer data to train generalized AI models that are shared across customers. Administrators can turn individual AI features on or off for their organization, and every AI action taken by an agent is recorded in audit logs.",
    ],
  },
  {
    id: "retention-security",
    heading: "7. Data retention and security",
    paragraphs: [
      "We keep account information for as long as your account is active and as needed to provide the Services. Customer data is retained according to your organization's retention settings. When content is deleted, it is removed from our active systems promptly and from backups within 35 days.",
      "We protect information with industry-standard safeguards, including encryption in transit and at rest, strict access controls, continuous monitoring and regular independent audits. No system is perfectly secure, but we work hard to protect your information and will notify affected customers of a confirmed breach without undue delay.",
    ],
  },
  {
    id: "international-transfers",
    heading: "8. International data transfers",
    paragraphs: [
      "We operate globally and may process information in countries other than the one where you live. When we transfer personal information internationally, we use recognized safeguards such as standard contractual clauses and maintain the same level of protection described in this policy.",
      "Organizations on eligible plans can choose to store customer data at rest in one of our data residency regions, including the European Union, the United Kingdom, Japan and Australia.",
    ],
  },
  {
    id: "your-rights",
    heading: "9. Your rights and choices",
    paragraphs: [
      "Depending on where you live, you may have the right to access, correct, delete or receive a copy of your personal information, to object to or restrict certain processing, and to withdraw consent. You can exercise many of these rights directly in your account settings.",
      "You can also opt out of marketing emails at any time using the link in each message, and manage non-essential cookies through the cookie settings on our websites. We will not discriminate against you for exercising any of your privacy rights.",
    ],
  },
  {
    id: "changes-contact",
    heading: "10. Children, changes and contacting us",
    paragraphs: [
      "The Services are not directed to children under 16, and we do not knowingly collect personal information from them. If you believe a child has provided us with information, please contact us so we can delete it.",
      "We may update this policy from time to time. If we make material changes, we will notify you by email or in the Services before the changes take effect. The effective date at the top of this page shows when the policy was last updated.",
      `If you have questions about this policy or want to exercise your rights, contact our privacy team at privacy@${site.domain} or through our contact page.`,
    ],
  },
];

function SampleCallout() {
  return (
    <div role="note" className="flex max-w-3xl items-start gap-3 rounded-2xl border border-sun/40 bg-surface/80 p-4 text-sm text-fg shadow-soft backdrop-blur">
      <Info className="mt-0.5 size-5 shrink-0 text-sun-ink" aria-hidden="true" />
      <p>
        <span className="font-semibold">Sample policy text.</span> This page is part of a portfolio project and is written as
        a realistic example. It is not a real privacy policy and does not create any legal obligations.
      </p>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <ArticleTemplate
      crumbs={[{ label: "Trust Center", href: "/trust" }, { label: "Privacy Policy" }]}
      eyebrow="Legal"
      tone="violet"
      title="Privacy Policy"
      excerpt={`How ${B} collects, uses, shares and protects information, and the choices you have. Written in plain English, with no surprises.`}
      date="Effective date: September 1, 2026"
      readMinutes={9}
      sections={sections}
      header={<SampleCallout />}
      relatedTitle="Related policies and resources"
      related={[
        {
          title: "Terms of Service",
          href: "/legal/terms",
          eyebrow: "Legal",
          excerpt: "The agreement that governs your use of our websites, apps and services.",
          tone: "violet",
        },
        {
          title: "Trust Center",
          href: "/trust",
          eyebrow: "Trust",
          excerpt: "Security, privacy, compliance and reliability commitments in one place.",
          tone: "sky",
        },
        {
          title: "Security overview",
          href: "/trust/security",
          eyebrow: "Security",
          excerpt: "Encryption, identity controls, data governance and how we build securely.",
          tone: "mint",
        },
      ]}
      aside={
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
            <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Legal documents</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <span aria-current="page" className="font-semibold text-primary">
                  Privacy Policy
                </span>
              </li>
              <li>
                <Link href="/legal/terms" className="font-semibold text-fg hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="font-semibold text-fg hover:text-primary">
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-tint-violet p-6">
            <Mail className="size-6 text-primary" aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-bold text-fg">Privacy questions?</p>
            <p className="mt-1 text-sm text-muted">Our privacy team responds to every request within 30 days.</p>
            <ButtonLink href="/contact" size="sm" className="mt-4">
              Contact us
            </ButtonLink>
          </div>
        </div>
      }
    >
      <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6">
        <h2 className="font-display text-lg font-bold text-fg">Questions about this policy?</h2>
        <p className="mt-2 text-muted">
          Reach our privacy team through the{" "}
          <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
            contact page
          </Link>
          , read our{" "}
          <Link href="/legal/terms" className="font-semibold text-primary underline underline-offset-4">
            Terms of Service
          </Link>{" "}
          or visit the{" "}
          <Link href="/trust" className="font-semibold text-primary underline underline-offset-4">
            Trust Center
          </Link>{" "}
          for details on security and compliance.
        </p>
      </div>
    </ArticleTemplate>
  );
}
