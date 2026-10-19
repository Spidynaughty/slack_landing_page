import { Mockup } from "@/components/mockups";
import { LeadForm } from "@/components/forms/lead-form";
import { DemoPlayer } from "@/components/sections/demo-player";
import { CTABand, IconCardGrid } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Watch the demo",
  description: `See ${B} in action in five minutes: channels, huddles, canvases, lists, AI recaps, agents and Workflow Builder working together for a real launch team.`,
  path: "/demo",
});

export default function DemoPage() {
  return (
    <>
      <PageHero
        crumbs={navCrumbs("/demo", { section: "product", label: "Watch demo" })}
        layout="center"
        eyebrow="Product demo"
        title={
          <>
            See {B} in action <span className="text-gradient">in five minutes</span>
          </>
        }
        subtitle="Follow a launch team from morning recap to shipped release, and see how channels, huddles, AI and automation fit together."
        className="!pb-8"
      />
      <Section className="!pt-4">
        <DemoPlayer
          chapters={[
            { title: "Channels bring the team together", caption: "Every project gets a channel, so the whole launch team works from the same place.", seconds: 8, visual: <Mockup kind="chat" /> },
            { title: "Huddle to decide in minutes", caption: "A quick huddle resolves the pricing question, with AI notes posted automatically.", seconds: 7, visual: <Mockup kind="huddle" /> },
            { title: "Plan in canvases and lists", caption: "The launch brief and task tracker live right next to the conversation.", seconds: 7, visual: <Mockup kind="lists" /> },
            { title: "AI recaps what you missed", caption: "Recaps summarize busy channels and pull out your action items.", seconds: 7, visual: <Mockup kind="ai" /> },
            { title: "Agents and workflows do the busywork", caption: "Workflows route approvals while an agent drafts customer replies for review.", seconds: 8, visual: <Mockup kind="workflow" /> },
          ]}
        />
      </Section>
      <Section bg="soft">
        <SectionHeader eyebrow="In the demo" title="What you'll see" />
        <IconCardGrid
          columns={4}
          items={[
            { icon: "hash", title: "Channels", body: "Organize every project, team and topic with the right people." },
            { icon: "headphones", title: "Huddles", body: "Jump into audio or video with live captions and AI notes." },
            { icon: "sparkles", title: "AI & agents", body: "Recaps, answers and agents that finish tasks for you." },
            { icon: "workflow", title: "Automation", body: "No-code workflows that handle approvals and hand-offs." },
          ]}
        />
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-5">
            <SectionHeader align="left" className="!mb-0" eyebrow="Live demo" title="Want a walkthrough tailored to your team?" />
            <p className="text-lead text-muted">Book a 30-minute live session with a product specialist. We&apos;ll focus on your workflows, tools and questions.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              formName="Live demo booking"
              submitLabel="Book a live demo"
              successTitle="Your demo request is in"
              successBody="A product specialist will email you within one business day with available times."
              fields={[
                { name: "name", label: "Full name", required: true, autoComplete: "name", half: true },
                { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "company", label: "Company", required: true, autoComplete: "organization", half: true },
                { name: "team", label: "Team size", type: "select", options: ["1–10", "11–50", "51–250", "251–1,000", "1,000+"], half: true },
              ]}
            />
          </Reveal>
        </div>
      </Section>
      <CTABand title="Ready to try it yourself?" subtitle="Create a workspace in under a minute. It's free for small teams." secondary={{ label: "Take the product tour", href: "/product-tour" }} />
    </>
  );
}
