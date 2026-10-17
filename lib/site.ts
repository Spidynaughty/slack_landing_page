/**
 * Single source for brand naming. Rename the product everywhere by changing `name`.
 */
export const site = {
  name: "Sluck",
  domain: "sluck.example",
  url: "https://sluck.example",
  tagline: "Where work comes together",
  description:
    "Sluck is the AI-powered work platform where people, apps and agents collaborate in channels, huddles, canvases and lists.",
  twitter: "@sluck",
  year: 2026,
} as const;

export const B = site.name;
