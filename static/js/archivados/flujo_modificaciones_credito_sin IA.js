// ✅ flujo_modificaciones_credito.js (estructura con bloques separados de Recursos y Aplicaciones)

function detectarPlantillaModificaciones() {
  const texto = document.getElementById("editorTexto")?.innerText || "";
  const esInformeModificaciones = texto.toUpperCase().includes("INFORME DE INTERVENCIÓN DE MODIFICACIÓN PRESUPUESTARIA");

  const formulario = document.getElementById("formularioModificacionCredito");
  if (formulario) formulario.style.display = esInformeModificaciones ? "block" : "none";

  const tituloFormulario = document.querySelector("#formularioModificacionCredito h5");
  if (tituloFormulario) tituloFormulario.innerText = "Datos del Informe de Intervención de Modificación Presupuestaria";
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(detectarPlantillaModificaciones, 500);
  const editor = document.getElementById("editorTexto");
  if (editor) {
    const observer = new MutationObserver(detectarPlantillaModificaciones);
    observer.observe(editor, { childList: true, subtree: true, characterData: true });
  }
});

function añadirFila(tablaID) {
  const tbody = document.querySelector(`#${tablaID} tbody`);
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td><input type="text" class="form-control form-control-sm codigo" /></td>
    <td><input type="text" class="form-control form-control-sm descripcion" /></td>
    <td><input type="number" step="0.01" class="form-control form-control-sm importe" /></td>
    <td><button class="btn btn-danger btn-sm" onclick="this.closest('tr').remove()">🗑️</button></td>
  `;
  tbody.appendChild(fila);
}

function enviarModificacion() {
  const tipo = document.getElementById("tipoModificacion").value;

  const getDatosTabla = (tablaID) => Array.from(document.querySelectorAll(`#${tablaID} tbody tr`)).map(fila => ({
    codigo: fila.querySelector(".codigo").value.trim(),
    descripcion: fila.querySelector(".descripcion").value.trim(),
    importe: parseFloat(fila.querySelector(".importe").value || 0)
  }));

  const recursos = getDatosTabla("tablaRecursos");
  const aplicaciones = getDatosTabla("tablaAplicaciones");

  const payload = { tipo, recursos, aplicaciones };

  if (window.ChatModificaciones?.procesarModificacion) {
    window.ChatModificaciones.procesarModificacion(payload);
  } else {
    // ✅ Inserción directa si no hay función externa
    const editor = document.getElementById("editorTexto");
    if (!editor) return;
    let texto = editor.innerText;

    // Reemplazar el tipo de modificación
    texto = texto.replace("«Tipo_Mod»", tipo);

    // Construir tabla de recursos
    const tablaRecursos = recursos.length ? `<table border="1"><thead><tr><th>Código</th><th>Descripción</th><th>Importe (€)</th></tr></thead><tbody>` +
      recursos.map(r => `<tr><td>${r.codigo}</td><td>${r.descripcion}</td><td style='text-align:right;'>${r.importe.toFixed(2)}</td></tr>`).join("") +
      `</tbody></table>` : "";

    // Construir tabla de aplicaciones
    const tablaAplicaciones = aplicaciones.length ? `<table border="1"><thead><tr><th>Código</th><th>Descripción</th><th>Importe (€)</th></tr></thead><tbody>` +
      aplicaciones.map(a => `<tr><td>${a.codigo}</td><td>${a.descripcion}</td><td style='text-align:right;'>${a.importe.toFixed(2)}</td></tr>`).join("") +
      `</tbody></table>` : "";

    texto = texto.replace("«Tabla_Recursos»", tablaRecursos);
    texto = texto.replace("«Tabla_Gastos»", tablaAplicaciones);

    editor.innerText = texto;
  }
}
