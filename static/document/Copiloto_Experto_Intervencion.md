# Copiloto Experto de Intervención – Diseño Conceptual

## 1. Objetivo del sistema

Crear una aplicación de control permanente donde el **chat es el eje central** de todas las acciones. Actúa como un **copiloto experto en intervención**, que guía, analiza, redacta y responde a cada paso del usuario.

---

## 2. Principios del diseño

- **Conversacional:** el usuario se comunica exclusivamente con el chat.
- **Contextual:** la IA conoce el tipo de documento, el módulo activo y el contenido cargado.
- **Propositivo:** la IA detecta oportunidades de análisis y propone acciones automáticamente.
- **Reversible:** cualquier acción ejecutada por la IA puede explicarse, editarse o anularse.
- **Visible:** todo resultado se refleja dinámicamente en el visor (texto o tabla).
- **Minimalista:** se eliminan botones y menús en favor de diálogo guiado.

---

## 3. Flujo general de interacción

1. El usuario carga un documento (Word, Excel o PDF).
2. El sistema analiza el contenido y lo clasifica automáticamente.
3. El chat inicia la conversación:
   - “He detectado que se trata de un informe de aprobación. ¿Quieres que revise las cifras del capítulo IV?”
4. El usuario responde: “Sí, y genera observaciones técnicas también.”
5. El visor se actualiza con los resultados: cifras, observaciones, cálculos…
6. El usuario puede seguir dialogando: “¿Y cumple la regla de gasto?” o “Proyéctame el capítulo 3.”

---

## 4. Comportamientos esperados

| Acción del usuario                             | Respuesta del copiloto                                                   |
|------------------------------------------------|---------------------------------------------------------------------------|
| “Subo el informe de liquidación 2024”          | Detecta el tipo, pregunta si desea análisis global                       |
| “Hazme un resumen del capítulo IV”             | Muestra solo ese apartado, lo resume y lo proyecta si es Excel           |
| “Genera observaciones”                         | Redacta observaciones conforme al contexto técnico-normativo             |
| “¿Cumple la estabilidad presupuestaria?”       | Calcula, proyecta y responde, usando los datos disponibles               |
| “Compárame con 2023”                           | Solicita o detecta el archivo 2023 y realiza la comparativa              |

---

## 5. Módulos que debe reconocer

- Aprobación presupuestaria
- Modificaciones presupuestarias
- Liquidación del presupuesto
- Cuenta General
- Regla de gasto
- Estabilidad presupuestaria
- Deuda viva y comercial
- Análisis de ejecución
- Cualquier informe libre

---

## 6. IA utilizada en tres niveles

| Nivel                      | Función                                                       |
|---------------------------|---------------------------------------------------------------|
| 1. Clasificación automática | Detecta el tipo de documento cargado                         |
| 2. Asistente contextual     | Propone acciones útiles según módulo y contenido             |
| 3. Generador experto        | Redacta, calcula, resume y proyecta bajo demanda             |