import { GetStartedWizard } from "@/components/forms/get-started-wizard";
import { GradientBlobs } from "@/components/ui/blobs";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Get started free",
  description: `Create a free ${B} workspace in under a minute. Set up channels for your team, invite teammates and try Business+ free for 30 days with no credit card.`,
  path: "/get-started",
});

export default function GetStartedPage() {
  return (
    <section className="under-header relative overflow-hidden pb-12 [--hero-pt:3rem] md:pb-20 md:[--hero-pt:5rem]">
      <GradientBlobs className="opacity-70" />
      <div className="container-page relative">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h1 className="animate-fade-up text-display-lg font-extrabold text-fg">
            Let&apos;s set up <span className="text-gradient">your workspace</span>
          </h1>
          <p className="mt-4 animate-fade-up text-lead text-muted [animation-delay:100ms]">Five quick steps. Free for small teams, no credit card required.</p>
        </div>
        <GetStartedWizard />
      </div>
    </section>
  );
}
