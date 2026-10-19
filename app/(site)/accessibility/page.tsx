import { Fragment } from "react";
import { Check, CircleDot } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Mockup } from "@/components/mockups";
import { AppFrame } from "@/components/mockups/parts";
import { CTABand, IconCardGrid, LinkChips, SplitFeature } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { ArrowLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { cn } from "@/lib/utils";

export const generateMetadata = () => buildMetadata({
  title: "Accessibility: our commitment and features",
  description: `See how ${B} works toward WCAG 2.2 AA with screen reader support, full keyboard navigation, high contrast, huddle captions and reduced motion options.`,
  path: "/accessibility",
});

const keyLabels: Record<string, string> = { "⌘": "Command", "↑": "Up arrow", "↓": "Down arrow" };

const shortcuts: { action: string; cmd: string[]; ctrl: string[] }[] = [
  { action: "Open the quick switcher", cmd: ["⌘", "K"], ctrl: ["Ctrl", "K"] },
  { action: "Search the current conversation", cmd: ["⌘", "F"], ctrl: ["Ctrl", "F"] },
  { action: "Jump to all unread messages", cmd: ["⌘", "Shift", "A"], ctrl: ["Ctrl", "Shift", "A"] },
  { action: "Move focus to the next app section", cmd: ["F6"], ctrl: ["F6"] },
  { action: "Go to the previous unread channel", cmd: ["Option", "Shift", "↑"], ctrl: ["Alt", "Shift", "↑"] },
  { action: "Go to the next unread channel", cmd: ["Option", "Shift", "↓"], ctrl: ["Alt", "Shift", "↓"] },
  { action: "Start or join a huddle", cmd: ["⌘", "Shift", "H"], ctrl: ["Ctrl", "Shift", "H"] },
  { action: "Turn huddle captions on or off", cmd: ["⌘", "Option", "C"], ctrl: ["Ctrl", "Alt", "C"] },
  { action: "Edit your last message", cmd: ["↑"], ctrl: ["↑"] },
  { action: "Mark everything as read", cmd: ["Shift", "Esc"], ctrl: ["Shift", "Esc"] },
  { action: "Show all keyboard shortcuts", cmd: ["⌘", "/"], ctrl: ["Ctrl", "/"] },
];

function Keys({ keys }: { keys: string[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      {keys.map((k, i) => (
        <Fragment key={`${k}-${i}`}>
          {i > 0 && (
            <span aria-hidden="true" className="text-xs text-subtle">
              +
            </span>
          )}
          <kbd className="inline-flex min-w-7 items-center justify-center rounded-md border border-line-strong bg-surface px-1.5 py-0.5 font-sans text-xs font-semibold text-fg shadow-[0_1px_0_var(--line-strong)]">
            {keyLabels[k] ? (
              <>
                <span aria-hidden="true">{k}</span>
                <span className="sr-only">{keyLabels[k]}</span>
              </>
            ) : (
              k
            )}
          </kbd>
        </Fragment>
      ))}
    </span>
  );
}

function PreferencesVisual() {
  const toggles = [
    { label: "Reduce motion", hint: "Pause animations and auto-playing previews", on: true },
    { label: "High contrast theme", hint: "Stronger borders, text and focus rings", on: true },
    { label: "Always underline links", hint: "Make links easy to spot", on: false },
    { label: "Announce new messages", hint: "Read incoming messages aloud in focus", on: true },
    { label: "Captions in huddles", hint: "Turn on live captions by default", on: true },
  ];
  return (
    <AppFrame
      title="Preferences · Accessibility"
      label="Accessibility preferences with reduced motion, high contrast, message announcements and huddle captions turned on, and display zoom set to 125 percent"
    >
      <div className="p-4 sm:p-6">
        <p className="text-sm font-bold text-fg">Accessibility</p>
        <p className="text-[0.72rem] text-muted">Settings follow you to every device</p>
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
          {toggles.map((t) => (
            <li key={t.label} className="flex items-center gap-3 px-3 py-2.5">
              <span className="min-w-0 flex-1">
                <span className="block text-[0.78rem] font-semibold text-fg">{t.label}</span>
                <span className="block truncate text-[0.66rem] text-muted">{t.hint}</span>
              </span>
              <span className={cn("relative inline-flex h-4 w-7 shrink-0 items-center rounded-full", t.on ? "bg-mint" : "bg-surface-3")}>
                <span className={cn("inline-block size-3 rounded-full bg-white shadow", t.on ? "translate-x-3.5" : "translate-x-0.5")} />
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-xl border border-line p-3">
          <p className="text-[0.78rem] font-semibold text-fg">Display zoom</p>
          <div className="mt-2 grid grid-cols-4 gap-1.5">
            {["100%", "125%", "150%", "200%"].map((z) => (
              <span
                key={z}
                className={cn(
                  "rounded-lg py-1.5 text-center text-[0.72rem] font-semibold",
                  z === "125%" ? "bg-primary text-primary-fg" : "bg-surface-2 text-muted",
                )}
              >
                {z}
              </span>
            ))}
          </div>
        </div>
      </div>
    </AppFrame>
  );
}

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Accessibility" }]}
        eyebrow="Accessibility"
        tone="mint"
        title={
          <>
            Work that works <span className="text-gradient">for everyone</span>
          </>
        }
        subtitle={`Whether you navigate by keyboard, listen with a screen reader, rely on captions or need a calmer screen, ${B} is designed so you can do your best work, your way.`}
        primary={{ label: "Share accessibility feedback", href: "#feedback" }}
        secondary={{ label: "Visit the Help Center", href: "/help" }}
        visual={<PreferencesVisual />}
      />

      {/* Conformance */}
      <Section bg="soft" labelledBy="conformance-heading">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <Reveal className="flex flex-col gap-5">
            <p className="inline-flex w-fit rounded-full bg-mint/15 px-3 py-1 text-xs font-bold tracking-[0.12em] text-mint-ink uppercase">
              Conformance statement
            </p>
            <h2 id="conformance-heading" className="text-display-md font-bold text-fg">
              Our target: WCAG 2.2 Level AA
            </h2>
            <p className="text-lead text-muted">
              We aim for every {B} web, desktop and mobile app to conform to the Web Content Accessibility Guidelines
              (WCAG) 2.2 at Level AA. Based on our most recent evaluation, the apps are partially conformant: the vast
              majority of the experience meets the standard, and we are actively fixing the known exceptions below.
            </p>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-fg">How we evaluate</h3>
              <ul className="mt-3 flex flex-col gap-2.5">
                {[
                  "Automated and manual checks on every release by our accessibility team",
                  "An annual independent audit against WCAG 2.2 AA",
                  "Testing with screen readers, magnifiers, voice control and switch devices",
                  "Paid research sessions with people with disabilities",
                ].map((m) => (
                  <li key={m} className="flex items-start gap-3 text-fg">
                    <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="flex flex-col gap-5">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line shadow-soft">
              {[
                { k: "Standard", v: "WCAG 2.2 AA" },
                { k: "Status", v: "Partially conformant" },
                { k: "Last evaluated", v: "September 2026" },
                { k: "Next review", v: "March 2027" },
              ].map((f) => (
                <div key={f.k} className="bg-surface p-5">
                  <dt className="text-xs font-bold tracking-[0.1em] text-subtle uppercase">{f.k}</dt>
                  <dd className="mt-1 font-display text-lg font-bold text-fg">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <h3 className="font-display text-lg font-bold text-fg">Known limitations</h3>
              <ul className="mt-3 flex flex-col gap-3 text-sm text-muted">
                {[
                  "Some older canvas templates use tables without header cells. Updated templates ship in December 2026.",
                  "Drawing on a shared screen in huddles is not yet available to keyboard-only users.",
                  "Charts in workspace analytics need richer text alternatives; a data table view is in progress.",
                  "Third-party marketplace apps are reviewed, but may not fully meet our standards.",
                ].map((l) => (
                  <li key={l} className="flex items-start gap-2.5">
                    <CircleDot className="mt-0.5 size-4 shrink-0 text-sun-ink" aria-hidden="true" />
                    {l}
                  </li>
                ))}
              </ul>
              <ArrowLink href="/contact-sales" className="mt-5 text-sm">
                Request our Accessibility Conformance Report
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Features */}
      <Section>
        <SectionHeader
          eyebrow="Built in, not bolted on"
          tone="mint"
          title="Accessibility features for every way of working"
          subtitle="These features are available on every plan and every device, with no extra setup or add-ons required."
        />
        <IconCardGrid
          items={[
            {
              icon: "ear",
              title: "Screen reader support",
              body: "Semantic structure, labeled controls and live announcements for new messages, mentions and huddle activity on desktop and mobile.",
            },
            {
              icon: "keyboard",
              title: "Full keyboard navigation",
              body: "Reach every feature without a mouse, with visible focus states, skip links and shortcuts for the actions you use most.",
            },
            {
              icon: "contrast",
              title: "High contrast themes",
              body: "Light and dark high contrast themes strengthen text, borders and focus rings, and every theme meets AA contrast ratios.",
            },
            {
              icon: "captions",
              title: "Captions in huddles",
              body: "Live captions for audio and video huddles, with searchable transcripts saved to the channel when the huddle ends.",
            },
            {
              icon: "activity",
              title: "Reduced motion",
              body: "Follow your system setting or switch it on in preferences to pause animations, auto-playing GIFs and video previews.",
            },
            {
              icon: "scan",
              title: "Zoom and text sizing",
              body: "Scale the interface up to 200% without losing content or functionality, and set message text size independently.",
            },
          ]}
        />
      </Section>

      {/* Captions split */}
      <Section bg="mint">
        <SplitFeature
          eyebrow="Huddles"
          tone="mint"
          title="Every word captured, for everyone in the room"
          body="Turn on captions with one click or by default. Speakers are labeled, captions can be resized and repositioned, and the full transcript lands in the channel so anyone can catch up later at their own pace."
          bullets={[
            "Live captions in more than 20 languages",
            "Adjustable caption size and position",
            "Searchable transcripts saved automatically",
          ]}
          visual={<Mockup kind="huddle" />}
          cta={{ label: "Explore huddles", href: "/features/huddles" }}
        />
      </Section>

      {/* Shortcuts */}
      <Section labelledBy="shortcuts-heading">
        <SectionHeader
          eyebrow="Keyboard shortcuts"
          id="shortcuts-heading"
          title="Move faster without a mouse"
          subtitle="Use the Command column on keyboards with a ⌘ key and the Control column everywhere else. You can see every shortcut in the app at any time."
        />
        <Reveal className="mx-auto max-w-4xl overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left">
              <caption className="sr-only">Common {B} keyboard shortcuts for Command-key and Control-key keyboards</caption>
              <thead>
                <tr className="border-b border-line bg-surface-2">
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-muted sm:px-6">
                    Action
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-muted sm:px-6">
                    Command key
                  </th>
                  <th scope="col" className="px-5 py-4 text-sm font-semibold text-muted sm:px-6">
                    Control key
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {shortcuts.map((s) => (
                  <tr key={s.action}>
                    <th scope="row" className="px-5 py-3.5 text-sm font-medium text-fg sm:px-6">
                      {s.action}
                    </th>
                    <td className="px-5 py-3.5 sm:px-6">
                      <Keys keys={s.cmd} />
                    </td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <Keys keys={s.ctrl} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Section>

      {/* Feedback */}
      <Section bg="soft" id="feedback" labelledBy="feedback-heading">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="flex flex-col items-start gap-5">
            <p className="inline-flex rounded-full bg-primary/12 px-3 py-1 text-xs font-bold tracking-[0.12em] text-primary uppercase">
              Feedback
            </p>
            <h2 id="feedback-heading" className="text-display-md font-bold text-fg">
              Tell us where we can do better
            </h2>
            <p className="text-lead text-muted">
              If something in {B} is hard to use with your assistive technology, or you have an idea that would make it
              better, we want to hear it. Our accessibility team reads every message and replies within two business days.
            </p>
            <ul className="flex flex-col gap-3 text-fg">
              {[
                "Tell us which device, app and assistive technology you use",
                "Describe what you were trying to do and what happened",
                "Request content in an alternative format",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-mint-ink" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-2 w-full rounded-2xl bg-tint-mint p-5">
              <p className="font-semibold text-fg">Looking for how-to guides?</p>
              <p className="mt-1 text-sm text-muted">
                Step-by-step help for screen readers, keyboard navigation, captions and display settings.
              </p>
              <ArrowLink href="/help" className="mt-3 text-sm">
                Browse the Help Center
              </ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="mb-6 font-display text-xl font-bold text-fg">Send accessibility feedback</h3>
            <LeadForm
              formName="Accessibility feedback"
              submitLabel="Send feedback"
              successTitle="Thank you for your feedback"
              successBody="Our accessibility team will review your message and reply within two business days."
              fields={[
                { name: "name", label: "Full name", autoComplete: "name", half: true },
                { name: "email", label: "Email address", type: "email", required: true, autoComplete: "email", half: true },
                {
                  name: "platform",
                  label: "Where did this happen?",
                  type: "select",
                  options: ["Web browser", "Desktop app", "Mobile app", "Huddle", "Marketing website"],
                  half: true,
                },
                {
                  name: "technology",
                  label: "Assistive technology",
                  type: "select",
                  options: ["Screen reader", "Screen magnifier", "Voice control", "Switch access", "Keyboard only", "Captions", "Other or none"],
                  half: true,
                },
                {
                  name: "details",
                  label: "What happened?",
                  type: "textarea",
                  required: true,
                  placeholder: "Describe what you were trying to do and where you got stuck.",
                },
                { name: "followUp", label: "You can contact me about this feedback.", type: "checkbox" },
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <Section className="!pt-0" bg="soft">
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <p className="text-sm font-semibold text-muted">More ways we build for everyone</p>
          <LinkChips
            className="justify-center"
            links={[
              { label: "Help Center", href: "/help", icon: "lifebuoy" },
              { label: "Huddles", href: "/features/huddles", icon: "headphones" },
              { label: "Downloads", href: "/downloads", icon: "download" },
              { label: "Trust Center", href: "/trust", icon: "shieldCheck" },
              { label: "Contact support", href: "/contact", icon: "message" },
            ]}
          />
        </Reveal>
      </Section>

      <CTABand
        title="Built for every member of your team"
        subtitle="Try it free with your team, or talk to us about accessibility requirements for your organization."
        primary={{ label: "Get started free", href: "/get-started" }}
        secondary={{ label: "Talk to sales", href: "/contact-sales" }}
      />
    </>
  );
}
