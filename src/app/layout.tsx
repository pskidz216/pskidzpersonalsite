import type { Metadata } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Paul Skidmore — Sales Leader, Growth Strategist, AI Builder",
  description:
    "Personal site of Paul Skidmore. A decade of building at the intersection of healthcare, technology, and growth — now powered by AI. Based in Miami, FL.",
  openGraph: {
    title: "Paul Skidmore — Sales Leader, Growth Strategist, AI Builder",
    description:
      "A decade of building at the intersection of healthcare, technology, and growth — now powered by AI.",
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
