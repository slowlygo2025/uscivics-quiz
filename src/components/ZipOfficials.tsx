"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionary";
import type { OfficialsResponse } from "@/lib/officials";
import { USCIS_TEST_UPDATES_URL } from "@/lib/changing-answers";

const ZIP_STORAGE_KEY = "uscivics-zip";

export default function ZipOfficials({ dict }: { dict: Dictionary }) {
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<OfficialsResponse | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ZIP_STORAGE_KEY);
      if (saved && /^\d{5}$/.test(saved)) {
        setZip(saved);
        void lookup(saved);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once
  }, []);

  async function lookup(value: string) {
    const clean = value.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(clean)) {
      setError(dict.zipInvalid);
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/officials?zip=${clean}`);
      const data = await res.json();
      if (!res.ok) {
        setResult(null);
        setError(data.error ?? dict.zipError);
        return;
      }
      setResult(data as OfficialsResponse);
      try {
        localStorage.setItem(ZIP_STORAGE_KEY, clean);
      } catch {
        // ignore
      }
    } catch {
      setResult(null);
      setError(dict.zipError);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void lookup(zip);
  }

  return (
    <section className="rounded-2xl border border-line bg-surface/90 p-5 sm:p-6">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-ink">
        {dict.zipTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{dict.zipLead}</p>

      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
      >
        <label className="sr-only" htmlFor="zip-input">
          {dict.zipPlaceholder}
        </label>
        <input
          id="zip-input"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          placeholder={dict.zipPlaceholder}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
          className="w-full rounded-full border border-line bg-paper px-4 py-3 text-base font-medium text-ink outline-none transition-colors placeholder:text-muted focus:border-signal sm:max-w-[10rem] sm:py-2.5 sm:text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="gw-btn gw-btn-primary gw-btn-block-sm disabled:opacity-60"
        >
          {loading ? dict.zipLoading : dict.zipSubmit}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-sm font-medium text-miss" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="gw-fade mt-6 space-y-5">
          <p className="text-sm text-ink-soft">
            <span className="font-semibold text-ink">{result.stateName ?? result.state}</span>
            {result.stateName && result.state ? ` (${result.state})` : null}
            {" · "}
            ZIP {result.zip}
          </p>

          {result.ambiguous && (
            <p className="rounded-xl border border-amber/25 bg-amber-soft/80 px-3 py-2 text-sm text-amber">
              {dict.zipAmbiguous}
            </p>
          )}

          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <OfficialBlock
              label={dict.zipSenators}
              items={result.senators.map((s) => s.name)}
            />
            <OfficialBlock
              label={dict.zipRepresentatives}
              items={
                result.representatives.length
                  ? result.representatives.map((r) =>
                      r.district != null
                        ? `${r.name} (District ${r.district})`
                        : r.name
                    )
                  : []
              }
            />
            <OfficialBlock
              label={dict.zipGovernor}
              items={result.governor ? [result.governor] : []}
            />
            <OfficialBlock
              label={dict.zipCapital}
              items={result.capital ? [result.capital] : []}
            />
          </dl>

          <p className="text-xs leading-relaxed text-muted">
            {dict.zipVerify}{" "}
            <a
              href={USCIS_TEST_UPDATES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-signal underline-offset-2 hover:underline"
            >
              {dict.changingBannerLink}
            </a>
          </p>
        </div>
      )}
    </section>
  );
}

function OfficialBlock({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl bg-mist/55 px-4 py-3">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 space-y-1 text-sm font-medium text-ink">
        {items.length === 0 ? (
          <span className="text-muted">—</span>
        ) : (
          items.map((item) => <p key={item}>{item}</p>)
        )}
      </dd>
    </div>
  );
}
