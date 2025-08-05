// motor_redactor_presupuestos.js

window.MotorPresupuestos = (function () {
  function leer(id) {
    return parseFloat(document.getElementById(id).value.replace(",", ".")) || 0;
  }

  function obtenerDatos() {
    // Regla de gasto
    const gasto_computable_previsto = leer("gasto_computable_previsto");
    const limite_gasto = leer("limite_gasto");
    const variacion_gasto = leer("variacion_gasto");
    const cumple_regla_gasto = variacion_gasto <= limite_gasto ? "✔ Cumple" : "❌ No cumple";

    // Estabilidad presupuestaria
    const ingresos_nf = leer("ingresos_nf");
    const gastos_nf = leer("gastos_nf");
    const saldo_estabilidad = ingresos_nf - gastos_nf;
    const cumple_estabilidad = saldo_estabilidad >= 0 ? "✔ Cumple" : "❌ No cumple";

    // Deuda pública
    const deuda_viva = leer("deuda_viva");
    const ingresos_corrientes = leer("ingresos_corrientes");
    const porcentaje_deuda = ingresos_corrientes > 0 ? (deuda_viva / ingresos_corrientes) * 100 : 0;
    const limite_deuda = leer("limite_deuda");
    const cumple_limite_deuda = porcentaje_deuda <= limite_deuda ? "✔ Cumple" : "❌ No cumple";

    // Derechos incobrables
    const total_derechos = leer("total_derechos");
    const importe_minoracion = leer("importe_minoracion");
    const porcentaje_minoracion = total_derechos > 0 ? (importe_minoracion / total_derechos) * 100 : 0;

    return {
      gasto_computable_previsto,
      limite_gasto,
      variacion_gasto,
      cumple_regla_gasto,
      ingresos_nf,
      gastos_nf,
      saldo_estabilidad,
      cumple_estabilidad,
      deuda_viva,
      ingresos_corrientes,
      porcentaje_deuda,
      limite_deuda,
      cumple_limite_deuda,
      total_derechos,
      importe_minoracion,
      porcentaje_minoracion: porcentaje_minoracion.toFixed(2) + "%"
    };
  }

  function actualizarVisor() {
    const d = obtenerDatos();
    document.getElementById("visorPresupuestos").innerHTML = `
      <strong>📘 Líneas fundamentales del presupuesto:</strong><br>
      Gasto computable previsto: ${d.gasto_computable_previsto.toLocaleString()} €<br>
      Variación del gasto: ${d.variacion_gasto.toFixed(2)} % (Límite: ${d.limite_gasto}%)<br>
      Resultado regla de gasto: ${d.cumple_regla_gasto}<br>
      Ingresos no financieros: ${d.ingresos_nf.toLocaleString()} €<br>
      Gastos no financieros: ${d.gastos_nf.toLocaleString()} €<br>
      Saldo previsto: ${d.saldo_estabilidad.toLocaleString()} € → ${d.cumple_estabilidad}<br>
      Deuda viva: ${d.deuda_viva.toLocaleString()} €<br>
      % deuda sobre ingresos: ${d.porcentaje_deuda.toFixed(2)}% (Límite: ${d.limite_deuda}%)<br>
      Resultado deuda: ${d.cumple_limite_deuda}<br><br>
      <strong>📙 Derechos de difícil o imposible recaudación:</strong><br>
      Total derechos pendientes: ${d.total_derechos.toLocaleString()} €<br>
      Minoración aplicada: ${d.importe_minoracion.toLocaleString()} €<br>
      Porcentaje minorado: ${d.porcentaje_minoracion}
    `;
  }

  function generarInforme() {
    const d = obtenerDatos();
    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO: PRESUPUESTOS

1. Regla de gasto:
Variación del gasto computable: ${d.variacion_gasto.toFixed(2)} % (Límite: ${d.limite_gasto}%) → ${d.cumple_regla_gasto}

2. Estabilidad presupuestaria:
Saldo previsto: ${d.saldo_estabilidad.toLocaleString()} € → ${d.cumple_estabilidad}

3. Límite de endeudamiento:
Porcentaje deuda: ${d.porcentaje_deuda.toFixed(2)} % (Límite: ${d.limite_deuda}%) → ${d.cumple_limite_deuda}

4. Derechos de difícil o imposible recaudación:
Importe minorado: ${d.importe_minoracion.toLocaleString()} €
Porcentaje sobre total: ${d.porcentaje_minoracion}

En conclusión, se evalúa el cumplimiento de las reglas fiscales conforme al marco normativo vigente.
    `.trim();

    const editor = document.getElementById("editorTexto");
    if (editor) {
      editor.innerText = texto;
    } else {
      alert("⚠️ No se encontró el editor de texto.");
    }
  }

  return {
    actualizarVisor,
    generarInforme
  };
})();
