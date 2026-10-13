# T2-INC-001 · Cambio espectral y recuperación postincendio en el sector Romerales, PNN Los Nevados

**Serie Técnica de Teledetección · Informe Técnico No. 02**

## Planteamiento del caso

En octubre de 2024 se presentó un incendio de cobertura vegetal en el entorno del Parque Nacional Natural Los Nevados, con propagación hacia el sector de Romerales. El evento permite estudiar cómo una secuencia limitada de observaciones ópticas puede convertirse en evidencia cuantitativa de perturbación y evolución posterior de la vegetación.

En esta TAREA el sistema de observación ya está definido: **Sentinel-2 Level-2A / Surface Reflectance**. El problema no consiste en seleccionar un sensor, sino en establecer si las observaciones disponibles poseen calidad y soporte suficientes, derivar una variable espectral físicamente interpretable y analizar de manera crítica el cambio entre estados temporales.

La secuencia de trabajo es:

`observación → control de calidad → NBR → cambio PRE–POST → evolución POST–REC → sensibilidad → incertidumbre`

El objetivo no es producir un mapa de colores ni aplicar mecánicamente un índice. La TAREA deberá culminar en una **interpretación defendible del cambio espectral asociado al incendio y de la evidencia posterior de recuperación de la respuesta espectral de la vegetación**.

## Desafío técnico

> **¿Qué magnitud y distribución espacial presenta el cambio espectral de la vegetación asociado al incendio y qué evidencia Sentinel-2 permite sostener una recuperación posterior, considerando explícitamente las limitaciones de observación, comparabilidad temporal e interpretación?**

## Objetivo

**Cuantificar y analizar la distribución espacio-temporal del cambio espectral de la vegetación asociado al incendio mediante observaciones Sentinel-2, NBR y métricas de diferencia temporal, evaluando el soporte observacional, la evolución posterior y las principales fuentes de incertidumbre del análisis.**

## Diseño temporal del caso

El análisis principal utilizará los siguientes estados:

| Estado | Fecha | Función |
|---|---|---|
| **PRE** | 04-sep-2024 | Condición previa al incendio |
| **Evento** | 12-oct-2024 | Fecha de referencia del incendio |
| **POST** | 29-oct-2024 | Condición posterior al incendio |
| **REC** | 10-ago-2026 | Estado principal para evaluar evolución posterior |
| **REC-SENS** | 19-sep-2026 | Observación alternativa para evaluar sensibilidad temporal |

La selección de estas fechas responde a la disponibilidad efectiva de observaciones válidas sobre el dominio de análisis. Como referencia, la auditoría previa del caso encontró coberturas válidas aproximadas de **100 % para PRE**, **97.65 % para POST** y **94.06 % para REC**.

La observación REC-SENS presenta menor cobertura espacial, pero es más próxima estacionalmente al PRE y se utiliza exclusivamente para comprobar si la interpretación principal depende de la fecha elegida.

### El papel de 2025

El año 2025 **no constituye un cuarto estado obligatorio**. Su función es evidenciar una limitación observacional: durante el periodo estacionalmente comparable no se obtuvo una observación individual suficientemente completa para construir un estado espacialmente equivalente a PRE, POST y REC.

La TAREA deberá reconocer explícitamente que:

`disponibilidad nominal de imágenes ≠ soporte observacional efectivo`

No deberán inferirse resultados wall-to-wall para 2025 donde la evidencia no lo permita.

## Dominio de análisis

El caso utiliza un **AOI_ANALYSIS** de aproximadamente 1 km de radio, centrado en el sector candidato de perturbación identificado durante el diseño del caso.

El AOI cumple dos funciones:

- contener la zona donde se concentra el cambio espectral;
- incluir territorio circundante útil como referencia interna.

> **El AOI_ANALYSIS no representa el perímetro oficial del incendio ni debe interpretarse como superficie quemada.**

La delimitación exploratoria utilizada para construir el caso no forma parte del problema que deberán resolver los estudiantes.

## Datos y producto

El análisis utilizará:

