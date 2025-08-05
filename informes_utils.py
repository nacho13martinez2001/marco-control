import json
import os

ARCHIVO_INFORMES = "informes.json"

def guardar_informes(informes):
    with open(ARCHIVO_INFORMES, "w", encoding="utf-8") as f:
        json.dump(informes, f, ensure_ascii=False, indent=2)

def cargar_informes():
    if os.path.exists(ARCHIVO_INFORMES):
        with open(ARCHIVO_INFORMES, "r", encoding="utf-8") as f:
            return json.load(f)
    return []
