const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Crear un elemento link para el archivo CSS de Bootstrap
const bootstrapCSSLink = document.createElement('link');
bootstrapCSSLink.rel = 'stylesheet';
bootstrapCSSLink.href = '/intalacion-bt-ac/css/bootstrap.min.css';

// Agregar el enlace al head del documento
document.head.appendChild(bootstrapCSSLink);

// Crear un elemento link para el archivo CSS de Bootstrap
const bootstrapCSSIconsLink = document.createElement('link');
bootstrapCSSLink.rel = 'stylesheet';
bootstrapCSSLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">';

// Agregar el enlace al head del documento
document.head.appendChild(bootstrapCSSIconsLink);

header.innerHTML = `
<nav>

<input type="checkbox" id="check">
<label for="check" class="checkbtn">
    
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
  </svg>
</label>

    
<ul>
  <li><a href="/Carteleras.html" class="menu-item">Eventos</a></li>
  <li><a href="/Rankings.html" class="menu-item">Rankings</a></li>
  <li><a href="/index.html" class="menu-item" id="logo-ufc" ><img  src="/imagenes/Letras-ufc-rojas.jpg"></a></li>
  <li><a href="/Peleadores.html" class="menu-item">Peleadores</a></li>
  <li><a href="/Tienda.html" class="menu-item">Tienda</a></li>
</ul>
</nav>
`;

footer.innerHTML = `
<div class="content-footer">
    <label class="lbl-footer">Todos los derechos reservados ©</label>
</div>
`;

// Crear un elemento script para el archivo JavaScript de Bootstrap
const bootstrapScript = document.createElement('script');
bootstrapScript.src = '/intalacion-bt-ac/js/bootstrap.bundle.min.js';
document.body.appendChild(bootstrapScript);
