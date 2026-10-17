import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { deleteReview } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { ReviewForm } from "@/components/admin/forms";
import { Card, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import type { Review } from "@/lib/content";
import { db, plain } from "@/lib/db";

export const metadata: Metadata = { title: "Edit review" };

export default async function EditReviewPage({ params }: PageProps<"/admin/reviews/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const client = await db();
  const res = await client.execute({ sql: "SELECT * FROM reviews WHERE id = ?", args: [Number(id) || 0] });
  const [review] = plain<Review>(res.rows);
  if (!review) notFound();

  return (
    <>
      <PageHeader
        title={`Review from ${review.name}`}
        description={
          <>
            Last changed {formatDate(review.updated_at)}.{" "}
            <Link href="/admin/reviews" className="font-semibold text-primary hover:underline">
              Back to reviews
            </Link>
          </>
        }
        action={
          <InlineAction action={deleteReview} fields={{ id: review.id }} variant="danger" confirm={`Delete the review from ${review.name}? This can't be undone.`}>
            Delete review
          </InlineAction>
        }
      />
      <Card>
        <ReviewForm review={review} />
      </Card>
    </>
  );
}
