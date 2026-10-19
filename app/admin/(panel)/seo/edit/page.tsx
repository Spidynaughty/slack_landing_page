import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { ExternalLink } from "lucide-react";
import { resetSeo } from "@/app/admin/actions";
import { InlineAction } from "@/components/admin/form-kit";
import { SeoForm } from "@/components/admin/seo-form";
import { Card, formatDate, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { readSeoOverride, SEO_LIMITS, seoPages, TITLE_SUFFIX } from "@/lib/seo-overrides";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Edit SEO" };

// Every admin page checks the session first, so navigations here wait for the server
export const instant = false;

const decode = (s: string) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/** The title and description the page serves right now, read from the page itself. */
async function readLivePage(path: string) {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  try {
    const res = await fetch(`${proto}://${host}${path}`, { headers: { accept: "text/html" }, signal: AbortSignal.timeout(15000) });
    const html = await res.text();
    let title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const description = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
    if (path !== "/" && title.endsWith(TITLE_SUFFIX)) title = title.slice(0, -TITLE_SUFFIX.length);
    return { title, description };
  } catch {
    return null;
  }
}

export default async function EditSeoPage({ searchParams }: PageProps<"/admin/seo/edit">) {
  await requireAdmin();
  const { path: raw, reset } = await searchParams;
  const path = typeof raw === "string" ? raw : "";
  const page = seoPages().find((p) => p.path === path);
  if (!page) notFound();

  const [override, live] = await Promise.all([readSeoOverride(path), readLivePage(path)]);
  // Before any change the live page shows the original; afterwards the original is kept with the change
  const originalTitle = override?.original_title || (override ? "" : live?.title) || "";
  const originalDescription = override?.original_description || (override ? "" : live?.description) || "";
  const title = override?.title || live?.title || originalTitle;
  const description = override?.description || live?.description || originalDescription;

  return (
    <>
      <PageHeader
        title={page.name}
        description={
          <>
            <span className="font-mono text-sm">{path}</span> ·{" "}
            <Link href="/admin/seo" className="font-semibold text-primary hover:underline">
              Back to all pages
            </Link>
          </>
        }
        action={
          <a
            href={path}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold text-fg hover:bg-surface-2"
          >
            <ExternalLink className="size-4" aria-hidden="true" /> View page
          </a>
        }
      />

      {!live && (
        <p role="alert" className="mb-6 rounded-xl bg-tint-sun p-4 text-sm text-sun-ink">
          Couldn&apos;t read the page&apos;s current title, so the fields may be empty. You can still type a new title and description.
        </p>
      )}

      <Card className="mb-6" title="Search title and description" description="What Google and other search engines show for this page, and what appears when someone shares a link to it.">
        <SeoForm
          key={String(reset ?? "form")}
          path={path}
          title={title}
          description={description}
          originalTitle={originalTitle}
          originalDescription={originalDescription}
          siteName={site.name}
          siteUrl={site.url}
          titleLimit={SEO_LIMITS.title}
          descriptionLimit={SEO_LIMITS.description}
        />
      </Card>

      {override && (
        <Card title="Original from the code" description={`You changed this on ${formatDate(override.updated_at)}. Putting it back removes your change.`}>
          <dl className="grid gap-3 text-sm">
            <div>
              <dt className="font-semibold text-muted">Title</dt>
              <dd data-raw-text="" className="text-fg">
                {originalTitle ? (path === "/" ? originalTitle : `${originalTitle} | ${site.name}`) : "Not recorded"}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-muted">Description</dt>
              <dd data-raw-text="" className="text-fg">
                {originalDescription || "Not recorded"}
              </dd>
            </div>
          </dl>
          <div className="mt-4">
            <InlineAction action={resetSeo} fields={{ path }} variant="danger" confirm="Put back the original title and description for this page?">
              Put back the original
            </InlineAction>
          </div>
        </Card>
      )}
    </>
  );
}
