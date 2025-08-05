# import win32com.client
# import pythoncom
# import os

# def convertir_a_pdf(ruta_docx, ruta_pdf):
#     try:
#         pythoncom.CoInitialize()
#         print(f"Abriendo documento Word: {ruta_docx}")
#         word = win32com.client.Dispatch("Word.Application")
#         word.Visible = False
#         word.DisplayAlerts = 0
#         doc = word.Documents.Open(os.path.abspath(ruta_docx))
#         try:
#             doc.Unprotect()
#         except:
#             pass  # Ya desprotegido
#         print("Guardando como PDF...")
#         doc.SaveAs(os.path.abspath(ruta_pdf), FileFormat=17)
#         doc.Close(False)
#         word.Quit()
#         pythoncom.CoUninitialize()
#         print(f"✅ PDF guardado en: {ruta_pdf}")
#         return True
#     except Exception as e:
#         print(f"❌ Error al convertir a PDF: {e}")
#         return False
