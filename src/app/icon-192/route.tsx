import { ImageResponse } from "next/og";

export const runtime = "edge";

/** PWA / install icon 192×192 */
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
            width: 148,
            height: 148,
            borderRadius: 999,
            border: "4px solid #c0c2c4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#003a5d",
            color: "#fff",
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            fontFamily: "Georgia, serif",
          }}
        >
          US
        </div>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
