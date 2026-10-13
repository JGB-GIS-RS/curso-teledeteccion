// ============================================================================
// T3-REP-001 · BLOQUE E2 · SUPERFICIES DE REFERENCIA Y FIRMAS ESPECTRALES
// Version 1.0
//
// REQUIERE:
// pegar este bloque DESPUES de:
//   base_preparacion_multiespectral_gee.js v1.2
//
// Variables que deben existir:
//   analysis20m
//   ANALYSIS_SCALE
//   TARGET_CRS
//
// Este bloque NO selecciona las superficies por el estudiante.
// Su funcion es:
//   1) registrar las geometrías elegidas;
//   2) auditar su tamaño y soporte;
//   3) extraer píxeles válidos;
//   4) calcular P25, mediana y P75 por banda;
//   5) producir una gráfica comparable de firmas.
//
// Las superficies de referencia NO son muestras de entrenamiento.
// ============================================================================


// ============================================================================
// 1. BANDAS PARA LAS FIRMAS
//
// Se conserva B8 y B8A porque aquí interesa observar la respuesta espectral
// disponible. La exclusión de B8 corresponde únicamente al PCA.
// ============================================================================

var SIGNATURE_BANDS = [
  'B2', 'B3', 'B4',
  'B5', 'B6', 'B7',
  'B8', 'B8A',
  'B11', 'B12'
];

// Longitudes de onda centrales aproximadas [nm] para ordenar la gráfica.
var WAVELENGTH_NM = [
  492, 560, 665,
  704, 741, 783,
  833, 865,
  1614, 2202
];

var SURFACES = [
  'vegetacion_vigorosa',
  'vegetacion_menor_respuesta',
  'superficie_construida',
  'suelo_expuesto'
];


// ============================================================================
// 2. GEOMETRIAS DEL ESTUDIANTE
//
// Antes de calcular NDVI, NDBI o PCA:
//
// a) dibuje 16 polígonos en GEE;
// b) use exactamente 4 polígonos por tipo de superficie;
// c) procure 9–25 píxeles válidos de 20 m por polígono;
// d) evite bordes, sombras, nubes y sectores heterogéneos;
// e) distribuya los polígonos espacialmente dentro del AOI.
//
// Nombre las geometrías dibujadas así:
//
//   veg_vigor_01 ... veg_vigor_04
//   veg_menor_01 ... veg_menor_04
//   construido_01 ... construido_04
//   suelo_01 ... suelo_04
//
// Luego reemplace la colección vacía por las 16 líneas del bloque comentado.
// ============================================================================

var referencePolygons = ee.FeatureCollection([]);

/*

var referencePolygons = ee.FeatureCollection([

  ee.Feature(veg_vigor_01, {
    surface: 'vegetacion_vigorosa',
    sample_id: 'VV01'
  }),
  ee.Feature(veg_vigor_02, {
    surface: 'vegetacion_vigorosa',
    sample_id: 'VV02'
  }),
  ee.Feature(veg_vigor_03, {
    surface: 'vegetacion_vigorosa',
    sample_id: 'VV03'
  }),
  ee.Feature(veg_vigor_04, {
    surface: 'vegetacion_vigorosa',
    sample_id: 'VV04'
  }),

  ee.Feature(veg_menor_01, {
    surface: 'vegetacion_menor_respuesta',
    sample_id: 'VM01'
  }),
  ee.Feature(veg_menor_02, {
    surface: 'vegetacion_menor_respuesta',
    sample_id: 'VM02'
  }),
  ee.Feature(veg_menor_03, {
    surface: 'vegetacion_menor_respuesta',
    sample_id: 'VM03'
  }),
  ee.Feature(veg_menor_04, {
    surface: 'vegetacion_menor_respuesta',
    sample_id: 'VM04'
  }),

  ee.Feature(construido_01, {
    surface: 'superficie_construida',
    sample_id: 'SC01'
  }),
  ee.Feature(construido_02, {
    surface: 'superficie_construida',
    sample_id: 'SC02'
  }),
  ee.Feature(construido_03, {
    surface: 'superficie_construida',
    sample_id: 'SC03'
  }),
  ee.Feature(construido_04, {
    surface: 'superficie_construida',
    sample_id: 'SC04'
  }),

  ee.Feature(suelo_01, {
    surface: 'suelo_expuesto',
    sample_id: 'SE01'
  }),
  ee.Feature(suelo_02, {
    surface: 'suelo_expuesto',
    sample_id: 'SE02'
  }),
  ee.Feature(suelo_03, {
    surface: 'suelo_expuesto',
    sample_id: 'SE03'
  }),
  ee.Feature(suelo_04, {
    surface: 'suelo_expuesto',
    sample_id: 'SE04'
  })

]);

*/


// ============================================================================
// 3. FUNCION DE ANALISIS
// ============================================================================

