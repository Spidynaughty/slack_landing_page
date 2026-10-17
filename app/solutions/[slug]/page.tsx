import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getSolution, solutions } from "@/data/solutions";
import { SolutionTemplate } from "@/components/templates/solution-template";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return { title: "Solution not found" };
  return buildMetadata({ title: solution.seo.title, description: solution.seo.description, path: `/solutions/${slug}` });
}

export default function SolutionPage({ params }: PageProps<"/solutions/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <SolutionContent params={params} />
    </Suspense>
  );
}

async function SolutionContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  return <SolutionTemplate solution={solution} />;
}
