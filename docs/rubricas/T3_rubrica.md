# Rúbrica de evaluación · TAREA 3

## Transformaciones y estructura espectral

**Serie Técnica de Teledetección · Versión 1.1**

Esta rúbrica evalúa la calidad de las decisiones técnicas, la comprensión de la respuesta espectral, la interpretación de transformaciones dirigidas y no dirigidas y la capacidad para comparar representaciones sin confundir procesamiento con significado físico.

No se califican secuencias de software, cantidad de índices, cantidad de componentes ni sofisticación de herramientas por sí mismas.

## Escala de desempeño

| Nivel | Rango | Significado general |
|---|---:|---|
| Sobresaliente | 4.5–5.0 | Análisis riguroso, integrado, sustentado y crítico. |
| Sólido | 3.8–4.4 | Trabajo correcto y bien sustentado, con limitaciones menores. |
| Aceptable | 3.0–3.7 | Cumple lo esencial, pero presenta debilidades de profundidad, integración o justificación. |
| Insuficiente | 1.0–2.9 | Evidencia incompleta, errores conceptuales o interpretaciones débilmente justificadas. |
| Sin evidencia | 0 | El criterio no fue abordado o no existe evidencia verificable. |

## Ponderación

| Criterio | Peso |
|---|---:|
| 1. Planteamiento del problema y objetivo | 5 % |
| 2. Calidad y soporte espectral de la observación | 10 % |
| 3. Firmas espectrales y respuesta de superficies | 12 % |
| 4. Composiciones de bandas | 10 % |
| 5. NDVI y NDBI como transformaciones dirigidas | 15 % |
| 6. Implementación y estructura del PCA | 15 % |
| 7. Interpretación de componentes principales | 10 % |
| 8. Comparación e integración de representaciones | 13 % |
| 9. Calidad de la evidencia técnica | 5 % |
| 10. Reproducibilidad, escritura científica y cumplimiento editorial | 5 % |
| **Total** | **100 %** |

La nota final se calcula como:

`Nfinal = 0.05N1 + 0.10N2 + 0.12N3 + 0.10N4 + 0.15N5 + 0.15N6 + 0.10N7 + 0.13N8 + 0.05N9 + 0.05N10`

Cada criterio se califica en escala de 0 a 5.

---

## 1. Planteamiento del problema y objetivo · 5 %

**Sobresaliente.** Formula con precisión el problema como comparación de representaciones espectrales, diferencia observación, transformación e interpretación y establece un objetivo coherente con el alcance no clasificatorio de T3.

**Sólido.** Define correctamente el problema y el objetivo, con pequeñas simplificaciones que no afectan la lógica del análisis.

**Aceptable.** Reconoce la comparación de transformaciones como problema central, pero formula un objetivo genérico o excesivamente orientado a producir mapas.

**Insuficiente.** Confunde la TAREA con clasificación temática, plantea que una transformación revela directamente coberturas o reduce el objetivo a ejecutar índices y PCA.

**Sin evidencia.** No existe formulación técnica reconocible del problema ni del objetivo.

---

## 2. Calidad y soporte espectral de la observación · 10 %

**Sobresaliente.** Documenta correctamente producto, fecha, reflectancia superficial, Cloud Score+, SCL, cobertura válida, bandas y resolución común. Controla píxeles no válidos y mantiene coherencia espacial entre las representaciones comparadas.

**Sólido.** El control de calidad y la preparación de la observación son correctos, con omisiones menores de documentación que no afectan la comparabilidad.

**Aceptable.** Utiliza la observación correcta y aplica una máscara funcional, pero la justificación del soporte espectral, la resolución o la comparabilidad entre productos es incompleta.

**Insuficiente.** Se apoya únicamente en nubosidad global, mezcla resoluciones o máscaras sin documentarlo, utiliza píxeles no válidos o compara representaciones sobre soportes espaciales incompatibles.

**Sin evidencia.** No existe control de calidad ni preparación reproducible de la observación.

---

## 3. Firmas espectrales y respuesta de superficies · 12 %

**Sobresaliente.** Documenta cuatro polígonos homogéneos y reproducibles para cada uno de los cuatro tipos de superficie, seleccionados antes de NDVI/NDBI/PCA y sin circularidad. Controla su soporte espacial, utiliza la misma malla de 20 m del análisis y caracteriza las firmas mediante mediana y P25–P75. Explica contrastes, dispersiones y solapamientos en VIS, red-edge, NIR y SWIR y conecta esas respuestas con las transformaciones posteriores sin convertir las superficies en clases de entrenamiento.

