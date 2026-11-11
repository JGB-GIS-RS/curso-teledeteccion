# T4-LUL-001 · Clasificación supervisada y análisis retrospectivo de cambios LULC en Barranquilla

**Curso de Teledetección · TAREA 4 · Clasificación y modelado territorial**

**Modalidad:** aplicación práctica con presentación de resultados y entrega de productos geoespaciales.  
**Integrantes:** exactamente **dos estudiantes por grupo**.  
**Herramientas:** Orfeo ToolBox (OTB), QGIS y complemento MOLUSCE.

## Planteamiento del caso

Barranquilla y su periferia constituyen un territorio en el que coexisten superficies urbanizadas, coberturas vegetales y ecosistemas costeros y estuarinos. La identificación de estas coberturas mediante imágenes satelitales permite analizar su distribución y estudiar las transformaciones ocurridas entre diferentes fechas.

En este ejercicio se utilizarán imágenes Landsat 8 correspondientes a 2015, 2020 y 2025. Cada grupo seleccionará dos fechas y construirá sus respectivas clasificaciones de uso y cobertura del suelo (*Land Use/Land Cover*, LULC).

El trabajo integrará la selección de variables espectrales, el análisis de componentes principales (PCA), la obtención de muestras, el entrenamiento de un clasificador supervisado, su evaluación temática y el análisis de cambios mediante el complemento MOLUSCE de QGIS.

La secuencia de trabajo será:

`imágenes Landsat → dataset → muestras → clasificación supervisada → validación → LULC T1/T2 → MOLUSCE → transiciones → interpretación`

La actividad se concentra en **clasificar, validar y analizar cambios retrospectivos**. No se realizarán simulaciones ni predicciones de cobertura terrestre.

## Desafío técnico

> **¿Qué transformaciones de las coberturas terrestres pueden identificarse en Barranquilla y su periferia entre dos fechas Landsat, y cómo pueden cuantificarse mediante clasificaciones supervisadas evaluadas temáticamente y matrices de transición?**

## Objetivos

**Objetivo 1. Clasificación y evaluación temática**

Generar las clasificaciones LULC de Barranquilla y su periferia para dos fechas seleccionadas, mediante aprendizaje automático aplicado a imágenes Landsat, y evaluar su exactitud temática.

**Objetivo 2. Análisis multitemporal**

Analizar la dinámica espacio-temporal de las coberturas entre las dos fechas mediante la cuantificación de cambios de superficie, la identificación de conversiones entre clases y la construcción de una matriz de transición.

## Dominio de análisis

El área de estudio corresponde a Barranquilla y su entorno periurbano.

Se suministra el archivo **`aoi.shp`**, que delimita la extensión espacial de trabajo.

Las clasificaciones deberán mantener:

- El mismo sistema de referencia de coordenadas.
- La misma resolución espacial.
- La misma extensión geográfica.
- Alineación espacial píxel a píxel.
- Un dominio terrestre común.

Las superficies de agua se excluirán mediante una máscara compartida por las dos fechas. Cada grupo podrá construir su propia máscara o utilizar **`dominio_terrestre.tif`**, suministrado por el docente.

La máscara deberá aplicarse de manera consistente a T1 y T2 para que las diferencias calculadas no respondan a cambios en la extensión del área analizada.

## Observaciones Landsat disponibles

Se suministrarán tres escenas Landsat 8, Collection 2, Level-2, todas correspondientes a **Path 009 / Row 052**.

| Año | Fecha exacta | Identificador Landsat |
|---|---|---|
| 2015 | 28-feb-2015 | `LC08_L2SP_009052_20150228_20200909_02_T1` |
| 2020 | 10-feb-2020 | `LC08_L2SP_009052_20200210_20200823_02_T1` |
| 2025 | 07-feb-2025 | `LC08_L2SP_009052_20250207_20250214_02_T1` |

Cada grupo seleccionará **un solo periodo de comparación**:

| Opción | T1 | T2 |
|---|---|---|
| A | 2015 | 2020 |
| B | 2020 | 2025 |

No se exige clasificar las tres fechas.

## Sistema de clases

