import { logEvent, type Analytics } from "firebase/analytics";
import { readConsent } from "@/lib/consent";
import { getFirebaseAnalytics } from "@/lib/firebase";

export type AnalyticsParams = Record<
  string,
  string | number | boolean | undefined
>;

function cleanParams(params?: AnalyticsParams) {
  if (!params) return undefined;
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Fire a custom event only when marketing consent is granted and Firebase is configured. */
export async function trackEvent(
  name: string,
  params?: AnalyticsParams
): Promise<void> {
  if (typeof window === "undefined") return;
  if (readConsent() !== "all") return;
  try {
    const analytics: Analytics | null = await getFirebaseAnalytics();
    if (!analytics) return;
    logEvent(analytics, name, cleanParams(params));
  } catch {
    // Analytics must never break the study UI.
  }
}

export function trackAcceptConsent(choice: "all" | "essential") {
  return trackEvent("accept_consent", { choice });
}

export function trackStartPractice(version: string, senior: boolean) {
  return trackEvent("start_practice", {
    version,
    senior: senior ? "1" : "0",
  });
}

export function trackStudyMode(mode: string, version: string) {
  return trackEvent("select_study_mode", { mode, version });
}

export function trackSimEnd(passed: boolean, version: string, senior: boolean) {
  return trackEvent(passed ? "pass_sim" : "fail_sim", {
    version,
    senior: senior ? "1" : "0",
  });
}

export function trackEligibilityStart(result: string) {
  return trackEvent("eligibility_start_practice", { result });
}
