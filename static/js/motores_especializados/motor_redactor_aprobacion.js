// Motor redactor adaptado al informe aprobado con mayor detalle y rigor técnico

function leerValor(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  return parseFloat(el.value.replace(',', '.')) || 0;
}

function redactarInformeAprobacionDesdeFormulario() {
  const datos = {
    ingresosAyto: leerValor("input_ingresos_ayto"),
    gastosAyto: leerValor("input_gastos_ayto"),
    ingresosConsolidados: leerValor("input_ingresos_cons"),
    gastosConsolidados: leerValor("input_gastos_cons"),

    orn: leerValor("input_orns"),
    drn: leerValor("input_drns"),
    capacidadFinanciacion: leerValor("input_capacidad_num"),
    capacidadFinanciacionPct: leerValor("input_capacidad_pct"),

    enf_n1: leerValor("input_enf_n_1"),
    tasaIncremento: leerValor("input_tasa_incremento"),
    limiteGasto: leerValor("input_limite_gasto"),
    enf_n: leerValor("input_enf_n"),
    inversionesAAPP: leerValor("input_inversiones_aapp"),
    variacion413: leerValor("input_variacion_413"),
    enfAjustado: leerValor("input_enf_ajustado"),
    gradoEjecucion: leerValor("input_grado_ejecucion"),
    enfTrasAjustes: leerValor("input_enf_tras_ajuste"),
    resultadoReglaGasto: leerValor("input_resultado_regla")
  };
  return redactarInformeAprobacion(datos);
}

