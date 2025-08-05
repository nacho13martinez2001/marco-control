// Motor redactor adaptado al informe de Liquidación con estructura detallada

function leerValor(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const val = el.value || el.getAttribute("value") || el.textContent;
  return parseFloat(val.replace(',', '.')) || 0;
}

function redactarInformeLiquidacionDesdeFormulario() {
  const datos = {
    derechosReconocidosNetos: leerValor("Derechos_Reconocidos_Netos"),
    obligacionesReconocidasNetas: leerValor("Obligaciones_Reconocidas_Netas"),
    gastosConRemanente: leerValor("Gastos_financiados_con_remanente_de_tesoreria"),
    desviacionesPositivas: leerValor("Desviaciones_positivas_de_financiacion"),
    desviacionesNegativas: leerValor("Desviaciones_negativas_de_financiacion"),
    resultadoPresupuestario: leerValor("RESULTADO_PRESUPUESTARIO_DEL_EJERCICIO"),

    fondosLiquidos: leerValor("Fondos_Liquidos"),
    derechosPendientesCobro: leerValor("Derechos_Pendientes_de_Cobro"),
    obligacionesPendientesPago: leerValor("Obligaciones_Pendientes_de_Pago"),
    remanenteTotal: leerValor("REMANENTE_DE_TESORERIA_TOTAL"),
    remanenteGenerales: leerValor("REMANENTE_DE_TESORERIA_PARA_GASTOS_GENERALES"),
    remanenteAfectado: leerValor("Remanente_de_Tesoreria_para_Gastos_con_financiacion_afectada"),
    remanenteAjustado: leerValor("Remanente_de_Tesoreria_ajustado"),
    capacidadAntesSEC: leerValor("Capacidad_Necesidad_de_financiacion_antes_de_ajustes_SEC10"),

    capacidadBruta: leerValor("Capacidad_de_Financiacion_Bruta"),
    ajustesEstabilidad: leerValor("Ajustes_SEC10_Estabilidad"),
    estabilidadFinal: leerValor("Estabilidad_Presupuestaria_en_la_Liquidacion"),

    limiteGasto: leerValor("Limite_de_Gasto_No_Financiero"),
    empleosNoFinancieros: leerValor("Empleos_No_Financieros"),
    resultadoRegla: leerValor("Regla_de_Gasto"),

    deudaViva: leerValor("Deuda_Viva"),
    porcentajeDeudaViva: leerValor("Porcentaje_Deuda_Viva"),
    pmp: leerValor("PMP")
  };
  return redactarInformeLiquidacion(datos);
}

