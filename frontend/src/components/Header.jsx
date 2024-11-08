import React, { useState } from 'react'
import "../styles/Header.css";

export const Header = () => {

    const [paso, setPaso] = useState(1);

    return (  
        <div className='Encabezado'>
        <nav className='Header'>
        <ul className='navegador'>
            <li className={paso === 1 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(1)}}><a href="#">Inicio</a></li>
            <li className={paso === 2 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(2)}}><a href="#">Calendario</a></li>
            <li className={paso === 3 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(3)}}><a href="#">Comunidad</a></li>
            <li className={paso === 4 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(4)}}><a href="#">Mensajes</a></li>
            <li className={paso === 5 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(5)}}><a href="#">Notificaciones</a></li>
        </ul>
        </nav>
        </div>
    );
};
