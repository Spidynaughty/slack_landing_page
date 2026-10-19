import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { featureSlugPages, getFeature } from "@/data/features";
import { FeatureTemplate } from "@/components/templates/feature-template";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return featureSlugPages().map((f) => ({ slug: f.slug }));
}

function resolve(slug: string) {
  const feature = getFeature(slug);
  return feature && feature.href === `/features/${slug}` ? feature : undefined;
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const feature = resolve(slug);
  if (!feature) return { title: "Feature not found" };
  return buildMetadata({ title: feature.seo.title, description: feature.seo.description, path: feature.href });
}

export default function FeaturePage({ params }: PageProps<"/features/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <FeatureContent params={params} />
    </Suspense>
  );
}

async function FeatureContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const feature = resolve(slug);
  if (!feature) notFound();
  return <FeatureTemplate feature={feature} />;
}
