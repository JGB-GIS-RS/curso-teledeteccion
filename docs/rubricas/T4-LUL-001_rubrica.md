# Rúbrica de evaluación · T4-LUL-001

## Clasificación supervisada y análisis retrospectivo de cambios LULC en Barranquilla

**Curso de Teledetección · TAREA 4**  
**Versión 1.0 · Caso de aplicación**  
**Modalidad:** presentación PowerPoint y productos geoespaciales · **Grupos de exactamente dos estudiantes**.

Esta rúbrica evalúa la construcción de dos clasificaciones temáticas Landsat, su validación, el análisis de cambios con MOLUSCE y la entrega de evidencia técnica verificable.

La evaluación prioriza la coherencia del procedimiento y la calidad de los resultados, no la complejidad de las herramientas o el diseño formal de productos cartográficos.

## Escala de desempeño

| Nivel | Rango | Descripción general |
|---|---|---|
| **Sobresaliente** | 4,5–5,0 | Procedimiento completo, técnicamente consistente y bien documentado. |
| **Sólido** | 3,8–4,4 | Trabajo correcto, con omisiones menores. |
| **Aceptable** | 3,0–3,7 | Cumple los requisitos esenciales, pero presenta debilidades metodológicas o de documentación. |
| **Insuficiente** | 1,0–2,9 | Evidencia incompleta, errores relevantes o resultados poco verificables. |
| **Sin evidencia** | 0 | No se presenta evidencia evaluable del criterio. |

## Ponderación

| Criterio | Peso |
|---|---:|
| 1. Selección de imágenes, periodo y dominio espacial | 10 % |
| 2. Construcción y justificación del dataset | 15 % |
| 3. Obtención y documentación de muestras | 12 % |
| 4. Entrenamiento y calibración del clasificador | 13 % |
| 5. Evaluación de exactitud temática | 15 % |
| 6. Clasificaciones raster y comparabilidad T1–T2 | 10 % |
| 7. Análisis de cambios mediante MOLUSCE | 15 % |
| 8. Interpretación de resultados y conclusiones | 5 % |
| 9. Presentación y entrega de archivos geoespaciales | 5 % |
| **TOTAL** | **100 %** |

Cada criterio recibirá una calificación entre 0 y 5, que se multiplicará por su ponderación.

La nota base se calculará así:

`N = 0,10N1 + 0,15N2 + 0,12N3 + 0,13N4 + 0,15N5 + 0,10N6 + 0,15N7 + 0,05N8 + 0,05N9`

---

## 1. Selección de imágenes, periodo y dominio espacial · 10 %

**Sobresaliente.** Identifica correctamente ambas escenas, sus fechas y el periodo de comparación. Aplica el AOI y un dominio terrestre común, manteniendo coherencia de extensión, resolución, referencia espacial y alineación de los raster.

**Sólido.** La preparación espacial es correcta y comparable, con omisiones menores en su documentación.

**Aceptable.** Utiliza las escenas y fechas correctas, pero no demuestra completamente la consistencia del dominio o de la geometría raster.

**Insuficiente.** Presenta incompatibilidades espaciales relevantes, aplica máscaras diferentes sin control o utiliza datos distintos de los establecidos.

**Sin evidencia.** No es posible verificar las imágenes o el dominio de análisis.

## 2. Construcción y justificación del dataset · 15 %

**Sobresaliente.** Construye para cada fecha un dataset coherente que incorpora bandas espectrales, componentes PCA e índices seleccionados con justificación técnica. Identifica claramente las variables finales utilizadas.

**Sólido.** Incorpora correctamente los tres grupos de variables y ofrece una justificación adecuada, con pequeñas omisiones.

**Aceptable.** Presenta los datasets requeridos, pero la selección de variables está débilmente justificada o documentada.

**Insuficiente.** Omite componentes esenciales, utiliza combinaciones incompatibles o no permite identificar las variables del modelo.

**Sin evidencia.** No entrega datasets verificables.

## 3. Obtención y documentación de muestras · 12 %

**Sobresaliente.** Presenta al menos 30 polígonos por clase y fecha, adecuadamente distribuidos y vinculados a las categorías establecidas. Documenta las composiciones espectrales utilizadas y aporta las tres evidencias visuales solicitadas.

**Sólido.** Cumple los requisitos de cantidad, identificación y distribución de muestras, con defectos menores.

**Aceptable.** Presenta las muestras requeridas, pero evidencia una distribución espacial limitada o documentación incompleta de su interpretación.

**Insuficiente.** No cumple la cantidad mínima, presenta muestras incorrectamente identificadas o no permite verificar su correspondencia con las clases.

**Sin evidencia.** No entrega polígonos o evidencias verificables.

## 4. Entrenamiento y calibración del clasificador · 13 %

**Sobresaliente.** Entrena y aplica el clasificador para ambas fechas, documentando algoritmo, variables, kernel, parámetros aplicables y relación 70/30. Existe correspondencia entre la metodología declarada y los productos obtenidos.

**Sólido.** El procedimiento es correcto y los parámetros principales están documentados, con omisiones menores.

**Aceptable.** Genera clasificaciones funcionales, pero la documentación de parámetros o de la distribución entrenamiento/validación es parcial.

**Insuficiente.** No identifica los parámetros esenciales, presenta inconsistencias relevantes o no demuestra la ejecución de un procedimiento supervisado.

