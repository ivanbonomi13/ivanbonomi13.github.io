import os
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time

# Configuración de Selenium
driver = webdriver.Chrome()  # O ajusta el navegador que prefieras
driver.implicitly_wait(5)  # Espera implícita de 5 segundos
driver.get("https://www.ufcespanol.com/athletes/all?filters[0]=status:23")

# Variable para controlar si el botón "Load More" está presente
boton_presente = True

# Espera explícita con un tiempo máximo definido
wait = WebDriverWait(driver, 30)

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

# Obtener el HTML después de hacer clic en todos los botones "Load More"
soup = BeautifulSoup(driver.page_source, "html.parser")

# Encontrar todos los divs con la clase 'c-listing-athlete-flipcard__front'
flipcard_divs = soup.find_all("div", class_="c-listing-athlete-flipcard__front")

# Directorio donde se guardarán las imágenes
directorio_imagenes = "C:\\Users\\ivan.bonomi\\Desktop\\ivanbonomi13.github.io\\imagenes"

# Crear el directorio si no existe
if not os.path.exists(directorio_imagenes):
    os.makedirs(directorio_imagenes)

# Iterar sobre los divs encontrados para obtener el nombre del peleador y la URL de la imagen
for flipcard in flipcard_divs:
    # Nombre del peleador
    nombre_peleador = flipcard.find("span", class_="c-listing-athlete__name").text.strip()
    
    # Encontrar la etiqueta de imagen si existe
    imagen_tag = flipcard.find("img")
    
    # Verificar si se encontró una etiqueta de imagen y si tiene un atributo "src"
    if imagen_tag and "src" in imagen_tag.attrs:
        # URL de la imagen
        imagen_url = imagen_tag["src"]
        
        # Descargar la imagen y guardarla en el directorio especificado
        try:
            response = requests.get(imagen_url)
            if response.status_code == 200:
                with open(os.path.join(directorio_imagenes, f"{nombre_peleador}.jpg"), 'wb') as f:
                    f.write(response.content)
        except Exception as e:
            print(f"No se pudo descargar la imagen para {nombre_peleador}: {str(e)}")
    else:
        # Si no se encuentra una etiqueta de imagen o no tiene atributo "src", continuar con el siguiente peleador
        print(f"No se encontró imagen para {nombre_peleador}.")
        continue

# Cerrar el navegador
driver.quit()

print("Descarga de imágenes completada.")
