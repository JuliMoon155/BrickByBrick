import add_friend_icon from "../imgTemp/add-friend.png";
import search_icon from "../imgTemp/search-icon.png";
import {VistaPreviaAmistad} from "./VistaPreviaAmistad";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {SolicitudesAmistad} from "./SolicitudesAmistad";
import {BusquedaNuevasAmistades} from "./BusquedaNuevasAmistades";
import {BusquedaMisAmistades} from "./BusquedaMisAmistades";

function ListaAmistades({ userId, setExtras }) {
    const [popup, setPopup] = useState(<></>);
    const [solicitudesAmistad, setSolicitudesAmistad] = useState([]);
    const [amistades, setAmistades] = useState([]);

    const obtenerMisSolicitudesAmistad = async () => {
        const respuesta = await fetch("http://localhost:5000/api/ObMisSolicitudesAmistad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": userId
            })
        });
        if (!respuesta.ok) {
            throw new Error('Error al obtener mis solicitudes de amistad');
        }
        return await respuesta.json();
    }

    const llenarSolicitudesAmistad = async () => {
        const data = await obtenerMisSolicitudesAmistad();
        console.log(data);
        setSolicitudesAmistad(data);
    }

    const obtenerAmistades = async () => {
        const respuesta = await fetch("http://localhost:5000/api/ObAmistades", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": userId
            })
        });
        if (!respuesta.ok) {
            throw new Error('Error al momento de obtener amistades')
        }
        return await respuesta.json();
    }

    const llenarAmistades = async () => {
        const data = await obtenerAmistades();
        console.log(data);
        setAmistades(data);
    }

    useEffect(() => {
        llenarSolicitudesAmistad().then(v => {})
        llenarAmistades().then(v => {})
    }, []);

    return (
        <>
            <div className='acciones-amistades'>
                <span className="titulo-fila">Social</span>
                <img className="icon" src={add_friend_icon} alt="Botón agregar amistad" onClick={() => {
                    setPopup(<BusquedaNuevasAmistades userId={userId} setPopup={setPopup}/>);
                }}/>
                <img className="icon" src={search_icon} alt="Botón buscar amistad" onClick={() => {
                    setPopup(<BusquedaMisAmistades userId={userId} setPopup={setPopup} setExtras={setExtras}/>);
                }}/>
            </div>
            <div className='solicitudes-amistad' onClick={() => {
                setExtras(<SolicitudesAmistad solicitudesAmistad={solicitudesAmistad} userId={userId} setExtras={setExtras} />)
            }}>
                <span className="titulo-fila">Solicitudes de amistad</span>
                <span className="indicador-solicitudes-amistad">{solicitudesAmistad.length}</span>
            </div>
            <div className='lista-amistades'>
                {amistades.map(amistad => {
                    return (
                        <VistaPreviaAmistad amistad={amistad} userId={userId} setExtras={setExtras}/>
                    )
                })}
            </div>
            {popup}
        </>
    )
}

ListaAmistades.propTypes = {
    setExtras: PropTypes.func,
}

export {ListaAmistades};