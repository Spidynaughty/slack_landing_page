import { BadgeCheck, Check, Clock, FileQuestionMark, Monitor, Wallet } from "lucide-react";
import type { Faq } from "@/data/types";
import { CTABand, FAQ, IconCardGrid, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink, ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ReviewHighlight } from "@/components/sections/reviews";

export const metadata = buildMetadata({
  title: "Certification program for admins and builders",
  description: `Earn ${B} certifications for admins, developers, workflow builders and AI champions. Compare tracks, exam details, prices and free prep resources.`,
  path: "/certified",
});

type Track = {
  id: string;
  name: string;
  short: string;
  level: "Associate" | "Professional";
  icon: IconName;
  tone: Tone;
  summary: string;
  duration: string;
  questions: string;
  price: string;
  audience: string;
  skills: string[];
  guide: { label: string; href: string };
};

const tracks: Track[] = [
  {
    id: "admin",
    name: "Certified Admin",
    short: "Admin",
    level: "Professional",
    icon: "shieldCheck",
    tone: "sky",
    summary: "For workspace owners and IT teams who configure, secure and scale a workspace for the whole organization.",
    duration: "90 minutes",
    questions: "60 questions",
    price: "$200",
    audience: "Six or more months administering a workspace recommended",
    skills: [
      "Workspace and organization-level settings",
      "SSO, SCIM provisioning and user lifecycle",
      "Retention, exports and legal holds",
      "Security controls and audit logs",
      "App and agent governance",
    ],
    guide: { label: "Admin study guide", href: "/help" },
  },
  {
    id: "developer",
    name: "Certified Developer",
    short: "Developer",
    level: "Professional",
    icon: "code",
    tone: "violet",
    summary: "For engineers who build apps, integrations and agents on the platform and run them reliably in production.",
    duration: "120 minutes",
    questions: "55 questions and a hands-on lab",
    price: "$250",
    audience: "Experience with REST APIs and one programming language",
    skills: [
      "Web API, events and webhooks",
      "Interactive messages, modals and app home",
      "OAuth scopes and token security",
      "Building, testing and deploying agents",
      "Rate limits and reliability patterns",
    ],
    guide: { label: "Developer documentation", href: "/developers" },
  },
  {
    id: "workflow",
    name: "Certified Workflow Builder",
    short: "Workflow",
    level: "Associate",
    icon: "workflow",
    tone: "sun",
    summary: "For operations leads and power users who automate requests, approvals and hand-offs without writing code.",
    duration: "60 minutes",
    questions: "45 questions",
    price: "$150",
    audience: "Hands-on experience building at least a few workflows",
    skills: [
      "Triggers, steps and conditional logic",
      "Forms, lists and approval flows",
      "Connector steps for popular apps",
      "AI steps that classify, summarize and route",
      "Testing, versioning and sharing workflows",
    ],
    guide: { label: "Workflow resources", href: "/resources" },
  },
  {
    id: "ai-champion",
    name: "Certified AI Champion",
    short: "AI Champion",
    level: "Associate",
    icon: "sparkles",
    tone: "pink",
    summary: "For team leads and change makers who help colleagues adopt AI and agents responsibly and effectively.",
    duration: "60 minutes",
    questions: "40 questions",
    price: "$150",
    audience: "Open to anyone; regular use of AI features recommended",
    skills: [
      "Recaps, summaries and AI-powered search",
      "Writing clear prompts and agent instructions",
      "Responsible AI, privacy and permissions",
      "Measuring adoption and business impact",
      "Coaching teams through change",
    ],
    guide: { label: "AI help articles", href: "/help" },
  },
];

const faqs: Faq[] = [
  {
    q: "How are exams delivered?",
    a: "All exams are online and proctored, so you can take them from home or the office on any weekday or weekend. In-person testing is also available at Summit and select community events.",
  },
  {
    q: "What happens if I do not pass?",
    a: "You can retake an exam after 14 days. Your first retake is half price, and your score report shows which skill areas to focus on.",
  },
  {
    q: "How long does a certification stay valid?",
    a: "Certifications are valid for two years. Renew by completing a short, free maintenance module before your expiration date; there is no need to retake the full exam.",
  },
  {
    q: "Do you offer discounts for teams?",
    a: "Yes. Organizations that buy ten or more exam vouchers save 20%, and Enterprise customers may have vouchers included in their success plan. Community champions receive one free voucher each year.",
  },
  {
    q: "Are the exams available in other languages?",
    a: "Exams are available in English, Spanish, French, German, Japanese and Brazilian Portuguese, with extra time available for non-native speakers on request.",
  },
  {
    q: "Can I request testing accommodations?",
    a: "Absolutely. We offer extended time, screen reader compatible exams, breaks and other accommodations. Request them when you register and our team will confirm before your exam date.",
  },
];

