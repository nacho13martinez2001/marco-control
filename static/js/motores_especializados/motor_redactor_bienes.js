const MotorBienes = {
  actualizarFormulario: function () {
    const tipo = document.getElementById("tipoInformeBienes").value;
    const bloqueEnajenacion = document.getElementById("formularioEnajenacion");
    if (tipo === "cesion") {
      bloqueEnajenacion.style.display = "none";
    } else {
      bloqueEnajenacion.style.display = "block";
    }
    this.actualizarVisor();
  },

  actualizarVisor: function () {
    const tipo = document.getElementById("tipoInformeBienes").value;
    let texto = "";

    if (tipo === "cesion") {
      texto = "📝 Informe sobre cesión gratuita: No existe deuda pendiente.";
    } else {
      const valor = parseFloat(document.getElementById("valor_bien").value || "0");
      const porcentaje = parseFloat(document.getElementById("porcentaje_valor").value || "0");
      texto = `Valor del bien: ${valor.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
Porcentaje sobre el Presupuesto de Gastos: ${porcentaje.toFixed(2)} %`;
    }

    document.getElementById("visorBienes").innerText = texto;
  },

  generarInforme: function () {
    const tipo = document.getElementById("tipoInformeBienes").value;

    let informe = "";

    if (tipo === "cesion") {
      informe = `Informe de ausencia de deuda pendiente de liquidar con cargo al Presupuesto para los supuestos de cesión gratuita de bienes

1.- Marco jurídico y condiciones de la cesión gratuita
El artículo 109 del Reglamento de Bienes de las Entidades Locales, aprobado por Real Decreto 1372/1986, de 13 de junio, regula las cesiones gratuitas de bienes de titularidad municipal, señalando que:
“Las entidades locales podrán ceder gratuitamente, mediante acuerdo plenario, el uso o la propiedad de sus bienes a otras Administraciones Públicas o a entidades sin ánimo de lucro, siempre que se destinen a fines que redunden en beneficio de los vecinos.”
Asimismo, el citado precepto exige como requisito previo imprescindible que no exista deuda pendiente de liquidar con cargo al presupuesto que esté vinculada al bien objeto de cesión.
Esta previsión tiene por finalidad garantizar la integridad del patrimonio municipal, evitar afecciones financieras no resueltas y preservar el equilibrio presupuestario de la entidad local.
En virtud de lo anterior, corresponde a la Intervención verificar que no existen obligaciones pendientes que puedan comprometer la legalidad o viabilidad de la cesión gratuita propuesta.

2.- Verificación del cumplimiento del requisito de inexistencia de deuda
Conforme a lo establecido en el artículo 109 del Reglamento de Bienes, se ha procedido a verificar si, a la fecha de emisión del presente informe, existen obligaciones pendientes de pago vinculadas al bien objeto de cesión.
A tal efecto, se ha solicitado la información contable correspondiente a:
•	Facturas no reconocidas o pendientes de tramitación.
•	Obligaciones reconocidas y no pagadas.
•	Compromisos financieros relacionados con el mantenimiento, conservación, tributos, suministros o inversiones que afecten al bien.
De la revisión efectuada sobre el ejercicio en curso y los anteriores aún no cerrados, no se han identificado obligaciones pendientes de liquidación con cargo al presupuesto municipal que afecten al inmueble objeto de cesión gratuita.
Por tanto, se cumple el requisito exigido normativamente, en cuanto a la inexistencia de deuda pendiente asociada al bien.


3.- Consideración final del órgano interventor
Una vez comprobado que la cesión gratuita del bien propuesto no se ve afectada por obligaciones pendientes de liquidar con cargo al presupuesto, y que, por tanto, se cumple el requisito previo exigido en el artículo 109 del Reglamento de Bienes, esta Intervención:
•	No formula objeciones desde el punto de vista financiero-presupuestario a la tramitación del expediente.
•	Recuerda que la cesión deberá ser formalizada mediante el correspondiente acuerdo plenario, en los términos establecidos por la normativa patrimonial.
•	Señala que deberá garantizarse el seguimiento posterior del cumplimiento del destino impuesto, de conformidad con lo previsto en los artículos 109 y 110 del citado Reglamento.
En consecuencia, se considera que concurren los requisitos necesarios para la tramitación y eventual aprobación de la cesión gratuita propuesta.


4.- CONCLUSIÓN
Examinado el expediente de cesión gratuita del bien de titularidad municipal descrito, y verificada la inexistencia de obligaciones pendientes de liquidación con cargo al presupuesto municipal vinculadas al mismo:
Esta Intervención informa favorablemente sobre la tramitación de la cesión gratuita, de conformidad con lo establecido en el artículo 109 del Reglamento de Bienes de las Entidades Locales.
Ello, sin perjuicio de las condiciones y controles que correspondan en cuanto a su ejecución, formalización y seguimiento del destino del bien cedido.
`;
    } else {
      const valor = parseFloat(document.getElementById("valor_bien").value || "0");
      const porcentaje = parseFloat(document.getElementById("porcentaje_valor").value || "0");
      const valorTexto = valor.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

      if (tipo === "enajenacion_mayor") {
        informe = `Informe de enajenación de bienes patrimoniales cuyo valor exceda del 20% de los recursos ordinarios del Presupuesto

1.- Marco jurídico y procedimiento
De conformidad con el artículo 137.1 y 137.2 de la Ley 33/2003, de 3 de noviembre, del Patrimonio de las Administraciones Públicas, la enajenación de inmuebles patrimoniales podrá llevarse a cabo mediante subasta, concurso o adjudicación directa, según proceda.
Adicionalmente, el artículo 47.2 de la Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local, establece que cuando el valor del bien a enajenar supere el 20 % de los recursos ordinarios del presupuesto, el acuerdo deberá ser adoptado por el pleno de la Corporación con el voto favorable de la mayoría absoluta del número legal de sus miembros.
En consecuencia, la enajenación de bienes de esta naturaleza requiere tanto la adecuación procedimental como el requisito reforzado de mayoría absoluta, dada su trascendencia patrimonial y financiera.

2.- Legislación aplicable
La enajenación de bienes patrimoniales de titularidad municipal cuyo valor exceda el 20 % de los recursos ordinarios del presupuesto se encuentra regulada por las siguientes disposiciones:
•	Ley 33/2003, de 3 de noviembre, del Patrimonio de las Administraciones Públicas, especialmente en sus artículos 137 y concordantes, que establecen los procedimientos y condiciones para la enajenación de bienes inmuebles patrimoniales.
•	Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local, que en su artículo 47.2 exige mayoría absoluta del número legal de miembros del Pleno para adoptar acuerdos relativos a la enajenación de bienes cuando el valor del bien supere el 10 % del presupuesto ordinario. No obstante, algunas normativas autonómicas elevan este umbral al 20 %, circunstancia que debe analizarse caso por caso.
•	Texto Refundido de las Disposiciones Legales vigentes en materia de Régimen Local (Real Decreto Legislativo 781/1986), que incorpora previsiones específicas sobre gestión patrimonial de las entidades locales.
•	Reglamento de Bienes de las Entidades Locales, aprobado por Real Decreto 1372/1986, de 13 de junio, que regula el procedimiento de valoración, tasación, desafectación y enajenación de bienes patrimoniales.
La correcta aplicación de esta normativa resulta esencial para garantizar la legalidad del procedimiento, la protección del interés público y la adecuada gestión del patrimonio municipal.


3.- Análisis técnico y observaciones
Una vez revisado el expediente y la documentación incorporada, esta Intervención formula las siguientes consideraciones:
1.  El valor del bien asciende a ${valorTexto}, lo que representa un ${porcentaje.toFixed(2)} % del presupuesto de gastos.
2.  Al superar dicho umbral, será necesario adoptar el acuerdo plenario correspondiente con informe técnico, tasación actualizada y justificación de interés público.
3.	Compatibilidad con la sostenibilidad financiera
La operación de enajenación se plantea dentro de un marco de racionalización patrimonial. No se ha detectado riesgo de desequilibrio económico, ni incumplimiento de las reglas fiscales, siempre que el ingreso previsto se incorpore correctamente al presupuesto.
4.	Observaciones adicionales. En caso de que el bien haya estado afecto a un servicio público o haya sido adscrito a una finalidad específica, deberá acreditarse formalmente su desafectación mediante acuerdo expreso.
detectado riesgo de desequilibrio económico, ni incumplimiento de las reglas fiscales, siempre que el ingreso previsto se incorpore correctamente al presupuesto.
4.	Observaciones adicionales
En caso de que el bien haya estado afecto a un servicio público o haya sido adscrito a una finalidad específica, deberá acreditarse formalmente su desafectación mediante acuerdo expreso.
A juicio de esta Intervención, el expediente está correctamente formulado desde el punto de vista financiero-contable, y se ajusta a la legalidad vigente, sin perjuicio del cumplimiento del procedimiento completo hasta su aprobación definitiva.


4.- CONCLUSIÓN
Examinada la documentación relativa al expediente de enajenación del bien patrimonial descrito, y verificado que su valor supera el 20 % de los recursos ordinarios del presupuesto municipal, esta Intervención:
Informa favorablemente la tramitación del procedimiento, condicionada al cumplimiento de los siguientes extremos:
•	Que la valoración del bien sea ratificada por los servicios técnicos competentes.
•	Que el acuerdo de enajenación sea adoptado por el Pleno, con el voto favorable de la mayoría absoluta del número legal de sus miembros, conforme al artículo 47.2 de la Ley 7/1985.
•	Que se garantice la incorporación del ingreso derivado de la operación a la estructura presupuestaria correspondiente, en los términos establecidos por la legislación vigente.
Ello, sin perjuicio de los informes jurídicos, técnicos o patrimoniales que resulten preceptivos en función del bien y su régimen de uso o afectación.
`;
      } else {
        informe = `Informe de control permanente previo de enajenación de bienes patrimoniales cuyo valor no exceda del 20% de los recursos ordinarios del Presupuesto

1.- Marco jurídico y procedimiento
De conformidad con el artículo 137.1 y 137.2 de la Ley 33/2003, de 3 de noviembre, del Patrimonio de las Administraciones Públicas, la enajenación de inmuebles patrimoniales podrá llevarse a cabo mediante subasta, concurso o adjudicación directa, según proceda.
En el ámbito local, la enajenación de bienes patrimoniales se regula asimismo por la Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local, y el Reglamento de Bienes de las Entidades Locales, aprobado por Real Decreto 1372/1986.
En aquellos supuestos en los que el valor del bien no supera el 20 % de los recursos ordinarios del presupuesto municipal, el acuerdo podrá ser adoptado por mayoría simple del Pleno, sin necesidad del voto favorable de la mayoría absoluta.

2.- Legislación aplicable
La normativa principal aplicable al expediente es la siguiente:
•	Ley 33/2003, de 3 de noviembre, del Patrimonio de las Administraciones Públicas, artículos 137 y concordantes.
•	Ley 7/1985, de 2 de abril, Reguladora de las Bases del Régimen Local, artículo 47.2, en lo relativo a las mayorías exigidas para enajenación de bienes patrimoniales.
•	Real Decreto Legislativo 781/1986, por el que se aprueba el Texto Refundido de las Disposiciones Legales vigentes en materia de Régimen Local.
•	Reglamento de Bienes de las Entidades Locales, aprobado por Real Decreto 1372/1986, especialmente en materia de valoración, desafectación y procedimiento de enajenación.
La adecuación formal y sustantiva al marco normativo es condición imprescindible para la validez del acuerdo de enajenación.

3.– Análisis técnico y observaciones
1.  El valor del bien es de ${valorTexto}, lo que supone un ${porcentaje.toFixed(2)} % del presupuesto, por lo que se encuentra dentro del umbral autorizado.
2.	Impacto financiero y presupuestario
3.  El ingreso previsto, una vez realizado el procedimiento, se integrará en el presupuesto mediante la oportuna modificación presupuestaria, cumpliendo con los principios de estabilidad y sostenibilidad financiera.
4.	Otras observaciones. En caso de que el bien hubiera estado afecto a uso público o servicio, debe acreditarse su previa desafectación, conforme al artículo 8 del Reglamento de Bienes.

4.- CONCLUSIÓN
Analizado el expediente de enajenación del bien patrimonial y constatado que su valor no excede del 20 % de los recursos ordinarios del presupuesto municipal, esta Intervención:
Informa favorablemente la continuación del procedimiento de enajenación, condicionado a:
•	La validez del informe de valoración emitido por el servicio técnico correspondiente.
•	La adopción del acuerdo plenario por mayoría simple, conforme al artículo 47.2 de la Ley 7/1985.
•	La correcta imputación presupuestaria del ingreso derivado, conforme al Plan General de Contabilidad Pública.
Todo ello sin perjuicio de los informes adicionales exigidos por la normativa patrimonial y urbanística aplicable.
`;
      }
    }

    
    const editor = document.getElementById("editorTexto");
    if (!editor) {
      alert("⚠️ No se encontró el editor de texto.");
      return;
    }
    editor.innerText = informe;

    // ✅ Activar detección de bloques si está definida
    if (typeof window.actualizarBloquesDesdeEditor === "function") {
      window.actualizarBloquesDesdeEditor();
    }

  }
};

document.addEventListener("DOMContentLoaded", function () {
  const selector = document.getElementById("tipoInformeBienes");
  if (selector) {
    selector.addEventListener("change", MotorBienes.actualizarFormulario);
    MotorBienes.actualizarFormulario(); // ← activa el formulario según el valor inicial
  }
});