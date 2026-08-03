# Ops post-activación — USCQ Search Core

Ritual diario/semanal **después** de poner la campaña en Enabled. No aplica mientras esté Pausada.

## Diario (primeras 2 semanas)

0. **API (si Basic):** `npm run gads:inspect` · `npm run gads:negatives` (diff vs `ads/negatives.txt`).
1. **Search terms** → Campañas → Términos de búsqueda.
   - Añadir negativas de campaña (phrase) para irrelevantes.
   - Añadir keywords exactas solo si hay clics + intención clara.
2. **CPA / CTR por grupo**: Filing Date, 65-20, All 128, Brand, Competitors.
3. **Conversiones**: `start_practice` (primaria). Revisar secundarias en GA4.
4. **Regla manual**: pausar keyword si CPC > **2 USD** y **0 clics** tras ≥ **50 impresiones**.

## Semanal

1. Revisar Quality Score / landing experience (cuando haya volumen).
2. Negativas: merge con hallazgos → actualizar `ads/negatives.txt`.
3. RSA: quitar assets con bajo rendimiento (Asset report).
4. Dispositivos / horarios: anotar; no ajustar agresivo hasta ≥2 semanas de datos.
5. Presupuesto: si `start_practice` CPA estable, valorar subir diario en +20%.

## No hacer aún (ver checklist Diferido)

- tCPA / Maximize conversions sin baseline de clics.
- Amplia / AI Max / Display / partners.
- PMax / Demand Gen.
- Campaña ES (hasta que EN esté estable).

## UTM plantilla

```
utm_source=google&utm_medium=cpc&utm_campaign=uscq_search&utm_content=<asset_or_kw>
```

Ejemplos `utm_content`: `sitelink_eligibility`, `kw_filing_date`, `brand_exact`.
