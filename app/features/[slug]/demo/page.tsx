import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { featureDemos } from "@/data/demos";
import { DemoTemplate } from "@/components/templates/demo-template";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";

const featureLevel = () => featureDemos.filter((d) => d.path.startsWith("/features/"));

export function generateStaticParams() {
  return featureLevel().map((d) => ({ slug: d.slug }));
}

function resolve(slug: string) {
  return featureLevel().find((d) => d.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/features/[slug]/demo">): Promise<Metadata> {
  const { slug } = await params;
  const demo = resolve(slug);
  if (!demo) return { title: "Demo not found" };
  return buildMetadata({ title: demo.seo.title, description: demo.seo.description, path: demo.path });
}

export default function FeatureDemoPage({ params }: PageProps<"/features/[slug]/demo">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <FeatureDemoContent params={params} />
    </Suspense>
  );
}

async function FeatureDemoContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = resolve(slug);
  if (!demo) notFound();
  return <DemoTemplate demo={demo} />;
}

