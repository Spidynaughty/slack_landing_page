import { Download } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Mockup } from "@/components/mockups";
import { CTABand, IconCardGrid, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArticleBody } from "@/components/templates/article";
import { TableOfContents } from "@/components/templates/article-client";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import type { ArticleSection } from "@/data/types";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { ReviewHighlight } from "@/components/sections/reviews";

export const metadata = buildMetadata({
  title: "Winning in the AI era of work: rethinking email",
  description: `New research on email overload and conversational work: why AI summaries are replacing status emails and how leaders can help teams move beyond the inbox.`,
  path: "/resources/why-use-slack/rethinking-email-ai-conversations-work",
  type: "article",
  publishedTime: "2026-10-06",
});

const chapters: ArticleSection[] = [
  {
    id: "email-overload",
    heading: "1. Email overload has become a productivity tax",
    paragraphs: [
      "The average respondent in our study receives 121 work emails a day, and fewer than one in five require them to do anything. The rest are notifications, status updates, reply-all threads and messages sent just in case. Workers told us they spend the first hour of each day triaging their inbox before any real work begins.",
      "The cost is not only time. Respondents who described their inbox as overwhelming were twice as likely to say they had missed an important decision in the past month, and 44 percent said they regularly learn about project changes after everyone else.",
    ],
    bullets: [
      "Internal email volume grew 14 percent year over year, despite new collaboration tools",
      "Managers receive 1.8 times more email than individual contributors",
      "Only 18 percent of emails received require a direct action",
    ],
  },
  {
    id: "conversational-work",
    heading: "2. Work is shifting from messages to conversations",
    paragraphs: [
      "The teams in our study that reported the least overload had not simply sent fewer emails. They had moved internal collaboration into channels organized around projects and topics, where conversations are open to the people who need them and searchable by everyone who joins later.",
      "That shift changes the unit of communication. An email is a message addressed to specific recipients at a single moment. A channel is an ongoing conversation that builds context over time. Respondents on conversation-first teams were 2.3 times more likely to say they could find information without having to ask a colleague.",
    ],
    quote: "Our inbox used to be where work went to hide. Now it's mostly receipts and calendar invites, and the actual work happens where everyone can see it.",
  },
  {
    id: "ai-summaries",
    heading: "3. AI summaries are replacing the status email",
    paragraphs: [
      "Status emails are the largest single category of internal email in our data, and the least read. Nearly half of respondents admitted to skimming or skipping weekly updates, even from their own managers. Yet leaders still depend on them to understand what is happening across their teams.",
      "AI summaries offer a better deal for everyone. Instead of asking every team lead to write an update, AI can generate a recap of what happened in each project channel, highlighting decisions, risks and open questions, with links back to the original conversations. Sixty-one percent of respondents said they would rather read that than a status email.",
      "Early adopters reported an unexpected benefit: because summaries are generated from the real conversation, they tend to be more candid than curated updates. Problems surface days earlier when nobody has to decide how to word them.",
    ],
  },
  {
    id: "trust-and-control",
    heading: "4. Trust depends on transparency and control",
    paragraphs: [
      "Respondents were enthusiastic about AI summaries, with conditions. Eighty-two percent said they would only rely on a summary if they could click through to the source messages, and seven in ten wanted to know exactly which conversations a summary drew from.",
      "Control matters too. Workers expect summaries to respect existing permissions, so a recap never surfaces something from a private channel they cannot access, and they want to tune what appears in their daily digest rather than receive everything by default.",
    ],
  },
  {
    id: "leader-playbook",
    heading: "5. A playbook for moving beyond the inbox",
    paragraphs: [
      "The organizations that made the most progress treated the move away from email as a change in habits, not a tool rollout. Leaders went first, modelling the new norms and retiring their own status emails before asking anyone else to.",
      "Email will not disappear, and it should not. It remains the right tool for formal communication, external correspondence and records that need to live in an inbox. The goal is to stop using it for the conversational work it was never designed to do. Five steps we saw work again and again:",
    ],
    steps: [
      "Audit internal email for one week and categorize what your team sends",
      "Move project and team conversations into clearly named channels",
      "Replace weekly status emails with AI recaps from project channels",
      "Publish norms for what belongs in email, in channels and in huddles",
      "Measure inbox volume and time to decision every quarter",
    ],
  },
];

