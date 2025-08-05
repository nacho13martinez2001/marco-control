const accionesChat = {
  "subir archivo": () => {
    const input = document.getElementById("fileUpload");
    if (input) input.click();
    else alert("❌ No se encontró el input con ID 'fileUpload'.");
  },

  "genera el informe": () => {
    if (window.CopilotoRedactor?.generar) {
      window.CopilotoRedactor.generar();
    } else {
      alert("❌ No se encontró la función CopilotoRedactor.generar()");
    }
  },

  
  "resume doc": async () => {
    const texto = window._textoDocumento;
    if (!texto || texto.length < 100) {
      alert("⚠️ No se ha cargado ningún documento válido.");
      return;
    }

    const chat = document.getElementById("chat");
    const resumenPrevio = "<b>📝 Documento cargado:</b><br>" +
                          `• Longitud: ${texto.length.toLocaleString()} caracteres<br>` +
                          `• Palabras: ${texto.split(/\s+/).length}<br>` +
                          `• Fragmento inicial: <i>${texto.slice(0, 180)}...</i>`;

    const burbujaResumen = document.createElement("div");
    burbujaResumen.className = "bubble ia";
    burbujaResumen.innerHTML = `
      <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
      <div class="contenido-respuesta">${resumenPrevio}</div>
    `;
    chat.appendChild(burbujaResumen);
    chat.scrollTop = chat.scrollHeight;

    const prompt = "Resume el siguiente documento con lenguaje técnico, identificando puntos clave, estructura general y observaciones destacadas. No repitas el contenido completo.";

    const mensajes = [
      { role: "system", content: "Eres un interventor especializado en análisis técnico de documentos administrativos y presupuestarios." },
      { role: "user", content: `${prompt}\n\n${texto.slice(0, 12000)}` }
    ];

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: mensajes })
      });

      const data = await res.json();
      const respuesta = data.respuesta || "❌ No se recibió respuesta del analizador.";

      const burbujaFinal = document.createElement("div");
      burbujaFinal.className = "bubble ia";
      burbujaFinal.innerHTML = `
        <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
        <div class="contenido-respuesta"><b>📝 Resumen del documento</b><br><br>${respuesta.replace(/\n/g, "<br>")}</div>
      `;
      chat.appendChild(burbujaFinal);
      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      const error = document.createElement("div");
      error.className = "bubble ia";
      error.innerText = "❌ Error al analizar el documento.";
      chat.appendChild(error);
      chat.scrollTop = chat.scrollHeight;
    }
  },
