# Scripts · T3-REP-001

Esta carpeta contiene el punto de partida reproducible del caso T3-REP-001.

## Script base

[`base_preparacion_multiespectral_gee.js`](base_preparacion_multiespectral_gee.js) · **versión 1.2**

El script prepara la observación común sobre la cual se desarrollará toda la TAREA:

- carga el AOI;
- recupera el producto Sentinel-2A fijo `S2A_MSIL2A_20260810T153641_N0512_R068_T18NUJ_20260811T003714`;
- enlaza Cloud Score+;
- aplica la máscara de calidad;
- convierte las bandas a reflectancia superficial;
- trabaja con un único gránulo, sin mosaico diario;
- organiza las bandas sobre una malla común de 20 m en `EPSG:32618` (UTM 18N);
- calcula la cobertura válida de la observación preparada;
- muestra las tres composiciones de referencia.

## Bloque E2 · superficies de referencia y firmas espectrales

[`firmas_espectrales_gee.js`](firmas_espectrales_gee.js) · **versión 1.0**

Este bloque se agrega después del script base v1.2. No selecciona geometrías por el estudiante.

El protocolo fija:

- cuatro tipos de superficie;
- cuatro polígonos independientes por tipo;
- 16 polígonos en total;
- tamaño recomendado de 9–25 píxeles válidos de 20 m por polígono;
- selección previa a NDVI, NDBI y PCA;
- extracción sobre la misma imagen `analysis20m`;
- firmas con `B2, B3, B4, B5, B6, B7, B8, B8A, B11, B12`;
- mediana como tendencia central;
- P25–P75 como medida de dispersión.

El script audita tamaño y soporte, extrae los píxeles y genera la gráfica de medianas. Los polígonos deben ser dibujados y justificados por el estudiante.

Las superficies de referencia **no son muestras de entrenamiento**.

## Qué NO resuelve

El script no contiene una solución de la TAREA. El estudiante deberá desarrollar y documentar:

- selección y justificación de las superficies de referencia;
- interpretación de las firmas espectrales y de su dispersión;
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

**Estado:** versión 1.2 validada · el gránulo seleccionado presenta 100 % de cobertura válida del AOI antes de la armonización espacial y 99.9304 % en la preparación final sobre la malla común de 20 m; no constituye solución de las evidencias E2–E6.
