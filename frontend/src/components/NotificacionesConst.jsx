import React from 'react';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function NotificacionesConst({ activar, cerrarPopup }) {
    return (
        <Popup open={activar} onClose={cerrarPopup} modal>
            <div className="NotificacionesConst">
                <h2>Notificaciones</h2>
                <p>Este es el contenido del popup de notificaciones.</p>
                <button onClick={cerrarPopup}>Cerrar</button>
            </div>
        </Popup>
    );
}

NotificacionesConst.propTypes = {
    activar: PropTypes.bool.isRequired,
    cerrarPopup: PropTypes.func.isRequired,
};

export default NotificacionesConst;
