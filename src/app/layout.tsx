import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";

export const metadata: Metadata = {
  title: "Paul Skidmore | AI Innovator · Human Connector · Growth Strategist",
  description:
    "AI Innovator · Human Connector · Growth Strategist. Based in Miami, FL.",
  openGraph: {
    title: "Paul Skidmore",
    description:
      "AI Innovator · Human Connector · Growth Strategist",
    type: "website",
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
        <NoiseOverlay />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
