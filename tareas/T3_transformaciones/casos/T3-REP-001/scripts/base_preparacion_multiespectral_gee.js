// ============================================================================
// T3-REP-001 · Representaciones espectrales del paisaje urbano-agricola
// Sector Cali-Candelaria, valle del rio Cauca
//
// SCRIPT BASE · PREPARACION MULTIESPECTRAL
// Version 1.1
//
// Este script fija la observacion comun de la TAREA.
// NO resuelve firmas, indices ni PCA.
//
// Flujo:
// AOI -> Sentinel-2 + Cloud Score+ -> mascara QA -> reflectancia
//     -> mosaico diario -> malla comun 20 m -> composiciones base
// ============================================================================


// ============================================================================
// 0. AOI
// ============================================================================

var aoi = ee.Geometry.Rectangle([
  -76.55,
   3.39,
  -76.36,
   3.56
]);

Map.centerObject(aoi, 11);

Map.addLayer(
  aoi,
  {color: 'FFFF00'},
  'AOI · T3-REP-001',
  true
);

print(
  'Area AOI [km2]:',
  aoi.area(1).divide(1e6)
);


// ============================================================================
// 1. PARAMETROS FIJOS DEL CASO
// ============================================================================

var DATE = '2026-08-10';

var QA_BAND = 'cs_cdf';
var CLEAR_THRESHOLD = 0.60;

var ANALYSIS_SCALE = 20;

// CRS proyectado comun del caso.
// Cali-Candelaria se encuentra en UTM zona 18N.
var TARGET_CRS = 'EPSG:32618';

// Bandas disponibles para el trabajo espectral.
// B8 se conserva porque se utiliza en falso color, NDVI y NDBI.
// El PCA del caso usa el subconjunto PCA_BANDS.
var ANALYSIS_BANDS = [
  'B2', 'B3', 'B4',
  'B5', 'B6', 'B7',
  'B8', 'B8A',
  'B11', 'B12'
];

var PCA_BANDS = [
  'B2', 'B3', 'B4',
  'B5', 'B6', 'B7',
  'B8A',
  'B11', 'B12'
];


// ============================================================================
// 2. COLECCIONES
// ============================================================================

var start = ee.Date(DATE);
var end = start.advance(1, 'day');

var s2 = ee.ImageCollection(
    'COPERNICUS/S2_SR_HARMONIZED'
  )
  .filterBounds(aoi)
  .filterDate(start, end);

var csPlus = ee.ImageCollection(
  'GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED'
);

var day = s2.linkCollection(
  csPlus,
  [QA_BAND]
);

print('Fecha fija:', DATE);
print('Granulos Sentinel-2 del dia:', day.size());


// ============================================================================
// 3. MASCARA DE CALIDAD POR GRANULO
// ============================================================================

function prepareGranule(img) {

  var clear = img
    .select(QA_BAND)
    .gte(CLEAR_THRESHOLD);

  var scl = img.select('SCL');

  var sclValid = scl
    .neq(0)       // no data
    .and(scl.neq(1))    // saturated / defective
    .and(scl.neq(3))    // cloud shadow
    .and(scl.neq(8))    // cloud medium probability
    .and(scl.neq(9))    // cloud high probability
    .and(scl.neq(10))   // cirrus
    .and(scl.neq(11));  // snow / ice

  // Exigimos soporte simultaneo en las bandas que se usaran en T3.
  var spectralValid = img
    .select(ANALYSIS_BANDS)
    .mask()
    .reduce(ee.Reducer.min());

  var valid = clear
    .and(sclValid)
    .and(spectralValid)
    .rename('valid');

  // Sentinel-2 SR Harmonized almacena reflectancia escalada por 10000.
  var reflectance = img
    .select(ANALYSIS_BANDS)
    .multiply(0.0001)
    .toFloat();

  return reflectance
    .addBands(img.select(QA_BAND))
    .addBands(valid)
    .updateMask(valid)
    .copyProperties(img, [
      'system:time_start',
      'PRODUCT_ID',
      'MGRS_TILE',
      'SPACECRAFT_NAME'
    ]);
}

var preparedGranules = day.map(prepareGranule);


// ============================================================================
// 4. OBSERVACION DIARIA UNICA
//
// Si el AOI intersecta varios granulos el mismo dia, qualityMosaic selecciona
// por pixel el granulo valido con mayor cs_cdf.
// ============================================================================

var daily = preparedGranules
  .qualityMosaic(QA_BAND)
  .clip(aoi);

print('Observacion diaria preparada:', daily);


// ============================================================================
// 5. MALLA COMUN DE 20 m
//
// Se fija explicitamente EPSG:32618 (UTM zona 18N) a 20 m.
//
// Las bandas continuas se remuestrean bilinealmente. Esta decision evita
// depender de la transformacion interna de un mosaico construido a partir de
// varios granulos, cuya transform() no debe pasarse directamente a reproject.
//
// No se cambia la resolucion fisica del sensor: se define una malla comun para
// que comparaciones multibanda y PCA utilicen el mismo soporte espacial.
// ============================================================================

