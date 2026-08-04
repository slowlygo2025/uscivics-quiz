"use client";

import { useId, useState } from "react";
import type { Dictionary } from "@/lib/dictionary";

function UsFlagIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="14"
      viewBox="0 0 20 14"
      aria-hidden
      focusable="false"
    >
      <rect width="20" height="14" fill="#fff" />
      <rect y="0" width="20" height="1.08" fill="#b22234" />
      <rect y="2.15" width="20" height="1.08" fill="#b22234" />
      <rect y="4.31" width="20" height="1.08" fill="#b22234" />
      <rect y="6.46" width="20" height="1.08" fill="#b22234" />
      <rect y="8.62" width="20" height="1.08" fill="#b22234" />
      <rect y="10.77" width="20" height="1.08" fill="#b22234" />
      <rect y="12.92" width="20" height="1.08" fill="#b22234" />
      <rect width="8" height="7.55" fill="#3c3b6e" />
    </svg>
  );
}

/** Disclosure strip: not a .gov site — clear, high-contrast, no impersonation. */
export default function OfficialSiteBanner({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="gw-gov-banner">
      <div className="gw-gov-banner__inner">
        <div className="gw-gov-banner__cluster">
          <div className="gw-gov-banner__row">
            <UsFlagIcon className="gw-gov-banner__flag" />
            <p className="gw-gov-banner__lead">
              <span className="gw-gov-banner__badge">{dict.govBannerBadge}</span>
              <span className="gw-gov-banner__text">{dict.govBannerLead}</span>{" "}
              <button
                type="button"
                className="gw-gov-banner__toggle"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
              >
                {dict.govBannerHow}
                <span
                  aria-hidden
                  className={`gw-gov-banner__chevron ${open ? "is-open" : ""}`}
                />
              </button>
            </p>
          </div>

          {open ? (
            <div id={panelId} className="gw-gov-banner__panel" role="region">
              <div className="gw-gov-banner__card">
                <p className="gw-gov-banner__card-title">
                  {dict.govBannerOfficialTitle}
                </p>
                <p className="gw-gov-banner__card-body">
                  {dict.govBannerOfficial}
                </p>
              </div>
              <div className="gw-gov-banner__card">
                <p className="gw-gov-banner__card-title">
                  {dict.govBannerSecureTitle}
                </p>
                <p className="gw-gov-banner__card-body">
                  {dict.govBannerSecure}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
