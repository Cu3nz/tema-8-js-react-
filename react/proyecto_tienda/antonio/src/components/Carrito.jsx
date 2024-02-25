import React, { useState, useEffect } from "react";

export default function Carrito() {
  const [articulosCarrito, setArticulosCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    // Cargar el carrito de localStorage al montar el componente
    cargarCarrito();
  }, []);

  /* Aqui dentro esta almacenado el array de LocalStorage, solamente tengo que capturar lo que hay dentro */
  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    setArticulosCarrito(carritoGuardado);
  };

  /* funcion que muestra el carrito o no, si no hay nada en el carro te muestra un mensaje y si hay algo muestra eso */
  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  /* borra el carrito */
  const borrarCarrito = () => {
    localStorage.removeItem("carrito");
    setArticulosCarrito([]); // Actualizar el estado para reflejar que el carrito está vacío
  };

  

  return (
    <div>
      <button onClick={toggleCarrito} className="btn btn-info">
        {mostrarCarrito ? "Ocultar Carrito" : "Mostrar Carrito"}  {/* Cambia el texto segun si has pulsado o no */}
      </button>
      <button onClick={borrarCarrito} className="btn btn-danger">
        Borrar Carrito
      </button>
      {/* Si existe el carrito, me muestra los datos */}
      {mostrarCarrito && (
        <div>
          <h2 class="text-center">Has añadido al carrito</h2>
          {articulosCarrito.length > 0 ? (
            articulosCarrito.map((item) => (
              <div key={item["Codigo de articulo"]}>
                <h5>{item.Nombre}</h5>
                <p>Precio: ${item.Precio}</p>
                <p>Cantidad de productos: {item.cantidad}</p> {/* Cantidad de productos que se ha añadido */}
                {/* Otros detalles del artículo */}
              </div>
            ))
            /* Si no, me muestra este mensaje */
          ) : (
            <p>Tu carrito está vacío</p>
          )}
        </div>
      )}
    </div>
  );
}
