"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

/**
 * App Router global error boundary — reports to Sentry then shows a minimal recovery UI.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
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
          <h1 style={{ margin: "12px 0 8px", fontSize: 28 }}>
            Something went wrong
          </h1>
          <p style={{ margin: "0 0 20px", lineHeight: 1.5, color: "#5a5b5d" }}>
            We logged the error so we can fix it. You can try again or go back
            home.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => reset()}
              style={{
                minHeight: 44,
                padding: "0 18px",
                border: 0,
                borderRadius: 8,
                background: "#005288",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => {
                window.location.href = "/en";
              }}
              style={{
                minHeight: 44,
                padding: "0 18px",
                display: "inline-flex",
                alignItems: "center",
                borderRadius: 8,
                border: "1px solid #c0c2c4",
                background: "#fff",
                color: "#0b1c2c",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Home
            </button>
          </div>
          {error.digest ? (
            <p
              style={{
                marginTop: 16,
                fontSize: 12,
                color: "#8a8d91",
                wordBreak: "break-all",
              }}
            >
              Ref: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
