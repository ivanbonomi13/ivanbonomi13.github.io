import os
import json
import unicodedata

# Ruta al archivo JSON
ruta_json = 'C:\\Users\\ivan.bonomi\\Desktop\\ivanbonomi13.github.io\\Peleadores.json'

# Lee el archivo JSON
with open(ruta_json) as f:
    data = json.load(f)

# Accede a la lista de peleadores
peleadores = data['peleadores']

# Directorio donde se guardarán los archivos HTML en el escritorio
directorio_script = os.path.dirname(__file__)
directorio_destino = os.path.abspath(os.path.join(directorio_script, '..', 'Peleadores'))

# Crea el directorio si no existe
if not os.path.exists(directorio_destino):
    os.makedirs(directorio_destino)

# Itera sobre cada peleador
for peleador in peleadores:
    nombre = peleador['nombre']
    peso = peleador['peso']
    record = peleador['record']
    
    # Normaliza el nombre del peleador para eliminar representaciones de escape Unicode
    nombre_normalizado = unicodedata.normalize('NFKD', nombre).encode('ascii', 'ignore').decode()
    
    # Genera el nombre del archivo HTML
    nombre_archivo = f"{nombre_normalizado}.html"
    
    # Contenido HTML para el peleador actual
    contenido_html = f"""
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="/css/EstiloIndividuales.css">
    <link rel="stylesheet" type="text/css" href="/css/normalize.css">
    <link rel="stylesheet" type="text/css" href="/css/layout.css">
    <link rel="icon" href="/imagenes/LogoUFC.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
    <title>{peleador['nombre']}</title>
</head>

<body>
    <header>
    </header>

    <main>
        <div class="contenedor-informacion">
            <div class="informacion">
                <h1>{peleador['nombre']}</h1>
                <p class="division">{peleador['peso']}</p>
                <p class="record">{peleador['record']}</p>
            </div>
            <img src="../imagenes/{peleador['nombre']} Completo.jpg">
        </div>
    </main>
    <footer></footer>
    <script src="/js/layout.js"></script>
</body>

</html>
    """

    # Escribe el contenido en el archivo HTML correspondiente
    with open(os.path.join(directorio_destino, nombre_archivo), 'w', encoding='utf-8') as html_file:
        html_file.write(contenido_html)

    # Decodifica el nombre antes de imprimirlo para evitar errores de codificación
    print("Archivo HTML generado para", nombre.encode('ascii', 'ignore').decode(), ":", nombre_archivo)
