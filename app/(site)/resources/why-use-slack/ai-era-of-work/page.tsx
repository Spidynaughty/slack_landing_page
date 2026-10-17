import { Download } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Mockup } from "@/components/mockups";
import { CTABand, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArticleBody } from "@/components/templates/article";
import { TableOfContents } from "@/components/templates/article-client";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import type { ArticleSection } from "@/data/types";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, toneAt } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { ReviewHighlight } from "@/components/sections/reviews";

export const metadata = buildMetadata({
  title: "Work in the AI era: 2026 research report",
  description: `What 18,000 desk workers told us about AI adoption, trust, focus time and collaboration, plus a practical playbook for leaders, from the ${B} research team.`,
  path: "/resources/why-use-slack/ai-era-of-work",
  type: "article",
  publishedTime: "2026-09-30",
});

const findings = [
  { value: 68, suffix: "%", label: "of desk workers now use AI at work weekly, up from 41% a year ago" },
  { value: 2.4, decimals: 1, suffix: "x", label: "more likely to feel productive when AI is built into tools they already use" },
  { value: 54, suffix: "%", label: "say unclear guidance from leaders is the biggest barrier to using AI" },
  { value: 5.1, decimals: 1, suffix: "h", label: "saved per week by daily AI users, mostly on search and summaries" },
];

const chapters: ArticleSection[] = [
  {
    id: "adoption",
    heading: "1. Adoption has crossed the tipping point",
    paragraphs: [
      "For the first time, a clear majority of desk workers in our nine-country survey use AI tools at least weekly. The fastest growth came not from standalone chat apps, but from AI built into the tools people already rely on: recaps in their workspace, drafting in their docs and answers in their search bar.",
      "Adoption is uneven, though. Workers at companies with an explicit AI policy were nearly three times as likely to use AI daily as those at companies without one, regardless of industry or company size.",
    ],
    bullets: [
      "Daily users are concentrated in engineering, marketing and customer support",
      "Frontline managers lag individual contributors by about 12 points",
      "Executives overestimate team adoption by an average of 23 points",
    ],
  },
  {
    id: "trust",
    heading: "2. Trust is earned through context and transparency",
    paragraphs: [
      "Respondents trusted AI answers most when they could see where the answer came from. Citations to familiar sources, such as a channel, a document or a known colleague, increased reported trust more than any other factor we tested.",
      "Workers were also far more comfortable with agents taking action when a person approved sensitive steps. Approval flows did not slow adoption; they accelerated it.",
    ],
    quote: "The moment I could click through to the original message, I stopped double-checking everything the AI told me.",
  },
  {
    id: "focus",
    heading: "3. AI is giving back focus time, if leaders let it",
    paragraphs: [
      "Daily AI users reported saving just over five hours a week, mostly on searching for information, catching up on conversations and writing first drafts. But only a third said that time went into deep work. The rest was absorbed by more meetings and more messages.",
      "Teams that paired AI with explicit norms, such as async updates instead of status meetings, were the ones that converted saved time into meaningful work.",
    ],
  },
  {
    id: "playbook",
    heading: "4. A playbook for leaders",
    paragraphs: ["Across hundreds of interviews, the organizations getting the most value from AI shared a handful of practices."],
    bullets: [
      "Publish clear, permissive guidance on what AI can be used for",
      "Bring AI into existing workflows rather than adding new tools",
      "Start agents with narrow, well-defined jobs and human approval",
      "Measure outcomes, such as cycle time and response time, not usage",
      "Protect the time AI saves with meeting-free blocks and async rituals",
    ],
  },
];

export default function AiEraReportPage() {
  return (
    <>
      <PageHero
        deep
        crumbs={[{ label: "Resources", href: "/resources" }, { label: `Why ${B}`, href: "/resources/why-use-slack" }, { label: "AI era of work" }]}
        eyebrow="2026 research report"
        title={
          <>
            Work in the <span className="text-gradient">AI era</span>
          </>
        }
        subtitle="What 18,000 desk workers across nine countries told us about AI adoption, trust, focus and the future of collaboration."
        primary={{ label: "Get the full report", href: "#download" }}
        secondary={{ label: "Read key findings", href: "#findings" }}
        visual={<Mockup kind="ai" />}
      />

      <Section id="findings" className="scroll-mt-20">
        <SectionHeader eyebrow="Key findings" title="Four numbers that define work in 2026" />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {findings.map((f, i) => (
            <StaggerItem key={f.label} className="h-full">
              <div className={cn("flex h-full flex-col rounded-[var(--radius-card)] p-6", toneStyles[toneAt(i)].tint)}>
                <p className={cn("font-display text-display-md font-extrabold", toneStyles[toneAt(i)].ink)}>
                  <CountUp value={f.value} suffix={f.suffix} decimals={f.decimals} />
                </p>
                <p className="mt-3 text-fg">{f.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <section className="bg-bg pb-20">
        <div className="container-page grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents items={chapters.map((c) => ({ id: c.id, heading: c.heading }))} />
            </div>
          </aside>
          <div className="max-w-3xl">
            <ArticleBody sections={chapters} />
          </div>
        </div>
      </section>

      <StatsBand
        title="About the research"
        stats={[
          { value: 18000, label: "desk workers surveyed" },
          { value: 9, label: "countries" },
          { value: 340, label: "leader interviews" },
        ]}
      />

      <ReviewHighlight index={6} />

      <Section id="download" bg="soft" className="scroll-mt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Download className="size-7" aria-hidden="true" />
            </span>
            <h2 className="text-display-md font-bold text-fg">Get the full 48-page report</h2>
            <p className="text-lead text-muted">Includes industry and country breakdowns, the complete leader playbook and a rollout checklist you can share with your team.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              submitLabel="Send me the report"
              successTitle="Check your inbox"
              successBody="We've emailed you a link to the full report. (This is a demo, so no email is actually sent.)"
              fields={[
                { name: "first", label: "First name", required: true, autoComplete: "given-name", half: true },
                { name: "last", label: "Last name", required: true, autoComplete: "family-name", half: true },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
                { name: "role", label: "Role", type: "select", options: ["Executive", "Manager", "Individual contributor", "IT / Security", "Other"] },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <CTABand title="Put the playbook into practice" subtitle={`See how ${B} AI and agents help teams turn saved time into better work.`} primary={{ label: `Explore ${B} AI`, href: "/features/ai" }} secondary={{ label: "Talk to sales", href: "/contact-sales" }} />
    </>
  );
}
