import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { appDetail, getApp } from "@/data/app-details";
import { apps } from "@/data/integrations";
import { Mockup } from "@/components/mockups";
import { AppCard, AppIcon } from "@/components/sections/apps";
import { CTABand, IconCardGrid } from "@/components/sections/common";
import { InstallButton } from "@/components/sections/install-button";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { GradientBlobs } from "@/components/ui/blobs";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return apps.map((a) => ({ app: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/marketplace/[app]">): Promise<Metadata> {
  const { app: slug } = await params;
  const app = getApp(slug);
  if (!app) return { title: "App not found" };
  return buildMetadata({
    title: `${app.name} for ${B}: ${app.category}`,
    description: `${app.description} Add ${app.name} to your ${B} workspace from the Marketplace.`,
    path: `/marketplace/${app.slug}`,
  });
}

export default function AppPage({ params }: PageProps<"/marketplace/[app]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <AppContent params={params} />
    </Suspense>
  );
}

async function AppContent({ params }: { params: Promise<{ app: string }> }) {
  const { app: slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const d = appDetail(app);
  const t = toneStyles[app.tone];
  const sameCategory = apps.filter((a) => a.slug !== app.slug && a.category === app.category);
  const related = [...sameCategory, ...apps.filter((a) => a.slug !== app.slug && a.category !== app.category && (a.agent === app.agent || a.featured))].slice(0, 3);

  return (
    <>
      <section className={cn("under-header relative overflow-hidden pb-14 md:pb-20", t.tint)}>
        <GradientBlobs className="opacity-50" />
        <div className="container-page relative">
          <Breadcrumbs items={navCrumbs("/marketplace", { section: "product", label: "Marketplace" }, [{ label: app.category }, { label: app.name }])} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col items-start gap-5">
              <div className="flex animate-fade-up items-center gap-4">
                <AppIcon app={app} size="lg" />
                <div>
                  <p className="text-sm font-semibold text-muted">by {d.developer}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                    <span className="text-muted">{app.installs} installs</span>
                    {app.agent && <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs font-bold text-primary uppercase">Agent</span>}
                  </p>
                </div>
              </div>
              <h1 className="animate-fade-up text-display-lg font-extrabold text-fg [animation-delay:80ms]">{app.name}</h1>
              <p className="max-w-xl animate-fade-up text-lead text-muted [animation-delay:160ms]">{app.description}</p>
              <div className="flex animate-fade-up flex-wrap items-start gap-4 [animation-delay:240ms]">
                <InstallButton />
                <Link href="/help/categories/integrations" className="inline-flex h-12 items-center rounded-full border border-line-strong bg-surface px-6 font-semibold text-fg hover:bg-surface-2">
                  Setup help
                </Link>
              </div>
            </div>
            <div className="animate-fade-up [animation-delay:200ms]">
              <Mockup kind={d.mockup} />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="flex flex-col gap-14">
            <Reveal>
              <h2 className="font-display text-display-sm font-bold text-fg">What you can do</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {app.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 shadow-soft">
                    <span className={cn("mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full", t.soft)}>
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="font-medium text-fg">{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-display-sm font-bold text-fg">How it works</h2>
              <ol className="mt-6 grid gap-4 md:grid-cols-3">
                {d.steps.map((s, i) => (
                  <li key={s.title} className="rounded-2xl bg-bg-soft p-5">
                    <span className={cn("inline-flex size-9 items-center justify-center rounded-full font-bold", t.solid)}>{i + 1}</span>
                    <h3 className="mt-4 font-display text-lg font-bold text-fg">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <div>
              <SectionHeader align="left" className="!mb-6" eyebrow="Permissions" tone={app.tone} title={`What ${app.name} can access`} subtitle="Admins approve these permissions before the app can be installed in your workspace." />
              <IconCardGrid columns={3} items={d.scopes.map((s) => ({ icon: s.icon, title: s.title, body: s.body, tone: app.tone }))} />
            </div>
          </div>
          <aside>
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <dl className="rounded-[var(--radius-card)] border border-line bg-surface p-6 text-sm shadow-soft">
                {[
                  ["Category", app.category],
                  ["Developer", d.developer],
                  ["Pricing", d.pricing],
                  ["Languages", d.languages.join(", ")],
                  ["Last updated", formatDate(d.updatedAt, "long")],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line py-3 first:pt-0 last:border-0 last:pb-0">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <p className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">Works with</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {d.worksWith.map((w) => (
                    <li key={w.href}>
                      <Link href={w.href} className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", t.soft)}>
                        {w.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[var(--radius-card)] bg-tint-violet p-6 text-sm">
                <p className="font-semibold text-fg">Reviewed for security</p>
                <p className="mt-1 text-muted">Every Marketplace app passes a security and functionality review before it&apos;s listed.</p>
                <Link href="/trust/security" className="mt-3 inline-block font-semibold text-primary hover:underline">
                  How we review apps
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section bg="soft">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader align="left" className="!mb-0" eyebrow="More apps" title={sameCategory.length ? `More ${app.category.toLowerCase()} apps` : "You might also like"} />
            <Link href="/marketplace" className="font-semibold text-primary hover:underline">
              Browse all apps
            </Link>
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <StaggerItem key={a.slug} className="h-full">
                <AppCard app={a} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <CTABand
        title={`Build your own ${B} app`}
        subtitle="Use our APIs and SDKs to connect your tools, then publish to millions of users."
        primary={{ label: "Start building", href: "/developers" }}
        secondary={{ label: "Partner programme", href: "/partners" }}
      />
    </>
  );
}
