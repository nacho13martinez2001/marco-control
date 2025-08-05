
// ================================
// Mejorador IA por bloques del informe de Aprobación
// ================================

window.MejoradorAprobacion = (() => {
  const bloques = [];
  let indiceActual = 0;

  function detectarBloquesEnInforme() {
    const texto = (document.getElementById("editorTexto")?.innerText || "").replace(/\r?\n/g, "\n").trim();
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
      const pattern = patrones[i].titulo;
      const start = texto.indexOf(pattern);
      const end = i < patrones.length - 1 ? texto.indexOf(patrones[i + 1].titulo) : texto.length;
      if (start !== -1 && end !== -1 && end > start) {
        const contenido = texto.substring(start, end).trim();
        bloques.push({ ...patrones[i], contenido });
      }
    }

    if (bloques.length === 0) {
      console.warn("⚠️ No se detectaron los patrones en el informe.");
      console.log("📄 CONTENIDO RAW:", texto);
    }
  }

  function enviarBloqueAlChat() {
    if (!bloques[indiceActual]) return;
    const bloque = bloques[indiceActual];
    const mensaje = {
      tipo: "mejora_bloque_aprobacion",
      idBloque: bloque.id,
      titulo: bloque.titulo,
      contenido: bloque.contenido
    };
    ChatIA.insertarMensajeSistema("✍️ ¿Quieres que mejore el bloque: " + bloque.titulo + "?");
    ChatIA.enviarMensajeInteligente(mensaje);
  }

  function reemplazarBloqueEnEditor(idBloque, nuevoTexto) {
    const editor = document.getElementById("editorTexto");
    if (!editor) return;
    const bloque = bloques.find(b => b.id === idBloque);
    if (!bloque) return;
    const textoActual = editor.innerText;
    const nuevo = textoActual.replace(bloque.contenido, nuevoTexto);
    editor.innerText = nuevo;
    bloque.contenido = nuevoTexto;
  }

  const controladorMejora = {
    aceptar: function (nuevoTexto) {
      const bloque = bloques[indiceActual];
      reemplazarBloqueEnEditor(bloque.id, nuevoTexto);
      indiceActual++;
      if (indiceActual < bloques.length) {
        enviarBloqueAlChat();
      } else {
        ChatIA.insertarMensajeSistema("✅ Todos los bloques han sido revisados.");
      }
    },
    siguiente: function () {
      indiceActual++;
      if (indiceActual < bloques.length) {
        enviarBloqueAlChat();
      } else {
        ChatIA.insertarMensajeSistema("✅ Fin del proceso de mejora.");
      }
    },
    reformular: function () {
      enviarBloqueAlChat();
    }
  };

  function iniciarMejoraInformeAprobacion() {
    detectarBloquesEnInforme();
    indiceActual = 0;
    if (bloques.length === 0) {
      ChatIA.insertarMensajeSistema("⚠️ No se detectó una estructura válida del informe.");
      return;
    }
    enviarBloqueAlChat();
  }

  return {
    iniciarMejoraInformeAprobacion,
    controladorMejora,
    detectarBloquesEnInforme,
    enviarBloqueAlChat,
    reemplazarBloqueEnEditor
  };
})();
