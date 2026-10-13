# T2 · Cambio biofísico espacio-temporal

## Pregunta guía

> **¿Qué información biofísica puede derivarse de las observaciones remotas, qué cambió en el territorio y con qué nivel de confianza puede sostenerse esa interpretación?**

## Núcleo técnico

T2 integra el control de calidad de productos de teledetección con la derivación y análisis de variables continuas y cambios retrospectivos.

El estudiante deberá reconocer el producto utilizado, su nivel de procesamiento, magnitud física, factores de escala, correcciones incorporadas, información de calidad y soporte observacional antes de comparar estados temporales.

La secuencia conceptual de T2 es:

`producto → control de calidad → variable/proxy → cambio → incertidumbre → interpretación`

La TAREA no evalúa la capacidad de calcular índices por sí sola. Evalúa la capacidad de convertir observaciones multitemporales en **evidencia defendible de cambio**.

## Líneas de trabajo

### T2-A · Variables biofísicas continuas y cambio espectral

Puede incluir NDVI, NDMI, NBR, NDWI, SAVI, LST u otra variable técnicamente justificada, junto con diferencias temporales, anomalías, estadística espacial, relaciones entre estados y análisis de incertidumbre.

### T2-B · Cambio categórico retrospectivo

Puede utilizar mapas LULC existentes para estudiar persistencias, ganancias, pérdidas, transiciones y localización espacial del cambio. En esta modalidad no se exige que el estudiante clasifique las imágenes ni se realiza predicción.

## Composiciones temporales

Cuando la nubosidad o la densidad de observaciones lo requieran, podrán utilizarse composiciones temporales justificadas:

`colección → máscara QA/nubes → ventana temporal → soporte por píxel → composición → producto derivado`

Una composición es un estadístico temporal, no una observación instantánea. La ventana temporal, el número de observaciones válidas por píxel y las consecuencias de utilizar una composición deberán documentarse.

No se forzará el uso de composiciones cuando una observación individual ofrezca mayor coherencia espacial o temporal.

## Casos disponibles

### [T2-INC-001 · Cambio espectral y recuperación postincendio en el sector Romerales, PNN Los Nevados](casos/T2-INC-001/)

Caso de análisis multitemporal con Sentinel-2 orientado a:

- control de calidad y soporte observacional;
- NBR y dNBR;
- perturbación PRE–POST;
- evolución POST–REC;
- sensibilidad temporal;
- incertidumbre y límites de interpretación.

## Frontera con las demás TAREAS

T2 no debe convertirse en un ejercicio de PCA/Tasseled Cap ni en una clasificación supervisada. Las transformaciones espectrales dominantes corresponden a T3; la clasificación, validación y modelación prospectiva corresponden a T4.

## Estado

Arquitectura académica definida. El caso T2-INC-001 se encuentra listo para piloto estudiantil.
