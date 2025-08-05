window.MotorPlanEF = (function () {
  function obtenerDatos() {
    const leer = (id) => document.getElementById(id)?.value?.trim() || "";

    const ejercicio = leer("ejercicio");
    const gasto_previsto = parseFloat(leer("gasto_previsto")) || 0;
    const gasto_ejecutado = parseFloat(leer("gasto_ejecutado")) || 0;
    const limite_pib = parseFloat(leer("limite_pib")) || 0;
    const deuda_viva = parseFloat(leer("deuda_viva")) || 0;
    const ingresos_corrientes = parseFloat(leer("ingresos_corrientes")) || 0;
    const sec_previsto = parseFloat(leer("sec_previsto")) || 0;
    const sec_real = parseFloat(leer("sec_real")) || 0;

    const medida_gasto_1 = leer("medida_gasto_1");
    const medida_ingreso_1 = leer("medida_ingreso_1");
    const detalle_refinanciacion = leer("detalle_refinanciacion");
    const detalle_sec = leer("detalle_sec");

    const variacion_gasto = gasto_ejecutado && gasto_previsto
      ? (((gasto_ejecutado - gasto_previsto) / gasto_previsto) * 100).toFixed(2)
      : "0.00";

    const porcentaje_endeudamiento = ingresos_corrientes
      ? ((deuda_viva / ingresos_corrientes) * 100).toFixed(2)
      : "0.00";

    const cumple_regla_gasto = parseFloat(variacion_gasto) <= limite_pib ? "cumple" : "no cumple";
    const cumple_limite_deuda = parseFloat(porcentaje_endeudamiento) <= limite_pib ? "cumple" : "no cumple";
    const cumple_estabilidad = sec_real >= 0 ? "cumple" : "no cumple";

    return {
      ejercicio,
      gasto_previsto,
      gasto_ejecutado,
      limite_pib,
      deuda_viva,
      ingresos_corrientes,
      sec_previsto,
      sec_real,
      medida_gasto_1,
      medida_ingreso_1,
      detalle_refinanciacion,
      detalle_sec,
      variacion_gasto,
      porcentaje_endeudamiento,
      cumple_regla_gasto,
      cumple_limite_deuda,
      cumple_estabilidad
    };
  }

  function actualizarVisor() {
    const d = obtenerDatos();
    const visor = document.getElementById("visorPlanEF");
    if (!visor) return;

    visor.innerHTML = `
      Ejercicio: ${d.ejercicio}<br>
      Variación de gasto: ${d.variacion_gasto} % (${d.cumple_regla_gasto})<br>
      Endeudamiento: ${d.porcentaje_endeudamiento} % (${d.cumple_limite_deuda})<br>
      Estabilidad presupuestaria SEC: ${d.sec_real} € (${d.cumple_estabilidad})<br>
    `;
  }

  function generarInforme() {
    const d = obtenerDatos();

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO: EVALUACIÓN DE REGLAS FISCALES A LA VISTA DEL PLAN ECONÓMICO-FINANCIERO

1. Evaluación de la Regla de Gasto:
En el ejercicio ${d.ejercicio}, la variación del gasto computable fue del ${d.variacion_gasto} %, lo que ${d.cumple_regla_gasto} el límite legal del ${d.limite_pib} %.

2. Evaluación del Límite de Deuda:
La deuda viva asciende a ${d.deuda_viva.toLocaleString()} €, con ingresos corrientes de ${d.ingresos_corrientes.toLocaleString()} €.
El porcentaje de endeudamiento es del ${d.porcentaje_endeudamiento} %, por tanto ${d.cumple_limite_deuda} el límite establecido.

3. Evaluación de la Estabilidad Presupuestaria:
La capacidad de financiación real (SEC) es de ${d.sec_real.toLocaleString()} €, frente a la prevista de ${d.sec_previsto.toLocaleString()} €, lo que ${d.cumple_estabilidad} los parámetros de estabilidad.

4. Medidas destacadas del Plan:
• Contención del gasto: ${d.medida_gasto_1}
• Incremento de ingresos: ${d.medida_ingreso_1}
• Deuda: ${d.detalle_refinanciacion}
• Ajustes SEC: ${d.detalle_sec}

5. Conclusión:
El Plan Económico-Financiero presentado ${d.cumple_estabilidad === "cumple" && d.cumple_regla_gasto === "cumple" && d.cumple_limite_deuda === "cumple" ? "cumple" : "no cumple"} con las reglas fiscales establecidas, conforme a lo previsto en la Ley Orgánica 2/2012, de Estabilidad Presupuestaria.
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
    actualizarVisor,
    generarInforme
  };
})();
