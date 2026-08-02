import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);
  return { title: dict.siteName, description: dict.tagline };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <div className="flex flex-col">
      {/* Hero — one composition */}
      <section className="relative min-h-[min(72dvh,760px)] overflow-hidden rounded-2xl border border-line bg-ink text-white shadow-[0_30px_80px_rgba(11,28,44,0.18)] sm:rounded-[1.75rem]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(26,95,212,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 90%, rgba(91,141,239,0.25), transparent 50%), linear-gradient(145deg, #0b1c2c 0%, #12304a 55%, #0b1c2c 100%)",
          }}
        />
        {/* Abstract path / wire motif */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -right-8 top-8 h-[120%] w-[70%] opacity-40 sm:opacity-50"
          viewBox="0 0 600 700"
          fill="none"
        >
          <path
            d="M80 40 C180 120, 220 200, 160 280 C90 380, 320 420, 380 340 C450 250, 520 480, 420 560 C340 620, 200 580, 160 640"
            stroke="url(#gwWire)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="origin-center"
            style={{ animation: "gw-pulse-soft 7s ease-in-out infinite" }}
          />
          <circle cx="160" cy="280" r="6" fill="#8eb6ff" />
          <circle cx="380" cy="340" r="6" fill="#8eb6ff" />
          <circle cx="420" cy="560" r="8" fill="#ffffff" />
          <defs>
            <linearGradient id="gwWire" x1="80" y1="40" x2="420" y2="640">
              <stop stopColor="#8eb6ff" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#5b8def" stopOpacity="0.35" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 flex h-full flex-col justify-end gap-6 px-5 py-9 sm:gap-8 sm:px-10 sm:py-14 lg:max-w-[58%] lg:justify-center lg:py-16">
          <h1 className="gw-rise font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {dict.brand}
          </h1>
          <div className="gw-rise gw-rise-delay-1 space-y-3">
            <p className="max-w-xl text-xl font-semibold leading-snug tracking-tight text-white/95 sm:text-3xl">
              {dict.tagline}
            </p>
            <p className="max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
              {dict.heroSupport}
            </p>
          </div>
          <div className="gw-rise gw-rise-delay-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href={`/${locale}/eligibility`}
              className="gw-btn gw-btn-primary gw-btn-block-sm"
            >
              {dict.startEligibility}
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={`/${locale}/learn`}
              className="gw-btn gw-btn-secondary gw-btn-block-sm"
            >
              {dict.navLearn}
            </Link>
          </div>
          <p className="gw-rise gw-rise-delay-3 text-sm text-white/55">
            {dict.freeBadge} · {dict.officialBadge}
          </p>
        </div>
      </section>

      {/* Secondary: practice versions — below hero */}
      <section className="mt-14 sm:mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {dict.practiceHeading}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href={`/${locale}/practice/2008`}
            className="group rounded-2xl border border-line bg-surface/80 p-6 transition-all hover:-translate-y-0.5 hover:border-signal/35 hover:shadow-[0_16px_40px_rgba(11,28,44,0.08)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
              2008
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink group-hover:text-signal">
              {dict.practice2008}
            </p>
            <p className="mt-2 text-sm text-muted">{dict.practice2008Meta}</p>
          </Link>
          <Link
            href={`/${locale}/practice/2025`}
            className="group rounded-2xl border border-line bg-surface/80 p-6 transition-all hover:-translate-y-0.5 hover:border-signal/35 hover:shadow-[0_16px_40px_rgba(11,28,44,0.08)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-signal">
              2025
            </p>
            <p className="mt-2 text-xl font-semibold tracking-tight text-ink group-hover:text-signal">
              {dict.practice2025}
            </p>
            <p className="mt-2 text-sm text-muted">{dict.practice2025Meta}</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
