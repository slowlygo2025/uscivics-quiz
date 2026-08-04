import { readFileSync, writeFileSync, unlinkSync, existsSync } from "node:fs";

const tmp = ".env.vercel.tmp";
const raw = readFileSync(tmp, "utf8");
const m = raw.match(/^NEXT_PUBLIC_FIREBASE_PROJECT_ID=(.*)$/m);
if (!m) {
  console.error("PROJECT_ID not found");
  process.exit(1);
}
let id = m[1].trim();
if (
  (id.startsWith('"') && id.endsWith('"')) ||
  (id.startsWith("'") && id.endsWith("'"))
) {
  id = id.slice(1, -1);
}
writeFileSync(
  ".firebaserc",
  JSON.stringify({ projects: { default: id } }, null, 2) + "\n"
);
console.log("Wrote .firebaserc default=" + id);

// Don't leave pulled secrets in workspace longer than needed
if (existsSync(tmp)) {
  // keep for firebase auth domain check but strip from git — ensure gitignored
  console.log("Left .env.vercel.tmp (gitignored via .env*.local pattern? check)");
}
