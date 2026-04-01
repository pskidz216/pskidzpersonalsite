import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

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
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
