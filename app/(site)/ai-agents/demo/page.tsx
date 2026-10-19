import { notFound } from "next/navigation";
import { getDemo } from "@/data/demos";
import { DemoTemplate } from "@/components/templates/demo-template";
import { buildMetadata } from "@/lib/seo";

const demo = getDemo("ai-agents");

export const generateMetadata = async () =>
  demo ? buildMetadata({ title: demo.seo.title, description: demo.seo.description, path: demo.path }) : {};

export default function AgentsDemoPage() {
  if (!demo) notFound();
  return <DemoTemplate demo={demo} />;
}
