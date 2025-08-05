import pdfplumber
import json
import re
import os

# Cambia aquí el nombre de tu PDF
PDF_PATH = "ical_2013_modelo_normal_igae.pdf"
# Cambia aquí el nombre del archivo JSON de salida
JSON_PATH = "ical_2013_modelo_normal_igae_reglas.json"

def limpiar_texto(texto):
    return re.sub(r'\n+', '\n', texto).strip()

def fragmentar_por_regla(texto):
    pattern = r'(T[IÍ]TULO [IVXLCDM]+\.?.*|CAP[IÍ]TULO [IVXLCDM]+\.?.*|Secci[oó]n [0-9]+[ªa]?\.?.*|Regla \d+\.-)'
    matches = list(re.finditer(pattern, texto, flags=re.MULTILINE))
    fragmentos = []

    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i+1].start() if i+1 < len(matches) else len(texto)
        encabezado = match.group().strip()
        contenido = texto[start:end].strip()
        fragmentos.append({"titulo": encabezado, "contenido": contenido})

    return fragmentos

def extraer_fragmentos(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        texto = ""
        for pagina in pdf.pages:
            page_text = pagina.extract_text()
            if page_text:
                texto += page_text + "\n"
    texto = limpiar_texto(texto)
    fragmentos = fragmentar_por_regla(texto)
    return fragmentos

def guardar_json(fragmentos, json_path):
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(fragmentos, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Comprueba si el PDF existe en la carpeta
    if not os.path.exists(PDF_PATH):
        print(f"¡No se encuentra el archivo PDF '{PDF_PATH}' en esta carpeta!")
    else:
        fragmentos = extraer_fragmentos(PDF_PATH)
        guardar_json(fragmentos, JSON_PATH)
        print(f"¡Listo! Extraído y guardado en '{JSON_PATH}'. Total fragmentos: {len(fragmentos)}")
