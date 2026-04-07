import { NextResponse } from "next/server";
import { runLinkedInSyncPipeline } from "@/lib/linkedin/pipeline";

const EXPECTED_AUTH_HEADER = "Bearer";

function getEnvOrNull(key: string): string | null {
  return process.env[key] ?? null;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Basic auth check — require a bearer token matching the API key
    const authHeader = request.headers.get("authorization");
    const apiKey = getEnvOrNull("PROXYCURL_API_KEY");

    if (!apiKey) {
      return NextResponse.json(
        { error: "Server misconfiguration: PROXYCURL_API_KEY not set" },
        { status: 500 }
      );
    }

    // Simple shared-secret auth for the sync endpoint
    const syncSecret = getEnvOrNull("LINKEDIN_SYNC_SECRET");
    if (syncSecret) {
      if (
        !authHeader ||
        authHeader !== `${EXPECTED_AUTH_HEADER} ${syncSecret}`
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const profileUrl =
      getEnvOrNull("LINKEDIN_PROFILE_URL") ??
      "https://www.linkedin.com/in/paul-skidmore/";

    // TODO: In production, fetch the previous snapshot from Supabase.
    // For now, we pass null (first-run behavior) or parse from request body.
    let previousSnapshot = null;
    try {
      const body = await request.json();
      if (body?.previousSnapshot) {
        previousSnapshot = body.previousSnapshot;
      }
    } catch {
      // No body or invalid JSON — that's fine, treat as first run
    }

    const result = await runLinkedInSyncPipeline({
      apiKey,
      profileUrl,
      previousSnapshot,
    });

    const status = result.success ? 200 : 500;
    return NextResponse.json(result, { status });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { error: message, success: false },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    endpoint: "/api/linkedin-sync",
    method: "POST",
    description:
      "Triggers a LinkedIn profile sync. Send POST with optional { previousSnapshot } in body.",
    status: "ready",
  });
}
