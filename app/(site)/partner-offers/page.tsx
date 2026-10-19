import Link from "next/link";
import { Info } from "lucide-react";
import { apps } from "@/data/integrations";
import { CTABand } from "@/components/sections/common";
import { PageHero } from "@/components/sections/page-hero";
import { Icon, type IconName } from "@/components/ui/icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";
import { toneAt, toneStyles } from "@/lib/tones";
import { cn, formatDate } from "@/lib/utils";
import { OffersGrid, type Offer, type OfferType } from "./_components/offers-grid";
import { navCrumbs } from "@/lib/breadcrumbs";

export const generateMetadata = () => buildMetadata({
  title: "Partner offers and exclusive app deals",
  description: `Exclusive partner offers for ${B} customers: free months, extended trials and annual discounts on popular apps for files, projects, finance and more.`,
  path: "/partner-offers",
});

type OfferTerms = {
  deal: string;
  detail: string;
  type: OfferType;
  plans: string[];
  expires: string;
  tag?: Offer["tag"];
};

const PAID = ["Pro", "Business+", "Enterprise"];

/** Deal terms keyed by app slug from data/integrations.ts. */
const offerTerms: Record<string, OfferTerms> = {
  drivewise: {
    deal: "3 months free",
    detail: "Three months of Drivewise Business for teams new to Drivewise, up to 100 seats.",
    type: "Free period",
    plans: PAID,
    expires: "2026-12-31",
    tag: "Popular",
  },
  trackly: {
    deal: "20% off annual",
    detail: "Save 20% on the first year of any annual Trackly plan.",
    type: "Discount",
    plans: PAID,
    expires: "2027-03-31",
  },
  calendo: {
    deal: "6 months free",
    detail: "Six months of Calendo Premium, including team scheduling links.",
    type: "Free period",
    plans: PAID,
    expires: "2027-01-31",
  },
  pagerline: {
    deal: "50% off for 6 months",
    detail: "Half off Pagerline Business for six months when you connect an incident channel.",
    type: "Discount",
    plans: ["Business+", "Enterprise"],
    expires: "2027-02-28",
    tag: "New",
  },
  gitnest: {
    deal: "3 months free",
    detail: "Three months of the GitNest Team plan with unlimited private repositories.",
    type: "Free period",
    plans: PAID,
    expires: "2026-12-31",
  },
  paletta: {
    deal: "25% off annual",
    detail: "Save 25% on Paletta Professional seats billed annually.",
    type: "Discount",
    plans: PAID,
    expires: "2027-04-30",
  },
  hireloop: {
    deal: "30% off first year",
    detail: "30% off HireLoop Growth for your first 12 months, plus free setup.",
    type: "Discount",
    plans: ["Business+", "Enterprise"],
    expires: "2027-01-31",
  },
  pulsecheck: {
    deal: "90-day premium trial",
    detail: "Premium dashboards, metric alerts and unlimited snapshots free for 90 days.",
    type: "Extended trial",
    plans: PAID,
    expires: "2027-03-31",
  },
  vaultguard: {
    deal: "Free security review",
    detail: "A complimentary 30-day posture assessment and 15% off your first annual contract.",
    type: "Extended trial",
    plans: ["Enterprise"],
    expires: "2027-06-30",
  },
  supportly: {
    deal: "3 months free",
    detail: "Three months of Supportly Growth for up to 25 agents.",
    type: "Free period",
    plans: PAID,
    expires: "2026-11-30",
    tag: "Ending soon",
  },
  signflow: {
    deal: "40% off annual",
    detail: "Save 40% on Signflow Standard for the first year, with unlimited templates.",
    type: "Discount",
    plans: PAID,
    expires: "2027-02-28",
  },
  "datalake-hub": {
    deal: "60-day free trial",
    detail: "Query up to 1 TB of warehouse data free for 60 days, then 15% off annual plans.",
    type: "Extended trial",
    plans: ["Business+", "Enterprise"],
    expires: "2027-05-31",
    tag: "New",
  },
  mailwave: {
    deal: "20% off annual",
    detail: "Save 20% on Mailwave Standard and Premium plans billed annually.",
    type: "Discount",
    plans: PAID,
    expires: "2027-01-31",
  },
  expensio: {
    deal: "2 months free",
    detail: "Two free months of Expensio for your whole team, then 10% off annual plans.",
    type: "Free period",
    plans: PAID,
    expires: "2027-03-31",
  },
};

