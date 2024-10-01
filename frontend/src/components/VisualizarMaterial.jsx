import '../styles/VisualizarMaterial.module.css';
import VistaPreviaMaterial from "./VistaPreviaMaterial";

function VisualizarMaterial() {
    const listaCategorias = [];

    return (
        <div className="contenedor-visualizacion">
            <div className="seccion-formulario">
                <h2 className="titulo-formulario">Visualización de Materiales</h2>
                <input type="text" name="busqueda" placeholder="Ingresa lo que quieres buscar"
                       className="campo-entrada"/>
                <h3 className="subtitulo-formulario">Categoría</h3>
                <div className="contenedor-categorias">
                    <ul>
                        <li id="categoria-aglomerantes" onClick={() => {
                            let elementoCategoriaAglomerantes = document.getElementById("categoria-aglomerantes");
                            if (elementoCategoriaAglomerantes.style.backgroundColor === "lightgray" || elementoCategoriaAglomerantes.style.backgroundColor === "white") {
                                elementoCategoriaAglomerantes.style.backgroundColor = "darkgray";
                                listaCategorias.push("aglomerantes");
                            } else {
                                elementoCategoriaAglomerantes.style.backgroundColor = "white";
                                listaCategorias.remove("aglomerantes");
                            }
                        }}><a>Aglomerantes</a></li>
                        <li id="categoria-aglomerados" onClick={() => {
                            let elementoCategoriaAglomerados = document.getElementById("categoria-aglomerados");
                            if (elementoCategoriaAglomerados.style.backgroundColor === "lightgray" || elementoCategoriaAglomerados.style.backgroundColor === "white") {
                                elementoCategoriaAglomerados.style.backgroundColor = "darkgray";
                                listaCategorias.push("aglomerado");
                            } else {
                                elementoCategoriaAglomerados.style.backgroundColor = "white";
                                listaCategorias.remove("aglomerado");
                            }
                        }}><a>Aglomerados</a></li>
                        <li id="categoria-metalicos" onClick={() => {
                            let elementoCategoriaMetalicos = document.getElementById("categoria-metalicos");
                            if (elementoCategoriaMetalicos.style.backgroundColor === "lightgray" || elementoCategoriaMetalicos.style.backgroundColor === "white") {
                                elementoCategoriaMetalicos.style.backgroundColor = "darkgray";
                                listaCategorias.push("metalicos");
                            } else {
                                elementoCategoriaMetalicos.style.backgroundColor = "white";
                                listaCategorias.remove("metalicos");
                            }
                        }}><a>Metálicos</a></li>
                        <li id="categoria-organicos" onClick={() => {
                            let elementoCategoriaOrganicos = document.getElementById("categoria-organicos");
                            if (elementoCategoriaOrganicos.style.backgroundColor === "lightgray" || elementoCategoriaOrganicos.style.backgroundColor === "white") {
                                elementoCategoriaOrganicos.style.backgroundColor = "darkgray";
                                listaCategorias.push("organicos");
                            } else {
                                elementoCategoriaOrganicos.style.backgroundColor = "white";
                                listaCategorias.remove("organicos");
                            }
                        }}><a>Orgánicos</a></li>
                    </ul>
                </div>
                <h3 className="subtitulo-formulario">Ubicación</h3>
                <div className="contenedor-ubicacion">
                    <p>Máximo</p><input type="number" className="marginado-filtros campo-entrada" name="distancia"/><p>kilómetros de distancia.</p>
                </div>
                <h3 className="subtitulo-formulario">Cantidad</h3>
                <div className="contenedor-cantidades">
                    <p>Desde</p><input type="number" className="marginado-filtros campo-entrada" name="minima-cantidad"/><p>hasta</p><input type="number" className="marginado-filtros campo-entrada" name="maxima-cantidad"/><p>toneladas.</p>
                </div>
                <div className="contenedor-botones">
                    <button className="boton boton-primario" onClick={() => {
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
                        console.log(busqueda);
                    }}>Buscar</button>
                </div>
            </div>
            <div className="seccion-resultados">
                <VistaPreviaMaterial material={{urlFoto: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/African_Bush_Elephant.jpg/800px-African_Bush_Elephant.jpg", descripcion: "Un elefante bien bonito", titulo: "Elefante"}}/>
            </div>
        </div>
    );
}

export default VisualizarMaterial;