// motor_redactor_endeudamiento.js

window.MotorEndeudamiento = (function () {

  function obtenerDatos() {
    const leer = (id) => document.getElementById(id).value;

    const ejercicio = leer("ejercicio_analisis");
    const ahorro_neto = parseFloat(leer("ahorro_neto").replace(",", ".")) || 0;
    const deuda_viva = parseFloat(leer("deuda_viva").replace(",", ".")) || 0;

    const cumple_prudencia = leer("cumple_prudencia"); // "sí" / "no"
    const detalle_coste = leer("detalle_coste");
    const capacidad_pago = leer("capacidad_pago");     // "sí" / "no"
    const fecha_informe_tesoreria = leer("fecha_informe_tesoreria");

    let conclusion_endeudamiento = "";
    let resultado_control_prev = "";

    if (ahorro_neto > 0 && deuda_viva <= 75) {
      conclusion_endeudamiento = "puede concertarse la operación sin autorización externa.";
      resultado_control_prev = "FAVORABLE, al cumplir todos los requisitos de endeudamiento establecidos legalmente.";
    } else if (ahorro_neto > 0 && deuda_viva <= 110) {
      conclusion_endeudamiento = "requiere autorización del órgano de tutela financiera.";
      resultado_control_prev = "FAVORABLE, condicionado a la obtención de autorización del órgano de tutela financiera.";
    } else {
      conclusion_endeudamiento = "no puede concertarse la operación conforme a la normativa vigente.";
      resultado_control_prev = "DESFAVORABLE, por incumplimiento de los requisitos legales de endeudamiento.";
    }

    return {
      ejercicio,
      ahorro_neto,
      deuda_viva,
      conclusion_endeudamiento,
      cumple_prudencia,
      detalle_coste,
      capacidad_pago,
      fecha_informe_tesoreria,
      resultado_control_prev
    };
  }

  function generarInforme() {
    const d = obtenerDatos();

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO DE AUTORIZACIÓN DE LA CONCERTACIÓN DE OPERACIÓN DE CRÉDITO A LARGO PLAZO POR UN ENTE DEPENDIENTE SECTORIZADO

PRIMERO. Marco normativo aplicable
La concertación de operaciones de crédito por entidades locales y sus entes dependientes se rige por los artículos 48 a 55 del Texto Refundido de la Ley Reguladora de las Haciendas Locales (TRLHL), aprobado por Real Decreto Legislativo 2/2004, de 5 de marzo. Estas operaciones deberán contar con informe de la Intervención y respetar los principios de regularidad procedimental, presupuesto aprobado, límite de deuda y prudencia financiera.

SEGUNDO. Régimen competencial
De conformidad con el artículo 54 del TRLHL, corresponde al Pleno de la Corporación, previo informe de la Intervención, autorizar la concertación de operaciones de crédito a largo plazo por parte de organismos autónomos y entes o sociedades mercantiles municipales.

TERCERO. Condición presupuestaria
En virtud del artículo 50 del TRLHL, es requisito imprescindible para este tipo de operaciones que exista presupuesto aprobado para el ejercicio en curso. La situación de prórroga presupuestaria no habilita a los entes dependientes para concertar operaciones a largo plazo, a diferencia de la entidad matriz.

CUARTO. Cumplimiento de los requisitos de endeudamiento
Conforme a la Disposición Final Trigésima Primera de la Ley 17/2012, en relación con el artículo 53 del TRLHL, se distinguen los siguientes escenarios:

Se han verificado los valores correspondientes al ejercicio ${d.ejercicio}, resultando:
- Ahorro neto: ${d.ahorro_neto.toLocaleString()} €
- Deuda viva: ${d.deuda_viva.toFixed(2)} %
- Conclusión: ${d.conclusion_endeudamiento}

QUINTO. Principio de prudencia financiera
De acuerdo con el artículo 48 bis del TRLHL, las operaciones financieras deben cumplir el principio de prudencia financiera, según los límites fijados por el Ministerio de Hacienda.

En el informe emitido por Tesorería con fecha ${d.fecha_informe_tesoreria}, se constata que la operación ${d.cumple_prudencia === "sí" ? "CUMPLE" : "NO CUMPLE"} los límites de diferencial y comisiones máximas establecidos, situándose su coste total ${d.detalle_coste}.

SEXTO. Capacidad de pago consolidada
Analizada la evolución del ahorro neto y del nivel de endeudamiento de la entidad matriz junto con el ente solicitante, conforme a la herramienta de planificación presupuestaria utilizada, se concluye que:

La entidad ${d.capacidad_pago === "sí" ? "CUENTA" : "NO CUENTA"} con capacidad de pago suficiente para asumir la carga financiera derivada de la operación a lo largo de su vigencia.

CONCLUSIÓN
A la vista de lo anterior, el resultado del control permanente previo sobre la operación de crédito propuesta es:
${d.resultado_control_prev}
    `;

    document.getElementById("salida_redaccion").value = texto.trim();
  }

  return {
    generarInforme
  };

})();
