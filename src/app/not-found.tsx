import Link from "next/link";

/** Root 404 outside a locale segment. */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          background: "#f4f7fa",
          color: "#0b1c2c",
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 420, textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#005288",
            }}
          >
            USCivics Quiz
          </p>
          <h1 style={{ margin: "12px 0 8px", fontSize: 28 }}>Page not found</h1>
          <p style={{ margin: "0 0 20px", lineHeight: 1.5, color: "#5a5b5d" }}>
            That link does not match a page on this site.
          </p>
          <Link
            href="/en"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 44,
              padding: "0 18px",
              borderRadius: 8,
              background: "#005288",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Back home
          </Link>
        </div>
      </body>
    </html>
  );
}
