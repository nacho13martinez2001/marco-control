from __future__ import print_function
import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload

SCOPES = ['https://www.googleapis.com/auth/drive']
SERVICE_ACCOUNT_FILE = 'credentials.json'

def get_service():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPES)
    service = build('drive', 'v3', credentials=creds)
    return service

def upload_pdf(source_path, folder_id=None):
    service = get_service()
    file_metadata = {'name': os.path.basename(source_path)}
    if folder_id:
        file_metadata['parents'] = [folder_id]

    media = MediaFileUpload(source_path, mimetype='application/pdf', resumable=True)
    file = service.files().create(body=file_metadata, media_body=media, fields='id').execute()

    # Permiso público
    service.permissions().create(
        fileId=file['id'],
        body={"type": "anyone", "role": "reader"}
    ).execute()

    return f"https://drive.google.com/file/d/{file['id']}/preview"
