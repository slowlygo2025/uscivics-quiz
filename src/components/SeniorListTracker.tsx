"use client";

import { useEffect } from "react";
import { trackSeniorListOpen } from "@/lib/analytics";

/** Fires once when the 65/20 starred question list page mounts. */
export default function SeniorListTracker() {
  useEffect(() => {
    void trackSeniorListOpen();
  }, []);
  return null;
}
