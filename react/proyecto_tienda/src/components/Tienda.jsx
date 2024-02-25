import React, { useState, useEffect } from "react";
import './Tienda.css';
export default function Tienda() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    const CargarArticulos = async () => {
      try {
        const respuesta = await fetch("../../public/Articulos.json");
        const datos = await respuesta.json();
        setArticulos(datos);
      } catch (error) {
        console.error("Error al cargar los artículos", error);
      }
    };

    CargarArticulos(); // Asegúrate de llamar a la función para cargar los artículos.
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente.

  /* funcion Evento onclick */



  const agregarAlCarrito = (itemAComprar) => {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const itemIndex = carrito.findIndex((articulo) => articulo["Codigo de articulo"] === itemAComprar["Codigo de articulo"]);
  
    //todo  Disminuir la cantidad de stock del articulo comprado
    const articulosActualizados = articulos.map(item => {
      if (item["Codigo de articulo"] === itemAComprar["Codigo de articulo"]) {
        //? Asegurarse de no tener cantidades negativas
        const nuevaCantidad = item.Cantidad > 0 ? item.Cantidad - 1 : 0;
        return { ...item, Cantidad: nuevaCantidad };
      }
      return item;
    });
  
    //? Actualizar el estado de los artículos con las cantidades modificadas
    setArticulos(articulosActualizados);
  
    // Si el artículo ya existe en el carrito y aún tiene stock, incrementa la cantidad
    if (itemIndex > -1 && itemAComprar.Cantidad > 0) {
      carrito[itemIndex].cantidad += 1;
    } else if (itemAComprar.Cantidad > 0) {
      // Si el artículo no existe y aún tiene stock, añádelo al carrito con cantidad inicial de 1
      const newItem = { ...itemAComprar, cantidad: 1 };
      carrito.push(newItem);
    } else {
      // Opcional: Manejar el caso de intentar comprar un artículo sin stock
      alert("No hay stock disponible para este producto.");
      return; // Salir de la función para no añadir al carrito
    }
  
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
  
    console.log('Carrito actualizado:', carrito);
  };
  
  
  
  return (
    <div className="grid-container">
  {articulos.map((item) => (
    <div key={item["Codigo de articulo"]} className="card div_contenido" style={{ position: 'relative', paddingBottom: '2.5rem' }}>
      <img src={item.Imagen} alt={item.Nombre} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{item.Nombre}</h5>
        <p className="card-text">Precio: ${item.Precio}</p>
        <p className="card-text">Cantidad disponible: {item.Cantidad}</p>
      </div>
      <button type="button" className="btn btn-success" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }} onClick={() => agregarAlCarrito(item)}>Comprar</button>  
    </div>
  ))}
</div>
  );
}
