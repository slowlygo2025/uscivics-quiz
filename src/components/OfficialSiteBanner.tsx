"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

/** USCIS-style top banner: clear that this is NOT a .gov site. */
export default function OfficialSiteBanner({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-line bg-[#f0f0f0] text-[0.8125rem] text-[#1b1b1b] dark:border-line dark:bg-[#1a2330] dark:text-ink">
      <div className="mx-auto flex max-w-5xl items-start gap-2 px-4 py-2 sm:px-6">
        <span
          aria-hidden
          className="mt-0.5 inline-block h-3.5 w-5 shrink-0 rounded-[1px] bg-[linear-gradient(180deg,#b22234_0_27%,#fff_27%_36%,#3c3b6e_36%_45%,#fff_45%_55%,#b22234_55%_64%,#fff_64%_73%,#3c3b6e_73%_100%)]"
        />
        <div className="min-w-0 flex-1">
          <p className="leading-snug">
            <span className="font-semibold">{dict.govBannerLead}</span>{" "}
            <button
              type="button"
              className="font-semibold text-[#005288] underline-offset-2 hover:underline dark:text-signal"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {dict.govBannerHow}
            </button>
          </p>
          {open && (
            <div className="mt-2 grid gap-3 border-t border-[#c9c9c9] pt-2 dark:border-line sm:grid-cols-2">
              <p className="leading-relaxed text-[#565c65] dark:text-muted">
                {dict.govBannerOfficial}
              </p>
              <p className="leading-relaxed text-[#565c65] dark:text-muted">
                {dict.govBannerSecure}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
