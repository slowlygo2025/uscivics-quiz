# Audiencias — USCQ Search Core (Observación)

Campaign is **Enabled** (2026-08-03). Use audiences in **Observation** only (not Targeting) until volume justifies RLSA.

## Prerequisites
1. Complete GA4 ↔ Ads link (`ads/CONVERSIONS.md`).
2. Events live with consent: `start_practice`, `complete_quiz`, `eligibility_complete`, `senior_list_open`.

## Create in GA4 → publish to Ads
| Audience | Definition |
|----------|------------|
| Site visitors 30d | Users who visited uscivics-quiz.com in last 30 days |
| Site visitors 90d | Same, 90 days |
| Started practice | Users with event `start_practice` (last 30–90d) |
| Eligibility completed | Users with event `eligibility_complete` |

## Applied / planned

| List | Mode | Notes |
|------|------|--------|
| All Users of uscivics-quiz | Observation | Applied on USCQ Search Core (may stay “en revisión” until Google approves) |
| Site visitors 30d / 90d | Observation | Create in GA4 when Search Analytics / users exist |
| Started practice (`start_practice`) | Observation | GA4 audience → publish to Ads when event volume exists |
| Converted — start_practice | Exclusion | Apply as soon as audience is Eligible (`ads/GOLIVE.md`) |

Do **not** use Targeting / exclusive until volume. See `ads/SEO-ADS-MAP.md`.

## Exclude converters
Audiencias → Exclusions → converters for `start_practice` when the audience is Eligible (not stuck in review).

## RLSA (later)
After 7+ days live: raise bid modifiers on “Site visitors 30d” / “Started practice” in Observation reports.
