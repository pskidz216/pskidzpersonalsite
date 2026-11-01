import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulskidmoreii.com"),
  title: "Paul Skidmore | Revenue Operator · Brand Builder · Miami",
  description:
    "Sales and marketing leader who rebuilt the BoldX Industries brand and built the AI behind its pipeline. Open to operator roles and consulting. Miami, FL.",
  openGraph: {
    title: "Paul Skidmore",
    description:
      "Rebuilt the BoldX Industries brand and built the AI behind its pipeline. Open to operator roles and consulting.",
    type: "website",
    url: "https://paulskidmoreii.com",
    siteName: "Paul Skidmore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Skidmore",
    description:
      "Rebuilt the BoldX Industries brand and built the AI behind its pipeline. Open to operator roles and consulting.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <ScrollProgressBar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
