import type { Dictionary } from "@/lib/dictionary";

/** Mirrors the USCIS “Check for Test Updates” filing-date notice (no outbound links). */
export default function TestVersionNotice({ dict }: { dict: Dictionary }) {
  return (
    <section className="gw-rise border border-line bg-surface">
      <div className="border-b border-line px-4 py-3 sm:px-5">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {dict.uscisUpdatesPageTitle}
        </h2>
      </div>

      <div className="gw-uscis-alert mx-4 mt-4 sm:mx-5" role="status">
        <p className="text-sm leading-relaxed text-ink sm:text-[0.9375rem]">
          <strong className="font-bold uppercase tracking-wide">
            {dict.uscisAlertLabel}
          </strong>{" "}
          {dict.uscisAlertBody}
        </p>
      </div>

      <div className="px-4 py-5 sm:px-5 sm:py-6">
        <div className="overflow-x-auto">
          <table className="gw-uscis-table w-full min-w-[20rem] border-collapse text-sm sm:text-base">
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

        <div className="mt-6 space-y-5">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold italic text-ink underline decoration-1 underline-offset-2 sm:text-lg">
              {dict.uscis2008Heading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {dict.uscis2008Body}
            </p>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-bold italic text-ink underline decoration-1 underline-offset-2 sm:text-lg">
              {dict.uscis2025Heading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              {dict.uscis2025Body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
