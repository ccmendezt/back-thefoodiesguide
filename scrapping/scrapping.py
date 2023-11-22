import requests
import json

API_KEY = 'AIzaSyDPj4y_MABVQFa8bwMfN-k6bUWEbrYv3oU'


def obtener_informacion_lugares(query, location, radius=1000, types='restaurant', keyword=None):
    base_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    params = {
        'location': location,
        'radius': radius,
        'types': types,
        'keyword': keyword,
        'key': API_KEY
    }

    response = requests.get(base_url, params=params)
    data = response.json()

    lugares_info = []

    if response.status_code == 200:
        for place in data['results']:
            lugar_info = {
                'nombre': place['name'],
                'categoria': keyword,
                'direccion': place.get('vicinity', 'Dirección no disponible'),
                'telefono': obtener_detalles_lugar(place['place_id']).get('formatted_phone_number', 'No disponible'),
                'latitud': obtener_detalles_lugar(place['place_id'])['geometry']['location']['lat'],
                'longitud': obtener_detalles_lugar(place['place_id'])['geometry']['location']['lng'],
                'foto': obtener_foto_principal(place['place_id']),
                'resenas': obtener_resenas_lugar(place['place_id']),
                'rating': str(obtener_detalles_lugar(place['place_id']).get('rating', 'No disponible'))
            }
            lugares_info.append(lugar_info)
    else:
        print('Error al realizar la solicitud:', data)

    return lugares_info


def obtener_detalles_lugar(place_id):
    detalles_url = 'https://maps.googleapis.com/maps/api/place/details/json'
    detalles_params = {
        'place_id': place_id,
        'key': API_KEY
    }

    detalles_response = requests.get(detalles_url, params=detalles_params)
    detalles_data = detalles_response.json()

    if detalles_response.status_code == 200:
        return detalles_data['result']
    else:
        print('Error al obtener detalles del lugar:', detalles_data)
        return {}


def obtener_foto_principal(place_id, max_width=400):
    fotos_url = 'https://maps.googleapis.com/maps/api/place/photo'
    fotos_params = {
        'maxwidth': max_width,
        'photoreference': '',
        'key': API_KEY
    }

    detalles = obtener_detalles_lugar(place_id)

    if 'photos' in detalles:
        foto_principal = detalles['photos'][0]  # Tomar la primera foto
        fotos_params['photoreference'] = foto_principal['photo_reference']
        foto_url = f"{fotos_url}?{('&'.join(f'{key}={value}' for key, value in fotos_params.items()))}"
        return foto_url

    return None


def obtener_resenas_lugar(place_id, idioma='es'):
    resenas_url = 'https://maps.googleapis.com/maps/api/place/details/json'
    resenas_params = {
        'place_id': place_id,
        'language': idioma,
        'key': API_KEY
    }

    resenas_response = requests.get(resenas_url, params=resenas_params)
    resenas_data = resenas_response.json()

    resenas = []

    if resenas_response.status_code == 200 and 'reviews' in resenas_data['result']:
        for reseña in resenas_data['result']['reviews']:
            resenas.append({
                'autor': reseña['author_name'],
                'rating': str(reseña['rating']),
                'texto': reseña['text']
            })

    return resenas


def guardar_en_json(data, nombre_archivo='informacion_lugares.json'):
    with open(nombre_archivo, 'w', encoding='utf-8') as archivo:
        json.dump(data, archivo, ensure_ascii=False, indent=2)


# categorias = {'hamburguesa', 'pizza', 'vegetariana', 'colombiana', 'cerveza'}
categorias = {'cerveza'}
bogota_location = '4.6097,-74.0817'  # Latitud y longitud de Bogotá

for i in categorias:
    informacion_lugares = obtener_informacion_lugares(
        'restaurant', bogota_location, keyword=f"{i}")

    guardar_en_json(informacion_lugares, nombre_archivo=f"{i}.json")