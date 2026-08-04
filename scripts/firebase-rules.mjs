/**
 * Print Firebase console checklist + optional `firebase deploy --only firestore:rules`.
 * Requires: firebase-tools logged in, FIREBASE project selected.
 *
 *   npm run firebase:rules
 */
import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

console.log(`
Firebase Auth + Firestore (USCivics Quiz cloud sync)
====================================================
1. Console → Authentication → Sign-in method → Email/Password → Enable
2. Console → Firestore → Create DB if missing (production mode is fine with our rules)
3. Deploy rules from repo:
     firebase login
     firebase use <NEXT_PUBLIC_FIREBASE_PROJECT_ID>
     firebase deploy --only firestore:rules

Rules file: firestore.rules
Path used by app: users/{uid}/data/progress
`);

const rc = join(root, ".firebaserc");
const hasRc = existsSync(rc);
if (!hasRc) {
  console.log("No .firebaserc yet — run: firebase use --add");
  process.exit(0);
}

const deploy = process.argv.includes("--deploy");
if (!deploy) {
  console.log("Dry run only. Pass --deploy to push rules:");
  console.log("  npm run firebase:rules -- --deploy");
  process.exit(0);
}

const r = spawnSync("npx", ["firebase", "deploy", "--only", "firestore:rules"], {
  cwd: root,
  encoding: "utf8",
  shell: true,
  stdio: "inherit",
});
process.exit(r.status ?? 1);
