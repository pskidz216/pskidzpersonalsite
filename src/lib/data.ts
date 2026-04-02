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
    type: "corporate",
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
    dateRange: "2025 — Present",
    type: "corporate",
    description:
      "Leading sales and marketing for a precision CNC machining and hermetic connector manufacturer. Launched 3-5 new product assembly lines, spearheading the Sun Belt Ladder initiative for customer acquisition, and opening new revenue in aerospace, military, and defense. Built AI-powered sales intelligence systems to automate prospecting and deal research. Tracking to push revenue past $18M in 2026.",
    metric: { value: "$18M+", label: "projected 2026 revenue" },
    tags: ["Aerospace & Defense", "Hermetic Connectors", "AI-Powered Sales"],
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
      "Naming, color systems, visual identity, from enterprise rebrand down to a single product launch. I get outside the box and let creative instinct drive brands that actually stand out.",
    tools: "Brand Strategy, Visual Identity, Product Naming",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "AI", href: "#ai" },
  { label: "Life", href: "#offclock" },
  { label: "Contact", href: "#contact" },
];

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
