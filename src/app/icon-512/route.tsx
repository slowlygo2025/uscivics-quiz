import { ImageResponse } from "next/og";

export const runtime = "edge";

/** PWA / install icon 512×512 */
export async function GET() {
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
            width: 380,
            height: 380,
            borderRadius: 999,
            border: "10px solid #c0c2c4",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#003a5d",
            color: "#fff",
            fontFamily: "Georgia, serif",
          }}
        >
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em" }}>
            US
          </div>
          <div
            style={{
              marginTop: 12,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            Civics
          </div>
        </div>
      </div>
    ),
    { width: 512, height: 512 }
  );
}
