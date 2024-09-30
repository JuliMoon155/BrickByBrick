import '../styles/VisualizarMaterial.css';
import PropTypes from "prop-types";

function VistaPreviaMaterial({ material }) {
    let onClick = () => {

    };

    return (
        <div className="contenedor-vista-previa" onClick={onClick}>
            <img src={material.urlFoto} alt="foto"/>
            <div className="contenedor-vista-previa-informacion">
                <h2 className="titulo-material">{material.titulo}</h2>
                <p>{material.descripcion}</p>
            </div>
        </div>
    );
}

VistaPreviaMaterial.propTypes = {
    material: PropTypes.shape({
        urlFoto: PropTypes.string,
        titulo: PropTypes.string,
        descripcion: PropTypes.string,
    }),
    onClick: PropTypes.func,
}

export default VistaPreviaMaterial;