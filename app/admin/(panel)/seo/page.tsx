import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { adminInput, Badge, EmptyState, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { listSeoOverrides, seoPages } from "@/lib/seo-overrides";

export const metadata: Metadata = { title: "SEO" };

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

export default async function SeoPage({ searchParams }: PageProps<"/admin/seo">) {
  await requireAdmin();
  const { q, show } = await searchParams;
  const query = typeof q === "string" ? q.trim().toLowerCase().slice(0, 200) : "";
  const editedOnly = show === "edited";
  const overrides = new Map((await listSeoOverrides()).map((o) => [o.path, o]));
  const pages = seoPages().filter((p) => {
    const o = overrides.get(p.path);
    if (editedOnly && !o) return false;
    if (!query) return true;
    return [p.name, p.path, o?.title, o?.description].some((v) => v?.toLowerCase().includes(query));
  });

  return (
    <>
      <PageHeader
        title="SEO"
        description="Change the title and description each page shows in Google and other search engines, and in link previews when someone shares it."
      />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href={query ? `/admin/seo?q=${encodeURIComponent(query)}` : "/admin/seo"}
            aria-current={!editedOnly ? "page" : undefined}
            className={!editedOnly ? "rounded-full bg-primary-soft px-3 py-1.5 font-semibold text-primary" : "rounded-full px-3 py-1.5 font-semibold text-muted hover:text-fg"}
          >
            All pages
          </Link>
          <Link
            href={`/admin/seo?show=edited${query ? `&q=${encodeURIComponent(query)}` : ""}`}
            aria-current={editedOnly ? "page" : undefined}
            className={editedOnly ? "rounded-full bg-primary-soft px-3 py-1.5 font-semibold text-primary" : "rounded-full px-3 py-1.5 font-semibold text-muted hover:text-fg"}
          >
            Edited ({overrides.size})
          </Link>
        </div>
        <form className="relative w-full max-w-xs" role="search">
          {editedOnly && <input type="hidden" name="show" value="edited" />}
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" aria-hidden="true" />
          <label htmlFor="seo-q" className="sr-only">
            Search pages
          </label>
          <input id="seo-q" name="q" defaultValue={query} placeholder="Search pages" className={`${adminInput} pl-9`} />
        </form>
      </div>

      {pages.length ? (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-soft">
          {pages.map((p) => {
            const o = overrides.get(p.path);
            return (
              <li key={p.path}>
                <Link href={`/admin/seo/edit?path=${encodeURIComponent(p.path)}`} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-2 sm:px-5">
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span data-raw-text="" className="font-semibold text-fg">
                        {p.name}
                      </span>
                      {o && <Badge tone="blue">Edited</Badge>}
                    </span>
                    <span className="block truncate font-mono text-xs text-subtle">{p.path}</span>
                    {o?.title && (
                      <span data-raw-text="" className="mt-0.5 block truncate text-sm text-muted">
                        {o.title}
                      </span>
                    )}
                  </span>
                  <ChevronRight className="size-4 shrink-0 text-subtle" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          title={editedOnly && !query ? "No pages edited yet" : "No pages match your search"}
          body={editedOnly && !query ? "Open any page in All pages to change its title or description." : "Try a different word, or part of the address."}
        />
      )}
    </>
  );
}