export default function RethinkingEmailReportPage() {
  return (
    <>
      <PageHero
        deep
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: `Why ${B}`, href: "/resources/why-use-slack" },
          { label: "Rethinking email" },
        ]}
        eyebrow="2026 research report"
        title={
          <>
            Winning in the AI era of work: <span className="text-gradient">rethinking email</span>
          </>
        }
        subtitle="We studied how 9,500 knowledge workers in seven countries communicate, and found that the inbox has quietly become one of the biggest drags on productivity in the AI era."
        primary={{ label: "Download the report", href: "#download" }}
        secondary={{ label: "See the key stats", href: "#findings" }}
        visual={<Mockup kind="messaging" />}
      />

      <div id="findings" className="scroll-mt-20">
        <StatsBand
          title="Four numbers on the state of the inbox"
          stats={[
            { value: 121, label: "work emails the average respondent receives each day" },
            { value: 38, suffix: "%", label: "of internal email is status updates nobody acts on" },
            { value: 3.2, decimals: 1, suffix: "h", label: "a week spent searching inboxes for things already shared" },
            { value: 61, suffix: "%", label: "would rather read an AI summary than a status email" },
          ]}
        />
      </div>

      <section className="bg-bg pt-16 pb-20 md:pt-20" aria-label="Report chapters">
        <div className="container-page grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents items={chapters.map((c) => ({ id: c.id, heading: c.heading }))} />
            </div>
          </aside>
          <div className="max-w-3xl">
            <details className="mb-8 rounded-2xl border border-line p-4 lg:hidden">
              <summary className="font-semibold text-fg">In this report</summary>
              <ol className="mt-3 flex flex-col gap-2 text-sm">
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} className="text-muted hover:text-primary">
                      {c.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
            <ArticleBody sections={chapters} />
          </div>
        </div>
      </section>

      <Section bg="soft" labelledBy="put-it-to-work">
        <SectionHeader
          id="put-it-to-work"
          eyebrow="Put the findings to work"
          title="Three ways to give your team its time back"
          subtitle={`Teams in the study that cut inbox overload leaned on the same few ${B} capabilities.`}
        />
        <IconCardGrid
          columns={3}
          items={[
            {
              icon: "sparkles",
              title: "Swap status emails for AI recaps",
              body: "Summaries of project channels highlight decisions, risks and open questions, with links back to the source.",
              href: "/features/ai",
              cta: `Explore ${B} AI`,
            },
            {
              icon: "workflow",
              title: "Route updates with workflows",
              body: "Replace routine notification emails with no-code workflows that post to the right channel at the right time.",
              href: "/features/workflow-automation",
              cta: "Explore automation",
            },
            {
              icon: "pen",
              title: "Turn long chains into canvases",
              body: "Capture decisions and plans in living documents that sit next to the conversation instead of in a forwarded thread.",
              href: "/features/canvas",
              cta: "Explore canvases",
            },
          ]}
        />
      </Section>

      <ReviewHighlight index={7} />

      <Section id="download" bg="soft" className="scroll-mt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-fg">
              <Download className="size-7" aria-hidden="true" />
            </span>
            <h2 className="text-display-md font-bold text-fg">Get the full 36-page report</h2>
            <p className="text-lead text-muted">
              Includes breakdowns by country, role and company size, the complete leader playbook and an inbox audit worksheet you can run with your team.
            </p>
            <p className="text-sm text-subtle">
              About the research: an online survey of 9,500 full-time knowledge workers in seven countries, fielded in July 2026, plus 60 follow-up interviews.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              submitLabel="Send me the report"
              successTitle="It's on its way"
              successBody="We've emailed you a link to the full report. (This is a demo, so no email is actually sent.)"
              fields={[
                { name: "first", label: "First name", required: true, autoComplete: "given-name", half: true },
                { name: "last", label: "Last name", required: true, autoComplete: "family-name", half: true },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email" },
                { name: "company", label: "Company", autoComplete: "organization", half: true },
                { name: "size", label: "Company size", type: "select", options: ["1–49", "50–249", "250–999", "1,000–9,999", "10,000+"], half: true },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Move conversations out of the inbox"
        subtitle={`See how ${B} channels, AI recaps and workflows give teams back hours every week.`}
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Watch the demo", href: "/demo" }}
      />
    </>
  );
}
