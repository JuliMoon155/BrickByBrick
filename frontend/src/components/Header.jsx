import React, { useState } from 'react'
import "../styles/Header.css";

export const Header = () => {

    const [paso, setPaso] = useState(1);

    const siguientePaso = () => { if (paso < 5) { setPaso(paso + 1); } };
    const primerPaso = () => { if (paso > 1) { setPaso(1); } };

    return (  
        <div className='Encabezado'>
        <nav className='Header'>
        <ul className='navegador'>
            <li className={paso === 1 ? 'elementoSel': 'elemento'} onClick={primerPaso}><a href="#">Inicio</a></li>
            <li className={paso === 2 ? 'elementoSel': 'elemento'} onClick={siguientePaso}><a href="#">Calendario</a></li>
            <li className={paso === 3 ? 'elementoSel': 'elemento'} onClick={siguientePaso}><a href="#">Comunidad</a></li>
            <li className={paso === 4 ? 'elementoSel': 'elemento'} onClick={siguientePaso}><a href="#">Mensajes</a></li>
            <li className={paso === 5 ? 'elementoSel': 'elemento'} onClick={siguientePaso}><a href="#">Notificaciones</a></li>
        </ul>
        </nav>
        </div>
    );
};
