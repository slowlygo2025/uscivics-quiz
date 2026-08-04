/**
 * Enable Email/Password sign-in for Firebase project via Identity Toolkit Admin API.
 * Uses Application Default Credentials (gcloud ADC).
 *
 *   node scripts/enable-firebase-email-auth.mjs [projectId]
 */
import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

function projectId() {
  const arg = process.argv[2];
  if (arg) return arg;
  if (existsSync(".firebaserc")) {
    const rc = JSON.parse(readFileSync(".firebaserc", "utf8"));
    return rc.projects?.default;
  }
  return "uscivics-quiz";
}

function accessToken() {
  const r = spawnSync(
    "gcloud",
    ["auth", "application-default", "print-access-token"],
    { encoding: "utf8", shell: true }
  );
  if (r.status !== 0) {
    throw new Error(r.stderr || "Failed to get ADC token");
  }
  return r.stdout.trim();
}

async function main() {
  const project = projectId();
  const token = accessToken();
  process.env.GOOGLE_CLOUD_QUOTA_PROJECT = project;

  const url = `https://identitytoolkit.googleapis.com/admin/v2/projects/${project}/config?updateMask=signIn.email`;
  const body = {
    signIn: {
      email: {
        enabled: true,
        passwordRequired: true,
      },
    },
  };

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-goog-user-project": project,
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(res.status, text.slice(0, 800));
    process.exit(1);
  }
  console.log("Email/Password Auth enabled for", project);
  try {
    const json = JSON.parse(text);
    console.log(
      "signIn.email:",
      JSON.stringify(json.signIn?.email ?? json.signIn ?? "ok")
    );
  } catch {
    console.log(text.slice(0, 400));
  }
}

main().catch((e) => {
  console.error(e.message || e);
  console.error(`
If you see CONFIGURATION_NOT_FOUND / BILLING_NOT_ENABLED:
  Open Firebase Console (one click) and enable Email/Password:
  https://console.firebase.google.com/project/${process.argv[2] || "uscivics-quiz"}/authentication/providers
`);
  process.exit(1);
});
