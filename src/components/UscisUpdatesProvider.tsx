"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  FALLBACK_USCIS_UPDATES,
  getFederalAnswersForQuestion as getAnswers,
  type FederalOfficial,
  type UscisUpdatesPayload,
} from "@/lib/federal-officials";
import type { TestVersion } from "@/lib/types";
import { useUscisUpdates } from "@/hooks/useUscisUpdates";

const UscisCtx = createContext<UscisUpdatesPayload>(FALLBACK_USCIS_UPDATES);

export function UscisUpdatesProvider({ children }: { children: ReactNode }) {
  const data = useUscisUpdates();
  return <UscisCtx.Provider value={data}>{children}</UscisCtx.Provider>;
}

export function useUscisUpdatesContext() {
  return useContext(UscisCtx);
}

export function useFederalOfficialsLive(): FederalOfficial[] {
  return useUscisUpdatesContext().officials;
}

export function useFederalAnswers(
  version: TestVersion,
  questionId: number
): string[] | null {
  const { officials } = useUscisUpdatesContext();
  return getAnswers(version, questionId, officials);
}
