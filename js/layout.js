const header = document.querySelector('header')
const footer = document.querySelector('footer')

header.innerHTML = `
<nav>
    <a href="/Carteleras.html" class="menu-item left-menu"> Eventos </a>
    <a href="/Rankings.html" class="menu-item left-menu"> Rankings </a>
    <a href="/index.html" class="menu-item ufc-logo" id="logo-ufc"><img  src="/imagenes/Letras-ufc-rojas.jpg"></a>
    <a href="/Peleadores.html" class="menu-item right-menu"> Peleadores </a>
    <a href="/Tienda.html" class="menu-item right-menu"> Tienda </a>
</nav>
`;

footer.innerHTML = `
<div class="content-footer">
    <label class="lbl-footer">Todos los derechos reservados ©</label>
    </div>
`;