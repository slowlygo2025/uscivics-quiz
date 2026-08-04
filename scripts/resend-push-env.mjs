/**
 * Push Resend contact secrets to Vercel (prod/preview/dev).
 *
 * 1. Create API key: https://resend.com/api-keys
 * 2. Copy resend.env.example → secrets/resend.env and fill values
 * 3. npm run resend:push-env
 * 4. Redeploy: npx vercel deploy --prod --yes
 */
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, "secrets", "resend.env");

function parseEnv(raw) {
  /** @type {Record<string, string>} */
  const out = {};
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[k] = v;
  }
  return out;
}

function vercelAdd(name, value, environment) {
  const r = spawnSync(
    "npx",
    ["vercel", "env", "add", name, environment, "--force", "--yes"],
    {
      input: value + "\n",
      encoding: "utf8",
      cwd: root,
      shell: true,
    }
  );
  if (r.status !== 0) {
    console.error(r.stdout || "");
    console.error(r.stderr || "");
    throw new Error(`Failed to set ${name} for ${environment}`);
  }
  console.log(`OK  ${name} → ${environment}`);
}

async function main() {
  if (!existsSync(envPath)) {
    console.error(
      `Missing ${envPath}\nCopy resend.env.example → secrets/resend.env and fill RESEND_API_KEY.`
    );
    process.exit(1);
  }

  const env = parseEnv(readFileSync(envPath, "utf8"));
  const key = env.RESEND_API_KEY?.trim();
  const to = (env.CONTACT_TO || "contact@uscivics-quiz.com").trim();
  const from = (
    env.CONTACT_FROM || "USCivics Quiz <onboarding@resend.dev>"
  ).trim();

  if (!key || !key.startsWith("re_")) {
    console.error("RESEND_API_KEY must start with re_ in secrets/resend.env");
    process.exit(1);
  }

  const targets = ["production", "preview", "development"];
  const pairs = [
    ["RESEND_API_KEY", key],
    ["CONTACT_TO", to],
    ["CONTACT_FROM", from],
  ];

  for (const environment of targets) {
    for (const [name, value] of pairs) {
      vercelAdd(name, value, environment);
    }
  }

  const localPath = join(root, ".env.local");
  let local = existsSync(localPath) ? readFileSync(localPath, "utf8") : "";
  for (const [name, value] of pairs) {
    const line = `${name}=${value}`;
    const re = new RegExp(`^${name}=.*$`, "m");
    if (re.test(local)) local = local.replace(re, line);
    else local = local.trimEnd() + `\n${line}\n`;
  }
  writeFileSync(localPath, local);
  console.log("Updated .env.local");
  console.log(
    "\nDone. Redeploy so contact form sends mail:\n  npx vercel deploy --prod --yes"
  );
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
