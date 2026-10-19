import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Briefcase, Check, Clock, MapPin, Wallet } from "lucide-react";
import { jobs } from "@/data/jobs";
import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { ShareButtons } from "@/components/templates/article-client";
import { GradientBlobs } from "@/components/ui/blobs";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

const getJob = (slug: string) => jobs.find((j) => j.slug === slug);

const benefits: { icon: IconName; title: string; body: string }[] = [
  { icon: "health", title: "Health & wellbeing", body: "Medical, dental and vision coverage plus a monthly wellness stipend." },
  { icon: "globe", title: "Flexible work", body: "Remote-friendly teams, home office budget and four weeks a year working from anywhere." },
  { icon: "heart", title: "Time to recharge", body: "Generous time off, company rest weeks and 16 weeks of paid parental leave." },
  { icon: "graduation", title: "Learning budget", body: "$2,000 a year for courses, conferences and books." },
  { icon: "trending", title: "Equity for everyone", body: "Every employee shares in the company's success." },
  { icon: "users", title: "Belonging", body: "Employee resource groups and inclusive, structured hiring." },
];

const process = [
  { title: "Application review", body: "A recruiter reads every application, usually within five business days." },
  { title: "Intro call", body: "A 30-minute conversation about your experience and what you're looking for." },
  { title: "Skills interview", body: "A practical, role-relevant exercise. No trick questions or whiteboard puzzles." },
  { title: "Team interviews", body: "Meet future teammates and your manager, in person or over a huddle." },
  { title: "Offer", body: "We aim to share a decision within a week of your final interview." },
];

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: PageProps<"/careers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return { title: "Job not found" };
  return buildMetadata({
    title: `${job.title}`.slice(0, 60),
    description: `${job.team} role in ${job.location} (${job.workplace}). ${job.summary.split(". ")[0]}.`,
    path: `/careers/${job.slug}`,
  });
}

export default function JobPage({ params }: PageProps<"/careers/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="article" />}>
      <JobContent params={params} />
    </Suspense>
  );
}

async function JobContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();
  const others = jobs.filter((j) => j.slug !== job.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    employmentType: job.type === "Full-time" ? "FULL_TIME" : "CONTRACTOR",
    hiringOrganization: { "@type": "Organization", name: B },
    jobLocationType: job.workplace === "Remote" ? "TELECOMMUTE" : undefined,
    jobLocation: { "@type": "Place", address: job.location },
    datePosted: "2026-10-01",
  };

  return (
    <>
      <section className="under-header relative overflow-hidden bg-tint-pink pb-14 md:pb-16">
        <GradientBlobs className="opacity-50" />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: job.team }, { label: job.title }]} />
          <p className="animate-fade-up text-sm font-bold tracking-[0.12em] text-pink-ink uppercase">{job.team}</p>
          <h1 className="mt-3 max-w-4xl animate-fade-up text-display-lg font-extrabold text-fg [animation-delay:80ms]">{job.title}</h1>
          <ul className="mt-6 flex animate-fade-up flex-wrap gap-3 text-sm [animation-delay:160ms]">
            {[
              { icon: MapPin, text: `${job.location} · ${job.workplace}` },
              { icon: Clock, text: job.type },
              { icon: Wallet, text: job.salary },
              { icon: Briefcase, text: job.team },
            ].map((m) => (
              <li key={m.text} className="inline-flex items-center gap-2 rounded-full bg-surface/80 px-4 py-2 font-semibold text-fg shadow-soft">
                <m.icon className="size-4" aria-hidden="true" />
                {m.text}
              </li>
            ))}
          </ul>
          <a href="#apply" className="mt-8 inline-flex h-12 animate-fade-up items-center rounded-full bg-primary px-6 font-semibold text-primary-fg hover:bg-primary-hover [animation-delay:220ms]">
            Apply for this role
          </a>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16">
          <div className="max-w-3xl">
            <div className="prose-content">
              <h2 id="about-the-role">About the role</h2>
              <p>{job.summary}</p>
              <h2 id="what-youll-do">What you&apos;ll do</h2>
              <ul>
                {job.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <h2 id="what-youll-bring">What you&apos;ll bring</h2>
              <ul>
                {job.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p>
                Don&apos;t meet every requirement? Research shows many great candidates hold back. If this role excites you, we&apos;d still love to hear from you.
              </p>
            </div>

            <h2 className="mt-12 font-display text-2xl font-bold text-fg">Benefits</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-pink/15 text-pink-ink">
                    <Icon name={b.icon} className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-fg">{b.title}</span>
                    <span className="text-sm text-muted">{b.body}</span>
                  </span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-display text-2xl font-bold text-fg">Our hiring process</h2>
            <ol className="mt-5 flex flex-col gap-4">
              {process.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-fg">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-fg">{p.title}</span>
                    <span className="text-muted">{p.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <Reveal className="mt-14 scroll-mt-28 rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8" id="apply">
              <h2 className="mb-6 font-display text-2xl font-bold text-fg">Apply for {job.title}</h2>
              <LeadForm
                formName="Job application"
                submitLabel="Submit application"
                successTitle="Application received"
                successBody="Thanks for applying! Our recruiting team reviews every application and will be in touch within two weeks."
                fields={[
                  { name: "first", label: "First name", required: true, autoComplete: "given-name", half: true },
                  { name: "last", label: "Last name", required: true, autoComplete: "family-name", half: true },
                  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
                  { name: "portfolio", label: "Portfolio or profile URL", type: "url", half: true },
                  { name: "location", label: "Current location", half: true },
                  { name: "note", label: `Why do you want to join ${B}?`, type: "textarea" },
                  { name: "consent", label: "I agree to have my application data stored for this and future openings.", type: "checkbox", required: true },
                ]}
              />
            </Reveal>
          </div>

          <aside>
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <dl className="rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm shadow-soft">
                {[
                  ["Team", job.team],
                  ["Location", job.location],
                  ["Workplace", job.workplace],
                  ["Employment", job.type],
                  ["Salary range", job.salary],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              <ShareButtons title={`${job.title} at ${B}`} />
              <div className="rounded-[var(--radius-card)] bg-tint-violet p-6 text-sm">
                <p className="flex items-center gap-2 font-semibold text-fg">
                  <Check className="size-4 text-mint-ink" aria-hidden="true" /> Equal opportunity employer
                </p>
                <p className="mt-1 text-muted">We welcome people of every background and provide accommodations throughout the process.</p>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section bg="soft">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-display-sm font-bold text-fg">Other open roles</h2>
          <Link href="/careers#roles" className="font-semibold text-primary hover:underline">
            See all roles
          </Link>
        </div>
        <ul className="grid gap-5 md:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/careers/${o.slug}`} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card">
                <span className="text-xs font-bold tracking-[0.12em] text-pink-ink uppercase">{o.team}</span>
                <span className="mt-2 font-display text-lg font-bold text-fg">{o.title}</span>
                <span className="mt-2 flex-1 text-sm text-muted">
                  {o.location} · {o.workplace}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  View role
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
