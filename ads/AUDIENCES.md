# Audiencias — USCQ Search Core (Observación)

Campaign stays **Paused**. Use audiences in **Observation** only (not Targeting).

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
| All Users of uscivics-quiz | Observation | Applied on USCQ Search Core |
| Site visitors 30d / 90d | Observation | Create in GA4 when Search Analytics / users exist |
| Started practice (`start_practice`) | Observation | GA4 audience → publish to Ads when event volume exists |
| Converted — start_practice | Exclusion | Apply on activation (`ads/GOLIVE.md`) |

Do **not** use Targeting / exclusive until volume. See `ads/SEO-ADS-MAP.md`.

## Exclude converters
On activation day: Audiencias → Exclusions → converters for `start_practice` if offered.

## RLSA (later)
After 7+ days live: raise bid modifiers on “Site visitors 30d” / “Started practice” in Observation reports.
