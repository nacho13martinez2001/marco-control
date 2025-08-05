
// ✅ Función global reutilizable para actualizar bloques desde el editor principal
window.actualizarBloquesDesdeEditor = function () {
  const editor = document.getElementById("editorTexto");
  if (!editor) {
    console.warn("❌ No se encontró #editorTexto");
    return;
  }

  const texto = editor.innerText || "";
  const lineas = texto.split("\n");
  const letras = "abcdefghijklmnopqrstuvwxyz";

  const bloques = [];
  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    const match = /^(\d+)\.-\s*(.+)/.exec(linea);
    if (match) {
      const idxLetra = letras[bloques.length] || `x${bloques.length}`;
      const id = `bloque_${idxLetra}`;
      bloques.push({ id, titulo: linea });
    }
  }

  window.__bloques = bloques;
  console.log("✅ Bloques actualizados:", window.__bloques);
};