**Sólido.** Las 16 superficies están adecuadamente documentadas, las firmas y su dispersión son técnicamente correctas y se reconocen los principales contrastes y confusiones, con limitaciones menores de distribución espacial o profundidad interpretativa.

**Aceptable.** Presenta superficies y firmas funcionales, pero existe documentación parcial de los polígonos, poca atención a la dispersión P25–P75 o un análisis superficial de las regiones espectrales.

**Insuficiente.** Selecciona superficies heterogéneas o a partir de índices/componentes ya calculados, utiliza puntos aislados o soporte espacial inadecuado sin justificación, omite la variabilidad interna, interpreta incorrectamente la respuesta espectral o trata las superficies como entrenamiento de clasificación.

**Sin evidencia.** No existe análisis verificable de superficies de referencia y firmas espectrales.

---

## 4. Composiciones de bandas · 10 %

**Sobresaliente.** Analiza RGB, B8/B4/B3 y B12/B8A/B4 con criterios visuales comparables y explica qué contrastes mejora cada composición a partir de la respuesta espectral de las superficies. Diferencia claramente visualización de transformación física.

**Sólido.** Las tres composiciones están correctamente construidas e interpretadas, con pequeñas omisiones en la relación entre respuesta espectral y apariencia.

**Aceptable.** Presenta las composiciones requeridas y reconoce sus contrastes principales, pero la discusión se centra excesivamente en colores o descripciones visuales.

**Insuficiente.** Utiliza bandas equivocadas, escalas que impiden comparar, interpreta colores como propiedades físicas directas o presenta composiciones sin análisis.

**Sin evidencia.** No existen composiciones verificables.

---

## 5. NDVI y NDBI como transformaciones dirigidas · 15 %

**Sobresaliente.** Calcula correctamente NDVI y NDBI, explica el fundamento espectral de cada razón normalizada y los interpreta como transformaciones dirigidas. Demuestra mediante firmas, mapas o distribuciones las fortalezas y ambigüedades de ambos índices, especialmente la respuesta compartida de NDBI entre superficies construidas y suelo expuesto.

**Sólido.** Los índices están correctamente calculados e interpretados y se reconocen sus principales limitaciones, con menor profundidad en la demostración de ambigüedades.

**Aceptable.** Los cálculos son correctos y la interpretación general es razonable, pero se apoya en asociaciones simplificadas como «NDVI = vegetación» o «NDBI = urbano».

**Insuficiente.** Presenta errores de bandas o signo, transforma índices continuos en clases arbitrarias, interpreta NDBI como mapa urbano o atribuye a los índices propiedades que no miden directamente.

**Sin evidencia.** No existe análisis verificable de NDVI/NDBI.

---

## 6. Implementación y estructura del PCA · 15 %

**Sobresaliente.** Ejecuta PCA sobre B2, B3, B4, B5, B6, B7, B8A, B11 y B12 en reflectancia superficial, malla común de 20 m, máscara común y bandas centradas. Utiliza matriz de covarianza, documenta eigenvalues/eigenvectors y reporta correctamente varianza explicada y acumulada.

**Sólido.** El PCA está correctamente implementado y documentado, con pequeñas omisiones que no alteran la solución ni su interpretación.

**Aceptable.** Obtiene componentes principales funcionales y reporta varianza explicada, pero la documentación del centrado, covarianza, resolución o máscara común es incompleta.

**Insuficiente.** Mezcla escalas o máscaras incompatibles, utiliza bandas diferentes sin justificación, omite el centrado o no permite reconstruir cómo se obtuvo el PCA.

**Sin evidencia.** No existe PCA verificable.

---

## 7. Interpretación de componentes principales · 10 %

**Sobresaliente.** Interpreta PC1, PC2 y PC3 mediante loadings, patrones espaciales, firmas y comparación con bandas/índices. Reconoce que PCA maximiza varianza y que el signo de los eigenvectors es arbitrario. Evita asignar significados biofísicos automáticos.

**Sólido.** La interpretación de PC1–PC3 es coherente y sustentada principalmente en loadings y distribución espacial, con limitaciones menores de integración.

**Aceptable.** Relaciona componentes con patrones plausibles, pero la argumentación depende demasiado de apariencia visual o utiliza loadings de forma superficial.

