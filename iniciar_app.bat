@echo off
echo === ACTIVANDO ENTORNO VIRTUAL DE PYTHON ===

REM Crear entorno virtual si no existe
IF NOT EXIST "venv" (
    echo [Creando entorno virtual...]
    python -m venv venv
)

REM Activar entorno virtual
call venv\Scripts\activate

REM Instalar dependencias necesarias
echo [Instalando dependencias...]
pip install --upgrade pip
pip install flask openai python-dotenv python-docx pywin32 pandas PyMuPDF
pip install google-auth google-auth-oauthlib google-api-python-client

REM Establecer variable de entorno para Flask y lanzar el servidor
echo [Iniciando servidor Flask...]
set FLASK_APP=app_drive.py
flask run

pause