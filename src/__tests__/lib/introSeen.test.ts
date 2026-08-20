import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  hasSeenIntro,
  markIntroSeen,
  isIntroPending,
  resetIntroPendingCache,
} from "@/lib/pong/introSeen";

const KEY = "psii-pong-intro-seen";

function stubStorage(impl: Partial<Storage>) {
  vi.stubGlobal("window", { sessionStorage: impl as Storage });
}

describe("introSeen", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    stubStorage({
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it("reports an unseen intro on a fresh session", () => {
    expect(hasSeenIntro()).toBe(false);
  });

  it("remembers the intro once marked", () => {
    markIntroSeen();
    expect(hasSeenIntro()).toBe(true);
  });

  it("only treats the exact stored flag as seen", () => {
    const store = new Map([[KEY, "0"]]);
    stubStorage({ getItem: (k: string) => store.get(k) ?? null, setItem: () => {} });
    expect(hasSeenIntro()).toBe(false);
  });
});

describe("isIntroPending", () => {
  beforeEach(() => {
    resetIntroPendingCache();
    const store = new Map<string, string>();
    stubStorage({
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
    });
  });

  afterEach(() => {
    resetIntroPendingCache();
    vi.unstubAllGlobals();
  });

  it("owes a greeting on a fresh session", () => {
    expect(isIntroPending()).toBe(true);
  });

  it("holds its value even after the intro is marked seen", () => {
    // The snapshot backs useSyncExternalStore, which requires a value that
    // does not change without notifying React. Marking seen happens moments
    // after the first read, so this must not flip mid-page-load.
    expect(isIntroPending()).toBe(true);
    markIntroSeen();
    expect(isIntroPending()).toBe(true);
    expect(hasSeenIntro()).toBe(true);
  });

  it("owes nothing on a later page load in the same session", () => {
    markIntroSeen();
    resetIntroPendingCache(); // stands in for a fresh page load
    expect(isIntroPending()).toBe(false);
  });
});

describe("introSeen when storage is unavailable", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("greets the visitor rather than silently skipping", () => {
    // Safari private mode throws on access; failing closed would hide the
    // intro from everyone in that mode.
    stubStorage({
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    });
    expect(hasSeenIntro()).toBe(false);
  });

  it("does not throw when it cannot record the visit", () => {
    stubStorage({
      getItem: () => null,
      setItem: () => {
        throw new Error("blocked");
      },
    });
    expect(() => markIntroSeen()).not.toThrow();
  });
});
