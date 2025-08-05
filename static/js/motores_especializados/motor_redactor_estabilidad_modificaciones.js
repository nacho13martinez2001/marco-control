// ✅ Motor redactor para el informe de Estabilidad en Modificaciones

function leerValor(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  return parseFloat(el.value.replace(',', '.')) || 0;
}

function redactarInformeEstabilidadModDesdeFormulario() {
  const datos = {
    previsionesIniciales: leerValor("input_previsiones_iniciales"),
    ornsIniciales: leerValor("input_orns_iniciales"),
    estabilidadAprobacion: leerValor("input_estabilidad_aprobacion"),

    drnsEjecucion: leerValor("input_previsiones_ejecucion"),
    ornsEjecucion: leerValor("input_orns_ejecucion"),
    estabilidadEjecucion: leerValor("input_estabilidad_ejecucion"),

    proyeccionIngresos: leerValor("input_proyeccion_ingresos"),
    proyeccionOrns: leerValor("input_proyeccion_orns"),

    pctEjecucionIngresos: leerValor("input_pct_ejecucion_ingresos"),
    importeModificacion: leerValor("input_importe_modificacion"),
    fechaInforme: document.getElementById("input_fecha_informe")?.value || ""
  };
  return redactarInformeEstabilidadMod(datos);
}

function redactarInformeEstabilidadMod(datos = {}) {
  const {
    previsionesIniciales,
    ornsIniciales,
    estabilidadAprobacion,
    drnsEjecucion,
    ornsEjecucion,
    estabilidadEjecucion,
    proyeccionIngresos,
    proyeccionOrns,
    pctEjecucionIngresos,
    importeModificacion,
    fechaInforme
  } = datos;

  const proyeccionEstabilidad = proyeccionIngresos - proyeccionOrns;
  const cumpleProyeccion = proyeccionEstabilidad >= 0;

  return `
INFORME DE ESTABILIDAD PRESUPUESTARIA EN MODIFICACIONES

0.- Estructura

  1. Estabilidad en Aprobación
  2. Estabilidad en Ejecución Presupuestaria
  3. Proyección de Estabilidad hasta fin de ejercicio
  4. Conclusión Global


1.- Estabilidad en Aprobación

- Previsiones Iniciales (cap. 1 a 7): ${previsionesIniciales.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Créditos Iniciales (cap. 1 a 7): ${ornsIniciales.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Resultado de estabilidad inicial: ${estabilidadAprobacion.toLocaleString('es-ES', {minimumFractionDigits: 2})} €

Según el artículo 165.4 del TRLRHL y el artículo 11 de la LOEPSF, el presupuesto debe aprobarse sin déficit inicial. Este principio implica que los ingresos no financieros deben ser al menos iguales a los gastos no financieros autorizados.


2.- Estabilidad en Ejecución Presupuestaria

- Derechos Reconocidos Netos (cap. 1 a 7): ${drnsEjecucion.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Obligaciones Reconocidas Netas (cap. 1 a 7): ${ornsEjecucion.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Resultado de estabilidad en ejecución: ${estabilidadEjecucion.toLocaleString('es-ES', {minimumFractionDigits: 2})} €

El artículo 18 de la LOEPSF establece la obligación del interventor de controlar periódicamente la estabilidad y advertir de cualquier riesgo de incumplimiento.


3.- Proyección de Estabilidad hasta fin de ejercicio

- Proyección de ingresos: ${proyeccionIngresos.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Proyección de ORNs (Ejecución anualizada + modificación): ${proyeccionOrns.toLocaleString('es-ES', {minimumFractionDigits: 2})} €
- Resultado proyectado: ${proyeccionEstabilidad.toLocaleString('es-ES', {minimumFractionDigits: 2})} € (${cumpleProyeccion ? 'Capacidad de financiación' : 'Necesidad de financiación'})

La proyección a fin de ejercicio permite anticipar desviaciones respecto a la estabilidad. Si el resultado proyectado es negativo, deberá elaborarse un plan económico-financiero conforme al artículo 21 de la LOEPSF.


4.- Conclusión Global

La estabilidad presupuestaria se analiza en tres fases: aprobación, ejecución y proyección. De acuerdo con los datos actuales y proyectados, ${cumpleProyeccion ? 'la entidad cumple con el objetivo de estabilidad presupuestaria.' : 'la entidad incurre en necesidad de financiación, por lo que deberá aplicar medidas correctoras inmediatas.'}

  `.trim();
}

window.insertarInformeEstabilidadModificacionesEnEditor = function () {
  const informe = redactarInformeEstabilidadModDesdeFormulario();

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

  // ✅ Activar detección de bloques tras insertar
  window.actualizarBloquesDesdeEditor();
};

