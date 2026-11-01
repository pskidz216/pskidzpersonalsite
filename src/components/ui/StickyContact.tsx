import { socialLinks } from "@/lib/data";

const fallback = "mailto:pskidmore216@gmail.com";

/** The page's call to action: on the first screen, and still there while scrolling. */
export function StickyContact() {
  const href = socialLinks.find((link) => link.label === "Email")?.href ?? fallback;
  return (
    <a
      href={href}
      className="fixed top-5 right-5 md:top-7 md:right-8 z-40 inline-flex items-center rounded-full bg-accent-coral px-5 py-2.5 md:py-3 font-body text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-colors hover:bg-[#d9634a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-coral focus-visible:ring-offset-2"
    >
      Get in touch
    </a>
  );
}
