import Link from "next/link";
import { Cookie, Info } from "lucide-react";
import type { ArticleSection } from "@/data/types";
import { ArticleTemplate } from "@/components/templates/article";
import { ButtonLink } from "@/components/ui/button";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: `Learn which cookies and similar technologies the ${B} websites use, why we use them, how long they last and how to change your cookie preferences at any time.`,
  path: "/cookie-policy",
});

const categories: { name: string; purpose: string; examples: string; status: string; duration: string }[] = [
  {
    name: "Strictly necessary",
    purpose: "Keep the site secure, balance traffic and remember your cookie choices.",
    examples: "Session security, load balancing, consent record",
    status: "Always on",
    duration: "Session to 12 months",
  },
  {
    name: "Functional",
    purpose: "Remember preferences such as region, language and light or dark theme.",
    examples: "Region selector, theme, recently viewed help articles",
    status: "Optional",
    duration: "Up to 12 months",
  },
  {
    name: "Analytics",
    purpose: "Measure, in aggregate, how pages are used so we can improve them.",
    examples: "Page views, navigation paths, load performance",
    status: "Optional",
    duration: "Up to 13 months",
  },
  {
    name: "Marketing",
    purpose: "Measure campaign performance and show relevant ads on other sites.",
    examples: "Campaign attribution, ad frequency limits",
    status: "Optional",
    duration: "Up to 13 months",
  },
];

const sections: ArticleSection[] = [
  {
    id: "what-are-cookies",
    heading: "1. What cookies are",
    paragraphs: [
      "Cookies are small text files that a website stores in your browser when you visit. They let the site remember things about your visit, such as whether you are signed in or which region you chose, so pages work the way you expect.",
      `This policy also covers similar technologies, such as local storage, pixels and software development kits in our apps. When we say "cookies", we mean all of these. This policy applies to ${B} marketing websites. Cookies used inside the ${B} product are described in our Privacy Policy.`,
    ],
  },
  {
    id: "how-we-use",
    heading: "2. How we use cookies",
    paragraphs: [
      "We use cookies to run our websites securely, remember your preferences, understand how our pages perform and, only with your permission, measure the success of our marketing.",
      "We never use cookies to read the content of your messages or files, and we do not sell information collected through cookies.",
    ],
  },
  {
    id: "categories",
    heading: "3. Cookie categories",
    paragraphs: [
      "We group cookies into four categories. Strictly necessary cookies are always on because the site cannot work without them. Every other category is optional and stays off until you allow it, where the law requires consent.",
    ],
    bullets: categories.map((c) => `${c.name} (${c.status.toLowerCase()}): ${c.purpose} Typical duration: ${c.duration.toLowerCase()}.`),
  },
  {
    id: "manage-preferences",
    heading: "4. Managing your preferences",
    paragraphs: [
      "When you first visit, a banner lets you accept all cookies, reject optional cookies or choose by category. You can change your mind at any time by selecting Cookie preferences in the site footer. Your choice applies to the browser and device you are using.",
      "Depending on where you live, you can also use Your privacy choices in the footer to opt out of the sale or sharing of personal information for advertising. We honor Global Privacy Control signals automatically.",
    ],
    bullets: [
      "Use Cookie preferences in the footer to turn functional, analytics or marketing cookies on or off.",
      "Use your browser settings to block or delete cookies. Blocking strictly necessary cookies may stop parts of the site from working.",
      "Use your device settings to limit ad tracking in mobile apps.",
    ],
  },
  {
    id: "third-party-cookies",
    heading: "5. Third-party cookies",
    paragraphs: [
      "Some cookies are set by carefully selected service providers that help us run our websites, such as analytics, video hosting and advertising measurement partners. These providers may only use the information to provide services to us, under written agreements.",
      "Third-party cookies in the analytics and marketing categories are loaded only after you allow those categories. We review our providers regularly and remove any that we no longer need.",
    ],
  },
  {
    id: "retention",
    heading: "6. How long cookies last",
    paragraphs: [
      "Session cookies are deleted when you close your browser. Persistent cookies stay until they expire or you delete them. We set the shortest lifetime that still lets each cookie do its job.",
    ],
    bullets: [
      "Session cookies: removed when you close your browser.",
      "Preference and consent cookies: up to 12 months, after which we ask again.",
      "Analytics and marketing cookies: up to 13 months.",
    ],
  },
  {
    id: "changes",
    heading: "7. Changes to this policy",
    paragraphs: [
      "We may update this policy when we change the cookies we use or when the law changes. The effective date at the top of this page shows when it was last updated. If we make a material change, we will ask for your consent again where required.",
    ],
  },
  {
    id: "contact",
    heading: "8. Contact us",
    paragraphs: [
      `If you have questions about this policy or how we use cookies, contact our privacy team at privacy@${site.domain} or through our contact page. You can also make a request about your personal information through our privacy request form.`,
    ],
  },
];

