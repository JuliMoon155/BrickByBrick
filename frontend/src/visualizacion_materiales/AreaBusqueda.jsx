import "./AreaBusqueda.css";

function buscarMateriales() {
    let elementoBarraBusqueda = document.getElementById("tf-barra-busqueda");
    console.log(`Se quiso buscar: '${elementoBarraBusqueda.value}'`);
}

function anadirFiltroCategoria() {
    console.log("Se presionó 'Anadir filtro de categoría'.");
}

function anadirFiltroUbicacion() {
    console.log("Se presionó 'Añadir filtro de ubicación'.");
}

function anadirFiltroCantidad() {
    console.log("Se presionó 'Añadir filtro de cantidad'.")
}

function AreaBusqueda() {
    return (
        <div className="area-busqueda">
            <h2>Visualización de Materiales</h2>
            <hr/>
            <label htmlFor="tf-barra-busqueda">Búsqueda <input type="text" id="tf-barra-busqueda"/></label>
            <h2>Filtros</h2>
            <label htmlFor="btn-anadir-filtro-categoria"><h3>Categoría <input type="button" onClick={anadirFiltroCategoria} value="Anadir" id="btn-anadir-filtro-categoria"/></h3></label>
            <div id="area-filtros-categoria"></div>
            <label htmlFor="btn-anadir-filtro-ubicacion"><h3>Ubicación <input type="button" onClick={anadirFiltroUbicacion} value="Anadir" id="btn-anadir-filtro-ubicacion"/></h3></label>
            <div id="area-filtros-ubicacion"></div>
            <label htmlFor="btn-anadir-filtro-cantidad"><h3>Cantidad <input type="button" onClick={anadirFiltroCantidad} value="Anadir" id="btn-anadir-filtro-cantidad"/></h3></label>
            <div id="area-filtros-cantidad"></div>
            <div style={{textAlign: "center"}}>
                <input type="button" value="Buscar" onClick={buscarMateriales} id="btn-buscar"/>
            </div>
        </div>
    );
}

export default AreaBusqueda;