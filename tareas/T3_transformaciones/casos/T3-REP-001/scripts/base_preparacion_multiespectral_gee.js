// ============================================================================
// T3-REP-001 · Representaciones espectrales del paisaje urbano-agricola
// Sector Cali-Candelaria, valle del rio Cauca
//
// SCRIPT BASE · PREPARACION MULTIESPECTRAL
// Version 1.2
//
// Este script fija UNA observacion Sentinel-2 concreta para toda la TAREA.
// NO resuelve firmas, indices ni PCA.
//
// Flujo:
// AOI -> granulo Sentinel-2 seleccionado -> Cloud Score+ -> mascara QA
//     -> reflectancia -> malla comun 20 m -> composiciones base
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

var PRODUCT_ID =
  'S2A_MSIL2A_20260810T153641_N0512_R068_T18NUJ_20260811T003714';

var QA_BAND = 'cs_cdf';
var CLEAR_THRESHOLD = 0.60;

var ANALYSIS_SCALE = 20;

// CRS comun del caso: UTM zona 18N.
var TARGET_CRS = 'EPSG:32618';

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
// 2. SELECCION DEL GRANULO
//
// Durante la auditoria del 10-ago-2026 se encontraron tres granulos.
// Se fija el producto T18NUJ de Sentinel-2A porque cubre el 100 % del AOI
// bajo la mascara del caso a 20 m y presenta menor nubosidad global que
// la otra observacion Sentinel-2A con cobertura completa.
//
// No se construye mosaico diario.
// ============================================================================

var s2Selected = ee.ImageCollection(
    'COPERNICUS/S2_SR_HARMONIZED'
  )
  .filterBounds(aoi)
  .filterDate(DATE, ee.Date(DATE).advance(1, 'day'))
  .filter(
    ee.Filter.eq(
      'PRODUCT_ID',
      PRODUCT_ID
    )
  );

var csPlus = ee.ImageCollection(
  'GOOGLE/CLOUD_SCORE_PLUS/V1/S2_HARMONIZED'
);

var linked = s2Selected.linkCollection(
  csPlus,
  [QA_BAND]
);

print('Fecha fija:', DATE);
print('Producto fijo:', PRODUCT_ID);
print('Numero de productos seleccionados:', linked.size());

var raw = ee.Image(
  linked.first()
);

print('MGRS:', raw.get('MGRS_TILE'));
print('Satelite:', raw.get('SPACECRAFT_NAME'));
print(
  'CLOUDY_PIXEL_PERCENTAGE de la escena:',
  raw.get('CLOUDY_PIXEL_PERCENTAGE')
);


// ============================================================================
// 3. MASCARA DE CALIDAD Y REFLECTANCIA
// ============================================================================

var clear = raw
  .select(QA_BAND)
  .gte(CLEAR_THRESHOLD);

var scl = raw.select('SCL');

var sclValid = scl
  .neq(0)       // no data
  .and(scl.neq(1))    // saturated / defective
  .and(scl.neq(3))    // cloud shadow
  .and(scl.neq(8))    // cloud medium probability
  .and(scl.neq(9))    // cloud high probability
  .and(scl.neq(10))   // cirrus
  .and(scl.neq(11));  // snow / ice

// Se conserva agua: puede aportar contraste espectral en T3.
var spectralValid = raw
  .select(ANALYSIS_BANDS)
  .mask()
  .reduce(
    ee.Reducer.min()
  );

var validMask = clear
  .and(sclValid)
  .and(spectralValid)
  .rename('valid');

var reflectance = raw
  .select(ANALYSIS_BANDS)
  .multiply(0.0001)
  .toFloat()
  .updateMask(validMask)
  .clip(aoi);

print(
  'Observacion seleccionada y enmascarada:',
  reflectance
);


// ============================================================================
// 4. COBERTURA VALIDA DEL GRANULO A 20 m
// ============================================================================

var validPctGranule = ee.Number(
  validMask
    .unmask(0)
    .reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: aoi,
      scale: ANALYSIS_SCALE,
      crs: TARGET_CRS,
      maxPixels: 1e8,
      tileScale: 4
    })
    .get('valid')
)
.multiply(100);

print(
  'Cobertura valida del granulo a 20 m [%]:',
  validPctGranule
);


// ============================================================================
// 5. MALLA COMUN DE 20 m
//
// Las bandas continuas se remuestrean bilinealmente sobre EPSG:32618 a 20 m.
// Esta malla comun se utiliza para comparaciones multibanda y PCA.
// ============================================================================

var targetProjection = ee.Projection(
  TARGET_CRS
).atScale(
  ANALYSIS_SCALE
);

print(
  'Proyeccion comun de analisis:',
  targetProjection
);

function toCommon20m(bandName) {

  return reflectance
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

var pcaInput = analysis20m.select(
  PCA_BANDS
);

print(
  'Bandas de analysis20m:',
  analysis20m.bandNames()
);

print(
  'Bandas reservadas para PCA:',
  pcaInput.bandNames()
);


// ============================================================================
// 6. COBERTURA DE LA PREPARACION FINAL
// ============================================================================

var commonValid = analysis20m
  .mask()
  .reduce(
    ee.Reducer.min()
  )
  .rename('valid_common');

var validPctFinal = ee.Number(
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
  validPctFinal
);


// ============================================================================
// 7. COMPOSICIONES BASE
//
// Estas capas son referencias comunes de visualizacion.
// La evidencia E3 exige INTERPRETAR los contrastes; no basta con mostrarlas.
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
// Las geometrias NO son muestras de entrenamiento.


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
print('T3-REP-001 · SCRIPT BASE v1.2');
print('Producto:', PRODUCT_ID);
print('Fecha:', DATE);
print('Cloud Score+: cs_cdf >=', CLEAR_THRESHOLD);
print('CRS comun:', TARGET_CRS);
print('Escala comun [m]:', ANALYSIS_SCALE);
print('Este script NO calcula firmas, indices ni PCA.');
print('============================================================');


// ============================================================================
// FIN
// ============================================================================
