/**
 * Route-based opt-outs for global decorations.
 *
 * Two layers:
 *
 * 1. CURSOR_OR_LENIS — the bond-no-9 review uses the default OS cursor
 *    (it's a presentation surface for a client, not the portfolio's
 *    interactive feel) and skips Lenis because the smooth-scroll listener
 *    can interfere with form input on the password gate.
 *
 * 2. DECORATIVE_CHROME — the WebGL canvas + film-grain noise overlay.
 *    Skipped on bond-no-9 SUB-routes (/bond-no-9/wireframes,
 *    /bond-no-9/popups, /bond-no-9/brand-comparison, etc.) so review
 *    content reads on clean paper. The /bond-no-9 login page itself
 *    KEEPS the constellation as a brand entry moment.
 *
 * The scroll progress bar always mounts — it's a 3px strip at top:0
 * that never overlaps content.
 */
export const ROUTE_PREFIXES_WITHOUT_CURSOR_OR_LENIS = ["/bond-no-9"] as const;

export function pathHasGlobalChrome(pathname: string | null | undefined): boolean {
  if (!pathname) return true;
  return !ROUTE_PREFIXES_WITHOUT_CURSOR_OR_LENIS.some((prefix) =>
    pathname.startsWith(prefix)
  );
}

/**
 * Returns true if the route should show the WebGL canvas + noise overlay.
 *
 * The bond-no-9 LOGIN (exact path) keeps them as a brand intro.
 * Any sub-route under /bond-no-9/ is review content and renders on white.
 */
export function pathShowsDecorativeChrome(
  pathname: string | null | undefined
): boolean {
  if (!pathname) return true;
  // Match /bond-no-9/<something> — i.e. a sub-route, not the login root.
  return !/^\/bond-no-9\/[^/]/.test(pathname);
}
