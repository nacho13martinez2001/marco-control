# 🧩 Flujo: Estabilidad en Modificaciones de Crédito

## 📄 Plantilla reconocida
**Informe sobre el cumplimiento del objetivo de estabilidad presupuestaria a fin de ejercicio**

## 📊 Excel esperado
**Archivo**: cualquiera que contenga una hoja llamada `EE`  
**Subhoja clave**: `Estabilidad`  
**Datos extraídos de la segunda fila**:
- Previsiones iniciales
- Créditos iniciales
- Estabilidad en Aprobación
- DRNs (capítulos 1 a 7)
- ORNs (capítulos 1 a 7)
- Estabilidad en Ejecución

## 🔁 Comportamiento del flujo
1. El sistema detecta la plantilla cargada en el editor.
2. Muestra un mensaje explicando que puede realizar una proyección automática.
3. Al subir el Excel, detecta y analiza la hoja `Estabilidad`.
4. Calcula tres escenarios:
   - Escenario A: Real a fecha
   - Escenario B: Ingresos al 95%
   - Escenario C: Proyección lineal a 31/12
5. Muestra el resumen por chat.
6. Inserta automáticamente los resultados en los apartados IV y V del informe.

## 🧠 Reglas de sustitución
- Solo se sustituye la **segunda aparición** de los títulos “IV.” y “V.” en el documento, para respetar el índice del punto 0.
- El apartado IV se redacta por completo con los tres escenarios.
- El apartado V contiene una conclusión técnica basada en el resultado del escenario C.

## ⚙️ Módulo JS
**Archivo:** `flujo_estabilidad_modificaciones.js`  
**Funciones clave:**
- `iniciarFlujoSiAplica()`
- `manejarExcelSubido()`
- `insertarResultadosEnEditor()`
- `redactarApartadosIVyV()`

## ✅ Estado
✔️ Finalizado y operativo  
🗓️ Última revisión: Mayo 2025