function redactarInformeLiquidacion(datos = {}) {
  const {
    derechosReconocidosNetos = 0,
    obligacionesReconocidasNetas = 0,
    resultadoPresupuestario = 0,
    remanenteGenerales = 0,
    estabilidadFinal = 0,
    resultadoRegla = 0
  } = datos;

  return `
Informe de Intervención sobre la Liquidación del Presupuesto General

0.- Estructura del Informe 
Este informe está organizado en siete secciones principales, cada una dedicada a analizar diferentes aspectos de la liquidación presupuestaria de la entidad local. 
A continuación, se detalla la estructura y el enfoque de cada sección: 
  1. Introducción: Presenta el propósito, la relevancia y el contexto del informe, estableciendo el marco normativo y los objetivos del análisis de la liquidación presupuestaria. 
  2. Resultado Presupuestario: Examina la diferencia entre los derechos reconocidos netos y las obligaciones reconocidas netas, ajustada por desviaciones de financiación, proporcionando una visión sobre el equilibrio financiero de la entidad. 
  3. Remanente de Tesorería: Analiza la capacidad de la entidad para gestionar sus recursos líquidos y hacer frente a sus compromisos a corto plazo, crucial para su liquidez y estabilidad financiera. 
  4. Estabilidad Presupuestaria: Evalúa la capacidad de la entidad de mantener un equilibrio o superávit estructural, cumpliendo con los mandatos de estabilidad presupuestaria según la normativa aplicable. 
  5. Regla de Gasto: Revisa el cumplimiento de los límites de crecimiento del gasto no financiero en relación con el PIB a medio plazo, reflejando la disciplina en la gestión del gasto público. 
  6. Dictamen Global: Ofrece una conclusión general sobre el cumplimiento de la entidad con respecto a los objetivos del régimen presupuestario local y proporciona recomendaciones para la mejora continua en la gestión financiera. Cada sección del informe proporciona un análisis detallado basado en la normativa vigente y las prácticas recomendadas, con el objetivo de ofrecer una evaluación exhaustiva y fiable de la situación financiera de la entidad.


1.- Introducción 
La presente exposición tiene como finalidad analizar la liquidación presupuestaria de la entidad local correspondiente al último ejercicio económico, en conformidad con las disposiciones establecidas en el Texto Refundido de la Ley Reguladora de las Haciendas Locales (TRLHL), la Ley Orgánica de Estabilidad Presupuestaria y Sostenibilidad Financiera (LOEPSF), y demás normativa aplicable. Este informe desglosa y evalúa de manera detallada los principales componentes de la liquidación presupuestaria, incluyendo el resultado presupuestario, el remanente de tesorería, la estabilidad presupuestaria, la regla de gasto, y las deudas financiera y comercial. La evaluación se centra no solo en verificar el cumplimiento de los requisitos legales y fiscales, sino también en analizar la eficacia de la gestión financiera llevada a cabo por la entidad. La relevancia de este análisis radica en su capacidad para proporcionar una visión clara del estado financiero de la entidad, ofreciendo así una base sólida para la toma de decisiones futuras y la implementación de mejoras en la gestión presupuestaria y financiera. La información contenida en este informe busca ser una herramienta útil para los responsables de la planificación y control financiero, así como para los diferentes grupos de interés de la entidad local. Este documento se estructura en varias secciones que corresponden a cada uno de los aspectos mencionados, comenzando con el análisis del resultado presupuestario y finalizando con recomendaciones basadas en los hallazgos de la evaluación realizada.

2.- Resultado Presupuestario
El resultado presupuestario es un indicador crucial que refleja la capacidad de la entidad local para gestionar sus recursos y obligaciones de manera equilibrada. Según el artículo 165 del Texto Refundido de la Ley Reguladora de las Haciendas Locales (TRLHL), este resultado se obtiene de la diferencia entre los derechos reconocidos netos y las obligaciones reconocidas netas, ajustados por las desviaciones de financiación. Para el período analizado, la entidad reportó los siguientes valores:
- Derechos Reconocidos Netos: ${derechosReconocidosNetos.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Obligaciones Reconocidas Netas: ${obligacionesReconocidasNetas.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Resultado del Ejercicio: ${resultadoPresupuestario.toLocaleString('es-ES', {minimumFractionDigits: 2})} €

3.- Remanente de Tesorería
El remanente de tesorería es un indicador clave de la liquidez de la entidad local, que muestra la capacidad para hacer frente a sus obligaciones a corto plazo. El cálculo de este indicador se basa en los principios establecidos en el artículo 193 del Texto Refundido de la Ley Reguladora de las Haciendas Locales (TRLHL), que se articula a partir de los fondos líquidos, los derechos pendientes de cobro y las obligaciones pendientes de pago, ajustados por la financiación afectada. Para el ejercicio analizado, la entidad reportó los siguientes componentes del remanente de tesorería: 
- Remanente para Gastos Generales: ${remanenteGenerales.toLocaleString('es-ES', {minimumFractionDigits: 2})} €

4.- Estabilidad Presupuestaria
La estabilidad presupuestaria es un principio fundamental en la gestión financiera de las entidades locales, como lo estipula el artículo 3 de la Ley Orgánica de Estabilidad Presupuestaria y Sostenibilidad Financiera (LOEPSF). Este principio exige que las administraciones públicas mantengan un equilibrio o superávit estructural, sin comprometer su viabilidad financiera a largo plazo. Para el ejercicio fiscal examinado, los datos referentes a la estabilidad presupuestaria son los siguientes:
- Resultado Final de Estabilidad SEC: ${estabilidadFinal.toLocaleString('es-ES', {minimumFractionDigits: 2})} €

5.- Regla de Gasto
La Regla de Gasto es un mecanismo de control fiscal establecido en el artículo 12 de la Ley Orgánica de Estabilidad Presupuestaria y Sostenibilidad Financiera (LOEPSF). Este precepto limita el crecimiento del gasto computable de las entidades locales, asegurando que no superen la tasa de referencia de crecimiento del Producto Interior Bruto (PIB) a medio plazo. Su cumplimiento es crucial para evitar el deterioro de la sostenibilidad financiera a causa de un incremento no controlado en el gasto público. Para el período evaluado, los datos relativos a la regla de gasto son los siguientes: 
- Resultado Regla de Gasto: ${resultadoRegla.toLocaleString('es-ES', {minimumFractionDigits: 2})} €

6.- Dictamen Global
El presupuesto ha sido ejecutado de acuerdo con los principios de estabilidad y control del gasto, ${estabilidadFinal >= 0 ? "cumpliendo con" : "incurriendo en desviaciones respecto a"} los objetivos de estabilidad financiera definidos por la LOEPSF.`;
}

window.insertarInformeTecnicoLiquidacion = function () {
  const informe = redactarInformeLiquidacionDesdeFormulario();

  if (!informe || informe.trim().length < 10) {
    alert("⚠️ El informe generado está vacío o incompleto.");
    return;
  }

  const editor = document.getElementById("editorTextoCopiloto");
  if (!editor) {
    alert("⚠️ No se encontró el editor del Copiloto.");
    return;
  }

  editor.innerHTML = informe;
  const editorPrincipal = document.getElementById("editorTexto");
  if (editorPrincipal) {
    editorPrincipal.innerHTML = informe;

    // ✅ Añadir aquí:
    window.actualizarBloquesDesdeEditor();
  }
};

