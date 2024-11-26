import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { HomePage } from './components/HomePage';
import Inscripcion from './components/Inscripcion';
import React, { useState } from 'react';
import {GestionEventos} from "./components/GestionEventos";
import {HomePages} from "./components/HomePageDon";


function App() {
  const [interfaz, setInterfaz] = useState('Login');
  const [userId, setUserId] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [idPublicacion, setIdPublicacion] = useState(null);
  const [userRol, setUserRol] = useState(null);
  const [data, setData] = useState([]);


  const cambiarInterfaz = (nuevaInterfaz) => {
    setInterfaz(nuevaInterfaz);
  };

  const handleLoginSuccess = (id, rol, usuario, data) => {
    setUserId(id);
    setUsuario(usuario);
    setUserRol(rol);
    console.log(id+" id"+usuario+" usuario"+rol+" rol");
    setData(data);
    if (rol === 'Beneficiario') { 
      cambiarInterfaz('HomePage');
    } else if (rol === 'Empresario'){
      cambiarInterfaz('HomePageDon');
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
        <HomePage usuario={usuario} userId={userId} userRol={userRol} inscript={InscripcionDatos} cambiarInterfaz={cambiarInterfaz} data={data}/>
      )}
      {interfaz === 'HomePageDon' && (
        <HomePages usuario={usuario} userId={userId} userRol={userRol} inscript={InscripcionDatos} cambiarInterfaz={cambiarInterfaz} data={data}/>
      )}
      {interfaz === 'PublicacionMateriales' && (

        <PublicacionMateriales usuario={usuario} userId={userId} cambiarInterfaz={cambiarInterfaz}/>
      )} 
      {interfaz === 'Inscripcion' && (
          <Inscripcion fk_idPublicacionDon={idPublicacion} userId={userId} cambiarInterfaz={cambiarInterfaz}/>
      )}
      {interfaz === 'GestionEventos' && (
          <GestionEventos idEmpresa={userId} cambiarInterfaz={cambiarInterfaz}/>
      )}
    </>
  );
}

export default App;
