import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://paulskidmoreii.com"),
  title: "Paul Skidmore | AI Innovator · Human Connector · Growth Strategist",
  description:
    "AI Innovator · Human Connector · Growth Strategist. Based in Miami, FL.",
  openGraph: {
    title: "Paul Skidmore",
    description:
      "AI Innovator · Human Connector · Growth Strategist",
    type: "website",
    url: "https://paulskidmoreii.com",
    siteName: "Paul Skidmore",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paul Skidmore",
    description: "AI Innovator · Human Connector · Growth Strategist",
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