- **Misión:** Sentinel-2.
- **Producto:** `COPERNICUS/S2_SR_HARMONIZED`.
- **Nivel:** Level-2A / Surface Reflectance.
- **Control de calidad complementario:** Cloud Score+ `cs_cdf`.
- **Umbral inicial de claridad:** `cs_cdf ≥ 0.60`.
- **Scene Classification Layer (SCL):** deberá utilizarse para excluir no-data, píxeles defectuosos, sombras de nube, nubes, cirrus, nieve/hielo y agua cuando corresponda al dominio terrestre analizado.
- **Bandas principales:** B8A y B12.
- **Resolución de análisis:** 20 m.

Las bandas se interpretarán como reflectancia superficial. Cuando se trabaje directamente con valores escalados del producto, deberá documentarse el factor correspondiente.

## Lecturas fundamentales

Las lecturas fundamentales del caso son:

1. **Delcourt et al. (2021).** *Evaluating the Differenced Normalized Burn Ratio for Assessing Fire Severity Using Sentinel-2 Imagery in Northeast Siberian Larch Forests*. Remote Sensing, 13(12), 2311. DOI: 10.3390/rs13122311.

2. **Han et al. (2026).** *An Improved Framework for Forest Fire Severity Assessment in Mountainous Areas Based on the dNBR Index: A Case Study from Central Yunnan, China*. Remote Sensing, 18(8), 1118. DOI: 10.3390/rs18081118.

Estas lecturas no se asignan para realizar una revisión bibliográfica extensa. Su función es sustentar decisiones concretas del método y, simultáneamente, delimitar las condiciones de validez y las principales fuentes de incertidumbre de NBR/dNBR.

## Materiales comunes

El estudiante deberá consultar conjuntamente:

- [Rúbrica de TAREA 2](../../../../docs/rubricas/T2_rubrica.md)
- [Guía para autores](../../../../docs/guia_general/guia_para_autores.md)
- [Informe técnico de referencia y base editable](../../../../examples/informe_tecnico_02/)

Los datos, geometrías y scripts específicos del caso se incorporarán en las subcarpetas correspondientes del caso antes de su aplicación en aula.

## Decisiones técnicas que debe resolver el informe

### 1. ¿Las observaciones son realmente comparables?

Antes de calcular cualquier índice, deberá comprobarse y documentarse la calidad de PRE, POST y REC.

La comparación solo será válida donde exista soporte espectral y de calidad suficiente. Deberá diferenciarse entre:

- adquisición disponible;
- píxel observado;
- píxel válido;
- píxel comparable entre estados.

No se aceptará como evidencia suficiente el porcentaje global de nubosidad de la escena.

### 2. ¿Qué significa el NBR en este problema?

Para cada estado se calculará:

[
NBR = \frac{\rho_{B8A}-\rho_{B12}}{\rho_{B8A}+\rho_{B12}}
]

El informe deberá explicar por qué el contraste NIR–SWIR2 responde a cambios en vegetación, humedad y condiciones superficiales asociadas al fuego.

No será suficiente afirmar que NBR “sirve para incendios”.

### 3. ¿Qué cambió entre PRE y POST?

La perturbación se expresará mediante:

[
dNBR = NBR_{PRE}-NBR_{POST}
]

Valores positivos indican una disminución de NBR entre PRE y POST.

El dNBR se analizará como **variable continua** mediante mapas, estadísticos y distribución espacial.

> **No deberán aplicarse automáticamente umbrales o categorías universales de severidad.**

Una disminución de NBR constituye evidencia de cambio espectral compatible con perturbación, pero no equivale por sí sola a una medida validada de severidad ecológica.

### 4. ¿Qué evidencia existe de evolución posterior?

La evolución POST→REC se analizará mediante:

[
\Delta NBR_{POST\rightarrow REC} = NBR_{REC}-NBR_{POST}
]

Valores positivos indican incremento de NBR respecto de la condición POST.

También se analizará:

[
\Delta NBR_{PRE\rightarrow REC} = NBR_{REC}-NBR_{PRE}
]

Esta segunda diferencia expresa la distancia espectral del estado REC respecto de PRE.

Un valor cercano a cero puede indicar semejanza espectral con PRE, pero **no demuestra recuperación ecológica completa**.

### 5. ¿Las comparaciones utilizan la misma población espacial?

Las comparaciones deberán utilizar máscaras comunes explícitas.

Para PRE–POST:

[
M_{PP}=M_{PRE}\cap M_{POST}
]

