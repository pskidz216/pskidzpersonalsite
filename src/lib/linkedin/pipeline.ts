import type {
  LinkedInSnapshotData,
  DetectedChange,
  PipelineResult,
} from "@/types/linkedin";
import { fetchLinkedInProfile } from "./fetcher";
import { parseProfile } from "./parser";
import { detectChanges } from "./diff";
import { partitionChanges } from "./classifier";
import { applyAutoChanges, initializeDataFiles } from "./content-updater";
import { buildNotificationPayload, sendNotification } from "./notifier";

export interface PipelineConfig {
  readonly apiKey: string;
  readonly profileUrl: string;
  readonly previousSnapshot: LinkedInSnapshotData | null;
}

export async function runLinkedInSyncPipeline(
  config: PipelineConfig
): Promise<PipelineResult> {
  const { apiKey, profileUrl, previousSnapshot } = config;

  // Step 1: Fetch from Proxycurl
  const fetchResult = await fetchLinkedInProfile({ apiKey, profileUrl });
  if (!fetchResult.success || !fetchResult.data) {
    return {
      success: false,
      changesDetected: 0,
      autoApplied: 0,
      pendingReview: 0,
      error: fetchResult.error ?? "Failed to fetch LinkedIn profile",
    };
  }

  // Step 2: Parse into structured snapshot
  const snapshot = parseProfile(fetchResult.data);

  // Step 3: Detect changes
  const changes = detectChanges(previousSnapshot, snapshot);

  // Step 4: If first snapshot, initialize data files
  if (!previousSnapshot) {
    await initializeDataFiles(snapshot);
    return {
      success: true,
      changesDetected: 0,
      autoApplied: 0,
      pendingReview: 0,
    };
  }

  // Step 5: Apply auto changes, queue review changes
  const updateResult = await applyAutoChanges(snapshot, changes);

  // Step 6: Notify about review changes
  if (updateResult.pendingReview.length > 0) {
    const payload = buildNotificationPayload(
      updateResult.pendingReview,
      profileUrl
    );
    await sendNotification(payload);
  }

  const { auto, review } = partitionChanges(changes);

  return {
    success: updateResult.errors.length === 0,
    changesDetected: changes.length,
    autoApplied: auto.length,
    pendingReview: review.length,
    error:
      updateResult.errors.length > 0
        ? updateResult.errors.join("; ")
        : undefined,
  };
}
