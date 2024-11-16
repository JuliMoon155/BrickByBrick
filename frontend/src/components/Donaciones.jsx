import React, {useEffect, useState} from "react";
import VistaPreviaEvento from "./VistaPreviaEvento";
import iconoFiltro from '../imgTemp/icons8-filter-solo.png';

export function Donaciones( {inscript} ) {
    const categoriasDisponibles = ["aglomerantes", "aglomerados", "metálicos", "orgánicos"];

    const [textoBusqueda, setTextoBusqueda] = useState("");
    let [cantidadMinima, setCantidadMinima] = useState("");
    let [cantidadMaxima, setCantidadMaxima] = useState("");
    const [listaCategorias, setListaCategorias] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [popup, setPopup] = useState(<></>);

    const handleCambioTextoBusqueda = (evento) => {
        setTextoBusqueda(evento.target.value);
        console.log(evento.target.value);
    };

    const obtenerResultadosBusqueda = async (busqueda) => {
        const respuestaBusqueda = await fetch("http://localhost:5000/api/BuscarPublicacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(busqueda),
        })
        if (!respuestaBusqueda.ok) {
            throw new Error('Error al buscar');
        }
        return await respuestaBusqueda.json();
    }

    const buscar = async () => {
        const busqueda = {
            texto: textoBusqueda,
            categorias: listaCategorias,
            cantidad_minima: cantidadMinima === "" ? "-1" : cantidadMinima,
            cantidad_maxima: cantidadMaxima === "" ? "-1" : cantidadMaxima,
        }
        console.log(busqueda);
        const data = await obtenerResultadosBusqueda(busqueda);
        console.log(data);
        setResultados(data);
    }

    const handleEnterBusqueda = async (evento) => {
        if (evento.key === "Enter") {
            await buscar();
        }
    };

    const handleCambioCantidadMinima = (evento) => {
        cantidadMinima = evento.target.value;
        setCantidadMinima(cantidadMinima);
        console.log(cantidadMinima);
    };

    const handleCambioCantidadMaxima = (evento) => {
        cantidadMaxima = evento.target.value;
        setCantidadMaxima(cantidadMaxima);
        console.log(cantidadMaxima);
    };

    const handleChangeCategoria = (evento, categoria) => {
        const indice = listaCategorias.indexOf(categoria);
        if (indice === -1) {
            listaCategorias.push(categoria);
        } else {
            listaCategorias.splice(indice, 1);
        }
        setListaCategorias(listaCategorias);
        console.log(listaCategorias);
    };

    const componentePopup = (
        <>
            <div className="popup">
                <div className="popup-inner">
                    <h2>Cantidad</h2>
                    <p>Desde</p>
                    <input type="number" onChange={handleCambioCantidadMinima} defaultValue={cantidadMinima}/>
                    <p>hasta</p>
                    <input type="number" onChange={handleCambioCantidadMaxima} defaultValue={cantidadMaxima}/>
                    <p>kilogramos.</p>
                    <h2>Categorías</h2>
                    <div className="Categorias">
                        <ul>
                            {
                                categoriasDisponibles.map((categoria) =>
                                    <li key={"checkbox-categoría-" + categoria}>
                                        <input type="checkbox" id={"checkbox-categoría-" + categoria}
                                               onChange={(evento) => {
                                                   handleChangeCategoria(evento, categoria)
                                               }} defaultChecked={listaCategorias.includes(categoria)}/>
                                        <label htmlFor={"checkbox-categoría-" + categoria}>
                                            {categoria[0].toUpperCase() + categoria.substring(1)}
                                        </label>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="popup-actions">
                        <button onClick={async () => {
                            setPopup(<></>);
                            await buscar();
                        }}>OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    useEffect(() => {
        async function cargarEventos() {
            await buscar();
        }
        cargarEventos().then(r => {});
    }, []);

    return (
        <>
            <button className='addPublicacion' onClick={() => {
                setPopup(componentePopup)
            }}><img src={iconoFiltro}/>
            </button>
            <input className='buscar' placeholder='Buscar' onChange={handleCambioTextoBusqueda}
                   onKeyUp={handleEnterBusqueda}/>
            <div className="PublicacionesExistentes">
                {resultados.map(
                    (resultado) =>
                        <VistaPreviaEvento key={resultado.publicacion.id} idPublicacion={resultado.publicacion.id.toString()} publicacion={resultado.publicacion}
                                           empresa={resultado.empresa} materiales={resultado.materiales} Inscript={inscript}/>
                )}
            </div>
            {popup}
        </>
    );
}