import type { Metadata } from "next";
import { ExternalLink, MousePointerClick, Search } from "lucide-react";
import { deleteTextRule } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { TextRuleForm } from "@/components/admin/forms";
import { adminInput, Badge, Card, EmptyState, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { db, plain } from "@/lib/db";
import type { TextOverride } from "@/lib/text-overrides";

export const metadata: Metadata = { title: "Site text" };

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

export default async function TextPage({ searchParams }: PageProps<"/admin/text">) {
  await requireAdmin();
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, 200) : "";
  const client = await db();
  const res = await client.execute(
    query
      ? {
          sql: "SELECT * FROM text_overrides WHERE original LIKE ? OR replacement LIKE ? ORDER BY updated_at DESC, id DESC",
          args: [`%${query}%`, `%${query}%`],
        }
      : "SELECT * FROM text_overrides ORDER BY updated_at DESC, id DESC",
  );
  const rules = plain<TextOverride>(res.rows);

  return (
    <>
      <PageHeader
        title="Site text"
        description="Change any words on the public site: headings, paragraphs, buttons, menus, footer links, page content and more."
        action={
          <a
            href="/?edit=1"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg hover:bg-primary-hover"
          >
            <MousePointerClick className="size-4" aria-hidden="true" /> Edit on the site
            <ExternalLink className="size-3.5 opacity-80" aria-hidden="true" />
          </a>
        }
      />

      <Card className="mb-6" title="The quickest way" description="Open the site in editing mode, click any text and type the new wording. It saves straight to the live site.">
        <ol className="grid gap-3 text-sm text-muted sm:grid-cols-3">
          <li className="rounded-xl bg-bg-soft p-4">
            <strong className="block text-fg">1. Click “Edit on the site”</strong>
            The site opens with an editing bar at the bottom.
          </li>
          <li className="rounded-xl bg-bg-soft p-4">
            <strong className="block text-fg">2. Click any text</strong>
            Switch the bar to Browse to move between pages, then back to Edit.
          </li>
          <li className="rounded-xl bg-bg-soft p-4">
            <strong className="block text-fg">3. Type and save</strong>
            Every place showing that exact text updates. Undo anytime.
          </li>
        </ol>
      </Card>

      <Card className="mb-6" title="Add a change by hand" description="Useful for words that repeat across many pages, or to rename something everywhere at once.">
        <TextRuleForm />
      </Card>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-fg">
          Your changes <span className="font-medium text-muted">({rules.length})</span>
        </h2>
        <form className="relative w-full max-w-xs" role="search">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <label htmlFor="text-q" className="sr-only">
            Search changes
          </label>
          <input id="text-q" name="q" defaultValue={query} placeholder="Search changes" className={`${adminInput} pl-9`} />
        </form>
      </div>

      {rules.length ? (
        <ul className="flex flex-col gap-3">
          {rules.map((r) => (
            <li key={r.id}>
              <details className="group rounded-2xl border border-line bg-surface shadow-soft">
                <summary className="flex cursor-pointer list-none flex-wrap items-start gap-3 p-4 sm:p-5">
                  <span className="grid min-w-0 flex-1 gap-1 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-3">
                    <span data-raw-text="" className="line-clamp-2 text-sm break-words text-muted line-through decoration-line-strong">
                      {r.original}
                    </span>
                    <span aria-hidden="true" className="hidden text-subtle sm:block">
                      →
                    </span>
                    <span data-raw-text="" className="line-clamp-2 text-sm font-semibold break-words text-fg">
                      {r.replacement || "(hidden)"}
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    {r.mode === "contains" ? <Badge tone="amber">Everywhere</Badge> : <Badge tone="blue">Exact text</Badge>}
                    <span className="text-sm font-semibold text-primary group-open:hidden">Edit</span>
                    <span className="hidden text-sm font-semibold text-muted group-open:inline">Close</span>
                  </span>
                </summary>
                <div className="border-t border-line p-4 sm:p-5">
                  <TextRuleForm rule={r} />
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="text-xs text-subtle">Last changed {formatDate(r.updated_at)}</span>
                    <InlineAction action={deleteTextRule} fields={{ id: r.id }} variant="danger" confirm="Remove this change? The original text comes back.">
                      Undo this change
                    </InlineAction>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          title={query ? "No changes match your search" : "No text changed yet"}
          body={query ? "Try a different word." : "Click “Edit on the site” to change any text by clicking it."}
        />
      )}
    </>
  );
}
