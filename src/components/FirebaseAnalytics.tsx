"use client";

import { useEffect } from "react";
import { readConsent } from "@/lib/consent";
import { getFirebaseAnalytics } from "@/lib/firebase";

/** Starts Firebase Analytics only after marketing consent. */
export default function FirebaseAnalytics() {
  useEffect(() => {
    if (readConsent() !== "all") return;
    void getFirebaseAnalytics();

    function onConsent(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "all") void getFirebaseAnalytics();
    }
    window.addEventListener("uscivics-consent", onConsent);
    return () => window.removeEventListener("uscivics-consent", onConsent);
  }, []);

  return null;
}
