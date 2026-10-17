import Link from "next/link";
import { footerColumns, legalItems } from "@/data/nav";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/ui/theme-toggle";
import { site } from "@/lib/site";
import { FooterActionButton, NewsletterForm, RegionSelect } from "./footer-client";

const linkClass =
  "text-[0.9rem] text-on-deep-muted transition-colors hover:text-white focus-visible:text-white";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-deep text-on-deep" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-[34rem] rounded-full bg-primary/30 blur-3xl"
      />
      <div className="container-page relative pt-16 pb-10 md:pt-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div className="max-w-md">
            <Logo onDark />
            <p className="mt-4 text-lead text-on-deep-muted">
              {site.tagline}. Channels, huddles, canvases, lists, apps and AI agents in one place.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 sm:grid-cols-3 lg:grid-cols-6">
          {footerColumns.map((col) => (
            <div key={col.title} className={col.sections ? "col-span-2 sm:col-span-1" : undefined}>
              <h3 className="mb-4 font-sans text-sm font-bold tracking-wide text-white">{col.title}</h3>
              {col.sections ? (
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
                  {col.sections.map((s) => (
                    <div key={s.title}>
                      <p className="mb-2.5 text-xs font-bold tracking-[0.14em] text-on-deep-muted/80 uppercase">
                        {s.title}
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {s.links.map((l) => (
                          <li key={l.href}>
                            <Link href={l.href} className={linkClass}>
                              {l.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[0.9rem] font-semibold text-white hover:underline">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkClass}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <li className="text-on-deep-muted">
              © {site.year} {site.name}, Inc. All rights reserved.
            </li>
            {legalItems.map((item) => (
              <li key={item.label}>
                {item.kind === "link" ? (
                  <Link href={item.href} className="text-on-deep-muted hover:text-white">
                    {item.label}
                  </Link>
                ) : (
                  <FooterActionButton action={item.action} label={item.label} />
                )}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <RegionSelect />
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
