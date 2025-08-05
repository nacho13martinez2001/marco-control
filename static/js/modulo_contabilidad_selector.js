let BLOQUES_CONTABILIDAD = {
  reglas:      { url: '/static/conocimiento/ical_reglas.json',             data: [], ficha: null },
  marco_conceptual: { url: '/static/conocimiento/ical_marco_conceptual.json', data: [], ficha: null },
  normas_reconocimiento: { url: '/static/conocimiento/ical_normas_reconocimiento.json', data: [], ficha: null },
  cuentas_anuales: { url: '/static/conocimiento/ical_cuentas_anuales.json', data: [], ficha: null },
  cuadro_cuentas:  { url: '/static/conocimiento/ical_cuadro_cuentas.json',  data: [], ficha: null },
  definiciones:    { url: '/static/conocimiento/ical_definiciones.json',    data: [], ficha: null }
};
let bloqueActivo = "reglas";

function cargarBloqueContabilidad(bloque) {
  bloqueActivo = bloque;
  const bloqueObj = BLOQUES_CONTABILIDAD[bloque];
  if (!bloqueObj) return;
  // Si ya está cargado, no vuelvas a fetch salvo que quieras forzar
  if (bloqueObj.data.length) {
    mostrarIndiceContabilidad();
    return;
  }
  fetch(bloqueObj.url)
    .then(r => r.json())
    .then(data => {
      bloqueObj.data = data;
      mostrarIndiceContabilidad();
    })
    .catch(() => {
      document.getElementById('indiceContabilidad').innerHTML = '<div class="alert alert-danger">No se pudo cargar el bloque seleccionado</div>';
    });
}

function mostrarIndiceContabilidad(filtro = "") {
  const cont = document.getElementById('indiceContabilidad');
  if (!cont) return;
  const bloqueObj = BLOQUES_CONTABILIDAD[bloqueActivo];
  let lista = bloqueObj.data;
  // Filtro según bloque
  if (filtro.trim()) {
    const q = filtro.trim().toLowerCase();
    if (bloqueActivo === "reglas") {
      lista = lista.filter(f =>
        (f.num_regla && f.num_regla.toLowerCase().includes(q)) ||
        (f.titulo && f.titulo.toLowerCase().includes(q)) ||
        (f.texto && f.texto.toLowerCase().includes(q))
      );
    } else if (bloqueActivo === "marco_conceptual") {
      lista = lista.filter(f =>
        (f.numero && f.numero.toLowerCase().includes(q)) ||
        (f.texto && f.texto.toLowerCase().includes(q)) ||
        (Array.isArray(f.subapartados) && f.subapartados.some(sa => sa.texto?.toLowerCase().includes(q)))
      );
    } else {
      // Para otros bloques: busca en todos los campos string
      lista = lista.filter(f => JSON.stringify(f).toLowerCase().includes(q));
    }
  }
  // Render según bloque
  if (bloqueActivo === "reglas") {
    cont.innerHTML = lista.map((f, i) => `
      <div class="item-ficha-contable p-2 border-bottom small" data-idx="${i}" style="cursor:pointer;">
        <b>Regla ${f.num_regla}</b><br><span>${f.titulo}</span>
      </div>
    `).join('') || '<div class="text-muted">No hay resultados</div>';
  } else if (bloqueActivo === "marco_conceptual") {
    cont.innerHTML = lista.map((f, i) => `
      <div class="item-ficha-contable p-2 border-bottom small" data-idx="${i}" style="cursor:pointer;">
        <b>${f.numero || ""}</b><br><span>${f.texto ? f.texto.substring(0,50) : '[Sin resumen]'}</span>
      </div>
    `).join('') || '<div class="text-muted">No hay resultados</div>';
  } else {
    // Para otros bloques, simple (mejorar según estructura real)
    cont.innerHTML = lista.map((f, i) => `
      <div class="item-ficha-contable p-2 border-bottom small" data-idx="${i}" style="cursor:pointer;">
        <b>${f.codigo || f.numero || i}</b><br><span>${f.nombre || f.titulo || f.texto?.substring(0,50) || '[Sin resumen]'}</span>
      </div>
    `).join('') || '<div class="text-muted">No hay resultados</div>';
  }
  // Selecciona primera ficha por defecto
  if (lista.length) mostrarFichaContabilidad(lista[0], 0);
  else document.getElementById('panelFichaContabilidad').innerHTML = "";
}

