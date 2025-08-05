function extraerTextoSegmentadoPorFlujo() {
  const texto = document.getElementById("editorTexto")?.innerText || "";
  const flujo = window.estadoAplicacion?.flujoDetectado || "";

  if (flujo === "aprobacion") {
    const inicio = texto.indexOf("IV.");
    const fin = texto.indexOf("V.");
    if (inicio !== -1 && fin !== -1 && fin > inicio) {
      return texto.slice(inicio, Math.min(fin, inicio + 5000)).trim();
    }
  }

  return texto.slice(0, 5000).trim();
}

window.enviarInstruccionExtendidaIA = async function (instruccionUsuario) {
  const texto = extraerTextoSegmentadoPorFlujo();
  console.log("🧪 Texto enviado al backend (primeros 500):", texto.slice(0, 500));

  if (!texto || texto.length < 100) {
    activarChatIA("❌ No hay suficiente contenido para realizar un análisis.");
    return;
  }

  // activarChatIA("✍️ Analizando y redactando respuesta...");

  try {
    const res = await fetch("/chat_extendido_ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        texto: texto,
        instruccion: instruccionUsuario
      })
    });

    const data = await res.json();
    const respuesta = data?.respuesta || "⚠️ No se obtuvo respuesta del modelo IA.";

    // document.getElementById("editorTexto").innerText = respuesta;
    // activarChatIA(respuesta);
  } catch (e) {
    activarChatIA("❌ Error al contactar con el modelo de lenguaje.");
    console.error("🚨 Error en enviarInstruccionExtendidaIA:", e);
  }
};