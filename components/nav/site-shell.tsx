import type { ReactNode } from "react";
import { Header } from "@/components/nav/header";
import { Footer } from "@/components/nav/footer";
import { SearchPalette } from "@/components/nav/search-palette";
import { CookieConsent } from "@/components/nav/cookie-consent";
import { TextEditLoader } from "@/components/text-edit/loader";
import { buildSearchIndex } from "@/lib/search-index";

/** Header, footer, search and consent around every public page (the admin has its own chrome). */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 pt-(--header-h) outline-none">
        {children}
      </main>
      <Footer />
      <SearchPalette entries={buildSearchIndex()} />
      <CookieConsent />
      <TextEditLoader />
    </>
  );
}
