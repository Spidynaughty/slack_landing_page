"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { headerActions, mainNav } from "@/data/nav";
import { useUI } from "@/components/providers";
import { buttonClasses } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useDialog } from "@/components/ui/use-dialog";
import { useMounted } from "@/components/ui/use-mounted";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { openSearch } = useUI();
  const panelRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  const mounted = useMounted();
  useDialog(open, close, panelRef);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2 lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
      >
        <Menu className="size-5" aria-hidden="true" />
      </button>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40, transition: { duration: 0.18 } }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[70] flex flex-col bg-bg lg:hidden"
          >
            <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line">
              <Logo onClick={close} />
              <div className="flex items-center gap-1">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex size-10 items-center justify-center rounded-full hover:bg-surface-2"
                  aria-label="Close menu"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="container-page flex-1 overflow-y-auto py-4">
              <button
                type="button"
                onClick={() => {
                  close();
                  openSearch();
                }}
                className="mb-4 flex w-full items-center gap-3 rounded-2xl border border-line bg-surface-2 px-4 py-3 text-left text-muted"
              >
                <Search className="size-4" aria-hidden="true" />
                Search pages, features and help
              </button>

              <nav aria-label="Mobile">
                <ul className="divide-y divide-line">
                  {mainNav.map((item) => {
                    if (item.kind === "link") {
                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={close}
                            className="flex items-center py-4 font-display text-xl font-bold text-fg"
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    }
                    const isOpen = expanded === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`m-${item.id}`}
                          onClick={() => setExpanded(isOpen ? null : item.id)}
                          className="flex w-full items-center justify-between py-4 text-left font-display text-xl font-bold text-fg"
                        >
                          {item.label}
                          <ChevronDown
                            className={cn("size-5 transition-transform", isOpen && "rotate-180")}
                            aria-hidden="true"
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              id={`m-${item.id}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-5">
                                <p className="mb-4 text-sm text-muted">{item.intro}</p>
                                {item.kind === "mega" ? (
                                  <>
                                    {item.groups.map((g) => (
                                      <div key={g.title} className="mb-5">
                                        <p className="mb-2 text-xs font-bold tracking-[0.14em] text-subtle uppercase">
                                          {g.title}
                                        </p>
                                        <ul className="grid gap-1 sm:grid-cols-2">
                                          {g.links.map((l) => (
                                            <li key={l.href}>
                                              <Link
                                                href={l.href}
                                                onClick={close}
                                                className="flex items-center gap-3 rounded-xl px-2 py-2 font-semibold text-fg hover:bg-surface-2"
                                              >
                                                {l.icon && (
                                                  <span className="inline-flex size-8 items-center justify-center rounded-lg bg-primary-soft text-primary">
                                                    <Icon name={l.icon} className="size-4" />
                                                  </span>
                                                )}
                                                {l.label}
                                                {l.badge && (
                                                  <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[0.65rem] font-bold text-mint-ink uppercase">
                                                    {l.badge}
                                                  </span>
                                                )}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                    <div className="grid gap-3 sm:grid-cols-2">
                                      {item.featured.map((f) => (
                                        <Link
                                          key={f.href}
                                          href={f.href}
                                          onClick={close}
                                          className={cn("rounded-2xl p-4", toneStyles[f.tone].tint)}
                                        >
                                          <span className={cn("text-xs font-bold uppercase", toneStyles[f.tone].ink)}>
                                            {f.eyebrow}
                                          </span>
                                          <span className="mt-1 block font-semibold text-fg">{f.title}</span>
                                        </Link>
                                      ))}
                                    </div>
                                    {(item.quickLinks || item.footerLink) && (
                                      <div className="mt-4 flex flex-wrap gap-2">
                                        {[...(item.quickLinks ?? []), ...(item.footerLink ? [item.footerLink] : [])].map(
                                          (q) => (
                                            <Link
                                              key={q.href}
                                              href={q.href}
                                              onClick={close}
                                              className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-fg"
                                            >
                                              {q.label}
                                            </Link>
                                          ),
                                        )}
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <ul className="grid gap-2 sm:grid-cols-2">
                                    {item.cards.map((c) => (
                                      <li key={c.href}>
                                        <Link
                                          href={c.href}
                                          onClick={close}
                                          className={cn("flex items-center gap-3 rounded-2xl p-3", toneStyles[c.tone].tint)}
                                        >
                                          <span
                                            className={cn(
                                              "inline-flex size-9 items-center justify-center rounded-lg",
                                              toneStyles[c.tone].solid,
                                            )}
                                          >
                                            <Icon name={c.icon} className="size-4" />
                                          </span>
                                          <span className="font-semibold text-fg">{c.label}</span>
                                        </Link>
                                      </li>
                                    ))}
                                    <li className="sm:col-span-2">
                                      <Link
                                        href={item.footerLink.href}
                                        onClick={close}
                                        className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-semibold text-fg"
                                      >
                                        {item.footerLink.label}
                                      </Link>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="container-page grid shrink-0 grid-cols-2 gap-2 border-t border-line py-4 sm:grid-cols-3">
              {headerActions.map((a) =>
                a.kind === "link" ? (
                  <Link
                    key={a.href}
                    href={a.href}
                    onClick={close}
                    className={buttonClasses(
                      a.variant === "primary" ? "primary" : "secondary",
                      "md",
                      cn("w-full", a.variant === "primary" && "col-span-2 sm:col-span-1"),
                    )}
                  >
                    {a.label}
                  </Link>
                ) : null,
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
