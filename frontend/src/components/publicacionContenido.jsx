import React from 'react'
import {Header} from "./Header";
import "../styles/publicacionContenido.css";

export const PublicacionContenido = () => {
    return (  
    <div className='HomePage'>
        <Header/>
        <div className='Contenido'>
        <div className='perfil'>
            <div className='infoPersonal'></div>
            <div className='otraInfo'></div>
        </div>
        <div className='forYou'>
            
        </div>
        <div className='extras'></div>
        </div>
    </div>
    );
};
