import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import '../styles/publicacionContenido.css';

export const PublicacionContenido = () => {

// const fechaActual = new Date();
const [showPopup, setShowPopup] = useState(false); 
const [contenido, setContenido] = useState(''); 
const [fecha_publicacion, setFecha_publicacion] = useState(''); 
const [fk_idbeneficiario, setFk_idbeneficiario] = useState(1);
const [publicaciones, setPublicaciones] = useState([]);

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

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {

        let endpoint = 'http://localhost:5000/api/ObPublicacionesBen';

        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          //body: JSON.stringify({fk_idbeneficiario}),
        });

        if (!response.ok) throw new Error('Error al obtener publicaciones');
  
        const data = await response.json();
        console.log(data);
        setPublicaciones(data);
        
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, [fk_idbeneficiario]);

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
          <div className='PublicacionesExistentes'>
          {/* Mapeo de publicaciones */}
          {publicaciones.map((publicacion) => (
              <div className='PublicacionBen' key={publicacion.idpublicacion}>
                <p className='contenido_PublicacionBen'>{publicacion.contenido}</p>
                <p className='fecha_PublicacionBen'>{new Date(publicacion.fecha_publicacion).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
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
