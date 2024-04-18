import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json

# Diccionario de equivalencias de peso
equivalencias_peso = {
    "Flyweight": "Peso Mosca",
    "Bantamweight": "Peso Gallo",
    "Featherweight": "Peso Pluma",
    "Lightweight": "Peso Ligero",
    "Welterweight": "Peso Welter",
    "Middleweight": "Peso Medio",
    "Light Heavyweight": "Peso Semipesado",
    "Heavyweight": "Peso Pesado",
    "Women's Strawweight": "Peso Paja Femenino",
    "Women's Flyweight": "Peso Mosca Femenino",
    "Women's Bantamweight": "Peso Gallo Femenino",
    "Women's Featherweight": "Peso Pluma Femenino",
    # Agrega más equivalencias según sea necesario
}

# Configuración de Selenium
driver = webdriver.Chrome()  # O ajusta el navegador que prefieras
driver.get("https://www.ufcespanol.com/athletes/all?filters[0]=status:23")
wait = WebDriverWait(driver, 10)

# Variable para controlar si el botón "Load More" está presente
boton_presente = True

# Mientras el botón esté presente, hacer clic en él repetidamente
while boton_presente:
    try:
        # Hacer clic en el botón "Load More"
        load_more_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'a.button')))
        load_more_button.click()
        time.sleep(5)  # Esperar un momento para que la página se actualice después de hacer clic
    except:
        # Si no se puede hacer clic en el botón, salir del bucle
        boton_presente = False

# Lista de peleadores
peleadores = []

# Obtener el HTML después de hacer clic en el botón 100 veces
soup = BeautifulSoup(driver.page_source, "html.parser")

# Encontrar todos los span con la clase 'c-listing-athlete__name'
athlete_names = soup.find_all("span", class_="c-listing-athlete__name")

# Interleaving de la lista de nombres para evitar repeticiones
interleaved_names = [name.text.strip() for i, name in enumerate(athlete_names) if i % 2 == 0]

# Encontrar todos los span con la clase 'c-listing-athlete__title'
athlete_titles = soup.find_all("span", class_="c-listing-athlete__title")

# Encontrar todos los span con la clase 'c-listing-athlete__record'
athlete_records = soup.find_all("span", class_="c-listing-athlete__record")

# Iterar sobre los spans encontrados y agregarlos a la lista de peleadores
for name, title, record in zip(interleaved_names, athlete_titles, athlete_records):
    peleador = {
        "nombre": name,
        "peso": equivalencias_peso.get(title.text.strip(), title.text.strip()),  # Utiliza el equivalente si está en el diccionario, de lo contrario, usa el valor original
        "record": record.text.strip()
    }
    peleadores.append(peleador)

# Cerrar el navegador
driver.quit()

# Crear un diccionario con la lista de peleadores
data = {"peleadores": peleadores}

# Escribir el diccionario en un archivo JSON
with open("peleadores.json", "w") as json_file:
    json.dump(data, json_file, indent=4)

print("Datos guardados en peleadores.json exitosamente.")
