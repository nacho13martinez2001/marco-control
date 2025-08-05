
window.MotorSubvenciones = (function () {
  function obtenerDatos() {
    const leerTexto = id => document.getElementById(id)?.value || "";

    return {
      nombre_entidad: leerTexto("nombre_entidad"),
      periodo: leerTexto("periodo"),
      numero_anos: leerTexto("numero_anos")
    };
  }

  function generarInforme() {
    const d = obtenerDatos();

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO DE APROBACIÓN DEL PLAN ESTRATÉGICO DE SUBVENCIONES

1. FUNDAMENTO Y FINALIDAD

De acuerdo con el artículo 8 de la Ley 38/2003, General de Subvenciones, se ha elaborado el Plan Estratégico de Subvenciones de ${d.nombre_entidad}, correspondiente al periodo ${d.periodo}, con una duración de ${d.numero_anos} años.

Este instrumento de planificación tiene por objeto garantizar que el régimen de subvenciones responda a principios de eficacia y eficiencia.

2. ALCANCE, DURACIÓN Y ESTRUCTURA

El Plan incluye todas las subvenciones previstas durante el periodo indicado, tanto por el Ayuntamiento como por sus entes dependientes. Se estructura en bloques como diagnóstico inicial, objetivos, calendario y evaluación.

3. EVALUACIÓN TÉCNICA

Las líneas subvencionales están justificadas, con metas e indicadores definidos. Se incluyen previsiones presupuestarias razonadas, horizonte temporal claro y mecanismos de seguimiento.

4. OBSERVACIONES

• El Plan cumple con la legalidad vigente.
• Es compatible con la programación presupuestaria.
• Debe realizarse seguimiento y revisión si se producen cambios sustanciales.

5. CONCLUSIÓN

El Plan Estratégico de Subvenciones de ${d.nombre_entidad} cumple con los requisitos formales y técnicos establecidos. Se emite informe favorable para su aprobación.

    `.trim();

    const editor = document.getElementById("editorTexto");
    if (editor) {
      editor.innerText = texto;
    }

    if (typeof window.actualizarBloquesDesdeEditor === "function") {
      window.actualizarBloquesDesdeEditor();
    }
  }

  return {
    generarInforme
  };
})();
