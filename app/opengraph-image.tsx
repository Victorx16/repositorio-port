import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const alt = `${SITE.name} — Engenharia de Software Premium`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 60% 60% at 50% 0%, #0f2830 0%, #0a0c10 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 88,
            fontWeight: 700,
            color: "#f7fafc",
            letterSpacing: -2,
          }}
        >
          Code
          <span style={{ color: "#00e5ff" }}>VX</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#94a3b8",
            display: "flex",
          }}
        >
          Engenharia de Software Premium
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 28,
            color: "#00e5ff",
            display: "flex",
          }}
        >
          São Paulo &amp; ABC Paulista
        </div>
      </div>
    ),
    { ...size },
  );
}
