import React, { useState } from 'react';

const Login = ({ alLogin }) => { // Añadimos una prop de callback para notificar al componente padre
  // Estados para manejar el correo electrónico, contraseña y mensajes de error.
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Recuperamos o inicializamos los arreglos de usuarios administradores y normales desde localStorage.
    let arrayUsuariosAdmin = JSON.parse(localStorage.getItem('arrayUsuariosAdmin') || '[]');
    let arrayUsuariosNormales = JSON.parse(localStorage.getItem('arrayUsuariosNormales') || '[]');

    // Comprobamos si el correo y la contraseña corresponden a un administrador.
    if ((correoUsuario === 'admin@admin.com' || correoUsuario === 'admin@admin.es') && contrasena === 'admin') {
      // Buscamos si el usuario ya existe en el arreglo de administradores.
      const usuarioAdminExiste = arrayUsuariosAdmin.some(usuario => usuario.correoUsuario === correoUsuario);
      if (!usuarioAdminExiste) {
        // Si no existe, lo añadimos.
        arrayUsuariosAdmin.push({ correoUsuario });
        localStorage.setItem('arrayUsuariosAdmin', JSON.stringify(arrayUsuariosAdmin));
      }
      localStorage.setItem('esAdmin', 'true'); // Marcamos al usuario como administrador en localStorage.
      alLogin(true); // Notificamos al componente padre que el usuario es admin.
      setError(''); // Limpiamos el mensaje de error.
    } else {
      // Para cualquier otro intento de login, asumimos que es un usuario normal.
      const usuarioNormalExiste = arrayUsuariosNormales.some(usuario => usuario.correoUsuario === correoUsuario);
      if (!usuarioNormalExiste) {
        // Si no existe, lo añadimos al arreglo de usuarios normales.
        arrayUsuariosNormales.push({ correoUsuario });
        localStorage.setItem('arrayUsuariosNormales', JSON.stringify(arrayUsuariosNormales));
      }
      localStorage.setItem('esAdmin', 'false'); // Marcamos al usuario como no administrador.
      alLogin(false); // Notificamos al componente padre que el usuario es normal.
      setError(''); // Limpiamos el mensaje de error.
    }
  };

  // Función para ver el contenido actual de localStorage. Útil para depuración.
  const verLocalStorage = () => {
    console.log(localStorage);
  };

  // Función para limpiar todo el contenido de localStorage.
  const limpiarLocalStorage = () => {
    localStorage.clear();
    console.log('localStorage limpiado');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      {error && <div style={{color: 'red'}}>{error}</div>}
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
      <button className="btn ms-2 btn-primary" onClick={verLocalStorage}>Ver LocalStorage</button>
      <button className="btn ms-2 btn-primary" onClick={limpiarLocalStorage}>Borrar LocalStorage</button>
    </div>
  );
};

export default Login;
