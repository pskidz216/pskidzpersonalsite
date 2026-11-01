import { ImageResponse } from "next/og";

export const alt = "I built BoldX's strategy, sales and marketing — Paul Skidmore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#FAFAF8",
          display: "flex",
          flexDirection: "column",
          padding: "72px 88px",
          fontFamily: "system-ui",
          color: "#1A1A1A",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.18em",
            color: "#2D9B9B",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "block",
              width: 12,
              height: 12,
              backgroundColor: "#2D9B9B",
            }}
          />
          Case study · BoldX Industries · 2025–2026
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em" }}>
            I built BoldX&apos;s
          </div>
          <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", color: "#E8735A" }}>
            strategy, sales
          </div>
          <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 0.98, letterSpacing: "-0.03em", color: "#E8735A" }}>
            and marketing.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 56,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#8A8A8A",
          }}
        >
          <span>Paul Skidmore</span>
          <span>paulskidmoreii.com / work / boldx</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
