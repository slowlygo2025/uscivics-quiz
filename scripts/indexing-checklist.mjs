/**
 * Print GSC indexing checklist URLs.
 * Usage: node scripts/indexing-checklist.mjs
 */
import { writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

async function main() {
  const mod = await import("../src/lib/indexing-priority.ts");
  const rows = mod.buildIndexingChecklist(["en", "es"]);
  const lines = [
    "# USCivics Quiz — GSC indexing checklist",
    "",
    ...mod.INDEXING_STEPS.map((s, i) => `${i + 1}. ${s}`),
    "",
    "| Tier | Locale | Why | URL |",
    "| --- | --- | --- | --- |",
    ...rows.map(
      (r) => `| ${r.tier} | ${r.locale} | ${r.why.replace(/\|/g, "/")} | ${r.url} |`
    ),
    "",
  ];
  const out = "indexing-checklist.md";
  writeFileSync(out, lines.join("\n"), "utf8");
  console.log(`Wrote ${out} (${rows.length} URLs)`);
  console.log(`Open ${mod.SITE_ORIGIN}/en/indexing-checklist after deploy`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
