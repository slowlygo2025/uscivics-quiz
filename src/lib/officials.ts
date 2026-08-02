export type OfficialPerson = {
  name: string;
  party?: string | null;
  role: "senator" | "representative";
  district?: number | null;
  url?: string | null;
};

export type OfficialsResponse = {
  zip: string;
  state: string | null;
  stateName: string | null;
  capital: string | null;
  governor: string | null;
  senators: OfficialPerson[];
  representatives: OfficialPerson[];
  ambiguous: boolean;
  sourceNote: string;
};
