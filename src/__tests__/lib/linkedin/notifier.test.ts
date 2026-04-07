import { describe, it, expect } from "vitest";
import { buildNotificationPayload } from "@/lib/linkedin/notifier";
import type { DetectedChange } from "@/types/linkedin";

describe("buildNotificationPayload", () => {
  const profileUrl = "https://www.linkedin.com/in/paul-skidmore/";

  it("builds payload with correct title for single change", () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "experience",
        classification: "review",
        description: "New role: VP at Acme",
      },
    ];
    const payload = buildNotificationPayload(changes, profileUrl);
    expect(payload.title).toBe("LinkedIn Sync: 1 change needs review");
    expect(payload.changes).toHaveLength(1);
    expect(payload.profileUrl).toBe(profileUrl);
  });

  it("builds payload with correct title for multiple changes", () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "experience",
        classification: "review",
        description: "New role",
      },
      {
        id: "2",
        type: "modified",
        category: "headline",
        classification: "review",
        description: "Headline changed",
      },
    ];
    const payload = buildNotificationPayload(changes, profileUrl);
    expect(payload.title).toBe("LinkedIn Sync: 2 changes need review");
  });

  it("builds summary with category counts", () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "experience",
        classification: "review",
        description: "Role 1",
      },
      {
        id: "2",
        type: "added",
        category: "experience",
        classification: "review",
        description: "Role 2",
      },
      {
        id: "3",
        type: "modified",
        category: "headline",
        classification: "review",
        description: "Headline",
      },
    ];
    const payload = buildNotificationPayload(changes, profileUrl);
    expect(payload.summary).toContain("2 experience changes");
    expect(payload.summary).toContain("1 headline change");
  });

  it("handles empty changes array", () => {
    const payload = buildNotificationPayload([], profileUrl);
    expect(payload.summary).toBe("No changes detected");
    expect(payload.changes).toHaveLength(0);
  });

  it("includes timestamp", () => {
    const payload = buildNotificationPayload([], profileUrl);
    expect(payload.timestamp).toBeDefined();
    expect(new Date(payload.timestamp).getTime()).not.toBeNaN();
  });
});
