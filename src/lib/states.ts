/**
 * State capitals (stable) + governors — sourced from `src/data/governors.ts`.
 * Refresh: `npm run scrape:governors` or cron `/api/cron/governors`.
 */
import {
  GOVERNORS,
  GOVERNORS_AS_OF,
  type GovernorRecord,
} from "@/data/governors";

export type StateInfo = GovernorRecord;
export { GOVERNORS_AS_OF };

export const STATES: Record<string, StateInfo> = GOVERNORS;

export function getStateInfo(code: string): StateInfo | null {
  return STATES[code.toUpperCase()] ?? null;
}
