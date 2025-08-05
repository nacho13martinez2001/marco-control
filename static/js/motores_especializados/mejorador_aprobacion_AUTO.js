
// ================================
// Mejorador IA FINAL DEFINITIVO - Reemplazo por innerHTML para editor DIV
// ================================

window.MejoradorAprobacion = (() => {
  const bloques = [];
  window.__bloques = bloques;

  function getEditorText() {
    const editor = document.getElementById("editorTexto");
    return editor?.innerHTML || "";
  }

  function setEditorText(htmlContent) {
    const editor = document.getElementById("editorTexto");
    if (editor) editor.innerHTML = htmlContent;
  }

  function detectarBloquesEnInforme() {
    const texto = document.getElementById("editorTexto")?.innerText || "";
    const patrones = [
      { id: "estructura", titulo: "## 0. Estructura del Informe" },
      { id: "introduccion", titulo: "## Introducción" },
      { id: "normativa", titulo: "## Normativa Aplicable" },
      { id: "procedimiento", titulo: "## Procedimiento y Valor Jurídico del Acto" },
      { id: "equilibrio", titulo: "### Primero. Equilibrio Presupuestario" },
      { id: "estabilidad", titulo: "### Segundo. Estabilidad Presupuestaria" },
      { id: "regla", titulo: "### Tercero. Regla de Gasto" },
      { id: "conclusion", titulo: "## Conclusión Global" }
    ];

    bloques.length = 0;
    for (let i = 0; i < patrones.length; i++) {
      const textoOriginal = texto;
      const start = textoOriginal.indexOf(patrones[i].titulo);
      const end = i < patrones.length - 1 ? textoOriginal.indexOf(patrones[i + 1].titulo) : textoOriginal.length;
      if (start !== -1 && end !== -1 && end > start) {
        let contenido = textoOriginal.substring(start, end).trim();
        if (i === 0 && contenido.includes("# Informe de Intervención")) {
          const cabeceraPos = contenido.lastIndexOf(patrones[i].titulo);
          if (cabeceraPos !== -1) {
            contenido = contenido.substring(cabeceraPos).trim();
          }
        }
        bloques.push({ ...patrones[i], contenido });
      }
    }

    if (bloques.length === 0) {
      ChatIA.insertarMensajeSistema("⚠️ No se detectó una estructura válida del informe.");
      return false;
    }

    return true;
  }

  function enviarTodosLosBloques() {
    for (const bloque of bloques) {
      const prompt = `
Devuelve este apartado mejorado en técnica y estilo, y con una redacción extendida. No expliques nada.

Identifica tu respuesta así:
id: ${bloque.id}

Texto a mejorar:
${bloque.contenido}
      `.trim();

      const input = document.getElementById("userInput");
      const boton = document.querySelector("#userInput + button.btn-primary");
      if (input && boton) {
        input.value = prompt;
        boton.click();
        console.log("📤 Enviado bloque:", bloque.id);
      }
    }
  }

  function parsearRespuestaConId(texto) {
    const match = texto.match(/id\s*:\s*([a-zA-Z_]+)/i);
    const resto = texto.replace(/id\s*:\s*[a-zA-Z_]+\s*/i, "").trim();
    if (match) {
      return { id: match[1], contenido: resto };
    }
    return null;
  }

  function reemplazarBloqueEnHTML(id, textoNuevoPlano) {
    const bloque = bloques.find(b => b.id === id);
    if (!bloque) {
      console.warn("⚠️ No se encontró el bloque con id:", id);
      return;
    }

    const html = getEditorText();
    const marcadorInicio = bloque.titulo;
    const indiceInicio = html.indexOf(marcadorInicio);
    const siguienteBloque = bloques[bloques.indexOf(bloque) + 1];
    const marcadorFin = siguienteBloque?.titulo;
    const indiceFin = marcadorFin ? html.indexOf(marcadorFin) : html.length;

    if (indiceInicio === -1 || indiceFin === -1 || indiceFin <= indiceInicio) {
      console.warn("⚠️ No se pudo calcular el rango de reemplazo para:", id);
      return;
    }

    const antes = html.slice(0, indiceInicio);
    const despues = html.slice(indiceFin);
    const reemplazo = textoNuevoPlano.replace(/\n/g, "<br>");

    const nuevoHTML = `${antes}${reemplazo}<br>${despues}`;
    setEditorText(nuevoHTML);
    console.log("✅ Sustituido en el editor:", id);
  }

  function iniciarMejoraInformeAprobacion() {
    const ok = detectarBloquesEnInforme();
    if (!ok) return;
    ChatIA.insertarMensajeSistema("¿Quieres que mejore el Informe?");
    setTimeout(() => enviarTodosLosBloques(), 1000);
  }

  
window.addEventListener("respuestaIA", (e) => {
  const texto = e.detail?.respuesta || "";

  // 🔍 Detectar todos los bloques con formato "id: X\n<contenido>"
  const bloquesEncontrados = texto.split(/(?=id\s*:\s*[a-z_]+)/i);

  bloquesEncontrados.forEach(bloqueTexto => {
    const match = bloqueTexto.match(/id\s*:\s*([a-z_]+)\s*\n?/i);
    if (!match) return;

    const id = match[1];
    const contenido = bloqueTexto.replace(/id\s*:\s*[a-z_]+/i, "").trim();
    if (!contenido) return;

    // 🔁 Reemplazar en el editor y mostrar en el chat
    reemplazarBloqueEnHTML(id, contenido);

    const bloque = bloques.find(b => b.id === id);
    const etiqueta = bloque ? `🧩 Mejora del bloque: <b>${bloque.titulo.replace(/^#+\s*/, '')}</b><br><br>` : "";
    ChatIA._mostrarRespuesta(etiqueta + contenido);
  });
});


  return {
    iniciarMejoraInformeAprobacion
  };
})();
