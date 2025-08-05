# 📘 Ficha Técnica del Flujo: Estabilidad en Modificaciones

## 1. Nombre del flujo
**Informe de Estabilidad en Modificaciones**

## 2. Objetivo funcional
Analizar automáticamente el cumplimiento del objetivo de estabilidad presupuestaria tras una modificación de crédito, a partir de un documento de informe y un archivo Excel con datos proyectados.

## 3. Archivos implicados
- `formulario_drive.html`: Estructura del entorno visual y módulos activos.
- `flujo_estabilidad_modificaciones.js`: Lógica completa del flujo de análisis.
- `gestor_flujos.js`: Registro y activación exclusiva del flujo.

## 4. Activación del flujo
- Se activa al detectar que el texto del editor **empieza** por:
  ```
  INFORME SOBRE EL CUMPLIMIENTO DEL OBJETIVO DE ESTABILIDAD PRESUPUESTARIA A FIN DE EJERCICIO
  ```
- Esto lo gestiona `iniciarFlujoSiAplica()`.

## 5. Pasos del proceso IA
1. Se carga el documento de informe.
2. Se activa el flujo al detectar la plantilla.
3. Al cargar el Excel, se busca una hoja con nombre "Estabilidad".
4. Se extraen los 6 valores clave de la segunda fila:
   - Previsión Inicial (PI)
   - Crédito Inicial (CI)
   - Ejecución Acumulada (EA)
   - DRN acumulado
   - ORN acumulado
   - Ejecución Esperada (EE)
5. Se calculan tres escenarios de cierre:
   - A: Datos reales acumulados
   - B: Ingresos al 95%
   - C: Proyección lineal
6. Se evalúa la estabilidad para cada uno.
7. Se insertan automáticamente los apartados IV y V en el editor.
8. Se añade un anexo con el contenido completo del Excel.

## 6. Interacciones con el usuario
- No se solicita información adicional por chat.
- El proceso es totalmente automatizado tras subir los archivos.

## 7. Sustitución de contenido en el editor
- Se reemplaza el **segundo bloque completo** que va de:
  ```
  IV. Previsión [...] hasta V. Conclusión técnica
  ```
- La sustitución se realiza con bloques redactados dinámicamente desde código, reflejando los 3 escenarios.

## 8. Incidencias detectadas y resueltas

| Incidencia | Solución aplicada |
|-----------|--------------------|
| Excel sin hoja llamada "Estabilidad" | Se muestra mensaje de error y se cancela el análisis. |
| Valores mal formateados o incompletos | Se muestran advertencias al usuario antes de proceder. |
| Interferencia con otros flujos | Uso de `GestorFlujos.activarSolo()` para exclusividad. |
| Inserción de apartados en posición errónea | Se detecta el **segundo** bloque por expresión regular.|

## 9. Decisiones clave de diseño
- El análisis se realiza en segundo plano, sin molestar al usuario.
- Se introducen escenarios comparativos por DRN/ORN con 3 metodologías.
- Se adopta el sistema común de anexo de datos como en otros flujos.
- Se evita que el chat intervenga, conservando coherencia con el tipo de informe.

## 10. Mejoras futuras propuestas
- Visualización comparativa gráfica de los tres escenarios.
- Aviso automático si los tres escenarios reflejan necesidad de financiación.
- Posibilidad de configurar el % del escenario B.
- Integración con el módulo de modificación presupuestaria para cálculo directo.