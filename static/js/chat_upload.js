// ==============================
// 📎 GESTOR DE SUBIDA DE ARCHIVOS DESDE EL CHAT
// Detecta archivo subido desde #fileUpload, lo envía a /chat_upload
// Muestra metadatos, hojas (si es Excel) y resumen textual (si es DOCX o PDF)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const inputArchivo = document.getElementById("fileUpload");
  if (!inputArchivo) return;

  inputArchivo.addEventListener("change", function () {
    const archivo = this.files[0];
    if (!archivo) return;

    const extension = archivo.name.split(".").pop().toLowerCase();
    const formData = new FormData();
    formData.append("archivo_chat", archivo);

    const endpoint = "/chat_upload";

    fetch(endpoint, {
      method: "POST",
      body: formData
    })
    .then(async r => {
      if (!r.ok) throw new Error(`Servidor respondió con estado ${r.status}`);
      const data = await r.json();

      // ✅ Mostrar resumen visual
      mostrarResumenArchivo(data, archivo);

      // 💾 Variables globales
      window._últimaRespuestaUpload = data;
      window._excelCompleto = data;

      // 📊 Excel
      if (data.contenido && typeof data.contenido === "object") {
        window._datosExcel = data.contenido;

        if (
          window._flujoActivo === "aprobacion" &&
          window._documentoAprobacionCargado &&
          window._datosExcel?.Totales &&
          window._datosExcel?.Ayto_Estabilidad &&
          window._datosExcel?.Ayto_ReglaGas
        ) {
          templateChat?.validarContenidoAprobacion?.();
        }

        window.FlujoReglasFiscalesLiquidacion?.manejarExcelSubido?.(window._datosExcel);
        window.FlujoLiquidacionGeneral?.manejarExcelSubido?.(window._datosExcel);
      }

      // 📄 Word / PDF
      if (data.texto && (extension === "docx" || extension === "pdf")) {
        window._textoDocumento = data.texto;

        const editor = document.getElementById("editorTexto");
        if (editor) {
          editor.innerText = data.texto;

          setTimeout(() => {
            window.actualizarBloquesDesdeEditor?.();
            window.__bloques_original = [...(window.__bloques || [])];
            console.log("📌 Bloques guardados como copia persistente:", window.__bloques_original.map(b => b.id));
          }, 300);
        }

        window.FlujoLiquidacionGeneral?.iniciarFlujoSiAplica?.(data.texto);
        window.FlujoReglasFiscalesLiquidacion?.iniciarFlujoSiAplica?.(data.texto);
        window.FlujoModificacionesCredito?.iniciarFlujoSiAplica?.(data.texto);

        setTimeout(() => {
          if (window._datosExcel) {
            window.FlujoReglasFiscalesLiquidacion?.manejarExcelSubido?.(window._datosExcel);
          }
        }, 150);
      }

      if (!data.texto && !data.contenido) {
        alert(data.respuesta || "⚠️ No se pudo leer el archivo.");
      }
    })
    .catch(err => {
      console.error("❌ Error al subir el archivo:", err);
      alert("❌ Error al subir el archivo.");
    });
  });
});


// ==============================
// 📊 VISUALIZADOR DE METADATOS DEL ARCHIVO SUBIDO
// Detecta nombre, tipo, tamaño, fecha y hojas o texto si corresponde
// ==============================

function mostrarResumenArchivo(data, archivo) {
  const chat = document.getElementById("chat");
  if (!chat) return;

  const tamañoKB = (archivo.size / 1024).toFixed(1);
  const fecha = new Date().toLocaleString("es-ES");
  const extension = archivo.name.split(".").pop().toLowerCase();

  const icono = {
    pdf: "📄",
    docx: "📑",
    xlsx: "📊",
    csv: "📊"
  }[extension] || "📎";

  let contenidoExtra = "";

  // Hojas de Excel
  if (data.hojas && Array.isArray(data.hojas)) {
    const listaHojas = data.hojas.map(h => `• ${h}`).join("<br>");
    contenidoExtra += `<br><br><b>📊 Hojas del Excel:</b><br>${listaHojas}`;
  }

  // Estimación de palabras (Word o PDF)
  if (data.texto && (extension === "docx" || extension === "pdf")) {
    const palabras = data.texto.split(/\s+/).length;
    contenidoExtra += `<br><br><b>📝 Estimación:</b><br>${palabras} palabras aproximadamente`;
  }

  const burbuja = document.createElement("div");
  burbuja.className = "bubble ia";
  burbuja.innerHTML = `
    <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
    <div class="contenido-respuesta">
      <b>${icono} Archivo cargado:</b><br>
      • <b>Nombre:</b> ${archivo.name}<br>
      • <b>Tamaño:</b> ${tamañoKB} KB<br>
      • <b>Tipo:</b> ${archivo.type || 'desconocido'}<br>
      • <b>Fecha:</b> ${fecha}
      ${contenidoExtra}
    </div>
  `;
  chat.appendChild(burbuja);
  chat.scrollTop = chat.scrollHeight;
}
