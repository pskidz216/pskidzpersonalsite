import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Pricing — Paul Skidmore";
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
          Projects · Retainers
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
              color: "#E8735A",
            }}
          >
            Pricing
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
            paulskidmoreii.com / pricing
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
