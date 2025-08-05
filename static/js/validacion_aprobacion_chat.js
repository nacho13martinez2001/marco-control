// 📦 Función central para validar el contenido del flujo de Aprobación Presupuestaria

window.templateChat = window.templateChat || {};

templateChat.validarContenidoAprobacion = async function () {
  const resultado = await fetch("/api/validar_contenido_aprobacion")
    .then(r => r.json())
    .catch(err => ({ error: true, mensaje: err.message }));

  if (resultado.error) {
    templateChat.mostrarMensaje("❌ Error al validar el contenido: " + resultado.mensaje);
    return;
  }

  const { equilibrio, estabilidad, regla_de_gasto } = resultado.resultados;

  // 🧾 Mensaje de resumen automático
  const resumen = `📌 **Resumen fiscal del presupuesto aprobado**:\n\n` +
    `1️⃣ *Equilibrio presupuestario*: ${equilibrio.resultado}\n` +
    `2️⃣ *Estabilidad presupuestaria*: ${estabilidad.resultado} (${estabilidad.elementos.capacidad_calculada.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })})\n` +
    `3️⃣ *Regla de gasto*: ${regla_de_gasto.resultado}` +
    (regla_de_gasto.resultado.includes("No cumple") ? ` (supera el límite en ${regla_de_gasto.elementos.resultado.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })})` : ``);

  templateChat.mostrarMensaje(resumen);

  // 🧠 Guardar explicación ampliada para responder si se solicita
  window._explicacionAmpliadaReglaGasto = regla_de_gasto.explicación;
}

// 🧠 Respuesta ampliada si el usuario lo pide explícitamente
templateChat.responderAmpliadoReglaGasto = function () {
  if (!window._explicacionAmpliadaReglaGasto) {
    templateChat.mostrarMensaje("ℹ️ No hay explicación disponible aún. Ejecuta primero la validación de contenido.");
    return;
  }

  templateChat.mostrarMensaje("🧠 **Explicación detallada sobre la regla de gasto:**\n\n" + window._explicacionAmpliadaReglaGasto);
};

templateChat.mostrarMensaje = function (mensaje) {
  if (typeof escribirMensajeChat === "function") {
    escribirMensajeChat(mensaje);
  } else {
    console.log("💬", mensaje); // Fallback
  }
};

// 🧠 Escucha solicitudes del usuario relacionadas con la regla de gasto
window.addEventListener("mensajeChatUsuario", (e) => {
  const mensaje = (e.detail || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (
    window._explicacionAmpliadaReglaGasto &&
    mensaje.includes("regla de gasto") &&
    (mensaje.includes("por que") || mensaje.includes("explica") || mensaje.includes("motivo"))
  ) {
    // Aseguramos que la variable general también tenga esta info para futuros usos
    window._explicacionReglaGastoAprobacion = window._explicacionAmpliadaReglaGasto;

    if (typeof templateChat?.mostrarMensaje === "function") {
      templateChat.mostrarMensaje(
        "🧠 **Explicación detallada sobre la regla de gasto:**\n\n" +
          window._explicacionAmpliadaReglaGasto
      );
    } else {
      const evento = new CustomEvent("mensajeAsistente", {
        detail: window._explicacionAmpliadaReglaGasto,
      });
      window.dispatchEvent(evento);
    }

    window._respuestaPersonalizada = true;
  }
});
