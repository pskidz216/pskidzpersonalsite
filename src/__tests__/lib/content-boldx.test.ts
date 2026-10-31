import { describe, it, expect } from "vitest";
import { careerEntries, skillBlocks } from "@/lib/data";
import experience from "@/data/experience.json";
import { auditContent } from "@/app/audit/content";

describe("BoldX chapter is closed and credited as a brand build", () => {
  const boldx = careerEntries.find((entry) => entry.id === "boldx");

  it("has an end year, not Present, in both data sources", () => {
    expect(boldx?.dateRange).toBe("2025 — 2026");
    expect(experience.find((entry) => entry.id === "boldx")?.dateRange).toBe(
      "2025 — 2026"
    );
  });

  it("leads with the brand build", () => {
    expect(boldx?.description).toMatch(/brand/i);
    expect(boldx?.tags).toContain("Brand Build");
  });

  it("does not carry BoldX's revenue target as a personal metric", () => {
    expect(boldx?.metric.label).not.toMatch(/revenue/i);
    expect(boldx?.description).not.toMatch(/\$24M/);
  });

  it("names BoldX Industries in the Brand & Creative system", () => {
    const brand = skillBlocks.find((block) => block.title === "Brand & Creative");
    expect(brand?.description).toMatch(/BoldX Industries/);
  });

  it("spells the brand BoldX and speaks of it in the past tense", () => {
    const everything = JSON.stringify({
      careerEntries,
      skillBlocks,
      experience,
      auditContent,
    });
    expect(everything).not.toMatch(/BOLDx/);
    expect(auditContent.hero.subhead).not.toMatch(/^I run /);
    expect(auditContent.hero.highlight).toBe("BoldX Industries");
  });
});
