// motor_redactor_modificaciones.js

// ✅ Hacemos visible esta función para poder llamarla desde fuera (como en gestor_flujos.js)
window.filtrarFinanciacionPorTipo = function(tipo) {
  const mapa = {
    "Incorporación de remanente": ["Remanente afectado", "Remanente general"],
    "Crédito extraordinario": ["Remanente afectado", "Remanente general", "Nuevos ingresos", "Mayores ingresos", "Baja de otra partida"],
    "Suplemento de crédito": ["Remanente afectado", "Remanente general", "Nuevos ingresos", "Mayores ingresos", "Baja de otra partida"],
    "Transferencia de crédito": ["Baja de otra partida"],
    "Generación de crédito": ["Nuevos ingresos"],
    "Ampliación de crédito": ["Mayores ingresos"],
    "Baja por anulación": [],
    "Ajuste al alza": ["Remanente general", "Mayores ingresos"]
  };

  const tipoFin = document.getElementById("tipoFinanciacion");
  if (!tipoFin) return;

  const seleccionadas = mapa[tipo] || [];
  tipoFin.innerHTML = "";
  const placeholder = document.createElement("option");
  placeholder.textContent = "Seleccione...";
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.value = "";
  tipoFin.appendChild(placeholder);

  seleccionadas.forEach(valor => {
    const opt = document.createElement("option");
    opt.textContent = valor;
    opt.value = valor;
    tipoFin.appendChild(opt);
  });

  if (seleccionadas.length === 1) {
    tipoFin.value = seleccionadas[0];
  }
};

