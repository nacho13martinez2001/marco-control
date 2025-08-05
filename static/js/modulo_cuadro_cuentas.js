let CUADRO_CUENTAS = [];

function cargarCuadroCuentas() {
  fetch('/static/conocimiento/cuadro_cuentas_arbol.json')
    .then(r => r.json())
    .then(data => {
      CUADRO_CUENTAS = data;
      mostrarArbolCuentas();
    })
    .catch(() => {
      document.getElementById('indiceContabilidad').innerHTML =
        '<div class="alert alert-danger">No se pudo cargar el cuadro de cuentas</div>';
    });
}

// Renderiza el árbol (como lista indentada, simple)
function renderNodo(nodo, nivel = 0) {
  let html = `
    <div class="item-cuenta" data-codigo="${nodo.codigo}"
      style="margin-left:${nivel * 20}px; cursor:pointer;">
      <b>${nodo.codigo}</b> ${nodo.nombre}
    </div>`;
  if (nodo.hijas && nodo.hijas.length) {
    nodo.hijas.forEach(hija => {
      html += renderNodo(hija, nivel + 1);
    });
  }
  return html;
}

function mostrarArbolCuentas(filtro = "") {
  const cont = document.getElementById('indiceContabilidad');
  if (!cont) return;
  let html = '';
  CUADRO_CUENTAS.forEach(grupo => {
    html += renderNodo(grupo);
  });
  cont.innerHTML = html || '<div class="text-muted">No hay resultados</div>';
}

// Muestra la cuenta seleccionada en el panel derecho
function mostrarCuentaSeleccionada(cuenta) {
  const cont = document.getElementById('panelFichaContabilidad');
  if (!cont) return;
  cont.innerHTML = `
    <h5>${cuenta.codigo} ${cuenta.nombre}</h5>
    <div class="mt-2 text-secondary">(Nivel: ${cuenta.codigo.length})</div>
  `;
}

// Encuentra el nodo por código (búsqueda recursiva)
function buscarCuentaPorCodigo(arbol, codigo) {
  for (let nodo of arbol) {
    if (nodo.codigo === codigo) return nodo;
    if (nodo.hijas && nodo.hijas.length) {
      let found = buscarCuentaPorCodigo(nodo.hijas, codigo);
      if (found) return found;
    }
  }
  return null;
}

window.inicializarFormularioContabilidad = function() {
  cargarCuadroCuentas();

  document.getElementById('indiceContabilidad').onclick = function(e) {
    let target = e.target.closest('.item-cuenta');
    if (target) {
      const codigo = target.getAttribute('data-codigo');
      const cuenta = buscarCuentaPorCodigo(CUADRO_CUENTAS, codigo);
      if (cuenta) mostrarCuentaSeleccionada(cuenta);
    }
  };

  // (Opcional) Puedes añadir búsqueda por código/nombre aquí
};
