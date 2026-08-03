# SEO ops — weekly ritual (organic ↔ Ads landings)

Use existing scripts. Do **not** invent a new SEO stack.

## Prerequisites

- `secrets/gsc-service-account.json` (or `GSC_SERVICE_ACCOUNT_JSON` on Vercel)
- Site live: https://uscivics-quiz.com
- Cron: Vercel `/api/cron/seo` daily 07:15 UTC (`vercel.json`) — needs `CRON_SECRET` + GSC JSON
- Optional: `SEO_CRON_T2_BUDGET` (default 40) to finish remaining Tier 2 after daily Indexing quota resets

## One-command weekly

```bash
npm run gsc:weekly
```

Runs `gsc:insights` then `gsc:report`. Follow actions printed at the end of the report.

## Weekly (EN money first)

1. **Insights** — low CTR / high impressions → title/H1 candidates  
   ```bash
   npm run gsc:insights
   npm run gsc:insights -- --days=28 --minImpressions=30 --maxCtr=0.05
   ```  
   Output: `gsc-search-insights.json` (gitignored). Playbook maps queries → paths in `scripts/gsc-search-insights.mjs`.

2. **Report** — coverage / top queries  
   ```bash
   npm run gsc:report
   ```

3. **Close Tier 2** (Indexing API ~200 publish/day project quota)  
   ```bash
   npm run gsc:tier -- 2
   npm run gsc:tier -- 2 --limit=50
   ```  
   Resume until progress shows **253/253**. Cron also drains T2 daily (`SEO_CRON_T2_BUDGET`).  
   Status (ago 2026): ~209/253 done; **44 left** (about/contact/privacy/terms × 11 locales).  
   Chromium GSC UI (2026-08-03): money EN + several legal EN/ES requested or already in Google; **UI daily quota hit** on `/es/contact` (“Cuota superada”). Resume tomorrow: `gsc:tier -- 2` and/or Chromium leftovers.

4. **Inspect / re-notify Tier 1** (after deploys that change money copy)  
   ```bash
   npm run gsc:inspect
   npm run gsc:tier -- 1
   ```

5. **Frontend follow-up** (EN Ads money)  
   - Adjust title/H1/lead in `src/lib/dict/en.ts` or `src/lib/learn-i18n/en.json` when insights show mismatch.  
   - Keep RSA ↔ hero aligned (`ads/SEO-ADS-MAP.md`).  
   - Internal links money ↔ practice: `src/lib/internal-links.ts` (`learnHeroCtas`, PATH_LINKS).  
   - Tier 1 money paths: `/learn/n-400-filing-date`, `/learn/65-20`, `/questions/all-128`, `/questions/senior`, `/eligibility`, `/practice/2025`.

6. **Cron health**  
   - Vercel → Cron / Logs: `/api/cron/seo` and `/api/cron/warm`.  
   - Probe: `GET /api/monitoring-health`.  
   - Env: `CRON_SECRET`, `GSC_SERVICE_ACCOUNT_JSON`, optional `SEO_CRON_T2_BUDGET`.

## Chromium / GSC UI (when Indexing API quota is exhausted)

Daily Indexing API publish limit is ~200/project. If `gsc:tier` stops with 429:

1. Open Search Console (property `sc-domain:uscivics-quiz.com`) in Chromium.
2. URL Inspection → paste URL → **Solicitar indexación**.
3. Prioritize EN money + remaining Tier 2 legal pages (`/about`, `/contact`, `/privacy`, `/terms`).
4. UI also has a daily request cap — batch the highest ROI URLs first.

List pending API publishes: `npx tsx scripts/list-tier2-pending.mjs`

## Checklist

- [ ] `npm run gsc:weekly` this week  
- [ ] Tier 2 → 253/253 via API **or** GSC UI requests for leftovers  
- [ ] Money URLs still Tier 1  
- [ ] Copy changes deployed → `gsc:tier -- 1` and/or GSC UI refresh  
- [ ] Cron seo last run OK  

## Out of scope here

Ads search terms / Smart Bidding → `ads/OPS.md` (post-activation).  
Locale ES Ads → deferred.