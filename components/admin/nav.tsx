"use client";

import { ExternalLink, Home, Inbox, LayoutDashboard, LogOut, Menu, MessageSquareQuote, CircleHelp, Building2, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/app/admin/actions";
import { LogoMark, Wordmark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reviews", label: "Reviews", icon: MessageSquareQuote },
  { href: "/admin/content", label: "Home page", icon: Home },
  { href: "/admin/logos", label: "Customer logos", icon: Building2 },
  { href: "/admin/faqs", label: "Pricing FAQs", icon: CircleHelp },
  { href: "/admin/inbox", label: "Inbox", icon: Inbox },
];

export function AdminNav({ email, newCount }: { email: string; newCount: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      {/* Phones and tablets: a top bar that opens the menu */}
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-line bg-surface px-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <LogoMark className="size-7" />
          <Wordmark className="text-lg" />
        </Link>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="admin-nav"
          className="inline-flex size-10 items-center justify-center rounded-full hover:bg-surface-2"
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          <span className="sr-only">Menu</span>
        </button>
      </div>

      <aside
        id="admin-nav"
        className={cn(
          "border-line bg-surface lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r",
          open ? "flex flex-col border-b" : "hidden",
        )}
      >
        <Link href="/admin" className="hidden items-center gap-2 px-6 pt-6 pb-2 lg:flex">
          <LogoMark className="size-8" />
          <span>
            <Wordmark className="block text-lg leading-tight" />
            <span className="block text-xs font-semibold tracking-wider text-subtle uppercase">Admin</span>
          </span>
        </Link>
        <nav aria-label="Admin" className="flex-1 px-3 py-4">
          <ul className="flex flex-col gap-1">
            {items.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active(href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                    active(href) ? "bg-primary-soft text-primary" : "text-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  <Icon className="size-[1.1rem]" aria-hidden="true" />
                  {label}
                  {href === "/admin/inbox" && newCount > 0 && (
                    <span className="ml-auto rounded-full bg-unread px-2 py-0.5 text-[0.7rem] font-bold text-white">
                      {newCount}
                      <span className="sr-only"> new</span>
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-1 border-t border-line px-3 py-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted hover:bg-surface-2 hover:text-fg"
          >
            <ExternalLink className="size-[1.1rem]" aria-hidden="true" /> View site
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-muted hover:bg-surface-2 hover:text-fg"
            >
              <LogOut className="size-[1.1rem]" aria-hidden="true" /> Sign out
            </button>
          </form>
          <p className="truncate px-3 pt-2 text-xs text-subtle" title={email}>
            Signed in as {email}
          </p>
        </div>
      </aside>
    </>
  );
}
