
import os
import io
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

def get_drive_service():
    SCOPES = ['https://www.googleapis.com/auth/drive']
    SERVICE_ACCOUNT_FILE = 'credentials.json'  # Asegúrate de que este archivo existe

    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    return build('drive', 'v3', credentials=creds)

def list_templates():
    service = get_drive_service()
    archivos = service.files().list(
        q="'1GMUgFz3OYc-mNm3qPDnjpmd-6GquRu_-' in parents and name contains 'plantilla' and mimeType='application/vnd.google-apps.document'",
        spaces="drive",
        fields="files(id, name)",
    ).execute()
    return archivos.get("files", [])

def download_template(file_id, destino_local):
    service = get_drive_service()
    contenido = service.files().export(
        fileId=file_id,
        mimeType="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ).execute()
    with open(destino_local, "wb") as f:
        f.write(contenido)

def upload_document(source_path, folder_id=None):
    service = get_drive_service()
    filename = os.path.basename(source_path)

    file_metadata = {
        'name': filename
    }
    if folder_id:
        file_metadata['parents'] = [folder_id]

    ext = os.path.splitext(source_path)[1].lower()
    mimetype = {
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    }.get(ext, 'application/octet-stream')

    media = MediaFileUpload(source_path, mimetype=mimetype, resumable=True)
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields='id'
    ).execute()

    service.permissions().create(
        fileId=file['id'],
        body={"type": "anyone", "role": "reader"}
    ).execute()

    service.permissions().create(
        fileId=file['id'],
        body={
            "type": "user",
            "role": "writer",
            "emailAddress": "pacosital00@gmail.com"
        },
        sendNotificationEmail=False
    ).execute()

    file_id = file.get('id')
    return {
        "edit_url": f"https://drive.google.com/file/d/{file_id}/view",
        "preview_url": f"https://drive.google.com/file/d/{file_id}/preview"
    }
