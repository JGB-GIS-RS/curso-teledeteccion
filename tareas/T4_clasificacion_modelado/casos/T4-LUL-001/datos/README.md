# Datos suministrados · T4-LUL-001

Esta carpeta contiene los **datos geoespaciales adjuntados por el docente** para el ejercicio de clasificación supervisada y análisis retrospectivo de cambios de cobertura en Barranquilla.

## Archivos disponibles

| Archivo | Tipo | Función |
|---|---|---|
| [`aoi.shp`](aoi.shp) | Shapefile | Polígono de extensión del área de estudio |
| [`aoi.shx`](aoi.shx) | Shapefile | Índice geométrico del polígono |
| [`aoi.dbf`](aoi.dbf) | Shapefile | Tabla de atributos |
| [`aoi.prj`](aoi.prj) | Shapefile | Sistema de referencia |
| [`aoi.cpg`](aoi.cpg) | Shapefile | Codificación de caracteres |
| [`dominio_terrestre.tif`](dominio_terrestre.tif) | GeoTIFF | Dominio terrestre común y exclusión de agua / zonas no terrestres |

**Para abrir `aoi.shp` en QGIS es necesario descargar y mantener juntos los cinco archivos `aoi.*` de esta carpeta.** El GeoTIFF puede cargarse directamente.

Los seis archivos se incorporaron conservando los bytes originales de los insumos aportados para la tarea.

## Referencia geoespacial verificada

Ambos productos utilizan **WGS 84 / UTM zona 18N (EPSG:32618)**.

| Parámetro | Valor |
|---|---:|
| Límite oeste | 495735 m |
| Límite sur | 1196595 m |
| Límite este | 533445 m |
| Límite norte | 1230045 m |
| Resolución del raster | 30 m |
| Columnas | 1257 |
| Filas | 1115 |
| Píxeles del dominio terrestre (valor 1) | 908936 |
| Píxeles excluidos (valor 0 / NoData) | 492619 |

El polígono `aoi.shp` corresponde al rectángulo espacial de la malla raster.

**Interpretación de la máscara:**
- **1:** píxel incluido en el dominio terrestre.
- **0:** píxel excluido / NoData.

La máscara no es una clasificación temática exclusiva de cuerpos de agua: el valor 0 también abarca otras áreas no terrestres o excluidas. Debe aplicarse con la misma geometría y en ambas fechas de clasificación.

El atributo de texto `origen` del Shapefile es descriptivo y **no define el CRS**: la referencia válida es el archivo `aoi.prj`, EPSG:32618.

## Escenas Landsat que deben descargar los estudiantes

Los archivos de las imágenes satelitales **no están incluidos en esta carpeta y no serán suministrados por el docente**. Cada grupo deberá localizar y descargar directamente las dos escenas correspondientes al periodo que seleccione, utilizando los identificadores y fechas que se relacionan a continuación.

| Año | Fecha de adquisición | Identificador de escena Landsat 8 Collection 2 Level-2 |
|---|---|---|
| 2015 | 28-feb-2015 | `LC08_L2SP_009052_20150228_20200909_02_T1` |
| 2020 | 10-feb-2020 | `LC08_L2SP_009052_20200210_20200823_02_T1` |
| 2025 | 07-feb-2025 | `LC08_L2SP_009052_20250207_20250214_02_T1` |

Cada grupo, compuesto por **dos estudiantes**, seleccionará el periodo **2015–2020** o **2020–2025** y descargará las **dos escenas** de ese periodo. No es necesario descargar las tres escenas.

## Integridad de los archivos originales

Los siguientes valores SHA-256 permiten comprobar la integridad tras la descarga:

| Archivo | SHA-256 |
|---|---|
| `dominio_terrestre.tif` | `8f3361ea525671cf5e8e32b0fe32fc30931fe29ef78a793cb3fdddd3ae6140d7` |

## Relación con el caso

- [Enunciado T4-LUL-001](../README.md)
- [Rúbrica específica](../../../../../docs/rubricas/T4-LUL-001_rubrica.md)

**Alcance:** materiales de entrada para clasificación y análisis de cambios observados. No se exige predicción ni simulación futura.
