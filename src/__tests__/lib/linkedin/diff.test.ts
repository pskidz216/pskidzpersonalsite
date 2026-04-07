import { describe, it, expect, beforeEach } from "vitest";
import { detectChanges, resetChangeCounter } from "@/lib/linkedin/diff";
import type { LinkedInSnapshotData } from "@/types/linkedin";

function makeSnapshot(
  overrides: Partial<LinkedInSnapshotData> = {}
): LinkedInSnapshotData {
  return {
    certifications: [],
    experiences: [],
    skills: [],
    capturedAt: new Date().toISOString(),
    ...overrides,
  };
}

beforeEach(() => {
  resetChangeCounter();
});

describe("detectChanges", () => {
  it("returns empty array for first snapshot (no previous)", () => {
    const current = makeSnapshot({
      certifications: [{ name: "Cert", issuer: "Issuer", date: "2024" }],
    });
    const changes = detectChanges(null, current);
    expect(changes).toHaveLength(0);
  });

  it("detects added certification", () => {
    const previous = makeSnapshot({ certifications: [] });
    const current = makeSnapshot({
      certifications: [{ name: "New Cert", issuer: "Google", date: "Mar 2024" }],
    });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("added");
    expect(changes[0].category).toBe("certification");
    expect(changes[0].classification).toBe("auto");
  });

  it("detects removed certification", () => {
    const previous = makeSnapshot({
      certifications: [{ name: "Old Cert", issuer: "Issuer", date: "2023" }],
    });
    const current = makeSnapshot({ certifications: [] });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("removed");
    expect(changes[0].category).toBe("certification");
    expect(changes[0].classification).toBe("review");
  });

  it("detects added experience", () => {
    const previous = makeSnapshot({ experiences: [] });
    const current = makeSnapshot({
      experiences: [
        {
          id: "acme",
          company: "Acme",
          role: "Dev",
          dateRange: "2024 — Present",
          description: "Building",
        },
      ],
    });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("added");
    expect(changes[0].category).toBe("experience");
    expect(changes[0].classification).toBe("review");
  });

  it("detects modified experience (date range change)", () => {
    const previous = makeSnapshot({
      experiences: [
        {
          id: "acme",
          company: "Acme",
          role: "Dev",
          dateRange: "2024 — Present",
          description: "Building",
        },
      ],
    });
    const current = makeSnapshot({
      experiences: [
        {
          id: "acme",
          company: "Acme",
          role: "Dev",
          dateRange: "2024 — 2025",
          description: "Building",
        },
      ],
    });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("modified");
    expect(changes[0].category).toBe("experience");
  });

  it("detects removed experience", () => {
    const previous = makeSnapshot({
      experiences: [
        {
          id: "old",
          company: "OldCo",
          role: "Manager",
          dateRange: "2020 — 2022",
          description: "Managed",
        },
      ],
    });
    const current = makeSnapshot({ experiences: [] });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("removed");
  });

  it("detects added and removed skills", () => {
    const previous = makeSnapshot({ skills: ["Sales", "Marketing"] });
    const current = makeSnapshot({ skills: ["Sales", "AI"] });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(2);
    const added = changes.find((c) => c.type === "added");
    const removed = changes.find((c) => c.type === "removed");
    expect(added?.description).toContain("AI");
    expect(removed?.description).toContain("Marketing");
  });

  it("detects headline change", () => {
    const previous = makeSnapshot({ headline: "Old headline" });
    const current = makeSnapshot({ headline: "New headline" });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("modified");
    expect(changes[0].category).toBe("headline");
    expect(changes[0].classification).toBe("review");
  });

  it("detects summary added", () => {
    const previous = makeSnapshot({ summary: undefined });
    const current = makeSnapshot({ summary: "New summary" });
    const changes = detectChanges(previous, current);
    expect(changes).toHaveLength(1);
    expect(changes[0].type).toBe("added");
    expect(changes[0].category).toBe("summary");
  });

  it("returns empty when nothing changed", () => {
    const snapshot = makeSnapshot({
      certifications: [{ name: "Cert", issuer: "I", date: "2024" }],
      skills: ["A"],
    });
    const changes = detectChanges(snapshot, snapshot);
    expect(changes).toHaveLength(0);
  });

  it("produces unique IDs for each change", () => {
    const previous = makeSnapshot({ skills: [] });
    const current = makeSnapshot({ skills: ["A", "B", "C"] });
    const changes = detectChanges(previous, current);
    const ids = changes.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
