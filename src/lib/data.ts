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

export interface Project {
  name: string;
  tag: string;
  description: string;
  tech: string;
  image: string;
}

export const projects: Project[] = [
  {
    name: "BoldX Hub",
    tag: "Interactive Portal",
    description:
      "Portfolio company dashboard with interactive D3 radial charts, real-time deal pipeline tracking, and glassmorphic UI. Built for managing investments across the BoldX portfolio.",
    tech: "React, D3.js, Supabase, Framer Motion",
    image: "/projects/boldx-hub.png",
  },
  {
    name: "BoldX Portal",
    tag: "SDR App",
    description:
      "AI-powered SDR platform with multi-agent architecture. Handles ICP scoring, prospect enrichment, LinkedIn coaching, and personalized outreach sequences from a single dashboard.",
    tech: "Next.js, Prisma, Anthropic SDK, Tailwind",
    image: "/projects/boldx-portal.png",
  },
  {
    name: "BXE Intake",
    tag: "Capital Intake",
    description:
      "10-step capital raise application wizard with file uploads, validation, and an admin review dashboard. Takes a company from first touch to fully submitted deal package.",
    tech: "React, React Router, Supabase",
    image: "/projects/bxe-intake.png",
  },
  {
    name: "American Labor Ladders",
    tag: "Product Site",
    description:
      "Product marketing site for the Game Changer Smart Ladder. Animated hero, spec breakdowns, and contact forms with smooth page transitions throughout.",
    tech: "React, Framer Motion, Vite",
    image: "/projects/american-labor-ladders.png",
  },
  {
    name: "Litcor",
    tag: "Project Oversight",
    description:
      "Full website for Florida's premier luxury shell subcontractor. Multi-page build with project showcases, service breakdowns, careers, and animated section reveals.",
    tech: "Next.js, Framer Motion, Tailwind, TypeScript",
    image: "/projects/litcor.png",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Certs", href: "#certifications" },
  { label: "AI", href: "#ai" },
  { label: "2.16 OS", href: "#flagship" },
  { label: "Builds", href: "#built" },
  { label: "Life", href: "#offclock" },
  { label: "Contact", href: "#contact" },
];

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    name: "Certificate of completion: Claude 101",
    issuer: "Anthropic",
    date: "Apr 2026",
    credentialId: "d7ft8ra34hjc",
  },
  {
    name: "Claude Code in Action",
    issuer: "Anthropic",
    date: "Mar 2026",
    credentialId: "3xpeoq9yzcfe",
  },
  {
    name: "Make the Sale: Build, Launch, and Manage E-commerce Stores",
    issuer: "Google",
    date: "Apr 2024",
    credentialId: "2UDH8JW68SLK",
  },
  {
    name: "Assess for Success: Marketing Analytics and Measurement",
    issuer: "Google",
    date: "Mar 2024",
    credentialId: "JAA6XMP4F5NH",
  },
  {
    name: "Think Outside the Inbox: Email Marketing",
    issuer: "Google",
    date: "Mar 2024",
    credentialId: "EBUXLZMKQ7L9",
  },
  {
    name: "From Likes to Leads: Interact with Customers Online",
    issuer: "Google",
    date: "Mar 2024",
    credentialId: "UVK94PGKYHKC",
  },
  {
    name: "Attract and Engage Customers with Digital Marketing",
    issuer: "Google",
    date: "Mar 2024",
    credentialId: "WWV38P6XSRVR",
  },
  {
    name: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    date: "Mar 2024",
    credentialId: "76CJU8JHMSBH",
  },
  {
    name: "Product Manager",
    issuer: "General Assembly",
    date: "May 2020",
  },
  {
    name: "Certified Strength and Conditioning Specialist (CSCS)",
    issuer: "NSCA",
    date: "Apr 2010",
  },
  {
    name: "Poliquin Practitioner",
    issuer: "Poliquin Group",
    date: "Sep 2010",
  },
  {
    name: "CHEK Practitioner",
    issuer: "CHEK Institute",
    date: "Jun 2010",
  },
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
