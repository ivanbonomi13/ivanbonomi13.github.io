import json
from bs4 import BeautifulSoup
import requests

# Definir los nombres de las categorías manualmente
nombres_categorias = [
    "Libra por Libra Masculino",
    "Peso Mosca",
    "Peso Gallo",
    "Peso Pluma",
    "Peso Ligero",
    "Peso Wélter",
    "Peso Medio",
    "Peso Semipesado",
    "Peso Pesado",
    "Libra por Libra Femenino",
    "Peso Paja Femenino",
    "Peso Mosca Femenino",
    "Peso Gallo Femenino"
]

# URL de la página de los rankings de UFC
url = 'https://www.ufc.com/rankings'

# Realizar la solicitud HTTP
response = requests.get(url)

# Analizar el HTML con BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Encontrar todos los elementos h5 (campeones de categorías)
h5_elements = soup.find_all('h5')

# Encontrar todos los elementos tbody (peleadores)
tbody_elements = soup.find_all('tbody')

# Lista para almacenar los datos de las categorías
categorias = []

# Iterar sobre los nombres de las categorías y establecerlos manualmente
for nombre_categoria in nombres_categorias:
    categoria = {'nombre': nombre_categoria}
    categorias.append(categoria)

# Asignar los campeones a las categorías correspondientes en el orden de los nombres de las categorías
for i, h5_element in enumerate(h5_elements[:len(categorias)]):
    categorias[i]['campeon'] = h5_element.text.strip()

# Lista para almacenar los datos de los rankings
rankings = []

# Iterar sobre los elementos tbody y extraer los peleadores
for tbody_element in tbody_elements:
    peleadores = []
    rows = tbody_element.find_all('tr')
    for row in rows:
        peleador = {}
        cells = row.find_all(['th', 'td'])
        for i, cell in enumerate(cells):
            if i == 0:
                peleador['posicion'] = int(cell.text.strip())
            elif i == 1:
                peleador['nombre'] = cell.text.strip()
        peleadores.append(peleador)
    rankings.extend(peleadores)

# Asignar los peleadores a las categorías correspondientes
for i, categoria in enumerate(categorias):
    categoria['peleadores'] = rankings[i*15:(i+1)*15]

# Crear un diccionario final con la lista de categorías
datos_json = {'categorias': categorias}

# Guardar los datos en un archivo JSON
with open('rankings.json', 'w') as f:
    json.dump(datos_json, f, indent=4)

print("Datos guardados en 'rankings.json'")


