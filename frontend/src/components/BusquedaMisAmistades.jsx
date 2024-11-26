import React, {useState} from "react";
import {VistaPreviaAmistad} from "./VistaPreviaAmistad";

function BusquedaMisAmistades({ userId, setPopup, setExtras }) {
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [resultados, setResultados] = useState([]);

    const buscarAmistades = async (texto) => {
        const respuesta = await fetch("http://localhost:5000/api/BuscarAmistades", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId": userId,
                "texto": texto
            })
        });
        if (!respuesta.ok) {
            throw new Error('Error al momento de buscar amistades');
        }
        return await respuesta.json();
    }

    const handleCambioTextoBusqueda = (evento) => {
        setTextoBusqueda(evento.target.value);
        console.log(evento.target.value);
    }

    const llenarResultados = async (texto) => {
        const data = await buscarAmistades(texto);
        console.log(data);
        setResultados(data);
    }

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Búsqueda de mis amistades</h2>
                <input className='buscar-amistad' type="text" placeholder='Buscar' onChange={handleCambioTextoBusqueda}/>
                {resultados.map(resultado => {
                    return (
                        <VistaPreviaAmistad key={resultado.id_amistad} amistad={resultado} userId={userId} setExtras={(...args) => {
                            setPopup(<></>);
                            setExtras(...args);
                        }}/>
                    )
                })}
                <div className="popup-actions">
                    <button onClick={async () => {
                        await llenarResultados(textoBusqueda);
                    }}>Buscar
                    </button>
                    <button onClick={async () => {
                        setPopup(<></>);
                    }}>OK
                    </button>
                </div>
            </div>
        </div>
    );
}

export {BusquedaMisAmistades};