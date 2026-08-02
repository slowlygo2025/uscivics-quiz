import type { TestVersion } from "./types";
import fallback from "@/data/uscis-test-updates.json";

export type FederalOffice =
  | "president"
  | "vicePresident"
  | "speaker"
  | "chiefJustice"
  | "presidentParty";

export type FederalOfficial = {
  office: FederalOffice;
  name: string;
  answers: string[];
  questionIds: Record<TestVersion, number | null>;
};

export type UscisUpdatesPayload = {
  source: string;
  scrapedAt: string;
  alert: string | null;
  officials: FederalOfficial[];
  extras?: { supremeCourtJustices?: string | null };
  rawCounts?: Record<string, number>;
  live?: boolean;
};

const OFFICE_ORDER: FederalOffice[] = [
  "president",
  "vicePresident",
  "speaker",
  "chiefJustice",
  "presidentParty",
];

function normalizeOfficials(
  rows: Array<{
    office: string;
    name: string;
    answers: string[];
    questionIds: Record<string, number | null>;
  }>
): FederalOfficial[] {
  const mapped = rows
    .filter((r) => OFFICE_ORDER.includes(r.office as FederalOffice))
    .map((r) => ({
      office: r.office as FederalOffice,
      name: r.name,
      answers: r.answers,
      questionIds: {
        "2008": r.questionIds["2008"] ?? null,
        "2025": r.questionIds["2025"] ?? null,
      },
    }));

  return OFFICE_ORDER.map(
    (office) => mapped.find((m) => m.office === office)!
  ).filter(Boolean);
}

/** Snapshot committed at build time (from `npm run scrape:uscis`). */
export const FALLBACK_USCIS_UPDATES: UscisUpdatesPayload = {
  source: fallback.source,
  scrapedAt: fallback.scrapedAt,
  alert: fallback.alert,
  officials: normalizeOfficials(fallback.officials),
  extras: fallback.extras,
  rawCounts: fallback.rawCounts,
  live: false,
};

export const FEDERAL_OFFICIALS: FederalOfficial[] =
  FALLBACK_USCIS_UPDATES.officials;

export const FEDERAL_OFFICIALS_AS_OF = FALLBACK_USCIS_UPDATES.scrapedAt.slice(
  0,
  10
);

export function getFederalAnswersForQuestion(
  version: TestVersion,
  questionId: number,
  officials: FederalOfficial[] = FEDERAL_OFFICIALS
): string[] | null {
  const hit = officials.find((o) => o.questionIds[version] === questionId);
  return hit ? hit.answers : null;
}

export function asOfDate(scrapedAt: string): string {
  return scrapedAt.slice(0, 10);
}
