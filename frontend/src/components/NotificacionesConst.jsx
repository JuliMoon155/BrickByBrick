import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function NotificacionesConst({ activar, cerrarPopup, empresaId }) {
  const fetchInscripciones = async (idEmpresa) => {
    try {
        const response = await fetch('http://localhost:5000/api/obtenerInscripcionesXEmpresa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ empresa: idEmpresa }), // Envía el ID de la empresa
        });

        if (!response.ok) {
            throw new Error('Error al obtener inscripciones');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener inscripciones:', error);
        return null;
    }
  };

  const [inscripciones, setInscripciones] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const obtenerInscripciones = async () => {
          setLoading(true);
          const data = await fetchInscripciones(empresaId);
          if (data) {
              setInscripciones(data);
          } else {
              setInscripciones([]); // Si no hay inscripciones, muestra una lista vacía
          }
          setLoading(false);
      };

      obtenerInscripciones();
  });

  return (
      <Popup open={activar} onClose={cerrarPopup} modal>
          <div className="NotificacionesConst">
              <h2>{empresaId}</h2>
          </div>
      </Popup>
  );
}

NotificacionesConst.propTypes = {
    activar: PropTypes.bool.isRequired,
    cerrarPopup: PropTypes.func.isRequired,
};

export default NotificacionesConst;
