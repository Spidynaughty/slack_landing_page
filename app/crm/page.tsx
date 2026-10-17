import { notFound } from "next/navigation";
import { getFeature } from "@/data/features";
import { FeatureTemplate } from "@/components/templates/feature-template";
import { buildMetadata } from "@/lib/seo";

const feature = getFeature("native-crm");

export const metadata = feature
  ? buildMetadata({ title: feature.seo.title, description: feature.seo.description, path: "/crm" })
  : {};

export default function NativeCrmPage() {
  if (!feature) notFound();
  return <FeatureTemplate feature={feature} />;
}
