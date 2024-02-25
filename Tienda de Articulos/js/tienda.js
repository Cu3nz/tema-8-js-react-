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
    //todo Recupero el carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];


    let contenidoCarrito = carrito.map(articulo => {
        return `Código: ${articulo.codigoArticulo}, Nombre: ${articulo.nombre}, Precio: ${articulo.precio}€`;
    }).join('<br>'); //? Concateno el mensaje con un br.
    
   //? Mostramos el contenido del carrito en un div.
    document.getElementById('contenidoCarrito').innerHTML = contenidoCarrito;

    if (carrito.length === 0) { // ? Si el carrito esta vacio, muestro el siguiente mensaje
        document.getElementById('contenidoCarrito').innerHTML = 'El carrito esta vacio.';
    }
}

  function borrarCarrito(){
    localStorage.clear();
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
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
        //todo Creo un nuevo objeto que solo contenga los atributos deseados
        let articuloAñadir = {
            codigoArticulo: articulo["Codigo de articulo"],
            nombre: articulo.Nombre,
            precio: articulo.Precio
        };
        
        //? Añadir este nuevo objeto al carrito
        carrito.push(articuloAñadir);
        
        //?Guardo el carrito actualizado en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));
        
        alert('Artículo añadido al carrito');
        console.log(carrito);
    }

    
    

    

    crearBotones(["Borrar carrito"] , "borrarCarrito()" , "borrar_carrito")

    
    CapturarJson();

    
});

