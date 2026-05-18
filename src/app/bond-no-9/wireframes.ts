export type WireframeVariant = {
  slug: string;
  letter: "A" | "B" | "C";
  title: string;
  tagline: string;
  description: string;
  htmlPath: string;
};

export type WireframeGroup = {
  groupSlug: "homepage" | "neighborhoods-page" | "neighborhood-detail";
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
    ],
  },
  {
    groupSlug: "neighborhoods-page",
    groupTitle: "Neighborhoods Page",
    groupSubtitle:
      "Three ways to structure /pages/new-york-neighborhoods — five neighborhoods, one page.",
    variants: [
      {
        slug: "neighborhoods-mosaic",
        letter: "A",
        title: "Editorial Mosaic",
        tagline: "Asymmetric magazine-spread tile mosaic.",
        description:
          "One large hero tile, four supporting tiles arranged asymmetrically around it. Editorial intro band above the grid. Hover reveals scent count + featured fragrance. Pairs with Homepage B (Two Doors). Ships fastest.",
        htmlPath: "/bond-no-9/wireframes/neighborhoods-page.html#option-a",
      },
      {
        slug: "neighborhoods-map",
        letter: "B",
        title: "Interactive Map",
        tagline: "Stylized NYC map with five labeled hotspots.",
        description:
          "Geography-as-fragrance made literal. Click a pin, a side panel reveals the neighborhood's image, tagline, featured fragrance, and CTAs. Pairs with Homepage C (Hybrid). Highest brand differentiation.",
        htmlPath: "/bond-no-9/wireframes/neighborhoods-page.html#option-b",
      },
      {
        slug: "neighborhoods-stories",
        letter: "C",
        title: "Scrolling Stories",
        tagline: "Five alternating long-form spreads, one per neighborhood.",
        description:
          "Each neighborhood becomes a chapter: 60% parallax imagery, 40% editorial pane (eyebrow, name, tagline, ~50-word story, featured fragrance card, CTA). Alternates left/right. Pairs with Homepage A (Editorial Front).",
        htmlPath: "/bond-no-9/wireframes/neighborhoods-page.html#option-c",
      },
    ],
  },
  {
    groupSlug: "neighborhood-detail",
    groupTitle: "Neighborhood Detail Page",
    groupSubtitle:
      "Three ways to structure /pages/neighborhood/{slug} — Uptown, Downtown, Parks, City Scents, Beaches share one template.",
    variants: [
      {
        slug: "detail-editorial-spread",
        letter: "A",
        title: "Editorial Spread",
        tagline: "The neighborhood as a magazine cover story.",
        description:
          "Cinematic hero, perfumer pull-quote, two-column editorial (story + metadata), 'The Curated Three' picks, full 8-fragrance grid, discovery-set CTA, next-neighborhood handoff. Most editorial. Pairs with Homepage A.",
        htmlPath: "/bond-no-9/wireframes/neighborhood-detail.html#option-a",
      },
      {
        slug: "detail-filterable",
        letter: "B",
        title: "Filterable Catalog",
        tagline: "Curated catalog with filters and side-by-side compare.",
        description:
          "Compressed hero, filter chip row (family · notes · intensity · occasion), 8-fragrance grid with Add + Try Sample buttons, sticky compare bar, gold discovery-set CTA, neighborhood pill row. Pairs with Homepage B. Highest conversion velocity.",
        htmlPath: "/bond-no-9/wireframes/neighborhood-detail.html#option-b",
      },
      {
        slug: "detail-guided",
        letter: "C",
        title: "Guided Discovery",
        tagline: "Find your fragrance in 30 seconds — embedded mini-quiz.",
        description:
          "Split hero with a 3-step mini-quiz on the right. After 3 taps, the page reveals 'Your three matches' with match percentages, then the full grid for browsers. Quiz feeds Attentive segmentation. Pairs with Homepage C — the recommended pick.",
        htmlPath: "/bond-no-9/wireframes/neighborhood-detail.html#option-c",
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
