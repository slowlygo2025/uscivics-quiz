# Google Ads — converted-user exclusions (Search)

**Goal:** Stop paying for clicks from users who already fired `start_practice`.

## Current blocker (as of 2026-08-04)

| Gate | Status |
|------|--------|
| Campaign **USCQ Search Core** | Enabled |
| Observation audience “All Users of uscivics-quiz” | Must be **Eligible / Apto** before exclusions apply |
| Ads API developer token | Test-only → cannot apply exclusions via `google-ads-api` |
| UI path | Works once audience is Eligible + ad blocker off on ads.google.com |

## When audience becomes Eligible

1. Open [Ads → Audiences](https://ads.google.com/) → campaign **USCQ Search Core**.
2. **Exclusions** → add conversion / segment for GA4 `start_practice` (or “Converted users” if listed).
3. Save. Confirm column shows exclusion active.
4. Optionally re-check with `npm run gads:list-audiences` after Basic API access.

## Code-side complete

- Tracking: `start_practice` primary conversion imported (see `ads/GOLIVE.md`).
- Negatives / inspect scripts ready under `scripts/gads-*.mjs`.
- Remaining work is **Google account state**, not product code.

## Definition of done

- [ ] Observation audience Eligible
- [ ] Exclusion for converted / `start_practice` applied on Search Core
- [ ] (Optional) Basic API token → automate via script
