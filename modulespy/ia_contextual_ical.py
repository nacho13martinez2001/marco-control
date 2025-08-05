import json
import os

# Máximo de fragmentos a enviar en cada consulta (puedes poner 1 o 2)
MAX_FRAGMENTOS = 2
# Máximo de caracteres permitidos por fragmento para el contexto
MAX_CARACTERES_CONTEXTO = 2500

def buscar_fragmentos_ical(pregunta, max_fragmentos=MAX_FRAGMENTOS):
    """Busca fragmentos relevantes en la ICAL a partir de la pregunta del usuario."""
    ruta_ical = os.path.join("static", "conocimiento", "ical_2013_modelo_normal_igae.json")
    if not os.path.exists(ruta_ical):
        return []

    with open(ruta_ical, "r", encoding="utf-8") as f:
        reglas = json.load(f)

    palabras = [w.lower() for w in pregunta.split() if len(w) > 2]
    hits = []
    for r in reglas:
        # Evita KeyError si algún fragmento no tiene "titulo" o "contenido"
        titulo = r.get("titulo", "")
        contenido = r.get("contenido", "")
        if any(p in titulo.lower() or p in contenido.lower() for p in palabras):
            # Trunca el contenido si es muy largo
            contenido_truncado = contenido[:MAX_CARACTERES_CONTEXTO]
            hits.append({
                "tipo": r.get("tipo", ""),
                "titulo": titulo,
                "contenido": contenido_truncado
            })
            if len(hits) >= max_fragmentos:
                break
    return hits
