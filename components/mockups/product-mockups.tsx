import {
  ArrowRight,
  AtSign,
  Bot,
  Calendar,
  Captions,
  Check,
  CheckCircle2,
  CircleDashed,
  Clock,
  FileText,
  Film,
  GitPullRequest,
  Globe,
  Hand,
  Image as ImageIcon,
  KeyRound,
  Loader2,
  Lock,
  MessageSquare,
  Mic,
  MonitorUp,
  PhoneOff,
  Play,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Table2,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AppFrame, Avatar, BotAvatar, ChannelHeader, Message, Pill, Reaction, Sidebar, people, type PersonKey } from "./parts";

const defaultSidebar = [
  { label: "general" },
  { label: "launch-fall", active: true },
  { label: "design-crit", unread: true },
  { label: "eng-platform" },
];

/* ------------------------------------------------------------------ */
export function HuddleMockup({ className }: { className?: string }) {
  const tiles: { who: PersonKey; speaking?: boolean; bg: string }[] = [
    { who: "priya", speaking: true, bg: "from-[#3a2a9c] to-[#6d4cff]" },
    { who: "marcus", bg: "from-[#9a3b1d] to-[#ff7a4d]" },
    { who: "sofia", bg: "from-[#065f46] to-[#10b981]" },
    { who: "hana", bg: "from-[#0c4a6e] to-[#0ea5e9]" },
  ];
  return (
    <AppFrame label="Huddle with four teammates on video, live captions and a shared screen" className={className} title="Huddle in #launch-fall">
      <div className="bg-deep p-3 sm:p-4">
        <div className="mb-3 flex items-center justify-between text-[0.72rem] text-on-deep-muted">
          <span className="flex items-center gap-2 font-semibold text-white">
            <span className="size-2 animate-pulse-soft rounded-full bg-mint" /> Huddle · #launch-fall
          </span>
          <span className="tabular-nums">12:48</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {tiles.map((t) => (
            <div
              key={t.who}
              className={cn(
                "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br",
                t.bg,
                t.speaking && "ring-2 ring-mint ring-offset-2 ring-offset-deep",
              )}
            >
              <Avatar who={t.who} size="lg" className="rounded-full ring-4 ring-white/15" />
              <span className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-md bg-black/40 px-1.5 py-0.5 text-[0.65rem] font-semibold text-white">
                {t.speaking ? (
                  <span className="flex h-3 items-end gap-[2px]" aria-hidden="true">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="w-[3px] origin-bottom animate-wave rounded-full bg-mint"
                        style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </span>
                ) : (
                  <Mic className="size-3" aria-hidden="true" />
                )}
                {people[t.who].name.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-start gap-2 rounded-xl bg-white/8 p-2.5 text-[0.72rem] text-on-deep">
          <Captions className="mt-0.5 size-3.5 shrink-0 text-sun" aria-hidden="true" />
          <p>
            <span className="font-bold text-white">Priya:</span> …so if pricing copy lands by three, we can lock the
            launch email tonight.
          </p>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {[Mic, Video, MonitorUp, Hand].map((I, i) => (
            <span key={i} className="inline-flex size-9 items-center justify-center rounded-full bg-white/12 text-white">
              <I className="size-4" aria-hidden="true" />
            </span>
          ))}
          <span className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#e5484d] px-3 text-[0.72rem] font-bold text-white">
            <PhoneOff className="size-4" aria-hidden="true" /> Leave
          </span>
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function CanvasMockup({ className }: { className?: string }) {
  return (
    <AppFrame label="A canvas document with a launch brief, checklist, table and live collaborator cursors" className={className} sidebar={<Sidebar channels={defaultSidebar} dms={false} />}>
      <ChannelHeader name="launch-fall">
        <span className="hidden items-center gap-1 rounded-md bg-primary-soft px-2 py-0.5 text-[0.65rem] font-bold text-primary sm:inline-flex">
          <FileText className="size-3" aria-hidden="true" /> Canvas
        </span>
      </ChannelHeader>
      <div className="relative px-5 py-4 sm:px-7">
        <p className="text-[0.65rem] font-bold tracking-wider text-subtle uppercase">Launch brief</p>
        <p className="mt-1 font-display text-xl font-bold text-fg">Fall release: go-to-market plan</p>
        <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">
          Goal: reach <span className="rounded bg-sun/30 px-0.5 text-fg">40% adoption</span> of agents among active teams
          within 60 days of launch.
        </p>
        <p className="mt-4 mb-1.5 text-[0.75rem] font-bold text-fg">Checklist</p>
        <ul className="space-y-1.5 text-[0.75rem]">
          {[
            ["Finalize pricing page copy", true],
            ["Record demo video for the keynote", true],
            ["Brief support on new admin controls", false],
          ].map(([t, d]) => (
            <li key={t as string} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex size-4 items-center justify-center rounded border",
                  d ? "border-mint bg-mint text-white" : "border-line-strong",
                )}
              >
                {d && <Check className="size-3" aria-hidden="true" />}
              </span>
              <span className={d ? "text-subtle line-through" : "text-fg"}>{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 overflow-hidden rounded-lg border border-line text-[0.7rem]">
          <div className="grid grid-cols-3 bg-surface-2 font-bold text-fg">
            <span className="px-2 py-1.5">Channel</span>
            <span className="px-2 py-1.5">Owner</span>
            <span className="px-2 py-1.5">Date</span>
          </div>
          {[
            ["Blog + email", "Amara", "Oct 28"],
            ["Keynote demo", "Jonah", "Oct 29"],
          ].map((r) => (
            <div key={r[0]} className="grid grid-cols-3 border-t border-line text-muted">
              {r.map((c) => (
                <span key={c} className="px-2 py-1.5">
                  {c}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* live cursors */}
        <div className="pointer-events-none absolute top-16 right-10 animate-float" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="size-4 text-pink" fill="currentColor">
            <path d="M1 1l5 14 2-6 6-2z" />
          </svg>
          <span className="ml-3 rounded-md bg-pink px-1.5 py-0.5 text-[0.6rem] font-bold text-white">Amara</span>
        </div>
        <div className="pointer-events-none absolute right-24 bottom-16 animate-float [animation-delay:-3s]" aria-hidden="true">
          <svg viewBox="0 0 16 16" className="size-4 text-sky" fill="currentColor">
            <path d="M1 1l5 14 2-6 6-2z" />
          </svg>
          <span className="ml-3 rounded-md bg-sky px-1.5 py-0.5 text-[0.6rem] font-bold text-white">Jonah</span>
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function ListsMockup({ className }: { className?: string }) {
  const rows: { task: string; who: PersonKey; status: [string, "mint" | "sun" | "sky" | "muted"]; due: string; pr: string }[] = [
    { task: "Homepage hero refresh", who: "hana", status: ["Done", "mint"], due: "Oct 14", pr: "High" },
    { task: "Pricing FAQ updates", who: "marcus", status: ["In review", "sky"], due: "Oct 20", pr: "High" },
    { task: "Partner launch kit", who: "amara", status: ["In progress", "sun"], due: "Oct 24", pr: "Med" },
    { task: "Support macros for agents", who: "diego", status: ["Not started", "muted"], due: "Oct 27", pr: "Low" },
  ];
  return (
    <AppFrame label="A list tracking launch tasks with owners, statuses and due dates" className={className} sidebar={<Sidebar channels={defaultSidebar} dms={false} />}>
      <div className="flex h-12 items-center justify-between border-b border-line px-4">
        <p className="flex items-center gap-1.5 text-sm font-bold text-fg">
          <Table2 className="size-4 text-primary" aria-hidden="true" /> Launch tracker
        </p>
        <span className="flex gap-1 text-[0.65rem]">
          <span className="rounded-md bg-primary px-2 py-1 font-bold text-primary-fg">Table</span>
          <span className="rounded-md px-2 py-1 font-semibold text-muted">Board</span>
        </span>
      </div>
      <div className="overflow-hidden text-[0.72rem]">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_0.7fr] border-b border-line bg-surface-2 px-4 py-2 font-bold text-subtle">
          <span>Task</span>
          <span>Owner</span>
          <span>Status</span>
          <span className="text-right">Due</span>
        </div>
        {rows.map((r) => (
          <div key={r.task} className="grid grid-cols-[1.6fr_1fr_1fr_0.7fr] items-center border-b border-line px-4 py-2.5 last:border-0">
            <span className="truncate pr-2 font-semibold text-fg">{r.task}</span>
            <span className="flex items-center gap-1.5 truncate text-muted">
              <Avatar who={r.who} size="xs" className="rounded-full" />
              <span className="truncate">{people[r.who].name.split(" ")[0]}</span>
            </span>
            <span>
              <Pill tone={r.status[1]}>{r.status[0]}</Pill>
            </span>
            <span className="text-right text-muted tabular-nums">{r.due}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <span className="text-[0.7rem] font-semibold text-muted">Progress</span>
        <span className="h-2 flex-1 overflow-hidden rounded-full bg-surface-3">
          <span className="block h-full w-[62%] rounded-full bg-gradient-to-r from-primary to-pink" />
        </span>
        <span className="text-[0.7rem] font-bold text-fg">62%</span>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function AIMockup({ className }: { className?: string }) {
  return (
    <AppFrame label="AI recap summarizing unread channels with key decisions and action items" className={className} sidebar={<Sidebar channels={[{ label: "launch-fall", unread: true }, { label: "design-crit", unread: true }, { label: "eng-platform", unread: true }, { label: "sales-wins" }]} dms={false} />}>
      <div className="flex h-12 items-center gap-2 border-b border-line px-4">
        <Sparkles className="size-4 text-primary" aria-hidden="true" />
        <p className="text-sm font-bold text-fg">Recaps</p>
        <span className="ml-auto rounded-full bg-primary-soft px-2 py-0.5 text-[0.65rem] font-bold text-primary">3 channels · 214 messages</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-primary-soft to-transparent p-3.5">
          <p className="flex items-center gap-1.5 text-[0.72rem] font-bold text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" /> While you were away
          </p>
          <ul className="mt-2 space-y-1.5 text-[0.75rem] text-fg">
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span>
                <strong>#launch-fall</strong> locked Oct 28 as launch day; pricing copy due today from Marcus.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-pink" />
              <span>
                <strong>#design-crit</strong> approved the new nav. Two open comments need your review.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-mint" />
              <span>
                <strong>#eng-platform</strong> search latency down 38% after Tuesday&apos;s index change.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-line p-3">
          <p className="text-[0.7rem] font-bold text-subtle uppercase">Your action items</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Pill tone="coral">Review nav comments</Pill>
            <Pill tone="sky">Approve launch email</Pill>
            <Pill tone="mint">Reply to Leo</Pill>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-line-strong px-3 py-2 text-[0.75rem] text-subtle">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
          Ask anything about your workspace…
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function WorkflowMockup({ className }: { className?: string }) {
  const steps = [
    { icon: Zap, title: "When a form is submitted", sub: "IT request form", tone: "bg-sun text-deep" },
    { icon: Table2, title: "Add a row to a list", sub: "IT request tracker", tone: "bg-sky text-white" },
    { icon: Bot, title: "Ask an agent to triage", sub: "Priority + category", tone: "bg-primary text-white" },
    { icon: MessageSquare, title: "Post to a channel", sub: "#help-it", tone: "bg-mint text-white" },
  ];
  return (
    <AppFrame label="Workflow Builder automation connecting a form, a list, an AI agent and a channel" className={className} title="Workflow Builder">
      <div className="bg-dots p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-bold text-fg">New IT request</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[0.65rem] font-bold text-mint-ink">
            <span className="size-1.5 rounded-full bg-mint" /> Published
          </span>
        </div>
        <ol className="mx-auto flex max-w-xs flex-col items-stretch">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col items-center">
              <div className="flex w-full items-center gap-3 rounded-xl border border-line bg-surface p-3 shadow-soft">
                <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-lg", s.tone)}>
                  <s.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.75rem] font-bold text-fg">{s.title}</span>
                  <span className="block truncate text-[0.68rem] text-muted">{s.sub}</span>
                </span>
                <span className="ml-auto text-[0.6rem] font-bold text-subtle">{i + 1}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="relative my-1 h-6 w-px overflow-hidden bg-line-strong" aria-hidden="true">
                  <span className="absolute inset-x-0 top-0 h-3 animate-flow bg-primary" />
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-center text-[0.68rem] text-muted">Ran 1,284 times this month · saved ~96 hours</p>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function SearchMockup({ className }: { className?: string }) {
  const results = [
    { icon: FileText, src: "Canvas", title: "Q4 security review checklist", meta: "#sec-ops · updated 2d ago", tone: "text-primary bg-primary-soft" },
    { icon: MessageSquare, src: "Message", title: "“SOC 2 evidence is in the shared drive folder…”", meta: "Jonah Kim in #compliance", tone: "text-sky-ink bg-sky/15" },
    { icon: Globe, src: "Drivewise", title: "Vendor risk assessment 2026.pdf", meta: "Connected app · Legal", tone: "text-mint-ink bg-mint/15" },
    { icon: Table2, src: "List", title: "Open audit findings", meta: "7 items · 2 overdue", tone: "text-coral-ink bg-coral/15" },
  ];
  return (
    <AppFrame label="Enterprise search returning results from messages, canvases, lists and connected apps" className={className} title="Search">
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 rounded-xl border-2 border-primary bg-surface px-3 py-2.5 shadow-glow">
          <Search className="size-4 text-primary" aria-hidden="true" />
          <span className="text-[0.8rem] font-semibold text-fg">soc 2 audit evidence</span>
          <span className="ml-auto h-4 w-px animate-pulse-soft bg-fg" />
        </div>
        <div className="mt-3 rounded-xl border border-primary/20 bg-primary-soft/50 p-3">
          <p className="flex items-center gap-1.5 text-[0.7rem] font-bold text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" /> AI answer
          </p>
          <p className="mt-1 text-[0.75rem] text-fg">
            Audit evidence lives in the <strong>Q4 security review</strong> canvas. Two findings are still open and owned
            by the platform team.
          </p>
        </div>
        <div className="mt-3 flex gap-1.5 text-[0.65rem] font-semibold">
          {["All", "Messages", "Canvases", "Files", "Apps"].map((f, i) => (
            <span key={f} className={cn("rounded-full px-2 py-1", i === 0 ? "bg-fg text-bg" : "bg-surface-2 text-muted")}>
              {f}
            </span>
          ))}
        </div>
        <ul className="mt-3 space-y-1.5">
          {results.map((r) => (
            <li key={r.title} className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-2">
              <span className={cn("inline-flex size-8 shrink-0 items-center justify-center rounded-lg", r.tone)}>
                <r.icon className="size-4" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[0.75rem] font-semibold text-fg">{r.title}</span>
                <span className="block truncate text-[0.65rem] text-muted">
                  {r.src} · {r.meta}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function CodeMockup({ className }: { className?: string }) {
  return (
    <AppFrame label="A code channel showing a pull request, CI checks, an AI review and a deploy" className={className} sidebar={<Sidebar channels={[{ label: "eng-platform", active: true }, { label: "deploys", unread: true }, { label: "incidents" }, { label: "code-review" }]} dms={false} />}>
      <ChannelHeader name="eng-platform" members={58} />
      <div className="py-2">
        <Message who="jonah" time="4:12">
          Opened a PR for the search index migration.
          <span className="mt-1.5 block rounded-xl border border-line bg-surface-2 p-2.5">
            <span className="flex items-center gap-1.5 text-[0.72rem] font-bold text-fg">
              <GitPullRequest className="size-3.5 text-mint-ink" aria-hidden="true" /> #4821 Migrate search to v3 index
            </span>
            <span className="mt-1 flex flex-wrap items-center gap-1.5">
              <Pill tone="mint">
                <Check className="mr-0.5 size-3" aria-hidden="true" />
                12 checks passed
              </Pill>
              <Pill tone="muted">+418 −212</Pill>
            </span>
          </span>
        </Message>
        <Message bot botName={`${site.name} Code`} time="4:13">
          Reviewed #4821. One suggestion: batch the reindex job to avoid a 4-minute write lock.
          <span className="mt-1.5 block overflow-hidden rounded-lg bg-deep p-2.5 font-mono text-[0.68rem] leading-relaxed text-on-deep">
            <span className="text-on-deep-muted">{"// suggested"}</span>
            <br />
            <span className="text-pink">await</span> reindex(&#123; batchSize: <span className="text-sun">500</span> &#125;)
          </span>
        </Message>
        <Message who="sofia" time="4:20">
          <span className="inline-flex items-center gap-1.5">
            <Rocket className="size-3.5 text-coral-ink" aria-hidden="true" /> Deployed to production. p95 latency 142ms → 88ms.
          </span>
          <span className="mt-1.5 flex gap-1">
            <Reaction emoji="🚀" count={9} active />
            <Reaction emoji="👏" count={4} />
          </span>
        </Message>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function CRMMockup({ className, native = false }: { className?: string; native?: boolean }) {
  const stages = ["Qualify", "Discover", "Proposal", "Negotiate", "Closed"];
  return (
    <AppFrame label="A customer deal record with pipeline stage, value and contacts inside a deal channel" className={className} sidebar={<Sidebar channels={[{ label: "deal-brightline", active: true }, { label: "sales-wins" }, { label: "forecast", unread: true }]} dms={false} />}>
      <ChannelHeader name="deal-brightline" members={9} />
      <div className="space-y-3 p-4">
        <div className="rounded-xl border border-line p-3.5 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-bold tracking-wider text-subtle uppercase">{native ? `${site.name} CRM` : "Synced from your CRM"} · Opportunity</p>
              <p className="mt-0.5 font-display text-base font-bold text-fg">Brightline Retail · Enterprise</p>
            </div>
            <span className="font-display text-lg font-bold text-mint-ink">$184,000</span>
          </div>
          <div className="mt-3 flex gap-1">
            {stages.map((s, i) => (
              <span key={s} className="flex-1">
                <span className={cn("block h-1.5 rounded-full", i <= 2 ? "bg-primary" : "bg-surface-3")} />
                <span className={cn("mt-1 block truncate text-[0.6rem]", i === 2 ? "font-bold text-primary" : "text-subtle")}>{s}</span>
              </span>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[0.68rem]">
            <span className="rounded-lg bg-surface-2 p-2">
              <span className="block text-subtle">Close date</span>
              <span className="font-bold text-fg">Nov 15</span>
            </span>
            <span className="rounded-lg bg-surface-2 p-2">
              <span className="block text-subtle">Probability</span>
              <span className="font-bold text-fg">65%</span>
            </span>
            <span className="rounded-lg bg-surface-2 p-2">
              <span className="block text-subtle">Owner</span>
              <span className="font-bold text-fg">Marcus</span>
            </span>
          </div>
        </div>
        <Message bot botName="Deal Agent" time="3:02">
          Brightline&apos;s CFO opened the proposal 3 times today. Suggest scheduling a pricing review this week.
          <span className="mt-1.5 flex gap-1.5">
            <span className="rounded-md bg-primary px-2 py-1 text-[0.65rem] font-bold text-primary-fg">Draft email</span>
            <span className="rounded-md border border-line px-2 py-1 text-[0.65rem] font-semibold text-fg">Update stage</span>
          </span>
        </Message>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function AgentMockup({ className }: { className?: string }) {
  const steps = [
    { label: "Read 42 messages in #customer-escalations", done: true },
    { label: "Checked order history in Brightline’s account", done: true },
    { label: "Drafted a refund + replacement plan", done: true },
    { label: "Waiting for approval from Sofia", done: false },
  ];
  return (
    <AppFrame label="An AI agent working through a multi-step customer task and asking a human for approval" className={className} title="Service Agent">
      <div className="space-y-3 p-4">
        <Message who="diego" time="1:14">
          <span className="rounded bg-primary/12 px-0.5 font-semibold text-primary">@Service Agent</span> can you resolve
          Brightline&apos;s damaged-shipment case?
        </Message>
        <div className="mx-4 rounded-xl border border-line bg-surface-2 p-3">
          <p className="mb-2 flex items-center gap-2 text-[0.72rem] font-bold text-fg">
            <BotAvatar size="sm" /> Service Agent is working
          </p>
          <ol className="space-y-1.5">
            {steps.map((s) => (
              <li key={s.label} className="flex items-center gap-2 text-[0.72rem]">
                {s.done ? (
                  <CheckCircle2 className="size-4 shrink-0 text-mint" aria-hidden="true" />
                ) : (
                  <Loader2 className="size-4 shrink-0 animate-spin text-primary" aria-hidden="true" />
                )}
                <span className={s.done ? "text-muted" : "font-semibold text-fg"}>{s.label}</span>
              </li>
            ))}
          </ol>
          <div className="mt-3 flex gap-1.5">
            <span className="rounded-md bg-mint px-2.5 py-1 text-[0.65rem] font-bold text-white">Approve plan</span>
            <span className="rounded-md border border-line bg-surface px-2.5 py-1 text-[0.65rem] font-semibold text-fg">Edit</span>
          </div>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-[0.65rem] text-subtle">
          <ShieldCheck className="size-3.5" aria-hidden="true" /> Agent actions follow your workspace permissions
        </p>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function BotMockup({ className }: { className?: string }) {
  return (
    <AppFrame label={`${site.name} Bot answering a question and suggesting next steps in a direct message`} className={className} title={`${site.name} Bot`}>
      <div className="flex h-12 items-center gap-2 border-b border-line px-4">
        <BotAvatar size="sm" />
        <p className="text-sm font-bold text-fg">{site.name} Bot</p>
        <span className="text-[0.65rem] text-subtle">Your AI teammate</span>
      </div>
      <div className="space-y-1 py-3">
        <Message who="amara" time="8:58">
          What do I need to know before my 9:30 with the Brightline team?
        </Message>
        <Message bot time="8:58">
          Here&apos;s your brief:
          <span className="mt-1.5 block space-y-1 rounded-xl border border-line bg-surface-2 p-2.5 text-[0.74rem]">
            <span className="flex gap-2">
              <Calendar className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              Renewal is due Nov 15; usage grew 34% this quarter.
            </span>
            <span className="flex gap-2">
              <AtSign className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              Leo asked about SSO for their new subsidiary yesterday.
            </span>
            <span className="flex gap-2">
              <FileText className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
              Latest proposal canvas was updated by Marcus at 6pm.
            </span>
          </span>
        </Message>
        <div className="flex flex-wrap gap-1.5 px-4 pt-1">
          {["Draft agenda", "Summarize last call", "Prep SSO answer"].map((c) => (
            <span key={c} className="rounded-full border border-primary/30 bg-primary-soft px-2.5 py-1 text-[0.68rem] font-semibold text-primary">
              {c}
            </span>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function ClipsMockup({ className }: { className?: string }) {
  return (
    <AppFrame label="A recorded video clip with a transcript and reactions in a channel" className={className} sidebar={<Sidebar channels={defaultSidebar} dms={false} />}>
      <ChannelHeader name="launch-fall" />
      <div className="p-4">
        <Message who="hana" time="5:30">
          Quick walkthrough of the new onboarding flow (2 min).
        </Message>
        <div className="mx-4 overflow-hidden rounded-xl border border-line">
          <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-[#051121] via-[#0d55c7] to-[#2588ff]">
            <div className="absolute inset-x-6 top-6 h-16 rounded-lg bg-white/15 backdrop-blur" />
            <div className="absolute right-6 bottom-12 left-6 grid grid-cols-3 gap-2">
              <div className="h-10 rounded-md bg-white/20" />
              <div className="h-10 rounded-md bg-white/20" />
              <div className="h-10 rounded-md bg-white/20" />
            </div>
            <span className="relative inline-flex size-12 items-center justify-center rounded-full bg-white text-deep shadow-lg">
              <Play className="ml-0.5 size-5" aria-hidden="true" />
            </span>
            <span className="absolute right-3 bottom-3 overflow-hidden rounded-full ring-2 ring-white">
              <Avatar who="hana" size="sm" className="rounded-full" />
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface-2 px-3 py-2 text-[0.68rem] text-muted">
            <Film className="size-3.5" aria-hidden="true" />
            <span className="h-1 flex-1 rounded-full bg-surface-3">
              <span className="block h-full w-1/3 rounded-full bg-primary" />
            </span>
            0:42 / 2:05
          </div>
          <p className="border-t border-line px-3 py-2 text-[0.7rem] text-muted">
            <Captions className="mr-1 inline size-3.5" aria-hidden="true" />
            “…and the new checklist appears right after the workspace is created.”
          </p>
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function FilesMockup({ className }: { className?: string }) {
  const files = [
    { name: "Brand guidelines.pdf", type: "PDF", icon: FileText, tone: "bg-coral/15 text-coral-ink" },
    { name: "Q4 forecast.xlsx", type: "Sheet", icon: Table2, tone: "bg-mint/15 text-mint-ink" },
    { name: "Hero concepts.png", type: "Image", icon: ImageIcon, tone: "bg-pink/15 text-pink-ink" },
    { name: "Keynote demo.mp4", type: "Video", icon: Film, tone: "bg-sky/15 text-sky-ink" },
  ];
  return (
    <AppFrame label="Files shared in a channel with previews and quick search" className={className} sidebar={<Sidebar channels={defaultSidebar} dms={false} />}>
      <ChannelHeader name="launch-fall">
        <span className="hidden rounded-md bg-surface-2 px-2 py-0.5 text-[0.65rem] font-semibold text-muted sm:inline">Files · 128</span>
      </ChannelHeader>
      <div className="grid grid-cols-2 gap-3 p-4">
        {files.map((f) => (
          <div key={f.name} className="overflow-hidden rounded-xl border border-line">
            <div className={cn("flex h-20 items-center justify-center", f.tone)}>
              <f.icon className="size-7" aria-hidden="true" />
            </div>
            <div className="p-2.5">
              <p className="truncate text-[0.72rem] font-semibold text-fg">{f.name}</p>
              <p className="text-[0.62rem] text-subtle">{f.type} · shared by Priya</p>
            </div>
          </div>
        ))}
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function AtlasMockup({ className }: { className?: string }) {
  return (
    <AppFrame label="An employee profile with role, team, reporting line and expertise" className={className} title={`${site.name} Atlas`}>
      <div className="grid gap-4 p-4 sm:grid-cols-[1fr_1.1fr]">
        <div className="rounded-xl border border-line p-4 text-center">
          <Avatar who="sofia" size="lg" className="mx-auto rounded-2xl" />
          <p className="mt-2 font-display text-base font-bold text-fg">Sofia Alvarez</p>
          <p className="text-[0.72rem] text-muted">Director, Customer Experience</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-[0.65rem] text-subtle">
            <Clock className="size-3" aria-hidden="true" /> Lisbon · 4:12 PM local
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-1">
            <Pill tone="violet">Escalations</Pill>
            <Pill tone="mint">Onboarding</Pill>
            <Pill tone="sky">Spanish</Pill>
          </div>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="text-[0.65rem] font-bold tracking-wider text-subtle uppercase">Reporting line</p>
          <div className="mt-2 flex flex-col items-center gap-1.5">
            <span className="flex items-center gap-2 rounded-lg bg-surface-2 px-2 py-1.5 text-[0.7rem] font-semibold text-fg">
              <Avatar who="leo" size="xs" className="rounded" /> Leo Brandt · VP
            </span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="flex items-center gap-2 rounded-lg bg-primary-soft px-2 py-1.5 text-[0.7rem] font-bold text-primary">
              <Avatar who="sofia" size="xs" className="rounded" /> Sofia Alvarez
            </span>
            <span className="h-3 w-px bg-line-strong" />
            <span className="flex gap-1.5">
              {(["diego", "hana", "jonah"] as const).map((k) => (
                <Avatar key={k} who={k} size="sm" className="rounded-full" />
              ))}
            </span>
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[0.65rem] text-muted">
            <Users className="size-3.5" aria-hidden="true" /> 3 direct reports · 24 in org
          </p>
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function ConnectMockup({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <AppFrame label="A shared channel connecting Northwind with an external partner, Brightline" sidebar={<Sidebar channels={[{ label: "northwind-brightline", active: true }, { label: "agency-studio-co" }, { label: "partners-emea", unread: true }]} dms={false} />}>
        <ChannelHeader name="northwind-brightline" members={31}>
          <span className="hidden items-center gap-1 rounded-md bg-mint/15 px-2 py-0.5 text-[0.62rem] font-bold text-mint-ink sm:inline-flex">
            <Globe className="size-3" aria-hidden="true" /> Shared · 2 orgs
          </span>
        </ChannelHeader>
        <div className="py-2">
          <Message who="leo" time="11:20">
            <span className="mr-1 rounded bg-sun/25 px-1 text-[0.6rem] font-bold text-sun-ink">Brightline</span>
            Redlines attached. Only section 4 changed.
          </Message>
          <Message who="amara" time="11:26">
            Approved on our side. Sending for signature now ✍️
          </Message>
          <Message who="leo" time="11:31">
            <span className="mr-1 rounded bg-sun/25 px-1 text-[0.6rem] font-bold text-sun-ink">Brightline</span>
            Signed! Kickoff huddle Monday?
            <span className="mt-1.5 flex gap-1">
              <Reaction emoji="🤝" count={7} active />
            </span>
          </Message>
        </div>
      </AppFrame>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function SecurityMockup({ className }: { className?: string }) {
  const controls = [
    { icon: KeyRound, label: "Enterprise Key Management", on: true },
    { icon: Lock, label: "SAML SSO + SCIM provisioning", on: true },
    { icon: Globe, label: "Data residency: EU (Frankfurt)", on: true },
    { icon: CircleDashed, label: "Retention: 7 years for #legal-*", on: true },
    { icon: Users, label: "External sharing requires approval", on: false },
  ];
  return (
    <AppFrame label="Admin security console with encryption, SSO, data residency and retention controls" className={className} title="Admin · Security">
      <div className="p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-xl bg-mint/15 text-mint-ink">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-fg">Security posture</p>
            <p className="text-[0.7rem] text-muted">All critical controls enabled</p>
          </div>
          <span className="ml-auto font-display text-2xl font-bold text-mint-ink">98</span>
        </div>
        <ul className="divide-y divide-line rounded-xl border border-line">
          {controls.map((c) => (
            <li key={c.label} className="flex items-center gap-3 px-3 py-2.5 text-[0.74rem]">
              <c.icon className="size-4 text-muted" aria-hidden="true" />
              <span className="flex-1 font-medium text-fg">{c.label}</span>
              <span className={cn("relative inline-flex h-4 w-7 items-center rounded-full", c.on ? "bg-mint" : "bg-surface-3")}>
                <span className={cn("inline-block size-3 rounded-full bg-white shadow", c.on ? "translate-x-3.5" : "translate-x-0.5")} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function PlatformMockup({ className }: { className?: string }) {
  const agents = [
    { name: "Service Agent", vendor: site.name, status: "Live", tone: "mint" as const },
    { name: "Recruiting Agent", vendor: "HireLoop", status: "Live", tone: "mint" as const },
    { name: "Finance Close Agent", vendor: "Custom", status: "Testing", tone: "sun" as const },
    { name: "IT Helpdesk Agent", vendor: "Custom", status: "Draft", tone: "muted" as const },
  ];
  return (
    <AppFrame label="Agent platform console listing agents from different vendors with status and guardrails" className={className} title="Agent platform">
      <div className="p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-bold text-fg">Agents in Northwind</p>
          <span className="rounded-full bg-primary px-2.5 py-1 text-[0.65rem] font-bold text-primary-fg">+ New agent</span>
        </div>
        <ul className="space-y-2">
          {agents.map((a) => (
            <li key={a.name} className="flex items-center gap-3 rounded-xl border border-line p-2.5">
              <BotAvatar size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.75rem] font-bold text-fg">{a.name}</span>
                <span className="block text-[0.65rem] text-muted">by {a.vendor}</span>
              </span>
              <Pill tone={a.tone}>{a.status}</Pill>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[0.65rem]">
          {[
            ["4,812", "tasks this week"],
            ["99.2%", "within guardrails"],
            ["31h", "time saved"],
          ].map(([v, l]) => (
            <span key={l} className="rounded-lg bg-surface-2 p-2">
              <span className="block font-display text-sm font-bold text-fg">{v}</span>
              <span className="text-muted">{l}</span>
            </span>
          ))}
        </div>
      </div>
    </AppFrame>
  );
}

/* ------------------------------------------------------------------ */
export function MessagingMockup({ className }: { className?: string }) {
  return (
    <AppFrame label="A threaded conversation with replies, mentions and emoji reactions" className={className} sidebar={<Sidebar channels={defaultSidebar} />}>
      <ChannelHeader name="design-crit" />
      <div className="py-2">
        <Message who="hana" time="2:02">
          Three directions for the onboarding illustrations. Vote with emoji!
          <span className="mt-1.5 flex gap-1">
            <Reaction emoji="1️⃣" count={3} />
            <Reaction emoji="2️⃣" count={8} active />
            <Reaction emoji="3️⃣" count={2} />
          </span>
          <span className="mt-1.5 flex items-center gap-1.5 text-[0.68rem] font-semibold text-sky-ink">
            <span className="flex -space-x-1">
              <Avatar who="priya" size="xs" className="rounded" />
              <Avatar who="jonah" size="xs" className="rounded" />
            </span>
            6 replies <ArrowRight className="size-3" aria-hidden="true" />
          </span>
        </Message>
        <Message who="priya" time="2:09">
          Option 2 feels most on-brand. <span className="rounded bg-sky/15 px-0.5 font-semibold text-sky-ink">@Hana</span> can we
          try it with the warmer palette?
        </Message>
      </div>
    </AppFrame>
  );
}
