# 📚 Ficha Técnica – Aplicación de Control Presupuestario

## 📁 Estructura General

- **Backend**: `app_drive.py` (Flask)
- **Frontend**: `formulario_drive.html`
- **Módulos JS**:
  - `chat.js`: comunicación con `/chat` y renderizado del diálogo
  - `comun.js`: carga de archivos, activación de flujos
  - `editor.js`: manipulación del editor de texto enriquecido
  - `excel.js`: visor interactivo de hojas con Handsontable
  - `init.js`: inicialización general de eventos
  - `procesador_escenarios.js`: extracción de datos desde hoja `EE`
  - `flujo_estabilidad_modificaciones.js`: proyección de escenarios e inserción en informe
  - `escaneo_visual.js`: animación y seguimiento del escaneo de archivos
  - `sonido_global.js`: efectos de sonido por interacción

---

## ✅ Flujo Implementado

### 🧩 Flujo: Estabilidad en Modificaciones
- Reconoce la plantilla del informe de estabilidad
- Espera un Excel con hoja “EE” y subhoja “Estabilidad”
- Calcula tres escenarios:
  - A: Real a fecha
  - B: Ingresos al 95%
  - C: Proyección lineal a 31/12
- Inserta los resultados en los apartados IV y V del informe

📌 **Norma general para flujos**:
> Solo deben modificar la segunda aparición de los apartados (la primera es el índice en el punto 0)

---

## 🧠 Comportamientos adicionales

- ✅ Sonido al hacer clic en cualquier botón
- ✅ Sonido al recibir respuesta del chat
- ✅ Escaneo visual al subir cualquier archivo
- ✅ Scroll automático, filtros y simulación de lectura del informe

---

## 📂 Ubicación de las fichas de documentación
`static/document/`

---

## 🧱 Componentes por pestaña (panel izquierdo)

| Módulo         | Finalidad                                | Estado     |
|----------------|-------------------------------------------|------------|
| Aprobación     | Aún sin flujo conectado                  | 🟡 En progreso |
| Ejecución      | Contiene formulario y cálculos auxiliares | ✅ Activo    |
| Modificaciones | Módulo con flujo de estabilidad activo    | ✅ Activo    |
| Liquidación    | Vacío por ahora                          | ⏳ Pendiente |

---

## 🧩 Plantillas esperadas
- Word con títulos de secciones: I, II, III, IV, V...
- Apartado 0 contiene el índice. Las modificaciones van **siempre** a la segunda aparición.

---

🗓️ Última actualización: Mayo 2025