
# Desarrollo de Inteligencia Artificial en la Aplicación — Niveles 1 a 5

Este documento describe la evolución escalonada de las capacidades de inteligencia artificial integradas en la aplicación, desde una IA reactiva básica hasta una IA generativa experta.

---

## Nivel 1 — IA Reactiva

**Objetivo:** El sistema responde a comandos simples predefinidos.

**Características:**
- Detección de tipo de informe por palabras clave.
- Validación de formularios (modificaciones equilibradas).
- Respuestas personalizadas por tipo de informe (aprobación, liquidación, modificación).
- Detección de texto y contenido en el editor y tablas.

**Ejemplo:**  
“¿Qué tipo de modificación es esta?” → "Es una generación."

**Estado actual:** Completado.

---

## Nivel 2 — IA Interactiva

**Objetivo:** Diálogo contextual y confirmaciones.

**Características:**
- Flujo de interacción con preguntas y confirmaciones (“¿Deseas un resumen?”).
- Capacidad para mantener un turno de conversación.
- Lógica basada en `_esperandoConfirmacion` para textos o tablas.

**Ejemplo:**  
“Lee el editor de texto” → “¿Quieres un resumen?” → “Sí” → “📝 Resumen automático: …”

**Estado actual:** Completado.

---

## Nivel 3 — IA Operativa

**Objetivo:** Ejecutar funciones de la aplicación desde el chat.

**Características:**
- Llamada a funciones como `enviarModificacion()` desde el chat.
- Acciones equivalentes a pulsar botones mediante lenguaje natural.
- Validación de inputs y ejecución de procesos por orden textual.

**Ejemplo:**  
“Inserta la modificación en el informe” → Ejecuta `enviarModificacion()`

**Estado actual:** En curso.

---

## Nivel 4 — IA Experta

**Objetivo:** Comprensión profunda de informes y normativa.

**Características:**
- Revisión estructurada de apartados de informe (ej: IV y VI).
- Identificación de errores, omisiones y redacción deficiente.
- Respuestas argumentadas según normativa (TRLHL, ICAL, RD 500/1990).
- Generación de observaciones o propuestas de mejora.

**Ejemplo:**  
“Revisa el apartado VI” → “Falta indicar el desglose de capítulos de gasto.”

**Estado actual:** Pendiente.

---

## Nivel 5 — IA Generativa

**Objetivo:** Redacción completa y autónoma de informes.

**Características:**
- Análisis completo de tablas, inputs y texto.
- Generación de informes redactados desde cero o a partir de plantillas.
- Integración con modelo LLM externo vía API para producir contenido técnico.

**Ejemplo:**  
“Redacta el informe completo con los datos cargados” → Documento completo y coherente generado.

**Estado actual:** Pendiente.

---

## Observaciones Finales

- La transición del Nivel 3 al 4 implica una lógica más normativa y técnica.
- El paso del Nivel 4 al 5 requiere IA generativa real conectada vía API.
- Los niveles son acumulativos: cada nivel conserva y amplía al anterior.
