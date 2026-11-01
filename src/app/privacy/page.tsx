import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/LegalPage";
import { privacySections } from "@/lib/legal";

const title = "Privacy — Paul Skidmore";
const description =
  "What paulskidmoreii.com collects, how its analytics work, and how to reach Paul Skidmore about your information.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

export default function PrivacyRoute() {
  return <LegalPage title="Privacy" sections={privacySections} />;
}
