# T3-REP-001 · Representaciones espectrales del paisaje urbano–agrícola del valle del río Cauca

**Serie Técnica de Teledetección · Informe Técnico No. 03**

## Planteamiento del caso

El sector Cali–Candelaria, en el valle geográfico del río Cauca, reúne en un dominio relativamente compacto tejido urbano, superficies industriales, agricultura intensiva, vegetación arbórea, parcelas con distinta cobertura vegetal, suelos expuestos y corredores hídricos.

Esta heterogeneidad permite estudiar un problema central de la teledetección multiespectral: una misma observación puede representarse de distintas maneras y cada transformación modifica la forma en que se hacen visibles los contrastes del territorio.

En esta TAREA se utilizará una única observación Sentinel-2 de alta calidad. El problema no consiste en detectar cambio temporal ni en clasificar coberturas, sino en comprender cómo las bandas originales, las composiciones, los índices espectrales y el análisis de componentes principales reorganizan la información disponible.

La secuencia de trabajo es:

`observación → firmas espectrales → composiciones → índices → PCA → comparación → interpretación`

## Desafío técnico

> **¿Cómo cambia la interpretación del paisaje urbano–agrícola del sector Cali–Candelaria cuando la información Sentinel-2 se representa mediante firmas espectrales, composiciones de bandas, índices espectrales y componentes principales, y qué aporta cada representación frente a las bandas originales?**

## Objetivo

**Analizar y comparar distintas representaciones de una observación Sentinel-2 para establecer cómo las firmas espectrales, las composiciones de bandas, los índices NDVI/NDBI y el PCA resaltan, sintetizan o reorganizan los principales contrastes del paisaje urbano–agrícola del valle del río Cauca.**

## Dominio de análisis

El caso utiliza un AOI rectangular de aproximadamente **398.6 km²** en el sector Cali–Candelaria.

Coordenadas del dominio exploratorio adoptado:

- oeste: `-76.55`
- sur: `3.39`
- este: `-76.36`
- norte: `3.56`

El AOI fue seleccionado para contener simultáneamente superficies urbanas, agrícolas, vegetadas, expuestas y húmedas, evitando ampliar innecesariamente el problema hacia un dominio regional.

## Observación principal

El análisis utilizará una sola observación:

| Elemento | Definición |
|---|---|
| **Fecha** | 10-ago-2026 |
| **Misión** | Sentinel-2 |
| **Producto** | `COPERNICUS/S2_SR_HARMONIZED` |
| **Nivel** | Level-2A / Surface Reflectance |
| **Control complementario** | Cloud Score+ `cs_cdf` |
| **Umbral inicial de claridad** | `cs_cdf ≥ 0.60` |
| **Cobertura válida en auditoría de selección** | 100 % del AOI a 120 m |
| **Resolución común de análisis** | 20 m |

La fecha fue seleccionada después de una auditoría por fecha única de las observaciones disponibles. En esta TAREA no se realizará análisis temporal.

## Materiales del caso

El estudiante deberá utilizar conjuntamente:

- [Área de estudio · AOI_ANALYSIS](datos/aoi_analysis.geojson)
- [Documentación de datos y observación](datos/README.md)
- [Script base de preparación multiespectral](scripts/base_preparacion_multiespectral_gee.js)
- [Documentación del script base](scripts/README.md)
- [Rúbrica de TAREA 3](../../../../docs/rubricas/T3_rubrica.md)
- [Guía para autores](../../../../docs/guia_general/guia_para_autores.md)
- [Informe técnico de referencia y base editable](../../../../examples/informe_tecnico_02/)

El script suministrado fija la preparación común de la observación. **No contiene la solución de firmas espectrales, NDVI, NDBI ni PCA.**

## Bandas de trabajo

Para firmas, composiciones e índices podrán utilizarse las bandas necesarias de Sentinel-2.

Para PCA se utilizarán exclusivamente:

`B2, B3, B4, B5, B6, B7, B8A, B11, B12`

