import type { ErrorEvent } from "@sentry/core";

/**
 * Shared Sentry init options for browser / Node / edge.
 * SDK is no-op when NEXT_PUBLIC_SENTRY_DSN is unset.
 */
export function getSharedSentryOptions(runtime: "client" | "server" | "edge") {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN?.trim() || undefined;
  const isDev = process.env.NODE_ENV === "development";
  const release =
    process.env.SENTRY_RELEASE ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    undefined;

  const ignoreErrors = [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    "Non-Error promise rejection captured",
    // Benign React hydration mismatches (extensions, SVG quirks, theme boot)
    "Hydration failed because the server rendered HTML didn't match the client",
    "Hydration failed - the server rendered HTML didn't match the client",
    "There was an error while hydrating",
    "Text content does not match server-rendered HTML",
    "Minified React error #418",
    "Minified React error #423",
    "Minified React error #425",
    /hydrat/i,
    // Next.js Turbopack / React Flight race — dev-only (often Cursor Electron preview)
    "chunk.reason.enqueueModel is not a function",
    /enqueueModel is not a function/i,
    /chunk\.reason\.(enqueueModel|error) is not a function/i,
  ];

  const base = {
    dsn,
    // Don't spam Sentry from `next dev` / Cursor Simple Browser (Electron)
    enabled: Boolean(dsn) && !isDev,
    environment:
      process.env.NEXT_PUBLIC_VERCEL_ENV ||
      process.env.VERCEL_ENV ||
      process.env.NODE_ENV ||
      "development",
    release,
    sendDefaultPii: false,
    tracesSampleRate: isDev ? 1.0 : 0.1,
    ignoreErrors,
    beforeSend(event: ErrorEvent) {
      const ua =
        event.request?.headers?.["User-Agent"] ||
        event.request?.headers?.["user-agent"] ||
        "";
      if (/Electron/i.test(ua)) return null;
      if (event.contexts?.runtime?.name === "Electron") return null;
      return event;
    },
  };

  if (runtime !== "client") {
    return base;
  }

  return {
    ...base,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: dsn && !isDev ? 1.0 : 0,
  };
}

export function isSentryConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN?.trim());
}
