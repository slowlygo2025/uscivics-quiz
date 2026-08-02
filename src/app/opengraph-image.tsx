import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #003d6b 0%, #005288 55%, #0a4a6e 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Free USCIS practice
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          USCivics Quiz
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            lineHeight: 1.35,
            maxWidth: 880,
            opacity: 0.92,
          }}
        >
          100 & 128 civics questions · English reading & writing · Free audio
        </div>
      </div>
    ),
    { ...size }
  );
}
