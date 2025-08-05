// motor_redactor_gastos_plurianuales.js

window.MotorGastosPlurianuales = (function () {

  function leer(id) {
    return document.getElementById(id)?.value || "";
  }

  function leerImporte(id) {
    return parseFloat(leer(id).replace(",", ".")) || 0;
  }

  function generarInforme() {
    const tipo = leer("tipo_informe_gastos");

    let texto = "";

    if (tipo === "limites_excepcionales") {
      const resultado_control = leer("resultado_control_limites");

      texto = `
INFORME DE CONTROL PERMANENTE PREVIO – APROBACIÓN DE LÍMITES EXCEPCIONALES EN GASTOS PLURIANUALES

PRIMERO. Fundamento normativo

Según el artículo 174 del TRLRHL, se podrán adquirir compromisos por gastos que se extiendan a ejercicios futuros en casos concretos. El apartado 5 permite al Pleno acordar, de forma excepcional, la ampliación de los límites previstos en el art. 174.3.

SEGUNDO. Objeto del expediente

Aprobación por el Pleno del levantamiento de los límites ordinarios relativos a:
- Número de ejercicios afectados
- Porcentaje de imputación anual

Esta medida se adopta por razones justificadas de eficiencia, viabilidad y características técnicas del proyecto.

TERCERO. Análisis del cumplimiento de requisitos

El expediente acredita:
- Inicio del gasto en el ejercicio actual
- Encaje del gasto en uno de los supuestos habilitantes del art. 174.2
- Justificación adecuada de la ampliación
- Informe favorable de Intervención sobre viabilidad presupuestaria

CUARTO. Efectos del acuerdo

El acuerdo autoriza compromisos que exceden los límites estándar. Debe especificar número de ejercicios, importes anuales e identificación del proyecto.

En ningún caso se exime del cumplimiento de estabilidad presupuestaria, sostenibilidad financiera y prudencia.

CONCLUSIÓN

Resultado del control: ${resultado_control}
El presente informe deja constancia del cumplimiento del art. 174 del TRLRHL.
      `;
    }

    if (tipo === "reajuste_anualidades") {
      const motivo_reajuste = leer("motivo_reajuste");
      const motivo_autorizado_art_96 = leer("motivo_autorizado_art_96");

      const actual_2025 = leerImporte("anualidad_actual_2025");
      const actual_2026 = leerImporte("anualidad_actual_2026");
      const actual_2027 = leerImporte("anualidad_actual_2027");
      const otro_actual = leerImporte("anualidad_actual_otro");

      const nuevo_2025 = leerImporte("nueva_anualidad_2025");
      const nuevo_2026 = leerImporte("nueva_anualidad_2026");
      const nuevo_2027 = leerImporte("nueva_anualidad_2027");
      const otro_nuevo = leerImporte("nueva_anualidad_otro");

      const total_actual = actual_2025 + actual_2026 + actual_2027 + otro_actual;
      const total_reajustado = nuevo_2025 + nuevo_2026 + nuevo_2027 + otro_nuevo;
      const diferencia_total = total_reajustado - total_actual;

      const estado_conformidad = leer("estado_conformidad");
      const resultado_control = leer("resultado_control_reajuste");

      texto = `
INFORME DE CONTROL PERMANENTE PREVIO – REAJUSTE DE ANUALIDADES EN CONTRATO PLURIANUAL

PRIMERO. Marco jurídico

Según el artículo 96 del Reglamento General de Contratación (RD 1098/2001), puede procederse al reajuste de anualidades cuando:
- Existan suspensiones o prórrogas
- Se modifique el proyecto
- Concurran otras causas de interés público justificadas

Condicionado a: remanentes disponibles, conformidad del contratista, y revisión del programa de trabajo.

SEGUNDO. Causa del reajuste

El reajuste propuesto se basa en:  
📌 ${motivo_reajuste}

TERCERO. Justificación normativa

Se identifica la siguiente causa habilitante del art. 96:  
✅ ${motivo_autorizado_art_96}

CUARTO. Comparativa de anualidades

| Ejercicio | Importe Actual (€) | Importe Reajustado (€) |
|-----------|--------------------|-------------------------|
| 2025      | ${actual_2025.toLocaleString()}         | ${nuevo_2025.toLocaleString()}              |
| 2026      | ${actual_2026.toLocaleString()}         | ${nuevo_2026.toLocaleString()}              |
| 2027      | ${actual_2027.toLocaleString()}         | ${nuevo_2027.toLocaleString()}              |
| Otro/s    | ${otro_actual.toLocaleString()}         | ${otro_nuevo.toLocaleString()}              |

🔢 Total actual: ${total_actual.toLocaleString()} €  
🔢 Total reajustado: ${total_reajustado.toLocaleString()} €  
✅ Diferencia: ${diferencia_total.toLocaleString()} €

Consta que el contratista ${estado_conformidad === "sí" ? "ha prestado" : "NO ha prestado"} conformidad al nuevo calendario de anualidades.

CONCLUSIÓN

Resultado del control: ${resultado_control}
Este informe se emite a los efectos previstos en el artículo 213 del TRLRHL.
      `;
    }

    document.getElementById("salida_redaccion").value = texto.trim();
  }

  return {
    generarInforme
  };

})();
