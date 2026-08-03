/**
 * One-time OAuth to obtain GOOGLE_ADS_REFRESH_TOKEN.
 *
 * Before running:
 * 1. Google Cloud → APIs → Google Ads API → Enable
 * 2. OAuth client (Web) → Authorized redirect URIs add:
 *    http://127.0.0.1:3344/oauth2callback
 * 3. OAuth consent → test user = your Gmail
 * 4. secrets/google-ads.env has CLIENT_ID + CLIENT_SECRET
 *
 * Usage: npm run gads:oauth
 */
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { exec } from "node:child_process";

const ENV_PATH = new URL("../secrets/google-ads.env", import.meta.url);
const PORT = 3344;
const REDIRECT = `http://127.0.0.1:${PORT}/oauth2callback`;
const SCOPE = "https://www.googleapis.com/auth/adwords";

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i < 0) continue;
    out[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return out;
}

function upsertEnv(text, key, value) {
  const re = new RegExp(`^${key}=.*$`, "m");
  const line = `${key}=${value}`;
  if (re.test(text)) return text.replace(re, line);
  return `${text.trimEnd()}\n${line}\n`;
}

if (!existsSync(ENV_PATH)) {
  console.error("Missing secrets/google-ads.env");
  process.exit(1);
}

let envText = readFileSync(ENV_PATH, "utf8");
const env = parseEnv(envText);
const clientId = env.GOOGLE_ADS_CLIENT_ID;
const clientSecret = env.GOOGLE_ADS_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error("CLIENT_ID / CLIENT_SECRET missing in secrets/google-ads.env");
  process.exit(1);
}

const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("redirect_uri", REDIRECT);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("scope", SCOPE);
authUrl.searchParams.set("access_type", "offline");
authUrl.searchParams.set("prompt", "consent");

const server = createServer(async (req, res) => {
  try {
    const u = new URL(req.url || "/", `http://127.0.0.1:${PORT}`);
    if (u.pathname !== "/oauth2callback") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const err = u.searchParams.get("error");
    if (err) {
      res.writeHead(400, { "Content-Type": "text/html; charset=utf-8" });
      res.end(`<h1>OAuth error</h1><pre>${err}</pre>`);
      console.error("OAuth error:", err);
      server.close();
      process.exit(1);
    }
    const code = u.searchParams.get("code");
    if (!code) {
      res.writeHead(400);
      res.end("Missing code");
      return;
    }

    const body = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: REDIRECT,
      grant_type: "authorization_code",
    });

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const json = await tokenRes.json();
    if (!tokenRes.ok || !json.refresh_token) {
      res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        `<h1>Token exchange failed</h1><pre>${JSON.stringify(json, null, 2)}</pre>`
      );
      console.error(json);
      server.close();
      process.exit(1);
    }

    envText = upsertEnv(envText, "GOOGLE_ADS_REFRESH_TOKEN", json.refresh_token);
    writeFileSync(ENV_PATH, envText.endsWith("\n") ? envText : envText + "\n");

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      "<h1>OK</h1><p>Refresh token saved to secrets/google-ads.env. You can close this tab.</p>"
    );
    console.log("\nRefresh token saved. Run: npm run gads:check");
    console.log("Still needed: GOOGLE_ADS_CUSTOMER_ID (from ads.google.com top-right).");
    server.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    res.writeHead(500);
    res.end(String(e));
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Listening on", REDIRECT);
  console.log("\nAdd this EXACT redirect URI in Google Cloud → Credentials → your OAuth client:");
  console.log(" ", REDIRECT);
  console.log("\nOpening browser…\n");
  console.log(authUrl.toString());
  const cmd =
    process.platform === "win32"
      ? `start "" "${authUrl.toString()}"`
      : process.platform === "darwin"
        ? `open "${authUrl.toString()}"`
        : `xdg-open "${authUrl.toString()}"`;
  exec(cmd);
});
