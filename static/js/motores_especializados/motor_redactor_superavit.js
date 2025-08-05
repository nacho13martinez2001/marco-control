// motor_redactor_superavit.js

window.MotorSuperavit = (function () {
  function obtenerDatos() {
    const leer = (id) => parseFloat(document.getElementById(id).value.replace(",", ".")) || 0;

    const resultado_estabilidad = leer("resultado_estabilidad");
    const remanente_tesoreria = leer("remanente_tesoreria");
    const deuda_viva = leer("deuda_viva");
    const porcentaje_deuda = leer("porcentaje_deuda");
    
  const superavit_sec = Math.min(resultado_estabilidad, remanente_tesoreria, deuda_viva);
  document.getElementById("superavit_sec").value = superavit_sec.toFixed(2);

  let importe_aplicable = superavit_sec;
  if (porcentaje_deuda > 110) {
    importe_aplicable = 0;
  }

  document.getElementById("importe_aplicable_superavit").value = importe_aplicable.toFixed(2);


    return {
      resultado_estabilidad,
      remanente_tesoreria,
      deuda_viva,
      porcentaje_deuda,
      superavit_sec,
      importe_aplicable_superavit: importe_aplicable.toFixed(2),
      cumple_estabilidad: "✔",
      cumple_remanente: "✔",
      cumple_endeudamiento: "✔"
    };
  }

  function actualizarVisor() {
    const d = obtenerDatos();
    const visor = document.getElementById("visorSuperavit");
    visor.innerHTML = `
      Estabilidad presupuestaria: ${d.resultado_estabilidad.toLocaleString()} €<br>
      Remanente de Tesorería: ${d.remanente_tesoreria.toLocaleString()} €<br>
      Deuda viva: ${d.deuda_viva.toLocaleString()} €<br>
      % deuda / ingresos: ${d.porcentaje_deuda.toLocaleString()} %<br>
      Superávit SEC: ${d.superavit_sec.toLocaleString()} €<br>
      <strong>💡 Importe aplicable: ${d.importe_aplicable_superavit.toLocaleString()} €</strong>
    `;
  }

  function generarInforme() {
    const d = obtenerDatos();

    
  let conclusion_deuda = "";
  if (d.porcentaje_deuda <= 75) {
    conclusion_deuda = "puede aplicarse el superávit sin necesidad de autorización externa, siempre que el ahorro neto sea positivo.";
  } else if (d.porcentaje_deuda <= 110) {
    conclusion_deuda = "será necesaria la autorización del órgano de tutela financiera para aplicar el superávit a amortización de deuda.";
  } else {
    conclusion_deuda = "no podrá aplicarse el superávit a amortización de deuda conforme a la normativa vigente, salvo excepciones específicas.";
  }

  const texto = `
INFORME DE CONTROL PERMANENTE PREVIO PARA LA APLICACIÓN DEL SUPERÁVIT PRESUPUESTARIO.

1.- Definición y régimen general de aplicación del superávit

El superávit presupuestario se define como la capacidad de financiación en términos consolidados, de acuerdo con los criterios del Sistema Europeo de Cuentas (SEC).

Su aplicación se rige por el siguiente régimen jurídico:

Artículo 32 de la Ley Orgánica 2/2012, de 27 de abril, de Estabilidad Presupuestaria y Sostenibilidad Financiera: establece, con carácter general, que el superávit deberá destinarse a reducir el nivel de endeudamiento neto de la entidad, con el límite del volumen de deuda viva si este fuera inferior al importe del superávit.

Disposición Adicional Sexta de la misma Ley: cuando resulta expresamente habilitada por norma con rango legal, permite la aplicación del superávit a usos alternativos distintos de la amortización de deuda, tales como la financiación de inversiones financieramente sostenibles o la cancelación de obligaciones pendientes, siempre que se cumplan determinados requisitos de sostenibilidad financiera.

Disposición Adicional 16ª del Texto Refundido de la Ley Reguladora de las Haciendas Locales: actúa como norma de integración en el ámbito local, permitiendo a las entidades aplicar dichos destinos alternativos solo cuando hayan sido habilitados por la legislación estatal.

Nota contextual (Ejercicio 2025): En este ejercicio, no se encuentra habilitada con carácter general la Disposición Adicional Sexta de la LOEPySF, salvo para las entidades expresamente incluidas en el Real Decreto-ley 6/2024, de 5 de noviembre (DANA).

2.- Normativa de aplicación

La aplicación del superávit presupuestario por parte de las entidades locales se encuentra regulada por el siguiente marco normativo:

• Artículo 32 de la Ley Orgánica 2/2012, de 27 de abril, de Estabilidad Presupuestaria y Sostenibilidad Financiera (LOEPySF):
Establece, con carácter general y permanente, que el superávit presupuestario deberá destinarse a reducir el nivel de endeudamiento neto de la entidad, siempre con el límite del volumen de endeudamiento si este fuera inferior al importe del superávit.

El importe aplicable será el menor entre:

El saldo de capacidad de financiación en términos de contabilidad nacional (SEC),

El Remanente de Tesorería para Gastos Generales,

Y el volumen de deuda viva.

Este artículo es plenamente aplicable en el ejercicio 2025, en ausencia de habilitación legal expresa para destinos alternativos.

• Disposición Adicional 6ª de la misma Ley Orgánica 2/2012:
Permite, de forma excepcional y condicionada, aplicar el superávit presupuestario a destinos distintos de la amortización de deuda, como:

Cancelación de obligaciones pendientes de aplicar a presupuesto (cuenta 413),

Inversiones financieramente sostenibles (IFS),

Otros gastos autorizados mediante norma estatal.

Para ello deben cumplirse requisitos adicionales: estabilidad presupuestaria positiva, remanente ajustado positivo, deuda viva inferior al 110 % de los ingresos corrientes liquidados y período medio de pago inferior a 30 días.

En el ejercicio 2025, esta disposición NO se encuentra habilitada con carácter general, salvo para entidades locales expresamente incluidas en el anexo del Real Decreto-ley 6/2024, de 5 de noviembre, relativo a medidas urgentes por daños causados por la DANA.

• Disposición Adicional 16ª del Texto Refundido de la Ley Reguladora de las Haciendas Locales (TRLRHL):
Actúa como norma de conexión entre la legislación orgánica estatal y el régimen presupuestario local, permitiendo a las entidades locales incorporar en su operativa contable la aplicación excepcional del superávit cuando así lo autorice la normativa estatal.

En 2025, esta disposición solo tiene efecto si concurre habilitación legal previa de la DA 6ª de la LOEPySF. En ausencia de dicha habilitación (como ocurre de forma general este ejercicio), la DA 16ª no resulta aplicable.

3.- Requisitos según el artículo 32 de la Ley Orgánica de Estabilidad Presupuestaria y Sostenibilidad Financiera

De acuerdo con el artículo 32 de la Ley Orgánica 2/2012, de 27 de abril, el superávit presupuestario de las entidades locales deberá destinarse a la amortización de deuda, siempre con el límite del volumen de endeudamiento existente si este fuera inferior al importe del superávit.

Para ello, se deberán verificar los siguientes requisitos:

a) Estabilidad presupuestaria positiva

De conformidad con la liquidación del ejercicio 2024 aprobada por el órgano competente, la capacidad o necesidad de financiación en términos consolidados, conforme a los criterios del SEC, arroja un resultado de:

${d.resultado_estabilidad} €
⇒ ${d.cumple_estabilidad} el requisito de estabilidad presupuestaria positiva.

b) Remanente de Tesorería para Gastos Generales positivo

Según el resultado de la liquidación, el Remanente de Tesorería para Gastos Generales a 31 de diciembre de 2024 asciende a:

${d.remanente_tesoreria} €
⇒ ${d.cumple_remanente} el requisito de remanente positivo.

c) Nivel de endeudamiento

La deuda viva de la entidad a 31 de diciembre de 2024 es de:

${d.deuda_viva} €

Porcentaje sobre los ingresos corrientes liquidados del ejercicio anterior:

${d.porcentaje_deuda} %
⇒ ${d.cumple_endeudamiento} el requisito de nivel de endeudamiento.

Aplicación del superávit

En aplicación del artículo 32 de la LOEPySF, el importe del superávit presupuestario que puede destinarse a amortización de deuda será el menor entre:

El saldo de capacidad de financiación calculado conforme al sistema europeo de cuentas (SEC): ${d.superavit_sec} €

El importe del Remanente de Tesorería para Gastos Generales: ${d.remanente_tesoreria} €

El volumen de deuda viva (si fuera inferior): ${d.deuda_viva} €

✅ Importe máximo aplicable: ${d.importe_aplicable_superavit} €

4.- Cumplimiento de los requisitos de endeudamiento

De conformidad con la Disposición Final Trigésima Primera de la Ley 17/2012, en relación con el artículo 53 del Texto Refundido de la Ley Reguladora de las Haciendas Locales, el cumplimiento de los requisitos de endeudamiento se evalúa en función del porcentaje que representa la deuda viva sobre los ingresos corrientes liquidados consolidados, resultando las siguientes situaciones:

• Si dicho porcentaje es igual o inferior al 75 %, y el ahorro neto es positivo, la aplicación del superávit a la amortización de deuda no requiere autorización del órgano de tutela financiera.

• Si el porcentaje se encuentra entre el 75 % y el 110 %, será necesario obtener dicha autorización.

• Si el porcentaje supera el 110 %, la operación no podrá realizarse, salvo excepciones muy tasadas.

En el presente caso, la deuda viva representa el ${d.porcentaje_deuda.toFixed(2)} % de los ingresos corrientes liquidados. En consecuencia, ${conclusion_deuda}.

5.- CONCLUSIÓN:

De conformidad con lo dispuesto en el artículo 32 de la Ley Orgánica 2/2012, y una vez verificados los requisitos exigidos, el superávit presupuestario así determinado deberá destinarse en el ejercicio 2025 a la amortización de deuda financiera vigente, excluyéndose expresamente su aplicación a deuda de carácter comercial u obligaciones con proveedores.

Esta conclusión deriva del hecho de que, en el ejercicio 2025, no se encuentra habilitada con carácter general la Disposición Adicional Sexta de la citada Ley, por lo que no resulta posible aplicar el superávit a destinos alternativos distintos de la amortización de endeudamiento, salvo en supuestos excepcionales expresamente regulados por norma con rango legal.

Nota adicional (si procede): En caso de que la entidad se encuentre incluida en el Anexo del Real Decreto-ley 6/2024, de 5 de noviembre (medidas urgentes por la DANA), podría valorarse una aplicación excepcional conforme a la DA 6ª de la LOEPySF.
`.trim();

    const editor = document.getElementById("editorTexto");
    if (!editor) {
      alert("⚠️ No se encontró el editor de texto.");
      return;
    }
    editor.innerText = texto;

    // ✅ Activar detección de bloques si está definida
    if (typeof window.actualizarBloquesDesdeEditor === "function") {
      window.actualizarBloquesDesdeEditor();
    }

  }

  return {
    actualizarVisor,
    generarInforme
  };
})();
