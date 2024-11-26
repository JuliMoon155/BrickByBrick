import PropTypes from "prop-types";
import back_icon from '../imgTemp/back.png'
import profileDefault from "../imgTemp/profile.png";
import React from "react";
import {ListaAmistades} from "./ListaAmistades";

function Amistad({amistad, userId, setExtras}) {
    const editarEstadoAmistad = async (estado) => {
        const respuesta = await fetch("http://localhost:5000/api/EditarEstadoAmistad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id_amistad": amistad.id_amistad,
                "estado": estado,
            })
        });
        if (!respuesta.ok) {
            throw new Error('Error al momento de editar el estado de amistad');
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
            <div className='perfil-amistad'>
                <div className='info-amistad'>
                    <img className='foto-amistad' src={profileDefault} alt="Imagen de perfil"/>
                    <h3 className='nombre-amistad'>{amistad.nombre} (@{amistad.usuario})</h3>
                </div>
                <div className='acciones-amistad'>
                    <button className='boton-amistad' onClick={async () => {
                        await editarEstadoAmistad("eliminada");
                        setExtras(<ListaAmistades userId={userId} setExtras={setExtras}/>)
                    }}>Eliminar amistad</button>
                </div>
            </div>
        </>
    )
}

Amistad.propTypes = {
    setExtras: PropTypes.func,
}

export {Amistad};