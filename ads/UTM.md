# UTM schema — USCQ Search Core

Canonical builder: [`src/lib/ads-utm.ts`](../src/lib/ads-utm.ts) (`buildAdsFinalUrl`, `adsUtmQuery`).

## Fixed params

| Param | Value |
|-------|--------|
| `utm_source` | `google` |
| `utm_medium` | `cpc` |
| `utm_campaign` | `uscq_search` |
| `utm_content` | See table |

## `utm_content` tokens

| Token | Use |
|-------|-----|
| `filing_date` | AG Filing Date → learn/n-400-filing-date |
| `eligibility` | Filing Date KW → /eligibility |
| `6520` | AG 65-20 → learn/65-20 |
| `senior` | 65-20 KW → questions/senior |
| `all128` | AG All 128 → questions/all-128 |
| `practice2025` | All 128 KW → practice/2025 |
| `brand` | AG Brand → /en |
| `competitors` | AG Competitors → questions/all-128 |
| `sitelink_*` | Campaign sitelinks (`eligibility`, `filing`, `6520`, `senior`, `all128`, `practice`) |

## Example

```
https://uscivics-quiz.com/en/learn/n-400-filing-date?utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=filing_date
```

In GA4: Explore → `sessionManualCampaignName` / `sessionManualAdContent` to compare groups.
