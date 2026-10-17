import type { Metadata } from "next";
import { deleteFaq } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { FaqForm } from "@/components/admin/forms";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import type { FaqRow } from "@/lib/content";
import { db, plain } from "@/lib/db";

export const metadata: Metadata = { title: "Pricing FAQs" };

export default async function FaqsPage() {
  await requireAdmin();
  const client = await db();
  const res = await client.execute("SELECT * FROM faqs WHERE page = 'pricing' ORDER BY sort ASC, id ASC");
  const faqs = plain<FaqRow>(res.rows);

  return (
    <>
      <PageHeader title="Pricing FAQs" description="The questions and answers at the bottom of the pricing page." />
      <div className="flex flex-col gap-4">
        {faqs.map((f) => (
          <details key={f.id} className="group rounded-2xl border border-line bg-surface shadow-soft">
            <summary className="flex cursor-pointer list-none flex-wrap items-center gap-3 p-5">
              <span className="min-w-0 flex-1 font-semibold text-fg">{f.question}</span>
              {!f.published && <Badge>Hidden</Badge>}
              <span className="text-sm font-semibold text-primary group-open:hidden">Edit</span>
              <span className="hidden text-sm font-semibold text-muted group-open:inline">Close</span>
            </summary>
            <div className="border-t border-line p-5">
              <FaqForm faq={f} />
              <div className="mt-4 flex justify-end border-t border-line pt-4">
                <InlineAction action={deleteFaq} fields={{ id: f.id }} variant="danger" confirm="Delete this question? This can't be undone.">
                  Delete question
                </InlineAction>
              </div>
            </div>
          </details>
        ))}
        <Card title="Add a question">
          <FaqForm />
        </Card>
      </div>
    </>
  );
}
