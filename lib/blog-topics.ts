import type { PostCategory } from "@/data/posts";
import type { Tone } from "@/lib/tones";
import { B } from "@/lib/site";

export type BlogTopic = { slug: string; category: PostCategory; title: string; highlight: string; subtitle: string; tone: Tone; seo: { title: string; description: string } };

/** Topic pages under /blog/topic. News, Engineering and Design keep their dedicated listing pages. */
export const blogTopics: BlogTopic[] = [
  {
    slug: "product",
    category: "Product",
    title: "Product updates and deep dives",
    highlight: "deep dives",
    subtitle: `What we're building, why we built it and how teams are putting new ${B} features to work.`,
    tone: "violet",
    seo: {
      title: "Product blog: updates and deep dives",
      description: `Product announcements, feature deep dives and behind-the-scenes stories from the team building ${B}, from Lists and canvases to shared channels.`,
    },
  },
  {
    slug: "ai",
    category: "AI",
    title: "AI and agents at work",
    highlight: "agents",
    subtitle: "How we design trustworthy AI, what we're learning from agents in the wild and where work is heading next.",
    tone: "pink",
    seo: {
      title: "AI blog: agents, recaps and trust",
      description: `Articles on AI at work from the ${B} team: designing agents people trust, recaps that save hours, and lessons from teams deploying AI at scale.`,
    },
  },
  {
    slug: "productivity",
    category: "Productivity",
    title: "Productivity and the future of work",
    highlight: "future of work",
    subtitle: "Research and practical advice on focus, meetings, async rituals and building healthier ways of working.",
    tone: "mint",
    seo: {
      title: "Productivity blog: research and advice",
      description: `Research-backed advice on focus time, fewer meetings, async rituals and healthier team habits from the ${B} Future of Work Lab and product teams.`,
    },
  },
];

/** Where every post category lives, for topic navigation. */
export const categoryHref: Record<PostCategory, string> = {
  Product: "/blog/topic/product",
  AI: "/blog/topic/ai",
  Productivity: "/blog/topic/productivity",
  News: "/blog/news",
  Engineering: "/engineering-blog",
  Design: "/design-blog",
};

export function getBlogTopic(slug: string) {
  return blogTopics.find((t) => t.slug === slug);
}
