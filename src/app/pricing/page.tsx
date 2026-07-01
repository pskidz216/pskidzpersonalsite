import type { Metadata } from "next";
import { PricingPage } from "./PricingPage";

const description =
  "Fixed-price builds for AI-native brand, web, and automation work — or a retainer to keep it running and keep building.";

export const metadata: Metadata = {
  title: "Pricing — Paul Skidmore",
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Pricing — Paul Skidmore",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Paul Skidmore",
    description,
  },
};

export default function PricingRoute() {
  return <PricingPage />;
}
