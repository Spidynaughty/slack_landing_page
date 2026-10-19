import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Inbox, MessageSquareQuote, CircleHelp, Type } from "lucide-react";
import { Badge, Card, EmptyState, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { db, plain } from "@/lib/db";

export const metadata: Metadata = { title: "Dashboard" };

type Recent = { id: number; form: string; name: string; email: string; status: string; created_at: string };

export default async function Dashboard() {
  await requireAdmin();
  const client = await db();
  const [counts, recent] = await Promise.all([
    client.execute(`SELECT
      (SELECT COUNT(*) FROM reviews) AS reviews,
      (SELECT COUNT(*) FROM reviews WHERE published = 1) AS published,
      (SELECT COUNT(*) FROM submissions WHERE status = 'new') AS unread,
      (SELECT COUNT(*) FROM submissions) AS submissions,
      (SELECT COUNT(*) FROM faqs WHERE published = 1) AS faqs`),
    client.execute("SELECT id, form, name, email, status, created_at FROM submissions ORDER BY id DESC LIMIT 6"),
  ]);
  const c = counts.rows[0];
  const rows = plain<Recent>(recent.rows);

  const tiles = [
    { label: "Published reviews", value: `${c.published} of ${c.reviews}`, href: "/admin/reviews", icon: MessageSquareQuote },
    { label: "New in inbox", value: String(c.unread), href: "/admin/inbox?status=new", icon: Inbox },
    { label: "All submissions", value: String(c.submissions), href: "/admin/inbox", icon: Inbox },
    { label: "Pricing FAQs", value: String(c.faqs), href: "/admin/faqs", icon: CircleHelp },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description="Everything you change here shows on the live site as soon as you save." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map(({ label, value, href, icon: Icon }) => (
          <Link key={label} href={href} className="group rounded-2xl border border-line bg-surface p-5 shadow-soft transition-shadow hover:shadow-card">
            <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-2xl font-bold text-fg">{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Card
          title="Latest submissions"
          actions={
            <Link href="/admin/inbox" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
              Open inbox <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          }
        >
          {rows.length ? (
            <ul className="divide-y divide-line">
              {rows.map((r) => (
                <li key={r.id}>
                  <Link href={`/admin/inbox/${r.id}`} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-3 hover:text-primary">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-fg">{r.name || r.email || "Anonymous"}</span>
                      <span className="block truncate text-sm text-muted">{r.form}</span>
                    </span>
                    {r.status === "new" && <Badge tone="blue">New</Badge>}
                    <span className="text-xs text-subtle">{formatDate(r.created_at)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="No submissions yet" body="Forms across the site (demo requests, sign-ups, the newsletter and more) will show up here." />
          )}
        </Card>

        <Card title="Quick actions">
          <ul className="flex flex-col gap-2">
            {[
              { href: "/admin/text", label: "Change any text on the site", icon: Type },
              { href: "/admin/reviews/new", label: "Write a review", icon: MessageSquareQuote },
              { href: "/admin/content", label: "Edit the home page", icon: Home },
              { href: "/admin/faqs", label: "Update pricing FAQs", icon: CircleHelp },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 text-sm font-semibold text-fg hover:border-primary/40 hover:text-primary">
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                  <ArrowRight className="ml-auto size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
