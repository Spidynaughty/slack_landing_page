import type { IconName } from "@/components/ui/icon";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";
import type { ArticleSection, Person } from "./types";

/* ------------------------------------------------------------------ */
/* Resource categories (URL slugs mirror the reference architecture)   */
/* ------------------------------------------------------------------ */

export type ResourceCategory = { slug: string; name: string; description: string; icon: IconName; tone: Tone };

export const resourceCategories: ResourceCategory[] = [
  {
    slug: "why-use-slack",
    name: `Why ${B}`,
    description: `Research, reports and explainers on how ${B} helps teams move faster, cut busywork and get ready for the AI era of work.`,
    icon: "lightbulb",
    tone: "violet",
  },
  {
    slug: "using-slack",
    name: `Using ${B}`,
    description: `Practical playbooks for running projects, meetings and team rituals in ${B}, written by people who do it every day.`,
    icon: "rocket",
    tone: "mint",
  },
  {
    slug: "slack-101",
    name: `${B} 101`,
    description: `Start here. The fundamentals of channels, threads, notifications and everyday habits for anyone new to ${B}.`,
    icon: "graduation",
    tone: "sun",
  },
  {
    slug: "slack-for-admins",
    name: `${B} for admins`,
    description: "Guidance for IT and workspace admins on rollout, governance, security and driving adoption across the whole organization.",
    icon: "shieldCheck",
    tone: "sky",
  },
];

/* ------------------------------------------------------------------ */
/* Guides                                                              */
/* ------------------------------------------------------------------ */

export type Guide = {
  slug: string;
  /** A ResourceCategory slug. */
  category: string;
  title: string;
  excerpt: string;
  type: "Guide" | "Article" | "Checklist" | "E-book";
  tone: Tone;
  readMinutes: number;
  /** ISO date, e.g. "2026-09-18" */
  updatedAt: string;
  author: Person;
  sections: ArticleSection[];
  takeaways: string[];
};

