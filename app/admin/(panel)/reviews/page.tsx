import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { deleteReview, setReviewFlag } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { Badge, EmptyState, PageHeader, Stars } from "@/components/admin/ui";
import { buttonClasses } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth";
import type { Review } from "@/lib/content";
import { db, plain } from "@/lib/db";

export const metadata: Metadata = { title: "Reviews" };

const notices: Record<string, string> = {
  created: "Review added.",
  updated: "Review saved.",
  deleted: "Review deleted.",
};

export default async function ReviewsPage({ searchParams }: PageProps<"/admin/reviews">) {
  await requireAdmin();
  const { saved } = await searchParams;
  const client = await db();
  const res = await client.execute("SELECT * FROM reviews ORDER BY featured DESC, sort ASC, id DESC");
  const reviews = plain<Review>(res.rows);
  const notice = typeof saved === "string" ? notices[saved] : undefined;

  return (
    <>
      <PageHeader
        title="Reviews"
        description="Published reviews appear on the home page, the customer stories page and contact sales. Featured ones are also used for the large quotes across the site."
        action={
          <Link href="/admin/reviews/new" className={buttonClasses("primary", "md")}>
            <Plus className="size-4" aria-hidden="true" /> Write a review
          </Link>
        }
      />
      {notice && (
        <p role="status" className="mb-5 rounded-xl bg-tint-mint px-4 py-3 text-sm font-medium text-mint-ink">
          {notice}
        </p>
      )}
      {reviews.length ? (
        <ul className="flex flex-col gap-3">
          {reviews.map((r) => (
            <li key={r.id} className="rounded-2xl border border-line bg-surface p-5 shadow-soft">
              <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-bold text-fg">{r.name}</p>
                    <Stars rating={r.rating} />
                    {r.published ? <Badge tone="green">Published</Badge> : <Badge>Draft</Badge>}
                    {Boolean(r.featured) && <Badge tone="blue">Featured</Badge>}
                  </div>
                  <p className="text-sm text-muted">{[r.role, r.company].filter(Boolean).join(", ")}</p>
                  <p className="mt-2 line-clamp-2 text-fg">“{r.quote}”</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/admin/reviews/${r.id}`} className="inline-flex h-8 items-center rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-fg hover:bg-primary-hover">
                    Edit
                  </Link>
                  <InlineAction action={setReviewFlag} fields={{ id: r.id, field: "published", value: r.published ? 0 : 1 }}>
                    {r.published ? "Unpublish" : "Publish"}
                  </InlineAction>
                  <InlineAction action={setReviewFlag} fields={{ id: r.id, field: "featured", value: r.featured ? 0 : 1 }}>
                    {r.featured ? "Unfeature" : "Feature"}
                  </InlineAction>
                  <InlineAction action={deleteReview} fields={{ id: r.id }} variant="danger" confirm={`Delete the review from ${r.name}? This can't be undone.`}>
                    Delete
                  </InlineAction>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title="No reviews yet"
          body="Review sections stay hidden on the site until you publish at least one real review."
          action={
            <Link href="/admin/reviews/new" className={buttonClasses("primary", "md")}>
              Write the first review
            </Link>
          }
        />
      )}
    </>
  );
}
