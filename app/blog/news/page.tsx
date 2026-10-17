import { posts } from "@/data/posts";
import { ListingPage } from "@/components/templates/listing-page";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { postItems } from "@/lib/listing-items";

export const metadata = buildMetadata({
  title: "Newsroom",
  description: `The latest announcements, product launches, partnerships and company news from ${B}. Press inquiries and media resources in one place.`,
  path: "/blog/news",
});

export default function NewsPage() {
  return (
    <ListingPage
      crumbs={[{ label: "Blog", href: "/blog" }, { label: "News" }]}
      eyebrow="Newsroom"
      tone="coral"
      title="Company news and announcements"
      subtitle={`Launches, milestones and updates from the team behind ${B}. Members of the press can find logos and executive bios in our media kit.`}
      items={postItems(posts.filter((p) => p.category === "News"))}
      cardStyle="post"
      label="news stories"
      searchPlaceholder="Search news"
      primary={{ label: "Media kit", href: "/media-kit" }}
      secondary={{ label: "Contact press", href: "/contact" }}
    />
  );
}
