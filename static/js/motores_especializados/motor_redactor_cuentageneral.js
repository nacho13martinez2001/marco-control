
// Motor redactor para el flujo de Aprobación de la Cuenta General
// Versión global sin export

function redactarInformeCuentaGeneral(textoActual, datos = {}) {
  let informe = [];

  // I. Introducción
  informe.push("🔹 Introducción: Informe generado automáticamente con base en la normativa aplicable y los datos disponibles.");

  // II. Marco normativo (estático por flujo)
  informe.push("📘 Normativa aplicable: TRLHL art. 212, Orden HAP/1781/2013");

  // III. Datos clave (si los hay)
  if (Object.keys(datos).length > 0) {
    informe.push("📊 Datos recibidos: " + JSON.stringify(datos));
  }

  // IV. Desarrollo técnico (por secciones específicas)
  informe.push("🧾 Contenido técnico redactado según flujo 'CuentaGeneral'...");

  // V. Conclusión
  informe.push("✅ Conclusión técnica: informe emitido conforme a los criterios de la Intervención.");

  return informe.join("\n\n");
}
