"use client";

import { create } from "zustand";

/**
 * Transient scene state shared between HTML-side input events and the R3F
 * canvas. The constellation scene reads mouse coords via getState() inside
 * useFrame — never via useState — to avoid re-renders.
 */
export interface R3fState {
  mouseX: number;
  mouseY: number;
  setMouse: (x: number, y: number) => void;
}

export const useR3fStore = create<R3fState>((set) => ({
  mouseX: 0,
  mouseY: 0,
  setMouse: (x, y) => set({ mouseX: x, mouseY: y }),
}));
