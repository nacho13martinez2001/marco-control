# Propuesta de Rediseño de la Aplicación - Simplificación por IA

## ✅ Objetivo
Transformar la interfaz y lógica de la aplicación para que solo tenga **dos pestañas funcionales**, dejando que los flujos se activen **automáticamente según el contenido del documento** y los datos del Excel.

---

## 🎯 Nueva Estructura del Panel Izquierdo

### 1. **Hoja de Cálculo**
- Visualiza el Excel cargado.
- Se habilitan los scrolls inferiores cuando se detecta un informe activo.
- Permite comprobar los campos necesarios vinculados a la plantilla cargada.

### 2. **Análisis por IA**
- Módulo de análisis contextual tras la finalización del informe.
- Permite revisión técnica, sugerencias, cumplimiento normativo, etc.

---

## 🧠 Activación de Flujos Inteligente

### Detectar la plantilla cargada (Word)
- Se hace en `chat_upload.js` al leer el texto del documento.
- El sistema identifica automáticamente si se trata de:
  - Aprobación del presupuesto
  - Modificaciones de crédito
  - Liquidación
  - Cumplimiento de reglas fiscales, etc.

### Detectar Excel relevante
- Se busca por nombre de hoja y estructura reconocida.
- Se activa el flujo correspondiente automáticamente, sin intervención manual.

---

## 🛠 Eliminación de Pestañas Anteriores

Se eliminarán del selector del panel izquierdo:
- Aprobación
- Modificaciones
- Liquidación
- Biblioteca (opcional)

Esto reduce la complejidad visual y mejora la experiencia centrada en el contenido.

---

## 📌 Ventajas del Rediseño

- 🧠 Mayor protagonismo de la IA como copiloto.
- 🧼 Interfaz simplificada y limpia.
- ⚙️ Escalabilidad futura (más tipos de informe, sin cambiar la interfaz).
- 🤖 Automatización sin clics: todo fluye desde el contenido.

---

## 🗓 Pendiente de abordar

Aplicar esta reestructuración **después de finalizar el flujo de Modificaciones de Crédito**.

