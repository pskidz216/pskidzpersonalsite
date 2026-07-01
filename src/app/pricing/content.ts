export const pricingContent = {
  hero: {
    h1: "Two ways to work together.",
    subhead:
      "Fixed-price builds for AI-native brand, web, and automation work — or a retainer to keep it running and keep building.",
  },
  audit: {
    label: "The front door",
    name: "AI Opportunity Audit",
    price: "$1,500",
    copy: "A paid week of discovery, built around two 30-minute calls — one to kick off and gather details, one to walk through the roadmap. You get a prioritized automation plan with ROI projections — credited toward any build started within 30 days.",
    cta: "Start the audit",
  },
  projects: {
    label: "Project tiers",
    items: [
      {
        name: "Signature Build",
        price: "$6,000–$9,000",
        copy: "One deliverable, done right — an automation pipeline, a brand bible, 1–2 landing pages, or a light website.",
        emphasized: false,
      },
      {
        name: "AI-Native Launch",
        price: "$15,000–$22,000",
        copy: "Brand, up to three landing pages or a light website, and one signature automation, built together. Most clients land here.",
        emphasized: true,
        badge: "Flagship",
      },
    ],
  },
  retainers: {
    label: "Retainer tiers",
    items: [
      {
        name: "Care",
        price: "$750–$1,500/mo",
        copy: "Monitoring, fixes within 48 hours, a monthly health report.",
        emphasized: false,
      },
      {
        name: "Growth",
        price: "$3,000–$5,000/mo",
        copy: "Everything in Care, plus a monthly strategy call and up to two new automations a month.",
        emphasized: true,
        badge: "Most popular",
      },
    ],
  },
  fractional: {
    label: "Go deeper",
    name: "Fractional Operator",
    price: "$10,000/mo",
    copy: "A third to half of my time, dedicated to your business. AI, sales, marketing, business development, ops, systems — wherever the leverage is.",
  },
  scope: {
    label: "Scope",
    lines: [
      "Ad-hoc or out-of-scope work: $250–$300/hr, billed only when it falls outside a project or retainer.",
      "Tools, software, and API costs are billed separately, at cost — not included in the prices above.",
      "Sequencing: audit first, then a project, then a retainer to keep it running.",
    ],
  },
  domain: "paulskidmoreii.com / pricing",
} as const;
