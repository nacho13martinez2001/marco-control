// motor_redactor_modelocontrol.js

window.MotorModeloControl = (function () {
  function leer(id) {
    return document.getElementById(id)?.value || "";
  }

  function generarInforme() {
    const materias_afectadas = leer("materias_afectadas");
    const requisitos = leer("requisitos");
    const observaciones = leer("observaciones");
    const resultado_control = leer("resultado_control");
    const fecha_acuerdo_pleno = leer("fecha_acuerdo_pleno");

    const texto = `
INFORME DE CONTROL PERMANENTE PREVIO DE APROBACIÓN O MODIFICACIÓN DEL RÉGIMEN DE FISCALIZACIÓN E INTERVENCIÓN LIMITADA PREVIA DE GASTOS DE REQUISITOS BÁSICOS

1. MARCO GENERAL

De acuerdo con el artículo 214 del TRLRHL, la función interventora tiene por objeto el control de los actos que den lugar a gastos, pagos o aplicación de fondos públicos, garantizando su adecuación al ordenamiento jurídico. La fiscalización previa se ejercita sobre las fases contables de autorización (A) y disposición (D) de gastos.

2. NORMATIVA APLICABLE

Este informe se emite en base a lo dispuesto en:
- Artículo 13 del Real Decreto 424/2017, de 28 de abril.
- Artículo 219 del Texto Refundido de la Ley Reguladora de las Haciendas Locales.

3. JUSTIFICACIÓN DEL NUEVO RÉGIMEN

La fiscalización e intervención limitada previa de requisitos básicos tiene como finalidad racionalizar la gestión económico-financiera, reducir plazos y asegurar el cumplimiento legal. Su adopción persigue:
- Optimización de procedimientos de control y gestión.
- Agilidad en la tramitación sin merma de garantías.
- Verificación eficiente de los aspectos esenciales del gasto.

4. ALCANCE DEL RÉGIMEN PROPUESTO

Este régimen se aplicará sobre los expedientes de gasto relacionados con:
📌 ${materias_afectadas}

Sobre los tipos de gasto no incluidos, así como los de cuantía indeterminada, se continuará aplicando el régimen general.

5. REQUISITOS A COMPROBAR

En los casos acogidos al nuevo régimen limitado previa, el Órgano Interventor verificará únicamente:
📋 ${requisitos}

Estos requisitos coinciden con lo previsto en el artículo 13.2 del RD 424/2017 y los Acuerdos del Consejo de Ministros de 2008 y 2018.

6. OBSERVACIONES ADICIONALES

🗒 ${observaciones}

7. CONCLUSIÓN

🗓 Fecha del acuerdo plenario (si procede): ${fecha_acuerdo_pleno}

✅ Resultado del control permanente previo: ${resultado_control}
    `;

    document.getElementById("salida_redaccion").value = texto.trim();
  }

  return {
    generarInforme
  };
})();
