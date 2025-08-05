
function extraerBloquesDesdeEditor() {
  const editor = document.getElementById("editorTexto");
  if (!editor) return [];

  const texto = editor.innerText || "";
  const lineas = texto.split("\n");

  const bloques = [];
  const letras = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i].trim();
    const match = /^(\d+)\.-\s*(.+)/.exec(linea);
    if (match) {
      const idxLetra = letras[bloques.length] || `x${bloques.length}`;
      const id = `bloque_${idxLetra}`;
      const titulo = linea;
      bloques.push({ id, titulo });
    }
  }

  return bloques;
}

function activarCopilotoRedactor() {
  const editor = document.getElementById("editorTextoCopiloto");
  if (!editor) {
    console.warn("❌ No se encontró #editorTextoCopiloto");
    return;
  }

  const tipoInforme = document.getElementById("selectorFlujoCopiloto")?.value || "desconocido";
  const datos = window.datosFormulario || {};

  let nuevoTexto = "";

  switch (tipoInforme) {
    case "aprobacion":
      if (typeof redactarInformeAprobacion === "function") {
        nuevoTexto = redactarInformeAprobacionDesdeFormulario();
      }
      break;
    case "modificaciones":
      if (typeof redactarInformeModificaciones === "function") {
        nuevoTexto = redactarInformeModificaciones("", datos);
      }
      break;
    case "liquidacion":
      if (typeof redactarInformeLiquidacion === "function") {
        nuevoTexto = redactarInformeLiquidacion("", datos);
      }
      break;
    case "reglas":
      if (typeof redactarInformeReglas === "function") {
        nuevoTexto = redactarInformeReglas("", datos);
      }
      break;
    case "cuenta_general":
      if (typeof redactarInformeCuentaGeneral === "function") {
        nuevoTexto = redactarInformeCuentaGeneral("", datos);
      }
      break;
    default:
      nuevoTexto = "⚠️ Tipo de informe no reconocido.";
  }

  if (editor.tagName === "TEXTAREA") {
    editor.value = nuevoTexto;
  } else {
    editor.innerText = nuevoTexto;
  }

  console.log("✅ Copiloto generó el informe para:", tipoInforme);

  trasladarInformeDelCopilotoAlPrincipal();

  document.getElementById("btnRevisarConIA")?.removeAttribute("disabled");
}

function trasladarInformeDelCopilotoAlPrincipal() {
  const origen = document.getElementById("editorTextoCopiloto");
  const destino = document.getElementById("editorTexto");
  if (!origen || !destino) return;

  const texto = origen.value || origen.innerText || "";
  console.log("📋 Transferencia al editor principal:", texto.slice(0, 150));
  destino.innerText = texto.trim();

  window.__bloques = extraerBloquesDesdeEditor();
  console.log("✅ Bloques detectados:", window.__bloques);
}
