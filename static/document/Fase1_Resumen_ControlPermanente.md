# ✅ Fase 1 – Aplicación de Control Permanente (Estado al cierre)

## 🧩 Módulos funcionales completados

- [x] **Carga de informes Word en editor**
- [x] **Reconocimiento automático de plantillas**:
  - Informe de Aprobación del Presupuesto
  - Informe de Cumplimiento de Reglas Fiscales
- [x] **Lectura de datos desde Excel para informes de Aprobación**:
  - Totales: ingresos y gastos iniciales y consolidados
  - Capítulos: desglose por capítulos Ayto y consolidado
- [x] **Módulo de Estabilidad Presupuestaria**:
  - Cálculo de capacidad o necesidad de financiación
  - Proyección de gastos (lineal)
  - Proyección de ingresos (por % indicado)
- [x] **Módulo de Modificaciones**:
  - Estado de ejecución con 3 escenarios de estabilidad
- [x] **Módulo de Liquidación**:
  - Flujo estructurado pendiente de cierre de estilo
- [x] **Flujos separados y modulares según tipo de informe**

## 💬 Funcionalidad del Chat

- [x] **Chat asistido con IA contextual**
- [x] **Animación de escaneo visual para Excel y texto**
- [x] **Botón "+" para subir archivo directamente desde el chat**
- [x] **Redirección automática del contenido del archivo a la IA**
- [x] **Reinicio de conversación limpio**
- [x] **Bloqueo inicial de la aplicación hasta pulsar “Iniciar AIVIS”**

## 🧱 Estructura Técnica

- [x] Separación en scripts modulares (`comun.js`, `flujo_aprobacion_general.js`, etc.)
- [x] Estilo visual unificado: botones, bordes, fondo y texto
- [x] Uso de Handsontable para edición de hoja Excel
- [x] OCR y lectura de PDF, DOCX y XLSX integrados
- [x] Separación entre visor de texto, hoja y paneles IA

## 🔧 Pendientes de cierre técnico (fase 1)

- [ ] Revisión final de integración de todos los flujos en una única interfaz
- [ ] Automatización parcial del flujo “Cumplimiento reglas fiscales”
- [ ] Refactorización general para unificar patrones de flujo
- [ ] Pequeños ajustes visuales (coherencia total entre botones y visores)
- [ ] Validación final del flujo de liquidación
- [ ] Navegación/búsqueda avanzada dentro del informe en el visor
- [ ] Opción de historial o guardado de informes generados (post-fase 1)

---

✅ Una vez finalizados estos puntos, puede iniciarse la **Fase 2**:
- Análisis por IA inteligente
- Detección de riesgos contables y normativos
- Observaciones técnicas automáticas
- Comparativa interanual de ejecución
- Panel visual de indicadores
