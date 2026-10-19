import { SignIn } from "@/components/forms/sign-in";
import { Mockup } from "@/components/mockups";
import { GradientBlobs } from "@/components/ui/blobs";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const generateMetadata = () => buildMetadata({
  title: "Sign in",
  description: `Sign in to your ${B} workspace with your work email, single sign-on or a passkey to pick up your conversations, huddles, canvases and lists.`,
  path: "/signin",
});

export default function SignInPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-page grid min-h-[calc(100dvh-4.5rem)] items-center gap-12 py-12 lg:grid-cols-2">
        <div className="mx-auto w-full max-w-md rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-10">
          <SignIn />
        </div>
        <div className="relative hidden lg:block">
          <GradientBlobs />
          <div className="relative">
            <Mockup kind="ai" />
            <p className="mt-6 text-center text-lead text-muted">Your recap is ready. Catch up on everything you missed in seconds.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
