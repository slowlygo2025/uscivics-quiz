import type { Dictionary } from "@/lib/dictionary";
import {
  USCIS_EXCEPTIONS,
  USCIS_HOME,
  USCIS_N400,
  USCIS_PDF_100_EN,
  USCIS_PDF_128_EN,
  USCIS_STUDY_FOR_TEST,
  USCIS_TEST_UPDATES,
  USCIS_2025_CIVICS,
} from "@/lib/uscis-links";

type Resource = {
  href: string;
  title: string;
  blurb: string;
};

export default function OfficialResources({ dict }: { dict: Dictionary }) {
  const items: Resource[] = [
    {
      href: USCIS_STUDY_FOR_TEST,
      title: dict.uscisStudyTitle,
      blurb: dict.uscisStudyBlurb,
    },
    {
      href: USCIS_TEST_UPDATES,
      title: dict.uscisUpdatesTitle,
      blurb: dict.uscisUpdatesBlurb,
    },
    {
      href: USCIS_2025_CIVICS,
      title: dict.uscis2025Title,
      blurb: dict.uscis2025Blurb,
    },
    {
      href: USCIS_EXCEPTIONS,
      title: dict.uscisExceptionsTitle,
      blurb: dict.uscisExceptionsBlurb,
    },
    {
      href: USCIS_N400,
      title: dict.uscisN400Title,
      blurb: dict.uscisN400Blurb,
    },
    {
      href: USCIS_PDF_128_EN,
      title: dict.uscisPdf128Title,
      blurb: dict.uscisPdf128Blurb,
    },
    {
      href: USCIS_PDF_100_EN,
      title: dict.uscisPdf100Title,
      blurb: dict.uscisPdf100Blurb,
    },
    {
      href: USCIS_HOME,
      title: dict.uscisHomeTitle,
      blurb: dict.uscisHomeBlurb,
    },
  ];

  return (
    <section className="mt-14 sm:mt-16">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {dict.uscisResourcesHeading}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
        {dict.uscisResourcesLead}
      </p>
      <ul className="mt-6 divide-y divide-line border border-line bg-surface">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col gap-1 px-4 py-4 transition-colors hover:bg-mist/80 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-5"
            >
              <span className="font-semibold text-signal underline-offset-2 hover:underline">
                {item.title}
              </span>
              <span className="text-sm text-muted sm:max-w-md sm:text-end">
                {item.blurb}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
