import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json

# Configuración de Selenium
driver = webdriver.Chrome()  # O ajusta el navegador que prefieras
driver.get("https://www.ufcespanol.com/athletes/all?filters[0]=status:23")
wait = WebDriverWait(driver, 10)

# Hacer clic en el botón "Load More" 100 veces con una pausa de 2 segundos entre cada clic
for _ in range(100):
    try:
        # Esperar a que el botón sea visible y haga clic en él
        load_more_button = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, 'a.button')))
        load_more_button.click()
        
        # Esperar 2 segundos para que se carguen los nuevos peleadores
        time.sleep(2)
    except:
        # Si no se puede encontrar el botón, salir del bucle
        break

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
        "peso": title.text.strip(),
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

