import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { heroContent, projects, reelBand } from "@/lib/data";
import * as data from "@/lib/data";
import { boldxFeature } from "@/app/work/boldx/feature";
import { privacySections, termsSections } from "@/lib/legal";
import { readConsent, writeConsent, CONSENT_KEY } from "@/lib/analyticsConsent";
import sitemap from "@/app/sitemap";

const root = process.cwd();
const source = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file: string) => fs.existsSync(path.join(root, file));
const kb = (file: string) => fs.statSync(path.join(root, file)).size / 1024;

describe("home hero", () => {
  it("leads with Paul's own call to action", () => {
    expect(heroContent.title).toBe("I'm ready to work.");
    expect(heroContent.sub).toMatch(/^I'm ready to help companies\./);
    expect(heroContent.sub).toMatch(/revenue engines/);
    expect(heroContent.actions).toEqual([
      { label: "Check out how I helped BoldX", href: "/work/boldx", primary: true },
      { label: "Here's what I do", href: "#skills", primary: false },
      { label: "See my portfolio below", href: "#built", primary: false },
    ]);
  });

  it("renders that copy and points at sections that exist", () => {
    const hero = source("src/components/redesign/RedesignHero.tsx");
    expect(hero).toMatch(/heroContent/);
    expect(hero).not.toMatch(/operator\s+seat|Scroll</);
    expect(source("src/components/redesign/SystemsGrid.tsx")).toMatch(/id="skills"/);
    expect(source("src/components/redesign/BuildsList.tsx")).toMatch(/id="built"/);
  });
});

describe("calls to action on inner pages", () => {
  it("keeps a contact button stuck on the case study and pricing", () => {
    expect(source("src/app/work/boldx/BoldxPage.tsx")).toMatch(/<StickyContact/);
    expect(source("src/app/pricing/PricingPage.tsx")).toMatch(/<StickyContact/);
    const chip = source("src/components/ui/StickyContact.tsx");
    expect(chip).toMatch(/fixed/);
    expect(chip).toMatch(/Get in touch/);
  });
});

describe("the Spiritual Site and its seed film", () => {
  it("are gone from the home page, the copy, the styles and the public files", () => {
    expect(JSON.stringify(data)).not.toMatch(/spiritual|seed film|parallax/i);
    expect(source("src/app/page.tsx")).not.toMatch(/SeedBanner/);
    expect(exists("src/components/redesign/SeedBanner.tsx")).toBe(false);
    expect(source("src/app/redesign.css")).not.toMatch(/rd-banner|seed banner/);
    for (const file of ["spiritual-site.mp4", "spiritual-site.webp", "seed-poster.webp"]) {
      expect(exists(`public/projects/${file}`), file).toBe(false);
    }
    expect(projects.some((p) => /spiritual/i.test(p.name))).toBe(false);
  });
});

describe("the reel band that replaces it", () => {
  it("runs the part-to-mission clips and links to the case study", () => {
    expect(source("src/app/page.tsx")).toMatch(/<ReelBand \/>/);
    expect(reelBand.tiles).toHaveLength(5);
    expect(reelBand.cta.href).toBe("/work/boldx");
    expect(reelBand.eyebrow).toMatch(/BoldX Industries/);
    expect(reelBand.tiles.filter((t) => t.onPhone)).toHaveLength(2);
    for (const tile of reelBand.tiles) {
      expect(tile.alt.length, tile.video).toBeGreaterThan(20);
      expect(kb(`public${tile.video}`), tile.video).toBeLessThanOrEqual(1024);
      expect(kb(`public${tile.poster}`), tile.poster).toBeLessThanOrEqual(100);
    }
  });

  it("shares one player with the case-study gallery", () => {
    expect(source("src/components/redesign/ReelBand.tsx")).toMatch(/<LoopingReel/);
    expect(source("src/app/work/boldx/BoldxGallery.tsx")).toMatch(/<LoopingReel/);
    expect(source("src/components/ui/LoopingReel.tsx")).toMatch(/prefersReducedMotion/);
  });
});

describe("the BoldX row in Builds", () => {
  const row = projects.find((p) => p.name === "BoldX Industries");

  it("shows the whole job, not just the brand", () => {
    expect(row?.tag).toBe("Full Go-To-Market");
    for (const piece of ["Brand Bible", "Live Quote Pipeline", "AI Agents", "HubSpot", "n8n", "Email Campaigns", "Contracts", "Cinematic Reels", "Popl"]) {
      expect(row?.tech, piece).toContain(piece);
    }
    expect(row?.description).toMatch(/go-to-market end to end/i);
    expect(row?.description).toMatch(/quote pipeline/);
    expect(row?.description).toMatch(/PBExpo/);
  });

  it("previews as the X mark alone", () => {
    expect(row?.image).toBe("/work/boldx/x-mark-preview.webp");
    expect(exists("public/work/boldx/x-mark-preview.webp")).toBe(true);
    expect(exists("public/work/boldx/catalog-cover-wide.webp")).toBe(false);
  });
});

describe("Human OS", () => {
  it("is gone from Builds and the public files", () => {
    expect(JSON.stringify(data)).not.toMatch(/human ?os/i);
    expect(exists("public/projects/human-os.png")).toBe(false);
  });
});

describe("the certifications section", () => {
  it("is called what it is, in the section and the nav", () => {
    const section = source("src/components/redesign/CredentialsList.tsx");
    expect(section).toMatch(/>Certifications</);
    expect(section).not.toMatch(/paper trail/i);
    expect(data.navLinks).toContainEqual({ label: "Certifications", href: "#certifications" });
  });
});

describe("the case-study page title", () => {
  it("leads with strategy, sales and marketing and fits in 60 characters", () => {
    const page = source("src/app/work/boldx/page.tsx");
    const title = page.match(/const title = "([^"]+)"/)?.[1] ?? "";
    expect(title).toMatch(/strategy, sales and marketing/i);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(title).not.toMatch(/built the BoldX brand/);
    for (const image of ["src/app/work/boldx/opengraph-image.tsx", "src/app/opengraph-image.tsx"]) {
      expect(source(image), image).not.toMatch(/BoldX brand|BoldX Industries brand/);
    }
    const description = page.match(/"(Case study[^"]+)"/)?.[1] ?? "";
    expect(description.length).toBeGreaterThanOrEqual(70);
    expect(description.length).toBeLessThanOrEqual(160);
  });
});