function redactarInformeAprobacion(datos = {}) {
  const {
    ingresosAyto = 0,
    gastosAyto = 0,
    ingresosConsolidados = 0,
    gastosConsolidados = 0,
    orn = 0,
    drn = 0,
    capacidadFinanciacion = 0,
    capacidadFinanciacionPct = 0,
    enf_n1 = 0,
    tasaIncremento = 0,
    limiteGasto = 0,
    enf_n = 0,
    inversionesAAPP = 0,
    variacion413 = 0,
    enfAjustado = 0,
    gradoEjecucion = 0,
    enfTrasAjustes = 0,
    resultadoReglaGasto = 0
  } = datos;

  return `
Informe de Intervención sobre la Aprobación del Presupuesto General

0.- Estructura del Informe
Este informe se estructura en seis bloques temáticos:
- Introducción: contextualiza el valor jurídico y político del presupuesto.
- Normativa Aplicable: recoge el marco legal que rige su aprobación.
- Procedimiento y Valor Jurídico: detalla el proceso administrativo y su validez jurídica.
- Desarrollo Técnico: análisis cuantitativo del equilibrio, estabilidad y regla de gasto.
- Conclusión Global: evaluación sintética del cumplimiento normativo.

1.- Introducción
La aprobación del Presupuesto General constituye un procedimiento esencial, reglado y obligatorio en la gestión económico-financiera de las administraciones locales.

2.- Normativa Aplicable

La aprobación presupuestaria se rige por un marco normativo amplio y jerarquizado que establece tanto las reglas sustantivas como los procedimientos formales que deben observarse. Entre las principales normas aplicables se encuentran:

- Texto Refundido de la Ley Reguladora de las Haciendas Locales (TRLRHL), aprobado por Real Decreto Legislativo 2/2004, que regula el contenido del presupuesto, su aprobación, ejecución, modificación y liquidación.

- Real Decreto 500/1990, por el que se desarrolla el capítulo I del título VI del TRLRHL, estableciendo el procedimiento de formación, aprobación inicial, exposición pública, aprobación definitiva y publicación del presupuesto.

- Orden EHA/3565/2008, que aprueba la estructura de los presupuestos de las entidades locales y determina su clasificación económica y funcional.

- Ley Orgánica 2/2012 de Estabilidad Presupuestaria y Sostenibilidad Financiera (LOEPSF), que impone límites y principios como el equilibrio, la estabilidad, la sostenibilidad financiera y la regla de gasto.

- Instrucción del Modelo Normal de Contabilidad Local (ICAL 2013), que armoniza el tratamiento contable del ciclo presupuestario y de la información económico-financiera.

Estas normas constituyen el soporte legal y técnico sobre el que se asienta tanto el contenido como la validez jurídica del presupuesto general que se aprueba.

3.- Procedimiento y Valor Jurídico del Acto
La aprobación del presupuesto general se configura como un acto jurídico reglado y esencial.

4.- Desarrollo Técnico y Análisis

 Primero. Equilibrio Presupuestario

El principio de equilibrio presupuestario, recogido en el artículo 165.4 del TRLRHL, exige que el presupuesto no presente déficit inicial. A nivel técnico, este equilibrio se verifica asegurando que las previsiones de ingresos igualen o superen los créditos consignados para gastos.

La comprobación del equilibrio no solo se limita a una comparación aritmética, sino que requiere analizar la congruencia entre los ingresos corrientes y los gastos de funcionamiento, especialmente en los capítulos económicos fundamentales. Asimismo, en el ámbito consolidado, resulta imprescindible contrastar las previsiones del Ayuntamiento con las de sus entes dependientes para detectar posibles desequilibrios estructurales.

A continuación, se presenta el análisis del equilibrio tanto en términos individuales como consolidados:
El equilibrio presupuestario es el principio por el cual los ingresos previstos deben cubrir en su totalidad los gastos autorizados. Este principio garantiza la sostenibilidad económica y financiera de la entidad local, impidiendo cualquier situación de déficit estructural.

- Ingresos del Ayuntamiento: ${ingresosAyto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Gastos del Ayuntamiento: ${gastosAyto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Ingresos Consolidados: ${ingresosConsolidados.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Gastos Consolidados: ${gastosConsolidados.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Diferencia Ayuntamiento: ${(ingresosAyto - gastosAyto).toLocaleString('es-ES', { minimumFractionDigits: 2 })} € (${ingresosAyto - gastosAyto >= 0 ? 'Superávit' : 'Déficit'})
- Diferencia Consolidado: ${(ingresosConsolidados - gastosConsolidados).toLocaleString('es-ES', { minimumFractionDigits: 2 })} € (${ingresosConsolidados - gastosConsolidados >= 0 ? 'Superávit' : 'Déficit'})

Conclusión: ${ingresosAyto === gastosAyto ? 'El presupuesto está equilibrado.' : ingresosAyto > gastosAyto ? 'Existe superávit presupuestario.' : 'Existe déficit presupuestario que debe corregirse.'}

 Segundo. Estabilidad Presupuestaria

La estabilidad presupuestaria constituye un principio rector en la elaboración del presupuesto, conforme a lo dispuesto en la Ley Orgánica 2/2012 de Estabilidad Presupuestaria y Sostenibilidad Financiera (LOEPSF). Supone que las operaciones no financieras de la entidad deben presentar, como mínimo, equilibrio, y preferiblemente, una capacidad de financiación.

A nivel práctico, este principio se traduce en la comparación entre los ingresos no financieros (capítulos 1 a 7 del estado de ingresos) y los gastos no financieros (capítulos 1 a 7 del estado de gastos), obteniendo así el saldo presupuestario no financiero. Este resultado se ajusta mediante los criterios de contabilidad nacional para estimar la capacidad o necesidad de financiación real conforme a los estándares SEC.

La LOEPSF establece que en caso de presentar necesidad de financiación, la entidad deberá justificar la excepción o adoptar las medidas necesarias para su corrección, ya sea mediante reducción de gasto, aumento de ingresos, o presentación de un plan económico-financiero.

A continuación, se presentan los datos principales que permiten valorar el cumplimiento del objetivo de estabilidad presupuestaria:
La estabilidad presupuestaria exige que los ingresos no financieros cubran plenamente los gastos no financieros, garantizando la sostenibilidad financiera a medio y largo plazo.

- Obligaciones Reconocidas Netas (Capítulos 1-7): ${orn.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Derechos Reconocidos Netos (Capítulos 1-7): ${drn.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Capacidad/Necesidad de Financiación: ${capacidadFinanciacion.toLocaleString('es-ES', { minimumFractionDigits: 2 })} € (${capacidadFinanciacionPct.toLocaleString('es-ES', { minimumFractionDigits: 2 })}%)

Conclusión: ${
  capacidadFinanciacion > 0
    ? "El presupuesto presenta una capacidad de financiación positiva, cumpliendo así plenamente con el objetivo de estabilidad presupuestaria."
    : capacidadFinanciacion < 0
    ? "El presupuesto presenta necesidad de financiación, lo que indica un incumplimiento del objetivo de estabilidad presupuestaria y requiere adoptar medidas correctoras inmediatas."
    : "El presupuesto se encuentra equilibrado en términos de estabilidad presupuestaria, sin capacidad ni necesidad adicional de financiación."
}

 Tercero. Regla de Gasto

La regla de gasto, establecida en el artículo 12 de la Ley Orgánica 2/2012 de Estabilidad Presupuestaria y Sostenibilidad Financiera, tiene como finalidad garantizar que el crecimiento del gasto computable de las administraciones públicas no supere el crecimiento potencial de la economía.

Para verificar su cumplimiento, se comparan los empleos no financieros del ejercicio anterior —ajustados conforme a los criterios del Sistema Europeo de Cuentas (SEC)— con los previstos en el presupuesto que se somete a aprobación. El cálculo incorpora, entre otros, los ajustes derivados de:

- Las inversiones financieramente sostenibles.
- La cuenta 413 de obligaciones pendientes de aplicación.
- El grado de ejecución del gasto previsto.

La regla actúa como límite al crecimiento estructural del gasto, excluyendo aquellos gastos no discrecionales o con financiación finalista (como fondos europeos o transferencias condicionadas de otras administraciones).

A continuación, se detallan los elementos cuantitativos del análisis:
La regla de gasto constituye un instrumento de disciplina fiscal diseñado para asegurar que el crecimiento del gasto no financiero de las administraciones públicas no supere la tasa de referencia del crecimiento del Producto Interior Bruto (PIB) a medio plazo.

- Empleos No Financieros (ENF) del ejercicio anterior (n-1): ${enf_n1.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Tasa de referencia de incremento autorizada: ${tasaIncremento.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
- Límite de gasto autorizado (ENF límite): ${limiteGasto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Gasto no financiero previsto (ENF n): ${enf_n.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Inversiones AAPP excluidas: ${inversionesAAPP.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Ajuste por obligaciones pendientes (variación cuenta 413): ${variacion413.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- ENF Ajustado: ${enfAjustado.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Grado de ejecución estimado: ${gradoEjecucion.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
- ENF tras ajustes SEC y ejecución: ${enfTrasAjustes.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €
- Resultado del cálculo: ${resultadoReglaGasto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €

Conclusión: ${
  enfTrasAjustes > limiteGasto
    ? `El presupuesto NO cumple con la regla de gasto. El gasto computable (${enfTrasAjustes.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €) supera el límite legal autorizado (${limiteGasto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €), generando un exceso de ${Math.abs(resultadoReglaGasto).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €. Este incumplimiento obliga a la aprobación de un plan económico-financiero conforme al artículo 12 de la LOEPSF.`
    : `El presupuesto cumple con la regla de gasto. El gasto computable (${enfTrasAjustes.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €) se encuentra dentro del límite legal (${limiteGasto.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €), respetando la tasa de crecimiento establecida por el Estado.`
}

5.- Conclusión Global

La valoración conjunta de los distintos apartados analizados permite concluir sobre la idoneidad jurídico-financiera del presupuesto sometido a aprobación. Desde el punto de vista normativo, se ha verificado el cumplimiento de los trámites exigidos por la legislación vigente, así como la correcta aplicación de los principios contables y presupuestarios.

Desde el punto de vista económico, se constata la existencia de equilibrio formal en los estados de ingresos y gastos, y en su caso, una capacidad de financiación en términos SEC. La verificación del cumplimiento de la regla de gasto, conforme a la tasa de referencia establecida por el Estado, añade una garantía adicional de sostenibilidad fiscal.

No obstante, si se detectase un incumplimiento de dicha regla o del principio de estabilidad, correspondería al Pleno adoptar las medidas necesarias, incluida la aprobación de un plan económico-financiero conforme a los artículos 21 y siguientes de la LOEPSF.

El análisis efectuado permite concluir que el presupuesto general cumple con los principios fundamentales exigidos por la normativa vigente, en especial en lo relativo al equilibrio presupuestario y al objetivo de estabilidad financiera, consolidando una base sólida para una gestión pública eficiente y sostenible.

${enfTrasAjustes > limiteGasto
  ? `No obstante, el presupuesto incumple la regla de gasto, al superar el límite máximo permitido según la tasa de referencia del PIB. Este incumplimiento implica la necesidad de aprobar un plan económico-financiero corrector conforme al artículo 12 de la LOEPSF.`
  : `Asimismo, se verifica el cumplimiento de la regla de gasto, lo que refuerza la viabilidad financiera del presupuesto aprobado.`}`;
}

window.insertarInformeTecnicoEnEditor = function () {
  const informe = redactarInformeAprobacionDesdeFormulario();

  if (!informe || informe.trim().length < 10) {
    alert("⚠️ El informe generado está vacío o incompleto.");
    return;
  }

  const editor = document.getElementById("editorTexto");
  if (!editor) {
    alert("⚠️ No se encontró el editor de texto.");
    return;
  }

  editor.innerHTML = informe;
};
