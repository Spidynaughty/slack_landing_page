import Link from "next/link";
import { Card, PageHeader } from "@/components/admin/ui";

/** Shown inside the admin when a submission, review or other item no longer exists. */
export default function AdminNotFound() {
  return (
    <>
      <PageHeader title="Not found" description="It may have been deleted, or the link is wrong." />
      <Card>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
          >
            Back to the dashboard
          </Link>
          <Link
            href="/admin/inbox"
            className="inline-flex h-10 items-center rounded-full border border-line px-5 text-sm font-semibold text-fg hover:bg-surface-2"
          >
            Open the inbox
          </Link>
        </div>
      </Card>
    </>
  );
}