describe("the role Paul is looking for", () => {
  it("asks for business development and partnerships, not a CRO seat", () => {
    const footer = source("src/components/redesign/ContactFooter.tsx").replace(/\s+/g, " ");
    expect(footer).toMatch(/business development or Director of Partnerships/);
    expect(footer).toMatch(/network/);
    expect(footer).toMatch(/long-term or fractional/);
    expect(footer).toMatch(/Tech, AI, manufacturing, industrial/);
    expect(footer).toMatch(/skill set plus AI/);
    expect(footer).not.toMatch(/CRO|VP Sales|\$5M/);
    const layout = source("src/app/layout.tsx");
    expect(layout).not.toMatch(/operator roles/);
    expect(layout).toMatch(/business development and partnerships/);
    const description = layout.match(/description:\s*"([^"]+)"/)?.[1] ?? "";
    expect(description.length).toBeGreaterThanOrEqual(70);
    expect(description.length).toBeLessThanOrEqual(160);
  });
});

describe("sideways scroll", () => {
  it("keeps the mist layer from widening the page", () => {
    const css = source("src/app/redesign.css");
    expect(css).toMatch(/\.rd-seam-wrap \{[^}]*overflow-x: clip/);
  });
});

describe("favicon set", () => {
  it("serves a real icon file and a manifest", () => {
    expect(exists("src/app/favicon.ico.bak")).toBe(false);
    const ico = fs.readFileSync(path.join(root, "src/app/favicon.ico"));
    expect([...ico.subarray(0, 4)]).toEqual([0, 0, 1, 0]);
    expect(ico.readUInt16LE(4)).toBeGreaterThanOrEqual(2);
    expect(exists("src/app/manifest.ts")).toBe(true);
  });
});

