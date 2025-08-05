// voz.js – Módulo de entrada y salida por voz (modular, sin botón flotante con indicador)

window.ChatVoz = (() => {
  let reconocimientoActivo = false;
  let reconocimientoEnCurso = false;
  const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  reconocimiento.lang = "es-ES";
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 1;

  // Crear indicador visual
  const indicador = document.createElement("span");
  indicador.id = "indicadorVozActiva";
  indicador.style.display = "inline-block";
  indicador.style.width = "10px";
  indicador.style.height = "10px";
  indicador.style.marginLeft = "6px";
  indicador.style.borderRadius = "50%";
  indicador.style.background = "transparent";
  indicador.style.transition = "background 0.3s ease";

  const btn = document.getElementById("botonVozChat");
  if (btn) btn.appendChild(indicador);

  

  reconocimiento.onstart = function () {
    reconocimientoEnCurso = true;
    window.speechSynthesis.cancel();
    if (indicador) indicador.style.background = "red";
    console.log("🎙️ Reconocimiento de voz iniciado");
  };

  reconocimiento.onend = function () {
    reconocimientoEnCurso = false;
    if (indicador) indicador.style.background = "transparent";
    console.log("🛑 Reconocimiento de voz finalizado");
  };

  reconocimiento.onresult = function (event) {
    const texto = event.results[0][0].transcript;
    const input = document.getElementById("userInput");
    const boton = document.querySelector("#userInput + button");
    if (input) input.value = texto;
    if (boton) boton.click();
  };

  reconocimiento.onerror = function (e) {
    console.warn("🎤 Error en reconocimiento de voz:", e);
    alert("❌ No se pudo capturar la voz. Inténtalo de nuevo.");
  };

  function toggleVoz() {
    if (reconocimientoActivo) {
      reconocimiento.stop();
      reconocimientoActivo = false;
      document.getElementById("botonVozChat").innerText = "VOZ";
      ChatVoz._vozActiva = false;
      if (indicador) indicador.style.background = "transparent";
    } else {
      reconocimiento.start();
      reconocimientoActivo = true;
      document.getElementById("botonVozChat").innerText = "Grabando ...";
      ChatVoz._vozActiva = true;
    }
  }

  return {
    toggleVoz,
    _vozActiva: false,
    _reconocimientoEnCurso: () => reconocimientoEnCurso,
    _setIndicadorHablando: function (activo) {
      if (!indicador) return;
      indicador.style.background = activo ? "blue" : (reconocimientoEnCurso ? "red" : "transparent");
      console.log(activo ? "🔊 Hablando..." : reconocimientoEnCurso ? "🎙️ Escuchando..." : "🔇 Silencio.");
    }
  };
})();

// 🗣️ Lectura en voz alta de respuestas IA (activada solo si voz está activa y no se está dictando)
ChatIA._leerEnVozAlta = function (textoPlano) {
  if (!textoPlano || typeof textoPlano !== "string") return;
  if (!window.ChatVoz?._vozActiva || window.ChatVoz._reconocimientoEnCurso()) return;
  const msg = new SpeechSynthesisUtterance(textoPlano);
  msg.lang = "es-ES";

  const voces = window.speechSynthesis.getVoices();
  const vozEs = voces.find(v => v.lang.startsWith("es"));
  if (vozEs) msg.voice = vozEs;

  console.log("📢 Reproduciendo voz:", textoPlano);
  window.speechSynthesis.cancel();
  ChatVoz._setIndicadorHablando(true);
  msg.onend = () => ChatVoz._setIndicadorHablando(false);
  window.speechSynthesis.speak(msg);
};

// 📣 Integración universal: responder también desde eventos externos
window.addEventListener("respuestaIA", (e) => {
  const div = document.createElement("div");
  div.innerHTML = e.detail?.respuesta || "";
  const textoPlano = div.textContent.trim();
  ChatIA._leerEnVozAlta(textoPlano);
});

