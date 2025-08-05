// chat.js

// Inicializar historial si no existe
window.historialConversacion = window.historialConversacion || [];

// Cargar el systemPrompt desde archivo externo
window.systemPrompt = "Eres un interventor experto en control presupuestario...";
fetch("/static/contexto/contexto_chat_IA_completo.txt")
  .then(res => res.text())
  .then(text => {
    window.systemPrompt = text.trim();
  })
  .catch(() => {
    console.warn("⚠️ No se pudo cargar el contexto del sistema. Se usará uno por defecto.");
  });

// --------------------------------------
// Función normativa (de normativachat.js)
/* 
  Debe venir cargada antes de este archivo:
  <script src="/static/js/normativa_chat.js"></script>
*/

// --------------------------------------
// --------------------------------------
// Función que intercepta consultas normativas
async function manejarPreguntaUsuario(pregunta) {
  // Solo intenta responder si la función existe
  if (typeof responderConNormativa === "function") {
    const respuestaNormativa = await responderConNormativa(pregunta);
    if (respuestaNormativa) {
      const chat = document.getElementById("chat");
      const burbujaIA = document.createElement("div");
      burbujaIA.className = "bubble ia";
      let htmlRespuesta = `
        <img src="/static/iconos/icono_chat.png"
             style="height:60px; width:60px; vertical-align:middle; margin-right:12px;">

        ${respuesta}
      `;

// Si hay una ficha activa con PDF fuente, añade botón
if (window.fichaActiva && window.fichaActiva.pdf_fuente) {
  htmlRespuesta += `
    <br><a href="${window.fichaActiva.pdf_fuente}" target="_blank" 
    class="btn btn-sm btn-outline-secondary mt-2">
      📎 Ver fuente original (PDF)
    </a>`;
}

burbujaIA.innerHTML = htmlRespuesta;
      chat.appendChild(burbujaIA);
      chat.scrollTop = chat.scrollHeight;

      // Actualizar historial
      window.historialConversacion.push({ role: "user", content: pregunta });
      window.historialConversacion.push({ role: "assistant", content: respuestaNormativa });
      return true;
    }
  }
  return false; // si no hay función o no hay respuesta
}

// --------------------------------------
// Función principal de envío de mensaje
async function enviarMensaje(textoManual = null) {
  const input = document.getElementById("userInput");
  if (!input) return;

  const texto = textoManual !== null
                ? textoManual.trim()
                : input.value.trim();
  if (!texto) return;
  if (window.intentarEjecutarAccionDesdeChat?.(texto)) {
    input.value = "";
    input.style.height = "5em";
    return;
  }
  if (await manejarPreguntaUsuario(texto)) return;

  // --- BLOQUE IA PARA MODIFICACIONES PRESUPUESTARIAS ---
if (window._flujoActivo === "modificaciones") {
  // Mostrar burbuja de usuario
  const chat = document.getElementById("chat");
  const burbujaUser = document.createElement("div");
  burbujaUser.className = "bubble user";
  burbujaUser.innerText = texto;
  chat.appendChild(burbujaUser);
  chat.scrollTop = chat.scrollHeight;
  input.value = "";

  // Lógica de memoria local (opcional, básica)
  window.memoriaFlujoModificaciones = window.memoriaFlujoModificaciones || {};
  
  // Enviar al backend el texto y la memoria del flujo (campos ya completados)
  fetch("/marcadores_modificacion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      datos_usuario: texto,
      memoria: window.memoriaFlujoModificaciones,
      plantilla: document.getElementById("editorTexto")?.innerText || ""
    })
  })

  .then(res => res.json())
  .then(data => {
    // ---- ACTUALIZAR MARCADORES Y EDITOR ----
    window._últimaRespuestaUpload = { marcadores: data.marcadores };
    window.dispatchEvent(new Event("resultadoIARecibido"));

    // ---- MOSTRAR ACCIONES EN CHAT ----
    // 1. Acciones faltantes o sugerencias
    if (Array.isArray(data.acciones)) {
      data.acciones.forEach(acc => {
        const burbujaAccion = document.createElement("div");
        burbujaAccion.className = "bubble ia";
        burbujaAccion.innerText = acc;
        chat.appendChild(burbujaAccion);
      });
    }
    // 2. Errores de validación
    if (Array.isArray(data.errores)) {
      data.errores.forEach(err => {
        const burbujaError = document.createElement("div");
        burbujaError.className = "bubble ia";
        burbujaError.innerText = "⚠️ " + err;
        burbujaError.style.color = "red";
        chat.appendChild(burbujaError);
      });
    }
    // 3. Próxima acción sugerida
    if (data.proxima_accion) {
      const burbujaProx = document.createElement("div");
      burbujaProx.className = "bubble ia";
      burbujaProx.innerText = data.proxima_accion;
      chat.appendChild(burbujaProx);
    }
    // 4. Informe actualizado (opcional: sobrescribir editor)
    if (data.informe_actualizado && typeof data.informe_actualizado === "string" && data.informe_actualizado.trim().length > 0) {
      const editor = document.getElementById("editorTexto");
      if (editor) {
        editor.innerText = data.informe_actualizado;
      }
      const burbujaActualizado = document.createElement("div");
      burbujaActualizado.className = "bubble ia";
      burbujaActualizado.innerText = "📝 Informe completado y actualizado con todos los datos.";
      chat.appendChild(burbujaActualizado);
    }

    // 5. Mantener el chat siempre abajo
    chat.scrollTop = chat.scrollHeight;

    // 6. (Opcional) Actualizar memoria local de campos ya completados
    if (data.marcadores && typeof data.marcadores === "object") {
      for (const [k, v] of Object.entries(data.marcadores)) {
        // Solo actualiza si el valor NO está vacío, null o undefined
        if (v !== null && v !== undefined && String(v).trim() !== "") {
          window.memoriaFlujoModificaciones[k] = v;
        }
        // Si viene vacío, NO se sobrescribe lo anterior
      }
      // LOG para ver la memoria consolidada tras cada respuesta IA
      console.log("Memoria consolidada:", window.memoriaFlujoModificaciones);
    }

  })
  .catch(err => {
    const burbujaError = document.createElement("div");
    burbujaError.className = "bubble ia";
    burbujaError.innerText = "❌ Error al conectar con el backend de IA.";
    chat.appendChild(burbujaError);
    chat.scrollTop = chat.scrollHeight;
    console.error("Error al llamar a marcadores_modificacion:", err);
  });
  return; // ¡Aquí se corta el flujo para no enviar nada al endpoint /chat!
}

  // Mostrar burbuja de usuario (flujo normal)
  const chat = document.getElementById("chat");
  const burbujaUser = document.createElement("div");
  burbujaUser.className = "bubble user";
  burbujaUser.innerText = texto;
  chat.appendChild(burbujaUser);
  chat.scrollTop = chat.scrollHeight;
  input.value = "";

  // 1️⃣ Si es consulta normativa, respondemos aquí y salimos
  if (await manejarPreguntaUsuario(texto)) {
    return;
  }

  // 2️⃣ Flujos inteligentes (estabilidad, aprobaciones…)
  window.FlujoEstabilidadMod?.manejarMensajeUsuario(texto);

  // 3️⃣ Preparar petición al backend normal
  const textoEditor = document.getElementById("editorTexto")?.innerText || "";
  actualizarEstadoAplicacion();
  const mensajes = [
    { role: "system", content: window.systemPrompt },
    ...window.historialConversacion,
    { role: "user", content: texto }
  ];

  if (interpretarInstruccionChat(texto)) return;
  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: mensajes,
      textoEditor,
      observacionesIA: document.getElementById("resultadoAnalisisIA")?.innerText || "",
      contexto: JSON.stringify(window.estadoAplicacion || {})
    })
  })
  .then(res => res.json())
  .then(data => {
    const respuesta = data.respuesta || "❌ No se recibió respuesta.";
    // Mostrar respuesta en el chat normal
    if (!/^Archivo recibido(\.|:)?$/i.test(respuesta.trim())) {
      ChatIA._mostrarRespuesta(respuesta);
    }
    window.historialConversacion.push({ role: "user", content: texto });
    window.historialConversacion.push({ role: "assistant", content: respuesta });
  });
}

