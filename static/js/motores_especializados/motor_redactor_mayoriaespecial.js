// motor_redactor_mayoriaespecial.js

window.MotorMayoriaEspecial = (function () {
  function leer(id) {
    return document.getElementById(id)?.value || "";
  }

  function generarInforme() {
    const expediente_tramitado = leer("expediente_tramitado");
    const observacion_a = leer("observacion_a");
    const observacion_b = leer("observacion_b");
    const observacion_c = leer("observacion_c");
    const resultado_control = leer("resultado_control");

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO: MATERIAS SUJETAS A MAYORÍA ESPECIAL O SOLICITUD DEL PRESIDENTE/1/3 CORPORATIVOS

PRIMERO. Necesidad de informe previo de Intervención

De conformidad con el artículo 54 del Real Decreto Legislativo 781/1986 y el artículo 4.1.b.5º del Real Decreto 128/2018, se requiere informe previo de Intervención en los supuestos en que se trate de materias que requieran mayoría especial para su aprobación, o cuando así lo solicite el Presidente de la Corporación o un tercio de sus miembros.

Dicho informe debe verificar, como mínimo, la legislación aplicable y la adecuación del acuerdo proyectado a dicha normativa.

SEGUNDO. Legislación aplicable

- Artículo 4.1.b.5º del Real Decreto 128/2018, de 16 de marzo.
- Artículo 54 del Real Decreto Legislativo 781/1986, de 18 de abril.
- Artículo 47.2 de la Ley 7/1985, de 2 de abril, reguladora de las Bases del Régimen Local.

TERCERO. Análisis del expediente

Se tramita en esta Entidad el expediente relativo a:  
📁 ${expediente_tramitado}

Analizada la documentación y consultada la legislación aplicable, esta Intervención emite las siguientes observaciones sobre el contenido económico-financiero o presupuestario:

- ${observacion_a}
- ${observacion_b}
- ${observacion_c}

CONCLUSIÓN

Resultado del control permanente previo:  
✅ ${resultado_control}
    `;

    document.getElementById("salida_redaccion").value = texto.trim();
  }

  return {
    generarInforme
  };
})();
