
function detectarFlujoDesdeTexto() {
  const texto = document.getElementById("editorTexto")?.value?.toLowerCase() || "";

  if (texto.includes("equilibrio presupuestario") && texto.includes("estabilidad presupuestaria")) {
    return "aprobacion";
  }

  if (texto.includes("remanente de tesorería") || texto.includes("resultado presupuestario ajustado")) {
    return "liquidacion";
  }

  if (texto.includes("tipo de modificación") || texto.includes("recursos que financian la modificación")) {
    return "modificaciones";
  }

  if (texto.includes("regla de gasto") || texto.includes("capacidad/necesidad de financiación")) {
    return "reglas";
  }

  if (texto.includes("cuenta general") || texto.includes("art. 212")) {
    return "cuenta_general";
  }

  return "desconocido";
}

// 🚀 Adaptación del botón del copiloto para forzar detección previa
document.getElementById("btnCopilotoRedactor")?.addEventListener("click", () => {
  const flujoDetectado = detectarFlujoDesdeTexto();
  console.log("🧠 Flujo detectado automáticamente:", flujoDetectado);
  window.flujoActivo = flujoDetectado;
  activarCopilotoRedactor();
});
