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

- producto: `COPERNICUS/S2_SR_HARMONIZED`;
- nivel: Level-2A / Surface Reflectance;
- control complementario: `GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED`;
- criterio inicial de claridad: `cs_cdf ≥ 0.60`;
- resolución común de análisis: 20 m.

Durante la selección exploratoria, esta fecha alcanzó **100 % de cobertura válida en la auditoría ligera realizada a 120 m**. El script base vuelve a calcular la cobertura sobre la preparación final del caso; por tanto, el estudiante deberá reportar el valor obtenido bajo la máscara y escala efectivamente utilizadas en su análisis.

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
