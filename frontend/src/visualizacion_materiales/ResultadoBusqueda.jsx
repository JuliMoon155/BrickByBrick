import PropTypes from "prop-types";

function ResultadoBusqueda({titulo, descripcion}) {
    return (
        <div className="resultado-busqueda">
            <h2>{titulo}</h2>
            <p>{descripcion}</p>
        </div>
    );
}

ResultadoBusqueda.propTypes = {
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
}

export default ResultadoBusqueda;