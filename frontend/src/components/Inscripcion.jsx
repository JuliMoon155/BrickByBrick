import React, { useState } from 'react';
import { Header } from './Header';
import '../styles/Inscripcion.css';

const Inscripcion = ({ userId, fk_idPublicacionDon, cambiarInterfaz }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [celular, setCelular] = useState('');
  const [correo, setCorreo] = useState('');
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [showCreatedModal, setShowCreatedModal] = useState(false);
  const [showCanceledModal, setShowCanceledModal] = useState(false);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    //fk_idPublicacionDon ="1";
    if (aceptaTerminos) {
      try {
        const response = await fetch('http://localhost:5000/api/CrearInscripcion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
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
          const result = await response.json();
          console.log("Inscripción creada con ID:", result.id_inscripcion);
          setShowCreatedModal(true); // Mostrar modal de éxito
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

  // Función para cerrar el modal de creación exitosa
  const handleCloseCreatedModal = () => {
    setShowCreatedModal(false);
    cambiarInterfaz("PublicacionMateriales"); // Redirige a 'home' tras la creación
  };

  // Función para cerrar el modal de cancelación
  const handleCloseCanceledModal = () => {
    setShowCanceledModal(false);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Inscripción a Evento de Donación</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="celular" className="form-label">Celular</label>
          <input
            type="tel"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-input"
            required
          />
        </div>
        <div className="form-checkbox-group">
          <input
            type="checkbox"
            id="terminos"
            checked={aceptaTerminos}
            onChange={(e) => setAceptaTerminos(e.target.checked)}
            className="form-checkbox"
          />
          <label htmlFor="terminos" className="form-checkbox-label">
            Acepto los términos y condiciones
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit" className="form-submit-button">Crear Inscripción</button>
          <button type="button" className="form-cancel-button" onClick={() => cambiarInterfaz("home")}>
            Cancelar
          </button>
        </div>
      </form>
  
      {showCreatedModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">¡Inscripción Creada!</h3>
            <p className="modal-message">
              Tu inscripción al evento de donación ha sido creada exitosamente.
            </p>
            <button className="modal-button" onClick={handleCloseCreatedModal}>Aceptar</button>
          </div>
        </div>
      )}
  
      {showCanceledModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title-cancel">Inscripción Cancelada</h3>
            <p className="modal-message">
              Tu inscripción al evento de donación ha sido cancelada.
            </p>
            <button className="modal-button-cancel" onClick={handleCloseCanceledModal}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inscripcion;
