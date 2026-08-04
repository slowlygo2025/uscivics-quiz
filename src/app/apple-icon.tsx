import { ImageResponse } from "next/og";

/** iOS home-screen / apple-touch-icon */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
            width: 140,
            height: 140,
            borderRadius: 999,
            border: "4px solid #c0c2c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#003a5d",
            color: "#fff",
            fontSize: 48,
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
