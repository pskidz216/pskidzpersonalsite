import { describe, it, expect } from "vitest";
import { boldxCaseStudy } from "@/app/work/boldx/content";
import { careerEntries, projects, navLinks } from "@/lib/data";
import * as data from "@/lib/data";
import { boldxFeature } from "@/app/work/boldx/feature";

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

  it("carries no dates: no when column, no month on any caption, stat, paragraph or the career entry", () => {
    const career = careerEntries.find((e) => e.id === "boldx");
    const copy = everything + JSON.stringify(boldxFeature) + JSON.stringify(career);
    expect(copy).not.toMatch(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\b/);
    expect(copy).not.toMatch(/\b(January|February|March|April|June|July|August|September|October|November|December)\b/);
    expect(copy).not.toMatch(/YTD/);
    expect(boldxCaseStudy.hero.sub).not.toMatch(/dated/);
    for (const group of boldxCaseStudy.ledger) {
      for (const entry of group.entries) expect("when" in entry).toBe(false);
    }
    for (const item of boldxCaseStudy.gallery.items) expect(item.caption).not.toMatch(/20\d\d/);
    for (const stat of boldxCaseStudy.numbers.stats) expect(stat.label).not.toMatch(/20\d\d/);
    expect(boldxCaseStudy.closing.ended).toMatch(/\$24M/);
  });

  it("opens on the rocket-and-connector hero, not the white Bible cover", () => {
    expect(boldxCaseStudy.hero.image.src).toBe("/work/boldx/brand-rocket.webp");
    expect(boldxCaseStudy.hero.image.alt).toMatch(/rocket/i);
    expect(boldxCaseStudy.hero.image.alt).toMatch(/connector/i);
  });

  it("keeps FckYourWebsite off the site", () => {
    expect(JSON.stringify(data)).not.toMatch(/fckyourwebsite|fuck/i);
  });

  it("is linked from Builds and credits the ladder site to BoldX", () => {
    const brand = projects.find((p) => p.name === "BoldX Industries");
    expect(brand?.href).toBe("/work/boldx");
    const ladder = projects.find((p) => p.name === "American Labor Ladders");
    expect(ladder?.description).toMatch(/BoldX/);
    expect(ladder?.href).toMatch(/americanlaborladders\.com/);
    expect(navLinks.some((l) => l.href === "/work/boldx")).toBe(true);
  });

  it("claims no outbound engine or SDR agent, which Paul never launched", () => {
    const career = careerEntries.find((e) => e.id === "boldx");
    const boldxBuilds = projects.filter((p) => /BoldX/.test(p.name + p.description));
    const claims = everything + JSON.stringify(career) + JSON.stringify(boldxBuilds);
    expect(claims).not.toMatch(/SDR|outbound|sales[- ]intelligence|Clay|Apollo|Instantly|Heyreach|n8n/i);
    expect(projects.some((p) => p.name === "BoldX Sales Agent")).toBe(false);
  });

  it("explains the revenue systems by the 1990s ERP and keeps the quote-expiry campaign", () => {
    const revenue = boldxCaseStudy.ledger.find((g) => g.label === "Revenue systems");
    expect(revenue?.intro).toMatch(/ERP/);
    expect(revenue?.intro).toMatch(/real time/);
    expect(revenue?.entries.some((e) => /expir/i.test(e.title + e.detail))).toBe(true);
  });

  it("says Paul ran the PBExpo booth, collateral to sales conversations", () => {
    const launches = boldxCaseStudy.ledger.find((g) => g.label === "Launches and marketing");
    const expo = launches?.entries.find((e) => e.title === "PBExpo");
    expect(expo?.detail).toMatch(/booth/i);
    expect(expo?.detail).toMatch(/collateral/i);
    expect(expo?.detail).toMatch(/sales conversations/i);
  });

  it("leaves the employee handbook, the HRIS and the org chart off the page", () => {
    expect(everything).not.toMatch(/handbook|HRIS|org chart/i);
  });

  it("keeps the Murphy handcuff, AI quoting and 'brand guidelines' off every BoldX claim", () => {
    const claims = everything + JSON.stringify(boldxFeature) + JSON.stringify(data);
    expect(claims).not.toMatch(/Murphy|handcuff|AI quoting|automated? quoting|guidelines/i);
    const lines = boldxCaseStudy.numbers.stats.find((s) => /product lines/.test(s.label));
    expect(lines?.value).toBe("2");
  });

  it("says the quote pipeline was built with AI agents to see quotes live, and the expiry emails moved customers to buy", () => {
    const revenue = boldxCaseStudy.ledger.find((g) => g.label === "Revenue systems");
    expect(revenue?.intro).toMatch(/AI agents/);
    expect(revenue?.intro).toMatch(/Excel|spreadsheet/i);
    const expiry = revenue?.entries.find((e) => /expir/i.test(e.title));
    expect(expiry?.detail).toMatch(/buy|purchase|order/i);
  });

  it("shows both Zoom backgrounds in the gallery", () => {
    expect(boldxCaseStudy.gallery.items.filter((i) => /zoom/i.test(i.caption))).toHaveLength(2);
  });
});
