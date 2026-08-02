import Link from "next/link";
import type { Metadata } from "next";
import type { Locale } from "@/lib/types";
import { getDictionary } from "@/lib/dictionary";
import BrandLogo from "@/components/BrandLogo";
import TestVersionNotice from "@/components/TestVersionNotice";

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
      <section
        className="relative min-h-[min(58dvh,640px)] overflow-hidden border border-line text-white sm:min-h-[min(64dvh,680px)]"
        style={{ background: "var(--hero-deep)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, var(--hero-deep) 0%, var(--hero-mid) 55%, var(--hero-deep) 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 end-0 w-1/3 opacity-30"
          style={{
            background:
              "repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(255,255,255,0.06) 12px, rgba(255,255,255,0.06) 24px)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col justify-end gap-5 px-5 py-9 sm:gap-6 sm:px-10 sm:py-14 lg:max-w-[62%] lg:justify-center lg:py-16">
          <h1 className="gw-rise">
            <BrandLogo
              title={dict.brand}
              subtitle={dict.officialBadge}
              variant="onDark"
              size="lg"
            />
          </h1>
          <div className="gw-rise gw-rise-delay-1 space-y-3">
            <p className="max-w-xl text-xl font-semibold leading-snug text-white sm:text-2xl">
              {dict.tagline}
            </p>
            <p className="max-w-md text-base leading-relaxed text-white/80 sm:text-lg">
              {dict.heroSupport}
            </p>
          </div>
          <div className="gw-rise gw-rise-delay-2">
            <Link
              href={`/${locale}/eligibility`}
              className="gw-btn gw-btn-block-sm bg-white font-bold text-[var(--hero-deep)] hover:bg-white/90"
            >
              {dict.startEligibility}
              <span aria-hidden>→</span>
            </Link>
          </div>
          <p className="gw-rise gw-rise-delay-3 text-sm text-white/70">
            {dict.freeBadge}
          </p>
        </div>
      </section>

      <div className="mt-10 sm:mt-12">
        <TestVersionNotice dict={dict} />
      </div>

      <section className="mt-14 sm:mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {dict.practiceHeading}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href={`/${locale}/practice/2008`}
            className="gw-card group p-6 transition-colors hover:border-signal"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
              2008
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-ink group-hover:text-signal">
              {dict.practice2008}
            </p>
            <p className="mt-2 text-sm text-muted">{dict.practice2008Meta}</p>
          </Link>
          <Link
            href={`/${locale}/practice/2025`}
            className="gw-card group p-6 transition-colors hover:border-signal"
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-signal">
              2025
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-ink group-hover:text-signal">
              {dict.practice2025}
            </p>
            <p className="mt-2 text-sm text-muted">{dict.practice2025Meta}</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
