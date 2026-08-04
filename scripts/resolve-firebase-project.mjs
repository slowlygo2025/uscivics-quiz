import { existsSync, readFileSync, writeFileSync } from "node:fs";

function projectFrom(file) {
  if (!existsSync(file)) return null;
  const t = readFileSync(file, "utf8");
  const m = t.match(/^NEXT_PUBLIC_FIREBASE_PROJECT_ID=(.*)$/m);
  if (!m) return null;
  let v = m[1].trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  if (!v || v === "[SENSITIVE]" || !/^[a-z0-9-]+$/.test(v)) return null;
  return v;
}

const id =
  projectFrom(".env.local") ||
  projectFrom(".env") ||
  projectFrom(".env.vercel.tmp");

if (!id) {
  console.log("NO_PROJECT_ID");
  process.exit(2);
}

writeFileSync(
  ".firebaserc",
  JSON.stringify({ projects: { default: id } }, null, 2) + "\n"
);
console.log("OK " + id);
