import Link from "next/link";
import { ArrowRight, Check, Clock, Eye, MapPin, MessageCircle } from "lucide-react";
import { events } from "@/data/events";
import { LeadForm } from "@/components/forms/lead-form";
import { CTABand, IconCardGrid, SplitFeature, StatsBand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Eyebrow, Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneAt, toneStyles, type Tone } from "@/lib/tones";
import { cn, monthDay } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Community: chapters, meetups and champions",
  description: `Join the ${B} community to meet local chapters, attend meetups, swap tips in popular discussions and grow as a champion with peers worldwide.`,
  path: "/community",
});

const chapters: { city: string; region: string; members: string; cadence: string; leads: string[] }[] = [
  { city: "San Francisco Bay Area", region: "North America", members: "6,400", cadence: "Monthly meetups", leads: ["AT", "MC"] },
  { city: "New York City", region: "North America", members: "5,100", cadence: "Monthly meetups", leads: ["JR", "SK"] },
  { city: "Toronto", region: "North America", members: "2,300", cadence: "Every six weeks", leads: ["PD"] },
  { city: "London", region: "Europe", members: "4,800", cadence: "Monthly meetups", leads: ["OA", "HL"] },
  { city: "Berlin", region: "Europe", members: "2,700", cadence: "Monthly meetups", leads: ["FW"] },
  { city: "Bengaluru", region: "Asia Pacific", members: "5,600", cadence: "Monthly meetups", leads: ["SI", "NK"] },
  { city: "Tokyo", region: "Asia Pacific", members: "3,200", cadence: "Quarterly meetups", leads: ["YT"] },
  { city: "São Paulo", region: "Latin America", members: "2,900", cadence: "Every six weeks", leads: ["LR", "BM"] },
];

const groups: { name: string; body: string; members: string; icon: IconName; tone: Tone }[] = [
  {
    name: "Admins Guild",
    body: "Workspace owners and IT teams trading notes on governance, security settings and large rollouts.",
    members: "14,200 members",
    icon: "shieldCheck",
    tone: "sky",
  },
  {
    name: "Builders Collective",
    body: "Developers building apps, bots and agents on the platform, with weekly office hours.",
    members: "21,500 members",
    icon: "code",
    tone: "violet",
  },
  {
    name: "Workflow Wizards",
    body: "No-code automation fans sharing templates, clever triggers and Workflow Builder tips.",
    members: "18,300 members",
    icon: "workflow",
    tone: "sun",
  },
  {
    name: "Accessibility Circle",
    body: "People advancing inclusive collaboration, from live captions to screen reader workflows.",
    members: "4,200 members",
    icon: "accessibility",
    tone: "mint",
  },
];

const discussions: {
  title: string;
  category: string;
  author: string;
  initials: string;
  replies: number;
  views: string;
  last: string;
  status?: "Solved" | "Trending";
}[] = [
  {
    title: "Share your favorite Workflow Builder templates for new-hire onboarding",
    category: "Workflows",
    author: "Lucia Romero",
    initials: "LR",
    replies: 142,
    views: "9.8K",
    last: "1 hour ago",
    status: "Trending",
  },
  {
    title: "How are you structuring channels for a 2,000-person rollout?",
    category: "Admins and IT",
    author: "Dana Moreau",
    initials: "DM",
    replies: 86,
    views: "4.1K",
    last: "12 minutes ago",
    status: "Trending",
  },
  {
    title: "Best practices for scoping your first AI agent",
    category: "AI and agents",
    author: "Kwame Asante",
    initials: "KA",
    replies: 64,
    views: "3.6K",
    last: "3 hours ago",
    status: "Solved",
  },
  {
    title: "Tips for running async standups across five time zones",
    category: "Productivity",
    author: "Mei Chen",
    initials: "MC",
    replies: 97,
    views: "5.2K",
    last: "Yesterday",
  },
  {
    title: "Webhook retries: which backoff strategy works best for you?",
    category: "Developers",
    author: "Tobias Lind",
    initials: "TL",
    replies: 38,
    views: "1.9K",
    last: "Yesterday",
    status: "Solved",
  },
  {
    title: "Making huddles work better for teammates who are hard of hearing",
    category: "Accessibility",
    author: "Sanjay Iyer",
    initials: "SI",
    replies: 45,
    views: "2.3K",
    last: "2 days ago",
    status: "Solved",
  },
];

