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
    role: "VP, Sales & Marketing",
    dateRange: "2025 — 2026",
    type: "corporate",
    description:
      "Rebuilt BoldX Industries from the brand bible up: brand strategy and identity (January 2025), guidelines, a 32-page product catalog, the 12-month marketing plan and the 2026–2028 sales and marketing strategy for an aerospace and defense manufacturer of hermetic connectors and precision CNC parts. Launched the Murphy AMPI handcuff, the Smart Ladder and InEX, and built the American Labor Ladders site. Built the revenue systems behind the pipeline: the quote-to-HubSpot app, the ERP orders dashboard, weekly pipeline reporting, and an AI sales-intelligence agent on Claude. Took the company to PBExpo 2026.",
    metric: { value: "147", label: "deals closed-won, 2026 YTD" },
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
    tools: "Next.js, Rapid Prototyping, Claude Code",
  },
  {
    title: "Brand & Creative",
    description:
      "Naming, color systems, visual identity: from the BoldX Industries rebrand (brand bible, identity, guidelines, a 32-page catalog) down to a single product launch (the Murphy AMPI handcuff, the American Labor Ladders Smart Ladder). I get outside the box and let creative instinct drive brands that actually stand out.",
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
    tag: "Brand System",
    description:
      "Brand bible, identity, guidelines, a 32-page catalog, a 12-month plan and the 2026–2028 strategy for an aerospace and defense manufacturer. The full case study.",
    tech: "Brand Strategy, Identity, Catalog Design, Canva",
    image: "/work/boldx/guidelines-1.webp",
    href: "/work/boldx",
  },
  {
    name: "BoldX Sales Agent",
    tag: "AI SDR Agent",
    description:
      "Sales-intelligence agent for BoldX Industries: a LinkedIn queue with AI-drafted outreach, pipeline, sequences and buying signals from aerospace prospects.",
    tech: "Next.js, Claude, HubSpot, Supabase",
    image: "/projects/boldx-portal.png",
    href: "/work/boldx",
  },
  {
    name: "FckYourWebsite",
    tag: "Audit SaaS",
    description:
      "A productized website audit. The buyer pays, a pipeline captures their site with Playwright, Claude Opus tears it apart against modern conversion principles, and a branded punch-list PDF lands in their inbox — no call, no upsell.",
    tech: "Next.js, Stripe, Supabase, Playwright, Anthropic SDK",
    image: "/projects/fckyourwebsite.png",
  },
  {
    name: "AI Wireframe Prototype",
    tag: "Wireframe Audit",
    description:
      "AI-built interactive wireframes exploring layout directions for a luxury fragrance brand.",
    tech: "Next.js, Claude Code, HTML/CSS Prototyping",
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
    image: "/projects/american-labor-ladders.png",
    href: "https://americanlaborladders.com",
  },
  {
    name: "Signal Agent",
    tag: "Lead Intelligence",
    description:
      "An autonomous signal agent that scrapes Reddit, forums, and search for buying-intent signals, then finds, enriches, and validates leads before they ever reach the pipeline. Multi-tenant — one engine, many brand profiles, scored and deduped on a schedule.",
    tech: "Python, Playwright, Clay, SQLite",
    image: "/projects/signal-agent.png",
  },
  {
    name: "Human OS",
    tag: "Quiz Engine",
    description:
      "A 7-step quiz that turns a person's answers into personalized supplement recommendations across nine brand partners, ending on a results page built to be shared.",
    tech: "Next.js, Supabase, Tailwind",
    image: "/projects/human-os.png",
  },
  {
    name: "Spiritual Site",
    tag: "Parallax Experience",
    description:
      "A spiritual wellness platform built around scroll-driven parallax motion — custom GSAP and Framer Motion choreography with Lenis smooth-scroll on every section.",
    tech: "Next.js, GSAP, Framer Motion, Lenis",
    image: "/projects/spiritual-site.png",
    video: "/projects/spiritual-site.mp4",
  },
];

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
