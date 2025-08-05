# Centralización de la Lógica IA y Control del Editor

---

## 1. Mapa de Dependencias y Scripts que Modifican el Editor

### Principales archivos y su rol
- **chat_upload.js**
  - Sube archivos Word/PDF/Excel, pone el texto en el editor y dispara eventos para flujos.
- **comun.js**
  - Funciones utilitarias; puede copiar texto al editor y manejar eventos de subida (también puede disparar funciones de flujo o recargar texto del editor).
- **insertar_modificacion_IA.js**
  - Listener que sustituye `[Res]` por el texto IA al recibir el evento `resultadoIARecibido`.
- **Flujos específicos** (`flujo_aprobacion_general.js`, `flujo_modificaciones_credito.js`, etc.)
  - Pueden modificar el editor según el flujo detectado.
- **chat.js / chat_ia_motor.js**
  - El chat interpreta mensajes y puede accionar cambios en el editor, además de invocar funciones IA.
- **init.js**
  - Inicializa y conecta listeners, puede activar flujos específicos tras carga de documento.
- **Variables globales y eventos**
  - `window._últimaRespuestaUpload`, `window._flujoActivo`, etc.
  - Eventos custom como `resultadoIARecibido` para comunicación entre módulos.

---

## 2. Estado de Eventos y Variables

- El evento clave suele ser `resultadoIARecibido`, pero no todos los flujos lo disparan igual.
- `window._últimaRespuestaUpload` es el contenedor habitual del JSON recibido (pero no siempre contiene todos los campos posibles).
- Variables como `window._flujoActivo` a veces definen el contexto, otras veces se detecta el flujo por el contenido.

---

## 3. Backend / Respuesta JSON

- `/chat_upload` suele devolver `{ texto: "...", ... }` (no siempre IA, a veces solo el informe base).
- `/flujo_modificaciones` y otros flujos devuelven el texto base y el resultado IA (`resultado_modificacion`).
- No existe (aún) una estructura universal de marcadores IA.

---

## 4. Riesgos principales

- Conflicto y duplicidad de scripts: varios listeners pueden competir por el control del editor.
- Sustituciones incompletas o erráticas: si falta un campo IA o un listener pisa a otro, el editor queda a medio actualizar.
- Dificultad para escalar: cada nuevo flujo implica nuevos parches JS si no centralizas la lógica.

---

# Plan de Acción Recomendado

## 1. Centralizar la lógica de sustitución en el editor YA

- Un único listener escucha el evento global (ej: `resultadoIARecibido`).
- Recibe el JSON de respuesta IA (guardado en `window._últimaRespuestaUpload`).
- Detecta y recorre TODOS los marcadores presentes en el texto base del editor (ej: `[Res]`, `[Tipo_Mod]`, `[Tabla_Recursos]`...).
- Sustituye todos los marcadores por el valor correspondiente del JSON.
- Si un marcador no tiene valor en el JSON, lo deja igual (o puedes marcarlo como pendiente con un estilo o texto).

### Ejemplo de código para el Listener Centralizado

```js
window.addEventListener("resultadoIARecibido", () => {
  const respuesta = window._últimaRespuestaUpload;
  if (!respuesta) {
    console.warn("⚠️ No hay respuesta IA aún.");
    return;
  }
  const editor = document.querySelector("#editorTexto");
  if (!editor) {
    console.error("❌ Editor de texto no encontrado.");
    return;
  }

  // Usar el texto actual del editor como base
  let texto = editor.innerHTML;

  // Recoger todos los marcadores de la respuesta (diccionario clave: marcador, valor: contenido IA)
  const marcadores = respuesta.marcadores || {};

  // Sustituir todos los marcadores en el texto del editor
  for (const marcador in marcadores) {
    const valor = marcadores[marcador] || "";
    // Escapa [ y ] para RegExp global
    const marcadorRegex = new RegExp(marcador.replace(/[[\]]/g, '\$&'), "g");
    texto = texto.replace(marcadorRegex, valor);
  }

  editor.innerHTML = texto;
  console.log("🧠 Sustitución centralizada aplicada:", marcadores);
});
```

**Notas:**
- Si el backend aún no devuelve un objeto `marcadores`, puedes crearlo manualmente en el frontend con los campos que tengas.
- Cuando termines la transición, deberías eliminar/comentar todos los listeners alternativos que modifiquen el editor.

---

## 2. Unificar la respuesta del backend

**Protocolo de respuesta ideal (para cualquier flujo):**

```json
{
  "texto": "<plantilla base con marcadores>",
  "marcadores": {
    "[Res]": "Conclusión IA...",
    "[Tipo_Mod]": "Transferencia",
    "[Tabla_Recursos]": "Recurso 1...",
    "[Tabla_Gastos]": "Gasto 1..."
  },
  "logs": "...",
  "errores": "...",
  "flujo": "modificacion"
}
```

- Así puedes añadir nuevos marcadores o flujos sin tocar el frontend.
- Si algún marcador no se usa en el informe actual, simplemente no estará presente (o estará vacío).

---

## 3. Eliminar/fusionar scripts JS que modifican el editor directamente

- Comenta o elimina la lógica de otros scripts (chat, flujos, subida) que modifiquen el editor después de la carga inicial.
- Mantén solo la lógica de carga inicial de texto (al abrir un archivo), y la sustitución centralizada.
- Ejemplo:
  - Carga de documento: solo pone el texto en el editor, nada más.
  - Cuando hay respuesta IA: el listener central la aplica.
- Así garantizas que solo la IA manda sobre el editor después de la carga base.

---

## 4. Buenas prácticas para el futuro

- Siempre que amplíes con nuevos flujos o plantillas, añade sus marcadores al objeto `marcadores` en el backend.
- Mantén el frontend “ciego”: solo recorre el objeto de marcadores y los aplica, no necesita saber el flujo activo ni la lógica interna.
- Para nuevas funciones IA, lanza el mismo evento (`resultadoIARecibido`) y actualiza `window._últimaRespuestaUpload`, y todo funcionará sin tocar el listener.
- Si el usuario quiere revisar o editar a mano el texto IA, puedes añadir una UI o log que marque los campos sustituidos (opcional).

---

# Resumen de Acciones Concretas

1. Implementa el listener único de sustitución en el editor (como el ejemplo de arriba).
2. Asegúrate de que SOLO ese listener modifique el contenido del editor después de la carga inicial.
3. En el backend, devuelve siempre el campo `marcadores` con todas las claves/valores que puede necesitar el frontend.
4. Comenta/elimina cualquier otro script que haga sustituciones directas (después de la carga base) en el editor.
5. Documenta los nuevos marcadores en el backend y amplía el JSON según necesites.
6. Prueba el sistema con varios informes y flujos para verificar que ningún marcador se queda sin sustituir ni se pisa.

---

# Conclusión

Si aplicas este modelo, tu chat/IA tendrá control total y real del editor y de todos los flujos, y tu sistema será fácilmente ampliable, estable y listo para cualquier escenario futuro.
