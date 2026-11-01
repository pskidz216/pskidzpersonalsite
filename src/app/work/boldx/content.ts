export interface LedgerEntry {
  title: string;
  detail: string;
}

export interface LedgerGroup {
  label: string;
  intro?: string;
  entries: LedgerEntry[];
}

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

export const boldxCaseStudy = {
  eyebrow: "[ Case study — BoldX Industries · Batavia, OH · 2025–2026 ]",
  hero: {
    h1: "I built the BoldX brand.",
    sub: "A hermetic-connector and precision-machining manufacturer selling into aerospace and defense. For nearly two years I owned go-to-market end to end: brand, marketing, pipeline, close and customer success, with a three-person team. Here is what I built and what it did.",
    image: {
      src: "/work/boldx/brand-rocket.webp",
      alt: "A machined stainless hermetic connector with gold pins in the foreground, a rocket lifting off behind it in deep red light, the BoldX Industries mark in the sky",
    },
  },
  start: {
    label: "Where it started",
    paragraphs: [
      "A precision manufacturer in Batavia, Ohio with two business lines, hermetic connectors and CNC machining, and Tier-1 aerospace and defense customers who trusted the parts and had never been told a story about the company that made them.",
      "No brand system. No personas, no plan, no film. An ERP from the mid-1990s, quotes typed by hand, and no way to watch the pipeline move. Sales, marketing and customer success were one seat, and I took it.",
    ],
  },
  ledgerLabel: "What I built",
  ledger: [
    {
      label: "Brand",
      entries: [
        {
          title: "Brand Strategy & Branding Bible",
          detail:
            "Twenty-five pages: cultural landscape, buyer profile, brand architecture, competitive set, admirable brands.",
        },
        {
          title: "Identity system",
          detail:
            "The logo system in every lockup and colourway, PMS 185 C red with 446 C charcoal, Big Shoulders Display over Work Sans, and the rules for using them.",
        },
        {
          title: "Value proposition and personas",
          detail:
            "Ten differentiators and three buyers: the procurement director, the program manager, the quality engineer.",
        },
        {
          title: "Product catalog",
          detail:
            "Thirty-two pages, Deep Well to Deep Space, every QPL-qualified connector series in one book.",
        },
        {
          title: "Social and collateral system",
          detail:
            "LinkedIn banners, Zoom and Popl backgrounds, stationery, email signatures, apparel, Instagram and TikTok marks.",
        },
      ],
    },
    {
      label: "Strategy",
      entries: [
        {
          title: "12-month marketing plan",
          detail:
            "Video-first content, five HubSpot email workflows, SEO, paid media, PBExpo, and a 30-day recruiting A/B test on TikTok and Meta.",
        },
        {
          title: "Sales & Marketing Strategy 2026–2028",
          detail:
            "Seven pillars: concentrate on the accounts that matter, put an engineer on the second call, consolidate customer service behind an AI agent, open two new demand channels, shoot one video library, cut quote turnaround, and tie sales to an operations feedback loop. Phased over 24 months.",
        },
      ],
    },
    {
      label: "Revenue systems",
      intro:
        "The ERP dated from the mid-1990s and could not show me the pipeline as it moved. Seeing a quote meant calling someone or waiting for a custom Excel file in my inbox. So I built small external apps and workflows around the ERP, all with AI agents, so my team and then the company could see the quote pipeline in real time.",
      entries: [
        {
          title: "Quote-to-HubSpot app",
          detail:
            "Next.js and OCR. Reads supplier and customer quote PDFs and creates the deals in HubSpot. Seventeen deals and about $270K of pipeline moved in one observed day.",
        },
        {
          title: "Quote-expiry email campaign",
          detail:
            "Automated emails timed to each quote's expiration that moved customers to buy before it lapsed. Five days out, a daily sweep moves the deal and HubSpot sends the branded email; a second follows three business days later if nobody clicks. One button says move forward and alerts the team; five others stamp the reason we lost it.",
        },
        {
          title: "Orders dashboard",
          detail:
            "Flask over the ERP exports: open orders, declined sales, pending quotes, week over week.",
        },
        {
          title: "Weekly pipeline reporting",
          detail:
            "Quote flow, close rate, expired quotes and losses by segment, every week, straight from HubSpot, and the company's first quote-to-backlog reconciliation.",
        },
        {
          title: "Contracts, close and the number",
          detail:
            "Owned close and customer success alongside marketing, with a three-person team. Converted one-off work into long-term agreements, negotiated purchase-order terms, renewals and a $500K inventory buyout. Set the 2026 revenue target at $24M and paced about 20% year-over-year growth.",
        },
        {
          title: "One process for the whole company",
          detail:
            "Stood up company-wide communication on Microsoft Teams and SharePoint so sales, operations and the shop floor ran one process.",
        },
      ],
    },
    {
      label: "Launches and marketing",
      entries: [
        {
          title: "American Labor Ladders",
          detail:
            "Product site and manual for the Game Changer Smart Ladder, the first sensor-equipped ladder built for injury prevention. Live at americanlaborladders.com.",
        },
        {
          title: "InEX",
          detail: "Launch materials for a third product line.",
        },
        {
          title: "Content engine",
          detail:
            "A weekly cinematic reel system, four long-form articles on hermetic connectors with original charts, and a daily LinkedIn and X outreach hub.",
        },
        {
          title: "Email campaigns",
          detail:
            "The 2027 forecast and account-standards campaigns in HubSpot, each with three-touch follow-ups.",
        },
        {
          title: "PBExpo",
          detail:
            "Booth 565, Miami Beach. Ran the whole show for the company, from the booth and its marketing collateral to the sales conversations on the floor.",
        },
      ],
    },
  ] as LedgerGroup[],
  numbers: {
    label: "The numbers",
    stats: [
      { value: "$11.6M", label: "quoted through the pipeline I built" },
      { value: "147", label: "deals closed-won" },
      { value: "$500K", label: "inventory buyout negotiated" },
      { value: "2", label: "product lines launched" },
    ],
  },
  broke: {
    label: "What broke",
    items: [
      "Customers pushed back on lead time, not price, and marketing cannot shorten a lead time. The 2026–2028 plan put an operations track beside every sales move for that reason.",
    ],
  },
  stack: {
    label: "The stack",
    items: [
      "HubSpot",
      "Claude",
      "ElevenLabs",
      "Next.js",
      "Flask",
      "Canva",
      "Higgsfield",
      "Craft CMS",
    ],
  },
  gallery: {
    label: "The work",
    items: [
      { src: "/work/boldx/bible-cover.webp", alt: "Cover of the BoldX Brand Strategy and Branding Bible", caption: "Brand Strategy & Branding Bible" },
      { src: "/work/boldx/bible-p14.webp", alt: "A spread from the brand bible: Brand Belief in white on a red panel, the belief statement on the right", caption: "The bible's Brand Belief spread" },
      { src: "/work/boldx/catalog-cover.webp", alt: "Cover of the BoldX product catalog: a red-lit machined part and the line Deep Well to Deep Space", caption: "Product catalog" },
      { src: "/work/boldx/bible-p09.webp", alt: "A spread from the brand bible on the buyer's pain points, red panel on the left", caption: "The bible's audience chapter" },
      { src: "/work/boldx/identity-lockups.webp", alt: "Identity page showing the primary logo, the lockup without the tagline and the icon", caption: "Primary logo, lockup and icon" },
      { src: "/work/boldx/ladder-og.webp", alt: "Share image for the American Labor Ladders website", caption: "American Labor Ladders site" },
      { src: "/work/boldx/connector-comparison.webp", alt: "Comparison graphic of MIL-spec circular connector series", caption: "MIL-spec connector comparison" },
      { src: "/work/boldx/chart-seal-types.webp", alt: "Chart of hermetic seal types from a BoldX article", caption: "From the glass-to-metal sealing article" },
      { src: "/work/boldx/linkedin-banner.webp", alt: "BoldX LinkedIn banner", caption: "LinkedIn banner" },
      { src: "/work/boldx/tee.webp", alt: "White T-shirt mockup with the BoldX mark", caption: "Apparel" },
      { src: "/work/boldx/zoom-background.webp", alt: "BoldX Zoom background, dark version with the white logo", caption: "Zoom background" },
      { src: "/work/boldx/zoom-background-2026.webp", alt: "Virtual meeting background: Paul Skidmore, VP, Sales & Marketing, a Connect with me QR code and the BoldX logo over brushed metal", caption: "Zoom background with name and title" },
    ] as GalleryItem[],
  },
  closing: {
    ended: "The role ended with the 2026 number set at $24M. I hope they hit it.",
    cta: "Want this built for your company?",
    sub: "The brand, the plan and the revenue systems, from one operator. Miami based, working everywhere.",
    primary: { label: "Ways to work together", href: "/pricing" },
    secondary: { label: "Get in touch", href: "mailto:pskidmore216@gmail.com" },
  },
  domain: "paulskidmoreii.com / work / boldx",
} as const;
