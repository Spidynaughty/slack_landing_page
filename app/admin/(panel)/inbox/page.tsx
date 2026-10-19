import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { Badge, EmptyState, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { db, plain } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Inbox" };

type Row = { id: number; form: string; page: string; name: string; email: string; status: string; created_at: string };

const tabs = [
  { status: "", label: "All" },
  { status: "new", label: "New" },
  { status: "read", label: "Read" },
  { status: "archived", label: "Archived" },
];

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

export default async function InboxPage({ searchParams }: PageProps<"/admin/inbox">) {
  await requireAdmin();
  const sp = await searchParams;
  const status = typeof sp.status === "string" && ["new", "read", "archived"].includes(sp.status) ? sp.status : "";
  const form = typeof sp.form === "string" ? sp.form.slice(0, 80) : "";

  const client = await db();
  const where: string[] = [];
  const args: string[] = [];
  if (status) {
    where.push("status = ?");
    args.push(status);
  } else {
    where.push("status != 'archived'");
  }
  if (form) {
    where.push("form = ?");
    args.push(form);
  }
  const [list, forms] = await Promise.all([
    client.execute({
      sql: `SELECT id, form, page, name, email, status, created_at FROM submissions WHERE ${where.join(" AND ")} ORDER BY id DESC LIMIT 200`,
      args,
    }),
    client.execute("SELECT form, COUNT(*) AS n FROM submissions GROUP BY form ORDER BY form"),
  ]);
  const rows = plain<Row>(list.rows);
  const href = (next: { status?: string; form?: string }) => {
    const q = new URLSearchParams();
    const s = next.status ?? status;
    const f = next.form ?? form;
    if (s) q.set("status", s);
    if (f) q.set("form", f);
    const str = q.toString();
    return `/admin/inbox${str ? `?${str}` : ""}`;
  };

  return (
    <>
      <PageHeader
        title="Inbox"
        description="Everything visitors send through the site's forms."
        action={
          <a
            href={`/admin/inbox/export${form ? `?form=${encodeURIComponent(form)}` : ""}`}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-fg hover:bg-surface-2"
          >
            <Download className="size-4" aria-hidden="true" /> Export CSV
          </a>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2">
        <nav aria-label="Filter by status" className="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
          {tabs.map((t) => (
            <Link
              key={t.label}
              href={href({ status: t.status })}
              aria-current={status === t.status ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-semibold",
                status === t.status ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
              )}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        {forms.rows.length > 0 && (
          <nav aria-label="Filter by form" className="flex flex-wrap gap-1.5">
            <Link
              href={href({ form: "" })}
              className={cn("rounded-full border px-3 py-1 text-xs font-semibold", !form ? "border-primary bg-primary-soft text-primary" : "border-line text-muted hover:text-fg")}
            >
              Every form
            </Link>
            {forms.rows.map((f) => (
              <Link
                key={String(f.form)}
                href={href({ form: String(f.form) })}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-semibold",
                  form === f.form ? "border-primary bg-primary-soft text-primary" : "border-line text-muted hover:text-fg",
                )}
              >
                {String(f.form)} <span className="opacity-70">{Number(f.n)}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>

      {rows.length ? (
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
          <ul className="divide-y divide-line">
            {rows.map((r) => (
              <li key={r.id}>
                <Link href={`/admin/inbox/${r.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-surface-2">
                  <span className={cn("size-2 shrink-0 rounded-full", r.status === "new" ? "bg-unread" : "bg-transparent")} aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <span className={cn("block truncate text-fg", r.status === "new" ? "font-bold" : "font-medium")}>{r.name || r.email || "Anonymous"}</span>
                    <span className="block truncate text-sm text-muted">
                      {r.email && r.name ? `${r.email} · ` : ""}
                      {r.page || "Unknown page"}
                    </span>
                  </span>
                  <Badge tone="blue">{r.form}</Badge>
                  {r.status === "archived" && <Badge>Archived</Badge>}
                  <span className="w-full text-xs text-subtle sm:w-auto">{formatDate(r.created_at)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <EmptyState title="Nothing here" body={status || form ? "No submissions match these filters." : "When visitors fill in a form on the site, it will appear here."} />
      )}
    </>
  );
}