var targetProjection = ee.Projection(TARGET_CRS)
  .atScale(ANALYSIS_SCALE);

print(
  'Proyeccion comun de analisis:',
  targetProjection
);

function toCommon20m(bandName) {

  return daily
    .select(bandName)
    .resample('bilinear')
    .reproject({
      crs: TARGET_CRS,
      scale: ANALYSIS_SCALE
    })
    .rename(bandName);
}

var analysis20m = ee.ImageCollection.fromImages(
  ANALYSIS_BANDS.map(function(bandName) {
    return toCommon20m(bandName);
  })
)
.toBands()
.rename(ANALYSIS_BANDS)
.clip(aoi);

var pcaInput = analysis20m.select(PCA_BANDS);

print('Bandas de analysis20m:', analysis20m.bandNames());
print('Bandas reservadas para PCA:', pcaInput.bandNames());


// ============================================================================
// 6. COBERTURA VALIDA DE LA PREPARACION FINAL
//
// Este valor es el que debe reportarse si se mantiene exactamente esta
// preparacion. La auditoria exploratoria previa se realizo a 120 m.
// ============================================================================

var commonValid = analysis20m
  .mask()
  .reduce(ee.Reducer.min())
  .rename('valid_common');

var validPct = ee.Number(
  commonValid
    .unmask(0)
    .reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: aoi,
      scale: ANALYSIS_SCALE,
      crs: TARGET_CRS,
      maxPixels: 1e8,
      tileScale: 4
    })
    .get('valid_common')
)
.multiply(100);

print(
  'Cobertura valida de la preparacion final [%]:',
  validPct
);


// ============================================================================
// 7. COMPOSICIONES BASE
//
// Se entregan como referencias comunes de visualizacion.
// La evidencia E3 exige INTERPRETAR por que cada composicion revela
// determinados contrastes; no basta con generarlas.
// ============================================================================

var VIS_RGB = {
  bands: ['B4', 'B3', 'B2'],
  min: 0.0,
  max: 0.30,
  gamma: 1.1
};

var VIS_NIR = {
  bands: ['B8', 'B4', 'B3'],
  min: 0.0,
  max: 0.40,
  gamma: 1.1
};

var VIS_SWIR = {
  bands: ['B12', 'B8A', 'B4'],
  min: 0.0,
  max: 0.40,
  gamma: 1.1
};

Map.addLayer(
  analysis20m,
  VIS_RGB,
  'RGB · B4/B3/B2',
  true
);

Map.addLayer(
  analysis20m,
  VIS_NIR,
  'Falso color · B8/B4/B3',
  false
);

Map.addLayer(
  analysis20m,
  VIS_SWIR,
  'SWIR · B12/B8A/B4',
  false
);

Map.addLayer(
  commonValid.selfMask(),
  {min: 0, max: 1},
  'Soporte espectral comun',
  false
);


// ============================================================================
// 8. CONTINUACION DEL TRABAJO DEL ESTUDIANTE
// ============================================================================

// TODO A · SUPERFICIES DE REFERENCIA
// Seleccione y documente superficies visualmente homogeneas.
// Como minimo:
//   - vegetacion agricola vigorosa
//   - vegetacion de menor respuesta / parcela cosechada
//   - superficie construida
//   - suelo expuesto
//
// Las geometrías NO son muestras de entrenamiento.


// TODO B · FIRMAS ESPECTRALES
// Extraiga y compare la reflectancia de las superficies de referencia.
// Justifique que regiones VIS, red-edge, NIR y SWIR aportan contraste.


// TODO C · NDVI Y NDBI
// Implemente ambos indices segun las ecuaciones del README del caso.
// Mantengalos como variables continuas y analice sus ambiguedades.


// TODO D · PCA
// Use exclusivamente 'pcaInput'.
// Requisitos:
//   - bandas centradas respecto de la media
//   - matriz de covarianza
//   - eigenvalues / eigenvectors
//   - varianza explicada y acumulada
//   - loadings de PC1, PC2 y PC3
//   - mapas PC1, PC2 y PC3
//
// No asigne significado biofisico a un componente sin evidencia.


// TODO E · COMPARACION INTEGRADORA
// Compare bandas/composiciones, NDVI, NDBI y PC1-PC3 segun contrastes
// territoriales concretos. No busque una representacion universalmente mejor.


// ============================================================================
// 9. RESUMEN
// ============================================================================

print('============================================================');
print('T3-REP-001 · SCRIPT BASE');
print('Producto:', 'COPERNICUS/S2_SR_HARMONIZED');
print('Fecha:', DATE);
print('Cloud Score+: cs_cdf >=', CLEAR_THRESHOLD);
print('CRS comun:', TARGET_CRS);
print('Escala comun [m]:', ANALYSIS_SCALE);
print('Este script NO calcula firmas, indices ni PCA.');
print('============================================================');


// ============================================================================
// FIN
// ============================================================================
