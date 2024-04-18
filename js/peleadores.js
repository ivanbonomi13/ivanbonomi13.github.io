function mostrarPeleadores() {
    const jsonPath = '/peleadores.json';
    const contenedorPeleadores = document.getElementById('contenedor-peleadores');
    const inputBuscar = document.getElementById('inputBuscar');
    let peleadoresOriginales; // Variable para almacenar los datos originales de los peleadores

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                peleadoresOriginales = data.peleadores; // Almacenar los datos originales
                construirPeleadores(peleadoresOriginales); // Construir peleadores originales al cargar la página
                
                // Agregar evento de input al input de búsqueda
                inputBuscar.addEventListener('input', function() {
                    const valorBusqueda = inputBuscar.value.trim().toLowerCase();
                    const peleadoresFiltrados = peleadoresOriginales.filter(function(peleador) {
                        const nombreCompleto = peleador.nombre.toLowerCase();
                        const partesNombre = nombreCompleto.split(' '); // Dividir el nombre en partes (nombre y apellido)
                        const primerNombre = partesNombre[0];
                        const apellido = partesNombre[partesNombre.length - 1];
                
                        // Verificar si el nombre o el apellido comienzan con el valor de búsqueda
                        return primerNombre.startsWith(valorBusqueda) || apellido.startsWith(valorBusqueda);
                    });
                    limpiarContenedorPeleadores();
                    construirPeleadores(peleadoresFiltrados);
                });
                
            } else {
                console.error('Error al cargar el archivo JSON:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', jsonPath, true);
    xhr.send();


    inputBuscar.addEventListener('input', function() {
        const valorBusqueda = inputBuscar.value.trim().toLowerCase();
        const peleadoresFiltrados = data.peleadores.filter(function(peleador) {
            return peleador.nombre.toLowerCase().includes(valorBusqueda);
        });
        limpiarContenedorPeleadores();
        construirPeleadores(peleadoresFiltrados);
    });

    function construirPeleadores(peleadores) {
        for (const peleador of peleadores) {
            const divPeleador = document.createElement('div');
            divPeleador.classList.add('peleadores');

            const divFront = document.createElement('div');
            divFront.classList.add('front');

            const h2Nombre = document.createElement('h2');
            h2Nombre.textContent = peleador.nombre;

            const imgAvatar = document.createElement('img');
            imgAvatar.src = `imagenes/${peleador.nombre}.jpg`; // Reemplaza con la ruta correcta de la imagen
            // imgAvatar.alt = peleador.nombre;

            const h5Peso = document.createElement('h5');
            h5Peso.textContent = `${peleador.peso}`;

            divFront.appendChild(h2Nombre);
            divFront.appendChild(imgAvatar);
            divFront.appendChild(h5Peso);

            const divBack = document.createElement('div');
            divBack.classList.add('back');

            const h2NombreBack = document.createElement('h2');
            h2NombreBack.textContent = peleador.nombre;

            const pPeso = document.createElement('p');
            pPeso.textContent = `${peleador.peso}`;

            const pRecord = document.createElement('p');
            pRecord.classList.add('record');
            pRecord.textContent = peleador.record;

            const divContentBox = document.createElement('div');
            divContentBox.classList.add('contentBox');

            const divButtonBox = document.createElement('div');
            divButtonBox.classList.add('buttonBox');

            const boton = document.createElement('button');
            boton.classList.add('boton');

            const enlacePerfil = document.createElement('a');
            enlacePerfil.href = `/Peleadores/${peleador.nombre}.html`; // Reemplaza con la ruta correcta
            enlacePerfil.textContent = 'Perfil de atleta';

            boton.appendChild(enlacePerfil);
            divButtonBox.appendChild(boton);
            divContentBox.appendChild(divButtonBox);

            divBack.appendChild(h2NombreBack);
            divBack.appendChild(document.createElement('br'));
            divBack.appendChild(pPeso);
            divBack.appendChild(document.createElement('br'));
            divBack.appendChild(pRecord);
            divBack.appendChild(document.createElement('br'));
            divBack.appendChild(divContentBox);

            const imgCompleto = document.createElement('img');
            imgCompleto.src = `imagenes/${peleador.nombre} Completo.jpg`; // Reemplaza con la ruta correcta de la imagen completa
            // imgCompleto.alt = `${peleador.nombre} Completo`;

            divBack.appendChild(imgCompleto);

            divPeleador.appendChild(divFront);
            divPeleador.appendChild(divBack);

            contenedorPeleadores.appendChild(divPeleador);
        }
    }
    function limpiarContenedorPeleadores() {
        contenedorPeleadores.innerHTML = '';
    }
}

window.onload = mostrarPeleadores;
