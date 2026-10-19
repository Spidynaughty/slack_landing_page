import { Check } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Breadcrumbs } from "@/components/sections/page-hero";
import { GradientBlobs } from "@/components/ui/blobs";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { ReviewSpotlight } from "@/components/sections/reviews";

export const metadata = buildMetadata({
  title: "Request a demo",
  description: `Talk to the ${B} sales team. Get a tailored demo, pricing for your organization, security and compliance answers, and a rollout plan for your teams.`,
  path: "/contact-sales",
});

export default function ContactSalesPage() {
  return (
    <>
      <section className="under-header relative overflow-hidden pb-20">
        <GradientBlobs />
        <div className="container-page relative">
          <Breadcrumbs items={[{ label: "Request a demo" }]} />
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="flex flex-col gap-6">
              <h1 className="animate-fade-up text-display-lg font-extrabold text-fg">
                See how {B} fits <span className="text-gradient">your team</span>
              </h1>
              <p className="animate-fade-up text-lead text-muted [animation-delay:100ms]">
                Tell us a little about your organization and a product specialist will set up a personalized demo.
              </p>
              <ul className="flex animate-fade-up flex-col gap-3 [animation-delay:180ms]">
                {[
                  "A demo tailored to your workflows and tools",
                  "Pricing for your team size and plan",
                  "Answers on security, compliance and AI governance",
                  "A rollout and adoption plan for every department",
                ].map((i) => (
                  <li key={i} className="flex items-center gap-3 text-fg">
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-mint/15 text-mint-ink">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
              <ReviewSpotlight className="mt-4 hidden animate-fade-up [animation-delay:260ms] lg:block" />
            </div>
            <div className="animate-fade-up rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card [animation-delay:150ms] sm:p-8">
              <h2 className="mb-6 font-display text-2xl font-bold text-fg">Request a demo</h2>
              <LeadForm
                formName="Demo request"
                submitLabel="Request demo"
                successTitle="Thanks! We'll be in touch soon"
                successBody="A member of our sales team will email you within one business day to find a time that works."
                fields={[
                  { name: "first", label: "First name", required: true, autoComplete: "given-name", half: true },
                  { name: "last", label: "Last name", required: true, autoComplete: "family-name", half: true },
                  { name: "email", label: "Work email", type: "email", required: true, autoComplete: "email", half: true },
                  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", half: true },
                  { name: "company", label: "Company name", required: true, autoComplete: "organization", half: true },
                  { name: "size", label: "Company size", type: "select", required: true, options: ["1–50", "51–200", "201–1,000", "1,001–5,000", "5,000+"], half: true },
                  { name: "country", label: "Country / region", type: "select", options: ["United States", "Canada", "United Kingdom", "Germany", "France", "Japan", "Australia", "India", "Brazil", "Other"], half: true },
                  { name: "interest", label: "Most interested in", type: "select", options: ["AI & agents", "Enterprise security", "Migrating from another tool", "Workflow automation", "Something else"], half: true },
                  { name: "message", label: "Anything else we should know?", type: "textarea" },
                  { name: "consent", label: "Yes, I'd like occasional product updates by email. You can unsubscribe at any time.", type: "checkbox" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
      <LogoCloud />
    </>
  );
}
