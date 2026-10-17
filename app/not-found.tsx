import type { Metadata } from "next";
import { SiteShell } from "@/components/nav/site-shell";
import { NotFoundContent } from "@/components/sections/not-found-content";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for has moved or no longer exists.",
  robots: { index: false },
};

/** Unmatched URLs render outside the (site) group, so they bring the site chrome with them. */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
