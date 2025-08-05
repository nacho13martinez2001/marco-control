let MARCO_CONCEPTUAL = [];
let principioSeleccionado = null;

function cargarMarcoConceptual() {
  fetch('/static/conocimiento/ical_marco_conceptual.json')
    .then(r => r.json())
    .then(data => {
      MARCO_CONCEPTUAL = data;
      mostrarIndiceMarcoConceptual();
      if (MARCO_CONCEPTUAL.length) mostrarPrincipioSeleccionado(MARCO_CONCEPTUAL[0]);
    })
    .catch(() => {
      document.getElementById('indiceContabilidad').innerHTML = '<div class="alert alert-danger">No se pudo cargar el Marco Conceptual</div>';
    });
}

function mostrarIndiceMarcoConceptual(filtro = "") {
  const cont = document.getElementById('indiceContabilidad');
  if (!cont) return;
  let principiosFiltrados = MARCO_CONCEPTUAL;
  if (filtro.trim()) {
    const q = filtro.trim().toLowerCase();
    principiosFiltrados = MARCO_CONCEPTUAL.filter(p =>
      (p.num && p.num.toLowerCase().includes(q)) ||
      (p.titulo && p.titulo.toLowerCase().includes(q)) ||
      (p.texto && p.texto.toLowerCase().includes(q))
    );
  }
  cont.innerHTML = principiosFiltrados.map((p, i) => `
    <div class="item-principio p-2 border-bottom small" data-idx="${i}" style="cursor:pointer;">
      <b>${p.num}</b><br><span>${p.titulo}</span>
    </div>
  `).join('') || '<div class="text-muted">No hay resultados</div>';
}


function mostrarPrincipioSeleccionado(principio) {
  principioSeleccionado = principio;
  const cont = document.getElementById('panelFichaContabilidad');
  if (!cont) return;
  cont.innerHTML = `
    <h5>${principio.num} – ${principio.titulo}</h5>
    <div class="mt-2" style="white-space:pre-line">${principio.texto}</div>
  `;
}

window.inicializarFormularioContabilidad = function() {
  cargarMarcoConceptual();

  // Engancha al hacer clic en un principio del índice
  document.getElementById('indiceContabilidad').onclick = function(e) {
    let target = e.target.closest('.item-principio');
    if (target) {
      const idx = target.getAttribute('data-idx');
      mostrarPrincipioSeleccionado(MARCO_CONCEPTUAL[idx]);
    }
  };

  // Buscador en tiempo real + Enter
  const input = document.getElementById('inputBusquedaContabilidad');
  if (input) {
    input.oninput = e => mostrarIndiceMarcoConceptual(e.target.value);
    input.onkeydown = e => {
      if (e.key === 'Enter') mostrarIndiceMarcoConceptual(input.value);
    };
  }

  // Botón "Enviar al chat IA"
  const btnChat = document.getElementById('btnEnviarAlChatContabilidad');
  if (btnChat) {
    btnChat.onclick = () => {
      if (!principioSeleccionado) {
        alert("Selecciona primero un principio del índice.");
        return;
      }
      if (!window.enviarFichaAlChatIA) {
        alert("Función enviarFichaAlChatIA no está definida.");
        return;
      }
      const prompt = `¿Cómo se aplica el siguiente principio del Marco Conceptual de la ICAL 2013?\n\n"${principioSeleccionado.num} ${principioSeleccionado.titulo}\n\n${principioSeleccionado.texto}"`;
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