export const guides: Guide[] = [
  /* ----------------------------- Why ----------------------------- */
  {
    slug: "move-work-out-of-the-inbox",
    category: "why-use-slack",
    title: "Why teams are moving work out of the inbox",
    excerpt: `Inboxes were built for letters, not projects. Here is why fast-moving teams now run their work in ${B} channels, and what changes when they switch.`,
    type: "Article",
    tone: "violet",
    readMinutes: 7,
    updatedAt: "2026-09-18",
    author: { name: "Maya Chen", role: "Head of Workplace Research", initials: "MC" },
    sections: [
      {
        id: "the-inbox-problem",
        heading: "The inbox was never designed for teamwork",
        paragraphs: [
          "Email solved a real problem: getting a message from one person to another, reliably, across any organization. It was never meant to be the place where a dozen people plan a launch, review a contract and agree on a budget at the same time. Yet for most teams that is exactly what it became, a shared to-do list that nobody can see in full.",
          "The symptoms are familiar. Reply-all threads that fork into three separate conversations. Attachments named final_v7. New hires who join a project and have no way to read the decisions made before they arrived. Each problem is small on its own, but together they add hours of searching, forwarding and re-explaining to every week.",
          "When our research team asked 2,400 knowledge workers where they lose the most time, finding information that someone else had already shared came first, ahead of meetings. The inbox was the most common place that information was buried.",
        ],
      },
      {
        id: "channels-change-the-default",
        heading: "Channels change the default from private to open",
        paragraphs: [
          "A channel is a shared space organized around a project, team or topic. Instead of sending a message to a list of recipients, you post it where the work lives, and anyone who joins later can scroll back and catch up. The default shifts from private by accident to open by design, while private channels and direct messages remain available for sensitive work.",
          "That shift matters more than any single feature. When conversations are visible, people answer each other's questions, duplicate work gets spotted early and leaders can see progress without asking for status updates. The channel becomes a living record of how a decision was made, not just what was decided.",
        ],
        bullets: [
          "New team members read the history instead of asking for forwards",
          "Questions get answered by whoever knows, not whoever was copied",
          "Files, decisions and approvals stay attached to the conversation",
          "Partners outside your company can join shared channels securely",
        ],
      },
      {
        id: "what-teams-report",
        heading: "What teams report after the switch",
        paragraphs: [
          "Teams that move a project from email to channels tend to describe the change in the same way: fewer messages, but better ones. Brightline, a national retailer, moved store operations updates out of the inbox and into regional channels. Within a quarter, district managers said they spent far less time chasing confirmations, because store teams could acknowledge an update with a quick reaction or reply in a thread.",
          "Kestrel Labs saw a different benefit. Its engineering teams used to lose context every time a project changed hands. With channels, the handoff became a pinned canvas and a link to the conversation, so the next team started with the full history instead of a summary email that left out the hard parts.",
        ],
        quote: "We didn't stop communicating. We stopped forwarding. Everything a new person needs is already in the channel.",
      },
      {
        id: "making-the-move",
        heading: "How to make the move without disruption",
        paragraphs: [
          "The most successful switches start small. Pick one cross-functional project with a clear end date, create a channel for it and agree that project updates happen there rather than by email. After a few weeks, the team has a working example that others can copy, and a few enthusiastic advocates who can explain why it works.",
          "Keep email for what it does well: formal communication with people outside your organization and notifications that genuinely belong in an archive. Everything that involves back-and-forth discussion belongs where the whole team can see it.",
        ],
        steps: [
          "Choose a pilot project with five to fifteen people and a deadline",
          "Create a channel with a clear name and a one-line description of its purpose",
          "Pin a canvas with goals, owners and key links",
          "Agree that status updates and decisions are posted in the channel, not by email",
          "Review after four weeks and share what worked with the next team",
        ],
      },
    ],
    takeaways: [
      "Inboxes hide information the rest of the team needs",
      "Channels make conversation history open and searchable by default",
      "Start with one project, prove the value, then expand",
    ],
  },
  {
    slug: "building-the-business-case",
    category: "why-use-slack",
    title: "Building the business case for a work platform",
    excerpt: `A practical framework for showing leadership how ${B} saves time, cuts tool sprawl and speeds up decisions, using the metrics finance teams trust.`,
    type: "Guide",
    tone: "sun",
    readMinutes: 9,
    updatedAt: "2026-08-27",
    author: { name: "Nora Feld", role: "Principal Consultant, Change Management", initials: "NF" },
    sections: [
      {
        id: "start-with-the-problem",
        heading: "Start with the problem, not the product",
        paragraphs: [
          "Business cases fail when they lead with features. Leadership does not need to hear about huddles or canvases; it needs to hear about the slow approval cycle that delayed last quarter's launch, or the support escalations that took three days to reach an engineer. Begin by naming two or three concrete problems that already cost the business money.",
          "Then interview the people closest to those problems. A fifteen-minute conversation with a sales manager, a support lead and a project manager will surface more credible evidence than any vendor benchmark. Capture their words, because quotes from colleagues carry real weight in a budget meeting.",
        ],
        bullets: [
          "Where does work stall waiting for an answer or an approval?",
          "How many tools does a typical employee switch between each day?",
          "How long does it take a new hire to find what they need?",
          "Which recurring meetings exist only to share status?",
        ],
      },
      {
        id: "measure-what-matters",
        heading: "Measure what finance teams trust",
        paragraphs: [
          "Time saved is the most common metric, and the most easily dismissed. Make it concrete by tying it to a specific process. If a weekly status meeting with eight people takes an hour and could be replaced by an async update, that is eight hours a week, which you can multiply by a loaded hourly cost and by the number of teams that run similar meetings.",
          "Pair time savings with cycle-time metrics, such as days from request to approval, time to first response on customer escalations or time to resolve an IT ticket. These connect directly to revenue and customer satisfaction, which makes them much harder to argue with.",
          "Finally, look at consolidation. Many organizations pay for separate tools for chat, video calls, lightweight documents and simple workflows. Retiring even one of them can fund a large part of the rollout.",
        ],
      },
      {
        id: "build-the-model",
        heading: "Build a simple, defensible model",
        paragraphs: [
          "A good model fits on one page. List each problem, the metric you will use, today's baseline, a conservative estimate of improvement and the resulting value. Use the low end of every range. A modest, credible number wins more budget than an impressive one that invites scrutiny.",
          "Include costs honestly: licenses, the time admins will spend on setup, training sessions and a champion program. Showing that you have planned for adoption signals that the investment will actually be used, not just purchased.",
        ],
        steps: [
          "List three problems and the teams they affect",
          "Pick one measurable metric for each problem",
          "Record the current baseline from real data or interviews",
          "Estimate a conservative improvement, using the low end of the range",
          "Subtract licenses, setup and training to show the net value",
        ],
      },
      {
        id: "prove-it-with-a-pilot",
        heading: "Prove it with a pilot",
        paragraphs: [
          "The strongest evidence is your own. Propose a 60-day pilot with two or three teams that represent the problems in your model. Measure the same metrics before and after, and collect short quotes from participants at the end of the pilot.",
          "Vantage Bank took this approach with its commercial lending group. The pilot focused on a single metric, the time from loan application to credit decision, and the result became the centerpiece of a company-wide proposal that was approved in one meeting.",
        ],
        quote: "The pilot data did the persuading for us. Nobody argues with their own numbers.",
      },
    ],
    takeaways: [
      "Lead with business problems your leaders already recognize",
      "Combine time savings with cycle-time and consolidation metrics",
      "Keep the model conservative and include adoption costs",
      "Use a short pilot to replace estimates with your own data",
    ],
  },

  /* ----------------------------- Using ----------------------------- */
  {
    slug: "ten-ways-to-replace-ineffective-meetings",
    category: "using-slack",
    title: "Ten ways to replace ineffective meetings",
    excerpt: `Status updates, quick decisions and brainstorms rarely need a calendar invite. Ten practical swaps that use ${B} to give your team hours back every week.`,
    type: "Guide",
    tone: "mint",
    readMinutes: 10,
    updatedAt: "2026-09-30",
    author: { name: "Sam Whitaker", role: "Productivity Coach", initials: "SW" },
    sections: [
      {
        id: "audit-your-calendar",
        heading: "First, audit your calendar",
        paragraphs: [
          "Before you cancel anything, look at what your meetings are actually for. Most recurring meetings fall into one of four buckets: sharing status, making a decision, generating ideas or building relationships. Only the last one consistently needs everyone in the same place at the same time.",
          "Spend twenty minutes reviewing the next two weeks of your calendar and label each meeting with its purpose. You will usually find that a third or more of them exist to move information from one person to several others, which is exactly the kind of work that conversations in channels handle better.",
        ],
        bullets: [
          "Status: updates that could be read in two minutes",
          "Decision: a choice that needs input from specific people",
          "Ideas: brainstorming and early feedback",
          "Connection: one-on-ones, team rituals and onboarding",
        ],
      },
      {
        id: "replace-status-meetings",
        heading: "Ways 1 to 3: replace status meetings",
        paragraphs: [
          "1. Post async standups. Ask each person to share yesterday's progress, today's focus and any blockers in a dedicated channel by mid-morning. A simple workflow can send the prompt automatically and collect replies in a thread, so the whole update takes minutes to write and seconds to read.",
          "2. Let AI write the recap. Instead of a weekly meeting where each lead reports on their area, use AI recaps to summarize what happened across project channels. Leaders read the summary, click into anything that needs attention and skip the hour-long round robin.",
          "3. Track progress in a shared list. When a project tracker lives next to the conversation, nobody needs to ask where things stand. Owners update the status of their own items, and anyone can filter the list to see what is blocked or overdue.",
        ],
      },
      {
        id: "make-decisions-faster",
        heading: "Ways 4 to 6: make decisions without the meeting",
        paragraphs: [
          "4. Write a decision brief in a canvas. Lay out the problem, the options and your recommendation, then share it in the channel with a clear deadline for feedback. People respond on their own schedule, and the reasoning is preserved for anyone who asks about it later.",
          "5. Use emoji polls for quick choices. For low-stakes decisions, such as picking a launch date from three options, a message with numbered emoji reactions settles the question in an hour without anyone leaving their desk.",
          "6. Route approvals through a workflow. Budget sign-offs, content reviews and access requests do not need a meeting. A form in Workflow Builder collects the details, notifies the approver and posts the outcome back to the channel.",
        ],
        steps: [
          "Draft the brief with context, options and a recommendation",
          "Tag the people whose input you need and set a deadline",
          "Collect comments in the thread, not in side conversations",
          "Post the final decision and pin it to the channel",
        ],
      },
      {
        id: "keep-ideas-flowing",
        heading: "Ways 7 and 8: keep ideas flowing",
        paragraphs: [
          "7. Run an async brainstorm. Open a thread with a clear prompt and leave it open for two days. People who think best on their own get space to contribute, and you often end up with more ideas than a live session would produce. Follow up with a short huddle only if the group needs to converge.",
          "8. Share a clip instead of presenting. A two-minute screen recording with a voiceover can replace a demo meeting. Viewers watch at their own speed, captions and transcripts make it searchable, and comments land right below the video.",
        ],
        quote: "We cut our weekly sync from an hour to fifteen minutes, and those fifteen minutes are now the best part of the week.",
      },
      {
        id: "meet-better",
        heading: "Ways 9 and 10: meet better when you do meet",
        paragraphs: [
          "9. Default to a huddle, not a scheduled call. When a thread starts going in circles, start a huddle right from the channel. It is quick to join, easy to leave, and the AI notes post back to the channel so people who were not there can catch up.",
          "10. Protect a meeting-free block. Agree as a team on two or three focus blocks each week with no meetings at all. Async tools only give time back if you defend it, and a shared norm makes it easier for everyone to decline.",
          "The goal is not zero meetings. It is making sure that every meeting left on the calendar is one where people genuinely need to talk.",
        ],
      },
    ],
    takeaways: [
      "Label each meeting by purpose before cutting anything",
      "Move status updates to async standups and AI recaps",
      "Use canvases, polls and workflows for most decisions",
      "Huddle when a thread stalls, and protect meeting-free time",
    ],
  },
  {
    slug: "run-a-product-launch-from-one-channel",
    category: "using-slack",
    title: "How to run a product launch from one channel",
    excerpt: `From kickoff to launch day, a step-by-step playbook for keeping product, marketing, sales and support aligned in a single ${B} channel, start to finish.`,
    type: "Guide",
    tone: "coral",
    readMinutes: 8,
    updatedAt: "2026-07-22",
    author: { name: "Ben Adeyemi", role: "Product Marketing Manager", initials: "BA" },
    sections: [
      {
        id: "set-up-the-launch-channel",
        heading: "Set up the launch channel",
        paragraphs: [
          "Every launch has the same failure mode: too many places to look. Product updates live in one tool, marketing timelines in another, and the sales team hears about changes last. A single launch channel gives everyone one place to check, with links out to the specialist tools each team uses.",
          "Name the channel so it sorts well and is easy to find, for example a launch prefix followed by the product and the quarter. Write a one-line purpose, add the core team from each function and invite stakeholders who only need to follow along.",
        ],
        steps: [
          "Create the channel with a consistent naming prefix",
          "Write a purpose statement and add the launch date to the topic",
          "Invite owners from product, marketing, sales, support and legal",
          "Pin the launch brief canvas and the launch task list",
          "Add a workflow for asset review requests",
        ],
      },
      {
        id: "plan-in-a-canvas",
        heading: "Plan in a canvas everyone can edit",
        paragraphs: [
          "The launch brief belongs in a canvas pinned to the channel. Include the goal, the audience, key messages, the launch tier and a table of owners. Because the canvas sits next to the conversation, people can ask questions about a section in a thread instead of in a separate comment system nobody checks.",
          "Keep the brief current. When a decision changes the plan, update the canvas and post a short note in the channel explaining what changed and why. That habit turns the canvas into the single source of truth rather than a stale artifact from kickoff.",
        ],
      },
      {
        id: "track-work-in-a-list",
        heading: "Track every task in a list",
        paragraphs: [
          "A launch involves dozens of deliverables across teams: pricing pages, sales enablement, help articles, press materials and in-product announcements. Track them in a list with columns for owner, due date, status and dependencies. Group items by function so each team can focus on its own work while still seeing everyone else's.",
          "Set up a simple automation that posts a message whenever an item is marked as blocked. Blockers surface in the channel immediately, and the right people can swarm on them in a thread before they threaten the date.",
        ],
        bullets: [
          "An owner and a backup for every deliverable",
          "Due dates that work backward from launch day",
          "A status column with clear, shared definitions",
          "A link to the final asset once it is approved",
        ],
      },
      {
        id: "launch-day-and-after",
        heading: "Launch day and the week after",
        paragraphs: [
          "On launch day, the channel becomes mission control. Post a run of show at the start of the day, check off milestones as they happen and use a huddle for any issue that needs a fast decision. Support and sales can flag early customer questions in real time, and product can respond in the same thread.",
          "After launch, keep the channel open for a week to capture feedback, then ask AI to summarize the channel history into a retrospective draft. Edit it with the team, save it as a canvas and archive the channel so the history stays searchable for the next launch.",
        ],
        quote: "The launch channel meant sales heard about the pricing change at the same moment marketing did. That alone saved us a week of confusion.",
      },
    ],
    takeaways: [
      "One channel per launch keeps every function looking at the same plan",
      "Pin a living brief and a task list next to the conversation",
      "Automate blocker alerts and use huddles for fast calls",
      "Turn the channel history into a retrospective with AI",
    ],
  },
  {
    slug: "async-standups-people-actually-read",
    category: "using-slack",
    title: "Async standups people actually read",
    excerpt: "A checklist for designing async standups that stay short, surface blockers early and get read by the whole team, using channels, workflows and AI recaps.",
    type: "Checklist",
    tone: "pink",
    readMinutes: 6,
    updatedAt: "2026-06-12",
    author: { name: "Leah Okonkwo", role: "Senior Product Educator", initials: "LO" },
    sections: [
      {
        id: "why-standups-go-stale",
        heading: "Why most standups go stale",
        paragraphs: [
          "The daily standup started as a fifteen-minute gathering around a whiteboard. Moved online, it often turns into a thirty-minute call where each person recites a task list while everyone else waits their turn. Async standups fix the scheduling problem, but they can fail in a different way: long updates that nobody reads.",
          "The difference between a useful async standup and a noisy one comes down to format, timing and follow-through. Get those three right and the standup becomes the most efficient ritual your team has.",
        ],
      },
      {
        id: "design-the-format",
        heading: "Design a format that fits on one screen",
        paragraphs: [
          "Keep the prompt to three questions and ask for short answers. People should be able to write their update in two minutes and read the whole team's updates in five. If updates regularly run longer than a few lines, the questions are too open-ended.",
          "Ask people to tag a teammate whenever they need help, so blockers become actionable right away. A tagged request in a thread is far more likely to get a fast response than a general comment buried in a long post. Use these prompts as a starting point:",
        ],
        bullets: [
          "What did you finish since the last update?",
          "What is your focus today?",
          "Is anything blocking you, and who can help?",
          "Optional: one thing the team should know",
        ],
      },
      {
        id: "automate-the-ritual",
        heading: "Automate the ritual",
        paragraphs: [
          "Manual reminders do not last. Use Workflow Builder to post the prompt at the same time every working day and collect replies in a single thread. For distributed teams, schedule the prompt so it lands at the start of each person's day rather than in the middle of their night.",
          "AI recaps make the format scale. A manager responsible for several teams can read one summary that highlights blockers and themes, then jump straight into the thread where help is needed. Set it up in five steps:",
        ],
        steps: [
          "Create a dedicated standup channel or use the team channel",
          "Build a scheduled workflow that posts the three questions",
          "Ask everyone to reply in the thread, not the main channel",
          "Turn on AI recaps so leads can read a summary",
          "Review blockers at a set time each day",
        ],
      },
      {
        id: "close-the-loop",
        heading: "Close the loop on blockers",
        paragraphs: [
          "A standup is only as good as what happens after it. Agree on who scans for blockers each day and how quickly they respond. If a blocker sits unanswered for a full day, people quietly stop raising them.",
          "Once a month, look back through the standup threads. Recurring blockers point to process problems worth fixing, and patterns in what people report as finished can tell you a lot about where the team's time is really going.",
        ],
        quote: "Reading the standup takes me four minutes. Running the old call took forty-five, and I learned less.",
      },
    ],
    takeaways: [
      "Three short questions, answered in a thread, every day",
      "Automate the prompt and adjust it for time zones",
      "Use AI recaps to scale standups across several teams",
      "Respond to blockers quickly or people will stop raising them",
    ],
  },

  /* ----------------------------- 101 ----------------------------- */
  {
    slug: "collaborate-effectively-in-channels",
    category: "slack-101",
    title: "How to collaborate effectively in channels",
    excerpt: `Naming conventions, threads, mentions and etiquette: everything you need to turn ${B} channels into organized, focused spaces where work moves forward.`,
    type: "Guide",
    tone: "sun",
    readMinutes: 8,
    updatedAt: "2026-09-09",
    author: { name: "Tomás Reyes", role: "Customer Success Lead", initials: "TR" },
    sections: [
      {
        id: "organize-with-naming",
        heading: "Organize channels with clear names",
        paragraphs: [
          "Good collaboration starts with being able to find the right place to talk. Agree on a small set of prefixes that tell people what a channel is for at a glance, then use them consistently. When every project channel starts with the same prefix, browsing and searching become effortless.",
          "Write a purpose for every channel. One sentence that explains what belongs there, and what does not, prevents a surprising number of off-topic posts. Add useful links, such as the project canvas or the team's list, to the channel's bookmarks so they are always one click away.",
        ],
        bullets: [
          "proj- for time-bound projects with a clear end date",
          "team- for ongoing team conversations",
          "help- for questions to a specific function, such as IT or legal",
          "announce- for read-only updates from leadership",
          "social- for interests, celebrations and community",
        ],
      },
      {
        id: "threads-keep-focus",
        heading: "Use threads to keep conversations focused",
        paragraphs: [
          "Threads are the single most important habit for a healthy channel. Reply to a specific message in a thread and the main channel stays readable, while the side conversation stays attached to its context. Anyone can follow the thread to be notified of new replies.",
          "A good rule of thumb: start a new top-level message for a new topic, and reply in a thread to continue an existing one. If a thread reaches a decision that the whole channel should see, use the option to also send your reply to the channel.",
        ],
        steps: [
          "Hover over the message you want to reply to",
          "Select Reply in thread",
          "Write your reply, and check the box to also send it to the channel if everyone needs to see it",
          "Follow or unfollow the thread to control your notifications",
        ],
      },
      {
        id: "mention-with-intent",
        heading: "Mention people with intent",
        paragraphs: [
          "Mentions are a request for attention, so use them deliberately. Tag a specific person when you need something from them, and say what you need and by when. Avoid channel-wide mentions unless the message is urgent and relevant to everyone, especially in channels with members across several time zones.",
          "User groups make mentions smarter. Instead of remembering who is on call for the design team this week, mention the group and the right people are notified. Admins can sync groups with your company directory so membership always stays current.",
        ],
        quote: "The rule on our team is simple: if you tag someone, tell them what you need. It has cut our back-and-forth in half.",
      },
      {
        id: "share-and-find-work",
        heading: "Share work where people can find it",
        paragraphs: [
          "Post files, canvases and links in the channel where the related conversation happens rather than in direct messages. That way the whole team can find them later through search, and new members inherit the full context the moment they join.",
          "Use pins and bookmarks for the handful of resources people need every week. Everything else can live in the history, because search across messages, files and canvases will surface it when you need it.",
        ],
      },
      {
        id: "etiquette-that-scales",
        heading: "Etiquette that scales",
        paragraphs: [
          "As channels grow, small habits make a big difference. Set your status when you are away, use emoji reactions to acknowledge messages without adding noise, and edit a message rather than posting a correction underneath it.",
          "Finally, leave channels you no longer need. Muting and leaving are healthy, not rude, and they keep your sidebar focused on the work that matters to you right now.",
        ],
      },
    ],
    takeaways: [
      "Use consistent prefixes and a clear purpose for every channel",
      "Reply in threads to keep the main channel readable",
      "Mention people with a specific request and a deadline",
      "Share work in channels so search and new members can find it",
    ],
  },
  {
    slug: "your-first-week-checklist",
    category: "slack-101",
    title: `Your first week in ${B}: a checklist`,
    excerpt: `New to ${B}? Work through this five-day checklist to set up your profile, join the right channels, tame notifications and build habits that save time.`,
    type: "Checklist",
    tone: "violet",
    readMinutes: 5,
    updatedAt: "2026-08-04",
    author: { name: "Hiroshi Tanaka", role: "Onboarding Program Manager", initials: "HT" },
    sections: [
      {
        id: "day-one-profile",
        heading: "Day one: set up your profile",
        paragraphs: [
          "Your profile is how colleagues find and recognize you, especially in a large organization. Add a clear photo, your full name, your role and your team. Include your time zone and working hours so people know when to expect a reply.",
          "Take a moment to set a status, too. A short status such as heads down until noon or in a workshop today tells teammates what to expect without them having to ask.",
        ],
        steps: [
          "Open your profile from your avatar in the top corner",
          "Add a photo, your role, your team and pronouns if you wish",
          "Set your time zone and working hours",
          "Choose a status and when it should clear",
        ],
      },
      {
        id: "day-two-channels",
        heading: "Day two: join the right channels",
        paragraphs: [
          "Ask your manager or onboarding buddy which channels matter most for your role. Usually that means your team channel, two or three active project channels, the company announcements channel and a help channel for IT questions.",
          "Browse the channel directory for anything else that looks relevant, and don't worry about joining too many, because you can always leave later. Organize your sidebar into sections, such as my team, projects and social, so the most important channels stay at the top.",
        ],
      },
      {
        id: "day-three-notifications",
        heading: "Day three: tame your notifications",
        paragraphs: [
          "Out of the box, notifications are tuned to make sure you don't miss anything. After a couple of days you will know which channels need your attention and which you only skim. Adjust settings per channel so that only direct messages, mentions and a few key channels can interrupt you.",
          "Remember that everyone else is adjusting too. It is perfectly normal to reply to a non-urgent message a few hours later. A few settings worth changing this week:",
        ],
        bullets: [
          "Set a notification schedule that matches your working hours",
          "Mute busy channels you only need to check occasionally",
          "Add keywords, such as your project name, to get alerts for them",
          "Pause notifications during focus time",
        ],
      },
      {
        id: "days-four-and-five-habits",
        heading: "Days four and five: build good habits",
        paragraphs: [
          "By the end of your first week, try a few features that experienced users rely on. Start a huddle instead of scheduling a quick call, save messages you want to come back to with Later, and use search filters to find a file someone shared before you joined.",
          "Then ask AI for a recap of a busy channel you joined this week. Seeing a summary of the decisions and open questions is one of the fastest ways to get up to speed on a team you have just joined.",
        ],
        quote: "My first-week recap told me more about the project than any onboarding deck could have.",
      },
    ],
    takeaways: [
      "Complete your profile with your role, time zone and working hours",
      "Join a focused set of channels and organize your sidebar",
      "Tune notifications so only important messages interrupt you",
      "Use recaps and search to catch up on history quickly",
    ],
  },

  /* ----------------------------- Admins ----------------------------- */
  {
    slug: "unlocking-value-at-scale",
    category: "slack-for-admins",
    title: "Unlocking value at scale: an admin playbook",
    excerpt: `How admins at large organizations structure workspaces, drive adoption and measure impact, so ${B} grows from a team tool into an enterprise platform.`,
    type: "E-book",
    tone: "sky",
    readMinutes: 14,
    updatedAt: "2026-10-02",
    author: { name: "Arjun Mehta", role: "Enterprise Solutions Architect", initials: "AM" },
    sections: [
      {
        id: "design-for-scale",
        heading: "Design your structure for scale",
        paragraphs: [
          "The decisions you make in the first few months shape how well your organization collaborates for years. Start by deciding how many workspaces you need. Many organizations do well with a single workspace and well-organized channels, while others with distinct business units, regulatory boundaries or regional needs benefit from several workspaces under one organization.",
          "Whatever you choose, plan channel conventions centrally. Publish a short guide to naming prefixes, default channels for new employees and when to create a private channel instead of a public one. Clear conventions reduce sprawl and make search far more useful.",
        ],
        bullets: [
          "Default channels every new employee joins automatically",
          "Naming prefixes that work across every department",
          "A policy for shared channels with external partners",
          "Ownership rules so every channel has an accountable owner",
        ],
      },
      {
        id: "automate-identity-and-lifecycle",
        heading: "Automate identity and lifecycle management",
        paragraphs: [
          "At scale, manual user management breaks down quickly. Connect your identity provider for single sign-on and automated provisioning, so people get the right access on their first day and lose it the moment they leave. Sync user groups from your directory to keep mentions and channel membership current.",
          "Next, automate the channel lifecycle. Set a policy that flags channels with no activity for 90 days, notifies the owner and archives them if nobody objects. Archived channels remain searchable, so you keep the history without the clutter.",
        ],
        steps: [
          "Connect single sign-on and enforce it for all members",
          "Turn on automated provisioning and deprovisioning",
          "Sync user groups from your directory",
          "Configure default channels for each department",
          "Set an inactivity policy for channel archiving",
        ],
      },
      {
        id: "drive-adoption-with-champions",
        heading: "Drive adoption with champions",
        paragraphs: [
          "Technology rarely drives adoption on its own. The organizations that get the most value build a network of champions: one or two enthusiastic people per team who share tips, answer questions and model good habits. Give them a private channel, early access to new features and visible recognition from leadership.",
          "Pair champions with role-specific playbooks. A sales team needs to see how deal channels and CRM records come together, while an engineering team cares about incident channels and code review notifications. Generic training leads to generic usage.",
          "Halcyon Health built a champion network of clinicians and administrators across its 12 hospitals. Within six months, weekly active usage passed 90 percent and internal email volume fell by more than a third.",
        ],
        quote: "Our champions did more for adoption than any training session. People trust a colleague who shows them a shortcut.",
      },
      {
        id: "extend-with-automation-and-ai",
        heading: "Extend the platform with automation and AI",
        paragraphs: [
          "Once the basics are in place, the biggest gains come from connecting the tools people already use and automating repetitive work. Approve a curated set of apps, publish a short list of recommended workflows and make it easy for teams to request new integrations through a simple form.",
          "Roll out AI and agents with clear guidance. Start with features that summarize and search, which have immediate value and low risk, then introduce agents with narrow, well-defined jobs and human approval for sensitive steps. Document what data each agent can access, and review it regularly.",
        ],
      },
      {
        id: "measure-and-report-impact",
        heading: "Measure and report impact",
        paragraphs: [
          "Leadership will want to know whether the investment is paying off. Use analytics to track weekly active users, the share of messages in public versus private channels and adoption of features such as huddles, workflows and AI recaps. A rising share of public conversation is one of the clearest signs of a healthy collaboration culture.",
          "Then go beyond usage. Partner with business leaders to measure the outcomes they care about, such as time to resolve support tickets, sales cycle length or time to onboard new employees, and report on them every quarter alongside your adoption metrics.",
        ],
      },
    ],
    takeaways: [
      "Plan workspace structure and channel conventions centrally",
      "Automate provisioning, user groups and the channel lifecycle",
      "Build a champion network with role-specific playbooks",
      "Report on business outcomes, not just usage",
    ],
  },
  {
    slug: "governance-retention-and-guest-access",
    category: "slack-for-admins",
    title: "Governance basics: retention, permissions and guests",
    excerpt: `A clear starting point for setting retention policies, managing permissions and inviting guests safely, written for IT and security teams rolling out ${B}.`,
    type: "Guide",
    tone: "mint",
    readMinutes: 11,
    updatedAt: "2026-07-08",
    author: { name: "Clara Johansson", role: "Director of IT Programs", initials: "CJ" },
    sections: [
      {
        id: "governance-principles",
        heading: "Start with principles, not settings",
        paragraphs: [
          "Every admin console has dozens of settings, and it is tempting to work through them one by one. Instead, start by agreeing on a few principles with your legal, security and HR partners. How long should conversations be kept? Who can create channels and invite outsiders? What data should never be shared in chat?",
          "Written principles make every later decision faster. When a team asks for an exception, you can evaluate it against an agreed framework instead of debating from scratch each time.",
        ],
        bullets: [
          "Default to openness for internal collaboration",
          "Keep data only as long as there is a business or legal need",
          "Grant the minimum access needed, and review it regularly",
          "Make policies visible to employees, not just administrators",
        ],
      },
      {
        id: "set-retention-policies",
        heading: "Set retention policies that match your obligations",
        paragraphs: [
          "Retention settings decide how long messages and files are kept. Set an organization-wide default, then apply custom policies to specific channels where regulations require longer or shorter periods, for example finance channels that must keep records for seven years.",
          "Be careful with very short retention periods. Deleting history too aggressively removes the institutional knowledge that makes channels valuable, and it can conflict with legal holds. Work with your legal team to define when holds apply and who can place them.",
        ],
        steps: [
          "Agree on a default retention period with legal and compliance",
          "Identify channels or teams with stricter requirements",
          "Apply custom retention policies to those channels",
          "Document how legal holds are requested and applied",
          "Review every policy at least once a year",
        ],
      },
      {
        id: "manage-permissions",
        heading: "Manage permissions without slowing people down",
        paragraphs: [
          "Permissions should protect sensitive information without creating a queue of requests for IT. Let most members create public channels, restrict who can create shared channels with external organizations and limit workspace-wide mentions to a small group to prevent notification overload.",
          "Use admin roles thoughtfully. Separate the people who manage users from those who manage integrations and those who handle compliance exports. Smaller, focused roles reduce risk and make audit logs far easier to read.",
        ],
      },
      {
        id: "invite-guests-safely",
        heading: "Invite guests and partners safely",
        paragraphs: [
          "Working with agencies, contractors and customers in shared spaces is one of the most valuable things a work platform can do. Guest accounts limit outsiders to specific channels, while shared channels connect two organizations so that each keeps control of its own members and data.",
          "Set an expiry date for every guest by default, and require an internal sponsor who is responsible for the relationship. Review active guests every quarter and remove anyone who no longer needs access.",
        ],
        quote: "Expiry dates on guest accounts were the single easiest win in our security review.",
      },
    ],
    takeaways: [
      "Agree on governance principles before changing settings",
      "Pair a sensible default retention policy with targeted exceptions",
      "Use focused admin roles and limit high-impact permissions",
      "Give every guest a sponsor and an expiry date",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Collections                                                         */
/* ------------------------------------------------------------------ */

export type Collection = {
  slug: string;
  title: string;
  description: string;
  tone: Tone;
  icon: IconName;
  items: { title: string; href: string; type: string }[];
};

export const collections: Collection[] = [
  {
    slug: "sales-teams",
    title: "Resources for sales teams",
    description: `Playbooks, stories and product tours that help sales teams close faster in ${B}, from deal channels and CRM data to AI agents that prep every call for you.`,
    tone: "coral",
    icon: "briefcase",
    items: [
      { title: `${B} for sales teams`, href: "/solutions/sales", type: "Solution" },
      { title: "Bring CRM data into every conversation", href: "/features/crm", type: "Feature" },
      { title: "A CRM built into your workspace", href: "/crm", type: "Product" },
      { title: "AI agents that prep every call", href: "/ai-agents", type: "Product" },
      { title: "How Brightline swarms on customer cases", href: "/customer-stories/brightline-retail", type: "Customer story" },
      { title: "Building the business case for a work platform", href: "/resources/why-use-slack/building-the-business-case", type: "Guide" },
      { title: "How to run a product launch from one channel", href: "/resources/using-slack/run-a-product-launch-from-one-channel", type: "Guide" },
    ],
  },
  {
    slug: "service-teams",
    title: "Resources for service teams",
    description: `Everything service leaders need to resolve cases faster in ${B}: swarming playbooks, workflow automation, AI agents and stories from teams who switched.`,
    tone: "mint",
    icon: "headset",
    items: [
      { title: `${B} for customer service`, href: "/solutions/customer-service", type: "Solution" },
      { title: "How Vantage Bank moved 41,000 people onto one platform", href: "/customer-stories/vantage-bank", type: "Customer story" },
      { title: "Automate hand-offs with Workflow Builder", href: "/features/workflow-automation", type: "Feature" },
      { title: "Deploy AI agents for tier-one questions", href: "/ai-agents", type: "Product" },
      { title: "Swarm on escalations in a huddle", href: "/features/huddles", type: "Feature" },
      { title: "How to collaborate effectively in channels", href: "/resources/slack-101/collaborate-effectively-in-channels", type: "Guide" },
      { title: "Async standups people actually read", href: "/resources/using-slack/async-standups-people-actually-read", type: "Checklist" },
    ],
  },
  {
    slug: "productivity-platform",
    title: "Your productivity platform toolkit",
    description: `Guides, templates and tours that show how channels, canvases, lists, AI and automation fit together as one ${B} productivity platform for your whole team.`,
    tone: "violet",
    icon: "zap",
    items: [
      { title: `What is ${B} and how does it work?`, href: "/resources/why-use-slack/what-is-slack-and-how-does-it-work", type: "Explainer" },
      { title: "Ten ways to replace ineffective meetings", href: "/resources/using-slack/ten-ways-to-replace-ineffective-meetings", type: "Guide" },
      { title: "Winning in the AI era of work: rethinking email", href: "/resources/why-use-slack/rethinking-email-ai-conversations-work", type: "Report" },
      { title: "Plan and document in canvases", href: "/features/canvas", type: "Feature" },
      { title: "Track projects and requests with lists", href: "/features/task-list", type: "Feature" },
      { title: "Start faster with ready-made templates", href: "/templates/gallery", type: "Templates" },
      { title: "Take the interactive product tour", href: "/product-tour", type: "Tour" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export function getCategory(slug: string) {
  return resourceCategories.find((c) => c.slug === slug);
}

export function getGuide(category: string, slug: string) {
  return guides.find((g) => g.category === category && g.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}
