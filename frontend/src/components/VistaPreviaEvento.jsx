import styles from "../styles/VistaPreviaEvento.module.css";

import PropTypes from "prop-types";
import Popup from "reactjs-popup";

function VistaPreviaEvento({ publicacion, empresa, materiales }) {
    return (
        <Popup trigger={
            <div className={styles.contenedor_vista_previa}>
                <img src={`https://picsum.photos/200?random=${publicacion.id}`} alt="A random photo"/>
                <div className={styles.contenedor_informacion}>
                    <h1>{publicacion.titulo}</h1>
                    <p>{publicacion.descripcion}</p>
                </div>
            </div>
        } position={"center center"}>
            <div className={styles.contenedor_popup}></div>
        </Popup>
    );
}

VistaPreviaEvento.propTypes = {
    publicacion: PropTypes.shape({
        descripcion: PropTypes.string,
        fecha_cierre: PropTypes.string,
        fecha_publicacion: PropTypes.string,
        id: PropTypes.number,
        titulo: PropTypes.string,
    }),
    empresa: PropTypes.shape({
        descripcion: PropTypes.string,
        id: PropTypes.number,
        nombre: PropTypes.string,
    }),
    materiales: PropTypes.arrayOf(PropTypes.shape({
        cantidad: PropTypes.number,
        categoria: PropTypes.string,
        descripcion: PropTypes.string,
        estado: PropTypes.string,
        id: PropTypes.number,
        nombre: PropTypes.string,
    })),
}

export default VistaPreviaEvento;