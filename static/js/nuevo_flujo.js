const fs = require('fs');
const path = require('path');

function crearNuevoFlujo(nombreFlujo) {
  const basePath = path.resolve(__dirname);
  const nombreCamel = nombreFlujo.charAt(0).toUpperCase() + nombreFlujo.slice(1);
  const archivoDestino = path.join(basePath, `flujo_${nombreFlujo}.js`);

  const plantilla = `
// flujo_${nombreFlujo}.js
window.Flujo${nombreCamel} = (function () {
  let iniciado = false;

  function iniciarFlujoSiAplica(textoDoc) {
    if (iniciado) return;
    const plantillaDetectada = normalizarTexto(textoDoc).includes("TÍTULO DETECTABLE DEL INFORME ${nombreCamel}");
    if (!plantillaDetectada) return;
    iniciado = true;
  }

  function manejarExcelSubido(datosExcel) {
    if (!iniciado) return;
    insertarResultadosEnEditor({});
    adjuntarAnexoExcel(datosExcel);
  }

  function insertarResultadosEnEditor(datos) {
    const editor = document.getElementById("editorTexto");
    if (!editor) return;
    editor.innerText += "\n\n>> Resultado automático para ${nombreCamel} <<";
  }

  function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/\u0300-\u036f/g, "").toUpperCase();
  }

  function adjuntarAnexoExcel(datosExcel) {
    let anexo = "IX. Anexo de Datos del Excel\n\n";
    for (const [nombre, contenido] of Object.entries(datosExcel)) {
      anexo += \`--- Hoja: \${nombre} ---\n\${contenido}\n\n\`;
    }
    const editor = document.getElementById("editorTexto");
    if (editor) editor.innerText += "\n\n" + anexo;
  }

  return {
    iniciarFlujoSiAplica,
    manejarExcelSubido
  };
})();

window.GestorFlujos?.registrar("${nombreFlujo}", window.Flujo${nombreCamel});
`;

  fs.writeFileSync(archivoDestino, plantilla);
  console.log(`✅ Flujo '${nombreFlujo}' creado en: ${archivoDestino}`);
}

// 👉 Ejecutar con: node nuevo_flujo.js nombreflujo
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error("❌ Indica el nombre del nuevo flujo (en minúsculas)");
} else {
  crearNuevoFlujo(args[0]);
}