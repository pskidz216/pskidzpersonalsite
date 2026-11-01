export interface CareerEntry {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  type: "corporate" | "startup" | "freelance";
  description: string;
  metric: { value: string; label: string };
  tags: string[];
}

export interface SkillBlock {
  title: string;
  description: string;
  tools: string;
}

export const careerEntries: CareerEntry[] = [
  {
    id: "stryker",
    company: "Stryker",
    role: "Sales Representative",
    dateRange: "2014 — 2016",
    type: "corporate",
    description:
      "Started my career in the operating room selling spinal implant systems to orthopedic and neurosurgeons. Managed a multi-million dollar territory across top-tier hospitals, consistently exceeding quota by building deep trust with surgical teams.",
    metric: { value: "122%", label: "to quota" },
    tags: ["Medical Device Sales", "Spine Surgery", "Johns Hopkins"],
  },
  {
    id: "dmt",
    company: "Digital Medical Tech",
    role: "Business Development Manager",
    dateRange: "2016 — 2020",
    type: "startup",
    description:
      "Grew enterprise revenue for a Techstars-backed healthtech startup selling Bluetooth asset tracking into hospital systems. Built the outbound pipeline from scratch, closed six-figure enterprise contracts, and drove 40% revenue growth in two years.",
    metric: { value: "40%", label: "revenue growth in 2 years" },
    tags: ["HealthTech", "Enterprise Sales", "Techstars Portfolio"],
  },
  {
    id: "wellie",
    company: "Wellie",
    role: "Co-Founder",
    dateRange: "2020 — 2022",
    type: "startup",
    description:
      "Co-founded a Web3 wellness platform from zero. Raised $250K in seed funding, built and shipped the MVP, recruited the founding team, and learned what it takes to create a company from a blank page.",
    metric: { value: "$250K", label: "seed funding raised" },
    tags: ["Web3", "Wellness", "Founding Team"],
  },
  {
    id: "comprehensive-md",
    company: "Comprehensive MD",
    role: "Digital Marketing Strategist",
    dateRange: "2022 — 2024",
    type: "freelance",
    description:
      "Overhauled digital marketing for a neurosurgical and pain management group in South Florida. Built automated email sequences, CRM integrations, and social strategies that drove a 97% increase in patient engagement.",
    metric: { value: "97%", label: "engagement increase" },
    tags: ["Healthcare Marketing", "HubSpot", "CRM Integration"],
  },
  {
    id: "revscale",
    company: "Revscale AI",
    role: "Growth Lead",
    dateRange: "2024 — 2025",
    type: "startup",
    description:
      "Led growth at an AI-powered revenue platform automating inbound, outbound, and customer support. Built channel partner programs, drove 50% month-over-month revenue growth, and developed the go-to-market playbook for AI-driven sales automation.",
    metric: { value: "50%", label: "MoM revenue growth" },
    tags: ["AI Sales Automation", "Channel Partners", "GTM Strategy"],
  },
  {
    id: "boldx",
    company: "BoldX Industries",
    role: "GTM Manager, Sales, Marketing & Customer Success",
    dateRange: "2025 — 2026",
    type: "corporate",
    description:
      "Owned go-to-market end to end for an aerospace and defense manufacturer of hermetic connectors and precision CNC parts: brand, marketing, pipeline, close and customer success, with a three-person team, pacing about 20% year-over-year growth. Rebuilt the brand from the bible up: strategy and identity, a 32-page catalog, the 12-month marketing plan and the 2026–2028 sales strategy. Put the quote pipeline on HubSpot in real time, built with AI agents, where before it took a phone call or an emailed spreadsheet; $11.6M quoted and 147 deals closed-won. Converted one-off work into long-term contracts, negotiated a $500K inventory buyout, and set the 2026 revenue target at $24M. Launched the Smart Ladder, built the American Labor Ladders site, and ran the company's PBExpo 2026 booth.",
    metric: { value: "147", label: "deals closed-won" },
    tags: ["Brand Build", "Aerospace & Defense", "AI-Powered Sales", "HubSpot/ERP Integration"],
  },
];

export const skillBlocks: SkillBlock[] = [
  {
    title: "Growth & Revenue",
    description:
      "Building repeatable revenue engines from zero. AI-driven pipeline scoring, intelligent lead routing, and prospect research that runs while I sleep.",
    tools: "HubSpot, Salesforce, CRM Systems",
  },
  {
    title: "Automation & Tools",
    description:
      "Building custom AI agents that replace entire workflows. Sales intelligence bots, automated deal research, outreach engines. Small teams, outsized output.",
    tools: "Claude, LLMs, Custom Platforms",
  },
  {
    title: "Digital Marketing",
    description:
      "Full-funnel strategy from social to email to paid. AI-generated content, personalized outreach at scale, and campaigns that optimize themselves.",
    tools: "Ortto, MailChimp, Social Platforms",
  },
  {
    title: "Business Development",
    description:
      "Research briefs on every prospect before the first call. Then real human connection closes the deal. Automated where it should be, personal where it matters.",
    tools: "LinkedIn Sales Navigator, Outbound Tools",
  },
  {
    title: "Product Strategy",
    description:
      "From concept to MVP, fast. Using AI to accelerate prototyping, build internal tools, and ship products that would've taken teams of ten.",
    tools: "Rapid Prototyping, Claude Code",
  },
  {
    title: "Brand & Creative",
    description:
      "Naming, color systems, visual identity: from the BoldX Industries rebrand (brand bible, identity, a 32-page catalog) down to a single product launch (the American Labor Ladders Smart Ladder). I get outside the box and let creative instinct drive brands that actually stand out.",
    tools: "Brand Strategy, Visual Identity, Product Naming",
  },
];

export interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string;
  image: string;
  video?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    name: "BoldX Industries",
    tag: "Full Go-To-Market",
    description:
      "Go-to-market end to end for an aerospace and defense manufacturer: the brand bible and identity, a 32-page catalog, the 2026–2028 strategy, a live quote pipeline built with AI agents, quote-expiry email campaigns, long-term contracts, weekly cinematic reels, the Smart Ladder launch and the PBExpo booth. The full case study.",
    tech: "Brand Bible, Go-To-Market Strategy, Live Quote Pipeline, AI Agents, HubSpot, n8n, Email Campaigns, Contracts, Cinematic Reels, Popl",
    image: "/work/boldx/catalog-cover-wide.webp",
    href: "/work/boldx",
  },
  {
    name: "AI Wireframe Prototype",
    tag: "Wireframe Audit",
    description:
      "AI-built interactive wireframes exploring layout directions for a luxury fragrance brand.",
    tech: "Claude Code, HTML/CSS Prototyping",
    image: "/projects/wireframe-prototype.png",
  },
  {
    name: "Pristine Coastal Co.",
    tag: "Brand Design",
    description:
      "A ground-up brand identity for a veteran-owned coastal painting company: naming, logo system, palette and typography, carried through a complete website design system and launch collateral.",
    tech: "Brand Strategy, Logo Design, Design Systems",
    image: "/projects/pristine-coastal.png",
  },
  {
    name: "American Labor Ladders",
    tag: "BoldX Launch",
    description:
      "Product marketing site I built for BoldX Industries' Game Changer Smart Ladder, the first sensor-equipped ladder built for injury prevention. Animated hero, spec breakdowns, contact forms into HubSpot, smooth page transitions. Paired with the product manual.",
    tech: "React, Framer Motion, Vite",
    image: "/projects/american-labor-ladders.webp",
    href: "https://americanlaborladders.com",
  },
  {
    name: "Signal Agent",
    tag: "Lead Intelligence",
    description:
      "An autonomous signal agent that scrapes Reddit, forums, and search for buying-intent signals, then finds, enriches, and validates leads before they ever reach the pipeline. Multi-tenant — one engine, many brand profiles, scored and deduped on a schedule.",
    tech: "Python, Playwright, SQLite",
    image: "/projects/signal-agent.png",
  },
  {
    name: "Human OS",
    tag: "Quiz Engine",
    description:
      "A 7-step quiz that turns a person's answers into personalized supplement recommendations across nine brand partners, ending on a results page built to be shared.",
    tech: "Supabase, Tailwind",
    image: "/projects/human-os.png",
  },
];

const heroTitleLead = "I'm";
const heroTitleAccent = "ready to work.";

/** The first thing on the site, in Paul's words. */
export const heroContent = {
  title: `${heroTitleLead} ${heroTitleAccent}`,
  titleLead: heroTitleLead,
  titleAccent: heroTitleAccent,
  sub: "I'm ready to help companies. I build revenue engines, and the AI systems that run them.",
  actions: [
    { label: "Check out how I helped BoldX", href: "/work/boldx", primary: true },
    { label: "Here's what I do", href: "#skills", primary: false },
    { label: "See my portfolio below", href: "#built", primary: false },
  ],
};

/** The home-page strip of real BoldX reels; two tiles show on phones. */
export const reelBand = {
  eyebrow: "[ Selected work: weekly cinematic reels · BoldX Industries ]",
  title: "The part, then the mission.",
  sub: "A weekly reel system that put BoldX parts in the places they serve: carriers, jets, submarines. Art-directed by me, generated on Higgsfield.",
  cta: { label: "See the BoldX case study", href: "/work/boldx" },
  tiles: [
    {
      video: "/work/boldx/reels/part-macro.mp4",
      poster: "/work/boldx/reels/part-macro.webp",
      label: "The part",
      alt: "Macro shot of a hermetic connector resting among others on a dark tray",
      onPhone: false,
    },
    {
      video: "/work/boldx/reels/jet-launch.mp4",
      poster: "/work/boldx/reels/jet-launch.webp",
      label: "The launch",
      alt: "A fighter jet launching down an aircraft carrier's catapult in a burst of flame",
      onPhone: true,
    },
    {
      video: "/work/boldx/reels/pressure-hull.mp4",
      poster: "/work/boldx/reels/pressure-hull.webp",
      label: "The hull",
      alt: "A connector seated in the bolted steel wall of a submarine's pressure hull",
      onPhone: false,
    },
    {
      video: "/work/boldx/reels/sub-surface.mp4",
      poster: "/work/boldx/reels/sub-surface.webp",
      label: "The dive",
      alt: "A submarine cutting through open ocean as spray bursts around its sail",
      onPhone: true,
    },
    {
      video: "/work/boldx/reels/sub-descent.mp4",
      poster: "/work/boldx/reels/sub-descent.webp",
      label: "The deep",
      alt: "A submarine descending through teal water with bubbles rising above it",
      onPhone: false,
    },
  ],
};

export const navLinks = [
  { label: "The Record", href: "#experience" },
  { label: "Systems", href: "#skills" },
  { label: "Builds", href: "#built" },
  { label: "BoldX", href: "/work/boldx" },
  { label: "Credentials", href: "#certifications" },
  { label: "Off the Clock", href: "#offclock" },
  { label: "Work with me", href: "/pricing" },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

import certsJson from "@/data/certifications.json";
export const certifications: Certification[] = certsJson;

export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/paul-skidmore/",
  },
  {
    label: "Email",
    href: "mailto:pskidmore216@gmail.com",
  },
];
