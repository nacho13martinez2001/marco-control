# 🧾 Plantilla HTML – formulario_drive.html

## 🎯 Función
Plantilla principal de la interfaz de usuario. Carga el editor de texto, el visor de Excel, el panel de chat y botones funcionales.

---

## 🧱 Estructura visual

### 🧭 Panel izquierdo
- Botones de navegación por módulos:
  - Aprobación
  - Ejecución
  - Modificaciones
  - Liquidación
- Indicador de carga y escaneo de archivos

### 🖊️ Panel derecho
- Editor de texto para la plantilla Word
- Chat interactivo del sistema
- Selector de apartados del informe
- Controles de descarga

### 📊 Visor central
- Visor de Excel basado en Handsontable
- Desplegable por hoja

---

## 📎 Scripts cargados

Ordenados y modularizados:
- `escaneo_visual.js`
- `comun.js`
- `editor.js`
- `excel.js`
- `chat.js`
- `init.js`
- `sonido_global.js`
- + Flujos individuales como `flujo_estabilidad_modificaciones.js`

---

## 💡 Comportamientos destacados

- El visor de texto se adapta automáticamente al alto de la pantalla
- El contenido del documento se representa como texto enriquecido
- Los botones se reactivan al cargar un nuevo archivo
- El índice de apartados es sensible al documento cargado

---

## 📁 Ubicación
`templates/formulario_drive.html` (en entorno Flask)

🗓️ Última revisión: Mayo 2025