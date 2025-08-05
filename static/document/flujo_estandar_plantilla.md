# 🧩 Plantilla Base para Nuevos Flujos de Informe Automatizado

Esta guía sirve como referencia estructural y técnica para desarrollar nuevos flujos dentro del sistema de análisis presupuestario.

---

## 1. Estructura del archivo de flujo (`flujo_XYZ.js`)

```js
window.FlujoXYZ = (function () {
  let iniciado = false;

  function iniciarFlujoSiAplica(textoDoc) {
    if (iniciado) return;
    const plantillaDetectada = normalizarTexto(textoDoc).includes("TÍTULO NORMALIZADO DEL INFORME");
    if (!plantillaDetectada) return;
    iniciado = true;
  }

  function manejarExcelSubido(datosExcel) {
    if (!iniciado) return;
    // Procesamiento de hojas y extracción de datos clave
    insertarResultadosEnEditor(datos);
    adjuntarAnexoExcel(datosExcel);
  }

  function insertarResultadosEnEditor(datos) {
    const editor = document.getElementById("editorTexto");
    if (!editor) return;
    // Reemplazo inteligente del segundo bloque de texto
  }

  function normalizarTexto(texto) {
    return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
  }

  function adjuntarAnexoExcel(datosExcel) {
    let anexo = "IX. Anexo de Datos del Excel\n\n";
    for (const [nombre, contenido] of Object.entries(datosExcel)) {
      anexo += `--- Hoja: ${nombre} ---\n${contenido}\n\n`;
    }
    const editor = document.getElementById("editorTexto");
    if (editor) editor.innerText += "\n\n" + anexo;
  }

  return {
    iniciarFlujoSiAplica,
    manejarExcelSubido
  };
})();
```

---

## 2. Registro en `gestor_flujos.js`

```js
window.GestorFlujos?.registrar("nombreInterno", window.FlujoXYZ);
```

---

## 3. Puntos de integración esperados

- `editorTexto`: contenedor del documento cargado.
- `datosExcel`: objeto con hojas, separado por tabuladores y saltos de línea.
- `chat`: solo si se desea emitir mensajes visibles (evitar en flujos silenciosos).

---

## 4. Buenas prácticas comunes

| Aspecto | Recomendación |
|--------|----------------|
| Activación | Siempre usar `normalize + toUpperCase` |
| Exclusividad | Usar `GestorFlujos.activarSolo("xyz")` si se necesita control único |
| Sustitución en texto | Reemplazar solo la segunda aparición de los apartados |
| Mínima intrusión | Evitar preguntas al usuario salvo que el flujo lo requiera |
| Modularidad | No mezclar lógica de flujo con lógica visual externa |
| Nombres de funciones | Claros y específicos por flujo |
| Fallback de errores | `try/catch` alrededor del manejo del Excel |

---

## 5. Ejemplo de activación por plantilla

```js
normalizarTexto(textoDoc).includes("INFORME SOBRE LA SOSTENIBILIDAD FINANCIERA DE LA ENTIDAD")
```

---

## 6. Posibles secciones reemplazables del informe

- IV. Cifras presupuestarias
- V. Conclusión técnica
- VI. Resumen por capítulos
- IX. Anexo de datos del Excel

Reemplazar solo la segunda aparición para no dañar el índice del informe.

---

## 7. Checklist de desarrollo

- [ ] ¿Se detecta bien la plantilla?
- [ ] ¿Se cargan todas las hojas necesarias del Excel?
- [ ] ¿Se insertan los resultados en los puntos correctos?
- [ ] ¿Se adjunta el anexo completo?
- [ ] ¿Evita el flujo emitir mensajes innecesarios al usuario?
- [ ] ¿Se desactiva correctamente si otro flujo se activa?

---

Este patrón puede copiarse y renombrarse para crear un nuevo flujo operativo en menos de 10 minutos.