// ✅ Motor redactor para el informe de Competencias Impropias

function leerValorCompetencias(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  return parseFloat(el.value.replace(',', '.')) || 0;
}

function redactarInformeCompetenciasDesdeFormulario() {
  const datos = {
    coste: leerValorCompetencias("costeActuacion"),
    gastos: leerValorCompetencias("gastosCorrientes"),
    ahorroBruto: leerValorCompetencias("ahorroBruto"),
    ahorroNeto: leerValorCompetencias("ahorroNeto"),
    remanente: leerValorCompetencias("remanenteTesoreria"),
    pmp: leerValorCompetencias("pmpActual"),
    deuda: document.getElementById("existeDeuda")?.value || ""
  };
  return redactarInformeCompetencias(datos);
}

function redactarInformeCompetencias(datos = {}) {
  const {
    coste,
    gastos,
    ahorroBruto,
    ahorroNeto,
    remanente,
    pmp,
    deuda
  } = datos;

  const porcentaje = gastos > 0 ? ((coste / gastos) * 100).toFixed(6) : "0";

  return `
0.- Estructura del Informe
INFORME DE INTERVENCIÓN SOBRE EL EJERCICIO DE COMPETENCIAS IMPROPIAS  


1.- Fundamento Legal del Ejercicio de Competencias Impropias
De acuerdo con el artículo 7.4 de la Ley 7/1985, las entidades locales podrán ejercer competencias impropias si se garantiza:  
- La sostenibilidad financiera.  
- La inexistencia de duplicidad funcional.  
- La obtención de informes previos vinculantes de la Administración competente y de la tutela financiera.

2.- Objeto del Expediente
Ejercicio de competencia impropia

3.- Justificación y Cumplimiento de los Requisitos Normativos

3.1 Coste de la actuación
Coste total: ${coste.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}  
Porcentaje sobre gastos corrientes liquidados (${gastos.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}): ${porcentaje}%

3.2 Cobertura financiera
Financiación íntegra con recursos propios. Habilitación mediante modificación presupuestaria específica.

3.3 Ahorro Bruto y Neto
Ahorro Bruto: ${ahorroBruto.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}  
Ahorro Neto: ${ahorroNeto.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}

3.4 Remanente de Tesorería
${remanente.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}

3.5 Periodo Medio de Pago
${pmp.toFixed(2)} días

3.6 Endeudamiento financiero
${deuda === "no" ? "La entidad no presenta deuda financiera viva." : "La entidad mantiene deuda financiera activa."}

4.- Valoración Final
Se constata el cumplimiento de los principios legales y financieros para el ejercicio de esta competencia impropia.

5.- Conclusión
Se emite INFORME FAVORABLE al ejercicio de la competencia, al no comprometer la sostenibilidad ni legalidad presupuestaria.

El Interventor.
  `.trim();
}

window.insertarInformeCompetenciasEnEditor = function () {
  const informe = redactarInformeCompetenciasDesdeFormulario();

  if (!informe || informe.trim().length < 10) {
    alert("⚠️ El informe generado está vacío o incompleto.");
    return;
  }

  const editor = document.getElementById("editorTexto");
  if (!editor) {
    alert("⚠️ No se encontró el editor de texto.");
    return;
  }

  editor.innerHTML = informe.replace(/\n/g, "<br>");

  // ✅ Activar detección de bloques tras insertar
  window.actualizarBloquesDesdeEditor?.();
};
