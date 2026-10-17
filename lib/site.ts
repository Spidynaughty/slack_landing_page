/**
 * Single source for brand naming. Rename the product everywhere by changing `name`.
 */
export const site = {
  name: "YourBrand",
  domain: "yourbrand.example",
  url: "https://yourbrand.example",
  tagline: "Where work comes together",
  description:
    "YourBrand is the AI-powered work platform where people, apps and agents collaborate in channels, huddles, canvases and lists.",
  twitter: "@yourbrand",
  year: 2026,
} as const;

export const B = site.name;
