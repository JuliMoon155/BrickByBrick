import Popup from "reactjs-popup";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "reactjs-popup/dist/index.css";
import ItemNotiConst from "./ItemNotiConst";

function NotificacionesConst({ activar, cerrarPopup, empresaId }) {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchNotificaciones = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("/api/inscripciones", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ empresa: empresaId }),
  //       });

  //       if (!response.ok) {
  //         throw new Error("Error al obtener las notificaciones");
  //       }

  //       const data = await response.json();
  //       setNotificaciones(data); // Guarda las notificaciones en el estado
  //     } catch (error) {
  //       console.error("Error al obtener notificaciones:", error);
  //       setNotificaciones([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotificaciones();
  // }, [empresaId]);

  return (
      <Popup open={activar} onClose={cerrarPopup} modal>
        {loading ? (
          // <p>Cargando notificaciones...</p>
        // ) : notificaciones.length > 0 ? (
          // notificaciones.map((notificacion) => (
          <ItemNotiConst
          key={1}
          // key={notificacion.id_inscripcion}
          nombreConstructora={"Constructora Patitos"}
          // nombreConstructora={notificacion.nombre_empresa}
          fechaCreacionRegistro={"24-11-2024"}
          // fechaCreacionRegistro={new Date(notificacion.fecha_creacion).toLocaleString()}
          nombreCompletoBeneficiarioRegistrado={"Raúl Perez"}
          // nombreCompletoBeneficiarioRegistrado={`${notificacion.nombre_beneficiario} ${notificacion.apellido_beneficiario}`}
          tituloPublicacion={"Ladrillos Calientes"}
          // tituloPublicacion={notificacion.titulo_publicacion}
          celularBeneficiario={"30588091060"}
          // celularBeneficiario={notificacion.celular}
          correoBeneficiario={"correo@real.com"}
          // correoBeneficiario={notificacion.correo}
          />
        // ))
      ) : (
      <p><center><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-frown" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
      <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.5 3.5 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.5 4.5 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
    </svg> No tienes notificaciones actualmente.</center></p>
      )}    
      </Popup>
  );
}

NotificacionesConst.propTypes = {
    activar: PropTypes.bool.isRequired,
    cerrarPopup: PropTypes.func.isRequired,
};

export default NotificacionesConst;
