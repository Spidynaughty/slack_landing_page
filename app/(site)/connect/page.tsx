import { notFound } from "next/navigation";
import { getFeature } from "@/data/features";
import { FeatureTemplate } from "@/components/templates/feature-template";
import { buildMetadata } from "@/lib/seo";

const feature = getFeature("connect");

export const metadata = feature
  ? buildMetadata({ title: feature.seo.title, description: feature.seo.description, path: "/connect" })
  : {};

export default function ConnectPage() {
  if (!feature) notFound();
  return <FeatureTemplate feature={feature} />;
}
