// --- PARSEO ROBUSTO DE STRINGS DE EXCEL PARA LIQUIDACIÓN ---
function parsearBloqueExcelStrLiquidacion(bloqueStr, mapping) {
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

function rellenarFormularioLiquidacionDesdeStrings() {
  parsearBloqueExcelStrLiquidacion(window._datosExcel.Informe, {
    "Derechos Reconocidos Netos": "Derechos_Reconocidos_Netos",
    "Obligaciones Reconocidas Netas": "Obligaciones_Reconocidas_Netas",
    "Gastos financiados con remanente de tesorería": "Gastos_financiados_con_remanente_de_tesoreria",
    "Desviaciones positivas de financiación ": "Desviaciones_positivas_de_financiacion",
    "Desviaciones negativas de financiación ": "Desviaciones_negativas_de_financiacion",
    "RESULTADO PRESUPUESTARIO DEL EJERCICIO ": "RESULTADO_PRESUPUESTARIO_DEL_EJERCICIO",
    "Fondos Líquidos ": "Fondos_Liquidos",
    "Derechos Pendientes de Cobro": "Derechos_Pendientes_de_Cobro",
    "Obligaciones Pendientes de Pago": "Obligaciones_Pendientes_de_Pago",
    "REMANENTE DE TESORERÍA TOTAL ": "REMANENTE_DE_TESORERIA_TOTAL",
    "REMANENTE DE TESORERÍA PARA GASTOS GENERALES ": "REMANENTE_DE_TESORERIA_PARA_GASTOS_GENERALES",
    "Remanente de Tesorería para Gastos con financiación afectada": "Remanente_de_Tesoreria_para_Gastos_con_financiacion_afectada",
    "Remanente de Tesorería ajustado": "Remanente_de_Tesoreria_ajustado",
    "Capacidad/Necesidad de financiación antes de ajustes SEC10": "Capacidad_Necesidad_de_financiacion_antes_de_ajustes_SEC10",
    "Capacidad de Financiación Bruta": "Capacidad_de_Financiacion_Bruta",
    "Ajustes SEC10 Estabilidad": "Ajustes_SEC10_Estabilidad",
    "Estabilidad Presupuestaria en la Liquidación": "Estabilidad_Presupuestaria_en_la_Liquidacion",
    "Límite de Gasto No Financiero": "Limite_de_Gasto_No_Financiero",
    "Empleos No Financieros": "Empleos_No_Financieros",
    "Regla de Gasto": "Regla_de_Gasto",
    "Deuda Viva": "Deuda_Viva",
    "% Deuda Viva": "Porcentaje_Deuda_Viva",
    "PMP": "PMP"
  });

  console.log("✅ Todos los campos de liquidación rellenados automáticamente desde el Excel subido (mapping literal, robusto y tolerante a espacios y mayúsculas/minúsculas).");
  validarResultadosLiquidacion();
}

// --- OBJETO ÚNICO CON LA LÓGICA DE INICIALIZACIÓN ---
window.FlujoLiquidacionFormulario = {
  inicializar: function() {
    const inputHoja = document.getElementById("fileUploadHojaLiquidacion");
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
            rellenarFormularioLiquidacionDesdeStrings(); // Autocompleta aquí
          } else {
            console.warn("❌ No se pudo cargar el Excel.");
          }
        })
        .catch(() => alert("❌ Error al cargar el archivo Excel."));
      });
    }
  }
};

// --- CREA EL VISOR EDITABLE SI NO EXISTE ---
function crearVisorEditableSiNoExisteLiquidacion() {
  let panel = document.getElementById("panel_resultados_liquidacion");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "panel_resultados_liquidacion";
    panel.className = "alert alert-info mt-3";
    panel.contentEditable = "true";
    panel.style.minHeight = "100px";
    panel.style.outline = "2px dashed #ccc";
    document.getElementById("formulario-liquidacion").appendChild(panel);

    // Botón
    let btn = document.createElement("button");
    btn.id = "btnInsertarResultadosEnInforme";
    btn.className = "btn btn-outline-primary w-100 mt-2";
    btn.textContent = "Insertar en informe";
    btn.onclick = insertarResultadosEnInformeLiquidacion;
    document.getElementById("formulario-liquidacion").appendChild(btn);
  }
}

