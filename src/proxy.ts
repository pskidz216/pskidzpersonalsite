import { NextRequest, NextResponse } from "next/server";

/**
 * Gate for the Pristine Coastal Co. concept deck.
 *
 * Next 16 renamed the middleware convention to `proxy`. Same semantics:
 * this runs ahead of static file serving, which is the only place a folder
 * of files under `public/` can be gated.
 *
 * The deck is a folder of static files under `public/pristine`, so it is not
 * an App Router route and cannot gate itself. Middleware runs ahead of static
 * file serving, which is the only place this check can live.
 *
 * PASSWORD_FALLBACK exists so the deck works without any Vercel config, the
 * same way bond-no-9 does. Be clear-eyed about what that buys: this repo is
 * public, so the fallback is readable by anyone who finds it. The gate stops
 * a casual visitor, not a determined one. Set PRISTINE_ACCESS_PASSWORD in
 * Vercel to override it with something that is actually private.
 */

const COOKIE_NAME = "pristine_access";
const LOGIN_PATH = "/pristine-login";
const PASSWORD_FALLBACK = "Pristine1@";

async function sha256Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Length-independent constant-time-ish compare for two hex strings. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const fromEnv = process.env.PRISTINE_ACCESS_PASSWORD;
  const password =
    typeof fromEnv === "string" && fromEnv.length > 0 ? fromEnv : PASSWORD_FALLBACK;

  const cookie = req.cookies.get(COOKIE_NAME)?.value ?? "";
  const expected = await sha256Hex(password);

  if (!safeEqual(cookie, expected)) {
    const url = req.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    url.search = `?next=${encodeURIComponent(pathname + search)}`;
    return NextResponse.redirect(url);
  }

  // Send `/pristine` to the actual file rather than rewriting it silently.
  // A rewrite would leave the browser on `/pristine`, and every relative asset
  // in the deck would then resolve against the site root: `assets/deck.css`
  // becomes `/assets/deck.css`. Redirecting to `/pristine/` instead loops,
  // because Next strips trailing slashes by default and sends it straight
  // back. Landing on the real filename fixes both.
  if (pathname === "/pristine" || pathname === "/pristine/") {
    const url = req.nextUrl.clone();
    url.pathname = "/pristine/index.html";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pristine", "/pristine/:path*"],
};
