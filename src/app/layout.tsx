import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { AnalyticsConsent } from "@/components/ui/AnalyticsConsent";

// What LinkedIn and other link previews show under the link.
const shareTitle = "Paul Skidmore: sales and business development";
const shareDescription =
  "12 years in revenue, from the operating room to building BoldX's go-to-market and the AI behind its pipeline: $18.3M quoted, $4.6M won across 212 deals. 16 certifications. Open to business development and sales roles. Miami, FL.";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulskidmoreii.com"),
  title: "Paul Skidmore | Revenue Operator · Brand Builder · Miami",
  description:
    "Sales leader who built BoldX's pipeline: it quoted $18.3M and won $4.6M. Open to business development and sales roles. Miami, FL.",
  openGraph: {
    title: shareTitle,
    description: shareDescription,
    type: "website",
    url: "https://paulskidmoreii.com",
    siteName: "Paul Skidmore",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description: shareDescription,
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
