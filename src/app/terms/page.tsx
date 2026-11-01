import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { termsSections } from "@/lib/legal";

const title = "Terms — Paul Skidmore";
const description =
  "The terms for using paulskidmoreii.com, including how client work, company names and marks are shown on the site.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function TermsRoute() {
  return <LegalPage title="Terms" sections={termsSections} />;
}
