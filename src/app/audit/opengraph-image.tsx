import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Workflow Audit — Paul Skidmore";
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
          backgroundImage:
            "radial-gradient(circle, rgba(26,26,26,0.16) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          display: "flex",
          flexDirection: "column",
          padding: "72px 88px",
          fontFamily: "system-ui",
          color: "#1A1A1A",
          position: "relative",
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
            color: "#E8735A",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              display: "block",
              width: 12,
              height: 12,
              backgroundColor: "#E8735A",
            }}
          />
          30 min · always free
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div
            style={{
              fontSize: 168,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            Workflow
          </div>
          <div
            style={{
              fontSize: 168,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              color: "#E8735A",
            }}
          >
            Audit
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 56,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8A8A8A",
            }}
          >
            paulskidmoreii.com / audit
          </div>
          <MiniGraph />
        </div>
      </div>
    ),
    { ...size }
  );
}

function MiniGraph() {
  return (
    <svg width="240" height="180" viewBox="0 0 240 180">
      <line x1="40" y1="50" x2="120" y2="110" stroke="#E8735A" strokeWidth="2.5" />
      <line x1="200" y1="50" x2="120" y2="110" stroke="#E8735A" strokeWidth="2.5" />
      <line x1="120" y1="160" x2="120" y2="110" stroke="#E8735A" strokeWidth="2.5" />
      <circle cx="40" cy="50" r="22" fill="#FAFAF8" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="200" cy="50" r="22" fill="#FAFAF8" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="120" cy="160" r="22" fill="#FAFAF8" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="120" cy="110" r="32" fill="#E8735A" />
    </svg>
  );
}
