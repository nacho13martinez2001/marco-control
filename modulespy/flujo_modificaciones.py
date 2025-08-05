from flask import Blueprint, request, jsonify
import re, json

modificaciones_bp = Blueprint('modificaciones_bp', __name__)

@modificaciones_bp.route('/marcadores_modificacion', methods=['POST'])
def marcadores_modificacion():
    datos = request.get_json()
    datos_usuario = datos.get("datos_usuario", "")
    memoria = datos.get("memoria", {})
    plantilla = datos.get("plantilla", "")

    if not plantilla:
        plantilla = "[Tipo_Mod]\n[Tabla_Recursos]\n[Tabla_Gastos]\n[Res]"

    # Acumula los valores previos de la memoria
    tipo_mod = memoria.get("[Tipo_Mod]", "")
    recurso = memoria.get("[Tabla_Recursos]", "")
    gasto = memoria.get("[Tabla_Gastos]", "")
    res = memoria.get("[Res]", "")

    # Regex tolerante para multi-línea y flexible (admite o no los textos de cada campo)
    m = re.search(r"1\.-?\s*(?:Tipo de Modificaci[oó]n:)?\s*([^\n\r]+)", datos_usuario, re.I)
    if m: tipo_mod = m.group(1).strip()
    m = re.search(r"2\.-?\s*(?:Recurso(?:s)? que la financian e importe:)?\s*([^\n\r]+)", datos_usuario, re.I)
    if m: recurso = m.group(1).strip()
    m = re.search(r"3\.-?\s*(?:Aplicaci[oó]n(?:es)? presupuestaria incrementada y su importe:)?\s*([^\n\r]+)", datos_usuario, re.I)
    if m: gasto = m.group(1).strip()
    m = re.search(r"4\.-?\s*(?:Conclusi[oó]n t[eé]cnica:)?\s*([^\n\r]+)", datos_usuario, re.I)
    if m: res = m.group(1).strip().upper()

    campos_obligatorios = ["[Tipo_Mod]", "[Tabla_Recursos]", "[Tabla_Gastos]", "[Res]"]
    campos_humanos = {
        "[Tipo_Mod]": "Tipo de Modificación",
        "[Tabla_Recursos]": "Recurso o Recursos que la financian e importe",
        "[Tabla_Gastos]": "Aplicación o Aplicaciones presupuestaria incrementada y su importe",
        "[Res]": "Conclusión técnica"
    }
    marcadores = {
        "[Tipo_Mod]": tipo_mod,
        "[Tabla_Recursos]": recurso,
        "[Tabla_Gastos]": gasto,
        "[Res]": res
    }
    faltan = [k for k in campos_obligatorios if not marcadores[k]]

    acciones = []
    proxima_accion = ""
    informe_actualizado = None
    if not faltan:
        informe_actualizado = plantilla
        for marcador in campos_obligatorios:
            informe_actualizado = informe_actualizado.replace(marcador, marcadores[marcador])
        proxima_accion = "Informe completado y listo."
    else:
        acciones = [f"Falta el campo {campos_humanos[k]}" for k in faltan]
        proxima_accion = (
            f"Faltan datos. Por favor, rellene todos los campos con el formato numerado:\n"
            "1.- Tipo de Modificación: ...\n"
            "2.- Recurso o Recursos que la financian e importe: ...\n"
            "3.- Aplicación o Aplicaciones presupuestaria incrementada y su importe: ...\n"
            "4.- Conclusión técnica: ..."
        )

    resultado = {
        "[Tipo_Mod]": marcadores["[Tipo_Mod]"],
        "[Tabla_Recursos]": marcadores["[Tabla_Recursos]"],
        "[Tabla_Gastos]": marcadores["[Tabla_Gastos]"],
        "[Res]": marcadores["[Res]"],
        "acciones": acciones,
        "errores": [],
        "proxima_accion": proxima_accion,
        "informe_actualizado": informe_actualizado
    }
    return jsonify(resultado)

@modificaciones_bp.route('/subir_archivo', methods=['POST'])
def subir_archivo():
    if 'archivo' not in request.files:
        return jsonify({"error": "No se ha enviado ningún archivo"}), 400
    archivo = request.files['archivo']
    # Procesa el archivo aquí (Word, Excel, PDF)
    return jsonify({"respuesta": f"Archivo {archivo.filename} recibido correctamente"})
