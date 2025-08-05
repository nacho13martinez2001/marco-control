
from google.oauth2 import service_account
from googleapiclient.discovery import build

FOLDER_ID = "1GMUgFz3OYc-mNm3qPDnjpmd-6GquRu_-"
CREDENTIALS_FILE = "credentials.json"

def get_drive_service():
    SCOPES = ['https://www.googleapis.com/auth/drive.readonly']
    creds = service_account.Credentials.from_service_account_file(
        CREDENTIALS_FILE, scopes=SCOPES)
    return build('drive', 'v3', credentials=creds)

def listar_archivos_en_carpeta(folder_id):
    service = get_drive_service()
    resultados = service.files().list(
        q=f"'{folder_id}' in parents",
        fields="files(id, name, mimeType)"
    ).execute()
    archivos = resultados.get("files", [])
    print(f"🔍 Archivos encontrados en la carpeta ({folder_id}):")
    for archivo in archivos:
        print(f"- {archivo['name']} ({archivo['mimeType']})")

if __name__ == "__main__":
    listar_archivos_en_carpeta(FOLDER_ID)
