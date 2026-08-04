import type { Dictionary } from "@/lib/dictionary";

type Variant = "hero" | "compact";

/**
 * Four competitive pillars — shared across money landings.
 * Typography-led strip (no marketing cards).
 */
export default function TrustDiffStrip({
  dict,
  variant = "compact",
  onDark = false,
}: {
  dict: Dictionary;
  variant?: Variant;
  /** White text for photo heroes */
  onDark?: boolean;
}) {
  const items = [
    dict.diffNoSignup,
    dict.diffRightBank,
    dict.diffOfficialPractice,
    dict.diffLanguages,
  ];

  const ink = onDark ? "text-white/90" : "text-ink";
  const muted = onDark ? "text-white/70" : "text-muted";
  const rule = onDark ? "border-white/25" : "border-line";

  return (
    <section
      aria-label={dict.diffStripAria}
      className={
        variant === "hero"
          ? `gw-trust-strip gw-trust-strip--hero ${rule}`
          : `gw-trust-strip gw-trust-strip--compact ${rule}`
      }
    >
      <ul className="gw-trust-strip__list">
        {items.map((text) => (
          <li key={text} className={`gw-trust-strip__item ${ink}`}>
            <span className={`gw-trust-strip__mark ${muted}`} aria-hidden>
              —
            </span>
            <span className={variant === "hero" ? "text-sm sm:text-[0.95rem] leading-snug font-medium" : "text-sm leading-snug"}>
              {text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
