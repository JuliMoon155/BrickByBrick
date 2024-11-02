import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Contenido } from './Contenido';
import  '../styles/HomePage.css';

export const HomePage = () => {

  const [contenido_foryou, setContenido_foryou] = useState(<Contenido />);
/*
  const handleContenidoForyou = (nombre) => {
    if (nombre=='Contenido') {
      setContenido_foryou(<Contenido />);
    }if(nombre=='Donaciones') {
      console.log('se cambio');
    }
  };
  */
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
          <div className='seleccion_separador2' onClick={()=>{console.log('se cambio')}} >
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
