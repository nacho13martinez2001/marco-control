// motor_redactor_pms.js

window.MotorPMS = (function () {
  function obtenerDatos() {
    const leer = (id) => document.getElementById(id).value || "";

    const ejercicio_presupuesto = leer("ejercicio_presupuesto");
    const fecha_aprobacion_presupuesto = leer("fecha_aprobacion_presupuesto");
    const fecha_publicacion_bop = leer("fecha_publicacion_bop");
    const fecha_liquidacion = leer("fecha_liquidacion");
    const ejercicio_liquidacion = leer("ejercicio_liquidacion");
    const acuerdo_pleno_fecha = leer("acuerdo_pleno_fecha");
    const importe_destinado = leer("importe_destinado");
    const tipo_deuda = leer("tipo_deuda");
    const organismo_tutela = leer("organismo_tutela");
    const fecha_autorizacion = leer("fecha_autorizacion");

    return {
      ejercicio_presupuesto,
      fecha_aprobacion_presupuesto,
      fecha_publicacion_bop,
      fecha_liquidacion,
      ejercicio_liquidacion,
      acuerdo_pleno_fecha,
      importe_destinado,
      tipo_deuda,
      organismo_tutela,
      fecha_autorizacion
    };
  }

  function actualizarVisor() {
    const d = obtenerDatos();
    const visor = document.getElementById("visorPMS");

    visor.innerHTML = `
      <strong>Informe sobre destino del Patrimonio Municipal del Suelo a reducción de deuda</strong><br><br>
      1. El presupuesto del ejercicio ${d.ejercicio_presupuesto} fue aprobado el ${d.fecha_aprobacion_presupuesto} y publicado en el BOP el ${d.fecha_publicacion_bop}.<br>
      2. La liquidación del presupuesto del ejercicio ${d.ejercicio_liquidacion} fue aprobada el ${d.fecha_liquidacion}.<br>
      3. Se acredita la actualización del Registro del Patrimonio Municipal del Suelo y la correcta contabilización de sus partidas.<br>
      4. El Acuerdo del Pleno de fecha ${d.acuerdo_pleno_fecha} establece que ${d.importe_destinado} € se destinarán a amortizar deuda de tipo ${d.tipo_deuda}.<br>
      5. El acuerdo fue remitido al órgano de tutela financiera (${d.organismo_tutela}), obteniéndose la autorización el ${d.fecha_autorizacion}.<br>
      6. Se contempla la reposición del importe dispuesto en un plazo máximo de diez años, conforme al artículo 52 del TRLSRU.
    `;
  }

  function generarInforme() {
    const d = obtenerDatos();

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO: DESTINO DEL PATRIMONIO MUNICIPAL DEL SUELO A REDUCCIÓN DE DEUDA

1. El presupuesto del ejercicio ${d.ejercicio_presupuesto} fue aprobado por el Pleno el ${d.fecha_aprobacion_presupuesto}, publicándose en el BOP con fecha ${d.fecha_publicacion_bop}. Asimismo, se aprobó la liquidación del presupuesto del ejercicio ${d.ejercicio_liquidacion} el día ${d.fecha_liquidacion}, sin existir ejercicios pendientes de liquidación.

2. El Registro del Patrimonio Municipal del Suelo está actualizado y las partidas presupuestarias se encuentran debidamente contabilizadas.

3. Mediante Acuerdo del Pleno de fecha ${d.acuerdo_pleno_fecha}, y conforme al informe técnico y al Inventario de Bienes, se justifica que los fondos no son necesarios para fines propios del Patrimonio Municipal del Suelo, destinándose ${d.importe_destinado} € a la reducción de deuda ${d.tipo_deuda}.

4. Se remitió el acuerdo al órgano de tutela financiera (${d.organismo_tutela}), quien otorgó su autorización el ${d.fecha_autorizacion}.

5. La entidad se compromete a reponer dichos fondos en un plazo máximo de 10 años, conforme a las anualidades establecidas por Acuerdo Plenario y recogidas en los presupuestos de ejercicios futuros.

Este informe se emite al amparo del artículo 52 del TRLSRU, del artículo 213 del TRLRHL y del marco normativo de control interno de las entidades locales.
`.trim();

    const editor = document.getElementById("editorTexto");
    if (!editor) {
      alert("⚠️ No se encontró el editor de texto.");
      return;
    }
    editor.innerText = texto;

    if (typeof window.actualizarBloquesDesdeEditor === "function") {
      window.actualizarBloquesDesdeEditor();
    }
  }

  return {
    actualizarVisor,
    generarInforme
  };
})();