// --------------------------------------
// Función para reiniciar la conversación
function reiniciarConversacion() {
  if (!confirm("¿Seguro que quieres borrar el historial del chat?")) return;
  window.historialConversacion = [];
  const chat = document.getElementById("chat");
  chat.innerHTML = "";
  const input = document.getElementById("userInput");
  input.value = "";
  /* const burbuja = document.createElement("div");
  burbuja.className = "bubble ia";
  burbuja.innerHTML = `
    <img src="/static/iconos/icono_chat.png"
         style="height:20px;vertical-align:middle;margin-right:6px;">
    Historial borrado. ¿En qué puedo ayudarte ahora?
  `;
  chat.appendChild(burbuja); */
  chat.scrollTop = chat.scrollHeight;
}

function interpretarInstruccionChat(mensaje) {
  const mensajeNormalizado = mensaje.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (
    window._explicacionReglaGastoAprobacion &&
    mensajeNormalizado.includes("regla de gasto") &&
    (mensajeNormalizado.includes("por que") || mensajeNormalizado.includes("explica") || mensajeNormalizado.includes("motivo"))
  ) {
    const burbujaIA = document.createElement("div");
    burbujaIA.className = "bubble ia";
    burbujaIA.innerHTML = `
      <img src="/static/iconos/icono_chat.png"
           style="height:20px;vertical-align:middle;margin-right:6px;">
      ${window._explicacionReglaGastoAprobacion}
    `;
    document.getElementById("chat").appendChild(burbujaIA);
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
    window.historialConversacion.push({ role: "user", content: mensaje });
    window.historialConversacion.push({ role: "assistant", content: window._explicacionReglaGastoAprobacion });
    return true;
  }

  return false;
}
function mostrarFormatoInputChat() {
  const chat = document.getElementById("chat");
  const burbuja = document.createElement("div");
  burbuja.className = "bubble ia";
  burbuja.innerHTML = `
    <b>Formato requerido:</b><br>
    <pre style="background:#f4f4f4;border-radius:5px;padding:8px;">
1.- Tipo de Modificación: _______________
2.- Recurso o Recursos que la financian e importe: _______________
3.- Aplicación o Aplicaciones presupuestaria incrementada y su importe: _______________
4.- Conclusión técnica: _______________
    </pre>
    <b>Ejemplo:</b> <br>
    1.- Generación de Crédito<br>
    2.- Remanente de Tesorería, 87000, por 100.000 euros<br>
    3.- 920-61902, por 100.000 euros<br>
    4.- Favorable<br>
    <span style="color:#b32d2d;"><b>Debe introducir los datos en este formato exacto. Si falta algún campo, debe volver a ponerlos todos.</b></span>
  `;
  chat.appendChild(burbuja);
  chat.scrollTop = chat.scrollHeight;
}

