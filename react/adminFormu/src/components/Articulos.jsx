import React, { useState, useEffect } from 'react';
import './Promesa.css'; // Asegúrate de tener este archivo CSS para estilos personalizados

function Articulos({ terminoBusqueda }) {
  const [articulos, setArticulos] = useState([]); // Estado para almacenar los artículos

  useEffect(() => {
    const cargarArticulos = async () => {
      try {
        // Asegúrate de que la ruta a tu archivo JSON es correcta y accesible
        const respuesta = await fetch("../../public/PacoApiPost.json");
        if (!respuesta.ok) throw new Error('Respuesta de red no fue exitosa');
        const datos = await respuesta.json();
        setArticulos(datos); // Actualizamos el estado con los datos cargados
      } catch (error) {
        console.error("Error cargando los artículos: ", error);
      }
    };

    cargarArticulos(); //* Llamamos a la función para cargar los artículos
  }, []); // El array vacia asegura que esto se ejecute solamente una vez al montar el componente

  // Filtramos los artículos según el término de búsqueda
  const articulosFiltrados = articulos.filter(articulo =>
    articulo.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  return (
    <div>
      {/* Verificamos si hay artículos después de filtrar */}
      {articulosFiltrados.length > 0 ? ( //* Si encuentra un articulo lo muestra
        articulosFiltrados.map((item) => (
          // Renderizamos cada artículo filtrado
          <div key={item.id} className={`div_contenido ${item.user_id === 2 ? 'id_2' : ''}`}>
            <img src={item.imagen} alt="" className="imagen" onClick={(e) => e.currentTarget.classList.toggle('imagen-ampliada')} />
            <h2>Post del id {item.id}</h2>
            <p><strong>Título:</strong> {item.titulo}</p>
            <p><strong>Contenido: </strong>{item.contenido}</p>
            <p>Estado: <span>{item.estado}</span></p>
          </div>
        ))
      ) : (
        //! Si no hay artículos que coincidan con la búsqueda, mostramos este mensaje
        <p>No se han encontrado articulos que coincidan con la busqueda.</p>
      )}
    </div>
  );
}

export default Articulos;
