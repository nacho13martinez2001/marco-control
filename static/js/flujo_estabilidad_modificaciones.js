// --- PARSEO ROBUSTO DE STRINGS DE EXCEL (literal y tolerante a espacios/mayúsculas) ---
function parsearBloqueExcelStrEstabilidad(bloqueStr, mapping) {
  if (!bloqueStr) return;
  const filas = bloqueStr.split(/\r?\n/).filter(l => l.trim());
  if (filas.length < 2) return;
  const columnas = filas[0].split('\t').map(x => x.trim());
  const valores = filas[1].split('\t').map(x => x.trim());
  columnas.forEach((col, idx) => {
    // Matching robusto: ignora mayúsculas/minúsculas y espacios
    const key = Object.keys(mapping).find(
      k => k.trim().toLowerCase() === col.trim().toLowerCase()
    );
    if (key && valores[idx] !== undefined) {
      const input = document.getElementById(mapping[key]);
      if (input) input.value = valores[idx];
    }
  });
}

// --- AUTOCOMPLETADO DEL FORMULARIO ---
function rellenarFormularioEstabilidadMod() {
  parsearBloqueExcelStrEstabilidad(window._datosExcel["estabilidad_en_mod"], {
    "Previsiones Iniciales cap. 1 a 7": "input_previsiones_iniciales",        // A2
    "Créditos Iniciales cap. 1 a 7": "input_orns_iniciales",                 // B2
    "Estabilidad en Aprobación": "input_estabilidad_aprobacion",             // C2
    "DRNs cap. 1 a 7": "input_previsiones_ejecucion",                        // D2
    "ORNs cap. 1 a 7": "input_orns_ejecucion",                               // E2
    "Estabilidad en Ejecución": "input_estabilidad_ejecucion"                // F2
  });
  validarResultadosEstabilidadMod();
}

// --- OBJETO ÚNICO CON LA LÓGICA DE INICIALIZACIÓN ---
window.FlujoEstabilidadModificaciones = {
  inicializar: function() {
    const inputHoja = document.getElementById("fileUploadEstabilidad");
    if (inputHoja) {
      inputHoja.addEventListener("change", function () {
        const archivo = this.files[0];
        if (!archivo) return;

        const formData = new FormData();
        formData.append("archivo_chat", archivo);

        fetch("/chat_upload", {
          method: "POST",
          body: formData
        })
        .then(r => r.json())
        .then(data => {
          if (data.contenido && typeof data.contenido === "object") { 
            window._datosExcel = data.contenido;
            rellenarFormularioEstabilidadMod();
          } else {
            console.warn("❌ No se pudo cargar el Excel.");
          }

        })
        .catch(() => alert("❌ Error al cargar el archivo Excel."));
      });
    }
    // Listener para recalcular al cambiar cualquier campo relevante
    document.getElementById("formulario-estabilidad-modificaciones")
      .addEventListener("input", validarResultadosEstabilidadMod);
  }
};

// --- CREA EL VISOR EDITABLE SI NO EXISTE ---
function crearVisorEditableSiNoExisteEstabilidadMod() {
  let panel = document.getElementById("panel_resultados_estabilidad_mod");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "panel_resultados_estabilidad_mod";
    panel.className = "alert alert-info mt-4";
    panel.contentEditable = "true";
    panel.style.minHeight = "80px";
    panel.style.outline = "2px dashed #ccc";
    document.getElementById("formulario-estabilidad-modificaciones").appendChild(panel);

    // Botón (si no existe)
    let btn = document.getElementById("btnInsertarResultadosEstabilidadMod");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "btnInsertarResultadosEstabilidadMod";
      btn.className = "btn btn-outline-primary w-100 mt-2";
      btn.textContent = "Insertar en informe";
      btn.onclick = insertarResultadosEnInformeEstabilidadMod;
      document.getElementById("formulario-estabilidad-modificaciones").appendChild(btn);
    }
  }
}

