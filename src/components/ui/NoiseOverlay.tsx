"use client";

/**
 * Subtle film-grain texture over the entire viewport. SVG noise filter,
 * ultra-low opacity, pointer-events:none, fixed so it never moves.
 */
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55] mix-blend-overlay opacity-[0.06]"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        backgroundSize: "200px 200px",
      }}
    />
  );
}