La clasificación utilizará la siguiente nomenclatura:

| Código | Clase | Descripción |
|---|---|---|
| 1 | Superficie impermeable | Suelo urbano, construcciones, vías y otras superficies artificiales impermeables. |
| 2 | Manglar | Vegetación arbórea de ambientes costeros y estuarinos. |
| 3 | Vegetación baja | Pastos, vegetación herbácea, matorrales y pastos arbolados. |
| NoData | Agua y áreas excluidas | Superficies no incluidas en el dominio de clasificación. |

Los códigos, definiciones de clases y colores de representación deberán mantenerse constantes en ambas fechas.

## Materiales del caso

Los materiales que se pondrán a disposición de los estudiantes son:

- Las tres escenas Landsat identificadas anteriormente (**suministradas por el docente fuera de GitHub**).
- [Área de estudio `aoi.shp` y archivos auxiliares](datos/).
- [Máscara común `dominio_terrestre.tif`](datos/dominio_terrestre.tif), de uso opcional.
- [Documentación de los datos suministrados](datos/README.md).
- [Rúbrica de evaluación de T4-LUL-001](../../../../docs/rubricas/T4-LUL-001_rubrica.md).

El AOI y la máscara terrestre están disponibles en la [carpeta `datos/`](datos/). Las escenas Landsat se suministrarán por el canal de distribución del curso y no están almacenadas en este repositorio.

## Decisiones técnicas que debe resolver el ejercicio

### 1. ¿Qué variables permiten diferenciar las coberturas?

Cada grupo construirá un dataset para T1 y otro para T2 combinando:

**Bandas espectrales.** Selección de bandas Landsat apropiadas para distinguir las tres coberturas.

**Componentes principales.** Obtención e incorporación de componentes PCA que se consideren pertinentes.

**Índices espectrales.** Selección libre de índices espectrales, acompañada de una justificación de su utilidad.

Deberán reportarse las bandas, componentes e índices utilizados y explicar brevemente el aporte de estas variables a la clasificación.

La construcción de ambos datasets deberá conservar coherencia metodológica.

### 2. ¿Cómo se obtendrán las muestras de clasificación?

Para cada fecha deberán digitalizarse **al menos 30 polígonos por clase**.

Los polígonos deberán:

- Estar distribuidos en diferentes sectores del área de estudio.
- Representar superficies identificables y preferiblemente homogéneas.
- Estar asociados con el código de clase correspondiente.

Se deberán identificar las combinaciones espectrales empleadas para facilitar la interpretación visual de las coberturas.

**Evidencia requerida:** una captura representativa por clase será suficiente.

### 3. ¿Cómo se entrenará el clasificador?

Se recomienda emplear **Support Vector Machine (SVM)** mediante Orfeo ToolBox.

La relación entre muestras de entrenamiento y validación será:

- **Entrenamiento: 70 %.**
- **Validación: 30 %.**

Esta distribución podrá realizarse utilizando las opciones disponibles en OTB.

El grupo deberá reportar:

- Algoritmo utilizado.
- Dataset de variables predictoras.
- Tipo de kernel.
- Parámetros de calibración, particularmente `C` y `gamma`, cuando correspondan.
- Proporción entrenamiento/validación.

Se obtendrá una clasificación raster para T1 y otra para T2.

Se permitirá utilizar un algoritmo diferente de SVM, siempre que se justifique brevemente su elección y se documenten sus parámetros.

### 4. ¿Qué exactitud temática presentan las clasificaciones?

Cada fecha deberá evaluarse por separado.

**Resultados obligatorios:**

- Matriz de confusión de T1.
- Matriz de confusión de T2.
- Precisión global (*Overall Accuracy*, OA) de cada clasificación.
- Índice Kappa de cada clasificación.
- Precisión del productor y del usuario por clase.

Los resultados deberán identificarse claramente con la fecha correspondiente.

### 5. ¿Cómo se compararán visualmente los raster LULC?

Se presentarán ambos raster uno al lado del otro:

| Izquierda | Derecha |
|---|---|
| **T1 — Fecha inicial** | **T2 — Fecha final** |
| Raster clasificado | Raster clasificado |

