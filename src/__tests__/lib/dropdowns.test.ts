import { describe, it, expect, vi, afterEach } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  OPEN_SECTION_EVENT,
  allIndexes,
  requestOpenSection,
  sectionIdFromHref,
  toggleIndex,
} from "@/lib/openSection";

const source = (file: string) => fs.readFileSync(path.join(process.cwd(), file), "utf8");

describe("opening a section from a link", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("reads the section id from an in-page link only", () => {
    expect(sectionIdFromHref("#built")).toBe("built");
    expect(sectionIdFromHref("/work/boldx")).toBeNull();
    expect(sectionIdFromHref("#")).toBeNull();
  });

  it("announces the section for in-page links and stays quiet for others", () => {
    const dispatchEvent = vi.fn();
    vi.stubGlobal("window", { dispatchEvent });
    vi.stubGlobal("CustomEvent", class { constructor(public type: string, public init: { detail: string }) {} });
    requestOpenSection("/pricing");
    expect(dispatchEvent).not.toHaveBeenCalled();
    requestOpenSection("#certifications");
    expect(dispatchEvent).toHaveBeenCalledTimes(1);
    const event = dispatchEvent.mock.calls[0][0] as unknown as { type: string; init: { detail: string } };
    expect(event.type).toBe(OPEN_SECTION_EVENT);
    expect(event.init.detail).toBe("certifications");
  });
});

describe("the six systems' open state", () => {
  it("toggles one card without mutating the set it was given", () => {
    const start: ReadonlySet<number> = new Set([1]);
    const opened = toggleIndex(start, 3);
    expect([...opened].sort()).toEqual([1, 3]);
    expect([...start]).toEqual([1]);
    expect([...toggleIndex(opened, 1)]).toEqual([3]);
  });

  it("can open all of them", () => {
    expect([...allIndexes(6)]).toEqual([0, 1, 2, 3, 4, 5]);
  });
});

describe("the sections", () => {
  it("drop open with an arrow and start closed", () => {
    for (const file of ["src/components/redesign/CredentialsList.tsx", "src/components/redesign/BuildsList.tsx"]) {
      const section = source(file);
      expect(section, file).toMatch(/<DropdownToggle/);
      expect(section, file).toMatch(/<DropdownPanel/);
      expect(section, file).toMatch(/useState\(false\)/);
      expect(section, file).toMatch(/useOpenRequest/);
    }
  });

  it("gives each of the six systems its own arrow, and an open-all control", () => {
    const grid = source("src/components/redesign/SystemsGrid.tsx");
    expect(grid).toMatch(/<DropdownToggle/);
    expect(grid).toMatch(/<DropdownPanel/);
    expect(grid).toMatch(/useState<ReadonlySet<number>>\(new Set\(\)\)/);
    expect(grid).toMatch(/Open all/);
    expect(grid).toMatch(/Close all/);
    expect(grid).toMatch(/useOpenRequest/);
  });

  it("uses a real button that says whether it is open", () => {
    const dropdown = source("src/components/ui/Dropdown.tsx");
    expect(dropdown).toMatch(/<button/);
    expect(dropdown).toMatch(/aria-expanded=\{open\}/);
    expect(dropdown).toMatch(/aria-controls=/);
  });

  it("opens when the hero or the nav jumps to it", () => {
    expect(source("src/components/redesign/RedesignHero.tsx")).toMatch(/requestOpenSection\(/);
    expect(source("src/components/redesign/RedesignNav.tsx")).toMatch(/requestOpenSection\(/);
  });

  it("opens from a link to its anchor, on load or on a hash change", () => {
    const dropdown = source("src/components/ui/Dropdown.tsx");
    expect(dropdown).toMatch(/"hashchange"/);
    expect(dropdown).toMatch(/window\.location\.hash/);
  });

  it("waits for scrolling to stop before recalculating scroll positions", () => {
    const dropdown = source("src/components/ui/Dropdown.tsx");
    expect(dropdown).toMatch(/refreshWhenScrollStops\(\)/);
    const handler = dropdown.slice(dropdown.indexOf("function handleTransitionEnd"));
    expect(handler).not.toMatch(/ScrollTrigger\.refresh\(\)/);
  });

  it("lands below the fixed nav when a link jumps to it", () => {
    expect(source("src/app/redesign.css")).toMatch(/\.rd-dropsection \{[^}]*scroll-margin-top/);
  });

  it("respects reduced motion", () => {
    const css = source("src/app/redesign.css");
    expect(css).toMatch(/\.rd-drop\b/);
    expect(css).toMatch(/prefers-reduced-motion: reduce\)\s*\{\s*\.rd-drop/);
  });
});
