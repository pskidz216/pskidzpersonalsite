import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./bond.css";

export const metadata: Metadata = {
  title: "Bond No. 9 — Wireframe Review",
  description:
    "Private wireframe review for Bond No. 9. Three homepage directions to choose from.",
  robots: { index: false, follow: false, nocache: true },
};

export default function BondLayout({ children }: { children: ReactNode }) {
  return <div className="bond-shell">{children}</div>;
}
