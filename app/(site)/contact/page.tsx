import Link from "next/link";
import { ArrowRight, Headset, LifeBuoy, Mail, MapPin, Newspaper, Handshake } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PageHero } from "@/components/sections/page-hero";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B, site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact us",
  description: `Get in touch with ${B}. Reach sales, customer support, press, partnerships or our offices in San Francisco, New York, London, Dublin, Tokyo and Sydney.`,
  path: "/contact",
});

const routes = [
  { icon: Handshake, title: "Sales", body: "Talk about plans, pricing and a tailored demo.", href: "/contact-sales", cta: "Contact sales" },
  { icon: LifeBuoy, title: "Support", body: "Get help with your workspace, 24/7 on paid plans.", href: "/help", cta: "Visit Help Centre" },
  { icon: Newspaper, title: "Press", body: "Media inquiries, logos and executive bios.", href: "/media-kit", cta: "Open media kit" },
  { icon: Headset, title: "Partners", body: "Join our partner and developer programmes.", href: "/partners", cta: "Partner programme" },
];

const offices = [
  { city: "San Francisco", address: "500 Harbor Street, CA 94105", note: "Global HQ" },
  { city: "New York", address: "88 Hudson Yards, NY 10001", note: "Americas" },
  { city: "London", address: "21 Canal Street, EC2A 4BX", note: "EMEA" },
  { city: "Dublin", address: "4 Grand Canal Quay, D02", note: "EMEA support" },
  { city: "Tokyo", address: "1-2-3 Marunouchi, Chiyoda", note: "APAC" },
  { city: "Sydney", address: "200 George Street, NSW 2000", note: "APAC" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        layout="center"
        eyebrow="Contact us"
        title={
          <>
            We&apos;d love to <span className="text-gradient">hear from you</span>
          </>
        }
        subtitle="Choose the team you'd like to reach, or send us a message and we'll route it to the right people."
        className="!pb-10"
      />
      <Section className="!pt-4">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {routes.map((r) => (
            <StaggerItem key={r.title} lift className="h-full">
              <Link href={r.href} className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft hover:shadow-card">
                <r.icon className="size-7 text-primary" aria-hidden="true" />
                <h2 className="mt-4 font-display text-xl font-bold text-fg">{r.title}</h2>
                <p className="mt-1 flex-1 text-muted">{r.body}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  {r.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
      <Section bg="soft">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal className="flex flex-col gap-5">
            <SectionHeader align="left" className="!mb-0" eyebrow="Send a message" title="Not sure who to ask?" />
            <p className="text-lead text-muted">Send us a note and we&apos;ll get it to the right team. We usually reply within one business day.</p>
            <p className="flex items-center gap-2 text-fg">
              <Mail className="size-5 text-primary" aria-hidden="true" /> hello@{site.domain}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-card sm:p-8">
            <LeadForm
              formName="Contact message"
              submitLabel="Send message"
              successTitle="Message sent"
              successBody="Thanks for reaching out. We'll reply to your email within one business day."
              fields={[
                { name: "name", label: "Name", required: true, autoComplete: "name", half: true },
                { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
                { name: "topic", label: "Topic", type: "select", required: true, options: ["General question", "Billing", "Press", "Partnerships", "Careers", "Accessibility", "Other"] },
                { name: "message", label: "Message", type: "textarea", required: true },
              ]}
            />
          </Reveal>
        </div>
      </Section>
      <Section>
        <SectionHeader eyebrow="Offices" title="Find us around the world" />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((o) => (
            <StaggerItem key={o.city} className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">{o.note}</p>
              <h3 className="mt-1 font-display text-xl font-bold text-fg">{o.city}</h3>
              <p className="mt-2 flex items-start gap-2 text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                {o.address}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>
    </>
  );
}
