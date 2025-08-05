let REGLAS = [];
let reglaSeleccionada = null;

function cargarReglas() {
  fetch('/static/conocimiento/ical_reglas.json')
    .then(r => r.json())
    .then(data => {
      REGLAS = data;
      mostrarIndiceReglas();
      // Selecciona por defecto la primera ficha (opcional y recomendable)
      if (REGLAS.length) mostrarReglaSeleccionada(REGLAS[0]);
    })
    .catch(() => {
      document.getElementById('indiceContabilidad').innerHTML = '<div class="alert alert-danger">No se pudo cargar las reglas</div>';
    });
}

function mostrarIndiceReglas(filtro = "") {
  const cont = document.getElementById('indiceContabilidad');
  if (!cont) return;
  let reglasFiltradas = REGLAS;
  if (filtro.trim()) {
    const q = filtro.trim().toLowerCase();
    reglasFiltradas = REGLAS.filter(r =>
      (r.num_regla && r.num_regla.toLowerCase().includes(q)) ||
      (r.titulo && r.titulo.toLowerCase().includes(q)) ||
      (r.texto && r.texto.toLowerCase().includes(q))
    );
  }
  cont.innerHTML = reglasFiltradas.map((r, i) => `
    <div class="item-regla p-2 border-bottom small" data-idx="${i}" style="cursor:pointer;">
      <b>Regla ${r.num_regla}</b><br><span>${r.titulo}</span>
    </div>
  `).join('') || '<div class="text-muted">No hay resultados</div>';
}

function mostrarReglaSeleccionada(regla) {
  reglaSeleccionada = regla;
  const cont = document.getElementById('panelFichaContabilidad');
  if (!cont) return;
  cont.innerHTML = `
    <h5>Regla ${regla.num_regla} – ${regla.titulo}</h5>
    <div class="mt-2" style="white-space:pre-line">${regla.texto}</div>
  `;
}

window.inicializarFormularioContabilidad = function() {
  cargarReglas();

  // Engancha al hacer clic en una regla del índice
  document.getElementById('indiceContabilidad').onclick = function(e) {
    let target = e.target.closest('.item-regla');
    if (target) {
      const idx = target.getAttribute('data-idx');
      mostrarReglaSeleccionada(REGLAS[idx]);
    }
  };

  // Buscador en tiempo real + Enter
  const input = document.getElementById('inputBusquedaContabilidad');
  if (input) {
    input.oninput = e => mostrarIndiceReglas(e.target.value);
    input.onkeydown = e => {
      if (e.key === 'Enter') mostrarIndiceReglas(input.value);
    };
  }

  // Botón "Enviar al chat IA"
  const btnChat = document.getElementById('btnEnviarAlChatContabilidad');
  if (btnChat) {
    btnChat.onclick = () => {
      // 🔹 Diagnóstico: ver si reglaSeleccionada existe
      if (!reglaSeleccionada) {
        alert("Selecciona primero una regla del índice.");
        return;
      }
      // 🔹 Diagnóstico: ver si función global existe
      if (!window.enviarFichaAlChatIA) {
        alert("Función enviarFichaAlChatIA no está definida.");
        return;
      }
      const prompt = `¿Cuál es el sentido y la aplicación práctica de la siguiente regla de la ICAL 2013?\n\n"${reglaSeleccionada.titulo}\n\n${reglaSeleccionada.texto}"`;
      window.enviarFichaAlChatIA(prompt);
    };
  }
};
window.enviarFichaAlChatIA = function(msg) {
  if (typeof enviarMensaje === "function") {
    enviarMensaje(msg);
  } else {
    alert("No se encontró la función enviarMensaje.");
  }
};
