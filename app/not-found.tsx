import type { Metadata } from "next";
import { Compass, LifeBuoy } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GradientBlobs } from "@/components/ui/blobs";
import { LinkChips } from "@/components/sections/common";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for has moved or no longer exists.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="under-header relative overflow-hidden pb-24 [--hero-pt:6rem] md:pb-36 md:[--hero-pt:9rem]">
      <GradientBlobs />
      <div className="container-page relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="font-display text-[clamp(6rem,4rem+10vw,11rem)] leading-none font-extrabold text-gradient">404</p>
        <h1 className="mt-4 text-display-md font-bold text-fg">This channel is quiet. Too quiet.</h1>
        <p className="mt-4 max-w-xl text-lead text-muted">
          The page you&apos;re looking for has moved, been archived or never existed. Try one of these instead, or press{" "}
          <kbd className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-sm font-semibold">Ctrl K</kbd> to search.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/help" variant="secondary">
            <LifeBuoy className="size-4" aria-hidden="true" /> Visit Help Centre
          </ButtonLink>
        </div>
        <div className="mt-12 flex items-center gap-2 text-sm font-semibold text-muted">
          <Compass className="size-4" aria-hidden="true" /> Popular destinations
        </div>
        <LinkChips
          className="mt-4 justify-center"
          links={[
            { label: "Pricing", href: "/pricing" },
            { label: "Features", href: "/features" },
            { label: "Solutions", href: "/solutions" },
            { label: "Customer stories", href: "/customer-stories" },
            { label: "Blog", href: "/blog" },
            { label: "Contact sales", href: "/contact-sales" },
          ]}
        />
      </div>
    </section>
  );
}
