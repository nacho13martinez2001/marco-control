// comun.js limpio y operativo con todos los flujos inteligentes activos

// Subida de archivos al input oculto
function activarBotonSubida() {
  const boton = document.getElementById("btnSubirArchivo");
  if (boton) {
    boton.addEventListener("click", () => {
      document.getElementById("fileUpload").click();
    });
  }
}

// Scroll automático del chat al final
function scrollChatAlFinal() {
  const chat = document.getElementById("chat");
  if (chat) chat.scrollTop = chat.scrollHeight;
}

// ✅ Copiar texto al editor y guardar original
function copiarAlEditor(texto) {
  const editor = document.getElementById("editorTexto");
  if (editor) {
    editor.innerText = texto;
    editor.scrollTop = 0;
    window._textoInformeOriginal = texto; // 🔒 Guarda el texto completo para búsquedas por apartados
  }
}

// Formateo de cifras en estilo español
function formatearEuros(num) {
  return num.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + " €";
}

// Subida de archivo con envío al backend
function subirArchivoChat() {
  const archivo = document.getElementById("fileUpload").files[0];
  if (!archivo) return;

  const formData = new FormData();
  formData.append("archivo_chat", archivo);

  fetch("/chat_upload", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    const visorTexto = document.getElementById("visor-texto");
    const visorExcel = document.getElementById("visor-excel");
    const esExcel = archivo.name.endsWith(".xlsx") || archivo.name.endsWith(".csv");

    if (data.texto && (!data.hojas || data.hojas.length === 0)) {
      document.getElementById("panel-visores").classList.remove("d-none");
      visorTexto.classList.remove("d-none");
      visorTexto.style.height = "100%";

      copiarAlEditor(data.texto); // ✅ Ahora sí se guarda correctamente

      setTimeout(() => {
        window.EditorTextoUtils?.cargarApartadosDesdeIndice();
        // window.IAMotor?.analizarEstadoActual(); // 🧠 Desactivado por limpieza
      }, 50);

      setTimeout(() => {
        window.EditorTextoUtils?.cargarApartadosDesdeIndice();
      }, 50);

      // 🧠 Activar flujos inteligentes
      window.FlujoAprobacionGeneralMod?.iniciarFlujoSiAplica(data.texto);
      window.FlujoEstabilidadMod?.iniciarFlujoSiAplica(data.texto);
    }

    if (esExcel && data.contenido && data.hojas) {
      visorExcel.classList.remove("d-none");
      window._hojasExcel = data.contenido;

      const selector = document.getElementById("selectorHoja");
      selector.classList.remove("d-none");
      selector.innerHTML = "";

      data.hojas.forEach(nombre => {
        const opt = document.createElement("option");
        opt.value = nombre;
        opt.textContent = nombre;
        selector.appendChild(opt);
      });

      const primeraHoja = data.hojas[0];
      if (primeraHoja) {
        selector.value = primeraHoja;
        mostrarExcelEnTabla(data.contenido[primeraHoja]);
        window._hojaSeleccionada = primeraHoja;
      }

      document.querySelector('button[data-bs-target="#hoja"]')?.click();

      // 🧠 Activar flujo de estabilidad si procede
      window.FlujoEstabilidadMod?.manejarExcelSubido(data.contenido);
      window.FlujoAprobacionGeneralMod?.manejarExcelSubido(data.contenido);
    }

    if (window.EscaneoVisual && typeof EscaneoVisual.iniciar === "function") {
      EscaneoVisual.iniciar(archivo, data, esExcel ? "panelProgresoEstabilidad" : "visor-texto");
    }
  });
}

function activarChatIA(mensaje) {
  const chat = document.getElementById("chat");
  if (!chat) return;

  const entrada = document.createElement("div");
  entrada.className = "bubble ia"; // Aplicamos clase de burbuja IA
  entrada.innerHTML = `<img src="/static/iconos/biblioteca_fichas_directo.js:8 📦 Script biblioteca_fichas_directo.js activo
biblioteca_fichas_directo.js:16 📚 Índice recibido: Object
biblioteca_fichas_directo.js:30 📄 Añadida ficha: ICAL 2013 - Principios generales y marco conceptual
biblioteca_fichas_directo.js:30 📄 Añadida ficha: ICAL 2013 - Datos a incorporar al sistema contable
biblioteca_fichas_directo.js:30 📄 Añadida ficha: ICAL 2013 - Información derivada del sistema contable
biblioteca_fichas_directo.js:30 📄 Añadida ficha: ICAL 2013 - Anexo contable adaptado al modelo normal
biblioteca_fichas_directo.js:30 📄 Añadida ficha: ICAL 2013 - Disposiciones transitorias y derogatorias
icono_chat.png:1 
            
            
           GET http://127.0.0.1:5000/static/icono_chat.png 404 (NOT FOUND)
" style="height: 20px; vertical-align: middle; margin-right: 6px;">${mensaje}`;

  chat.appendChild(entrada);
  chat.scrollTop = chat.scrollHeight;

  window.estadoChatIA = "esperando_confirmacion_ampliada";
}

// ✅ Función central para enviar mensajes al chat desde flujos IA
window.enviarMensajeAlChat = function (mensaje, opciones = {}) {
  const chat = document.getElementById("chat");
  if (!chat) return;

  const entrada = document.createElement("div");
  entrada.className = "bubble ia";
  entrada.innerHTML = `
    <img src="/static/iconos/icono_chat.png" style="height: 20px; vertical-align: middle; margin-right: 6px;">
    ${opciones.html ? mensaje : escapeHtml(mensaje)}
  `;

  chat.appendChild(entrada);
  chat.scrollTop = chat.scrollHeight;
  
    // ✅ Lanzar evento para los flujos inteligentes
  const evento = new CustomEvent("mensajeChatUsuario", { detail: mensaje });
  window.dispatchEvent(evento);
};

// 🔒 Protección frente a HTML no deseado
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Hook inicial común
document.addEventListener("DOMContentLoaded", () => {
  activarBotonSubida();
});
