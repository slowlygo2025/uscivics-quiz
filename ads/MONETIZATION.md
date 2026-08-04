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
