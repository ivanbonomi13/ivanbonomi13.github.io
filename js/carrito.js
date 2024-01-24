document.addEventListener("DOMContentLoaded", function () {
    var carrito = [];

    // Precios predeterminados para cada producto
    var precios = {
        'Remera UFC Hawaii': 29.99,
        'Remera Conor Mcgregor': 24.99,
        'Remera UFC Usa': 19.99,
        'Bolso UFC': 14.99,
        'Cinturon Campeon': 9.99,
        'Gorra UFC': 4.99,  // Puedes cambiar este valor según tus necesidades
    };

    function agregarAlCarrito(producto) {
        var precio = precios[producto];

        var productoEnCarrito = carrito.find(item => item.producto === producto);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ producto: producto, precio: precio, cantidad: 1 });
        }

        actualizarCarrito();
        mostrarNotificacion("¡Producto agregado al carrito!");
    }

    function actualizarCarrito() {
        var carritoVentana = document.getElementById("carritoVentana");
        carritoVentana.innerHTML = "<h3>Carrito</h3>";

        var total = 0;
        carrito.forEach(function (item) {
            var subtotal = item.precio * item.cantidad;
            carritoVentana.innerHTML += `<p>${item.producto} x ${item.cantidad}: $${subtotal.toFixed(2)}</p>`;
            total += subtotal;
        });

        carritoVentana.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
    }

    function abrirCarritoModal() {
        var modal = document.getElementById("carritoModal");
        modal.style.display = "block";
        actualizarCarrito();
    }

    function cerrarCarritoModal() {
        var modal = document.getElementById("carritoModal");
        modal.style.display = "none";
    }

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
    }

    function mostrarNotificacion(mensaje) {
        if (Notification.permission === "granted") {
            var options = {
                body: mensaje,
                icon: "imagenes/LogoUFC.png"  // Reemplaza esto con la ruta de tu propio icono
            };

            var notification = new Notification("¡Producto agregado al carrito!", options);

            // Cerrar la notificación después de 2 segundos
            setTimeout(function () {
                notification.close();
            }, 2000);
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    mostrarNotificacion(mensaje);
                }
            });
        }
    }



    var verCarritoBtn = document.getElementById("verCarritoBtn");
    verCarritoBtn.addEventListener("click", abrirCarritoModal);

    // Agregar funcionalidad al botón "Cerrar Carrito"
    var cerrarCarritoBtn = document.getElementById("cerrarCarritoBtn");
    cerrarCarritoBtn.addEventListener("click", cerrarCarritoModal);

    // Agregar funcionalidad al botón "Vaciar Carrito"
    var vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");
    vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

    // Agregar funcionalidad a los botones "Agregar al Carrito"
    var botonesAgregarCarrito = document.querySelectorAll(".producto button");
    botonesAgregarCarrito.forEach(function (boton) {
        boton.addEventListener("click", function () {
            var producto = this.parentElement.querySelector("img").alt;
            agregarAlCarrito(producto);
        });
    });
});
