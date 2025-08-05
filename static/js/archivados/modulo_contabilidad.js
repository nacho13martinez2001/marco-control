// modulo_contabilidad.js

let ICAL_FICHAS = [];
let fichaSeleccionadaContabilidad = null;

// Cargar y aplanar JSON ICAL2013 al activar el módulo
function cargarICAL2013() {
  console.log("⏳ [ICAL] Iniciando carga de ICAL2013.json...");
  fetch('/static/conocimiento/ICAL2013.json')
    .then(r => {
      if (!r.ok) {
        console.error("❌ [ICAL] Error al acceder al archivo JSON. Status:", r.status);
        throw new Error("No se pudo acceder al archivo");
      }
      return r.json();
    })
    .then(data => {
      if (!data || typeof data !== "object") {
        console.error("❌ [ICAL] JSON vacío o incorrecto:", data);
        throw new Error("JSON vacío o incorrecto");
      }
      // Junta todos los bloques relevantes en un solo array de fichas
      ICAL_FICHAS = []
        .concat(data.reglas || [])
        .concat(data.marco_conceptual || [])
        .concat(data.normas_reconocimiento || []);
      console.log("🔎 [ICAL] ICAL_FICHAS cargadas:", ICAL_FICHAS.length, ICAL_FICHAS);

      if (ICAL_FICHAS.length === 0) {
        console.warn("⚠️ [ICAL] Ninguna ficha encontrada en el JSON.");
      } else {
        // Muestra las claves de la primera ficha para confirmar la estructura
        console.log("🧩 [ICAL] Primera ficha ejemplo:", ICAL_FICHAS[0]);
      }

      mostrarIndiceContable();
      inicializarBuscador();
      console.log("✅ [ICAL] Indice y buscador inicializados.");
    })
    .catch(err => {
      document.getElementById('panel_resultado_contabilidad').innerHTML =
        `<div class="alert alert-danger">No se pudo cargar ICAL2013.json</div>`;
      console.error("❌ [ICAL] Error en fetch o proceso JSON:", err);
    });
}

// Mostrar el índice temático/cuentas (puedes adaptar si usas grupos)
function mostrarIndiceContable() {
  const cont = document.getElementById('selectorTemasContabilidad');
  if (!cont) return;
  cont.innerHTML = ICAL_FICHAS.map((f, i) => {
    // Muestra el campo más relevante como título
    let cod = f.num_regla || f.numero || `F${i + 1}`;
    let titulo = f.titulo || f.texto?.substring(0,40) || '[Sin título]';
    return `<div class="item-ficha-contable border-bottom py-1 px-2" data-idx="${i}" style="cursor:pointer;">
      <b>${cod}</b> — ${titulo}
    </div>`;
  }).join('');
}

// Inicializar buscador con botón y Enter
function inicializarBuscador() {
  const input = document.getElementById('inputBusquedaContabilidad');
  const btnBuscar = document.getElementById('btnBuscarContabilidad');
  if (!input) return;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') buscarYMostrarFichas(input.value);
  });

  if (btnBuscar) {
    btnBuscar.addEventListener('click', () => {
      buscarYMostrarFichas(input.value);
    });
  }
}

// Buscar y mostrar todas las coincidencias
function buscarYMostrarFichas(consulta) {
  consulta = consulta.trim().toLowerCase();
  if (!consulta) {
    mostrarListadoResultadosContabilidad([]);
    return;
  }
  const resultado = ICAL_FICHAS.filter(f =>
    (f.titulo && f.titulo.toLowerCase().includes(consulta)) ||
    (f.texto && f.texto.toLowerCase().includes(consulta)) ||
    (f.num_regla && f.num_regla.toLowerCase().includes(consulta)) ||
    (f.numero && f.numero.toLowerCase().includes(consulta))
  );
  mostrarListadoResultadosContabilidad(resultado);
}

