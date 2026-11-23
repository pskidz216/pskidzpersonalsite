/**
 * Copy for /curate: the go-to-market plan Paul would run as Curate's Head of Sales.
 * Public page, unlisted. Curate's private interview numbers never appear here (see the content test).
 */

export interface Move {
  title: string;
  detail: string;
}

export interface Trigger {
  seat: string;
  when: string;
}

export interface Goal {
  id: string;
  index: string;
  short: string;
  title: string;
  target: string;
  moves: Move[];
  triggers?: Trigger[];
  movesAfter?: Move[];
  measureLabel: string;
  measure: string;
  seats?: string[];
}

export interface BuiltItem {
  kicker: string;
  title: string;
  detail: string;
  fine?: string;
  href: string;
  cta: string;
  image: { src: string; alt: string };
}

export interface EngineStep {
  title: string;
  detail: string;
}

export interface SampleRow {
  id: string;
  tier: 1 | 2 | 3;
  company: string;
  segment: string;
  why: string;
  sources: string;
  lane: string;
  /** First email, under 65 words. Empty while the account is cooling down. */
  draft?: string;
  cooling?: string;
}

export interface Phase {
  range: string;
  title: string;
  items: string[];
  ships: string;
}

export interface ReportRow {
  number: string;
  why: string;
  goal?: string;
}

const goals: Goal[] = [
  {
    id: "close-rate",
    index: "01",
    short: "Close more of the interest you already get",
    title: "Close more of the interest we already get",
    target: "Lift interest to close",
    moves: [
      {
        title: "Reply in five minutes.",
        detail: "Every demo request gets a call or text within five minutes during business hours.",
      },
      {
        title: "Score before the call.",
        detail: "AI reads each lead's site and socials, scores the fit and tells the AE what to ask.",
      },
      {
        title: "One discovery script, clear stages.",
        detail: "The same questions on every call, and HubSpot stages with exit rules, so we can see where deals stall.",
      },
      {
        title: "Demo their real event.",
        detail: "Build one of their own proposals in Curate during the demo, so they see their own numbers instead of a sample.",
      },
      {
        title: "Follow up the same day.",
        detail: "Recap and proposal within the hour, then nudges on day 2, 5 and 10. Every proposal shows annual pay, two months free.",
      },
      {
        title: "A reason on every loss.",
        detail: "No deal closes lost without one. We review them every Friday and fix the top one.",
      },
    ],
    measureLabel: "Measure",
    measure: "Interest to close and deal-to-paid, by segment: florists, caterers, venues and rentals.",
  },
  {
    id: "outbound",
    index: "02",
    short: "Grow outbound's share of new sales",
    title: "Grow outbound's share of new sales",
    target: "More new customers we went out and found",
    moves: [
      {
        title: "Run the Morning List.",
        detail: "The outbound engine below: one scored market table, a daily list for each rep, and AI drafts a person approves.",
      },
      {
        title: "Venues open the door.",
        detail: "The free venue CRM gives venues a reason to take the call, and their public preferred-vendor lists turn every florist and caterer on them into a warm intro.",
      },
      {
        title: "Partners and referrals.",
        detail: "Co-market with integration partners like Galley, Nowsta and Staffmate. Ask every happy customer for one name at day 60.",
      },
      {
        title: "Be where buyers meet.",
        detail: "Cater+Event, March 22 to 25, 2027 in New Orleans, with meetings booked before we land, plus the main florist shows.",
      },
    ],
    measureLabel: "Measure",
    measure: "Outbound share of new MRR, and contacts per interested reply.",
  },
  {
    id: "team",
    index: "03",
    short: "Build the team one earned seat at a time",
    title: "Build the team one earned seat at a time",
    target: "Each seat opens when a number says so",
    moves: [
      {
        title: "Prove it before hiring.",
        detail: "First I sell next to Ryan, write the playbook and fix the funnel, so every new hire walks into a process that works.",
      },
      {
        title: "Hire on triggers instead of dates.",
        detail: "Each seat has a number that opens it:",
      },
    ],
    triggers: [
      { seat: "Second SDR", when: "Outbound holds 500 or fewer contacts per interested reply for four straight weeks." },
      { seat: "Second AE", when: "The AE's demo calendar is full two weeks out." },
      { seat: "Account manager", when: "Upgrades, add-ons and new locations bring in enough to pay for the seat." },
    ],
    movesAfter: [
      {
        title: "Ramp on real calls.",
        detail: "New reps learn from recorded calls and the discovery script, then pass a demo sign-off before they take live leads.",
      },
      {
        title: "Pay on paid.",
        detail: "Commission on deal-to-paid and starting MRR, straight from HubSpot, so the team chases the number the business needs.",
      },
    ],
    measureLabel: "Where it lands",
    measure: "A full team with a playbook behind every seat.",
    seats: ["Head of Sales", "AE", "AE", "SDR", "SDR", "Account manager"],
  },
];

