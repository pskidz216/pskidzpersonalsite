import type { Metadata } from "next";
import { BoldxPage } from "./BoldxPage";

const title = "BoldX strategy, sales and marketing — Paul Skidmore";
const description =
  "Case study, 2025–2026: strategy, sales and marketing for an aerospace manufacturer, from the brand bible to the systems behind $11.6M in quoted pipeline.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "article",
    url: "https://paulskidmoreii.com/work/boldx",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function BoldxRoute() {
  return <BoldxPage />;
}
