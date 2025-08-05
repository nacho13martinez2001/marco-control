// --- PARSEO ROBUSTO DE STRINGS DE EXCEL ---
function parsearBloqueExcelStr(bloqueStr, mapping) {
  if (!bloqueStr) return;
  const filas = bloqueStr.split(/\r?\n/).filter(l => l.trim());
  if (filas.length < 2) return;
  const columnas = filas[0].split('\t').map(x => x.replace(/\r/g,'').trim());
  const valores = filas[1].split('\t').map(x => x.trim());
  columnas.forEach((col, idx) => {
    const idInput = mapping[col];
    if (idInput && valores[idx] !== undefined) {
      const input = document.getElementById(idInput);
      if (input) input.value = valores[idx];
    }
  });
}

// --- AUTOCOMPLETADO DEL FORMULARIO ---
function rellenarFormularioAprobacionDesdeStrings() {
  // TOTLAES
  parsearBloqueExcelStr(window._datosExcel.Totales, {
    "Ayto Ingresos": "input_ingresos_ayto",
    "Ayto Gastos": "input_gastos_ayto",
    "Consol Ingresos": "input_ingresos_cons",
    "Consol Gastos": "input_gastos_cons"
  });

  // ESTABILIDAD
  parsearBloqueExcelStr(window._datosExcel.Ayto_Estabilidad, {
    "Cap. 1 -7 Ingresos": "input_orns",
    "Cap. 1 -7 Gastos": "input_drns",
    "Capacidad / Necesidad de Financiación -num.-:": "input_capacidad_num",
    "Capacidad / Necesidad de Financiación -%-:": "input_capacidad_pct"
  });

  // REGLA DE GASTO
  parsearBloqueExcelStr(window._datosExcel.Ayto_ReglaGas, {
    "ORN, cap 1-7 Liq. 2024": "input_enf_n_1",
    "Tasa 2024-2025": "input_tasa_incremento",
    "Límite Gasto Pto. 2025": "input_limite_gasto",
    "ENF antes de Ajustes": "input_enf_n",
    "Inversiones AAPP": "input_inversiones_aapp",
    "Dif. Saldos 413": "input_variacion_413",
    "ENF Sin º Ejec.": "input_enf_ajustado",
    "Grado de ejecución:": "input_grado_ejecucion",
    "Empleos No Financieros 2025": "input_enf_tras_ajuste",
    "Resultado:": "input_resultado_regla"
  });

  console.log("✅ Todos los campos rellenados automáticamente desde el Excel subido (parche string plano robusto)");
  
  window.dispatchEvent(new CustomEvent("accionUsuario", {
    detail: {
      /* descripcion: "📝 ¿Quieres insertar el resultado como Informe en el Editor de Texto?", */
      confirmacion: "insertar_informe_aprobacion"
    }
  }));
}

// --- OBJETO ÚNICO CON LA LÓGICA DE INICIALIZACIÓN ---
window.FlujoAprobacionFormulario = {
  inicializar: function() {
    const inputHoja = document.getElementById("fileUploadHoja");
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
            /* alert("✅ Excel cargado correctamente en el módulo de tabla."); */
            rellenarFormularioAprobacionDesdeStrings(); // Autocompleta aquí
			validarResultadosPresupuestarios();
          } else {
            alert("❌ No se pudo cargar el Excel.");
          }
        })
        .catch(() => alert("❌ Error al cargar el archivo Excel."));
      });
    }
  }
};

// 1. Crea el visor editable y el botón solo si no existen (lo puedes llamar en la validación)
function crearVisorEditableSiNoExiste() {
  let panel = document.getElementById("panel_resultados_aprobacion");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "panel_resultados_aprobacion";
    panel.className = "alert alert-info mt-3";
    panel.contentEditable = "true";
    panel.style.minHeight = "80px";
    panel.style.outline = "2px dashed #ccc";
    document.getElementById("formulario-aprobacion").appendChild(panel);

    // Botón
    let btn = document.createElement("button");
    btn.id = "btnInsertarResultadosEnInforme";
    btn.className = "btn btn-primary btn-sm mt-2";
    btn.textContent = "Insertar en informe";
    btn.onclick = insertarResultadosEnInforme;
    document.getElementById("formulario-aprobacion").appendChild(btn);
  }
}

