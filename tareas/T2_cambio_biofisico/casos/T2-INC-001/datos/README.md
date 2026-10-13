# Datos · T2-INC-001

## Área de estudio

El archivo [`aoi_analysis.geojson`](aoi_analysis.geojson) contiene el **dominio de análisis** utilizado en el caso T2-INC-001.

### Definición

- **Centro:** `[-75.36135, 4.95285]`
- **Radio nominal:** 1000 m
- **Sistema de referencia:** WGS 84, coordenadas geográficas longitud/latitud
- **Área aproximada del polígono de intercambio:** 310.6 ha
- **Geometría:** polígono derivado de un buffer geodésico de 1 km alrededor del centro del caso

La geometría puede regenerarse en Google Earth Engine mediante:

```javascript
var fireCandidateRef = ee.Geometry.Point([
  -75.36135,
   4.95285
]);

var aoiAnalysis = fireCandidateRef.buffer(1000);
```

> **Importante:** el AOI_ANALYSIS es un dominio de trabajo diseñado para contener la zona de perturbación y territorio circundante de referencia. **No representa el perímetro oficial del incendio, no constituye una delimitación de la cicatriz y no debe utilizarse como superficie quemada.**

La ligera diferencia que pueda existir entre el área del GeoJSON y una regeneración directa del buffer en diferentes motores geométricos se debe a la representación poligonal del círculo y no modifica la definición nominal del AOI de 1 km.
