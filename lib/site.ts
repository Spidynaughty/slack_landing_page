/**
 * Single source for brand naming. Rename the product everywhere by changing `name`.
 */
export const site = {
  name: "ktTeams",
  domain: "ktteams.example",
  url: "https://ktteams.example",
  tagline: "Where work comes together",
  description:
    "ktTeams is the AI-powered work platform where people, apps and agents collaborate in channels, huddles, canvases and lists.",
  twitter: "@ktteams",
  year: 2026,
} as const;

export const B = site.name;
