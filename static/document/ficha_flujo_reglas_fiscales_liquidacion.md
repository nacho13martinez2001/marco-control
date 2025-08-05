# Ficha Técnica - Flujo: Cumplimiento de Reglas Fiscales en la Liquidación

## 🧾 Plantilla detectada
**Título identificador:**  
`INFORME DE INTERVENCION SOBRE EL CUMPLIMIENTO DE REGLAS FISCALES EN LA LIQUIDACION`

## 📊 Excel requerido
- Hoja: `"Informe"`
- Fila de datos: Segunda fila (índice 1)
- Campos extraídos: índices del 19 al 29

## 🔁 Claves sustituidas en el documento
- «Informe T2»
- «Informe U2»
- «Informe V2»
- «Informe W2»
- «Informe X2»
- «Informe Y2»
- «Informe Z2»
- «Informe AA2»
- «Informe AB2»
- «Informe AC2»
- «Informe AD2»

## 📎 Anexo automático generado
Se incluye un anexo con todas las hojas del Excel en formato:
```
📄 Hoja: [nombre]
[cuerpo de cada hoja separado por líneas]
```

## 🛠 Incidencias encontradas y soluciones

### 1. ❌ Las hojas del Excel aparecían como `undefined`
**Motivo:** Se intentó construir `window._datosExcel` a partir de `data.hojas`, que es solo un array de strings.
**Solución:** Usar directamente `data.contenido`, como en el resto de flujos.

---

### 2. ❌ No se sustituían los campos tipo «Informe U2»
**Motivo:** El flujo se ejecutaba antes de que el texto estuviera cargado en el editor.
**Solución:** Se añadió `setTimeout(..., 100ms)` tras insertar el texto en el DOM, para asegurar que `innerHTML` ya estuviera disponible.

---

### 3. ❌ Campo mal escrito en plantilla: `"«nforme W2»"`
**Motivo:** Faltaba la letra `I`.
**Solución:** Corrección manual en la plantilla cargada en el editor.

---

### 4. ❌ Error de consola al subir solo el documento Word
**Motivo:** Se intentaba ejecutar `manejarExcelSubido(undefined)`.
**Solución:** Se añadió condición previa: `if (window._datosExcel)` antes de llamar al flujo.

---

## ✅ Estado final
- Flujo operativo y alineado con el comportamiento del flujo de Liquidación General.
- Plantilla cargada, texto sustituido, anexo añadido automáticamente.
