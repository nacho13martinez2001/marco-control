// motor_redactor_gestion_servicios.js

window.MotorGestionServicios = (function () {
  function leer(id) {
    const el = document.getElementById(id);
    return el ? el.value || "" : "";
  }

  function leerImporte(id) {
    return parseFloat(leer(id).replace(",", ".")) || 0;
  }

  function generarInforme() {
    const tipo = leer("tipo_informe_gestion");

    let texto = "";

    if (tipo === "medio_propio") {
      const nombre_entidad = leer("nombre_entidad");
      const naturaleza_juridica = leer("naturaleza_juridica");
      const titularidad_publica = leer("titularidad_publica");
      const porcentaje_actividad = leer("porcentaje_actividad");
      const descripcion_control = leer("descripcion_control");
      const objeto_encargo = leer("objeto_encargo");
      const resultado_control = leer("resultado_control_mp");
      const motivos_resultado = leer("motivos_resultado_mp");
      const observaciones = leer("observaciones_mp");

      texto = `
INFORME DE CONTROL PERMANENTE PREVIO DE DECLARACIÓN DE MEDIO PROPIO O SERVICIO TÉCNICO

PRIMERO. Marco legal
De acuerdo con el artículo 86.1 de la Ley 40/2015... (resumen normativo)

SEGUNDO. Requisitos de la entidad
Entidad: ${nombre_entidad}
• Naturaleza jurídica: ${naturaleza_juridica}
• Titularidad pública: ${titularidad_publica}
• Nivel de actividad para el Ayuntamiento: ${porcentaje_actividad} %
• Control ejercido: ${descripcion_control}

TERCERO. Objeto del encargo
${objeto_encargo}

CUARTO. Justificación de la elección
El medio propio ${nombre_entidad} cuenta con los medios necesarios...

QUINTO. Evaluación de idoneidad y eficiencia
Evaluación favorable, conforme a la normativa vigente.

RESULTADO DEL CONTROL PREVIO
Resultado: ${resultado_control}
Motivos: ${motivos_resultado}
Observaciones: ${observaciones}
`;
    }

    else if (tipo === "actividad_economica") {
      const conclusion_memoria = leer("conclusion_memoria");
      const impacto_memoria = leer("impacto_memoria");
      const coste_estimado = leerImporte("coste_estimado_ae");
      const ingresos_previstos = leerImporte("ingresos_previstos_ae");
      const equilibrio_explotacion = leer("equilibrio_explotacion");
      const financiacion_inicial = leerImporte("financiacion_inicial");
      const impacto_presupuestario = leer("impacto_presupuestario");
      const viabilidad_economica = leer("viabilidad_economica");
      const resultado_control = leer("resultado_control_ae");
      const motivos_resultado = leer("motivos_resultado_ae");
      const observaciones = leer("observaciones_ae");

      texto = `
INFORME DE CONTROL PERMANENTE PREVIO SOBRE EJERCICIO DE ACTIVIDAD ECONÓMICA

PRIMERO. Marco legal
Artículo 86.1 de la Ley 7/1985. Iniciativa pública sujeta a principios de sostenibilidad financiera y estabilidad presupuestaria.

TERCERO. Memoria justificativa
La iniciativa ${conclusion_memoria} con los requisitos legales y ${impacto_memoria} el equilibrio presupuestario.

CUARTO. Evaluación económica
- Coste estimado: ${coste_estimado.toLocaleString()} €
- Ingresos previstos: ${ingresos_previstos.toLocaleString()} €
- Equilibrio de explotación: ${equilibrio_explotacion}
- Financiación inicial: ${financiacion_inicial.toLocaleString()} €
- Impacto presupuestario: ${impacto_presupuestario}
- Viabilidad: ${viabilidad_economica}

RESULTADO DEL CONTROL PREVIO
Resultado: ${resultado_control}
Motivos: ${motivos_resultado}
Observaciones: ${observaciones}
`;
    }

    else if (tipo === "gestion_servicios") {
      const descripcion_servicio = leer("descripcion_servicio");
      const alternativas_analizadas = leer("alternativas_analizadas");
      const coste_estimado = leerImporte("coste_estimado_gs");
      const ingresos_estimados = leerImporte("ingresos_estimados");
      const justificacion_eficiencia = leer("justificacion_eficiencia");
      const validez_memoria = leer("validez_memoria");
      const grado_cumplimiento = leer("grado_cumplimiento");

      const coste_total = leerImporte("coste_total");
      const fuente_financiacion = leer("fuente_financiacion");
      const impacto_presupuestario = leer("impacto_presupuestario_gs");
      const regla_gasto = leer("regla_gasto");
      const estabilidad_presupuestaria = leer("estabilidad_presupuestaria");
      const conclusion_viabilidad = leer("conclusion_viabilidad");

      const tipo_servicio = leer("tipo_servicio");
      const forma_gestion_elegida = leer("forma_gestion_elegida");
      const motivo_1 = leer("motivo_1");
      const motivo_2 = leer("motivo_2");
      const motivo_3 = leer("motivo_3");
      const resultado_control = leer("resultado_control_gs");
      const motivos_resultado = leer("motivos_resultado_gs");
      const observaciones = leer("observaciones_gs");

      texto = `
INFORME DE CONTROL PERMANENTE PREVIO SOBRE GESTIÓN DE SERVICIOS PÚBLICOS

PRIMERO. Marco legal
Artículo 85 de la Ley 7/1985. Formas de gestión directa o indirecta sujetas a sostenibilidad y eficiencia.

TERCERO. Memoria justificativa
- Descripción: ${descripcion_servicio}
- Alternativas analizadas: ${alternativas_analizadas}
- Coste anual estimado: ${coste_estimado.toLocaleString()} €
- Ingresos previstos: ${ingresos_estimados.toLocaleString()} €
- Justificación eficiencia: ${justificacion_eficiencia}
- Resultado: La memoria ${validez_memoria}, al ${grado_cumplimiento} los requisitos legales.

CUARTO. Evaluación económico-financiera
- Coste total: ${coste_total.toLocaleString()} €
- Fuente de financiación: ${fuente_financiacion}
- Impacto presupuestario: ${impacto_presupuestario}
- Regla de gasto: ${regla_gasto}
- Estabilidad presupuestaria: ${estabilidad_presupuestaria}
- Conclusión: ${conclusion_viabilidad}

QUINTO. Propuesta de forma de gestión
Servicio: ${tipo_servicio}
Forma elegida: ${forma_gestion_elegida}
- Motivos: ${motivo_1}, ${motivo_2}, ${motivo_3}

RESULTADO DEL CONTROL PREVIO
Resultado: ${resultado_control}
Motivos: ${motivos_resultado}
Observaciones: ${observaciones}
`;
    }

    document.getElementById("salida_redaccion").value = texto.trim();
  }

  return {
    generarInforme
  };
})();
