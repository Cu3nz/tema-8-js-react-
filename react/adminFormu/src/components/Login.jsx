import React, { useState, useEffect } from 'react';

// Este componente maneja el proceso de inicio de sesión para usuarios y administradores.
const Login = ({ alLogin }) => {
  // Estados para manejar el correo electrónico y la contraseña del usuario, además de un mensaje de error.
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  // Define un usuario administrador por defecto.
  const usuarioAdminPorDefecto = {
    correo: 'admin@admin.com',
    contraseña: 'admin'
  };

  // Define un usuario normal por defecto.
  const usuarioNormalPorDefecto = {
    correo: 'sergio@gmail.com',
    contraseña: 'sergio'
  };

  // useEffect para inicializar los usuarios por defecto en localStorage si no existen.
  useEffect(() => {
    if (!localStorage.getItem('arrayUsuariosAdmin')) {
      localStorage.setItem('arrayUsuariosAdmin', JSON.stringify([usuarioAdminPorDefecto]));
    }
    if (!localStorage.getItem('arrayUsuariosNormales')) {
      localStorage.setItem('arrayUsuariosNormales', JSON.stringify([usuarioNormalPorDefecto]));
    }
  }, []);

  // Maneja el evento de clic en el botón de inicio de sesión.
  const handleLogin = () => {
    // Verifica que los campos no estén vacíos.
    if (!correoUsuario || !contrasena) {
      setError('No puedes dejar campos vacíos.');
      return;
    }

    // Recupera los usuarios administradores y normales del localStorage.
    let arrayUsuariosAdmin = JSON.parse(localStorage.getItem('arrayUsuariosAdmin'));
    let arrayUsuariosNormales = JSON.parse(localStorage.getItem('arrayUsuariosNormales'));

    // Verifica si el usuario es un administrador.
    const esAdmin = arrayUsuariosAdmin.some(usuario => usuario.correo === correoUsuario && usuario.contraseña === contrasena);

    // Verifica si el usuario es un usuario normal.
    const esUsuarioNormal = arrayUsuariosNormales.some(usuario => usuario.correo === correoUsuario && usuario.contraseña === contrasena);

    // Si el usuario es administrador, establece la sesión como administrador y llama al callback.
    if (esAdmin) {
      localStorage.setItem('esAdmin', 'true');
      alLogin(true, correoUsuario);
      setError('');
    // Si el usuario es un usuario normal, establece la sesión como no administrador y llama al callback.
    } else if (esUsuarioNormal) {
      localStorage.setItem('esAdmin', 'false');
      alLogin(false, correoUsuario);
      setError('');
    } else {
      // Si no es administrador ni usuario normal, muestra un mensaje de error.
      setError('No eres un administrador ni un usuario autorizado para entrar aquí.');
    }
  };

  // Función para visualizar el contenido de localStorage (útil para depuración).
  const verLocalStorage = () => {
    console.log('LocalStorage:', localStorage);
  };

  // Función para limpiar todo el contenido de localStorage.
  const limpiarLocalStorage = () => {
    localStorage.clear();
    console.log('LocalStorage limpiado');
  };

  // Renderiza el formulario de inicio de sesión y los botones para interactuar con localStorage.
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo Electrónico</label>
        <input
          type="text"
          className="form-control"
          id="email"
          value={correoUsuario}
          onChange={(e) => setCorreoUsuario(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
      <button className="btn ms-2 btn-secondary" onClick={verLocalStorage}>Ver LocalStorage</button>
      <button className="btn ms-2 btn-danger mt-2" onClick={limpiarLocalStorage}>Borrar LocalStorage</button>
    </div>
  );
};

export default Login;
