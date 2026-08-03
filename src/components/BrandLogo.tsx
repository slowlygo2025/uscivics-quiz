"use client";

import { useId } from "react";

type BrandLogoProps = {
  /** Visible brand name (localized). */
  title: string;
  /** Optional second line under the mark. */
  subtitle?: string;
  /** Color scheme for header (dark blue) vs paper backgrounds. */
  variant?: "onDark" | "onLight";
  /** Compact header lockup vs larger hero. */
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * Original seal + wordmark for USCivics Quiz.
 * Lockup structure inspired by official agency branding — not a copy of USCIS/DHS marks.
 */
export default function BrandLogo({
  title,
  subtitle = "Civics practice",
  variant = "onDark",
  size = "md",
  className = "",
}: BrandLogoProps) {
  const uid = useId().replace(/:/g, "");
  const onDark = variant === "onDark";
  const ink = onDark ? "#ffffff" : "#005288";
  const muted = onDark ? "rgba(255,255,255,0.72)" : "#5a5b5d";
  const sealStroke = onDark ? "#c0c2c4" : "#8a8d91";
  const sealFill = onDark ? "#003a5d" : "#f0f4f8";
  const accent = "#c41230";
  const ringId = `seal-ring-${uid}`;

  const seal = size === "lg" ? 76 : size === "sm" ? 42 : 52;
  const titleClass =
    size === "lg"
      ? "text-2xl sm:text-3xl leading-[1.15]"
      : size === "sm"
        ? "text-[0.95rem] sm:text-base leading-tight"
        : "text-lg sm:text-[1.2rem] leading-tight";
  const subClass =
    size === "lg" ? "text-xs sm:text-sm mt-1.5" : "text-[0.62rem] sm:text-[0.7rem] mt-0.5";

  const parts = title.trim().split(/\s+/);
  const line1 = parts[0] ?? title;
  const line2 = parts.slice(1).join(" ") || "Quiz";

  return (
    <span
      className={`inline-flex items-center gap-3 min-w-0 ${className}`}
      style={{ color: ink }}
    >
      <svg
        width={seal}
        height={seal}
        viewBox="0 0 64 64"
        aria-hidden
        className="shrink-0"
      >
        <defs>
          <path
            id={ringId}
            d="M32,32 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0"
          />
        </defs>
        <circle
          cx="32"
          cy="32"
          r="31"
          fill={sealFill}
          stroke={sealStroke}
          strokeWidth="1.5"
        />
        <circle
          cx="32"
          cy="32"
          r="27.5"
          fill="none"
          stroke={sealStroke}
          strokeWidth="0.85"
        />
        <text
          fill={ink}
          fontSize="4.2"
          fontFamily="system-ui, sans-serif"
          fontWeight="700"
          letterSpacing="1.6"
        >
          <textPath href={`#${ringId}`} startOffset="8%">
            USCIVICS PRACTICE
          </textPath>
        </text>
        <g fill={ink}>
          <circle cx="32" cy="18" r="1.2" />
          <circle cx="26.5" cy="19.8" r="1" />
          <circle cx="37.5" cy="19.8" r="1" />
        </g>
        <path
          d="M16 27c5.8-1.8 10.4-1.1 16 2 5.6-3.1 10.2-3.8 16-2v14.5c-5.8-1.7-10.4-1-16 2.1-5.6-3.1-10.2-3.8-16-2.1V27z"
          fill={ink}
          opacity="0.94"
        />
        <path
          d="M32 29.1v14.4"
          stroke={sealFill}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M19.5 31.8h8.5M19.5 34.8h7.5M19.5 37.8h6.5M36 31.8h8.5M36 34.8h7.5M36 37.8h6.5"
          stroke={sealFill}
          strokeWidth="1.05"
          strokeLinecap="round"
          opacity="0.88"
        />
        <rect x="22" y="47.5" width="20" height="2" rx="0.35" fill={accent} />
      </svg>

      <span className="min-w-0 flex flex-col justify-center">
        <span
          className={`font-[family-name:var(--font-display)] font-bold tracking-[-0.015em] ${titleClass}`}
        >
          <span className="block truncate">{line1}</span>
          {line2 ? (
            <span className="block truncate opacity-95">{line2}</span>
          ) : null}
        </span>
        {subtitle ? (
          <span
            className={`font-sans font-semibold uppercase tracking-[0.14em] ${subClass}`}
            style={{ color: muted }}
          >
            {subtitle}
          </span>
        ) : null}
      </span>
    </span>
  );
}
