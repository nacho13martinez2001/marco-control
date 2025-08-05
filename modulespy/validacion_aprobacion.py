from flask import Blueprint, jsonify

validacion_aprobacion_bp = Blueprint("validacion_aprobacion", __name__)

@validacion_aprobacion_bp.route("/api/validar_contenido_aprobacion", methods=["GET"])
def validar_contenido_aprobacion():
    resultados = {
        "equilibrio": {
            "resultado": "✔️ Equilibrado"
        },
        "estabilidad": {
            "resultado": "✔️ Capacidad de financiación",
            "elementos": {
                "capacidad_calculada": 145000.23
            }
        },
        "regla_de_gasto": {
            "resultado": "❌ No cumple",
            "elementos": {
                "resultado": 990465.57
            },
            "explicación": (
                "La regla de gasto se calcula a partir de las ORN de 2024 (31.160.444,65 €), "
                "a las que se aplica la tasa de crecimiento del 3,20%, resultando en un límite de 32.157.578,88 €. "
                "Los empleos no financieros ajustados ascienden a 34.511.956,99 €, aplicando un grado de ejecución del 96,05%, "
                "lo que da un gasto computable de 33.148.044,45 €. El exceso sobre el límite es de 990.465,57 €."
            )
        }
    }

    return jsonify({ "resultados": resultados })