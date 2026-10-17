import { posts } from "@/data/posts";
import { ListingPage } from "@/components/templates/listing-page";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { postItems } from "@/lib/listing-items";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Engineering blog",
  description: `How the ${B} engineering team builds real-time infrastructure, search, AI and developer tools at global scale. Deep dives, postmortems and lessons learned.`,
  path: "/engineering-blog",
});

export default function EngineeringBlogPage() {
  return (
    <ListingPage
      crumbs={navCrumbs("/blog", { section: "resources", label: "Blog" }, [{ label: "Engineering blog" }])}
      eyebrow="Engineering"
      tone="sky"
      title={
        <>
          Notes from the <span className="text-gradient">engine room</span>
        </>
      }
      subtitle="Deep dives into the systems that deliver billions of messages a day, from real-time delivery and search to AI infrastructure."
      items={postItems(posts.filter((p) => p.category === "Engineering"))}
      cardStyle="post"
      label="engineering articles"
      searchPlaceholder="Search engineering articles"
      primary={{ label: "We're hiring engineers", href: "/careers" }}
      secondary={{ label: "Developer docs", href: "/developers" }}
    />
  );
}
