import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Check, ShieldCheck } from "lucide-react";
import { getTrustPage, trustPages, type TrustPage, type TrustSection, type TrustTable, type TrustList } from "@/data/trust";
import { LeadForm, type FieldDef } from "@/components/forms/lead-form";
import { Mockup } from "@/components/mockups";
import { CTABand, FAQ, IconCardGrid, StatsBand, type IconCard } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { TableOfContents } from "@/components/templates/article-client";
import { ArrowLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/highlight";
import { Icon } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

const FORM_ID = "submit-request";

const privacyRequestFields: FieldDef[] = [
  { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
  { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email", half: true },
  {
    name: "relationship",
    label: "Your relationship to us",
    type: "select",
    required: true,
    options: ["Customer admin", "End user", "Visitor", "Job applicant", "Other"],
    half: true,
  },
  {
    name: "requestType",
    label: "Request type",
    type: "select",
    required: true,
    options: [
      "Access my information",
      "Delete my information",
      "Correct my information",
      "Get a portable copy",
      "Opt out of sale or sharing",
      "Opt out of marketing",
    ],
    half: true,
  },
  {
    name: "region",
    label: "Where you live",
    type: "select",
    required: true,
    options: [
      "United States",
      "Canada",
      "European Union or EEA",
      "United Kingdom",
      "Switzerland",
      "Brazil",
      "Japan",
      "Australia",
      "India",
      "Other",
    ],
  },
  {
    name: "details",
    label: "Details",
    type: "textarea",
    required: true,
    placeholder: "Tell us what you’d like us to do, plus anything that helps us find your information, such as your workspace URL.",
  },
  {
    name: "confirm",
    label:
      "I confirm that I am the person this request is about, or am authorized to act for them, and that the information above is accurate.",
    type: "checkbox",
    required: true,
  },
];

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return trustPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trust/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getTrustPage(slug);
  if (!page) return { title: "Page not found" };
  return buildMetadata({ title: page.seo.title, description: page.seo.description, path: `/trust/${slug}` });
}

export default function TrustDetailPage({ params }: PageProps<"/trust/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <TrustContent params={params} />
    </Suspense>
  );
}

async function TrustContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getTrustPage(slug);
  if (!page) notFound();
  return <TrustTemplate page={page} />;
}

/* ------------------------------------------------------------------ */

