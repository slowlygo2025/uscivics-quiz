# Google Ads setup — USCivics Quiz

Goal: paid Search traffic to high-intent landings (filing date, 65/20, all-128) while organic indexes.

## 0. API access level

Your developer token may be **Explorer / test-only** until Google approves **Basic** access.

- Real account create/inspect on client `207`: API may fail with `DEVELOPER_TOKEN_NOT_APPROVED`
- Apply: [Google Ads](https://ads.google.com/) → Tools → **API Center** → Apply for Basic access
- Until approved: use UI / Editor; keep campaign **Paused**
- After Basic: `npm run gads:inspect`, `npm run gads:negatives`, `npm run gads:create-campaign` (idempotent care)

Hierarchy: MCC `194-190-5637` (USCivics-Quiz) → client `207-823-9713` (USCivics Quiz, campaigns). `785` (Mr.Saimek) is unrelated for this product. Set `GOOGLE_ADS_CUSTOMER_ID=207-823-9713` and `GOOGLE_ADS_LOGIN_CUSTOMER_ID=194-190-5637`.

### npm scripts (API)

| Script | Purpose |
|--------|---------|
| `gads:check` | Validate `secrets/google-ads.env` |
| `gads:oauth` | Refresh token |
| `gads:accounts` | List accessible customers |
| `gads:inspect` | Dump USCQ Search Core structure |
| `gads:negatives` | Diff `ads/negatives.txt` vs campaign negatives |
| `gads:customers` | Inspect customers |
| `gads:create-campaign` | Create paused campaign (Basic+) |

Copy to `secrets/google-ads.env` (folder is gitignored):

```bash
copy ads\google-ads.env.example secrets\google-ads.env
```

Fill:

| Variable | Where |
|----------|--------|
| `GOOGLE_ADS_DEVELOPER_TOKEN` | Ads → Tools → API Center |
| `GOOGLE_ADS_CUSTOMER_ID` | Top right in Ads (`XXX-XXX-XXXX`) |
| `GOOGLE_ADS_CLIENT_ID` / `SECRET` | Google Cloud OAuth client |
| `GOOGLE_ADS_REFRESH_TOKEN` | OAuth playground / gcloud flow |

Developer token alone is not enough for API. Until OAuth is ready, use **Editor import** below.

## 2. Create the Search campaign (no API)

### Why previous imports failed

Google Ads Editor separates fields with **commas or tabs**. Semicolons (`;`) are only for multiple values *inside* one cell (e.g. languages). A `;`-CSV is read as **one column** → errors *“Falta el encabezado de CSV”* and *“columnas obligatorias”*.

Headers must be **English**. Do **not** use `google-ads-editor-ES.csv`.

### Files (use these)

| File | Use |
|------|-----|
| `google-ads-editor-import.csv` | **Cuenta → Importar → Desde archivo** (comma, English) |
| `google-ads-editor-paste.txt` | **Cuenta → Importar → Pegar texto** (tabs; most reliable) |
| `google-ads-keywords-paste.txt` | After campaign exists: Keywords → Aplicar cambios en bloque |
| `google-ads-editor-import-unicode.txt` | Same data as Unicode Text if CSV still fails |

### Steps (recommended: paste text)

1. Install [Google Ads Editor](https://ads.google.com/home/tools/ads-editor/).
2. In **Accounts Manager**, select / download **194-190-5637** (not `785-145-5619`).
3. **Cuenta → Importar → Pegar texto**.
4. Open `ads/google-ads-editor-paste.txt` in Notepad → Select all → Copy → Paste into Editor.
5. Left panel: choose **“Mis datos incluyen información de la cuenta”** (data includes account info).
6. Confirm first column maps to **Account** (`194-190-5637`), then Campaign, Keyword, etc.
7. Process → Review → **Publicar** / Post.
7. In web UI: Locations = United States, Networks = Search only, Budget $10/day, Manual CPC.
8. Add **Responsive Search Ads** per ad group in the UI.
9. Add negatives from `ads/negatives.txt`.

Rebuild: `node scripts/build-ads-editor-csv.mjs`

**Fallback:** create one Search campaign (Paused) + 3 ad groups in [ads.google.com](https://ads.google.com/), then paste `google-ads-keywords-paste.txt` via Keywords → Make multiple changes.

## 3. Ad groups (strategy)

| Ad group | Final URLs | Why |
|----------|------------|-----|
| Filing Date | `/en/learn/n-400-filing-date`, `/en/eligibility` | Decision intent, lower competition |
| 65-20 | `/en/learn/65-20`, `/en/questions/senior` | Niche fit |
| All 128 | `/en/questions/all-128`, `/en/practice/2025` | Volume + already Indexed |

Spanish: duplicate ad groups later with `/es/...` URLs and ES copy (phase 2).

## 4. UTM convention

```
utm_source=google
utm_medium=cpc
utm_campaign=uscq_search
utm_content=filing_date|6520|senior|all128|practice2025|eligibility
```

## 5. First-week guardrails

- Pause any keyword CPC > $2 with 0 clicks after 50 impressions.
- Add search terms as negatives if irrelevant (green card lawyer, Canada citizenship, etc.).
- Do not expand to Display/Performance Max until Search has 7 days of data.
- Keep organic Tier 2 indexing running in parallel.

## 6. Check env

```bash
npm run gads:check
```