// 2. Función que muestra/actualiza el visor con los resultados automáticos
function validarResultadosPresupuestarios() {
  crearVisorEditableSiNoExiste();

  // Recolecta todos los datos relevantes
  const ingAyto = parseFloat(document.getElementById("input_ingresos_ayto").value.replace(/,/g, '.'));
  const gasAyto = parseFloat(document.getElementById("input_gastos_ayto").value.replace(/,/g, '.'));
  const ingCons = parseFloat(document.getElementById("input_ingresos_cons").value.replace(/,/g, '.'));
  const gasCons = parseFloat(document.getElementById("input_gastos_cons").value.replace(/,/g, '.'));
  const orn = parseFloat(document.getElementById("input_orns").value.replace(/,/g, '.'));
  const drn = parseFloat(document.getElementById("input_drns").value.replace(/,/g, '.'));
  const capFinNum = parseFloat(document.getElementById("input_capacidad_num").value.replace(/,/g, '.'));
  const capFinPct = parseFloat(document.getElementById("input_capacidad_pct").value.replace(/,/g, '.'));
  const regla_enf_n_1 = parseFloat(document.getElementById("input_enf_n_1").value.replace(/,/g, '.'));
  const regla_tasa = parseFloat(document.getElementById("input_tasa_incremento").value.replace(/,/g, '.'));
  const regla_limite = parseFloat(document.getElementById("input_limite_gasto").value.replace(/,/g, '.'));
  const regla_enf_n = parseFloat(document.getElementById("input_enf_n").value.replace(/,/g, '.'));
  const regla_inversiones = parseFloat(document.getElementById("input_inversiones_aapp").value.replace(/,/g, '.'));
  const regla_var_413 = parseFloat(document.getElementById("input_variacion_413").value.replace(/,/g, '.'));
  const regla_enf_ajustado = parseFloat(document.getElementById("input_enf_ajustado").value.replace(/,/g, '.'));
  const regla_grado = parseFloat(document.getElementById("input_grado_ejecucion").value.replace(/,/g, '.'));
  const regla_enf_tras_ajuste = parseFloat(document.getElementById("input_enf_tras_ajuste").value.replace(/,/g, '.'));
  const regla_resultado = parseFloat(document.getElementById("input_resultado_regla").value.replace(/,/g, '.'));

  // I. EQUILIBRIO PRESUPUESTARIO
  let textoEquilibrio = `<b>I. Equilibrio Presupuestario</b><br>`;
  textoEquilibrio += `&nbsp;&nbsp;- Ingresos del Ayuntamiento: <b>${ingAyto.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoEquilibrio += `&nbsp;&nbsp;- Gastos del Ayuntamiento: <b>${gasAyto.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoEquilibrio += `&nbsp;&nbsp;- Ingresos Consolidados: <b>${ingCons.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoEquilibrio += `&nbsp;&nbsp;- Gastos Consolidados: <b>${gasCons.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;

  let difAyto = ingAyto - gasAyto;
  let difCons = ingCons - gasCons;

  textoEquilibrio += `&nbsp;&nbsp;- Diferencia Ayuntamiento: <b>${difAyto.toLocaleString('es-ES',{minimumFractionDigits:2})} €</b> (${difAyto >= 0 ? "Superávit" : "Déficit"})<br>`;
  textoEquilibrio += `&nbsp;&nbsp;- Diferencia Consolidado: <b>${difCons.toLocaleString('es-ES',{minimumFractionDigits:2})} €</b> (${difCons >= 0 ? "Superávit" : "Déficit"})<br>`;
  textoEquilibrio += `<i>Conclusión:</i> ${Math.abs(difAyto) < 0.01 ? "La entidad principal presenta equilibrio presupuestario." : (difAyto > 0 ? "La entidad principal presenta superávit." : "La entidad principal presenta déficit.")} `;
  textoEquilibrio += `${Math.abs(difCons) < 0.01 ? "El presupuesto consolidado está equilibrado." : (difCons > 0 ? "El presupuesto consolidado presenta superávit." : "El presupuesto consolidado presenta déficit.")}<br><br>`;

  textoEquilibrio += `<span style='color:#2a5896;'>La aprobación del presupuesto constituye el acto central de la política financiera local y se configura como la autorización máxima de los gastos y la previsión de los ingresos del ejercicio, conforme a los arts. 162 y 164 TRLRHL. El presupuesto aprobado es un límite infranqueable para los gastos, nunca puede autorizarse déficit y es condición para cualquier gasto público.</span> <span style="color:#888;">[]</span><br><br>`;

  // II. ESTABILIDAD PRESUPUESTARIA
  let textoEstabilidad = `<b>II. Estabilidad Presupuestaria</b><br>`;
  textoEstabilidad += `&nbsp;&nbsp;- Obligaciones Reconocidas Netas (Cap. 1-7): <b>${orn.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoEstabilidad += `&nbsp;&nbsp;- Derechos Reconocidos Netos (Cap. 1-7): <b>${drn.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoEstabilidad += `&nbsp;&nbsp;- Capacidad/Necesidad de Financiación (numérico): <b>${capFinNum.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoEstabilidad += `&nbsp;&nbsp;- Capacidad/Necesidad de Financiación (%): <b>${capFinPct.toLocaleString('es-ES', {minimumFractionDigits:2})} %</b><br>`;

  if (!isNaN(capFinNum)) {
    textoEstabilidad += `<i>Conclusión:</i> `;
    if (capFinNum > 0.01) {
      textoEstabilidad += `El presupuesto cumple con el objetivo de estabilidad presupuestaria (capacidad de financiación positiva).<br><br>`;
    } else if (capFinNum < -0.01) {
      textoEstabilidad += `El presupuesto NO cumple con el objetivo de estabilidad presupuestaria (necesidad de financiación).<br><br>`;
    } else {
      textoEstabilidad += `El presupuesto se encuentra en equilibrio respecto a la estabilidad presupuestaria.<br><br>`;
    }
  }

  textoEstabilidad += `<span style='color:#2a5896;'>La estabilidad presupuestaria, conforme a la LOEPSF y el TRLRHL, debe respetarse en la elaboración, aprobación y ejecución del presupuesto. Requiere que los capítulos 1 a 7 de gastos estén cubiertos con ingresos no financieros, y su cumplimiento es exigido tanto en la aprobación como en las modificaciones y liquidación.</span> <span style="color:#888;"></span><br><br>`;

  // III. REGLA DE GASTO
  let textoRegla = `<b>III. Regla de Gasto</b><br>`;
  textoRegla += `&nbsp;&nbsp;- ENF n-1: <b>${regla_enf_n_1.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- Tasa de incremento: <b>${regla_tasa.toLocaleString('es-ES', {minimumFractionDigits:2})}</b><br>`;
  textoRegla += `&nbsp;&nbsp;- Límite de gasto n: <b>${regla_limite.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- ENF n: <b>${regla_enf_n.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- Inversiones AAPP: <b>${regla_inversiones.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- Variación 413: <b>${regla_var_413.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- ENF Ajustado: <b>${regla_enf_ajustado.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- Grado de ejecución: <b>${regla_grado.toLocaleString('es-ES', {minimumFractionDigits:2})}</b><br>`;
  textoRegla += `&nbsp;&nbsp;- ENF Tras Ajustes: <b>${regla_enf_tras_ajuste.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;
  textoRegla += `&nbsp;&nbsp;- Resultado Regla de Gasto: <b>${regla_resultado.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b><br>`;

  if (!isNaN(regla_enf_tras_ajuste) && !isNaN(regla_limite)) {
    textoRegla += `<i>Conclusión:</i> `;
    if (regla_enf_tras_ajuste <= regla_limite + 0.01) {
      textoRegla += `El presupuesto <b>cumple</b> la Regla de Gasto, ya que el gasto computable (${regla_enf_tras_ajuste.toLocaleString('es-ES', {minimumFractionDigits:2})} €) no supera el límite legal (${regla_limite.toLocaleString('es-ES', {minimumFractionDigits:2})} €).`;
    } else {
      let exceso = regla_enf_tras_ajuste - regla_limite;
      textoRegla += `El presupuesto <b>NO cumple</b> la Regla de Gasto, ya que el gasto computable (${regla_enf_tras_ajuste.toLocaleString('es-ES', {minimumFractionDigits:2})} €) supera el límite legal (${regla_limite.toLocaleString('es-ES', {minimumFractionDigits:2})} €), con un exceso de <b>${exceso.toLocaleString('es-ES', {minimumFractionDigits:2})} €</b>.`;
    }
  }

  textoRegla += `<span style='color:#2a5896;'>El principio de la regla de gasto impone que la variación del gasto computable de la corporación local no supere la tasa de referencia de crecimiento del PIB a medio plazo, fijada por el Estado, y su incumplimiento exige la aprobación de un plan económico-financiero (art. 12 LOEPSF).</span> <span style="color:#888;"></span><br><br>`;

  // --- DOCTRINA FINAL sobre el procedimiento de aprobación ---
  let textoDoctrina = `<b>IV. Procedimiento y valor jurídico de la aprobación presupuestaria</b><br>
  <span style='color:#2a5896;'>
    La aprobación presupuestaria en entidades locales es un acto reglado y clave, tramitado conforme a los arts. 168 y ss. TRLRHL y el RD 500/1990. Debe ser formada por el presidente, informada por el interventor, aprobada por el pleno y publicada. La validez y ejecutividad de cualquier gasto o compromiso dependen de esta aprobación, que, según la doctrina, “constituye el acto central y esencial del régimen financiero local, límite infranqueable para el gasto público y garantía del equilibrio y la legalidad financiera.
  </span><br><br>`;

  // Inserta todo en el visor editable
  let panel = document.getElementById("panel_resultados_aprobacion");
  panel.innerHTML = `${textoEquilibrio}<br>${textoEstabilidad}<br>${textoRegla}<br>${textoDoctrina}`;
}

// 3. Función para insertar el contenido editado en el informe
function insertarResultadosEnInforme() {
  let panel = document.getElementById("panel_resultados_aprobacion");
  if (!panel) return;
  let resumen = panel.innerText.trim(); // Tomamos solo el texto, editable y limpio

  // Si quieres comillas "block" tipo markdown:
  let prompt = `"${resumen}"\n\nRealiza un informe técnico de las tres cuestiones: Equilibrio, Estabilidad y Regla de Gasto.`;

  // Si prefieres un bloque tipo cita:
  // let prompt = `"""${resumen}"""\n\nRealiza un informe técnico...`;

  // O bien, si quieres poner el resumen como bloque de código markdown:
  // let prompt = `\`\`\`\n${resumen}\n\`\`\`\n\nRealiza un informe técnico...`;

  // Insertar el texto en el input del chat
  let inputChat = document.getElementById("userInput");
  if (inputChat) {
    inputChat.value = prompt;
    // Si quieres que se envíe automáticamente:
    // document.querySelector('.chat-input button.btn-primary').click();
    // O simplemente dejas el texto y el usuario lo revisa y pulsa Enviar.
  }
}

// Al final de rellenarFormularioAprobacionDesdeStrings
window.dispatchEvent(new CustomEvent("accionUsuario", {
  detail: {
    descripcion: "📋 ¿Deseas insertar automáticamente los resultados en el informe de aprobación?",
    confirmacion: "insertar_resultados_aprobacion"
  }
}));

window.ChatIA = window.ChatIA || {};
window.ChatIA.accionesInteligentes = window.ChatIA.accionesInteligentes || {};

window.ChatIA.accionesInteligentes["insertar_informe_aprobacion"] = () => {
  if (typeof insertarInformeTecnicoEnEditor === "function") {
    insertarInformeTecnicoEnEditor();
    ChatIA._mostrarRespuesta("✅ Informe insertado en el editor de texto.");
  } else {
    ChatIA._mostrarRespuesta("⚠️ No se encontró la función para insertar el informe.");
  }
};


function insertarInformeTecnicoEnEditor() {
  const panel = document.getElementById("panel_resultados_aprobacion");
  const textoGenerado = panel?.innerText.trim() || "(sin contenido)";

  const informe = `INFORME DE INTERVENCIÓN SOBRE LA APROBACIÓN DEL PRESUPUESTO GENERAL

${textoGenerado}`;

  const editor = document.getElementById("editorTextoCopiloto");
  if (editor) {
    editor.innerText = informe;
    console.log("✅ Informe insertado directamente en el Copiloto.");
  } else {
    console.warn("❌ No se encontró el editor del Copiloto.");
  }

  // Lanzar evento global para que el HTML principal cambie la pestaña
  const evento = new CustomEvent("cambiarAPestanyaCopiloto");
  window.dispatchEvent(evento);
}

window.insertarInformeTecnicoEnEditor = insertarInformeTecnicoEnEditor;
