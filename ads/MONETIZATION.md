# Monetización — USCivics Quiz

**Decisión (2026-08-04):** core practice stays **free** (no sign-up). Revenue path is staged so Ads CPA can be measured before paywall friction.

## Phase 0 — now (shipped)
- Keep full civics bank + audio + simulation free.
- Track soft interest: `premium_interest` (GA4) when user opts into waitlist on practice hub.
- Waitlist = local preference + optional email via `mailto:` / contact (no paywall yet).
- Docs + product copy: free forever core; premium = cloud progress / ad-light later.

## Phase 1 — after CPA baseline (≥2 weeks Ads data)
- **Affiliate** (disclosure required): English/civics prep books or courses — never claim USCIS affiliation.
- Soft place: learn posts + practice complete screen (“Related prep”).

## Phase 2 — freemium (if Phase 1 CAC healthy)
- Paid unlock: cloud sync / progress export+ / optional ad-light.
- Price band to watch: competitors ~$10–15 one-time or low monthly.
- Do **not** gate the official question bank behind paywall (trust + SEO).

## Non-goals (day-1)
- Aggressive display ads that hurt trust.
- Lawyer lead-gen without compliance review.
- PMax / Smart Bidding to “force” ROAS before conversion volume.

## Metrics gate
| Gate | Action |
|------|--------|
| CPA `start_practice` unknown | Stay Phase 0 |
| CPA stable + volume | Enable Phase 1 affiliates |
| Affiliate or organic covers CAC | Build Phase 2 freemium |
