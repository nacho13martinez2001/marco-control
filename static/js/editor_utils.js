
// editor_utils.js - Funciones comunes de manipulación del editor de texto

function insertarBloqueEnInforme(titulo, nuevoBloque) {
  const editor = document.getElementById("editorTexto");
  if (!editor) return;

  const textoOriginal = editor.innerText;
  const indices = [];
  let pos = 0;

  while ((pos = textoOriginal.indexOf(titulo, pos)) !== -1) {
    indices.push(pos);
    pos += titulo.length;
  }

  if (indices.length < 2) {
    console.warn(`❌ No se encontró una segunda aparición de "${titulo}"`);
    return;
  }

  const inicio = indices[1];
  const textoDesdeInicio = textoOriginal.slice(inicio);

  const siguiente = textoDesdeInicio.match(/\n([IVXLCDM]{1,3})\.\s+/);
  const fin = siguiente
    ? inicio + textoDesdeInicio.indexOf(siguiente[0])
    : textoOriginal.length;

  const nuevoTexto =
    textoOriginal.slice(0, inicio) +
    nuevoBloque.trim() +
    textoOriginal.slice(fin);

  editor.innerText = nuevoTexto;
}

window.EditorTextoUtils = window.EditorTextoUtils || {};
window.EditorTextoUtils.insertarBloqueEnInforme = insertarBloqueEnInforme;
