# Checklist Google Ads — USCivics Quiz

Cuenta cliente: **207-823-9713** · Campaña: **USCQ Search Core** · Estado: **Enabled** (2026-08-03 · ver [`GOLIVE.md`](GOLIVE.md)).

MCC: 194-190-5637 · No usar Mr.Saimek (785-145-5619).

---

## Hecho (sin activar / sin gastar)

### Tracking (código)
- [x] Firebase Analytics → GA4 (`src/lib/analytics.ts`)
- [x] Eventos: `start_practice`, `complete_quiz`, `pass_sim` / `fail_sim`, `eligibility_complete`, `senior_list_open`, `outbound_click`
- [x] Call sites: StudyHub, EligibilityFlow, SeniorListTracker, OutboundClickTracker
- [x] UTM helper: `src/lib/ads-utm.ts` + [`UTM.md`](UTM.md)
- [x] README § Analytics actualizado
- [x] [`CONVERSIONS.md`](CONVERSIONS.md) — GA4↔Ads

### Assets / keywords
- [x] Sitelinks, callouts, snippets ([`ASSETS.md`](ASSETS.md))
- [x] Negativas en campaña + `negatives.txt`
- [x] AG Brand + AG Competitors · CPC 0,55 · RSA OK
- [x] Sin Display, partners, IA Max, concordancia amplia

### Conversiones / audiencias
- [x] GA4 vinculado (548194641) · `start_practice` **principal**
- [ ] Secundarias cuando existan en GA4 28d
- [x] Observation: All Users of uscivics-quiz
- [ ] Exclusión convertidos — recheck 2026-08-04: login OK; Observation aún en revisión; aplicar cuando Apto ([`GOLIVE.md`](GOLIVE.md))

### SEO ↔ Ads loop
- [x] [`SEO-OPS.md`](SEO-OPS.md) ritual + `gsc:insights` / `gsc:report` (0 queries aún)
- [x] Ads money URLs en Tier 1 (`indexing-priority.ts`)
- [x] Titles EN playbook: n-400 / 65-20
- [x] [`SEO-ADS-MAP.md`](SEO-ADS-MAP.md)
- [x] npm: `gads:inspect`, `gads:negatives`, `gsc:checklist` (API inspect bloqueado hasta **Basic**)

### Docs
- [x] CONVERSIONS, ASSETS, AUDIENCES, BRAND-COMPETITORS, OPS, UTM, SEO-OPS, SEO-ADS-MAP, GOLIVE, SETUP
- [x] Campaña **Enabled** (2026-08-03)

---

## Diferido

- [x] **Activar** — OK explícito → [`GOLIVE.md`](GOLIVE.md)
- [ ] Basic developer token → `gads:inspect` / `gads:negatives` live
- [ ] Search terms, SKAGs, Smart Bidding, device/schedule
- [ ] Listas 30d/90d/`start_practice` Observation
- [ ] ES / PMax / Demand Gen / A/B formal

---

## Antes de activar

Seguir checklist en [`GOLIVE.md`](GOLIVE.md). Ritual post-live: [`OPS.md`](OPS.md).
