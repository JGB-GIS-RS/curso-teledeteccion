# T4 · Clasificación, validación y modelación territorial

## Pregunta guía

> **¿Cómo clasificar, validar y modelar el cambio territorial de manera técnicamente defendible?**

## Núcleo técnico

T4 integra clasificación temática, validación independiente, análisis de cambio y, cuando la evidencia lo permita, modelación prospectiva.

## Secuencia base

`datos → muestras → clasificador → mapa LULC → validación → análisis de cambio`

El estudiante deberá justificar nomenclatura de clases, diseño de entrenamiento, algoritmo, datos de referencia y estrategia de validación. La evaluación no se limitará a la precisión global: deberán analizarse errores por clase, omisión/comisión y fuentes de incertidumbre.

## Cambio territorial

Con mapas LULC de dos tiempos conocidos pueden evaluarse persistencias, ganancias, pérdidas y transiciones mediante matrices y mapas de cambio.

## Modelación prospectiva

Cuando se utilice MOLUSCE u otro esquema predictivo, la predicción deberá validarse retrospectivamente antes de proyectar escenarios futuros. Una estructura defendible es:

`LULC(t1) + LULC(t2) → LULC_pred(t3)`

seguida de comparación contra `LULC_obs(t3)`.

Solo si el modelo reproduce razonablemente el estado conocido se justificará una proyección posterior. Un resultado técnicamente válido puede ser concluir que la predicción futura **no está suficientemente respaldada**.

Los mapas futuros se interpretarán como simulaciones condicionadas o escenarios plausibles, no como certeza territorial.

## Modalidades de desarrollo

T4 podrá incorporar, en su versión final, modalidades diferenciadas de desafío —Réplica, Extensión, Caso nuevo y Desafío avanzado—. Su relación con la calificación se definirá conjuntamente con la rúbrica oficial.

## Casos disponibles

### [T4-LUL-001 · Clasificación supervisada y análisis retrospectivo de cambios LULC en Barranquilla](casos/T4-LUL-001/)

Caso de clasificación supervisada de dos escenas Landsat 8 (2015–2020 o 2020–2025), evaluación temática y análisis de transiciones con MOLUSCE, **sin predicción**. Grupos de exactamente dos estudiantes; presentación PowerPoint y productos geoespaciales. [Rúbrica específica](../../docs/rubricas/T4-LUL-001_rubrica.md).

## Estado

Arquitectura académica definida. El caso T4-LUL-001 está publicado; las modalidades de mayor alcance, incluida la modelación prospectiva, permanecen en desarrollo.
