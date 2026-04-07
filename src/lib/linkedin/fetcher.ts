import { ProxycurlProfile, ProxycurlProfileSchema } from "@/types/linkedin";

export interface FetcherConfig {
  apiKey: string;
  profileUrl: string;
  baseUrl?: string;
}

export interface FetcherResult {
  readonly success: boolean;
  readonly data?: ProxycurlProfile;
  readonly error?: string;
}

const PROXYCURL_BASE_URL = "https://nubela.co/proxycurl/api/v2/linkedin";

export async function fetchLinkedInProfile(
  config: FetcherConfig
): Promise<FetcherResult> {
  const { apiKey, profileUrl, baseUrl = PROXYCURL_BASE_URL } = config;

  if (!apiKey) {
    return { success: false, error: "PROXYCURL_API_KEY is not configured" };
  }

  if (!profileUrl) {
    return { success: false, error: "LinkedIn profile URL is required" };
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("url", profileUrl);
    url.searchParams.set("use_cache", "if-recent");
    url.searchParams.set("skills", "include");
    url.searchParams.set("certifications", "include");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 401) {
        return { success: false, error: "Invalid Proxycurl API key" };
      }
      if (status === 404) {
        return { success: false, error: "LinkedIn profile not found" };
      }
      if (status === 429) {
        return { success: false, error: "Proxycurl rate limit exceeded" };
      }
      return {
        success: false,
        error: `Proxycurl API error: ${status} ${response.statusText}`,
      };
    }

    const rawData = await response.json();
    const parsed = ProxycurlProfileSchema.safeParse(rawData);

    if (!parsed.success) {
      return {
        success: false,
        error: `Failed to parse Proxycurl response: ${parsed.error.message}`,
      };
    }

    return { success: true, data: parsed.data };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return { success: false, error: `Fetch failed: ${message}` };
  }
}
