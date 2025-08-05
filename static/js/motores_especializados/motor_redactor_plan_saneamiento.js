// motor_redactor_plan_saneamiento.js

window.MotorPlanSaneamiento = (function () {
  function obtenerDatos() {
    const leerTexto = (id) => document.getElementById(id)?.value || "";
    const leerNumero = (id) => parseFloat(document.getElementById(id)?.value.replace(",", ".")) || 0;

    return {
      ejercicio: leerTexto("ejercicio"),
      cumplimiento: leerTexto("cumplimiento"),
      observaciones: leerTexto("observaciones"),
      ahorro_neto: leerNumero("ahorro_neto"),
      endeudamiento: leerNumero("endeudamiento"),
      remanente: leerNumero("remanente"),
      ingresos_corrientes: leerNumero("ingresos_corrientes"),
      deuda_viva: leerNumero("deuda_viva"),
      porcentaje_deuda: leerNumero("porcentaje_deuda"),
      medida_ingreso_1: leerTexto("medida_ingreso_1"),
      medida_gasto_1: leerTexto("medida_gasto_1"),
    };
  }

  function generarInforme() {
    const d = obtenerDatos();

    const informe = `
INFORME DE CONTROL PERMANENTE PREVIO – CUMPLIMIENTO DEL PLAN DE SANEAMIENTO FINANCIERO (DA 108/109 LPGE 2021)

1. Introducción
De conformidad con lo establecido en la Disposición Adicional 108ª/109ª de la Ley 11/2020, de 30 de diciembre, de Presupuestos Generales del Estado para el año 2021, se requiere la emisión de un informe anual sobre el cumplimiento del Plan de Saneamiento y/o Reducción de Deuda.

2. Datos Económico-Financieros (Ejercicio ${d.ejercicio})
• Ahorro neto: ${d.ahorro_neto.toLocaleString()} €
• Endeudamiento: ${d.endeudamiento.toLocaleString()} €
• Remanente de Tesorería: ${d.remanente.toLocaleString()} €
• Ingresos corrientes: ${d.ingresos_corrientes.toLocaleString()} €
• Deuda viva: ${d.deuda_viva.toLocaleString()} €
• % Deuda viva / Ingresos corrientes: ${d.porcentaje_deuda.toFixed(2)} %

3. Evaluación del cumplimiento
Resultado del ejercicio: ${d.cumplimiento}
Observaciones: ${d.observaciones}

4. Medidas evaluadas
• Ingresos – Medida 1: ${d.medida_ingreso_1}
• Gastos – Medida 1: ${d.medida_gasto_1}

5. Conclusión
El resultado del control permanente previo del expediente es: ${d.cumplimiento}

Este informe será remitido al Pleno de la corporación y, en su caso, al Ministerio de Hacienda u órgano de tutela financiera conforme a la normativa aplicable.
    `.trim();

    const editor = document.getElementById("editorTexto");
    if (!editor) {
      alert("⚠️ No se encontró el editor de texto.");
      return;
    }
    editor.innerText = informe;

    if (typeof window.actualizarBloquesDesdeEditor === "function") {
      window.actualizarBloquesDesdeEditor();
    }
  }

  return {
    generarInforme,
  };
})();
