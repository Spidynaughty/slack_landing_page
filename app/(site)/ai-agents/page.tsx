import { notFound } from "next/navigation";
import { getFeature } from "@/data/features";
import { FeatureTemplate } from "@/components/templates/feature-template";
import { buildMetadata } from "@/lib/seo";

const feature = getFeature("ai-agents");

export const generateMetadata = async () =>
  feature ? buildMetadata({ title: feature.seo.title, description: feature.seo.description, path: "/ai-agents" }) : {};

export default function AgentsPage() {
  if (!feature) notFound();
  return <FeatureTemplate feature={feature} />;
}