function TrustTemplate({ page }: { page: TrustPage }) {
  const nav = [
    ...page.sections.map((s) => ({ id: s.id, heading: s.navLabel ?? s.title })),
    ...(page.form ? [{ id: FORM_ID, heading: "Submit a request" }] : []),
  ];
  const aside = page.aside ?? {
    title: "Talk to our trust team",
    body: "Get audit reports, questionnaires and answers from our security, privacy and compliance specialists.",
    link: { label: "Contact our team", href: "/contact-sales" },
  };

  return (
    <>
      <PageHero
        crumbs={navCrumbs("/trust", { section: "product", label: "Trust & security" }, [{ label: page.navLabel }])}
        eyebrow={page.eyebrow}
        tone={page.tone}
        title={<Highlight text={page.heroTitle} highlight={page.highlight} />}
        subtitle={page.subtitle}
        primary={page.primary}
        secondary={page.secondary}
        visual={page.mockup ? <Mockup kind={page.mockup} /> : undefined}
      >
        {!page.mockup && page.heroPoints && (
          <ul className="mt-2 flex animate-fade-up flex-wrap justify-center gap-2.5 [animation-delay:160ms]">
            {page.heroPoints.map((c) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-fg shadow-soft"
              >
                <ShieldCheck className="size-4 text-mint-ink" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </PageHero>

      {page.stats && <StatsBand stats={page.stats} />}

      <div className="container-page grid gap-12 py-16 md:py-24 lg:grid-cols-[15rem_minmax(0,1fr)] xl:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-8">
            <TableOfContents items={nav} />
            <div className={cn("rounded-2xl p-5", toneStyles[page.tone].tint)}>
              <p className="font-display font-bold text-fg">{aside.title}</p>
              <p className="mt-1 text-sm text-muted">{aside.body}</p>
              <ArrowLink href={aside.link.href} className="mt-3 text-sm">
                {aside.link.label}
              </ArrowLink>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <details className="mb-10 rounded-2xl border border-line bg-surface p-4 lg:hidden">
            <summary className="font-semibold text-fg">On this page</summary>
            <ol className="mt-3 flex flex-col gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-muted hover:text-primary">
                    {n.heading}
                  </a>
                </li>
              ))}
            </ol>
          </details>

          <div className="flex flex-col gap-6 md:gap-8">
            {page.sections.map((s, i) => (
              <TrustBlock key={s.id} section={s} tone={page.tone} alt={i % 2 === 1} />
            ))}
            {page.form === "privacy-request" && <PrivacyRequestCard tone={page.tone} />}
          </div>
        </div>
      </div>

      <FAQ items={page.faqs} bg="soft" subtitle="Can’t find what you’re looking for? Our trust, privacy and legal teams are happy to help." />

      <Section labelledBy="more-trust-heading">
        <SectionHeader
          eyebrow="Trust Center"
          tone={page.tone}
          id="more-trust-heading"
          title="More from the Trust Center"
          subtitle="Security, privacy, compliance and legal resources your reviewers usually ask for."
        />
        <IconCardGrid items={moreItems(page.slug)} columns={4} />
      </Section>

      <CTABand
        title={page.cta?.title ?? "Trust is built into everything we make"}
        subtitle={page.cta?.subtitle ?? "Talk to our team about security, privacy and compliance for your organization."}
        primary={page.cta?.primary ?? { label: "Talk to our team", href: "/contact-sales" }}
        secondary={page.cta?.secondary ?? { label: "Visit the Trust Center", href: "/trust" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */

function TrustBlock({ section: s, tone, alt }: { section: TrustSection; tone: Tone; alt: boolean }) {
  const t = toneStyles[tone];
  const [lead, ...rest] = s.body;
  return (
    <section
      id={s.id}
      aria-labelledby={`${s.id}-heading`}
      className={cn("scroll-mt-28 rounded-[var(--radius-panel)] p-6 sm:p-10", alt ? t.tint : "border border-line bg-bg")}
    >
      <Reveal className="flex flex-col items-start gap-4">
        <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", t.soft)}>
          <Icon name={s.icon} className="size-6" />
        </span>
        <h2 id={`${s.id}-heading`} className="text-display-sm font-bold text-fg">
          {s.title}
        </h2>
        {lead && <p className="max-w-3xl text-lead text-muted">{lead}</p>}
        {rest.map((p) => (
          <p key={p} className="max-w-3xl text-muted">
            {p}
          </p>
        ))}
      </Reveal>

      {s.bullets && (
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-fg">
              <span className={cn("mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full", t.soft)}>
                <Check className="size-3.5" aria-hidden="true" />
              </span>
              {b}
            </li>
          ))}
        </ul>
      )}

      {s.steps && (
        <ol className="mt-8 flex flex-col gap-3">
          {s.steps.map((step, i) => (
            <li key={step} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-5 shadow-soft">
              <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold", t.solid)}>
                {i + 1}
              </span>
              <span className="pt-1 text-fg">{step}</span>
            </li>
          ))}
        </ol>
      )}

      {s.cards && (
        <div className="mt-8">
          <IconCardGrid items={s.cards} columns={2} />
        </div>
      )}

      {s.table && <DataTable table={s.table} />}

      {s.list && <ItemList list={s.list} />}

      {s.links && (
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {s.links.map((l) => (
            <ArrowLink key={l.href} href={l.href}>
              {l.label}
            </ArrowLink>
          ))}
        </div>
      )}
    </section>
  );
}

function DataTable({ table }: { table: TrustTable }) {
  return (
    <Reveal className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
      <div role="region" aria-label={table.caption} tabIndex={0} className="overflow-x-auto">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <caption className="px-6 pt-5 pb-3 text-left font-display text-base font-bold text-fg">{table.caption}</caption>
          <thead>
            <tr className="border-y border-line bg-surface-2">
              {table.columns.map((c) => (
                <th key={c} scope="col" className="px-6 py-3 font-semibold text-muted">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {table.rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="px-6 py-4 align-top font-semibold text-fg">
                      {cell}
                    </th>
                  ) : (
                    <td key={j} className="px-6 py-4 align-top text-muted">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note && <p className="border-t border-line px-6 py-4 text-xs text-subtle">{table.note}</p>}
    </Reveal>
  );
}

function ItemList({ list }: { list: TrustList }) {
  return (
    <Reveal className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-bold text-fg">{list.title}</h3>
        <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-muted">{list.items.length} total</span>
      </div>
      <ul className={cn("mt-4 grid gap-3 sm:grid-cols-2", list.items.length % 3 === 0 && "xl:grid-cols-3")}>
        {list.items.map((item) => (
          <li key={item.label} className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
            <Icon name={list.icon} className="size-4 shrink-0 text-primary" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-fg">{item.label}</span>
              {item.detail && <span className="block text-xs text-muted">{item.detail}</span>}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function PrivacyRequestCard({ tone }: { tone: Tone }) {
  return (
    <section
      id={FORM_ID}
      aria-labelledby={`${FORM_ID}-heading`}
      className="scroll-mt-28 rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-10"
    >
      <div className="mb-8 flex flex-col items-start gap-4">
        <span className={cn("inline-flex size-12 items-center justify-center rounded-2xl", toneStyles[tone].soft)}>
          <Icon name="send" className="size-6" />
        </span>
        <h2 id={`${FORM_ID}-heading`} className="text-display-sm font-bold text-fg">
          Submit a privacy request
        </h2>
        <p className="max-w-2xl text-muted">
          Fields marked with an asterisk are required. We use these details only to verify and respond to your request.
        </p>
      </div>
      <LeadForm
        formName="Trust Center request"
        fields={privacyRequestFields}
        submitLabel="Submit request"
        successTitle="Request received"
        successBody="Thank you. We’ll email you within two business days to confirm your request and verify your identity."
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function moreItems(current: string): IconCard[] {
  return [
    {
      icon: "shieldCheck",
      title: "Trust Center",
      body: "Security, privacy, compliance and reliability commitments in one place.",
      href: "/trust",
      cta: "Visit the Trust Center",
    },
    {
      icon: "lock",
      title: "Security overview",
      body: "Encryption, identity controls, infrastructure monitoring and how we build securely.",
      href: "/trust/security",
      cta: "Read the overview",
    },
    ...trustPages
      .filter((p) => p.slug !== current)
      .map((p) => ({ icon: p.icon, title: p.title, body: p.summary, href: `/trust/${p.slug}`, tone: p.tone, cta: "Learn more" })),
    {
      icon: "scale",
      title: "Legal center",
      body: "Privacy Policy, Terms of Service, Cookie Policy and every other policy in one place.",
      href: "/legal",
      cta: "Browse policies",
    },
  ];
}