const engineSteps: EngineStep[] = [
  { title: "Market table", detail: "Every caterer, venue, florist and event team in one table. Unknown fields stay blank, never guessed." },
  { title: "AI fit score", detail: "AI reads each website against our ideal customer and scores it 0 to 100. Anything under 80 is cut." },
  { title: "Tiers and lanes", detail: "Tier 1 (several locations, 25+ staff or a live signal) goes to a person. Tiers 2 and 3 run in the automated lane." },
  { title: "Signals", detail: "Why today: a new location, a hiring post for event sales, a pricing-page visit, wedding season, a competitor renewal window." },
  { title: "Morning List", detail: "Each rep opens 25 ranked accounts every morning, each with its why-today line and where the data came from." },
  { title: "First draft", detail: "Under 65 words, leads with margin, and uses the signal without sounding like we're watching. Approve, edit or skip." },
  { title: "Reply sorter", detail: "Simple replies get a drafted answer in seconds. Anything that needs judgment goes to a person." },
  { title: "Back to HubSpot", detail: "Companies, contacts, tasks, drafts and fit scores write back, so the weekly report builds itself." },
];

const sampleRows: SampleRow[] = [
  {
    id: "harbor",
    tier: 1,
    company: "Harbor & Vine Catering",
    segment: "Caterer · 2 locations",
    why: "Opening a second kitchen this spring",
    sources: "Local news · Website",
    lane: "Human sends",
    draft:
      "Hi Dana, congrats on the second kitchen. When caterers add a location, pricing drifts between spreadsheets and margin leaks on every proposal. Curate keeps proposals, production and payments in one place, so both kitchens quote the same way. Worth 15 minutes next week to see it on one of your real events?",
  },
  {
    id: "wildstem",
    tier: 2,
    company: "Wildstem Floral Co.",
    segment: "Florist · 9 staff",
    why: "Hiring an events coordinator",
    sources: "Job post · Instagram",
    lane: "Agent can answer simple replies",
    draft:
      "Hi Maya, saw Wildstem is hiring an events coordinator, which usually means the wedding calendar is filling up. Florists on Curate build proposals from their own recipes and costs, so margin holds as volume grows. Want to see how one of your recent proposals would look in it?",
  },
  {
    id: "foundry",
    tier: 1,
    company: "The Foundry Hall",
    segment: "Venue · 40 staff",
    why: "Booking-tool contract renews in January",
    sources: "Review sites · LinkedIn",
    lane: "Human sends",
    draft:
      "Hi Chris, venues your size tell us the hard part is keeping inquiries, contracts and event details in one place. Curate's venue CRM ties every message to its event, and it comes with Curate at no extra cost. Open to a quick look before you renew anything this winter?",
  },
  {
    id: "petal",
    tier: 3,
    company: "Petal & Post Studio",
    segment: "Florist · 3 staff",
    why: "Contacted last month",
    sources: "Website",
    lane: "Agent can answer simple replies",
    cooling: "Cooling down until Dec 21",
  },
];

