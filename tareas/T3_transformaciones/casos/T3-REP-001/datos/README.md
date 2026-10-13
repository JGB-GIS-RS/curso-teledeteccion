# Datos · T3-REP-001

Esta carpeta contiene la geometría base y la documentación mínima necesaria para reproducir el dominio espacial del caso.

## Archivo disponible

### [`aoi_analysis.geojson`](aoi_analysis.geojson)

Dominio rectangular adoptado para el análisis espectral del sector Cali–Candelaria, valle del río Cauca.

| Parámetro | Valor |
|---|---:|
| Oeste | -76.55 |
| Sur | 3.39 |
| Este | -76.36 |
| Norte | 3.56 |
| Área aproximada calculada en GEE | 398.634 km² |
| CRS del GeoJSON | EPSG:4326 |

El AOI se utiliza como **dominio analítico**. No representa límites administrativos, clases de cobertura ni zonas de entrenamiento.

## Observación principal

La TAREA utiliza la observación Sentinel-2 del **10-ago-2026**.

- colección: `COPERNICUS/S2_SR_HARMONIZED`;
- producto fijo: `S2A_MSIL2A_20260810T153641_N0512_R068_T18NUJ_20260811T003714`;
- satélite: Sentinel-2A;
- tesela MGRS: `18NUJ`;
- nivel: Level-2A / Surface Reflectance;
- `CLOUDY_PIXEL_PERCENTAGE` de la escena: 2.92416 %;
- control complementario: `GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED`;
- criterio inicial de claridad: `cs_cdf ≥ 0.60`;
- resolución común de análisis: 20 m;
- CRS común de análisis: `EPSG:32618` (UTM zona 18N).

La auditoría individual de los tres gránulos del 10-ago-2026 mostró que dos productos Sentinel-2A cubren el **100 % del AOI a 20 m** bajo la máscara del caso. Se seleccionó la tesela `18NUJ` porque conserva esa cobertura completa y presenta menor nubosidad global que la alternativa `18NUK` (26.81945 %). No se requiere mosaico diario.

Después de convertir a reflectancia y armonizar todas las bandas sobre la malla común `EPSG:32618` de 20 m mediante remuestreo bilineal, la **cobertura válida final es 99.9304 % del AOI**. Esta pequeña diferencia respecto del 100 % del gránulo original corresponde al soporte de la preparación espacial final y debe reportarse como tal.

## Geometrías de superficies de referencia

No se suministran polígonos de vegetación, urbano, suelo expuesto u otras superficies.

Su selección hace parte del trabajo analítico: deberán ubicarse sobre sectores visualmente homogéneos, documentarse y utilizarse exclusivamente para estudiar firmas espectrales.

Estas geometrías **no son muestras de entrenamiento**.

## Reproducibilidad

El AOI puede reconstruirse en Google Earth Engine mediante:

```javascript
var aoi = ee.Geometry.Rectangle([
  -76.55,
   3.39,
  -76.36,
   3.56
]);
```

Cualquier modificación de esta geometría deberá declararse explícitamente y justificarse.
