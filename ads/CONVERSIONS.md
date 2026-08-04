# Conversiones GA4 → Google Ads (USCQ)

Stack del sitio: **Firebase Analytics** (`NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`) → propiedad **GA4**. No hay GTM ni pixel `AW-` separado.

Cuenta Ads: **207-823-9713** (cliente bajo MCC 194-190-5637).

## 1. Vincular GA4 y Ads

1. En [Google Analytics](https://analytics.google.com/) → Admin → **Product links** → **Google Ads links** → Link account **207-823-9713**.
2. O desde Ads: **Herramientas** → **Linked accounts** → Google Analytics (GA4) → vincular la propiedad del measurement ID de Firebase.

## 2. Marcar eventos como conversiones en GA4

Admin → **Events** → marcar como conversion (si aún no):

| Evento | Rol |
|--------|-----|
| `start_practice` | **Primaria** (empezó a practicar) |
| `complete_quiz` | Secundaria |
| `eligibility_complete` | Secundaria |
| `senior_list_open` | Secundaria |

`pass_sim` / `fail_sim` pueden quedar como eventos; Ads usa `complete_quiz` como señal unificada.

## 3. Importar a Google Ads

Ads → **Objetivos** → **Conversiones** → **Resumen** → **+ Nueva acción** → **Importar** → **Google Analytics 4**.

- Importar al menos `start_practice` como **Principal**.
- Importar el resto como **Secundaria** / observación.
- Incluir en “Conversiones” de columnas de campaña solo la primaria al inicio.

## 4. UTMs (canonical)

See [`ads/UTM.md`](UTM.md) and `src/lib/ads-utm.ts`:

```
utm_source=google
utm_medium=cpc
utm_campaign=uscq_search
utm_content=filing_date|6520|senior|all128|practice2025|eligibility|brand|competitors|sitelink_*
```

In GA4: Explorar → tráfico con `sessionManualAdContent` / `utm_content` para comparar grupos.

## 5. Remarketing / audiencias

Tras el link GA4↔Ads, crear audiencias en GA4 (Visitantes 30/90 días; usuarios con `start_practice`) y publicarlas a Ads. En la campaña Search, usar solo modo **Observación** (no segmentación exclusiva) hasta tener volumen.

## 6. Excluir convertidos

Cuando `start_practice` esté importada y activa: Audiencias de campaña → excluir “Converters” / usuarios que dispararon la conversión primaria (si la UI lo ofrece). Sin conversión importada, documentar y aplicar al activar.

## Secondary import (when events appear in GA4 last 28d)

Repeat **Objetivos → Conversiones → Nueva acción → Importar → GA4** for:

| Event | Category suggestion | Role |
|-------|---------------------|------|
| `complete_quiz` | Interacción / Registro | Secundaria |
| `eligibility_complete` | Interacción | Secundaria |
| `senior_list_open` | Vista de una página / Interacción | Secundaria |

Do **not** mark as primary. Keep `start_practice` as the only primary for bidding columns.

If the event is missing from the GA4 picker: open the site with **Accept all**, fire the flow once, wait up to 24–48h, then refresh the import list.

---

## Checklist rápido

- [x] GA4 vinculado a 207 (propiedad 548194641 uscivics-quiz)
- [x] `start_practice` importado en Ads como **principal** (categoría Registro)
- [ ] Secundarias cuando existan en GA4 28d: `complete_quiz`, `eligibility_complete`, `senior_list_open`
- [x] Columnas de informe muestran la conversión (objetivo Registros / `start_practice`; volumen 0 hasta tráfico Ads)
- [x] Consentimiento “Accept all” requerido en el sitio (sin consent = sin evento)
- [x] `outbound_click` cableado en FE (engagement; no importar como conversión Ads)
- [ ] Exclusión convertidos en campaña (recheck 2026-08-04: login OK; Observation aún en revisión → cuando Apto)
