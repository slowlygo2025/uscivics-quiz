# SEO ↔ Ads map (EN)

Canonical matrix: organic query intent ↔ ad group ↔ landing ↔ primary event.

UTMs: [`ads/UTM.md`](UTM.md). Primary conversion: `start_practice`.

| Intent / queries (examples) | Ad group | Final URL (EN) | `utm_content` | Primary event |
|----------------------------|----------|----------------|---------------|---------------|
| n-400 filing date, 2008 vs 2025, which civics test | AG Filing Date | `/en/learn/n-400-filing-date` | `filing_date` | `start_practice` |
| which test hub (2008 / 2025 / 65/20) | AG Filing Date | `/en/learn/which-civics-test` | `which_test` | `start_practice` |
| which test / eligibility chooser | AG Filing Date | `/en/eligibility` | `eligibility` | `start_practice` / `eligibility_complete` |
| 65/20, age 65 LPR | AG 65-20 | `/en/learn/65-20` | `6520` | `start_practice` |
| starred / senior list | AG 65-20 | `/en/questions/senior` | `senior` | `senior_list_open` → `start_practice` |
| 128 questions, 2025 civics | AG All 128 | `/en/questions/all-128` | `all128` | `start_practice` |
| citizenship practice test | AG All 128 | `/en/practice/2025` | `practice2025` | `start_practice` |
| fail civics / retest | — (SEO) | `/en/learn/fail-citizenship-test` | — | `start_practice` |
| 30 day study plan | — (SEO) | `/en/learn/30-day-study-plan` | — | `start_practice` |
| reading writing English | — (SEO) | `/en/learn/reading-writing-tips` → `/en/english` | — | `start_practice` |
| brand: uscivics quiz | AG Brand | `/en` | `brand` | `start_practice` |
| high-intent free practice competitors | AG Competitors | `/en/questions/all-128` | `competitors` | `start_practice` |

## Sitelinks (campaign)

| Label | Path | `utm_content` |
|-------|------|---------------|
| Eligibility | `/en/eligibility` | `sitelink_eligibility` |
| Filing Date | `/en/learn/n-400-filing-date` | `sitelink_filing` |
| 65/20 | `/en/learn/65-20` | `sitelink_6520` |
| Senior | `/en/questions/senior` | `sitelink_senior` |
| All 128 | `/en/questions/all-128` | `sitelink_all128` |
| Practice 2025 | `/en/practice/2025` | `sitelink_practice` |

## When GSC shows a winning query

1. If irrelevant → add campaign negative (`ads/negatives.txt` + UI / `npm run gads:negatives`).
2. If high-intent and fits a row above → add KW (Paused OK) with matching final URL + UTM.
3. If new intent → learn slug or extend map; keep Tier 1 for Ads money URLs (`indexing-priority.ts`).

## Canonical competitive messaging (landings + RSA)

Mirror in product `TrustDiffStrip` / dict `diff*`:

1. Free · No sign-up · Start in seconds  
2. Right bank: N-400 filing / eligibility / 65-20  
3. Official USCIS · Audio · Interview simulation  
4. 10+ languages  

## Content cluster (articles / e-learning)

Strategy: mid-pack volume, top-tier **decision** content — not a generic citizenship blog.

| Hub / reinforce | Path | Role |
|-----------------|------|------|
| Which test hub | `/learn/which-civics-test` | Cluster entry → N-400 · 65/20 · eligibility · practice |
| Fail / retest | `/learn/fail-citizenship-test` | Long-tail money + right-bank CTA |
| 30-day plan | `/learn/30-day-study-plan` | E-learning sequence → practice |
| Reading/writing | `/learn/reading-writing-tips` | Close CQ gap → `/english` |

Do **not** scale generic blog posts; deepen this cluster + internal links + Tier 1/2 indexing.

## Audiences

| List | Mode | Status |
|------|------|--------|
| All Users of uscivics-quiz | Observation | Applied on campaign |
| Site visitors 30d / 90d | Observation | Create in GA4 when volume exists |
| Users with `start_practice` | Observation | Create in GA4 after event volume |
| Converted (`start_practice`) | Exclusion | Apply on activation day (`ads/GOLIVE.md`) |

## Secondary events (import when live in GA4 28d)

`complete_quiz`, `eligibility_complete`, `senior_list_open`, `premium_interest` — never primary for bidding.

Monetization path: [`ads/MONETIZATION.md`](MONETIZATION.md) (Phase 0 waitlist live).