function CertBadge({ track, size = "md", className }: { track: Track; size?: "sm" | "md" | "lg"; className?: string }) {
  const t = toneStyles[track.tone];
  const hex = "[clip-path:polygon(50%_0,95%_25%,95%_75%,50%_100%,5%_75%,5%_25%)]";
  const w = { sm: "w-20", md: "w-24", lg: "w-28 sm:w-36" }[size];
  const ico = { sm: "size-7", md: "size-8", lg: "size-10 sm:size-12" }[size];
  return (
    <div className={cn("relative inline-flex shrink-0 flex-col items-center", w, className)} aria-hidden="true">
      <div className={cn("flex aspect-[0.9] w-full items-center justify-center", hex, t.solid)}>
        <div className={cn("flex aspect-[0.9] w-[76%] items-center justify-center bg-white/20", hex)}>
          <Icon name={track.icon} className={ico} />
        </div>
      </div>
      <span className="-mt-3 rounded-full bg-deep px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.12em] whitespace-nowrap text-white uppercase shadow-card ring-2 ring-surface">
        {track.short}
      </span>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto max-w-md" aria-hidden="true">
      <div className="grid grid-cols-2 place-items-center gap-6 rounded-[var(--radius-panel)] border border-line bg-surface p-8 shadow-float sm:gap-8 sm:p-10">
        {tracks.map((t, i) => (
          <CertBadge key={t.id} track={t} size="lg" className={i % 2 === 0 ? "-rotate-3" : "rotate-3"} />
        ))}
      </div>
      <div className="absolute -bottom-8 -left-4 flex animate-float items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-3 shadow-float sm:-left-10">
        <span className="inline-flex size-9 items-center justify-center rounded-xl bg-mint text-white dark:text-deep">
          <BadgeCheck className="size-5" aria-hidden="true" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Credential verified</span>
          <span className="text-muted">Alex Rivera · Certified Admin</span>
        </span>
      </div>
    </div>
  );
}

