# 📘 Ficha Técnica del Flujo: Liquidación del Presupuesto General

## 1. Nombre del flujo
**Informe de Liquidación del Presupuesto General**

## 2. Objetivo funcional
Automatizar la redacción de apartados clave del informe de liquidación presupuestaria, integrando datos del Excel en la plantilla Word y generando un anexo con los datos analizados.

## 3. Archivos implicados
- `formulario_drive.html`: Contenedor visual del sistema, con módulos y botones.
- `flujo_liquidacion_general.js`: Script que controla el flujo completo de análisis.
- `gestor_flujos.js`: Registro y activación/desactivación exclusiva del flujo.

## 4. Activación del flujo
- Se activa al detectar en el texto del editor la cadena:
  ```
  INFORME DE INTERVENCIÓN SOBRE LA LIQUIDACIÓN DEL PRESUPUESTO GENERAL
  ```
- El flujo se activa automáticamente con `iniciarFlujoSiAplica()`.

## 5. Pasos del proceso IA
1. Carga del texto base del informe en el editor.
2. Activación automática del flujo si se detecta la plantilla correspondiente.
3. Subida del archivo Excel con las siguientes hojas clave:
   - “Resumen Capítulos”
   - “Estabilidad”
4. Cálculo automático de estabilidad presupuestaria: DRNs – ORNs (capítulos 1 a 7).
5. Inserción de resultados en los apartados IV y V del informe.
6. Generación e inserción de un anexo completo con los datos del Excel.

## 6. Interacciones con el usuario
- No se requieren entradas adicionales del usuario.
- No hay respuestas automáticas del chat: el flujo actúa de forma autónoma.

## 7. Sustitución de contenido en el editor
- Se detecta y reemplaza la **segunda aparición** de los apartados:
  - `IV. Resultado presupuestario`
  - `V. Estabilidad presupuestaria`
- Se emplea la misma lógica de detección que en otros flujos: evitar modificar el índice.

## 8. Incidencias detectadas y resueltas

| Incidencia | Solución aplicada |
|-----------|--------------------|
| Conflictos con flujos activos previos | Se resolvió usando `GestorFlujos.activarSolo()` |
| Detección incorrecta del segundo bloque IV o V | Se ajustó la lógica de búsqueda para usar expresiones regulares y limitar el reemplazo a la segunda coincidencia. |
| Plantilla no detectada por minúsculas o tildes | Se añadió normalización del texto (`normalize + toUpperCase`) |
| Faltaba adjuntar todas las hojas del Excel en el anexo | Se añadió recorrido completo por `Object.entries(datosExcel)` |

## 9. Decisiones clave de diseño
- El flujo replica la lógica funcional de los módulos de aprobación y estabilidad.
- La sustitución de contenido es modular y puede aplicarse a futuros informes.
- El análisis evita intervención del usuario, lo que agiliza la redacción.

## 10. Mejoras futuras propuestas
- Añadir desglose opcional por subconceptos en el anexo.
- Posibilidad de incluir análisis SEC-2010 si se activa expresamente.
- Inclusión de advertencias si los resultados reflejan necesidad de financiación.
- Automatización del envío al sistema de informes consolidados del ejercicio.