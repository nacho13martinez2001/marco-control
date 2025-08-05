// init.js

document.addEventListener("DOMContentLoaded", () => {
  const inputChat = document.getElementById("userInput");
  if (!inputChat) return;

  inputChat.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  aplicarEstiloInforme();
  activarBotonSubida();

  const buscadorTexto = document.getElementById("buscadorTextoInforme");
  if (buscadorTexto) {
    buscadorTexto.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        buscarEnInforme();
      }
    });
  }

  const btnCeldas = document.getElementById("btnEnviarCeldas");
  if (btnCeldas) {
    btnCeldas.addEventListener("click", restaurarYEnviarSeleccion);
  }

  const selector = document.getElementById("selectorHoja");
  if (selector) {
    selector.addEventListener("change", cambiarHoja);
  }

  const btnFiltro = document.getElementById("btnFiltrarExcel");
  if (btnFiltro) {
    btnFiltro.addEventListener("click", filtrarExcel);
  }

  const btnSuma = document.getElementById("btnSumarExcel");
  if (btnSuma) {
    btnSuma.addEventListener("click", sumarColumnaSeleccionada);
  }

  const btnGuardar = document.getElementById("btnGuardarEditor");
  if (btnGuardar) {
    btnGuardar.addEventListener("click", guardarYDescargar);
  }

  const inputArchivo = document.getElementById("fileUpload");
  if (inputArchivo) {
    inputArchivo.addEventListener("change", subirArchivoChat);
  }

  // ✅ Activar flujo manualmente desde aquí si el documento ya está cargado
  if (window._textoDocumento && window.FlujoLiquidacionGeneral) {
    console.log("⚙️ Lanzando flujo de liquidación desde init.js");
    window.FlujoLiquidacionGeneral.iniciarFlujoSiAplica(window._textoDocumento);
  }
});

function activarBotonSubida() {
  // Desactivado: el usuario debe pulsar manualmente el botón de subida
  // const boton = document.getElementById("btnSubirArchivo");
  // if (boton) boton.click();
}
window.activarBotonSubida = activarBotonSubida;

fetch("/static/componentes/biblioteca_conocimiento.html")
  .then(res => res.text())
  .then(html => {
    const contenedor = document.getElementById("contenedorBibliotecaHtml");
    contenedor.innerHTML = html;

    const script = document.createElement("script");
    script.src = "/static/js/biblioteca_fichas_directo.js";
    script.defer = true;
    document.body.appendChild(script);
  });