Las bandas deberán expresarse como reflectancia superficial. Las bandas originalmente disponibles a 10 m deberán llevarse a la malla común de 20 m cuando formen parte de comparaciones multibanda o del PCA.

No se utilizarán B1, B9 ni B10 en el PCA.

## Principio de la TAREA

> **T3 no evalúa cuántas transformaciones puede calcular el estudiante, sino su capacidad para explicar qué información aporta cada representación, qué información pierde o combina y bajo qué propósito resulta útil.**

## Decisiones técnicas que debe resolver el informe

### 1. ¿La observación seleccionada es adecuada para analizar el paisaje?

Antes de interpretar firmas o transformaciones deberá documentarse la calidad de la observación utilizada.

El informe deberá identificar:

- producto y fecha;
- porcentaje de cobertura válida;
- criterio de máscara;
- bandas utilizadas;
- resolución de análisis;
- tratamiento de píxeles no válidos.

La calidad deberá evaluarse dentro del AOI y no únicamente mediante `CLOUDY_PIXEL_PERCENTAGE`.

Deberá quedar clara la diferencia entre una adquisición disponible y una observación espectral utilizable.

### 2. ¿Qué diferencias existen en la respuesta espectral original de las superficies?

Antes de transformar los datos deberán analizarse las bandas originales mediante superficies de referencia.

Como mínimo deberán considerarse cuatro tipos de superficie representativos del dominio:

- vegetación agrícola vigorosa;
- vegetación agrícola con menor cobertura, parcelas cosechadas o respuesta vegetal reducida;
- superficies construidas;
- suelo expuesto.

Podrá incorporarse agua como referencia adicional cuando exista soporte espacial suficiente y se controle la mezcla de píxeles.

Las superficies deberán seleccionarse sobre sectores visualmente homogéneos y documentarse espacialmente.

Su función es caracterizar firmas espectrales, no construir muestras de entrenamiento.

El informe deberá establecer:

- en qué regiones espectrales aparecen los principales contrastes;
- qué superficies presentan respuestas similares;
- qué bandas aportan mayor diferenciación;
- dónde aparecen ambigüedades.

### 3. ¿Qué información revela cada composición de bandas?

Se analizarán tres composiciones obligatorias:

- color natural: `B4 / B3 / B2`;
- falso color de vegetación: `B8 / B4 / B3`;
- composición SWIR: `B12 / B8A / B4`.

El informe deberá explicar qué contrastes territoriales aparecen con mayor claridad en cada representación y relacionarlos con la respuesta espectral de las superficies.

No será suficiente describir colores.

Una composición no crea información nueva: reorganiza bandas existentes para facilitar determinados contrastes.

### 4. ¿Qué aportan las transformaciones espectrales dirigidas?

Se calcularán únicamente dos índices obligatorios:

`NDVI = (B8 - B4) / (B8 + B4)`

`NDBI = (B11 - B8) / (B11 + B8)`

NDVI deberá interpretarse a partir del contraste rojo–NIR y su relación con la respuesta de la vegetación.

NDBI deberá analizarse críticamente. Valores elevados pueden aparecer sobre superficies construidas, pero también sobre suelo desnudo u otras superficies secas.

> **NDBI no deberá interpretarse automáticamente como un mapa de área urbana.**

El estudiante deberá utilizar firmas y composiciones para demostrar coincidencias y ambigüedades de ambos índices.

### 5. ¿Cómo reorganiza PCA la información multiespectral?

El PCA se calculará sobre:

`B2, B3, B4, B5, B6, B7, B8A, B11, B12`

Condiciones obligatorias:

- reflectancia superficial;
- malla común de 20 m;
- máscara espacial común;
- bandas centradas respecto de su media;
- matriz de covarianza;
- sin estandarización previa a varianza unitaria en el análisis principal.

El informe deberá determinar:

- porcentaje de varianza explicado por cada componente;
- varianza acumulada;
- loadings de PC1, PC2 y PC3;
- patrones espaciales representados por PC1, PC2 y PC3.

