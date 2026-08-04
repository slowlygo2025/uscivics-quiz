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

/** Primary quiz completion signal for Ads (fired with pass_sim / fail_sim). */
export function trackCompleteQuiz(
  passed: boolean,
  version: string,
  senior: boolean
) {
  return trackEvent("complete_quiz", {
    passed: passed ? "1" : "0",
    version,
    senior: senior ? "1" : "0",
  });
}

export function trackEligibilityStart(result: string) {
  return trackEvent("eligibility_start_practice", { result });
}

/** Fired when the eligibility wizard reaches a result (not only CTA click). */
export function trackEligibilityComplete(result: string) {
  return trackEvent("eligibility_complete", { result });
}

export function trackSeniorListOpen() {
  return trackEvent("senior_list_open");
}

/** External link click (USCIS, mailto, etc.) — secondary engagement signal. */
export function trackOutboundClick(url: string, label?: string) {
  let host = url;
  try {
    host = new URL(url, window.location.origin).hostname;
  } catch {
    /* keep raw */
  }
  return trackEvent("outbound_click", {
    link_url: url.slice(0, 100),
    link_host: host.slice(0, 50),
    ...(label ? { link_label: label.slice(0, 40) } : {}),
  });
}

/** Soft monetization interest (Phase 0 waitlist) — never gates practice. */
export function trackPremiumInterest() {
  return trackEvent("premium_interest", { source: "practice_hub" });
}

/** Phase 1 affiliate outbound click. */
export function trackAffiliateClick(
  itemId: string,
  source: "learn" | "sim_complete"
) {
  return trackEvent("affiliate_click", {
    item_id: itemId.slice(0, 40),
    source,
  });
}
