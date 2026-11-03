import type { Metadata } from "next";
import { BoldxPage } from "./BoldxPage";

const title = "BoldX strategy, sales and marketing — Paul Skidmore";
const description =
  "Case study: go-to-market for an aerospace manufacturer. $18.3M quoted and $15.5M won across 212+ deals on the live quote pipeline I built with AI agents.";
// What LinkedIn and other link previews show under the link.
const shareTitle = "How I built BoldX's strategy, sales and marketing";
const shareDescription =
  "$18.3M quoted and $15.5M won across 212+ deals on the live HubSpot quote pipeline I built with AI agents. The full case study: brand bible, 32-page catalog, 2026–2028 strategy, long-term contracts and AEO visibility from 0% to 10%.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    // LinkedIn shows the site name under the card title in place of the URL.
    siteName: "BoldX Case Study",
    type: "article",
    url: "https://paulskidmoreii.com/work/boldx",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
  },
};

export default function BoldxRoute() {
  return <BoldxPage />;
}