export default function CertifiedPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Certification" }]}
        eyebrow={`${B} Certified`}
        tone="sky"
        title={
          <>
            Prove your skills. <span className="text-gradient">Grow your career.</span>
          </>
        }
        subtitle={`Official ${B} certifications validate what you know about running, building on and getting the most from the platform, and show employers you can lead the way.`}
        primary={{ label: "Explore certifications", href: "/certified#tracks" }}
        secondary={{ label: "Exam prep resources", href: "/certified#prep" }}
        note="Online proctored exams, available in six languages."
        visual={<HeroVisual />}
      />

      <StatsBand
        stats={[
          { value: 64, suffix: "K+", label: "certified professionals" },
          { value: 140, label: "countries" },
          { value: 92, suffix: "%", label: "say it helped their career" },
          { value: 4, label: "certification tracks" },
        ]}
      />

      {/* Tracks */}
      <Section id="tracks">
        <SectionHeader
          eyebrow="Certification tracks"
          tone="sky"
          title="Choose your path"
          subtitle="Associate exams cover everyday expertise. Professional exams go deep on architecture, security and scale."
        />
        <Stagger className="grid gap-6 lg:grid-cols-2">
          {tracks.map((tr) => {
            const t = toneStyles[tr.tone];
            return (
              <StaggerItem key={tr.id} className="h-full">
                <article
                  id={tr.id}
                  aria-labelledby={`${tr.id}-title`}
                  className="flex h-full scroll-mt-28 flex-col rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-soft sm:p-8"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    <CertBadge track={tr} />
                    <div className="flex-1">
                      <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-bold", t.soft)}>{tr.level}</span>
                      <h3 id={`${tr.id}-title`} className="mt-2 font-display text-2xl font-bold text-fg">
                        {tr.name}
                      </h3>
                      <p className="mt-2 text-muted">{tr.summary}</p>
                    </div>
                  </div>

                  <dl className="mt-6 grid grid-cols-2 gap-3">
                    {[
                      { icon: Clock, label: "Duration", value: tr.duration },
                      { icon: FileQuestionMark, label: "Format", value: tr.questions },
                      { icon: Wallet, label: "Price", value: tr.price },
                      { icon: Monitor, label: "Delivery", value: "Online proctored" },
                    ].map((m) => (
                      <div key={m.label} className="rounded-2xl bg-surface-2 p-3">
                        <dt className="flex items-center gap-1.5 text-xs font-semibold text-subtle">
                          <m.icon className="size-3.5" aria-hidden="true" />
                          {m.label}
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-fg">{m.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <h4 className="mt-6 text-xs font-bold tracking-[0.12em] text-subtle uppercase">Skills validated</h4>
                  <ul className="mt-3 grid flex-1 gap-2 sm:grid-cols-2">
                    {tr.skills.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-fg">
                        <Check className={cn("mt-0.5 size-4 shrink-0", t.ink)} aria-hidden="true" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-muted">
                    <span className="font-semibold text-fg">Recommended experience: </span>
                    {tr.audience}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-line pt-5">
                    <ButtonLink href="/signin" size="md" arrow>
                      Register for exam
                      <span className="sr-only">: {tr.name}</span>
                    </ButtonLink>
                    <ArrowLink href={tr.guide.href} className="text-sm">
                      {tr.guide.label}
                    </ArrowLink>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal className="mt-10 text-center text-sm text-muted">
          Buying for a team? Save 20% on bundles of ten or more vouchers.{" "}
          <ArrowLink href="/contact-sales" className="text-sm">
            Contact sales
          </ArrowLink>
        </Reveal>
      </Section>

      {/* How it works */}
      <Section bg="soft">
        <SectionHeader eyebrow="How it works" tone="mint" title="From first lesson to verified badge" subtitle="Most candidates prepare in two to six weeks alongside their day job." />
        <Stagger as="ul" className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: "compass" as const, title: "Choose a track", body: "Pick the certification that matches your role, then review the exam guide and skills outline." },
            { icon: "book" as const, title: "Prepare for free", body: "Work through help guides, docs, practice questions and live prep sessions at your own pace." },
            { icon: "laptop" as const, title: "Take the exam", body: "Schedule an online proctored exam whenever it suits you, from anywhere in the world." },
            { icon: "award" as const, title: "Share your badge", body: "Get a verifiable digital badge and certificate to add to your profile and resume." },
          ].map((s, i) => (
            <StaggerItem as="li" key={s.title} className="relative h-full">
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary font-display font-bold text-primary-fg">{i + 1}</span>
                  <Icon name={s.icon} className={cn("size-6", toneStyles[(["sky", "mint", "sun", "pink"] as const)[i]].ink)} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-fg">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Prep resources */}
      <Section id="prep">
        <SectionHeader
          eyebrow="Exam prep"
          tone="violet"
          title="Free resources to help you pass"
          subtitle="Everything on the exam is covered in our public documentation and learning content. No paid course required."
        />
        <IconCardGrid
          items={[
            { icon: "lifebuoy", title: "Help Center guides", body: "Step-by-step articles on every admin setting, feature and workflow covered in the exams.", href: "/help", cta: "Visit the Help Center" },
            { icon: "terminal", title: "Developer documentation", body: "API references, tutorials and sample apps for the Developer certification lab.", href: "/developers", cta: "Read the docs" },
            { icon: "library", title: "Guides and webinars", body: "On-demand sessions, e-books and checklists from our product experts.", href: "/resources", cta: "Browse resources" },
            { icon: "presentation", title: "Live prep sessions", body: "Join monthly exam cram webinars and hands-on labs with certified instructors.", href: "/events", cta: "See upcoming sessions" },
            { icon: "play", title: "Interactive product tour", body: "Get comfortable with channels, huddles, canvases, lists and AI before exam day.", href: "/product-tour", cta: "Take the tour" },
            { icon: "users", title: "Community study groups", body: "Prepare alongside peers in chapter study groups and the online Admins Guild.", href: "/community", cta: "Join the community" },
          ]}
        />
      </Section>

      {/* Badges */}
      <Section bg="deep" labelledBy="badges-heading">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="flex flex-col items-start gap-6">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] uppercase">Digital badges</p>
            <h2 id="badges-heading" className="text-display-md font-bold text-white">
              A credential employers can verify in one click
            </h2>
            <p className="text-lead text-on-deep-muted">
              Every certification comes with a digital badge and certificate. Each one links to a public verification
              page that confirms your name, track and expiration date.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Share to professional networks, email signatures and resumes",
                "Shows on your workspace profile so teammates know who to ask",
                "Valid for two years, with free renewal modules",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-on-deep">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-sun">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[var(--radius-panel)] border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-8">
                {tracks.map((t) => (
                  <div key={t.id} className="flex flex-col items-center gap-3">
                    <CertBadge track={t} size="md" />
                    <span className="text-center text-xs font-semibold text-on-deep-muted">{t.level}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-surface p-5 text-fg">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold tracking-[0.12em] text-muted uppercase">Verification record</p>
                  <span className="inline-flex items-center gap-1 rounded-full bg-tint-mint px-2.5 py-1 text-xs font-bold text-mint-ink">
                    <BadgeCheck className="size-3.5" aria-hidden="true" /> Valid
                  </span>
                </div>
                <p className="mt-3 font-display text-xl font-bold">Alex Rivera</p>
                <p className="text-sm text-muted">Certified Admin · Professional</p>
                <dl className="mt-4 grid grid-cols-3 gap-3 border-t border-line pt-4 text-xs">
                  <div>
                    <dt className="text-muted">Credential ID</dt>
                    <dd className="mt-0.5 font-mono font-bold">CRT-ADM-48213</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Issued</dt>
                    <dd className="mt-0.5 font-bold">Oct 2026</dd>
                  </div>
                  <div>
                    <dt className="text-muted">Expires</dt>
                    <dd className="mt-0.5 font-bold">Oct 2028</dd>
                  </div>
                </dl>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <ReviewHighlight index={1} />

      <FAQ items={faqs} bg="soft" subtitle="Have another question about exams or vouchers? Our certification team can help." />

      <CTABand
        title="Ready to get certified?"
        subtitle="Register in minutes, prepare with free resources and schedule your exam whenever you are ready."
        primary={{ label: "Register for an exam", href: "/signin" }}
        secondary={{ label: "Contact the certification team", href: "/contact" }}
      />
    </>
  );
}
