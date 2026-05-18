export type WireframeVariant = {
  slug: "editorial-front" | "two-doors" | "hybrid";
  letter: "A" | "B" | "C";
  title: string;
  tagline: string;
  description: string;
  htmlPath: string;
};

export const WIREFRAMES: readonly WireframeVariant[] = [
  {
    slug: "editorial-front",
    letter: "A",
    title: "Editorial Front",
    tagline: "Magazine-led entry. Neighborhood story before shop.",
    description:
      "Lead with a Bond magazine front cover. The reader meets the brand as a New York story, then descends into the shop. For visitors who came for the world, not the bottle.",
    htmlPath: "/bond-no-9/wireframes/editorial-front.html",
  },
  {
    slug: "two-doors",
    letter: "B",
    title: "Two Doors",
    tagline: "Split entry. Pick your door — Neighborhoods or Shop.",
    description:
      "Two equal halves at the top of the page. Left door opens the Neighborhood Atlas; right door opens the Shop grid. For the visitor who knows what they want.",
    htmlPath: "/bond-no-9/wireframes/two-doors.html",
  },
  {
    slug: "hybrid",
    letter: "C",
    title: "Hybrid",
    tagline: "Best of both. Story above the fold, shop a scroll away.",
    description:
      "Editorial hero with a strong shop pivot directly below the fold. Story without burying the cart. Recommended default for most traffic mixes.",
    htmlPath: "/bond-no-9/wireframes/hybrid.html",
  },
] as const;

export function getWireframeBySlug(
  slug: string
): WireframeVariant | undefined {
  return WIREFRAMES.find((w) => w.slug === slug);
}

export type PopupVariant = {
  slug: "options";
  letter: "1";
  title: string;
  tagline: string;
  description: string;
  htmlPath: string;
};

export const POPUPS: readonly PopupVariant[] = [
  {
    slug: "options",
    letter: "1",
    title: "Popup Options",
    tagline: "Three variants paired to each homepage direction.",
    description:
      "Why the default Perfect Popup doesn't ship as written, what's currently running on bondno9.com, how niche-luxury houses run opt-in, mobile renders, trigger logic, and the Attentive Creative ship checklist — one document.",
    htmlPath: "/bond-no-9/popups/options.html",
  },
] as const;

export function getPopupBySlug(slug: string): PopupVariant | undefined {
  return POPUPS.find((p) => p.slug === slug);
}

export type BrandComparisonVariant = {
  slug: "full";
  letter: "1";
  title: string;
  tagline: string;
  description: string;
  htmlPath: string;
};

export const BRAND_COMPARISONS: readonly BrandComparisonVariant[] = [
  {
    slug: "full",
    letter: "1",
    title: "Brand Comparison",
    tagline: "Bond vs. Creed, MFK, Marly, Le Labo, Byredo — measured.",
    description:
      "Live cross-site comparison across typography scale, image-to-canvas ratio, hero treatment, the product-listing grid, and the product-detail page. Every measurement taken from the actual sites on 2026-05-13. The 'stuff seems a little big' reviewer note tested against real numbers, dimension by dimension.",
    htmlPath: "/bond-no-9/presentations/brand-comparison.html",
  },
] as const;

export function getBrandComparisonBySlug(
  slug: string
): BrandComparisonVariant | undefined {
  return BRAND_COMPARISONS.find((b) => b.slug === slug);
}
