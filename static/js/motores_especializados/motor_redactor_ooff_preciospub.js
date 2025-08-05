
// motor_redactor_ooff_preciospub.js

window.MotorOoffPreciosPub = (function () {
  function leer(id) {
    return document.getElementById(id)?.value || "";
  }

  function generarInforme() {
    const tipo = leer("tipo"); // 'precio publico' o 'ordenanza fiscal'
    const fechaInforme = leer("fecha_informe");
    const tipoTributo = leer("tipo_tributo");
    const costes = leer("costes");
    const unidadesPrevistas = leer("unidades_previstas");
    const ingresoPrevisto = leer("ingreso_previsto");
    const principioEquivalencia = leer("principio_equivalencia");
    const motivosSubvencion = leer("motivos_subvencion");
    const beneficiosFiscales = leer("beneficios_fiscales");
    const observacionesFiscales = leer("observaciones_fiscales");
    const principiosBuenaRegulacion = leer("principios_buena_regulacion");
    const resultadoControl = leer("resultado_control");

    let cuerpo = `
INFORME DE CONTROL PERMANENTE PREVIO: APROBACIÓN O MODIFICACIÓN DE ${tipo.toUpperCase()}

1. FUNDAMENTO LEGAL

De conformidad con lo previsto en el TRLRHL y la LBRL, las Entidades Locales disponen de potestad reglamentaria para establecer ${tipo}. La aprobación corresponde al Pleno y requiere mayoría simple.

2. NORMATIVA APLICABLE

• Artículos correspondientes del TRLRHL y de la LBRL.
• Ley 39/2015 y Ley Orgánica 2/2012.
• Informe técnico-económico de fecha ${fechaInforme}.

3. ANÁLISIS ECONÓMICO

📊 Costes declarados:
${costes}

📦 Unidades previstas: ${unidadesPrevistas}
💰 Ingreso previsto: ${ingresoPrevisto} €

4. PRINCIPIO DE EQUIVALENCIA

${principioEquivalencia}

${motivosSubvencion ? "Subvención justificada por: " + motivosSubvencion : ""}

5. BENEFICIOS FISCALES

${beneficiosFiscales ? beneficiosFiscales : "No se recogen beneficios fiscales expresos."}

📌 Observaciones: ${observacionesFiscales}

6. PRINCIPIOS DE BUENA REGULACIÓN

${principiosBuenaRegulacion}

7. RESULTADO

✅ Resultado del control permanente previo: ${resultadoControl}
    `;

    document.getElementById("salida_redaccion").value = cuerpo.trim();
  }

  return {
    generarInforme
  };
})();
