import { describe, it, expect } from "vitest";
import {
  ACCESS_COOKIE,
  ACCESS_ENV_VAR,
  accessToken,
  configuredPassword,
  passwordMatches,
  tokenGrantsAccess,
} from "@/app/curate/access";

// A stand-in password. The real one lives only in Vercel; this repo is public.
const PASSWORD = "test-pass-123!";

describe("curate access: configured password", () => {
  it("reads the password from CURATE_ACCESS_PASSWORD", () => {
    expect(ACCESS_ENV_VAR).toBe("CURATE_ACCESS_PASSWORD");
    expect(configuredPassword({ CURATE_ACCESS_PASSWORD: PASSWORD })).toBe(PASSWORD);
  });

  it("has no fallback: unset or blank means the page stays locked", () => {
    expect(configuredPassword({})).toBeNull();
    expect(configuredPassword({ CURATE_ACCESS_PASSWORD: "" })).toBeNull();
    expect(configuredPassword({ CURATE_ACCESS_PASSWORD: "   " })).toBeNull();
  });
});

describe("curate access: password check", () => {
  it("accepts the exact password", () => {
    expect(passwordMatches(PASSWORD, PASSWORD)).toBe(true);
  });

  it("rejects a wrong, shorter, longer or differently cased password", () => {
    expect(passwordMatches("nope", PASSWORD)).toBe(false);
    expect(passwordMatches(PASSWORD.slice(0, -1), PASSWORD)).toBe(false);
    expect(passwordMatches(`${PASSWORD}x`, PASSWORD)).toBe(false);
    expect(passwordMatches(PASSWORD.toUpperCase(), PASSWORD)).toBe(false);
    expect(passwordMatches("", PASSWORD)).toBe(false);
  });

  it("rejects everything when no password is configured", () => {
    expect(passwordMatches(PASSWORD, null)).toBe(false);
    expect(passwordMatches("", null)).toBe(false);
  });
});

describe("curate access: cookie token", () => {
  it("is a 64-character hex token that never contains the password", () => {
    const token = accessToken(PASSWORD);
    expect(token).toMatch(/^[0-9a-f]{64}$/);
    expect(token).not.toContain(PASSWORD);
    expect(accessToken(PASSWORD)).toBe(token);
    expect(accessToken("another-password")).not.toBe(token);
  });

  it("grants access only for the token minted from the configured password", () => {
    expect(tokenGrantsAccess(accessToken(PASSWORD), PASSWORD)).toBe(true);
    expect(tokenGrantsAccess(accessToken("old-password"), PASSWORD)).toBe(false);
    const token = accessToken(PASSWORD);
    const tampered = `${token.slice(0, -1)}${token.endsWith("0") ? "1" : "0"}`;
    expect(tokenGrantsAccess(tampered, PASSWORD)).toBe(false);
    expect(tokenGrantsAccess("", PASSWORD)).toBe(false);
    expect(tokenGrantsAccess(undefined, PASSWORD)).toBe(false);
  });

  it("grants nothing when no password is configured", () => {
    expect(tokenGrantsAccess(accessToken(PASSWORD), null)).toBe(false);
  });

  it("scopes the cookie to /curate and keeps it for 30 days", () => {
    expect(ACCESS_COOKIE.name).toBe("curate_access");
    expect(ACCESS_COOKIE.path).toBe("/curate");
    expect(ACCESS_COOKIE.maxAgeSeconds).toBe(60 * 60 * 24 * 30);
  });
});
