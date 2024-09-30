import "./AreaResultados.css";
import ResultadoBusqueda from "./ResultadoBusqueda.jsx";

function AreaResultados() {
    return (
        <div className="area-resultados">
            <ResultadoBusqueda titulo={"Osheme"} descripcion={"La concha de tu hermana"}/>
            <ResultadoBusqueda titulo={"Marica el que lo lea, no el que lo escribe"} descripcion={"Solo sé que nada sé"}/>
        </div>
    );
}

export default AreaResultados;