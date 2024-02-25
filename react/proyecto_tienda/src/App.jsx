import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa los estilos de Bootstrap
import Inicio from './components/Inicio';
import Tienda from './components/Tienda';
import Carrito from './components/Carrito';


function App() {
  return (
    <Router>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Aqui esta inicio */}
        <Link className="navbar-brand" to="/">Mi Aplicación</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Tienda">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Carrito">Carrito</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre">Sobre</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tienda">Tienda2</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Sergi">Sergi</Link>
            </li>
            {/* Agregar más elementos de menú aquí */}
          </ul>
        </div>
      </div>
    </nav>
    
    <Routes>
    <Route path="/" element={<Inicio />} />
    <Route path="tienda" element={<Tienda />} />
    {<Route path="carrito" element={<Carrito />} />}
      {/* Agregar más rutas aquí */}
  
    </Routes>
  </Router>
  );
}

export default App;