La representación deberá utilizar la misma extensión geográfica, colores idénticos para las mismas clases, leyenda común e identificación de las fechas.

**No se exige la elaboración de mapas cartográficos formales.** Basta con una representación raster legible que permita comparar las coberturas.

Cuando se efectúen refinamientos manuales o posclasificación, deberá indicarse expresamente qué herramienta y procedimiento se utilizaron.

### 6. ¿Qué cambios se identifican mediante MOLUSCE?

Se utilizará el complemento **MOLUSCE de QGIS** para analizar los cambios de cobertura entre T1 y T2.

El análisis comprenderá:

**A. Superficie por clase**

Se calculará la superficie de cada cobertura en ambas fechas, así como los cambios absolutos y relativos.

| Cobertura | T1 (ha) | T2 (ha) | Cambio (ha) | Cambio (%) |
|---|---:|---:|---:|---:|
| Superficie impermeable | | | | |
| Manglar | | | | |
| Vegetación baja | | | | |

**B. Matriz de transición**

Se construirá una matriz de cambios entre las coberturas.

- Filas: clases en T1.
- Columnas: clases en T2.
- Valores: superficies de transición en hectáreas.

Los valores de la diagonal representarán las superficies de permanencia; los demás valores representarán las conversiones entre clases.

**C. Distribución espacial de los cambios**

Se generará una representación raster que permita identificar las áreas de permanencia y las principales conversiones.

El análisis estadístico de cambios se realizará en MOLUSCE. El raster de transiciones podrá obtenerse mediante herramientas de QGIS a partir de las clasificaciones T1 y T2.

No se realizará entrenamiento de modelos predictivos dentro de MOLUSCE ni simulación de coberturas futuras.

### 7. ¿Cómo deben interpretarse los resultados?

El análisis final deberá identificar:

- Las coberturas que aumentaron o disminuyeron su superficie.
- Las principales transiciones.
- Los sectores donde se concentran las transformaciones.
- La posible relación de los cambios con la expansión urbana y la dinámica de las coberturas vegetales.

Las conclusiones deberán apoyarse en los resultados cuantitativos y las representaciones raster obtenidas.

## Evidencias técnicas obligatorias

### E1. Datos y dominio espacial

Identificación de las escenas Landsat y el periodo seleccionado, delimitación mediante `aoi.shp` y evidencia de un dominio terrestre común.

### E2. Dataset de clasificación

Relación de bandas, componentes PCA e índices espectrales utilizados para T1 y T2, con justificación de la selección.

### E3. Muestras de entrenamiento

Evidencia de los polígonos digitalizados, su distribución espacial y las composiciones de bandas empleadas. Una evidencia visual por clase.

### E4. Clasificador y calibración

Identificación del algoritmo, kernel, parámetros de calibración y proporción 70/30.

### E5. Validación temática

Matrices de confusión independientes y métricas de exactitud correspondientes a T1 y T2.

### E6. Clasificaciones comparativas

Visualización lado a lado de los raster LULC de ambas fechas, con idénticos códigos y colores de clase.

### E7. Cambios en MOLUSCE

Evidencia del procesamiento en MOLUSCE, tabla de superficies por clase y matriz de transición.

### E8. Distribución espacial e interpretación

Raster de cambios o transiciones, análisis de resultados y conclusiones sustentadas en las superficies y conversiones identificadas.

## Producto técnico principal

El resultado fundamental de la actividad será un:

> **Diagnóstico retrospectivo de cambios de cobertura terrestre basado en dos clasificaciones Landsat supervisadas, evaluadas temáticamente y comparadas mediante MOLUSCE.**

El diagnóstico deberá responder:

- ¿Qué superficie ocupa cada cobertura en T1 y T2?
- ¿Qué coberturas ganaron o perdieron superficie?
- ¿Qué conversiones predominan?
- ¿Dónde se localizan los cambios principales?

## Estructura de la presentación PowerPoint

El producto de comunicación será una presentación en formato **`.pptx`**.

Se recomienda la siguiente estructura:

