import add_friend_icon from "../imgTemp/add-friend.png";
import search_icon from "../imgTemp/search-icon.png";
import {VistaPreviaAmistad} from "./VistaPreviaAmistad";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {SolicitudesAmistad} from "./SolicitudesAmistad";

function ListaAmistades({ setExtras }) {
    const [popup, setPopup] = useState(<></>);

    const popupBusquedaNuevasAmistades = (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h1>Búsqueda de <em>nuevas</em> amistades</h1>
                    <div className="popup-actions">
                        <button onClick={async () => {
                            setPopup(<></>);
                        }}>OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    const popupBusquedaMisAmistades = (
        <div className="popup">
            <div className="popup-inner">
                <h1>Búsqueda de <em>mis</em> amistades</h1>
                <div className="popup-actions">
                    <button onClick={async () => {
                        setPopup(<></>);
                    }}>OK
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className='acciones-amistades'>
                <span className="titulo-fila">Social</span>
                <img className="icon" src={add_friend_icon} alt="Botón agregar amistad" onClick={() => {
                    setPopup(popupBusquedaNuevasAmistades);
                }}/>
                <img className="icon" src={search_icon} alt="Botón buscar amistad" onClick={() => {
                    setPopup(popupBusquedaMisAmistades);
                }}/>
            </div>
            <div className='solicitudes-amistad' onClick={() => {
                setExtras(<SolicitudesAmistad setExtras={setExtras} />)
            }}>
                <span className="titulo-fila">Solicitudes de amistad</span>
                <span className="indicador-solicitudes-amistad">2</span>
            </div>
            <div className='lista-amistades'>
                <VistaPreviaAmistad setExtras={setExtras}/>
            </div>
            {popup}
        </>
    )
}

ListaAmistades.propTypes = {
    setExtras: PropTypes.func,
}

export {ListaAmistades};