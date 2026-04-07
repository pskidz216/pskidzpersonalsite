/**
 * Standalone LinkedIn sync script for GitHub Actions.
 * Fetches profile data via Proxycurl, detects changes, and writes updates
 * to src/data/certifications.json and src/data/experience.json.
 */

import { readFile } from "fs/promises";
import path from "path";
import { runLinkedInSyncPipeline } from "../src/lib/linkedin/pipeline";
import type { LinkedInSnapshotData } from "../src/types/linkedin";

async function loadPreviousSnapshot(): Promise<LinkedInSnapshotData | null> {
  try {
    const certsPath = path.resolve("src/data/certifications.json");
    const expPath = path.resolve("src/data/experience.json");

    const [certsRaw, expRaw] = await Promise.all([
      readFile(certsPath, "utf-8"),
      readFile(expPath, "utf-8"),
    ]);

    return {
      certifications: JSON.parse(certsRaw),
      experiences: JSON.parse(expRaw),
      skills: [],
      headline: undefined,
      summary: undefined,
      capturedAt: new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function main() {
  const apiKey = process.env.PROXYCURL_API_KEY;
  if (!apiKey) {
    console.error("PROXYCURL_API_KEY is not set");
    process.exit(1);
  }

  const profileUrl =
    process.env.LINKEDIN_PROFILE_URL ??
    "https://www.linkedin.com/in/paul-skidmore/";

  const previousSnapshot = await loadPreviousSnapshot();

  console.log("Starting LinkedIn sync...");
  console.log(`Profile: ${profileUrl}`);
  console.log(`Previous snapshot: ${previousSnapshot ? "loaded" : "first run"}`);

  const result = await runLinkedInSyncPipeline({
    apiKey,
    profileUrl,
    previousSnapshot,
  });

  console.log("Sync complete:", JSON.stringify(result, null, 2));

  if (!result.success) {
    console.error("Sync failed:", result.error);
    process.exit(1);
  }

  if (result.changesDetected > 0) {
    console.log(`Changes detected: ${result.changesDetected}`);
    console.log(`Auto-applied: ${result.autoApplied}`);
    console.log(`Pending review: ${result.pendingReview}`);
  } else {
    console.log("No changes detected.");
  }
}

main();