// ✅ Visor doctrinal por tipo de modificación
window.mostrarDoctrinaPorTipo = function(tipo) {
  const visor = document.getElementById("visorTipoModificacion");
  if (!visor) return;


  const textos = {
    "Crédito extraordinario": `Crédito extraordinario:
Son aquellas modificaciones del presupuesto de gastos mediante las que se asigna crédito para la realización de un gasto específico y determinado que no puede demorarse hasta el ejercicio siguiente y para el que no existe crédito en el presupuesto vigente (art. 35.1 del RD 500/1990).

La característica de la concesión del crédito extraordinario es la creación de un nuevo concepto presupuestario, por no existir en el presupuesto vigente un concepto con el que pueda hacerse frente a las obligaciones o necesidades que es necesario atender, y dotarlo del correspondiente crédito para gastos.

Se exige justificar:
- Que no existe crédito para la finalidad.
- Que el gasto es específico y no puede demorarse.
- La fuente de financiación: remanente líquido de tesorería, nuevos ingresos, mayores ingresos o anulaciones de otras partidas.

En caso de operaciones de crédito para gasto corriente, deberán cumplirse condiciones adicionales (urgencia, acuerdo del Pleno, límite del 5 % de ingresos ordinarios, etc.).

La tramitación es idéntica a la del presupuesto: aprobación, exposición pública y posibilidad de reclamaciones.`,

    "Suplemento de crédito": `Suplemento de crédito:
Son aquellas modificaciones en las que, existiendo un gasto específico y determinado que no puede demorarse, el crédito previsto resulta insuficiente y no puede ser objeto de ampliación (art. 35.2 del RD 500/1990).

Se incrementa una aplicación presupuestaria existente.

Puede financiarse igual que el crédito extraordinario: con remanente líquido, nuevos ingresos, mayores ingresos o anulaciones de otras partidas.

También puede financiarse mediante operaciones de crédito si se cumplen condiciones muy concretas para gastos corrientes.

El expediente debe justificar:
- La necesidad y urgencia del gasto.
- La insuficiencia de la aplicación actual.
- Que la financiación es viable y no rompe el equilibrio presupuestario.

La tramitación es idéntica al crédito extraordinario.`,

    "Ampliación de crédito": `Ampliación de crédito:
Consiste en aumentar el crédito de aquellas aplicaciones presupuestarias que han sido declaradas ampliables en las bases de ejecución.

Solo pueden ampliarse con ingresos legalmente afectados y deben estar expresamente reconocidas como ampliables.

Se requiere:
- Existencia de recurso afectado reconocido como derecho.
- Que el ingreso no provenga de operaciones de crédito.

La tramitación es más sencilla, sin necesidad de aprobación plenaria, si así lo recogen las bases.

Se excluyen de las bolsas de vinculación y no pueden ser objeto de transferencia.`,

    "Transferencia de crédito": `Transferencia de crédito:
Es el traspaso de crédito de una aplicación presupuestaria a otra, sin alterar el importe total del presupuesto (art. 40 RD 500/1990).

Características:
- Las aplicaciones deben tener distinta vinculación jurídica.
- Se financian con la minoración de otras partidas no comprometidas.

Limitaciones:
- No pueden afectar a créditos ampliables ni a créditos extraordinarios.
- Las aplicaciones que hayan sido aumentadas no pueden volver a minorarse, y viceversa.

La aprobación puede corresponder al pleno o al órgano que determinen las bases de ejecución, según el tipo de transferencia.

Debe respetarse la estructura de vinculación y los créditos disponibles reales en cada aplicación.`,

    "Generación de crédito": `Generación de crédito:
Permite crear nuevos créditos en el presupuesto de gastos como consecuencia del reconocimiento de determinados ingresos de naturaleza no tributaria (art. 43 RD 500/1990).

Casos típicos:
- Aportaciones voluntarias de personas físicas o jurídicas.
- Enajenaciones de bienes patrimoniales.
- Prestación de servicios.
- Reembolsos de préstamos.

Requisitos:
- El ingreso debe estar reconocido jurídicamente (no ser solo una previsión).
- En ciertos casos, debe estar efectivamente recaudado.

No pueden generar crédito:
- Ingresos tributarios.
- Reintegros de pagos indebidos del presupuesto corriente.

Su tramitación está regulada por las bases de ejecución del presupuesto.`,

    "Incorporación de remanente": `Incorporación de remanente:
Permite trasladar créditos no gastados de un ejercicio al siguiente si cumplen los requisitos del art. 47 del RD 500/1990.

Supuestos típicos:
- Créditos concedidos en el último trimestre del año anterior.
- Créditos comprometidos pero no ejecutados.
- Créditos de operaciones de capital.
- Créditos ampliables asociados a ingresos afectados.

No pueden incorporarse:
- Créditos declarados no disponibles.
- Créditos ya incorporados anteriormente.

Debe garantizarse la existencia de recursos suficientes: remanente líquido de tesorería o ingresos excedentes.

Solo podrán aplicarse dentro del nuevo ejercicio y, en algunos casos, únicamente para el mismo destino original.`,

    "Baja por anulación": `Baja por anulación:
Es la reducción de créditos en una o varias aplicaciones del presupuesto de gastos (art. 49 y 50 RD 500/1990).

Requisitos:
- Que el crédito afectado esté disponible.
- Que su reducción no perturbe el servicio.
- Aprobación por el Pleno.

Usos típicos:
- Financiar créditos extraordinarios y suplementos.
- Atender desequilibrios financieros o ajustes en la ejecución.

Puede ser utilizada de forma coordinada con otras modificaciones.

También es aplicable para ajustar el presupuesto cuando no se ejecutan ingresos previstos.`,

    "Ajuste al alza": `Ajuste al alza:
Modificación presupuestaria excepcional en presupuestos prorrogados, para incorporar nuevas cargas financieras previstas (art. 21.3 RD 500/1990).

Solo se admite:
- Si hay compromisos firmes de gasto para el ejercicio en curso.
- Si hay margen presupuestario dentro de los créditos no prorrogables.

Está reconocido como una verdadera modificación presupuestaria por el PGCP local.

No puede usarse libremente: debe justificarse su necesidad técnica y jurídica.

Suele tramitarse mediante decreto o acuerdo del órgano competente, con informe previo.`
  };

  visor.textContent = textos[tipo] || "Seleccione un tipo de modificación para ver su explicación aquí.";
};

