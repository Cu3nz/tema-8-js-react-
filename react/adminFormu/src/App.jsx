import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articulos from "./components/Articulos.jsx";
import Login from "./components/Login.jsx";

function App() {
  const [buscarArticulo, setBuscarArticulo] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState(""); // Asegúrate de añadir este estado
  const [mostrarContenido, setMostrarContenido] = useState('bienvenida');

  const manejarInicioSesion = (esAdmin, correo) => {
    setCorreoUsuario(correo);
    setMostrarContenido(esAdmin ? 'admin' : 'articulos');
  };

  return (
    <Router>
      <h1 className='text-center p-5 bg-dark text-white'>CABECERA</h1>

      <nav className="navbar bg-body-tertiary sticky-top">
        <div className="container-fluid d-flex justify-content-center">
          <form className="d-flex " role="search" onSubmit={(e) => e.preventDefault()}>
            <input 
              className="form-control me-2" 
              type="search" 
              placeholder="Introduce el título" 
              aria-label="Search" 
              value={buscarArticulo}
              onChange={(e) => setBuscarArticulo(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">Buscar</button>
          </form>
        </div>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Ajusta las clases aquí para responsividad */}
          <div className="col-12 col-md-6 bg-secondary">
            <h2 className="text-center text-white">INICIAR SESIÓN</h2>
            <Login alLogin={manejarInicioSesion} />
          </div>
          {/* Ajusta las clases aquí para responsividad */}
          <div className="col-12 col-md-6 bg-secondary" id="contenedor_principal">
            {mostrarContenido === 'bienvenida' && <h2 className='text-center'>Bienvenido a SergiShop</h2>}
            {mostrarContenido === 'admin' && <h2 className='text-center'>Has iniciado sesión como administrador: {correoUsuario}</h2>}
            {mostrarContenido === 'articulos' && <><h2 className='text-center'>ARTÍCULOS</h2><Articulos terminoBusqueda={buscarArticulo} /></>}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Login alLogin={manejarInicioSesion} />} />
        <Route path="/login" element={<Login alLogin={manejarInicioSesion} />} />
      </Routes>
    </Router>
  );
}

export default App;
