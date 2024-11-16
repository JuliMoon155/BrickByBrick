import React, { useState } from 'react';
import { Header } from './Header';
import styles from '../styles/Inscripcion.module.css';

const Inscripcion = ({ userId, fk_idPublicacionDon, cambiarInterfaz }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [showCreatedModal, setShowCreatedModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (aceptaTerminos) {
      try {
        const response = await fetch('http://localhost:5000/api/CrearInscripcion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fk_idPublicacionDon,
            fk_idBeneficiario: userId,
            nombre,
            apellido,
            celular,
            correo,
          }),
        });
        if (response.ok) {
          setShowCreatedModal(true);
        } else {
          console.error("Error al crear la inscripción");
        }
      } catch (error) {
        console.error("Error en el envío:", error);
      }
    } else {
      setShowCanceledModal(true);
    }
  };

  const handleCloseCreatedModal = () => {
    setShowCreatedModal(false);
    cambiarInterfaz("HomePage");
  };

  const handleCloseCanceledModal = () => {
    setShowCanceledModal(false);
  };

  return (
    <div className={styles["form-container"]}>
      <h2 className={styles["form-title"]}>Inscripción a Evento de Donación</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="nombre" className={styles["form-label"]}>Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles["form-input"]}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="apellido" className={styles["form-label"]}>Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className={styles["form-input"]}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="celular" className={styles["form-label"]}>Celular</label>
          <input
            type="tel"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className={styles["form-input"]}
            required
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="correo" className={styles["form-label"]}>Correo</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={styles["form-input"]}
            required
          />
        </div>
        <div className={styles["form-checkbox-group"]}>
          <input
            type="checkbox"
            id="terminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className={styles["form-checkbox"]}
          />
          <label htmlFor="terminos" className={styles["form-checkbox-label"]}>
            Acepto los términos y condiciones
          </label>
        </div>
        <div className={styles["form-buttons"]}>
          <button type="submit" className={styles["form-submit-button"]} >Crear Inscripción</button>
          <button type="button" className={styles["form-cancel-button"]} onClick={() => cambiarInterfaz("HomePage")}>
            Cancelar
          </button>
        </div>
      </form>

      {showCreatedModal && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <h3 className={styles["modal-title"]}>¡Inscripción Creada!</h3>
            <p className={styles["modal-message"]}>
              Tu inscripción al evento de donación ha sido creada exitosamente.
            </p>
            <button className={styles["modal-button"]} onClick={handleCloseCreatedModal}>Aceptar</button>
          </div>
        </div>
      )}

      {showCanceledModal && (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <h3 className={styles["modal-title-cancel"]}>Inscripción Cancelada</h3>
            <p className={styles["modal-message"]}>
              Tu inscripción al evento de donación ha sido cancelada.
            </p>
            <button className={styles["modal-button-cancel"]} onClick={handleCloseCanceledModal}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscripcion;