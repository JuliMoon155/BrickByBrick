import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { Perfil } from './components/Perfil';
import { PublicacionContenido } from './components/publicacionContenido';
import React, { useState } from 'react';
import VisualizarMaterial from "./components/VisualizarMaterial";

function App() {
  const [interfaz, setInterfaz] = useState('VisualizacionMateriales');

  const cambiarInterfaz = (nuevaInterfaz) => {
    setInterfaz(nuevaInterfaz);
  };

  return (
    <>
      <PublicacionContenido/>
      {{interfaz === 'Login' && (
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
      )}
      )}
      {interfaz === 'VisualizacionMateriales' && (
          <VisualizarMaterial/>
      )}
    </>
  );
}

export default App;
