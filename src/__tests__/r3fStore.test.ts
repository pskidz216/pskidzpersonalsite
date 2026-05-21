import { describe, it, expect, beforeEach } from "vitest";
import { useR3fStore } from "@/lib/r3fStore";

describe("r3fStore", () => {
  beforeEach(() => {
    useR3fStore.setState({ mouseX: 0, mouseY: 0 });
  });

  it("starts with mouse at origin", () => {
    const state = useR3fStore.getState();
    expect(state.mouseX).toBe(0);
    expect(state.mouseY).toBe(0);
  });

  it("setMouse updates both axes", () => {
    useR3fStore.getState().setMouse(0.42, -0.17);
    const state = useR3fStore.getState();
    expect(state.mouseX).toBe(0.42);
    expect(state.mouseY).toBe(-0.17);
  });

  it("setMouse accepts the full -1..1 range used by useCursorTracking", () => {
    useR3fStore.getState().setMouse(-1, 1);
    expect(useR3fStore.getState().mouseX).toBe(-1);
    expect(useR3fStore.getState().mouseY).toBe(1);
    useR3fStore.getState().setMouse(1, -1);
    expect(useR3fStore.getState().mouseX).toBe(1);
    expect(useR3fStore.getState().mouseY).toBe(-1);
  });

  it("setter creates a new state object (no mutation of prior snapshot)", () => {
    const before = useR3fStore.getState();
    before.setMouse(0.1, 0.2);
    const after = useR3fStore.getState();
    expect(after).not.toBe(before);
    expect(before.mouseX).toBe(0);
    expect(before.mouseY).toBe(0);
    expect(after.mouseX).toBe(0.1);
    expect(after.mouseY).toBe(0.2);
  });
});
