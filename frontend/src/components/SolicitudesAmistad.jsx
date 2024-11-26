import back_icon from "../imgTemp/icon-share.png";
import {ListaAmistades} from "./ListaAmistades";
import React from "react";
import PropTypes from "prop-types";
import '../styles/HomePage.css'

function SolicitudesAmistad({setExtras}) {
    return (
        <>
            <div className='acciones-amistades'>
                <img className="icon" src={back_icon} alt="Botón de volver" onClick={() => {
                    setExtras(<ListaAmistades setExtras={setExtras}/>)
                }}/>
            </div>
            <div className='container-solicitudes'>
                <div className='solicitud-amistad'>
                    <span>El usuario @usuario quiere ser tu amigo</span>
                    <div className='decisiones-solicitud'>
                        <button className='boton-amistad'>Aceptar</button>
                        <button className='boton-amistad'>Rechazar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

SolicitudesAmistad.propTypes = {
    setExtras: PropTypes.func,
}

export {SolicitudesAmistad};