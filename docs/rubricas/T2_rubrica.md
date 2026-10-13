# Rúbrica de evaluación · TAREA 2

## Cambio espectral y recuperación postincendio

**Serie Técnica de Teledetección · Versión 1.0**

Esta rúbrica evalúa la calidad de las decisiones técnicas, la solidez de la evidencia y la coherencia entre calidad de observación, fundamento espectral, análisis temporal, interpretación e incertidumbre. No se califican secuencias de software, cantidad de mapas ni sofisticación de herramientas por sí mismas.

## Escala de desempeño

| Nivel | Rango | Significado general |
|---|---:|---|
| Sobresaliente | 4.5–5.0 | Análisis riguroso, integrado, sustentado y crítico. |
| Sólido | 3.8–4.4 | Trabajo correcto y bien sustentado, con limitaciones menores. |
| Aceptable | 3.0–3.7 | Cumple lo esencial, pero presenta debilidades de profundidad, integración o justificación. |
| Insuficiente | 1.0–2.9 | Evidencia incompleta, errores conceptuales o inferencias débilmente justificadas. |
| Sin evidencia | 0 | El criterio no fue abordado o no existe evidencia verificable. |

## Ponderación

| Criterio | Peso |
|---|---:|
| 1. Planteamiento del problema y objetivo | 5 % |
| 2. Calidad y soporte observacional | 15 % |
| 3. Fundamentación espectral de NBR/dNBR | 12 % |
| 4. Diseño temporal y comparabilidad | 10 % |
| 5. Análisis de la perturbación PRE–POST | 15 % |
| 6. Análisis de la evolución y recuperación espectral | 15 % |
| 7. Discusión, robustez e incertidumbre | 10 % |
| 8. Integración e interpretación técnica | 8 % |
| 9. Calidad de la evidencia técnica | 5 % |
| 10. Reproducibilidad, escritura científica y cumplimiento editorial | 5 % |
| **Total** | **100 %** |

La nota final se calcula como:

`Nfinal = 0.05N1 + 0.15N2 + 0.12N3 + 0.10N4 + 0.15N5 + 0.15N6 + 0.10N7 + 0.08N8 + 0.05N9 + 0.05N10`

Cada criterio se califica en escala de 0 a 5.

---

## 1. Planteamiento del problema y objetivo · 5 %

**Sobresaliente.** Formula con precisión el incendio como problema de cambio espectral multitemporal, diferencia perturbación, evolución espectral y recuperación ecológica y establece un objetivo coherente con la evidencia realmente disponible.

**Sólido.** Define correctamente el problema y el objetivo, con pequeñas simplificaciones terminológicas que no afectan la lógica del análisis.

**Aceptable.** Identifica el cambio postincendio como problema central, pero el objetivo es genérico o mezcla parcialmente cambio espectral, severidad y recuperación ecológica.

**Insuficiente.** Formula un problema desconectado de la evidencia disponible, confunde índice con fenómeno o plantea como demostrable una recuperación ecológica que los datos no pueden sustentar.

**Sin evidencia.** No existe formulación técnica reconocible del problema ni del objetivo.

---

## 2. Calidad y soporte observacional · 15 %

**Sobresaliente.** Controla y documenta adecuadamente Cloud Score+, SCL, disponibilidad simultánea de B8A/B12 y máscaras válidas. Diferencia adquisiciones nominales, píxeles observados, píxeles válidos y píxeles comparables. Demuestra la limitación observacional de 2025 y evita inferir donde no existe soporte suficiente.

**Sólido.** El control de calidad y la cuantificación de cobertura son correctos; reconoce adecuadamente la insuficiencia de 2025 y las principales restricciones de observación, con omisiones menores.

**Aceptable.** Aplica máscaras de calidad funcionales y reporta cobertura, pero la distinción entre disponibilidad nominal y soporte efectivo es parcial o la documentación de 2025 es principalmente descriptiva.

**Insuficiente.** Selecciona imágenes por apariencia o nubosidad global, compara píxeles sin soporte equivalente, oculta regiones sin observación válida o fuerza un producto completo de 2025 pese a la insuficiencia de evidencia.

**Sin evidencia.** No existe control de calidad ni análisis de soporte observacional.

---

## 3. Fundamentación espectral de NBR/dNBR · 12 %

**Sobresaliente.** Explica correctamente el comportamiento de NIR y SWIR2 y relaciona NBR con estructura vegetal, contenido de agua y condiciones superficiales. Distingue con precisión entre respuesta espectral, perturbación biofísica y severidad ecológica y utiliza la literatura fundamental para sustentar condiciones de validez y limitaciones.

