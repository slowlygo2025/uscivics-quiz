/**
 * CI sanity: firestore.rules must be versioned and least-privilege.
 * Deploy remains: npm run firebase:rules -- --deploy
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const rulesPath = join(root, "firestore.rules");
const firebaseJson = join(root, "firebase.json");

let failed = 0;

function fail(msg) {
  failed++;
  console.error("FAIL", msg);
}

if (!existsSync(rulesPath)) {
  fail("missing firestore.rules");
} else {
  const rules = readFileSync(rulesPath, "utf8");
  if (!rules.includes("rules_version")) fail("firestore.rules missing rules_version");
  if (!/match\s+\/users\/\{userId\}/.test(rules)) {
    fail("firestore.rules missing users/{userId} path");
  }
  if (!/docId\s*==\s*"progress"/.test(rules) && !/docId == "progress"/.test(rules)) {
    fail('firestore.rules must restrict docId == "progress"');
  }
  if (!/request\.auth\s*!=\s*null/.test(rules)) {
    fail("firestore.rules must require request.auth");
  }
  if (!/allow read, write:\s*if false/.test(rules)) {
    fail("firestore.rules must deny-by-default catch-all");
  }
  if (!failed) console.log("OK   firestore.rules least-privilege shape");
}

if (!existsSync(firebaseJson)) {
  fail("missing firebase.json");
} else {
  const cfg = JSON.parse(readFileSync(firebaseJson, "utf8"));
  if (cfg?.firestore?.rules !== "firestore.rules") {
    fail('firebase.json must point firestore.rules → "firestore.rules"');
  } else {
    console.log("OK   firebase.json rules path");
  }
}

if (failed) {
  console.error(`check-firestore-rules failed (${failed})`);
  process.exit(1);
}
console.log("check-firestore-rules passed");
