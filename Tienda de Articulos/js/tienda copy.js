function crearBotones(textoBoton, nombreOnclick, idDestinoBoton) {
    textoBoton.forEach(textoBoton => {
      let crearBoton = document.createElement("button"); //? Creamos el boton
      crearBoton.style.marginLeft = "0.5%"; //? Estilo css para dejar margen entre botones
      crearBoton.setAttribute('onclick', nombreOnclick); //? Agregamos el atributo onclick al boton con el nombre que se pasa por parametro.
      let textoDelBoton = document.createTextNode(textoBoton); //? Definimos el texto que va a tener el boton 
      crearBoton.appendChild(textoDelBoton); //? Añadimos el texto al boton
      document.getElementById(idDestinoBoton).appendChild(crearBoton); //? Hora de añadir el boton al dom, para ello cogemos el id que nos ha pasado el usuario ("getElementById(idDestinoBoton)" y añadimos el boton con su nombre y atributos onclick)
    });
  }

  function mostrarCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let contenidoCarrito = "";

    if (carrito.length > 0) {
        contenidoCarrito = carrito.map(articulo => {
            return `Código: ${articulo.codigoArticulo}, Nombre: ${articulo.nombre}, Precio: ${articulo.precio}€, Cantidad: ${articulo.cantidad}`;
        }).join('<br>');
    } else {
        contenidoCarrito = 'El carrito está vacío.';
    }

    document.getElementById('contenidoCarrito').innerHTML = contenidoCarrito;
}



  function borrarCarrito(){
    localStorage.clear();
    document.getElementById('contenidoCarrito').innerHTML="";
}

  crearBotones(["Mostrar carrito"] , "mostrarCarrito()" , "mostrarCarrito");

  

document.addEventListener('DOMContentLoaded', function() {



    async function CapturarJson(){

        let response = await fetch("js/ArticuloTienda.json"); //? Esto se va a cargar en el html, por lo tanto tengo que llamar asi al archivo, basicamente desde la carpeta html
        if (!response.ok){
            console.error("Error no se ha podido cargar los articulos correctametne")
        }
        let json = await response.json();

        const bodyTabla = document.querySelector('table tbody'); //? Cojo el body de la tabla 

        bodyTabla.innerHTML = ""; //? Limpiamos el body de la tabla antes de mostrar los articulos

        try {

            json.forEach(articulo => {
                
                const crearTr = document.createElement('tr'); //? Creamos los tr

                
                Object.values(articulo).forEach(valor => {
                    
                    const crearTd = document.createElement('td'); //? Creamos los td
                    
                    crearTd.textContent = valor; //? Al td le añadimos el valor que tiene cada articulo Nombre .... precio ....., esto para cada uno de los articulos.
                    
                    crearTr.appendChild(crearTd); //? Añadimos dentro del tr el td
                    
                    
                })
                
                 
                //todo Tengo que añadir un boton para cada fila, por lo tanto tengo que añadir un nuevo td para el boton 

                const tdBoton = document.createElement('td'); //? Creo un td adicional para el boton del carrito

                const Boton = document.createElement('button');
                
                Boton.textContent = "Añadir articulo al carrito";

                Boton.onclick = function() { agregarAlCarrito(articulo); }; // todo Añadimos un evento al boton

                
                //? Añadimos el boton al tdBoton 
                
                tdBoton.appendChild(Boton);
                
                crearTr.appendChild(tdBoton);
                
                bodyTabla.appendChild(crearTr) //? Añadimos 

            });
            
        } catch (error) {
            console.log(error)
        }

    }

    function agregarAlCarrito(articulo) {
        // ? Recupero el carrito del localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        //? Obtener el código del artículo, comprobando si la estructura del artículo utiliza "Codigo de articulo" o "codigoArticulo"
        let codigoArticulo = articulo["Codigo de articulo"] || articulo.codigoArticulo; 
        
        //? Buscar en el carrito si el artículo ya existe basado en su código de artículo
        let articuloEncontrado = carrito.find(item => item.codigoArticulo === codigoArticulo);
        
        //? Si el articulo fue encontrado
        if (articuloEncontrado) {
            //? Si el artículo existe, incrementar su cantidad
            articuloEncontrado.cantidad++;
        } else {
            //? Si el artículo no existe en el carrito, comprobar si hay cantidad disponible
            if (articulo.Cantidad > 0) {
                //? Creo un nuevo objeto de artículo para añadir al carrito
                let articuloAñadir = {
                    codigoArticulo: codigoArticulo,
                    nombre: articulo.Nombre,
                    precio: articulo.Precio,
                    cantidad: 1 //? La cantidad inicial es 1 ya que es la primera vez que se añade
                };
                //? Añadir el nuevo articulo al carrito
                carrito.push(articuloAñadir);
            } else {
                //? Si no hay cantidad disponible, mostrar una alerta al usuario
                alert('Este artículo ya no está disponible');
                return; //? Salir de la función ya que no se puede añadir el artículo
            }
        }
        
        //? Guardar el carrito actualizado en el almacenamiento local
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        //? Actualizar la cantidad disponible del artículo en la tabla de la página
        actualizarTabla(codigoArticulo, 1); // Se pasa '1' porque se añadió una unidad del producto al carrito
        
        // Actualizar y mostrar el contenido del carrito en la página
        mostrarCarrito(); 
    }
    
    
    

    function actualizarTabla(codigoArticulo, cantidadVendida) {
        //? Seleccionar todas las filas de la tabla dentro del cuerpo de la tabla
        const filas = document.querySelectorAll('table tbody tr');
        
        //? Iterar a través de cada fila de la tabla
        filas.forEach(fila => {
            //? Comprobar si el primer elemento td de la fila (código del artículo) coincide con el código del artículo que se está buscando
            if (fila.children[0].textContent === codigoArticulo.toString()) {
                //? Obtener el valor actual de la cantidad disponible del artículo, que se encuentra en la tercera columna (index 2) porque se empieza en 0
                let cantidadDisponible = parseInt(fila.children[2].textContent);
                
                //? Restar la cantidad vendida de la cantidad disponible
                cantidadDisponible -= cantidadVendida;
                
                //? Actualizar el texto de la celda de cantidad disponible con el nuevo valor
                fila.children[2].textContent = cantidadDisponible.toString();
                
                //? Seleccionar el boton de la fila en este caso añadirBoton
                const boton = fila.querySelector('button'); 
                
                //? Comprobar si la cantidad disponible es menor o igual a cero después de la actualización
                if (cantidadDisponible <= 0) {
                    //? Desactivar el botón para impedir más clics ya que no hay stock
                    boton.disabled = true;
                    //? Cambiar el texto del botón para indicar que el artículo no está disponible
                    boton.textContent = "No disponible";
                    //? Agregar una clase CSS para cambiar el estilo del botón y reflejar que no está disponible
                    boton.classList.add('btnNoDispo');
                }
            }
        });
    }
    
    
    
    
    

    

    crearBotones(["Borrar carrito"] , "borrarCarrito()" , "borrar_carrito")

    
    CapturarJson();

    
});

