
const MotorPersonal = {
  generarInforme: function () {
    const tipo_actuacion = document.getElementById("tipo_actuacion").value;
    const total_puestos = document.getElementById("total_puestos").value;
    const puestos_modificados = document.getElementById("puestos_modificados").value;
    const puestos_nuevos_suprimidos = document.getElementById("puestos_nuevos_suprimidos").value;
    const valoracion_tecnica = document.getElementById("valoracion_tecnica").value;

    const coste_total = document.getElementById("coste_total").value;
    const comparacion_presupuesto = document.getElementById("comparacion_presupuesto").value;
    const capitulo_1_suficiente = document.getElementById("capitulo_1_suficiente").value;
    const modificacion_presupuestaria = document.getElementById("modificacion_presupuestaria").value;
    const impacto_reglas_fiscales = document.getElementById("impacto_reglas_fiscales").value;
    const conclusion_viabilidad = document.getElementById("conclusion_viabilidad").value;

    const resultado_control = document.getElementById("resultado_control").value;
    const motivos_resultado = document.getElementById("motivos_resultado").value;
    const observaciones = document.getElementById("observaciones").value;

    let texto = `PRIMERO. Marco legal y naturaleza de la RPT
De acuerdo con el artículo 74 del EBEP, las AAPP deben estructurar su organización a través de Relaciones de Puestos de Trabajo (RPT).
La RPT detalla requisitos, forma de provisión, clasificación y funciones.
Debe ser objeto de negociación con sindicatos (art. 37.m EBEP).

SEGUNDO. Normativa aplicable
- Art. 74 y 37 del EBEP (RD Legislativo 5/2015).
- RD 861/1986.
- Arts. 90 y 91 LBRL.
- TRLRHL.
- Presupuesto General vigente.
- Normativa autonómica aplicable.

TERCERO. Análisis técnico del documento RPT
La RPT ${tipo_actuacion}, afectando a:
- Total puestos: ${total_puestos}
- Modificados: ${puestos_modificados}
- Nuevos/suprimidos: ${puestos_nuevos_suprimidos}
Desde el punto de vista técnico, el documento ${valoracion_tecnica} los principios de ordenación, jerarquía y adecuación a funciones.

CUARTO. Evaluación económico-presupuestaria
- Coste estimado tras modificación: ${coste_total} €
- Comparación con presupuesto: ${comparacion_presupuesto}
- ¿Capítulo 1 suficiente?: ${capitulo_1_suficiente}
- ¿Necesita modificación presupuestaria?: ${modificacion_presupuestaria}
- Impacto fiscal: ${impacto_reglas_fiscales}
El análisis económico-financiero ${conclusion_viabilidad} los principios de estabilidad y suficiencia.

RESULTADO DEL CONTROL PREVIO
Resultado: ${resultado_control}
Motivos: ${motivos_resultado}
Observaciones: ${observaciones}`;

    document.getElementById("salida_redaccion").value = texto;
  }
};
