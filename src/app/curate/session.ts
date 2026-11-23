import { cookies } from "next/headers";
import { ACCESS_COOKIE, accessToken, configuredPassword, tokenGrantsAccess } from "./access";

/** True when this visitor already unlocked /curate with the current password. */
export async function hasCurateAccess(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ACCESS_COOKIE.name)?.value;
  return tokenGrantsAccess(token, configuredPassword());
}

export async function grantCurateAccess(password: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: ACCESS_COOKIE.name,
    value: accessToken(password),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: ACCESS_COOKIE.path,
    maxAge: ACCESS_COOKIE.maxAgeSeconds,
  });
}
