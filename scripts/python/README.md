# Python

Esta carpeta reúne notebooks, scripts y utilidades de Python utilizados en el curso de Teledetección.

## Principios de publicación

- código reproducible y comentado en función del problema técnico;
- dependencias y versiones relevantes documentadas;
- separación clara entre entradas, procesamiento y salidas;
- rutas relativas o parámetros configurables, evitando rutas locales personales;
- resultados derivados acompañados por metadatos suficientes para su interpretación.

Los scripts específicos de un caso podrán permanecer dentro de la carpeta del propio caso cuando ello mejore la trazabilidad.

## Notebooks disponibles

Los notebooks publicados en esta carpeta siguen una secuencia docente orientada a reconstruir explícitamente procesos radiométricos y térmicos con imágenes Landsat 9.

### 000 · Landsat 9 · Corrección atmosférica DOS1

- [`000_2026_RS_L9_DOS1_GEE.ipynb`](000_2026_RS_L9_DOS1_GEE.ipynb) — implementación docente y reproducible del método Dark Object Subtraction (DOS1) con Google Colab y Google Earth Engine.
- [Abrir en Google Colab](https://colab.research.google.com/github/JGB-GIS-RS/remote-sensing-course/blob/main/scripts/python/000_2026_RS_L9_DOS1_GEE.ipynb)

### 001 · Landsat 9 · Temperatura superficial mediante RTE

- [`001_2026_RS_L9_LST_RTE.ipynb`](001_2026_RS_L9_LST_RTE.ipynb) — estimación de temperatura superficial terrestre (LST) mediante radiancia térmica, emisividad derivada de NDVI y fracción de vegetación, parámetros atmosféricos auxiliares, ecuación de transferencia radiativa (RTE) e inversión de Planck.
- [Abrir en Google Colab](https://colab.research.google.com/github/JGB-GIS-RS/remote-sensing-course/blob/main/scripts/python/001_2026_RS_L9_LST_RTE.ipynb)

## Secuencia conceptual

`000 · DOS1` → reflectancia óptica corregida  
`001 · LST/RTE` → emisividad + atmósfera + radiancia térmica → temperatura superficial
