import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Contenido } from './Contenido';
import  '../styles/HomePage.css';

import {Donaciones} from "./Donaciones";
import profileDefault from '../imgTemp/profileDefault.png';


export const HomePage = ({ userId, usuario, userRol, data}) => {
    const [contenido_foryou, setContenido_foryou] = useState(<Contenido userId={userId} usuario={usuario}/>);

    useEffect(() => {
      setContenido_foryou(<Contenido userId={userId} usuario={usuario}/>);
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
            <h4 className="titCorreoAct">Email</h4><input type="email" placeholder={data.email} className='correoAct'></input>
            <h4 className="titCelularAct">Celular</h4><input type="number" placeholder={data.celular} className='celularAct'></input>
            <h4 className="titClaveAct">Clave</h4><input type="password" placeholder='Contraseña' className='claveAct'></input>
            <button className='actDatos' onClick="#">Actualizar</button>
          </div>
        </div>
        <div className='forYou'>
          <div className='Separador'>
          <div className='seleccion_separador1' onClick={()=>{setContenido_foryou(<Contenido userId={userId} usuario={usuario}/>)}}>
            <span>Contenido</span>
          </div>
          <div className='seleccion_separador2' onClick={()=>{setContenido_foryou(<Donaciones />)}} >
            <span>Donaciones</span>
            </div>
          </div>
          {contenido_foryou}
        </div>
        <div className='extras'></div>
      </div>

    </div>
  );
};
