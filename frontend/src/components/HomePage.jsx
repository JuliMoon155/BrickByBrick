import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { Contenido } from './Contenido';
import  '../styles/HomePage.css';
import profileDefault from '../imgTemp/profileDefault.png';


export const HomePage = () => {

  const [contenido_foryou, setContenido_foryou] = useState(<Contenido />);
  
  const obtenerUsuario = async() => {
    try {
      
    } catch (error) {
      
    }
  }

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
          <div className='infoPersonal'>
              <img src={profileDefault} alt="Imagen de perfil" className='fotoPerfil' />
              <h3 className="nombreUsuario">UserName</h3>
              <h3 className="rolUsuario">UserRol</h3>
          </div>
          <div className='otraInfo'>
            <h3 className="titCambiarInfo">Actualizar Datos</h3>
            <h4 className="titNameAct">Nombre</h4><input type="text" placeholder='UserName' className='nameAct'></input>
            <h4 className="titCorreoAct">Email</h4><input type="email" placeholder='UserEmail' className='correoAct'></input>
            <h4 className="titCelularAct">Celular</h4><input type="number" placeholder='UserPhone' className='celularAct'></input>
            <h4 className="titClaveAct">Clave</h4><input type="password" placeholder='Contraseña' className='claveAct'></input>
            <button className='actDatos' onClick="#">Actualizar</button>
          </div>
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
