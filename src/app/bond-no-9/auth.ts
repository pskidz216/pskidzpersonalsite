import "server-only";
import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "bond_access";
const COOKIE_PATH = "/bond-no-9";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
const PASSWORD_FALLBACK = "B0nd2025";

function getConfiguredPassword(): string {
  const fromEnv = process.env.BOND_ACCESS_PASSWORD;
  if (typeof fromEnv === "string" && fromEnv.length > 0) return fromEnv;
  return PASSWORD_FALLBACK;
}

function tokenFor(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export function verifyPassword(input: string): boolean {
  const expected = getConfiguredPassword();
  return safeEqual(input, expected);
}

export async function grantAccess(): Promise<void> {
  const expectedToken = tokenFor(getConfiguredPassword());
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: expectedToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: COOKIE_PATH,
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });
}

export async function revokeAccess(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: "",
    path: COOKIE_PATH,
    maxAge: 0,
  });
}

export async function hasAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  if (!cookie) return false;
  const expectedToken = tokenFor(getConfiguredPassword());
  return safeEqual(cookie.value, expectedToken);
}