describe("search and sitemap", () => {
  it("lets /pricing be indexed, since it is in the nav", () => {
    expect(source("src/app/pricing/page.tsx")).not.toMatch(/index:\s*false/);
  });

  it("lists every public page", () => {
    const urls = sitemap().map((entry) => new URL(entry.url).pathname);
    expect(urls).toEqual(expect.arrayContaining(["/", "/work/boldx", "/pricing", "/privacy", "/terms"]));
  });
});

describe("images", () => {
  it("gives Builds previews and the home card real alt text", () => {
    expect(source("src/components/redesign/BuildsList.tsx")).not.toMatch(/alt=""/);
    expect(source("src/components/redesign/CaseStudyFeature.tsx")).not.toMatch(/alt=""/);
    expect(boldxFeature.back.alt.length).toBeGreaterThan(8);
  });

  it("shows the Bible cover on the home card with the real logo and no date", () => {
    expect(boldxFeature.back.src).toBe("/work/boldx/brand-bible-cover.webp");
    expect(boldxFeature.back.alt).toMatch(/BoldX logo/);
    expect(exists("public/work/boldx/brand-bible-cover.webp")).toBe(true);
    expect(exists("public/work/boldx/bible-cover.webp")).toBe(false);
  });

  it("keeps everything the home page loads under 300 KB", () => {
    const hero = source("src/components/redesign/RedesignHero.tsx").match(/src="(\/images\/[^"]+)"/)?.[1];
    expect(hero).toMatch(/\.webp$/);
    for (const file of [hero as string, ...reelBand.tiles.map((t) => t.poster), ...projects.map((p) => p.image)]) {
      expect(kb(`public${file}`), file).toBeLessThanOrEqual(300);
    }
  });
});

describe("privacy and terms", () => {
  const privacy = JSON.stringify(privacySections);
  const terms = JSON.stringify(termsSections);

  it("describes what the site really does", () => {
    expect(privacy).toMatch(/Vercel Web Analytics/);
    expect(privacy).toMatch(/cookies/i);
    expect(privacy).toMatch(/pskidmore216@gmail\.com/);
    expect(terms).toMatch(/belong to their owners/);
    expect(terms).toMatch(/Florida/);
  });

  it("is linked from every page's footer", () => {
    for (const file of [
      "src/components/redesign/ContactFooter.tsx",
      "src/app/work/boldx/BoldxPage.tsx",
      "src/app/pricing/PricingPage.tsx",
    ]) {
      expect(source(file), file).toMatch(/<LegalLinks/);
    }
    const links = source("src/components/ui/LegalLinks.tsx");
    expect(links).toMatch(/\/privacy/);
    expect(links).toMatch(/\/terms/);
    expect(exists("src/app/privacy/page.tsx")).toBe(true);
    expect(exists("src/app/terms/page.tsx")).toBe(true);
  });
});

describe("analytics consent", () => {
  const memoryStorage = (start: Record<string, string> = {}) => {
    const data = new Map(Object.entries(start));
    return {
      getItem: (k: string) => data.get(k) ?? null,
      setItem: (k: string, v: string) => void data.set(k, v),
    };
  };
  const blocked = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
  };

  it("starts undecided and remembers the choice", () => {
    const storage = memoryStorage();
    expect(readConsent(storage)).toBeNull();
    expect(writeConsent(storage, "accepted")).toBe(true);
    expect(readConsent(storage)).toBe("accepted");
  });

  it("ignores junk values and survives blocked storage", () => {
    expect(readConsent(memoryStorage({ [CONSENT_KEY]: "maybe" }))).toBeNull();
    expect(readConsent(blocked)).toBeNull();
    expect(readConsent(null)).toBeNull();
    expect(writeConsent(blocked, "declined")).toBe(false);
  });

  it("only loads analytics after a yes", () => {
    const gate = source("src/components/ui/AnalyticsConsent.tsx");
    expect(gate).toMatch(/consent === "accepted"/);
    expect(gate).toMatch(/<Analytics/);
    expect(source("src/app/layout.tsx")).toMatch(/<AnalyticsConsent/);
    expect(source("src/app/layout.tsx")).not.toMatch(/<Analytics\b/);
  });
});
