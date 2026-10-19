import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowRight, Users } from "lucide-react";
import { templates, type TemplateCategory, type TemplatePart } from "@/data/templates";
import type { MockupKind } from "@/components/mockups";
import { Mockup } from "@/components/mockups";
import { CTABand } from "@/components/sections/common";
import { InstallButton } from "@/components/sections/install-button";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { GradientBlobs } from "@/components/ui/blobs";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { PageSkeleton } from "@/components/ui/page-skeleton";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneStyles } from "@/lib/tones";
import { cn } from "@/lib/utils";
import { navCrumbs } from "@/lib/breadcrumbs";

const parts: Record<TemplatePart, { icon: IconName; href: string; feature: string }> = {
  Channel: { icon: "hash", href: "/features/channels", feature: "Channels" },
  Canvas: { icon: "file", href: "/features/canvas", feature: "Canvas" },
  List: { icon: "listChecks", href: "/features/task-list", feature: "Lists" },
  Workflow: { icon: "workflow", href: "/features/workflow-automation", feature: "Workflow Builder" },
  Agent: { icon: "bot", href: "/ai-agents", feature: `${B} Agents` },
};

const categoryMockup: Record<TemplateCategory, MockupKind> = {
  "Project management": "lists",
  Engineering: "code",
  Sales: "crm",
  Marketing: "canvas",
  HR: "atlas",
  IT: "workflow",
  "Customer service": "chat-team",
  Operations: "lists",
};

const categorySolution: Record<TemplateCategory, string> = {
  "Project management": "/solutions/project-management",
  Engineering: "/solutions/engineering",
  Sales: "/solutions/sales",
  Marketing: "/solutions/marketing",
  HR: "/solutions/human-resources",
  IT: "/solutions/information-technology",
  "Customer service": "/solutions/customer-service",
  Operations: "/solutions/task-management",
};

const getTemplate = (slug: string) => templates.find((t) => t.slug === slug);

// Unknown slugs wait for the full render, so notFound() sends a real 404 instead of a 200 loading shell
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/templates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const tpl = getTemplate(slug);
  if (!tpl) return { title: "Template not found" };
  return buildMetadata({
    title: `${tpl.name} template`,
    description: `${tpl.description} Includes ${tpl.includes.join(", ").toLowerCase()} you can set up in one click.`,
    path: `/templates/${tpl.slug}`,
  });
}

export default function TemplatePage({ params }: PageProps<"/templates/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton variant="hero" />}>
      <TemplateContent params={params} />
    </Suspense>
  );
}

