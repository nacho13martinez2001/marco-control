// gestor_flujos.js
window.GestorFlujos = (function () {
  const flujos = {
    aprobacion: window.FlujoAprobacion,
    estabilidad: window.FlujoEstabilidadMod,
    liquidacion: window.FlujoLiquidacionGeneral, // 🔁 restaurado al nombre original
	modificaciones: window.FlujoModificacionesCredito,
    reglas: window.FlujoReglasFiscalesLiquidacion // ✅ Nuevo flujo añadido con coma anterior
  };

  function activarSolo(nombre) {
    for (const [clave, flujo] of Object.entries(flujos)) {
      if (!flujo) continue;
      if (clave === nombre) {
        try {
          flujo.iniciarFlujoSiAplica?.(window._textoDocumento || "");
        } catch (err) {
          console.warn("Error al iniciar flujo activo:", clave, err);
        }
      } else {
        try {
          if (typeof flujo.resetear === "function") {
            flujo.resetear();
          } else {
            flujo.iniciado = false;
          }
        } catch (err) {
          console.warn("Error al desactivar flujo:", clave, err);
        }
      }
    }
  }

  function registrar(nombre, flujo) {
    flujos[nombre] = flujo;
  }

  return {
    activarSolo,
    registrar,
    flujos
  };
})();
