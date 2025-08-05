// excel.js

let hyperformulaInstance = HyperFormula.buildEmpty({
  licenseKey: 'gpl-v3'  // uso personal/no comercial
});
let ultimaSeleccion = null;

function mostrarExcelEnTabla(datos) {
  const contenedor = document.getElementById("editorHandsontable");
  if (!contenedor) return;

  const filas = datos.split("\n").map(f => f.split("\t"));
  contenedor.innerHTML = "";

  // ?? Inicialización de Handsontable con altura automática
  window.hotInstance = new Handsontable(contenedor, {
    data: filas,
    height: 'auto',
    rowHeaders: true,
    colHeaders: true,
    licenseKey: 'non-commercial-and-evaluation',
    colWidths: 120,
    rowHeights: 28,
    formulas: {
      engine: hyperformulaInstance
    },
    afterSelectionEnd: (r1, c1, r2, c2) => {
      ultimaSeleccion = { r1, c1, r2, c2 };
      window.ultimaSeleccion = ultimaSeleccion;

      // ?? Mostrar el contenido de la selección en el visor de texto
      const visor = document.getElementById("visorTextoCeldas");
      if (!visor) return;

      let texto = "";
      for (let row = r1; row <= r2; row++) {
        let fila = [];
        for (let col = c1; col <= c2; col++) {
          const val = window.hotInstance.getDataAtCell(row, col);
          fila.push(val !== null && val !== undefined ? val.toString() : "");
        }
        texto += fila.join("\t") + "\n";
      }

      visor.textContent = texto.trim() || "?? Sin contenido seleccionado.";
    }
  });
}

function restaurarYEnviarSeleccion() {
  if (!window.hotInstance || !window.ultimaSeleccion) {
    alert("鈿狅笍 No hay hoja cargada o selecci贸n activa.");
    return;
  }

  const { r1, c1, r2, c2 } = window.ultimaSeleccion;
  window.hotInstance.selectCell(r1, c1, r2, c2, true);

  setTimeout(() => {
    enviarCeldasSeleccionadas();
  }, 20);
}

function enviarCeldasOTextoSeleccionado() {
  const inputChat = document.getElementById("userInput");

  // 馃敼 1. Si hay selecci贸n en Excel (Handsontable)
  if (window.hotInstance && window.ultimaSeleccion) {
    const { r1, c1, r2, c2 } = window.ultimaSeleccion;
    let seleccion = [];

    for (let row = r1; row <= r2; row++) {
      let fila = [];
      for (let col = c1; col <= c2; col++) {
        const val = window.hotInstance.getDataAtCell(row, col);
        fila.push(val !== null && val !== undefined ? val.toString() : "");
      }
      seleccion.push(fila.join("\t"));
    }

    inputChat.value = seleccion.join("\n");
    inputChat.focus();
    return;
  }

  // 馃敼 2. Si no hay Excel, buscar selecci贸n en el editor de texto
  const seleccion = window.getSelection();
  const textoSeleccionado = seleccion.toString().trim();

  if (textoSeleccionado.length > 0) {
    inputChat.value = textoSeleccionado;
    inputChat.focus();
    return;
  }

  // 馃敻 3. Si no hay nada seleccionado
  alert("鈿狅笍 No hay selecci贸n activa en el Excel ni en el editor de texto.");
}

function cambiarHoja() {
  const nombre = document.getElementById("selectorHoja").value;
  if (!window._hojasExcel || !nombre) return;
  window._hojaSeleccionada = nombre;
  mostrarExcelEnTabla(window._hojasExcel[nombre]);
}

function mostrarExcelEnModal(datosTxt) {
  const contenedor = document.getElementById("contenedorExcelModal");
  if (!contenedor) return;

  const filas = datosTxt.split("\n").map(f => f.split("\t"));
  contenedor.innerHTML = ""; // Limpia cualquier tabla anterior

  window.hotModal = new Handsontable(contenedor, {
    data: filas,
    rowHeaders: true,
    colHeaders: true,
    licenseKey: 'non-commercial-and-evaluation',
    colWidths: 120,
    rowHeights: 20,
    formulas: {
      engine: hyperformulaInstance
    },
    afterSelectionEnd: (r1, c1, r2, c2) => {
      window.ultimaSeleccion = { r1, c1, r2, c2 };
    }
  });
}

function insertarFilasDesdeSeleccion() {
  if (!window.hotModal || !window.ultimaSeleccion) {
    alert("鈿狅笍 Selecciona un rango en el Excel antes.");
    return;
  }

  const { r1, c1, r2, c2 } = window.ultimaSeleccion;
  for (let row = r1; row <= r2; row++) {
    const fila = [];
    for (let col = c1; col <= c2; col++) {
      const val = window.hotModal.getDataAtCell(row, col);
      fila.push(val !== null && val !== undefined ? val.toString() : "");
    }

    // Esta funci贸n debe existir en tu m贸dulo de modificaciones
    if (typeof window.insertarFilaModificacionDesdeExcel === "function") {
      window.insertarFilaModificacionDesdeExcel(fila);
    } else {
      console.warn("鈿狅笍 Falta la funci贸n insertarFilaModificacionDesdeExcel.");
    }
  }

  document.getElementById("modalExcelModificaciones").style.display = "none";
}
