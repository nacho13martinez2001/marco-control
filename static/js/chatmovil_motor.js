document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("userInput");
  const boton = document.getElementById("enviarMensaje");
  const chat = document.getElementById("chatOutput");
  window.speechSynthesis.onvoiceschanged = () => {};

  // Ajuste visual de textarea
  input.style.overflowY = "hidden";
  input.style.minHeight = "3em";
  input.style.maxHeight = "10em";
  input.style.resize = "none";

  input.addEventListener("input", () => {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 160) + "px";
  });

  // Enviar con Enter + Shift para salto de línea
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      boton.click();
    }
  });

  boton.addEventListener("click", async () => {
    const texto = input.value.trim();
    if (!texto) return;

    mostrarBurbujaUsuario(texto);
    input.value = "";
    input.style.height = "3em";

    try {
      const respuesta = await enviarAlServidor(texto);
      mostrarBurbujaIA(respuesta);
	  hablarTexto(respuesta);
    } catch (error) {
      mostrarBurbujaIA("⚠️ Error al procesar la respuesta.");
      console.error(error);
    }
  });

  function mostrarBurbujaUsuario(texto) {
    const burbuja = document.createElement("div");
    burbuja.className = "burbuja usuario";
    burbuja.innerText = texto;
    chat.appendChild(burbuja);
    chat.scrollTop = chat.scrollHeight;
  }

  function mostrarBurbujaIA(texto) {
    const burbuja = document.createElement("div");
    burbuja.className = "burbuja ia";

    burbuja.innerHTML = `
      <div style="display: flex; align-items: flex-start; gap: 0.5em;">
        <img src="/static/iconos/icono_chat.png" alt="IA" style="width: 1.8em; height: 1.8em; border-radius: 50%;">
        <div>${texto}</div>
      </div>
    `;

    chat.appendChild(burbuja);
    chat.scrollTop = chat.scrollHeight;
  }

  async function enviarAlServidor(texto) {
    const res = await fetch("/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          { role: "user", content: texto }
        ]
      })
    });

    if (!res.ok) throw new Error("Error en la respuesta del servidor");
    const data = await res.json();
    return data.respuesta || "⚠️ Respuesta vacía.";
  }
});

// 🎙️ Reconocimiento por voz (webkitSpeechRecognition)
const btnVoz = document.getElementById("btnVoz");
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let escuchando = false;

  btnVoz.addEventListener("click", () => {
    if (escuchando) {
      recognition.stop();
      escuchando = false;
      btnVoz.innerText = "🎙️";
    } else {
      recognition.start();
      escuchando = true;
      btnVoz.innerText = "🔴";
    }
  });

  recognition.onresult = function(event) {
    const textoDictado = event.results[0][0].transcript;
    const input = document.getElementById("userInput");
    input.value += (input.value ? " " : "") + textoDictado;
    input.focus();
  };

  recognition.onend = function() {
    escuchando = false;
    btnVoz.innerText = "🎙️";
  };

  recognition.onerror = function(event) {
    console.error("Error en reconocimiento de voz:", event.error);
    btnVoz.innerText = "🎙️";
  };
} else {
  btnVoz.disabled = true;
  btnVoz.title = "Voz no compatible";
}

function hablarTexto(texto) {
  const mensaje = new SpeechSynthesisUtterance(texto);
  mensaje.lang = "es-ES";

  // Selecciona una voz en español si existe
  const voces = window.speechSynthesis.getVoices();
  const vozEspanol = voces.find(v => v.lang.startsWith("es") && v.localService);
  if (vozEspanol) mensaje.voice = vozEspanol;

  window.speechSynthesis.speak(mensaje);
}
