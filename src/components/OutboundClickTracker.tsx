"use client";

import { useEffect } from "react";
import { trackOutboundClick } from "@/lib/analytics";

function isExternalHref(href: string, origin: string): boolean {
  if (!href || href.startsWith("#") || href.startsWith("javascript:")) {
    return false;
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:")) return true;
  try {
    const url = new URL(href, origin);
    return url.origin !== origin;
  } catch {
    return false;
  }
}

/**
 * Capture-phase listener for external / mailto / tel clicks.
 * Fires `outbound_click` when marketing consent is granted.
 */
export default function OutboundClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !isExternalHref(href, window.location.origin)) return;
      const label =
        anchor.getAttribute("aria-label") ||
        anchor.textContent?.trim().slice(0, 40) ||
        undefined;
      void trackOutboundClick(href, label);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
