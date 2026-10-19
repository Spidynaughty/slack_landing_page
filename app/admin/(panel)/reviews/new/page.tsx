import type { Metadata } from "next";
import Link from "next/link";
import { ReviewForm } from "@/components/admin/forms";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "New review" };

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

export default async function NewReviewPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader
        title="Write a review"
        description={
          <>
            Add a review from a real customer, with their permission.{" "}
            <Link href="/admin/reviews" className="font-semibold text-primary hover:underline">
              Back to reviews
            </Link>
          </>
        }
      />
      <Card>
        <ReviewForm />
      </Card>
    </>
  );
}