// --- FUNCIÓN PRINCIPAL: VISOR INFORME ACADÉMICO Y DOCTRINAL ---
function validarResultadosLiquidacion() {
  crearVisorEditableSiNoExisteLiquidacion();

  function v(id) {
    const el = document.getElementById(id);
    return el && el.value ? el.value : "";
  }
  function vf(id) {
    const val = v(id).replace(/,/g, '.');
    return isNaN(parseFloat(val)) ? 0 : parseFloat(val);
  }

  let texto1 = `<b>1. Resultado Presupuestario</b><br>`;
  texto1 += `Derechos Reconocidos Netos: <b>${v('Derechos_Reconocidos_Netos')}</b> €<br>`;
  texto1 += `Obligaciones Reconocidas Netas: <b>${v('Obligaciones_Reconocidas_Netas')}</b> €<br>`;
  texto1 += `Desviaciones positivas de financiación: <b>${v('Desviaciones_positivas_de_financiacion')}</b> €<br>`;
  texto1 += `Desviaciones negativas de financiación: <b>${v('Desviaciones_negativas_de_financiacion')}</b> €<br>`;
  texto1 += `Resultado Presupuestario del Ejercicio: <b>${v('RESULTADO_PRESUPUESTARIO_DEL_EJERCICIO')}</b> €<br>`;

  let texto2 = `<b>2. Remanente de Tesorería</b><br>`;
  texto2 += `Fondos Líquidos: <b>${v('Fondos_Liquidos')}</b> €<br>`;
  texto2 += `Derechos Pendientes de Cobro: <b>${v('Derechos_Pendientes_de_Cobro')}</b> €<br>`;
  texto2 += `Obligaciones Pendientes de Pago: <b>${v('Obligaciones_Pendientes_de_Pago')}</b> €<br>`;
  texto2 += `Ajustes financiación afectada: <b>${v('REMANENTE_DE_TESORERIA_TOTAL')}</b> €<br>`;
  texto2 += `Remanente de Tesorería para Gastos Generales: <b>${v('REMANENTE_DE_TESORERIA_PARA_GASTOS_GENERALES')}</b> €<br>`;
  texto2 += `Remanente de Tesorería para Gastos con Financiación Afectada: <b>${v('Remanente_de_Tesoreria_para_Gastos_con_financiacion_afectada')}</b> €<br>`;
  texto2 += `Saldo cuentas de financiación afectada: <b>${v('Remanente_de_Tesoreria_ajustado')}</b> €<br>`;
  texto2 += `Remanente de Tesorería Ajustado: <b>${v('Capacidad_Necesidad_de_financiacion_antes_de_ajustes_SEC10')}</b> €<br>`;

  let texto3 = `<b>3. Estabilidad Presupuestaria</b><br>`;
  texto3 += `Capacidad/Necesidad Financiación antes de ajustes SEC10: <b>${v('Capacidad_de_Financiacion_Bruta')}</b> €<br>`;
  texto3 += `Capacidad de Financiación Bruta: <b>${v('Ajustes_SEC10_Estabilidad')}</b> €<br>`;
  texto3 += `Ajustes SEC10 Estabilidad: <b>${v('Estabilidad_Presupuestaria_en_la_Liquidacion')}</b> €<br>`;
  texto3 += `Estabilidad Presupuestaria en la Liquidación: <b>${v('Limite_de_Gasto_No_Financiero')}</b> €<br>`;

  let texto4 = `<b>4. Regla de Gasto</b><br>`;
  texto4 += `Límite de Gasto No Financiero: <b>${v('Empleos_No_Financieros')}</b> €<br>`;
  texto4 += `Empleos No Financieros: <b>${v('Regla_de_Gasto')}</b> €<br>`;
  texto4 += `Regla de Gasto: <b>${v('Deuda_Viva')}</b> €<br>`;

  let texto5 = `<b>5. Deuda Financiera</b><br>`;
  texto5 += `Deuda Viva: <b>${v('Porcentaje_Deuda_Viva')}</b> €<br>`;
  texto5 += `% Deuda Viva: <b>${v('PMP')}</b> %<br>`;

  let texto6 = `<b>6. Deuda Comercial</b><br>`;
  texto6 += `Periodo Medio de Pago (PMP): <b>${v('PMP')}</b> días<br>`;

  let cumpleEstabilidad = vf('Limite_de_Gasto_No_Financiero') >= 0;
  let cumpleRegla = vf('Regla_de_Gasto') <= vf('Empleos_No_Financieros');
  let cumplePMP = vf('PMP') <= 30;

  let dictamen = `<b>7. Dictamen Global</b><br>`;
  dictamen += `<b>Estabilidad:</b> ${cumpleEstabilidad ? "<span style='color:green'>Cumple</span>" : "<span style='color:red'>No cumple</span>"}<br>`;
  dictamen += `<b>Regla de Gasto:</b> ${cumpleRegla ? "<span style='color:green'>Cumple</span>" : "<span style='color:red'>No cumple</span>"}<br>`;
  dictamen += `<b>Deuda Comercial (PMP ≤ 30 días):</b> ${cumplePMP ? "<span style='color:green'>Cumple</span>" : "<span style='color:red'>No cumple</span>"}<br>`;
  dictamen += `<br><i>En atención a los datos precedentes, y conforme a la doctrina y normativa desarrollada, esta Intervención emite dictamen ${cumpleEstabilidad && cumpleRegla && cumplePMP ? '<b style="color:green">favorable</b>' : '<b style="color:red">desfavorable</b>'} respecto al cumplimiento de los objetivos fundamentales del régimen presupuestario local.</i>`;

  document.getElementById("panel_resultados_liquidacion").innerHTML =
    `${texto1}<br>${texto2}<br>${texto3}<br>${texto4}<br>${texto5}<br>${texto6}<br>${dictamen}`;
}

// --- INSERTAR EL CONTENIDO EDITADO EN EL INPUT DEL CHAT ---
function insertarResultadosEnInformeLiquidacion() {
  let panel = document.getElementById("panel_resultados_liquidacion");
  if (!panel) return;
  let resumen = panel.innerText.trim();

  // Prompt para IA
  let prompt = `"${resumen}"\n\nRealiza un informe académico y doctrinal sobre la liquidación presupuestaria, analizando resultado presupuestario, remanente de tesorería, estabilidad, regla de gasto, deuda financiera y comercial, conforme a la normativa y doctrina expuesta.`;

  let inputChat = document.getElementById("userInput");
  if (inputChat) {
    inputChat.value = prompt;
  }
}
