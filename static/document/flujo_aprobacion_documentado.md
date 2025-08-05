# 📘 Ficha Técnica del Flujo: Aprobación del Presupuesto General

## 1. Nombre del flujo
**Informe de Aprobación del Presupuesto General**

## 2. Objetivo funcional
Generar automáticamente el contenido técnico del informe de aprobación presupuestaria, insertando los datos extraídos del Excel en los apartados IV y V del documento cargado en el editor, y adjuntando un anexo completo de datos como apéndice.

## 3. Archivos implicados
- `formulario_drive.html`: Contenedor principal del editor, botones, módulos y scripts.
- `flujo_aprobacion_general.js`: Toda la lógica específica del flujo.
- `gestor_flujos.js`: Sistema de activación exclusivo del flujo seleccionado.

## 4. Activación del flujo
- Se activa automáticamente cuando el texto cargado en el editor contiene la cadena:
  ```
  "INFORME DE INTERVENCION SOBRE LA APROBACION DEL PRESUPUESTO GENERAL"
  ```
- La función `iniciarFlujoSiAplica()` del módulo `FlujoAprobacionGeneralMod` se encarga de detectar la plantilla y poner `iniciado = true`.

## 5. Pasos del proceso IA
1. Espera que se cargue el texto del informe.
2. Detecta la plantilla.
3. Queda en modo "activo" y a la espera del Excel.
4. Cuando se sube el Excel, busca y lee 3 hojas:
   - `Totales`
   - `Ayto - Capítulos`
   - `Pto. Consolidado`
5. Extrae:
   - Totales de ingresos y gastos del Ayuntamiento y del Consolidado.
   - Desglose por capítulos de ingresos y gastos (Ayto y Consolidado).
6. Inserta el contenido numérico en:
   - Apartado IV: “Cifras presupuestarias”
   - Apartado V: “Conclusión”
7. Adjunta al final un **Anexo de Datos del Excel** con todas las hojas completas.

## 6. Interacciones con el usuario
- No se requiere intervención del usuario durante la ejecución (flujo silencioso).
- Opcionalmente puede usar el botón "Detectar apartados" si lo desea antes.

## 7. Sustitución de contenido en el editor
- La lógica reemplaza la **segunda aparición** de los apartados (punto IV y V) usando:
  ```js
  reemplazarSegundaAparicion(texto, "IV. Cifras presupuestarias", nuevoContenido)
  ```
- Esto respeta la estructura habitual donde la primera aparición se encuentra en el **índice del informe (punto 0)**.

## 8. Incidencias detectadas y resueltas

| Incidencia | Solución aplicada |
|-----------|--------------------|
| El flujo se disparaba en múltiples informes a la vez | Se usó `GestorFlujos.activarSolo()` para desactivar los demás al activar uno. |
| Se insertaba el contenido en la **primera** aparición del punto IV | Se corrigió con `reemplazarSegundaAparicion()` que detecta la segunda ocurrencia. |
| El anexo solo añadía una hoja | Se ajustó el bucle para añadir **todas las hojas** en el anexo. |
| El chat mostraba respuestas innecesarias | Se eliminaron las respuestas automáticas y se dejó al flujo actuar en segundo plano. |
| El botón "Aplicar estilo" no funcionaba | (Pendiente de revisar: parece que el `onclick="aplicarEstiloInforme()"` no encuentra la función). |

## 9. Decisiones clave de diseño
- El flujo se gestiona desde su propio archivo JS y se registra en `gestor_flujos.js`, lo que permite activar exclusivamente uno.
- Se ha normalizado el texto de plantilla para evitar fallos por tildes o minúsculas.
- Se priorizó un enfoque modular, donde el flujo no interfiere con otros scripts.
- El sistema es fácilmente **escalable** a otros informes reutilizando la lógica base.

## 10. Mejoras futuras propuestas
- Añadir validación visual cuando se complete correctamente el flujo.
- Mostrar en el chat un resumen final cuando el flujo haya terminado (modo discreto).
- Incluir botón para reactivar el flujo manualmente en caso de error.
- Revisar por qué `#botonAplicarEstiloTexto` no hace efecto.