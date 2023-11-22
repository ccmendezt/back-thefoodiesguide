import json
import requests

# Lista de rutas a los archivos JSON
# archivos_json = ['cerveza.json']
archivos_json = ['hamburguesa.json', 'pizza.json', 'vegetariana.json', 'colombiana.json', 'cerveza.json']

for archivo_json in archivos_json:
    # Construir la ruta completa al archivo JSON
    ruta_json = f'scrapping/{archivo_json}'  # Reemplaza con la ruta adecuada

    # Leer el contenido del archivo JSON
    with open(ruta_json, 'r') as archivo:
        datos = json.load(archivo)

    # URL de la API a la que harás la petición POST
    url_api = "http://localhost:3000/restaurantes/varios"

    # Realizar la petición POST
    respuesta = requests.post(url_api, json=datos)

    # Imprimir la respuesta del servidor
    print(f"Estado de la respuesta para {archivo_json}: {respuesta.status_code}")
    print(f"Respuesta del servidor para {archivo_json}: {respuesta.json()}")
