/**
 * Push Sentry release-upload secrets to Vercel (prod/preview/dev) and validate.
 *
 * 1. Create an Organization Auth Token in Sentry (EU):
 *    https://de.sentry.io/settings/auth-tokens/
 *    Scopes: org:read, project:read, project:releases, org:ci (if offered)
 * 2. Put values in secrets/sentry.env (gitignored) — see secrets/sentry.env.example
 * 3. Run: node scripts/sentry-push-env.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, "secrets", "sentry.env");

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
  // vercel env add NAME environment  (value via stdin)
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

async function validate(token, org, project, sentryUrl) {
  const base = sentryUrl.replace(/\/$/, "");
  const res = await fetch(`${base}/api/0/projects/${org}/${project}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Sentry API ${res.status} for ${org}/${project}: ${body.slice(0, 400)}`
    );
  }
  const data = await res.json();
  console.log(`Validated project: ${data.slug} (${data.name}) · org=${org}`);
}

async function main() {
  if (!existsSync(envPath)) {
    console.error(
      `Missing ${envPath}\nCopy secrets/sentry.env.example → secrets/sentry.env and fill values.`
    );
    process.exit(1);
  }

  const env = parseEnv(readFileSync(envPath, "utf8"));
  const org = env.SENTRY_ORG?.trim();
  const project = env.SENTRY_PROJECT?.trim();
  const token = env.SENTRY_AUTH_TOKEN?.trim();
  const sentryUrl = (env.SENTRY_URL || "https://de.sentry.io").trim();

  if (!org || !project || !token) {
    console.error("Need SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN in secrets/sentry.env");
    process.exit(1);
  }

  console.log("Validating token against Sentry…");
  await validate(token, org, project, sentryUrl);

  const targets = ["production", "preview", "development"];
  const pairs = [
    ["SENTRY_ORG", org],
    ["SENTRY_PROJECT", project],
    ["SENTRY_AUTH_TOKEN", token],
    ["SENTRY_URL", sentryUrl],
  ];

  for (const environment of targets) {
    for (const [name, value] of pairs) {
      vercelAdd(name, value, environment);
    }
  }

  // Mirror into .env.local for local builds (append/replace)
  const localPath = join(root, ".env.local");
  let local = existsSync(localPath) ? readFileSync(localPath, "utf8") : "";
  for (const [name, value] of pairs) {
    const line = `${name}=${value}`;
    const re = new RegExp(`^${name}=.*$`, "m");
    if (re.test(local)) local = local.replace(re, line);
    else local = local.trimEnd() + `\n${line}\n`;
  }
  const { writeFileSync } = await import("node:fs");
  writeFileSync(localPath, local);
  console.log("Updated .env.local");

  console.log(
    "\nDone. Redeploy production so the next build uploads source maps:\n  npx vercel deploy --prod --yes"
  );
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});
