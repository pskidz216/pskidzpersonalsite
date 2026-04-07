import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock all dependencies
vi.mock("@/lib/linkedin/fetcher", () => ({
  fetchLinkedInProfile: vi.fn(),
}));
vi.mock("@/lib/linkedin/parser", () => ({
  parseProfile: vi.fn(),
}));
vi.mock("@/lib/linkedin/diff", () => ({
  detectChanges: vi.fn(),
}));
vi.mock("@/lib/linkedin/content-updater", () => ({
  applyAutoChanges: vi.fn(),
  initializeDataFiles: vi.fn(),
}));
vi.mock("@/lib/linkedin/notifier", () => ({
  buildNotificationPayload: vi.fn(),
  sendNotification: vi.fn(),
}));

import { runLinkedInSyncPipeline } from "@/lib/linkedin/pipeline";
import { fetchLinkedInProfile } from "@/lib/linkedin/fetcher";
import { parseProfile } from "@/lib/linkedin/parser";
import { detectChanges } from "@/lib/linkedin/diff";
import { applyAutoChanges, initializeDataFiles } from "@/lib/linkedin/content-updater";
import { buildNotificationPayload, sendNotification } from "@/lib/linkedin/notifier";
import type { LinkedInSnapshotData } from "@/types/linkedin";

const mockFetch = vi.mocked(fetchLinkedInProfile);
const mockParse = vi.mocked(parseProfile);
const mockDetect = vi.mocked(detectChanges);
const mockApply = vi.mocked(applyAutoChanges);
const mockInit = vi.mocked(initializeDataFiles);
const mockBuildNotif = vi.mocked(buildNotificationPayload);
const mockSendNotif = vi.mocked(sendNotification);

const baseConfig = {
  apiKey: "test-key",
  profileUrl: "https://www.linkedin.com/in/paul-skidmore/",
  previousSnapshot: null as LinkedInSnapshotData | null,
};

const mockSnapshot: LinkedInSnapshotData = {
  certifications: [],
  experiences: [],
  skills: [],
  capturedAt: new Date().toISOString(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("runLinkedInSyncPipeline", () => {
  it("returns error when fetch fails", async () => {
    mockFetch.mockResolvedValue({ success: false, error: "API down" });
    const result = await runLinkedInSyncPipeline(baseConfig);
    expect(result.success).toBe(false);
    expect(result.error).toContain("API down");
  });

  it("initializes data files on first run (no previous snapshot)", async () => {
    mockFetch.mockResolvedValue({
      success: true,
      data: { certifications: [], experiences: [], skills: [] },
    });
    mockParse.mockReturnValue(mockSnapshot);
    mockInit.mockResolvedValue(undefined);

    const result = await runLinkedInSyncPipeline(baseConfig);
    expect(result.success).toBe(true);
    expect(result.changesDetected).toBe(0);
    expect(mockInit).toHaveBeenCalledWith(mockSnapshot);
  });

  it("detects and applies changes on subsequent runs", async () => {
    const previousSnapshot = { ...mockSnapshot, capturedAt: "2024-01-01" };
    mockFetch.mockResolvedValue({
      success: true,
      data: { certifications: [], experiences: [], skills: [] },
    });
    mockParse.mockReturnValue(mockSnapshot);
    mockDetect.mockReturnValue([
      {
        id: "1",
        type: "added",
        category: "certification",
        classification: "auto",
        description: "New cert",
      },
    ]);
    mockApply.mockResolvedValue({
      applied: [
        {
          id: "1",
          type: "added",
          category: "certification",
          classification: "auto",
          description: "New cert",
        },
      ],
      pendingReview: [],
      errors: [],
    });

    const result = await runLinkedInSyncPipeline({
      ...baseConfig,
      previousSnapshot,
    });
    expect(result.success).toBe(true);
    expect(result.changesDetected).toBe(1);
    expect(result.autoApplied).toBe(1);
    expect(result.pendingReview).toBe(0);
  });

  it("sends notification when review changes exist", async () => {
    const previousSnapshot = { ...mockSnapshot, capturedAt: "2024-01-01" };
    mockFetch.mockResolvedValue({
      success: true,
      data: { certifications: [], experiences: [], skills: [] },
    });
    mockParse.mockReturnValue(mockSnapshot);
    mockDetect.mockReturnValue([
      {
        id: "1",
        type: "added",
        category: "experience",
        classification: "review",
        description: "New role",
      },
    ]);
    mockApply.mockResolvedValue({
      applied: [],
      pendingReview: [
        {
          id: "1",
          type: "added",
          category: "experience",
          classification: "review",
          description: "New role",
        },
      ],
      errors: [],
    });
    mockBuildNotif.mockReturnValue({
      title: "Test",
      summary: "Test",
      changes: [],
      timestamp: new Date().toISOString(),
      profileUrl: baseConfig.profileUrl,
    });
    mockSendNotif.mockResolvedValue({ success: true });

    const result = await runLinkedInSyncPipeline({
      ...baseConfig,
      previousSnapshot,
    });
    expect(result.pendingReview).toBe(1);
    expect(mockSendNotif).toHaveBeenCalled();
  });

  it("reports errors from content updater", async () => {
    const previousSnapshot = { ...mockSnapshot, capturedAt: "2024-01-01" };
    mockFetch.mockResolvedValue({
      success: true,
      data: { certifications: [], experiences: [], skills: [] },
    });
    mockParse.mockReturnValue(mockSnapshot);
    mockDetect.mockReturnValue([]);
    mockApply.mockResolvedValue({
      applied: [],
      pendingReview: [],
      errors: ["Write failed"],
    });

    const result = await runLinkedInSyncPipeline({
      ...baseConfig,
      previousSnapshot,
    });
    expect(result.success).toBe(false);
    expect(result.error).toContain("Write failed");
  });
});
