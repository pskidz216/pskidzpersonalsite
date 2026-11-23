import { createHmac, timingSafeEqual } from "crypto";

/**
 * Password gate for /curate.
 *
 * This repo is public, so unlike the bond-no-9 and Pristine gates there is no
 * fallback password in code. The password lives only in the Vercel env var
 * below. If it is missing, the page stays locked for everyone (fails closed).
 */
export const ACCESS_ENV_VAR = "CURATE_ACCESS_PASSWORD";

export const ACCESS_COOKIE = {
  name: "curate_access",
  path: "/curate",
  maxAgeSeconds: 60 * 60 * 24 * 30,
} as const;

const TOKEN_CONTEXT = "curate-access-v1";

type Env = Record<string, string | undefined>;

export function configuredPassword(env: Env = process.env): string | null {
  const value = env[ACCESS_ENV_VAR];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

/** Keyed hash of the password, so the cookie never carries the password or its plain hash. */
export function accessToken(password: string): string {
  return createHmac("sha256", password).update(TOKEN_CONTEXT).digest("hex");
}

/** Compares fixed-length digests, so timing reveals nothing about length or content. */
function sameDigest(a: string, b: string): boolean {
  const aBuf = Buffer.from(a, "hex");
  const bBuf = Buffer.from(b, "hex");
  return aBuf.length === bBuf.length && aBuf.length > 0 && timingSafeEqual(aBuf, bBuf);
}

export function passwordMatches(input: string, configured: string | null): boolean {
  if (configured === null || input.length === 0) return false;
  return sameDigest(accessToken(input), accessToken(configured));
}

export function tokenGrantsAccess(token: string | undefined, configured: string | null): boolean {
  if (configured === null || !token || !/^[0-9a-f]{64}$/.test(token)) return false;
  return sameDigest(token, accessToken(configured));
}
