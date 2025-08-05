# modulespy/ia_analisis_general.py

from flask import Blueprint, request, jsonify
import openai

ia_analisis_bp = Blueprint('ia_analisis_bp', __name__)

@ia_analisis_bp.route('/analizar_informe_ia', methods=['POST'])
def analizar_informe_ia():
    datos = request.get_json()
    texto = datos.get("texto", "").strip()

    if not texto:
        return jsonify({"analisis_ia": "❌ No se recibió texto para analizar."})

    prompt = f"""
Eres un interventor público experto. Analiza el siguiente texto desde tres perspectivas:

1. Claridad y redacción profesional.
2. Estructura normativa y referencias legales.
3. Coherencia entre datos, exposición y conclusiones.

Texto a analizar:
\"\"\"{texto}\"\"\"
"""

    try:
        respuesta = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "Actúas como revisor técnico de informes presupuestarios."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2
        )
        analisis = respuesta.choices[0].message.content.strip()
        return jsonify({"analisis_ia": analisis})
    except Exception as e:
        return jsonify({"analisis_ia": f"❌ Error al generar análisis: {str(e)}"})
