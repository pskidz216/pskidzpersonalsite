import { describe, it, expect } from "vitest";
import { curatePlan } from "@/app/curate/content";

const everything = JSON.stringify(curatePlan);
const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

describe("Curate sales plan content", () => {
  it("states the thesis in the headline", () => {
    expect(curatePlan.hero.h1).toBe("How I'd run sales at Curate.");
  });

  it("never shows Curate's internal numbers from the interview", () => {
    // Conversion and outbound-share figures Curate shared privately stay off this public page.
    expect(everything).not.toMatch(/\b(6|10|26|40)\s?%/);
    expect(everything).not.toMatch(/\b2\s?(→|->|to)\s?6\b/);
  });

  it("never mentions the private call companion", () => {
    expect(everything).not.toMatch(/companion/i);
  });

  it("links the live deck and the Sales OS", () => {
    const hrefs = curatePlan.built.items.map((item) => item.href);
    expect(hrefs).toEqual([
      "https://claude.ai/artifact/Tk7Ue6VgFe1F2qh9NSbS7B",
      "https://claude.ai/artifact/Lam1wuM5fBsms9NQAhj24g",
    ]);
    for (const item of curatePlan.built.items) {
      expect(item.image.src).toMatch(/^\/work\/curate\/.+\.webp$/);
      expect(item.image.alt.length).toBeGreaterThan(20);
    }
  });

  it("gives each of the three goals moves and a measure", () => {
    expect(curatePlan.goals).toHaveLength(3);
    for (const goal of curatePlan.goals) {
      const allMoves = [...goal.moves, ...(goal.movesAfter ?? [])];
      expect(allMoves.length).toBeGreaterThanOrEqual(3);
      expect(goal.measure.length).toBeGreaterThan(10);
    }
  });

  it("runs the outbound engine in eight steps with a person on Tier 1", () => {
    expect(curatePlan.engine.steps).toHaveLength(8);
    const lanes = curatePlan.engine.sample.rows.map((row) => row.lane);
    expect(lanes).toContain("Human sends");
  });

  it("keeps every sample first email under 65 words and labels it as sample data", () => {
    expect(curatePlan.engine.sample.label).toMatch(/sample/i);
    for (const row of curatePlan.engine.sample.rows) {
      if (row.draft) expect(words(row.draft)).toBeLessThan(65);
    }
  });

  it("spells the company Curate and uses no em dashes", () => {
    expect(everything).not.toMatch(/Cúrate/);
    expect(everything).not.toMatch(/—/);
  });
});
