
ChatIA._mostrarRespuesta = function (respuesta) {
  const chatOutput = document.querySelector("#chatOutput") || document.querySelector("#chat");
  if (!chatOutput) return;

  // 🧠 PREPROCESAMIENTO: limpiar texto antes de dividir
  const textoLimpio = respuesta
    .replace(/Texto a mejorar:/gi, "")
    .replace(/Devuelve este apartado mejorado[\s\S]*?No expliques nada\./gi, "")
    .replace(/# Informe de Intervención sobre la Aprobación del Presupuesto General/gi, "")
    .trim();

  const bloques = [...textoLimpio.matchAll(/id\s*:\s*([a-z_]+)\s*\n+([\s\S]*?)(?=(?:\nid\s*:|$))/gi)];

  if (bloques.length > 0) {
    bloques.forEach(([_, id, contenido]) => {
      id = id.trim();
      contenido = contenido.trim();

      const bloque = (window.__bloques || window.__bloques_original || []).find(b => b.id === id);
      const etiqueta = bloque ? `🧩 Mejora del bloque: <b>${bloque.titulo.replace(/^#+\s*/, '')}</b><br><br>` : "";

      const div = document.createElement("div");
      div.className = "mensaje mensaje-ia";
      div.dataset.id = id;
      div.innerHTML = `
        <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
        <div style="text-align: right; margin-bottom: 6px;">
          <button onclick="insertarEnEditorDesdeBurbuja(this)" class="btn btn-sm btn-outline-primary" title="Insertar en el editor">
            📥 Insertar
          </button>
        </div>
        <div class="contenido-respuesta" style="margin-top:4px;">${etiqueta + contenido.replace(/\n/g, "<br>")}</div>
      `;
      setTimeout(() => chatOutput.appendChild(div), 0);
      chatOutput.scrollTop = chatOutput.scrollHeight;
    });
    return;
  }

  // 📥 Acción por lenguaje natural desde el chat
  if (window.intentarEjecutarAccionDesdeChat?.(respuesta)) return;

  // 🧾 Respuesta simple (texto plano)
  const div = document.createElement("div");
  div.className = "mensaje mensaje-ia";
  div.innerHTML = `
    <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
    <div class="contenido-respuesta">${respuesta}</div>
  `;
  setTimeout(() => chatOutput.appendChild(div), 0);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  window.dispatchEvent(new CustomEvent("respuestaIA", {
    detail: { respuesta }
  }));

  return respuesta;
};


window.insertarEnEditorDesdeBurbuja = (boton) => {
  const burbuja = boton.closest(".mensaje-ia");
  const id = burbuja?.dataset?.id;

  if (!id) {
    console.warn("❌ No se encontró el ID del bloque en la burbuja.");
    return;
  }

  const bloques = window.__bloques || window.__bloques_original || [];
  const bloque = bloques.find(b => b.id === id);

  if (!bloque) {
    console.warn("❌ No se encontró el bloque con ID:", id);
    return;
  }

  const contenido = burbuja.querySelector(".contenido-respuesta")?.innerHTML || "";
  const editor = document.getElementById("editorTexto");
  const html = editor?.innerHTML || "";

  const marcadorInicio = bloque.titulo;
  const indiceInicio = html.indexOf(marcadorInicio);
  const siguiente = bloques[bloques.indexOf(bloque) + 1];
  const marcadorFin = siguiente?.titulo;
  const indiceFin = marcadorFin ? html.indexOf(marcadorFin) : html.length;

  if (indiceInicio === -1 || indiceFin <= indiceInicio) {
    console.warn("⚠️ No se pudo localizar el bloque:", id);
    return;
  }

  const antes = html.slice(0, indiceInicio);
  const despues = html.slice(indiceFin);
  editor.innerHTML = `${antes}${contenido}<br>${despues}`;

  editor.classList.add("insertado");
  editor.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => editor.classList.remove("insertado"), 1000);

  boton.innerText = "✅ Insertado";
  boton.disabled = true;

  console.log("✅ Bloque insertado por botón:", id);
};




/* 🎨 Efecto visual para inserciones */
const estilo = document.createElement('style');
estilo.innerHTML = `
@keyframes resplandorInsertado {
  0%   { box-shadow: 0 0 0px transparent; }
  50%  { box-shadow: 0 0 15px #05fcfe; }
  100% { box-shadow: 0 0 0px transparent; }
}
#editorTexto.insertado {
  animation: resplandorInsertado 0.8s ease-in-out;
}
`;
document.head.appendChild(estilo);

function iniciarRevisionInteligentePorBloques() {
  const texto = document.getElementById("editorTexto")?.innerText || "";

  if (texto.includes("Aprobación del Presupuesto General")) {
    MejoradorAprobacion?.iniciarMejoraInformeAprobacion();
  } else if (texto.includes("Liquidación del Presupuesto General")) {
    MejoradorLiquidacion?.iniciarMejoraInformeLiquidacion();
  } else {
    alert("⚠️ No se reconoce el tipo de informe cargado.");
  }
}
