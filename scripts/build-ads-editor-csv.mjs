import { writeFileSync } from "node:fs";

/** Digits-only Customer ID — Editor matches this format from exports. */
const ACCOUNT = "2078239713";

const headerWithAccount = [
  "Account",
  "Campaign",
  "Campaign Type",
  "Campaign Status",
  "Budget",
  "Budget type",
  "Bid Strategy Type",
  "Ad group",
  "Ad group status",
  "Max CPC",
  "Keyword",
  "Criterion Type",
  "Final URL",
];

const headerNoAccount = headerWithAccount.slice(1);

const body = [
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG Filing Date", "Paused", "0.55", "[n-400 filing date civics test]", "Exact", "https://uscivics-quiz.com/en/learn/n-400-filing-date?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=filing_date"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG Filing Date", "Paused", "0.50", "2008 vs 2025 civics test", "Phrase", "https://uscivics-quiz.com/en/eligibility?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=eligibility"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG Filing Date", "Paused", "0.50", "which civics test do i take", "Phrase", "https://uscivics-quiz.com/en/eligibility?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=eligibility"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG Filing Date", "Paused", "0.45", "n-400 civics test version", "Phrase", "https://uscivics-quiz.com/en/learn/n-400-filing-date?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=filing_date"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG 65-20", "Paused", "0.55", "[65/20 civics test]", "Exact", "https://uscivics-quiz.com/en/learn/65-20?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=6520"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG 65-20", "Paused", "0.50", "65 20 citizenship test", "Phrase", "https://uscivics-quiz.com/en/questions/senior?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=senior"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG 65-20", "Paused", "0.50", "starred civics questions", "Phrase", "https://uscivics-quiz.com/en/questions/senior?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=senior"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG 65-20", "Paused", "0.45", "citizenship test age 65", "Phrase", "https://uscivics-quiz.com/en/learn/65-20?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=6520"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG All 128", "Paused", "0.60", "[128 civics questions]", "Exact", "https://uscivics-quiz.com/en/questions/all-128?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=all128"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG All 128", "Paused", "0.55", "128 uscis civics questions", "Phrase", "https://uscivics-quiz.com/en/questions/all-128?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=all128"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG All 128", "Paused", "0.55", "citizenship test questions 2025", "Phrase", "https://uscivics-quiz.com/en/questions/all-128?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=all128"],
  ["USCQ Search Core", "Search", "Paused", "10.00", "Daily", "Manual cpc", "AG All 128", "Paused", "0.50", "citizenship practice test", "Phrase", "https://uscivics-quiz.com/en/practice/2025?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=practice2025"],
];

const withAccount = body.map((r) => [ACCOUNT, ...r]);

function escCsv(c) {
  const s = String(c);
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function toCsv(header, rows) {
  return [header, ...rows].map((r) => r.map(escCsv).join(",")).join("\r\n") + "\r\n";
}

function toTsv(header, rows) {
  return [header, ...rows].map((r) => r.join("\t")).join("\r\n") + "\r\n";
}

// Primary: NO Account — import from INSIDE the open account
writeFileSync("ads/google-ads-editor-paste.txt", toTsv(headerNoAccount, body), "utf8");
writeFileSync("ads/google-ads-editor-import.csv", "\uFEFF" + toCsv(headerNoAccount, body), "utf8");
writeFileSync("ads/google-ads-editor-simple.csv", "\uFEFF" + toCsv(headerNoAccount, body), "utf8");

// Alternate: with Account digits (for Accounts Manager multi-import)
writeFileSync("ads/google-ads-editor-paste-with-account.txt", toTsv(headerWithAccount, withAccount), "utf8");

const kwHeader = ["Campaign", "Ad group", "Keyword", "Criterion Type", "Max CPC", "Final URL"];
const kwRows = body.map((r) => [r[0], r[6], r[9], r[10], r[8], r[11]]);
writeFileSync("ads/google-ads-keywords-paste.txt", toTsv(kwHeader, kwRows), "utf8");

writeFileSync("ads/google-ads-editor-import-unicode.txt", "\uFEFF" + toCsv(headerNoAccount, body), "utf16le");

console.log("Primary paste has NO Account column (import inside open account)");
console.log("With-account uses digits:", ACCOUNT);
