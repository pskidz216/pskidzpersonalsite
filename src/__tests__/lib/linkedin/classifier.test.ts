import { describe, it, expect } from "vitest";
import { classifyChange, partitionChanges } from "@/lib/linkedin/classifier";
import type { DetectedChange } from "@/types/linkedin";

describe("classifyChange", () => {
  it("auto-classifies new certifications", () => {
    expect(classifyChange("certification", "added")).toBe("auto");
  });

  it("review-classifies removed certifications", () => {
    expect(classifyChange("certification", "removed")).toBe("review");
  });

  it("review-classifies all experience changes", () => {
    expect(classifyChange("experience", "added")).toBe("review");
    expect(classifyChange("experience", "removed")).toBe("review");
    expect(classifyChange("experience", "modified")).toBe("review");
  });

  it("auto-classifies new skills", () => {
    expect(classifyChange("skill", "added")).toBe("auto");
  });

  it("review-classifies removed skills", () => {
    expect(classifyChange("skill", "removed")).toBe("review");
  });

  it("review-classifies headline and summary changes", () => {
    expect(classifyChange("headline", "modified")).toBe("review");
    expect(classifyChange("summary", "added")).toBe("review");
  });
});

describe("partitionChanges", () => {
  it("partitions changes into auto and review", () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "certification",
        classification: "auto",
        description: "New cert",
      },
      {
        id: "2",
        type: "added",
        category: "experience",
        classification: "review",
        description: "New role",
      },
      {
        id: "3",
        type: "added",
        category: "skill",
        classification: "auto",
        description: "New skill",
      },
    ];
    const { auto, review } = partitionChanges(changes);
    expect(auto).toHaveLength(2);
    expect(review).toHaveLength(1);
  });

  it("handles empty array", () => {
    const { auto, review } = partitionChanges([]);
    expect(auto).toHaveLength(0);
    expect(review).toHaveLength(0);
  });

  it("handles all auto", () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "added",
        category: "certification",
        classification: "auto",
        description: "Cert",
      },
    ];
    const { auto, review } = partitionChanges(changes);
    expect(auto).toHaveLength(1);
    expect(review).toHaveLength(0);
  });

  it("handles all review", () => {
    const changes: DetectedChange[] = [
      {
        id: "1",
        type: "removed",
        category: "experience",
        classification: "review",
        description: "Old role",
      },
    ];
    const { auto, review } = partitionChanges(changes);
    expect(auto).toHaveLength(0);
    expect(review).toHaveLength(1);
  });
});
