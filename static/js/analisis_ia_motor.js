// analisis_ia_motor.js
(function () {
  console.log("✅ Script analisis_ia_motor.js cargado.");

  function lanzarAnalisisIAReal() {
    const texto = window.getSelection()?.toString().trim() || document.getElementById("editorTexto")?.innerText.trim();

    if (!texto) {
      alert("❌ No hay texto seleccionado ni contenido en el editor.");
      return;
    }

    const boton = document.getElementById("btnAnalisisIA");
    if (boton) boton.disabled = true;

    const resultadoContainer = document.getElementById("resultadoAnalisisIA");
    if (resultadoContainer) {
      resultadoContainer.innerText = "⏳ Analizando el texto con IA experta...";
    }

    fetch("/analizar_informe_ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto })
    })
      .then(r => r.json())
      .then(data => {
        const resultado = data.analisis_ia || "❌ No se recibió respuesta del análisis.";
        if (resultadoContainer) {
          const bloques = resultado.split(/(?=^[1-3]\.\s)/m);
          resultadoContainer.innerHTML = bloques.map(b => {
            if (b.includes("1.")) return `<h6>✍️ Redacción</h6><p>${b.replace("1.", "").trim()}</p>`;
            if (b.includes("2.")) return `<h6>⚖️ Normativa</h6><p>${b.replace("2.", "").trim()}</p>`;
            if (b.includes("3.")) return `<h6>📌 Coherencia</h6><p>${b.replace("3.", "").trim()}</p>`;
            return `<p>${b}</p>`;
          }).join("<hr>");
        }
      })
      .catch(error => {
        console.error("❌ Error al conectar con el servidor de IA:", error);
        if (resultadoContainer) {
          resultadoContainer.innerText = "❌ Error al conectar con el servidor de IA.";
        }
      })
      .finally(() => {
        if (boton) boton.disabled = false;
      });
  }

  // 🔓 Exportar al contexto global para el botón HTML
  window.lanzarAnalisisIAReal = lanzarAnalisisIAReal;
})();
