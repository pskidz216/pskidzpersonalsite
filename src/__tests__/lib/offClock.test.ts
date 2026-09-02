import { describe, it, expect } from "vitest";
import { OFF_CLOCK_ACTIVITIES, nextActivityIndex } from "@/lib/offClock";

describe("OFF_CLOCK_ACTIVITIES", () => {
  it("has at least one activity", () => {
    expect(OFF_CLOCK_ACTIVITIES.length).toBeGreaterThan(0);
  });

  it("has no duplicate activities", () => {
    const unique = new Set(OFF_CLOCK_ACTIVITIES);
    expect(unique.size).toBe(OFF_CLOCK_ACTIVITIES.length);
  });

  it("has no empty or whitespace-only entries", () => {
    for (const activity of OFF_CLOCK_ACTIVITIES) {
      expect(activity.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("nextActivityIndex", () => {
  it("advances to the next index", () => {
    expect(nextActivityIndex(0, 9)).toBe(1);
    expect(nextActivityIndex(3, 9)).toBe(4);
  });

  it("wraps around at the end of the list", () => {
    expect(nextActivityIndex(8, 9)).toBe(0);
  });

  it("returns 0 for an empty or single-item list", () => {
    expect(nextActivityIndex(0, 0)).toBe(0);
    expect(nextActivityIndex(0, 1)).toBe(0);
  });
});
