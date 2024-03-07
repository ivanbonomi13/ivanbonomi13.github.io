document.addEventListener('DOMContentLoaded', function () {
    var eventosNumeradosElements = document.querySelectorAll('.eventosNumerados');

    eventosNumeradosElements.forEach(function (element) {
        element.addEventListener('mouseenter', function () {
            // Aplicar desenfoque a todos los elementos excepto al elemento actual
            eventosNumeradosElements.forEach(function (el) {
                if (el !== element) {
                    el.classList.add('blurred');
                }
            });
        });

        element.addEventListener('mouseleave', function () {
            // Quitar el desenfoque de todos los elementos
            eventosNumeradosElements.forEach(function (el) {
                el.classList.remove('blurred');
            });
        });

        element.addEventListener('mousemove', function (evt) {
            const { layerX, layerY } = evt;
            const height = element.clientHeight;
            const width = element.clientWidth;

            const yRotation = ((layerX - width / 2) / width) * 20;
            const xRotation = ((layerY - height / 2) / height) * 20;

            const string = `
                perspective(500px)
                scale(1.1)
                rotateX(${xRotation}deg)
                rotateY(${yRotation}deg)`;

            element.style.transform = string;
        });

        element.addEventListener('mouseout', function () {
            element.style.transform = `
            perspective(500px)
            scale(1)
            rotateX(0)
            rotateY(0)`;
        });
    });
});
