"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper that imports CanvasRoot with ssr:false.
 *
 * Next 16 disallows ssr:false on dynamic imports inside Server Components,
 * so this thin client component owns the dynamic import. The root layout
 * (a Server Component) imports this wrapper directly.
 */
const CanvasRoot = dynamic(
  () => import("./CanvasRoot").then((m) => m.CanvasRoot),
  { ssr: false, loading: () => null }
);

export function CanvasRootClient() {
  return <CanvasRoot />;
}
