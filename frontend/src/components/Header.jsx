import React, { useState } from 'react'
import "../styles/Header.css";
import PropTypes from "prop-types";

export const Header = ({ esEmpresa = false, cambiarInterfaz, activa = 1 }) => {

    const [paso, setPaso] = useState(activa);

    return (
        <div className='Encabezado'>
        <nav className='Header'>
        <ul className='navegador'>
            <li className={paso === 1 ? 'elementoSel': 'elemento'} onClick={() => {
                setPaso(1);
                if (esEmpresa) {
                    cambiarInterfaz('PublicacionMateriales');
                } else {
                    cambiarInterfaz('HomePage');
                }
            }}><a href="#">Inicio</a></li>
            <li className={paso === 2 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(2)}}><a href="#">Calendario</a></li>
            <li className={paso === 3 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(3)}}><a href="#">Comunidad</a></li>
            <li className={paso === 4 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(4)}}><a href="#">Mensajes</a></li>
            <li className={paso === 5 ? 'elementoSel': 'elemento'} onClick={() => {setPaso(5)}}><a href="#">Notificaciones</a></li>
            {esEmpresa && (<li className={paso === 6 ? 'elementoSel': 'elemento'} onClick={() => {
                setPaso(6);
                cambiarInterfaz('ListaMateriales');
            }}><a
                href="#">Materiales</a></li>)}
        </ul>
        </nav>
        </div>
    );
};

Header.propTypes = {
    esEmpresa: PropTypes.bool,
    cambiarInterfaz: PropTypes.func
}