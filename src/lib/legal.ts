export interface LegalSection {
  heading: string;
  body: string[];
}

export const LEGAL_UPDATED = "November 1, 2026";

export const privacySections: LegalSection[] = [
  {
    heading: "Who runs this site",
    body: [
      "This is the personal website of Paul Skidmore, based in Miami, Florida. Questions about this policy go to pskidmore216@gmail.com.",
    ],
  },
  {
    heading: "What this site collects",
    body: [
      "The site has no accounts and no forms. If you email me, I receive whatever you send and use it to reply to you. I do not sell it or add you to a marketing list.",
    ],
  },
  {
    heading: "Analytics",
    body: [
      "If you accept on the site's banner, Vercel Web Analytics counts page views: the page, the referring site, and your browser, device type and country. It does not set cookies or build a profile of you.",
      "If you decline, it does not load. Your choice is saved in your own browser, and clearing this site's data lets you choose again.",
    ],
  },
  {
    heading: "Hosting",
    body: [
      "Vercel hosts this site. Like most hosts, it keeps standard request logs, which can include IP addresses, to run and secure the service.",
    ],
  },
  {
    heading: "Other sites",
    body: [
      "Links to other websites, such as LinkedIn, are governed by those sites' own policies.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If this policy changes, the new version will appear here with a new date.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Using this site",
    body: [
      "This site describes my work and how to reach me. By using it you agree to these terms. If you do not agree, please do not use it.",
    ],
  },
  {
    heading: "Work shown here",
    body: [
      "Case studies show work I did for the companies named. Those companies' names, logos and marks belong to their owners. They appear as a record of that work, and their appearance is not an endorsement of this site or of me.",
    ],
  },
  {
    heading: "Figures and results",
    body: [
      "Results describe specific past work. They are not a promise of what another company will achieve.",
    ],
  },
  {
    heading: "Working together",
    body: [
      "Nothing on this site is an offer or professional advice. Paid work begins only under a separate written agreement, and that agreement controls.",
    ],
  },
  {
    heading: "This site's content",
    body: [
      "The site's own writing and design are mine. Please ask before reusing them.",
    ],
  },
  {
    heading: "No warranties",
    body: [
      "The site is provided as it is, without warranties. To the extent the law allows, I am not liable for damages from using it or from relying on it.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the State of Florida. Questions go to pskidmore216@gmail.com.",
    ],
  },
];
