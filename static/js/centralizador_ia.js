// Listener centralizado para sustitución de marcadores IA en el editor

window.addEventListener("resultadoIARecibido", () => {
  const respuesta = window._últimaRespuestaUpload;
  if (!respuesta) {
    console.warn("⚠️ No hay respuesta IA aún.");
    return;
  }
  const editor = document.querySelector("#editorTexto");
  if (!editor) {
    console.error("❌ Editor de texto no encontrado.");
    return;
  }

  let texto = editor.innerHTML;
  const marcadores = respuesta.marcadores || {};
  console.log("Texto en editor antes de sustituir:", texto);
  console.log("Marcadores a aplicar:", marcadores);

  for (const marcador in marcadores) {
    const valor = marcadores[marcador] || "";
    // Debug extra: ¿el texto contiene el marcador?
    console.log(`¿Contiene '${marcador}'?`, texto.includes(marcador));
    const marcadorRegex = new RegExp(marcador.replace(/[[\]]/g, '\\$&'), "g");
    texto = texto.replace(marcadorRegex, valor);
  }

  editor.innerHTML = texto;
  console.log("🧠 Sustitución centralizada aplicada:", marcadores);
});

