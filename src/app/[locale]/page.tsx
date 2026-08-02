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
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">{dict.siteName}</h1>
        <p className="mt-2 text-lg opacity-80">{dict.tagline}</p>
      </div>

      <Link
        href={`/${locale}/eligibility`}
        className="rounded-lg border border-black/10 dark:border-white/15 p-5 hover:bg-black/[.03] dark:hover:bg-white/[.06] transition-colors"
      >
        <p className="font-semibold">{dict.startEligibility}</p>
      </Link>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href={`/${locale}/practice/2008`}
          className="rounded-lg border border-black/10 dark:border-white/15 p-5 hover:bg-black/[.03] dark:hover:bg-white/[.06] transition-colors"
        >
          {dict.practice2008}
        </Link>
        <Link
          href={`/${locale}/practice/2025`}
          className="rounded-lg border border-black/10 dark:border-white/15 p-5 hover:bg-black/[.03] dark:hover:bg-white/[.06] transition-colors"
        >
          {dict.practice2025}
        </Link>
      </div>
    </div>
  );
}
