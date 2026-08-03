/**
 * Weekly organic SEO ritual (insights + report).
 * Usage: npm run gsc:weekly
 */
import { spawnSync } from "node:child_process";

const steps = [
  ["npm", ["run", "gsc:insights", "--", "--days=28", "--minImpressions=25", "--maxCtr=0.05"]],
  ["npm", ["run", "gsc:report"]],
];

console.log("══ GSC weekly ritual ══\nSee ads/SEO-OPS.md\n");

let failed = 0;
for (const [cmd, args] of steps) {
  console.log(`\n→ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", shell: true });
  if (r.status !== 0) {
    failed++;
    console.error(`Step failed with exit ${r.status}`);
  }
}

console.log("\n══ Done ══");
console.log("Next: if Tier 2 incomplete → npm run gsc:tier -- 2 (quota resets daily)");
console.log("Money copy changes → deploy then npm run gsc:tier -- 1");
process.exit(failed ? 1 : 0);
