# USCivics Quiz

Free USCIS naturalization **civics** and **English** practice — 2008 & 2025 question banks, 11 locales.  
Live: [https://uscivics-quiz.com](https://uscivics-quiz.com) · Not affiliated with USCIS.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- Firebase Analytics (consent-gated)
- Monetag ads (consent-gated)
- Deploy: Vercel (`vercel.json` cron refreshes USCIS officials)

## Local setup

```bash
npm install
cp .env.example .env.local   # fill Firebase keys if you want analytics
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — locale proxy sends `/` → `/en` (or cookie / Accept-Language).

### Environment

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_FIREBASE_*` | Client Analytics (only loads after cookie “Accept all”) |

See `.env.example`. Never commit `.env.local` or `secrets/`.

## Scripts

| Command | What it does |
|---------|----------------|
| `npm run dev` | Dev server |
| `npm run build` / `start` | Production build |
| `npm run lint` | ESLint |
| `npm run check:i18n` | Dict/legal/learn integrity (CI) |
| `npm run test:e2e` | Playwright smoke (starts dev/start server) |
| `npm run build:questions` | Rebuild EN/ES banks from sources |
| `npm run build:languages` | Rebuild other locale banks |
| `npm run scrape:uscis` | Refresh federal officials JSON |
| `npm run gsc:tier -- 1` | Submit sitemap + Indexing API tier 1 (all locales) |
| `npm run gsc:tier -- 2` | Indexing API tier 2 |
| `npm run gsc:tier -- 2 --skip=81` | Resume tier 2 after daily quota |

GSC scripts need a Google service account JSON at `secrets/gsc-service-account.json` with Indexing API + Search Console access for `sc-domain:uscivics-quiz.com`. Default publish quota is **200 URL_UPDATED / day**.

## Product map

```
/{locale}/                 Home
/{locale}/eligibility      Which test version
/{locale}/practice/2008|2025   Study hub (flashcards, smart, simulate, speak…)
/{locale}/english[/reading|/writing]
/{locale}/questions…       SEO hubs, topics, drills, states
/{locale}/learn…           Guides
/{locale}/about|contact|privacy|terms
```

Locales: `en es zh vi tl ar ko hi ru ht fr`.

## Analytics events (consent = all)

| Event | When |
|-------|------|
| `accept_consent` | Cookie “Accept all” (`choice`: all). Essential-only is not sent (no Analytics load). |
| `start_practice` | Practice hub mounted (`version`, `senior`) |
| `select_study_mode` | Mode tab change (`mode`, `version`) |
| `pass_sim` / `fail_sim` | Interview simulation ends (`version`, `senior`) |
| `eligibility_start_practice` | CTA from eligibility result (`result`) |

## Monitoring (Sentry)

Error, performance, and masked on-error session replay via `@sentry/nextjs`.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SENTRY_DSN` | Enable SDK (client + server). Empty = disabled / no-op |
| `SENTRY_URL` | Region host (EU: `https://de.sentry.io`) |
| `SENTRY_ORG` / `SENTRY_PROJECT` / `SENTRY_AUTH_TOKEN` | Source maps + releases on Vercel build |

**One-time release upload setup**

1. Open [Organization Auth Tokens](https://de.sentry.io/settings/auth-tokens/) → Create New Token (`uscivics-vercel-releases`) with `org:read`, `project:read`, `project:releases`.
2. Copy `sentry.env.example` → `secrets/sentry.env` and fill org slug, project slug, and token.
3. Run `npm run sentry:push-env` (writes Vercel Production/Preview/Development + `.env.local`).
4. `npx vercel deploy --prod --yes` — build logs should show release upload, not “No auth token”.

Events tunnel through `/monitoring` (excluded from locale proxy) to reduce ad-block drops.  
Health check: `GET /api/monitoring-health` → `{ ok, sentry, env }`.

Privacy: documented under Privacy → Error monitoring (reliability tooling, not ads).

## CI

GitHub Actions (`.github/workflows/ci.yml`) on push/PR:

1. `npm run lint`
2. `npm run check:i18n`
3. `npm run build`
4. `npm run test:e2e` (Playwright Chromium smoke)

Local smoke (uses `next start` when `CI=true`, else `next dev`):

```bash
npm run build
npm run test:e2e
```

## Security notes

- **Rotate GSC service-account keys** if a JSON key may have been exposed:
  1. Enable [IAM API](https://console.developers.google.com/apis/api/iam.googleapis.com/overview?project=833452538943) (project owner, once).
  2. Prefer automated: `npm run gsc:rotate` (creates + installs + deletes old key).
  3. Or Console: [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts?project=uscivics-quiz) → `gsc-indexer@…` → Keys → Add key (JSON) → then  
     `npm run gsc:install-key -- "C:\\path\\to\\downloaded.json"`  
     (backs up old file, smoke-tests, tries to revoke previous `private_key_id`).
  4. Confirm the old key is gone in the Keys list. Delete local `secrets/*.json.bak` after verifying scripts work.
- Ads/analytics load only after marketing consent.
- Security headers are set in `next.config.ts`.

## License / disclaimer

Practice tool only. Not legal advice. Not endorsed by USCIS or the U.S. government.
