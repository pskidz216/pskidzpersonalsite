import { describe, it, expect, vi, beforeEach } from "vitest";
import type { DetectedChange, LinkedInSnapshotData } from "@/types/linkedin";

// Mock fs/promises
vi.mock("fs/promises", () => ({
  readFile: vi.fn(),
  writeFile: vi.fn(),
}));

import { readFile, writeFile } from "fs/promises";
import { applyAutoChanges, initializeDataFiles } from "@/lib/linkedin/content-updater";

const mockReadFile = vi.mocked(readFile);
const mockWriteFile = vi.mocked(writeFile);

beforeEach(() => {
  mockReadFile.mockReset();
  mockWriteFile.mockReset();
  mockWriteFile.mockResolvedValue(undefined);
});

describe("applyAutoChanges", () => {
  const snapshot: LinkedInSnapshotData = {
    certifications: [],
    experiences: [],
    skills: [],
    capturedAt: new Date().toISOString(),
  };

  it("returns empty applied when no auto changes", async () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "experience",
        classification: "review",
        description: "New role",
        newValue: { id: "acme", company: "Acme", role: "Dev", dateRange: "2024", description: "" },
      },
    ];
    const result = await applyAutoChanges(snapshot, changes);
    expect(result.applied).toHaveLength(0);
    expect(result.pendingReview).toHaveLength(1);
  });

  it("applies auto certification additions", async () => {
    mockReadFile.mockResolvedValue("[]");
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "certification",
        classification: "auto",
        description: "New cert",
        newValue: { name: "New Cert", issuer: "Google", date: "2024" },
      },
    ];
    const result = await applyAutoChanges(snapshot, changes);
    expect(result.applied).toHaveLength(1);
    expect(mockWriteFile).toHaveBeenCalled();
  });

  it("does not duplicate existing certifications", async () => {
    mockReadFile.mockResolvedValue(
      JSON.stringify([{ name: "Existing", issuer: "Google", date: "2024" }])
    );
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "certification",
        classification: "auto",
        description: "Cert",
        newValue: { name: "Existing", issuer: "Google", date: "2024" },
      },
    ];
    const result = await applyAutoChanges(snapshot, changes);
    // The write should still happen, but the array should not have duplicates
    expect(result.applied).toHaveLength(1);
    const writtenData = JSON.parse(
      (mockWriteFile.mock.calls[0]?.[1] as string) ?? "[]"
    );
    expect(writtenData).toHaveLength(1);
  });

  it("handles file read errors gracefully", async () => {
    mockReadFile.mockRejectedValue(new Error("ENOENT"));
    mockWriteFile.mockResolvedValue(undefined);
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "certification",
        classification: "auto",
        description: "Cert",
        newValue: { name: "Cert", issuer: "I", date: "2024" },
      },
    ];
    // readFile throws, but readJsonFile catches it and uses fallback
    const result = await applyAutoChanges(snapshot, changes);
    expect(result.errors).toHaveLength(0);
  });
});

describe("initializeDataFiles", () => {
  it("writes certifications and experience files", async () => {
    mockWriteFile.mockResolvedValue(undefined);
    const snapshot: LinkedInSnapshotData = {
      certifications: [{ name: "Cert", issuer: "Issuer", date: "2024" }],
      experiences: [
        { id: "co", company: "Co", role: "Dev", dateRange: "2024", description: "" },
      ],
      skills: [],
      capturedAt: new Date().toISOString(),
    };
    await initializeDataFiles(snapshot);
    expect(mockWriteFile).toHaveBeenCalledTimes(2);
  });
});