// Mostrar lista de coincidencias o ficha ampliada
function mostrarListadoResultadosContabilidad(fichas) {
  const panel = document.getElementById('panel_resultado_contabilidad');
  if (!panel) return;
  if (!fichas.length) {
    panel.innerHTML = `<span class="text-danger">Sin resultados</span>`;
    fichaSeleccionadaContabilidad = null;
    return;
  }
  if (fichas.length === 1) {
    mostrarFichaCompletaContabilidad(fichas[0]);
  } else {
    panel.innerHTML = `<b>Coincidencias encontradas:</b>` + fichas.map((f, idx) => {
      let cod = f.num_regla || f.numero || `F${idx + 1}`;
      let titulo = f.titulo || (f.texto?.substring(0,40) ?? '[Sin título]');
      return `<div class="item-ficha-contable my-1 p-2 border rounded" data-idx="${ICAL_FICHAS.indexOf(f)}" style="cursor:pointer;">
        <b>${cod}</b> — ${titulo}
      </div>`;
    }).join('');
    fichaSeleccionadaContabilidad = null;
  }
}

// Mostrar ficha ampliada (detalles)
function mostrarFichaCompletaContabilidad(f) {
  fichaSeleccionadaContabilidad = f;
  let html = `<div>`;
  html += `<b>${f.num_regla || f.numero || ''} ${f.titulo || ''}</b>`;
  if (f.texto) html += `<div class="mt-2">${f.texto}</div>`;

  // Subapartados, letras, etc.
  if (Array.isArray(f.subapartados) && f.subapartados.length) {
    html += `<div class="mt-2"><b>Subapartados:</b><ul>`;
    f.subapartados.forEach(sa => {
      html += `<li>${sa.letra ? `<b>${sa.letra}</b> ` : ""}${sa.texto ?? ""}</li>`;
    });
    html += `</ul></div>`;
  }
  if (Array.isArray(f.letras) && f.letras.length) {
    html += `<div class="mt-2"><b>Detalles:</b><ul>`;
    f.letras.forEach(sa => {
      html += `<li>${sa.letra ? `<b>${sa.letra}</b> ` : ""}${sa.texto ?? ""}</li>`;
    });
    html += `</ul></div>`;
  }
  html += `</div>`;
  const panel = document.getElementById('panel_resultado_contabilidad');
  if (panel) panel.innerHTML = html;
}

// Delegación de clic: seleccionar ficha de la lista o del índice
document.body.addEventListener('click', function(e) {
  if (e.target.classList.contains('item-ficha-contable')) {
    const idx = e.target.getAttribute('data-idx');
    const ficha = ICAL_FICHAS[idx];
    if (ficha) mostrarFichaCompletaContabilidad(ficha);
  }
});

// Botón "Enviar al chat para explicación IA" y "Insertar en informe"
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('selectorTemasContabilidad')) cargarICAL2013();

  const btnChat = document.getElementById('btnEnviarAlChatContabilidad');
  if (btnChat) {
    btnChat.addEventListener('click', () => {
      if (fichaSeleccionadaContabilidad) {
        window.enviarFichaAlChatIA && window.enviarFichaAlChatIA(fichaSeleccionadaContabilidad);
      } else {
        alert("Selecciona primero una ficha contable.");
      }
    });
  }

  const btnInsertar = document.getElementById('btnInsertarEnInformeContabilidad');
  if (btnInsertar) {
    btnInsertar.addEventListener('click', () => {
      if (fichaSeleccionadaContabilidad) {
        window.insertarFichaEnInforme && window.insertarFichaEnInforme(fichaSeleccionadaContabilidad);
      } else {
        alert("Selecciona primero una ficha contable.");
      }
    });
  }
});
window.inicializarFormularioContabilidad = function() {
  // Solo inicializa si existe el contenedor en el DOM
  if (document.getElementById('selectorTemasContabilidad')) cargarICAL2013();
};