function SampleCallout() {
  return (
    <div role="note" className="flex max-w-3xl items-start gap-3 rounded-2xl border border-sun/40 bg-surface/80 p-4 text-sm text-fg shadow-soft backdrop-blur">
      <Info className="mt-0.5 size-5 shrink-0 text-sun-ink" aria-hidden="true" />
      <p>
        <span className="font-semibold">Sample policy text.</span> This page is part of a portfolio project and is written as
        a realistic example. It is not a real cookie policy and does not create any legal obligations.
      </p>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <ArticleTemplate
      crumbs={[{ label: "Legal", href: "/legal" }, { label: "Cookie Policy" }]}
      eyebrow="Legal"
      tone="sun"
      title="Cookie Policy"
      excerpt={`How the ${B} websites use cookies and similar technologies, and how you can change your choices whenever you like.`}
      date="Effective date: September 1, 2026"
      readMinutes={5}
      sections={sections}
      header={<SampleCallout />}
      relatedTitle="Related policies and resources"
      related={[
        {
          title: "Privacy Policy",
          href: "/legal/privacy",
          eyebrow: "Legal",
          excerpt: "What information we collect, how we use and share it, and the choices you have.",
          tone: "violet",
        },
        {
          title: `Privacy at ${B}`,
          href: "/trust/privacy",
          eyebrow: "Trust",
          excerpt: "Our privacy principles, what we collect and why, and the rights you can exercise.",
          tone: "sky",
        },
        {
          title: "Legal center",
          href: "/legal",
          eyebrow: "Legal",
          excerpt: "Every policy, term and notice in one place.",
          tone: "mint",
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
                <Link href="/legal/terms" className="font-semibold text-fg hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span aria-current="page" className="font-semibold text-primary">
                  Cookie Policy
                </span>
              </li>
              <li>
                <Link href="/legal" className="font-semibold text-fg hover:text-primary">
                  All legal documents
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-3xl bg-tint-sun p-6">
            <Cookie className="size-6 text-sun-ink" aria-hidden="true" />
            <p className="mt-3 font-display text-lg font-bold text-fg">Change your choices</p>
            <p className="mt-1 text-sm text-muted">
              Select Cookie preferences in the site footer to update your settings at any time.
            </p>
            <ButtonLink href="/trust/privacy-request" size="sm" className="mt-4">
              Make a privacy request
            </ButtonLink>
          </div>
        </div>
      }
    >
      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
        <div role="region" aria-label="Cookie categories at a glance" tabIndex={0} className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <caption className="px-5 pt-5 pb-3 text-left font-display text-base font-bold text-fg">Cookie categories at a glance</caption>
            <thead>
              <tr className="border-y border-line bg-surface-2">
                <th scope="col" className="px-5 py-3 font-semibold text-muted">
                  Category
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-muted">
                  Examples
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-muted">
                  Default
                </th>
                <th scope="col" className="px-5 py-3 font-semibold text-muted">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {categories.map((c) => (
                <tr key={c.name}>
                  <th scope="row" className="px-5 py-4 align-top font-semibold text-fg">
                    {c.name}
                  </th>
                  <td className="px-5 py-4 align-top text-muted">{c.examples}</td>
                  <td className="px-5 py-4 align-top whitespace-nowrap text-muted">{c.status}</td>
                  <td className="px-5 py-4 align-top whitespace-nowrap text-muted">{c.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-surface-2 p-6">
        <h2 className="font-display text-lg font-bold text-fg">Questions about cookies?</h2>
        <p className="mt-2 text-muted">
          Reach our privacy team through the{" "}
          <Link href="/contact" className="font-semibold text-primary underline underline-offset-4">
            contact page
          </Link>
          , read our{" "}
          <Link href="/legal/privacy" className="font-semibold text-primary underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          or{" "}
          <Link href="/trust/privacy-request" className="font-semibold text-primary underline underline-offset-4">
            make a privacy request
          </Link>
          .
        </p>
      </div>
    </ArticleTemplate>
  );
}