### 6. ¿Puede asignarse directamente un significado físico a los componentes principales?

No.

La interpretación de PC1, PC2 y PC3 deberá sustentarse conjuntamente en:

- loadings;
- firmas espectrales;
- distribución espacial;
- comparación con bandas originales;
- comparación con NDVI y NDBI.

> **PCA maximiza varianza, no interpretabilidad biofísica.**

El signo de un componente principal no posee significado absoluto: invertir el signo de un eigenvector produce una solución matemáticamente equivalente.

No se aceptarán afirmaciones del tipo «PC2 es vegetación» sin evidencia que las sustente.

### 7. ¿Existe una representación espectral universalmente mejor?

El informe deberá comparar explícitamente:

- bandas originales;
- composiciones;
- NDVI;
- NDBI;
- PC1;
- PC2;
- PC3.

La comparación deberá establecer qué representación resulta más informativa para distintos contrastes del territorio, por ejemplo:

- vegetación vigorosa frente a vegetación de menor respuesta;
- vegetación frente a superficies no vegetadas;
- suelo expuesto frente a superficies construidas;
- heterogeneidad del mosaico agrícola;
- estructura general del paisaje.

La conclusión no deberá reducirse a elegir un «ganador».

Una representación puede ser adecuada para un contraste y poco informativa para otro.

## Evidencias técnicas obligatorias

### E1. Observación y soporte espectral

Mapa del AOI y documentación de la observación utilizada, incluyendo fecha, producto, resolución, bandas, máscara de calidad y porcentaje de superficie válida.

### E2. Firmas espectrales

Gráfico comparativo de las firmas espectrales de las superficies de referencia.

La evidencia deberá identificar:

- regiones de mayor contraste;
- superficies espectralmente próximas;
- relaciones VIS–NIR–SWIR relevantes;
- posibles fuentes de confusión.

Las geometrías o puntos de referencia deberán quedar documentados para permitir reproducibilidad.

### E3. Composiciones de bandas

Representación comparable de:

- `B4/B3/B2`;
- `B8/B4/B3`;
- `B12/B8A/B4`.

Cada composición deberá estar vinculada a una interpretación concreta de los contrastes observados.

### E4. Índices espectrales

Mapas continuos de NDVI y NDBI acompañados por evidencia cuantitativa pertinente y comparación con las superficies de referencia.

Deberán identificarse explícitamente coincidencias y ambigüedades, particularmente la posible respuesta compartida de NDBI entre superficies construidas y suelo expuesto.

### E5. PCA

La evidencia deberá incluir como mínimo:

1. porcentaje de varianza explicada por componente;
2. varianza acumulada;
3. loadings de PC1, PC2 y PC3;
4. mapas de PC1, PC2 y PC3;
5. interpretación sustentada de los tres componentes.

Una composición `PC1/PC2/PC3` podrá incluirse cuando aporte información analítica real.

No se exige interpretación individual de PC4–PC9 salvo que sea necesaria para sustentar una conclusión.

### E6. Comparación integradora de representaciones

El estudiante deberá comparar de manera explícita qué información se conserva, resalta, combina o vuelve menos evidente en cada representación.

La evidencia podrá adoptar una matriz comparativa u otra estructura analítica equivalente, pero no deberá convertirse en una tabla de puntajes o en una selección arbitraria de una representación «mejor».

La comparación deberá estar vinculada a contrastes territoriales concretos.

## Producto técnico principal

El resultado fundamental de la TAREA será un:

> **Diagnóstico comparativo de representaciones espectrales para la interpretación del paisaje urbano–agrícola.**

El diagnóstico deberá responder de manera integrada:

- ¿qué muestran las bandas originales?;
- ¿qué contrastes facilitan las composiciones?;
- ¿qué resaltan NDVI y NDBI?;
- ¿qué información concentra y reorganiza PCA?;
- ¿qué ambigüedades introduce cada representación?;
- ¿qué representación es más útil según el contraste territorial analizado?

## Estructura del Informe Técnico No. 03

### Resumen