function mostrarFichaContabilidad(ficha, idx) {
  BLOQUES_CONTABILIDAD[bloqueActivo].ficha = ficha;
  const cont = document.getElementById('panelFichaContabilidad');
  if (!cont) return;
  let html = "";
  if (bloqueActivo === "reglas") {
    html = `<h5>Regla ${ficha.num_regla} – ${ficha.titulo}</h5>
    <div class="mt-2" style="white-space:pre-line">${ficha.texto}</div>`;
  } else if (bloqueActivo === "marco_conceptual") {
    html = `<h5>${ficha.numero || ""} ${ficha.texto || ""}</h5>`;
    if (Array.isArray(ficha.subapartados) && ficha.subapartados.length) {
      html += `<ul class="mt-2">`;
      ficha.subapartados.forEach(sa => {
        html += `<li><b>${sa.letra ? sa.letra : ""}</b> ${sa.texto || ""}</li>`;
      });
      html += `</ul>`;
    }
  } else {
    html = `<pre>${JSON.stringify(ficha, null, 2)}</pre>`;
  }
  cont.innerHTML = html;
}

window.inicializarFormularioContabilidad = function() {
  // Al cargar, pone el primer bloque
  cargarBloqueContabilidad(document.getElementById("selectorBloqueContabilidad").value);

  // Cambia de bloque al cambiar selector
  document.getElementById("selectorBloqueContabilidad").onchange = (e) => {
    cargarBloqueContabilidad(e.target.value);
    document.getElementById('inputBusquedaContabilidad').value = "";
  };

  // Clic en el índice lateral
  document.getElementById('indiceContabilidad').onclick = function(e) {
    let target = e.target.closest('.item-ficha-contable');
    if (target) {
      const idx = target.getAttribute('data-idx');
      const lista = BLOQUES_CONTABILIDAD[bloqueActivo].data;
      mostrarFichaContabilidad(lista[idx], idx);
    }
  };

  // Buscador
  const input = document.getElementById('inputBusquedaContabilidad');
  if (input) {
    input.oninput = e => mostrarIndiceContabilidad(e.target.value);
    input.onkeydown = e => {
      if (e.key === 'Enter') mostrarIndiceContabilidad(input.value);
    };
  }

  // Botón enviar a IA
  document.getElementById('btnEnviarAlChatContabilidad').onclick = () => {
    const ficha = BLOQUES_CONTABILIDAD[bloqueActivo].ficha;
    if (!ficha || !window.enviarFichaAlChatIA) return;
    let prompt = "";
    if (bloqueActivo === "reglas") {
      prompt = `¿Cuál es el sentido y la aplicación práctica de la siguiente regla de la ICAL 2013?\n\n"${ficha.titulo}\n\n${ficha.texto}"`;
    } else if (bloqueActivo === "marco_conceptual") {
      const texto = ficha.texto || "";
      const resumen = Array.isArray(ficha.subapartados)
        ? ficha.subapartados.map(sa => (sa.letra ? sa.letra + " " : "") + (sa.texto || "")).join("\n")
        : "";
      prompt = `¿Cómo se aplica el siguiente principio del Marco Conceptual de la ICAL 2013?\n\n"${ficha.numero} ${texto}\n${resumen}"`;
    } else {
      prompt = JSON.stringify(ficha, null, 2);
    }
    window.enviarFichaAlChatIA(prompt);
  };
};