function activarAutocompletadoCampos() {
  const tabla = document.getElementById("tablaModificaciones");
  if (!tabla) return;

  tabla.addEventListener("input", e => {
    const fila = e.target.closest("tr");
    if (!fila) return;

    const programa = fila.cells[0].querySelector("input")?.value || "";
    const economica = fila.cells[1].querySelector("input")?.value || "";

    const area = programa.charAt(0) || "";
    fila.cells[2].querySelector("input").value = area;

    const capitulo = economica.charAt(0) || "";
    fila.cells[3].querySelector("input").value = capitulo;

    const aplicacion = programa && economica ? `${programa}-${economica}` : "";
    fila.cells[4].querySelector("input").value = aplicacion;
  });

  // ✅ Insertar una fila vacía inicial si la tabla está vacía
  const tbody = tabla.querySelector("tbody");
  if (tbody && tbody.children.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><button class="btn btn-primary btn-sm" onclick="this.closest('tr').remove()">X</button></td>`;
    tbody.appendChild(tr);
  }
}

function redactarInformeModificacionesDesdeFormulario() {
  const datos = obtenerDatosFormularioModificaciones();
  return redactarInformeModificaciones("", datos);
}

function redactarInformeModificaciones(textoActual, datos = {}) {
  let informe = [];

  informe.push(`0.- Estructura del Informe:
- Introducción
- Normativa Aplicable
- Identificación de la Modificación
- Regulación y Características del tipo de modificación
- Aplicaciones afectadas
- Conclusión`);

  informe.push(`1.- Introducción:
El presente informe tiene por objeto recoger y justificar la modificación presupuestaria propuesta, conforme a los datos aportados y la normativa aplicable.`);

  informe.push(`2.- Normativa Aplicable:
- TRLRHL: arts. 177 a 182
- Real Decreto 500/1990: arts. 34 a 51
- Orden EHA/3565/2008 sobre estructura presupuestaria
- LOEPSF: en lo relativo a estabilidad presupuestaria`);

  informe.push(`3.- Identificación de la Modificación:
Tipo de modificación: ${datos.tipoModificacion || 'No especificado'}
Financiación: ${datos.tipoFinanciacion || 'No especificada'}`);

  const doctrina = window.mostrarDoctrinaPorTipo?.toString();
  const textoDoctrinal = window.mostrarDoctrinaPorTipo?.__textos?.[datos.tipoModificacion] || document.getElementById("visorTipoModificacion")?.textContent || "[Texto doctrinal no disponible]";

  informe.push(`4.- Regulación y Características del tipo de modificación:
${textoDoctrinal}`);

  if (datos.aplicaciones && datos.aplicaciones.length > 0) {
    let tabla = `5.- Aplicaciones afectadas:<br><br>
<table border="1" cellpadding="4" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.75rem; text-align: center;">
<thead>
  <tr>
    <th>Aplicación</th>
    <th>Denominación</th>
    <th>Importe</th>
  </tr>
</thead>
<tbody>`;
    datos.aplicaciones.forEach(app => {
      const linea = `
  <tr>
    <td>${app.aplicacion}</td>
    <td style="width: calc(100% - 110px);">${app.denominacion || '-'}</td>
    <td style="width: 110px;">${parseFloat(app.importe).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</td>
  </tr>`;
tabla += linea;
    });
    tabla += "</tbody></table>";
informe.push(tabla);
  }

  if (datos.recursos && datos.recursos.length > 0) {
    // 📝 Generar frase resumen
    const resumen = datos.recursos
      .map(r => `${parseFloat(r.importe).toLocaleString('es-ES', { minimumFractionDigits: 2 })} € con cargo a ${r.tipo}`)
      .join(" y ");

    let tablaRecursos = `5 bis.- Recursos que financian la modificación:<br><br>
  <p style="margin-bottom: 1rem;">La modificación se financia con ${resumen}.</p>
  <table border="1" cellpadding="4" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 0.75rem; text-align: center;">
  <thead>
    <tr>
      <th>Tipo de recurso</th>
      <th>Importe</th>
    </tr>
  </thead>
  <tbody>`;

    datos.recursos.forEach(r => {
      tablaRecursos += `
    <tr>
      <td>${r.tipo}</td>
      <td>${parseFloat(r.importe).toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</td>
    </tr>`;
    });

    tablaRecursos += "</tbody></table>";
    informe.push(tablaRecursos);
  }

  informe.push(`6.- Conclusión:
De acuerdo con la documentación analizada, la modificación cumple los requisitos legales y presupuestarios, y puede tramitarse conforme al procedimiento ordinario establecido.`);

return informe.join("\n\n");
}

function obtenerDatosFormularioModificaciones() {
  const tipoModificacion = document.getElementById("tipoModificacion")?.value || "";
  const tipoFinanciacion = document.getElementById("tipoFinanciacion")?.value || "";
  const aplicaciones = [];
  const recursos = [];

  const tbody = document.getElementById("tablaModificaciones")?.querySelector("tbody");
  if (tbody) {
    for (const fila of tbody.querySelectorAll("tr")) {
      const celdas = fila.querySelectorAll("td input");
      if (celdas.length >= 7) {
        aplicaciones.push({
          programa: celdas[0].value.trim(),
          economica: celdas[1].value.trim(),
          area: celdas[2].value.trim(),
          capitulo: celdas[3].value.trim(),
          aplicacion: celdas[4].value.trim(),
          denominacion: celdas[5].value.trim(),
          importe: celdas[6].value.trim()
        });
      }
    }
  }

  const tbodyRecursos = document.getElementById("tablaFinanciacion")?.querySelector("tbody");
  if (tbodyRecursos) {
    for (const fila of tbodyRecursos.querySelectorAll("tr")) {
      const tipo = fila.cells[3]?.querySelector("select")?.value || "";
      const importe = fila.cells[4]?.querySelector("input")?.value || "";
      if (tipo && importe) {
        recursos.push({ tipo, importe });
      }
    }
  }

  return { tipoModificacion, tipoFinanciacion, aplicaciones, recursos };
}

window.insertarInformeTecnicoEnEditor = function () {
  const informe = redactarInformeModificacionesDesdeFormulario();

  if (!informe || informe.trim().length < 10) {
    alert("⚠️ El informe generado está vacío o incompleto.");
    return;
  }

  const editor = document.getElementById("editorTexto");
  if (!editor) {
    alert("⚠️ No se encontró el editor de texto.");
    return;
  }

  editor.innerHTML = informe;

  // ✅ Detectar bloques inmediatamente después de insertar el informe
  window.actualizarBloquesDesdeEditor();
};

window.abrirVisorExcelEnModal = function () {
  const modal = document.getElementById("modalExcelModificaciones");
  modal.style.display = "flex";

  const contenedor = document.getElementById("contenedorExcelModal");
  contenedor.innerHTML = "";

  if (!window.hotInstance) {
    contenedor.innerHTML = "<div class='text-danger'>No hay Excel cargado.</div>";
    return;
  }

  const datos = window.hotInstance.getData();
  const columnas = window.hotInstance.getColHeader();

  window.hotInstanceModal = new Handsontable(contenedor, {
    data: datos,
    colHeaders: columnas,
    rowHeaders: true,
    width: '100%',
    height: 400,
    licenseKey: 'non-commercial-and-evaluation',
    afterSelectionEnd(r1, c1, r2, c2) {
      window.ultimaSeleccionModal = { r1, c1, r2, c2 };
    }
  });
};

window.insertarFilasDesdeSeleccion = function () {
  const instancia = window.hotInstanceModal;
  const seleccion = window.ultimaSeleccionModal;

  if (!instancia || !seleccion) {
    alert("⚠️ No hay selección activa en el visor modal.");
    return;
  }

  const { r1, c1, r2, c2 } = seleccion;
  const data = instancia.getData(r1, c1, r2, c2);
  const tbody = document.querySelector("#tablaModificaciones tbody");

  data.forEach(fila => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input class="form-control form-control-sm" value="${fila[0] || ''}"></td>
      <td><input class="form-control form-control-sm" value="${fila[1] || ''}"></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value=""></td>
      <td><input class="form-control form-control-sm" value="${fila[2] || ''}"></td>
      <td><input class="form-control form-control-sm" value="${fila[3] || ''}"></td>
      <td><button class="btn btn-primary btn-sm" onclick="this.closest('tr').remove()">X</button></td>
    `;
    tbody.appendChild(tr);
	activarAutocompletadoEnFila(tr);
  });

  activarAutocompletadoCampos();
  document.getElementById("modalExcelModificaciones").style.display = "none";
};

function activarAutocompletadoEnFila(fila) {
  if (!fila) return;

  const programa = fila.cells[0].querySelector("input")?.value || "";
  const economica = fila.cells[1].querySelector("input")?.value || "";

  const area = programa.charAt(0) || "";
  fila.cells[2].querySelector("input").value = area;

  const capitulo = economica.charAt(0) || "";
  fila.cells[3].querySelector("input").value = capitulo;

  const aplicacion = programa && economica ? `${programa}-${economica}` : "";
  fila.cells[4].querySelector("input").value = aplicacion;
}

window.agregarFilaManualModificacion = function () {
  const tbody = document.querySelector("#tablaModificaciones tbody");
  if (!tbody) return;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input class="form-control form-control-sm" value=""></td>
    <td><input class="form-control form-control-sm" value=""></td>
    <td><input class="form-control form-control-sm" value=""></td>
    <td><input class="form-control form-control-sm" value=""></td>
    <td><input class="form-control form-control-sm" value=""></td>
    <td><input class="form-control form-control-sm" value=""></td>
    <td><input class="form-control form-control-sm" value=""></td>
    <td><button class="btn btn-primary btn-sm" onclick="this.closest('tr').remove()">X</button></td>
  `;
  tbody.appendChild(tr);
};
