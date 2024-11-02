import styles from '../styles/BusquedaEvento.module.css';
import {useState} from "react";
import VistaPreviaEvento from "./VistaPreviaEvento";

function BusquedaEvento() {
    const [resultados, setResultados] = useState([]);
    const categoriasDisponibles = ["aglomerantes", "aglomerados", "metálicos", "orgánicos"];
    const listaCategorias = [];

    return (
        <div className={styles.contenedor_visualizacion}>
            <div className={styles.seccion_formulario}>
                <h2 className={styles.titulo_formulario}>Visualización de Materiales</h2>
                <input type="text" name="busqueda" placeholder="Ingresa lo que quieres buscar"
                       className={styles.campo_entrada}/>
                <h3 className={styles.subtitulo_formulario}>Categoría</h3>
                <div className={styles.contenedor_categorias}>
                    <ul>
                        {categoriasDisponibles.map((categoria) => <li key={"categoría-" + categoria} id={"categoría-" + categoria} onClick={() => {
                            let elementoCategoria = document.getElementById("categoría-" + categoria);
                            const indice = listaCategorias.indexOf(categoria);
                            if (indice > -1) {
                                listaCategorias.splice(indice, 1);
                                elementoCategoria.style.backgroundColor = "white";
                            } else {
                                listaCategorias.push(categoria);
                                elementoCategoria.style.backgroundColor = "darkgray";
                            }
                        }}><a>{categoria[0].toUpperCase() + categoria.substring(1)}</a></li>)}
                    </ul>
                </div>
                <h3 className={styles.subtitulo_formulario}>Ubicación</h3>
                <div className={styles.contenedor_ubicacion}>
                    <p>Máximo</p><input type="number" className={styles.marginado_filtros + " " + styles.campo_entrada}
                                        name="distancia"/><p>kilómetros de distancia.</p>
                </div>
                <h3 className={styles.subtitulo_formulario}>Cantidad</h3>
                <div className={styles.contenedor_cantidades}>
                    <p>Desde</p><input type="number" className={styles.marginado_filtros + " " + styles.campo_entrada}
                                       name="minima-cantidad"/><p>hasta</p><input type="number"
                                                                                  className={styles.marginado_filtros + " " + styles.campo_entrada}
                                                                                  name="maxima-cantidad"/>
                    <p>toneladas.</p>
                </div>
                <div className={styles.contenedor_botones}>
                    <button className={styles.boton + " " + styles.boton_primario} onClick={async () => {
                        let elementoBusqueda = document.getElementsByName("busqueda")[0];
                        let elementoDistancia = document.getElementsByName("distancia")[0];
                        let elementoMinimaCantidad = document.getElementsByName("minima-cantidad")[0];
                        let elementoMaximaCantidad = document.getElementsByName("maxima-cantidad")[0];
                        let busqueda = {
                            palabraClave: elementoBusqueda.value,
                            categorias: listaCategorias,
                            maximaDistancia: elementoDistancia.value,
                            minimaCantidad: elementoMinimaCantidad.value,
                            maximaCantidad: elementoMaximaCantidad.value,
                        }
                        const respuestaBusqueda = await fetch("http://localhost:5000/api/BuscarPublicacion", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                texto: elementoBusqueda.value,
                            }),
                        })
                        if (!respuestaBusqueda.ok) {
                            throw new Error('Error al buscar');
                        }
                        console.log(await respuestaBusqueda.json());
                        // setResultados(await respuestaBusqueda.json());
                    }}>Buscar
                    </button>
                </div>
            </div>
            <div id={"resultados-busqueda-eventos"} className={styles.seccion_resultados}>
                {resultados.map((resultado) => <VistaPreviaEvento key={resultado.publicacion.id} publicacion={resultado.publicacion} empresa={resultado.empresa} materiales={resultado.materiales}/>)}
            </div>
        </div>
    );
}

export default BusquedaEvento;