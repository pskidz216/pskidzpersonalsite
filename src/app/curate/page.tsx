import type { Metadata } from "next";
import { CuratePage } from "./CuratePage";
import { curatePlan } from "./content";
import { CurateLogin } from "./CurateLogin";
import { hasCurateAccess } from "./session";

const title = "How I'd run sales at Curate · Paul Skidmore";
const description =
  "The go-to-market plan I'd bring to Curate's Head of Sales seat: three goals, an AI outbound engine modeled on Ramp's, the first 90 days and the Monday report.";

export const metadata: Metadata = {
  title,
  description,
  // Unlisted: shared by link with Curate, kept out of search and the sitemap.
  robots: { index: false, follow: false },
  openGraph: {
    title: "How I'd run sales at Curate",
    description,
    type: "article",
    url: "https://paulskidmoreii.com/curate",
  },
  twitter: {
    card: "summary_large_image",
    title: "How I'd run sales at Curate",
    description,
  },
};

/** Password-gated: the plan renders only after the visitor unlocks it (see access.ts). */
export default async function CurateRoute() {
  return (await hasCurateAccess()) ? <CuratePage plan={curatePlan} /> : <CurateLogin />;
}
