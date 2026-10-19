"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { headerActions, mainNav } from "@/data/nav";
import { useUI } from "@/components/providers";
import { buttonClasses } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { CardsPanel, MegaPanel } from "./mega-menu";
import { MobileNav } from "./mobile-nav";

const OPEN_DELAY = 60;
const CLOSE_DELAY = 120;

export function Header() {
  const { openSearch } = useUI();
  const [openId, setOpenId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Menus opened by click or keyboard stay open until dismissed; hover-opened ones follow the pointer.
  const pinned = useRef(false);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const clearTimer = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  const close = useCallback(() => {
    clearTimer();
    pinned.current = false;
    setOpenId(null);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const id = openId;
        close();
        triggerRefs.current[id]?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const header = document.getElementById("site-header");
      if (header && !header.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openId, close]);

  const scheduleOpen = (id: string) => {
    if (pinned.current) return;
    clearTimer();
    timer.current = setTimeout(() => setOpenId(id), openId ? 0 : OPEN_DELAY);
  };
  const scheduleClose = () => {
    if (pinned.current) return;
    clearTimer();
    timer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY);
  };

  const elevated = scrolled || openId !== null;

  return (
    <header id="site-header" className="sticky top-0 z-50 -mb-(--header-h) px-3 pt-3 sm:px-4">
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-primary px-4 py-2 font-semibold text-primary-fg focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <div
        className={cn(
          "relative mx-auto flex h-16 max-w-[76rem] items-center gap-2 rounded-full border pr-2 pl-4 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5",
          elevated
            ? "border-line bg-glass-strong shadow-float backdrop-blur-xl backdrop-saturate-150"
            : "border-line/70 bg-glass shadow-soft backdrop-blur-lg",
        )}
      >
        <Logo onClick={close} className="mr-1 shrink-0" />

        <nav aria-label="Main" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-0.5 rounded-full bg-surface-2/70 p-1">
            {mainNav.map((item) => {
              if (item.kind === "link") {
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={close}
                      onMouseEnter={scheduleClose}
                      className="inline-flex h-9 items-center rounded-full px-3 text-[0.92rem] font-semibold text-fg transition-colors hover:bg-surface xl:px-4"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }
              const open = openId === item.id;
              const panelId = `mega-${item.id}`;
              return (
                <li
                  key={item.id}
                  onMouseEnter={() => scheduleOpen(item.id)}
                  onMouseLeave={scheduleClose}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null) && open) {
                      const header = document.getElementById("site-header");
                      if (!header?.contains(e.relatedTarget as Node | null)) close();
                    }
                  }}
                >
                  <button
                    ref={(el) => {
                      triggerRefs.current[item.id] = el;
                    }}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => {
                      clearTimer();
                      pinned.current = !open;
                      setOpenId(open ? null : item.id);
                    }}
                    className={cn(
                      "inline-flex h-9 items-center gap-1 rounded-full px-3 text-[0.92rem] font-semibold transition-colors xl:px-4",
                      open ? "bg-surface text-primary shadow-soft" : "text-fg hover:bg-surface",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
                  </button>
                  <AnimatePresence>
                    {open && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-label={`${item.label} menu`}
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.08 } }}
                        transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-[calc(100%+0.75rem)] left-1/2 max-h-[calc(100dvh-6.5rem)] w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 origin-top overflow-y-auto rounded-[1.75rem] border border-line bg-surface shadow-float"
                      >
                        {item.kind === "mega" ? <MegaPanel menu={item} onNavigate={close} /> : <CardsPanel menu={item} onNavigate={close} />}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          {headerActions.map((action) => {
            if (action.kind === "search") {
              return (
                <button
                  key="search"
                  type="button"
                  onClick={() => {
                    close();
                    openSearch();
                  }}
                  className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface-2"
                  aria-label="Search"
                  aria-keyshortcuts="Control+K Meta+K"
                >
                  <Search className="size-[1.15rem]" aria-hidden="true" />
                </button>
              );
            }
            const visibility =
              action.variant === "ghost" ? "hidden lg:inline-flex" : action.variant === "outline" ? "hidden 2xl:inline-flex" : "hidden sm:inline-flex";
            return (
              <Link
                key={action.href}
                href={action.href}
                onClick={close}
                className={cn(
                  buttonClasses(action.variant === "primary" ? "primary" : action.variant === "outline" ? "secondary" : "ghost", "sm"),
                  visibility,
                  "h-10",
                )}
              >
                {action.label}
              </Link>
            );
          })}
          <ThemeToggle className="hidden sm:inline-flex" />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
