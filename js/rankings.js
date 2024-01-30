function mostrarRankings() {
    const jsonPath = '/rankings.json'; // Reemplaza con la URL correcta del JSON
    const contenedorRankings = document.getElementById('contenedor-rankings');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                construirRankings(data.categorias);
            } else {
                console.error('Error al cargar el archivo JSON:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', jsonPath, true);
    xhr.send();

    function construirRankings(categorias) {
        const contenedorRankings = document.getElementById('contenedor-rankings');

        for (const categoria of categorias) {
            const contenedorTabla = document.createElement('div');
            contenedorTabla.classList.add('contenedor-tabla');

            const tabla = document.createElement('table');
            tabla.classList.add('tabla-rankings');

            const filaCabecera = document.createElement('tr');
            const celdaCabecera = document.createElement('th');
            celdaCabecera.colSpan = 2;

            const encabezadoCategoria = document.createElement('div');
            encabezadoCategoria.classList.add('rankings--athlete--champion', 'clearfix', 'fadeIn', 'expanded');

            const infoCategoria = document.createElement('div');
            infoCategoria.classList.add('info');

            const nombreCategoria = document.createElement('h4');
            nombreCategoria.textContent = categoria.nombre;

            const nombreCampeon = document.createElement('h5');
            const enlaceCampeon = document.createElement('a');
            enlaceCampeon.href = `/Peleadores/${categoria.campeon}.html`; // Reemplaza con la ruta correcta
            enlaceCampeon.hreflang = 'es'; // Reemplaza con el idioma correcto
            enlaceCampeon.appendChild(document.createTextNode(categoria.campeon));
            nombreCampeon.appendChild(enlaceCampeon);

            const fraseCampeon = document.createElement('h6');
            fraseCampeon.classList.add('text');
            fraseCampeon.textContent = 'Campeón';

            const imagenCampeon = document.createElement('img');
            imagenCampeon.src = `imagenes/${categoria.campeon}.jpg`; // Reemplaza con la ruta correcta de la imagen
            imagenCampeon.alt = `${categoria.campeon}`;

            infoCategoria.appendChild(nombreCategoria);
            infoCategoria.appendChild(nombreCampeon);
            infoCategoria.appendChild(fraseCampeon);

            encabezadoCategoria.appendChild(infoCategoria);
            encabezadoCategoria.appendChild(imagenCampeon);

            celdaCabecera.appendChild(encabezadoCategoria);
            filaCabecera.appendChild(celdaCabecera);
            tabla.appendChild(filaCabecera);

            for (const peleador of categoria.peleadores) {
                const filaPeleador = document.createElement('tr');
                filaPeleador.innerHTML = `<td class="posicion">${peleador.posicion}</td>
                                        <td class="peleador-ranking" id="miElemento" colspan="1"><a >${peleador.nombre}</a></td>`;
                tabla.appendChild(filaPeleador);
            }

            // href="/Peleadores/${peleador.nombre}.html"


            // Agregar eventos de mouseover y mouseout a cada elemento anterior y elemento-a-estilar
            const elementosAnteriores = document.querySelectorAll('.posicion');
            const elementosAestilar = document.querySelectorAll('.peleador-ranking');

            elementosAnteriores.forEach(function (elementoAnterior, index) {
                elementoAnterior.addEventListener('mouseover', function () {
                    // Cambiar el fondo tanto del elemento anterior como del elemento-a-estilar
                    elementoAnterior.style.backgroundColor = '#e3e3e3';
                    elementosAestilar[index].style.backgroundColor = '#e3e3e3';
                });

                elementoAnterior.addEventListener('mouseout', function () {
                    // Restaurar el fondo predeterminado tanto del elemento anterior como del elemento-a-estilar
                    elementoAnterior.style.backgroundColor = '#fff';
                    elementosAestilar[index].style.backgroundColor = '#fff';
                });
            });

            elementosAestilar.forEach(function (elementoAestilar, index) {
                elementoAestilar.addEventListener('mouseover', function () {
                    // Cambiar el fondo tanto del elemento anterior como del elemento-a-estilar
                    elementosAnteriores[index].style.backgroundColor = '#e3e3e3';
                    elementoAestilar.style.backgroundColor = '#e3e3e3';
                });

                elementoAestilar.addEventListener('mouseout', function () {
                    // Restaurar el fondo predeterminado tanto del elemento anterior como del elemento-a-estilar
                    elementosAnteriores[index].style.backgroundColor = '#fff';
                    elementoAestilar.style.backgroundColor = '#fff';
                });
            });

            contenedorTabla.appendChild(tabla);
            contenedorRankings.appendChild(contenedorTabla);
        }
    }
}

window.onload = mostrarRankings;
