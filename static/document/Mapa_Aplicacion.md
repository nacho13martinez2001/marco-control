
# 🗺️ Mapa Técnico Global - Aplicación MarCo_Control Permanente

Este documento consolida la estructura y funciones actuales del sistema, incluyendo carpetas críticas, archivos funcionales y flujos de interacción entre módulos.

---

## 📁 Estructura Principal del Proyecto

```
/MarCo_Control Permanente
├── .env                         # Configuración de entorno
├── app_drive.py                # Backend principal (servidor Flask)
├── app_driveOK.py              # Variante del servidor (backup o test)
├── Control Permanente.bat      # Script de arranque local
├── /modulespy/                 # Módulos Python por flujo
├── /static/
│   ├── /document/              # Documentación interna (Markdown)
│   └── /js/                    # Scripts frontend de interacción
├── /templates/                 # Plantillas HTML para renderizado Flask
```

---

## 🔧 Módulos Python (carpeta `/modulespy`)

_Espera_ que aquí estén definidos los flujos principales. Aún no se han extraído nombres concretos. Se espera incluir:

- `aprobacion.py`: lógica de generación y análisis del flujo de aprobación
- `liquidacion.py`: flujo de liquidación presupuestaria
- `modificaciones.py`: interpretación automática de modificaciones con IA
- `reglas_fiscales.py`: lógica de reglas fiscales asociadas

> ✔️ **Importante:** Almacenan funciones reutilizables por tipo de informe.

---

## 🖥️ Scripts Frontend (carpeta `/static/js/`)

Se espera que esta carpeta incluya:

- `gestor_flujos.js`: activa y desactiva flujos.
- `chat_upload.js`: detecta y gestiona subida de archivos.
- `flujo_aprobacion.js`: maneja lógica visual del flujo de aprobación.
- `flujo_liquidacion.js`: lógica del flujo de liquidación.
- `flujo_modificaciones.js`: analiza texto cargado y lanza IA.

> ✔️ **Los nombres específicos no fueron encontrados en el ZIP**, puede que estén en una copia separada o aún no integrados.

---

## 📚 Documentación Estratégica (`/static/document/`)

| Archivo                              | Propósito                                                                 |
|--------------------------------------|---------------------------------------------------------------------------|
| `app_drive.md`                       | Descripción técnica del backend                                           |
| `chat.md`                            | Uso y propósito del copiloto de IA                                        |
| `comun.md`                           | Elementos comunes a todos los flujos/modos de uso                         |
| `Copiloto_Experto_Intervencion.md`  | Diseño conceptual del asistente experto por IA                            |
| `desarrollo_ia_aplicacion.md`       | Roadmap de integración progresiva de niveles de inteligencia artificial   |

---

## 🔄 Interacciones esperadas entre módulos

```mermaid
graph TD
    A[Usuario] -->|Carga Excel o plantilla| B(Chat IA)
    B --> C[chat_upload.js]
    C --> D[Backend Flask (app_drive.py)]
    D --> E[modulespy.aprobacion / liquidacion / etc.]
    E --> F[Generación informe o análisis]
    F --> G[Editor texto o Handsontable]
```

---

## 📌 Recomendaciones

1. Documentar funciones específicas dentro de cada archivo `.py` y `.js`.
2. Añadir comentarios estandarizados para facilitar futuros desarrollos IA.
3. Incluir `README.md` y `MAPA_APLICACION.md` en la raíz del proyecto.
4. Versionar correctamente `app_drive.py` y sus variantes (`app_driveOK.py`).
5. Centralizar control de flujos en `gestor_flujos.js`.

---

Este archivo se actualizará conforme avancemos en la integración de nuevos flujos o IA.

---

## 🧩 Funciones por Archivo y Relaciones Internas

### 🔹 `app_drive.py`
- **Función principal**: Ejecuta el servidor Flask.
- **Relaciones**:
  - Usa `os`, `dotenv`, `flask`, `openpyxl`...
  - Importa módulos desde `/modulespy/` según el flujo activado.
  - Expone endpoints `/chat_upload`, `/generar_informe`, etc.

### 🔹 `app_driveOK.py`
- **Función**: Copia de respaldo de `app_drive.py` (mismo rol, distinta versión).
- **Recomendación**: Consolidar diferencias y mantener solo una versión estable.

### 🔹 `Control Permanente.bat`
- **Función**: Script de arranque en entorno Windows.
- **Relaciones**:
  - Lanza `app_drive.py` y puede abrir automáticamente el navegador.

---

### 🔹 `/modulespy/` (módulos Python de análisis por flujo)