function runReferenceAnalysis(polygons) {

  // --------------------------------------------------------------------------
  // 3.1. Control de cantidad
  // --------------------------------------------------------------------------

  print(
    'Numero total de poligonos de referencia:',
    polygons.size()
  );

  SURFACES.forEach(function(surfaceName) {

    print(
      'Poligonos · ' + surfaceName + ':',
      polygons
        .filter(
          ee.Filter.eq(
            'surface',
            surfaceName
          )
        )
        .size()
    );

  });


  // --------------------------------------------------------------------------
  // 3.2. Auditoria de area y pixeles validos por poligono
  //
  // 9–25 pixeles es el intervalo recomendado, no un umbral biofisico.
  // Si una superficie exige apartarse de ese intervalo, debe justificarse.
  // --------------------------------------------------------------------------

  var auditedPolygons = analysis20m
    .select('B2')
    .reduceRegions({
      collection: polygons,
      reducer: ee.Reducer.count(),
      scale: ANALYSIS_SCALE,
      crs: TARGET_CRS,
      tileScale: 4
    })
    .map(function(feature) {

      var n = ee.Number(
        feature.get('count')
      );

      var areaHa = feature
        .geometry()
        .area(1)
        .divide(10000);

      var withinRecommendedSize = n
        .gte(9)
        .and(
          n.lte(25)
        );

      return feature.set({
        valid_pixels: n,
        area_ha: areaHa,
        size_check: ee.Algorithms.If(
          withinRecommendedSize,
          'OK_9_25',
          'REVISAR'
        )
      });

    });

  print(
    'Auditoria de poligonos:',
    auditedPolygons.select([
      'surface',
      'sample_id',
      'valid_pixels',
      'area_ha',
      'size_check'
    ])
  );


  // --------------------------------------------------------------------------
  // 3.3. Visualizacion
  // --------------------------------------------------------------------------

  Map.addLayer(
    polygons.style({
      color: 'FFFF00',
      fillColor: '00000000',
      width: 2
    }),
    {},
    'E2 · Superficies de referencia',
    true
  );


  // --------------------------------------------------------------------------
  // 3.4. Extraccion de pixeles
  //
  // Se extraen todos los pixeles validos que caen dentro de los poligonos.
  // No se convierten en clases ni se usan para entrenamiento.
  // --------------------------------------------------------------------------

  var pixelSamples = analysis20m
    .select(SIGNATURE_BANDS)
    .sampleRegions({
      collection: polygons,
      properties: [
        'surface',
        'sample_id'
      ],
      scale: ANALYSIS_SCALE,
      projection: ee.Projection(TARGET_CRS).atScale(ANALYSIS_SCALE),
      geometries: false,
      tileScale: 4
    });

  print(
    'Pixeles extraidos:',
    pixelSamples.size()
  );


  // --------------------------------------------------------------------------
  // 3.5. Estadisticos por superficie y banda
  //
  // Para cada tipo de superficie:
  //   P25
  //   mediana
  //   P75
  //
  // La mediana representa la firma central.
  // P25-P75 representa dispersion interna y posibles solapamientos.
  // --------------------------------------------------------------------------

  var bandList = ee.List(
    SIGNATURE_BANDS
  );

  var wavelengthList = ee.List(
    WAVELENGTH_NM
  );

  var surfaceList = ee.List(
    SURFACES
  );

  var signatureStats = ee.FeatureCollection(

    surfaceList.map(function(surfaceName) {

      surfaceName = ee.String(
        surfaceName
      );

      var subset = pixelSamples.filter(
        ee.Filter.eq(
          'surface',
          surfaceName
        )
      );

      return ee.FeatureCollection(

        ee.List.sequence(
          0,
          bandList.size().subtract(1)
        )
        .map(function(i) {

          i = ee.Number(i);

          var bandName = ee.String(
            bandList.get(i)
          );

          var stats = subset.reduceColumns({
            reducer: ee.Reducer.percentile([
              25,
              50,
              75
            ]),
            selectors: [
              bandName
            ]
          });

          return ee.Feature(null, {
            surface: surfaceName,
            band: bandName,
            wavelength_nm: wavelengthList.get(i),
            p25: stats.get('p25'),
            median: stats.get('p50'),
            p75: stats.get('p75'),
            n_pixels: subset.aggregate_count(
              bandName
            )
          });

        })

      );

    })

  )
  .flatten();

  print(
    'Estadisticos de firmas · P25 / mediana / P75:',
    signatureStats
  );


  // --------------------------------------------------------------------------
  // 3.6. Grafica principal
  //
  // La grafica muestra la MEDIANA.
  // La dispersion P25-P75 se conserva en signatureStats y debe analizarse.
  // --------------------------------------------------------------------------

  var medianChart = ui.Chart.feature.groups({
      features: signatureStats,
      xProperty: 'wavelength_nm',
      yProperty: 'median',
      seriesProperty: 'surface'
    })
    .setChartType(
      'LineChart'
    )
    .setOptions({
      title: 'Firmas espectrales · mediana por superficie',
      hAxis: {
        title: 'Longitud de onda central aproximada [nm]'
      },
      vAxis: {
        title: 'Reflectancia superficial'
      },
      lineWidth: 2,
      pointSize: 5,
      interpolateNulls: false
    });

  print(
    medianChart
  );


  // --------------------------------------------------------------------------
  // 3.7. Salidas para el informe
  // --------------------------------------------------------------------------

  print(
    'E2a · Use auditedPolygons para documentar localizacion, tamaño y soporte.'
  );

  print(
    'E2b · Use medianChart junto con P25-P75 para interpretar contraste y solapamiento.'
  );

  print(
    'Regla: estas superficies NO son training samples y no deben convertirse en una clasificación.'
  );

}


// ============================================================================
// 4. CONTROL DE EJECUCION
//
// El archivo puede ejecutarse aun sin geometrías.
// Cuando referencePolygons está vacío imprime la instrucción y no falla.
// ============================================================================

referencePolygons.size().evaluate(function(n) {

  if (n === 0) {

    print(
      'E2 pendiente: dibuje y registre las 16 superficies de referencia.'
    );

    print(
      'Use 4 polígonos por tipo y seleccione las geometrías ANTES de calcular NDVI, NDBI o PCA.'
    );

  } else {

    runReferenceAnalysis(
      referencePolygons
    );

  }

});


// ============================================================================
// FIN · BLOQUE E2
// ============================================================================
