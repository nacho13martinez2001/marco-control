
// mejorador_externo.js – Mejorador IA para informes externos (IDs como bloque_a, bloque_b...)

window.MejoradorExterno = (() => {
  const bloques = [];
  window.__bloques = bloques;

  function detectarBloquesEnInforme() {
    const texto = document.getElementById("editorTexto")?.innerText || "";
    if (!texto.trim()) return false;

    const matches = [...texto.matchAll(/^(\d{1,2})\.-\s+(.{3,100}?)(?=\n|$)/gm)];
    if (!matches.length) {
      ChatIA.insertarMensajeSistema("⚠️ No se detectaron bloques estructurados en el informe.");
      return false;
    }

    bloques.length = 0;

    for (let i = 0; i < matches.length && i < 26; i++) {
      const matchActual = matches[i][0];
      const id = `bloque_${String.fromCharCode(97 + i)}`;  // bloque_a, bloque_b, ...
      const titulo = matchActual.trim();

      const inicio = texto.indexOf(matchActual);
      const fin = i + 1 < matches.length
        ? texto.indexOf(matches[i + 1][0])
        : texto.length;

      const contenido = texto.slice(inicio, fin).trim();
      bloques.push({ id, titulo, texto: contenido });
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

  function enviarTodosLosBloques() {
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

  function iniciarMejoraInformeExterno() {
    console.log("🧠 Mejorador Externo activo");
    const ok = detectarBloquesEnInforme();
    if (!ok) return;
    ChatIA.insertarMensajeSistema("¿Quieres que mejore el Informe?");
    setTimeout(() => enviarTodosLosBloques(), 1000);
  }

  window.addEventListener("respuestaIA", (e) => {
    const texto = e.detail?.respuesta || "";
    const bloquesEncontrados = texto.split(/(?=id\s*:\s*bloque_[a-z]+)/i);

    bloquesEncontrados.forEach(bloqueTexto => {
      const match = bloqueTexto.match(/id\s*:\s*(bloque_[a-z]+)\s*\n?/i);
      if (!match) return;

      const id = match[1];
      const contenido = bloqueTexto.replace(/id\s*:\s*bloque_[a-z]+/i, "").trim();
      if (!contenido) return;

      reemplazarBloqueEnHTML(id, contenido);

      const bloque = bloques.find(b => b.id === id);
      const etiqueta = bloque ? `🧩 Mejora del bloque: <b>${bloque.titulo}</b><br><br>` : "";
      ChatIA._mostrarRespuesta(etiqueta + contenido);
    });
  });

  return {
    iniciarMejoraInformeExterno
  };
})();
