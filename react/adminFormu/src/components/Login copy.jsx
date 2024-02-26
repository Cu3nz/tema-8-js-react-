import React, { useState } from 'react';

const Login = ({ alLogin }) => {
  // Estados para correo electrónico, contraseña y mensaje de error.
  const [correoUsuario, setCorreoUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    //* Recuperamos los arreglos de usuarios admin y normales desde localStorage, o los inicializamos vacíos.

    let arrayUsuariosAdmin = JSON.parse(localStorage.getItem('arrayUsuariosAdmin') || '[]');
    let arrayUsuariosNormales = JSON.parse(localStorage.getItem('arrayUsuariosNormales') || '[]');


    //? Verificamos si el usuario es un administrador basado en el correo y la contraseña.
    if ((correoUsuario === 'admin@admin.com' || correoUsuario === 'admin@admin.es') && contrasena === 'admin') {

      // Si el usuario es admin, verificamos si ya existe en el array de administradores.
      const usuarioAdminExiste = arrayUsuariosAdmin.some(usuario => usuario.correoUsuario === correoUsuario);

      if (!usuarioAdminExiste) {  // Si no existe, lo añadimos al array y actualizamos localStorage.
       
        arrayUsuariosAdmin.push({ correoUsuario });
        localStorage.setItem('arrayUsuariosAdmin', JSON.stringify(arrayUsuariosAdmin));
      }
      localStorage.setItem('esAdmin', 'true'); //? Marcamos al usuario como administrador en localStorage.
      alLogin(true , correoUsuario); // Notificamos al componente App que el usuario es administrador y el correo con el que se ha iniciado sesion.

    } else { // Si no es un administrador, asumimos que es un usuario normal y procedemos de manera similar.
      
      const usuarioNormalExiste = arrayUsuariosNormales.some(usuario => usuario.correoUsuario === correoUsuario);

      if (!usuarioNormalExiste) { // Si no existe el usuario normal, lo añadimos al array
        arrayUsuariosNormales.push({ correoUsuario });
        localStorage.setItem('arrayUsuariosNormales', JSON.stringify(arrayUsuariosNormales));
      }
      localStorage.setItem('esAdmin', 'false'); // Marcamos al usuario como no administrador.
      alLogin(false , correoUsuario); // Notificamos al componente App que el usuario es normal.
    }
    setError(''); // Limpiamos el mensaje de error si es necesario.
  };

  // Funcion para visualizar el contenido de localStorage (util para depuracion).
  const verLocalStorage = () => {
    console.log(localStorage);
  };

  // Funcion para limpiar todo el contenido de localStorage.
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
      <button className="btn ms-2 btn-primary mt-2" onClick={limpiarLocalStorage}>Borrar LocalStorage</button>
    </div>
  );
};

export default Login;
