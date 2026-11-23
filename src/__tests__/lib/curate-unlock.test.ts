import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

type CookieWrite = { name: string; value: string; [key: string]: unknown };

const cookieWrites: CookieWrite[] = [];
const cookieJar = new Map<string, string>();
const redirects: string[] = [];

vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (cookieJar.has(name) ? { name, value: cookieJar.get(name) } : undefined),
    set: (options: CookieWrite) => {
      cookieWrites.push(options);
    },
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: (path: string) => {
    redirects.push(path);
  },
}));

import { unlockCurate } from "@/app/curate/actions";
import { hasCurateAccess } from "@/app/curate/session";
import { accessToken } from "@/app/curate/access";

const PASSWORD = "test-pass-123!";

const form = (password?: string) => {
  const data = new FormData();
  if (password !== undefined) data.set("password", password);
  return data;
};

describe("unlockCurate", () => {
  beforeEach(() => {
    cookieWrites.length = 0;
    redirects.length = 0;
    vi.stubEnv("CURATE_ACCESS_PASSWORD", PASSWORD);
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("asks for a password when the field is empty or missing", async () => {
    expect(await unlockCurate({}, form(""))).toEqual({ error: "Enter the password." });
    expect(await unlockCurate({}, form())).toEqual({ error: "Enter the password." });
    expect(cookieWrites).toHaveLength(0);
    expect(redirects).toHaveLength(0);
  });

  it("refuses a wrong password and sets no cookie", async () => {
    expect(await unlockCurate({}, form("wrong"))).toEqual({ error: "That password isn't right." });
    expect(cookieWrites).toHaveLength(0);
    expect(redirects).toHaveLength(0);
  });

  it("sets a locked-down cookie and returns to the plan on the right password", async () => {
    await unlockCurate({}, form(PASSWORD));
    expect(cookieWrites).toHaveLength(1);
    expect(cookieWrites[0]).toMatchObject({
      name: "curate_access",
      value: accessToken(PASSWORD),
      httpOnly: true,
      sameSite: "lax",
      path: "/curate",
      maxAge: 60 * 60 * 24 * 30,
    });
    expect(redirects).toEqual(["/curate"]);
  });

  it("stays locked and logs the cause when the password isn't configured", async () => {
    vi.stubEnv("CURATE_ACCESS_PASSWORD", "");
    expect(await unlockCurate({}, form(PASSWORD))).toEqual({
      error: "This page isn't open yet. Ask Paul for access.",
    });
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining("CURATE_ACCESS_PASSWORD"));
    expect(cookieWrites).toHaveLength(0);
  });
});

describe("hasCurateAccess", () => {
  beforeEach(() => {
    cookieJar.clear();
    vi.stubEnv("CURATE_ACCESS_PASSWORD", PASSWORD);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("is false with no cookie", async () => {
    expect(await hasCurateAccess()).toBe(false);
  });

  it("is true with the cookie minted from the current password", async () => {
    cookieJar.set("curate_access", accessToken(PASSWORD));
    expect(await hasCurateAccess()).toBe(true);
  });

  it("is false once the password changes", async () => {
    cookieJar.set("curate_access", accessToken("old-password"));
    expect(await hasCurateAccess()).toBe(false);
  });
});
