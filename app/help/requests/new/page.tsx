import Link from "next/link";
import { Activity, BookOpen, Clock, MessagesSquare } from "lucide-react";
import { helpArticles, helpCategories } from "@/data/help";
import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { Reveal } from "@/components/ui/motion";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";
import { navCrumbs } from "@/lib/breadcrumbs";

export const metadata = buildMetadata({
  title: "Contact customer support",
  description: `Submit a request to ${B} customer support. Tell us what's happening in your workspace and our team will reply by email, 24/7 on paid plans.`,
  path: "/help/requests/new",
});

export default function SupportRequestPage() {
  const suggested = helpArticles.slice(0, 4);
  return (
    <section className="under-header bg-bg-soft pb-24">
      <div className="container-page">
        <Breadcrumbs items={navCrumbs("/help/requests/new", { section: "resources", label: "Customer support" })} />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div>
            <h1 className="animate-fade-up text-display-md font-extrabold text-fg">How can we help?</h1>
            <p className="mt-3 max-w-2xl animate-fade-up text-lead text-muted [animation-delay:80ms]">
              Tell us what&apos;s going on and include as much detail as you can. We&apos;ll reply to your email, usually within a few hours.
            </p>
            <Reveal className="mt-8 rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
              <LeadForm
                submitLabel="Submit request"
                successTitle="Request received"
                successBody="Thanks! Your ticket number is #482915. We've emailed you a copy and will reply as soon as possible. (Demo: nothing was sent.)"
                fields={[
                  { name: "email", label: "Your email address", type: "email", required: true, autoComplete: "email", half: true },
                  { name: "workspace", label: `Workspace URL`, placeholder: `your-team.${site.domain}`, half: true },
                  { name: "topic", label: "What's this about?", type: "select", required: true, options: [...helpCategories.map((c) => c.name as string), "Something else"], half: true },
                  { name: "urgency", label: "How urgent is it?", type: "select", required: true, options: ["Low: general question", "Normal: something isn't working", "High: work is blocked", "Critical: workspace is down"], half: true },
                  { name: "subject", label: "Subject", required: true },
                  { name: "description", label: "Describe the issue", type: "textarea", required: true, placeholder: "What happened, what you expected, and the steps to reproduce it" },
                  { name: "consent", label: "I agree that support may access my workspace's metadata to investigate this request.", type: "checkbox", required: true },
                ]}
              />
            </Reveal>
          </div>
          <aside className="flex flex-col gap-5">
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <p className="flex items-center gap-2 font-display text-lg font-bold text-fg">
                <BookOpen className="size-5 text-primary" aria-hidden="true" /> Try these articles first
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {suggested.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/help/${a.slug}`} className="font-semibold text-fg hover:text-primary">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {[
              { icon: Clock, title: "Response times", body: "24/7 on Business+ and Enterprise, with a 4-hour first response. Business hours on Pro and Free." },
              { icon: Activity, title: "Is something down?", body: "Check live service status before submitting a request.", href: "/status", cta: "View system status" },
              { icon: MessagesSquare, title: "Ask the community", body: `Thousands of admins share ${B} tips every day.`, href: "/community", cta: "Visit the community" },
            ].map((c) => (
              <div key={c.title} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                <p className="flex items-center gap-2 font-semibold text-fg">
                  <c.icon className="size-5 text-primary" aria-hidden="true" /> {c.title}
                </p>
                <p className="mt-1 text-sm text-muted">{c.body}</p>
                {c.href && (
                  <Link href={c.href} className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">
                    {c.cta}
                  </Link>
                )}
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
