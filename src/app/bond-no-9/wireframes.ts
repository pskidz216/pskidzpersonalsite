export type WireframeVariant = {
  slug: string;
  letter: "A" | "B" | "C";
  title: string;
  tagline: string;
  description: string;
  htmlPath: string;
  referenceBrand?: string;
  referenceWhy?: string;
};

export type WireframeGroup = {
  groupSlug: "homepage" | "neighborhoods";
  groupTitle: string;
  groupSubtitle: string;
  variants: readonly WireframeVariant[];
};

export const WIREFRAME_GROUPS: readonly WireframeGroup[] = [
  {
    groupSlug: "homepage",
    groupTitle: "Homepage",
    groupSubtitle: "Three ways into the brand world.",
    variants: [
      {
        slug: "editorial-front",
        letter: "A",
        title: "Editorial Front",
        tagline: "Magazine-led entry. Neighborhood story before shop.",
        description:
          "Lead with a Bond magazine front cover. The reader meets the brand as a New York story, then descends into the shop. For visitors who came for the world, not the bottle.",
        htmlPath: "/bond-no-9/wireframes/editorial-front.html",
        referenceBrand: "Prestige (Maestrooo)",
        referenceWhy:
          "Luxury Shopify theme with magazine-style hero, editorial sections, and story-first layout patterns. Built for perfumery / high-end beauty — closest theme for the magazine-led entry.",
      },
      {
        slug: "two-doors",
        letter: "B",
        title: "Two Doors",
        tagline: "Split entry. Pick your door — Neighborhoods or Shop.",
        description:
          "Two equal halves at the top of the page. Left door opens the Neighborhood Atlas; right door opens the Shop grid. For the visitor who knows what they want.",
        htmlPath: "/bond-no-9/wireframes/two-doors.html",
        referenceBrand: "Symmetry (Clean Themes)",
        referenceWhy:
          "Shopify theme built around modular dual-column hero blocks and equal-weight image-with-text sections. Closest theme for the split-entry, pick-your-door composition.",
      },
      {
        slug: "hybrid",
        letter: "C",
        title: "Hybrid",
        tagline: "Best of both. Story above the fold, shop a scroll away.",
        description:
          "Editorial hero with a strong shop pivot directly below the fold. Story without burying the cart. Recommended default for most traffic mixes.",
        htmlPath: "/bond-no-9/wireframes/hybrid.html",
        referenceBrand: "Impulse (Archetype Themes)",
        referenceWhy:
          "Editorial Shopify theme purpose-built for story-then-commerce — full-bleed hero, lookbook sections, featured collection grid below the fold. Closest theme for the hybrid flow.",
      },
    ],
  },
  {
    groupSlug: "neighborhoods",
    groupTitle: "Neighborhoods",
    groupSubtitle:
      "Three ways to handle the neighborhoods experience — each option shows BOTH the high-level page (/pages/new-york-neighborhoods) AND a neighborhood detail page (/pages/neighborhood/{slug}) on the same scroll.",
    variants: [
      {
        slug: "neighborhoods-a",
        letter: "A",
        title: "Mosaic + Editorial Spread",
        tagline: "Magazine-spread tiles → neighborhood as cover story.",
        description:
          "PAGE: asymmetric tile mosaic, one large hero + four supporting, editorial intro band. DETAIL: cinematic hero, perfumer pull-quote, 'The Curated Three' picks, full 8-fragrance grid, discovery-set CTA, next-neighborhood handoff. Most editorial pairing. Pairs with Homepage A.",
        htmlPath: "/bond-no-9/wireframes/neighborhoods-a.html",
      },
      {
        slug: "neighborhoods-b",
        letter: "B",
        title: "Map + Filterable Catalog",
        tagline: "Pin the city → filter the neighborhood.",
        description:
          "PAGE: stylized NYC map with five hotspots, side panel reveals each neighborhood's image + featured fragrance. DETAIL: filter chip row (family · occasion · intensity), 8-card grid with Add + Try Sample, sticky compare bar, gold discovery-set CTA. Most conversion-aware. Pairs with Homepage B.",
        htmlPath: "/bond-no-9/wireframes/neighborhoods-b.html",
      },
      {
        slug: "neighborhoods-c",
        letter: "C",
        title: "Stories + Guided Discovery",
        tagline: "Read the chapter → find your match in 30 seconds.",
        description:
          "PAGE: five alternating parallax spreads, one chapter per neighborhood, editorial pane + featured fragrance. DETAIL: split hero with 3-step mini-quiz, reveals 'Your three matches' with match percentages, then full grid. Quiz feeds Attentive segmentation. Most differentiated. Pairs with Homepage C — the recommended pick.",
        htmlPath: "/bond-no-9/wireframes/neighborhoods-c.html",
      },
    ],
  },
] as const;

export const WIREFRAMES: readonly WireframeVariant[] = WIREFRAME_GROUPS.flatMap(
  (g) => g.variants
);

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
