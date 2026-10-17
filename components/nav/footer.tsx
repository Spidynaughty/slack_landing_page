import Link from "next/link";
import { footerColumns, legalItems } from "@/data/nav";
import { Logo } from "@/components/ui/logo";
import { ThemeSwitcher } from "@/components/ui/theme-toggle";
import { site } from "@/lib/site";
import { FooterActionButton, NewsletterForm, RegionSelect } from "./footer-client";

const linkClass = "text-[0.9rem] text-muted transition-colors hover:text-fg focus-visible:text-fg";

/** Follows the theme: a white card on the pale page in light mode, deep navy in dark mode. */
export function Footer() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface text-fg shadow-soft sm:rounded-[2.5rem] dark:grain dark:border-transparent dark:bg-deep">
        <div aria-hidden="true" className="pointer-events-none absolute -top-48 left-1/4 size-[36rem] rounded-full bg-primary/10 blur-3xl dark:bg-primary/35" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-32 right-0 size-[28rem] rounded-full bg-highlight/10 blur-3xl dark:bg-highlight/20" />

        <div className="relative mx-auto max-w-[78rem] px-5 pt-14 sm:px-10 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
            <div className="max-w-md">
              <Logo />
              <p className="mt-5 font-display text-display-sm leading-tight font-bold text-fg">
                {site.tagline}. <span className="text-gradient">Faster with AI.</span>
              </p>
              <ThemeSwitcher className="mt-6" />
            </div>
            <div className="rounded-3xl border border-line bg-bg-soft p-6 dark:bg-white/[0.04]">
              <NewsletterForm />
            </div>
          </div>

          <nav aria-label="Footer" className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-12 sm:grid-cols-3 lg:grid-cols-6">
            {footerColumns.map((col) => (
              <div key={col.title} className={col.sections ? "col-span-2 sm:col-span-1" : undefined}>
                <h3 className="mb-4 font-sans text-xs font-bold tracking-[0.16em] text-fg uppercase">{col.title}</h3>
                {col.sections ? (
                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
                    {col.sections.map((s) => (
                      <div key={s.title}>
                        <p className="mb-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-subtle uppercase">{s.title}</p>
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
                          <Link href={l.href} className="text-[0.9rem] font-semibold text-fg hover:underline">
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

          <div className="mt-12 flex flex-col gap-6 border-t border-line py-8 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <li className="text-muted">
                © {site.year} {site.name}, Inc.
              </li>
              {legalItems.map((item) => (
                <li key={item.label}>
                  {item.kind === "link" ? (
                    <Link href={item.href} className="text-muted hover:text-fg">
                      {item.label}
                    </Link>
                  ) : (
                    <FooterActionButton action={item.action} label={item.label} />
                  )}
                </li>
              ))}
            </ul>
            <RegionSelect />
          </div>
        </div>

        <p
          aria-hidden="true"
          className="relative -mb-[0.2em] text-center font-display text-[clamp(5rem,24vw,22rem)] leading-[0.8] font-extrabold tracking-[-0.06em] select-none"
          style={{
            backgroundImage: "linear-gradient(180deg, color-mix(in srgb, var(--primary) 14%, transparent), transparent)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {site.name}
        </p>
      </div>
    </footer>
  );
}
