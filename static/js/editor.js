
// editor.js mejorado con aislamiento funcional por apartado y botón de deselección

window._historialScrollApartado = {};
let apartadoActualVisible = null;
let textoOriginalInforme = "";

function aplicarEstiloInforme() {
  const editor = document.getElementById("editorTexto");
  if (!editor) return;

  let texto = editor.innerText.trim();

  const bloques = texto.split(/\n\s*\n+|\r{2,}|(?<=\.)\s*\n/).map(b => b.trim()).filter(Boolean);

  if (!bloques.length) return;

  const htmlFinal = bloques
    .map(parrafo => `<p style="text-align: justify; font-family: 'Century Gothic', sans-serif; font-size: 20px; line-height: 1.6;">${parrafo}</p>`)
    .join("\n");

  editor.innerHTML = htmlFinal;
  editor.style.padding = "10px";
  editor.style.animation = "none";

  editor.classList.add("efecto-aplicado");
  setTimeout(() => {
    editor.classList.remove("efecto-aplicado");
    editor.style.animation = "parpadeoTexto 1.2s infinite alternate";
  }, 1600);
}

function buscarEnInforme(palabra) {
  if (!palabra) {
    const input = document.getElementById("buscadorTextoInforme");
    if (!input || !input.value.trim()) return;
    palabra = input.value.trim();
  }

  const editor = document.getElementById("editorTexto");
  if (!editor) return;

  const textoBuscado = palabra.toLowerCase();
  const nodos = Array.from(editor.childNodes);

  for (const nodo of nodos) {
    if (nodo.nodeType !== Node.TEXT_NODE) continue;

    const textoNodo = nodo.textContent.toLowerCase();
    const index = textoNodo.indexOf(textoBuscado);

    if (index !== -1) {
      const rango = document.createRange();
      rango.setStart(nodo, index);
      rango.setEnd(nodo, index + textoBuscado.length);

      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(rango);

      nodo.parentElement?.scrollIntoView({ behavior: "smooth", block: "center" });

      nodo.parentElement?.classList.add("leido");
      setTimeout(() => nodo.parentElement?.classList.remove("leido"), 1500);
      return;
    }
  }

  console.warn("❌ No se encontró:", palabra);
}

function cargarApartadosDesdeIndice() {
  const editor = document.getElementById("editorTexto");
  const selector = document.getElementById("selectorApartadosInforme");
  if (!editor || !selector) return;

  const texto = editor.innerText;
  const matches = [...texto.matchAll(/^(\d{1,2})\.-\s+(.{3,100}?)(?=\n|$)/gm)];

  selector.innerHTML = "";

  const deseleccionar = document.createElement("option");
  deseleccionar.value = "__todos__";
  deseleccionar.textContent = "--> Mostrar todo el informe";
  selector.appendChild(deseleccionar);

  const usados = new Set();

  for (const [, numeral, titulo] of matches) {
    const clave = `${numeral}.- ${titulo}`.trim();
    if (usados.has(clave)) continue;
    usados.add(clave);

    const opt = document.createElement("option");
    opt.value = clave;
    opt.textContent = clave;
    selector.appendChild(opt);
  }
}

window.irAApartadoInforme = irAApartadoInforme;
window.aplicarEstiloInforme = aplicarEstiloInforme;

function guardarComoWord() {
  const editor = document.getElementById("editorTexto");
  if (!editor) return;

  const contenidoHTML = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
    <head><meta charset='utf-8'></head><body>${editor.innerHTML}</body></html>`;

  const blob = new Blob(['\ufeff', contenidoHTML], {
    type: 'application/msword'
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "informe.doc";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function irAApartadoInforme(valor) {
  const editor = document.getElementById("editorTexto");
  if (!editor) return;

  if (!textoOriginalInforme) {
    textoOriginalInforme = editor.innerText;
  }

  if (valor === "__todos__") {
    apartadoActualVisible = null;
    editor.innerText = textoOriginalInforme;
    aplicarEstiloInforme?.();
    return;
  }

  if (apartadoActualVisible === valor) {
    editor.innerText = textoOriginalInforme;
    aplicarEstiloInforme?.();
    apartadoActualVisible = null;
    return;
  }

  const texto = textoOriginalInforme;
  const encabezados = [...texto.matchAll(/^(\d{1,2})\.-\s+(.*)/gm)];

  let resultado = "";

  for (let i = 0; i < encabezados.length; i++) {
    const [matchCompleto, numeral, titulo] = encabezados[i];
    const clave = `${numeral}.- ${titulo}`.trim();

    if (clave === valor) {
      console.log("🔎 Coincidencia encontrada:", clave);
      const inicio = texto.indexOf(matchCompleto);
      const fin = i + 1 < encabezados.length
        ? texto.indexOf(encabezados[i + 1][0])
        : texto.length;
      resultado = texto.slice(inicio, fin).trim();
      break;
    }
  }

  if (!resultado) {
    console.warn("❌ No se encontró el apartado:", valor);
    return;
  }

  editor.innerText = resultado;
  aplicarEstiloInforme?.();
  apartadoActualVisible = valor;
}

async function extraerApartadosDesdeIA() {
  const selector = document.getElementById("selectorApartadosInforme");
  const texto = document.getElementById("editorTexto")?.innerText || "";
  if (!selector || !texto.trim()) return;

  selector.innerHTML = "<option>Cargando desde IA...</option>";

  try {
    const respuesta = await fetch("/estructura_ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto })
    });

    const data = await respuesta.json();
    selector.innerHTML = "";

    const deseleccionar = document.createElement("option");
    deseleccionar.value = "__todos__";
    deseleccionar.textContent = "--> Mostrar todo el informe";
    selector.appendChild(deseleccionar);

    if (data.estructura && data.estructura.length) {
      for (const { numeral, titulo } of data.estructura) {
        const opt = document.createElement("option");
        opt.value = `${numeral}.- ${titulo}`;
        opt.textContent = `${numeral}.- ${titulo}`;
        selector.appendChild(opt);
      }
    } else {
      selector.innerHTML = "<option>No se detectaron apartados</option>";
    }
  } catch (e) {
    selector.innerHTML = "<option>Error al usar IA</option>";
    console.error("❌ Error al detectar estructura:", e);
  }
}


window.EditorTextoUtils = {
  cargarApartadosDesdeIndice,
  extraerApartadosDesdeIA
};

function insertarConsultaIA_MejorarApartado() {
  const inputChat = document.getElementById("userInput");
  const editor = document.getElementById("editorTexto");
  const selection = window.getSelection();

  if (!inputChat || !editor || !selection || selection.rangeCount === 0) return;

  const rango = selection.getRangeAt(0);

  if (!editor.contains(rango.commonAncestorContainer)) {
    alert("⚠️ Selecciona texto dentro del editor.");
    return;
  }

  const textoSeleccionado = selection.toString().trim();
  if (!textoSeleccionado) {
    alert("⚠️ No has seleccionado ningún texto.");
    return;
  }

  const prompt = `Devuelve este apartado mejorado en redacción, técnica y estilo:\n\n"${textoSeleccionado}"`;
  inputChat.value = prompt;
}