import { B } from "@/lib/site";

export type Job = {
  slug: string;
  title: string;
  team: "Engineering" | "Design" | "Product" | "Marketing" | "Sales" | "Customer Experience" | "People";
  location: string;
  workplace: "Remote" | "Hybrid" | "On-site";
  type: "Full-time" | "Contract";
  salary: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const jobs: Job[] = [
  {
    slug: "staff-software-engineer-real-time-infrastructure",
    title: "Staff Software Engineer, Real-time Infrastructure",
    team: "Engineering",
    location: "San Francisco, CA",
    workplace: "Hybrid",
    type: "Full-time",
    salary: "$215,000–$275,000",
    summary: `You will help design the systems that deliver billions of messages a day to ${B} clients in under 200 milliseconds. This is a hands-on technical leadership role on the team that owns our gateways, channel servers and fan-out pipeline.`,
    responsibilities: [
      "Lead the design of regional channel ownership and cross-region leader handoff",
      "Improve end-to-end message latency by working across server, network and client layers",
      "Own reliability for a tier-zero service, including capacity planning and incident reviews",
      "Mentor engineers and raise the bar for design reviews across the infrastructure organization",
    ],
    requirements: [
      "8+ years building and operating large-scale distributed systems in production",
      "Deep experience with a systems language such as Go, Rust, Java or C++",
      "Strong understanding of networking, consistency models and failure handling",
      "A track record of leading multi-quarter technical projects across several teams",
      "Clear written communication and a habit of documenting decisions",
    ],
  },
  {
    slug: "senior-product-designer-ai-experiences",
    title: "Senior Product Designer, AI Experiences",
    team: "Design",
    location: "New York, NY",
    workplace: "Hybrid",
    type: "Full-time",
    salary: "$170,000–$215,000",
    summary: `Shape how millions of people work alongside AI agents and recaps in ${B}. You will partner with product, research and engineering to design experiences that are useful, trustworthy and genuinely delightful.`,
    responsibilities: [
      "Design end-to-end experiences for agents, recaps and AI search across desktop and mobile",
      "Prototype quickly, including working with real model outputs rather than idealized mockups",
      "Run and synthesize research to understand how people build trust in AI features",
      "Contribute patterns for AI interactions to Prism, our design system",
      "Present work clearly to stakeholders and incorporate feedback with good judgment",
    ],
    requirements: [
      "5+ years of product design experience on complex, collaborative software",
      "A portfolio that shows strong interaction design, visual craft and systems thinking",
      "Experience designing for AI or other probabilistic systems is a strong plus",
      "Comfort working in ambiguity and defining problems as well as solutions",
      "A solid grasp of accessibility principles and inclusive design",
    ],
  },
  {
    slug: "product-manager-enterprise-admin",
    title: "Product Manager, Enterprise Admin",
    team: "Product",
    location: "Remote, United States",
    workplace: "Remote",
    type: "Full-time",
    salary: "$185,000–$230,000",
    summary: "Own the tools that IT and security administrators use to manage our largest customers, from provisioning and permissions to audit logs and data residency. You will turn complex enterprise requirements into products admins actually enjoy using.",
    responsibilities: [
      "Set strategy and roadmap for identity, provisioning and admin controls",
      "Work directly with enterprise customers, including CIOs and security teams, to understand their needs",
      "Partner with engineering and design to ship high-quality features on a predictable cadence",
      "Define success metrics and use data to guide prioritization",
    ],
    requirements: [
      "5+ years of product management experience, including B2B or enterprise software",
      "Familiarity with identity standards such as SAML, SCIM and OAuth",
      "Ability to translate technical and compliance requirements into clear product plans",
      "Excellent written communication and stakeholder management skills",
    ],
  },
  {
    slug: "enterprise-account-executive-financial-services",
    title: "Enterprise Account Executive, Financial Services",
    team: "Sales",
    location: "London, UK",
    workplace: "Hybrid",
    type: "Full-time",
    salary: "£110,000–£135,000 base + commission",
    summary: `Help banks, insurers and asset managers across the UK and Ireland transform how their teams work with ${B}. You will run complex sales cycles with senior stakeholders and partner closely with solutions engineers and our cloud partners.`,
    responsibilities: [
      "Build and manage a pipeline of strategic financial services accounts",
      "Lead multi-stakeholder sales cycles involving IT, security, compliance and business leaders",
      "Collaborate with partners on joint opportunities in sovereign cloud regions",
      "Forecast accurately and keep account plans current in our CRM",
      "Represent customer needs to product and leadership teams",
    ],
    requirements: [
      "7+ years of enterprise SaaS sales experience, ideally selling into financial services",
      "A consistent record of meeting or exceeding annual targets of £1M or more",
      "Experience navigating security and procurement reviews in regulated industries",
      "Strong executive presence and consultative selling skills",
    ],
  },
  {
    slug: "customer-success-manager-strategic",
    title: "Strategic Customer Success Manager",
    team: "Customer Experience",
    location: "Toronto, ON",
    workplace: "Remote",
    type: "Full-time",
    salary: "CA$120,000–CA$150,000",
    summary: `Be a trusted advisor to a portfolio of our largest customers as they roll out ${B}, agents and workflows across thousands of employees. You will own adoption, value realization and renewal outcomes for your accounts.`,
    responsibilities: [
      "Build success plans with executive sponsors and track progress against business goals",
      "Lead rollout programs, including change management, training and champion networks",
      "Run quarterly business reviews that tie usage to measurable outcomes",
      "Identify expansion opportunities and partner with account executives on renewals",
      "Share customer feedback with product teams and advocate for priority fixes",
    ],
    requirements: [
      "5+ years in customer success, consulting or account management for enterprise SaaS",
      "Experience leading change management for large, distributed organizations",
      "Comfort discussing technical topics such as SSO, integrations and data governance",
      "Excellent presentation and relationship-building skills",
    ],
  },
  {
    slug: "people-partner-engineering",
    title: "People Partner, Engineering",
    team: "People",
    location: "Austin, TX",
    workplace: "On-site",
    type: "Full-time",
    salary: "$145,000–$180,000",
    summary: "Partner with engineering leaders to build healthy, high-performing teams as we grow. You will advise on organizational design, performance, career growth and employee relations for about 400 engineers.",
    responsibilities: [
      "Advise engineering directors and managers on team structure, leveling and performance",
      "Lead talent processes such as calibration, promotions and engagement surveys for your client groups",
      "Coach managers through difficult conversations and employee relations cases",
      "Use people data to spot trends and recommend practical improvements",
    ],
    requirements: [
      "6+ years of HR business partner experience, including supporting technical teams",
      "Strong knowledge of US employment practices and performance management",
      "Sound judgment, discretion and the ability to influence senior leaders",
      "Experience in a fast-growing technology company",
      "A data-informed approach to recommendations and program design",
    ],
  },
];
