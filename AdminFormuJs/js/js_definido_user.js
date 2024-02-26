document.addEventListener('DOMContentLoaded', () => {
  const formularioLogin = document.querySelector(".offcanvas-body form");
  const offcanvasElement = document.getElementById("offcanvasRight");
  const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);

  // Definimos los usuarios permitidos con sus roles
  const usuariosPermitidos = [
    { email: "admin@admin.com", contraseña: "admin", tipo: "admin" },
    { email: "sergio@gmail.com", contraseña: "sergio", tipo: "user" }
  ];

  formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById("inputEmail").value.trim();
    const contraseña = document.getElementById("inputPassword").value.trim();

    // Verificamos si los campos están vacíos
    if (email === "" || contraseña === "") {
      alert("Los campos no pueden estar vacíos");
      return;
    }

    // Buscamos el usuario en los usuarios permitidos
    const usuario = usuariosPermitidos.find(u => u.email === email && u.contraseña === contraseña);

    // Acciones según el tipo de usuario o si no se encuentra
    if (usuario) {
      localStorage.setItem('iniciadoSesion', usuario.tipo);
      if (usuario.tipo === "admin") {
        mostrarMensajeAdmin(email);
      } else {
        mostrarBuscadorYArticulos();
      }
      bsOffcanvas.hide();
    } else {
      alert("La contraseña o el email es incorrecto y no eres un usuario el cual pueda acceder a este sitio");
    }
  });

  // Verifica el tipo de sesión iniciada para decidir qué mostrar
  const tipoSesion = localStorage.getItem('iniciadoSesion');
  if (tipoSesion === 'user') {
    mostrarBuscadorYArticulos();
  } else if (tipoSesion === 'admin') {
    mostrarMensajeAdmin("admin@admin.com");
  } else {
    mostrarBienvenida();
  }
});

// Función para mostrar el buscador y cargar los artículos
async function mostrarBuscadorYArticulos() {
  const contenedorPrincipal = document.getElementById("contenedor_principal");
  
  // Crea el buscador en el contenedor principal
  contenedorPrincipal.innerHTML = `
    <nav class="navbar">
      <div class="container-fluid d-flex justify-content-center">
        <form class="d-flex" role="search" id="formularioBusqueda">
          <input class="form-control me-2" id="inputArticuloBuscado" type="search" placeholder="Busca un artículo" aria-label="Search">
          <button class="btn btn-outline-success" type="button">Buscar</button>
        </form>
      </div>
    </nav>
    <div id="resultadosBusqueda"></div>
  `;

  // todo Cambio el listener a 'input' para reaccionar en tiempo real a la busqueda que esta haciendo el usuario en el input
  document.getElementById("inputArticuloBuscado").addEventListener('input', async (e) => {
    const articuloBuscado = e.target.value;
    await promesaAsync(articuloBuscado); // Filtra y muestra los articulos según la busqueda
  });

  await promesaAsync(); // Carga inicial de todos los artículos
}

// Función para cargar y mostrar los artículos según el término de búsqueda
async function promesaAsync(terminoBusqueda = '') {
  try {
    const response = await fetch("PacoApiPost.json");
    let json = await response.json();
    
    // Filtra los artículos si se ha introducido un término de búsqueda
    if (terminoBusqueda) {
      json = json.filter(item => item.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()));
    }

    const resultadosBusqueda = document.getElementById("resultadosBusqueda");
    resultadosBusqueda.innerHTML = ''; // Limpia los resultados previos

    // Muestra los artículos filtrados o todos si no hay búsqueda
    json.forEach(item => {
      let crearDivPost = document.createElement("div");
      crearDivPost.classList.add("div_contenido");
      crearDivPost.innerHTML = `
        <img src="${item.imagen}" class="imagen" alt="Imagen del post">
        <h2>Post del id ${item.user_id}</h2>
        <p><strong>Título:</strong> ${item.titulo}</p>
        <p><strong>Contenido:</strong> ${item.contenido}</p>
        <p>Estado: <span>${item.estado}</span></p>
      `;

      let imagenes = crearDivPost.querySelector("img.imagen");
      imagenes.addEventListener("click", function() {
        this.classList.toggle("imagen-ampliada"); // Permite ampliar la imagen al hacer clic
      });

      resultadosBusqueda.appendChild(crearDivPost); // Agrega el artículo al contenedor de resultados
    });
  } catch (error) {
    console.error("Error al cargar los artículos:", error);
  }
}

// Función para mostrar el mensaje de bienvenida
function mostrarBienvenida() {
  const contenedorPrincipal = document.getElementById("contenedor_principal");
  contenedorPrincipal.innerHTML = `<p>Bienvenido a la tienda de SergioShop, espero que encuentres lo que necesitas</p>`;
}

// Función para mostrar el mensaje de inicio de sesión como administrador
function mostrarMensajeAdmin(email) {
  const contenedorPrincipal = document.getElementById("contenedor_principal");
  contenedorPrincipal.innerHTML = `Has iniciado sesión como administrador con el email ${email}`;
}

function borrarLocalStorage(){
  localStorage.clear();
  console.log("borrada");
}

document.getElementById("borrarLocalStorage").addEventListener("click" , borrarLocalStorage);

console.log(localStorage);