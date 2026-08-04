"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";
import { trackPremiumInterest } from "@/lib/analytics";

const KEY = "uscq_premium_waitlist";

export default function PremiumWaitlist({ dict }: { dict: Dictionary }) {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    try {
      setJoined(localStorage.getItem(KEY) === "1");
    } catch {
      /* ignore */
    }
  }, []);

  function join() {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    setJoined(true);
    void trackPremiumInterest();
  }

  return (
    <aside className="border border-line bg-surface px-4 py-4 sm:px-5">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold text-ink">
        {dict.premiumWaitlistTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {dict.premiumWaitlistLead}
      </p>
      {joined ? (
        <p className="mt-3 text-sm font-semibold text-signal">
          {dict.premiumWaitlistDone}
        </p>
      ) : (
        <button
          type="button"
          className="gw-btn gw-btn-secondary mt-3"
          onClick={join}
        >
          {dict.premiumWaitlistCta}
        </button>
      )}
    </aside>
  );
}
