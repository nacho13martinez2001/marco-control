
// Mejorador IA para el flujo de Liquidación del Presupuesto

window.MejoradorLiquidacion = (() => {
  const patrones = [
    { id: "estructura", titulo: "**0. Estructura del Informe" },
    { id: "introduccion", titulo: "**1. Introducción" },
    { id: "resultado", titulo: "## 2. Resultado Presupuestario" },
    { id: "remanente", titulo: "## 3. Remanente de Tesorería" },
    { id: "estabilidad", titulo: "## 4. Estabilidad Presupuestaria" },
    { id: "regla", titulo: "## 5. Regla de Gasto" },
    { id: "dictamen", titulo: "## 6. Dictamen Global" }
  ];

  function detectarBloquesEnInforme() {
    const editor = document.getElementById("editorTexto");
    if (!editor) return false;
    const html = editor.innerHTML;

    const bloques = [];
    window.__bloques = bloques;

    for (let i = 0; i < patrones.length; i++) {
      const actual = patrones[i];
      const siguiente = patrones[i + 1];
      const inicio = html.indexOf(actual.titulo);
      const fin = siguiente ? html.indexOf(siguiente.titulo) : html.length;

      if (inicio !== -1 && fin !== -1 && fin > inicio) {
        const texto = html.substring(inicio, fin);
        bloques.push({ id: actual.id, titulo: actual.titulo, texto });
      }
    }

    if (bloques.length === 0) {
      ChatIA.insertarMensajeSistema("⚠️ No se detectó una estructura válida del informe.");
      return false;
    }

    return true;
  }

  function getEditorText() {
    const editor = document.getElementById("editorTexto");
    return editor ? editor.innerHTML : "";
  }

  function setEditorText(html) {
    const editor = document.getElementById("editorTexto");
    if (editor) editor.innerHTML = html;
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
    const bloques = window.__bloques || [];
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

  function enviarTodosLosBloques() {
    const bloques = window.__bloques || [];
    const input = document.getElementById("userInput");
	const boton = document.querySelector("#userInput + button.btn-primary");

    if (!input || !boton) return;

    bloques.forEach(bloque => {
      const prompt = `
Devuelve este apartado mejorado en técnica y estilo, y con una redacción extendida. No expliques nada.

Identifica tu respuesta así:
id: ${bloque.id}

Texto a mejorar:
${bloque.texto}`.trim();

      input.value = prompt;
      boton.click();
      console.log("📤 Enviado bloque:", bloque.id);
    });
  }

  function iniciarMejoraInformeLiquidacion() {
    console.log("🧠 Mejorador Liquidación activo");
    const ok = detectarBloquesEnInforme();
    if (!ok) return;
    enviarTodosLosBloques();
  }

  window.addEventListener("respuestaIA", (e) => {
    const bloques = window.__bloques || [];
    const texto = e.detail?.respuesta || "";
    const bloquesEncontrados = texto.split(/(?=id\s*:\s*[a-z_]+)/i);

    bloquesEncontrados.forEach(bloqueTexto => {
      const match = bloqueTexto.match(/id\s*:\s*([a-z_]+)\s*\n?/i);
      if (!match) return;

      const id = match[1];
      const contenido = bloqueTexto.replace(/id\s*:\s*[a-z_]+/i, "").trim();
      if (!contenido) return;

      reemplazarBloqueEnHTML(id, contenido);

      const bloque = bloques.find(b => b.id === id);
      const etiqueta = bloque ? `🧩 Mejora del bloque: <b>${bloque.titulo.replace(/^#+\s*/, '')}</b><br><br>` : "";
      ChatIA._mostrarRespuesta(etiqueta + contenido);
    });
  });

  return {
    iniciarMejoraInformeLiquidacion
  };
})();
