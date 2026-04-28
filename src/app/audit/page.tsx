import type { Metadata } from "next";
import { AuditPage } from "./AuditPage";

const description =
  "Workflow audits for operators. Map what's actually running, identify what's worth automating, ship a 14/30/60 plan. First 30 minutes always free.";

export const metadata: Metadata = {
  title: "Workflow Audit — Paul Skidmore",
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title: "Workflow Audit — Paul Skidmore",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Workflow Audit — Paul Skidmore",
    description,
  },
};

export default function AuditRoute() {
  return <AuditPage />;
}
