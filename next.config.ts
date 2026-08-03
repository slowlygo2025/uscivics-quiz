import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

/**
 * Security headers for all routes.
 * CSP allows Next, Firebase Analytics, Monetag (consent-gated), and Sentry.
 */
const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  [
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "https://quge5.com",
    "https://*.quge5.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://*.googleapis.com",
    "https://*.gstatic.com",
    "https://*.firebaseio.com",
    "https://*.firebase.com",
    "https://*.sentry-cdn.com",
    "https://browser.sentry-cdn.com",
  ].join(" "),
  [
    "connect-src 'self'",
    "https://quge5.com",
    "https://*.quge5.com",
    "https://www.google-analytics.com",
    "https://*.googleapis.com",
    "https://*.google.com",
    "https://*.firebaseio.com",
    "https://*.firebase.com",
    "https://firebase.googleapis.com",
    "https://firebaseinstallations.googleapis.com",
    "https://*.analytics.google.com",
    "https://repscontact.com",
    "https://*.ingest.sentry.io",
    "https://*.ingest.us.sentry.io",
    "https://*.ingest.de.sentry.io",
    "https://*.sentry.io",
  ].join(" "),
  "frame-src 'self' https://quge5.com https://*.quge5.com https://www.google.com",
  "worker-src 'self' blob:",
  "media-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), geolocation=(), microphone=(self), interest-cohort=(), browsing-topics=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin-allow-popups",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN?.trim() || undefined;
const sentryOrg = process.env.SENTRY_ORG?.trim() || undefined;
const sentryProject = process.env.SENTRY_PROJECT?.trim() || undefined;
const sentryUpload = Boolean(sentryAuthToken && sentryOrg && sentryProject);

export default withSentryConfig(nextConfig, {
  // EU org — DSN uses ingest.de.sentry.io
  sentryUrl: process.env.SENTRY_URL?.trim() || "https://de.sentry.io",
  org: sentryOrg,
  project: sentryProject,
  authToken: sentryAuthToken,
  // Quiet when not uploading (local/CI without secrets); verbose on Vercel upload builds
  silent: !sentryUpload || (!process.env.CI && !process.env.VERCEL),
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  telemetry: false,
  release: {
    name:
      process.env.SENTRY_RELEASE ||
      process.env.VERCEL_GIT_COMMIT_SHA ||
      undefined,
    create: sentryUpload,
    finalize: sentryUpload,
    // Vercel CLI uploads often lack a .git dir — skip set-commits
    setCommits: undefined,
    deploy:
      sentryUpload && process.env.VERCEL
        ? {
            env:
              process.env.NEXT_PUBLIC_VERCEL_ENV ||
              process.env.VERCEL_ENV ||
              "production",
          }
        : undefined,
  },
  sourcemaps: {
    disable: !sentryUpload,
    deleteSourcemapsAfterUpload: true,
  },
});
