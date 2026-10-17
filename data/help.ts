import type { IconName } from "@/components/ui/icon";
import type { Tone } from "@/lib/tones";
import { B, site } from "@/lib/site";
import type { ArticleSection } from "./types";

export type HelpCategory =
  | "Getting started"
  | "Messaging & channels"
  | "Workspace administration"
  | "Account & billing"
  | "Security & privacy"
  | "Integrations";

export type HelpArticle = {
  slug: string;
  title: string;
  category: HelpCategory;
  excerpt: string;
  /** ISO date */
  updatedAt: string;
  readMinutes: number;
  sections: ArticleSection[];
  /** Slugs of related help articles */
  related: string[];
};

export const helpCategories: { name: HelpCategory; icon: IconName; tone: Tone; description: string }[] = [
  {
    name: "Getting started",
    icon: "rocket",
    tone: "violet",
    description: `Set up your workspace, invite your team and learn the basics of ${B} in a few minutes.`,
  },
  {
    name: "Messaging & channels",
    icon: "messages",
    tone: "mint",
    description: "Organize conversations in channels, threads and huddles, and keep up with AI recaps.",
  },
  {
    name: "Workspace administration",
    icon: "settings",
    tone: "sky",
    description: "Manage members, permissions, retention and data exports for your whole organization.",
  },
  {
    name: "Account & billing",
    icon: "card",
    tone: "sun",
    description: "Update your plan, manage seats, download invoices and change payment details.",
  },
  {
    name: "Security & privacy",
    icon: "shieldCheck",
    tone: "coral",
    description: "Configure single sign-on, two-factor authentication and the controls that protect your data.",
  },
  {
    name: "Integrations",
    icon: "plug",
    tone: "pink",
    description: `Connect the apps your team already uses and bring their updates and actions into ${B}.`,
  },
];