export const curatePlan = {
  domain: "paulskidmoreii.com / curate",
  eyebrow: "Prepared for Curate · Head of Sales",
  hero: {
    h1: "How I'd run sales at Curate.",
    sub: "The go-to-market plan I'd bring to the Head of Sales seat, built around the three goals we talked about, plus the live sales call and AI walkthrough I built to show how I work.",
  },
  goals,
  built: {
    label: "What I built to show it",
    title: "A live sales call, then what happens after it",
    note: "I used Claude to build both. They're Claude artifacts, so I can customize them quickly.",
    items: [
      {
        kicker: "The call · Deck",
        title: "The Founders Club",
        detail:
          "A membership pitch for a fictional St. Louis club for founders. The deck reorders itself around what the buyer says he wants, then builds his plan, add-ons and founding offer while we talk.",
        href: "https://claude.ai/artifact/Tk7Ue6VgFe1F2qh9NSbS7B",
        cta: "Open the deck",
        image: {
          src: "/work/curate/deck-cover.webp",
          alt: "Cover slide of The Founders Club deck: the headline The club for people who build, beside a photo of a brick hall with a glass-walled gym, work lounge and smoothie bar",
        },
      },
      {
        kicker: "After the call · Sales OS",
        title: "How I run a deal with AI",
        detail:
          "Lead to signature in eight steps: lead scoring, call notes into HubSpot, the follow-up email and proposal, automatic nudges and an e-signature close.",
        fine: "Opens with sample data. The live AI steps run on my own accounts.",
        href: "https://claude.ai/artifact/Lam1wuM5fBsms9NQAhj24g",
        cta: "Open the Sales OS",
        image: {
          src: "/work/curate/sales-os-overview.webp",
          alt: "The Sales OS overview: an eight-step path from lead to e-signature, with the tools behind each step such as HubSpot, Claude and Wispr Flow",
        },
      },
    ] satisfies BuiltItem[],
  },
  plan: {
    label: "The plan",
    title: "What I'd do for each goal",
    intro: "AI does the research, scoring, first drafts and call notes. People make the calls and own the yes.",
  },
  engine: {
    label: "The outbound engine",
    title: "Ramp's outbound system, sized for Curate",
    intro:
      "Modeled on how Ramp runs outbound, built for a small team on HubSpot. Every morning AI picks the accounts with a reason to talk today and writes the first email. A person approves every one.",
    steps: engineSteps,
    sample: {
      label: "Sample data",
      title: "This morning's list",
      rows: sampleRows,
    },
    guardrails: [
      "Nothing sends on its own",
      "Unknown data stays blank",
      "Each account hears from us once a month at most",
    ],
    scoreboard: {
      label: "Scoreboard",
      items: [
        { metric: "Contacts per interested reply", note: "By offer. Target: 500 or fewer." },
        { metric: "Positive reply rate", note: "Which offers land." },
        { metric: "Reply to demo", note: "Which replies turn into meetings." },
        { metric: "Market touched this month", note: "Against a cap, so a small market doesn't burn out." },
      ],
    },
  },
  days: {
    label: "First 90 days",
    title: "Learn, fix, then scale",
    phases: [
      {
        range: "Days 1 to 30",
        title: "Learn",
        items: [
          "Sell next to Ryan and run live demos by week two.",
          "Listen to 30 recorded calls. Talk to 10 customers and 5 lost deals.",
          "Audit HubSpot: lead sources, stages and loss reasons.",
          "Baseline the three goals by segment.",
        ],
        ships: "Stage definitions, the discovery script and the Monday report.",
      },
      {
        range: "Days 31 to 60",
        title: "Fix",
        items: [
          "Five-minute reply and same-day follow-up on every lead.",
          "Demos built on the prospect's own event.",
          "Weekly deal reviews and call coaching with the AE and SDR.",
          "Morning List pilot in one segment, starting with venues.",
        ],
        ships: "Playbook v1.",
      },
      {
        range: "Days 61 to 90",
        title: "Scale",
        items: [
          "Roll the Morning List into a second segment.",
          "Start partner co-marketing and referral asks.",
          "Book Cater+Event meetings for March.",
          "Hiring plan with triggers, and the first job post ready.",
        ],
        ships: "The 2027 plan and quota by rep.",
      },
    ] satisfies Phase[],
  },
  report: {
    label: "Every Monday",
    title: "The report you'd get",
    intro: "Built in HubSpot and sent automatically. Seven numbers, each tied to a goal or a decision.",
    rows: [
      { number: "Interest to close, by segment", why: "Shows which segment to push and which to fix.", goal: "Goal 1" },
      { number: "Speed to first reply", why: "The fastest lever on close rate." },
      { number: "Demos held, and demo to proposal", why: "Where deals stall." },
      { number: "Deal-to-paid and starting MRR", why: "How this seat is measured." },
      { number: "Outbound share of new MRR", why: "Progress on outbound.", goal: "Goal 2" },
      { number: "Contacts per interested reply", why: "Whether an offer works, and when to hire the next SDR.", goal: "Goal 3" },
      { number: "Top three loss reasons", why: "What to fix next: the pitch, the product or the price." },
    ] satisfies ReportRow[],
  },
  closing: {
    cta: "Happy to walk through any of it.",
    sub: "Twenty minutes is enough to run the deck as a live call and show the Sales OS after it.",
    secondary: { label: "See the BoldX case study", href: "/work/boldx" },
  },
} as const;

export type CuratePlan = typeof curatePlan;
