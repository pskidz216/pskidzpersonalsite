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
  /** Width over height of the file; rows are justified from it. */
  ratio: number;
  /** A silent, looping reel; `src` is then its poster frame. */
  video?: string;
}

const galleryRows: GalleryItem[][] = [
  [
    {
      src: "/work/boldx/reel-carrier-poster.webp",
      video: "/work/boldx/reel-carrier.mp4",
      ratio: 0.5625,
      alt: "Weekly reel: a BoldX connector in macro cutting to the deck of an aircraft carrier, ending on the BoldX logo",
      caption: "Weekly reel: carrier",
    },
    {
      src: "/work/boldx/brand-sign.webp",
      ratio: 1.504,
      alt: "The BoldX Industries sign on the Batavia building at dusk under a pink sky",
      caption: "The mark on the building, Batavia",
    },
    {
      src: "/work/boldx/reel-submarine-poster.webp",
      video: "/work/boldx/reel-submarine.mp4",
      ratio: 0.5625,
      alt: "Weekly reel: a submarine breaking the surface, from the series that puts BoldX parts in the places they serve",
      caption: "Weekly reel: submarine",
    },
  ],
  [
    {
      src: "/work/boldx/blog-hero-swiss.webp",
      ratio: 1.778,
      alt: "Blog hero reading Swiss vs. Conventional CNC over a lathe cutting under coolant, with the BoldX logo",
      caption: "Blog hero: Swiss vs. conventional",
    },
    {
      src: "/work/boldx/linkedin-cover-swiss.webp",
      ratio: 1.778,
      alt: "LinkedIn cover reading Swiss or Conventional? above two machined parts on dark steel, with the BoldX logo",
      caption: "LinkedIn cover: the same article",
    },
  ],
  [
    {
      src: "/work/boldx/catalog-cover.webp",
      ratio: 0.7727,
      alt: "Cover of the BoldX product catalog: a red-lit machined part and the line Deep Well to Deep Space",
      caption: "Product catalog",
    },
    {
      src: "/work/boldx/ladder-site.webp",
      ratio: 1.6,
      alt: "The American Labor Ladders website: the Game Changer Smart Ladder on deep navy beside the headline American Labor Ladder",
      caption: "americanlaborladders.com",
    },
    {
      src: "/work/boldx/quote-expiry-email.webp",
      ratio: 0.8,
      alt: "The quote-expiry email, shown with sample data: Your Quote Is Expiring, a Keep My Quote Active button and one-click reasons for not moving forward",
      caption: "Quote-expiry email",
    },
  ],
  [
    {
      src: "/work/boldx/zoom-background-name-title.webp",
      ratio: 1.778,
      alt: "Meeting background: Paul Skidmore, GTM Manager, Sales, Marketing & Customer Success, with the BoldX logo over charcoal and a thin red diagonal",
      caption: "Meeting background",
    },
    {
      src: "/work/boldx/social-inconel.webp",
      ratio: 1,
      alt: "Sparks flying from an end mill cutting Inconel in a dark machine",
      caption: "Social series: cutting Inconel",
    },
    {
      src: "/work/boldx/social-connector.webp",
      ratio: 1,
      alt: "A hermetic connector with gold pins on brushed steel, catching red light",
      caption: "Social series: hermetic connectors",
    },
  ],
];

export const boldxCaseStudy = {
  eyebrow: "[ Case study — BoldX Industries · Batavia, OH · 2025–2026 ]",
  hero: {
    h1: "I built BoldX's strategy, sales and marketing.",
    sub: "A hermetic-connector and precision-machining manufacturer selling into aerospace and defense. For nearly two years I owned go-to-market end to end: strategy, sales, marketing, brand and customer success, with a three-person team. Here is what I built and what it did.",
    image: {
      src: "/work/boldx/brand-rocket.webp",
      alt: "A rocket climbing above the clouds on a column of red fire, a machined hermetic connector in the foreground, and BOLD in white across the black of space with the BoldX X mark standing alone beside it",
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
            "Reads supplier and customer quote PDFs with OCR and creates the deals in HubSpot. Seventeen deals and about $270K of pipeline moved in one observed day.",
        },
        {
          title: "Quote-expiry email campaign",
          detail:
            "Automated emails timed to each quote's expiration that moved customers to buy before it lapsed. Five days out, a daily sweep moves the deal and HubSpot sends the branded email; a second follows three business days later if nobody clicks. One button says move forward and alerts the team; five others stamp the reason we lost it.",
        },
        {
          title: "Orders dashboard",
          detail:
            "Built over the ERP exports: open orders, declined sales, pending quotes, week over week.",
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
        {
          title: "Popl, company-wide",
          detail:
            "Integrated Popl.co across the company: branded digital business cards with a QR code, so a new contact was one scan away.",
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
      { value: "$11.6M", label: "quoted through my pipeline" },
      { value: "147", label: "deals closed-won" },
      { value: "$500K", label: "inventory buyout negotiated" },
      { value: "$24M", label: "revenue target set" },
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
      "n8n",
      "Popl",
      "Canva",
      "Higgsfield",
      "Craft CMS",
    ],
  },
  gallery: {
    label: "The work",
    rows: galleryRows,
    items: galleryRows.flat(),
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
