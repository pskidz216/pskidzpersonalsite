import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { AnalyticsConsent } from "@/components/ui/AnalyticsConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulskidmoreii.com"),
  title: "Paul Skidmore | Revenue Operator · Brand Builder · Miami",
  description:
    "Sales and marketing leader who built BoldX's go-to-market and the AI behind its pipeline. Open to business development and sales roles. Miami, FL.",
  openGraph: {
    title: "Paul Skidmore",
    description:
      "Built BoldX's go-to-market and the AI behind its pipeline. Open to business development and sales roles.",
    type: "website",
    url: "https://paulskidmoreii.com",
    siteName: "Paul Skidmore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Skidmore",
    description:
      "Built BoldX's go-to-market and the AI behind its pipeline. Open to business development and sales roles.",
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
        <AnalyticsConsent />
      </body>
    </html>
  );
}
