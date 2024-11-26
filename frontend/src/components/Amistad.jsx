import PropTypes from "prop-types";
import back_icon from '../imgTemp/icon-share.png'
import profileDefault from "../imgTemp/profileDefault.png";
import React from "react";
import {ListaAmistades} from "./ListaAmistades";

function Amistad({setExtras}) {
    return (
        <>
            <div className='acciones-amistades'>
                <img className="icon" src={back_icon} alt="Botón de volver" onClick={() => {
                    setExtras(<ListaAmistades setExtras={setExtras}/>)
                }}/>
            </div>
            <div className='perfil-amistad'>
                <div className='info-amistad'>
                    <img className='foto-amistad' src={profileDefault} alt="Imagen de perfil"/>
                    <h3 className='nombre-amistad'>@usuario</h3>
                </div>
                <div className='acciones-amistad'>
                    <button className='boton-amistad'>Eliminar amistad</button>
                </div>
            </div>
        </>
    )
}

Amistad.propTypes = {
    setExtras: PropTypes.func,
}

export {Amistad};