**Sólido.** La interpretación física de NBR/dNBR es correcta y está bien relacionada con el incendio; reconoce adecuadamente que dNBR no equivale automáticamente a severidad ecológica.

**Aceptable.** Describe correctamente la fórmula y el sentido general del índice, pero el fundamento físico es superficial o se apoya excesivamente en asociaciones del tipo «NBR sirve para incendios».

**Insuficiente.** Interpreta incorrectamente NIR/SWIR2, atribuye al índice propiedades que no mide directamente o transforma dNBR en severidad ecológica sin validación.

**Sin evidencia.** No existe fundamentación espectral.

---

## 4. Diseño temporal y comparabilidad · 10 %

**Sobresaliente.** Justifica de manera coherente PRE, POST, REC y REC-SENS; documenta separación temporal respecto del evento; reconoce el compromiso entre cobertura espacial y comparabilidad estacional; utiliza máscaras comunes explícitas y evita comparar estadísticos calculados sobre poblaciones espaciales distintas.

**Sólido.** El diseño temporal y las máscaras comunes son correctos y la comparabilidad estacional se discute adecuadamente, con pequeñas omisiones.

**Aceptable.** Utiliza correctamente las fechas establecidas y reconoce diferencias temporales, pero la justificación o el tratamiento de máscaras comunes es incompleto.

**Insuficiente.** Compara estados sobre coberturas espaciales incompatibles, ignora la diferencia estacional de REC o trata las fechas seleccionadas como perfectamente equivalentes sin discusión.

**Sin evidencia.** No existe diseño temporal reproducible.

---

## 5. Análisis de la perturbación PRE–POST · 15 %

**Sobresaliente.** Calcula y analiza correctamente NBR_PRE, NBR_POST y dNBR sobre una máscara comparable. Integra mapas continuos, estadísticos y distribución espacial para caracterizar magnitud y organización del cambio. Evita umbrales arbitrarios y no confunde los sectores de mayor dNBR con un perímetro oficial o clases de severidad.

**Sólido.** El análisis PRE–POST es correcto, espacialmente coherente y bien interpretado, aunque algún componente estadístico o de contextualización podría desarrollarse más.

**Aceptable.** Calcula correctamente dNBR y reconoce el patrón principal de cambio, pero la interpretación se apoya principalmente en el mapa o presenta análisis estadístico limitado.

**Insuficiente.** Presenta errores de signo, máscara o cálculo; interpreta todo dNBR positivo como área quemada; aplica umbrales de severidad no validados o reporta hectáreas quemadas derivadas de criterios arbitrarios.

**Sin evidencia.** No existe análisis PRE–POST verificable.

---

## 6. Análisis de la evolución y recuperación espectral · 15 %

**Sobresaliente.** Analiza coherentemente `NBR_REC - NBR_POST` y `NBR_REC - NBR_PRE`, distingue incremento posterior de retorno espectral a PRE y evita equiparar semejanza espectral con recuperación ecológica completa. Relaciona la evolución posterior con la magnitud de la perturbación inicial y reconoce heterogeneidad espacial.

**Sólido.** Las métricas de evolución están correctamente calculadas e interpretadas y se diferencia adecuadamente recuperación espectral de recuperación ecológica, con limitaciones menores de integración.

**Aceptable.** Calcula correctamente las diferencias principales, pero su interpretación es principalmente descriptiva o utiliza de forma ambigua el término recuperación.

**Insuficiente.** Interpreta cualquier incremento de NBR como recuperación ecológica, usa una razón normalizada sin justificar sus condiciones de estabilidad o compara REC con estados no espacialmente comparables.

**Sin evidencia.** No existe análisis de evolución posterior.

---

## 7. Discusión, robustez e incertidumbre · 10 %

**Sobresaliente.** Evalúa explícitamente la sensibilidad temporal mediante REC-SENS y determina si signo, magnitud y patrón espacial se mantienen en los sectores de mayor perturbación. Integra soporte observacional, estacionalidad, humedad, topografía, sombras y heterogeneidad de cobertura. Diferencia claramente incertidumbre de observación, incertidumbre temporal e incertidumbre interpretativa.

**Sólido.** La sensibilidad temporal está correctamente evaluada y las principales fuentes de incertidumbre son discutidas, aunque alguna implicación o prueba podría profundizarse.

