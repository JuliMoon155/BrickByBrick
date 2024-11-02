import React, {useEffect, useState} from "react";
import VistaPreviaEvento from "./VistaPreviaEvento";

export function Donaciones() {
    const categoriasDisponibles = ["aglomerantes", "aglomerados", "metálicos", "orgánicos"];

    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [cantidadMinima, setCantidadMinima] = useState("");
    const [cantidadMaxima, setCantidadMaxima] = useState("");
    const [listaCategorias, setListaCategorias] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [popup, setPopup] = useState(<></>);

    const handleCambioTextoBusqueda = (evento) => {
        setTextoBusqueda(evento.target.value);
        console.log(evento.target.value);
    };

    const buscar = async (busqueda) => {
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

    const handleEnterBusqueda = async (evento) => {
        if (evento.key === "Enter") {
            const busqueda = {
                texto: textoBusqueda,
                categorias: listaCategorias,
                cantidad_minima: cantidadMinima === "" ? "-1" : cantidadMinima,
                cantidad_maxima: cantidadMaxima === "" ? "-1" : cantidadMaxima,
            }
            const data = await buscar(busqueda);
            setResultados(data);
        }
    };

    const handleCambioCantidadMinima = (evento) => {
        setCantidadMinima(evento.target.value);
        console.log(evento.target.value);
    };

    const handleCambioCantidadMaxima = (evento) => {
        setCantidadMaxima(evento.target.value);
        console.log(evento.target.value);
    };

    const handleChangeCategoria = (evento, categoria) => {
        const indice = listaCategorias.indexOf(categoria);
        if (indice === -1) {
            listaCategorias.push(categoria);
        } else {
            listaCategorias.splice(indice, 1);
        }
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
                        <button onClick={() => {
                            setPopup(<></>);
                        }}>OK
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    useEffect(() => {
        async function cargarEventos() {
            const busqueda = {
                texto: "",
                categorias: [],
                cantidad_minima: "-1",
                cantidad_maxima: "-1",
            };
            const data = await buscar(busqueda);
            console.log(data);
            setResultados(data);
        }
        cargarEventos().then(r => {});
    }, []);

    return (
        <>
            <button className='addPublicacion' onClick={() => {
                setPopup(componentePopup)
            }}>Filtros
            </button>
            <input className='buscar' placeholder='Buscar' onChange={handleCambioTextoBusqueda}
                   onKeyUp={handleEnterBusqueda}/>
            <div className="PublicacionesExistentes">
                {resultados.map(
                    (resultado) =>
                        <VistaPreviaEvento key={resultado.publicacion.id} publicacion={resultado.publicacion}
                                           empresa={resultado.empresa} materiales={resultado.materiales}/>
                )}
            </div>
            {popup}
        </>
    );
}