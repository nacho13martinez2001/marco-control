function insertarInformeTecnicoEnEditor() {
  const panel = document.getElementById("panel_resultados_aprobacion");
  const equilibrio = panel?.innerText.trim() || "(sin contenido)";

  const informe = `INFORME DE INTERVENCIÓN SOBRE LA APROBACIÓN DEL PRESUPUESTO GENERAL

Primero. Equilibrio presupuestario
${equilibrio}

Segundo. Estabilidad presupuestaria
[... Estabilidad generada automáticamente ...]

Tercero. Regla de gasto
[... Regla generada automáticamente ...]

Cuarto. Consideraciones finales
[... texto doctrinal ...]

El Interventor Tesorero
Fdo.: __________________________`;

  const input = document.getElementById("editorTexto") || window.parent?.document.getElementById("editorTexto");
  if (input) input.innerText = informe;
}

window.insertarInformeTecnicoEnEditor = insertarInformeTecnicoEnEditor;