function CommunityVisual() {
  const messages: { initials: string; name: string; tone: Tone; text: string; time: string }[] = [
    { initials: "OA", name: "Olu Adeyemi", tone: "mint", text: "Slides from last night's London meetup are pinned. Thanks to everyone who came out!", time: "9:12 AM" },
    { initials: "MC", name: "Mei Chen", tone: "pink", text: "That approval workflow demo saved my team a whole afternoon. Sharing the template now.", time: "9:20 AM" },
    { initials: "KA", name: "Kwame Asante", tone: "sun", text: "Anyone going to the Chicago lab in December? Let's grab lunch.", time: "9:31 AM" },
  ];
  return (
    <div className="relative" aria-hidden="true">
      <div className="rounded-[var(--radius-panel)] border border-line bg-surface p-5 shadow-float sm:p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <p className="flex items-center gap-1.5 font-display text-lg font-bold text-fg">
            <Icon name="hash" className="size-5 text-primary" />
            community-builders
          </p>
          <span className="rounded-full bg-mint/15 px-2.5 py-1 text-xs font-bold text-mint-ink">1,284 online</span>
        </div>
        <ul className="mt-4 flex flex-col gap-4">
          {messages.map((m) => (
            <li key={m.initials} className="flex gap-3">
              <span className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold", toneStyles[m.tone].solid)}>
                {m.initials}
              </span>
              <div>
                <p className="text-sm">
                  <span className="font-bold text-fg">{m.name}</span> <span className="text-xs text-subtle">{m.time}</span>
                </p>
                <p className="text-sm text-muted">{m.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute -top-5 -right-3 hidden animate-float items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-float sm:flex lg:-right-8">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-sun text-deep">
          <Icon name="medal" className="size-4" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">New champion</span>
          <span className="text-muted">Welcome, Lucia!</span>
        </span>
      </div>
      <div className="absolute -bottom-6 -left-3 hidden animate-float items-center gap-2 rounded-2xl border border-line bg-surface px-3 py-2.5 shadow-float [animation-delay:-3s] sm:flex lg:-left-8">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-primary text-primary-fg">
          <Icon name="calendar" className="size-4" />
        </span>
        <span className="text-xs">
          <span className="block font-bold text-fg">Next meetup</span>
          <span className="text-muted">London · Nov 12</span>
        </span>
      </div>
    </div>
  );
}

function ChampionCard() {
  return (
    <div className="deep-adaptive relative mx-auto max-w-md rounded-[var(--radius-panel)] border border-line bg-deep p-7 text-on-deep shadow-float sm:p-8 dark:border-transparent">
      <div aria-hidden="true" className="absolute inset-0 rounded-[var(--radius-panel)] bg-dots opacity-10" />
      <div className="relative flex items-center gap-4">
        <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-sun text-deep">
          <Icon name="medal" className="size-8" />
        </span>
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-on-deep-muted uppercase">{B} Champion</p>
          <p className="font-display text-2xl font-bold text-white">Class of 2026</p>
        </div>
      </div>
      <ul className="relative mt-6 grid grid-cols-3 gap-3 text-center">
        {[
          { v: "420", l: "Champions" },
          { v: "48", l: "Countries" },
          { v: "1.2K", l: "Talks given" },
        ].map((s) => (
          <li key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <span className="block font-display text-2xl font-extrabold text-white">{s.v}</span>
            <span className="block text-xs text-on-deep-muted">{s.l}</span>
          </li>
        ))}
      </ul>
      <p className="relative mt-6 text-sm text-on-deep-muted">
        “Becoming a champion connected me with people solving the exact problems I was. I have learned more in a year
        than in the five before it.”
      </p>
      <p className="relative mt-2 text-sm font-semibold text-white">Lucia Romero, Operations Lead and Champion</p>
    </div>
  );
}

export default function CommunityPage() {
  const upcoming = events
    .filter((e) => e.format !== "On demand")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <>
      <PageHero
        crumbs={navCrumbs("/community", { section: "resources", label: "Community" })}
        eyebrow="Community"
        tone="mint"
        title={
          <>
            Find your people. <span className="text-gradient">Learn faster together.</span>
          </>
        }
        subtitle={`The ${B} community brings together admins, builders and everyday power users in local chapters, online groups and events around the world.`}
        primary={{ label: "Join the community", href: "/community#join" }}
        secondary={{ label: "Browse events", href: "/events" }}
        note="Free to join. Open to customers, partners and the simply curious."
        visual={<CommunityVisual />}
      />

      <StatsBand
        stats={[
          { value: 180, suffix: "K+", label: "community members" },
          { value: 120, suffix: "+", label: "local chapters" },
          { value: 65, label: "countries represented" },
          { value: 900, suffix: "+", label: "meetups every year" },
        ]}
      />

      <Section>
        <SectionHeader
          eyebrow="Get involved"
          tone="mint"
          title="Many ways to take part"
          subtitle="Show up for an evening meetup, answer a question online or share what you have built. However you join, you will leave with ideas."
        />
        <IconCardGrid
          columns={4}
          items={[
            { icon: "pin", title: "Join a local chapter", body: "Meet nearby customers at regular meetups hosted by volunteer leaders.", href: "/community#chapters", cta: "Find a chapter" },
            { icon: "calendar", title: "Attend an event", body: "From evening meetups to our annual Summit, there is always something coming up.", href: "/events", cta: "See events" },
            { icon: "graduation", title: "Get certified", body: "Prove your skills with official certifications and earn a shareable badge.", href: "/certified", cta: "Explore certifications" },
            { icon: "code", title: "Build and share", body: "Publish apps, workflows and agents and get feedback from fellow builders.", href: "/developers", cta: "Start building" },
          ]}
        />
      </Section>

      {/* Chapters and groups */}
      <Section bg="soft" id="chapters">
        <SectionHeader
          eyebrow="Chapters and groups"
          tone="sky"
          title="Local chapters, global conversations"
          subtitle="Chapters meet in person to share tips and stories. Interest groups gather online around a shared role or passion."
        />
        <h3 className="mb-5 font-display text-xl font-bold text-fg">Featured local chapters</h3>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((c, i) => {
            const t = toneStyles[toneAt(i)];
            return (
              <StaggerItem key={c.city} lift className="h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-soft">
                  <div className={cn("relative flex h-24 items-end p-5", t.tint)}>
                    <div aria-hidden="true" className="absolute inset-0 bg-dots opacity-30" />
                    <span className={cn("relative rounded-full px-2.5 py-1 text-xs font-bold", t.solid)}>{c.region}</span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-display text-lg font-bold text-fg">{c.city}</h4>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <Icon name="users" className="size-4" />
                      {c.members} members
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <Icon name="calendarDays" className="size-4" />
                      {c.cadence}
                    </p>
                    <div className="mt-auto flex items-center gap-2 border-t border-line pt-4">
                      <span className="flex -space-x-1.5" aria-hidden="true">
                        {c.leads.map((l, j) => (
                          <span
                            key={l}
                            className={cn("inline-flex size-7 items-center justify-center rounded-full text-[0.65rem] font-bold ring-2 ring-surface", toneStyles[toneAt(i + j + 2)].solid)}
                          >
                            {l}
                          </span>
                        ))}
                      </span>
                      <span className="text-xs text-subtle">
                        {c.leads.length} chapter {c.leads.length === 1 ? "lead" : "leads"}
                      </span>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <h3 className="mt-14 mb-5 font-display text-xl font-bold text-fg">Online interest groups</h3>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((g) => (
            <StaggerItem key={g.name} className="h-full">
              <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft">
                <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", toneStyles[g.tone].soft)}>
                  <Icon name={g.icon} className="size-5" />
                </span>
                <h4 className="mt-4 font-display text-lg font-bold text-fg">{g.name}</h4>
                <p className="mt-1.5 flex-1 text-sm text-muted">{g.body}</p>
                <p className={cn("mt-4 text-sm font-semibold", toneStyles[g.tone].ink)}>{g.members}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10 flex flex-col items-center gap-2 text-center">
          <p className="text-muted">Don&apos;t see a chapter near you? We will help you start one.</p>
          <ArrowLink href="/contact">Talk to the community team</ArrowLink>
        </Reveal>
      </Section>

      {/* Upcoming meetups */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex flex-col items-start gap-5 lg:sticky lg:top-28 lg:self-start">
            <SectionHeader
              align="left"
              className="!mb-0"
              eyebrow="Upcoming"
              tone="sun"
              title="Meetups and events"
              subtitle="Join a session online or meet the community in person. Most events are free, and recordings are shared afterward."
            />
            <ArrowLink href="/events">See the full events calendar</ArrowLink>
          </div>
          <Stagger as="ul" className="flex flex-col gap-4">
            {upcoming.map((e) => {
              const d = monthDay(e.date);
              const t = toneStyles[e.tone];
              return (
                <StaggerItem as="li" key={e.slug}>
                  <Link
                    href={`/events/${e.slug}`}
                    className="group/evt flex items-center gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card sm:gap-5 sm:p-5"
                  >
                    <span className={cn("flex size-16 shrink-0 flex-col items-center justify-center rounded-2xl leading-none", t.solid)}>
                      <span className="text-[0.7rem] font-bold uppercase">{d.month}</span>
                      <span className="font-display text-2xl font-extrabold">{d.day}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-bold", t.soft)}>{e.category}</span>
                        <span className="text-xs font-semibold text-subtle">{e.format}</span>
                      </span>
                      <span className="mt-1.5 block font-display text-lg leading-snug font-bold text-fg">{e.title}</span>
                      <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" aria-hidden="true" />
                          {e.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="size-3.5" aria-hidden="true" />
                          {e.time}
                        </span>
                      </span>
                    </span>
                    <ArrowRight className="hidden size-5 shrink-0 text-primary transition-transform group-hover/evt:translate-x-1 sm:block" aria-hidden="true" />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Section>

      {/* Champions */}
      <Section bg="sun">
        <SplitFeature
          eyebrow="Champions program"
          tone="sun"
          title="Recognizing the people who lift everyone up"
          body={`Champions are community members who go above and beyond: hosting meetups, answering questions and sharing what they know. In return, they get a closer relationship with the ${B} team and a few well-earned perks.`}
          bullets={[
            "Private roadmap briefings and early access to new features",
            "An invitation to the annual Champions Summit, with travel covered",
            "A free certification exam voucher every year",
            "A direct line to product managers and designers",
          ]}
          visual={<ChampionCard />}
          cta={{ label: "Apply to become a champion", href: "/community#join" }}
        />
      </Section>

      {/* Popular discussions */}
      <Section>
        <SectionHeader
          eyebrow="Discussions"
          tone="pink"
          title="Popular discussions this week"
          subtitle="A peek at what members are talking about in the community forums. Join to ask questions, share answers and follow topics."
        />
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-card">
          <div className="hidden grid-cols-[1fr_6rem_6rem_8rem] gap-4 border-b border-line bg-surface-2 px-6 py-3 text-xs font-bold tracking-[0.1em] text-subtle uppercase md:grid">
            <span>Topic</span>
            <span className="text-center">Replies</span>
            <span className="text-center">Views</span>
            <span className="text-right">Last activity</span>
          </div>
          <ul className="divide-y divide-line">
            {discussions.map((d, i) => (
              <li key={d.title} className="grid gap-3 px-5 py-5 sm:px-6 md:grid-cols-[1fr_6rem_6rem_8rem] md:items-center md:gap-4">
                <div className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold", toneStyles[toneAt(i + 1)].solid)}
                  >
                    {d.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug text-fg">{d.title}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                      <span className="rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-fg">{d.category}</span>
                      <span>Started by {d.author}</span>
                      {d.status && (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold",
                            d.status === "Solved" ? toneStyles.mint.soft : toneStyles.coral.soft,
                          )}
                        >
                          {d.status === "Solved" ? <Check className="size-3" aria-hidden="true" /> : <Icon name="flame" className="size-3" />}
                          {d.status}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pl-13 text-xs text-subtle md:hidden">
                  <span className="inline-flex items-center gap-1">
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                    {d.replies} replies
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye className="size-3.5" aria-hidden="true" />
                    {d.views} views
                  </span>
                  <span>{d.last}</span>
                </p>
                <p className="hidden text-center text-sm md:block">
                  <span className="font-semibold text-fg">{d.replies}</span>
                  <span className="sr-only"> replies</span>
                </p>
                <p className="hidden text-center text-sm md:block">
                  <span className="font-semibold text-fg">{d.views}</span>
                  <span className="sr-only"> views</span>
                </p>
                <p className="hidden text-right text-sm text-subtle md:block">{d.last}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* Join */}
      <Section bg="soft" id="join">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col items-start gap-5">
            <Eyebrow tone="mint">Join us</Eyebrow>
            <h2 className="text-display-md font-bold text-fg">Become part of the community</h2>
            <p className="text-lead text-muted">
              Sign up once to get chapter invites, access to the forums and a monthly digest of the best tips, templates
              and events.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Invitations to meetups and workshops near you",
                "Full access to forums and online interest groups",
                "Early registration for Summit and community events",
                "A monthly digest of templates, tips and member stories",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 text-fg">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                    <Check className="size-3.5" aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-2 w-full rounded-[var(--radius-card)] border border-line bg-surface p-5">
              <h3 className="font-display text-lg font-bold text-fg">Our community guidelines</h3>
              <p className="mt-1.5 text-sm text-muted">
                Be kind, be helpful and keep it safe. Respect different experience levels, never share confidential
                customer data and leave sales pitches at the door. Moderators keep every space welcoming.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="font-display text-2xl font-bold text-fg">Create your community profile</h3>
            <p className="mt-1 mb-6 text-sm text-muted">It takes less than a minute.</p>
            <LeadForm
              fields={[
                { name: "firstName", label: "First name", required: true, autoComplete: "given-name", half: true },
                { name: "lastName", label: "Last name", required: true, autoComplete: "family-name", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
                { name: "company", label: "Company or organization", autoComplete: "organization", half: true },
                {
                  name: "role",
                  label: "Your role",
                  type: "select",
                  half: true,
                  options: ["Workspace admin or IT", "Developer", "Team lead or manager", "Operations", "Individual contributor", "Student or educator"],
                },
                {
                  name: "chapter",
                  label: "Nearest chapter",
                  type: "select",
                  half: true,
                  options: [...chapters.map((c) => c.city), "No chapter near me yet"],
                },
                {
                  name: "experience",
                  label: `Experience with ${B}`,
                  type: "select",
                  half: true,
                  options: ["Just getting started", "Everyday user", "Power user", "Expert or admin"],
                },
                { name: "conduct", label: "I agree to follow the community guidelines and code of conduct.", type: "checkbox", required: true },
              ]}
              submitLabel="Join the community"
              successTitle="Welcome to the community!"
              successBody="Check your inbox for a welcome note with links to your nearest chapter and the forums."
            />
          </Reveal>
        </div>
      </Section>

      <CTABand
        title="Learn something new every week"
        subtitle="Explore guides, templates and on-demand sessions from the community and our product experts."
        primary={{ label: "Browse resources", href: "/resources" }}
        secondary={{ label: "See upcoming events", href: "/events" }}
      />
    </>
  );
}
