"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHash, timingSafeEqual } from "crypto";

const COOKIE_NAME = "pristine_access";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 14;

/**
 * Fallback so the deck works with no Vercel config, matching bond-no-9.
 * This repo is public, so the fallback is readable by anyone who finds it.
 * Set PRISTINE_ACCESS_PASSWORD in Vercel to make the gate genuinely private.
 */
const PASSWORD_FALLBACK = "Pristine1@";

function configuredPassword(): string {
  const fromEnv = process.env.PRISTINE_ACCESS_PASSWORD;
  return typeof fromEnv === "string" && fromEnv.length > 0
    ? fromEnv
    : PASSWORD_FALLBACK;
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

export type LoginState = { error?: string };

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const expected = configuredPassword();
  const supplied = String(formData.get("password") ?? "");
  if (!safeEqual(supplied, expected)) {
    return { error: "That password is not right." };
  }

  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: tokenFor(expected),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_SECONDS,
  });

  const raw = String(formData.get("next") ?? "/pristine");
  // Only ever redirect inside the deck. Never follow a supplied absolute URL.
  const dest = raw.startsWith("/pristine") ? raw : "/pristine";
  redirect(dest);
}
