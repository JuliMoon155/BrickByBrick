import React, { useState } from 'react';
import { Header } from './Header';
import { Contenido } from './Contenido';
import  '../styles/HomePage.css';
import {Donaciones} from "./Donaciones";

export const HomePage = () => {
  const [contenido_foryou, setContenido_foryou] = useState(<Contenido />);

  return (
    <div className='HomePage'>
      <Header />
      <div className='Contenido'>
        <div className='perfil'>
          <div className='infoPersonal'></div>
          <div className='otraInfo'></div>
        </div>
        <div className='forYou'>
          <div className='Separador'>
          <div className='seleccion_separador1' onClick={()=>{setContenido_foryou(<Contenido />)}}>
            <text>Contenido</text>
          </div>
          <div className='seleccion_separador2' onClick={()=>{setContenido_foryou(<Donaciones />)}} >
            <text>Donaciones</text>
            </div>
          </div>
          {contenido_foryou}
        </div>
        <div className='extras'></div>
      </div>

    </div>
  );
};