const steps: { icon: IconName; title: string; body: string }[] = [
  { icon: "search", title: "Pick an offer", body: "Browse deals above and choose the apps that fit how your team works." },
  { icon: "ticket", title: "Get your code", body: "Reveal the offer code and copy it. Codes are unique to this program." },
  { icon: "plug", title: "Connect the app", body: `Install the app from the marketplace and connect it to your ${B} workspace.` },
  { icon: "check", title: "Apply at checkout", body: "Enter the code when you subscribe with the partner. Savings apply right away." },
];

export default function PartnerOffersPage() {
  const offers: Offer[] = apps
    .filter((a) => offerTerms[a.slug])
    .map((a) => {
      const terms = offerTerms[a.slug];
      return {
        slug: a.slug,
        name: a.name,
        category: a.category,
        description: a.description,
        icon: a.icon,
        tone: a.tone,
        deal: terms.deal,
        detail: terms.detail,
        type: terms.type,
        plans: terms.plans,
        expires: formatDate(terms.expires),
        code: `PARTNER-${a.slug.replace(/-/g, "").toUpperCase().slice(0, 8)}-${terms.expires.slice(2, 4)}${terms.expires.slice(5, 7)}`,
        tag: terms.tag,
      };
    });

  return (
    <>
      <PageHero
        layout="center"
        crumbs={navCrumbs("/partner-offers", { section: "resources", label: "Partner offers" })}
        eyebrow="Partner offers"
        tone="coral"
        title={
          <>
            Exclusive deals on the apps <span className="text-gradient">your team loves</span>
          </>
        }
        subtitle={`Free months, extended trials and annual discounts from our technology partners, available only to ${B} customers.`}
        primary={{ label: "How to redeem", href: "/partner-offers#redeem" }}
        secondary={{ label: "Browse the marketplace", href: "/marketplace" }}
        note={`${Object.keys(offerTerms).length} offers available now for workspaces on paid plans. New deals added every month.`}
        className="!pb-6"
      />

      <Section className="!pt-8">
        <OffersGrid offers={offers} />
      </Section>

      {/* How to redeem */}
      <Section bg="soft" id="redeem">
        <SectionHeader eyebrow="How it works" tone="mint" title="Redeem an offer in four steps" subtitle="Most teams are up and running with a new app in under ten minutes." />
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => {
            const t = toneStyles[toneAt(i)];
            return (
              <StaggerItem key={s.title} className="h-full">
                <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl font-extrabold text-gradient">0{i + 1}</span>
                    <span className={cn("inline-flex size-11 items-center justify-center rounded-xl", t.soft)}>
                      <Icon name={s.icon} className="size-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-fg">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      {/* Terms */}
      <Section>
        <Reveal className="mx-auto max-w-4xl rounded-[var(--radius-panel)] border border-line bg-surface p-6 shadow-soft sm:p-10">
          <div className="flex items-start gap-4">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-primary">
              <Info className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-fg">Offer terms</h2>
              <p className="mt-1 text-muted">Please read these before redeeming. Each partner&apos;s own terms also apply.</p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-muted sm:grid-cols-2">
            {[
              `Offers are available to workspaces on eligible paid ${B} plans in good standing.`,
              "Unless stated otherwise, offers are for new customers of the partner app only.",
              "One redemption per workspace per offer. Codes cannot be combined or exchanged for cash.",
              "Partners set their own pricing and may change or end an offer after its stated end date.",
              "After any free or discounted period, the partner's standard pricing applies unless you cancel.",
              `Partner apps are provided by third parties, not by ${B}. Review each app's privacy policy before installing.`,
            ].map((term) => (
              <li key={term} className="flex items-start gap-2.5">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                {term}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-line pt-5 text-xs text-subtle">
            Offers on this demo site are illustrative and codes cannot be redeemed. See our{" "}
            <Link href="/legal/terms" className="font-semibold text-primary underline-offset-2 hover:underline">
              Terms of Service
            </Link>{" "}
            for full details.
          </p>
        </Reveal>
      </Section>

      <CTABand
        title="Are you a technology partner?"
        subtitle={`Put your app in front of more than 750,000 organizations by featuring an exclusive offer for ${B} customers.`}
        primary={{ label: "Join the partner program", href: "/partners" }}
        secondary={{ label: "Explore integrations", href: "/integrations" }}
      />
    </>
  );
}
