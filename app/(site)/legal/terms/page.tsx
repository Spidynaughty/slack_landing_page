import Link from "next/link";
import { Info, Scale } from "lucide-react";
import type { ArticleSection } from "@/data/types";
import { ArticleTemplate } from "@/components/templates/article";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Terms of Service",
  description: `The ${B} Terms of Service cover accounts, acceptable use, your content, plans and billing, AI features, termination and how disputes are resolved.`,
  path: "/legal/terms",
  type: "website",
});

const sections: ArticleSection[] = [
  {
    id: "acceptance",
    heading: "1. Accepting these terms",
    paragraphs: [
      `These Terms of Service ("Terms") are an agreement between you and ${B}, Inc. ("${B}", "we", "us") and govern your use of our websites, apps and related services (the "Services"). By creating an account, joining a workspace or using the Services, you agree to these Terms.`,
      `If you use the Services on behalf of an organization, that organization may have signed a separate customer agreement with ${B}. In that case, the customer agreement governs the organization's use of the Services, and these Terms apply to you as an individual user.`,
    ],
  },
  {
    id: "accounts",
    heading: "2. Accounts and workspaces",
    paragraphs: [
      "You must provide accurate information when you create an account and keep your sign-in details secure. You are responsible for activity that happens under your account, and you should tell us right away if you suspect unauthorized access.",
      "Workspaces are controlled by the organization that creates them. Workspace owners and administrators can add or remove members, change permissions, set retention policies and export or delete content. If you join a workspace using an email address from your employer, your employer may be able to manage your account.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "3. Acceptable use",
    paragraphs: [
      "We want the Services to be a safe, productive place for everyone. You agree not to misuse the Services or help anyone else do so. In particular, you may not:",
    ],
    bullets: [
      "Break the law, infringe anyone's rights or share content you do not have permission to share.",
      "Harass, threaten or discriminate against others, or share content that promotes violence or hate.",
      "Send spam, phishing messages or unsolicited bulk communications.",
      "Upload malware or attempt to probe, scan or test the vulnerability of the Services outside our published disclosure program.",
      "Access the Services through automated means that place an unreasonable load on our systems, or try to bypass usage limits.",
      "Reverse engineer the Services, except where the law expressly allows it.",
    ],
  },
  {
    id: "your-content",
    heading: "4. Your content",
    paragraphs: [
      "You and your organization keep ownership of the messages, files and other content you submit to the Services. You give us a limited permission to host, copy, process and display that content only as needed to provide, secure and improve the Services for you, and as described in our Privacy Policy.",
      "You are responsible for the content you share and for making sure you have the rights to share it. We may remove content or restrict access if we reasonably believe it violates these Terms or the law, and we will tell you when we do unless we are legally prevented from doing so.",
    ],
  },
  {
    id: "plans-billing",
    heading: "5. Plans, fees and billing",
    paragraphs: [
      "Some features are available for free and others require a paid plan. Prices and plan details are described on our pricing page and in your order. Paid plans renew automatically for the same term unless you or your administrator cancel before the renewal date.",
      "For most plans, you are billed only for active members, and we credit your account when a member becomes inactive. Fees are exclusive of taxes, which you are responsible for paying. If a payment fails, we will let you know and give you a reasonable opportunity to update your payment details before limiting paid features.",
    ],
  },
  {
    id: "third-party",
    heading: "6. Third-party apps and agents",
    paragraphs: [
      "The Services let you connect apps and agents built by third parties. When you or your administrators install one, it can access content according to the permissions you approve. Third-party apps are governed by their own terms and privacy policies, and we are not responsible for how they handle your information.",
      "We review apps listed in our marketplace against published guidelines, but a listing is not an endorsement. You can remove an app at any time, and administrators can control which apps members are allowed to install.",
    ],
  },
  {
    id: "ai-features",
    heading: "7. AI features",
    paragraphs: [
      `${B} AI features can summarize conversations, answer questions and take actions through agents. AI output is generated automatically and may sometimes be inaccurate or incomplete, so please review important results before relying on them.`,
      "You are responsible for how you use AI output and for any actions you approve an agent to take. AI features respect the same permissions as the rest of the Services and only use content you are allowed to access.",
    ],
  },
  {
    id: "termination",
    heading: "8. Suspension and termination",
    paragraphs: [
      "You can stop using the Services at any time. Workspace owners can close a workspace and export its data from the admin settings before doing so.",
      "We may suspend or terminate access if you seriously or repeatedly breach these Terms, if required by law, or if your use creates a security risk for others. Where reasonable, we will give you notice first and a chance to fix the issue. After termination, we delete workspace content according to our data retention practices.",
    ],
  },
  {
    id: "disclaimers-liability",
    heading: "9. Disclaimers and limitation of liability",
    paragraphs: [
      "We work hard to keep the Services reliable and secure, but they are provided \"as is\" to the extent permitted by law. We do not promise that the Services will be uninterrupted or error-free, except where a separate service level agreement applies to your organization.",
      "To the extent permitted by law, neither party is liable for indirect, incidental or consequential damages, and our total liability for any claim relating to the Services is limited to the amount you paid us in the twelve months before the claim. Nothing in these Terms limits liability that cannot be limited under applicable law.",
    ],
  },
  {
    id: "general",
    heading: "10. Changes, disputes and general terms",
    paragraphs: [
      "We may update these Terms as the Services evolve. If a change is material, we will notify you at least 30 days before it takes effect. Continuing to use the Services after that date means you accept the updated Terms.",
      "These Terms are governed by the laws of the State of California, excluding its conflict of laws rules. We would like to resolve any concern informally first, so please contact us before starting a formal dispute. If any part of these Terms is found unenforceable, the rest remains in effect.",
      "Questions about these Terms can be sent to our legal team through the contact page.",
    ],
  },
];

function SampleCallout() {
  return (
    <div role="note" className="flex max-w-3xl items-start gap-3 rounded-2xl border border-sun/40 bg-surface/80 p-4 text-sm text-fg shadow-soft backdrop-blur">
      <Info className="mt-0.5 size-5 shrink-0 text-sun-ink" aria-hidden="true" />
      <p>
        <span className="font-semibold">Sample policy text.</span> This page is part of a portfolio project and is written as
        a realistic example. These are not real terms of service and do not create a binding agreement.
      </p>
    </div>
  );
}

export default function TermsPage() {
  return (
    <ArticleTemplate
      crumbs={navCrumbs("/trust", { section: "product", label: "Trust & security" }, [{ label: "Terms of Service" }])}
      eyebrow="Legal"
      tone="sky"
      title="Terms of Service"
      excerpt={`The ground rules for using ${B}: what you can expect from us, what we expect from you and how we work things out if something goes wrong.`}
      date="Effective date: September 1, 2026"
      readMinutes={10}
      sections={sections}
      header={<SampleCallout />}
      relatedTitle="Related policies and resources"
      related={[
        {
          title: "Privacy Policy",
          href: "/legal/privacy",
          eyebrow: "Legal",
          excerpt: "What information we collect, how we use it and the choices you have.",
          tone: "violet",
        },
        {
          title: "Pricing plans",
          href: "/pricing",
          eyebrow: "Plans",
          excerpt: "Compare Free, Pro, Business+ and Enterprise, and see how billing works.",
          tone: "sun",
        },
        {
          title: "Trust Center",
          href: "/trust",
          eyebrow: "Trust",
          excerpt: "Security, privacy, compliance and reliability commitments in one place.",
          tone: "sky",
        },
      ]}
      aside={
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft">
            <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Legal documents</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <Link href="/legal/privacy" className="font-semibold text-fg hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <span aria-current="page" className="font-semibold text-primary">
                  Terms of Service
                </span>
              </li>
              <li>
                <Link href="/accessibility" className="font-semibold text-fg hover:text-primary">
                  Accessibility statement
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-tint-sky p-6">
            <Scale className="size-6 text-sky-ink" aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-bold text-fg">Questions about these terms?</p>
            <p className="mt-1 text-sm text-muted">Our legal team is happy to clarify anything before you sign up.</p>
            <ButtonLink href="/contact" size="sm" className="mt-4">
              Contact us
            </ButtonLink>
          </div>
        </div>
      }
    >
      <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6">
        <h2 className="font-display text-lg font-bold text-fg">Need something else?</h2>
        <p className="mt-2 text-muted">
          Learn how we handle personal information in our{" "}
          <Link href="/legal/privacy" className="font-semibold text-primary underline underline-offset-4">
            Privacy Policy
          </Link>
          , review plan details on the{" "}
          <Link href="/pricing" className="font-semibold text-primary underline underline-offset-4">
            pricing page
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
            contact us
          </Link>{" "}
          with any questions.
        </p>
      </div>
    </ArticleTemplate>
  );
}