// --- FUNCIÓN PRINCIPAL: VISOR INFORME ESTRUCTURADO Y DOCTRINAL ---
function validarResultadosEstabilidadMod() {
  crearVisorEditableSiNoExisteEstabilidadMod();

  function v(id) {
    const el = document.getElementById(id);
    return el && el.value ? el.value : "";
  }
  function vf(id) {
    const val = v(id).replace(/,/g, '.');
    return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
  }

  // Valores base
  const ornsE2 = vf("input_orns_ejecucion");
  const importeModif = vf("input_importe_modificacion");
  const fechaInforme = v("input_fecha_informe");
  const hoy = fechaInforme ? new Date(fechaInforme) : new Date();
  const diaDelAño = Math.ceil((hoy - new Date(hoy.getFullYear(),0,1))/86400000) + 1;

  // Proyección ORNs: anualiza solo E2, suma modificación al resultado final (no anualizada)
  const ornsProyFinEjercicio = (ornsE2 / diaDelAño) * 365;
  const ornsProyFinal = ornsProyFinEjercicio + importeModif;

  // Proyección Ingresos
  const previsionInicial = vf("input_previsiones_iniciales");
  const pctEjecucionIngresos = vf("input_pct_ejecucion_ingresos");
  const proyeccionIngresos = previsionInicial * (pctEjecucionIngresos / 100);

  // Actualiza los campos de proyección
  const inputProyIngresos = document.getElementById("input_proyeccion_ingresos");
  if (inputProyIngresos) {
    inputProyIngresos.value = isNaN(proyeccionIngresos) ? "" : proyeccionIngresos.toFixed(2);
  }
  const inputProyOrns = document.getElementById("input_proyeccion_orns");
  if (inputProyOrns) {
    inputProyOrns.value = isNaN(ornsProyFinal) ? "" : ornsProyFinal.toFixed(2);
  }

  // Texto explicativo de Ejecución (suma simple E2 + Modif.)
  const ornsEjecucionSumado = ornsE2 + importeModif;

  // BLOQUE 1: APROBACIÓN
  let texto1 = `<b>I. Estabilidad en Aprobación</b><br>`;
  texto1 += `Previsiones Iniciales cap. 1 a 7: <b>${v("input_previsiones_iniciales")}</b> €<br>`;
  texto1 += `Créditos Iniciales cap. 1 a 7: <b>${v("input_orns_iniciales")}</b> €<br>`;
  texto1 += `Estabilidad en Aprobación: <b>${v("input_estabilidad_aprobacion")}</b> €<br>`;
  texto1 += `<i>
El presupuesto debe aprobarse en equilibrio o superávit inicial, de forma que los ingresos no financieros previstos sean al menos iguales a los gastos no financieros autorizados. El artículo 165.4 del TRLRHL y el artículo 11 de la LOEPSF prohíben expresamente aprobar presupuestos con déficit inicial.
</i><br><br>`;

  // BLOQUE 2: EJECUCIÓN
  let texto2 = `<b>II. Estabilidad en Ejecución</b><br>`;
  texto2 += `DRNs cap. 1 a 7: <b>${v("input_previsiones_ejecucion")}</b> €<br>`;
  texto2 += `ORNs cap. 1 a 7 (E2 + Modif.): <b>${ornsEjecucionSumado.toLocaleString('es-ES', {minimumFractionDigits:2})}</b> €<br>`;
  texto2 += `Estabilidad en Ejecución: <b>${v("input_estabilidad_ejecucion")}</b> €<br>`;
  texto2 += `<i>
Durante la ejecución del presupuesto, el interventor debe supervisar periódicamente el cumplimiento de la estabilidad. El artículo 18 de la LOEPSF impone la obligación de adoptar medidas preventivas si, durante el seguimiento, se aprecia riesgo de incumplimiento del objetivo de estabilidad presupuestaria, debiendo informar para que se adopten las medidas correctoras que garanticen el equilibrio al cierre del ejercicio.
</i><br><br>`;

  // BLOQUE 3: PROYECCIÓN
  let texto3 = `<b>III. Proyección de Estabilidad a Fin de Ejercicio</b><br>`;
  texto3 += `Proyección Ingresos: <b>${proyeccionIngresos.toLocaleString('es-ES', {minimumFractionDigits:2})}</b> €<br>`;
  texto3 += `Proyección ORNs (anualiz. E2 + Modif.): <b>${ornsProyFinal.toLocaleString('es-ES', {minimumFractionDigits:2})}</b> €<br>`;
  let diferenciaProy = proyeccionIngresos - ornsProyFinal;
  texto3 += `Proyección Estabilidad: <b>${diferenciaProy.toLocaleString('es-ES', {minimumFractionDigits:2})}</b> €<br>`;
  texto3 += `<i>
La proyección anualizada hasta el final del ejercicio permite anticipar situaciones de riesgo de necesidad de financiación. Si la tendencia estimada indica posible incumplimiento de la estabilidad presupuestaria, el artículo 21 de la LOEPSF obliga a aprobar un plan económico-financiero de reequilibrio.
</i><br><br>`;

  // Conclusión global
  let cumpleEstabilidad = diferenciaProy >= 0;
  let dictamen = `<b>Conclusión</b><br>`;
  dictamen += `El análisis realizado en las fases de aprobación, ejecución y proyección refleja el grado de cumplimiento del objetivo de estabilidad presupuestaria para el ejercicio. En caso de desviación negativa, la normativa de estabilidad presupuestaria impone la adopción inmediata de medidas correctoras para garantizar el equilibrio financiero de la entidad local.`;

  let panel = document.getElementById("panel_resultados_estabilidad_mod");
  panel.innerHTML = `${texto1}<br>${texto2}<br>${texto3}<br>${dictamen}`;
}

function insertarResultadosEnInformeEstabilidadMod() {
  let panel = document.getElementById("panel_resultados_estabilidad_mod");
  if (!panel) return;
  let resumen = panel.innerText.trim();

  let prompt = `"${resumen}"\n\nRealiza un informe técnico y doctrinal sobre la estabilidad presupuestaria en modificaciones de crédito, según la LOEPSF y el TRLRHL.`;
  let inputChat = document.getElementById("userInput");
  if (inputChat) {
    inputChat.value = prompt;
  }
}
