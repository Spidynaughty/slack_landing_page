import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { ArticleSection, Person } from "./types";

export type PostCategory = "Product" | "News" | "Engineering" | "Design" | "Productivity" | "AI";

export type Post = {
  slug: string;
  title: string;
  /** Shorter title for search results when `title` is long (Google shows about 60 characters) */
  seoTitle?: string;
  excerpt: string;
  category: PostCategory;
  author: Person;
  tone: Tone;
  /** ISO date, e.g. "2026-10-02" */
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  featured?: boolean;
  sections: ArticleSection[];
};

export const posts: Post[] = [
  {
    slug: "ai-agents-generally-available",
    title: `${B} agents are now generally available for every paid plan`,
    excerpt: `After six months in beta with more than 4,000 teams, agents that work alongside people in channels are rolling out to every paid ${B} workspace starting today.`,
    category: "News",
    author: { name: "Priya Raman", role: "Chief Product Officer", initials: "PR" },
    tone: "violet",
    publishedAt: "2026-10-14",
    readMinutes: 6,
    tags: ["AI", "Agents", "Launch"],
    featured: true,
    sections: [
      {
        id: "what-is-launching",
        heading: "What is launching today",
        paragraphs: [
          `Starting today, every workspace on a paid ${B} plan can add agents to channels, direct messages and huddles. Agents can answer questions using the conversations and files your team already has access to, take action in connected apps, and hand work back to a person when judgment is needed. Admins can turn them on for the whole organization or pilot them with a handful of teams first.`,
          "We spent the beta listening more than shipping. Teams told us they did not want a chatbot in a corner of the screen; they wanted a colleague who shows up where the work already happens, follows the same permissions as everyone else, and leaves a clear trail of what it did. That feedback shaped almost every decision in the release you can use today.",
        ],
        bullets: [
          "Agents can be invited to any public or private channel, just like a teammate",
          "Every action an agent takes is logged with a link back to the request that triggered it",
          "Agents respect channel membership, so they only see what the person asking can see",
          "Twelve prebuilt agents for support, sales, IT and engineering, plus a no-code builder",
        ],
      },
      {
        id: "built-for-trust",
        heading: "Built on the permissions you already trust",
        paragraphs: [
          `The most common question during the beta was simple: what can the agent see? The answer is the same as for any member of your workspace. Agents inherit the access of the person who invoked them, and they cannot read a private channel or a direct message unless that person could. Enterprise admins can further restrict agents to approved channels and apps from the ${B} admin dashboard.`,
          "We also made the boring parts visible. Each agent has a profile that lists the apps it can reach, the data sources it uses for answers and the person who owns it. When an agent cites a message or a document, the citation opens the original in context, so you can check its work in one click rather than taking it on faith.",
        ],
        quote: "The agent did not replace anyone on our team. It replaced the forty tabs we used to keep open just to answer one customer question.",
      },
      {
        id: "beta-results",
        heading: "What beta teams saw",
        paragraphs: [
          "Across the beta cohort, teams that used agents in at least three channels reported answering internal questions 38 percent faster and spending roughly two fewer hours a week searching for information. Support teams saw the biggest change: agents drafted first replies for nearly half of incoming cases, and human reviewers approved most of those drafts with light edits.",
          "Not every experiment worked, and we think that matters too. Agents that tried to do everything performed worse than narrowly scoped ones, so the builder now nudges you toward a single clear job per agent. We also learned that people trust agents more when the agent admits uncertainty, which is why answers now include a confidence note when sources conflict.",
        ],
      },
      {
        id: "getting-started",
        heading: "How to get started",
        paragraphs: [
          "Workspace owners will see a new Agents section in workspace settings today, and the rollout will reach every paid workspace by the end of October. From there you can browse the prebuilt agents, set which teams can use them and connect the apps they should be able to act in. Most teams have their first agent answering questions in under fifteen minutes.",
          "If you want a guided start, our product tour walks through a full agent setup, and our customer success team is hosting weekly office hours through the end of the year. We cannot wait to see what your team builds, and we will keep sharing what we learn as more teams put agents to work.",
        ],
      },
    ],
  },
  {
    slug: "scaling-real-time-message-delivery",
    title: "How we deliver four billion messages a day without dropping one",
    excerpt:
      "A look inside the gateway, fan-out and ordering layers that keep messages arriving in under 200 milliseconds, even when a single channel has 250,000 members online.",
    category: "Engineering",
    author: { name: "Marcus Bell", role: "Staff Engineer, Real-time Infrastructure", initials: "MB" },
    tone: "sky",
    publishedAt: "2026-10-02",
    readMinutes: 9,
    tags: ["Infrastructure", "Real-time", "Distributed systems"],
    featured: true,
    sections: [
      {
        id: "the-problem",
        heading: "The shape of the problem",
        paragraphs: [
          `Every message sent in ${B} has to reach every connected client of every member in that channel, in order, and fast enough that a conversation feels live. On a normal weekday that is about four billion messages, which turn into more than 900 billion individual deliveries once you account for fan-out across devices. Our target is a p99 send-to-render latency under 200 milliseconds for clients on a healthy network.`,
          "The hard part is not the average channel, which has a few dozen members. It is the long tail: company-wide announcement channels with a quarter of a million members, incident channels where hundreds of engineers join within a minute, and huddles that generate presence updates many times per second. A design that works for the median channel falls over at the edges, so we design for the edges first.",
        ],
      },
      {
        id: "gateways-and-channel-servers",
        heading: "Gateways, channel servers and consistent hashing",
        paragraphs: [
          "Clients hold a single long-lived WebSocket connection to a gateway server in the nearest region. Gateways are deliberately thin: they authenticate the connection, track which channels each client is subscribed to and forward traffic. All channel state lives in a separate tier of channel servers, and each channel is owned by exactly one channel server at a time, chosen by consistent hashing on the channel ID.",
          "Single ownership gives us ordering for free, because one process assigns sequence numbers to every message in a channel. When a channel server fails, its channels are reassigned to the next node on the hash ring within about two seconds, and clients replay any gap using the last sequence number they saw. That replay path is exercised constantly in production, so it is not a rarely tested emergency mechanism.",
          "We run hash rings per region with virtual nodes to keep load even, and we rebalance hot channels proactively. If a channel crosses a fan-out threshold, it is moved to a dedicated pool of larger channel servers before it can starve its neighbors. The move uses the same handoff protocol as failover, so clients see at most a brief pause rather than an error.",
        ],
        bullets: [
          "Gateways: stateless aside from subscriptions, scaled on connection count",
          "Channel servers: single owner per channel, scaled on message throughput",
          "Sequence numbers: assigned per channel, used for ordering and gap replay",
          "Hot channel pool: isolates the largest channels from everyone else",
        ],
      },
      {
        id: "fan-out",
        heading: "Making fan-out cheap",
        paragraphs: [
          "Naive fan-out sends one copy of a message to every subscribed connection. For a 250,000-member channel that means 250,000 network writes from one process, which is both slow and fragile. Instead, channel servers publish once to each gateway that has at least one subscriber, and gateways handle the final hop to their local connections. A large channel typically touches a few hundred gateways, not hundreds of thousands of sockets.",
          "We also separate message traffic from ephemeral traffic. Typing indicators and presence changes are coalesced into 250-millisecond batches and dropped entirely under backpressure, because nobody needs to know that someone was typing five seconds ago. Messages, edits and reactions are never dropped; they are queued with per-connection limits and the client is asked to resync if it falls too far behind.",
        ],
        quote: "Design for the biggest channel in the company, and the average channel takes care of itself.",
      },
      {
        id: "measuring-latency",
        heading: "Measuring what users actually feel",
        paragraphs: [
          "Server-side metrics told us we were fast long before users agreed. The gap was everything after the socket: JSON parsing on low-end phones, render work on the main thread and reconnect storms after a laptop woke from sleep. We now instrument send-to-render latency on clients, sample it at one percent of messages and join it with server traces using the message ID.",
          "That end-to-end view changed our priorities. Moving message decoding off the main thread on mobile cut p99 latency by 70 milliseconds, more than any server optimization we shipped that year. Jittered reconnect backoff, combined with gateways that accept resumption tokens, eliminated the thundering-herd spikes we used to see at 9 a.m. in every time zone.",
        ],
      },
      {
        id: "whats-next",
        heading: "What comes next",
        paragraphs: [
          "Our next project is moving channel ownership closer to where members actually are. Today a channel lives in its home region, so a team split between Singapore and Frankfurt always has someone paying a cross-continent round trip. We are prototyping leader handoff based on where active senders are, with careful fencing so sequence numbers never fork.",
          "If problems like these sound fun, our real-time infrastructure team is hiring. We will share more about regional ownership once it has survived a few months of production traffic, including the parts that did not work the first time. Until then, the short version is this: measure from the user's screen, isolate your biggest tenants and make the recovery path the normal path.",
        ],
      },
    ],
  },
  {
    slug: "list-automations",
    title: "Lists that run themselves: automations arrive in every list",
    excerpt: `Lists in ${B} can now update fields, assign owners, post to channels and nudge people when work stalls, using simple rules anyone on the team can write in plain language.`,
    category: "Product",
    author: { name: "Priya Raman", role: "Chief Product Officer", initials: "PR" },
    tone: "sun",
    publishedAt: "2026-09-24",
    readMinutes: 6,
    tags: ["Lists", "Workflows", "Launch"],
    sections: [
      {
        id: "the-busywork-around-the-work",
        heading: "The busywork around the work",
        paragraphs: [
          `Since we introduced lists last year, teams have created more than 1.3 million of them in ${B}, tracking everything from product launches and hiring pipelines to equipment requests and customer escalations. Lists worked because they lived next to the conversation: you could turn a message into an item, discuss it in a thread and see its status without leaving the channel. But as lists grew, so did the chores that kept them accurate.`,
          "When we sat with list owners, we kept seeing the same pattern. Someone would spend the first hour of their Monday moving items between statuses, reminding owners about due dates and copying updates into a channel so leadership could follow along. In our research panel, the average owner of an active list spent close to three hours a week on that upkeep, and most of them described it as the least favorite part of their job.",
          "Automations are our answer. They take the repetitive, predictable parts of keeping a list current and hand them to the list itself, so the people on the team can spend their time on the work the list is tracking rather than on the list.",
        ],
      },
      {
        id: "when-this-happens",
        heading: "When this happens, do that",
        paragraphs: [
          "Every automation follows the same shape: a trigger, optional conditions and one or more actions. You build them from a panel inside the list, and as you go, a plain-language preview reads the rule back to you, such as when priority changes to urgent and no owner is set, assign the on-call lead and post in the incidents channel. If the sentence reads correctly, the automation will behave correctly.",
          "You can also describe what you want in your own words and let the builder draft the rule for you. The draft is always shown as a normal, editable automation before it is saved, so nothing runs that you have not read. In testing, about two thirds of new automations started from a written description, and most needed only a small tweak before they were ready.",
        ],
        bullets: [
          "Triggers: an item is added, a field changes, a due date approaches or passes, or a scheduled time arrives",
          "Conditions: filter on any field, including people, status, priority and custom fields",
          "Actions: update fields, assign people, create a linked item, post to a channel or send a reminder",
          "Workflow handoff: start any existing workflow, including steps in connected apps",
        ],
      },
      {
        id: "guardrails",
        heading: "Guardrails that keep automations predictable",
        paragraphs: [
          "An automation that surprises people is worse than no automation at all, so predictability shaped most of the design. Every change an automation makes is labeled in the item history with the rule that made it and a link back to that rule. If a teammate wonders why an item moved, the answer is one click away, along with the name of the person who created the automation.",
          "We also built in protections against the classic failure modes. The builder detects rules that would trigger each other in a loop and refuses to save them, and every list has a run history that shows what fired, when and what changed. Automations act with the permissions of the list rather than the person who wrote them, so a rule can never post to a channel or touch an item that the list itself cannot reach.",
        ],
        quote:
          "We used to have one person whose whole Monday was keeping the tracker honest. Now the tracker keeps itself honest, and she runs the planning meeting instead.",
      },
      {
        id: "what-teams-built",
        heading: "What early teams built",
        paragraphs: [
          "More than 2,000 teams used automations during a six-week preview, and the most popular rules were refreshingly ordinary. Reminders before due dates topped the chart, followed closely by assigning owners based on a category field and posting a daily digest of overdue items into a team channel. Teams that set up at least three automations reported saving an average of 2.4 hours per list owner each week.",
          "Some teams went further. The dispatch team at Orbital Freight built a list that routes delayed shipments to the right regional lead and opens a thread with the driver's latest update, cutting their response time to late loads by more than half. A procurement group at Halcyon Health uses a pair of automations to request approval for any order above a spending threshold and to close the item automatically once a manager signs off.",
          "Across the preview, lists with automations had 31 percent fewer stale items, meaning items nobody had touched in two weeks. That number mattered more to us than time saved, because a list people can trust is a list people actually use.",
        ],
      },
      {
        id: "availability",
        heading: "Availability and what comes next",
        paragraphs: [
          `Automations are rolling out today to every paid ${B} plan, with higher monthly run limits on Business+ and Enterprise. Admins can see every automation in their workspace from a single page, pause any rule and restrict who can create automations that post outside a list's home channel. List templates in the gallery now include starter automations you can switch on with one click.`,
          "Next, we are connecting automations to agents, so a rule can ask an agent to draft a status summary, categorize incoming requests or suggest an owner, with a person approving anything that matters. We are also working on automations that span several lists at once, a top request from operations teams who run related trackers side by side. As always, tell us what you build, because the best ideas in this release came from customers.",
        ],
      },
    ],
  },
  {
    slug: "inside-our-design-system",
    title: "Prism 3: rebuilding our design system around tokens, not components",
    excerpt:
      "Our third design system rewrite started from a single question: what if every color, space and motion value had exactly one source of truth across five platforms?",
    category: "Design",
    author: { name: "Ines Okafor", role: "Design Systems Lead", initials: "IO" },
    tone: "pink",
    publishedAt: "2026-09-18",
    readMinutes: 7,
    tags: ["Design systems", "Tokens", "Accessibility"],
    sections: [
      {
        id: "why-rebuild",
        heading: "Why we rebuilt again",
        paragraphs: [
          `Prism 2 served us well for three years, but it was built around components, and components drift. The web, desktop, phone and tablet teams each implemented their own button, and each made slightly different choices about padding, focus rings and pressed states. By early 2025 we had eleven shades of our brand purple in production, and nobody could say which one was correct.`,
          "We did not need more components. We needed a shared vocabulary underneath them, one that designers and engineers on every platform could point to when they disagreed. That vocabulary became our token layer, and it is now the foundation of everything Prism 3 ships. Components still matter, but they are now thin, replaceable expressions of decisions made once, in one place.",
        ],
      },
      {
        id: "three-tiers",
        heading: "Three tiers of tokens",
        paragraphs: [
          "Prism 3 organizes tokens in three tiers. Primitive tokens are raw values, like a specific purple or a four-pixel spacing step, and they are never used directly in product code. Semantic tokens describe intent, such as surface-raised, text-subtle or border-focus, and map to primitives differently in light mode, dark mode and high contrast. Component tokens are the thin final layer that lets a single component make a deliberate exception.",
          "The rule that made this work is simple: product code may only reference semantic or component tokens. When we introduced dark mode for the desktop app, we changed about two hundred mappings and touched zero lines of product code. The high-contrast theme that followed took a single designer three weeks instead of a quarter.",
        ],
        bullets: [
          "Primitive: raw values such as violet-600 or space-4",
          "Semantic: intent such as surface-raised, text-subtle or border-focus",
          "Component: narrow overrides such as button-primary-bg-pressed",
          "One JSON source compiles to CSS variables, Swift, Kotlin and our desktop theme format",
        ],
      },
      {
        id: "accessibility-by-default",
        heading: "Accessibility by default, not by review",
        paragraphs: [
          "Every semantic color pair in Prism 3 is checked against contrast requirements at build time. If a designer proposes a new text-on-surface combination that falls below 4.5 to 1, the token pipeline fails and explains why, before anything reaches a pull request. Focus styles are tokens too, so a visible, consistent focus ring is the default on every interactive element rather than something each team remembers to add.",
          "We also made motion a token. Every animation duration and easing curve comes from a small set of values, and each one has a reduced-motion counterpart that the platform swaps in automatically. People who are sensitive to motion get a calmer interface everywhere, and we never have to audit individual animations to make that happen.",
        ],
        quote: "The best accessibility review is the one that never has to happen because the system made the right choice first.",
      },
      {
        id: "adoption",
        heading: "Getting five platforms to adopt it",
        paragraphs: [
          "A design system only matters if teams use it. We migrated in small slices, starting with the message composer because it appears on every platform and touches nearly every token category. Each migration shipped behind a flag, and we compared screenshots across hundreds of states automatically to catch unintended changes before customers did.",
          "Eighteen months in, 94 percent of color and spacing values in our product code come from Prism tokens, up from roughly a third. The remaining six percent are documented exceptions with owners and expiry dates. We are now opening up the token pipeline to our app developer platform, so apps that build on top of us can match our themes without guessing.",
        ],
      },
    ],
  },
  {
    slug: "designing-agent-approvals",
    title: "Ask first: designing approvals that make agents worth trusting",
    excerpt:
      "Agents are only useful if people let them act. Here is how we designed approval moments that are quick enough to keep work moving and clear enough that nobody signs off on something they do not understand.",
    category: "AI",
    author: { name: "Hana Mori", role: "Group Product Manager, AI", initials: "HM" },
    tone: "violet",
    publishedAt: "2026-09-10",
    readMinutes: 7,
    tags: ["AI", "Agents", "Product design"],
    sections: [
      {
        id: "two-ways-to-get-it-wrong",
        heading: "Two ways to get approvals wrong",
        paragraphs: [
          "Early in the agents beta, we tried both extremes. Our first prototype asked for permission before nearly every step, including looking up a customer record or opening a document. Within a week, testers were approving requests in under two seconds without reading them, which meant the approvals were protecting nobody. They had become a speed bump that trained people to click through.",
          "The opposite extreme failed faster. A version that acted freely and reported afterward was efficient right up until it updated a shared forecast with numbers from the wrong quarter. Nothing was lost, since every change could be undone, but the team stopped using the agent for a month. Trust that takes weeks to build can disappear in a single afternoon.",
          "The lesson was that approvals are not a safety feature you bolt on at the end. They are the main interface between a person and an agent, and they deserve the same design attention as anything else in the product.",
        ],
      },
      {
        id: "matching-the-ask-to-the-stakes",
        heading: "Matching the ask to the stakes",
        paragraphs: [
          "We now sort every action an agent can take into three tiers based on two questions: can it be undone, and does it reach anyone outside the conversation? Reading and drafting sit in the lowest tier and happen without interruption. Changes that are reversible and internal happen right away, with a short note in the thread and an undo button. Anything irreversible, or anything that reaches customers, partners or a system of record, waits for a person.",
          "Builders choose the tier for each action when they connect an app, and admins can raise the tier for any action across the workspace. Nobody can lower it below the default for actions we classify as irreversible, such as sending an external email or issuing a refund. That floor gave security teams the confidence to approve agents for much broader pilots.",
        ],
        bullets: [
          "Act freely: search, read, summarize and draft, with citations for every source",
          "Act, then tell: reversible internal changes, posted with a one-click undo for 24 hours",
          "Ask first: irreversible or external actions, which wait for an explicit approval",
          "Admin policies can raise any tier, but never lower the floor for irreversible actions",
        ],
      },
      {
        id: "anatomy-of-an-approval",
        heading: "Anatomy of a good approval request",
        paragraphs: [
          "Every approval request answers four questions in the same order: what the agent wants to do, why it thinks this is the right step, exactly what will change and who will be affected. The change is shown as a preview rather than a description, so a record update appears as a before and after view and a message to a customer appears in full, exactly as it will be sent. If a person would have to open another tab to understand the request, we consider the request unfinished.",
          "People can approve, decline or edit, and editing turned out to be the most important option. When testers could adjust a drafted reply or change one field before approving, they declined far less often and kept using the agent for harder tasks. Each edit also becomes feedback the agent's owner can review, which helps narrow the agent's job over time.",
        ],
        quote: "An approval should take five seconds to read and leave you feeling more in control, not less.",
      },
      {
        id: "measuring-trust",
        heading: "Measuring whether approvals actually work",
        paragraphs: [
          "Approval rate alone tells you very little. A 99 percent approval rate could mean the agent is excellent or that people have stopped reading. So we track a small set of signals together: how long people spend on high-stakes requests, how often they edit before approving and how often an approved action is later reversed. A pattern of very fast approvals on irreversible actions triggers a gentle prompt to review the agent's settings.",
          "We also test attention directly in our research studies. Participants receive a mix of genuine requests and deliberately flawed ones, such as a refund for the wrong amount or an email addressed to the wrong customer. With our first design, participants caught 61 percent of the flawed requests. After moving to previews, consistent layouts and tiered asks, they caught 89 percent, while spending less total time on approvals.",
        ],
      },
      {
        id: "whats-next",
        heading: "What comes next",
        paragraphs: [
          "When agents reach general availability later this fall, every agent will use this approval model by default. We are also working on delegated approvals, so a team can name a reviewer for a category of actions, and on batch approvals for agents that prepare many similar changes at once, like updating renewal dates across a set of accounts.",
          "The broader goal is simple. People should always know what an agent did, why it did it and how to undo it, and they should only be interrupted when their judgment genuinely matters. If you are in the beta, we would love to hear where approvals still feel like a speed bump, because that feedback is how we got this far.",
        ],
      },
    ],
  },
  {
    slug: "accessibility-conformance-wcag-2-2",
    title: `${B} achieves WCAG 2.2 AA conformance across web, desktop and mobile`,
    excerpt: `An independent audit by Northlight Accessibility Lab confirmed that ${B} meets WCAG 2.2 Level AA on every platform we support, a milestone two years in the making.`,
    category: "News",
    author: { name: "Theo Lindqvist", role: "Head of Accessibility", initials: "TL" },
    tone: "mint",
    publishedAt: "2026-09-03",
    readMinutes: 5,
    tags: ["Accessibility", "Compliance", "Inclusive design"],
    sections: [
      {
        id: "the-milestone",
        heading: "The milestone",
        paragraphs: [
          `We are proud to share that ${B} now conforms to WCAG 2.2 Level AA on the web, in our desktop apps for every major operating system, and in our phone and tablet apps. The conformance was verified through a five-month independent audit by Northlight Accessibility Lab, which tested more than 1,200 user flows with screen readers, voice control, switch access and keyboard-only navigation. Auditors worked alongside testers who use assistive technology every day, so the results reflect real use rather than automated scans alone.`,
          "Our updated Accessibility Conformance Reports are available today from our trust center. Public sector and enterprise customers can use them directly in procurement reviews, and we will publish refreshed reports after every major release from now on. For many of our customers, that documentation is the difference between a six-month security and accessibility review and a six-week one.",
        ],
      },
      {
        id: "what-changed",
        heading: "What changed along the way",
        paragraphs: [
          "Conformance is a floor, not a finish line, and getting there forced real changes to how people use the product every day. Some of them are small, like larger touch targets in mobile message actions. Others reshaped core experiences, like a rebuilt message list that screen readers can navigate by message, thread or day without getting lost in a stream of updates.",
          "We worked with a council of 30 customers who rely on assistive technology to prioritize the work. Their feedback pushed us to go beyond the checklist in several places where the guidelines allow a technically compliant but frustrating experience. Council members tested every major change before release, and several of their suggestions now ship as defaults for everyone.",
        ],
        bullets: [
          "Keyboard shortcuts for every action in a message, with a discoverable shortcut sheet",
          "Live region announcements that summarize new activity instead of reading every message",
          "Huddle captions with speaker labels, available on all paid plans",
          "A high-contrast theme and support for system text sizes up to 200 percent",
        ],
      },
      {
        id: "how-we-keep-it",
        heading: "How we keep it that way",
        paragraphs: [
          "The hardest part of accessibility is not reaching a standard but staying there while dozens of teams ship every week. Automated checks now run on every pull request, and our design system blocks color combinations that fail contrast before they reach code. Every product team has a trained accessibility champion who reviews new flows with assistive technology before launch.",
          "We also changed how we measure success. Accessibility bugs are now tracked with the same severity levels and response targets as security issues, and they appear on the same executive dashboard. That visibility has done more to keep regressions out than any single tool.",
        ],
        quote: "For the first time, I can follow a fast-moving incident channel with my screen reader and actually keep up.",
      },
      {
        id: "whats-next",
        heading: "What comes next",
        paragraphs: [
          "Our next focus is cognitive accessibility, an area where the guidelines are still evolving. We are testing simplified layouts, clearer notification language and AI recaps tuned for people who find long threads overwhelming. We expect to share early results at our annual conference this fall.",
          "If you rely on assistive technology and want to help shape what we build, we would love to hear from you. You can join our accessibility research panel from the help center, and every participant gets early access to new features as they ship. Sessions are paid, remote and scheduled around your availability.",
        ],
      },
    ],
  },
  {
    slug: "designing-ai-recaps",
    title: "Recaps that read like a teammate wrote them",
    excerpt:
      "How we taught AI recaps to lead with decisions, flag open questions and know when a channel has nothing worth summarizing.",
    category: "AI",
    author: { name: "Hana Mori", role: "Group Product Manager, AI", initials: "HM" },
    tone: "sun",
    publishedAt: "2026-08-20",
    readMinutes: 6,
    tags: ["AI", "Recaps", "Product design"],
    sections: [
      {
        id: "the-first-version",
        heading: "The first version summarized everything",
        paragraphs: [
          "Our first internal prototype of channel recaps was technically impressive and practically useless. It faithfully condensed every message into a tidy paragraph, which meant a recap of a busy channel was still a wall of text. People skimmed it, missed the one decision that mattered and went back to scrolling.",
          "When we interviewed early testers, the pattern was clear. Nobody wanted a shorter version of the conversation. They wanted the answer to a different question: what changed while I was away, and what do I need to do about it? That reframing turned a summarization problem into a prioritization problem, and it changed how we built everything that followed.",
        ],
      },
      {
        id: "decisions-first",
        heading: "Decisions first, then open questions",
        paragraphs: [
          "Every recap now follows the same structure. It starts with decisions that were made, then lists open questions that are still waiting on someone, and only then summarizes the rest of the discussion. Each item links to the message where it happened, so you can jump into context instead of trusting a paraphrase.",
          "We tuned the model to recognize decision language across very different team cultures. An engineering team might say ship it, while a legal team writes approved with the redlines in the attached version. Both are decisions, and the recap should treat them that way.",
        ],
        bullets: [
          "Decisions: what was agreed, by whom, with a link to the source message",
          "Open questions: unanswered asks, with the person who is likely waiting",
          "Mentions of you: anything that names you or a group you belong to",
          "Everything else: a short summary, collapsed by default",
        ],
      },
      {
        id: "knowing-when-to-stay-quiet",
        heading: "Knowing when to stay quiet",
        paragraphs: [
          "One of the most important features of recaps is one you rarely see. If a channel only had a few social messages or automated alerts that nobody responded to, the recap says so in a single line instead of inventing significance. Testers trusted recaps far more once they learned that a short recap really meant nothing important happened.",
          "We measure this directly. Our evaluation set includes hundreds of deliberately quiet channels, and a recap that pads them out counts as a failure even if every sentence is accurate. That metric caught more regressions during development than any measure of summary quality.",
        ],
        quote: "A good recap is not the shortest summary. It is the one that tells you exactly what you would have regretted missing.",
      },
      {
        id: "privacy",
        heading: "Private by design",
        paragraphs: [
          `Recaps are generated only from conversations you already have access to, and they are never shared with anyone else. Your messages are not used to train models, and recaps are processed within ${B} infrastructure under the same data residency settings as the rest of your workspace. Admins can turn recaps on or off per channel, and members can opt out of channels individually.`,
          "Today, recaps are available in channels, threads and huddles on every paid plan. Next, we are working on weekly recaps that span all of your channels, ranked by what matters to your role. We will share more once it is ready for a wider beta.",
        ],
      },
    ],
  },
  {
    slug: "shared-channels-at-scale",
    title: "Shared channels at scale: new tools for organizations with hundreds of partners",
    seoTitle: "Shared channels at scale: tools for hundreds of partners",
    excerpt: `The average enterprise on ${B} now works with more than 140 outside organizations in shared channels. A new connections hub, verified organizations and per-partner policies make that scale manageable.`,
    category: "Product",
    author: { name: "Rachel Kim", role: "SVP, Partnerships", initials: "RK" },
    tone: "mint",
    publishedAt: "2026-08-12",
    readMinutes: 6,
    tags: ["Shared channels", "Enterprise", "Partnerships"],
    sections: [
      {
        id: "from-one-partner-to-hundreds",
        heading: "From one partner to hundreds",
        paragraphs: [
          `Shared channels began with a modest goal: let two companies work in the same channel instead of trading long email chains. Customers took that idea much further than we expected. Today more than 60,000 organizations are connected through ${B}, and the average enterprise customer works with over 140 outside organizations in shared channels, from agencies and suppliers to law firms and joint venture partners.`,
          "That growth brought a new kind of problem. Admins told us they could no longer answer basic questions, like which partners had access to which channels or which connections had gone quiet months ago. Members, meanwhile, sometimes could not tell at a glance whether the person replying to them worked at their own company or somewhere else. Tools that felt fine at ten connections broke down at a few hundred.",
        ],
      },
      {
        id: "connections-hub",
        heading: "One place to manage every connection",
        paragraphs: [
          "The new connections hub gives admins a single view of every external organization their workspace works with. Each connection has its own page listing the shared channels, the people involved on both sides, recent activity and the policies that apply. Connections that have been inactive for 90 days are flagged for review, and admins can disconnect a partner from every channel at once when a project ends.",
          "Connection requests also got smarter. Admins can preapprove trusted partners so that new shared channels with them are created instantly, while requests from unfamiliar organizations route to a review queue with context about who is asking and why. During the pilot, enterprise admins cleared their connection backlogs in days instead of weeks.",
        ],
        bullets: [
          "A directory of every connected organization, with channels, members and recent activity",
          "Preapproved partners for instant channel creation, plus a review queue for new requests",
          "Per-connection policies for file sharing, huddles, apps and agents",
          "Inactive connection alerts and one-click disconnection across every shared channel",
        ],
      },
      {
        id: "trust-across-boundaries",
        heading: "Trust across company boundaries",
        paragraphs: [
          `Members now see a verified badge for organizations that have confirmed their domain with ${B}, and external participants carry a clear label on every message, profile and mention. Before you share a file in a shared channel, you see which organizations will be able to open it. These details are small, but in our research they were the biggest factor in whether people felt comfortable working in the open with partners.`,
          "Each organization's own policies still apply to its own data. Retention, legal holds and data residency follow the settings of the organization that created the content, including for customers in sovereign regions. Agents and apps in shared channels can only use information that both sides allow, and an organization can block external agents from its shared channels entirely.",
        ],
        quote:
          "We work with 300 clients in shared channels. For the first time, I can see all of them on one screen and know exactly who has access to what.",
      },
      {
        id: "what-customers-taught-us",
        heading: "What our customers taught us",
        paragraphs: [
          "Some of the most creative uses came from organizations that treat shared channels as their main way of working with clients. Alder & Finch, a consulting firm, runs a shared channel for every client engagement and uses channel templates so each one starts with the same canvas, lists and workflows. Their onboarding time for a new client dropped from two weeks to three days.",
          "Supply chains have embraced shared channels too. Corvid Logistics connects warehouses, carriers and retail customers in shared channels organized by region, so a delay at one dock reaches every affected party in minutes. Customers like them pushed us to support larger multi-organization channels, which can now include up to 250 organizations, and to make it obvious which company each participant belongs to.",
        ],
      },
      {
        id: "availability",
        heading: "Availability",
        paragraphs: [
          `The connections hub and verified organizations are available today for all ${B} Business+ and Enterprise customers, and external labels and file sharing previews are rolling out to every plan. Per-connection policies for agents will arrive alongside the general availability of agents later this year.`,
          "If your organization works with dozens of partners in shared channels, your account team can walk you through a connection review and help you set up preapproved partners. We will keep investing here, because the work that matters most rarely stays inside one company.",
        ],
      },
    ],
  },
  {
    slug: "rebuilding-search-indexing",
    title: "Rebuilding search: from nightly batches to sub-second indexing",
    excerpt:
      "We replaced a batch indexing pipeline with a streaming one, so messages become searchable in under a second while query latency dropped by 60 percent.",
    category: "Engineering",
    author: { name: "Daniel Ortiz", role: "Principal Engineer, Search", initials: "DO" },
    tone: "coral",
    publishedAt: "2026-07-29",
    readMinutes: 8,
    tags: ["Search", "Infrastructure", "Indexing"],
    sections: [
      {
        id: "where-we-started",
        heading: "Where we started",
        paragraphs: [
          "For years, search ran on two paths. Recent messages lived in a small real-time index that was rebuilt every few minutes, while everything older was indexed in large nightly batches. The design was simple, but it created confusing gaps: a message from this morning might show up in search, then disappear for an hour while batches caught up, then reappear with different ranking.",
          "The batch jobs were also getting expensive. Our largest customers have more than ten billion messages, and re-indexing a single enterprise workspace after a schema change could take a weekend. Every improvement to ranking or tokenization required a rebuild, which meant we shipped search improvements far less often than we wanted to.",
        ],
      },
      {
        id: "streaming-pipeline",
        heading: "A single streaming pipeline",
        paragraphs: [
          "The new pipeline consumes the same durable message log that powers real-time delivery. Indexers read from partitioned log streams, tokenize and enrich each message, then write to per-workspace index shards. Edits and deletions flow through the same path, so a deleted message disappears from search as quickly as it disappears from the channel.",
          "We size shards by message volume rather than by workspace, so a small team shares a shard with others while a large enterprise is split across dozens. Each shard keeps a short in-memory segment for the newest documents and periodically merges into immutable segments on disk. The median time from send to searchable is now 420 milliseconds, and p99 is under two seconds.",
        ],
        bullets: [
          "Indexers consume the durable message log, partitioned by workspace",
          "Edits, deletes and permission changes use the same ordered stream",
          "Shards are sized by volume, from shared small shards to dedicated large ones",
          "Fresh in-memory segments merge into immutable on-disk segments",
        ],
      },
      {
        id: "permissions-at-query-time",
        heading: "Permissions at query time",
        paragraphs: [
          "Search results have to respect channel membership at the moment you search, not the moment a message was indexed. Storing a list of allowed users on every document would make membership changes impossibly expensive, so we store only the channel ID. At query time, we fetch the channels you can access from a cached membership service and apply them as a filter inside the index.",
          "For people who belong to thousands of channels, that filter can get large. We encode membership as a compressed bitmap per shard, which keeps the filter small and lets the search engine skip whole blocks of documents that you could never see. That one change accounted for most of our 60 percent drop in p95 query latency.",
        ],
        quote: "The fastest query is the one that never has to look at a document you are not allowed to see.",
      },
      {
        id: "ranking",
        heading: "Better ranking, shipped weekly",
        paragraphs: [
          "Because the index is no longer rebuilt from scratch, ranking features can be added incrementally. We now combine text relevance with signals like how recently you interacted with a channel, whether a message has reactions or replies, and whether it contains a file or a decision. Semantic retrieval runs alongside keyword search, and the results are blended before they reach you.",
          "We evaluate every ranking change against a set of anonymized, consented queries with known good answers, and we run online experiments before rolling anything out. Search improvements that used to ship once a quarter now ship most weeks, and the share of searches that end with a click on the first result has risen from 41 to 58 percent.",
        ],
      },
    ],
  },
  {
    slug: "meridian-cloud-partnership",
    title: `${B} and Meridian Cloud partner to bring AI-powered collaboration to regulated industries`,
    seoTitle: `${B} and Meridian Cloud partner for regulated industries`,
    excerpt: `A new partnership brings ${B} to Meridian Cloud's sovereign regions, with dedicated data residency and compliance tooling for financial services, healthcare and the public sector.`,
    category: "News",
    author: { name: "Rachel Kim", role: "SVP, Partnerships", initials: "RK" },
    tone: "violet",
    publishedAt: "2026-07-08",
    readMinutes: 4,
    tags: ["Partnerships", "Compliance", "Enterprise"],
    sections: [
      {
        id: "the-announcement",
        heading: "The announcement",
        paragraphs: [
          `Today we are announcing a multiyear partnership with Meridian Cloud to make ${B} available in Meridian's sovereign cloud regions across Europe, Canada and Australia. Customers in regulated industries will be able to run their ${B} workspace, including AI features and agents, entirely within their chosen jurisdiction. It is the most significant expansion of our data residency program since we launched it.`,
          "The partnership has been in pilot with eight financial institutions and two national health agencies since the start of the year. General availability begins in the fourth quarter, starting with regions in Frankfurt, Toronto and Sydney. Pilot customers will migrate to the generally available service with no downtime and no action required from their admins.",
        ],
      },
      {
        id: "what-customers-get",
        heading: "What customers get",
        paragraphs: [
          "Regulated organizations have often had to choose between modern collaboration and meeting their compliance obligations. This partnership is designed to remove that trade-off. Data, backups, search indexes and AI processing stay inside the customer's selected region, and encryption keys can be held in a customer-managed key service.",
          `Meridian will also offer ${B} through its marketplace, so customers can apply existing cloud commitments to their subscription and simplify procurement. Joint support teams will handle escalations across both platforms with a single point of contact. Compliance documentation, including shared responsibility matrices, will be published for each region at launch.`,
        ],
        bullets: [
          "In-region storage and AI processing for messages, files and search indexes",
          "Customer-managed encryption keys with full audit logs",
          "Prebuilt retention and legal hold policies for financial and health regulations",
          "Marketplace purchasing that counts toward existing cloud commitments",
        ],
      },
      {
        id: "what-partners-said",
        heading: "Why it matters",
        paragraphs: [
          "Teams in banking, insurance and healthcare move as fast as anyone else, but they carry heavier obligations around where data lives and who can access it. Too often, those obligations have meant waiting years for features that other teams take for granted. Giving them the same AI-powered tools as everyone else, without compromise, is a big part of why we pursued this partnership.",
          "Meridian's leadership described the goal as making compliance invisible to the people doing the work. We agree, and we think regulated teams deserve software that feels as fast and friendly as anything else they use. During the pilot, one health agency moved its clinical operations teams off three legacy tools in a single quarter.",
        ],
        quote: "Our clinicians should not have to think about data residency when they ask a colleague a question. Now they do not have to.",
      },
      {
        id: "availability",
        heading: "Availability",
        paragraphs: [
          `Enterprise customers can join the early access program today through their account team. Pricing will match standard ${B} Enterprise plans, with sovereign region hosting available as an add-on. More regions, including Tokyo and Zurich, are planned for 2027.`,
          "We will host a live session with Meridian's solutions architects later this year for teams evaluating the offering. Watch our events page for dates, or reach out to your account team to schedule a private briefing. Existing Enterprise customers can also request a migration assessment at no cost.",
        ],
      },
    ],
  },
  {
    slug: "protecting-focus-time",
    title: "The two-hour block: what 1,400 people taught us about protecting focus",
    excerpt:
      "Our latest Future of Work Lab study found that the people having their best workdays were not the ones with the emptiest calendars, but the ones whose focus time came in long, predictable blocks.",
    category: "Productivity",
    author: { name: "Jordan Blake", role: "Principal Researcher, Future of Work Lab", initials: "JB" },
    tone: "sky",
    publishedAt: "2026-06-24",
    readMinutes: 7,
    tags: ["Async work", "Research", "Focus time"],
    sections: [
      {
        id: "the-study",
        heading: "How we ran the study",
        paragraphs: [
          "After our spring study on recurring meetings, the most common question we heard was what people actually do with the time they get back. To find out, our Future of Work Lab recruited 1,400 volunteers across 31 organizations for an eight-week study of how focus time is created, protected and lost. Participants included engineers, designers, account managers, analysts, recruiters and operations staff.",
          "With participants' consent, we combined anonymized calendar data with aggregated, opt-in signals about when people were actively messaging. We never looked at message content. Every afternoon, participants answered two quick questions: how good was today, and did you make progress on the work that matters most to you? Pairing those answers with the shape of each person's day let us see which patterns actually mattered.",
        ],
      },
      {
        id: "fragmentation",
        heading: "Fragmentation, not volume, is the problem",
        paragraphs: [
          "The average participant had about 11 hours of unscheduled time each week, which sounds healthy until you look at how it was distributed. Only 3.2 of those hours came in blocks of 90 minutes or longer. The rest arrived in slivers between meetings: twenty minutes here, forty minutes there, rarely enough to get properly started on anything difficult.",
          "Block length turned out to be a stronger predictor of a good day than total meeting hours. Participants who had at least one uninterrupted two-hour block were 2.3 times as likely to report meaningful progress that day, even when their total meeting load was the same as everyone else's. Moving a single meeting so that two small gaps became one large block often mattered more than canceling a meeting outright.",
          "Interruptions told a similar story. Participants checked messages an average of 52 times a day, but most of those checks were driven by worry about missing something rather than by a specific notification. When people trusted that urgent issues would reach them, they checked far less often.",
        ],
        quote: "I did not need fewer meetings. I needed my meetings to stop landing in the middle of my mornings.",
      },
      {
        id: "focus-is-a-team-sport",
        heading: "Focus is a team sport",
        paragraphs: [
          "One of the clearest findings was that individual tactics only go so far. Participants who silenced notifications on their own often felt more anxious, not less, because they worried that teammates were waiting on them. When a whole team agreed on shared focus hours, that anxiety faded and the time was genuinely protected. Teams that adopted shared norms gained an average of 3.6 hours of long-block focus time each week.",
          "The most effective teams relied on a handful of simple, explicit agreements. They were written down, usually in a pinned canvas, and revisited after a few weeks. Teams that agreed on norms out loud but never wrote them down drifted back to old habits within about a month.",
        ],
        bullets: [
          "Shared focus windows, such as weekday mornings until 11, with no meetings scheduled",
          "A clear path for urgent issues, like a dedicated channel or an on-call rotation, so everything else can wait",
          "Notification digests during focus hours instead of real-time alerts",
          "Status messages that say when you will be back, not just that you are busy",
          "A written daily check-in that replaces the quick sync meeting",
        ],
      },
      {
        id: "what-tools-can-do",
        heading: "What tools can and cannot do",
        paragraphs: [
          `Software can make good habits easier. Scheduled notifications, focus statuses and recaps of what happened while you were heads down all helped participants step away with less worry. Several teams in the study also used ${B} workflows to post a reminder when focus hours began and a short digest when they ended, which made the norm visible without anyone having to enforce it.`,
          "But tools did not create focus on their own. Participants with every focus feature turned on but no team agreement saw almost no improvement. The gains came when a team decided together what deserved an interruption and what could wait, and then used the product to make that decision easy to follow.",
        ],
      },
      {
        id: "try-it",
        heading: "Run a two-week focus pilot",
        paragraphs: [
          "If you want to try this with your team, start small. Pick one shared focus window, ideally in the morning when most participants reported doing their best work, and agree to keep it meeting-free for two weeks. Decide how urgent issues will reach people, and write both agreements in a canvas pinned to your team channel.",
          "At the end of each week, ask everyone the same two questions we asked our participants and compare the answers with a typical week before the pilot. Most teams in our study saw a difference within the first week, and the ones that kept going reported that focus hours quickly stopped feeling like a rule and started feeling like the way the team works.",
        ],
      },
    ],
  },
  {
    slug: "new-illustration-language",
    title: "Drawing the everyday: the story behind our new illustration language",
    excerpt:
      "We retired our faceless blob characters in favor of illustrations that show real work, real tools and real people, drawn in a system any designer can extend.",
    category: "Design",
    author: { name: "Sofia Alvarez", role: "Illustration Director", initials: "SA" },
    tone: "coral",
    publishedAt: "2026-06-10",
    readMinutes: 5,
    tags: ["Illustration", "Brand", "Inclusive design"],
    sections: [
      {
        id: "retiring-the-blobs",
        heading: "Retiring the blobs",
        paragraphs: [
          "For years, our illustrations featured soft, rounded characters with no faces and very few details. They were friendly and easy to produce, but they said almost nothing. Customers told us they could not tell whether a scene showed a sales team, a hospital or a software company, and many said the characters did not look like anyone they worked with.",
          "We set out to draw the everyday instead: people at kitchen tables and factory floors, standing desks and nurses' stations, with the tools and objects that make their work recognizable. The goal was not realism but specificity, so that every scene told a small, true story about how work gets done. If a scene could belong to any company, we kept drawing.",
        ],
      },
      {
        id: "a-system-not-a-style",
        heading: "A system, not just a style",
        paragraphs: [
          "Hand-drawn illustration rarely scales across a large company, so we built ours as a kit. Characters are assembled from a library of bodies, faces, hair, clothing, assistive devices and props, all drawn on a shared grid with consistent line weights. A product designer can compose a new scene in an afternoon without waiting for the illustration team.",
          "Color comes from the same token system as the product, which means every illustration adapts to light, dark and high-contrast themes automatically. We limit each scene to two accent tones so illustrations support the interface instead of competing with it. Every asset is exported as a lightweight SVG, so even complex scenes add only a few kilobytes to a page.",
        ],
        bullets: [
          "More than 400 interchangeable parts, including wheelchairs, hearing aids and prosthetics",
          "A shared 8-point grid and three line weights across every asset",
          "Theme-aware colors pulled directly from design tokens",
          "Usage guidelines that cover representation, not just composition",
        ],
      },
      {
        id: "representation",
        heading: "Representation as a practice",
        paragraphs: [
          "We worked with an advisory group of employees and customers to review early sketches, and their feedback changed a lot. Some of it was about who appeared in scenes, but more of it was about roles: who is leading the meeting, who is presenting, who is the expert. We now review scenes for those dynamics, not only for the variety of people on screen.",
          "We also track representation across every illustration we publish. It is not a quota, but it makes patterns visible early, before a whole campaign accidentally shows the same kind of person in every leadership role. The review takes minutes, and it has caught more than one scene we were glad to redraw.",
        ],
        quote: "If someone cannot find themselves in our product, we have not finished drawing it yet.",
      },
      {
        id: "where-to-see-it",
        heading: "Where you will see it",
        paragraphs: [
          "The new illustrations are already live in onboarding, empty states and our help center, and they will roll out across marketing pages over the summer. Empty states were the biggest win: a well-drawn scene showing what a busy channel looks like does more to explain the product than a paragraph of copy. In early tests, new members who saw illustrated empty states were 12 percent more likely to post their first message.",
          "We plan to share parts of the kit with developers who build apps on our platform later this year. That way, apps can feel at home in the product without commissioning their own artwork. If you have ideas for scenes or parts we are missing, the illustration team reads every message in our community feedback channel.",
        ],
      },
    ],
  },
  {
    slug: "fewer-meetings-better-work",
    title: "What 90 teams learned when they cut recurring meetings in half",
    excerpt:
      "We followed 90 teams through a six-week experiment in async work. Most kept the change, and the ones who did shared five habits worth stealing.",
    category: "Productivity",
    author: { name: "Jordan Blake", role: "Principal Researcher, Future of Work Lab", initials: "JB" },
    tone: "mint",
    publishedAt: "2026-04-22",
    readMinutes: 7,
    tags: ["Async work", "Meetings", "Research"],
    sections: [
      {
        id: "the-experiment",
        heading: "The experiment",
        paragraphs: [
          "Earlier this year, our Future of Work Lab invited 90 teams across 24 companies to try something uncomfortable: cancel at least half of their recurring meetings for six weeks and move that work into channels, canvases and short recorded updates. Teams ranged from four-person startups to a 60-person regional sales organization. Roughly a third were fully remote, a third hybrid and a third mostly in the office.",
          "We measured time in meetings, self-reported focus time and a simple weekly question about whether the team was making progress on what mattered. Managers also rated how confident they felt about what their team was working on. At the end, we asked every team whether they planned to keep the new rhythm or return to their old calendar.",
        ],
      },
      {
        id: "what-happened",
        heading: "What happened",
        paragraphs: [
          "On average, participants recovered 4.2 hours a week, and 71 percent said they had more uninterrupted focus time than before. More surprisingly, the share of people who felt their team was making clear progress went up, not down. Fewer meetings did not mean less alignment; it meant alignment happened in writing, where it was easier to revisit.",
          "Not every team thrived. A handful found that removing meetings removed the only time they connected as people, and morale dipped. The teams that did best kept one human, unstructured touchpoint each week and moved everything else to async. In the end, 64 of the 90 teams chose to keep their lighter calendar.",
        ],
        quote: "We did not lose our stand-up. We lost the twenty minutes of people reading their task list out loud.",
      },
      {
        id: "five-habits",
        heading: "Five habits of the teams that kept it",
        paragraphs: [
          "When we compared the teams that kept their new rhythm with those that went back, five habits stood out. None of them required new tools, but all of them required the team to agree on them explicitly rather than hoping they would emerge. Teams that wrote their norms down in a pinned canvas were twice as likely to stick with them.",
          "The habits are simple, almost boring, which is part of why they work. They reduce the number of small decisions people have to make about where to post, when to reply and how much detail to include. That predictability is what lets async work feel calm instead of chaotic.",
        ],
        bullets: [
          "Post written updates on a predictable day and time, using the same short template",
          "Make decisions in a thread, then pin the outcome where newcomers will find it",
          "Use short recorded clips for anything that needs tone or a screen share",
          "Set an explicit response window, such as one business day, so nobody feels on call",
          "Protect one weekly live session for connection, not status reporting",
        ],
      },
      {
        id: "try-it",
        heading: "How to try it with your team",
        paragraphs: [
          "Start by auditing your recurring meetings and labeling each one as decision-making, status, brainstorming or connection. Status meetings are almost always the easiest to move async. Decision-making and connection meetings are usually worth keeping, though often shorter and less frequent than they are today.",
          "Run the experiment for at least four weeks before judging it, because the first week always feels slower. Check in with the team at the halfway point and adjust, rather than abandoning the whole idea after one rough Monday. Our weekly team sync template includes a canvas for written updates, a workflow that reminds people to post and a channel structure that keeps threads tidy, so you can start on Monday.",
        ],
      },
    ],
  },
];

export const postCategories: PostCategory[] = ["Product", "News", "AI", "Productivity", "Engineering", "Design"];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

/** The post's cover illustration. A new post needs a scene in scripts/blog-covers.mjs, then `npm run covers`. */
export function postCover(post: Pick<Post, "slug">) {
  return `/blog/covers/${post.slug}.svg`;
}
