import Link from "next/link";
import type { Dictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/types";

/** USCIS-style filing-date notice: alert + table + link to Updates hub. */
export default function TestVersionNotice({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale?: Locale;
}) {
  return (
    <section className="gw-rise overflow-hidden border border-line bg-surface shadow-[var(--shadow-soft)]">
      <div className="border-b border-line bg-mist/40 px-4 py-3.5 sm:px-5">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink sm:text-xl">
            {dict.uscisUpdatesPageTitle}
          </h2>
          {locale ? (
            <Link
              href={`/${locale}/updates`}
              className="text-sm font-semibold text-signal underline-offset-2 hover:underline"
            >
              {dict.homeLiveCta} →
            </Link>
          ) : null}
        </div>
      </div>

      <div className="gw-uscis-alert m-4 sm:m-5" role="status">
        <p className="text-sm leading-relaxed text-ink sm:text-[0.9375rem]">
          <strong className="font-bold uppercase tracking-wide">
            {dict.uscisAlertLabel}
          </strong>{" "}
          {dict.uscisAlertBody}
        </p>
      </div>

      <div className="px-4 pb-5 sm:px-5 sm:pb-6">
        <div className="overflow-x-auto">
          <table className="gw-uscis-table w-full min-w-[20rem] border-collapse text-sm sm:text-base">
            <caption className="sr-only">{dict.uscisUpdatesPageTitle}</caption>
            <thead>
              <tr>
                <th scope="col">{dict.uscisFilingColDate}</th>
                <th scope="col">{dict.uscisFilingColVersion}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dict.uscisFilingBefore}</td>
                <td className="font-semibold text-ink">
                  {dict.uscisFilingBeforeVersion}
                </td>
              </tr>
              <tr>
                <td>{dict.uscisFilingAfter}</td>
                <td className="font-semibold text-ink">
                  {dict.uscisFilingAfterVersion}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
