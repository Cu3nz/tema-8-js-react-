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



  const agregarAlCarrito = (item) => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  
    // Buscar si el artículo ya existe en el carrito
    const itemIndex = carrito.findIndex((articulo) => articulo["Codigo de articulo"] === item["Codigo de articulo"]);

    
    

    if (itemIndex > -1) {
      // Si el artículo ya existe, incrementa la cantidad
      carrito[itemIndex].cantidad += 1; // Asegurándonos de que se incrementa correctamente
    } else {
      // Si el artículo no existe, añádelo al carrito con cantidad inicial de 1
      const newItem = { ...item, cantidad: 1 }; // Asegura que el nuevo artículo tenga la propiedad cantidad
      carrito.push(newItem);
    }
  
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
  
    // Opcional: para verificar en consola
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
