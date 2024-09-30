import '../styles/VisualizarMaterial.css';
import React from "react";
import VistaPreviaMaterial from "./VistaPreviaMaterial";

function VisualizarMaterial() {
    return (
        <div className="contenedor-visualizacion">
            <div className="seccion-formulario">
                <h2 className="titulo-formulario">Visualización de Materiales</h2>
                <input type="text" name="busqueda" placeholder="Ingresa lo que quieres buscar"
                       className="campo-entrada"/>
                <h3 className="subtitulo-formulario">Categoría</h3>
                <div className="contenedor-categorias">
                    <ul>
                        <li><a>Aglomerantes</a></li>
                        <li><a>Aglomerados</a></li>
                        <li><a>Metálicos</a></li>
                        <li><a>Orgánicos</a></li>
                    </ul>
                </div>
                <h3 className="subtitulo-formulario">Ubicación</h3>
                <div className="contenedor-ubicacion">
                    <p>máximo</p><input type="number" className="campo-entrada"/><p>kilometros de distancia</p>
                </div>
                <h3 className="subtitulo-formulario">Cantidad</h3>
                <div className="contenedor-cantidades">
                    <p>desde</p><input type="number" className="campo-entrada"/><p>hasta</p><input type="number" className="campo-entrada"/>
                </div>
                <div className="contenedor-botones">
                    <button className="boton boton-primario">Buscar</button>
                </div>
            </div>
            <div className="seccion-resultados">
                <VistaPreviaMaterial material={{urlFoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/800px-African_Bush_Elephant.jpg", descripcion: "Un elefante bien bonito", titulo: "Elefante"}}/>
            </div>
        </div>
    );
}

export default VisualizarMaterial;