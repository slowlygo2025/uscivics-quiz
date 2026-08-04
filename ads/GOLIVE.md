# Go-live gate — USCQ Search Core

**Status: ENABLED** (2026-08-03, OK explícito en chat). Cuenta **207-823-9713** · **USCQ Search Core** · ~10 USD/día · Manual CPC.

## Pre-flight (already done or ready)

- [x] Tracking FE: `start_practice` + secondaries + `outbound_click`
- [x] GA4 linked; `start_practice` imported as **primary**
- [x] Assets, negatives file, Brand/Competitors, CPC ~0.55
- [x] Observation audience: All Users of uscivics-quiz
- [x] SEO Tier 1 includes Ads money URLs; `ads/SEO-OPS.md` ritual
- [x] Map: `ads/SEO-ADS-MAP.md`
- [ ] Secondary GA4 events imported (when visible in last 28d)
- [ ] `npm run gads:inspect` / `gads:negatives` OK (needs **Basic** API token)

## Activation steps

1. [x] Ads UI → **USCQ Search Core** → **Enabled** (budget ~10 USD/day, Manual CPC). Ad groups + ads + KWs aptos (algunas brand “volumen bajo”).
2. [x] Confirm conversion **start_practice** — GA4 import, goal **Registros**, primaria, ventana 90d, recuento Una. Columnas campaña muestran Conversiones + objetivo Registros (aún 0 — sin clics Ads).
3. [ ] Exclusions: convertidos / `start_practice` — **Google-side** (see [`ads/EXCLUSIONS.md`](EXCLUSIONS.md)):
   - Code/tracking ready; blocked on Observation audience Eligible + Basic API token.
   - UI: Audiencias → Exclusions when audience is Apto; disable ad blocker on ads.google.com.
   - Script: `node scripts/gads-list-audiences.mjs` (útil tras Basic access).
4. [x] Do **not** enable Display, partners, AI Max, broad match, Smart Bidding on day 1.
5. Follow [`ads/OPS.md`](OPS.md) D1–D14 (search terms, negatives, pause KW if CPC > 2 USD and 0 clicks after ≥50 imps).

### Verified 2026-08-03 (post-live audit)

- Smoke sitio: Accept all → Flashcards → `en=start_practice` a `G-2TDECE5ZG6` + dataLayer OK; UTMs `practice2025` conservados.
- Vercel prod: Firebase + `CRON_SECRET` + `GSC_SERVICE_ACCOUNT_JSON` + Sentry presentes; `/api/monitoring-health` ok; cron sin Bearer → 401.
- Sitelinks (biblioteca): 6 money URLs = `ads/UTM.md` / `ASSETS.md` (`sitelink_*`). Quedan enlaces viejos sin UTM (about/contact/english) en biblioteca — no usar.
- Facturación: método principal Corriente •••• 1586; pagos automáticos.
- Audiencia Observation “All Users of uscivics-quiz”: en revisión / no apta aún.

## Rollback

Pause campaign immediately if spend without clicks for 24h, or if irrelevant traffic floods search terms.

## Post-live deferred

tCPA, SKAGs, ES campaign, PMax, device/schedule bids — only after baseline data.
