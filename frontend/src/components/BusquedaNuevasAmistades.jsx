import {useState} from "react";
import PropTypes from "prop-types";
import profileDefault from '../imgTemp/profileDefault.png'

function BusquedaNuevasAmistades({ userId, setPopup }) {
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    const obtenerResultadosBusqueda = async (texto) => {
        const respuestaBusqueda = await fetch("http://localhost:5000/api/BuscarBeneficiariosSinSolicitud", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "texto": texto,
                "id_solicitante": userId
            })
        });
        if (!respuestaBusqueda.ok) {
            throw new Error('Error al buscar');
        }
        return await respuestaBusqueda.json();
    };

    const buscar = async () => {
        const data = await obtenerResultadosBusqueda(textoBusqueda);
        console.log(data);
        setResultados(data);
    }

    const handleCambioTextoBusqueda = (evento) => {
        setTextoBusqueda(evento.target.value);
        console.log(evento.target.value);
    }

    const generarSolicitudAmistad = async (idSolicitado) => {
        const respuesta = await fetch("http://localhost:5000/api/CrearSolicitudAmistad", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id_solicitante": userId,
                "id_solicitado": idSolicitado,
                "tipo": "solicitudAmistad"
            })
        });
        if (!respuesta) {
            throw new Error('Error al crear solitud de amistad');
        }
        return await respuesta.json();
    }

    return (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h2>Búsqueda de nuevas amistades</h2>
                    <input className='buscar-amistad' type="text" placeholder='Buscar' onChange={handleCambioTextoBusqueda}/>
                    <div className='resultados-busqueda-amistad'>
                        {resultados.map(resultado => {
                            return (
                                <div key={resultado.id} className='resultado-busqueda-amistad'>
                                    <div className='contenedor-foto-amistad'>
                                        <img src={profileDefault} alt="Foto de perfil"/>
                                    </div>
                                    <div>
                                        <p>{resultado.nombre}</p>
                                        <p>@{resultado.usuario}</p>
                                    </div>
                                    <div className='contenedor-boton-solicitud-amistad'>
                                        <button className='boton-amistad' disabled={resultado.estado_solicitud !== null} id={`boton-solicitud-amistad-${resultado.id}`} onClick={async () => {
                                            const solicitud = await generarSolicitudAmistad(resultado.id);
                                            console.log(solicitud);
                                            const esteBoton = document.querySelector(`#boton-solicitud-amistad-${resultado.id}`)
                                            esteBoton.disabled = true;
                                        }}>Solicitar amistad</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="popup-actions">
                        <button onClick={async () => {
                            await buscar();
                        }}>Buscar
                        </button>
                        <button onClick={async () => {
                            setPopup(<></>);
                        }}>OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

BusquedaNuevasAmistades.propTypes = {
    setPopup: PropTypes.func,
}

export {BusquedaNuevasAmistades};