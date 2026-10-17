import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { ArticleSection, Person } from "./types";

export type PostCategory = "Product" | "News" | "Engineering" | "Design" | "Productivity" | "AI";

export type Post = {
  slug: string;
  title: string;
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
