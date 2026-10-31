import { describe, it, expect } from "vitest";
import { boldxCaseStudy } from "@/app/work/boldx/content";
import { projects, navLinks } from "@/lib/data";

const everything = JSON.stringify(boldxCaseStudy);

describe("BoldX case study content", () => {
  it("says the thesis in the first sentence", () => {
    expect(boldxCaseStudy.hero.h1).toBe("I built the BoldX brand.");
  });

  it("never discloses BoldX revenue, customers by name, or plan targets", () => {
    // BoldX's revenue by year and the plan's targets; the $11.6M quoted figure is Paul's own pipeline output and stays.
    expect(everything).not.toMatch(/\$1[789](\.\d)?M|\$25M|\$40M|\$50M|\$40–50M|17,7|17,0|18,8/);
    expect(everything).not.toMatch(
      /\b(ITT|Eaton|Trimble|L3 ?Harris|Cummins|Esterline|Clippard|Honeywell|Parker|Safran|Williams International)\b/
    );
    expect(everything).not.toMatch(/Partsbase|DIBBS/i);
  });

  it("spells the brand BoldX and keeps BoldX Enterprises off the page", () => {
    expect(everything).not.toMatch(/BOLDx/);
    expect(everything).not.toMatch(/BoldX Enterprises|BXE/);
  });

  it("never mentions Power of Àṣẹ", () => {
    expect(everything).not.toMatch(/Power of|Àṣẹ|Ase\b/);
  });

  it("dates every ledger entry and states the end of the role once", () => {
    for (const group of boldxCaseStudy.ledger) {
      for (const entry of group.entries) {
        expect(entry.when).toMatch(/20\d\d/);
      }
    }
    expect(boldxCaseStudy.closing.ended).toMatch(/October 2026/);
  });

  it("is linked from Builds and credits the ladder site to BoldX", () => {
    const brand = projects.find((p) => p.name === "BoldX Industries");
    expect(brand?.href).toBe("/work/boldx");
    const ladder = projects.find((p) => p.name === "American Labor Ladders");
    expect(ladder?.description).toMatch(/BoldX/);
    expect(ladder?.href).toMatch(/americanlaborladders\.com/);
    expect(navLinks.some((l) => l.href === "/work/boldx")).toBe(true);
  });
});
