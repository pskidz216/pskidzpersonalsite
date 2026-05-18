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
