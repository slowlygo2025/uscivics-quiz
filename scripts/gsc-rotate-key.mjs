/**
 * Rotate GSC Indexing service-account key.
 *
 * 1) Creates a NEW user-managed key via IAM API (using current key).
 * 2) Writes it to secrets/gsc-service-account.json (backs up the old file).
 * 3) Deletes the OLD key by private_key_id (revokes leaked credential).
 *
 * Requires the SA (or the caller) to have iam.serviceAccountKeys.create/delete
 * on gsc-indexer@uscivics-quiz.iam.gserviceaccount.com
 *
 * Usage: npx tsx scripts/gsc-rotate-key.mjs
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { GoogleAuth } from "google-auth-library";

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY_PATH = join(__dirname, "../secrets/gsc-service-account.json");
const SA_EMAIL = "gsc-indexer@uscivics-quiz.iam.gserviceaccount.com";
const PROJECT = "uscivics-quiz";
const SA_RESOURCE = `projects/${PROJECT}/serviceAccounts/${SA_EMAIL}`;

async function main() {
  if (!existsSync(KEY_PATH)) {
    console.error(`Missing ${KEY_PATH}`);
    process.exit(1);
  }

  const oldKey = JSON.parse(readFileSync(KEY_PATH, "utf8"));
  const oldKeyId = oldKey.private_key_id;
  if (!oldKeyId) {
    console.error("Current JSON has no private_key_id");
    process.exit(1);
  }

  console.log(`SA: ${oldKey.client_email || SA_EMAIL}`);
  console.log(`Old key_id: ${oldKeyId}`);

  const auth = new GoogleAuth({
    credentials: oldKey,
    scopes: ["https://www.googleapis.com/auth/cloud-platform"],
  });
  const client = await auth.getClient();

  console.log("\nCreating new key…");
  let created;
  try {
    const res = await client.request({
      url: `https://iam.googleapis.com/v1/${SA_RESOURCE}/keys`,
      method: "POST",
      data: {
        privateKeyType: "TYPE_GOOGLE_CREDENTIALS_FILE",
        keyAlgorithm: "KEY_ALG_RSA_2048",
      },
    });
    created = res.data;
  } catch (e) {
    const err = e?.response?.data || e.message;
    console.error("\nFAILED to create key via API.");
    console.error(typeof err === "string" ? err : JSON.stringify(err, null, 2));
    console.error(`
Manual fallback (Google Cloud Console):
1. https://console.cloud.google.com/iam-admin/serviceaccounts?project=${PROJECT}
2. Open ${SA_EMAIL} → Keys → Add key → Create new key → JSON
3. Save download as secrets/gsc-service-account.json (backup the old file first)
4. Delete OLD key_id ${oldKeyId} in the Keys list
`);
    process.exit(1);
  }

  if (!created?.privateKeyData) {
    console.error("API response missing privateKeyData", created);
    process.exit(1);
  }

  const newJson = Buffer.from(created.privateKeyData, "base64").toString("utf8");
  const newKey = JSON.parse(newJson);
  const newKeyId = newKey.private_key_id;
  console.log(`New key_id: ${newKeyId}`);

  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupPath = join(
    __dirname,
    `../secrets/gsc-service-account.OLD-${oldKeyId.slice(0, 8)}-${stamp}.json.bak`
  );
  copyFileSync(KEY_PATH, backupPath);
  writeFileSync(KEY_PATH, JSON.stringify(newKey, null, 2) + "\n", "utf8");
  console.log(`Backed up old → ${backupPath}`);
  console.log(`Wrote new → ${KEY_PATH}`);

  // Smoke: authenticate with NEW key
  console.log("\nSmoke-testing new key (token)…");
  const authNew = new GoogleAuth({
    credentials: newKey,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  const token = await authNew.getAccessToken();
  if (!token) {
    console.error("New key could not mint an access token — aborting delete of old key.");
    process.exit(1);
  }
  console.log("New key OK (got access token).");

  console.log(`\nDeleting old key ${oldKeyId}…`);
  try {
    await client.request({
      url: `https://iam.googleapis.com/v1/${SA_RESOURCE}/keys/${oldKeyId}`,
      method: "DELETE",
    });
    console.log("Old key deleted (revoked).");
  } catch (e) {
    // Prefer deleting with the NEW credentials if old client lost rights mid-flight
    try {
      const clientNew = await authNew.getClient();
      await clientNew.request({
        url: `https://iam.googleapis.com/v1/${SA_RESOURCE}/keys/${oldKeyId}`,
        method: "DELETE",
        scopes: ["https://www.googleapis.com/auth/cloud-platform"],
      });
      console.log("Old key deleted with new credentials.");
    } catch (e2) {
      const err = e2?.response?.data || e?.response?.data || e2.message;
      console.error("Could not delete old key automatically:");
      console.error(typeof err === "string" ? err : JSON.stringify(err, null, 2));
      console.error(
        `\nDelete manually in Console → Keys → ${oldKeyId}\nhttps://console.cloud.google.com/iam-admin/serviceaccounts/details/${encodeURIComponent(SA_EMAIL)}/keys?project=${PROJECT}`
      );
      process.exit(1);
    }
  }

  console.log(`
Done.
- Active key: ${newKeyId}
- Old key ${oldKeyId} revoked
- Backup (local only, gitignored *.json.bak): keep until you confirm indexing scripts work, then delete the .bak file
- Verify: npx tsx scripts/gsc-index-tier.mjs 2 --skip=81
  (may still hit daily quota — auth success/fail is what matters)
`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
