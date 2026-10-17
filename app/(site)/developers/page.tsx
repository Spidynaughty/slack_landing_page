import Link from "next/link";
import { ArrowRight, BookOpen, Terminal } from "lucide-react";
import { Mockup } from "@/components/mockups";
import { CodeTabs } from "@/components/sections/code-tabs";
import { CTABand, IconCardGrid, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles, type Tone } from "@/lib/tones";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Developer platform: APIs, SDKs and CLI",
  description: `Build apps, workflows and AI agents on the ${B} platform with the Web API, Events API, official SDKs for JavaScript, Python and Java, and a powerful CLI.`,
  path: "/developers",
});

const pkg = B.toLowerCase();

const quickstart = [
  {
    label: "JavaScript",
    language: "js",
    code: `// npm install @${pkg}/sdk
import { App } from "@${pkg}/sdk";

const app = new App({ token: process.env.APP_TOKEN });

// Reply whenever someone mentions your app
app.event("app_mention", async ({ event, say }) => {
  await say(\`Hi <@\${event.user}>, how can I help?\`);
});

await app.start(3000);`,
  },
  {
    label: "Python",
    language: "python",
    code: `# pip install ${pkg}-sdk
import os
from ${pkg}_sdk import App

app = App(token=os.environ["APP_TOKEN"])

# Reply whenever someone mentions your app
@app.event("app_mention")
def handle_mention(event, say):
    say(f"Hi <@{event['user']}>, how can I help?")

if __name__ == "__main__":
    app.start(port=3000)`,
  },
  {
    label: "cURL",
    language: "bash",
    code: `# Post a message with the Web API
curl -X POST https://api.${pkg}.example/v2/messages.post \\
  -H "Authorization: Bearer $APP_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"channel": "launch-fall", "text": "Deploy finished in 4m 12s"}'`,
  },
];

const agentSample = [
  {
    label: "Agent (JS)",
    language: "js",
    code: `import { Agent, tool } from "@${pkg}/agents";

export const helpdesk = new Agent({
  name: "IT Helpdesk",
  instructions: "Resolve laptop and access requests. Ask before resetting MFA.",
  knowledge: ["canvas:it-runbook", "channel:help-it"],
  tools: [
    tool("reset_password", { approval: "required" }),
    tool("create_ticket"),
  ],
});`,
  },
  {
    label: "Workflow step",
    language: "js",
    code: `import { defineStep } from "@${pkg}/workflows";

export const enrichLead = defineStep({
  id: "enrich_lead",
  title: "Enrich a lead",
  input: { email: "string" },
  async run({ input }) {
    const company = await lookupCompany(input.email);
    return { company: company.name, size: company.employees };
  },
});`,
  },
];

const sdks: { name: string; version: string; icon: IconName; tone: Tone; install: string }[] = [
  { name: "JavaScript / TypeScript", version: "v6.2", icon: "code", tone: "sun", install: `npm i @${pkg}/sdk` },
  { name: "Python", version: "v4.8", icon: "terminal", tone: "sky", install: `pip install ${pkg}-sdk` },
  { name: "Java", version: "v3.5", icon: "cpu", tone: "coral", install: `com.${pkg}:sdk:3.5.0` },
  { name: "CLI", version: "v2.14", icon: "command", tone: "violet", install: `npm i -g @${pkg}/cli` },
];

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        deep
        eyebrow="Developer platform"
        title={
          <>
            Build the future of work <span className="text-gradient">on {B}</span>
          </>
        }
        subtitle="APIs, SDKs and tools to build apps, automate workflows and deploy AI agents that millions of people use every day."
        primary={{ label: "Start building", href: "#quickstart" }}
        secondary={{ label: "Browse the Marketplace", href: "/marketplace" }}
        visual={<Mockup kind="code" />}
      />

      <StatsBand
        stats={[
          { value: 1.2, decimals: 1, suffix: "M", label: "developers building on the platform" },
          { value: 2600, suffix: "+", label: "apps in the Marketplace" },
          { value: 9, suffix: "B", label: "API calls every week" },
          { value: 99.99, decimals: 2, suffix: "%", label: "API availability" },
        ]}
      />

      <Section id="quickstart" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <SectionHeader align="left" className="!mb-0" eyebrow="Quickstart" title="Your first app in five minutes" />
            <ol className="flex flex-col gap-5">
              {[
                { t: "Create an app", d: "Register an app in the developer console and choose the scopes it needs." },
                { t: "Install the SDK", d: "Pick JavaScript, Python or Java and install the official SDK." },
                { t: "Listen for events", d: "Subscribe to mentions, messages, reactions and workflow events." },
                { t: "Ship it", d: "Install to your workspace, then publish to the Marketplace when you're ready." },
              ].map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-fg">{i + 1}</span>
                  <span>
                    <span className="block font-display text-lg font-bold text-fg">{s.t}</span>
                    <span className="text-muted">{s.d}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <CodeTabs samples={quickstart} title="Quickstart code" />
          </Reveal>
        </div>
      </Section>

      <Section bg="soft">
        <SectionHeader eyebrow="SDKs & tools" title="Official SDKs for your stack" />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sdks.map((s) => (
            <StaggerItem key={s.name} lift className="h-full">
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", toneStyles[s.tone].solid)}>
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  <span className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs font-semibold text-fg">{s.version}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-fg">{s.name}</h3>
                <code className="mt-3 block overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 font-mono text-xs text-fg">{s.install}</code>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeader eyebrow="APIs" title="Everything you need to build" />
        <IconCardGrid
          columns={4}
          items={[
            { icon: "send", title: "Web API", body: "200+ methods to post messages, manage channels, upload files and more." },
            { icon: "zap", title: "Events API", body: "Real-time events delivered over HTTP or socket mode, with retries." },
            { icon: "workflow", title: "Workflow steps", body: "Package custom steps that anyone can drop into Workflow Builder." },
            { icon: "bot", title: "Agents API", body: "Define agents with instructions, knowledge, tools and approvals." },
          ]}
        />
      </Section>

      <Section bg="deep">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="flex flex-col gap-5">
            <p className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.12em] text-on-deep uppercase">Agents & workflows</p>
            <h2 className="text-display-md font-bold text-white">Build agents with guardrails built in</h2>
            <p className="text-lead text-on-deep-muted">
              Give agents instructions, knowledge sources and tools. Mark sensitive tools as requiring approval, and every action is logged for admins.
            </p>
            <Link href="/features/agentic-platform" className="group inline-flex w-fit items-center gap-1.5 font-semibold text-white">
              Explore the agentic platform
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <CodeTabs samples={agentSample} title="Agent samples" />
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { icon: BookOpen, title: "Guides & tutorials", body: "Step-by-step tutorials from first app to production agent.", href: "/help" },
            { icon: Terminal, title: "Engineering blog", body: "How we build the platform, and lessons from scale.", href: "/engineering-blog" },
            { icon: ArrowRight, title: "Builder community", body: "Join meetups and channels with 100K+ builders.", href: "/community" },
          ].map((c) => (
            <Link key={c.title} href={c.href} className="group rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card">
              <c.icon className="size-7 text-primary" aria-hidden="true" />
              <h3 className="mt-4 font-display text-xl font-bold text-fg">{c.title}</h3>
              <p className="mt-1 text-muted">{c.body}</p>
            </Link>
          ))}
        </div>
      </Section>

      <CTABand title="Publish to millions of users" subtitle="List your app in the Marketplace and grow with our partner programme." primary={{ label: "Join the partner programme", href: "/partners" }} secondary={{ label: "Browse the Marketplace", href: "/marketplace" }} />
    </>
  );
}
