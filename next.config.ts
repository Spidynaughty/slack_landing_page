import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Alternate URLs used by the reference site, mapped to their pages here.
  async redirects() {
    return [
      { source: "/get", destination: "/downloads", permanent: true },
      { source: "/templates", destination: "/templates/gallery", permanent: true },
      { source: "/team-chat", destination: "/features/team-chat", permanent: true },
      { source: "/document-sharing", destination: "/features/document-sharing", permanent: true },
      { source: "/security", destination: "/trust/security", permanent: true },
      { source: "/salesforce-slack-integration", destination: "/features/crm", permanent: true },
      { source: "/why/slack-vs-email", destination: "/compare/slack-vs-email", permanent: true },
      { source: "/solutions/distance-learning", destination: "/solutions/education", permanent: true },
      { source: "/trust/privacy/privacy-policy", destination: "/legal/privacy", permanent: true },
      { source: "/trust/privacy-at-slack", destination: "/trust/privacy", permanent: true },
      { source: "/resources/why-use-slack/what-is-slack", destination: "/resources/why-use-slack/what-is-slack-and-how-does-it-work", permanent: true },
      { source: "/features/slackbot/demo-slackbot", destination: "/features/slackbot/demo", permanent: true },
    ];
  },
};

export default nextConfig;