"resume tabla": async () => {
    let hoja = document.getElementById("selectorHoja")?.value?.trim();
    if (!hoja) hoja = window.estadoAplicacion?.hojaExcelActiva?.trim();

    if (!hoja || !window._hojasExcel?.[hoja]) {
      alert("⚠️ No se detectó ninguna hoja activa.");
      return;
    }
    if (!hoja || !window._hojasExcel?.[hoja]) {
      alert("⚠️ No se detectó ninguna hoja activa.");
      return;
    }
    let contenido = window._hojasExcel?.[hoja];
    const chat = document.getElementById("chat");

    console.log("🧪 Hoja detectada automáticamente:", hoja);
    console.log("📊 Contenido crudo:", contenido);

    // 🔁 Si contenido es texto tabulado, intentar convertir
    if (typeof contenido === "string" && contenido.includes("\t")) {
      const posibleTabla = convertirTextoTabuladoATabla(contenido);
      if (Array.isArray(posibleTabla) && posibleTabla.length > 0) {
        console.log("🔄 Hoja convertida automáticamente desde texto plano.");
        contenido = posibleTabla;
      } else {
        const burbuja = document.createElement("div");
        burbuja.className = "bubble ia";
        burbuja.innerHTML = `
          <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
          <div class="contenido-respuesta">
            <b>📄 La hoja "${hoja}" contiene texto tabulado pero no se pudo convertir en tabla.</b><br><br>
            Verifica que tiene una cabecera clara y filas uniformes en Excel antes de volver a cargarla.
          </div>
        `;
        chat.appendChild(burbuja);
        chat.scrollTop = chat.scrollHeight;
        return;
      }
    }

    // 🧮 Conversión a array si es objeto indexado
    if (contenido && typeof contenido === "object" && !Array.isArray(contenido)) {
      const valores = Object.values(contenido);
      if (Array.isArray(valores) && typeof valores[0] === "object") {
        contenido = valores;
      }
    }

    if (!Array.isArray(contenido) || contenido.length === 0) {
      alert("⚠️ No se detectaron datos útiles en la primera hoja del Excel.");
      return;
    }

    const numFilas = contenido.length;
    const cabecera = Object.keys(contenido[0] || {});
    const numColumnas = cabecera.length;

    // 🧠 Clasificación del tipo de hoja
    const columnasTexto = cabecera.map(c => c.toLowerCase());
    let tipoHoja = "hoja general";
    if (columnasTexto.some(t => t.includes("drn"))) tipoHoja = "hoja de ingresos";
    if (columnasTexto.some(t => t.includes("orn"))) tipoHoja = "hoja de gastos";
    if (columnasTexto.some(t => t.includes("estabilidad"))) tipoHoja = "estabilidad presupuestaria";
    if (columnasTexto.some(t => t.includes("capítulo") || t.includes("capitulo"))) tipoHoja = "estructura por capítulos";

    // ➕ Sumatorios
    const sumatorios = {};
    cabecera.forEach(col => {
      const total = contenido.reduce((acc, fila) => {
        const val = parseFloat((fila[col] || "").toString().replace(",", "."));
        return acc + (isFinite(val) ? val : 0);
      }, 0);
      if (!isNaN(total) && total !== 0) {
        sumatorios[col] = total.toFixed(2);
      }
    });

    // 📋 Resumen
    let resumenPrevio = `<b>📊 Hoja: "${hoja}"</b><br>`;
    resumenPrevio += `• Tipo detectado: ${tipoHoja}<br>`;
    resumenPrevio += `• Filas: ${numFilas}<br>• Columnas: ${numColumnas}<br>`;
    if (Object.keys(sumatorios).length > 0) {
      resumenPrevio += `<br><b>Σ Sumatorios por columna:</b><br>`;
      for (const col in sumatorios) {
        resumenPrevio += `– ${col}: ${sumatorios[col]}<br>`;
      }
    }

    const burbujaResumen = document.createElement("div");
    burbujaResumen.className = "bubble ia";
    burbujaResumen.innerHTML = `
      <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
      <div class="contenido-respuesta">${resumenPrevio}</div>
    `;
    chat.appendChild(burbujaResumen);
    chat.scrollTop = chat.scrollHeight;

    // 🧠 Enviar a IA (prompt genérico)
    const prompt = `Resume y diagnostica la siguiente tabla de datos, indicando su estructura general, posibles inconsistencias, columnas clave y cualquier observación relevante. No repitas el contenido completo.`;

    const mensajes = [
      { role: "system", content: "Eres un interventor especializado en análisis técnico de hojas de cálculo presupuestarias." },
      { role: "user", content: `${prompt}\n\n${JSON.stringify(contenido).slice(0, 12000)}` }
    ];

    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: mensajes })
      });

      const data = await res.json();
      const respuesta = data.respuesta || "❌ No se recibió respuesta del analizador.";

      const burbujaFinal = document.createElement("div");
      burbujaFinal.className = "bubble ia";
      burbujaFinal.innerHTML = `
        <img src='/static/icono_chat.png' alt='IA' style='height: 20px; vertical-align: middle; margin-right: 8px;'>
        <div class="contenido-respuesta"><b>📊 Resumen de la hoja: ${hoja}</b><br><br>${respuesta.replace(/\n/g, "<br>")}</div>
      `;
      chat.appendChild(burbujaFinal);
      chat.scrollTop = chat.scrollHeight;
    } catch (err) {
      const error = document.createElement("div");
      error.className = "bubble ia";
      error.innerText = "❌ Error al analizar la tabla activa.";
      chat.appendChild(error);
      chat.scrollTop = chat.scrollHeight;
    }
  }
};

// ==============================
// 🔁 CONVERSOR DE TEXTO TABULADO A TABLA ESTRUCTURADA
// ==============================
function convertirTextoTabuladoATabla(textoPlano) {
  const filas = textoPlano.trim().split("\n").map(f => f.split(/\t+/).map(c => c.trim()));
  if (filas.length < 2) return [];

  const cabeceras = filas[0];
  return filas.slice(1).map(fila => {
    const obj = {};
    cabeceras.forEach((col, i) => {
      obj[col] = fila[i] ?? "";
    });
    return obj;
  });
}

// ==============================
// 🧠 INTÉRPRETE DE COMANDOS
// ==============================
window.intentarEjecutarAccionDesdeChat = function (texto) {
  const textoNormalizado = texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  for (const clave in accionesChat) {
    const claveNormalizada = clave.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (textoNormalizado.includes(claveNormalizada)) {
      accionesChat[clave]();
      return true;
    }
  }
  return false;
};