**Insuficiente.** Afirma que un componente «es» vegetación, urbano u otra cobertura sin evidencia; interpreta el signo como propiedad física absoluta o ignora los loadings.

**Sin evidencia.** No existe interpretación técnica de los componentes.

---

## 8. Comparación e integración de representaciones · 13 %

**Sobresaliente.** Integra bandas originales, composiciones, NDVI, NDBI y PC1–PC3 y determina qué representación es más informativa para contrastes territoriales concretos. Explica qué información se conserva, resalta, combina o vuelve menos evidente y evita declarar una representación universalmente superior.

**Sólido.** La comparación entre representaciones es clara, técnicamente coherente y vinculada a varios contrastes del territorio, con omisiones menores.

**Aceptable.** Compara las principales representaciones, pero varios resultados permanecen aislados o la conclusión se basa parcialmente en preferencias visuales.

**Insuficiente.** Se limita a enumerar productos, asigna un «ganador» sin propósito definido, confunde varianza con interpretabilidad o no relaciona las transformaciones con las bandas originales.

**Sin evidencia.** No existe comparación integradora.

---

## 9. Calidad de la evidencia técnica · 5 %

**Sobresaliente.** Mapas, gráficos y tablas cumplen una función analítica clara, permiten verificar las afirmaciones y presentan escalas, leyendas, unidades y dominios comparables. Las firmas, índices y componentes pueden relacionarse espacialmente sin ambigüedad y no existe duplicación innecesaria.

**Sólido.** La evidencia es correcta, pertinente y legible, con detalles menores de diseño que no afectan su función.

**Aceptable.** Las evidencias requeridas están presentes y son comprensibles, pero varias funcionan principalmente como ilustración o presentan inconsistencias menores de escala, rotulado o comparación.

**Insuficiente.** Utiliza capturas de pantalla como evidencia principal, escalas incompatibles o figuras que no permiten comprobar las afirmaciones realizadas.

**Sin evidencia.** Faltan las evidencias técnicas esenciales.

---

## 10. Reproducibilidad, escritura científica y cumplimiento editorial · 5 %

**Sobresaliente.** Producto, fecha, bandas, escala, remuestreo, máscaras, geometrías de referencia, ecuaciones, parámetros PCA, scripts y productos generados son trazables. El análisis puede reconstruirse. La escritura es técnica, precisa y concisa y cumple la estructura editorial de la Serie Técnica.

**Sólido.** El trabajo es reproducible en sus aspectos esenciales y la escritura es clara, con errores menores de documentación o estilo.

**Aceptable.** La mayor parte del procedimiento puede reconstruirse, pero faltan algunos parámetros, geometrías o decisiones; la escritura presenta redundancias o imprecisiones terminológicas.

**Insuficiente.** El análisis no puede reproducirse adecuadamente, faltan parámetros críticos, se mezclan resultados y discusión o la redacción dificulta evaluar la trazabilidad técnica.

**Sin evidencia.** No existe documentación suficiente para establecer procedencia o reproducibilidad.

---

## Reglas de aplicación

- Se evalúan decisiones técnicamente sustentadas, no secuencias de botones.
- La calidad gráfica no compensa errores conceptuales o metodológicos.
- La selección de software no constituye criterio de mérito.
- No se premia la inclusión de índices adicionales por sí misma.
- NDVI y NDBI deben mantenerse como variables continuas salvo que exista una justificación externa independiente para otra representación.
- Las superficies de referencia sirven para análisis espectral y no deben convertirse en un ejercicio encubierto de clasificación.
- La selección de superficies de referencia debe preceder al cálculo de NDVI, NDBI y PCA; no es válido seleccionar polígonos a partir de esos productos derivados.
- El protocolo de referencia utiliza cuatro polígonos por tipo de superficie y mediana con P25–P75 para caracterizar la respuesta espectral.
- PCA no debe interpretarse únicamente por apariencia visual.
- Una mayor varianza explicada no implica automáticamente mayor valor biofísico o interpretativo.
- El signo de un componente principal no constituye evidencia física.
- Tasseled Cap no forma parte de los productos obligatorios de T3-REP-001.
- Un mismo error puede afectar más de un criterio solo cuando produce consecuencias técnicas distintas.
- Se evaluará la coherencia entre evidencia e interpretación, no la coincidencia con una respuesta predeterminada.

**Caso piloto de referencia:** `T3-REP-001` · Paisaje urbano–agrícola del sector Cali–Candelaria, valle del río Cauca.
