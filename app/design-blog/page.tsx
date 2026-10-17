import { posts } from "@/data/posts";
import { ListingPage } from "@/components/templates/listing-page";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { postItems } from "@/lib/listing-items";

export const metadata = buildMetadata({
  title: "Design blog",
  description: `Stories from the ${B} design team on design systems, accessibility, illustration, motion and crafting software people genuinely enjoy using.`,
  path: "/design-blog",
});

export default function DesignBlogPage() {
  return (
    <ListingPage
      crumbs={[{ label: "Blog", href: "/blog" }, { label: "Design blog" }]}
      eyebrow="Design"
      tone="pink"
      title={
        <>
          Crafting software <span className="text-gradient">people love</span>
        </>
      }
      subtitle="How we think about design systems, accessibility, illustration and the small details that make work feel lighter."
      items={postItems(posts.filter((p) => p.category === "Design"))}
      cardStyle="post"
      label="design articles"
      searchPlaceholder="Search design articles"
      primary={{ label: "Explore our brand", href: "/brand" }}
      secondary={{ label: "Join the design team", href: "/careers" }}
    />
  );
}