export const helpArticles: HelpArticle[] = [
  {
    slug: "create-your-first-workspace",
    title: "Create your first workspace",
    category: "Getting started",
    excerpt: `Set up a new ${B} workspace, create your first channels and invite teammates in about ten minutes.`,
    updatedAt: "2026-10-06",
    readMinutes: 4,
    sections: [
      {
        id: "before-you-begin",
        heading: "Before you begin",
        paragraphs: [
          `A workspace is your organization's home in ${B}. It holds your channels, members, apps and files, and it has its own address, such as acme.${site.domain}. If your company already uses ${B}, ask an admin for an invitation instead of creating a new workspace, so your conversations stay in one place.`,
          "You will need a work email address you can access right away, because we send a six-digit confirmation code to verify it.",
        ],
      },
      {
        id: "create-the-workspace",
        heading: "Create the workspace",
        paragraphs: ["You can create a workspace from the desktop app, the mobile app or your browser. The steps are the same everywhere."],
        steps: [
          "Go to the sign-up page and enter your work email address, then click Continue.",
          "Enter the six-digit code we send to your inbox.",
          "Type your company or team name. This becomes the workspace name and suggests a workspace URL.",
          "Describe what your team is working on right now, such as Q4 launch. We use this to create your first channel.",
          "Click Create workspace. You will land in your new channel, ready to invite people.",
        ],
      },
      {
        id: "invite-your-team",
        heading: "Invite your team",
        paragraphs: [
          "Workspaces come alive once your teammates join. You can invite people by email, share an invitation link or allow anyone with your company email domain to join automatically.",
        ],
        steps: [
          "Click your workspace name in the top left, then choose Invite people.",
          "Enter email addresses separated by commas, or click Copy invite link to share a link instead.",
          "Optionally, choose the channels new members should join automatically.",
          "Click Send. Invitations expire after 30 days and can be resent from the Manage members page.",
        ],
      },
      {
        id: "next-steps",
        heading: "Next steps",
        paragraphs: [
          "Create a few channels around your projects or teams, set your notification preferences so you only hear about what matters, and connect one or two apps you use every day. Most teams find that three to five well-named channels are enough to get started.",
        ],
        bullets: [
          "Name channels by topic, such as proj-website-refresh or team-support",
          "Pin a short canvas in each channel explaining what it is for",
          "Encourage teammates to add a profile photo and a title",
        ],
      },
    ],
    related: ["set-notification-preferences", "connect-an-app-to-a-channel", "manage-billing-and-seats"],
  },
  {
    slug: "set-notification-preferences",
    title: "Set notification preferences",
    category: "Getting started",
    excerpt: "Choose when and how you are notified on desktop and mobile, schedule quiet hours and fine-tune alerts for individual channels.",
    updatedAt: "2026-09-22",
    readMinutes: 3,
    sections: [
      {
        id: "how-notifications-work",
        heading: "How notifications work",
        paragraphs: [
          `By default, ${B} notifies you about direct messages, mentions of your name and keywords you choose. Activity in channels appears as unread badges in your sidebar but does not send a notification unless you change that channel's settings.`,
          "If you are active on desktop, mobile notifications are held for a few minutes so your phone does not buzz while you are already at your computer.",
        ],
      },
      {
        id: "change-global-preferences",
        heading: "Change your global preferences",
        paragraphs: ["These settings apply to every workspace you belong to unless you override them per workspace."],
        steps: [
          "Click your profile photo in the sidebar, then choose Preferences.",
          "Select Notifications.",
          "Under Notify me about, choose All new messages, Direct messages, mentions and keywords, or Nothing.",
          "Add any keywords you want to be notified about, such as your team name or a project code.",
          "Under Mobile, choose how long to wait before sending notifications to your phone when you are inactive on desktop.",
        ],
      },
      {
        id: "schedule-quiet-hours",
        heading: "Schedule quiet hours",
        paragraphs: [
          "Notification schedules pause alerts outside your working hours. People who message you will see that you have notifications paused, and they can still choose to notify you for something urgent.",
        ],
        steps: [
          "Open Preferences, then Notifications.",
          "Under Notification schedule, choose Every day, Weekdays or Custom.",
          "Set your start and end times, then close Preferences. Changes save automatically.",
        ],
      },
      {
        id: "per-channel-settings",
        heading: "Fine-tune individual channels",
        paragraphs: [
          "For busy channels you only need to check occasionally, mute the channel so it stops appearing as unread. For critical channels, such as an incident channel, turn on notifications for every new message.",
        ],
        steps: [
          "Open the channel and click its name at the top of the conversation.",
          "Select Notifications, then choose Every new message, Just mentions or Off.",
          "To mute the channel completely, click Mute channel.",
        ],
      },
    ],
    related: ["create-your-first-workspace", "use-ai-recaps"],
  },
  {
    slug: "start-a-huddle",
    title: "Start a huddle",
    category: "Messaging & channels",
    excerpt: "Jump into a lightweight audio or video conversation from any channel or direct message, share your screen and keep notes in the thread.",
    updatedAt: "2026-10-01",
    readMinutes: 3,
    sections: [
      {
        id: "about-huddles",
        heading: "About huddles",
        paragraphs: [
          "Huddles are quick, informal audio and video conversations that live inside a channel or direct message. There is no link to send and no calendar invite to create. Anyone in the conversation can see that a huddle is happening and join with one click.",
          "Free workspaces can huddle with two people. Paid plans support up to 50 participants, with screen sharing, live captions and AI notes.",
        ],
      },
      {
        id: "start-a-huddle",
        heading: "Start or join a huddle",
        paragraphs: ["You can start a huddle from the desktop app or browser. On mobile, you can join huddles and start them in direct messages."],
        steps: [
          "Open the channel or direct message where you want to talk.",
          "Click the headphones icon in the top right of the conversation.",
          "Choose whether to start with your microphone on and camera off, or enable video right away.",
          "To join a huddle that is already happening, click Join in the green banner at the top of the channel.",
        ],
      },
      {
        id: "during-the-huddle",
        heading: "During the huddle",
        paragraphs: [
          "Messages, links and files shared during a huddle are saved in a thread in the channel, so people who could not join can catch up later. If AI notes are turned on, a summary with action items is posted to the thread when the huddle ends.",
        ],
        bullets: [
          "Click Share screen to present a window or your entire display",
          "Turn on live captions from the More actions menu",
          "Use reactions and emoji to respond without interrupting",
          "Click Leave to exit, or End for everyone if you started the huddle",
        ],
      },
    ],
    related: ["use-ai-recaps", "set-notification-preferences", "connect-an-app-to-a-channel"],
  },
  {
    slug: "use-ai-recaps",
    title: "Use AI recaps",
    category: "Messaging & channels",
    excerpt: "Catch up on busy channels, long threads and huddles with AI-generated recaps that lead with decisions and open questions.",
    updatedAt: "2026-09-30",
    readMinutes: 4,
    sections: [
      {
        id: "what-recaps-include",
        heading: "What recaps include",
        paragraphs: [
          "Recaps summarize activity you missed in channels, threads and huddles. Each recap starts with decisions that were made, then open questions that may need your input, and finally a short summary of other discussion. Every item links back to the original message.",
          `Recaps only use content you already have access to, and they are visible only to you. ${B} does not use your messages to train AI models.`,
        ],
      },
      {
        id: "get-a-recap",
        heading: "Get a recap of a channel",
        paragraphs: ["Recaps are available on all paid plans once a workspace admin has turned on AI features."],
        steps: [
          "Open a channel with unread messages.",
          "Click the sparkle icon next to the channel name, then choose Recap unread messages.",
          "To summarize a different period, choose Recap from, then pick Today, Last 7 days or a custom range.",
          "Click any item in the recap to jump to the original message in context.",
        ],
      },
      {
        id: "daily-recaps",
        heading: "Turn on daily recaps",
        paragraphs: [
          "Daily recaps deliver a single summary of the channels you choose each morning, so you can start the day without scrolling.",
        ],
        steps: [
          "Click Home in the sidebar, then select Recaps.",
          "Click Choose channels and select up to 25 channels to include.",
          "Choose a delivery time, then click Save.",
        ],
      },
      {
        id: "admin-controls",
        heading: "Admin controls",
        paragraphs: [
          "Workspace owners and admins can turn recaps on or off for the whole workspace, or exclude specific channels, such as those used by legal or HR. Go to Settings & administration, then Workspace settings, then AI to manage these options.",
        ],
      },
    ],
    related: ["start-a-huddle", "set-notification-preferences", "export-workspace-data"],
  },
  {
    slug: "set-up-saml-single-sign-on",
    title: "Set up SAML single sign-on",
    category: "Security & privacy",
    excerpt: "Let members sign in with your identity provider using SAML 2.0, enforce SSO for everyone and sync accounts automatically.",
    updatedAt: "2026-08-27",
    readMinutes: 6,
    sections: [
      {
        id: "requirements",
        heading: "Requirements",
        paragraphs: [
          `SAML single sign-on is available on the Business+ and Enterprise plans. You must be a workspace owner or an organization admin to configure it, and you will need administrator access to your identity provider.`,
          "We recommend testing SSO with a small group before requiring it for everyone, so nobody is locked out if a setting needs adjusting.",
        ],
        bullets: [
          "An identity provider that supports SAML 2.0",
          "Your identity provider's SSO URL, entity ID and X.509 signing certificate",
          "A verified email domain for your workspace",
        ],
      },
      {
        id: "configure-your-identity-provider",
        heading: "Configure your identity provider",
        paragraphs: [`Create a new SAML application in your identity provider for ${B}.`],
        steps: [
          "In your identity provider, create a new SAML 2.0 application.",
          `Set the Assertion Consumer Service URL to ${site.url}/sso/saml and the entity ID to ${site.url}.`,
          "Set the Name ID format to Email address and map it to the user's primary work email.",
          "Optionally, add attributes for first name, last name and title so profiles stay in sync.",
          "Assign the application to the people or groups who should have access, then copy the SSO URL and download the signing certificate.",
        ],
      },
      {
        id: "enable-sso",
        heading: `Enable SSO in ${B}`,
        paragraphs: ["Once your identity provider is ready, connect it to your workspace."],
        steps: [
          "Click your workspace name, then choose Settings & administration, then Workspace settings.",
          "Select the Security tab, then click Configure next to SAML authentication.",
          "Paste your SSO URL and identity provider issuer, then upload the X.509 certificate.",
          "Click Test configuration and sign in with your identity provider when prompted.",
          "Choose whether SSO is optional, required for members, or required for everyone including guests, then click Save configuration.",
        ],
      },
      {
        id: "troubleshooting",
        heading: "Troubleshooting",
        paragraphs: [
          "Most SSO errors come from a mismatched email address or an expired certificate. If a member cannot sign in, confirm that the email in their identity provider profile matches the one in their workspace profile exactly. Certificates should be rotated before they expire; you can upload a new one at any time from the same settings page without disrupting active sessions.",
        ],
      },
    ],
    related: ["export-workspace-data", "manage-billing-and-seats", "create-your-first-workspace"],
  },
  {
    slug: "export-workspace-data",
    title: "Export workspace data",
    category: "Workspace administration",
    excerpt: "Export messages and files from public channels, or from all conversations on eligible plans, for compliance, archiving or migration.",
    updatedAt: "2026-07-15",
    readMinutes: 5,
    sections: [
      {
        id: "what-you-can-export",
        heading: "What you can export",
        paragraphs: [
          "Workspace owners and admins on any plan can export messages and file links from public channels. On Business+ and Enterprise plans, owners can request an export of all conversations, including private channels and direct messages, once the request has been approved through our compliance review.",
          "Exports are delivered as a ZIP file containing JSON files organized by channel and date. File attachments are included as links that remain valid for 30 days.",
        ],
        bullets: [
          "Public channels: available to owners and admins on all plans",
          "All conversations: available to owners on Business+ and Enterprise plans",
          "Date ranges: export everything or a specific window",
          "Recurring exports: schedule daily, weekly or monthly exports on Enterprise",
        ],
      },
      {
        id: "start-an-export",
        heading: "Start an export",
        paragraphs: ["Large exports can take several hours. We will email you when the file is ready to download."],
        steps: [
          "Click your workspace name, then choose Settings & administration, then Workspace settings.",
          "Select Import/Export data in the top right, then click the Export tab.",
          "Choose an export date range, or select Entire history.",
          "Click Start export. You will receive an email and a direct message when it is ready.",
          "Return to the Export tab and click Ready for download. The file is available for seven days.",
        ],
      },
      {
        id: "handling-exports-securely",
        heading: "Handling exports securely",
        paragraphs: [
          "Export files can contain sensitive information, so treat them with the same care as the workspace itself. Download them only to managed devices, store them in an encrypted location and delete local copies once they are no longer needed. Every export request is recorded in your workspace audit log with the name of the person who started it.",
        ],
      },
    ],
    related: ["set-up-saml-single-sign-on", "manage-billing-and-seats"],
  },
  {
    slug: "manage-billing-and-seats",
    title: "Manage billing and seats",
    category: "Account & billing",
    excerpt: "Understand how seats are billed, add or remove members, switch between monthly and annual billing and download invoices.",
    updatedAt: "2026-10-09",
    readMinutes: 4,
    sections: [
      {
        id: "how-billing-works",
        heading: "How billing works",
        paragraphs: [
          `${B} bills only for active members. If someone on a paid plan stops using the workspace for 14 days, they are marked inactive and you receive a prorated credit for the rest of your billing period. If they return, they are reactivated automatically and billed from that day forward.`,
          "Guests are free up to a limit based on your plan: five single-channel guests for every paid member. Multi-channel guests are billed as regular members.",
        ],
      },
      {
        id: "add-or-remove-seats",
        heading: "Add or remove seats",
        paragraphs: ["On annual plans, you can add seats at any time and they are prorated for the rest of the term."],
        steps: [
          "Click your workspace name, then choose Settings & administration, then Billing.",
          "Select the Seats tab to see active, inactive and pending members.",
          "Click Add seats and enter the number you need, or deactivate members from the Manage members page to free up seats.",
          "Review the prorated charge, then click Confirm.",
        ],
      },
      {
        id: "invoices-and-payment",
        heading: "Invoices and payment methods",
        paragraphs: [
          "Invoices are emailed to your billing contacts on each billing date and are always available in the Billing section. Enterprise customers can pay by invoice; other plans are charged automatically to the card on file.",
        ],
        steps: [
          "Go to Settings & administration, then Billing, then Billing history.",
          "Click Download next to any invoice to save a PDF copy.",
          "To update your payment method or add a billing contact, select the Payment tab and click Edit.",
        ],
      },
    ],
    related: ["create-your-first-workspace", "export-workspace-data", "set-up-saml-single-sign-on"],
  },
  {
    slug: "connect-an-app-to-a-channel",
    title: "Connect an app to a channel",
    category: "Integrations",
    excerpt: "Add an app from the app directory, connect it to the channels where your team works and control which apps members can install.",
    updatedAt: "2026-09-12",
    readMinutes: 3,
    sections: [
      {
        id: "about-apps",
        heading: "About apps",
        paragraphs: [
          `Apps bring updates, alerts and actions from other tools into ${B}. Once connected to a channel, an app can post notifications, such as a new support ticket or a failed build, and let members take action without switching tools. The app directory lists more than 2,600 apps reviewed by our team.`,
          "Depending on your workspace settings, you may need an admin to approve an app before you can install it.",
        ],
      },
      {
        id: "add-an-app",
        heading: "Add an app to a channel",
        paragraphs: ["You can add apps from the channel itself or from the app directory."],
        steps: [
          "Open the channel and click its name at the top of the conversation.",
          "Select the Integrations tab, then click Add an app.",
          "Search for the app you want, then click Add. If the app is not installed yet, follow the prompts to authorize it.",
          "Choose which events the app should post about, such as new issues or deployments, then click Save.",
        ],
      },
      {
        id: "manage-app-approvals",
        heading: "Manage app approvals",
        paragraphs: [
          "Admins can require approval for new apps, pre-approve trusted apps and restrict what data apps can access. Members who request an app will see its status in their direct messages with the app approval bot.",
        ],
        steps: [
          "Click your workspace name, then choose Settings & administration, then Manage apps.",
          "Select App management settings and turn on Require app approval.",
          "Review pending requests under Requests, then click Approve or Restrict.",
        ],
      },
    ],
    related: ["start-a-huddle", "create-your-first-workspace", "use-ai-recaps"],
  },
];

export function getHelpArticle(slug: string) {
  return helpArticles.find((a) => a.slug === slug);
}
