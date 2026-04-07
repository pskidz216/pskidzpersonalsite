import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchLinkedInProfile } from "@/lib/linkedin/fetcher";

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
});

describe("fetchLinkedInProfile", () => {
  const baseConfig = {
    apiKey: "test-key",
    profileUrl: "https://www.linkedin.com/in/paul-skidmore/",
  };

  it("returns error when apiKey is empty", async () => {
    const result = await fetchLinkedInProfile({
      apiKey: "",
      profileUrl: "https://linkedin.com/in/test",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("PROXYCURL_API_KEY");
  });

  it("returns error when profileUrl is empty", async () => {
    const result = await fetchLinkedInProfile({
      apiKey: "key",
      profileUrl: "",
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("profile URL");
  });

  it("returns parsed data on successful fetch", async () => {
    const mockResponse = {
      public_identifier: "paul-skidmore",
      full_name: "Paul Skidmore",
      headline: "VP",
      summary: null,
      certifications: [],
      experiences: [],
      skills: [],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    });

    const result = await fetchLinkedInProfile(baseConfig);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.data?.certifications).toEqual([]);
  });

  it("handles 401 unauthorized", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
    });

    const result = await fetchLinkedInProfile(baseConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("Invalid Proxycurl API key");
  });

  it("handles 404 not found", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const result = await fetchLinkedInProfile(baseConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("not found");
  });

  it("handles 429 rate limit", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
    });

    const result = await fetchLinkedInProfile(baseConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("rate limit");
  });

  it("handles network errors", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));

    const result = await fetchLinkedInProfile(baseConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("Network failure");
  });

  it("handles invalid response schema", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => "not-an-object",
    });

    const result = await fetchLinkedInProfile(baseConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("parse");
  });
});
