import back_icon from "../imgTemp/back.png";
import {ListaAmistades} from "./ListaAmistades";
import React from "react";
import PropTypes from "prop-types";
import '../styles/HomePage.css'

function SolicitudesAmistad({setExtras, userId, solicitudesAmistad}) {
    const editarEstadoSolicitud = async (id_solicitud, estado) => {
        const respuesta = await fetch("http://localhost:5000/api/EditarEstadoSolicitud", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id_solicitud": id_solicitud,
                "estado": estado,
            })
        });
        if (!respuesta.ok) {
            throw new Error('Error al momento de editar el estado de solicitud');
        }
        return await respuesta.json();
    }

    const crearAmistad = async (id_solicitante, id_solicitud) => {
        const respuesta = await fetch("http://localhost:5000/api/CrearAmistad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id_solicitante": id_solicitante,
                "id_solicitado": userId,
                "id_solicitud": id_solicitud,
            })
        });
        if (!respuesta.ok) {
            throw new Error('Error al momento de crear amistad');
        }
        return await respuesta.json();
    }

    return (
        <>
            <div className='acciones-amistades'>
                <img className="icon" src={back_icon} alt="Botón de volver" onClick={() => {
                    setExtras(<ListaAmistades userId={userId} setExtras={setExtras}/>)
                }}/>
            </div>
            <div className='container-solicitudes'>
                {solicitudesAmistad.map(solicitudAmistad => {
                    return (
                        <div key={solicitudAmistad.id_solicitud} className='solicitud-amistad' id={`solicitud-amistad-${solicitudAmistad.id_solicitud}`}>
                            <span>El usuario {solicitudAmistad.nombre} (@{solicitudAmistad.usuario}) quiere ser tu amigo</span>
                            <div className='decisiones-solicitud'>
                                <button className='boton-amistad' onClick={async () => {
                                    await editarEstadoSolicitud(solicitudAmistad.id_solicitud, "aceptada");
                                    await crearAmistad(solicitudAmistad.id_solicitante, solicitudAmistad.id_solicitud);
                                    const estaSolicitud = document.querySelector(`#solicitud-amistad-${solicitudAmistad.id_solicitud}`)
                                    estaSolicitud.remove();
                                }}>Aceptar</button>
                                <button className='boton-amistad' onClick={async () => {
                                    await editarEstadoSolicitud(solicitudAmistad.id_solicitud, "rechazada");
                                    const estaSolicitud = document.querySelector(`#solicitud-amistad-${solicitudAmistad.id_solicitud}`)
                                    estaSolicitud.remove();
                                }}>Rechazar</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

SolicitudesAmistad.propTypes = {
    setExtras: PropTypes.func,
    solicitudesAmistad: PropTypes.array
}

export {SolicitudesAmistad};