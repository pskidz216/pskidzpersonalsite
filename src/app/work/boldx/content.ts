export interface LedgerEntry {
  when: string;
  title: string;
  detail: string;
}

export interface LedgerGroup {
  label: string;
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
    sub: "A hermetic-connector and precision-machining manufacturer selling into aerospace and defense. From January 2025 to October 2026 I owned go-to-market end to end: brand, marketing, pipeline, close and customer success, with a three-person team. Here is what I built, dated, and what it did.",
    coverAlt: "Cover of the BoldX Brand Strategy and Branding Bible, dated 21 January 2025",
  },
  start: {
    label: "Where it started",
    paragraphs: [
      "January 2025. A precision manufacturer in Batavia, Ohio with two business lines, hermetic connectors and CNC machining, and Tier-1 aerospace and defense customers who trusted the parts and had never been told a story about the company that made them.",
      "No brand system. No personas, no plan, no film. Quotes typed by hand. Sales, marketing and customer success were one seat, and I took it.",
    ],
  },
  ledgerLabel: "What I built",
  ledger: [
    {
      label: "Brand",
      entries: [
        {
          when: "Jan 2025",
          title: "Brand Strategy & Branding Bible",
          detail:
            "Twenty-five pages: cultural landscape, buyer profile, brand architecture, competitive set, admirable brands.",
        },
        {
          when: "2025",
          title: "Identity and Brand Guidelines",
          detail:
            "The logo system in every lockup and colourway, PMS 185 C red with 446 C charcoal, Big Shoulders Display over Work Sans, and the rules for using them.",
        },
        {
          when: "2025",
          title: "Value proposition and personas",
          detail:
            "Ten differentiators and three buyers: the procurement director, the program manager, the quality engineer.",
        },
        {
          when: "Oct 2025",
          title: "Product catalog",
          detail:
            "Thirty-two pages, Deep Well to Deep Space, every QPL-qualified connector series in one book.",
        },
        {
          when: "2025",
          title: "Social and collateral system",
          detail:
            "LinkedIn banners, Zoom and Popl backgrounds, stationery, apparel, Instagram and TikTok marks.",
        },
      ],
    },
    {
      label: "Strategy",
      entries: [
        {
          when: "Sep 2025",
          title: "12-month marketing plan",
          detail:
            "Video-first content, five HubSpot email workflows, SEO, paid media, PBExpo, and a 30-day recruiting A/B test on TikTok and Meta.",
        },
        {
          when: "May 2026",
          title: "Sales & Marketing Strategy 2026–2028",
          detail:
            "Seven pillars: concentrate on the accounts that matter, put an engineer on the second call, consolidate customer service behind an AI agent, open two new demand channels, shoot one video library, automate quoting, and tie sales to an operations feedback loop. Phased over 24 months.",
        },
        {
          when: "2025–2026",
          title: "Outbound targeting",
          detail:
            "Fourteen NAICS target-account lists and the SDR engine design: Clay to Apollo to Instantly and Heyreach, orchestrated by n8n into HubSpot.",
        },
      ],
    },
    {
      label: "Revenue systems",
      entries: [
        {
          when: "Apr 2026",
          title: "Quote-to-HubSpot app",
          detail:
            "Next.js and OCR. Reads supplier and customer quote PDFs and creates the deals in HubSpot. Seventeen deals and about $270K of pipeline moved in one observed day.",
        },
        {
          when: "2026",
          title: "Orders dashboard",
          detail:
            "Flask over the ERP exports: open orders, declined sales, pending quotes, week over week.",
        },
        {
          when: "May–Aug 2026",
          title: "Weekly pipeline reporting",
          detail:
            "Quote flow, close rate, expired quotes and losses by segment, every week, straight from HubSpot. The first quote-to-backlog reconciliation in June.",
        },
        {
          when: "2025–2026",
          title: "Contracts, close and the number",
          detail:
            "Owned close and customer success alongside marketing, with a three-person team. Converted one-off work into long-term agreements, negotiated purchase-order terms, renewals and a $500K inventory buyout. Set the 2026 revenue target at $24M and paced about 20% year-over-year growth.",
        },
        {
          when: "2025–2026",
          title: "AI sales-intelligence agent",
          detail:
            "A LinkedIn queue with AI-drafted outreach, pipeline, sequences and buying signals, built on Claude.",
        },
        {
          when: "Jul 2026",
          title: "One process for the whole company",
          detail:
            "Stood up company-wide communication on Microsoft Teams and SharePoint so sales, operations and the shop floor ran one process. Then an employee handbook with Claude built in, a password-protected org chart generated from the HRIS export, and company email signatures.",
        },
      ],
    },
    {
      label: "Launches and marketing",
      entries: [
        {
          when: "2025",
          title: "Murphy AMPI handcuff",
          detail:
            "One-pager and launch collateral for a patented, non-pickable police duty handcuff.",
        },
        {
          when: "Sep 2026",
          title: "American Labor Ladders",
          detail:
            "Product site and manual for the Game Changer Smart Ladder, the first sensor-equipped ladder built for injury prevention. Live at americanlaborladders.com.",
        },
        {
          when: "2025",
          title: "InEX",
          detail: "Launch materials for a third product line.",
        },
        {
          when: "Jul–Oct 2026",
          title: "Content engine",
          detail:
            "A weekly cinematic reel system, four long-form articles on hermetic connectors with original charts, and a daily LinkedIn and X outreach hub.",
        },
        {
          when: "Oct 2026",
          title: "Email campaigns",
          detail:
            "The 2027 forecast and account-standards campaigns in HubSpot, each with three-touch follow-ups.",
        },
        {
          when: "2026",
          title: "PBExpo",
          detail: "Booth 565, Miami Beach.",
        },
      ],
    },
  ] as LedgerGroup[],
  numbers: {
    label: "The numbers",
    stats: [
      { value: "$11.6M", label: "quoted through the pipeline I built, Jan–Aug 2026" },
      { value: "147", label: "deals closed-won, Jan–Aug 2026" },
      { value: "$500K", label: "inventory buyout negotiated" },
      { value: "3", label: "product lines launched" },
    ],
  },
  broke: {
    label: "What broke",
    items: [
      "The outbound engine took longer than the plan said. Designed in April 2026, still not sending in May. Infrastructure before activity is the right order; the gap was still too long.",
      "Customers pushed back on lead time, not price, and marketing cannot shorten a lead time. The 2026–2028 plan put an operations track beside every sales move for that reason.",
    ],
  },
  stack: {
    label: "The stack",
    items: [
      "HubSpot",
      "Claude",
      "Next.js",
      "Flask",
      "n8n",
      "Clay",
      "Apollo",
      "Canva",
      "Higgsfield",
      "Craft CMS",
    ],
  },
  gallery: {
    label: "The work",
    items: [
      { src: "/work/boldx/bible-cover.webp", alt: "Cover of the BoldX Brand Strategy and Branding Bible", caption: "Brand Strategy & Branding Bible, January 2025" },
      { src: "/work/boldx/guidelines-1.webp", alt: "BoldX logo mounted on a dark office wall, the cover of the 2025 brand guidelines", caption: "Brand Guidelines 2025" },
      { src: "/work/boldx/catalog-cover.webp", alt: "Cover of the BoldX product catalog: a red-lit machined part and the line Deep Well to Deep Space", caption: "Product catalog, October 2025" },
      { src: "/work/boldx/bible-p09.webp", alt: "A spread from the brand bible on the buyer's pain points, red panel on the left", caption: "The bible's audience chapter" },
      { src: "/work/boldx/guidelines-2.webp", alt: "Brand guidelines page showing the logo lockups and clear-space rules", caption: "Logo lockups and clear space" },
      { src: "/work/boldx/murphy.webp", alt: "One-page sell sheet for the AMPI Murphy duty handcuff", caption: "Murphy AMPI one-pager" },
      { src: "/work/boldx/ladder-og.webp", alt: "Share image for the American Labor Ladders website", caption: "American Labor Ladders site, September 2026" },
      { src: "/work/boldx/connector-comparison.webp", alt: "Comparison graphic of MIL-spec circular connector series", caption: "MIL-spec connector comparison, August 2026" },
      { src: "/work/boldx/chart-seal-types.webp", alt: "Chart of hermetic seal types from a BoldX article", caption: "From the glass-to-metal sealing article, September 2026" },
      { src: "/work/boldx/linkedin-banner.webp", alt: "BoldX LinkedIn banner", caption: "LinkedIn banner" },
      { src: "/work/boldx/sales-agent.webp", alt: "The AI sales-intelligence agent's LinkedIn queue with sample prospects", caption: "AI sales-intelligence agent, sample data" },
      { src: "/work/boldx/tee.webp", alt: "White T-shirt mockup with the BoldX mark", caption: "Apparel" },
      { src: "/work/boldx/zoom-background.webp", alt: "BoldX Zoom background", caption: "Zoom background" },
    ] as GalleryItem[],
  },
  closing: {
    ended: "The role ended in October 2026, with the 2026 number set at $24M. I hope they hit it.",
    cta: "Want this built for your company?",
    sub: "The brand, the plan and the revenue systems, from one operator. Miami based, working everywhere.",
    primary: { label: "Ways to work together", href: "/pricing" },
    secondary: { label: "Get in touch", href: "mailto:pskidmore216@gmail.com" },
  },
  domain: "paulskidmoreii.com / work / boldx",
} as const;