Problema, observación utilizada, transformaciones evaluadas, resultado comparativo principal y principal limitación interpretativa.

### 1. Introducción

Problema técnico, fundamento de las representaciones espectrales y objetivo del estudio.

### 2. Área de estudio y datos

#### 2.1. Área de estudio

Contexto territorial y función del AOI.

#### 2.2. Datos

Producto Sentinel-2, fecha, bandas, resolución, información de calidad y superficies de referencia.

### 3. Metodología

#### 3.1. Control de calidad y preparación multiespectral

#### 3.2. Selección de superficies de referencia y firmas espectrales

#### 3.3. Composiciones de bandas

#### 3.4. NDVI y NDBI

#### 3.5. PCA

#### 3.6. Estrategia de comparación entre representaciones

Flujo general recomendado:

`calidad → firmas → composiciones → índices → PCA → comparación → interpretación`

### 4. Resultados

#### 4.1. Respuesta espectral de las superficies de referencia

#### 4.2. Contrastes revelados por las composiciones

#### 4.3. Respuesta de NDVI y NDBI

#### 4.4. Estructura de varianza y componentes principales

#### 4.5. Comparación entre representaciones

Los Resultados deberán presentar qué se obtuvo y no repetir el procedimiento descrito en Metodología.

### 5. Discusión

Interpretación de las diferencias entre representaciones, ventajas, ambigüedades y límites de inferencia.

Deberá discutirse explícitamente la diferencia entre una transformación dirigida y una transformación estadística no dirigida.

### 6. Recomendación técnica

Debe proponer qué representación o combinación de representaciones utilizaría para analizar distintos contrastes del paisaje y justificar la elección.

La recomendación deberá evitar proponer una única representación como solución universal.

### 7. Conclusiones

Conclusiones derivadas directamente de los resultados y vinculadas con el objetivo.

### Disponibilidad de datos y código

Identificación de productos Sentinel-2, geometrías de referencia, scripts, parámetros y productos generados necesarios para reproducir el análisis.

### Referencias

Según las normas editoriales de la Serie Técnica de Teledetección.

## Alcance de la TAREA

T3-REP-001 **no exige**:

- clasificación supervisada;
- Random Forest u otros clasificadores;
- muestras de entrenamiento;
- matriz de confusión;
- evaluación de exactitud temática;
- mapa LULC final;
- análisis multitemporal;
- Tasseled Cap;
- modelación predictiva.

Estos procedimientos podrán mencionarse como extensiones o trabajos posteriores, pero no constituyen productos de evaluación de esta TAREA.

## Condiciones de desarrollo

- Máximo dos autores por informe.
- El análisis deberá ser reproducible y las fuentes deberán quedar documentadas.
- Las superficies de referencia deberán estar espacialmente documentadas.
- Las composiciones comparadas deberán utilizar criterios visuales coherentes.
- NDVI y NDBI deberán presentarse como variables continuas.
- Las bandas del PCA deberán compartir malla, máscara y unidades.
- Los loadings y la varianza explicada deberán reportarse numéricamente.
- Toda interpretación de PC1–PC3 deberá sustentarse en evidencia.
- Figuras y tablas deberán citarse en el texto antes de su aparición.
- Las limitaciones de cada representación deberán declararse explícitamente.

## Criterio de éxito

La TAREA no se considera resuelta por haber calculado correctamente NDVI, NDBI o PCA.

El trabajo será satisfactorio cuando exista coherencia demostrable entre:

`respuesta espectral + transformación + evidencia + interpretación → selección razonada de representación`

La calidad del trabajo dependerá de la capacidad del estudiante para explicar no solo qué representación funciona, sino **por qué funciona, para qué contraste funciona y dónde deja de ser suficiente**.

## Pregunta integradora final

> **¿Una transformación que concentra o resalta determinada información produce necesariamente una representación más interpretable del territorio?**

---

**Versión del caso:** 1.1 · **Estado:** diseño técnico cerrado; AOI y script base disponibles · semestre 2026-2.
