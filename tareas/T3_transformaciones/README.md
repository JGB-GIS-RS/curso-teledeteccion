# T3 · Transformaciones y estructura espectral

## Pregunta guía

> **¿Cómo cambia la interpretación de un territorio cuando la información multiespectral se representa mediante bandas originales, composiciones, índices espectrales y transformaciones estadísticas?**

## Núcleo técnico

T3 estudia cómo reorganizar, sintetizar e interpretar la información multiespectral para revelar contrastes, redundancia y estructura espectral.

La secuencia conceptual de T3 es:

`respuesta espectral → composición → índice → PCA → comparación → interpretación`

La TAREA no evalúa cuántas transformaciones puede calcular el estudiante. Evalúa su capacidad para explicar **qué información conserva, resalta, combina o vuelve menos evidente cada representación y bajo qué propósito resulta útil**.

## Contenidos principales

- firmas espectrales;
- composiciones de bandas;
- índices espectrales dirigidos;
- análisis de componentes principales (PCA);
- control de calidad y soporte espectral;
- comparación e interpretación de representaciones.

Tasseled Cap forma parte de los contenidos del capítulo, pero **no es un requisito de la TAREA 3**. Podrá abordarse en clase o como extensión no evaluada.

## Enfoque analítico

El trabajo parte de una observación multiespectral controlada y avanza desde la respuesta espectral original hacia representaciones cada vez más transformadas.

El estudiante deberá diferenciar entre:

- observación directa mediante bandas;
- reorganización visual mediante composiciones;
- transformación dirigida mediante índices;
- transformación estadística no dirigida mediante PCA.

El objetivo es determinar qué aporta cada representación frente a las bandas originales y reconocer que una representación útil para un contraste no necesariamente lo es para otro.

## Casos disponibles

### [T3-REP-001 · Representaciones espectrales del paisaje urbano–agrícola del valle del río Cauca](casos/T3-REP-001/)

Caso de análisis con Sentinel-2 sobre el sector Cali–Candelaria orientado a:

- firmas espectrales de superficies de referencia;
- composiciones RGB, falso color y SWIR;
- NDVI y NDBI;
- PCA multiespectral;
- comparación entre transformaciones dirigidas y no dirigidas;
- interpretación de ventajas, ambigüedades y pérdidas de información.

## Frontera con T4

T3 no incluye clasificación supervisada, entrenamiento de modelos, matrices de confusión ni evaluación de exactitud temática.

Las superficies de referencia utilizadas para firmas espectrales no constituyen muestras de entrenamiento.

La clasificación, validación y modelación corresponden a T4.

## Estado

Arquitectura académica definida. El caso T3-REP-001 cuenta con diseño técnico y evidencias obligatorias definidas; los materiales específicos de datos y scripts se incorporarán progresivamente.
