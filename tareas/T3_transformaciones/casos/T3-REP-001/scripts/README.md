# Scripts · T3-REP-001

Esta carpeta contiene el punto de partida reproducible del caso T3-REP-001.

## Script base

[`base_preparacion_multiespectral_gee.js`](base_preparacion_multiespectral_gee.js) · **versión 1.1**

El script prepara la observación común sobre la cual se desarrollará toda la TAREA:

- carga el AOI;
- recupera los gránulos Sentinel-2 del 10-ago-2026;
- enlaza Cloud Score+;
- aplica la máscara de calidad;
- convierte las bandas a reflectancia superficial;
- construye una observación diaria única;
- organiza las bandas sobre una malla común de 20 m en `EPSG:32618` (UTM 18N);
- calcula la cobertura válida de la observación preparada;
- muestra las tres composiciones de referencia.

## Qué NO resuelve

El script no contiene una solución de la TAREA. El estudiante deberá desarrollar y documentar:

- selección de superficies de referencia;
- extracción y análisis de firmas espectrales;
- NDVI;
- NDBI;
- PCA;
- varianza explicada;
- loadings;
- interpretación de PC1–PC3;
- comparación integradora de representaciones.

Los bloques `TODO` del código señalan dónde puede continuar el análisis, pero no prescriben una única implementación.

## Principio pedagógico

La preparación radiométrica y geométrica se fija para que todos los grupos comparen **la misma observación**. La evaluación se concentra en la interpretación de la información espectral y en las decisiones analíticas, no en reconstruir una búsqueda de escenas que ya fue resuelta durante el diseño del caso.

## Uso

1. Abra el script en Google Earth Engine Code Editor.
2. Ejecútelo sin modificar los parámetros base.
3. Verifique en Console la fecha, el número de gránulos, la proyección de referencia y la cobertura válida.
4. Explore las tres composiciones iniciales.
5. Desarrolle los bloques analíticos requeridos por el README del caso y la rúbrica.
6. Documente cualquier cambio metodológico respecto del script base.

---

**Estado:** versión 1.1 · preparación común del caso; corrección de la definición explícita de la malla `EPSG:32618` a 20 m; no constituye solución de las evidencias E2–E6.