Para POST–REC:

[
M_{PR}=M_{POST}\cap M_{REC}
]

Cuando se comparen conjuntamente PRE, POST y REC:

[
M_{ALL}=M_{PRE}\cap M_{POST}\cap M_{REC}
]

No deberán compararse estadísticos calculados sobre poblaciones espaciales diferentes sin advertirlo y justificarlo.

### 6. ¿La interpretación de REC depende de la fecha elegida?

La observación principal de recuperación será **10-ago-2026** y la observación de sensibilidad será **19-sep-2026**.

La robustez deberá evaluarse sobre la superficie válida común, prestando especial atención a los sectores de mayor perturbación PRE–POST.

Podrán utilizarse subconjuntos internos definidos por percentiles de dNBR, por ejemplo:

- **Q75:** 25 % de los píxeles con mayor dNBR;
- **Q90:** 10 % de los píxeles con mayor dNBR.

Q75 y Q90 son herramientas de sensibilidad. **No representan área quemada ni clases de severidad.**

El interés principal será determinar si el signo, magnitud y patrón espacial de POST→REC se mantienen bajo la fecha alternativa.

### 7. ¿Qué puede afirmarse y qué no?

La evidencia obtenida deberá diferenciar claramente entre:

- cambio espectral;
- recuperación de la respuesta espectral;
- recuperación biofísica;
- recuperación ecológica.

La TAREA permite evaluar las dos primeras con Sentinel-2 y NBR. Las dos últimas requieren evidencia adicional y no deberán declararse como demostradas únicamente a partir del análisis espectral.

## Evidencias técnicas obligatorias

### E1. Contexto y diseño temporal

Mapa del AOI_ANALYSIS y esquema temporal que muestre PRE, evento, POST, REC y REC-SENS.

### E2. Soporte observacional

Evidencia cuantitativa de calidad y cobertura válida para los estados principales, junto con una demostración de la limitación observacional de 2025.

La evidencia deberá mostrar la diferencia entre número nominal de adquisiciones y observaciones efectivamente utilizables.

### E3. Estados espectrales

Mapas de **NBR_PRE, NBR_POST y NBR_REC** utilizando la misma escala visual y dominio espacial comparable.

### E4. Perturbación

Mapa continuo de dNBR PRE–POST, acompañado por un análisis de su distribución estadística y organización espacial.

No se evaluará positivamente la simple conversión de dNBR en clases de severidad no validadas.

### E5. Evolución posterior

Análisis de:

[
\Delta NBR_{POST\rightarrow REC}
]

y

[
\Delta NBR_{PRE\rightarrow REC}
]

La evidencia deberá permitir establecer dónde la respuesta espectral aumenta después del estado POST y hasta qué punto REC se aproxima espectralmente a PRE.

### E6. Robustez e incertidumbre

Análisis de sensibilidad mediante REC-SENS y discusión explícita de:

- soporte observacional;
- diferencia temporal entre adquisiciones;
- estacionalidad;
- humedad;
- topografía y sombras;
- heterogeneidad de la cobertura;
- alcance estrictamente espectral de NBR/dNBR.

La sensibilidad temporal deberá comprobar si las conclusiones principales se mantienen en los sectores de mayor perturbación PRE–POST.

## Producto técnico principal

El resultado fundamental de la TAREA será un:

> **Diagnóstico espacio-temporal del cambio espectral y de la evidencia de recuperación postincendio de la vegetación.**

El diagnóstico deberá responder de manera integrada:

- ¿qué cambió?;
- ¿cuánto cambió?;
- ¿dónde se concentra el cambio?;
- ¿qué evidencia existe de recuperación posterior?;
- ¿la conclusión depende de la fecha REC seleccionada?;
- ¿con qué nivel de confianza puede sostenerse la interpretación?

## Estructura del Informe Técnico No. 02

### Resumen

Problema, datos, diseño PRE–POST–REC, variable espectral, resultado principal, evidencia de recuperación y principal limitación.

### 1. Introducción

Problema técnico, fundamento de NBR/dNBR, antecedentes estrictamente necesarios y objetivo del estudio.

### 2. Área de estudio y datos

#### 2.1. Área de estudio

Contexto territorial y función del AOI_ANALYSIS.

