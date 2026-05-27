/**
 * Route prefixes that opt out of the global custom cursor + Lenis smooth scroll.
 *
 * The bond-no-9 review uses the default OS cursor (it's a presentation
 * surface for a client, not the portfolio's interactive feel) and skips
 * Lenis because the smooth-scroll listener can interfere with form input
 * on the password gate.
 *
 * The WebGL canvas, noise overlay, and scroll progress bar still mount on
 * these routes — the card just sits opaquely above them via z-index.
 */
export const ROUTE_PREFIXES_WITHOUT_CURSOR_OR_LENIS = ["/bond-no-9"] as const;

export function pathHasGlobalChrome(pathname: string | null | undefined): boolean {
  if (!pathname) return true;
  return !ROUTE_PREFIXES_WITHOUT_CURSOR_OR_LENIS.some((prefix) =>
    pathname.startsWith(prefix)
  );
}
