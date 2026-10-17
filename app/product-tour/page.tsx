import { Mockup } from "@/components/mockups";
import { CTABand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ProductTour } from "@/components/sections/product-tour";
import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Interactive product tour",
  description: `Take a guided, interactive tour of ${B}. Learn channels, threads, huddles, canvases, lists, AI recaps and Workflow Builder step by step in about five minutes.`,
  path: "/product-tour",
});

export default function ProductTourPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Resources", href: "/resources" }, { label: "Product tour" }]}
        layout="center"
        eyebrow="Product tour"
        tone="sky"
        title={
          <>
            Learn {B} <span className="text-gradient">step by step</span>
          </>
        }
        subtitle="A five-minute guided tour of the essentials. Click through each step, or use your arrow keys."
        className="!pb-8"
      />
      <Section className="!pt-4">
        <ProductTour
          steps={[
            {
              title: "Join a channel",
              icon: "hash",
              body: "Channels organize conversations by project, team or topic. Everything about the launch lives in #launch-fall, so anyone can catch up.",
              tip: "Look for bold channel names in the sidebar: they have unread messages.",
              hotspot: { x: 14, y: 40 },
              visual: <Mockup kind="chat-channels" />,
            },
            {
              title: "Reply in a thread",
              icon: "messages",
              body: "Threads keep side conversations tidy. Reactions let the team vote or acknowledge without adding noise.",
              tip: "Use emoji reactions to run a quick poll.",
              hotspot: { x: 38, y: 52 },
              visual: <Mockup kind="messaging" />,
            },
            {
              title: "Start a huddle",
              icon: "headphones",
              body: "Huddles are lightweight audio and video calls you can start from any conversation, with live captions and AI notes.",
              tip: "Huddles show who's speaking with a glowing ring.",
              hotspot: { x: 50, y: 88 },
              visual: <Mockup kind="huddle" />,
            },
            {
              title: "Write a canvas",
              icon: "file",
              body: "Canvases are docs that live in channels, perfect for briefs, plans and runbooks that everyone can edit together.",
              tip: "Live cursors show who else is editing right now.",
              hotspot: { x: 62, y: 46 },
              visual: <Mockup kind="canvas" />,
            },
            {
              title: "Track work in a list",
              icon: "listChecks",
              body: "Lists turn conversations into accountable plans with owners, status and due dates, in table or board view.",
              tip: "Switch between Table and Board views in the top right.",
              hotspot: { x: 82, y: 14 },
              visual: <Mockup kind="lists" />,
            },
            {
              title: "Catch up with AI",
              icon: "sparkles",
              body: "AI recaps summarize busy channels, pull out decisions and list the action items that need you.",
              tip: "Ask a question in plain English in the box at the bottom.",
              hotspot: { x: 55, y: 34 },
              visual: <Mockup kind="ai" />,
            },
            {
              title: "Automate with workflows",
              icon: "workflow",
              body: "Workflow Builder handles routine requests and approvals so your team can focus on the work that matters.",
              tip: "Each step can be an app action, a message or an AI step.",
              hotspot: { x: 50, y: 30 },
              visual: <Mockup kind="workflow" />,
            },
          ]}
        />
      </Section>
      <CTABand title="Now try it with your team" subtitle="Create a free workspace and invite your teammates in under a minute." secondary={{ label: "Watch the demo", href: "/demo" }} />
    </>
  );
}
