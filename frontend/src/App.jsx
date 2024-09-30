import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { Perfil } from './components/Perfil';
import { PublicacionContenido } from './components/publicacionContenido';
import React, { useState } from 'react';

function App() {
  const [interfaz, setInterfaz] = useState('Registro');

  const cambiarInterfaz = (nuevaInterfaz) => {
    setInterfaz(nuevaInterfaz);
  };

  return (
    <>
      <PublicacionContenido/>
      {/* {interfaz === 'Login' && (
        <Login 
          onRegistro={() => cambiarInterfaz('Registro')} 
          onLoginSuccess={() => cambiarInterfaz('PublicacionMateriales')} 
        />
      )}
      {interfaz === 'Registro' && (
        <Registro onLogin={() => cambiarInterfaz('Login')} />
      )}
      {interfaz === 'PublicacionMateriales' && (
        <PublicacionMateriales /> 
      )} */}
    </>
  );
};

export default App;
