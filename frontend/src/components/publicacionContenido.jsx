import React, { useState } from 'react';
import { Header } from './Header';
import '../styles/publicacionContenido.css';

export const PublicacionContenido = () => {

// const fechaActual = new Date();
const [showPopup, setShowPopup] = useState(false); 
const [contenido, setContenido] = useState(''); 
const [fecha_publicacion, setFecha_publicacion] = useState(''); 
const [fk_idbeneficiario, setFk_idbeneficiario] = useState(1);

  const handlePopup = () => {
    setShowPopup(!showPopup); 
  };

  const handleContenidoChange = (e) => {
    setContenido(e.target.value);
  };

  const handleSubmit = async () => {
    console.log("Publicación creada:", contenido);
    try{
        let datos = {contenido, fecha_publicacion, fk_idbeneficiario};
        let endpoint = "http://localhost:5000/api/PublicacionesBen";

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(datos),
        });

        if (!response.ok) {
            throw new Error('Error en el servidor');
        }

        const data = await response.json();
        console.log('Publicacion Creada:', data);
        alert('Publicacion creada con exito');

    } catch (error) {
        console.error("Error al guardar la publicacion:", error);
        alert("error");
    }
    setShowPopup(false); 
  };

  return (
    <div className='HomePage'>
      <Header />
      <div className='Contenido'>
        <div className='perfil'>
          <div className='infoPersonal'></div>
          <div className='otraInfo'></div>
        </div>
        <div className='forYou'>
          <button className='addPublicacion' onClick={handlePopup}>+</button>
          <div className='PublicacionesExistentes'></div>
        </div>
        <div className='extras'></div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Nueva Publicación</h2>
            <textarea
              placeholder="Escribe una descripción..."
              value={contenido}
              onChange={handleContenidoChange}
            />
            <div className="popup-actions">
              <button onClick={handleSubmit}>Publicar</button>
              <button onClick={handlePopup}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
