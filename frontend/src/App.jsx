import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { Perfil } from './components/Perfil';
import { HomePage } from './components/HomePage';
import Inscripcion from './components/Inscripcion';
import React, { useState } from 'react';
import BusquedaEvento from "./components/BusquedaEvento";

function App() {
  const [interfaz, setInterfaz] = useState('Login');
  const [userId, setUserId] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [idPublicacion, setIdPublicacion] = useState(null);
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
      cambiarInterfaz('HomePage');
    } else if (rol === 'Empresario'){
      cambiarInterfaz('PublicacionMateriales');
    }
  };

  const InscripcionDatos = (IdPubli) =>{
    setIdPublicacion(IdPubli);
    cambiarInterfaz('Inscripcion');
  }

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
        <HomePage /> 
      )} 
      {interfaz === 'PublicacionMateriales' && (

        <PublicacionMateriales usuario={usuario} userId={userId} cambiarInterfaz={cambiarInterfaz}/> 
      )} 
      {interfaz === 'BusquedaEvento' && (
          <BusquedaEvento InscriptId={InscripcionDatos} />
      )}
      {interfaz === 'Inscripcion' && (
          <Inscripcion fk_idPublicacionDon={idPublicacion} userId={userId} cambiarInterfaz={cambiarInterfaz}/>
      )}
    </>
  );
}

export default App;
