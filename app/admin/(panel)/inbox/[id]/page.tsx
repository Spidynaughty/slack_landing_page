import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { deleteSubmission, setSubmissionStatus } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { Badge, Card, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { db, plain } from "@/lib/db";

export const metadata: Metadata = { title: "Submission" };

type Row = { id: number; form: string; page: string; name: string; email: string; data: string; status: string; created_at: string };

/** "workEmail" -> "Work email" */
function labelFor(key: string) {
  const words = key.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function show(value: unknown) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.length ? value.join(", ") : "None";
  return String(value ?? "") || "Not given";
}

export default async function SubmissionPage({ params }: PageProps<"/admin/inbox/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const client = await db();
  const res = await client.execute({ sql: "SELECT * FROM submissions WHERE id = ?", args: [Number(id) || 0] });
  const [row] = plain<Row>(res.rows);
  if (!row) notFound();

  // Opening a new submission marks it as read
  if (row.status === "new") {
    await client.execute({ sql: "UPDATE submissions SET status = 'read' WHERE id = ?", args: [row.id] });
  }
  let fields: Record<string, unknown> = {};
  try {
    fields = JSON.parse(row.data);
  } catch {}

  return (
    <>
      <PageHeader
        title={row.name || row.email || "Anonymous submission"}
        description={
          <>
            {row.form} · {formatDate(row.created_at)}.{" "}
            <Link href="/admin/inbox" className="font-semibold text-primary hover:underline">
              Back to inbox
            </Link>
          </>
        }
        action={
          <div className="flex flex-wrap gap-2">
            {row.email && (
              <a
                href={`mailto:${row.email}`}
                className="inline-flex h-8 items-center gap-1.5 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-fg hover:bg-primary-hover"
              >
                <Mail className="size-3.5" aria-hidden="true" /> Reply by email
              </a>
            )}
            <InlineAction action={setSubmissionStatus} fields={{ id: row.id, status: "new" }}>
              Mark unread
            </InlineAction>
            <InlineAction action={setSubmissionStatus} fields={{ id: row.id, status: row.status === "archived" ? "read" : "archived" }}>
              {row.status === "archived" ? "Move to inbox" : "Archive"}
            </InlineAction>
            <InlineAction action={deleteSubmission} fields={{ id: row.id }} variant="danger" confirm="Delete this submission? This can't be undone.">
              Delete
            </InlineAction>
          </div>
        }
      />
      <Card>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge tone="blue">{row.form}</Badge>
          {row.status === "archived" && <Badge>Archived</Badge>}
          {row.page && (
            <a href={row.page} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary hover:underline">
              Sent from {row.page}
            </a>
          )}
        </div>
        <dl className="divide-y divide-line">
          {Object.entries(fields).map(([key, value]) => (
            <div key={key} className="grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-4">
              <dt className="text-sm font-semibold text-muted">{labelFor(key)}</dt>
              <dd className="break-words whitespace-pre-wrap text-fg">{show(value)}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </>
  );
}
