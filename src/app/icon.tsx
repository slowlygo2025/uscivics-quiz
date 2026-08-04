import { ImageResponse } from "next/og";

/** Google Search + browser tab favicon (square PNG ≥48px). */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#005288",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 999,
            border: "2px solid #c0c2c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#003a5d",
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            fontFamily: "Georgia, serif",
          }}
        >
          US
        </div>
      </div>
    ),
    { ...size }
  );
}