**Sin evidencia.** No existe evidencia verificable de entrenamiento o aplicación del clasificador.

## 5. Evaluación de exactitud temática · 15 %

**Sobresaliente.** Presenta matrices de confusión independientes para T1 y T2, OA, Kappa y precisiones del productor y usuario por clase. Los resultados son claros, coherentes y están correctamente asociados con cada clasificación.

**Sólido.** La evaluación es completa y correcta, con pequeñas deficiencias de organización o interpretación.

**Aceptable.** Presenta las métricas principales, pero omite algún indicador requerido o muestra inconsistencias menores.

**Insuficiente.** Falta la validación de una fecha, existen errores relevantes en las métricas o no se puede relacionar la evaluación con los raster entregados.

**Sin evidencia.** No presenta evaluación temática verificable.

## 6. Clasificaciones raster y comparabilidad T1–T2 · 10 %

**Sobresaliente.** Entrega ambos raster correctamente georreferenciados, con códigos de clase consistentes, dominio espacial comparable y representación visual clara, con colores idénticos para las mismas clases.

**Sólido.** Los raster son consistentes y permiten la comparación, con defectos menores de visualización o documentación.

**Aceptable.** Se dispone de ambos raster, pero existen inconsistencias menores de codificación, colores o presentación comparativa.

**Insuficiente.** Las clasificaciones presentan diferencias espaciales o temáticas que comprometen la comparación, o faltan productos esenciales.

**Sin evidencia.** No se entregan los raster clasificados.

## 7. Análisis de cambios mediante MOLUSCE · 15 %

**Sobresaliente.** Documenta el procesamiento en MOLUSCE y presenta correctamente superficies por clase en T1 y T2, cambios absolutos y relativos, matriz de transición en hectáreas y representación raster de las principales transiciones. Existe coherencia entre los resultados tabulares y espaciales.

**Sólido.** El análisis de cambios es completo y consistente, con omisiones menores de documentación o presentación.

**Aceptable.** Calcula las principales superficies y transiciones, pero presenta resultados incompletos o debilidades en la representación espacial.

**Insuficiente.** Omite la matriz de transición, no demuestra el uso de MOLUSCE o presenta errores importantes de cálculo o interpretación de las transiciones.

**Sin evidencia.** No existe análisis verificable de cambios.

## 8. Interpretación de resultados y conclusiones · 5 %

**Sobresaliente.** Identifica los cambios predominantes, cuantifica su magnitud y describe su distribución espacial mediante una interpretación consistente con las superficies y transiciones obtenidas.

**Sólido.** Interpreta correctamente los principales resultados, con omisiones menores.

**Aceptable.** Reconoce los cambios principales, pero la explicación es predominantemente descriptiva o insuficientemente apoyada en los valores calculados.

**Insuficiente.** Presenta afirmaciones contradictorias con los resultados o conclusiones sin evidencia.

**Sin evidencia.** No existe interpretación de los cambios.

## 9. Presentación y entrega de archivos geoespaciales · 5 %

**Sobresaliente.** La presentación PowerPoint contiene las evidencias requeridas, mantiene una secuencia metodológica clara y está acompañada de todos los datasets, polígonos, raster y máscara utilizados, correctamente identificados y accesibles.

**Sólido.** La presentación y los archivos están completos, con pequeñas deficiencias de organización.

**Aceptable.** La presentación permite comprender el ejercicio, pero existen omisiones menores en evidencias o archivos complementarios.

**Insuficiente.** Faltan productos geoespaciales importantes, la presentación está desorganizada o los resultados no pueden revisarse adecuadamente.

**Sin evidencia.** No se entrega una presentación o material técnico evaluable.

## Bono adicional · Variable espacial asociada al cambio

**Bonificación: hasta +0,30 puntos sobre la nota base**, sin superar la calificación final de **5,0**.

Para obtenerla deberá entregarse al menos un raster georreferenciado de una variable espacial independiente potencialmente relacionada con las transformaciones observadas.

| Evidencia del bono | Bonificación máxima |
|---|---:|
| Raster técnicamente válido y georreferenciado | +0,15 |
| Justificación de la variable y relación con los cambios | +0,15 |
| **Total** | **+0,30** |

Entregar varias variables no incrementará el bono máximo.

El bono no exige predicción ni simulación con MOLUSCE y no sustituye los productos obligatorios.

**Nota final = mínimo(5,0; nota base + bono).**

## Reglas de aplicación

- Los grupos estarán conformados por **exactamente dos estudiantes**.
- Cada criterio se evalúa con evidencias verificables.
- Las dos fechas deben evaluarse temáticamente de forma independiente.
- Se utilizará la proporción 70/30 de entrenamiento/validación establecida.
- No se exigirá cartografía formal.
- No se calificará la cantidad de índices adicionales por sí misma.
- Los refinamientos manuales deberán quedar declarados.
- La entrega de capturas de pantalla no sustituye los raster o polígonos requeridos.
- No se exige modelación predictiva ni generación de escenarios futuros.
- Un mismo error podrá afectar varios criterios únicamente cuando tenga consecuencias técnicas diferenciadas.

---

**Caso de aplicación:** `T4-LUL-001` · Barranquilla y periferia.  
**Versión:** 1.0.
