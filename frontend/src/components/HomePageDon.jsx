import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Contenido } from './Contenido';
import '../styles/HomePage.css';

import { GestionEventos } from "./GestionEventos";
import profileDefault from '../imgTemp/profileDefault.png';


export const HomePages = ({ userId, usuario, userRol, cambiarInterfaz, data }) => {
  const [contenido_foryou, setContenido_foryou] = useState(<GestionEventos idEmpresa={userId} cambiarInterfaz={cambiarInterfaz} />);

  useEffect(() => {
    setContenido_foryou(<GestionEventos idEmpresa={userId} cambiarInterfaz={cambiarInterfaz} />);
  }, [userId, usuario]);



  return (
    <div className='HomePage'>
      <Header />
      <div className='Contenido'>
        <div className='perfil'>
          <div className='infoPersonal'>
            <img src={profileDefault} alt="Imagen de perfil" className='fotoPerfil' />
            <h3 className="nombreUsuario">@{usuario}</h3>
            <h3 className="rolUsuario">{userRol}</h3>
          </div>
          <div className='otraInfo'>
            <h3 className="titCambiarInfo">Actualizar Datos</h3>
            <h4 className="titNameAct">Nombre</h4><input type="text" placeholder={data.nombre} className='nameAct'></input>
            <h4 className="titClaveAct">Clave</h4><input type="password" placeholder='Contraseña' className='claveAct'></input>
            <h4 className="titCelularAct">Descripcion: </h4>
            <br/>
            <br/>
            <br/>
            <textarea placeholder={data.descripcion} className="descripcionAct" rows="4" cols="50"> </textarea>
            <button className='actDatos' onClick="#">Actualizar</button>
          </div>
        </div>
        <div className='forYou'>
          <div className='Separador'>
            <h3>Mis publicaciones</h3>
          </div>
          {contenido_foryou}
          <br />
          <br />
          <button className='actDatos' onClick={() => cambiarInterfaz("PublicacionMateriales")}>Crear publicacion</button>
        </div>
        <div className='extras'></div>
      </div>

    </div>
  );
};