1. **Caso, área de estudio y periodo seleccionado.**
2. **Dataset:** bandas, componentes principales e índices espectrales.
3. **Muestras:** polígonos de entrenamiento y evidencias de interpretación.
4. **Clasificador:** algoritmo y parámetros de calibración.
5. **Validación:** matrices de confusión, OA, Kappa y precisiones por clase.
6. **Clasificaciones:** representación comparativa T1–T2.
7. **MOLUSCE:** evidencia del procesamiento.
8. **Cambios:** superficies por clase y variaciones absolutas y relativas.
9. **Transiciones:** matriz y representación raster de cambios.
10. **Interpretación y conclusiones.**

La presentación deberá ser clara, legible y suficientemente documentada.

No será necesario elaborar un informe técnico escrito adicional ni cumplir los requisitos de presentación cartográfica formal de otros casos del curso.

## Archivos digitales obligatorios

Además de la presentación PowerPoint, deberán entregarse:

- Dataset de variables predictoras de T1.
- Dataset de variables predictoras de T2.
- Polígonos de entrenamiento de T1 y T2, con su atributo de clase.
- Raster de clasificación LULC de T1.
- Raster de clasificación LULC de T2.
- Raster de cambios o transiciones.
- Máscara del dominio terrestre utilizada.

Los archivos deberán conservar su información geoespacial y permitir su apertura y revisión en QGIS.

**La presentación no sustituye la entrega de los archivos geoespaciales.**

## Bono adicional · Variables espaciales asociadas al cambio

Se podrá obtener una bonificación mediante la entrega de al menos un raster de una variable espacial independiente potencialmente asociada con las transformaciones identificadas.

Algunas alternativas son:

- Distancia a vías.
- Distancia a superficies urbanizadas existentes.
- Distancia a centros urbanos.
- Pendiente.
- Distancia a cuerpos de agua.

El estudiante deberá entregar el raster, justificar la elección de la variable y explicar brevemente su posible relación con los cambios observados.

No se exige desarrollar un modelo predictivo para acceder al bono.

La cuantía y los criterios de asignación del bono se establecen en la [rúbrica del caso](../../../../docs/rubricas/T4-LUL-001_rubrica.md).

## Alcance de la TAREA

**T4-LUL-001 no exige:**

- Clasificar las tres fechas.
- Elaborar cartografía formal con todos sus elementos convencionales.
- Preparar un informe técnico escrito adicional.
- Desarrollar modelos de simulación o predicción de cambios.
- Generar escenarios LULC futuros.
- Calibrar redes neuronales o autómatas celulares en MOLUSCE.

El alcance se limita a la clasificación, evaluación temática y análisis retrospectivo de dos fechas.

## Condiciones de desarrollo

- **Los grupos deberán estar conformados por exactamente dos estudiantes.**
- Cada grupo seleccionará uno de los dos periodos propuestos.
- Se utilizarán los códigos temáticos establecidos.
- Se obtendrán al menos 30 polígonos por clase y por fecha.
- La relación entrenamiento/validación será de 70/30.
- Cada clasificación contará con su propia evaluación temática.
- Ambos raster deberán compartir extensión, resolución, alineación y dominio terrestre.
- El análisis de cambios deberá incluir el uso de MOLUSCE.
- Se documentarán los eventuales refinamientos de las clasificaciones.
- Se entregarán la presentación y los archivos geoespaciales obligatorios.

## Criterio de éxito

La actividad no se considera resuelta únicamente por obtener dos raster clasificados o ejecutar una herramienta de MOLUSCE.

El resultado será satisfactorio cuando exista coherencia demostrable entre:

`variables espectrales + muestras + clasificación + validación + comparabilidad espacial + transiciones → interpretación del cambio`

Se valorará la capacidad de construir una secuencia técnica completa y presentar resultados cuantitativos consistentes.

## Pregunta integradora final

> **¿Qué cambios de cobertura terrestre se identifican en Barranquilla y su periferia durante el periodo seleccionado, y qué evidencia aportan las clasificaciones, sus evaluaciones temáticas y la matriz de transición para sustentar esa interpretación?**

---

**Versión del caso:** 1.0 · **Estado:** publicado para aplicación estudiantil · semestre 2026-2.
