// flujo_reglas_fiscales_liquidacion.js

window.FlujoReglasFiscalesLiquidacion = (function () {
  let iniciado = false;

  function normalizarTexto(texto) {
    return texto
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toUpperCase();
  }

  function buscarHoja(nombreParcial, hojas) {
    return Object.entries(hojas).find(([nombre]) =>
      normalizarTexto(nombre).includes(normalizarTexto(nombreParcial))
    )?.[1] || null;
  }

  function iniciarFlujoSiAplica(textoDoc) {
    const plantillaOK = normalizarTexto(textoDoc).includes("INFORME DE INTERVENCION SOBRE EL CUMPLIMIENTO DE REGLAS FISCALES EN LA LIQUIDACION");
    if (!plantillaOK) return;
    console.log("✅ Flujo de Reglas Fiscales (Liquidación) activado correctamente");
    iniciado = true;
  }

  function manejarExcelSubido(datosExcel) {
    if (!iniciado) return;
    try {
      console.log("📥 manejando Excel en flujo de reglas fiscales...");
      console.log("🔍 Hojas disponibles:", Object.keys(datosExcel));

      const hoja = buscarHoja("Informe", datosExcel);
      if (!hoja) throw new Error("❌ Hoja 'Informe' no encontrada");

      const tabla = hoja.split("\n").map(l => l.split("\t"));
      const datos = tabla[1];

      const valores = {
        "«Informe T2»": datos[19],
        "«Informe U2»": datos[20],
        "«Informe V2»": datos[21],
        "«Informe W2»": datos[22],
        "«Informe X2»": datos[23],
        "«Informe Y2»": datos[24],
        "«Informe Z2»": datos[25],
        "«Informe AA2»": datos[26],
        "«Informe AB2»": datos[27],
        "«Informe AC2»": datos[28],
        "«Informe AD2»": datos[29]
      };

      const editor = document.getElementById("editorTexto");
      if (!editor) return;

      let texto = editor.innerHTML.replace(/<br>/g, "\n");
      for (const [clave, valor] of Object.entries(valores)) {
        texto = texto.replaceAll(clave, formatear(valor));
      }

      // Anexo automático con encabezado por hoja
      const anexos = Object.entries(datosExcel).map(([nombre, contenido]) => {
        const lineas = contenido.split("\n");
        const encabezado = `\n\n📄 Hoja: ${nombre}`;
        const cuerpo = lineas.map(l => l).join("\n");
        return `${encabezado}\n${cuerpo}`;
      });

      texto += "\nXIII. Anexo de Datos del Excel" + anexos.join("");
      editor.innerHTML = texto.replace(/\n/g, "<br>");

      console.log("✅ Sustitución en informe completada con anexo de todas las hojas");
    } catch (e) {
      console.error("⛔ Error al procesar Excel de Reglas Fiscales:", e);
    }
  }

  function formatear(n) {
    if (n == null || isNaN(parseFloat(n))) return "-";
    return parseFloat(n).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + " €";
  }

  return {
    iniciarFlujoSiAplica,
    manejarExcelSubido
  };
})();

window.GestorFlujos?.registrar("reglas", window.FlujoReglasFiscalesLiquidacion);