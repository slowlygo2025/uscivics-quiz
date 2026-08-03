/**
 * Install a newly downloaded GSC service-account JSON and revoke the previous key.
 *
 * After you create a key in Cloud Console (download JSON):
 *   npx tsx scripts/gsc-install-new-key.mjs "C:\Users\...\Downloads\uscivics-quiz-xxxxx.json"
 *
 * Steps this script does:
 * 1. Backup current secrets/gsc-service-account.json → *.json.bak
 * 2. Copy the download into secrets/gsc-service-account.json
 * 3. Smoke-test access token
 * 4. Try to delete the OLD key_id via IAM API (needs IAM API enabled)
 */
import {
  readFileSync,
  writeFileSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleAuth } from "google-auth-library";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY_PATH = join(__dirname, "../secrets/gsc-service-account.json");
const SA_EMAIL = "gsc-indexer@uscivics-quiz.iam.gserviceaccount.com";
const PROJECT = "uscivics-quiz";
const SA_RESOURCE = `projects/${PROJECT}/serviceAccounts/${SA_EMAIL}`;

const downloadArg = process.argv[2];
if (!downloadArg) {
  console.error(
    'Usage: npx tsx scripts/gsc-install-new-key.mjs "path\\to\\downloaded.json"'
  );
  process.exit(1);
}

const downloadPath = resolve(downloadArg);
if (!existsSync(downloadPath)) {
  console.error(`File not found: ${downloadPath}`);
  process.exit(1);
}

const newKey = JSON.parse(readFileSync(downloadPath, "utf8"));
if (newKey.type !== "service_account" || !newKey.private_key_id) {
  console.error("Not a valid service_account JSON key file.");
  process.exit(1);
}
if (newKey.client_email && newKey.client_email !== SA_EMAIL) {
  console.error(
    `Expected ${SA_EMAIL}, got ${newKey.client_email}. Aborting.`
  );
  process.exit(1);
}

let oldKeyId = null;
if (existsSync(KEY_PATH)) {
  const oldKey = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  oldKeyId = oldKey.private_key_id || null;
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = join(
    __dirname,
    `../secrets/gsc-service-account.OLD-${(oldKeyId || "unknown").slice(0, 8)}-${stamp}.json.bak`
  );
  copyFileSync(KEY_PATH, backupPath);
  console.log(`Backed up old key → ${backupPath}`);
  console.log(`Old key_id: ${oldKeyId}`);
}

writeFileSync(KEY_PATH, JSON.stringify(newKey, null, 2) + "\n", "utf8");
console.log(`Installed new key_id: ${newKey.private_key_id}`);
console.log(`→ ${KEY_PATH}`);

const auth = new GoogleAuth({
  credentials: newKey,
  scopes: ["https://www.googleapis.com/auth/indexing"],
});
const token = await auth.getAccessToken();
if (!token) {
  console.error("Smoke test failed: could not get access token.");
  process.exit(1);
}
console.log("Smoke test OK (Indexing scope token).");

if (!oldKeyId || oldKeyId === newKey.private_key_id) {
  console.log("No distinct old key to revoke.");
  process.exit(0);
}

console.log(`\nRevoking old key ${oldKeyId}…`);
try {
  const authIam = new GoogleAuth({
    credentials: newKey,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await authIam.getClient();
  await client.request({
    url: `https://iam.googleapis.com/v1/${SA_RESOURCE}/keys/${oldKeyId}`,
    method: "DELETE",
  });
  console.log("Old key deleted (revoked). Rotation complete.");
} catch (e) {
  const err = e?.response?.data?.error || e?.response?.data || e.message;
  console.error("Could not auto-delete old key:");
  console.error(typeof err === "string" ? err : JSON.stringify(err, null, 2));
  console.error(`
Delete it manually (critical if the old key leaked):
1. Enable IAM API if needed:
   https://console.developers.google.com/apis/api/iam.googleapis.com/overview?project=833452538943
2. Open Keys for ${SA_EMAIL}:
   https://console.cloud.google.com/iam-admin/serviceaccounts?project=${PROJECT}
3. Delete key_id: ${oldKeyId}
`);
  process.exit(1);
}
