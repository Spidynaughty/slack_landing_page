import { postCategories, posts } from "@/data/posts";
import { FeaturedPost } from "@/components/sections/featured-post";
import { LinkChips } from "@/components/sections/common";
import { ListingPage } from "@/components/templates/listing-page";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { postItems } from "@/lib/listing-items";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Blog: ideas on the future of work",
  description: `Product news, engineering deep dives, design stories and practical advice on productivity and AI from the team building ${B}.`,
  path: "/blog",
});

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  return (
    <ListingPage
      crumbs={navCrumbs("/blog", { section: "resources", label: "Blog" })}
      eyebrow="The blog"
      title={
        <>
          Ideas for <span className="text-gradient">better work</span>
        </>
      }
      subtitle="Product news, engineering deep dives, design stories and practical advice for teams who want to work smarter."
      items={postItems()}
      filters={[{ key: "category", label: "Topic", options: postCategories }]}
      cardStyle="post"
      label="articles"
      searchPlaceholder="Search articles"
      before={
        featured && (
          <div className="container-page">
            <FeaturedPost post={featured} />
            <LinkChips
              className="mt-8 justify-center"
              links={[
                { label: "Product", href: "/blog/topic/product", icon: "rocket" },
                { label: "AI", href: "/blog/topic/ai", icon: "sparkles" },
                { label: "Productivity", href: "/blog/topic/productivity", icon: "zap" },
                { label: "News", href: "/blog/news", icon: "news" },
                { label: "Engineering blog", href: "/engineering-blog", icon: "code" },
                { label: "Design blog", href: "/design-blog", icon: "palette" },
              ]}
            />
          </div>
        )
      }
      cta={{ title: "Put these ideas to work", subtitle: `Start free and see how ${B} changes the way your team collaborates.` }}
    />
  );
}
