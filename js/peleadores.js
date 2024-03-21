function mostrarPeleadores() {
    const jsonPath = '/peleadores.json'; // Reemplaza con la URL correcta del JSON
    const contenedorPeleadores = document.getElementById('contenedor-peleadores');

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                construirPeleadores(data.peleadores);
            } else {
                console.error('Error al cargar el archivo JSON:', xhr.statusText);
            }
        }
    };

    xhr.open('GET', jsonPath, true);
    xhr.send();

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
            h5Peso.textContent = `Peso ${peleador.peso}`;

            divFront.appendChild(h2Nombre);
            divFront.appendChild(imgAvatar);
            divFront.appendChild(h5Peso);

            const divBack = document.createElement('div');
            divBack.classList.add('back');

            const h2NombreBack = document.createElement('h2');
            h2NombreBack.textContent = peleador.nombre;

            const pPeso = document.createElement('p');
            pPeso.textContent = `Peso ${peleador.peso}`;

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
}

window.onload = mostrarPeleadores;
