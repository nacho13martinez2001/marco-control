# 🧩 Backend – app_drive.py

## 🎯 Función
Archivo principal del backend Flask que gestiona la lógica del servidor, rutas de subida, renderizado de plantilla principal y lectura de archivos.

---

## 🔁 Rutas principales

### `/`
- Método: `GET`
- Devuelve el archivo principal `formulario_drive.html`

### `/chat_upload`
- Método: `POST`
- Permite subir un archivo (docx, pdf, xlsx, csv)
- Devuelve el contenido del archivo leído
- Soporta:
  - `.docx`: usando `python-docx`
  - `.pdf`: usando `fitz` (PyMuPDF)
  - `.xlsx`: usando `pandas`
  - `.csv`: usando `pandas.read_csv()`

---

## ❌ Ruta desactivada

### `/chat`
- Método: `POST`
- Antiguamente realizaba cálculos de estabilidad desde el backend
- Está **comentada** para evitar conflicto con flujos JS actuales

---

## 🗂️ Otros componentes cargados

- `UPLOAD_FOLDER`: carpeta donde se guardan temporalmente los archivos
- `secure_filename`: para guardar archivos con nombre seguro
- `Document`, `fitz`, `pandas`: librerías de análisis de contenido

---

## 🧠 Observaciones

- No realiza lógica de flujos: eso está delegado a los scripts JS modulares
- El backend solo responde con contenido bruto del archivo para ser procesado en frontend
- Modular y compatible con múltiples formatos

🗓️ Última revisión: Mayo 2025