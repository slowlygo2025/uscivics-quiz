"use client";

import { useEffect, useState } from "react";
import {
  FALLBACK_USCIS_UPDATES,
  type FederalOfficial,
  type UscisUpdatesPayload,
} from "@/lib/federal-officials";

/** Live USCIS scrape with committed JSON fallback. */
export function useUscisUpdates() {
  const [data, setData] = useState<UscisUpdatesPayload>(FALLBACK_USCIS_UPDATES);

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/uscis-updates")
      .then((r) => r.json())
      .then((payload: UscisUpdatesPayload) => {
        if (cancelled) return;
        if (payload?.officials?.length) setData(payload);
      })
      .catch(() => {
        /* keep fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}

export function useFederalOfficials(): FederalOfficial[] {
  return useUscisUpdates().officials;
}
