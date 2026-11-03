import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { careerEntries } from "@/lib/data";
import { boldxFeature } from "@/app/work/boldx/feature";
import { boldxCaseStudy } from "@/app/work/boldx/content";

const root = process.cwd();
const source = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const career = careerEntries.find((e) => e.id === "boldx");

// Everything that states the BoldX pipeline: the case study, the home feature, the career row,
// the intro stats, both pages' share copy and the case-study share image.
const pipelineCopy = () =>
  [
    JSON.stringify(boldxCaseStudy),
    JSON.stringify(boldxFeature),
    JSON.stringify(career),
    source("src/components/redesign/IntroSection.tsx"),
    source("src/app/work/boldx/page.tsx"),
    source("src/app/layout.tsx"),
    source("src/app/work/boldx/opengraph-image.tsx"),
  ].join("\n");

const quoted = (file: string, name: string) =>
  source(file).match(new RegExp(`const ${name} =\\s*"([^"]+)"`))?.[1] ?? "";

describe("the BoldX pipeline totals", () => {
  it("drops the partial-year $11.6M and 147 everywhere", () => {
    expect(pipelineCopy()).not.toMatch(/\$11\.6|11\.58|"147"|147 deals|\$4\.6M|212 deals/);
    // The January blanket deals count toward the won total but are never named on their own.
    expect(pipelineCopy()).not.toMatch(/\$10\.9|blanket/i);
  });

  it("leads the case-study numbers with the full quoted total, then the won total", () => {
    const { stats } = boldxCaseStudy.numbers;
    expect(stats[0]).toEqual({ value: "$18.3M", label: "quoted through my pipeline" });
    expect(stats[1]).toEqual({ value: "$15.5M", label: "won across 212+ deals" });
  });

  it("puts both totals on the home feature and the career row", () => {
    const facts = boldxFeature.facts.map((f) => f.value);
    expect(facts).toContain("$18.3M");
    expect(facts).toContain("$15.5M");
    expect(boldxFeature.facts.find((f) => f.value === "$15.5M")?.label).toMatch(/212\+ deals/);
    expect(career?.description).toMatch(/\$18\.3M quoted and \$15\.5M won across 212\+ deals/);
    expect(career?.metric).toEqual({ value: "$15.5M", label: "won across 212+ deals" });
  });

  it("shows the won total in the intro stats", () => {
    expect(source("src/components/redesign/IntroSection.tsx")).toMatch(
      /value: "\$15\.5", accent: "M", label: "Closed-won at BoldX"/
    );
  });
});

describe("the share copy LinkedIn shows under each link", () => {
  it("gives the case study a how-I-built title and a description that opens on the numbers", () => {
    const page = "src/app/work/boldx/page.tsx";
    expect(quoted(page, "shareTitle")).toBe("How I built BoldX's strategy, sales and marketing");
    const share = quoted(page, "shareDescription");
    expect(share).toMatch(/^\$18\.3M quoted and \$15\.5M won across 212\+ deals/);
    expect(share).toMatch(/AI agents/);
    expect(share).toMatch(/brand bible/);
    expect(share).toMatch(/AEO/);
    expect(share.length).toBeLessThanOrEqual(260);
    expect(quoted(page, "description")).toMatch(/\$18\.3M quoted and \$15\.5M won/);
    expect(source(page).match(/title: shareTitle/g)).toHaveLength(2);
    expect(source(page).match(/description: shareDescription/g)).toHaveLength(2);
  });

  it("gives the home page a role title and a description with the years, the totals and the certifications", () => {
    const layout = source("src/app/layout.tsx");
    expect(quoted("src/app/layout.tsx", "shareTitle")).toBe("Paul Skidmore: sales and business development");
    const share = quoted("src/app/layout.tsx", "shareDescription");
    expect(share).toMatch(/^12 years in revenue, from the operating room/);
    expect(share).toMatch(/\$18\.3M quoted, \$15\.5M won across 212\+ deals/);
    expect(share).toMatch(/16 certifications/);
    expect(share).toMatch(/business development and sales roles/);
    expect(share.length).toBeLessThanOrEqual(260);
    const meta = layout.match(/description:\s*"([^"]+)"/)?.[1] ?? "";
    expect(meta).toMatch(/\$18\.3M and won \$15\.5M/);
    expect(layout.match(/title: shareTitle/g)).toHaveLength(2);
    expect(layout.match(/description: shareDescription/g)).toHaveLength(2);
  });

  it("names the case study \"BoldX Case Study\" on the line LinkedIn shows under the card title", () => {
    expect(source("src/app/work/boldx/page.tsx")).toMatch(/openGraph: \{[^}]*siteName: "BoldX Case Study"/);
  });

  it("prints the totals on the case-study share image", () => {
    expect(source("src/app/work/boldx/opengraph-image.tsx")).toMatch(
      /\$18\.3M quoted · \$15\.5M won · 212\+ deals/
    );
  });
});