#### 2.2. Datos

Producto Sentinel-2, fechas PRE/POST/REC, observación de sensibilidad, información de calidad y datos auxiliares cuando correspondan.

### 3. Metodología

#### 3.1. Diseño temporal y soporte observacional

#### 3.2. Control de calidad y máscaras comunes

#### 3.3. Cálculo de NBR

#### 3.4. Análisis PRE–POST mediante dNBR

#### 3.5. Análisis POST–REC y PRE–REC

#### 3.6. Sensibilidad temporal e incertidumbre

Flujo general recomendado:

`calidad → comparabilidad → NBR → dNBR → evolución posterior → sensibilidad → interpretación`

### 4. Resultados

#### 4.1. Soporte observacional

#### 4.2. Estados NBR PRE, POST y REC

#### 4.3. Magnitud y distribución del cambio PRE–POST

#### 4.4. Evolución POST–REC y relación REC–PRE

#### 4.5. Sensibilidad temporal

Los Resultados deberán presentar **qué se obtuvo** y no repetir el procedimiento descrito en Metodología.

### 5. Discusión

Interpretación del cambio espectral y de la evidencia de recuperación, relación con la literatura y análisis de las condiciones bajo las cuales la inferencia es válida.

#### 5.1. Alcance de los resultados e incertidumbre

Deberá diferenciarse explícitamente entre incertidumbre asociada a observación, temporalidad, ambiente, topografía y alcance conceptual de NBR/dNBR.

### 6. Recomendación técnica

Debe proponer una estrategia razonada de seguimiento remoto posterior del sector y responder:

> **¿qué observaciones adquiriría en adelante, con qué frecuencia y bajo qué condiciones consideraría confiable la evidencia de recuperación?**

### 7. Conclusiones

Conclusiones derivadas directamente de los resultados y vinculadas con el objetivo.

### Disponibilidad de datos y código

Identificación de productos Sentinel-2, geometrías, datos auxiliares, scripts, parámetros y productos generados necesarios para reproducir el análisis.

### Referencias

Según las normas editoriales de la Serie Técnica de Teledetección.

## Alcance de la TAREA

T2-INC-001 **no exige**:

- clasificación supervisada;
- Random Forest u otros clasificadores;
- matriz de confusión;
- mapas LULC;
- PCA;
- Tasseled Cap;
- MOLUSCE;
- modelación predictiva;
- delimitación oficial del área quemada;
- estimación de hectáreas quemadas mediante un umbral arbitrario;
- categorías de severidad transferidas sin validación.

Estos procedimientos podrán mencionarse como extensiones o trabajos posteriores, pero no constituyen productos de evaluación de esta TAREA.

## Condiciones de desarrollo

- Máximo dos autores por informe.
- El análisis deberá ser reproducible y las fuentes deberán quedar documentadas.
- Figuras y tablas deberán citarse en el texto antes de su aparición.
- NBR_PRE, NBR_POST y NBR_REC deberán representarse con escalas comparables.
- Las máscaras utilizadas en cada comparación deberán quedar documentadas.
- No deberán ocultarse regiones sin soporte observacional.
- Toda afirmación técnica relevante deberá sustentarse en datos, fundamentos físicos o literatura científica.
- Las limitaciones e incertidumbres deberán declararse explícitamente.
- Reconocer que una inferencia no puede realizarse con la evidencia disponible constituye una decisión metodológica válida.

## Criterio de éxito

La TAREA no se considera resuelta por haber calculado correctamente NBR o dNBR.

El trabajo será satisfactorio cuando exista coherencia demostrable entre:

`calidad de observación + fundamento espectral + comparación temporal + evidencia de cambio + sensibilidad + incertidumbre → interpretación defendible`

La calidad del trabajo dependerá tanto de lo que el estudiante pueda demostrar como de su capacidad para reconocer aquello que la evidencia no permite concluir.

## Pregunta integradora final

> **A partir de las observaciones Sentinel-2 disponibles, ¿qué evidencia permite sostener que el incendio produjo un cambio espectral en la vegetación, qué señales existen de recuperación posterior y cuáles son los límites de esa conclusión?**

---

**Versión del caso:** 1.0 · **Estado:** listo para piloto estudiantil · semestre 2026-2.
