// estado_aplicacion.js

window.estadoAplicacion = {
  modulo: null,
  hojaExcelActiva: null,
  textoVisible: null,
  flujoDetectado: null,
  datosExcel: {},
  seleccion: null,
  observaciones: null
};

function actualizarEstadoAplicacion() {
  const selectorModulo = document.getElementById("selectorModulo");
  const selectorHoja = document.getElementById("selectorHoja");

  window.estadoAplicacion.modulo = selectorModulo?.value || "";
  window.estadoAplicacion.hojaExcelActiva = window._hojaSeleccionada || selectorHoja?.value || "";
  window.estadoAplicacion.textoVisible = document.getElementById("editorTexto")?.innerText || "";
  window.estadoAplicacion.seleccion = window.ultimaSeleccion || null;
  window.estadoAplicacion.datosExcel = window._hojasExcel || {};
  window.estadoAplicacion.observaciones = document.getElementById("resultadoAnalisisIA")?.innerText || "";

  // Detectar flujo activo
  const texto = window.estadoAplicacion.textoVisible.toUpperCase();
  if (texto.includes("APROBACION DEL PRESUPUESTO GENERAL")) {
    window.estadoAplicacion.flujoDetectado = "aprobacion";
  } else if (texto.includes("OBJETIVO DE ESTABILIDAD PRESUPUESTARIA")) {
    window.estadoAplicacion.flujoDetectado = "estabilidad";
  } else {
    window.estadoAplicacion.flujoDetectado = null;
  }

  // Para debug
  console.log("🧠 Estado actualizado:", window.estadoAplicacion);
}

window.actualizarEstadoAplicacion = actualizarEstadoAplicacion;