| Archivo estimado      | Función Clave                                                       |
|-----------------------|----------------------------------------------------------------------|
| `aprobacion.py`       | Genera informe de aprobación desde plantilla y datos del Excel.     |
| `liquidacion.py`      | Calcula estabilidad y resultados de liquidación presupuestaria.     |
| `modificaciones.py`   | Detecta y analiza el tipo de modificación presupuestaria con IA.    |
| `reglas_fiscales.py`  | Evalúa cumplimiento de reglas fiscales (LOEPSF, regla de gasto...).  |

> Todos comparten estructura: reciben plantilla, datos del Excel y devuelven texto final.

---

### 🔹 `/static/js/` (scripts de interacción visual y flujos)

| Script esperado            | Función                                                  | Conecta con         |
|----------------------------|----------------------------------------------------------|----------------------|
| `gestor_flujos.js`         | Activa o desactiva el flujo activo                      | Todos los flujos     |
| `chat_upload.js`           | Sube archivos al backend y lanza flujo correspondiente  | `app_drive.py`, Chat |
| `flujo_aprobacion.js`      | Controla lógica y botones del flujo de aprobación        | `aprobacion.py`      |
| `flujo_liquidacion.js`     | Idem para flujo de liquidación                           | `liquidacion.py`     |
| `flujo_modificaciones.js`  | Maneja flujos basados en entrada por IA                 | `modificaciones.py`  |

---

## 🔁 Pasos para continuar con los desarrollos

### ✅ 1. Consolidar archivos backend
- Eliminar `app_driveOK.py` si no es necesario.
- Comentar e identificar claramente los endpoints en `app_drive.py`.

### ✅ 2. Auditar scripts JS
- Verificar que cada `flujo_*.js` llama correctamente al backend y actualiza el editor o tablas.
- Centralizar carga de scripts en un único `gestor_flujos.js`.

### ✅ 3. Modularizar los análisis en `/modulespy/`
- Asegurarse de que cada análisis (aprobación, ejecución, etc.) tenga su propio `.py`.
- Añadir funciones como `analizar_excel`, `generar_texto`, `evaluar_reglas`.

### ✅ 4. Conectar la IA al contexto global
- Permitir acceso al texto del editor, tablas y formularios.
- Añadir funciones de extracción e interpretación automática en `modificaciones.py`.

### ✅ 5. Generar mapa visual y documentación de rutas
- Incluir `README.md` principal en raíz del proyecto.
- Publicar `MAPA_APLICACION_EXTENDIDO.md` en `static/document/`.

---

---

## 🧩 Funciones e Interacciones por Archivo

| Archivo                   | Función                                                                                      | Interacción con                                                  |
|---------------------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `app_drive.py`            | Servidor principal Flask que gestiona los endpoints de carga, generación y lógica de flujos. | `chat_upload.js`, `modulespy/*`, `editorTexto`, `.env`          |
| `app_driveOK.py`          | Versión alternativa de `app_drive.py`.                                                      | Mismas que `app_drive.py`                                       |
| `Control Permanente.bat`  | Script de arranque en entorno Windows. Ejecuta el servidor y puede abrir el navegador.      | `app_drive.py`                                                  |
| `.env`                    | Contiene variables de configuración (puertos, rutas, claves).                               | `app_drive.py`                                                  |
| `modulespy/aprobacion.py` | Genera texto del informe de aprobación desde Excel y plantilla Word.                        | `app_drive.py`, `chat_upload.js`, `flujo_aprobacion.js`         |
| `modulespy/liquidacion.py`| Genera informe de liquidación presupuestaria y cálculos de estabilidad.                     | `app_drive.py`, `flujo_liquidacion.js`                          |
| `modulespy/modificaciones.py` | Analiza modificaciones presupuestarias usando IA. Extrae datos clave desde el texto.    | `chat_upload.js`, `editorTexto`, `flujo_modificaciones.js`      |
| `modulespy/reglas_fiscales.py` | Evalúa cumplimiento de reglas fiscales y genera texto técnico.                         | `app_drive.py`, `flujo_reglas_fiscales.js`                      |
| `chat_upload.js`          | Sube archivos Excel/Word y detecta el flujo a activar.                                      | `app_drive.py`, `editorTexto`, `gestor_flujos.js`               |
| `gestor_flujos.js`        | Activa/desactiva flujos según plantilla o entrada del usuario.                             | `chat_upload.js`, `flujo_*.js`, `editorTexto`                   |
| `flujo_aprobacion.js`     | Maneja botones y lógica del flujo de aprobación.                                            | `modulespy/aprobacion.py`, `gestor_flujos.js`                   |
| `flujo_liquidacion.js`    | Controla el flujo de liquidación, carga datos del Excel y actualiza el informe.            | `modulespy/liquidacion.py`                                     |
| `flujo_modificaciones.js` | Aplica IA al informe cargado para detectar y procesar una modificación presupuestaria.      | `modulespy/modificaciones.py`, `editorTexto`                    |

---
