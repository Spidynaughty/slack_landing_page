import { GetStartedFlow } from "@/components/forms/get-started-flow";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Get started free",
  description: `Create a free ${B} workspace in under a minute. Set up channels for your team, invite teammates and try Business+ free for 30 days with no credit card.`,
  path: "/get-started",
});

export default function GetStartedPage() {
  return <GetStartedFlow />;
}
