// motor_redactor_planajuste.js

window.MotorPlanAjuste = (function () {
  function obtenerDatos() {
    const leer = (id) => document.getElementById(id).value.trim();

    const normativa_origen = leer("normativa_origen");
    const fecha_aprobacion_original = leer("fecha_aprobacion_original");
    const anio_fin_vigencia = leer("anio_fin_vigencia");
    const nueva_situacion_detectada = leer("nueva_situacion_detectada");
    const norma_apoyo = leer("norma_apoyo");
    const objetivo_actualizacion = leer("objetivo_actualizacion");
    const valoracion_tecnica = leer("valoracion_tecnica");
    const evolucion_sec = leer("evolucion_sec");
    const ahorro_neto = leer("ahorro_neto");
    const reduccion_deuda = leer("reduccion_deuda");
    const cumplimiento_objetivos = leer("cumplimiento_objetivos");
    const resultado_ajustado = leer("resultado_ajustado");
    const juicio_tecnico = leer("juicio_tecnico");
    const cumplimiento_formal = leer("cumplimiento_formal");
    const resultado_control = leer("resultado_control");
    const motivos_resultado = leer("motivos_resultado");
    const observaciones = leer("observaciones");

    return {
      normativa_origen,
      fecha_aprobacion_original,
      anio_fin_vigencia,
      nueva_situacion_detectada,
      norma_apoyo,
      objetivo_actualizacion,
      valoracion_tecnica,
      evolucion_sec,
      ahorro_neto,
      reduccion_deuda,
      cumplimiento_objetivos,
      resultado_ajustado,
      juicio_tecnico,
      cumplimiento_formal,
      resultado_control,
      motivos_resultado,
      observaciones
    };
  }

  function generarInforme() {
    const d = obtenerDatos();

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO: ACTUALIZACIÓN DEL PLAN DE AJUSTE

1. JUSTIFICACIÓN DE LA ACTUALIZACIÓN

La actualización del Plan de Ajuste se fundamenta en el cambio sustancial de las circunstancias económico-financieras que motivaron su aprobación inicial. De conformidad con lo establecido en ${d.normativa_origen}, y dado que el Plan de Ajuste aprobado en fecha ${d.fecha_aprobacion_original}, con vigencia hasta ${d.anio_fin_vigencia}, resulta insuficiente para alcanzar los objetivos exigidos por el Ministerio de Hacienda, esta Entidad promueve su modificación.

Actualmente, en vista de ${d.nueva_situacion_detectada}, conforme recoge ${d.norma_apoyo}, y con el objetivo de ${d.objetivo_actualizacion}, se considera necesaria la revisión del contenido del plan aún vigente, incorporando nuevas medidas de disciplina fiscal y sostenibilidad financiera.

2. CONTENIDO Y VALORACIÓN

El documento actualizado ha sido ${d.valoracion_tecnica} desde el punto de vista de su coherencia interna, suficiencia informativa y adecuación a los objetivos exigidos.

3. EVALUACIÓN DEL IMPACTO FINANCIERO

• Capacidad o necesidad de financiación prevista según SEC: ${d.evolucion_sec}
• Ahorro neto acumulado derivado de las nuevas medidas de ajuste: ${d.ahorro_neto} €
• Reducción esperada del endeudamiento vivo: ${d.reduccion_deuda}
• Cumplimiento de los objetivos de estabilidad y sostenibilidad: ${d.cumplimiento_objetivos}
• Evolución prevista del resultado presupuestario ajustado: ${d.resultado_ajustado}

El nuevo Plan actualizado resulta ${d.juicio_tecnico} en términos de viabilidad financiera y capacidad de cumplimiento.

4. CUMPLIMIENTO PROCEDIMENTAL

La actualización ${d.cumplimiento_formal} los requisitos exigidos por el Ministerio competente, tras la tramitación del expediente con los informes técnicos y económicos requeridos, la aprobación plenaria y su remisión electrónica.

5. RESULTADO DEL CONTROL PREVIO

Resultado: ${d.resultado_control}

${d.motivos_resultado ? `Motivos: ${d.motivos_resultado}` : ''}
${d.observaciones ? `Observaciones: ${d.observaciones}` : ''}

`.trim();

    const editor = document.getElementById("editorTexto");
    if (!editor) {
      alert("⚠️ No se encontró el editor de texto.");
      return;
    }

    editor.innerText = texto;

    if (typeof window.actualizarBloquesDesdeEditor === "function") {
      window.actualizarBloquesDesdeEditor();
    }
  }

  return {
    generarInforme
  };
})();
