
// motor_redactor_ajustes_prorroga.js

window.MotorAjustesProrroga = (function () {
  function obtenerDatos() {
    const leerTexto = id => document.getElementById(id)?.value || "";
    const leerNum = id => parseFloat(document.getElementById(id)?.value.replace(",", ".")) || 0;

    return {
      ejercicio: leerTexto("ejercicio"),
      tipo_ajuste: leerTexto("tipo_ajuste"),
      motivo_ajuste: leerTexto("motivo_ajuste"),
      total_prorrogado: leerNum("total_prorrogado"),
      total_ajustado: leerNum("total_ajustado")
    };
  }

  function actualizarVisor() {
    const d = obtenerDatos();
    const visor = document.getElementById("visorAjustesProrroga");

    visor.innerHTML = `
      <strong>Tipo de ajuste:</strong> ${d.tipo_ajuste}<br>
      <strong>Ejercicio:</strong> ${d.ejercicio}<br>
      <strong>Motivo:</strong> ${d.motivo_ajuste}<br>
      <strong>Total prorrogado:</strong> ${d.total_prorrogado.toLocaleString()} €<br>
      <strong>Total ajustado:</strong> ${d.total_ajustado.toLocaleString()} €<br>
    `;
  }

  function generarInforme() {
    const d = obtenerDatos();

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO DE AJUSTES ${d.tipo_ajuste.toUpperCase()} EN LA PRÓRROGA DEL PRESUPUESTO

1. Marco normativo
Conforme al artículo 169.4 del TRLRHL, el presupuesto prorrogado mantiene los créditos del ejercicio anterior con ajustes posibles por motivos debidamente justificados.

2. Justificación
El ajuste ${d.tipo_ajuste} se basa en: ${d.motivo_ajuste}

3. Datos financieros
Total prorrogado: ${d.total_prorrogado.toLocaleString()} €
Total ajustado: ${d.total_ajustado.toLocaleString()} €

4. Conclusión
El ajuste propuesto cumple con los principios de legalidad, estabilidad y prudencia financiera, resultando procedente emitir informe favorable.
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
