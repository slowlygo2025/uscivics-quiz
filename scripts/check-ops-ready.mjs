import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

function parseEnv(raw) {
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[t.slice(0, i).trim()] = v;
  }
  return out;
}

const resendPath = "secrets/resend.env";
const localPath = ".env.local";
let resendKey = "";
if (existsSync(resendPath)) {
  resendKey = parseEnv(readFileSync(resendPath, "utf8")).RESEND_API_KEY || "";
  console.log("resend_file=yes");
} else if (existsSync(localPath)) {
  resendKey = parseEnv(readFileSync(localPath, "utf8")).RESEND_API_KEY || "";
  console.log("resend_file=no local_fallback");
} else {
  console.log("resend_file=no");
}
console.log(
  "resend_ok=" +
    (resendKey.startsWith("re_") && resendKey.length > 10 ? "yes" : "no")
);

process.env.GOOGLE_CLOUD_QUOTA_PROJECT = "uscivics-quiz";
const tok = spawnSync(
  "gcloud",
  ["auth", "application-default", "print-access-token"],
  { encoding: "utf8", shell: true }
);
if (tok.status !== 0) {
  console.log("auth_check=skip_no_token");
  process.exit(0);
}
const token = tok.stdout.trim();
const r = await fetch(
  "https://identitytoolkit.googleapis.com/admin/v2/projects/uscivics-quiz/config",
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-goog-user-project": "uscivics-quiz",
    },
  }
);
const txt = await r.text();
console.log("auth_http=" + r.status);
if (r.ok) {
  const j = JSON.parse(txt);
  console.log("email_enabled=" + Boolean(j.signIn?.email?.enabled));
} else {
  console.log("auth_body=" + txt.slice(0, 120));
}
