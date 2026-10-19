import { templateCategories } from "@/data/templates";
import { ListingPage } from "@/components/templates/listing-page";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { templateItems } from "@/lib/listing-items";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Template gallery",
  description: `Ready-made channels, canvases, lists, workflows and agents for project kickoffs, incident response, onboarding, deal rooms and more. Preview and use any ${B} template free.`,
  path: "/templates/gallery",
});

export default function TemplateGalleryPage() {
  return (
    <ListingPage
      crumbs={navCrumbs("/templates/gallery", { section: "solutions", label: "Template gallery" })}
      eyebrow="Template gallery"
      tone="sun"
      title={
        <>
          Start with a <span className="text-gradient">proven playbook</span>
        </>
      }
      subtitle="Pre-built channels, canvases, lists, workflows and agents for the way your team already works. Preview any template, then set it up in one click."
      items={templateItems()}
      filters={[
        { key: "category", label: "Team", options: templateCategories },
        { key: "popular", label: "Show", options: ["Popular"] },
      ]}
      cardStyle="template"
      label="templates"
      searchPlaceholder="Search templates"
      pageSize={9}
      cta={{ title: "Can't find the right template?", subtitle: "Build your own in minutes with Workflow Builder, canvases and lists.", primary: { label: "Get started", href: "/get-started" }, secondary: { label: "Explore Workflow Builder", href: "/features/workflow-automation" } }}
    />
  );
}
