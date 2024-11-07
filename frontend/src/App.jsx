import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { HomePage } from './components/HomePage';
import React, { useState, useEffect } from 'react';
import { Contenido } from './components/Contenido';  


function App() {
  const [interfaz, setInterfaz] = useState('Login');
  const [userId, setUserId] = useState(null);
  const [userUsuario, setUserUsuario] = useState(null);
  const [userRol, setUserRol] = useState(null);
  const [data, setData] = useState([]);


  const cambiarInterfaz = (nuevaInterfaz) => {
    setInterfaz(nuevaInterfaz);
  };

  const handleLoginSuccess = (id, rol, usuario, data) => {
    setUserId(id);
    setUserUsuario(usuario);
    setUserRol(rol);
    setData(data);
    if (rol === 'Beneficiario') { 
      cambiarInterfaz('HomePage');
    } else if (rol === 'Empresario'){
      cambiarInterfaz('PublicacionMateriales');
    }
  };

  return (
    <>
      {interfaz === 'Login' && (
        <Login 
          onRegistro={() => cambiarInterfaz('Registro')} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {interfaz === 'Registro' && (
        <Registro onLogin={() => cambiarInterfaz('Login')} />
      )}
      {interfaz === 'HomePage' && (
        <HomePage usuario={userUsuario} userId={userId} userRol={userRol} data={data}/> 
      )}
      {interfaz === 'PublicacionMateriales' && (
      <PublicacionMateriales usuario={userUsuario} userId={userId}/> 
      )} 
      {/* Paso el userId a Contenido */}
      {interfaz === 'Contenido' && (
        <Contenido usuario={userUsuario} userId={userId}  />
      )}
    </>
  );
}

export default App;

