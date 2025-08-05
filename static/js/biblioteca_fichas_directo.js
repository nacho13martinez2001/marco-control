(function() {
  const lista = document.getElementById("listaDocumentos");
  if (!lista) {
    console.error("❌ No se encontró el contenedor 'listaDocumentos'");
    return;
  }



  fetch("/static/conocimiento/indice_biblioteca.json")
    .then(res => {
      if (!res.ok) throw new Error("❌ No se pudo acceder al índice");
      return res.json();
    })
    .then(indice => {
     
      for (const categoria of Object.keys(indice)) {
        const cabecera = document.createElement("div");
        cabecera.className = "fw-bold mt-3";
        cabecera.innerText = "📂 " + categoria.toUpperCase();
        lista.appendChild(cabecera);

        for (const doc of indice[categoria]) {
          const item = document.createElement("a");
          item.href = "#";
          item.className = "list-group-item list-group-item-action";
          item.innerText = doc.titulo || doc.ruta;
          item.onclick = () => cargarDocumento(doc.ruta);
          lista.appendChild(item);
         
        }
      }
    })
    .catch(error => {
      lista.innerHTML = "<div class='text-danger fw-bold'>❌ Error al cargar índice</div>" +
                        "<div class='text-danger small'>" + error.message + "</div>";
      console.error(error);
    });

  function cargarDocumento(ruta) {
    const editorTexto = parent.document.getElementById("editorTexto");
    if (!editorTexto) {
      console.warn("⚠️ No se encontró el editor de texto general.");
      return;
    }

    editorTexto.innerText = "⏳ Cargando contenido...";
    const visorFichaResumen = document.getElementById("visorFichaResumen");

    fetch(ruta)
      .then(res => {
        if (!res.ok) throw new Error("❌ No se pudo cargar el documento");
        return res.json();
      })
      .then(json => {
        editorTexto.innerText = json.contexto || "📘 Sin contenido textual.";
        if (visorFichaResumen) {
          const resumen = (json.contexto || "").split("\n").slice(0, 30).join("\n");
          visorFichaResumen.innerText = resumen || "📄 Sin resumen disponible.";
        }
       
      })
      .catch(err => {
        editorTexto.innerText = "❌ Error al cargar el documento.";
        console.error("🛑 Error al cargar documento:", err);
      });
  }
})();

