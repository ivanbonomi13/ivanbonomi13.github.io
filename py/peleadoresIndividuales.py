import os
import json

# Lee el archivo JSON
with open('../peleadores.json') as f:
    peleadores = json.load(f)

# Directorio donde se guardarán los archivos HTML
directorio_destino = os.path.join(os.path.dirname(__file__), '../Peleadores')

# Crea el directorio si no existe
if not os.path.exists(directorio_destino):
    os.makedirs(directorio_destino)

# Recorre cada peleador
for peleador in peleadores:
    nombre_archivo = f"{peleador['nombre'].replace(' ', '_')}.html"  # Reemplaza espacios en el nombre con guiones bajos y agrega extensión .html
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
            <img src="{peleador['nombre']} Completo.jpg">
        </div>
    </main>
    <footer></footer>
    <script src="/js/layout.js"></script>
</body>

</html>
    """

    # Escribe el contenido en el archivo HTML correspondiente
    with open(os.path.join(directorio_destino, nombre_archivo), 'w') as html_file:
        html_file.write(contenido_html)

    print(f"Archivo HTML generado para {peleador['nombre']}: {nombre_archivo}")
