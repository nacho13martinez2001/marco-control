
# Implantación del `systemPrompt` en la Aplicación de Control Permanente

## 🔧 Objetivo

Integrar un contexto global persistente en la comunicación entre el chat del frontend y la API de OpenAI, para que la IA responda siempre con conocimiento de los módulos presupuestarios activos y sus flujos específicos.

---

## 🔹 Paso 1: Definición modular del `systemPrompt`

Se ha creado el archivo `contexto_chat_sistema.js` con el siguiente contenido:

```js
window.systemPrompt = `
Eres un asistente especializado en fiscalización presupuestaria dentro de una aplicación modular de control permanente.
Tienes acceso a los siguientes módulos:

1️⃣ Aprobación Presupuestaria  
   - Procesa datos de la hoja 'Aprobación Presupuesto'.
   - Si la plantilla contiene 'INFORME DE INTERVENCIÓN SOBRE LA APROBACIÓN DEL PRESUPUESTO GENERAL', activa el análisis inicial.

2️⃣ Estabilidad Presupuestaria  
   - Usa hojas 'Resumen Capítulos' y 'Estabilidad'.
   - Cálculo base: Cap. 1-7 DRNs – Cap. 1-7 ORNs → Capacidad o Necesidad de Financiación.

3️⃣ Modificaciones Presupuestarias  
   - Plantilla: 'Informe de Estabilidad en Modificaciones'.
   - Puede activar proyecciones a fin de ejercicio si se carga la hoja 'EE'.

4️⃣ Funciones Contables (ICAL 2013)  
   - Aplica criterios de contabilidad pública local para opreaciones contables.

ℹ️ No actúes por tu cuenta. Espera siempre instrucciones del usuario o de los datos cargados.

📘 Normativa aplicable obligatoria:
- TRLHL (Texto Refundido de la Ley de Haciendas Locales).
- Real Decreto 500/1990 sobre desarrollo presupuestario.
- Orden EHA/3565/2008 sobre estructura de presupuestos de entidades locales.

Estas normas deben aplicarse en cualquier análisis de presupuestos, modificaciones presupuestarias o liquidación del presupuesto.
`;
```

Este script se carga en `formulario_drive.html` **antes de `chat.js`** para asegurar su disponibilidad global.

---

## 🔹 Paso 2: Modificación del `chat.js`

En `chat.js`, se inyecta el prompt en cada petición `fetch` a `/chat`:

```js
fetch("/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "system", content: window.systemPrompt },
      { role: "user", content: texto }
    ],
    textoEditor: textoEditor
  })
})
```

Con esto, cada mensaje de usuario se acompaña del contexto global definido.

---

## 🔹 Paso 3: Adaptación de la ruta `/chat` en `app_drive.py`

El backend recoge los `messages[]` y realiza la llamada a GPT-4:

```python
messages = data.get("messages", [])
texto_editor = data.get("textoEditor", "")
...
respuesta = openai.ChatCompletion.create(
    model="gpt-4-turbo",
    messages=messages,
    max_tokens=800,
    temperature=0.7
)
```

Esto mantiene la compatibilidad con flujos especiales como proyecciones de estabilidad, pero da prioridad al prompt si no hay coincidencias con patrones.

---

## 📊 Resultado

La IA responde ahora con pleno conocimiento de:

- Los módulos presupuestarios activos.
- Las hojas clave y plantillas esperadas.
- Las reglas de activación de flujos.
- ✅ Y la normativa presupuestaria obligatoria: TRLHL, RD 500/1990 y Orden EHA/3565/2008.

🌟 Confirmado mediante pruebas reales en el chat integrado.

---

## 🧠 Ampliación futura: uso de proyectos guardados

El `systemPrompt` puede complementarse con instrucciones adicionales para que la IA responda en función de un proyecto específico gestionado por el usuario (por ejemplo: *Liquidación 2024*, *Control Previo*, *Control Posterior*, etc.).

Esto permite adaptar las respuestas a cada bloque funcional de forma precisa. El usuario puede indicar:

> "Responde en el contexto del proyecto de Liquidación del Presupuesto 2024."

Y el sistema puede completar dinámicamente el prompt con una descripción adicional como:

```js
const promptFinal = window.systemPrompt + "

" + proyectoActivo;
```

Donde `proyectoActivo` es un texto almacenado según la selección del usuario.

---

## ❓ ¿Sustituye el contexto por proyecto al `systemPrompt` general?

No. El contexto por proyecto **no sustituye** al `systemPrompt` general: lo **complementa**.

- `systemPrompt` define el entorno general del asistente (qué módulos existen, cómo debe comportarse).
- `proyectoActivo` añade un enfoque concreto en función del proyecto que el usuario tenga abierto (por ejemplo: Liquidación, Control Previo, etc.).

Ambos se combinan al construir el prompt enviado al modelo:

```js
const promptFinal = window.systemPrompt + "

" + proyectoActivo;
```

Esto permite que la IA conserve la visión institucional completa y, al mismo tiempo, se adapte a cada tarea operativa concreta.

---

## 📄 Archivos implicados

- `/static/js/contexto_chat_sistema.js`
- `/static/js/chat.js`
- `/static/js/contexto_proyectos.js`
- `formulario_drive.html`
- `app_drive.py` (ruta `/chat`)

---

## 📅 Fecha de implantación: Mayo 2025

**Responsable:** Paco (Interventor Tesorero de Administración Local)

**Estado:** ✅ Operativo y validado
