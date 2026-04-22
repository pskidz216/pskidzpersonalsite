import type { DetectedChange } from "@/types/linkedin";

export interface NotificationPayload {
  readonly title: string;
  readonly summary: string;
  readonly changes: readonly ChangeDetail[];
  readonly timestamp: string;
  readonly profileUrl: string;
}

export interface ChangeDetail {
  readonly category: string;
  readonly type: string;
  readonly description: string;
}

export function buildNotificationPayload(
  changes: readonly DetectedChange[],
  profileUrl: string
): NotificationPayload {
  const changeDetails: ChangeDetail[] = changes.map((c) => ({
    category: c.category,
    type: c.type,
    description: c.description,
  }));

  const categoryCounts = changes.reduce<Record<string, number>>((acc, c) => {
    return { ...acc, [c.category]: (acc[c.category] ?? 0) + 1 };
  }, {});

  const summaryParts = Object.entries(categoryCounts).map(
    ([cat, count]) => `${count} ${cat} change${count > 1 ? "s" : ""}`
  );

  return {
    title: `LinkedIn Sync: ${changes.length} change${changes.length === 1 ? " needs" : "s need"} review`,
    summary:
      summaryParts.length > 0 ? summaryParts.join(", ") : "No changes detected",
    changes: changeDetails,
    timestamp: new Date().toISOString(),
    profileUrl,
  };
}

/**
 * Stub for future Notion integration.
 * When wired, this will POST to the Notion API to create a database entry.
 */
export async function sendNotification(
  payload: NotificationPayload
): Promise<{ readonly success: boolean; readonly error?: string }> {
  // TODO: Wire to Notion API
  // For now, log the payload for debugging
  console.log("[LinkedIn Sync] Notification payload:", JSON.stringify(payload, null, 2));
  return { success: true };
}
