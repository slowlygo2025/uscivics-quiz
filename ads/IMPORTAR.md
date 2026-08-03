# Google Ads — jerarquía real (actualizado)

| Rol | Nombre | ID | ¿Campañas? |
|-----|--------|-----|------------|
| MCC | USCivics-Quiz | `194-190-5637` | No |
| **Cliente (anuncios)** | USCivics Quiz | `207-823-9713` | **Sí** |
| Otra cuenta | Mr.Saimek | `785-145-5619` | No usar para este producto |

La campaña `Campaign #1` vive en **`207-823-9713`**.

## Ahora mismo

1. Entra en la cuenta **USCivics Quiz (`207-823-9713`)** (no te quedes solo en el MCC 194).
2. **Pausa** `Campaign #1` (está en aprendizaje = puede gastar).
3. Renómbrala a `USCQ Search Core`.
4. Revisa: ubicaciones **United States**, redes **solo Search**, keywords del plan, RSA.
5. Añade negativos de `ads/negatives.txt`.
6. Cuando esté listo → Activar.

## API (`secrets/google-ads.env`)

```
GOOGLE_ADS_CUSTOMER_ID=207-823-9713
GOOGLE_ADS_LOGIN_CUSTOMER_ID=194-190-5637
```

(Mr.Saimek `785` ya no es el login MCC de este producto.)
