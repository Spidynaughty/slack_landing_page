import { jobs } from "@/data/jobs";
import { CTABand, IconCardGrid, QuoteBlock, StatsBand } from "@/components/sections/common";
import { JobBoard } from "@/components/sections/job-board";
import { PageHero } from "@/components/sections/page-hero";
import { Mockup } from "@/components/mockups";
import { Section, SectionHeader } from "@/components/ui/section";
import { buildMetadata } from "@/lib/seo";
import { B } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Careers: build the future of work",
  description: `Join ${B} to build software millions of people use every day. Explore open roles in engineering, design, product, sales and more, with remote and hybrid options.`,
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        tone="pink"
        title={
          <>
            Do the best work <span className="text-gradient">of your career</span>
          </>
        }
        subtitle={`We're building the place where the world works, and we're looking for curious, kind and ambitious people to help.`}
        primary={{ label: "See open roles", href: "#roles" }}
        secondary={{ label: "About us", href: "/about" }}
        visual={<Mockup kind="chat-team" />}
      />
      <StatsBand
        stats={[
          { value: 2800, suffix: "+", label: "teammates worldwide" },
          { value: 14, label: "offices and hubs" },
          { value: 62, suffix: "%", label: "work remote or hybrid" },
          { value: 4.6, decimals: 1, suffix: "/5", label: "employee rating" },
        ]}
      />
      <Section>
        <SectionHeader eyebrow="Life here" title="Benefits that support your whole life" />
        <IconCardGrid
          items={[
            { icon: "health", title: "Health & wellbeing", body: "Comprehensive medical, dental and vision for you and your family, plus a monthly wellness stipend." },
            { icon: "globe", title: "Work from anywhere", body: "Remote-friendly roles, four weeks a year working from any country, and a home office budget." },
            { icon: "heart", title: "Time to recharge", body: "Generous paid time off, company-wide rest weeks and 16 weeks of paid parental leave." },
            { icon: "graduation", title: "Learning budget", body: "$2,000 a year for courses, conferences and books, plus mentorship programmes." },
            { icon: "trending", title: "Ownership", body: "Equity for every employee and a transparent compensation framework." },
            { icon: "users", title: "Belonging", body: "Employee resource groups, inclusive hiring and a culture where every voice is heard." },
          ]}
        />
      </Section>
      <Section bg="soft">
        <QuoteBlock
          quote="I've never worked anywhere where my ideas went from a channel thread to shipped product so quickly. The people here genuinely care about craft."
          name="Imani Clarke"
          role="Senior Engineer, Huddles"
          tone="pink"
        />
      </Section>
      <Section id="roles" className="scroll-mt-20">
        <SectionHeader eyebrow="Open roles" title="Find your next role" subtitle="Don't see the perfect fit? We still want to hear from you." />
        <div className="mx-auto max-w-4xl">
          <JobBoard jobs={jobs} />
        </div>
      </Section>
      <CTABand title="Questions about working here?" subtitle="Our recruiting team is happy to chat about roles, teams and what it's like to work at a fast-growing company." primary={{ label: "Contact recruiting", href: "/contact" }} secondary={{ label: "Engineering blog", href: "/engineering-blog" }} />
    </>
  );
}
