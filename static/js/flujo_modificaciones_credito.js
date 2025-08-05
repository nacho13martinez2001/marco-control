// 🧠 Observador dinámico: activa el flujo cuando se detecta el texto del informe
const editor = document.getElementById("editorTexto");
if (editor) {
  const observer = new MutationObserver(() => {
    const texto = editor.innerText.toUpperCase();
    if (texto.includes("INFORME DE INTERVENCIÓN DE MODIFICACIÓN PRESUPUESTARIA")) {
      lanzarFlujoModificacionIA();
      observer.disconnect(); // Solo una vez
    }
  });

  observer.observe(editor, { childList: true, subtree: true, characterData: true });
}

// 🧠 Mensaje inicial IA
function lanzarFlujoModificacionIA() {
  if (typeof mostrarFormatoInputChat === "function") {
    mostrarFormatoInputChat();
  }
}

// 📤 Función para procesar la respuesta del usuario
window.responderFlujoModificacion = async function(respuestaUsuario) {
  try {
    const res = await fetch("/analizar_modificacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto: respuestaUsuario })
    });

    const datos = await res.json();
    if (datos.error) {
      mostrarMensajeEnChat("❌ No se pudo analizar la respuesta. Intenta reformular.");
      return;
    }

    const { tipo, recurso, aplicacion, observacion } = datos;

    mostrarMensajeEnChat(`✅ Modificación detectada:
- Tipo: ${tipo}
- Recurso: ${recurso}
- Aplicación: ${aplicacion}

📝 Observación técnica:
${observacion}`);

    insertarEnInforme(observacion);
  } catch (error) {
    mostrarMensajeEnChat("❌ Error de red o procesamiento IA.");
    console.error(error);
  }
};

// 💬 Mostrar texto en el sistema de chat real
function mostrarMensajeEnChat(texto) {
  const chat = document.getElementById("chat");
  if (!chat) return;

  const burbuja = document.createElement("div");
  burbuja.classList.add("bubble", "ia");
  burbuja.innerText = texto;
  chat.appendChild(burbuja);
  chat.scrollTop = chat.scrollHeight;
}



// 💾 Almacenamiento temporal de fuentes de financiación
window.fuentesFinanciacion = [];

window.guardarFuenteFinanciacion = function () {
  const tipo = document.getElementById("tipoFinanciacion").value;
  const importe = parseFloat(document.getElementById("importeFinanciacion").value);

  if (!tipo || isNaN(importe) || importe <= 0) {
    alert("⚠️ Debes seleccionar un tipo de financiación y un importe válido.");
    return;
  }

  // Guardar
  fuentesFinanciacion.push({ tipo, importe });

  // Mostrar en la lista
  const lista = document.getElementById("listaFuentes");
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <span>${tipo}: ${importe.toLocaleString("es-ES")} €</span>
    <button class="btn btn-primary btn-sm" onclick="this.parentElement.remove(); eliminarFuente('${tipo}', ${importe})">X</button>
  `;
  lista.appendChild(li);

  // Limpiar campos
  document.getElementById("tipoFinanciacion").value = "";
  document.getElementById("importeFinanciacion").value = "";
};

window.eliminarFuente = function (tipo, importe) {
  fuentesFinanciacion = fuentesFinanciacion.filter(f => f.tipo !== tipo || f.importe !== importe);
};

window.generarResumenIA = function () {
  const tipoMod = document.getElementById("tipoModificacion").value;
  if (!tipoMod || fuentesFinanciacion.length === 0) {
    document.getElementById("fraseResumenIA").innerText = "⚠️ Selecciona un tipo de modificación y guarda al menos una fuente.";
    return;
  }

  const partes = fuentesFinanciacion.map(f =>
    `${f.importe.toLocaleString("es-ES")} € con cargo a ${f.tipo}`
  );

  const resumen = partes.join(" y ");
  const frase = `Se propone una ${tipoMod.toLowerCase()} financiada con ${resumen}.`;
  document.getElementById("fraseResumenIA").innerText = frase;
};



// ➕ Insertar fila en tabla de financiación
window.agregarFilaFinanciacion = function () {
  const tabla = document.getElementById("tablaFinanciacion").querySelector("tbody");
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td><select class="form-select form-select-sm">
      <option value="Remanente general">Remanente general</option>
      <option value="Remanente afectado">Remanente afectado</option>
      <option value="Nuevo ingreso">Nuevo ingreso</option>
      <option value="Mayor ingreso">Mayor ingreso</option>
      <option value="Menor gasto">Menor gasto</option>
    </select></td>
    <td><input type="text" class="form-control form-control-sm" placeholder="Denominación"></td>
    <td><input type="text" class="form-control form-control-sm" placeholder="Económica"></td>
    <td><input type="number" class="form-control form-control-sm" placeholder="Importe"></td>
    <td><button class="btn btn-primary btn-sm" onclick="this.closest('tr').remove()">X</button></td>
  `;

  tabla.appendChild(fila);
};



// ➕ Insertar fila en tabla de financiación desde botón
window.agregarFilaFinanciacion = function (datos = {}) {
  const tabla = document.getElementById("tablaFinanciacion").querySelector("tbody");
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td><input type="text" class="form-control form-control-sm" placeholder="Programa" value="${datos.programa || ''}"></td>
    <td><input type="text" class="form-control form-control-sm" placeholder="Económica" value="${datos.economica || ''}"></td>
    <td><input type="text" class="form-control form-control-sm" placeholder="Denominación" value="${datos.denominacion || ''}"></td>
    <td>
      <select class="form-select form-select-sm">
        <option value="Remanente general" ${datos.tipo === 'Remanente general' ? 'selected' : ''}>Remanente general</option>
        <option value="Remanente afectado" ${datos.tipo === 'Remanente afectado' ? 'selected' : ''}>Remanente afectado</option>
        <option value="Nuevo ingreso" ${datos.tipo === 'Nuevo ingreso' ? 'selected' : ''}>Nuevo ingreso</option>
        <option value="Mayor ingreso" ${datos.tipo === 'Mayor ingreso' ? 'selected' : ''}>Mayor ingreso</option>
        <option value="Menor gasto" ${datos.tipo === 'Menor gasto' ? 'selected' : ''}>Menor gasto</option>
      </select>
    </td>
    <td><input type="number" class="form-control form-control-sm" placeholder="Importe" value="${datos.importe || ''}"></td>
    <td><button class="btn btn-primary btn-sm" onclick="this.closest('tr').remove()">X</button></td>
  `;

  tabla.appendChild(fila);
};

// 🔄 Modificado: Guardar fuente → insertar en tabla directamente
window.guardarFuenteFinanciacion = function () {
  const tipo = document.getElementById("tipoFinanciacion").value;
  const importe = parseFloat(document.getElementById("importeFinanciacion").value);

  if (!tipo || isNaN(importe)) {
    alert("⚠️ Debes seleccionar un tipo de financiación y un importe válido.");
    return;
  }

  // Insertar en tabla
  agregarFilaFinanciacion({ tipo, importe });

  // Limpiar campos
  document.getElementById("tipoFinanciacion").value = "";
  document.getElementById("importeFinanciacion").value = "";
};
