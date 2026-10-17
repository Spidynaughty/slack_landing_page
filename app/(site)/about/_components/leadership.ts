import { B } from "@/lib/site";
import type { Tone } from "@/lib/tones";

export type Leader = {
  name: string;
  role: string;
  initials: string;
  tone: Tone;
  /** One or two sentences for team grids. */
  bio: string;
  /** Longer press-ready biography used in the media kit. */
  pressBio?: string;
};

/** Fictional leadership team, shared by the About page and the media kit. */
export const leaders: Leader[] = [
  {
    name: "Julian Mercer",
    role: "Co-founder and Chief Executive Officer",
    initials: "JM",
    tone: "violet",
    bio: `Julian co-founded ${B} after a decade running distributed design teams and has led the company from a six-person studio to a global platform.`,
    pressBio: `Julian Mercer is the co-founder and CEO of ${B}. Before starting the company in 2016, he spent ten years building and leading distributed design teams for consumer and enterprise software companies, an experience that convinced him work was being lost between inboxes, meetings and too many tools. Julian has guided ${B} from a six-person studio in Oakland to a platform used by more than 750,000 organizations. He serves on the board of a nonprofit that teaches product design in public high schools.`,
  },
  {
    name: "Lena Hoffmann",
    role: "Co-founder and Chief Technology Officer",
    initials: "LH",
    tone: "mint",
    bio: "Lena wrote the first version of the real-time messaging engine and now leads engineering, infrastructure and research across 11 offices.",
    pressBio: `Lena Hoffmann is the co-founder and CTO of ${B}, where she leads engineering, infrastructure and applied research. She wrote the first version of the company's real-time messaging engine and has since overseen its growth to more than four billion messages delivered every day. Previously, Lena was a distributed systems engineer at a large payments network. She holds a master's degree in computer science and speaks frequently about reliability engineering and building inclusive engineering cultures.`,
  },
  {
    name: "Priya Raman",
    role: "Chief Product Officer",
    initials: "PR",
    tone: "sun",
    bio: `Priya leads product and design, including the launch of ${B} AI and agents, and believes the best software disappears into the work itself.`,
    pressBio: `Priya Raman is Chief Product Officer at ${B}, responsible for product management, design and user research. Since joining in 2019, she has led the launch of huddles, canvases, lists and, most recently, ${B} AI and agents, now available on every paid plan. Priya previously led product teams for collaboration and productivity software used by millions of people. She is an advisor to several early-stage startups and a mentor for first-time product managers.`,
  },
  {
    name: "Samuel Okonjo",
    role: "Chief Financial Officer",
    initials: "SO",
    tone: "coral",
    bio: "Samuel oversees finance, legal and corporate development, with a focus on durable, efficient growth.",
  },
  {
    name: "Grace Whitaker",
    role: "Chief People Officer",
    initials: "GW",
    tone: "pink",
    bio: "Grace leads talent, learning and workplace teams and built the flexible work program our people rely on today.",
  },
  {
    name: "Arjun Mehta",
    role: "Chief Information Security Officer",
    initials: "AM",
    tone: "sky",
    bio: "Arjun runs security, privacy engineering and compliance, and partners closely with the customers who trust us with their data.",
  },
  {
    name: "Camila Reyes",
    role: "Chief Marketing Officer",
    initials: "CR",
    tone: "violet",
    bio: "Camila leads brand, communications and growth marketing, and championed our community and certification programs.",
  },
  {
    name: "Rachel Kim",
    role: "SVP, Partnerships",
    initials: "RK",
    tone: "mint",
    bio: "Rachel built our partner ecosystem from the ground up and now works with more than 1,800 partners in 70 countries.",
    pressBio: `Rachel Kim is Senior Vice President of Partnerships at ${B}, where she leads the company's technology, solutions, reseller and agency partner programs. Under her leadership, the ecosystem has grown to more than 1,800 partners and 2,600 integrations. Before ${B}, Rachel held alliance and business development roles at enterprise cloud companies across North America and Asia Pacific.`,
  },
];
