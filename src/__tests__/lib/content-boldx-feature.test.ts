import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { boldxFeature } from "@/app/work/boldx/feature";
import { boldxCaseStudy } from "@/app/work/boldx/content";
import { projects } from "@/lib/data";

const everything = JSON.stringify(boldxFeature);
const inPublic = (src: string) =>
  fs.existsSync(path.join(process.cwd(), "public", src));

describe("BoldX home-page highlight", () => {
  it("leads with the case-study thesis and links to it", () => {
    expect(boldxFeature.title).toBe(boldxCaseStudy.hero.h1);
    expect(boldxFeature.href).toBe("/work/boldx");
    expect(boldxFeature.cta).toMatch(/case study/i);
  });

  it("shows four counted facts, none of them a date", () => {
    expect(boldxFeature.facts).toHaveLength(4);
    for (const fact of boldxFeature.facts) {
      expect(fact.value).toMatch(/\d/);
      expect(fact.value).not.toMatch(/20\d\d/);
      expect(fact.label.length).toBeGreaterThan(8);
    }
  });

  it("keeps the same guards as the case study", () => {
    expect(everything).not.toMatch(/\$1[789](\.\d)?M|\$25M|\$40M|\$50M|17,7|17,0|18,8/);
    expect(everything).not.toMatch(/SDR|outbound|sales[- ]intelligence|Clay|Apollo/i);
    expect(everything).not.toMatch(/BOLDx|BoldX Enterprises|BXE|Power of|Àṣẹ|Ase\b/);
  });

  it("points at images that exist, as does every Builds row and gallery item", () => {
    expect(inPublic(boldxFeature.front.src)).toBe(true);
    expect(inPublic(boldxFeature.back.src)).toBe(true);
    for (const project of projects) expect(inPublic(project.image), project.name).toBe(true);
    for (const item of boldxCaseStudy.gallery.items) expect(inPublic(item.src), item.src).toBe(true);
    expect(inPublic(boldxCaseStudy.hero.image.src)).toBe(true);
  });

  it("runs the gallery on reels and finished work, with every file present and within budget", () => {
    const { rows, items } = boldxCaseStudy.gallery;
    expect(rows.flat()).toEqual(items);
    for (const row of rows) {
      expect(row.length).toBeGreaterThanOrEqual(2);
      expect(row.length).toBeLessThanOrEqual(3);
    }
    const size = (src: string) => fs.statSync(path.join(process.cwd(), "public", src)).size;
    const reels = items.filter((i) => i.video);
    expect(reels.length).toBeGreaterThanOrEqual(2);
    for (const item of items) {
      expect(item.ratio, item.src).toBeGreaterThan(0);
      expect(size(item.src), item.src).toBeLessThanOrEqual(300 * 1024);
      if (item.video) {
        expect(inPublic(item.video), item.video).toBe(true);
        expect(size(item.video), item.video).toBeLessThanOrEqual(3 * 1024 * 1024);
      }
    }
  });

  it("drops the document pages from the gallery and shows the sign, the ladder site and the expiry email", () => {
    const srcs = boldxCaseStudy.gallery.items.map((i) => i.src).join(" ");
    expect(srcs).not.toMatch(/bible-|identity-lockups|chart-seal|connector-comparison|tee\.|linkedin-banner|ladder-og/);
    expect(srcs).toMatch(/brand-sign/);
    expect(srcs).toMatch(/ladder-site/);
    expect(srcs).toMatch(/quote-expiry-email/);
  });

  it("counts no launches the site no longer shows, in metadata or the Record card", () => {
    for (const file of ["src/app/work/boldx/page.tsx", "src/components/redesign/RecordGallery.tsx"]) {
      const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
      expect(source, file).not.toMatch(/(two|three) (launches|product lines)|\bInEX\b/i);
    }
  });

  it("keeps the month-and-year stamps off the home intro stats", () => {
    const intro = fs.readFileSync(path.join(process.cwd(), "src/components/redesign/IntroSection.tsx"), "utf8");
    expect(intro).not.toMatch(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/);
  });
});