async function TemplateContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tpl = getTemplate(slug);
  if (!tpl) notFound();
  const t = toneStyles[tpl.tone];
  const related = [
    ...templates.filter((x) => x.slug !== tpl.slug && x.category === tpl.category),
    ...templates.filter((x) => x.slug !== tpl.slug && x.category !== tpl.category && x.popular),
  ].slice(0, 3);

  return (
    <>
      <section className={cn("under-header relative overflow-hidden pb-14 md:pb-20", t.tint)}>
        <GradientBlobs className="opacity-50" />
        <div className="container-page relative">
          <Breadcrumbs items={navCrumbs("/templates/gallery", { section: "solutions", label: "Template gallery" }, [{ label: tpl.category }, { label: tpl.name }])} />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
            <div className="flex flex-col items-start gap-5">
              <span className={cn("inline-flex size-14 animate-fade-up items-center justify-center rounded-2xl", t.solid)}>
                <Icon name={tpl.icon} className="size-7" />
              </span>
              <p className={cn("animate-fade-up text-sm font-bold tracking-[0.12em] uppercase", t.ink)}>{tpl.category} template</p>
              <h1 className="animate-fade-up text-display-lg font-extrabold text-fg [animation-delay:80ms]">{tpl.name}</h1>
              <p className="max-w-xl animate-fade-up text-lead text-muted [animation-delay:160ms]">{tpl.description}</p>
              <ul className="flex animate-fade-up flex-wrap gap-2 [animation-delay:200ms]">
                {tpl.includes.map((p) => (
                  <li key={p} className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-fg shadow-soft">
                    <Icon name={parts[p].icon} className="size-4" />
                    {p}
                  </li>
                ))}
                <li className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm text-muted">
                  <Users className="size-4" aria-hidden="true" /> Used by {tpl.uses} teams
                </li>
              </ul>
              <div className="animate-fade-up [animation-delay:260ms]">
                <InstallButton label="Use this template" doneLabel="Template added" />
              </div>
            </div>
            <div className="animate-fade-up [animation-delay:200ms]">
              <Mockup kind={categoryMockup[tpl.category]} />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeader eyebrow="What's inside" tone={tpl.tone} title="Everything set up for you" subtitle="Each piece is created and connected the moment you use the template, so your team can start right away." />
        <Stagger className="grid gap-5 md:grid-cols-2">
          {tpl.contents.map((c, i) => (
            <StaggerItem key={c.title} className="h-full">
              <div className="flex h-full gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-xl", t.soft)}>
                  <Icon name={parts[c.part].icon} className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-bold tracking-[0.12em] text-subtle uppercase">
                    {i + 1}. {c.part}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold text-fg">{c.title}</h3>
                  <p className="mt-1 text-muted">{c.detail}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section bg="soft">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-display-sm font-bold text-fg">Set it up in three steps</h2>
            <ol className="mt-6 flex flex-col gap-5">
              {[
                { title: "Use the template", body: `Click “Use this template” and pick the ${B} workspace to add it to.` },
                { title: "Make it yours", body: "Rename the channel, invite your team and adjust the canvas, list columns or workflow steps." },
                { title: "Kick things off", body: "Post your first update. Automations and agents start working immediately." },
              ].map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full font-bold", t.solid)}>{i + 1}</span>
                  <span>
                    <span className="block font-display text-lg font-bold text-fg">{s.title}</span>
                    <span className="text-muted">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-display-sm font-bold text-fg">Built with</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {tpl.includes.map((p) => (
                <li key={p}>
                  <Link
                    href={parts[p].href}
                    className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-soft transition-shadow hover:shadow-card"
                  >
                    <span className={cn("inline-flex size-10 items-center justify-center rounded-xl", t.soft)}>
                      <Icon name={parts[p].icon} className="size-5" />
                    </span>
                    <span className="flex-1 font-semibold text-fg">{parts[p].feature}</span>
                    <ArrowRight className="size-4 text-subtle transition-transform group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href={categorySolution[tpl.category]} className="inline-flex items-center gap-1.5 px-1 pt-2 text-sm font-semibold text-primary hover:underline">
                  See {B} for {tpl.category.toLowerCase()} teams
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </Reveal>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader align="left" className="!mb-0" eyebrow="More templates" title="You might also like" />
            <Link href="/templates/gallery" className="font-semibold text-primary hover:underline">
              Browse the gallery
            </Link>
          </div>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <StaggerItem key={r.slug} lift className="h-full">
                <Link href={`/templates/${r.slug}`} className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-card">
                  <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", toneStyles[r.tone].solid)}>
                    <Icon name={r.icon} className="size-5" />
                  </span>
                  <span className="mt-4 text-xs font-bold tracking-[0.12em] text-subtle uppercase">{r.category}</span>
                  <span className="mt-1 font-display text-lg font-bold text-fg">{r.name}</span>
                  <span className="mt-2 flex-1 text-sm text-muted">{r.description}</span>
                  <span className="mt-4 text-xs text-subtle">{r.includes.join(" · ")}</span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      )}

      <CTABand title="Start your next project from a template" subtitle="Free for small teams. Set up in seconds." primary={{ label: "Get started", href: "/get-started" }} secondary={{ label: "Templates feature", href: "/features/templates" }} />
    </>
  );
}
