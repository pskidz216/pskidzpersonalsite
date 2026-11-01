import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt =
  "Paul Skidmore. Built BoldX's strategy, sales and marketing, 2025–2026. Ready to work.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const headshot = await readFile(
    path.join(process.cwd(), "public", "images", "headshot-og.jpg")
  );
  const headshotSrc = `data:image/jpeg;base64,${headshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FAFAF8",
          fontFamily: "system-ui",
          color: "#1A1A1A",
        }}
      >
        <div
          style={{
            flex: "1 1 0",
            display: "flex",
            flexDirection: "column",
            padding: "64px 56px 56px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.18em",
              color: "#2D9B9B",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "block", width: 12, height: 12, backgroundColor: "#2D9B9B" }} />
            Revenue operator · Miami, FL
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <div style={{ fontSize: 112, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
              Paul
            </div>
            <div style={{ display: "flex", fontSize: 112, fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.03em" }}>
              Skidmore<span style={{ color: "#E8735A" }}>.</span>
            </div>
            <div
              style={{
                marginTop: 34,
                fontSize: 28,
                lineHeight: 1.3,
                color: "#4A4A4A",
                maxWidth: 560,
              }}
            >
              Built BoldX&apos;s strategy, sales and marketing, 2025–2026. Ready to work.
            </div>
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8A8A8A",
            }}
          >
            paulskidmoreii.com
          </div>
        </div>
        <div
          style={{
            width: 500,
            height: "100%",
            display: "flex",
            borderLeft: "8px solid #E8735A",
            overflow: "hidden",
          }}
        >
          <img
            src={headshotSrc}
            alt=""
            width={500}
            height={630}
            style={{ width: 500, height: 630, objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
