import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "How I'd run sales at Curate, by Paul Skidmore";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const steps = ["Market table", "Fit score", "Signals", "Morning List", "First draft", "HubSpot"];

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
          <span style={{ display: "block", width: 12, height: 12, backgroundColor: "#2D9B9B" }} />
          Prepared for Curate · Head of Sales
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            fontSize: 112,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          <span>How I&apos;d run sales</span>
          <span style={{ color: "#E8735A" }}>at Curate.</span>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 48, flexWrap: "wrap" }}>
          {steps.map((s) => (
            <span
              key={s}
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#4A4A4A",
                border: "2px solid #D4D0C8",
                borderRadius: 999,
                padding: "10px 18px",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
