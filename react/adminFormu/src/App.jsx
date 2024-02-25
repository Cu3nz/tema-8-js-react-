// Importaciones necesarias para usar React, useState, React Router y estilos CSS
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap
import "./App.css"; // Importa los estilos CSS personalizados
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articulos from "./components/Articulos.jsx"; // Importa el componente de Artículos
import Login from "./components/Login.jsx"; // Importa el componente de Login

function App() {
  // Estado para manejar el termino de busqueda del formulario
  const [buscarArticulo, setBuscarArticulo] = useState("");

  // Funcion para manejar el envío del formulario de búsqueda
  const ArticuloABuscar = (e) => {
    e.preventDefault(); //* Previene el comportamiento por defecto del formulario (recargar la página)

  };

  return (
    
    <Router>
      {/* Título de la cabecera de la página */}
      <h1 className='text-center p-5 bg-dark text-white'>CABECERA</h1>

      {/* Barra de navegacion para el formulario de búsqueda */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-center">
          {/* //? Formulario para buscar articulos, utiliza la funcion "ArticuloABuscar" al enviar el formulario */}
          <form className="d-flex" role="search" onSubmit={ArticuloABuscar}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Introduce el título" 
              aria-label="Search" 
              value={buscarArticulo}
              onChange={(e) => setBuscarArticulo(e.target.value)} // Actualiza el estado con el valor del input
            />
            {/* Botón para enviar el formulario de búsqueda */}
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </nav>
      {/* Contenedor principal para los componentes de Login y Artículos */}
      <div className="container-fluid">
        <div className="row">
          {/* Columna para el componente de Login */}
          <div className="col-md-6 bg-secondary">
            <h2 className="text-center text-white">INICIAR SESIÓN</h2>
            <Login />
          </div>
          {/* Columna para el componente de Artículos */}
          <div className="col-md-6 bg-secondary" id="contenedor_principal">
            <h2 className="text-center text-white">ARTÍCULOS</h2>
            <Articulos terminoBusqueda={buscarArticulo} />
            
          </div>
        </div>
      </div>

      {/* Rutas de React Router para navegar entre diferentes componentes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* Ruta para el componente de Login */}
      </Routes>
    </Router>
  );
}

export default App; // Exporta el componente App para ser usado en otros lugares de la aplicación