**Aceptable.** Reconoce las principales limitaciones e incluye una comparación REC alternativa, pero la discusión de robustez es principalmente cualitativa o no se concentra suficientemente en las zonas perturbadas.

**Insuficiente.** Omite la sensibilidad temporal, trata REC como libre de incertidumbre, ignora estacionalidad/topografía o presenta conclusiones categóricas que no resisten la observación alternativa.

**Sin evidencia.** No existe análisis de robustez ni incertidumbre.

**Regla específica.** El uso de Q75/Q90 u otros percentiles internos solo es válido como herramienta de sensibilidad. No pueden presentarse como clases de severidad ni como delimitación del área quemada.

---

## 8. Integración e interpretación técnica · 8 %

**Sobresaliente.** Construye una argumentación integrada entre calidad de observación, NBR, dNBR, evolución POST–REC y sensibilidad temporal. Responde de manera explícita qué cambió, dónde, cuánto, qué evidencia existe de recuperación espectral y cuáles son los límites de la conclusión.

**Sólido.** La interpretación integra adecuadamente los principales resultados y mantiene coherencia entre evidencia y conclusión, con pequeñas omisiones.

**Aceptable.** Presenta una interpretación plausible, pero varios resultados permanecen aislados o la conclusión no reconstruye completamente la cadena de evidencia.

**Insuficiente.** La conclusión se apoya en mapas o valores individuales sin integrar calidad, comparabilidad e incertidumbre; contradice resultados previos o extrapola más allá de la evidencia.

**Sin evidencia.** No existe interpretación técnica integrada.

---

## 9. Calidad de la evidencia técnica · 5 %

**Sobresaliente.** Mapas, gráficos y tablas cumplen una función analítica clara, permiten verificar afirmaciones importantes y presentan escalas, leyendas, unidades y dominios comparables. NBR_PRE, NBR_POST y NBR_REC utilizan simbología coherente; las máscaras y regiones sin datos son identificables; no existe duplicación innecesaria.

**Sólido.** La evidencia es correcta, pertinente y legible, con detalles menores de diseño que no afectan su función.

**Aceptable.** Las evidencias requeridas están presentes y son comprensibles, pero varias funcionan principalmente como ilustración o presentan inconsistencias menores de escala, rotulado o comparación.

**Insuficiente.** Utiliza capturas de pantalla como evidencia principal, cambia escalas de color para exagerar diferencias, oculta áreas sin soporte o presenta figuras que no permiten comprobar las afirmaciones realizadas.

**Sin evidencia.** Faltan las evidencias técnicas esenciales.

---

## 10. Reproducibilidad, escritura científica y cumplimiento editorial · 5 %

**Sobresaliente.** Fechas, productos, bandas, umbrales de calidad, máscaras, scripts y geometrías son trazables. El análisis puede reconstruirse. La escritura es técnica, precisa y concisa; existe separación clara entre Metodología, Resultados, Discusión, Recomendación y Conclusiones; referencias y presentación cumplen las normas de la Serie Técnica.

**Sólido.** El trabajo es reproducible en sus aspectos esenciales y la escritura es clara, con errores menores de documentación o estilo.

**Aceptable.** La mayor parte del procedimiento puede reconstruirse, pero faltan algunos parámetros, fuentes o decisiones; la escritura presenta redundancias o imprecisiones terminológicas.

**Insuficiente.** El análisis no puede reproducirse adecuadamente, faltan parámetros críticos, se mezclan resultados y discusión o la redacción dificulta evaluar la trazabilidad técnica.

**Sin evidencia.** No existe documentación suficiente para establecer procedencia o reproducibilidad.

---

## Reglas de aplicación

- Se evalúan decisiones técnicamente sustentadas, no secuencias de botones.
- La calidad gráfica no compensa errores conceptuales o metodológicos.
- La selección de software no constituye criterio de mérito.
- Reconocer correctamente una limitación observacional constituye una buena decisión metodológica.
- La ausencia de un producto 2025 wall-to-wall no constituye una deficiencia cuando está correctamente demostrada.
- No se premia la aplicación de umbrales de severidad por sí misma.
- La transferencia de clases o umbrales desarrollados para otros ecosistemas requiere validación independiente.
- Un mismo error puede afectar más de un criterio solo cuando produce consecuencias técnicas distintas.
- Se evaluará la coherencia entre evidencia e interpretación, no la coincidencia con una respuesta predeterminada.

**Caso piloto de referencia:** `T2-INC-001` · Incendio del sector Romerales, PNN Los Nevados.
