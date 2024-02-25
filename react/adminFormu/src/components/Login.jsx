import React, { useState } from 'react';

const Login = () => {
  const [mailuser, setMailUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Inicializamos o recuperamos los arrays de usuarios admin y normales
    let arrayUsuariosAdmin = JSON.parse(localStorage.getItem('arrayUsuariosAdmin') || '[]');
    let arrayUsuariosNormales = JSON.parse(localStorage.getItem('arrayUsuariosNormales') || '[]');

    if ((mailuser === 'admin@admin.com' || mailuser === 'admin@admin.es') && password === 'admin') {
      // Verificamos si el usuario admin ya existe
      const usuarioAdminExiste = arrayUsuariosAdmin.some(usuario => usuario.mailuser === mailuser);
      if (!usuarioAdminExiste) {
        arrayUsuariosAdmin.push({ mailuser });
        localStorage.setItem('arrayUsuariosAdmin', JSON.stringify(arrayUsuariosAdmin));
      }
      localStorage.setItem('esAdmin', 'true');
      setError('');
    } else {
      // Para usuarios normales, asumimos que cualquier otro intento de login es válido
      const usuarioNormalExiste = arrayUsuariosNormales.some(usuario => usuario.mailuser === mailuser);
      if (!usuarioNormalExiste) {
        arrayUsuariosNormales.push({ mailuser });
        localStorage.setItem('arrayUsuariosNormales', JSON.stringify(arrayUsuariosNormales));
      }
      localStorage.setItem('esAdmin', 'false');
      setError('');
    }
  };

  const verLocalStorage = () => {

    console.log(localStorage);

  }
const limpiarLocalStorage = () => {
    localStorage.clear(); // Esto borrará todo el localStorage
    console.log('localStorage limpiado');
    // Aquí podrías añadir cualquier otra lógica que necesites después de limpiar el localStorage
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
          value={mailuser}
          onChange={(e) => setMailUser(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>Iniciar Sesión</button>
      <button className="btn ms-2 btn-primary" onClick={verLocalStorage}>ver LocalStorage</button>
      <button className="btn ms-2 btn-primary" onClick={limpiarLocalStorage}>Borrar LocalStorage</button>
    </div>
  );
};

export default Login;
