import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { Perfil } from './components/Perfil';
import { PublicacionContenido } from './components/publicacionContenido';
import React, { useState } from 'react';

function App() {
  const [interfaz, setInterfaz] = useState('Registro');
  const [userId, setUserId] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [userRol, setUserRol] = useState(null);

  const cambiarInterfaz = (nuevaInterfaz) => {
    setInterfaz(nuevaInterfaz);
  };

  const handleLoginSuccess = (id, rol, usuario) => {
    setUserId(id);
    setUsuario(usuario);
    setUserRol(rol);
    console.log(id+" id"+usuario+" usuario"+rol+" rol");
    if (rol === 'Beneficiario') { 
      cambiarInterfaz('PublicacionContenido');
    } else if (rol === 'Empresa'){
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
      {interfaz === 'PublicacionContenido' && (
        <PublicacionContenido /> 
      )} 
      {interfaz === 'PublicacionMateriales' && (
        <PublicacionMateriales usuario={usuario} userId={userId}/> 
      )} 
    </>
  );
};

export default App;
