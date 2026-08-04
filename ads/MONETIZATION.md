# Monetización — USCivics Quiz

**Decisión (2026-08-04):** core practice stays **free** (no sign-up). Revenue path is staged so Ads CPA can be measured before paywall friction.

## Phase 0 — shipped
- Keep full civics bank + audio + simulation free.
- Track soft interest: `premium_interest` (GA4) when user opts into waitlist on practice hub.
- Waitlist = local preference (no paywall).
- Docs + product copy: free forever core; premium = cloud progress / ad-light later.

## Phase 1 — shipped (soft affiliates)
- **Related prep** block on learn posts + interview simulation complete screen.
- Amazon search links (optional tag via `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`).
- Disclosure in UI: Amazon Associate; not affiliated with USCIS.
- Event: `affiliate_click` (`item_id`, `source`: `learn` | `sim_complete`).
- Never gates practice. Never claims USCIS endorsement.

## Phase 2 — freemium (if Phase 1 CAC healthy + CPA baseline)
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
| CPA `start_practice` unknown | Keep Phase 0+1 soft; watch `affiliate_click` |
| CPA stable + volume | Optimize affiliate placements / creatives |
| Affiliate or organic covers CAC | Build Phase 2 freemium |

## Ops
1. Create Amazon Associates account for the site niche (study aids).
2. Set `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` in Vercel env and redeploy.
3. Optionally swap search URLs for deep ASIN links in `src/lib/affiliates.ts`.

## Monetag (display) — decision 2026-08-04

**Goal conflict:** Google Ads Search lands on free practice. Aggressive Monetag formats (popunder / push / vignette) hurt trust, QS/landing experience, and Core Web Vitals — opposite of measuring `start_practice` CPA cleanly.

### Dashboard zones (Excited MULTI, site verified)
| Zone ID | Type | Risk vs Ads/SEO |
|---------|------|-----------------|
| 11486881 | Push Notifications | High — permission spam |
| 11486880 | Vignette Banner | Medium–high — full-screen interrupt |
| 11486879 | In-Page Push | High — fake notification UX |
| 11486878 | OnClick Popunder | Critical — extra tab on click |

Code Multitag `data-zone="266272"` (`src/lib/consent.ts`) bundles those formats. Loading Multitag ≈ loading all of the above after “Accept all”.

### Current control
| Piece | State |
|-------|--------|
| Verification meta (`monetag` in root layout) | **ON** — domain verify only, no creatives |
| Multitag script (`quge5.com` / zone 266272) | **OFF** unless `NEXT_PUBLIC_MONETAG_ENABLED=true` |
| Cookie consent | Still gates Firebase; Multitag no-ops while flag off |

### Re-enable later (only if Ads CPA is healthy and you accept UX risk)
1. Vercel → `NEXT_PUBLIC_MONETAG_ENABLED=true` → redeploy.
2. Prefer a **single mild** zone in Monetag UI (never Popunder/Push on Ads landing URLs).
3. Ideally split Multitag: no ads on `/practice/*` and `/eligibility` if Monetag allows URL rules.

### Do not
- Turn on Popunder/Push while Search Ads is live.
- Use Monetag revenue to “justify” Smart Bidding / PMax early.
- Count Monetag impressions as success metrics for citizenship practice trust.
