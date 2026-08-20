/**
 * Whether the Pong intro has already greeted this visitor.
 *
 * Session-scoped on purpose: the game should introduce itself once per visit,
 * not once per page load, so a refresh or a trip back to the homepage goes
 * straight to the site. Closing the tab starts a new visit.
 *
 * Storage can throw (Safari private mode, blocked third-party contexts), and
 * the failure has to be silent in both directions: if we cannot read, greet
 * them; if we cannot write, the intro simply shows again next load.
 */

const KEY = "psii-pong-intro-seen";

export function hasSeenIntro(): boolean {
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function markIntroSeen(): void {
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* the intro just greets them again next load */
  }
}

let cached: boolean | null = null;

/**
 * Whether this page load still owes the visitor a greeting.
 *
 * Cached for the life of the page load, which is what makes it safe to read
 * from `useSyncExternalStore`: marking the intro seen happens moments after
 * the first read, and a snapshot that flips underneath React is a bug (it
 * warns, and can re-render in a loop). Module state resets on a real page
 * load, which is exactly the granularity we want.
 */
export function isIntroPending(): boolean {
  if (cached === null) cached = !hasSeenIntro();
  return cached;
}

/** Test seam: the cache is per page load, and tests share one module. */
export function resetIntroPendingCache(): void {
  cached = null;
}
